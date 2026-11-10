// Kör elevens kod i Pixelvärlden. En bana kan ha flera startvärldar (level.worlds),
// så att det inte går att klara den med en väg som bara passar en karta. Koden
// körs en gång per värld. Den första visas, och målen räknas som klara bara om
// de är klara i alla världar.
import { PixelHost } from './core.js';
import { checkGoals } from './goals.js';

export function levelWorlds(level) {
  if (!level || !level.map) return [level || null];
  return [level, ...(level.worlds || []).map((map) => ({ ...level, map, worlds: undefined }))];
}

export function runPixel(lang, code, { level = null, input, seed, runners } = {}) {
  const run = runners[lang];
  const runs = levelWorlds(level).map((lv) => {
    const host = new PixelHost(lv);
    const r = run(code, { host, input, seed });
    r.events = host.events;
    r.final = host.snapshot();
    r.goals = lv && lv.map ? checkGoals(lv, host.world) : [];
    return r;
  });
  const main = runs[0];
  main.worlds = runs.length;
  if (runs.length > 1) {
    const bad = runs.findIndex((r, i) => i > 0 && (r.error || r.goals.some((g) => !g.met)));
    if (bad > 0) {
      const r = runs[bad];
      main.otherWorld = { index: bad + 1, error: r.error, goals: r.goals };
      main.goals = main.goals.map((g, i) => ({ ...g, met: g.met && runs.every((x) => x.goals[i].met) }));
    }
  }
  return main;
}
