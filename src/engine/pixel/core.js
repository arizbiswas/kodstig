// Pixelvärlden: världen, hjälten, pixelrutnät och turtle. Allt eleven gör spelas
// in som händelser med radnummer, så att sidan kan spela upp det steg för steg
// och lysa upp raden som körs. Ingen eval: tolkarna anropar de här metoderna.
import { CodeError } from '../errors.js';

export const MAX_EVENTS = 50000;
export const MAX_CANVAS = 64;

// Färger med Okabe-Ito som grund, så att de går att skilja åt vid färgblindhet.
export const COLORS = {
  black: '#000000', white: '#ffffff', gray: '#999999', red: '#d55e00', orange: '#e69f00',
  yellow: '#f0e442', green: '#009e73', blue: '#0072b2', sky: '#56b4e9', pink: '#cc79a7',
  purple: '#7b4fa0', brown: '#8b5a2b',
};
// En bokstav per färg i grid.draw(rader). Punkt eller mellanslag lämnar rutan som den är.
export const LETTERS = { k: 'black', w: 'white', a: 'gray', r: 'red', o: 'orange', y: 'yellow', g: 'green', b: 'blue', s: 'sky', p: 'pink', v: 'purple', n: 'brown' };
const SV_COLOR = { black: 'svart', white: 'vit', gray: 'grå', red: 'röd', orange: 'orange', yellow: 'gul', green: 'grön', blue: 'blå', sky: 'himmelsblå', pink: 'rosa', purple: 'lila', brown: 'brun' };
export const colorName = (c) => SV_COLOR[c] || c;

const pixErr = (msg, line, hint = 'pixel') => new CodeError('Pixelvärlden', msg, line, hint);

