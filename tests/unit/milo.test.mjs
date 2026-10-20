// Milo med en låtsasmotor. Detta testar logiken runt modellen, inte modellen själv.
import test from 'node:test';
import assert from 'node:assert/strict';
import { Milo, buildMessages, stripThinking, MAX_INPUT_CHARS, CONTEXT_TOKENS, RESPONSE_TOKENS, estimateTokens, MILO_SYSTEM, guardSolution } from '../../src/ai/milo.js';
import { memoryStorage, manualTimers } from './helpers.mjs';

function fakeEngine({ reply = 'Hej! Jag är Milo, en AI.', gate = null } = {}) {
  const calls = [];
  const engine = {
    calls,
    interrupted: 0,
    unloaded: 0,
    async chat(messages, opts) {
      calls.push({ messages, opts });
      const parts = reply.split(' ');
      return (async function* gen() {
        for (const [i, p] of parts.entries()) {
          if (gate) await gate;
          yield (i ? ' ' : '') + p;
        }
      })();
    },
    interrupt() { engine.interrupted++; },
    async unload() { engine.unloaded++; },
  };
  return engine;
}

const okSupport = async () => ({ ok: true, model: 'fake' });

test('Milo laddar ingen modell förrän start() anropas', async () => {
  let created = 0;
  const m = new Milo({ storage: memoryStorage(), uid: 'a', support: okSupport, engineFactory: async () => { created++; return fakeEngine(); }, timers: manualTimers() });
  assert.equal(m.status, 'off');
  assert.equal(created, 0);
  const r = await m.send('hej');
  assert.match(r.error, /Starta Milo/);
  await m.start();
  assert.equal(created, 1);
  assert.equal(m.status, 'ready');
});

test('utan WebGPU visas ett ärligt fel och ingen modell hämtas', async () => {
  let created = 0;
  const m = new Milo({ storage: memoryStorage(), uid: 'a', support: async () => ({ ok: false, reason: 'Ingen WebGPU' }), engineFactory: async () => { created++; return fakeEngine(); } });
  await m.start();
  assert.equal(m.status, 'unsupported');
  assert.equal(m.error, 'Ingen WebGPU');
  assert.equal(created, 0);
});

test('fel i motorn visas som fel, inte som ett svar', async () => {
  const m = new Milo({ storage: memoryStorage(), uid: 'a', support: okSupport, timers: manualTimers(),
    engineFactory: async () => ({ async chat() { throw new Error('device lost'); }, interrupt() {}, async unload() {} }) });
  await m.start();
  const r = await m.send('hej');
  assert.equal(r.ok, false);
  const last = m.messages.at(-1);
  assert.equal(last.role, 'error');
  assert.match(last.content, /grafikminne/);
});

test('koden skickas bara med när användaren väljer det', async () => {
  const eng = fakeEngine();
  const m = new Milo({ storage: memoryStorage(), uid: 'a', support: okSupport, engineFactory: async () => eng, timers: manualTimers() });
  await m.start();
  await m.send('Varför blir det fel?');
  assert.ok(!eng.calls[0].messages.some((x) => x.content.includes('print(')));
  await m.send('Och nu?', { code: 'print("hej")', lang: 'python' });
  const sent = eng.calls[1].messages.at(-1).content;
  assert.match(sent, /```python\nprint\("hej"\)\n```/);
  assert.equal(m.messages.at(-2).shown, 'Och nu?');
  assert.equal(eng.calls[1].messages[0].role, 'system');
  assert.equal(eng.calls[1].messages[0].content, MILO_SYSTEM);
});

test('för långa meddelanden stoppas innan de skickas', async () => {
  const m = new Milo({ storage: memoryStorage(), uid: 'a', support: okSupport, engineFactory: async () => fakeEngine(), timers: manualTimers() });
  assert.match(m.validate('x'.repeat(MAX_INPUT_CHARS + 1)), /för långt/);
  assert.match(m.validate('   '), /Skriv något/);
});

test('historiken kortas så att den ryms i modellens fönster', () => {
  const hist = [];
  for (let i = 0; i < 80; i++) { hist.push({ role: 'user', content: `fråga ${i} ${'a'.repeat(300)}` }, { role: 'assistant', content: `svar ${i} ${'b'.repeat(300)}` }); }
  const msgs = buildMessages(hist);
  const total = msgs.reduce((n, x) => n + estimateTokens(x.content), 0);
  assert.ok(total <= CONTEXT_TOKENS - RESPONSE_TOKENS, `för många tokens: ${total}`);
  assert.equal(msgs[0].role, 'system');
  assert.equal(msgs[1].role, 'user');
  assert.match(msgs.at(-1).content, /svar 79/);
});

test('tankeblock från modellen visas aldrig', () => {
  assert.equal(stripThinking('<think>hmm</think>Hej!'), 'Hej!');
  assert.equal(stripThinking('<think>halvfärdig tanke'), '');
});

