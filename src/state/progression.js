// XP, nivåer och bonusar. Allt räknas fram ur profilens avklarade lektioner
// och hämtade bonusar, så samma händelse kan aldrig ge XP två gånger.
import { LESSON_BY_ID, LESSONS, TIER_NAMES } from '../content/index.js';

export const TIER_XP = { 1: 30, 2: 45, 3: 65, 4: 85, 5: 140 };
export const REVIEW_XP = 10;
export const DAILY_XP = 10;

export const LEVELS = [
  { level: 1, title: 'Kodnyfiken', xp: 0, req: null, reqText: 'Startnivå' },
  { level: 2, title: 'Nybörjare', xp: 120, req: { total: 3 }, reqText: '3 avklarade lektioner' },
  { level: 3, title: 'Kodlärling', xp: 360, req: { total: 8 }, reqText: '8 avklarade lektioner' },
  { level: 4, title: 'Kodstudent', xp: 780, req: { total: 18 }, reqText: '18 avklarade lektioner' },
  { level: 5, title: 'Kodutforskare', xp: 1380, req: { t2: 5, t3: 1 }, reqText: '5 fördjupningar och 1 lektion i funktioner/struktur' },
  { level: 6, title: 'Övande problemlösare', xp: 2160, req: { t3: 6, applied: 1 }, reqText: '6 lektioner i funktioner/struktur och 1 tillämpning eller miniprojekt' },
  { level: 7, title: 'Projektlärling', xp: 3060, req: { applied: 5, t5: 1 }, reqText: '5 tillämpningar/miniprojekt, varav minst 1 miniprojekt' },
  { level: 8, title: 'Målmedveten kodare', xp: 4020, req: { applied: 10, t5: 4 }, reqText: '10 tillämpningar/miniprojekt, varav minst 4 miniprojekt' },
  { level: 9, title: 'Självgående kodare', xp: 5000, req: { applied: 20, pro: 10 }, reqText: '20 tillämpningar/miniprojekt och 10 fortsättningslektioner' },
  { level: 10, title: 'Strukturerad problemlösare', xp: 6000, req: { pro: 22, t5: 9 }, reqText: '22 fortsättningslektioner och 9 miniprojekt' },
  { level: 11, title: 'Projektbyggare', xp: 7200, req: { pro: 36, t5: 12 }, reqText: '36 fortsättningslektioner och 12 miniprojekt' },
  { level: 12, title: 'Kodstig-examen', xp: 8400, req: { pro: 50, t5: 15 }, reqText: '50 fortsättningslektioner och 15 miniprojekt, alltså nästan hela Kodstig' },
];

// Fortsättningskapitlen (efter de sex grundkapitlen i varje spår).
export const BASE_CHAPTERS = 6;