/** Gör om "red", "Red", "#f00" eller "#ff0000" till ett färgnamn eller en hex-färg. */
export function parseColor(c, line) {
  if (typeof c !== 'string') throw pixErr('En färg skrivs som text, till exempel "red" eller "#ff0000".', line, 'pixel-color');
  const s = c.trim().toLowerCase();
  if (Object.hasOwn(COLORS, s)) return s;
  if (/^#[0-9a-f]{6}$/.test(s)) return s;
  if (/^#[0-9a-f]{3}$/.test(s)) return '#' + [...s.slice(1)].map((x) => x + x).join('');
  throw pixErr(`Färgen ${JSON.stringify(c)} finns inte. Välj bland ${Object.keys(COLORS).map((k) => `"${k}"`).join(', ')}, eller skriv en hex-färg som "#ff8800".`, line, 'pixel-color');
}
export const colorHex = (c) => COLORS[c] || c;

// ---------- Världen ----------
// Kartan är rader med tecken. x växer åt höger och y nedåt, som rader i en bok.
//   #  vägg       ~  vatten    D  låst dörr   G  mål (flagga)
//   .  gräs       S  start     k  nyckel      g  ädelsten      c  mynt
const TILE = { '#': 'wall', '~': 'water', D: 'door', G: 'goal', '.': 'floor', ' ': 'floor', S: 'floor', k: 'floor', g: 'floor', c: 'floor' };
const ITEM = { k: 'key', g: 'gem', c: 'coin' };
export const ITEM_SV = { key: 'nyckel', gem: 'ädelsten', coin: 'mynt' };
export const DIRS = { right: [1, 0], left: [-1, 0], up: [0, -1], down: [0, 1] };
export const DIR_SV = { right: 'höger', left: 'vänster', up: 'upp', down: 'ner' };
const LEFT_OF = { right: 'up', up: 'left', left: 'down', down: 'right' };

export function parseMap(rows, dir = 'right') {
  if (!Array.isArray(rows) || !rows.length) throw new Error('Banan saknar karta.');
  const w = Math.max(...rows.map((r) => r.length));
  const tiles = [], items = [];
  let start = null;
  rows.forEach((row, y) => {
    tiles.push([...row.padEnd(w, '#')].map((ch, x) => {
      if (!(ch in TILE)) throw new Error(`Okänt tecken ${JSON.stringify(ch)} i kartan.`);
      if (ch === 'S') start = { x, y };
      if (ITEM[ch]) items.push({ x, y, item: ITEM[ch] });
      return TILE[ch];
    }));
  });
  if (!start) throw new Error('Banan saknar start (S).');
  return { w, h: rows.length, tiles, items, hero: { x: start.x, y: start.y, dir, bag: [] } };
}

export class World {
  constructor(level, host) {
    this.level = level;
    this.host = host;
    const m = parseMap(level.map, level.dir || 'right');
    Object.assign(this, m);
    this.said = [];
    this.allowed = level.allowed ? new Set(level.allowed) : null;
  }
  tileAt(x, y) { return x < 0 || y < 0 || x >= this.w || y >= this.h ? 'edge' : this.tiles[y][x]; }
  itemAt(x, y) { return this.items.find((i) => i.x === x && i.y === y) || null; }
  check(cmd, line) {
    if (this.allowed && !this.allowed.has(cmd)) {
      throw pixErr(`I den här banan kan hjälten inte använda ${cmd}(). Här finns: ${[...this.allowed].map((c) => `${c}()`).join(', ')}.`, line, 'pixel-allowed');
    }
  }
  blocked(x, y) {
    const t = this.tileAt(x, y);
    if (t === 'edge') return 'Jag kan inte gå utanför kartan!';
    if (t === 'wall') return 'Jag kan inte gå in i väggen!';
    if (t === 'water') return 'Jag kan inte simma!';
    if (t === 'door') return 'Dörren är låst. Ställ dig framför den med en nyckel och använd open().';
    return null;
  }
  step(dir, line, cmd) {
    this.check(cmd, line);
    const h = this.hero;
    h.dir = dir;
    const [dx, dy] = DIRS[dir];
    const nx = h.x + dx, ny = h.y + dy;
    const why = this.blocked(nx, ny);
    if (why) {
      this.host.emit({ t: 'move', dir, ok: false, x: h.x, y: h.y, line });
      this.host.emit({ t: 'say', text: why, line, auto: true });
      throw pixErr(`${why} Hjälten står på (${h.x}, ${h.y}) och försökte gå ${DIR_SV[dir]}.`, line, why.includes('väggen') || why.includes('utanför') ? 'pixel-wall' : why.includes('simma') ? 'pixel-water' : 'pixel-door');
    }
    h.x = nx; h.y = ny;
    this.host.emit({ t: 'move', dir, ok: true, x: nx, y: ny, line });
  }
  move(n, line) {
    this.check('move', line);
    if (!Number.isInteger(n) || n < 0) throw pixErr('move(n) behöver ett heltal som är 0 eller större, till exempel move(3).', line, 'pixel-arg');
    for (let i = 0; i < n; i++) this.step(this.hero.dir, line, 'move');
  }
  turnLeft(line) {
    this.check('turn_left', line);
    this.hero.dir = LEFT_OF[this.hero.dir];
    this.host.emit({ t: 'turn', dir: this.hero.dir, line });
  }
  say(text, line) {
    this.check('say', line);
    const s = String(text).slice(0, 200);
    this.said.push(s);
    this.host.emit({ t: 'say', text: s, line });
  }
  pick(line) {
    this.check('pick', line);
    const h = this.hero;
    const it = this.itemAt(h.x, h.y);
    if (!it) throw pixErr(`Det finns inget att plocka upp på (${h.x}, ${h.y}). Använd on_item() för att kolla först.`, line, 'pixel-pick');
    this.items.splice(this.items.indexOf(it), 1);
    h.bag.push(it.item);
    this.host.emit({ t: 'pick', item: it.item, x: h.x, y: h.y, line });
  }
  drop(line) {
    this.check('drop', line);
    const h = this.hero;
    if (!h.bag.length) throw pixErr('Ryggsäcken är tom, så det finns inget att lägga ner.', line, 'pixel-drop');
    if (this.itemAt(h.x, h.y)) throw pixErr(`Det ligger redan något på (${h.x}, ${h.y}).`, line, 'pixel-drop');
    const item = h.bag.pop();
    this.items.push({ x: h.x, y: h.y, item });
    this.host.emit({ t: 'drop', item, x: h.x, y: h.y, line });
  }
  open(line) {
    this.check('open', line);
    const h = this.hero;
    const [dx, dy] = DIRS[h.dir];
    const x = h.x + dx, y = h.y + dy;
    if (this.tileAt(x, y) !== 'door') throw pixErr(`Det finns ingen dörr ${DIR_SV[h.dir]} om hjälten. Vänd hjälten mot dörren först.`, line, 'pixel-open');
    if (!h.bag.includes('key')) throw pixErr('Dörren är låst och hjälten har ingen nyckel. Plocka upp nyckeln först.', line, 'pixel-open');
    this.tiles[y][x] = 'floor';
    this.host.emit({ t: 'open', x, y, line });
  }
  canMove(dir, line) {
    const d = String(dir).toLowerCase();
    if (!DIRS[d]) throw pixErr(`can_move behöver en riktning: "up", "down", "left" eller "right", inte ${JSON.stringify(dir)}.`, line, 'pixel-arg');
    const [dx, dy] = DIRS[d];
    return !this.blocked(this.hero.x + dx, this.hero.y + dy);
  }
  onItem() { return !!this.itemAt(this.hero.x, this.hero.y); }
  atGoal() { return this.tileAt(this.hero.x, this.hero.y) === 'goal'; }
  tile(x, y, line) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) throw pixErr('world.tile(x, y) behöver två heltal.', line, 'pixel-arg');
    const t = this.tileAt(x, y);
    if (t === 'edge') return 'edge';
    const it = this.itemAt(x, y);
    return it ? it.item : t;
  }
  snapshot() {
    return { w: this.w, h: this.h, tiles: this.tiles.map((r) => r.slice()), items: this.items.map((i) => ({ ...i })), hero: { ...this.hero, bag: this.hero.bag.slice() } };
  }
}

