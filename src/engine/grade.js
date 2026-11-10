import { compareTurtle, compareCanvas } from './pixel/compare.js';

// Bedömning av övningar. Själva kodkörningen görs av `runner`, som i
// webbläsaren är en isolerad Web Worker och i testerna tolkarna direkt.

// Tar bort blanksteg utanför strängar så att `print( "x" )` och `print("x")` räknas lika.
export function squash(s) {
  let out = '', q = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { out += c; if (c === '\\') { out += s[++i] ?? ''; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; out += c; continue; }
    if (/\s/.test(c)) continue;
    out += c;
  }
  return out;
}

export function normalizeOutput(s) {
  return String(s ?? '').replace(/\r\n?/g, '\n').split('\n').map((l) => l.replace(/[ \t]+$/, '')).join('\n').replace(/\n+$/, '');
}

export function stripComments(code, lang) {
  if (lang === 'python') return code.split('\n').map((l) => l.replace(/#.*$/, '')).join('\n');
  if (lang === 'csharp') return code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  return code.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
}

export function fillCode(code, answers) {
  let i = 0;
  return code.replace(/___/g, () => answers[i++] ?? '');
}

function deepEq(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) < 1e-6 || a === b;
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((x, i) => deepEq(x, b[i]));
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const ka = Object.keys(a), kb = Object.keys(b);
    return ka.length === kb.length && ka.every((k) => deepEq(a[k], b[k]));
  }
  return a === b;
}

export function show(v, lang) {
  if (v === undefined) return '(inget värde)';
  if (v === null) return lang === 'csharp' ? 'null' : 'None';
  if (typeof v === 'string') return `"${v}"`;
  if (typeof v === 'boolean') return lang === 'csharp' ? String(v) : v ? 'True' : 'False';
  if (Array.isArray(v)) return `[${v.map((x) => show(x, lang)).join(', ')}]`;
  if (typeof v === 'object') return `{${Object.entries(v).map(([k, x]) => `"${k}": ${show(x, lang)}`).join(', ')}}`;
  return String(v);
}

/**
 * Bedömer ett svar.
 * @returns {Promise<{ok:boolean, title:string, detail?:string, tests?:Array, run?:object}>}
 */
export async function grade(ex, answer, { lang, runner, webChecker, pixelRunner, gameRunner }) {
  switch (ex.type) {
    case 'choice': {
      const ok = answer === ex.answer;
      if (ok) return { ok, title: 'Rätt!', detail: ex.explain };
      const why = ex.why && ex.why[answer];
      return { ok, title: 'Inte riktigt.', detail: why || ex.hint || 'Läs koden rad för rad och prova igen.' };
    }
    case 'fill': {
      const blanks = ex.answers.map((acc, i) => {
        const given = squash(String(answer[i] ?? ''));
        return acc.some((a) => squash(a) === given);
      });
      if (blanks.every(Boolean)) return { ok: true, title: 'Rätt!', detail: ex.explain };
      const first = blanks.findIndex((b) => !b);
      const empty = !String(answer[first] ?? '').trim();
      return {
        ok: false,
        title: empty ? 'En lucka är tom.' : (ex.answers.length > 1 ? `Lucka ${first + 1} stämmer inte än.` : 'Inte riktigt.'),
        detail: ex.hint || 'Titta på exemplet i lektionen och prova igen.',
      };
    }
    case 'order':
      return gradeOrder(ex, Array.isArray(answer) ? answer : []);
    case 'code':
    case 'debug':
      return gradeCode(ex, String(answer ?? ''), lang, runner);
    case 'web':
      return webChecker(ex, String(answer ?? ''));
    case 'world':
      return gradeWorld(ex, String(answer ?? ''), lang, pixelRunner);
    case 'game':
      return gradeGame(ex, String(answer ?? ''), lang, gameRunner);
    default:
      return { ok: false, title: 'Okänd övningstyp.' };
  }
}

// Pixelvärlden. Rätt betyder att målen är klara i alla startvärldar, eller att
// bilden blir som målbilden. Målbilden räknas fram genom att köra lösningen.
const targets = new WeakMap();
export async function worldTarget(ex, lang, pixelRunner) {
  if (!ex.draw) return null;
  if (!targets.has(ex)) targets.set(ex, pixelRunner(lang, ex.solution, ex.level || null).then((r) => r.final && { ...r.final, events: r.events }));
  return targets.get(ex);
}
/** Antal rader med kod, utan tomma rader och kommentarer. */
export const codeLines = (code, lang) => stripComments(code, lang).split('\n').filter((l) => l.trim() && !/^\s*[{}]\s*$/.test(l)).length;

