// En förlåtande svit. En dag räknas när dagsmålet nåddes, en lektion blev klar
// eller dagens repetition eller utmaning gjordes. Upp till två missade dagar per
// vecka (måndag till söndag) fryses automatiskt, så sviten överlever en sjukdag
// eller en helg utan nät.
import { activityByDay, pref } from './model.js';
import { today } from './progression.js';

export const FREEZES_PER_WEEK = 2;
const DAY_NAMES = ['sön', 'mån', 'tis', 'ons', 'tor', 'fre', 'lör'];

function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
const weekOf = (d) => today(addDays(d, -((d.getDay() + 6) % 7)));

export function streakInfo(profile, now = new Date()) {
  const goal = pref(profile, 'goal') * 60;
  const act = activityByDay(profile);
  const doneDays = new Set(Object.values(profile.completed || {}).map((c) => today(new Date(c.at))));
  const bonusDays = new Set(Object.keys(profile.bonuses || {}).filter((k) => /^(review|daily):/.test(k)).map((k) => k.split(':')[1]));
  const counts = (d) => (act[d] || 0) >= goal || doneDays.has(d) || bonusDays.has(d);
  const activeDays = [...Object.keys(act).filter((d) => act[d] > 0), ...doneDays, ...bonusDays].sort();
  const first = activeDays[0] || null;
  const t = today(now);

  let n = 0;
  const frozen = new Set();
  const used = {};
  let pending = [];
  let cursor = counts(t) ? now : addDays(now, -1);
  for (let guard = 0; first && guard < 3650; guard++) {
    const key = today(cursor);
    if (key < first) break;
    if (counts(key)) {
      n++;
      pending.forEach((k) => frozen.add(k));
      pending = [];
    } else {
      const w = weekOf(cursor);
      if ((used[w] || 0) >= FREEZES_PER_WEEK) break;
      used[w] = (used[w] || 0) + 1;
      pending.push(key);
    }
    cursor = addDays(cursor, -1);
  }
  // Frysningar räknas bara när de faktiskt binder ihop sviten.
  const thisWeek = weekOf(now);
  const usedThisWeek = [...frozen].filter((k) => weekOf(new Date(`${k}T12:00:00`)) === thisWeek).length;

  const week = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(now, i - 6);
    const key = today(d);
    return { key, name: DAY_NAMES[d.getDay()], ok: counts(key), frozen: frozen.has(key), secs: act[key] || 0, isToday: key === t };
  });
  return {
    streak: n,
    todayDone: counts(t),
    todaySecs: act[t] || 0,
    goalSecs: goal,
    week,
    everActive: !!first,
    freezesLeft: Math.max(0, FREEZES_PER_WEEK - usedThisWeek),
  };
}
