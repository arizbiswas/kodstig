import test from 'node:test';
import assert from 'node:assert/strict';
import { runPython } from '../../src/engine/python.js';
import { runCSharp } from '../../src/engine/csharp.js';
import { getHints } from '../../src/engine/hints.js';
import { grade } from '../../src/engine/grade.js';

test('python: oändlig loop stoppas av stegbudgeten', () => {
  const r = runPython('while True:\n    x = 1');
  assert.equal(r.error.hint, 'infinite-loop');
});
test('c#: oändlig loop stoppas av stegbudgeten', () => {
  const r = runCSharp('int i = 0;\nwhile (i < 10) { }');
  assert.equal(r.error.hint, 'infinite-loop');
});
test('python: elevkod kommer inte åt JavaScript-miljön', () => {
  for (const code of ['print(globalThis)', 'print(window)', 'print(constructor)', 'print("".constructor)', 'import os', '__import__("os")']) {
    const r = runPython(code);
    assert.ok(r.error, code);
  }
});
test('c#: elevkod kommer inte åt JavaScript-miljön', () => {
  for (const code of ['Console.WriteLine(globalThis);', 'Console.WriteLine(window.document);', 'Console.WriteLine("".constructor);', 'System.IO.File.ReadAllText("x");']) {
    const r = runCSharp(code);
    assert.ok(r.error, code);
  }
});
test('c#: kompileringsfel visar ingen halv utskrift', () => {
  const r = runCSharp('Console.WriteLine("före");\nint x = "fel";');
  assert.equal(r.output, '');
  assert.equal(r.error.phase, 'compile');
});

const ERRORS = {
  python: ['print("hej)', 'if True\n    print(1)', 'print(x)', 'print("a" + 1)', 'print(1/0)', 'l = [1]\nprint(l[3])', 'while True:\n    pass', 'x = 1\nif x = 1:\n    print(x)', 'if True:\nprint(1)', 'def f(a):\n    return a\nf()', 'raise ValueError("x")', 'class A:\n    def m():\n        pass\nA().m()', 'class B:\n    pass\nB(1)', 'try:\n    x = 1\nprint(x)', 'try:\n    x = 1\nexcept 5:\n    pass\nprint(1/0)', 'super()'],
  csharp: ['Console.WriteLine("hej")', 'Console.WriteLine(x);', 'int x = "a";', 'int y = 2.5;', 'int a = 0;\nConsole.WriteLine(1 / a);', 'int[] t = {1};\nConsole.WriteLine(t[2]);', 'int x = 1;\nif (x = 1) { }', 'Console.Writeline("x");', 'if (true) {\nConsole.WriteLine(1);', 'int x;\nConsole.WriteLine(x);',
    'throw new ArgumentException("x");', 'var d = new Dictionary<string, int>();\nConsole.WriteLine(d["a"]);', 'class K { private int s; }\nConsole.WriteLine(new K().s);',
    'abstract class F { }\nvar f = new F();', 'class A { public virtual string M() => "a"; }\nclass B : A { public string M() => "b"; }', 'class P { public string ToString() => "p"; }',
    'switch (1) { case 1: Console.WriteLine(1); case 2: break; }', 'var l = new List<int> { 1 };\nforeach (var x in l) l.Add(2);', 'var t = new List<int>();\nConsole.WriteLine(t.Max());',
    'List<int> j = new List<int> { 1 }.Where(x => x > 0);', 'int.Parse("a");', 'class H { public H(int a) { } }\nvar h = new H();'],
};

for (const [lang, codes] of Object.entries(ERRORS)) {
  test(`${lang}: tre stegvisa tips med körbart exempel för vanliga fel`, () => {
    const run = lang === 'csharp' ? runCSharp : runPython;
    for (const code of codes) {
      const r = run(code);
      assert.ok(r.error, code);
      const h = getHints(lang, code, r);
      assert.equal(h.steps.length, 3, code);
      assert.ok(typeof h.steps[0] === 'string' && typeof h.steps[1] === 'string');
      const ex = run(h.steps[2].example);
      assert.equal(ex.error, null, `exemplet för ${r.error.hint} ska gå att köra: ${h.steps[2].example} -> ${ex.error && ex.error.message}`);
    }
  });
}

