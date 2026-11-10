// Pixelvärldens C#-API: Hjalte och World (statiska), new PixelGrid(...),
// new Turtle(), Color.Red och Dir.Up. Samma idéer som i Python, med PascalCase.
import { CodeError } from '../errors.js';
import { Canvas, Turtle, COLORS, DIRS } from './core.js';
import { overlaps, GAME_W, GAME_H } from './game.js';

export const HOST_TYPES = ['Turtle', 'PixelGrid', 'Color', 'Dir'];

export class CsHost {
  constructor(type, table) { this.type = type; this.table = table; }
}

export function csharpPixel(H, host) {
  const { V, numOf, isNumT, csStr } = H;
  const err = (msg, line, hint = 'pixel-arg') => new CodeError('Pixelvärlden', msg, line, hint);
  const argc = (name, a, min, max, line) => {
    if (a.length < min || a.length > max) throw new CodeError('CS1501', `${name} tar ${min === max ? min : `${min}–${max}`} argument men fick ${a.length}.`, line, 'arg-count');
  };
  const n = (v, what, line) => { if (!isNumT(v.t)) throw new CodeError('CS1503', `${what} behöver ett tal, inte ${v.t}.`, line, 'arg-type'); return numOf(v); };
  const int = (v, what, line) => { if (v.t !== 'int') throw new CodeError('CS1503', `${what} behöver ett heltal (int).`, line, 'arg-type'); return v.v; };
  const color = (v, line) => {
    if (v.t === 'Color' || v.t === 'string') return v.v;
    throw new CodeError('CS1503', 'En färg skrivs som Color.Red eller som text, till exempel "red" eller "#ff0000".', line, 'arg-type');
  };
  const dir = (v, line) => {
    if (v.t === 'Dir' || v.t === 'string') return String(v.v).toLowerCase();
    throw new CodeError('CS1503', 'En riktning skrivs Dir.Up, Dir.Down, Dir.Left eller Dir.Right.', line, 'arg-type');
  };
  const W = (line) => host.needWorld('Hjalte', line);
  const none = V('void', null);
  const B = (b) => V('bool', b);
  const S = (s) => (s === null ? V('string', null) : V('string', String(s)));
  const I = (x) => V('int', x);
  const D = (x) => V('double', x);

  // Varje post: [min, max, (args, line) => värde] för metoder, eller { get, set } för egenskaper.
  const hero = {
    MoveRight: [0, 0, (a, line) => { W(line).step('right', line, 'move_right'); return none; }],
    MoveLeft: [0, 0, (a, line) => { W(line).step('left', line, 'move_left'); return none; }],
    MoveUp: [0, 0, (a, line) => { W(line).step('up', line, 'move_up'); return none; }],
    MoveDown: [0, 0, (a, line) => { W(line).step('down', line, 'move_down'); return none; }],
    Move: [0, 1, (a, line) => { W(line).move(a.length ? int(a[0], 'Move()', line) : 1, line); return none; }],
    TurnLeft: [0, 0, (a, line) => { W(line).turnLeft(line); return none; }],
    Say: [1, 1, (a, line) => { W(line).say(csStr(a[0]), line); return none; }],
    Pick: [0, 0, (a, line) => { W(line).pick(line); return none; }],
    Drop: [0, 0, (a, line) => { W(line).drop(line); return none; }],
    Open: [0, 0, (a, line) => { W(line).open(line); return none; }],
    CanMove: [1, 1, (a, line) => B(W(line).canMove(dir(a[0], line), line))],
    OnItem: [0, 0, (a, line) => B(W(line).onItem())],
    AtGoal: [0, 0, (a, line) => B(W(line).atGoal())],
    X: { get: (line) => I(W(line).hero.x) },
    Y: { get: (line) => I(W(line).hero.y) },
    Dir: { get: (line) => V('Dir', W(line).hero.dir) },
    Items: { get: (line) => V('List<string>', W(line).hero.bag.slice()) },
  };
  const world = {
    Tile: [2, 2, (a, line) => S(W(line).tile(int(a[0], 'Tile()', line), int(a[1], 'Tile()', line), line))],
    ItemsLeft: [0, 0, (a, line) => I(W(line).items.length)],
    Width: { get: (line) => I(W(line).w) },
    Height: { get: (line) => I(W(line).h) },
  };
  const pascal = (s) => s[0].toUpperCase() + s.slice(1);
  const colorConsts = Object.fromEntries(Object.keys(COLORS).map((k) => [pascal(k), { get: () => V('Color', k) }]));
  const dirConsts = Object.fromEntries(Object.keys(DIRS).map((k) => [pascal(k), { get: () => V('Dir', k) }]));
  const statics = { Hjalte: hero, World: world, Color: colorConsts, Dir: dirConsts };
  // Spel: Screen, Keyboard och Game.Overlaps.
  if (host.game) {
    statics.Screen = {
      Fill: [1, 1, (a, line) => { host.fill(color(a[0], line), line); return none; }],
      Clear: [0, 0, (a, line) => { host.fill('white', line); return none; }],
      Rect: [5, 5, (a, line) => { host.rect(n(a[0], 'Rect()', line), n(a[1], 'Rect()', line), n(a[2], 'Rect()', line), n(a[3], 'Rect()', line), color(a[4], line), line); return none; }],
      Sprite: [3, 3, (a, line) => { host.sprite(String(a[0].v), n(a[1], 'Sprite()', line), n(a[2], 'Sprite()', line), line); return none; }],
      Text: [3, 4, (a, line) => { host.text(csStr(a[0]), n(a[1], 'Text()', line), n(a[2], 'Text()', line), a.length > 3 ? color(a[3], line) : null, line); return none; }],
      Width: { get: () => I(GAME_W) },
      Height: { get: () => I(GAME_H) },
    };
    statics.Keyboard = { IsDown: [1, 1, (a, line) => B(host.key(csStr(a[0]), line))] };
    statics.Game = { Overlaps: [4, 4, (a, line) => B(overlaps(...a.map((v) => n(v, 'Overlaps()', line))))] };
  }

  const gridTable = (c) => ({
    SetPixel: [3, 3, (a, line) => { c.set(int(a[0], 'x', line), int(a[1], 'y', line), color(a[2], line), line); return none; }],
    GetPixel: [2, 2, (a, line) => S(c.get(int(a[0], 'x', line), int(a[1], 'y', line), line))],
    Fill: [1, 1, (a, line) => { c.fill(color(a[0], line), line); return none; }],
    Clear: [0, 0, (a, line) => { c.clear(line); return none; }],
    Draw: [1, 3, (a, line) => {
      if (!Array.isArray(a[0].v)) throw err('Draw() behöver en string-array eller List<string> med rader.', line);
      c.draw(a[0].v, line, a.length > 1 ? int(a[1], 'x', line) : 0, a.length > 2 ? int(a[2], 'y', line) : 0);
      return none;
    }],
    Width: { get: () => I(c.w) },
    Height: { get: () => I(c.h) },
  });
  const turtleTable = (t) => ({
    Forward: [1, 1, (a, line) => { t.forward(n(a[0], 'Forward()', line), line); return none; }],
    Backward: [1, 1, (a, line) => { t.forward(-n(a[0], 'Backward()', line), line); return none; }],
    Left: [1, 1, (a, line) => { t.turn(n(a[0], 'Left()', line), line); return none; }],
    Right: [1, 1, (a, line) => { t.turn(-n(a[0], 'Right()', line), line); return none; }],
    GoTo: [2, 2, (a, line) => { t.moveTo(n(a[0], 'GoTo()', line), n(a[1], 'GoTo()', line), line); return none; }],
    SetHeading: [1, 1, (a, line) => { t.setHeading(n(a[0], 'SetHeading()', line), line); return none; }],
    Home: [0, 0, (a, line) => { t.moveTo(0, 0, line); t.setHeading(0, line); return none; }],
    Circle: [1, 2, (a, line) => { t.circle(n(a[0], 'Circle()', line), a.length > 1 ? n(a[1], 'Circle()', line) : 360, null, line); return none; }],
    PenUp: [0, 0, (a, line) => { t.setPen(false, line); return none; }],
    PenDown: [0, 0, (a, line) => { t.setPen(true, line); return none; }],
    BeginFill: [0, 0, (a, line) => { t.beginFill(line); return none; }],
    EndFill: [0, 0, (a, line) => { t.endFill(line); return none; }],
    Dot: [0, 2, (a, line) => { t.dot(a.length ? n(a[0], 'Dot()', line) : null, a.length > 1 ? color(a[1], line) : null, line); return none; }],
    Write: [1, 1, (a, line) => { t.write(csStr(a[0]), line); return none; }],
    Hide: [0, 0, (a, line) => { t.show(false, line); return none; }],
    Show: [0, 0, (a, line) => { t.show(true, line); return none; }],
    Clear: [0, 0, (a, line) => { t.clear(line); return none; }],
    X: { get: () => D(t.x) },
    Y: { get: () => D(t.y) },
    Heading: { get: () => D(t.h), set: (v, line) => t.setHeading(n(v, 'Heading', line), line) },
    IsDown: { get: () => B(t.pen) },
    Speed: { get: () => I(t.speed), set: (v, line) => t.setSpeed(n(v, 'Speed', line), line) },
    PenColor: { get: () => V('Color', t.color), set: (v, line) => t.setColor(color(v, line), line) },
    FillColor: { get: () => V('Color', t.fillColor), set: (v, line) => t.setFill(color(v, line), line) },
    PenSize: { get: () => D(t.width), set: (v, line) => t.setWidth(n(v, 'PenSize', line), line) },
  });

  const guess = (table, name) => Object.keys(table).find((k) => k.toLowerCase() === name.toLowerCase().replace(/_/g, ''));
  const missing = (owner, table, name, line) => {
    const g = guess(table, name);
    return new CodeError('CS0117', `${owner} har inget som heter ${name}.${g ? ` Menade du ${g}? Stora och små bokstäver spelar roll.` : ''}`, line, 'member');
  };
  const call = (owner, table, name, a, line) => {
    const m = table[name];
    if (!Array.isArray(m)) {
      if (m) throw new CodeError('CS1955', `${name} är en egenskap, inte en metod. Skriv ${owner}.${name} utan parenteser.`, line, 'member');
      throw missing(owner, table, name, line);
    }
    argc(`${owner}.${name}`, a, m[0], m[1], line);
    return m[2](a, line);
  };
  const get = (owner, table, name, line) => {
    const m = table[name];
    if (m && !Array.isArray(m)) return m.get(line);
    if (m) throw new CodeError('CS0428', `${name} är en metod. Anropa den med parenteser: ${owner}.${name}()`, line, 'method-group');
    throw missing(owner, table, name, line);
  };
  const set = (owner, table, name, v, line) => {
    const m = table[name];
    if (m && !Array.isArray(m) && m.set) { m.set(v, line); return; }
    throw new CodeError('CS0200', `${owner}.${name} kan bara läsas.`, line, 'bad-assign');
  };

  return {
    hasStatic: (cls) => Object.hasOwn(statics, cls),
    staticCall: (cls, name, a, line) => call(cls, statics[cls], name, a, line),
    staticGet: (cls, name, line) => get(cls, statics[cls], name, line),
    create(cls, a, line) {
      if (cls === 'PixelGrid') {
        argc('new PixelGrid', a, 2, 2, line);
        const c = new Canvas(host, int(a[0], 'PixelGrid', line), int(a[1], 'PixelGrid', line), line);
        return V('PixelGrid', new CsHost('PixelGrid', gridTable(c)));
      }
      if (cls === 'Turtle') {
        argc('new Turtle', a, 0, 0, line);
        return V('Turtle', new CsHost('Turtle', turtleTable(new Turtle(host, line))));
      }
      return null;
    },
    call: (h, name, a, line) => call(h.type, h.table, name, a, line),
    get: (h, name, line) => get(h.type, h.table, name, line),
    set: (h, name, v, line) => set(h.type, h.table, name, v, line),
  };
}
