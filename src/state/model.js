// Kontoprofilens datamodell och sammanslagning. Sammanslagningen är byggd så
// att den alltid är säker att köra igen: avklarade lektioner och bonusar är
// mängder med nyckel, så två enheter kan aldrig ge dubbla XP-belöningar.

export const MODEL_VERSION = 1;
export const PREF_DEFAULTS = { name: '', track: 'python', goal: 10, sound: true };
const MAX_DRAFT = 20000;

export function emptyProfile(epoch = 0, prefs = {}) {
  return {
    v: MODEL_VERSION,
    epoch,
    prefs: { ...prefs },
    completed: {},
    lessons: {},
    lab: {},
    activity: {},
    bonuses: {},
    review: {},
    levelSeen: 1,
  };
}

export function clone(p) { return JSON.parse(JSON.stringify(p)); }

export function pref(p, key) {
  const e = p.prefs && p.prefs[key];
  return e && e.v !== undefined ? e.v : PREF_DEFAULTS[key];
}

export function normalize(raw) {
  const p = emptyProfile();
  if (!raw || typeof raw !== 'object') return p;
  const obj = (x) => (x && typeof x === 'object' && !Array.isArray(x) ? x : {});
  p.epoch = Number.isInteger(raw.epoch) ? raw.epoch : 0;
  p.prefs = obj(raw.prefs);
  p.completed = obj(raw.completed);
  p.lessons = obj(raw.lessons);
  p.lab = obj(raw.lab);
  p.activity = obj(raw.activity);
  p.bonuses = obj(raw.bonuses);
  p.review = obj(raw.review);
  p.levelSeen = Number.isInteger(raw.levelSeen) ? raw.levelSeen : 1;
  return p;
}

const newer = (a, b) => ((b?.ts || 0) > (a?.ts || 0) ? b : a);
const earlier = (a, b) => {
  if (!a) return b;
  if (!b) return a;
  return (b.at || '') < (a.at || '') ? b : a;
};

/** Slår ihop två profiler med samma epoch. Resultatet är oberoende av ordningen. */
export function merge(a, b) {
  a = normalize(a);
  b = normalize(b);
  const out = emptyProfile(Math.max(a.epoch, b.epoch));
  for (const k of new Set([...Object.keys(a.prefs), ...Object.keys(b.prefs)])) out.prefs[k] = newer(a.prefs[k], b.prefs[k]);
  for (const k of new Set([...Object.keys(a.completed), ...Object.keys(b.completed)])) out.completed[k] = earlier(a.completed[k], b.completed[k]);
  for (const k of new Set([...Object.keys(a.bonuses), ...Object.keys(b.bonuses)])) out.bonuses[k] = earlier(a.bonuses[k], b.bonuses[k]);
  for (const k of new Set([...Object.keys(a.lessons), ...Object.keys(b.lessons)])) out.lessons[k] = newer(a.lessons[k], b.lessons[k]);
  for (const k of new Set([...Object.keys(a.lab), ...Object.keys(b.lab)])) out.lab[k] = newer(a.lab[k], b.lab[k]);
  for (const k of new Set([...Object.keys(a.review), ...Object.keys(b.review)])) out.review[k] = newer(a.review[k], b.review[k]);
  // Aktivitet sparas per enhet och dag; samma enhet tar max, olika enheter summeras vid visning.
  for (const dev of new Set([...Object.keys(a.activity), ...Object.keys(b.activity)])) {
    const da = a.activity[dev] || {}, db = b.activity[dev] || {};
    out.activity[dev] = {};
    for (const day of new Set([...Object.keys(da), ...Object.keys(db)])) out.activity[dev][day] = Math.max(da[day] || 0, db[day] || 0);
  }
  out.levelSeen = Math.max(a.levelSeen, b.levelSeen);
  return out;
}

// ---------- Ändringar (muterar en klon) ----------
export function setPref(p, key, value, ts = Date.now()) {
  p.prefs[key] = { v: value, ts };
  return p;
}

export function saveLessonState(p, lessonId, state, ts = Date.now()) {
  const answers = {};
  for (const [k, v] of Object.entries(state.answers || {})) {
    answers[k] = typeof v === 'string' ? v.slice(0, MAX_DRAFT) : v;
  }
  p.lessons[lessonId] = { step: state.step || 0, answers, solved: state.solved || {}, missed: state.missed || [], ts };
  return p;
}

/** Markerar en lektion som avklarad. Returnerar true bara första gången. */
export function completeLesson(p, lessonId, at = new Date().toISOString()) {
  if (p.completed[lessonId]) return false;
  p.completed[lessonId] = { at };
  return true;
}

/** Hämtar en bonus. Returnerar true bara om nyckeln inte redan fanns. */
export function claimBonus(p, key, data = {}, at = new Date().toISOString()) {
  if (p.bonuses[key]) return false;
  p.bonuses[key] = { ...data, at };
  return true;
}

export function addActivity(p, deviceId, day, seconds) {
  const dev = (p.activity[deviceId] ||= {});
  dev[day] = Math.min(24 * 3600, (dev[day] || 0) + seconds);
  return p;
}

export function activityByDay(p) {
  const out = {};
  for (const dev of Object.values(p.activity || {})) for (const [day, s] of Object.entries(dev)) out[day] = (out[day] || 0) + s;
  return out;
}

export function setLab(p, lang, code, ts = Date.now()) {
  p.lab[lang] = { code: String(code).slice(0, MAX_DRAFT), ts };
  return p;
}

export function hasProgress(p) {
  return Object.keys(p.completed || {}).length > 0 || Object.keys(p.lessons || {}).length > 0 || Object.keys(p.bonuses || {}).length > 0 || Object.keys(p.review || {}).length > 0;
}

/** Ny profil efter nollställning: framsteg bort, inställningar kvar. */
export function resetProfile(p) {
  return emptyProfile(p.epoch + 1, clone(p.prefs));
}
