// Pixelvärldens Python-API: hjalte, world, Canvas och modulen turtle.
// P är tolkens egna byggstenar (Builtin, PyHost, PyFloat ...), så att den här filen
// inte behöver känna till hur tolken är byggd inuti.
import { CodeError } from '../errors.js';
import { Canvas, Turtle } from './core.js';

export function pythonPixel(P, interp, host) {
  const { Builtin, PyHost, PyModule, PyFloat, Tuple, num, isNum, isInt, pyStr } = P;
  const err = (msg, line, hint = 'pixel-arg') => new CodeError('Pixelvärlden', msg, line, hint);
  const fn = (name, f) => new Builtin(name, f);
  const argc = (name, args, min, max, line) => {
    if (args.length < min || args.length > max) {
      const want = min === max ? (min === 0 ? 'inga argument' : `${min} argument`) : `${min} till ${max} argument`;
      throw new CodeError('TypeError', `${name}() tar ${want} men fick ${args.length}.`, line, 'arg-count');
    }
  };
  const n = (v, what, line) => { if (!isNum(v) || typeof v === 'boolean') throw err(`${what} behöver ett tal, inte ${pyStr(v)}.`, line); return num(v); };
  const int = (v, what, line) => { if (!isInt(v) || typeof v === 'boolean') throw err(`${what} behöver ett heltal.`, line); return num(v); };
  const str = (v, what, line) => { if (typeof v !== 'string') throw err(`${what} behöver text inom citattecken, till exempel "red".`, line); return v; };
  const F = (x) => new PyFloat(x);
  const host0 = (typeName, table, names) => new PyHost(typeName, (name, line) => {
    const v = table[name];
    if (v === undefined) return undefined;
    return typeof v === 'function' && v.isProp ? v(line) : v;
  }, null, names || Object.keys(table));
  const prop = (f) => { f.isProp = true; return f; };

  const out = new Map();

  // ---------- hjalte och world ----------
  const world = () => host.needWorld('hjalte', null);
  const W = (line) => host.needWorld('hjalte', line);
  const cmd = (name, max, f) => fn(name, (a, kw, line) => { argc(name, a, 0, max, line); return f(a, line) ?? null; });
  const hero = {
    move_right: cmd('move_right', 0, (a, line) => W(line).step('right', line, 'move_right')),
    move_left: cmd('move_left', 0, (a, line) => W(line).step('left', line, 'move_left')),
    move_up: cmd('move_up', 0, (a, line) => W(line).step('up', line, 'move_up')),
    move_down: cmd('move_down', 0, (a, line) => W(line).step('down', line, 'move_down')),
    move: cmd('move', 1, (a, line) => W(line).move(a.length ? int(a[0], 'move()', line) : 1, line)),
    turn_left: cmd('turn_left', 0, (a, line) => W(line).turnLeft(line)),
    say: cmd('say', 1, (a, line) => W(line).say(a.length ? pyStr(a[0]) : '', line)),
    pick: cmd('pick', 0, (a, line) => W(line).pick(line)),
    drop: cmd('drop', 0, (a, line) => W(line).drop(line)),
    open: cmd('open', 0, (a, line) => W(line).open(line)),
    can_move: fn('can_move', (a, kw, line) => { argc('can_move', a, 1, 1, line); return W(line).canMove(str(a[0], 'can_move()', line), line); }),
    on_item: cmd('on_item', 0, (a, line) => W(line).onItem()),
    at_goal: cmd('at_goal', 0, (a, line) => W(line).atGoal()),
    x: prop((line) => W(line).hero.x),
    y: prop((line) => W(line).hero.y),
    dir: prop((line) => W(line).hero.dir),
    items: prop((line) => W(line).hero.bag.slice()),
  };
  out.set('hjalte', host0('hjälte', hero));
  out.set('world', host0('värld', {
    tile: fn('tile', (a, kw, line) => { argc('tile', a, 2, 2, line); return W(line).tile(int(a[0], 'tile()', line), int(a[1], 'tile()', line), line); }),
    items_left: cmd('items_left', 0, (a, line) => W(line).items.length),
    width: prop((line) => W(line).w),
    height: prop((line) => W(line).h),
  }));
  void world;

  // ---------- Canvas ----------
  const canvasObj = (c) => host0('Canvas', {
    set_pixel: fn('set_pixel', (a, kw, line) => { argc('set_pixel', a, 3, 3, line); c.set(int(a[0], 'x', line), int(a[1], 'y', line), a[2], line); return null; }),
    get_pixel: fn('get_pixel', (a, kw, line) => { argc('get_pixel', a, 2, 2, line); return c.get(int(a[0], 'x', line), int(a[1], 'y', line), line); }),
    fill: fn('fill', (a, kw, line) => { argc('fill', a, 1, 1, line); c.fill(a[0], line); return null; }),
    clear: fn('clear', (a, kw, line) => { argc('clear', a, 0, 0, line); c.clear(line); return null; }),
    draw: fn('draw', (a, kw, line) => {
      argc('draw', a, 1, 3, line);
      const rows = Array.isArray(a[0]) ? a[0] : a[0] instanceof Tuple ? a[0].items : null;
      if (!rows) throw err('draw() behöver en lista med textrader, till exempel ["..rr..", ".rrrr."].', line);
      c.draw(rows, line, a.length > 1 ? int(a[1], 'x', line) : 0, a.length > 2 ? int(a[2], 'y', line) : 0);
      return null;
    }),
    width: c.w, height: c.h,
  });
  out.set('Canvas', fn('Canvas', (a, kw, line) => { argc('Canvas', a, 2, 2, line); return canvasObj(new Canvas(host, int(a[0], 'Canvas()', line), int(a[1], 'Canvas()', line), line)); }));

  // ---------- turtle ----------
  const xy = (a, what, line) => {
    if (a.length === 1 && a[0] instanceof Tuple && a[0].items.length === 2) return [n(a[0].items[0], what, line), n(a[0].items[1], what, line)];
    if (a.length === 2) return [n(a[0], what, line), n(a[1], what, line)];
    throw err(`${what} behöver x och y, till exempel goto(100, 50).`, line);
  };
  const colorArg = (a, line) => (a.length === 3 && a.every(isNum) ? `#${a.map((v) => Math.round(num(v) <= 1 && a.every((u) => num(u) <= 1) ? num(v) * 255 : num(v)).toString(16).padStart(2, '0')).join('')}` : str(a[0], 'Färgen', line));
  const turtleTable = (get) => {
    const T = (line) => get(line);
    const t = {};
    const def = (names, max, f, min = 0) => { const b = fn(names[0], (a, kw, line) => { argc(names[0], a, min, max, line); const r = f(T(line), a, kw, line); return r === undefined ? null : r; }); for (const nm of names) t[nm] = b; };
    def(['forward', 'fd'], 1, (tt, a, kw, line) => { tt.forward(n(a[0], 'forward()', line), line); }, 1);
    def(['backward', 'bk', 'back'], 1, (tt, a, kw, line) => { tt.forward(-n(a[0], 'backward()', line), line); }, 1);
    def(['left', 'lt'], 1, (tt, a, kw, line) => { tt.turn(n(a[0], 'left()', line), line); }, 1);
    def(['right', 'rt'], 1, (tt, a, kw, line) => { tt.turn(-n(a[0], 'right()', line), line); }, 1);
    def(['goto', 'setpos', 'setposition'], 2, (tt, a, kw, line) => { const [x, y] = xy(a, 'goto()', line); tt.moveTo(x, y, line); }, 1);
    def(['setx'], 1, (tt, a, kw, line) => { tt.moveTo(n(a[0], 'setx()', line), tt.y, line); }, 1);
    def(['sety'], 1, (tt, a, kw, line) => { tt.moveTo(tt.x, n(a[0], 'sety()', line), line); }, 1);
    def(['setheading', 'seth'], 1, (tt, a, kw, line) => { tt.setHeading(n(a[0], 'setheading()', line), line); }, 1);
    def(['home'], 0, (tt, a, kw, line) => { tt.moveTo(0, 0, line); tt.setHeading(0, line); });
    def(['circle'], 3, (tt, a, kw, line) => {
      const ext = a[1] ?? kw.extent ?? null, steps = a[2] ?? kw.steps ?? null;
      tt.circle(n(a[0], 'circle()', line), ext === null ? 360 : n(ext, 'circle()', line), steps === null ? null : int(steps, 'circle()', line), line);
    }, 1);
    def(['penup', 'pu', 'up'], 0, (tt, a, kw, line) => { tt.setPen(false, line); });
    def(['pendown', 'pd', 'down'], 0, (tt, a, kw, line) => { tt.setPen(true, line); });
    def(['isdown'], 0, (tt) => tt.pen);
    def(['pensize', 'width'], 1, (tt, a, kw, line) => (a.length ? void tt.setWidth(n(a[0], 'pensize()', line), line) : tt.width));
    def(['color'], 3, (tt, a, kw, line) => {
      if (!a.length) return new Tuple([tt.color, tt.fillColor]);
      if (a.length === 2) { tt.setColor(str(a[0], 'color()', line), line); tt.setFill(str(a[1], 'color()', line), line); return; }
      const c = colorArg(a, line); tt.setColor(c, line); tt.setFill(c, line);
    });
    def(['pencolor'], 3, (tt, a, kw, line) => (a.length ? void tt.setColor(colorArg(a, line), line) : tt.color));
    def(['fillcolor'], 3, (tt, a, kw, line) => (a.length ? void tt.setFill(colorArg(a, line), line) : tt.fillColor));
    def(['begin_fill'], 0, (tt, a, kw, line) => { tt.beginFill(line); });
    def(['end_fill'], 0, (tt, a, kw, line) => { tt.endFill(line); });
    def(['filling'], 0, (tt) => !!tt.filling);
    def(['speed'], 1, (tt, a, kw, line) => (a.length ? void tt.setSpeed(typeof a[0] === 'string' ? ({ fastest: 0, fast: 10, normal: 6, slow: 3, slowest: 1 }[a[0]] ?? 3) : n(a[0], 'speed()', line), line) : tt.speed));
    def(['dot'], 2, (tt, a, kw, line) => { tt.dot(a[0] ?? null, a[1] ?? null, line); });
    def(['write'], 1, (tt, a, kw, line) => { tt.write(pyStr(a[0]), line); }, 1);
    def(['hideturtle', 'ht'], 0, (tt, a, kw, line) => { tt.show(false, line); });
    def(['showturtle', 'st'], 0, (tt, a, kw, line) => { tt.show(true, line); });
    def(['isvisible'], 0, (tt) => tt.visible);
    def(['clear'], 0, (tt, a, kw, line) => { tt.clear(line); });
    def(['position', 'pos'], 0, (tt) => new Tuple([F(tt.x), F(tt.y)]));
    def(['xcor'], 0, (tt) => F(tt.x));
    def(['ycor'], 0, (tt) => F(tt.y));
    def(['heading'], 0, (tt) => F(tt.h));
    def(['distance'], 2, (tt, a, kw, line) => { const [x, y] = xy(a, 'distance()', line); return F(Math.hypot(x - tt.x, y - tt.y)); }, 1);
    def(['shape', 'shapesize', 'stamp', 'tilt'], 3, () => null);
    return t;
  };
  const turtleObj = (tt) => host0('Turtle', turtleTable(() => tt));
  const noop = (name) => fn(name, () => null);
  const screen = {
    bgcolor: fn('bgcolor', (a, kw, line) => { argc('bgcolor', a, 0, 3, line); if (a.length) host.setBg(colorArg(a, line), line); return a.length ? null : host.bg || 'white'; }),
  };
  for (const k of ['title', 'setup', 'tracer', 'update', 'exitonclick', 'mainloop', 'done', 'listen', 'colormode']) screen[k] = noop(k);
  const mod = new PyModule('turtle');
  for (const [k, v] of Object.entries(turtleTable((line) => host.turtle(line)))) mod.attrs.set(k, v);
  for (const [k, v] of Object.entries(screen)) mod.attrs.set(k, v);
  mod.attrs.set('Turtle', fn('Turtle', (a, kw, line) => { argc('Turtle', a, 0, 0, line); return turtleObj(new Turtle(host, line)); }));
  mod.attrs.set('Pen', mod.attrs.get('Turtle'));
  mod.attrs.set('Screen', fn('Screen', () => host0('Screen', screen)));
  return { globals: out, turtle: mod };
}