test('tips när koden fungerar och för webben', () => {
  const ok = getHints('python', 'x = 1\nprint(x)', runPython('x = 1\nprint(x)'));
  assert.equal(ok.key, 'ok');
  assert.equal(runPython(ok.steps[2].example).error, null);
  assert.equal(getHints('web', '<style>\nh1 { color: red;\n</style><h1>x</h1>').key, 'css-braces');
  assert.equal(getHints('web', '<style>\nh1 { color: red; }').key, 'style-unclosed');
  assert.equal(getHints('web', '<p>hej').key, 'tag-unclosed');
});

test('python: undantag, klasser och mängder', () => {
  const r = runPython('class Konto:\n    def __init__(self, saldo):\n        self.saldo = saldo\n    def ta_ut(self, b):\n        if b > self.saldo:\n            raise ValueError("för lite")\n        self.saldo -= b\nk = Konto(100)\ntry:\n    k.ta_ut(150)\nexcept ValueError as e:\n    print("Fel:", e)\nk.ta_ut(30)\nprint(k.saldo)\nprint(sorted({3, 1, 3}))');
  assert.equal(r.error, null);
  assert.equal(r.output, 'Fel: för lite\n70\n[1, 3]\n');
  const loop = runPython('while True:\n    try:\n        pass\n    except Exception:\n        pass');
  assert.equal(loop.error.hint, 'infinite-loop', 'stegbegränsningen går inte att fånga');
  const probe = runPython('class A:\n    pass\na = A()\nprint(hasattr(a, "constructor"), hasattr(a, "__proto__"))');
  assert.equal(probe.output, 'False False\n');
});

test('python: listbyggare utan hakparenteser, mängdbyggare, dict() och rader inom parenteser', () => {
  const r = runPython('elever = [\n    {"namn": "Ada", "p": 9},\n    {"namn": "Bo", "p": 7},\n]\nprint(sum(e["p"] for e in elever))\nprint(sorted({x % 3 for x in range(7)}))\nprint(dict(a=1), dict([("b", 2)]), min([], default=0))\nif True:\n    t = (1 +\n  2)\n    print(t)');
  assert.equal(r.error, null);
  assert.equal(r.output, "16\n[0, 1, 2]\n{'a': 1} {'b': 2} 0\n3\n");
});

test('c#: klasser, arv, interface, undantag, Dictionary och LINQ', () => {
  const code = `interface IForm { double Area(); }
abstract class Djur
{
    public string Namn { get; }
    public Djur(string namn) { Namn = namn; }
    public abstract string Ljud();
    public virtual string Presentera() => $"{Namn} säger {Ljud()}";
    public override string ToString() => $"Djur({Namn})";
}
class Hund : Djur
{
    public Hund(string n) : base(n) { }
    public override string Ljud() => "voff";
}
class Rekt : IForm { public double B { get; set; } public double H { get; set; } public double Area() => B * H; }
Djur d = new Hund("Rex");
Console.WriteLine(d.Presentera());
Console.WriteLine(d);
Console.WriteLine(new Rekt { B = 2, H = 3 }.Area());
try { throw new InvalidOperationException("nej"); }
catch (Exception e) { Console.WriteLine("fångade " + e.Message); }
finally { Console.WriteLine("finally"); }
var lager = new Dictionary<string, int> { ["äpple"] = 3 };
lager["päron"] = 5;
if (lager.TryGetValue("päron", out int n)) Console.WriteLine(n);
var tal = new List<int> { 5, 3, 8, 1 };
Console.WriteLine(string.Join(",", tal.Where(x => x > 2).OrderBy(x => x).Select(x => x * 10)));
Console.WriteLine(tal.Sum() + " " + tal.Count(x => x % 2 == 1));
switch (tal.Count) { case 4: Console.WriteLine("fyra"); break; default: Console.WriteLine("?"); break; }`;
  const r = runCSharp(code);
  assert.equal(r.error, null, r.error && r.error.message);
  assert.equal(r.output, 'Rex säger voff\nDjur(Rex)\n6\nfångade nej\nfinally\n5\n30,50,80\n17 3\nfyra\n');
  const loop = runCSharp('try { while (true) { } } catch (Exception) { Console.WriteLine("fångad"); }');
  assert.equal(loop.error.hint, 'infinite-loop', 'stegbegränsningen går inte att fånga i C# heller');
});