// ---------- Pixelrutnät ----------
export class Canvas {
  constructor(host, w, h, line) {
    if (!Number.isInteger(w) || !Number.isInteger(h) || w < 1 || h < 1 || w > MAX_CANVAS || h > MAX_CANVAS) {
      throw pixErr(`Ett rutnät kan vara från 1×1 till ${MAX_CANVAS}×${MAX_CANVAS} rutor, till exempel Canvas(16, 16).`, line, 'pixel-arg');
    }
    this.host = host; this.w = w; this.h = h;
    this.id = host.canvases.length;
    this.px = Array.from({ length: h }, () => Array(w).fill(null));
    host.canvases.push(this);
    host.emit({ t: 'canvas', id: this.id, w, h, line });
  }
  at(x, y, line) {
    if (!Number.isInteger(x) || !Number.isInteger(y)) throw pixErr('x och y måste vara heltal.', line, 'pixel-arg');
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) {
      throw pixErr(`Rutan (${x}, ${y}) finns inte. Rutnätet är ${this.w} brett och ${this.h} högt, så x går från 0 till ${this.w - 1} och y från 0 till ${this.h - 1}.`, line, 'pixel-range');
    }
  }
  set(x, y, c, line) {
    this.at(x, y, line);
    const col = parseColor(c, line);
    this.px[y][x] = col;
    this.host.emit({ t: 'pixel', id: this.id, x, y, c: col, line });
  }
  get(x, y, line) { this.at(x, y, line); return this.px[y][x]; }
  fill(c, line) {
    const col = parseColor(c, line);
    for (const row of this.px) row.fill(col);
    this.host.emit({ t: 'fill', id: this.id, c: col, line });
  }
  clear(line) {
    for (const row of this.px) row.fill(null);
    this.host.emit({ t: 'fill', id: this.id, c: null, line });
  }
  draw(rows, line, x0 = 0, y0 = 0) {
    if (!Array.isArray(rows) || rows.some((r) => typeof r !== 'string')) throw pixErr('draw() behöver en lista med textrader, till exempel ["..rr..", ".rrrr."].', line, 'pixel-arg');
    const cells = [];
    rows.forEach((row, dy) => [...row].forEach((ch, dx) => {
      if (ch === '.' || ch === ' ') return;
      const name = LETTERS[ch];
      if (!name) throw pixErr(`Bokstaven ${JSON.stringify(ch)} på rad ${dy + 1} är ingen färg. Använd ${Object.entries(LETTERS).map(([k, v]) => `${k} (${colorName(v)})`).join(', ')} och punkt för tom ruta.`, line, 'pixel-color');
      const x = x0 + dx, y = y0 + dy;
      this.at(x, y, line);
      this.px[y][x] = name;
      cells.push([x, y, name]);
    }));
    this.host.emit({ t: 'draw', id: this.id, cells, line });
  }
  snapshot() { return { w: this.w, h: this.h, px: this.px.map((r) => r.slice()) }; }
}

