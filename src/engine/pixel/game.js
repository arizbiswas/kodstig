// Spel i Pixelvärlden, med samma modell som Pygame Zero: eleven skriver update()
// och draw(), och Kodstig anropar dem ungefär 30 gånger per sekund. Ingen egen
// while True. Skärmen är 20 × 15 rutor, och positioner får vara decimaltal.
import { CodeError } from '../errors.js';
import { PixelHost, parseColor } from './core.js';
import { SPRITES_AVAILABLE } from './sprites-list.js';

export const GAME_W = 20;
export const GAME_H = 15;
export const MAX_OPS = 4000;
export const FRAME_STEPS = 60000;
export const KEYS = ['left', 'right', 'up', 'down', 'space', 'enter', ...'abcdefghijklmnopqrstuvwxyz'];

const gameErr = (msg, line, hint = 'pixel-arg') => new CodeError('Pixelvärlden', msg, line, hint);

export class GameHost extends PixelHost {
  constructor(lang) {
    super(null, lang);
    this.game = true;
    this.ops = [];
    this.keys = {};
  }
  op(o, line) {
    if (this.ops.length >= MAX_OPS) throw gameErr(`draw() ritade över ${MAX_OPS} saker i en bildruta. Rita färre saker, eller kolla om en loop ritar för mycket.`, line, 'infinite-loop');
    this.ops.push(o);
  }
  num(v, what, line) { if (typeof v !== 'number' || !Number.isFinite(v)) throw gameErr(`${what} behöver tal.`, line); return v; }
  fill(c, line) { this.op(['fill', parseColor(c, line)], line); }
  rect(x, y, w, h, c, line) { this.op(['rect', this.num(x, 'rect', line), this.num(y, 'rect', line), this.num(w, 'rect', line), this.num(h, 'rect', line), parseColor(c, line)], line); }
  sprite(name, x, y, line) {
    if (!SPRITES_AVAILABLE.includes(name)) throw gameErr(`Det finns ingen bild som heter ${JSON.stringify(name)}. Välj bland ${SPRITES_AVAILABLE.map((n) => `"${n}"`).join(', ')}.`, line, 'pixel-sprite');
    this.op(['sprite', name, this.num(x, 'sprite', line), this.num(y, 'sprite', line)], line);
  }
  text(t, x, y, c, line) { this.op(['text', String(t).slice(0, 80), this.num(x, 'text', line), this.num(y, 'text', line), parseColor(c || 'black', line)], line); }
  key(name, line) {
    const k = String(name).toLowerCase();
    if (!KEYS.includes(k)) throw gameErr(`Tangenten ${JSON.stringify(name)} finns inte här. Använd till exempel "left", "right", "up", "down", "space" eller en bokstav.`, line, 'pixel-arg');
    return !!this.keys[k];
  }
}

export const overlaps = (ax, ay, bx, by) => Math.abs(ax - bx) < 1 && Math.abs(ay - by) < 1;

/** Hittar en egen while True på toppnivå, som inte behövs i ett spel. */
export function topLevelLoop(code, lang) {
  const re = lang === 'csharp' ? /^while\s*\(\s*true\s*\)/m : /^while\s+True\s*:/m;
  const m = re.exec(code);
  return m ? code.slice(0, m.index).split('\n').length : null;
}

const NAMES = { python: { update: 'update', draw: 'draw' }, csharp: { update: 'Update', draw: 'Draw' } };

/** Startar ett spel: kör toppnivån och första bildrutan. */
export function startGame(lang, code, sessions) {
  const host = new GameHost(lang);
  const loop = topLevelLoop(code, lang);
  if (loop) {
    return { error: { kind: 'Pixelvärlden', message: `I ett spel skriver du ingen egen while-loop som snurrar för alltid. Kodstig anropar ${NAMES[lang].update}() och ${NAMES[lang].draw}() ungefär 30 gånger per sekund åt dig, som att bläddra i ett blädderblock. Flytta det som ska hända varje gång till ${NAMES[lang].update}().`, line: loop, hint: 'game-loop', phase: 'runtime' }, output: '' };
  }
  const session = (lang === 'csharp' ? sessions.csharp : sessions.python)(code, { host });
  if (session.start.error) return { error: session.start.error, output: session.start.output };
  const n = NAMES[lang];
  if (!session.has(n.draw)) {
    return { error: { kind: 'Pixelvärlden', message: lang === 'csharp' ? 'Spelet behöver en metod void Draw() som ritar skärmen. Skriv den utan static, så att den kan använda variablerna i programmet.' : 'Spelet behöver en funktion def draw(): som ritar skärmen.', line: null, hint: 'game-draw', phase: 'runtime' }, output: session.start.output };
  }
  const game = { host, session, lang, frame: 0 };
  const first = frame(game, {}, 0, { skipUpdate: true });
  return { ...first, output: session.start.output + first.output, game };
}

/** En bildruta: update(dt) och sedan draw(). Ger { ops, output, error }. */
export function frame(game, keys = {}, dt = 1 / 30, { skipUpdate = false } = {}) {
  const { host, session, lang } = game;
  const n = NAMES[lang];
  host.keys = keys;
  host.ops = [];
  let output = '';
  const run = (name, args) => {
    const r = session.call(name, args, FRAME_STEPS);
    output += r.output;
    if (r.error && r.error.hint === 'infinite-loop') r.error.message = `${name}() tog för lång tid i en bildruta. Har du en loop som aldrig slutar? Varje bildruta ska bara göra en liten bit.`;
    return r.error;
  };
  let error = null;
  if (!skipUpdate && session.has(n.update)) error = run(n.update, session.params(n.update) ? [dt] : []);
  if (!error) error = run(n.draw, []);
  game.frame++;
  return { ops: host.ops, output, error };
}

/** Tangentschema som JSON: [{ key: 'right', from: 0, to: 20 }]. */
export const keySchedule = (list = []) => (i) => Object.fromEntries(list.filter((k) => i >= (k.from ?? 0) && i < (k.to ?? Infinity)).map((k) => [k.key, true]));

/**
 * Kör ett spel utan skärm, för rättning: frames bildrutor med tangenterna som
 * hålls nere enligt keys(frameNr). Ger variablernas värden till sist.
 */
export function simulate(lang, code, { frames = 30, keys = () => ({}), vars = [] }, sessions) {
  const s = startGame(lang, code, sessions);
  if (s.error) return { error: s.error, vars: {}, output: s.output, frames: 0 };
  let output = s.output, last = s;
  for (let i = 0; i < frames; i++) {
    last = frame(s.game, keys(i), 1 / 30);
    output += last.output;
    if (last.error) return { error: last.error, vars: {}, output, frames: i + 1, ops: last.ops };
  }
  return { error: null, vars: Object.fromEntries(vars.map((v) => [v, s.game.session.get(v)])), output, frames, ops: last.ops };
}