test('c#: tom Select, typomvandling till interface, as och saknade interface-metoder', () => {
  const r = runCSharp('List<int> t = new List<int>();\nList<string> s = t.Select(x => x.ToString()).ToList();\nConsole.WriteLine(s.Count);\ninterface IF { string Flyg(); }\nclass D { }\nclass F : D, IF { public string Flyg() => "flyger"; }\nD f = new F();\nConsole.WriteLine(((IF)f).Flyg());\nConsole.WriteLine((new D() as IF) == null);');
  assert.equal(r.error, null, r.error && r.error.message);
  assert.equal(r.output, '0\nflyger\nTrue\n');
  assert.equal(runCSharp('class D { }\ninterface IF { }\nIF x = (IF)new D();').error.kind, 'InvalidCastException');
  assert.equal(runCSharp('interface IA { void M(); }\nclass B : IA { }\nConsole.WriteLine(1);').error.kind, 'CS0535');
});

test('indata: input() och Console.ReadLine() läser en rad i taget', async () => {
  const py = runPython('namn = input("Namn? ")\nålder = int(input())\nprint(f"{namn} {ålder + 1}")', { input: 'Ali\n12\n' });
  assert.equal(py.error, null);
  assert.equal(py.output, 'Namn? Ali 13\n');
  const slut = runPython('input()\ninput()', { input: 'bara en' });
  assert.equal(slut.error.kind, 'EOFError');
  const cs = runCSharp('string namn = Console.ReadLine();\nint n = int.Parse(Console.ReadLine());\nConsole.WriteLine($"{namn} {n + 1}");\nConsole.WriteLine(Console.ReadLine() == null);', { input: 'Ali\n12' });
  assert.equal(cs.error, null);
  assert.equal(cs.output, 'Ali 13\nTrue\n');
});

test('slump och math: samma frö ger samma tal, talen håller sig inom gränserna', () => {
  const code = 'import random\nfrom math import sqrt, floor\ntal = [random.randint(1, 6) for _ in range(200)]\nprint(min(tal), max(tal))\nprint(sqrt(9), floor(2.9))\nxs = [1, 2, 3]\nrandom.shuffle(xs)\nprint(sorted(xs))';
  const a = runPython(code, { seed: 5 });
  assert.equal(a.error, null);
  assert.equal(a.output, '1 6\n3.0 2\n[1, 2, 3]\n');
  assert.equal(runPython('import random\nprint(random.random())', { seed: 9 }).output, runPython('import random\nprint(random.random())', { seed: 9 }).output);
  assert.equal(runPython('import os').error.kind, 'ModuleNotFoundError');
  const cs = runCSharp('Random rnd = new Random();\nint lo = 10, hi = 0;\nfor (int i = 0; i < 200; i++) { int t = rnd.Next(1, 7); lo = Math.Min(lo, t); hi = Math.Max(hi, t); }\nConsole.WriteLine($"{lo} {hi}");', { seed: 3 });
  assert.equal(cs.error, null);
  assert.equal(cs.output, '1 6\n');
});

test('rättning med indata och slump: flera körningar, utskrift som mönster', async () => {
  const runner = async (lang, code, calls, opts = {}) => runPython(code, { calls, ...opts });
  const ex = { type: 'code', runs: [{ input: '3', output: '6' }, { input: '-1', output: '-2' }] };
  assert.ok((await grade(ex, 'print(int(input()) * 2)', { lang: 'python', runner })).ok);
  const bad = await grade(ex, 'print(6)', { lang: 'python', runner });
  assert.ok(!bad.ok);
  assert.equal(bad.tests.filter((t) => t.ok).length, 1);
  const dice = { type: 'code', runs: [{ outputRe: 'Du slog [1-6]', repeat: 20 }] };
  assert.ok((await grade(dice, 'import random\nprint("Du slog", random.randint(1, 6))', { lang: 'python', runner })).ok);
  assert.ok(!(await grade(dice, 'import random\nprint("Du slog", random.randint(0, 6))', { lang: 'python', runner })).ok, 'en nolla hittas till slut');
});
