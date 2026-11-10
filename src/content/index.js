// Läroplanen för appen. Innehållsförteckningen (spår, kapitel, lektionstitlar, krav
// och antal övningar) finns direkt. Texter, exempel och övningar laddas per spår
// med loadTrack() när de behövs, så att appen startar snabbare.
import MANIFEST from './manifest.js';
import { TIER_NAMES, stairOrder, decorate } from './assemble.js';

export { TIER_NAMES, stairOrder };

export const TRACKS = MANIFEST;
export const TRACK_IDS = TRACKS.map((t) => t.id);
export const { LESSONS, LESSON_BY_ID } = decorate(TRACKS, { keepRequires: true });

export const trackById = (id) => TRACKS.find((t) => t.id === id) || TRACKS[0];
export const lessonsOfTrack = (id) => LESSONS.filter((l) => l.trackId === id);

export const STATS = {
  lessons: LESSONS.length,
  exercises: LESSONS.reduce((n, l) => n + l.exerciseCount, 0),
  projects: LESSONS.filter((l) => l.tier === 5).length,
};

// Varje spår är en egen fil i bygget.
const LOADERS = {
  csharp: () => import('./body-csharp.js'),
  python: () => import('./body-python.js'),
  web: () => import('./body-web.js'),
  git: () => import('./body-git.js'),
};
const pending = new Map();
const ready = new Set();

export const trackLoaded = (id) => ready.has(id);

/** Laddar texter och övningar för ett spår och lägger dem på lektionerna. */
export function loadTrack(id) {
  if (!LOADERS[id]) return Promise.resolve();
  if (!pending.has(id)) {
    pending.set(id, LOADERS[id]().then((m) => {
      for (const l of LESSONS) if (l.trackId === id && m.default[l.id]) Object.assign(l, m.default[l.id]);
      ready.add(id);
    }).catch((e) => { pending.delete(id); throw e; }));
  }
  return pending.get(id);
}
export const loadTracks = (ids) => Promise.all([...new Set(ids)].filter(Boolean).map(loadTrack));
export const loadAllTracks = () => loadTracks(TRACK_IDS);
