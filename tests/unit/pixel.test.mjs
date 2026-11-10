import test from 'node:test';
import assert from 'node:assert/strict';
import { runPython } from '../../src/engine/python.js';
import { runCSharp } from '../../src/engine/csharp.js';
import { runPixel } from '../../src/engine/pixel/run.js';
import { parseColor, MAX_EVENTS } from '../../src/engine/pixel/core.js';

const runners = { python: runPython, csharp: runCSharp };
const py = (code, level) => runPixel('python', code, { level, runners });
const cs = (code, level) => runPixel('csharp', code, { level, runners });
const LEVEL = { map: ['#######', '#S.k.G#', '#######'], goals: ['goal', 'items'] };

test('pixel: hjälten går, plockar och når målet, med radnummer på varje händelse', () => {
  const r = py('hjalte.move_right()\nhjalte.move_right()\nhjalte.pick()\nhjalte.move(2)\nprint(hjalte.x, hjalte.y, hjalte.items, hjalte.at_goal())', LEVEL);
  assert.equal(r.error, null);
  assert.equal(r.output, "5 1 ['key'] True\n");
  assert.deepEqual(r.events.map((e) => `${e.t}@${e.line}`), ['move@1', 'move@2', 'pick@3', 'move@4', 'move@4']);
  assert.deepEqual(r.goals, [{ text: 'Hjälten står på flaggan', met: true }, { text: 'Alla saker är upplockade', met: true }]);
  assert.deepEqual(r.final.world.hero, { x: 5, y: 1, dir: 'right', bag: ['key'] });
});

test('pixel: samma bana i C#, med sensorer och while', () => {
  const r = cs('while (Hjalte.CanMove(Dir.Right))\n{\n    Hjalte.MoveRight();\n    if (Hjalte.OnItem()) Hjalte.Pick();\n}\nConsole.WriteLine($"{Hjalte.X} {Hjalte.AtGoal()} {World.ItemsLeft()} {Hjalte.Dir}");', LEVEL);
  assert.equal(r.error, null);
  assert.equal(r.output, '5 True 0 Right\n');
  assert.ok(r.goals.every((g) => g.met));
  assert.equal(r.events.filter((e) => e.t === 'move').length, 4);
});

test('pixel: vägg ger ett vänligt fel, en studs och en pratbubbla, och stoppar', () => {
  const r = py('for i in range(10):\n    hjalte.move_right()\nprint("hit kommer vi inte")', LEVEL);
  assert.equal(r.error.hint, 'pixel-wall');
  assert.equal(r.error.line, 2);
  assert.match(r.error.message, /^Jag kan inte gå in i väggen! Hjälten står på \(5, 1\)/);
  assert.equal(r.output, '');
  assert.deepEqual(r.events.slice(-2).map((e) => [e.t, e.ok ?? e.text]), [['move', false], ['say', 'Jag kan inte gå in i väggen!']]);
  assert.equal(r.goals[0].met, true, 'målen räknas ändå på läget där hjälten stannade');
  const c = cs('Hjalte.MoveUp();', LEVEL);
  assert.equal(c.error.hint, 'pixel-wall');
});

test('pixel: vatten, låst dörr, nyckel och open()', () => {
  const lv = { map: ['#######', '#Sk.DG#', '#~~~~~#'], goals: ['goal', 'doors'] };
  assert.equal(py('hjalte.move_down()', lv).error.hint, 'pixel-water');
  assert.equal(py('hjalte.move(3)', lv).error.hint, 'pixel-door');
  assert.equal(py('hjalte.move(2)\nhjalte.open()', lv).error.hint, 'pixel-open');
  const ok = py('hjalte.move_right()\nhjalte.pick()\nhjalte.move_right()\nhjalte.open()\nhjalte.move(2)', lv);
  assert.equal(ok.error, null);
  assert.ok(ok.goals.every((g) => g.met));
  assert.equal(py('hjalte.pick()', lv).error.hint, 'pixel-pick');
});

test('pixel: turn_left, move framåt och egen turn_right av tre vänster', () => {
  const lv = { map: ['#####', '#S..#', '#.#.#', '#..G#', '#####'] };
  const code = 'def turn_right():\n    for i in range(3):\n        hjalte.turn_left()\n\nhjalte.move(2)\nturn_right()\nhjalte.move(2)';
  const r = py(code, lv);
  assert.equal(r.error, null);
  assert.equal(r.goals[0].met, true);
  assert.equal(r.final.world.hero.dir, 'down');
});