// Spel: koden körs utan skärm i ett antal bildrutor med tangenter enligt ett
// schema, och sedan kontrolleras variablerna. Varje körning har en egen etikett.
const OPS = { '>': (a, b) => a > b, '>=': (a, b) => a >= b, '<': (a, b) => a < b, '<=': (a, b) => a <= b, '==': (a, b) => a === b, '!=': (a, b) => a !== b };
async function gradeGame(ex, code, lang, gameRunner) {
  if (!stripComments(code, lang).trim()) return { ok: false, title: 'Skriv lite kod först.', detail: ex.hint };
  const tests = [];
  for (const sim of ex.sims) {
    const expect = sim.expect || [];
    const vars = [...new Set(expect.filter((e) => e.var).map((e) => e.var))];
    const r = await gameRunner(lang, code, { frames: sim.frames, keys: sim.keys || [], vars });
    if (r.error) return { ok: false, title: 'Spelet stoppades av ett fel.', error: r.error, run: r, detail: ex.hint };
    if (sim.reacts) {
      const still = await gameRunner(lang, code, { frames: sim.frames, keys: [], vars: [] });
      tests.push({ label: sim.label, ok: !still.error && JSON.stringify(still.ops) !== JSON.stringify(r.ops) });
      continue;
    }
    for (const e of expect) {
      const got = r.vars[e.var];
      if (got === undefined) return { ok: false, title: 'En variabel saknas.', detail: `Spelet behöver en variabel som heter ${e.var}. Skapa den högst upp i programmet.` };
      tests.push({ label: `${sim.label}: ${e.text}`, ok: OPS[e.op](got, e.value), expected: e.text, got: `${e.var} = ${typeof got === 'number' ? Math.round(got * 100) / 100 : got}` });
    }
  }
  const src = checkSource(ex, code, lang, null);
  if (src) return src;
  const failed = tests.filter((t) => !t.ok);
  if (!failed.length) return { ok: true, title: 'Spelet fungerar!', detail: ex.explain, tests };
  return { ok: false, title: `${tests.length - failed.length} av ${tests.length} kontroller klara.`, detail: ex.hint, tests };
}

// Fria uppgifter utan facit: bara några krav på bilden.
function freeCheck(check, run) {
  if (check.canvas) {
    const cv = run.final.canvases[run.final.canvases.length - 1];
    if (!cv) return 'Det finns inget rutnät än.';
    const cells = cv.px.flat().filter(Boolean);
    const colors = new Set(cells).size;
    if (check.canvas.minColors && colors < check.canvas.minColors) return `Bilden har ${colors} ${colors === 1 ? 'färg' : 'färger'}. Använd minst ${check.canvas.minColors}.`;
    if (check.canvas.minPixels && cells.length < check.canvas.minPixels) return `Du har målat ${cells.length} rutor. Måla minst ${check.canvas.minPixels}.`;
  }
  if (check.turtle) {
    const lines = run.final.lines.filter((l) => Math.hypot(l.x2 - l.x1, l.y2 - l.y1) > 0.5);
    const colors = new Set(lines.map((l) => l.c)).size;
    if (check.turtle.minLines && lines.length < check.turtle.minLines) return `Sköldpaddan har ritat ${lines.length} streck. Rita minst ${check.turtle.minLines}.`;
    if (check.turtle.minColors && colors < check.turtle.minColors) return `Mönstret har ${colors} ${colors === 1 ? 'färg' : 'färger'}. Använd minst ${check.turtle.minColors}.`;
  }
  return null;
}