export function today(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
export function dayOf(iso) { return iso ? today(new Date(iso)) : null; }

// Kunskapsunderlag: varje lektion räknas en gång, i sin egen kategori.
export function knowledge(profile) {
  const k = { total: 0, t1: 0, t2: 0, t3: 0, t4: 0, t5: 0, applied: 0, pro: 0 };
  for (const id of Object.keys(profile.completed || {})) {
    const l = LESSON_BY_ID.get(id);
    if (!l) continue;
    k.total++;
    k[`t${l.tier}`]++;
    if (l.tier >= 4) k.applied++;
    if (l.chapterIndex >= BASE_CHAPTERS) k.pro++;
  }
  return k;
}

export function xpOf(profile) {
  let lessonXp = 0;
  for (const id of Object.keys(profile.completed || {})) {
    const l = LESSON_BY_ID.get(id);
    if (l) lessonXp += TIER_XP[l.tier];
  }
  let bonusXp = 0;
  for (const key of Object.keys(profile.bonuses || {})) {
    if (key.startsWith('review:')) bonusXp += REVIEW_XP;
    else if (key.startsWith('daily:')) bonusXp += DAILY_XP;
  }
  return { lessonXp, bonusXp, total: lessonXp + bonusXp };
}

const REQ_LABEL = {
  total: (n) => `${n} ${n === 1 ? 'avklarad lektion' : 'avklarade lektioner'}`,
  t2: (n) => `${n} ${n === 1 ? 'fördjupning' : 'fördjupningar'}`,
  t3: (n) => `${n} ${n === 1 ? 'lektion' : 'lektioner'} i funktioner/struktur`,
  t5: (n) => `${n} ${n === 1 ? 'miniprojekt' : 'miniprojekt'}`,
  applied: (n) => `${n} ${n === 1 ? 'tillämpning eller miniprojekt' : 'tillämpningar/miniprojekt'}`,
  pro: (n) => `${n} ${n === 1 ? 'fortsättningslektion' : 'fortsättningslektioner'}`,
};
const REQ_TIERS = { total: [1, 2, 3, 4, 5], t2: [2], t3: [3], t5: [5], applied: [4, 5] };

export function missingReqs(level, k) {
  const out = [];
  for (const [key, need] of Object.entries(level.req || {})) {
    const have = k[key] || 0;
    if (have < need) out.push({ key, need, have, missing: need - have, text: REQ_LABEL[key](need - have) });
  }
  return out;
}

export function levelInfo(profile) {
  const xp = xpOf(profile);
  const k = knowledge(profile);
  let current = LEVELS[0];
  for (const L of LEVELS) {
    if (xp.total >= L.xp && missingReqs(L, k).length === 0) current = L;
    else break; // tidigare nivåers krav måste också vara uppfyllda
  }
  const next = LEVELS.find((L) => L.level === current.level + 1) || null;
  let nextInfo = null;
  if (next) {
    const reqs = missingReqs(next, k);
    nextInfo = {
      ...next,
      xpMissing: Math.max(0, next.xp - xp.total),
      reqs,
      progress: Math.min(1, (xp.total - current.xp) / (next.xp - current.xp)),
    };
  }
  return { level: current.level, title: current.title, xp: xp.total, xpParts: xp, knowledge: k, current, next: nextInfo };
}

// Lektioner som är upplåsta men inte avklarade, i läroplanens ordning.
// Ett krav räknas som uppfyllt om lektionen är klar eller om dess kapitel är uttestat.
const met = (profile, id) => !!(profile.completed?.[id] || profile.skipped?.[LESSON_BY_ID.get(id)?.chapterId]);
export function isUnlocked(profile, lesson) {
  return lesson.requires.every((r) => met(profile, r));
}
export function availableLessons(profile, trackId) {
  return LESSONS.filter((l) => (!trackId || l.trackId === trackId) && !profile.completed?.[l.id] && !profile.skipped?.[l.chapterId] && isUnlocked(profile, l));
}

// Ett konkret nästa steg när XP räcker men kunskapskrav saknas.
export function nextStepAdvice(profile, preferredTrack) {
  const info = levelInfo(profile);
  if (!info.next) return null;
  const { reqs, xpMissing } = info.next;
  if (!reqs.length) return null;
  const wanted = (l) => reqs.some((r) => (r.key === 'pro' ? l.chapterIndex >= BASE_CHAPTERS : REQ_TIERS[r.key].includes(l.tier)));
  const avail = availableLessons(profile);
  const pick = avail.find((l) => wanted(l) && l.trackId === preferredTrack) || avail.find(wanted);
  return {
    enoughXp: xpMissing === 0,
    reqs,
    lesson: pick || null,
    path: pick ? null : (avail.find((l) => l.trackId === preferredTrack) || avail[0] || null),
  };
}

export function canClaimDaily(profile, now = new Date()) {
  const key = `daily:${today(now)}`;
  return profile.bonuses?.[key] ? { ok: false, key } : { ok: true, key };
}

export function trackProgress(profile, trackId) {
  const ls = LESSONS.filter((l) => l.trackId === trackId);
  const done = ls.filter((l) => profile.completed?.[l.id]).length;
  return { done, total: ls.length };
}

export { TIER_NAMES };
