// Banans mål kontrolleras mot världens slutläge, inte mot koden.
import { ITEM_SV, DIR_SV } from './core.js';

const plural = (item, n) => (item === 'key' ? (n === 1 ? 'nyckel' : 'nycklar') : item === 'gem' ? (n === 1 ? 'ädelsten' : 'ädelstenar') : 'mynt');

/** Ett mål som text och en kontroll: { text, test(world) }. */
export function goalOf(g) {
  if (g === 'goal') return { text: 'Hjälten står på flaggan', test: (w) => w.tileAt(w.hero.x, w.hero.y) === 'goal' };
  if (g === 'items') return { text: 'Alla saker är upplockade', test: (w) => w.items.length === 0 };
  if (g === 'doors') return { text: 'Alla dörrar är öppna', test: (w) => w.tiles.every((r) => !r.includes('door')) };
  if (g && g.collect) {
    const n = g.count ?? 1;
    return { text: g.text || `Hjälten har ${n} ${plural(g.collect, n)} i ryggsäcken`, test: (w) => w.hero.bag.filter((i) => i === g.collect).length >= n };
  }
  if (g && g.say !== undefined) return { text: g.text || `Hjälten säger "${g.say}"`, test: (w) => w.said.includes(String(g.say)) };
  if (g && g.at) return { text: g.text || `Hjälten står på (${g.at[0]}, ${g.at[1]})`, test: (w) => w.hero.x === g.at[0] && w.hero.y === g.at[1] };
  if (g && g.facing) return { text: g.text || `Hjälten tittar ${DIR_SV[g.facing]}`, test: (w) => w.hero.dir === g.facing };
  if (g && g.drop) return { text: g.text || `En ${ITEM_SV[g.drop]} ligger på (${g.x}, ${g.y})`, test: (w) => w.items.some((i) => i.item === g.drop && i.x === g.x && i.y === g.y) };
  throw new Error(`Okänt mål: ${JSON.stringify(g)}`);
}

export function checkGoals(level, world) {
  return (level.goals || ['goal']).map((g) => {
    const { text, test } = goalOf(g);
    return { text, met: !!world && test(world) };
  });
}