// ---------- Turtle ----------
// Som Pythons turtle: start i mitten (0, 0), y uppåt, vinklar i grader och
// riktning 0 = öster. left() vrider moturs.
const r9 = (v) => { const x = Math.round(v * 1e9) / 1e9; return Object.is(x, -0) ? 0 : x; };
export class Turtle {
  constructor(host, line) {
    this.host = host;
    this.id = host.turtles.length;
    this.x = 0; this.y = 0; this.h = 0;
    this.pen = true; this.color = 'black'; this.fillColor = 'black'; this.width = 1; this.visible = true; this.speed = 3;
    this.filling = null;
    host.turtles.push(this);
    host.emit({ t: 'turtle', id: this.id, line });
  }
  moveTo(x, y, line) {
    const x1 = this.x, y1 = this.y;
    this.x = r9(x); this.y = r9(y);
    if (this.filling) this.filling.push([this.x, this.y]);
    if (this.pen) this.host.lines.push({ id: this.id, x1, y1, x2: this.x, y2: this.y, c: this.color, w: this.width });
    this.host.emit({ t: 'tmove', id: this.id, x1, y1, x2: this.x, y2: this.y, pen: this.pen, c: this.color, w: this.width, h: this.h, line });
  }
  num(v, what, line) {
    if (typeof v !== 'number' || !Number.isFinite(v)) throw pixErr(`${what} behöver ett tal.`, line, 'pixel-arg');
    return v;
  }
  forward(d, line) {
    d = this.num(d, 'forward()', line);
    const a = this.h * Math.PI / 180;
    this.moveTo(this.x + d * Math.cos(a), this.y + d * Math.sin(a), line);
  }
  turn(deg, line) {
    this.h = r9((((this.h + this.num(deg, 'left() och right()', line)) % 360) + 360) % 360);
    this.host.emit({ t: 'tturn', id: this.id, h: this.h, line });
  }
  setHeading(deg, line) {
    this.h = r9(((this.num(deg, 'setheading()', line) % 360) + 360) % 360);
    this.host.emit({ t: 'tturn', id: this.id, h: this.h, line });
  }
  circle(radius, extent = 360, steps = null, line) {
    radius = this.num(radius, 'circle()', line);
    extent = this.num(extent, 'circle()', line);
    const frac = Math.abs(extent) / 360;
    const n = steps ?? 1 + Math.floor(Math.min(11 + Math.abs(radius) / 6, 59) * frac);
    const w = extent / n, w2 = w / 2;
    const l = 2 * radius * Math.sin(w * Math.PI / 360);
    const turnBy = radius < 0 ? -1 : 1;
    this.h = r9(this.h + w2 * turnBy);
    for (let i = 0; i < n; i++) {
      const a = this.h * Math.PI / 180;
      this.moveTo(this.x + l * Math.cos(a), this.y + l * Math.sin(a), line);
      this.h = r9(this.h + w * turnBy);
    }
    this.h = r9((((this.h - w2 * turnBy) % 360) + 360) % 360);
    this.host.emit({ t: 'tturn', id: this.id, h: this.h, line });
  }
  setPen(down, line) { this.pen = down; this.host.emit({ t: 'tpen', id: this.id, pen: down, line }); }
  setColor(c, line) { this.color = parseColor(c, line); this.host.emit({ t: 'tcolor', id: this.id, c: this.color, line }); }
  setFill(c, line) { this.fillColor = parseColor(c, line); }
  setWidth(w, line) {
    w = this.num(w, 'pensize()', line);
    if (w <= 0 || w > 50) throw pixErr('Pennans bredd kan vara från 1 till 50.', line, 'pixel-arg');
    this.width = w;
  }
  beginFill(line) { this.filling = [[this.x, this.y]]; this.host.emit({ t: 'tbegin', id: this.id, line }); }
  endFill(line) {
    if (!this.filling) throw pixErr('end_fill() behöver ett begin_fill() före sig.', line, 'pixel-fill');
    const pts = this.filling; this.filling = null;
    this.host.fills.push({ id: this.id, pts, c: this.fillColor });
    this.host.emit({ t: 'tfill', id: this.id, pts, c: this.fillColor, line });
  }
  dot(size, c, line) {
    const s = size == null ? Math.max(this.width + 4, this.width * 2) : this.num(size, 'dot()', line);
    const col = c == null ? this.color : parseColor(c, line);
    this.host.dots.push({ id: this.id, x: this.x, y: this.y, s, c: col });
    this.host.emit({ t: 'tdot', id: this.id, x: this.x, y: this.y, s, c: col, line });
  }
  write(text, line) { this.host.emit({ t: 'twrite', id: this.id, x: this.x, y: this.y, text: String(text).slice(0, 200), c: this.color, line }); }
  show(v, line) { this.visible = v; this.host.emit({ t: 'tshow', id: this.id, v, line }); }
  clear(line) {
    const mine = (o) => o.id !== this.id;
    this.host.lines = this.host.lines.filter(mine); this.host.fills = this.host.fills.filter(mine); this.host.dots = this.host.dots.filter(mine);
    this.host.emit({ t: 'tclear', id: this.id, line });
  }
  setSpeed(s, line) {
    s = this.num(s, 'speed()', line);
    this.speed = Math.max(0, Math.min(10, Math.round(s)));
    this.host.emit({ t: 'tspeed', id: this.id, s: this.speed, line });
  }
}