async function gradeWorld(ex, code, lang, pixelRunner) {
  if (!stripComments(code, lang).trim()) return { ok: false, title: 'Skriv lite kod först.', detail: ex.hint };
  const run = await pixelRunner(lang, code, ex.level || null);
  const target = await worldTarget(ex, lang, pixelRunner);
  if (run.error) return { ok: false, title: 'Koden stoppades av ett fel.', error: run.error, run, target, detail: ex.hint };
  const src = checkSource(ex, code, lang, run);
  if (src) return { ...src, target };
  const goals = run.goals || [];
  const tests = goals.map((g) => ({ label: g.text, ok: g.met }));
  if (goals.some((g) => !g.met)) {
    const other = run.otherWorld && run.mainOk ? ` Det gick inte i startvärld ${run.otherWorld.index} av ${run.worlds}. Koden ska fungera på alla kartor, så använd en loop och hjältens sensorer i stället för att räkna rutor.` : '';
    return { ok: false, title: 'Inte i mål än.', tests, run, target, detail: `${ex.hint || 'Kör steg för steg och följ hjälten.'}${other}` };
  }
  if (ex.check) {
    const msg = freeCheck(ex.check, run);
    if (msg) return { ok: false, title: 'Nästan klart!', run, detail: msg };
  }
  if (target) {
    const cmp = target.canvases && target.canvases.length
      ? compareCanvas(target.canvases[target.canvases.length - 1], run.final.canvases[run.final.canvases.length - 1])
      : compareTurtle(target, { lines: run.final.lines, events: run.events }, lang);
    if (!cmp.ok) return { ok: false, title: 'Bilden är inte som målbilden än.', run, target, detail: cmp.msg };
  }
  let detail = ex.explain || '';
  if (ex.par) {
    const n = codeLines(code, lang);
    detail += n <= ex.par ? ` Extrastjärna! Du klarade det på ${n} rader (högst ${ex.par}).` : ` Vill du ha en extrastjärna? Det går att klara på högst ${ex.par} rader, du använde ${n}. Det är frivilligt.`;
  }
  return { ok: true, title: 'Rätt!', detail: detail.trim(), tests, run, target, star: !!(ex.par && codeLines(code, lang) <= ex.par) };
}

// Ordningspussel: raderna ska stå i rätt ordning, och inga felaktiga rader får vara med.
// Alternativa ordningar som också är rätt kan anges i `alt`.
export function orderLines(ex) {
  return [...ex.lines, ...(ex.distractors || []).map((d) => d.line)];
}

function hashStr(s) {
  let x = 2166136261;
  for (const c of s) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619); }
  return x >>> 0;
}

