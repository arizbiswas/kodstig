// Python-tolken jämförd med riktig Python (CPython 3.13). Förväntad utskrift är
// hämtad från CPython, så testerna visar att Kodlabbet skriver ut samma sak.
// Fel jämförs bara som "blev det fel", eftersom Kodstigs felmeddelanden är på svenska.
import test from 'node:test';
import assert from 'node:assert/strict';
import { runPython } from '../../src/engine/python.js';

const CASES = [
 {
  "code": "print(7/2, 7//2, -7//2, 7%3, -7%3, 2**10, 2**-1, 10/5)",
  "out": "3.5 3 -4 1 2 1024 0.5 2.0\n"
 },
 {
  "code": "print(0.1+0.2, 1e20, 1e16, 123456789.0, 1/3, round(2.5), round(3.5), round(2.675, 2))",
  "out": "0.30000000000000004 1e+20 1e+16 123456789.0 0.3333333333333333 2 4 2.67\n"
 },
 {
  "code": "print(int(\"42\"), float(\"3.5\"), str(3.0), int(3.9), int(-3.9), abs(-2), max([3,1,2]), min(3,1,2), sum([1,2,3]))",
  "out": "42 3.5 3.0 3 -3 2 3 1 6\n"
 },
 {
  "code": "s = \"Hej Världen\"\nprint(s.upper(), s.lower(), s[0], s[-1], s[1:4], s[::-1], len(s), s.split(), s.replace(\"Hej\",\"Hejsan\"), s.find(\"V\"), \"ej\" in s)",
  "out": "HEJ VÄRLDEN hej världen H n ej  nedlräV jeH 11 ['Hej', 'Världen'] Hejsan Världen 4 True\n"
 },
 {
  "code": "print(f\"{3.14159:.2f} {42:5d}|{'x':>4}|{'y':<4}|{7:03d} {1234567:,}\")",
  "out": "3.14    42|   x|y   |007 1,234,567\n"
 },
 {
  "code": "l = [3,1,2]\nl.append(5); l.insert(0, 9); l.sort(); print(l); l.reverse(); print(l, l.pop(), l.index(3), l.count(1))\nprint(sorted([3,1,2], reverse=True), list(range(5,0,-2)), [x*x for x in range(5) if x%2==0])",
  "out": "[1, 2, 3, 5, 9]\n[9, 5, 3, 2] 1 2 0\n[3, 2, 1] [5, 3, 1] [0, 4, 16]\n"
 },
 {
  "code": "d = {\"a\": 1, \"b\": 2}\nd[\"c\"] = 3\nfor k, v in d.items(): print(k, v)\nprint(d.get(\"z\", 0), list(d.keys()), \"a\" in d, d)\ndel d[\"a\"]; print(d, len(d))",
  "out": "a 1\nb 2\nc 3\n0 ['a', 'b', 'c'] True {'a': 1, 'b': 2, 'c': 3}\n{'b': 2, 'c': 3} 2\n"
 },
 {
  "code": "t = (1, 2, 3)\na, b, c = t\nprint(a, b, c, t, (1,), set([1,2,2,3]), {1,2} | {3}, {1,2} & {2,3})",
  "out": "1 2 3 (1, 2, 3) (1,) {1, 2, 3} {1, 2, 3} {2}\n"
 },
 {
  "code": "def f(x, y=2, *args, **kw):\n    return x + y + sum(args)\nprint(f(1), f(1, 3), f(1, 2, 3, 4), f(x=5))",
  "out": "3 4 10 7\n"
 },
 {
  "code": "class Hund:\n    def __init__(self, namn):\n        self.namn = namn\n    def __str__(self):\n        return f\"Hund({self.namn})\"\nh = Hund(\"Rex\")\nprint(h, h.namn, str(h), [str(h)])",
  "out": "Hund(Rex) Rex Hund(Rex) ['Hund(Rex)']\n"
 },
 {
  "code": "class A:\n    def tal(self): return 1\nclass B(A):\n    def tal(self): return super().tal() + 1\nprint(B().tal(), isinstance(B(), A))",
  "out": "2 True\n"
 },
 {
  "code": "print(\"a\", \"b\", sep=\"-\", end=\"!\\n\")\nprint()\nprint(\"x\" * 3, [0] * 3, \"a,b,,c\".split(\",\"), \" hej \".strip(), \"-\".join([\"a\",\"b\"]))",
  "out": "a-b!\n\nxxx [0, 0, 0] ['a', 'b', '', 'c'] hej a-b\n"
 },
 {
  "code": "i = 0\nwhile True:\n    i += 1\n    if i == 2: continue\n    if i > 4: break\n    print(i)\nelse:\n    print(\"aldrig\")\nfor i in range(3):\n    pass\nelse:\n    print(\"else\", i)",
  "out": "1\n3\n4\nelse 2\n"
 },
 {
  "code": "print(True + True, None, [None, True], 3 == 3.0, \"abc\" < \"abd\", 1 < 2 < 3, not [], bool(\"\"), type(3), type(\"a\"), type([]))",
  "out": "2 None [None, True] True True True True False <class 'int'> <class 'str'> <class 'list'>\n"
 },
 {
  "code": "nums = [5, 3, 8]\nprint(list(enumerate(nums)), list(zip(\"ab\", [1,2])), any(n > 7 for n in nums), all(n > 2 for n in nums))\nprint(list(map(str, nums)), list(filter(lambda n: n > 4, nums)), sorted([\"b\",\"A\",\"c\"], key=str.lower))",
  "out": "[(0, 5), (1, 3), (2, 8)] [('a', 1), ('b', 2)] True True\n['5', '3', '8'] [5, 8] ['A', 'b', 'c']\n"
 },
 {
  "code": "x = [1, [2, 3]]\ny = x\ny.append(4)\nprint(x, x is y, x == [1,[2,3],4])\nprint(repr(\"hej\"), repr('it\\'s'), [\"a'b\"], {\"k\": \"v\"})",
  "out": "[1, [2, 3], 4] True True\n'hej' \"it's\" [\"a'b\"] {'k': 'v'}\n"
 },
 {
  "code": "print(divmod(17, 5), pow(2, 3), 10 ** 20, 2 ** 100, hex(255), bin(5), chr(65), ord(\"A\"))",
  "out": "(3, 2) 8 100000000000000000000 1267650600228229401496703205376 0xff 0b101 A 65\n"
 },
 {
  "code": "import math\nprint(math.sqrt(16), math.pi, math.floor(2.7), math.ceil(2.1))",
  "out": "4.0 3.141592653589793 2 3\n"
 },
 {
  "code": "s = \"abc\"\ns[0] = \"x\"",
  "error": true,
  "out": ""
 },
 {
  "code": "print(undefined_name)",
  "error": true,
  "out": ""
 },
 {
  "code": "l = [1,2]\nprint(l[5])",
  "error": true,
  "out": ""
 },
 {
  "code": "print(1.0, 2.50, 100.0/3, 3.0*2, float(10), -0.0, 1e-5, 5e-324 > 0)",
  "out": "1.0 2.5 33.333333333333336 6.0 10.0 -0.0 1e-05 True\n"
 },
 {
  "code": "text = \"\"\"rad1\nrad2\"\"\"\nprint(text, text.count(\"rad\"), text.splitlines(), \"Hej\".center(9, \"*\"), \"5\".zfill(3))",
  "out": "rad1\nrad2 2 ['rad1', 'rad2'] ***Hej*** 005\n"
 },
 {
  "code": "matris = [[1,2],[3,4]]\nfor rad in matris:\n    print(*rad)\nprint(matris[1][0], [r[0] for r in matris])",
  "out": "1 2\n3 4\n3 [1, 3]\n"
 },
 {
  "code": "global_x = 5\ndef g():\n    global global_x\n    global_x += 1\ng(); print(global_x)\ndef yttre():\n    n = 0\n    def inre():\n        nonlocal n\n        n += 1\n    inre(); return n\nprint(yttre())",
  "out": "6\n1\n"
 },
 {
  "code": "print(f\"{'Namn':<6}|{'Ålder':>6}|\")\nprint(f\"{2/3:.1%}\", f\"{5:>3}\", f\"{'hej'!r}\", f\"{3+4=}\")",
  "out": "Namn  | Ålder|\n66.7%   5 'hej' 3+4=7\n"
 },
 {
  "code": "a = 10\na //= 3; print(a); a **= 2; print(a); a %= 4; print(a)\nprint(round(1.23456, 3), round(-0.5), round(1234, -2))",
  "out": "3\n9\n1\n1.235 0 1200\n"
 },
 {
  "code": "for v in [0.5, 1.5, 2.5, -0.5, -1.5, 0.125, 0.375, 2.675, 1.005, 123.456, -2.5, 1e300]:\n    print(round(v), round(v, 2), round(v, 1), round(v, -1))",
  "out": "0 0.5 0.5 0.0\n2 1.5 1.5 0.0\n2 2.5 2.5 0.0\n0 -0.5 -0.5 -0.0\n-2 -1.5 -1.5 -0.0\n0 0.12 0.1 0.0\n0 0.38 0.4 0.0\n3 2.67 2.7 0.0\n1 1.0 1.0 0.0\n123 123.46 123.5 120.0\n-2 -2.5 -2.5 -0.0\n1000000000000000052504760255204420248704468581108159154915854115511802457988908195786371375080447864043704443832883878176942523235360430575644792184786706982848387200926575803737830233794788090059368953234970799945081119038967640880074652742780142494579258788820056842838115669472196386865459400540160 1e+300 1e+300 1e+300\n"
 },
 {
  "code": "for v in [1234, -1250, 1350, 15, 25, -15, 0]:\n    print(round(v, -1), round(v, -2), round(v, 1))",
  "out": "1230 1200 1234\n-1250 -1200 -1250\n1350 1400 1350\n20 0 15\n20 0 25\n-20 0 -15\n0 0 0\n"
 },
 {
  "code": "for v in [0.0001, 0.00001, 1e15, 1e16, 12345678901234567.0, 1.5e-7, -1e-10, 3.0e5, 2.5e-3, 1/7, 100.0, 1e22]:\n    print(v, str(v), repr(v))",
  "out": "0.0001 0.0001 0.0001\n1e-05 1e-05 1e-05\n1000000000000000.0 1000000000000000.0 1000000000000000.0\n1e+16 1e+16 1e+16\n1.2345678901234568e+16 1.2345678901234568e+16 1.2345678901234568e+16\n1.5e-07 1.5e-07 1.5e-07\n-1e-10 -1e-10 -1e-10\n300000.0 300000.0 300000.0\n0.0025 0.0025 0.0025\n0.14285714285714285 0.14285714285714285 0.14285714285714285\n100.0 100.0 100.0\n1e+22 1e+22 1e+22\n"
 },
 {
  "code": "for spec in ['.2f', '10.3f', '<10.1f', '+.2f', 'e', '.3e', 'E', 'g', '.3g', '.10g', 'G', '%', '.1%', '.0f', ',.2f', '015.3f', '.3', '', '10', '#.0f']:\n    print(spec, repr(format(1234.5678, spec)), repr(format(-0.000123, spec)), repr(format(2.5, spec)))",
  "out": ".2f '1234.57' '-0.00' '2.50'\n10.3f '  1234.568' '    -0.000' '     2.500'\n<10.1f '1234.6    ' '-0.0      ' '2.5       '\n+.2f '+1234.57' '-0.00' '+2.50'\ne '1.234568e+03' '-1.230000e-04' '2.500000e+00'\n.3e '1.235e+03' '-1.230e-04' '2.500e+00'\nE '1.234568E+03' '-1.230000E-04' '2.500000E+00'\ng '1234.57' '-0.000123' '2.5'\n.3g '1.23e+03' '-0.000123' '2.5'\n.10g '1234.5678' '-0.000123' '2.5'\nG '1234.57' '-0.000123' '2.5'\n% '123456.780000%' '-0.012300%' '250.000000%'\n.1% '123456.8%' '-0.0%' '250.0%'\n.0f '1235' '-0' '2'\n,.2f '1,234.57' '-0.00' '2.50'\n015.3f '00000001234.568' '-0000000000.000' '00000000002.500'\n.3 '1.23e+03' '-0.000123' '2.5'\n '1234.5678' '-0.000123' '2.5'\n10 ' 1234.5678' ' -0.000123' '       2.5'\n#.0f '1235.' '-0.' '2.'\n"
 },
 {
  "code": "for spec in ['b', '#b', 'o', '#o', 'x', '#x', 'X', '#X', '08b', '#010x', 'c', 'd', '5d', '<5d', ',d']:\n    print(spec, repr(format(77, spec)), repr(format(-77, spec) if spec != 'c' else ''))",
  "out": "b '1001101' '-1001101'\n#b '0b1001101' '-0b1001101'\no '115' '-115'\n#o '0o115' '-0o115'\nx '4d' '-4d'\n#x '0x4d' '-0x4d'\nX '4D' '-4D'\n#X '0X4D' '-0X4D'\n08b '01001101' '-1001101'\n#010x '0x0000004d' '-0x000004d'\nc 'M' ''\nd '77' '-77'\n5d '   77' '  -77'\n<5d '77   ' '-77  '\n,d '77' '-77'\n"
 },
 {
  "code": "print(f\"{'hej':*^11}|{'ab':.1}|{'x':>3}|{True}|{True:>6}|{None}|{[1,2]}|{3.0}|{1e20}\")\nw = 8; p = 2\nprint(f\"{3.14159:{w}.{p}f}|{42:>{w}}|\")",
  "out": "****hej****|a|  x|True|     1|None|[1, 2]|3.0|1e+20\n    3.14|      42|\n"
 },
 {
  "code": "x = 5; namn = \"Ada\"\nprint(f\"{x=}\", f\"{x = }\", f\"{namn=}\", f\"{x*2=}\", f\"{namn!r}\", f\"{namn!s:>5}\", f\"{x=:>4}\")",
  "out": "x=5 x = 5 namn='Ada' x*2=10 'Ada'   Ada x=   5\n"
 },
 {
  "code": "print(\"%s är %d år\" % (\"Ada\", 36))\nprint(\"%5.2f|%-6s|%06.1f|%x|%X|%o|%e|%r|%c|%%|%+d|% d|%i\" % (3.14159, \"hi\", -2.5, 255, 255, 8, 12345.678, \"a\", 65, 5, 5, 7.9))\nprint(\"%(namn)s har %(p)d poäng\" % {\"namn\": \"Bo\", \"p\": 7})\nprint(\"%d%%\" % 50, \"%s\" % [1, 2], \"%s\" % (1,), \"%.3s\" % \"abcdef\", \"%*d\" % (5, 3))",
  "out": "Ada är 36 år\n 3.14|hi    |-002.5|ff|FF|10|1.234568e+04|'a'|A|%|+5| 5|7\nBo har 7 poäng\n50% [1, 2] 1 abc     3\n"
 },
 {
  "code": "print(2 ** 100, 2 ** 64 - 1, -2 ** 63, 10 ** 30 // 7, 10 ** 30 % 7, (-10) ** 21)\nf = 1\nfor i in range(1, 31): f *= i\nprint(f, f // 10 ** 20, f % 1000, len(str(f)), f > 10 ** 30, f == f + 0, str(f)[:5])\nprint(int(\"123456789012345678901234567890\") + 1, 2 ** 53 + 1, 9007199254740993 - 1, abs(-2 ** 70), -(2**70))\nprint(hex(2 ** 70), bin(5), oct(64), hex(-255), int(\"ff\", 16), int(\"0b101\", 2), int(\"777\", 8), 0xff, 0b1010, 0o17, 1_000_000)\nprint(float(2 ** 70), 2 ** 70 / 2, 2 ** 70 * 1.0, int(1e20), int(1e22), int(-3.99), round(1e20), 2 ** -2, (2**70) // 3 * 3)\nprint({2**70: \"stor\"}[2**70], sorted([2**70, 5, -2**65]), max(2**64, 2**63), sum([2**60] * 20), divmod(2**70, 10**9))",
  "out": "1267650600228229401496703205376 18446744073709551615 -9223372036854775808 142857142857142857142857142857 1 -1000000000000000000000\n265252859812191058636308480000000 2652528598121 0 33 True True 26525\n123456789012345678901234567891 9007199254740993 9007199254740992 1180591620717411303424 -1180591620717411303424\n0x400000000000000000 0b101 0o100 -0xff 255 5 511 255 10 15 1000000\n1.1805916207174113e+21 5.902958103587057e+20 1.1805916207174113e+21 100000000000000000000 10000000000000000000000 -3 100000000000000000000 0.25 1180591620717411303423\nstor [-36893488147419103232, 5, 1180591620717411303424] 18446744073709551616 23058430092136939520 (1180591620717, 411303424)\n"
 },
 {
  "code": "a = [0, 1, 2, 3, 4, 5, 6]\ndel a[0]; print(a); del a[-1]; print(a); del a[1:3]; print(a); del a[::2]; print(a)\nd = {\"x\": 1, \"y\": 2}; del d[\"x\"]; print(d)\nz = 3; del z\ntry:\n    print(z)\nexcept NameError:\n    print(\"borta\")\nclass P: pass\np = P(); p.q = 1; del p.q; print(hasattr(p, \"q\"))",
  "out": "[1, 2, 3, 4, 5, 6]\n[1, 2, 3, 4, 5]\n[1, 4, 5]\n[4]\n{'y': 2}\nborta\nFalse\n"
 },
 {
  "code": "def f(a, *args, sep=\"-\", **kw):\n    return sep.join(str(x) for x in (a,) + args) + str(sorted(kw.items()))\nprint(f(1), f(1, 2, 3), f(1, 2, sep=\"+\"), f(1, x=5, y=6), f(*[7, 8, 9]), f(**{\"a\": 1, \"z\": 2}))\ndef g(x, y, z): return x * 100 + y * 10 + z\nt = (1, 2, 3); d = {\"z\": 9, \"y\": 8}\nprint(g(*t), g(1, **d), g(*[1], *[2, 3]))\ndef h(*, n): return n\nprint(h(n=4))\ndef m(lista=[]):\n    lista.append(1)\n    return lista\nprint(m(), m(), m([0]))\nprint(*[1, 2, 3], sep=\", \")\nprint(*\"abc\")",
  "out": "1[] 1-2-3[] 1+2[] 1[('x', 5), ('y', 6)] 7-8-9[] 1[('z', 2)]\n123 189 123\n4\n[1, 1] [1, 1] [0, 1]\n1, 2, 3\na b c\n"
 },
 {
  "code": "for n in range(2, 12):\n    for d in range(2, n):\n        if n % d == 0:\n            break\n    else:\n        print(n, \"är primtal\")\ni = 0\nwhile i < 3:\n    i += 1\nelse:\n    print(\"klar\", i)",
  "out": "2 är primtal\n3 är primtal\n5 är primtal\n7 är primtal\n11 är primtal\nklar 3\n"
 },
 {
  "code": "def räknare():\n    n = 0\n    def öka():\n        nonlocal n\n        n += 1\n        return n\n    return öka\nr = räknare(); r(); r(); print(r())",
  "out": "3\n"
 },
 {
  "code": "print(\"a b  c \".split(), \"a b  c \".split(None, 1), \"a,b,c\".split(\",\", 1), \"a,b,c\".rsplit(\",\", 1), \" x \".rsplit())\nprint(\"rad1\\nrad2\\n\".splitlines(), \"xxhejxx\".strip(\"x\"), \"..a..\".lstrip(\".\"), \"..a..\".rstrip(\".\"), \"a-b-c\".replace(\"-\", \"+\", 1))\nprint(\"hej\".center(9, \"*\"), \"5\".zfill(3), \"-5\".zfill(4), \"Hej Du\".swapcase(), \"k=v=w\".partition(\"=\"), \"k=v=w\".rpartition(\"=\"))\nprint(\"filnamn.txt\".removesuffix(\".txt\"), \"ab\".startswith((\"x\", \"a\")), \"abc\".find(\"c\", 1), \"abcabc\".rfind(\"b\"), \"Hej Du\".istitle())\nprint(sorted([\"b\", \"A\", \"c\"], key=str.lower), list(map(str.upper, [\"a\", \"b\"])), type(3) == int, type(\"a\") is str, type(3.0).__name__, int.__name__)\nprint(type(3), type([]), type(None), str(type(True)), isinstance(True, int))",
  "out": "['a', 'b', 'c'] ['a', 'b  c '] ['a', 'b,c'] ['a,b', 'c'] ['x']\n['rad1', 'rad2'] hej a.. ..a a+b-c\n***hej*** 005 -005 hEJ dU ('k', '=', 'v=w') ('k=v', '=', 'w')\nfilnamn True 2 4 True\n['A', 'b', 'c'] ['A', 'B'] True True float int\n<class 'int'> <class 'list'> <class 'NoneType'> <class 'bool'> True\n"
 },
 {
  "code": "d = {\"a\": 1}\nd.update(b=2); d.update([(\"c\", 3)]); print(d, d.popitem(), d)\nprint(format(3.14159, \".2f\"), format(42), format(\"x\", \">3\"), format(1234567, \",\"))",
  "out": "{'a': 1, 'b': 2} ('c', 3) {'a': 1, 'b': 2}\n3.14 42   x 1,234,567\n"
 },
 {
  "code": "print(round(0.5), round(1.5), round(-0.5), round(7), round(7, -1), round(True), round(2.5, 0), round(-2.675, 2))\nprint(f\"{0.125:.2f} {0.375:.2f} {2.675:.2f} {1.5:.0f} {2.5:.0f} {-0.0:.1f} {1e22:.2f}\")",
  "out": "0 2 0 7 10 1 2.0 -2.67\n0.12 0.38 2.67 2 2 -0.0 10000000000000000000000.00\n"
 },
 {
  "code": "print(\"{} och {}\".format(\"a\", \"b\"), \"{1} {0}\".format(\"x\", \"y\"), \"{n} är {a}\".format(n=\"Bo\", a=3))\nprint(\"{:>6}|{:.2f}|{!r}|{{}}\".format(\"hi\", 2/3, \"s\"))",
  "out": "a och b y x Bo är 3\n    hi|0.67|'s'|{}\n"
 }
];

CASES.forEach((c, i) => {
  test(`python som CPython #${i + 1}: ${c.code.split('\n')[0].slice(0, 60)}`, () => {
    const r = runPython(c.code);
    if (c.error) assert.ok(r.error, 'CPython ger fel här, men inte Kodstig');
    else assert.equal(r.error, null, r.error && r.error.message);
    assert.equal(r.output, c.out);
  });
});
