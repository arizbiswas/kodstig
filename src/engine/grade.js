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
export async function grade(ex, answer, { lang, runner, webChecker }) {
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
    default:
      return { ok: false, title: 'Okänd övningstyp.' };
  }
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

async function gradeCode(ex, code, lang, runner) {
  if (!code.trim()) return { ok: false, title: 'Skriv lite kod först.', detail: ex.hint };
  const calls = (ex.tests || []).map((t) => ({ fn: t.fn, args: t.args }));
  const run = await runner(lang, code, calls);
  if (run.error && (run.error.phase === 'compile' || !calls.length || ex.output !== undefined)) {
    return { ok: false, title: 'Koden gav ett fel.', error: run.error, run, detail: ex.hint };
  }
  const plain = stripComments(code, lang);
  for (const r of ex.require || []) {
    if (!new RegExp(r.re, r.flags || '').test(plain)) {
      return { ok: false, title: 'Nästan, men en del saknas.', detail: r.msg, run };
    }
  }
  for (const r of ex.forbid || []) {
    if (new RegExp(r.re, r.flags || '').test(plain)) {
      return { ok: false, title: 'Lös det på ett annat sätt.', detail: r.msg, run };
    }
  }
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