test('pixel: flera startvärldar avslöjar en hårdkodad väg', () => {
  const lv = { map: ['#####', '#S.G#', '#####'], worlds: [['######', '#S..G#', '######']], goals: ['goal'] };
  const hard = py('hjalte.move(2)', lv);
  assert.equal(hard.goals[0].met, false);
  assert.equal(hard.otherWorld.index, 2);
  const loop = py('while not hjalte.at_goal():\n    hjalte.move_right()', lv);
  assert.equal(loop.goals[0].met, true);
  assert.equal(loop.otherWorld, undefined);
});

test('pixel: banan kan begränsa vilka kommandon som får användas', () => {
  const lv = { map: ['####', '#SG#', '####'], allowed: ['move', 'turn_left'] };
  const r = py('hjalte.move_right()', lv);
  assert.equal(r.error.hint, 'pixel-allowed');
  assert.match(r.error.message, /move\(\), turn_left\(\)/);
  assert.equal(py('hjalte.move()', lv).goals[0].met, true);
});

test('pixel: tak för antal händelser', () => {
  const r = py('import turtle\nwhile True:\n    turtle.left(1)', null);
  assert.equal(r.error.hint, 'infinite-loop');
  assert.ok(r.events.length <= MAX_EVENTS);
});

test('turtle: kvadrat och femhörning som i riktig Python', () => {
  const sq = py('import turtle\nt = turtle.Turtle()\nfor i in range(4):\n    t.forward(100)\n    t.left(90)\nprint(t.position(), t.heading())');
  assert.equal(sq.error, null);
  assert.equal(sq.output, '(0.0, 0.0) 0.0\n');
  assert.deepEqual(sq.final.lines.map((l) => [l.x1, l.y1, l.x2, l.y2]), [[0, 0, 100, 0], [100, 0, 100, 100], [100, 100, 0, 100], [0, 100, 0, 0]]);
  const pent = py('from turtle import *\nfor i in range(5):\n    forward(50)\n    right(360 / 5)\nprint(round(xcor(), 6), round(ycor(), 6), heading())\ndone()');
  assert.equal(pent.output, '0.0 0.0 0.0\n');
  assert.equal(pent.final.lines.length, 5);
  assert.equal(pent.final.lines[1].y2 < 0, true, 'right() vrider medurs, y uppåt');
});

test('turtle: penna, färg, fyllning, cirkel och flera sköldpaddor', () => {
  const r = py('import turtle\nturtle.penup()\nturtle.forward(50)\nturtle.pendown()\nturtle.color("red", "yellow")\nturtle.begin_fill()\nturtle.circle(30)\nturtle.end_fill()\nb = turtle.Turtle()\nb.pencolor("#00f")\nb.backward(10)\nturtle.bgcolor("sky")\nprint(turtle.isdown(), b.pencolor())');
  assert.equal(r.error, null);
  assert.equal(r.output, 'True #0000ff\n');
  assert.equal(r.final.lines.filter((l) => l.c === 'red').length > 8, true);
  assert.equal(r.final.lines.some((l) => l.x1 === 0 && l.x2 === 50), false, 'pennan uppe ritar inget');
  assert.equal(r.final.fills.length, 1);
  assert.equal(r.final.fills[0].c, 'yellow');
  assert.equal(r.final.bg, 'sky');
  const c = cs('var t = new Turtle();\nt.Speed = 0;\nt.PenColor = Color.Red;\nfor (int i = 0; i < 6; i++)\n{\n    t.Forward(40);\n    t.Left(360 / 6);\n}\nConsole.WriteLine($"{Math.Round(t.X, 6)} {t.Heading} {t.PenColor} {t.Speed}");');
  assert.equal(c.error, null);
  assert.equal(c.output, '0 0 Red 0\n');
  assert.equal(c.final.lines.length, 6);
});

test('pixelrutnät: set_pixel, draw med bokstäver, get_pixel och tydliga fel', () => {
  const r = py('grid = Canvas(4, 3)\ngrid.fill("white")\ngrid.set_pixel(0, 0, "red")\ngrid.draw(["..b", "gg."])\nprint(grid.get_pixel(0, 0), grid.get_pixel(2, 0), grid.get_pixel(1, 1), grid.get_pixel(3, 2), grid.width)');
  assert.equal(r.output, 'red blue green white 4\n');
  assert.deepEqual(r.final.canvases[0].px[1], ['green', 'green', 'white', 'white']);
  const out = py('grid = Canvas(16, 16)\nfor x in range(17):\n    grid.set_pixel(x, 0, "red")');
  assert.equal(out.error.hint, 'pixel-range');
  assert.match(out.error.message, /x går från 0 till 15/);
  assert.equal(py('Canvas(4, 4).set_pixel(0, 0, "rött")').error.hint, 'pixel-color');
  const c = cs('var g = new PixelGrid(3, 2);\nstring[] rader = { "..b", "gg." };\ng.Draw(rader);\ng.SetPixel(0, 0, Color.Purple);\nConsole.WriteLine(g.GetPixel(0, 0) + " " + g.GetPixel(2, 0) + " " + g.Width);');
  assert.equal(c.output, 'purple blue 3\n');
  assert.equal(parseColor('#F80'), '#ff8800');
});

