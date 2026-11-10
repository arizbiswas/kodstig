// Hela läroplanen på en gång, med alla texter och övningar. Används av testerna och
// av skriptet som bygger innehållsförteckningen. Appen använder index.js, som
// laddar ett spår i taget.
import csharp from './csharp.js';
import python from './python.js';
import web from './web.js';
import git from './git.js';
import csharpExtra from './csharp-extra.js';
import pythonExtra from './python-extra.js';
import webExtra from './web-extra.js';
import csharpOrder from './csharp-order.js';
import pythonOrder from './python-order.js';
import webOrder from './web-order.js';
import { TIER_NAMES, stairOrder, lessonBody, decorate } from './assemble.js';

export { TIER_NAMES, stairOrder };

// Extraövningar läggs sist i sina lektioner, så index för gamla övningar ändras inte.
const EXTRA = { ...csharpExtra, ...pythonExtra, ...webExtra };
// Förutsägelsefrågor och ordningspussel (fas 3), också sist i lektionerna.
const ORDER = { ...csharpOrder, ...pythonOrder, ...webOrder };

// Kopior, så att källfilerna aldrig ändras (spårens innehållsfiler läser samma objekt).
export const TRACKS = [csharp, python, web, git].map((t) => ({
  ...t,
  chapters: t.chapters.map((ch) => ({ ...ch, lessons: ch.lessons.map((l) => ({ ...l, ...lessonBody(l, EXTRA, ORDER) })) })),
}));
export const TRACK_IDS = TRACKS.map((t) => t.id);

export const { LESSONS, LESSON_BY_ID } = decorate(TRACKS);

export const trackById = (id) => TRACKS.find((t) => t.id === id) || TRACKS[0];
export const lessonsOfTrack = (id) => LESSONS.filter((l) => l.trackId === id);

export const STATS = {
  lessons: LESSONS.length,
  exercises: LESSONS.reduce((n, l) => n + l.exercises.length, 0),
  projects: LESSONS.filter((l) => l.tier === 5).length,
};
