import test from 'node:test';
import assert from 'node:assert/strict';
import { TRACKS, LESSONS, STATS } from '../../src/content/full.js';
import { GLOSSARY } from '../../src/content/glossary.js';
import { runCSharp } from '../../src/engine/csharp.js';
import { runPython } from '../../src/engine/python.js';
import { grade, fillCode, normalizeOutput, orderLines, shuffled } from '../../src/engine/grade.js';
import { runPixel } from '../../src/engine/pixel/run.js';

const pixelRunner = async (lang, code, level) => runPixel(lang, code, { level, runners: { python: runPython, csharp: runCSharp } });
const isPixelEx = (les, ex) => les.pixel && (ex.type === 'world' || ex.level || ex.pixel);

const runner = async (lang, code, calls, opts = {}) => (lang === 'csharp' ? runCSharp : runPython)(code, { calls, ...opts });

test('omfattning: 183 lektioner, 1181 övningar, 24 miniprojekt', () => {
  assert.deepEqual(STATS, { lessons: 183, exercises: 1181, projects: 24 });
  const per = Object.fromEntries(TRACKS.map((t) => [t.id, [LESSONS.filter((l) => l.trackId === t.id).length, LESSONS.filter((l) => l.trackId === t.id).reduce((n, l) => n + l.exercises.length, 0)]]));
  assert.deepEqual(per, { csharp: [65, 419], python: [59, 368], web: [44, 282], git: [15, 112] });
  assert.deepEqual(Object.fromEntries(TRACKS.map((t) => [t.id, t.chapters.length])), { csharp: 14, python: 13, web: 11, git: 3 });
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
      if (les.pixel) {
        // Pixelvärlden: allt körs i världen. Lösningar ska klara målen, startkoden inte.
        const ex0 = await pixelRunner(track.lang, les.example, les.level || null);
        assert.equal(ex0.error, null, `${les.id}: exemplet ger fel ${ex0.error && ex0.error.message}`);
        for (const [i, ex] of les.exercises.entries()) {
          const tag = `${les.id}#${i}`;
          assert.ok(isPixelEx(les, ex), `${tag}: övningen saknar bana eller pixel: true`);
          const met = (r) => !r.error && r.goals.every((g) => g.met);
          if (ex.type === 'choice') assert.equal((await pixelRunner(track.lang, ex.code, ex.level || null)).error, null, `${tag}: koden ger fel`);
          if (ex.type === 'fill') for (const [bi, acc] of ex.answers.entries()) for (const a of acc) {
            const ans = ex.answers.map((x) => x[0]); ans[bi] = a;
            assert.ok(met(await pixelRunner(track.lang, fillCode(ex.code, ans), ex.level || null)), `${tag}: luckan "${a}" klarar inte banan`);
          }
          if (ex.type === 'order') for (const lines of [ex.lines, ...(ex.alt || [])]) assert.ok(met(await pixelRunner(track.lang, lines.join('\n'), ex.level || null)), `${tag}: rätt ordning klarar inte banan`);
          if (ex.type === 'world') {
            const g = await grade(ex, ex.solution, { lang: track.lang, pixelRunner });
            assert.ok(g.ok, `${tag}: lösningen godkänns inte: ${g.title} ${g.detail || ''} ${g.error?.message || ''}`);
            assert.ok(!(await grade(ex, ex.starter || '', { lang: track.lang, pixelRunner })).ok, `${tag}: startkoden godkänns direkt`);
          }
        }
        continue;
      }
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

test('innehållsförteckningen är aktuell och de lata spåren ger samma läroplan', async () => {
  const { manifestSource } = await import('../../scripts/content-manifest.mjs');
  const { readFileSync } = await import('node:fs');
  const onDisk = readFileSync(new URL('../../src/content/manifest.js', import.meta.url), 'utf8');
  assert.ok(onDisk === manifestSource(), 'src/content/manifest.js är inaktuell. Kör npm run content.');
  const lazy = await import('../../src/content/index.js');
  assert.deepEqual(lazy.STATS, STATS);
  assert.equal(lazy.trackLoaded('python'), false, 'inget spår är laddat från början');
  assert.equal(lazy.LESSON_BY_ID.get('py-print').exercises, undefined);
  await lazy.loadAllTracks();
  assert.equal(lazy.LESSONS.length, LESSONS.length);
  for (const [i, l] of LESSONS.entries()) {
    const z = lazy.LESSONS[i];
    for (const k of ['id', 'title', 'tier', 'trackId', 'chapterId', 'lang', 'order', 'numberInChapter', 'chapterIndex', 'text', 'example', 'exampleInput']) assert.deepEqual(z[k], l[k], `${l.id}.${k}`);
    assert.deepEqual(z.requires, l.requires, `${l.id}.requires`);
    assert.deepEqual(z.sequence, l.sequence, `${l.id}.sequence`);
    assert.equal(JSON.stringify(z.exercises, (k, v) => (v instanceof RegExp ? String(v) : v)), JSON.stringify(l.exercises, (k, v) => (v instanceof RegExp ? String(v) : v)), `${l.id}.exercises`);
    assert.equal(z.exerciseCount, l.exercises.length);
  }
});