test('pixel: API:t finns bara i Pixelvärlden och felen förklarar varför', () => {
  assert.match(runPython('import turtle').error.message, /Pixelvärlden/);
  assert.match(runPython('hjalte.move_right()').error.message, /Pixelvärlden/);
  assert.match(runCSharp('var t = new Turtle();').error.message, /Pixelvärlden/);
  assert.match(runCSharp('Hjalte.MoveRight();').error.message, /Pixelvärlden/);
  assert.equal(py('hjalte.move_right()', null).error.hint, 'pixel-noworld');
  assert.match(cs('Hjalte.moveRight();', LEVEL).error.message, /Menade du MoveRight\?/);
  assert.match(py('hjalte.moveRight()', LEVEL).error.message, /Menade du move_right\?/);
  assert.match(cs('Hjalte.X();', LEVEL).error.message, /egenskap/);
});

test('ritövningar: riktad återkoppling på vinklar, sidor, penna och pixlar', async () => {
  const { grade } = await import('../../src/engine/grade.js');
  const pixelRunner = async (lang, code, level) => runPixel(lang, code, { level, runners });
  const ex = { type: 'world', draw: true, solution: 'import turtle\nt = turtle.Turtle()\nfor i in range(5):\n    t.forward(100)\n    t.left(72)' };
  const g = (code, e = ex, lang = 'python') => grade(e, code, { lang, pixelRunner });
  assert.match((await g('import turtle\nt = turtle.Turtle()\nfor i in range(5):\n    t.forward(100)\n    t.left(71)')).detail, /vred 71 grader, men det behövs 72.*360 \/ 5/);
  assert.match((await g('import turtle\nt = turtle.Turtle()\nfor i in range(5):\n    t.forward(100)\n    t.left(108)')).detail, /inre vinkeln.*360 \/ 5 = 72/);
  assert.match((await g('import turtle\nt = turtle.Turtle()\nfor i in range(5):\n    t.forward(100)\n    t.right(72)')).detail, /åt fel håll/);
  assert.equal((await g('import turtle\nt = turtle.Turtle()\nfor i in range(10):\n    t.forward(50)\n    if i % 2 == 1:\n        t.left(72)')).ok, true, 'en sida i två delar räknas som samma sida');
  const sq = { type: 'world', draw: true, solution: 'import turtle\nt = turtle.Turtle()\nfor i in range(4):\n    t.forward(100)\n    t.left(90)' };
  assert.match((await g('import turtle\nt = turtle.Turtle()\nfor i in range(4):\n    t.forward(100 if i != 2 else 80)\n    t.left(90)', sq)).detail, /Sida 3/);
  const dash = { type: 'world', draw: true, solution: 'import turtle\nt = turtle.Turtle()\nt.forward(50)\nt.penup()\nt.forward(30)\nt.pendown()\nt.forward(50)' };
  assert.match((await g('import turtle\nt = turtle.Turtle()\nt.forward(130)', dash)).detail, /penup\(\)/);
  assert.match((await g('var t = new Turtle();\nt.Forward(130);', { ...dash, solution: 'var t = new Turtle();\nt.Forward(50);\nt.PenUp();\nt.Forward(30);\nt.PenDown();\nt.Forward(50);' }, 'csharp')).detail, /PenUp\(\)/);
  const art = { type: 'world', draw: true, solution: 'grid = Canvas(3, 2)\ngrid.draw(["r.r", ".r."])' };
  assert.match((await g('grid = Canvas(3, 2)\ngrid.draw(["r.r", "..."])', art)).detail, /1 ruta skiljer.*\(1, 1\) vara röd, men den är tom/);
  assert.match((await g('grid = Canvas(4, 2)', art)).detail, /3 brett och 2 högt/);
  const free = { type: 'world', check: { canvas: { minColors: 2, minPixels: 3 } }, solution: '' };
  assert.match((await g('grid = Canvas(4, 4)\ngrid.set_pixel(0, 0, "red")', free)).detail, /minst 2/);
  const par = { type: 'world', level: { map: ['#####', '#S.G#', '#####'] }, par: 2, solution: '' };
  assert.match((await g('for i in range(2):\n    hjalte.move_right()', par)).detail, /Extrastjärna/);
  assert.match((await g('hjalte.move_right()\nhjalte.move_right()\nhjalte.say("klar")', par)).detail, /frivilligt/);
});