// Blandar deterministiskt utifrån en nyckel. Om resultatet råkar börja med hela den
// rätta ordningen roteras listan ett steg.
export function shuffled(lines, key, correct) {
  const a = [...lines];
  let x = hashStr(key) || 1;
  for (let i = a.length - 1; i > 0; i--) {
    x ^= x << 13; x ^= x >>> 17; x ^= x << 5; x >>>= 0;
    const j = x % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  const startsRight = () => correct.every((l, i) => a[i] === l);
  if (a.length > 1 && startsRight()) a.push(a.shift());
  if (a.length > 1 && startsRight()) a.reverse();
  return a;
}

function gradeOrder(ex, answer) {
  if (!answer.length) return { ok: false, title: 'Välj rader först.', detail: 'Tryck på raderna i den ordning de ska stå.' };
  const same = (want) => want.length === answer.length && want.every((l, i) => l === answer[i]);
  if ([ex.lines, ...(ex.alt || [])].some(same)) return { ok: true, title: 'Rätt ordning!', detail: ex.explain };
  const bad = (ex.distractors || []).find((d) => answer.includes(d.line));
  if (bad) return { ok: false, title: 'En rad hör inte hemma här.', detail: bad.why || ex.hint };
  if (answer.length < ex.lines.length) return { ok: false, title: `Det saknas ${ex.lines.length - answer.length === 1 ? 'en rad' : `${ex.lines.length - answer.length} rader`}.`, detail: ex.hint };
  let k = 0;
  while (k < answer.length && answer[k] === ex.lines[k]) k++;
  return { ok: false, title: k ? `De ${k === 1 ? 'första raden stämmer' : `första ${k} raderna stämmer`}, men inte resten.` : 'Ordningen stämmer inte än.', detail: ex.hint };
}

// Körningar med indata (input/ReadLine) och slump. Varje körning får sin egen
// indata och sitt eget frö. outputRe används när utskriften beror på slumpen.
function runsOf(ex) {
  if (ex.runs) return ex.runs;
  if (ex.input !== undefined) return [{ input: ex.input, output: ex.output }];
  return null;
}

function checkSource(ex, code, lang, run) {
  const plain = stripComments(code, lang);
  for (const r of ex.require || []) {
    if (!new RegExp(r.re, r.flags || '').test(plain)) return { ok: false, title: 'Nästan, men en del saknas.', detail: r.msg, run };
  }
  for (const r of ex.forbid || []) {
    if (new RegExp(r.re, r.flags || '').test(plain)) return { ok: false, title: 'Lös det på ett annat sätt.', detail: r.msg, run };
  }
  return null;
}

async function gradeRuns(ex, code, lang, runner, runs) {
  const tests = [];
  let last = null;
  for (const [k, rc] of runs.entries()) {
    const input = rc.input ?? '';
    const shown = input ? input.replace(/\n$/, '').split('\n').join(', ') : '';
    const label = rc.label || (shown ? `Körning ${k + 1} med indata: ${shown}` : `Körning ${k + 1}`);
    for (let rep = 0; rep < (rc.repeat || 1); rep++) {
      const run = await runner(lang, code, [], { input, seed: (rc.seed ?? 1000 * (k + 1)) + rep });
      last = run;
      if (run.error) {
        if (run.error.phase === 'compile' || !tests.length) return { ok: false, title: 'Koden gav ett fel.', error: run.error, run, detail: run.error.hint === 'input' ? `${label}. ${ex.hint || ''}`.trim() : ex.hint };
        tests.push({ label, ok: false, expected: rc.output ?? 'en utskrift utan fel', got: `${run.error.kind}: ${run.error.message}`, kind: 'output' });
        break;
      }
      const got = normalizeOutput(run.output);
      if (rc.outputRe !== undefined) {
        const ok = new RegExp(`^(?:${rc.outputRe})$`).test(got);
        if (!ok || rep === (rc.repeat || 1) - 1) tests.push({ label, ok, expected: rc.expectText || 'en utskrift som följer uppgiften', got, kind: 'output' });
        if (!ok) break;
      } else {
        const want = normalizeOutput(rc.output);
        tests.push({ label, ok: got === want, expected: want, got, kind: 'output' });
        break;
      }
    }
  }
  const src = checkSource(ex, code, lang, last);
  if (src) return src;
  const failed = tests.filter((t) => !t.ok);
  if (!failed.length) return { ok: true, title: 'Alla kontroller gick igenom!', detail: ex.explain, tests, run: last };
  return { ok: false, title: `${tests.length - failed.length} av ${tests.length} kontroller klara.`, detail: ex.hint, tests, run: last };
}

async function gradeCode(ex, code, lang, runner) {
  if (!code.trim()) return { ok: false, title: 'Skriv lite kod först.', detail: ex.hint };
  const runs = runsOf(ex);
  if (runs) return gradeRuns(ex, code, lang, runner, runs);
  const calls = (ex.tests || []).map((t) => ({ fn: t.fn, args: t.args }));
  const run = await runner(lang, code, calls);
  if (run.error && (run.error.phase === 'compile' || !calls.length || ex.output !== undefined)) {
    return { ok: false, title: 'Koden gav ett fel.', error: run.error, run, detail: ex.hint };
  }
  const src = checkSource(ex, code, lang, run);
  if (src) return src;
  const tests = [];
  if (ex.output !== undefined) {
    const got = normalizeOutput(run.output);
    const want = normalizeOutput(ex.output);
    tests.push({ label: 'Utskrift', ok: got === want, expected: want, got, kind: 'output' });
  }
  (ex.tests || []).forEach((t, i) => {
    const r = run.calls[i] || {};
    const label = t.label || `${t.fn}(${t.args.map((a) => show(a, lang)).join(', ')})`;
    if (r.error) {
      tests.push({ label, ok: false, expected: show(t.expect, lang), got: `${r.error.kind}: ${r.error.message}`, error: r.error, edge: t.edge });
      return;
    }
    let ok = deepEq(r.value, t.expect);
    if (ok && t.expectOut !== undefined) ok = normalizeOutput(r.output) === normalizeOutput(t.expectOut);
    if (ok && typeof t.expect === 'boolean' && typeof r.value !== 'boolean') ok = false;
    tests.push({ label, ok, expected: t.expectOut !== undefined ? t.expectOut : show(t.expect, lang), got: t.expectOut !== undefined ? r.output : (r.value === undefined || r.value === null) && t.expect !== null ? `${show(r.value, lang)} (returnerar funktionen något?)` : show(r.value, lang), edge: t.edge });
  });
  const failed = tests.filter((t) => !t.ok);
  if (!failed.length) return { ok: true, title: 'Alla kontroller gick igenom!', detail: ex.explain, tests, run };
  const f = failed[0];
  let detail = ex.hint;
  if (f.edge) detail = `Ett gränsfall missas: ${f.edge}. ${ex.hint || ''}`.trim();
  return { ok: false, title: `${tests.length - failed.length} av ${tests.length} kontroller klara.`, detail, tests, run };
}