test('ett sent svar efter utloggning visas inte och sparas inte', async () => {
  let release;
  const gate = new Promise((r) => { release = r; });
  const storage = memoryStorage();
  const eng = fakeEngine({ gate, reply: 'Hemligt svar till konto A' });
  const m = new Milo({ storage, uid: 'a', support: okSupport, engineFactory: async () => eng, timers: manualTimers() });
  await m.start();
  const pending = m.send('hej');
  await new Promise((r) => setImmediate(r));
  await m.shutdown({ forget: true });
  release();
  const r = await pending;
  assert.equal(r.stale, true);
  assert.equal(m.messages.length, 0);
  assert.equal(storage.getItem('kodstig.milo.a'), null);
  assert.equal(eng.unloaded, 1);
  // Nytt konto i samma flik ser ingenting från A.
  const b = new Milo({ storage, uid: 'b', support: okSupport, engineFactory: async () => fakeEngine() });
  assert.deepEqual(b.messages, []);
});

test('rensa under pågående svar ger ingen sen bubbla', async () => {
  let release;
  const gate = new Promise((r) => { release = r; });
  const m = new Milo({ storage: memoryStorage(), uid: 'a', support: okSupport, engineFactory: async () => fakeEngine({ gate }), timers: manualTimers() });
  await m.start();
  const pending = m.send('hej');
  await new Promise((r) => setImmediate(r));
  m.clear();
  release();
  await pending;
  assert.equal(m.messages.length, 0);
  assert.equal(m.status, 'ready');
});

test('avbruten start lämnar ingen modell kvar', async () => {
  let resolveEngine;
  const eng = fakeEngine();
  const m = new Milo({ storage: memoryStorage(), uid: 'a', support: okSupport, engineFactory: () => new Promise((r) => { resolveEngine = r; }) });
  const p = m.start();
  await new Promise((r) => setImmediate(r));
  assert.equal(m.status, 'loading');
  m.cancelStart();
  assert.equal(m.status, 'off');
  resolveEngine(eng);
  await p;
  assert.equal(m.status, 'off');
  assert.equal(eng.unloaded, 1);
});

test('samtalet sparas per konto i flikens session', async () => {
  const storage = memoryStorage();
  const m = new Milo({ storage, uid: 'a', support: okSupport, engineFactory: async () => fakeEngine(), timers: manualTimers() });
  await m.start();
  await m.send('hej');
  const again = new Milo({ storage, uid: 'a', support: okSupport, engineFactory: async () => fakeEngine() });
  assert.equal(again.messages.length, 2);
  assert.equal(again.messages[1].content, 'Hej! Jag är Milo, en AI.');
});

test('med en övning får Milo uppgift, testresultat och facit, men facit visas aldrig', async () => {
  const solution = 'def dubbla(x):\n    return x * 2';
  const eng = fakeEngine({ reply: 'Så här:\n```python\ndef dubbla(x):\n    return x * 2\n```' });
  const m = new Milo({ storage: memoryStorage(), uid: 'a', support: okSupport, engineFactory: async () => eng, timers: manualTimers() });
  await m.start();
  await m.send('Varför blir det fel?', { code: 'def dubbla(x):\n    return x + 2', lang: 'python', context: { prompt: 'Skriv dubbla(x).', solution, result: '1 av 2 kontroller klara.\nInte klar: dubbla(3). Förväntat: 6. Fick: 5' } });
  const [system, ...rest] = eng.calls[0].messages;
  assert.match(system.content, /<facit>\ndef dubbla\(x\):/);
  assert.match(system.content, /Visa aldrig facit/);
  const user = rest.at(-1).content;
  assert.match(user, /Uppgiften jag arbetar med:\nSkriv dubbla\(x\)\./);
  assert.match(user, /Förväntat: 6\. Fick: 5/);
  assert.ok(!user.includes('return x * 2'), 'facit ligger inte i elevens meddelande');
  const shown = m.messages.at(-1).content;
  assert.ok(!shown.includes('return x * 2'), 'facit filtreras bort ur svaret');
  assert.match(shown, /tog bort/);
  assert.ok(!JSON.stringify(m.messages).includes('return x * 2'), 'facit sparas inte i samtalet');
  // Utan övning är systemprompten den vanliga.
  await m.send('Tack!');
  assert.equal(eng.calls[1].messages[0].content, MILO_SYSTEM);
});

test('ledtrådar som bara liknar facit får vara kvar', () => {
  const sol = 'summa = 0\nfor tal in lista:\n    summa += tal\nprint(summa)';
  const hint = 'Titta på loopen:\n```python\nfor x in [1, 2]:\n    print(x)\n```';
  assert.equal(guardSolution(hint, sol), hint);
  assert.match(guardSolution('```python\nsumma = 0\nfor tal in lista:\n    summa += tal\n```', sol), /tog bort/);
});
