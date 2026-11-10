// Bygger src/content/manifest.js: läroplanens innehållsförteckning utan texter och
// övningar. Appen laddar den direkt och hämtar ett spårs lektioner först när de behövs.
// Körs automatiskt före npm run build. Ett enhetstest kontrollerar att filen är aktuell.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { TRACKS } from '../src/content/full.js';
import { BODY_KEYS, fitsReview } from '../src/content/assemble.js';

// Fält som decorate() räknar fram igen i appen, och som därför inte sparas.
const DERIVED = new Set(['trackId', 'chapterId', 'lang', 'order', 'numberInChapter', 'chapterIndex', 'index', 'sequence']);

export function buildManifest() {
  const pick = (o, skip, derived = DERIVED) => Object.fromEntries(Object.entries(o).filter(([k, v]) => !skip.has(k) && !derived.has(k) && v !== undefined));
  return TRACKS.map((t) => ({
    ...pick(t, new Set(['chapters']), new Set()),
    chapters: t.chapters.map((ch) => ({
      ...pick(ch, new Set(['lessons'])),
      lessons: ch.lessons.map((l) => ({
        ...pick(l, new Set(BODY_KEYS)),
        exerciseCount: l.exercises.length,
        reviewable: l.exercises.some((ex) => fitsReview(ex, l)),
      })),
    })),
  }));
}

export function manifestSource() {
  return `// Skapad av scripts/content-manifest.mjs. Ändra inte för hand, kör npm run content.\nexport default ${JSON.stringify(buildManifest(), null, 1)};\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = new URL('../src/content/manifest.js', import.meta.url);
  writeFileSync(out, manifestSource());
  console.log('Skrev src/content/manifest.js');
}
