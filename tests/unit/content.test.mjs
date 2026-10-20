import test from 'node:test';
import assert from 'node:assert/strict';
import { TRACKS, LESSONS, STATS } from '../../src/content/index.js';
import { GLOSSARY } from '../../src/content/glossary.js';
import { runCSharp } from '../../src/engine/csharp.js';
import { runPython } from '../../src/engine/python.js';
import { grade, fillCode, normalizeOutput, orderLines, shuffled } from '../../src/engine/grade.js';

const runner = async (lang, code, calls, opts = {}) => (lang === 'csharp' ? runCSharp : runPython)(code, { calls, ...opts });

test('omfattning: 130 lektioner, 852 övningar, 17 miniprojekt', () => {
  assert.deepEqual(STATS, { lessons: 130, exercises: 852, projects: 17 });
  const per = Object.fromEntries(TRACKS.map((t) => [t.id, [LESSONS.filter((l) => l.trackId === t.id).length, LESSONS.filter((l) => l.trackId === t.id).reduce((n, l) => n + l.exercises.length, 0)]]));
  assert.deepEqual(per, { csharp: [49, 327], python: [43, 277], web: [38, 248] });
  assert.deepEqual(Object.fromEntries(TRACKS.map((t) => [t.id, t.chapters.length])), { csharp: 12, python: 11, web: 10 });
});

test('unika id:n och förkunskapskrav som pekar på riktiga lektioner', () => {
  const ids = new Set();
  for (const l of LESSONS) {
    assert.ok(!ids.has(l.id), `dubblett ${l.id}`);
    ids.add(l.id);
    l.requires.forEach((r) => assert.ok(LESSONS.some((x) => x.id === r), `${l.id} kräver okänd ${r}`));
  }
});

for (const track of TRACKS.filter((t) => t.lang === 'python' || t.lang === 'csharp')) {
  test(`${track.name}: exempel, svarsalternativ, luckor och lösningar stämmer med kodmotorn`, async () => {
    for (const les of LESSONS.filter((l) => l.trackId === track.id)) {
      const ex0 = await runner(track.lang, les.example, [], { input: les.exampleInput });
      assert.equal(ex0.error, null, `${les.id}: exemplet ger fel ${ex0.error && ex0.error.message}`);
      for (const [i, ex] of les.exercises.entries()) {
        const tag = `${les.id}#${i}`;
        if (ex.type === 'choice' && ex.out) {
          const r = await runner(track.lang, ex.code, [], { input: ex.input });
          assert.equal(normalizeOutput(r.output), ex.options[ex.answer], `${tag}: rätt alternativ matchar inte verklig utskrift`);
        }
        if (ex.type === 'fill') {
          for (const [bi, acc] of ex.answers.entries()) for (const a of acc) {
            const ans = ex.answers.map((x) => x[0]); ans[bi] = a;
            const r = await runner(track.lang, fillCode(ex.code, ans), [], { input: ex.input });
            assert.equal(r.error, null, `${tag}: luckan "${a}" ger fel`);
            if (ex.output !== undefined) assert.equal(normalizeOutput(r.output), normalizeOutput(ex.output), `${tag}: "${a}"`);
          }
        }
        if (ex.type === 'order') {
          for (const lines of [ex.lines, ...(ex.alt || [])]) {
            const r = await runner(track.lang, lines.join('\n'), [], { input: ex.input });
            assert.equal(r.error, null, `${tag}: raderna i rätt ordning ger fel ${r.error && r.error.message}`);
            if (ex.output !== undefined) assert.equal(normalizeOutput(r.output), normalizeOutput(ex.output), `${tag}: utskriften stämmer inte`);
          }
        }
        if (ex.type === 'code' || ex.type === 'debug') {
          const g = await grade(ex, ex.solution, { lang: track.lang, runner });
          assert.ok(g.ok, `${tag}: lösningen godkänns inte: ${g.title} ${JSON.stringify(g.tests?.filter((t) => !t.ok))} ${g.error?.message || ''}`);
          const g2 = await grade(ex, ex.starter || '', { lang: track.lang, runner });
          assert.ok(!g2.ok, `${tag}: startkoden godkänns direkt`);
        }
      }
    }
  });
}

test('alternativa mellanslag godkänns i luckor och kod', async () => {
  const ex = LESSONS.find((l) => l.id === 'cs-for').exercises[1];
  assert.ok((await grade(ex, ['i<5'], { lang: 'csharp', runner })).ok);
  assert.ok((await grade(ex, ['  i <  5 '], { lang: 'csharp', runner })).ok);
  const code = LESSONS.find((l) => l.id === 'py-print').exercises[3];
  assert.ok((await grade(code, 'print( "Jag heter Milo" )\nprint ("Jag gillar bambu")   \n', { lang: 'python', runner })).ok);
});

test('testresultat visar förväntat värde, eget resultat och gränsfall', async () => {
  const ex = LESSONS.find((l) => l.id === 'cs-bounds').exercises[2];
  const g = await grade(ex, ex.starter, { lang: 'csharp', runner });
  assert.equal(g.ok, false);
  const failed = g.tests.find((t) => !t.ok);
  assert.equal(failed.expected, 'true');
  assert.equal(failed.got, 'false');
  assert.match(g.detail, /exakt 500 kr/);
});

test('ordlistan innehåller nyckelbegreppen', () => {
  const terms = GLOSSARY.map((g) => g.term.toLowerCase());
  for (const t of ['variabel', 'datatyp', 'booleskt värde', 'villkor', 'loop', 'funktion', 'parameter', 'return', 'lista', 'index', 'klassväljare', 'boxmodell']) {
    assert.ok(terms.some((x) => x.includes(t)), `saknar ${t}`);
  }
});

test('varje fel svar i varje flervalsfråga har en egen förklaring', () => {
  const missing = [];
  for (const l of LESSONS) l.exercises.forEach((e, i) => {
    if (e.type === 'choice') e.options.forEach((o, k) => { if (k !== e.answer && !(e.why && e.why[k])) missing.push(`${l.id}#${i}:${k}`); });
  });
  assert.deepEqual(missing, []);
});

test('ordningspussel: rimliga rader, blandas aldrig rätt från början och rättas korrekt', async () => {
  const all = LESSONS.flatMap((l) => l.exercises.map((ex, i) => ({ ex, tag: `${l.id}#${i}`, lang: l.lang })).filter((x) => x.ex.type === 'order'));
  for (const { ex, tag, lang } of all) {
    assert.ok(ex.lines.length >= 3 && ex.lines.length <= 12, `${tag}: 3 till 12 rader`);
    assert.ok(ex.explain && ex.hint, `${tag}: explain och hint saknas`);
    for (const d of ex.distractors || []) {
      assert.ok(!ex.lines.includes(d.line), `${tag}: distraktorn finns bland de rätta raderna`);
      assert.ok(d.why, `${tag}: distraktorn saknar why`);
    }
    const pool = shuffled(orderLines(ex), ex.prompt, ex.lines);
    assert.notDeepEqual(pool.slice(0, ex.lines.length), ex.lines, `${tag}: blandningen börjar i rätt ordning`);
    assert.ok((await grade(ex, ex.lines, { lang })).ok, `${tag}: rätt ordning godkänns inte`);
    assert.ok(!(await grade(ex, [...ex.lines].reverse(), { lang })).ok, `${tag}: omvänd ordning godkänns`);
  }
});