// ---------- Allt för en körning ----------
export class PixelHost {
  constructor(level = null) {
    this.events = [];
    this.world = level && level.map ? new World(level, this) : null;
    this.canvases = [];
    this.turtles = [];
    this.lines = [];
    this.fills = [];
    this.dots = [];
    this.bg = null;
    this.mainTurtle = null;
  }
  emit(ev) {
    if (this.events.length >= MAX_EVENTS) {
      throw new CodeError('Händelsegräns', `Figuren har gjort över ${MAX_EVENTS} saker. Det är nog en loop som aldrig slutar.`, ev.line, 'infinite-loop');
    }
    this.events.push(ev);
  }
  needWorld(what, line) {
    if (!this.world) throw pixErr(`${what} finns bara när det finns en bana. Välj en bana i Pixelvärlden.`, line, 'pixel-noworld');
    return this.world;
  }
  turtle(line) { return this.mainTurtle || (this.mainTurtle = new Turtle(this, line)); }
  setBg(c, line) { this.bg = parseColor(c, line); this.emit({ t: 'tbg', c: this.bg, line }); }
  snapshot() {
    return {
      world: this.world ? this.world.snapshot() : null,
      canvases: this.canvases.map((c) => c.snapshot()),
      lines: this.lines, fills: this.fills, dots: this.dots, bg: this.bg,
      turtles: this.turtles.map((t) => ({ x: t.x, y: t.y, h: t.h, visible: t.visible })),
    };
  }
}
