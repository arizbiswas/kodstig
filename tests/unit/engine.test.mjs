import test from 'node:test';
import assert from 'node:assert/strict';
import { runPython } from '../../src/engine/python.js';
import { runCSharp } from '../../src/engine/csharp.js';
import { getHints } from '../../src/engine/hints.js';

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
  python: ['print("hej)', 'if True\n    print(1)', 'print(x)', 'print("a" + 1)', 'print(1/0)', 'l = [1]\nprint(l[3])', 'while True:\n    pass', 'x = 1\nif x = 1:\n    print(x)', 'if True:\nprint(1)', 'def f(a):\n    return a\nf()'],
  csharp: ['Console.WriteLine("hej")', 'Console.WriteLine(x);', 'int x = "a";', 'int y = 2.5;', 'int a = 0;\nConsole.WriteLine(1 / a);', 'int[] t = {1};\nConsole.WriteLine(t[2]);', 'int x = 1;\nif (x = 1) { }', 'Console.Writeline("x");', 'if (true) {\nConsole.WriteLine(1);', 'int x;\nConsole.WriteLine(x);'],
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
