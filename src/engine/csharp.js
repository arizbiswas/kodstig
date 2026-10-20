// En avgränsad C#-tolk för Kodstigs övningar.
// Stöder toppnivåsatser, klasser med fält, egenskaper, konstruktorer, arv,
// interface och virtuella metoder, undantag (try/catch/finally/throw), switch,
// List<T>, Dictionary<K,V>, lambdas och de vanligaste LINQ-metoderna, plus
// Console, Math och string. Typfel och namnfel rapporteras som kompileringsfel.
// Ingen JavaScript-eval används.
import { CodeError, StepLimit, MAX_STEPS, MAX_OUTPUT } from './errors.js';

const TYPE_KW = new Set(['int', 'double', 'string', 'bool', 'char', 'var', 'decimal', 'float', 'long', 'void', 'object']);
const KW = new Set([...TYPE_KW, 'if', 'else', 'while', 'for', 'foreach', 'in', 'do', 'return', 'break', 'continue', 'new',
  'true', 'false', 'null', 'static', 'public', 'private', 'class', 'using', 'namespace', 'const', 'internal', 'switch', 'case', 'default',
  'try', 'catch', 'finally', 'throw', 'this', 'base', 'override', 'virtual', 'abstract', 'protected', 'readonly', 'interface', 'is', 'sealed']);
const OPS = ['<<=', '>>=', '++', '--', '+=', '-=', '*=', '/=', '%=', '==', '!=', '<=', '>=', '&&', '||', '=>', '??',
  '+', '-', '*', '/', '%', '<', '>', '=', '!', '(', ')', '{', '}', '[', ']', ';', ',', '.', '?', ':'];

const cErr = (code, msg, line, hint) => new CodeError(code, msg, line, hint || code, 'compile');
const rErr = (kind, msg, line, hint) => new CodeError(kind, msg, line, hint || kind, 'runtime');

// ---------- Tokenizer ----------
function tokenize(src) {
  const toks = [];
  let i = 0, line = 1;
  const n = src.length;
  const push = (t, v, l = line, extra) => toks.push({ t, v, line: l, ...extra });
  const readEscape = () => {
    const e = src[i + 1];
    const map = { n: '\n', t: '\t', '\\': '\\', '"': '"', "'": "'", 0: '\0', r: '\r' };
    i += 2;
    if (e in map) return map[e];
    throw cErr('CS1009', `Okänd escape-sekvens \\${e}.`, line, 'escape');
  };
  while (i < n) {
    const c = src[i];
    if (c === '\n') { line++; i++; continue; }
    if (/\s/.test(c)) { i++; continue; }
    if (c === '/' && src[i + 1] === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && src[i + 1] === '*') {
      i += 2;
      while (i < n && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') line++; i++; }
      i += 2; continue;
    }
    if (c === '“' || c === '”' || c === '‘' || c === '’') {
      throw cErr('CS1056', 'Det här citattecknet är ett ”snyggt” typografiskt tecken. Skriv om det med vanliga ".', line, 'smart-quotes');
    }
    if (c === '$' && src[i + 1] === '"') {
      const startLine = line;
      i += 2;
      const parts = [];
      let lit = '';
      for (;;) {
        if (i >= n || src[i] === '\n') throw cErr('CS1010', 'Texten saknar ett avslutande citattecken ".', startLine, 'unclosed-string');
        const ch = src[i];
        if (ch === '"') { i++; break; }
        if (ch === '\\') { lit += readEscape(); continue; }
        if (ch === '{' && src[i + 1] === '{') { lit += '{'; i += 2; continue; }
        if (ch === '}' && src[i + 1] === '}') { lit += '}'; i += 2; continue; }
        if (ch === '{') {
          let d = 1, j = i + 1, q = null;
          while (j < n && d) {
            if (q) { if (src[j] === '\\') j++; else if (src[j] === q) q = null; }
            else if (src[j] === '"' || src[j] === "'") q = src[j];
            else if (src[j] === '{') d++;
            else if (src[j] === '}') d--;
            else if (src[j] === '\n') break;
            if (d) j++;
          }
          if (d) throw cErr('CS8076', 'En { i den interpolerade texten saknar sin }.', startLine, 'interp');
          const inner = src.slice(i + 1, j);
          if (lit) parts.push({ lit });
          lit = '';
          // dela upp i uttryck, ,bredd och :format på toppnivå
          let depth = 0, q2 = null, cut = -1, fmtCut = -1, alignCut = -1;
          for (let k = 0; k < inner.length; k++) {
            const x = inner[k];
            if (q2) { if (x === q2) q2 = null; continue; }
            if (x === '"' || x === "'") q2 = x;
            else if ('([{'.includes(x)) depth++;
            else if (')]}'.includes(x)) depth--;
            else if (depth === 0 && x === ':' && fmtCut < 0 && !isTernaryColon(inner, k)) { fmtCut = k; break; }
            else if (depth === 0 && x === ',' && alignCut < 0) alignCut = k;
          }
          cut = alignCut >= 0 ? alignCut : fmtCut >= 0 ? fmtCut : inner.length;
          const exprSrc = inner.slice(0, cut);
          const align = alignCut >= 0 ? parseInt(inner.slice(alignCut + 1, fmtCut >= 0 ? fmtCut : inner.length), 10) : null;
          const fmt = fmtCut >= 0 ? inner.slice(fmtCut + 1) : null;
          if (!exprSrc.trim()) throw cErr('CS1733', 'Det står inget mellan { och }.', startLine, 'interp');
          const sub = tokenize(exprSrc).filter((t) => t.t !== 'EOF');
          sub.forEach((t) => { t.line = startLine; });
          parts.push({ toks: sub, align, fmt });
          i = j + 1; continue;
        }
        if (ch === '}') throw cErr('CS8086', 'En ensam } i den interpolerade texten. Skriv }} för att visa en klammer.', startLine, 'interp');
        lit += ch; i++;
      }
      if (lit) parts.push({ lit });
      push('ISTR', parts, startLine);
      continue;
    }
    if (c === '@' && src[i + 1] === '"') {
      const startLine = line; i += 2; let s = '';
      for (;;) {
        if (i >= n) throw cErr('CS1010', 'Texten saknar ett avslutande citattecken ".', startLine, 'unclosed-string');
        if (src[i] === '"') { if (src[i + 1] === '"') { s += '"'; i += 2; continue; } i++; break; }
        if (src[i] === '\n') line++;
        s += src[i++];
      }
      push('STR', s, startLine); continue;
    }
    if (c === '"') {
      i++; let s = '';
      for (;;) {
        if (i >= n || src[i] === '\n') throw cErr('CS1010', 'Texten saknar ett avslutande citattecken ".', line, 'unclosed-string');
        if (src[i] === '"') { i++; break; }
        if (src[i] === '\\') { s += readEscape(); continue; }
        s += src[i++];
      }
      push('STR', s); continue;
    }
    if (c === "'") {
      i++; let s;
      if (src[i] === '\\') s = readEscape(); else s = src[i++];
      if (src[i] !== "'") throw cErr('CS1012', "Ett tecken (char) skrivs med exakt ett tecken mellan ' och '. Text skrivs med \"dubbla citattecken\".", line, 'char-literal');
      i++;
      push('CHAR', s); continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) {
      let j = i, isD = false;
      while (j < n && /[0-9_]/.test(src[j])) j++;
      if (src[j] === '.' && /[0-9]/.test(src[j + 1] || '')) { isD = true; j++; while (j < n && /[0-9_]/.test(src[j])) j++; }
      if ((src[j] === 'e' || src[j] === 'E') && /[0-9+-]/.test(src[j + 1] || '')) { isD = true; j += 2; while (j < n && /[0-9]/.test(src[j])) j++; }
      let raw = src.slice(i, j).replace(/_/g, '');
      let kind = isD ? 'double' : 'int';
      if (/[dDfFmM]/.test(src[j] || '')) { kind = /[mM]/.test(src[j]) ? 'decimal' : 'double'; j++; }
      else if (/[lL]/.test(src[j] || '')) { kind = 'long'; j++; }
      push('NUM', parseFloat(raw), line, { kind });
      i = j; continue;
    }
    if (/[A-Za-z_À-ɏ]/.test(c)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_À-ɏ]/.test(src[j])) j++;
      const w = src.slice(i, j);
      push(KW.has(w) ? 'KW' : 'ID', w);
      i = j; continue;
    }
    const op = OPS.find((o) => src.startsWith(o, i));
    if (op) { push('OP', op); i += op.length; continue; }
    throw cErr('CS1056', `Tecknet ${JSON.stringify(c)} känns inte igen här.`, line, 'bad-char');
  }
  push('EOF', null);
  return toks;
}
function isTernaryColon(s, k) {
  // ett kolon som hör till ?: (kräver ett ? före på samma nivå)
  let d = 0;
  for (let i = k - 1; i >= 0; i--) {
    if (')]}'.includes(s[i])) d++;
    else if ('([{'.includes(s[i])) d--;
    else if (s[i] === '?' && d === 0) return true;
  }
  return false;
}



// Inbyggda undantagsklasser och vilken klass de ärver från.
const EXC_TREE = {
  Exception: null, SystemException: 'Exception', ArithmeticException: 'SystemException', DivideByZeroException: 'ArithmeticException',
  OverflowException: 'ArithmeticException', FormatException: 'SystemException', IndexOutOfRangeException: 'SystemException',
  NullReferenceException: 'SystemException', InvalidOperationException: 'SystemException', ArgumentException: 'SystemException',
  ArgumentOutOfRangeException: 'ArgumentException', ArgumentNullException: 'ArgumentException', KeyNotFoundException: 'SystemException',
  NotImplementedException: 'SystemException', InvalidCastException: 'SystemException',
};
const GENERIC = { List: 1, Dictionary: 2, IEnumerable: 1, KeyValuePair: 2 };
const MODS = ['public', 'private', 'protected', 'internal', 'static', 'virtual', 'override', 'abstract', 'readonly', 'sealed', 'const'];
const ACCESS_KW = ['public', 'private', 'protected', 'internal'];

// ---------- Parser ----------
class Parser {
  constructor(toks) {
    this.toks = toks;
    this.p = 0;
    // Klassnamn samlas in först, så att en klass kan användas som typ innan den deklarerats.
    this.classNames = new Set(Object.keys(EXC_TREE));
    toks.forEach((t, i) => {
      if (t.t === 'KW' && (t.v === 'class' || t.v === 'interface') && toks[i + 1] && toks[i + 1].t === 'ID') this.classNames.add(toks[i + 1].v);
    });
  }
  get cur() { return this.toks[this.p]; }
  peek(k = 1) { return this.toks[Math.min(this.p + k, this.toks.length - 1)]; }
  prevLine() { return this.toks[Math.max(0, this.p - 1)].line; }
  isOp(v, k = 0) { const t = this.peek(k); return t.t === 'OP' && t.v === v; }
  isKw(v, k = 0) { const t = this.peek(k); return t.t === 'KW' && t.v === v; }
  next() { return this.toks[this.p++]; }
  expectOp(v, code, msg, hint) {
    if (!this.isOp(v)) {
      const line = v === ';' ? this.prevLine() : this.cur.line;
      throw cErr(code, msg, line, hint);
    }
    return this.next();
  }
  semi() { this.expectOp(';', 'CS1002', 'Det saknas ett semikolon ; i slutet av satsen.', 'missing-semicolon'); }
  id(msg = 'Här förväntades ett namn.') {
    if (this.cur.t !== 'ID') throw cErr('CS1001', msg, this.cur.line, 'identifier');
    return this.next().v;
  }

  program() {
    const prog = { methods: new Map(), body: [], classMain: null, classes: new Map() };
    while (this.cur.t !== 'EOF') {
      if (this.isKw('using')) { while (!this.isOp(';') && this.cur.t !== 'EOF') this.next(); this.semi(); continue; }
      if (this.isKw('namespace')) {
        this.next(); this.id(); while (this.isOp('.')) { this.next(); this.id(); }
        if (this.isOp(';')) { this.next(); continue; }
        this.expectOp('{', 'CS1514', '{ förväntades.', 'braces');
        this.classesUntilBrace(prog);
        continue;
      }
      if (this.isClassStart()) { this.classDecl(prog); continue; }
      if (this.isMethodStart()) { this.methodDecl(prog); continue; }
      prog.body.push(this.statement());
    }
    return prog;
  }
  classesUntilBrace(prog) {
    while (!this.isOp('}')) {
      if (this.cur.t === 'EOF') throw cErr('CS1513', 'Det saknas en avslutande klammer }.', this.prevLine(), 'braces');
      if (this.isClassStart()) this.classDecl(prog);
      else throw cErr('CS0116', 'Här förväntades en klass.', this.cur.line);
    }
    this.next();
  }
  isClassStart() {
    let k = 0;
    while (['public', 'internal', 'static', 'private', 'abstract', 'sealed', 'protected'].some((m) => this.isKw(m, k))) k++;
    return this.isKw('class', k) || this.isKw('interface', k);
  }
  classDecl(prog) {
    const mods = new Set();
    while (!this.isKw('class') && !this.isKw('interface')) mods.add(this.next().v);
    const isInterface = this.next().v === 'interface';
    const line = this.cur.line;
    const name = this.id('Klassen behöver ett namn.');
    if (prog.classes.has(name) || Object.hasOwn(EXC_TREE, name)) throw cErr('CS0101', `Det finns redan en klass som heter ${name}.`, line, 'duplicate-class');
    const cls = {
      name, line, baseNames: [], isInterface, isAbstract: isInterface || mods.has('abstract'), isStatic: mods.has('static'),
      fields: new Map(), props: new Map(), methods: new Map(), ctors: [], statics: new Map(),
    };
    if (this.isOp(':')) {
      this.next();
      do { if (cls.baseNames.length) this.next(); cls.baseNames.push(this.id('Namnet på klassen som ärvs förväntades.')); } while (this.isOp(','));
    }
    this.expectOp('{', 'CS1514', '{ förväntades efter klassens namn.', 'braces');
    while (!this.isOp('}')) {
      if (this.cur.t === 'EOF') throw cErr('CS1513', 'Det saknas en avslutande klammer } för klassen.', this.prevLine(), 'braces');
      this.member(cls, prog);
    }
    this.next();
    prog.classes.set(name, cls);
  }
  member(cls, prog) {
    const line = this.cur.line;
    if (this.isClassStart()) throw cErr('CS1519', 'Klasser inuti klasser stöds inte i Kodstig. Flytta klassen utanför.', line, 'class-member');
    const mods = new Set();
    while (this.cur.t === 'KW' && MODS.includes(this.cur.v)) mods.add(this.next().v);
    const access = mods.has('public') || cls.isInterface ? 'public' : mods.has('protected') ? 'protected' : mods.has('internal') ? 'public' : 'private';
    const isStatic = mods.has('static') || mods.has('const');
    if (this.cur.t === 'ID' && this.cur.v === cls.name && this.isOp('(', 1)) {
      this.next();
      const params = this.params();
      let chain = null;
      if (this.isOp(':')) {
        this.next();
        const kind = this.isKw('base') ? 'base' : this.isKw('this') ? 'this' : null;
        if (!kind || !this.isOp('(', 1)) throw cErr('CS1018', 'Efter : i en konstruktor förväntades base(...) eller this(...).', this.cur.line, 'ctor-chain');
        this.next();
        chain = { kind, args: this.argList() };
      }
      const body = this.blockBody();
      cls.ctors.push({ name: cls.name, params, body, chain, access, line, cls, isCtor: true, ret: 'void' });
      return;
    }
    if (this.cur.t === 'ID' && this.isOp('(', 1)) {
      throw cErr('CS1520', `Metoden ${this.cur.v} saknar returtyp. Skriv till exempel void ${this.cur.v}() eller int ${this.cur.v}(). Är det en konstruktor måste den heta exakt som klassen (${cls.name}).`, line, 'missing-return-type');
    }
    if (!this.isTypeAhead()) throw cErr('CS1519', 'Inuti klassen förväntades ett fält, en egenskap, en konstruktor eller en metod.', line, 'class-member');
    const type = this.type();
    const name = this.id('Ett namn förväntades.');
    if (this.isOp('(')) {
      const params = this.params();
      let body = null;
      const isAbstract = mods.has('abstract') || (cls.isInterface && !this.isOp('{') && !this.isOp('=>'));
      if (this.isOp(';')) {
        if (!isAbstract) throw cErr('CS0501', `Metoden ${name} måste ha en kropp { } eftersom den inte är abstract.`, line, 'method-body');
        this.next();
      } else if (this.isOp('=>')) {
        this.next();
        const e = this.expr();
        this.semi();
        body = [type === 'void' ? { k: 'Expr', e, line } : { k: 'Return', e, line }];
      } else body = this.blockBody();
      if (isAbstract && body) throw cErr('CS0500', `Den abstrakta metoden ${name} kan inte ha en kropp.`, line, 'abstract-body');
      if (isAbstract && !cls.isAbstract) throw cErr('CS0513', `${name} är abstract, så klassen ${cls.name} måste också vara abstract.`, line, 'abstract-class');
      const m = { name, ret: type, params, body, line, isStatic, access, isVirtual: mods.has('virtual') || isAbstract, isOverride: mods.has('override'), isAbstract, cls };
      if (!cls.methods.has(name)) cls.methods.set(name, []);
      const list = cls.methods.get(name);
      if (list.some((x) => x.params.length === params.length && x.params.every((p, i) => p.type === params[i].type))) {
        throw cErr('CS0111', `Det finns redan en metod som heter ${name} med samma parametrar.`, line, 'duplicate-method');
      }
      list.push(m);
      if (name === 'Main' && isStatic) prog.classMain = m;
      if (isStatic && !prog.methods.has(name)) prog.methods.set(name, m);
      return;
    }
    if (this.isOp('{') || this.isOp('=>')) { this.property(cls, { name, type, access, isStatic, mods, line }); return; }
    if (cls.isInterface) throw cErr('CS0525', 'Ett interface kan inte ha fält, bara metoder och egenskaper.', line, 'class-member');
    for (let fname = name; ; fname = this.id('Ett namn förväntades.')) {
      let init = null;
      if (this.isOp('=')) { this.next(); init = this.isOp('{') ? this.arrayInit(elemOf(type)) : this.expr(); }
      else if (mods.has('const')) throw cErr('CS0145', 'En konstant måste få ett värde direkt.', line);
      if (cls.fields.has(fname) || cls.props.has(fname)) throw cErr('CS0102', `${cls.name} har redan en medlem som heter ${fname}.`, line, 'duplicate-member');
      cls.fields.set(fname, { name: fname, type, init, isStatic, access, readonly: mods.has('readonly') || mods.has('const'), isConst: mods.has('const'), cls, line });
      if (!this.isOp(',')) break;
      this.next();
    }
    this.semi();
  }
  property(cls, { name, type, access, isStatic, mods, line }) {
    const p = {
      name, type, access, setAccess: access, isStatic, auto: false, hasGet: false, hasSet: false, initOnly: false, get: null, set: null, init: null,
      isAbstract: mods.has('abstract') || cls.isInterface, cls, line,
    };
    if (this.isOp('=>')) {
      this.next();
      p.get = { e: this.expr() };
      p.hasGet = true;
      this.semi();
    } else {
      this.next();
      let bodies = 0;
      while (!this.isOp('}')) {
        let acc = null;
        if (this.cur.t === 'KW' && ACCESS_KW.includes(this.cur.v)) acc = this.next().v;
        const kw = this.cur.t === 'ID' ? this.cur.v : null;
        if (kw !== 'get' && kw !== 'set' && kw !== 'init') throw cErr('CS1014', 'I en egenskap förväntades get; och/eller set;', this.cur.line, 'property');
        this.next();
        let body = null;
        if (this.isOp(';')) this.next();
        else if (this.isOp('=>')) {
          this.next();
          const e = this.expr();
          this.semi();
          body = kw === 'get' ? { e } : { stmts: [{ k: 'Expr', e, line }] };
          bodies++;
        } else { body = { stmts: this.blockBody() }; bodies++; }
        if (kw === 'get') { p.hasGet = true; p.get = body; } else {
          p.hasSet = true; p.set = body; p.initOnly = kw === 'init';
          if (acc) p.setAccess = acc === 'protected' ? 'protected' : acc === 'private' ? 'private' : 'public';
        }
      }
      this.next();
      p.auto = bodies === 0;
      if (!p.auto && ((p.hasGet && !p.get) || (p.hasSet && !p.set))) throw cErr('CS8051', 'Antingen har både get och set en kropp, eller ingen av dem.', line, 'property');
      if (this.isOp('=')) {
        if (!p.auto) throw cErr('CS8050', 'Bara automatiska egenskaper ({ get; set; }) kan få ett startvärde.', line, 'property');
        this.next();
        p.init = this.expr();
        this.semi();
      }
    }
    if (p.isAbstract) p.auto = false;
    if (cls.fields.has(name) || cls.props.has(name)) throw cErr('CS0102', `${cls.name} har redan en medlem som heter ${name}.`, line, 'duplicate-member');
    cls.props.set(name, p);
  }
  isMethodStart() {
    let k = 0;
    while (['public', 'private', 'static', 'internal'].some((m) => this.isKw(m, k))) k++;
    const save = this.p;
    this.p += k;
    let ok = false;
    try {
      if (this.isTypeAhead()) { this.type(); ok = this.cur.t === 'ID' && this.isOp('(', 1); }
    } catch { ok = false; }
    this.p = save;
    return ok;
  }
  isTypeAhead() {
    const t = this.cur;
    if (t.t === 'KW' && TYPE_KW.has(t.v)) return true;
    if (t.t === 'ID' && Object.hasOwn(GENERIC, t.v) && this.isOp('<', 1)) return true;
    if (t.t === 'ID' && (t.v === 'String' || t.v === 'Int32' || t.v === 'Boolean' || t.v === 'Double') && !this.isOp('.', 1)) return true;
    if (t.t === 'ID' && this.classNames.has(t.v) && !this.isOp('.', 1) && !this.isOp('(', 1)) return true;
    return false;
  }
  type() {
    const t = this.next();
    let name;
    if (t.t === 'ID' && Object.hasOwn(GENERIC, t.v)) {
      this.expectOp('<', 'CS0305', `${t.v} behöver en typ inom < >, till exempel ${t.v === 'Dictionary' ? 'Dictionary<string, int>' : `${t.v}<int>`}.`, 'generic');
      const args = [this.type()];
      while (this.isOp(',')) { this.next(); args.push(this.type()); }
      this.expectOp('>', 'CS1003', `> förväntades efter typen i ${t.v}<...>.`, 'generic');
      if (args.length !== GENERIC[t.v]) throw cErr('CS0305', `${t.v} ska ha ${GENERIC[t.v] === 1 ? 'en typ' : 'två typer'} inom < >.`, t.line, 'generic');
      name = `${t.v}<${args.join(',')}>`;
    } else name = normType(t.v);
    while (this.isOp('[') && this.isOp(']', 1)) { this.next(); this.next(); name += '[]'; }
    return name;
  }
  params() {
    this.expectOp('(', 'CS1003', '( förväntades.');
    const params = [];
    while (!this.isOp(')')) {
      if (!this.isTypeAhead()) throw cErr('CS1001', 'Varje parameter behöver en typ och ett namn, till exempel int tal.', this.cur.line, 'param-type');
      const type = this.type();
      const name = this.id('Parametern behöver ett namn.');
      let def = null;
      if (this.isOp('=')) { this.next(); def = this.expr(); }
      else if (params.some((p) => p.def)) throw cErr('CS1737', 'Parametrar med standardvärde måste komma sist.', this.cur.line, 'param-default');
      params.push({ type, name, def });
      if (!this.isOp(',')) break;
      this.next();
    }
    this.expectOp(')', 'CS1026', ') förväntades.', 'parens');
    return params;
  }
  argList() {
    this.next();
    const args = [];
    while (!this.isOp(')')) {
      if (this.cur.t === 'EOF' || this.isOp(';')) throw cErr('CS1026', 'Det saknas en avslutande parentes ).', this.prevLine(), 'parens');
      if (this.cur.t === 'ID' && this.cur.v === 'out' && (this.peek().t === 'ID' || this.peek().t === 'KW')) {
        const line = this.next().line;
        let type = null;
        if (this.isTypeAhead() && this.peek().t === 'ID') type = this.type();
        args.push({ k: 'Out', type, name: this.id('Ett namn förväntades efter out.'), line });
      } else args.push(this.expr());
      if (!this.isOp(',')) break;
      this.next();
    }
    this.expectOp(')', 'CS1026', 'Det saknas en avslutande parentes ) eller ett komma mellan argumenten.', 'parens');
    return args;
  }
  methodDecl(prog) {
    const line = this.cur.line;
    let isStatic = false;
    while (['public', 'private', 'static', 'internal'].some((m) => this.isKw(m))) { if (this.next().v === 'static') isStatic = true; }
    const ret = this.type();
    const name = this.id();
    const params = this.params();
    let body;
    if (this.isOp('=>')) { this.next(); const e = this.expr(); this.semi(); body = [ret === 'void' ? { k: 'Expr', e, line } : { k: 'Return', e, line }]; }
    else body = this.blockBody();
    if (prog.methods.has(name)) throw cErr('CS0111', `Det finns redan en metod som heter ${name}.`, line, 'duplicate-method');
    prog.methods.set(name, { name, ret, params, body, line, captures: !isStatic, isStatic: true, cls: null });
  }
  blockBody() {
    this.expectOp('{', 'CS1514', '{ förväntades.', 'braces');
    const body = [];
    while (!this.isOp('}')) {
      if (this.cur.t === 'EOF') throw cErr('CS1513', 'Det saknas en avslutande klammer }.', this.prevLine(), 'braces');
      body.push(this.statement());
    }
    this.next();
    return body;
  }
  embedded() {
    if (this.isOp('{')) { const line = this.cur.line; return { k: 'Block', body: this.blockBody(), line }; }
    return this.statement(true);
  }
  isDeclStart() {
    if (this.isKw('const')) return true;
    if (!this.isTypeAhead()) return false;
    const save = this.p;
    try { this.type(); return this.cur.t === 'ID'; } catch { return false; } finally { this.p = save; }
  }
  statement(embedded = false) {
    const t = this.cur;
    const line = t.line;
    if (this.isOp('{')) return { k: 'Block', body: this.blockBody(), line };
    if (this.isOp(';')) { this.next(); return { k: 'Empty', line }; }
    if (t.t === 'KW') {
      switch (t.v) {
        case 'if': {
          this.next();
          this.expectOp('(', 'CS1003', 'Villkoret i if skrivs inom parenteser: if (villkor)', 'parens');
          const test = this.expr();
          this.expectOp(')', 'CS1026', ') förväntades efter villkoret.', 'parens');
          if (this.isOp(';')) throw cErr('CS0642', 'Ta bort semikolonet direkt efter if (...). Annars blir if-satsen tom.', this.cur.line, 'empty-if');
          const then = this.embedded();
          let other = null;
          if (this.isKw('else')) { this.next(); other = this.embedded(); }
          return { k: 'If', test, then, other, line };
        }
        case 'else': throw cErr('CS1525', 'else måste komma direkt efter ett if-block.', line, 'stray-else');
        case 'while': {
          this.next();
          this.expectOp('(', 'CS1003', 'Villkoret i while skrivs inom parenteser.', 'parens');
          const test = this.expr();
          this.expectOp(')', 'CS1026', ') förväntades.', 'parens');
          return { k: 'While', test, body: this.embedded(), line };
        }
        case 'do': {
          this.next();
          const body = this.embedded();
          if (!this.isKw('while')) throw cErr('CS1003', 'while förväntades efter do-blocket.', this.cur.line);
          this.next();
          this.expectOp('(', 'CS1003', '( förväntades.', 'parens');
          const test = this.expr();
          this.expectOp(')', 'CS1026', ') förväntades.', 'parens');
          this.semi();
          return { k: 'DoWhile', test, body, line };
        }
        case 'for': {
          this.next();
          this.expectOp('(', 'CS1003', 'for behöver parenteser: for (int i = 0; i < 5; i++)', 'parens');
          let init = null;
          if (!this.isOp(';')) init = this.isDeclStart() ? this.declaration() : { k: 'Expr', e: this.expr(), line };
          this.expectOp(';', 'CS1002', 'for behöver tre delar åtskilda med semikolon: start; villkor; steg', 'for-parts');
          const test = this.isOp(';') ? null : this.expr();
          this.expectOp(';', 'CS1002', 'for behöver tre delar åtskilda med semikolon: start; villkor; steg', 'for-parts');
          const update = [];
          while (!this.isOp(')')) { update.push(this.expr()); if (!this.isOp(',')) break; this.next(); }
          this.expectOp(')', 'CS1026', ') förväntades.', 'parens');
          return { k: 'For', init, test, update, body: this.embedded(), line };
        }
        case 'foreach': {
          this.next();
          this.expectOp('(', 'CS1003', '( förväntades.', 'parens');
          const vt = this.type();
          const name = this.id();
          if (!this.isKw('in')) throw cErr('CS1515', 'foreach behöver ordet in: foreach (int tal in tal)', this.cur.line, 'foreach-in');
          this.next();
          const iter = this.expr();
          this.expectOp(')', 'CS1026', ') förväntades.', 'parens');
          return { k: 'Foreach', vt, name, iter, body: this.embedded(), line };
        }
        case 'return': {
          this.next();
          const e = this.isOp(';') ? null : this.expr();
          this.semi();
          return { k: 'Return', e, line };
        }
        case 'break': this.next(); this.semi(); return { k: 'Break', line };
        case 'continue': this.next(); this.semi(); return { k: 'Continue', line };
        case 'switch': return this.switchStmt();
        case 'try': {
          this.next();
          const body = this.blockBody();
          const catches = [];
          while (this.isKw('catch')) {
            const cl = this.next().line;
            let type = null, name = null;
            if (this.isOp('(')) {
              this.next();
              type = this.type();
              if (this.cur.t === 'ID') name = this.next().v;
              this.expectOp(')', 'CS1026', ') förväntades.', 'parens');
            }
            catches.push({ type, name, body: this.blockBody(), line: cl });
          }
          let fin = null;
          if (this.isKw('finally')) { this.next(); fin = this.blockBody(); }
          if (!catches.length && !fin) throw cErr('CS1524', 'Efter try-blocket förväntades catch eller finally.', this.cur.line, 'try-without-catch');
          return { k: 'Try', body, catches, fin, line };
        }
        case 'catch': case 'finally': throw cErr('CS1003', `${t.v} måste komma direkt efter ett try-block.`, line, 'stray-catch');
        case 'throw': {
          this.next();
          const e = this.isOp(';') ? null : this.expr();
          this.semi();
          return { k: 'Throw', e, line };
        }
        default: break;
      }
    }
    if (this.isMethodStart() && !embedded) throw cErr('CS0106', 'Metoder skrivs utanför andra block. Flytta metoden längst ner, utanför { }.', line, 'nested-method');
    if (this.isDeclStart()) {
      if (embedded) throw cErr('CS1023', 'En deklaration kan inte stå ensam efter if/while utan { }.', line);
      const d = this.declaration();
      this.semi();
      return d;
    }
    const e = this.expr();
    if (!['Assign', 'Call', 'IncDec', 'New', 'NewObj'].includes(e.k)) {
      if (this.isOp(';') || this.cur.t === 'EOF' || this.isOp('}')) {
        throw cErr('CS0201', 'Ett uttryck kan inte stå ensamt som en sats. Spara värdet i en variabel eller skriv ut det.', line, 'not-statement');
      }
    }
    if (this.cur.t === 'ID' && (e.k === 'Name' || e.k === 'Member')) {
      throw cErr('CS0246', `Typen eller namnet '${exprName(e)}' känns inte igen. Kontrollera stavning och stora/små bokstäver (till exempel int, string, bool).`, line, 'unknown-type');
    }
    this.semi();
    return { k: 'Expr', e, line };
  }
  switchStmt() {
    const line = this.next().line;
    this.expectOp('(', 'CS1003', 'switch behöver parenteser: switch (värde)', 'parens');
    const subject = this.expr();
    this.expectOp(')', 'CS1026', ') förväntades.', 'parens');
    this.expectOp('{', 'CS1514', '{ förväntades.', 'braces');
    const sections = [];
    while (!this.isOp('}')) {
      if (this.cur.t === 'EOF') throw cErr('CS1513', 'Det saknas en avslutande klammer }.', this.prevLine(), 'braces');
      const labels = [];
      let isDefault = false;
      while (this.isKw('case') || this.isKw('default')) {
        if (this.next().v === 'default') isDefault = true;
        else labels.push(this.coalesce());
        this.expectOp(':', 'CS1003', ': förväntades efter case-värdet.', 'switch');
      }
      if (!labels.length && !isDefault) throw cErr('CS1525', 'I en switch förväntades case eller default.', this.cur.line, 'switch');
      const sl = this.cur.line;
      const body = [];
      while (!this.isKw('case') && !this.isKw('default') && !this.isOp('}')) {
        if (this.cur.t === 'EOF') throw cErr('CS1513', 'Det saknas en avslutande klammer }.', this.prevLine(), 'braces');
        body.push(this.statement());
      }
      const last = body[body.length - 1];
      if (!last || !['Break', 'Return', 'Throw', 'Continue'].includes(last.k)) {
        throw cErr('CS0163', 'Varje case i en switch måste sluta med break; (eller return).', last ? last.line : sl, 'switch-break');
      }
      sections.push({ labels, isDefault, body, line: sl });
    }
    this.next();
    return { k: 'Switch', subject, sections, line };
  }
  declaration() {
    const line = this.cur.line;
    let isConst = false;
    if (this.isKw('const')) { this.next(); isConst = true; }
    const type = this.type();
    const decls = [];
    do {
      if (decls.length) this.next();
      const name = this.id('Variabeln behöver ett namn.');
      let init = null;
      if (this.isOp('=')) {
        this.next();
        if (this.isOp('{')) init = this.arrayInit(type.endsWith('[]') ? type.slice(0, -2) : null);
        else init = this.expr();
      } else if (type === 'var') throw cErr('CS0818', 'En var-variabel måste få ett startvärde direkt.', line, 'var-init');
      decls.push({ name, init });
    } while (this.isOp(','));
    return { k: 'Decl', type, decls, isConst, line };
  }
  arrayInit(elem) {
    const line = this.cur.line;
    this.expectOp('{', 'CS1514', '{ förväntades.');
    const items = [];
    while (!this.isOp('}')) { items.push(this.expr()); if (!this.isOp(',')) break; this.next(); }
    this.expectOp('}', 'CS1513', 'Det saknas } eller ett komma mellan värdena.', 'braces');
    return { k: 'ArrayLit', elem, items, line };
  }

  expr() { return this.assignment(); }
  assignment() {
    const lam = this.lambda();
    if (lam) return lam;
    const left = this.ternary();
    if (this.cur.t === 'OP' && ['=', '+=', '-=', '*=', '/=', '%='].includes(this.cur.v)) {
      const op = this.next().v;
      if (!['Name', 'Index', 'Member'].includes(left.k)) throw cErr('CS0131', 'Vänstersidan av en tilldelning måste vara en variabel.', left.line, 'bad-assign');
      const right = this.isOp('{') ? this.arrayInit(null) : this.assignment();
      return { k: 'Assign', op, target: left, value: right, line: left.line };
    }
    return left;
  }
  // x => ..., (a, b) => ..., (int a) => ... och () => ...
  lambda() {
    const line = this.cur.line;
    if (this.cur.t === 'ID' && this.isOp('=>', 1)) {
      const name = this.next().v;
      this.next();
      return this.lambdaBody([name], line);
    }
    if (!this.isOp('(')) return null;
    let k = 1, depth = 1;
    while (depth > 0) {
      const t = this.peek(k);
      if (t.t === 'EOF') return null;
      if (t.t === 'OP' && t.v === '(') depth++;
      else if (t.t === 'OP' && t.v === ')') depth--;
      k++;
    }
    if (!this.isOp('=>', k)) return null;
    this.next();
    const params = [];
    while (!this.isOp(')')) {
      if (this.isTypeAhead() && this.peek().t === 'ID') this.type();
      params.push(this.id('Lambdans parametrar behöver namn.'));
      if (!this.isOp(',')) break;
      this.next();
    }
    this.next();
    this.next();
    return this.lambdaBody(params, line);
  }
  lambdaBody(params, line) {
    if (this.isOp('{')) return { k: 'Lambda', params, block: true, body: this.blockBody(), line };
    return { k: 'Lambda', params, block: false, e: this.assignment(), line };
  }
  ternary() {
    const c = this.coalesce();
    if (this.isOp('?')) {
      this.next();
      const a = this.assignment();
      this.expectOp(':', 'CS1003', ': förväntades i ?: uttrycket.');
      const b = this.assignment();
      return { k: 'Cond', c, a, b, line: c.line };
    }
    return c;
  }
  coalesce() { return this.bin(['??'], () => this.or()); }
  or() { return this.bin(['||'], () => this.and()); }
  and() { return this.bin(['&&'], () => this.eq()); }
  eq() { return this.bin(['==', '!='], () => this.rel()); }
  rel() {
    let l = this.bin(['<', '>', '<=', '>='], () => this.add());
    while (this.isKw('is') || (this.cur.t === 'ID' && this.cur.v === 'as' && this.peek().t === 'ID' && this.classNames.has(this.peek().v))) {
      if (this.cur.v === 'as') { const line = this.next().line; l = { k: 'As', e: l, type: this.type(), line }; continue; }
      const line = this.next().line;
      let not = false;
      if (this.cur.t === 'ID' && this.cur.v === 'not') { this.next(); not = true; }
      if (this.isKw('null')) { this.next(); l = { k: 'IsNull', e: l, not, line }; continue; }
      if (!this.isTypeAhead()) throw cErr('CS1525', 'Efter is förväntades en typ, till exempel if (djur is Hund h).', this.cur.line, 'is');
      const type = this.type();
      let name = null;
      if (!not && this.cur.t === 'ID') name = this.next().v;
      l = { k: 'Is', e: l, type, name, not, line };
    }
    return l;
  }
  add() { return this.bin(['+', '-'], () => this.mul()); }
  mul() { return this.bin(['*', '/', '%'], () => this.unary()); }
  bin(ops, sub) {
    let l = sub();
    while (this.cur.t === 'OP' && ops.includes(this.cur.v)) {
      const t = this.next();
      l = { k: 'Bin', op: t.v, l, r: sub(), line: t.line };
    }
    return l;
  }
  unary() {
    const t = this.cur;
    if (t.t === 'OP' && ['!', '-', '+'].includes(t.v)) { this.next(); return { k: 'Unary', op: t.v, v: this.unary(), line: t.line }; }
    if (t.t === 'OP' && (t.v === '++' || t.v === '--')) {
      this.next(); const target = this.unary();
      return { k: 'IncDec', op: t.v, prefix: true, target, line: t.line };
    }
    if (this.isOp('(') && this.peek().t === 'KW' && TYPE_KW.has(this.peek().v) && this.isOp(')', 2)) {
      this.next(); const type = normType(this.next().v); this.next();
      return { k: 'Cast', type, v: this.unary(), line: t.line };
    }
    if (this.isOp('(') && this.peek().t === 'ID' && this.classNames.has(this.peek().v) && this.isOp(')', 2)) {
      const after = this.peek(3);
      if (after && (after.t === 'ID' || (after.t === 'OP' && after.v === '(') || (after.t === 'KW' && ['this', 'base', 'new'].includes(after.v)))) {
        this.next(); const type = this.next().v; this.next();
        return { k: 'Cast', type, v: this.unary(), line: t.line };
      }
    }
    return this.postfix();
  }
  postfix() {
    let e = this.primary();
    for (;;) {
      if (this.isOp('.')) {
        this.next();
        const name = this.id('Ett namn förväntades efter punkten.');
        e = { k: 'Member', obj: e, name, line: e.line };
      } else if (this.isOp('(')) {
        const line = this.cur.line;
        e = { k: 'Call', fn: e, args: this.argList(), line };
      } else if (this.isOp('[')) {
        const line = this.next().line;
        const index = this.expr();
        this.expectOp(']', 'CS1003', '] förväntades.', 'parens');
        e = { k: 'Index', obj: e, index, line };
      } else if (this.isOp('++') || this.isOp('--')) {
        const t = this.next();
        e = { k: 'IncDec', op: t.v, prefix: false, target: e, line: t.line };
      } else break;
    }
    return e;
  }
  primary() {
    const t = this.cur;
    switch (t.t) {
      case 'NUM': this.next(); return { k: 'Lit', t: t.kind === 'int' || t.kind === 'long' ? 'int' : 'double', v: t.v, line: t.line };
      case 'STR': this.next(); return { k: 'Lit', t: 'string', v: t.v, line: t.line };
      case 'CHAR': this.next(); return { k: 'Lit', t: 'char', v: t.v, line: t.line };
      case 'ISTR': {
        this.next();
        const parts = t.v.map((p) => {
          if (p.lit !== undefined) return { lit: p.lit };
          const sub = new Parser([...p.toks, { t: 'EOF', v: null, line: t.line }]);
          sub.classNames = this.classNames;
          const e = sub.expr();
          if (sub.cur.t !== 'EOF') throw cErr('CS1003', 'Uttrycket inuti { } kunde inte läsas.', t.line, 'interp');
          return { e, align: p.align, fmt: p.fmt };
        });
        return { k: 'Interp', parts, line: t.line };
      }
      case 'ID': this.next(); return { k: 'Name', name: t.v, line: t.line };
      case 'KW':
        if (t.v === 'true' || t.v === 'false') { this.next(); return { k: 'Lit', t: 'bool', v: t.v === 'true', line: t.line }; }
        if (t.v === 'null') { this.next(); return { k: 'Lit', t: 'null', v: null, line: t.line }; }
        if (t.v === 'new') return this.newExpr();
        if (t.v === 'this') { this.next(); return { k: 'This', line: t.line }; }
        if (t.v === 'base') {
          this.next();
          if (!this.isOp('.')) throw cErr('CS0175', 'base används som base.Metod() eller base.Egenskap.', t.line, 'base');
          return { k: 'Base', line: t.line };
        }
        if (TYPE_KW.has(t.v)) { this.next(); return { k: 'Name', name: t.v, line: t.line }; } // int.Parse m.m.
        throw cErr('CS1525', `Ordet ${t.v} kan inte stå här.`, t.line, 'keyword');
      case 'OP':
        if (t.v === '(') {
          this.next();
          const e = this.expr();
          this.expectOp(')', 'CS1026', 'Det saknas en avslutande parentes ).', 'parens');
          return e;
        }
        break;
      default: break;
    }
    if (t.t === 'EOF') throw cErr('CS1733', 'Koden tar slut mitt i ett uttryck.', this.prevLine(), 'incomplete');
    if (this.isOp(';')) throw cErr('CS1525', 'Ett värde saknas före semikolonet.', t.line, 'incomplete');
    throw cErr('CS1525', `Oväntat ${t.v}.`, t.line, 'syntax');
  }
  newExpr() {
    const line = this.next().line;
    if (this.isOp('[') && this.isOp(']', 1)) {
      this.next(); this.next();
      return this.arrayInit(null);
    }
    const t = this.cur;
    if (t.t === 'ID' && Object.hasOwn(GENERIC, t.v)) {
      const type = this.type();
      const gb = genBase(type);
      if (gb !== 'List' && gb !== 'Dictionary') throw cErr('CS0144', `Det går inte att skapa en ${gb} med new.`, line, 'unsupported');
      const args = this.isOp('(') ? this.argList() : [];
      let items = [], dictItems = null;
      if (this.isOp('{')) {
        if (gb === 'Dictionary') dictItems = this.dictInit();
        else items = this.arrayInit(null).items;
      }
      return { k: 'New', type, args, items, dictItems, line };
    }
    const isClass = t.t === 'ID' && this.classNames.has(t.v);
    if ((t.t === 'KW' && TYPE_KW.has(t.v)) || (isClass && this.isOp('[', 1))) {
      this.next();
      const base = isClass ? t.v : normType(t.v);
      this.expectOp('[', 'CS1526', `Efter new ${t.v} förväntades [storlek].`);
      if (this.isOp(']')) { this.next(); return { ...this.arrayInit(base), line }; }
      const size = this.expr();
      this.expectOp(']', 'CS1003', '] förväntades.');
      if (this.isOp('{')) { const lit = this.arrayInit(base); return { ...lit, size, line }; }
      return { k: 'NewArray', elem: base, size, line };
    }
    if (isClass) {
      this.next();
      const args = this.isOp('(') ? this.argList() : null;
      const init = this.isOp('{') ? this.objInit() : null;
      if (!args && !init) throw cErr('CS1526', `Efter new ${t.v} förväntades parenteser: new ${t.v}()`, line, 'syntax');
      return { k: 'NewObj', cls: t.v, args: args || [], init, line };
    }
    if (t.t === 'ID') throw cErr('CS0246', `Typen ${t.v} finns inte. Kontrollera stavningen, eller skapa klassen med class ${t.v} { }.`, line, 'unknown-type');
    throw cErr('CS1526', 'Kodstigs motor kan skapa arrayer, listor, ordböcker och egna klasser med new.', line, 'unsupported');
  }
  dictInit() {
    this.next();
    const items = [];
    while (!this.isOp('}')) {
      if (this.isOp('{')) {
        this.next();
        const k = this.expr();
        this.expectOp(',', 'CS1003', 'Ett par i en ordbok skrivs { nyckel, värde }.', 'dict-init');
        const v = this.expr();
        this.expectOp('}', 'CS1513', '} förväntades efter paret.', 'braces');
        items.push([k, v, false]);
      } else if (this.isOp('[')) {
        this.next();
        const k = this.expr();
        this.expectOp(']', 'CS1003', '] förväntades.', 'parens');
        this.expectOp('=', 'CS1003', '= förväntades efter [nyckel].', 'dict-init');
        items.push([k, this.expr(), true]);
      } else throw cErr('CS1003', 'I en ordbok skrivs varje par som { nyckel, värde } eller [nyckel] = värde.', this.cur.line, 'dict-init');
      if (!this.isOp(',')) break;
      this.next();
    }
    this.expectOp('}', 'CS1513', 'Det saknas } eller ett komma mellan paren.', 'braces');
    return items;
  }
  objInit() {
    this.next();
    const items = [];
    while (!this.isOp('}')) {
      const line = this.cur.line;
      const name = this.id('Ett namn på en egenskap förväntades.');
      this.expectOp('=', 'CS1003', '= förväntades efter egenskapens namn.', 'obj-init');
      items.push({ name, e: this.expr(), line });
      if (!this.isOp(',')) break;
      this.next();
    }
    this.expectOp('}', 'CS1513', 'Det saknas } eller ett komma mellan egenskaperna.', 'braces');
    return items;
  }
}
function normType(t) {
  const alias = { float: 'double', decimal: 'double', Double: 'double', long: 'int', Int32: 'int', String: 'string', Boolean: 'bool' };
  return alias[t] || t;
}
function exprName(e) { return e.k === 'Name' ? e.name : e.k === 'Member' ? `${exprName(e.obj)}.${e.name}` : '?'; }


// ---------- Värden ----------
// Ett värde är { t: typ, v: rådata }. Arrayer och listor har v = JS-array av rådata,
// en Dictionary har v = Map och ett objekt av en egen klass har v = CsObject.
const V = (t, v) => ({ t, v });
const isNumT = (t) => t === 'int' || t === 'double' || t === 'char';
const genBase = (t) => (t.includes('<') ? t.slice(0, t.indexOf('<')) : t);
function genArgs(t) {
  const i = t.indexOf('<');
  if (i < 0) return [];
  const inner = t.slice(i + 1, t.lastIndexOf('>'));
  const out = [];
  let depth = 0, start = 0;
  for (let k = 0; k < inner.length; k++) {
    if (inner[k] === '<') depth++;
    else if (inner[k] === '>') depth--;
    else if (inner[k] === ',' && depth === 0) { out.push(inner.slice(start, k)); start = k + 1; }
  }
  out.push(inner.slice(start));
  return out;
}
function elemOf(t) {
  if (t.endsWith('[]')) return t.slice(0, -2);
  const b = genBase(t);
  if (b === 'List' || b === 'IEnumerable') return genArgs(t)[0];
  if (b === 'Dictionary') return `KeyValuePair<${genArgs(t).join(',')}>`;
  return null;
}
const SV = { int: 'int (heltal)', double: 'double (decimaltal)', string: 'string (text)', bool: 'bool (sant/falskt)', char: 'char (tecken)', null: 'null' };
const svT = (t) => SV[t] || t;
const CLR = { int: 'System.Int32', double: 'System.Double', string: 'System.String', bool: 'System.Boolean', char: 'System.Char' };

class CsObject {
  constructor(cls, interp) { this.cls = cls; this.fields = new Map(); this.interp = interp; this.id = ++interp.objCount; }
}

function fmtDouble(x) {
  if (Number.isNaN(x)) return 'NaN';
  if (x === Infinity) return '∞';
  if (x === -Infinity) return '-∞';
  let s = String(x);
  if (s.includes('e')) s = s.replace('e', 'E').replace(/E\+?(-?)(\d)$/, (m, sg, d) => `E${sg || '+'}${d.padStart(2, '0')}`);
  return s;
}
export function csStr(val) {
  const { t, v } = val;
  if (t === 'null' || v === null) return '';
  if (v instanceof CsObject) return v.interp.objStr(val);
  if (t === 'bool') return v ? 'True' : 'False';
  if (t === 'double') return fmtDouble(v);
  if (t === 'int' || t === 'string' || t === 'char') return String(v);
  if (t === 'Type') return v.name;
  if (t === 'lambda') return 'System.Func';
  const gb = genBase(t), ga = genArgs(t);
  if (gb === 'KeyValuePair') return `[${csStr(V(ga[0], v[0]))}, ${csStr(V(ga[1], v[1]))}]`;
  if (gb === 'Dictionary') return `System.Collections.Generic.Dictionary\`2[${ga.map((x) => CLR[x] || x).join(',')}]`;
  if (gb === 'IEnumerable') return `System.Linq.Enumerable+Iterator\`1[${CLR[ga[0]] || ga[0]}]`;
  if (t.endsWith('[]')) return `${CLR[elemOf(t)] || elemOf(t)}[]`;
  if (gb === 'List') return `System.Collections.Generic.List\`1[${CLR[elemOf(t)] || elemOf(t)}]`;
  return String(v);
}
function fmtNumber(val, fmt, line) {
  const x = val.v;
  const m = /^([FfNnDdCcPp])(\d*)$/.exec(fmt || '');
  if (m) {
    const k = m[1].toUpperCase(); const p = m[2] === '' ? (k === 'D' ? 0 : 2) : +m[2];
    if (k === 'F') return x.toFixed(p);
    if (k === 'N') { const [a, b] = Math.abs(x).toFixed(p).split('.'); return (x < 0 ? '-' : '') + a.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (b ? '.' + b : ''); }
    if (k === 'D') return String(Math.trunc(x)).padStart(p, '0');
    if (k === 'P') return (x * 100).toFixed(p) + ' %';
    if (k === 'C') return x.toFixed(p) + ' kr';
  }
  if (/^0(\.0+)?$/.test(fmt)) { const p = fmt.includes('.') ? fmt.split('.')[1].length : 0; return x.toFixed(p); }
  if (/^#(\.#+)?$/.test(fmt) || /^0\.#+$/.test(fmt)) { const p = fmt.split('.')[1]?.length || 0; return String(+x.toFixed(p)); }
  throw rErr('FormatException', `Formatet "${fmt}" stöds inte i övningsmotorn. Prova till exempel F2.`, line, 'format');
}
function defaultOf(t) {
  if (t === 'int' || t === 'double') return 0;
  if (t === 'bool') return false;
  if (t === 'char') return '\0';
  return null;
}
// Jämför text som C# gör med svensk kultur: a före B, och å, ä, ö sist.
const cmpText = (a, b) => Math.sign(a.localeCompare(b, 'sv'));

class BreakSig {}
class ContinueSig {}
class ReturnSig { constructor(v) { this.v = v; } }
// Ett undantag som kastats med throw (eller ett motorfel som fångats och kastats vidare).
class CsThrow { constructor(val, line) { this.val = val; this.line = line; } }

class Scope {
  constructor(parent, fnRoot = false, ctx = null) { this.parent = parent; this.vars = new Map(); this.fnRoot = fnRoot; this.ctx = ctx; }
  find(name) {
    for (let s = this; s; s = s.parent) if (s.vars.has(name)) return s.vars.get(name);
    return null;
  }
  findInFn(name) {
    for (let s = this; s; s = s.parent) { if (s.vars.has(name)) return s.vars.get(name); if (s.fnRoot) break; }
    return null;
  }
}
// Vilken klass och vilket objekt koden körs i (this), om någon.
function getCtx(scope) {
  for (let s = scope; s; s = s.parent) if (s.ctx) return s.ctx;
  return null;
}

class Interp {
  constructor(prog, opts = {}) {
    this.prog = prog;
    this.out = [];
    this.outLen = 0;
    this.steps = 0;
    this.maxSteps = opts.maxSteps || MAX_STEPS;
    this.depth = 0;
    this.objCount = 0;
    this.handling = [];
    this.globalScope = new Scope(null, true);
    this.classes = new Map();
    for (const [name, base] of Object.entries(EXC_TREE)) {
      this.classes.set(name, { name, builtin: true, baseNames: base ? [base] : [], fields: new Map(), props: new Map(), methods: new Map(), ctors: [], statics: new Map() });
    }
    for (const [name, c] of prog.classes) this.classes.set(name, c);
    for (const c of this.classes.values()) this.link(c);
    for (const c of prog.classes.values()) this.validate(c);
    for (const c of prog.classes.values()) if (!c.builtin && !c.isInterface && !c.isAbstract) this.checkAbstracts(c, c.line);
  }
  step(line) { if (++this.steps > this.maxSteps) throw new StepLimit(line); }
  write(s) {
    this.outLen += s.length;
    if (this.outLen > MAX_OUTPUT) throw rErr('Utskriftsgräns', 'Programmet skrev ut väldigt mycket text. Kanske en loop som aldrig slutar?', null, 'infinite-loop');
    this.out.push(s);
  }
  run() {
    for (const c of this.prog.classes.values()) this.initStatics(c);
    if (this.prog.body.length) this.execBlock(this.prog.body, this.globalScope, false);
    else if (this.prog.classMain) {
      const m = this.prog.classMain;
      this.invoke(m, m.params.length === 1 && m.params[0].type === 'string[]' ? [V('string[]', [])] : [], null);
    }
  }

  // ---------- Klasser ----------
  link(c) {
    if (c.linked) return;
    c.linked = true;
    c.base = null;
    c.interfaces = [];
    c.baseNames.forEach((bn, i) => {
      const b = this.classes.get(bn);
      if (!b) throw cErr('CS0246', `Klassen ${bn} som ${c.name} ärver från finns inte. Kontrollera stavningen.`, c.line, 'unknown-type');
      if (b.isInterface) c.interfaces.push(b);
      else if (i === 0 && !c.isInterface) {
        if (b.isStatic) throw cErr('CS0709', `${c.name} kan inte ärva från den statiska klassen ${bn}.`, c.line, 'inherit');
        c.base = b;
      } else throw cErr('CS1721', `${c.name} kan bara ärva från en klass. Klassen ${bn} måste stå först, och resten måste vara interface.`, c.line, 'inherit');
    });
    for (let x = c.base, n = 0; x; x = x.base, n++) {
      if (x === c || n > 50) throw cErr('CS0146', `Klasserna ärver från varandra i en cirkel (${c.name}).`, c.line, 'inherit');
    }
  }
  validate(c) {
    for (const list of c.methods.values()) {
      for (const m of list) {
        if (m.isOverride) {
          if (['ToString', 'Equals', 'GetHashCode'].includes(m.name)) continue;
          let ok = false;
          for (let x = c.base; x && !ok; x = x.base) ok = (x.methods.get(m.name) || []).some((k) => k.isVirtual || k.isOverride || k.isAbstract);
          if (!ok) throw cErr('CS0506', `${c.name}.${m.name} har override, men det finns ingen virtual- eller abstract-metod med samma namn i ${c.base ? `basklassen ${c.base.name}` : 'någon basklass'}. Skriv virtual framför metoden i basklassen.`, m.line, 'override');
          continue;
        }
        if (m.name === 'ToString' && !m.params.length && !m.isStatic) {
          throw cErr('CS0114', 'ToString() måste skrivas med override: public override string ToString()', m.line, 'tostring-override');
        }
        if (!m.isStatic && !c.isInterface) {
          for (let x = c.base; x; x = x.base) {
            if ((x.methods.get(m.name) || []).some((k) => (k.isVirtual || k.isAbstract || k.isOverride) && k.params.length === m.params.length)) {
              throw cErr('CS0114', `${m.name} finns redan som virtual eller abstract i ${x.name}. Skriv override framför metoden i ${c.name}: public override ...`, m.line, 'override-missing');
            }
          }
        }
      }
    }
  }
  isSub(c, target) {
    for (let x = c; x; x = x.base) {
      if (x === target) return true;
      if ((x.interfaces || []).some((i) => this.isSub(i, target))) return true;
    }
    return false;
  }
  isExc(c) { return this.isSub(c, this.classes.get('Exception')); }
  findField(c, name) { for (let x = c; x; x = x.base) { const f = x.fields.get(name); if (f) return f; } return null; }
  findProp(c, name) {
    for (let x = c; x; x = x.base) { const p = x.props.get(name); if (p && !p.isAbstract) return p; }
    for (let x = c; x; x = x.base) { const p = x.props.get(name); if (p) return p; }
    return null;
  }
  findMethods(c, name) {
    for (let x = c; x; x = x.base) { const l = x.methods.get(name); if (l) return l; }
    for (const i of c.interfaces || []) { const l = this.findMethods(i, name); if (l) return l; }
    return null;
  }
  initStatics(c) {
    for (const f of c.fields.values()) {
      if (f.isStatic) c.statics.set(f.name, { type: f.type, value: f.init ? this.evalInit(f.init, f.type, new Scope(null, true, { cls: c, self: null })) : defaultOf(f.type) });
    }
    for (const p of c.props.values()) {
      if (p.isStatic && p.auto) c.statics.set(p.name, { type: p.type, value: p.init ? this.evalInit(p.init, p.type, new Scope(null, true, { cls: c, self: null })) : defaultOf(p.type) });
    }
  }
  evalInit(init, type, scope) {
    const v = init.k === 'ArrayLit' && !init.elem ? this.evalArrayLit(init, elemOf(type), scope) : this.eval(init, scope);
    return this.convert(v, type, init.line).v;
  }
  canAccess(member, access, ctx) {
    if (access === 'public') return true;
    const from = ctx && ctx.cls;
    if (!from) return false;
    if (access === 'private') return from === member.cls;
    return this.isSub(from, member.cls);
  }
  checkAccess(member, access, ctx, line, what) {
    if (this.canAccess(member, access, ctx)) return;
    const priv = access === 'private';
    throw cErr('CS0122', `${what} ${member.name} är ${priv ? 'private' : 'protected'} i ${member.cls.name} och kan inte användas här.${priv ? ' Skriv public framför den om den ska kunna nås utifrån.' : ''}`, line, 'access');
  }
  checkAbstracts(c, line) {
    const need = [];
    const ifaces = new Set();
    const addIface = (i) => { if (!ifaces.has(i)) { ifaces.add(i); (i.interfaces || []).forEach(addIface); } };
    for (let x = c; x; x = x.base) {
      for (const l of x.methods.values()) for (const m of l) if (m.isAbstract) need.push(m);
      (x.interfaces || []).forEach(addIface);
    }
    for (const i of ifaces) for (const l of i.methods.values()) need.push(...l);
    for (const m of need) {
      let impl = null;
      for (let x = c; x && !impl; x = x.base) impl = (x.methods.get(m.name) || []).find((k) => k.body && k.params.length === m.params.length);
      if (!impl) {
        throw cErr('CS0535', `${c.name} saknar metoden ${m.name}() som ${m.cls.isInterface ? `interfacet ${m.cls.name} kräver` : `är abstract i ${m.cls.name}. Skriv den med override`}.`, c.line ?? line, 'abstract-missing');
      }
      if (m.cls.isInterface && impl.access !== 'public') throw cErr('CS0737', `${impl.cls.name}.${m.name} måste vara public eftersom den kommer från interfacet ${m.cls.name}.`, impl.line, 'access');
    }
  }
  pick(cands, args, line, msg) {
    const fit = cands.filter((m) => args.length <= m.params.length && args.length >= m.params.filter((p) => !p.def).length);
    if (!fit.length) throw cErr('CS1501', msg, line, 'arg-count');
    if (fit.length === 1) return fit[0];
    const ok = fit.filter((m) => args.every((a, i) => this.canConvert(a, m.params[i].type)));
    return ok.find((m) => args.every((a, i) => a.t === m.params[i].type)) || ok[0] || fit[0];
  }
  canConvert(v, t) { try { this.convert(v, t, null); return true; } catch { return false; } }
  dispatch(sc, rc, name, args, line) {
    const cands = this.findMethods(sc, name);
    if (!cands) return null;
    const m0 = this.pick(cands, args, line, `${name} tar inte ${args.length} argument.`);
    if (!m0.isVirtual && !m0.isOverride && !m0.cls.isInterface) return m0;
    for (let x = rc; x; x = x.base) {
      const m = (x.methods.get(name) || []).find((k) => k.body && k.params.length === m0.params.length && (k.isOverride || k === m0 || m0.cls.isInterface));
      if (m) return m;
    }
    return m0;
  }
  instantiate(c, args, line, ctx) {
    if (c.isInterface || c.isAbstract) {
      throw cErr('CS0144', `Det går inte att skapa ett objekt av ${c.isInterface ? 'interfacet' : 'den abstrakta klassen'} ${c.name}. Skapa i stället ett objekt av en klass som ärver från den.`, line, 'abstract-new');
    }
    if (c.isStatic) throw cErr('CS0712', `${c.name} är static och kan inte ha objekt.`, line, 'static-new');
    this.checkAbstracts(c, line);
    const obj = new CsObject(c, this);
    const chain = [];
    for (let x = c; x; x = x.base) chain.unshift(x);
    for (const x of chain) {
      if (x.builtin) { if (x.name === 'Exception') obj.fields.set('Message', { type: 'string', value: null }); continue; }
      const scope = new Scope(null, true, { cls: x, self: obj });
      for (const f of x.fields.values()) if (!f.isStatic) obj.fields.set(f.name, { type: f.type, value: f.init ? this.evalInit(f.init, f.type, scope) : defaultOf(f.type) });
      for (const p of x.props.values()) if (!p.isStatic && p.auto) obj.fields.set(p.name, { type: p.type, value: p.init ? this.evalInit(p.init, p.type, scope) : defaultOf(p.type) });
    }
    this.construct(c, obj, args, line, ctx);
    return V(c.name, obj);
  }
  construct(c, obj, args, line, ctx) {
    if (c.builtin) {
      if (args.length > 2) throw cErr('CS1729', `${c.name} tar högst två argument.`, line, 'no-ctor');
      if (args[0] && args[0].t !== 'string') throw cErr('CS1503', `Meddelandet till ${c.name} ska vara text (string).`, line, 'arg-type');
      if (c.name !== 'Exception' && c.base) { this.construct(c.base, obj, args, line, ctx); return; }
      obj.fields.get('Message').value = args[0] ? args[0].v : `Ett undantag av typen ${obj.cls.name} kastades.`;
      return;
    }
    const ctors = c.ctors.length ? c.ctors : [{ name: c.name, params: [], body: [], chain: null, access: 'public', cls: c, line: c.line, ret: 'void' }];
    const m = this.pick(ctors, args, line, `${c.name} har ingen konstruktor som tar ${args.length} argument.`);
    if (ctx !== undefined) this.checkAccess(m, m.access, ctx, line, 'Konstruktorn');
    const scope = this.bindParams(m, args, line, { cls: c, self: obj, isCtor: true });
    if (m.chain && m.chain.kind === 'this') this.construct(c, obj, this.evalArgs(m.chain.args, scope), m.line);
    else if (c.base) {
      if (!m.chain && !c.base.builtin && c.base.ctors.length && !c.base.ctors.some((k) => k.params.every((p) => p.def))) {
        throw cErr('CS7036', `Basklassen ${c.base.name} behöver argument när den skapas. Skriv : base(...) efter konstruktorn i ${c.name}.`, m.line, 'base-ctor');
      }
      this.construct(c.base, obj, m.chain ? this.evalArgs(m.chain.args, scope) : [], m.chain ? m.line : line);
    } else if (m.chain && m.chain.args.length) throw cErr('CS1729', `${c.name} ärver inte från någon klass, så base(...) kan inte ta argument.`, m.line, 'base-ctor');
    this.depth++;
    try { this.runBody(m, scope); } finally { this.depth--; }
  }
  evalArgs(args, scope) {
    return args.map((a) => {
      if (a.k === 'Out') throw cErr('CS1620', 'out stöds i Kodstig bara för int.TryParse, double.TryParse och TryGetValue.', a.line, 'out');
      return this.eval(a, scope);
    });
  }
  objStr(val) {
    const obj = val.v;
    const ts = (this.findMethods(obj.cls, 'ToString') || []).find((k) => !k.params.length && k.body && k.isOverride);
    if (ts) return csStr(this.invoke(ts, [], null, { cls: ts.cls, self: obj }));
    if (this.isExc(obj.cls)) return `${obj.cls.name}: ${obj.fields.get('Message').value}`;
    return obj.cls.name;
  }
  // Läser ett fält eller en egenskap på ett objekt.
  getMember(o, name, line, ctx) {
    const obj = o.v, rc = obj.cls;
    if (name === 'Message' && this.isExc(rc)) return V('string', obj.fields.get('Message').value);
    const f = this.findField(rc, name);
    if (f && !f.isStatic) {
      this.checkAccess(f, f.access, ctx, line, 'Fältet');
      const s = obj.fields.get(name);
      return V(s.type, s.value);
    }
    const p = this.findProp(rc, name);
    if (p && !p.isStatic) return this.getProp(p, o, line, ctx);
    if (f || p) throw cErr('CS0176', `${name} är static och hör till klassen. Skriv ${(f || p).cls.name}.${name}.`, line, 'static-member');
    if (this.findMethods(rc, name)) throw cErr('CS0428', `${name} är en metod. Anropa den med parenteser: ${name}()`, line, 'method-group');
    throw cErr('CS1061', `${rc.name} har inget fält eller egenskap som heter ${name}.${this.guess(rc, name)}`, line, 'member');
  }
  guess(c, name) {
    const names = [];
    for (let x = c; x; x = x.base) names.push(...x.fields.keys(), ...x.props.keys(), ...x.methods.keys());
    const g = names.find((n) => n.toLowerCase() === name.toLowerCase());
    return g ? ` Menade du ${g}? Stora och små bokstäver spelar roll.` : '';
  }
  getProp(p, o, line, ctx) {
    this.checkAccess(p, p.access, ctx, line, 'Egenskapen');
    if (!p.hasGet) throw cErr('CS0154', `Egenskapen ${p.name} kan bara ges ett värde, inte läsas.`, line, 'property');
    if (p.auto) {
      const s = p.isStatic ? p.cls.statics.get(p.name) : o.v.fields.get(p.name);
      return V(s.type, s.value);
    }
    const scope = new Scope(null, true, { cls: p.cls, self: p.isStatic ? null : o.v });
    if (++this.depth > 300) throw rErr('StackOverflowException', `Egenskapen ${p.name} läser sig själv om och om igen. Spara värdet i ett eget fält.`, line, 'recursion');
    try {
      if (p.get.e) return this.convert(this.eval(p.get.e, scope), p.type, line);
      return this.runBody({ name: p.name, ret: p.type, body: p.get.stmts, line: p.line }, scope);
    } finally { this.depth--; }
  }
  setMember(o, name, val, line, ctx, fromInit = false) {
    const obj = o.v, rc = obj.cls;
    const inCtor = (m) => ctx && ctx.isCtor && ctx.cls === m.cls;
    const f = this.findField(rc, name);
    if (f && !f.isStatic) {
      this.checkAccess(f, f.access, ctx, line, 'Fältet');
      if (f.readonly && !inCtor(f)) throw cErr('CS0191', `${name} är readonly och kan bara få ett värde i konstruktorn.`, line, 'readonly');
      const s = obj.fields.get(name);
      s.value = this.convert(val, s.type, line).v;
      return;
    }
    const p = this.findProp(rc, name);
    if (p && !p.isStatic) { this.setProp(p, o, val, line, ctx, fromInit || inCtor(p)); return; }
    if (f || p) throw cErr('CS0176', `${name} är static och hör till klassen. Skriv ${(f || p).cls.name}.${name}.`, line, 'static-member');
    throw cErr('CS1061', `${rc.name} har inget fält eller egenskap som heter ${name}.${this.guess(rc, name)}`, line, 'member');
  }
  setProp(p, o, val, line, ctx, initAllowed) {
    this.checkAccess(p, p.access, ctx, line, 'Egenskapen');
    if (!p.hasSet) {
      if (!(p.auto && initAllowed)) throw cErr('CS0200', `Egenskapen ${p.name} har ingen set och kan inte ändras här.`, line, 'readonly');
    } else {
      this.checkAccess({ name: p.name, cls: p.cls }, p.setAccess, ctx, line, 'set för egenskapen');
      if (p.initOnly && !initAllowed) throw cErr('CS8852', `Egenskapen ${p.name} har init och kan bara få ett värde när objektet skapas.`, line, 'readonly');
    }
    if (p.auto) {
      const s = p.isStatic ? p.cls.statics.get(p.name) : o.v.fields.get(p.name);
      s.value = this.convert(val, s.type, line).v;
      return;
    }
    const scope = new Scope(null, true, { cls: p.cls, self: p.isStatic ? null : o.v, isCtor: ctx && ctx.isCtor });
    scope.vars.set('value', { type: p.type, value: this.convert(val, p.type, line).v, assigned: true });
    if (++this.depth > 300) throw rErr('StackOverflowException', `Egenskapen ${p.name} ändrar sig själv om och om igen. Spara värdet i ett eget fält.`, line, 'recursion');
    try { this.runBody({ name: p.name, ret: 'void', body: p.set.stmts, line: p.line }, scope); } finally { this.depth--; }
  }
  staticMember(c, name, line, ctx) {
    const f = this.findField(c, name);
    if (f && f.isStatic) { this.checkAccess(f, f.access, ctx, line, 'Fältet'); return { f, ref: f.cls.statics.get(name) }; }
    const p = this.findProp(c, name);
    if (p && p.isStatic) return { p };
    if (f || p) throw cErr('CS0120', `${name} hör till varje objekt, inte till klassen. Skapa ett objekt med new ${c.name}(...) och läs ${name} på det.`, line, 'static-instance');
    if (this.findMethods(c, name)) throw cErr('CS0428', `${name} är en metod. Anropa den med parenteser: ${c.name}.${name}()`, line, 'method-group');
    throw cErr('CS0117', `${c.name} har inget som heter ${name}.${this.guess(c, name)}`, line, 'member');
  }
  // Ett namn utan punkt inne i en klass kan vara ett fält eller en egenskap.
  implicitMember(name, scope, line) {
    const ctx = getCtx(scope);
    if (!ctx || !ctx.cls) return null;
    const f = this.findField(ctx.cls, name);
    const p = f ? null : this.findProp(ctx.cls, name);
    const m = f || p;
    if (!m) return null;
    if (m.isStatic) {
      const c = m.cls;
      return {
        get: () => (p ? this.getProp(p, null, line, ctx) : V(f.type, c.statics.get(name).value)),
        set: (v) => {
          if (p) { this.setProp(p, null, v, line, ctx, false); return; }
          if (f.isConst || (f.readonly && !(ctx.isCtor))) throw cErr('CS0131', `${name} är ${f.isConst ? 'en konstant' : 'readonly'} och kan inte ändras.`, line, 'const');
          const s = c.statics.get(name);
          s.value = this.convert(v, s.type, line).v;
        },
      };
    }
    if (!ctx.self) throw cErr('CS0120', `${name} hör till ett objekt och kan inte användas i en static-metod. Ta bort static från metoden, eller använd ett objekt.`, line, 'static-instance');
    const self = V(ctx.cls.name, ctx.self);
    return { get: () => this.getMember(self, name, line, ctx), set: (v) => this.setMember(self, name, v, line, ctx) };
  }
  isValueName(name, scope) {
    if (scope.find(name)) return true;
    const ctx = getCtx(scope);
    return !!(ctx && ctx.cls && (this.findField(ctx.cls, name) || this.findProp(ctx.cls, name)));
  }

  execBlock(body, scope, newScope = true) {
    const s = newScope ? new Scope(scope) : scope;
    for (const st of body) this.exec(st, s);
  }
  declare(scope, name, type, value, line, isConst = false) {
    if (scope.findInFn(name)) throw cErr('CS0128', `Variabeln ${name} finns redan. Ge den ett nytt värde utan att skriva typen igen: ${name} = ...;`, line, 'duplicate-var');
    scope.vars.set(name, { type, value, assigned: value !== undefined, isConst });
  }
  exec(s, scope) {
    this.step(s.line);
    switch (s.k) {
      case 'Empty': return;
      case 'Block': this.execBlock(s.body, scope); return;
      case 'Decl':
        for (const d of s.decls) {
          let type = s.type;
          let value;
          if (d.init) {
            const v = d.init.k === 'ArrayLit' && !d.init.elem ? this.evalArrayLit(d.init, elemOf(type), scope) : this.eval(d.init, scope);
            if (type === 'var') {
              if (v.t === 'null') throw cErr('CS0815', 'var kan inte få värdet null.', s.line, 'var-init');
              if (v.t === 'lambda') throw cErr('CS0815', 'En lambda kan inte sparas i en var-variabel. Skicka den direkt som argument, till exempel Where(x => x > 0).', s.line, 'lambda');
              if (v.t === 'void') throw cErr('CS0815', 'Metoden returnerar inget (void), så det finns inget värde att spara.', s.line, 'void-value');
              type = v.t;
            }
            value = this.convert(v, type, s.line).v;
          } else if (s.isConst) throw cErr('CS0145', 'En konstant måste få ett värde direkt.', s.line);
          this.declare(scope, d.name, type, value, s.line, s.isConst);
        }
        return;
      case 'Expr': this.eval(s.e, scope); return;
      case 'If': {
        const c = this.cond(s.test, scope, 'if');
        if (c) this.exec(s.then, new Scope(scope));
        else if (s.other) this.exec(s.other, new Scope(scope));
        return;
      }
      case 'While':
        while (this.cond(s.test, scope, 'while')) {
          this.step(s.line);
          try { this.exec(s.body, new Scope(scope)); } catch (e) { if (e instanceof BreakSig) break; if (e instanceof ContinueSig) continue; throw e; }
        }
        return;
      case 'DoWhile':
        do {
          this.step(s.line);
          try { this.exec(s.body, new Scope(scope)); } catch (e) { if (e instanceof BreakSig) break; if (e instanceof ContinueSig) continue; throw e; }
        } while (this.cond(s.test, scope, 'while'));
        return;
      case 'For': {
        const fs = new Scope(scope);
        if (s.init) this.exec(s.init, fs);
        while (!s.test || this.cond(s.test, fs, 'for')) {
          this.step(s.line);
          try { this.exec(s.body, new Scope(fs)); } catch (e) {
            if (e instanceof BreakSig) break;
            if (!(e instanceof ContinueSig)) throw e;
          }
          s.update.forEach((u) => this.eval(u, fs));
        }
        return;
      }
      case 'Foreach': {
        const coll = this.eval(s.iter, scope);
        let items, et;
        if (coll.t === 'string') { items = [...coll.v]; et = 'char'; }
        else if ((et = elemOf(coll.t))) {
          if (coll.v === null) throw rErr('NullReferenceException', 'Samlingen är null, så foreach kan inte gå igenom den.', s.line, 'null');
          items = this.seq(coll).slice();
        } else throw cErr('CS1579', `foreach kan inte gå igenom ${svT(coll.t)}.`, s.line, 'not-iterable');
        const vt = s.vt === 'var' ? et : s.vt;
        const watch = coll.t.endsWith('[]') || coll.t === 'string' ? null : coll.v;
        const size = () => (watch instanceof Map ? watch.size : watch.length);
        const before = watch && size();
        for (const it of items) {
          this.step(s.line);
          const ls = new Scope(scope);
          this.declare(ls, s.name, vt, this.convert(V(et, it), vt, s.line).v, s.line);
          try { this.exec(s.body, ls); } catch (e) { if (e instanceof BreakSig) break; if (!(e instanceof ContinueSig)) throw e; }
          if (watch && size() !== before) {
            throw rErr('InvalidOperationException', 'Samlingen ändrades medan foreach gick igenom den. Gå igenom en kopia (till exempel lista.ToList()) eller använd en vanlig for-loop.', s.line, 'modified-in-foreach');
          }
        }
        return;
      }
      case 'Switch': {
        const v = this.eval(s.subject, scope);
        const match = (l) => this.binop({ k: 'Bin', op: '==', l: { k: 'Val', v }, r: l, line: l.line }, scope).v;
        const sec = s.sections.find((sc) => sc.labels.some(match)) || s.sections.find((sc) => sc.isDefault);
        if (!sec) return;
        try { this.execBlock(sec.body, scope); } catch (e) { if (!(e instanceof BreakSig)) throw e; }
        return;
      }
      case 'Try': {
        try {
          this.execBlock(s.body, scope);
        } catch (err) {
          const ex = this.toException(err);
          if (!ex) throw err;
          const c = s.catches.find((k) => !k.type || this.isSub(ex.v.cls, this.excClass(k.type, k.line)));
          if (!c) throw err instanceof CsThrow ? err : new CsThrow(ex, err.line);
          const cs = new Scope(scope);
          if (c.name) this.declare(cs, c.name, c.type, ex.v, c.line);
          this.handling.push(ex);
          try { this.execBlock(c.body, cs, false); } finally { this.handling.pop(); }
        } finally {
          if (s.fin) this.execBlock(s.fin, scope);
        }
        return;
      }
      case 'Throw': {
        if (!s.e) {
          if (!this.handling.length) throw cErr('CS0156', 'throw; utan något efter kan bara användas inuti ett catch-block.', s.line, 'throw');
          throw new CsThrow(this.handling[this.handling.length - 1], s.line);
        }
        const v = this.eval(s.e, scope);
        if (!(v.v instanceof CsObject) || !this.isExc(v.v.cls)) {
          throw cErr('CS0155', 'Det som kastas med throw måste vara ett undantag, till exempel throw new ArgumentException("...");', s.line, 'throw');
        }
        if (v.v.throwLine === undefined) v.v.throwLine = s.line;
        throw new CsThrow(v, s.line);
      }
      case 'Return': throw new ReturnSig(s.e ? this.eval(s.e, scope) : null);
      case 'Break': throw new BreakSig();
      case 'Continue': throw new ContinueSig();
      default: throw rErr('Internt fel', 'Okänd sats.', s.line);
    }
  }
  // Gör om ett fel till ett C#-undantag som catch kan fånga. Stegbegränsningen och kompileringsfel går inte att fånga.
  toException(err) {
    if (err instanceof CsThrow) return err.val;
    if (err instanceof CodeError && !(err instanceof StepLimit) && err.phase === 'runtime' && Object.hasOwn(EXC_TREE, err.kind)) {
      const c = this.classes.get(err.kind);
      const obj = new CsObject(c, this);
      obj.fields.set('Message', { type: 'string', value: err.message });
      obj.throwLine = err.line;
      obj.hint = err.hint;
      return V(c.name, obj);
    }
    return null;
  }
  excClass(type, line) {
    const c = this.classes.get(type);
    if (!c || !this.isExc(c)) throw cErr('CS0155', `${type} är inte ett undantag. I catch skriver man till exempel catch (FormatException e).`, line, 'catch-type');
    return c;
  }
  cond(e, scope, what) {
    const v = this.eval(e, scope);
    if (v.t !== 'bool') {
      const tip = e.k === 'Assign' ? ' Använd == för att jämföra. Ett ensamt = betyder tilldelning.' : '';
      throw cErr('CS0029', `Villkoret i ${what} måste bli true eller false, men blev ${svT(v.t)}.${tip}`, e.line, e.k === 'Assign' ? 'assign-in-condition' : 'cond-type');
    }
    return v.v;
  }

  convert(val, to, line, explicit = false) {
    const from = val.t;
    if (from === to) return val;
    if (to === 'object') return val;
    if (from === 'void') throw cErr('CS0029', 'Metoden returnerar inget (void), så det finns inget värde att använda här.', line, 'void-value');
    if (from === 'null') {
      if (['int', 'double', 'bool', 'char'].includes(to)) throw cErr('CS0037', `null kan inte sparas i en ${svT(to)}.`, line, 'type-convert');
      return V(to, null);
    }
    if (from === 'lambda') throw cErr('CS1660', 'En lambda kan bara användas som argument, till exempel i Where(x => x > 0).', line, 'lambda');
    const tc = this.classes.get(to);
    if (tc) {
      if (val.v instanceof CsObject && this.isSub(val.v.cls, tc)) return V(to, val.v);
      const fc = this.classes.get(from);
      if (explicit && (val.v === null || val.v instanceof CsObject)) {
        if (val.v === null) return V(to, null);
        throw rErr('InvalidCastException', `Objektet är en ${val.v.cls.name}, inte en ${to}. Kontrollera först med is, till exempel if (x is ${to} y).`, line, 'type-convert');
      }
      if (fc && this.isSub(tc, fc)) throw cErr('CS0266', `En ${from} är inte alltid en ${to}. Kontrollera först med is, till exempel if (x is ${to} y).`, line, 'type-convert');
      throw cErr('CS0029', `Ett värde av typen ${svT(from)} kan inte användas som ${to}.`, line, 'type-convert');
    }
    if (to === 'double' && (from === 'int' || from === 'char')) return V('double', from === 'char' ? val.v.charCodeAt(0) : val.v);
    if (to === 'int' && from === 'char') return V('int', val.v.charCodeAt(0));
    if (explicit) {
      if (to === 'int' && from === 'double') {
        if (!Number.isFinite(val.v)) return V('int', -2147483648);
        return V('int', Math.trunc(val.v) | 0);
      }
      if (to === 'char' && from === 'int') return V('char', String.fromCharCode(val.v));
      if (to === 'string') throw cErr('CS0030', `Det går inte att omvandla ${svT(from)} till string med (string). Använd .ToString() eller stränginterpolering.`, line, 'type-convert');
    }
    if (to === 'int' && from === 'double') {
      throw cErr('CS0266', 'Ett decimaltal (double) kan inte sparas i en int automatiskt. Använd en double-variabel, eller skriv (int) framför för att kapa decimalerna.', line, 'double-to-int');
    }
    if ((to === 'int' || to === 'double') && from === 'string') {
      throw cErr('CS0029', `Text (string) kan inte sparas i en ${svT(to)}. Ta bort citattecknen om det ska vara ett tal, eller använd ${to}.Parse(text).`, line, 'string-to-num');
    }
    if (to === 'string' && from !== 'string') {
      throw cErr('CS0029', `Ett värde av typen ${svT(from)} kan inte sparas i en string. Sätt citattecken runt texten, eller använd .ToString().`, line, 'num-to-string');
    }
    const te = elemOf(to), fe = elemOf(from), tb = genBase(to), fb = genBase(from);
    if (te && fe === '?' && to.endsWith('[]') === from.endsWith('[]') && (tb === fb || tb === 'IEnumerable')) return V(to, this.seq(val).slice());
    if (te && fe) {
      if (tb === 'IEnumerable' && (te === fe || te === 'object' || (this.classes.get(te) && this.classes.get(fe) && this.isSub(this.classes.get(fe), this.classes.get(te))))) {
        return V(to, this.seq(val).slice());
      }
      if (fb === 'IEnumerable' && (tb === 'List' || to.endsWith('[]'))) {
        throw cErr('CS0266', `Resultatet av LINQ är en sekvens (IEnumerable), inte en ${tb === 'List' ? 'List' : 'array'}. Lägg till .${tb === 'List' ? 'ToList' : 'ToArray'}() på slutet.`, line, 'linq-tolist');
      }
      if (to.endsWith('[]') === from.endsWith('[]') && tb === fb && te === 'double' && fe === 'int') return V(to, val.v.slice());
    }
    throw cErr('CS0029', `Ett värde av typen ${svT(from)} kan inte användas som ${svT(to)}.`, line, 'type-convert');
  }

  evalArrayLit(e, elem, scope) {
    const vals = e.items.map((x) => this.eval(x, scope));
    let et = elem || e.elem;
    if (!et) {
      if (!vals.length) throw cErr('CS0826', 'Kan inte avgöra vilken typ arrayen ska ha.', e.line);
      et = vals.some((v) => v.t === 'double') ? 'double' : vals[0].t;
    }
    if (e.size) {
      const sz = this.eval(e.size, scope);
      if (sz.v !== vals.length) throw cErr('CS0847', `Arrayen sades ha ${sz.v} platser men fick ${vals.length} värden.`, e.line);
    }
    return V(et + '[]', vals.map((v) => this.convert(v, et, e.line).v));
  }

  lookupVar(name, scope, line) {
    const ref = scope.find(name);
    if (!ref) {
      let tip = '';
      if (name === 'console') tip = ' C# skiljer på stora och små bokstäver: skriv Console.';
      else if (name === 'True' || name === 'False') tip = ` I C# skrivs ${name.toLowerCase()} med liten bokstav.`;
      if (this.classes.has(name)) throw cErr('CS0119', `${name} är en klass, inte ett värde. Skapa ett objekt med new ${name}(...).`, line, 'type-as-value');
      throw cErr('CS0103', `Namnet '${name}' finns inte här. Har variabeln deklarerats (till exempel int ${name} = 0;) innan den används, och är den stavad likadant?${tip}`, line, 'name');
    }
    return ref;
  }
  // Ett element ur en samling: array, lista, LINQ-resultat, ordbok (som par) eller text (som tecken).
  seq(val) {
    const t = val.t;
    if (val.v === null) return null;
    if (t === 'string') return [...val.v];
    const b = genBase(t);
    if (b === 'Dictionary') return [...val.v.entries()];
    if (t.endsWith('[]') || b === 'List' || b === 'IEnumerable') return val.v;
    return null;
  }

  eval(e, scope) {
    switch (e.k) {
      case 'Lit': return V(e.t, e.v);
      case 'Val': return e.v;
      case 'Interp': {
        let s = '';
        for (const p of e.parts) {
          if (p.lit !== undefined) { s += p.lit; continue; }
          const v = this.eval(p.e, scope);
          let txt = p.fmt && isNumT(v.t) ? fmtNumber(v, p.fmt, e.line) : csStr(v);
          if (p.align) txt = p.align > 0 ? txt.padStart(p.align) : txt.padEnd(-p.align);
          s += txt;
        }
        return V('string', s);
      }
      case 'Name': {
        const ref = scope.find(e.name);
        if (ref) {
          if (!ref.assigned) throw cErr('CS0165', `Variabeln ${e.name} används innan den har fått ett värde. Ge den ett startvärde, till exempel = 0.`, e.line, 'unassigned');
          return V(ref.type, ref.value);
        }
        const m = this.implicitMember(e.name, scope, e.line);
        if (m) return m.get();
        this.lookupVar(e.name, scope, e.line);
        return null;
      }
      case 'This': {
        const ctx = getCtx(scope);
        if (!ctx || !ctx.self) throw cErr('CS0026', 'this kan bara användas i en metod som hör till ett objekt (inte i en static-metod).', e.line, 'this');
        return V(ctx.cls.name, ctx.self);
      }
      case 'Base': throw cErr('CS0175', 'base används som base.Metod() eller base.Egenskap.', e.line, 'base');
      case 'Lambda': return V('lambda', { node: e, scope });
      case 'Is': {
        const v = this.eval(e.e, scope);
        const c = this.classes.get(e.type);
        let ok = c ? v.v instanceof CsObject && this.isSub(v.v.cls, c) : v.v !== null && (v.t === e.type || e.type === 'object');
        if (e.not) ok = !ok;
        if (ok && e.name) {
          const own = scope.vars.get(e.name);
          if (own) { own.value = v.v; own.type = e.type; own.assigned = true; } else this.declare(scope, e.name, e.type, v.v, e.line);
        }
        return V('bool', ok);
      }
      case 'As': {
        const v = this.eval(e.e, scope);
        const c = this.classes.get(e.type);
        return V(e.type, v.v instanceof CsObject && this.isSub(v.v.cls, c) ? v.v : null);
      }
      case 'IsNull': {
        const r = this.eval(e.e, scope).v === null;
        return V('bool', e.not ? !r : r);
      }
      case 'ArrayLit': return this.evalArrayLit(e, e.elem, scope);
      case 'NewArray': {
        const sz = this.convert(this.eval(e.size, scope), 'int', e.line).v;
        if (sz < 0) throw rErr('OverflowException', 'En array kan inte ha negativ storlek.', e.line, 'array-size');
        if (sz > 1000000) throw rErr('OutOfMemoryException', 'Arrayen är för stor för övningsmotorn.', e.line);
        return V(e.elem + '[]', Array.from({ length: sz }, () => defaultOf(e.elem)));
      }
      case 'New': {
        const ga = genArgs(e.type);
        if (genBase(e.type) === 'Dictionary') {
          const m = new Map();
          if (e.args.length) {
            const src = this.eval(e.args[0], scope);
            if (genBase(src.t) !== 'Dictionary') throw cErr('CS1503', 'En ny ordbok kan bara kopiera en annan ordbok.', e.line, 'arg-type');
            for (const [k, x] of src.v) m.set(k, x);
          }
          for (const [ke, ve, byIndex] of e.dictItems || []) {
            const k = this.convert(this.eval(ke, scope), ga[0], e.line).v;
            if (!byIndex && m.has(k)) throw rErr('ArgumentException', `Nyckeln ${csStr(V(ga[0], k))} finns redan i ordboken.`, e.line, 'dup-key');
            m.set(k, this.convert(this.eval(ve, scope), ga[1], e.line).v);
          }
          return V(e.type, m);
        }
        const et = ga[0];
        let base = [];
        if (e.args.length) {
          const a0 = this.eval(e.args[0], scope);
          if (a0.t !== 'int') {
            const items = this.seq(a0);
            if (!items) throw cErr('CS1503', `new ${e.type}(...) kan ta en annan samling att kopiera, eller ingenting.`, e.line, 'arg-type');
            const fe = elemOf(a0.t) || 'char';
            base = items.map((x) => this.convert(V(fe, x), et, e.line).v);
          }
        }
        return V(e.type, [...base, ...e.items.map((x) => this.convert(this.eval(x, scope), et, e.line).v)]);
      }
      case 'NewObj': {
        const ctx = getCtx(scope);
        const v = this.instantiate(this.classes.get(e.cls), this.evalArgs(e.args, scope), e.line, ctx);
        if (e.init) for (const it of e.init) this.setMember(v, it.name, this.eval(it.e, scope), it.line, ctx, true);
        return v;
      }
      case 'Cast': return this.convert(this.eval(e.v, scope), e.type, e.line, true);
      case 'Cond': {
        const v = this.cond(e.c, scope, '?:') ? this.eval(e.a, scope) : this.eval(e.b, scope);
        return v.t === 'int' && (e.a.k === 'Lit' && e.a.t === 'double' || e.b.k === 'Lit' && e.b.t === 'double') ? V('double', v.v) : v;
      }
      case 'Unary': {
        const v = this.eval(e.v, scope);
        if (e.op === '!') {
          if (v.t !== 'bool') throw cErr('CS0023', `Operatorn ! fungerar bara på bool, inte ${svT(v.t)}.`, e.line, 'op-type');
          return V('bool', !v.v);
        }
        if (!isNumT(v.t)) throw cErr('CS0023', `Operatorn ${e.op} fungerar inte på ${svT(v.t)}.`, e.line, 'op-type');
        const x = v.t === 'char' ? v.v.charCodeAt(0) : v.v;
        return V(v.t === 'double' ? 'double' : 'int', e.op === '-' ? (v.t === 'double' ? -x : (-x) | 0) : x);
      }
      case 'Bin': return this.binop(e, scope);
      case 'Assign': return this.assign(e, scope);
      case 'IncDec': {
        const cur = this.eval(e.target, scope);
        if (!isNumT(cur.t)) throw cErr('CS0023', `${e.op} fungerar bara på tal.`, e.line, 'op-type');
        const nv = V(cur.t, cur.t === 'int' ? (cur.v + (e.op === '++' ? 1 : -1)) | 0 : cur.v + (e.op === '++' ? 1 : -1));
        this.store(e.target, nv, scope, e.line);
        return e.prefix ? nv : cur;
      }
      case 'Index': {
        const obj = this.eval(e.obj, scope);
        const idx = this.eval(e.index, scope);
        if (genBase(obj.t) === 'Dictionary') {
          if (obj.v === null) throw rErr('NullReferenceException', 'Ordboken är null.', e.line, 'null');
          const [kt, vt] = genArgs(obj.t);
          const k = this.convert(idx, kt, e.line).v;
          if (!obj.v.has(k)) throw rErr('KeyNotFoundException', `Nyckeln ${csStr(V(kt, k))} finns inte i ordboken. Kontrollera först med ContainsKey eller använd TryGetValue.`, e.line, 'key-not-found');
          return V(vt, obj.v.get(k));
        }
        if (idx.t !== 'int') throw cErr('CS0029', `Ett index måste vara ett heltal (int), inte ${svT(idx.t)}.`, e.line, 'index-type');
        if (obj.t === 'string') {
          if (idx.v < 0 || idx.v >= obj.v.length) throw rErr('IndexOutOfRangeException', `Index ${idx.v} finns inte i texten, som har ${obj.v.length} tecken (index 0 till ${obj.v.length - 1}).`, e.line, 'index-range');
          return V('char', obj.v[idx.v]);
        }
        if (genBase(obj.t) === 'IEnumerable') throw cErr('CS0021', 'Ett LINQ-resultat kan inte indexeras med []. Gör om det till en lista först med ToList().', e.line, 'linq-tolist');
        const et = elemOf(obj.t);
        if (!et) throw cErr('CS0021', `${svT(obj.t)} kan inte indexeras med [].`, e.line, 'type');
        if (obj.v === null) throw rErr('NullReferenceException', 'Arrayen är null.', e.line, 'null');
        this.checkIndex(obj, idx.v, e.line);
        return V(et, obj.v[idx.v]);
      }
      case 'Member': return this.member(e, scope);
      case 'Call': return this.call(e, scope);
      case 'Out': throw cErr('CS1620', 'out stöds i Kodstig bara för int.TryParse, double.TryParse och TryGetValue.', e.line, 'out');
      default: throw rErr('Internt fel', `Okänt uttryck ${e.k}.`, e.line);
    }
  }
  checkIndex(obj, i, line) {
    const len = obj.v.length;
    if (i < 0 || i >= len) {
      const isList = obj.t.startsWith('List<');
      throw rErr(isList ? 'ArgumentOutOfRangeException' : 'IndexOutOfRangeException',
        `Index ${i} finns inte. ${isList ? 'Listan' : 'Arrayen'} har ${len} element, så giltiga index är ${len ? `0 till ${len - 1}` : 'inga alls'}.`, line, 'index-range');
    }
  }
  store(target, val, scope, line) {
    if (target.k === 'Name') {
      const ref = scope.find(target.name);
      if (!ref) {
        const m = this.implicitMember(target.name, scope, line);
        if (m) { m.set(val); return; }
        this.lookupVar(target.name, scope, line);
      }
      if (ref.isConst) throw cErr('CS0131', `${target.name} är en konstant och kan inte ändras.`, line, 'const');
      ref.value = this.convert(val, ref.type, line).v;
      ref.assigned = true;
      return;
    }
    if (target.k === 'Index') {
      const obj = this.eval(target.obj, scope);
      const idx = this.eval(target.index, scope);
      if (genBase(obj.t) === 'Dictionary') {
        const [kt, vt] = genArgs(obj.t);
        obj.v.set(this.convert(idx, kt, line).v, this.convert(val, vt, line).v);
        return;
      }
      if (obj.t === 'string') throw cErr('CS0200', 'Text (string) kan inte ändras tecken för tecken. Skapa en ny text i stället.', line, 'str-immutable');
      const et = elemOf(obj.t);
      if (!et || genBase(obj.t) === 'IEnumerable') throw cErr('CS0021', `${svT(obj.t)} kan inte indexeras med [].`, line, 'type');
      if (idx.t !== 'int') throw cErr('CS0029', 'Ett index måste vara ett heltal (int).', line, 'index-type');
      this.checkIndex(obj, idx.v, line);
      obj.v[idx.v] = this.convert(val, et, line).v;
      return;
    }
    if (target.k === 'Member') {
      const ctx = getCtx(scope);
      if (target.obj.k === 'Name' && !this.isValueName(target.obj.name, scope) && this.classes.has(target.obj.name)) {
        const c = this.classes.get(target.obj.name);
        const r = this.staticMember(c, target.name, line, ctx);
        if (r.p) { this.setProp(r.p, null, val, line, ctx, false); return; }
        if (r.f.isConst || (r.f.readonly && !(ctx && ctx.isCtor))) throw cErr('CS0131', `${target.name} är ${r.f.isConst ? 'en konstant' : 'readonly'} och kan inte ändras.`, line, 'const');
        r.ref.value = this.convert(val, r.ref.type, line).v;
        return;
      }
      const obj = this.eval(target.obj, scope);
      if (obj.v === null && obj.t !== 'null') throw rErr('NullReferenceException', 'Objektet är null, så det går inte att ändra något på det.', line, 'null');
      if (obj.v instanceof CsObject) { this.setMember(obj, target.name, val, line, ctx); return; }
      throw cErr('CS0200', `${target.name} på ${svT(obj.t)} kan inte ändras.`, line, 'bad-assign');
    }
    throw cErr('CS0200', 'Det här kan inte tilldelas ett nytt värde.', line, 'bad-assign');
  }
  assign(e, scope) {
    let val;
    if (e.value.k === 'ArrayLit' && !e.value.elem) {
      const ref = e.target.k === 'Name' ? scope.find(e.target.name) : null;
      const tt = ref ? ref.type : this.eval(e.target, scope).t;
      val = this.evalArrayLit(e.value, elemOf(tt), scope);
    } else val = this.eval(e.value, scope);
    if (e.op !== '=') {
      const cur = this.eval(e.target, scope);
      val = this.arith(e.op[0], cur, val, e.line);
      if (cur.t === 'int' && val.t === 'double') throw cErr('CS0266', 'Resultatet blir ett decimaltal (double) som inte får plats i en int.', e.line, 'double-to-int');
      if (cur.t === 'char' && val.t === 'int') val = V('char', String.fromCharCode(val.v));
    }
    this.store(e.target, val, scope, e.line);
    return val;
  }
  binop(e, scope) {
    const op = e.op;
    if (op === '&&' || op === '||') {
      const l = this.eval(e.l, scope);
      if (l.t !== 'bool') throw cErr('CS0019', `${op} fungerar bara mellan bool-värden, inte ${svT(l.t)}.`, e.line, 'op-type');
      if (op === '&&' && !l.v) return l;
      if (op === '||' && l.v) return l;
      const r = this.eval(e.r, scope);
      if (r.t !== 'bool') throw cErr('CS0019', `${op} fungerar bara mellan bool-värden, inte ${svT(r.t)}.`, e.line, 'op-type');
      return r;
    }
    const l = this.eval(e.l, scope);
    if (op === '??') return l.v === null ? this.eval(e.r, scope) : l;
    const r = this.eval(e.r, scope);
    if (op === '==' || op === '!=') {
      let eq;
      if (isNumT(l.t) && isNumT(r.t)) eq = numOf(l) === numOf(r);
      else if (l.v instanceof CsObject || r.v instanceof CsObject || l.t === r.t || l.t === 'null' || r.t === 'null') eq = l.v === r.v;
      else throw cErr('CS0019', `Det går inte att jämföra ${svT(l.t)} med ${svT(r.t)} med ${op}.`, e.line, 'op-type');
      return V('bool', op === '==' ? eq : !eq);
    }
    if (['<', '>', '<=', '>='].includes(op)) {
      if (!(isNumT(l.t) && isNumT(r.t))) {
        const tip = l.t === 'string' || r.t === 'string' ? ' Text jämförs inte med < och >. Jämför ett tal, till exempel text.Length, eller använd CompareTo.' : '';
        throw cErr('CS0019', `${op} kan inte användas mellan ${svT(l.t)} och ${svT(r.t)}.${tip}`, e.line, 'op-type');
      }
      const a = numOf(l), b = numOf(r);
      return V('bool', op === '<' ? a < b : op === '>' ? a > b : op === '<=' ? a <= b : a >= b);
    }
    return this.arith(op, l, r, e.line);
  }
  arith(op, l, r, line) {
    if (op === '+' && (l.t === 'string' || r.t === 'string')) return V('string', csStr(l) + csStr(r));
    if (op === '+' && l.t === 'char' && r.t === 'char') return V('int', numOf(l) + numOf(r));
    if (!(isNumT(l.t) && isNumT(r.t))) throw cErr('CS0019', `Operatorn ${op} fungerar inte mellan ${svT(l.t)} och ${svT(r.t)}.`, line, 'op-type');
    const a = numOf(l), b = numOf(r);
    if (l.t === 'double' || r.t === 'double') {
      switch (op) {
        case '+': return V('double', a + b);
        case '-': return V('double', a - b);
        case '*': return V('double', a * b);
        case '/': return V('double', a / b);
        case '%': return V('double', a % b);
        default: break;
      }
    }
    switch (op) {
      case '+': return V('int', (a + b) | 0);
      case '-': return V('int', (a - b) | 0);
      case '*': return V('int', Math.imul(a, b));
      case '/':
        if (b === 0) throw rErr('DivideByZeroException', 'Division med noll går inte för heltal.', line, 'zero-div');
        return V('int', Math.trunc(a / b) | 0);
      case '%':
        if (b === 0) throw rErr('DivideByZeroException', 'Rest vid division med noll går inte.', line, 'zero-div');
        return V('int', a % b);
      default: throw cErr('CS0019', `Okänd operator ${op}.`, line);
    }
  }

  member(e, scope) {
    const ctx = getCtx(scope);
    if (e.obj.k === 'Base') {
      if (!ctx || !ctx.self || !ctx.cls.base) throw cErr('CS0175', 'base kan bara användas i en klass som ärver från en annan klass.', e.line, 'base');
      const p = this.findProp(ctx.cls.base, e.name);
      if (p && p.get) return this.getProp(p, V(ctx.cls.base.name, ctx.self), e.line, ctx);
      return this.getMember(V(ctx.cls.base.name, ctx.self), e.name, e.line, ctx);
    }
    if (e.obj.k === 'Name' && !this.isValueName(e.obj.name, scope)) {
      const c = this.classes.get(e.obj.name);
      if (c) {
        const r = this.staticMember(c, e.name, e.line, ctx);
        return r.p ? this.getProp(r.p, null, e.line, ctx) : V(r.ref.type, r.ref.value);
      }
      const full = `${e.obj.name}.${e.name}`;
      if (full === 'Math.PI') return V('double', Math.PI);
      if (full === 'int.MaxValue') return V('int', 2147483647);
      if (full === 'int.MinValue') return V('int', -2147483648);
      if (full === 'double.MaxValue') return V('double', Number.MAX_VALUE);
      if (full === 'string.Empty' || full === 'String.Empty') return V('string', '');
      throw this.unknownStatic(e.obj.name, e.name, e.line);
    }
    const obj = this.eval(e.obj, scope);
    if (obj.v === null && obj.t !== 'null') throw rErr('NullReferenceException', `Värdet är null, så det går inte att läsa ${e.name}. Har objektet skapats med new?`, e.line, 'null');
    if (obj.v instanceof CsObject) return this.getMember(obj, e.name, e.line, ctx);
    const gb = genBase(obj.t), ga = genArgs(obj.t);
    if (obj.t === 'Type' && e.name === 'Name') return V('string', obj.v.name);
    if (gb === 'Dictionary') {
      if (e.name === 'Count') return V('int', obj.v.size);
      if (e.name === 'Keys') return V(`List<${ga[0]}>`, [...obj.v.keys()]);
      if (e.name === 'Values') return V(`List<${ga[1]}>`, [...obj.v.values()]);
    }
    if (gb === 'KeyValuePair') {
      if (e.name === 'Key') return V(ga[0], obj.v[0]);
      if (e.name === 'Value') return V(ga[1], obj.v[1]);
    }
    if (gb === 'IEnumerable' && (e.name === 'Count' || e.name === 'Length')) {
      throw cErr('CS0428', `Resultatet av LINQ har ingen ${e.name}. Skriv Count() med parenteser, eller gör om det till en lista med ToList().`, e.line, 'linq-count');
    }
    if (e.name === 'Length' && (obj.t === 'string' || obj.t.endsWith('[]'))) return V('int', obj.v.length);
    if (e.name === 'Count' && obj.t.startsWith('List<')) return V('int', obj.v.length);
    if (e.name === 'Length' && obj.t.startsWith('List<')) throw cErr('CS1061', 'En List har inte Length. Använd Count för att få antalet element.', e.line, 'length-count');
    if (e.name === 'Count' && obj.t.endsWith('[]')) throw cErr('CS0428', 'En array har inte Count. Använd Length.', e.line, 'length-count');
    if (e.name === 'Length' || e.name === 'Count') throw cErr('CS1061', `${svT(obj.t)} har inte ${e.name}.`, e.line, 'member');
    throw cErr('CS1061', `${svT(obj.t)} har ingen egenskap som heter ${e.name}. Glömde du parenteser för ett metodanrop?`, e.line, 'member');
  }
  unknownStatic(cls, name, line) {
    const known = { Console: ['WriteLine', 'Write'], Math: ['Max', 'Min', 'Abs', 'Round', 'Sqrt', 'Pow', 'Floor', 'Ceiling', 'PI'] };
    if (Object.hasOwn(known, cls)) {
      const guess = known[cls].find((k) => k.toLowerCase() === name.toLowerCase());
      return cErr('CS0117', `${cls} har inget som heter ${name}.${guess ? ` Menade du ${guess}? Stora och små bokstäver spelar roll.` : ''}`, line, 'member-case');
    }
    if (cls === 'console' || cls === 'math') return cErr('CS0103', `Namnet '${cls}' finns inte. C# skiljer på stora och små bokstäver: skriv ${cls[0].toUpperCase() + cls.slice(1)}.`, line, 'name');
    return cErr('CS0103', `Namnet '${cls}' finns inte här.`, line, 'name');
  }

  call(e, scope) {
    if (e.args.some((a) => a.k === 'Out')) return this.callWithOut(e, scope);
    const args = () => this.evalArgs(e.args, scope);
    const fn = e.fn;
    const ctx = getCtx(scope);
    if (fn.k === 'Name') {
      if (ctx && ctx.cls) {
        const cands = this.findMethods(ctx.cls, fn.name);
        if (cands) {
          const a = args();
          const m0 = this.pick(cands, a, e.line, `${fn.name} tar inte ${a.length} argument.`);
          if (m0.isStatic) return this.invoke(m0, a, e.line, { cls: m0.cls, self: null });
          if (!ctx.self) throw cErr('CS0120', `${fn.name} hör till ett objekt och kan inte anropas från en static-metod. Gör metoden static, eller anropa den på ett objekt.`, e.line, 'static-instance');
          const m = this.dispatch(ctx.cls, ctx.self.cls, fn.name, a, e.line);
          return this.invoke(m, a, e.line, { cls: m.cls, self: ctx.self });
        }
      }
      const m = this.prog.methods.get(fn.name);
      if (!m) {
        const ci = [...this.prog.methods.keys()].find((k) => k.toLowerCase() === fn.name.toLowerCase());
        throw cErr('CS0103', `Metoden ${fn.name} finns inte.${ci ? ` Menade du ${ci}?` : ''}`, e.line, 'name');
      }
      return this.invoke(m, args(), e.line);
    }
    if (fn.k !== 'Member') throw cErr('CS0149', 'Det här går inte att anropa.', e.line);
    if (fn.obj.k === 'Base') {
      if (!ctx || !ctx.self || !ctx.cls.base) throw cErr('CS0175', 'base kan bara användas i en klass som ärver från en annan klass.', e.line, 'base');
      const cands = this.findMethods(ctx.cls.base, fn.name);
      if (!cands) throw cErr('CS0117', `${ctx.cls.base.name} har ingen metod som heter ${fn.name}.`, e.line, 'member');
      const a = args();
      const m = this.pick(cands, a, e.line, `${fn.name} tar inte ${a.length} argument.`);
      if (!m.body) throw cErr('CS0205', `${fn.name} är abstract i ${m.cls.name} och har ingen kod att anropa.`, e.line, 'abstract-body');
      return this.invoke(m, a, e.line, { cls: m.cls, self: ctx.self });
    }
    if (fn.obj.k === 'Name' && !this.isValueName(fn.obj.name, scope)) {
      const c = this.classes.get(fn.obj.name);
      if (c) {
        const cands = this.findMethods(c, fn.name);
        if (!cands) throw cErr('CS0117', `${c.name} har ingen metod som heter ${fn.name}.${this.guess(c, fn.name)}`, e.line, 'member');
        const a = args();
        const m = this.pick(cands, a, e.line, `${fn.name} tar inte ${a.length} argument.`);
        if (!m.isStatic) throw cErr('CS0120', `${fn.name} hör till ett objekt. Skapa först ett objekt, till exempel var x = new ${c.name}(...); och skriv sedan x.${fn.name}(...).`, e.line, 'static-instance');
        this.checkAccess(m, m.access, ctx, e.line, 'Metoden');
        return this.invoke(m, a, e.line, { cls: m.cls, self: null });
      }
      return this.staticCall(fn.obj.name, fn.name, args(), e.line);
    }
    const obj = this.eval(fn.obj, scope);
    return this.instanceCall(obj, fn.name, args(), e.line, ctx);
  }
  // int.TryParse(text, out int tal) och ordbok.TryGetValue(nyckel, out var värde)
  callWithOut(e, scope) {
    const fn = e.fn;
    const name = fn.k === 'Member' ? fn.name : fn.name;
    const outArg = e.args[e.args.length - 1];
    if (e.args.filter((a) => a.k === 'Out').length !== 1 || outArg.k !== 'Out') throw cErr('CS1620', 'out stöds bara som sista argument.', e.line, 'out');
    const vals = e.args.slice(0, -1).map((x) => this.eval(x, scope));
    let res, outVal, outType;
    if (fn.k === 'Member' && fn.obj.k === 'Name' && !this.isValueName(fn.obj.name, scope) && ['int', 'double'].includes(normType(fn.obj.name)) && name === 'TryParse') {
      if (vals.length !== 1 || vals[0].t !== 'string') throw cErr('CS1503', `${fn.obj.name}.TryParse behöver en text och en out-variabel.`, e.line, 'arg-type');
      outType = normType(fn.obj.name);
      const txt = (vals[0].v || '').trim();
      const ok = outType === 'int' ? /^[+-]?\d+$/.test(txt) && Math.abs(parseInt(txt, 10)) <= 2147483647 : /^[+-]?(\d+\.?\d*|\.\d+)$/.test(txt);
      outVal = ok ? (outType === 'int' ? parseInt(txt, 10) : parseFloat(txt)) : 0;
      res = V('bool', ok);
    } else if (fn.k === 'Member' && name === 'TryGetValue') {
      const d = this.eval(fn.obj, scope);
      if (genBase(d.t) !== 'Dictionary') throw cErr('CS1061', `${svT(d.t)} har ingen TryGetValue.`, e.line, 'member');
      const [kt, vt] = genArgs(d.t);
      const k = this.convert(vals[0], kt, e.line).v;
      const has = d.v.has(k);
      outType = vt; outVal = has ? d.v.get(k) : defaultOf(vt); res = V('bool', has);
    } else throw cErr('CS1620', 'out stöds i Kodstig bara för int.TryParse, double.TryParse och TryGetValue.', e.line, 'out');
    const val = V(outType, outVal);
    if (outArg.type) {
      const t = outArg.type === 'var' ? outType : outArg.type;
      const own = scope.vars.get(outArg.name);
      if (own) { own.value = this.convert(val, own.type, e.line).v; own.assigned = true; } else this.declare(scope, outArg.name, t, this.convert(val, t, e.line).v, e.line);
    } else this.store({ k: 'Name', name: outArg.name, line: e.line }, val, scope, e.line);
    return res;
  }
  argCount(name, a, min, max, line) {
    if (a.length < min || a.length > max) throw cErr('CS1501', `${name} tar ${min === max ? min : `${min}–${max}`} argument men fick ${a.length}.`, line, 'arg-count');
  }
  staticCall(cls, name, a, line) {
    const num = (v, what) => {
      if (!isNumT(v.t)) throw cErr('CS1503', `${what} behöver ett tal, inte ${svT(v.t)}.`, line, 'arg-type');
      return numOf(v);
    };
    const full = `${cls}.${name}`;
    switch (full) {
      case 'Console.WriteLine': case 'Console.Write': {
        let s = '';
        if (a.length > 1 && a[0].t === 'string') {
          s = a[0].v.replace(/\{(\d+)(?::([^}]+))?\}/g, (m, i, f) => {
            const v = a[1 + +i];
            if (!v) throw rErr('FormatException', `Platshållaren {${i}} saknar ett värde.`, line, 'format');
            return f && isNumT(v.t) ? fmtNumber(v, f, line) : csStr(v);
          });
        } else if (a.length === 1) {
          if (a[0].t === 'void') throw cErr('CS1503', 'Metoden returnerar inget (void), så det finns inget att skriva ut.', line, 'void-value');
          s = csStr(a[0]);
        } else if (a.length > 1) throw cErr('CS1501', `${name} tar ett värde. Slå ihop delarna med + eller $"..."`, line, 'arg-count');
        this.write(s + (name === 'WriteLine' ? '\n' : ''));
        return V('void', null);
      }
      case 'Console.ReadLine': case 'Console.ReadKey': case 'Console.Read':
        throw rErr('Stöds inte', 'Console.ReadLine() stöds inte i Kodstig. Ge variabeln ett värde direkt i koden i stället.', line, 'input');
      case 'Math.Max': case 'Math.Min': {
        this.argCount(full, a, 2, 2, line);
        const x = num(a[0], full), y = num(a[1], full);
        const t = a[0].t === 'double' || a[1].t === 'double' ? 'double' : 'int';
        return V(t, name === 'Max' ? Math.max(x, y) : Math.min(x, y));
      }
      case 'Math.Abs': this.argCount(full, a, 1, 1, line); return V(a[0].t === 'double' ? 'double' : 'int', Math.abs(num(a[0], full)));
      case 'Math.Sqrt': this.argCount(full, a, 1, 1, line); return V('double', Math.sqrt(num(a[0], full)));
      case 'Math.Pow': this.argCount(full, a, 2, 2, line); return V('double', num(a[0], full) ** num(a[1], full));
      case 'Math.Floor': return V('double', Math.floor(num(a[0], full)));
      case 'Math.Ceiling': return V('double', Math.ceil(num(a[0], full)));
      case 'Math.Round': {
        this.argCount(full, a, 1, 2, line);
        const x = num(a[0], full), d = a[1] ? num(a[1], full) : 0;
        const m = 10 ** d, y = x * m;
        const f = Math.floor(y), diff = y - f;
        const r = Math.abs(diff - 0.5) < 1e-9 ? (f % 2 === 0 ? f : f + 1) : Math.round(y);
        return V('double', r / m);
      }
      case 'int.Parse': case 'Convert.ToInt32': {
        this.argCount(full, a, 1, 1, line);
        if (a[0].t === 'double') return V('int', Math.round(a[0].v));
        if (a[0].t !== 'string') return V('int', numOf(a[0]));
        const s = a[0].v.trim();
        if (!/^[+-]?\d+$/.test(s)) throw rErr('FormatException', `Texten "${a[0].v}" kan inte tolkas som ett heltal.`, line, 'parse');
        const n = parseInt(s, 10);
        if (Math.abs(n) > 2147483647) throw rErr('OverflowException', `Talet ${s} är för stort för en int.`, line, 'parse');
        return V('int', n);
      }
      case 'double.Parse': case 'Convert.ToDouble': {
        this.argCount(full, a, 1, 1, line);
        if (a[0].t !== 'string') return V('double', numOf(a[0]));
        const s = a[0].v.trim();
        if (!/^[+-]?(\d+\.?\d*|\.\d+)$/.test(s)) throw rErr('FormatException', `Texten "${a[0].v}" kan inte tolkas som ett decimaltal. Använd punkt som decimaltecken.`, line, 'parse');
        return V('double', parseFloat(s));
      }
      case 'string.Join': case 'String.Join': {
        this.argCount(full, a, 2, 2, line);
        const et = elemOf(a[1].t);
        if (!et) throw cErr('CS1503', 'string.Join behöver en array eller lista som andra argument.', line, 'arg-type');
        return V('string', this.seq(a[1]).map((x) => csStr(V(et, x))).join(csStr(a[0])));
      }
      case 'string.IsNullOrEmpty': return V('bool', a[0].v === null || a[0].v === '');
      case 'string.IsNullOrWhiteSpace': return V('bool', a[0].v === null || !String(a[0].v).trim());
      case 'string.Compare': this.argCount(full, a, 2, 2, line); return V('int', cmpText(a[0].v, a[1].v));
      case 'char.IsDigit': return V('bool', /^\d$/.test(a[0].v));
      case 'char.IsLetter': return V('bool', /^\p{L}$/u.test(a[0].v));
      case 'char.IsUpper': return V('bool', /^\p{Lu}$/u.test(a[0].v));
      case 'char.IsLower': return V('bool', /^\p{Ll}$/u.test(a[0].v));
      case 'char.IsWhiteSpace': return V('bool', /^\s$/.test(a[0].v));
      case 'char.IsLetterOrDigit': return V('bool', /^[\p{L}\d]$/u.test(a[0].v));
      case 'char.ToUpper': return V('char', a[0].v.toUpperCase());
      case 'char.ToLower': return V('char', a[0].v.toLowerCase());
      case 'Array.Sort': {
        const et = elemOf(a[0].t);
        a[0].v.sort((x, y) => this.cmpVals(V(et, x), V(et, y), line));
        return V('void', null);
      }
      case 'Array.Reverse': a[0].v.reverse(); return V('void', null);
      default: break;
    }
    throw this.unknownStatic(cls, name, line);
  }
  // Anropar en lambda med färdiga argument.
  callLambda(fv, args, line) {
    if (!fv || fv.t !== 'lambda') throw cErr('CS1503', 'Här förväntades en lambda, till exempel x => x > 0.', line, 'lambda');
    const { node, scope: closure } = fv.v;
    if (node.params.length !== args.length) throw cErr('CS1593', `Lambdan ska ta ${args.length} parameter${args.length === 1 ? '' : 'rar'} men har ${node.params.length}.`, node.line, 'lambda');
    this.step(node.line);
    const s = new Scope(closure, true);
    node.params.forEach((p, i) => s.vars.set(p, { type: args[i].t, value: args[i].v, assigned: true }));
    if (++this.depth > 300) throw rErr('StackOverflowException', 'Lambdan anropar sig själv för många gånger.', line, 'recursion');
    try {
      if (!node.block) return this.eval(node.e, s);
      try { for (const st of node.body) this.exec(st, s); } catch (x) { if (x instanceof ReturnSig) return x.v || V('void', null); throw x; }
      return V('void', null);
    } finally { this.depth--; }
  }
  cmpVals(a, b, line) {
    if (isNumT(a.t) && isNumT(b.t)) return Math.sign(numOf(a) - numOf(b));
    if (a.t === 'string' && b.t === 'string') return cmpText(a.v, b.v);
    if (a.t === 'bool' && b.t === 'bool') return a.v - b.v;
    const what = a.v instanceof CsObject ? `två ${a.v.cls.name}-objekt` : `${svT(a.t)} och ${svT(b.t)}`;
    throw rErr('InvalidOperationException', `Det går inte att jämföra ${what}. Sortera efter ett tal eller en text, till exempel OrderBy(x => x.Namn).`, line, 'sort-objects');
  }
  // LINQ på arrayer, listor, ordböcker och text.
  linq(obj, name, a, line) {
    const items = this.seq(obj);
    if (!items) return undefined;
    const et = obj.t === 'string' ? 'char' : elemOf(obj.t);
    const W = (x) => V(et, x);
    const fn = (i = 0) => {
      const f = a[i];
      if (!f || f.t !== 'lambda') throw cErr('CS1503', `${name} behöver en lambda som argument, till exempel x => x > 0.`, line, 'lambda');
      return (x) => this.callLambda(f, [W(x)], line);
    };
    const pred = () => {
      const f = fn(0);
      return (x) => {
        const r = f(x);
        if (r.t !== 'bool') throw cErr('CS1662', `Lambdan i ${name} måste ge true eller false, men gav ${svT(r.t)}.`, line, 'lambda');
        return r.v;
      };
    };
    const seqOf = (t, arr) => V(`IEnumerable<${t}>`, arr);
    const nums = () => {
      const vals = a.length ? items.map(fn(0)) : items.map(W);
      vals.forEach((v) => { if (!isNumT(v.t)) throw cErr('CS1503', `${name} fungerar bara på tal. Välj ett tal med en lambda, till exempel ${name}(x => x.Pris).`, line, 'linq'); });
      return vals;
    };
    const empty = () => rErr('InvalidOperationException', `${name}() går inte på en tom samling eftersom den inte innehåller några element.`, line, 'empty-seq');
    switch (name) {
      case 'Where': return seqOf(et, items.filter(pred()));
      case 'Select': {
        const res = items.map(fn(0));
        const rt = res.some((r) => r.t === 'double') && res.every((r) => isNumT(r.t)) ? 'double' : res.length ? res[0].t : '?';
        if (rt === 'void') throw cErr('CS0411', 'Lambdan i Select måste ge ett värde.', line, 'lambda');
        return seqOf(rt, res.map((r) => this.convert(r, rt, line).v));
      }
      case 'OrderBy': case 'OrderByDescending': return this.ordered(et, items, [{ f: fn(0), desc: name.endsWith('Descending') }], line);
      case 'ThenBy': case 'ThenByDescending':
        if (!obj.ord) throw cErr('CS1061', `${name} kan bara komma direkt efter OrderBy eller OrderByDescending.`, line, 'linq');
        return this.ordered(et, obj.ord.src, [...obj.ord.keys, { f: fn(0), desc: name.endsWith('Descending') }], line);
      case 'Sum': {
        const vals = nums();
        const isD = vals.some((v) => v.t === 'double');
        const s = vals.reduce((n, v) => n + numOf(v), 0);
        return V(isD ? 'double' : 'int', isD ? s : s | 0);
      }
      case 'Average': {
        const vals = nums();
        if (!vals.length) throw empty();
        return V('double', vals.reduce((n, v) => n + numOf(v), 0) / vals.length);
      }
      case 'Max': case 'Min': {
        const vals = a.length ? items.map(fn(0)) : items.map(W);
        if (!vals.length) throw empty();
        let best = vals[0];
        for (const v of vals.slice(1)) { const c = this.cmpVals(v, best, line); if (name === 'Max' ? c > 0 : c < 0) best = v; }
        return best;
      }
      case 'Count': return V('int', a.length ? items.filter(pred()).length : items.length);
      case 'Any': return V('bool', a.length ? items.some(pred()) : items.length > 0);
      case 'All': return V('bool', items.every(pred()));
      case 'First': case 'Last': case 'FirstOrDefault': case 'LastOrDefault': {
        const arr = a.length ? items.filter(pred()) : items;
        if (!arr.length) {
          if (name.endsWith('OrDefault')) return V(et, defaultOf(et));
          throw rErr('InvalidOperationException', a.length ? `${name}: inget element uppfyller villkoret. Använd ${name}OrDefault om det kan hända.` : `${name}() går inte på en tom samling.`, line, 'empty-seq');
        }
        return W(name.startsWith('First') ? arr[0] : arr[arr.length - 1]);
      }
      case 'Contains': { const x = this.convert(a[0], et, line).v; return V('bool', items.some((y) => y === x)); }
      case 'Distinct': return seqOf(et, items.filter((x, i) => items.indexOf(x) === i));
      case 'Take': return seqOf(et, items.slice(0, Math.max(0, numOf(a[0]))));
      case 'Skip': return seqOf(et, items.slice(Math.max(0, numOf(a[0]))));
      case 'ToList': return V(`List<${et}>`, items.slice());
      case 'ToArray': return V(`${et}[]`, items.slice());
      case 'Reverse': return seqOf(et, items.slice().reverse());
      case 'Concat': {
        const other = this.seq(a[0]);
        if (!other) throw cErr('CS1503', 'Concat behöver en annan samling.', line, 'arg-type');
        return seqOf(et, items.concat(other.map((x) => this.convert(V(elemOf(a[0].t) || 'char', x), et, line).v)));
      }
      case 'ElementAt': {
        const i = numOf(a[0]);
        if (i < 0 || i >= items.length) throw rErr('ArgumentOutOfRangeException', `Det finns inget element på plats ${i}.`, line, 'index-range');
        return W(items[i]);
      }
      default: return undefined;
    }
  }
  ordered(et, src, keys, line) {
    const rows = src.map((x, i) => ({ x, i, ks: keys.map((k) => k.f(x)) }));
    rows.sort((p, q) => {
      for (let j = 0; j < keys.length; j++) {
        const c = this.cmpVals(p.ks[j], q.ks[j], line);
        if (c) return keys[j].desc ? -c : c;
      }
      return p.i - q.i;
    });
    const v = V(`IEnumerable<${et}>`, rows.map((r) => r.x));
    v.ord = { src, keys };
    return v;
  }
  instanceCall(obj, name, a, line, ctx) {
    const t = obj.t;
    if (obj.v === null && t !== 'null') throw rErr('NullReferenceException', `Värdet är null, så ${name}() kan inte anropas. Har objektet skapats med new?`, line, 'null');
    if (obj.v instanceof CsObject) {
      const o = obj.v;
      const m = this.dispatch(this.classes.get(t) || o.cls, o.cls, name, a, line);
      if (m) {
        if (m.isStatic) throw cErr('CS0176', `${name} är static. Anropa den med ${m.cls.name}.${name}(...).`, line, 'static-member');
        this.checkAccess(m, m.access, ctx, line, 'Metoden');
        return this.invoke(m, a, line, { cls: m.cls, self: o });
      }
      if (name === 'ToString' && !a.length) return V('string', csStr(obj));
      if (name === 'GetType' && !a.length) return V('Type', o.cls);
      if (name === 'Equals' && a.length === 1) return V('bool', o === a[0].v);
      const isData = this.findField(o.cls, name) || this.findProp(o.cls, name);
      throw cErr('CS1061', `${o.cls.name} har ingen metod som heter ${name}.${isData ? ` ${name} är ett fält eller en egenskap, så den används utan parenteser.` : this.guess(o.cls, name)}`, line, 'member');
    }
    if (name === 'ToString') {
      if (a.length && isNumT(t)) return V('string', fmtNumber(obj, a[0].v, line));
      return V('string', csStr(obj));
    }
    if (name === 'Equals') return V('bool', obj.v === a[0].v);
    if (name === 'CompareTo' && a.length === 1) return V('int', this.cmpVals(obj, a[0], line));
    const str = (v) => { if (v.t !== 'string' && v.t !== 'char') throw cErr('CS1503', `${name} behöver text som argument, inte ${svT(v.t)}.`, line, 'arg-type'); return v.v; };
    if (t === 'string') {
      const s = obj.v;
      switch (name) {
        case 'ToUpper': return V('string', s.toUpperCase());
        case 'ToLower': return V('string', s.toLowerCase());
        case 'Trim': return V('string', s.trim());
        case 'TrimStart': return V('string', s.replace(/^\s+/, ''));
        case 'TrimEnd': return V('string', s.replace(/\s+$/, ''));
        case 'Contains': return V('bool', s.includes(str(a[0])));
        case 'StartsWith': return V('bool', s.startsWith(str(a[0])));
        case 'EndsWith': return V('bool', s.endsWith(str(a[0])));
        case 'IndexOf': return V('int', s.indexOf(str(a[0])));
        case 'Replace': return V('string', s.split(str(a[0])).join(str(a[1])));
        case 'Substring': {
          const st = a[0].v, len = a[1] ? a[1].v : s.length - st;
          if (st < 0 || st > s.length || len < 0 || st + len > s.length) throw rErr('ArgumentOutOfRangeException', `Substring(${a.map((x) => x.v).join(', ')}) går utanför texten, som har ${s.length} tecken.`, line, 'index-range');
          return V('string', s.substr(st, len));
        }
        case 'Split': return V('string[]', a.length ? s.split(str(a[0])) : s.split(' '));
        case 'PadLeft': return V('string', s.padStart(a[0].v, a[1] ? a[1].v : ' '));
        case 'PadRight': return V('string', s.padEnd(a[0].v, a[1] ? a[1].v : ' '));
        case 'ToCharArray': return V('char[]', [...s]);
        default: break;
      }
    }
    if (genBase(t) === 'Dictionary') {
      const [kt, vt] = genArgs(t), m = obj.v;
      const key = (x) => this.convert(x, kt, line).v;
      switch (name) {
        case 'Add': {
          this.argCount('Add', a, 2, 2, line);
          const k = key(a[0]);
          if (m.has(k)) throw rErr('ArgumentException', `Nyckeln ${csStr(V(kt, k))} finns redan i ordboken. Skriv ordbok[nyckel] = värde om du vill ändra värdet.`, line, 'dup-key');
          m.set(k, this.convert(a[1], vt, line).v);
          return V('void', null);
        }
        case 'ContainsKey': this.argCount(name, a, 1, 1, line); return V('bool', m.has(key(a[0])));
        case 'ContainsValue': { const x = this.convert(a[0], vt, line).v; return V('bool', [...m.values()].some((y) => y === x)); }
        case 'Remove': this.argCount(name, a, 1, 1, line); return V('bool', m.delete(key(a[0])));
        case 'Clear': m.clear(); return V('void', null);
        case 'GetValueOrDefault': {
          const k = key(a[0]);
          if (m.has(k)) return V(vt, m.get(k));
          return a[1] ? this.convert(a[1], vt, line) : V(vt, defaultOf(vt));
        }
        default: break;
      }
    }
    if (t.startsWith('List<')) {
      const et = elemOf(t);
      const pred = () => (x) => {
        const r = this.callLambda(a[0], [V(et, x)], line);
        if (r.t !== 'bool') throw cErr('CS1662', `Lambdan i ${name} måste ge true eller false.`, line, 'lambda');
        return r.v;
      };
      switch (name) {
        case 'Add': this.argCount('Add', a, 1, 1, line); obj.v.push(this.convert(a[0], et, line).v); return V('void', null);
        case 'AddRange': {
          const items = this.seq(a[0]);
          if (!items) throw cErr('CS1503', 'AddRange behöver en annan samling.', line, 'arg-type');
          obj.v.push(...items.map((x) => this.convert(V(elemOf(a[0].t) || 'char', x), et, line).v));
          return V('void', null);
        }
        case 'Insert': this.argCount('Insert', a, 2, 2, line); if (a[0].v < 0 || a[0].v > obj.v.length) this.checkIndex(obj, a[0].v, line); obj.v.splice(a[0].v, 0, this.convert(a[1], et, line).v); return V('void', null);
        case 'Remove': { const i = obj.v.indexOf(a[0].v); if (i >= 0) obj.v.splice(i, 1); return V('bool', i >= 0); }
        case 'RemoveAt': this.checkIndex(obj, a[0].v, line); obj.v.splice(a[0].v, 1); return V('void', null);
        case 'RemoveAll': {
          const p = pred();
          const keep = obj.v.filter((x) => !p(x));
          const n = obj.v.length - keep.length;
          obj.v.length = 0;
          obj.v.push(...keep);
          return V('int', n);
        }
        case 'Contains': return V('bool', obj.v.includes(a[0].v));
        case 'IndexOf': return V('int', obj.v.indexOf(a[0].v));
        case 'Find': { const p = pred(); const x = obj.v.find((y) => p(y)); return V(et, x === undefined ? defaultOf(et) : x); }
        case 'FindIndex': { const p = pred(); return V('int', obj.v.findIndex((y) => p(y))); }
        case 'FindAll': { const p = pred(); return V(t, obj.v.filter((y) => p(y))); }
        case 'Exists': { const p = pred(); return V('bool', obj.v.some((y) => p(y))); }
        case 'ForEach': obj.v.slice().forEach((x) => this.callLambda(a[0], [V(et, x)], line)); return V('void', null);
        case 'Clear': obj.v.length = 0; return V('void', null);
        case 'Sort': {
          if (a.length) {
            obj.v.sort((x, y) => {
              const r = this.callLambda(a[0], [V(et, x), V(et, y)], line);
              if (r.t !== 'int') throw cErr('CS1662', 'Jämförelsen i Sort måste ge ett heltal: negativt, 0 eller positivt.', line, 'lambda');
              return r.v;
            });
          } else obj.v.sort((x, y) => this.cmpVals(V(et, x), V(et, y), line));
          return V('void', null);
        }
        case 'Reverse': if (!a.length) { obj.v.reverse(); return V('void', null); } break;
        case 'ToArray': return V(et + '[]', obj.v.slice());
        default: break;
      }
    }
    if (t.endsWith('[]') && name === 'Add') throw cErr('CS1061', 'En array har en fast storlek och saknar Add. Använd List<T> om du vill lägga till element.', line, 'array-add');
    if (t.endsWith('[]') && name === 'Contains') return V('bool', obj.v.includes(a[0].v));
    const lq = this.linq(obj, name, a, line);
    if (lq) return lq;
    const ci = ['ToUpper', 'ToLower', 'Trim', 'Contains', 'Replace', 'Substring', 'Add', 'Split', 'StartsWith', 'EndsWith', 'Where', 'Select', 'OrderBy', 'Sum', 'Count', 'ToList', 'ContainsKey'].find((k) => k.toLowerCase() === name.toLowerCase());
    throw cErr('CS1061', `${svT(t)} har ingen metod som heter ${name}.${ci ? ` Menade du ${ci}?` : ''}`, line, ci ? 'member-case' : 'member');
  }

  bindParams(m, args, line, ctx, parent = null) {
    const scope = new Scope(parent, true, ctx);
    m.params.forEach((p, i) => {
      const v = i < args.length ? args[i] : this.eval(p.def, scope);
      scope.vars.set(p.name, { type: p.type, value: this.convert(v, p.type, line ?? m.line).v, assigned: true });
    });
    return scope;
  }
  invoke(m, args, line, ctx = null) {
    const min = m.params.filter((p) => !p.def).length;
    if (args.length < min || args.length > m.params.length) {
      throw cErr('CS1501', `${m.name} tar ${m.params.length} argument men fick ${args.length}.`, line ?? m.line, 'arg-count');
    }
    if (!m.body) throw cErr('CS0205', `${m.name} är abstract och har ingen kod att köra.`, line ?? m.line, 'abstract-body');
    if (++this.depth > 300) throw rErr('StackOverflowException', 'Metoden anropar sig själv för många gånger.', line, 'recursion');
    try {
      const scope = this.bindParams(m, args, line, ctx || (m.cls ? { cls: m.cls, self: null } : null), m.captures ? this.globalScope : null);
      return this.runBody(m, scope);
    } finally { this.depth--; }
  }
  runBody(m, scope) {
    try {
      for (const st of m.body) this.exec(st, scope);
      if (m.ret !== 'void') throw cErr('CS0161', `${m.name} måste returnera ett värde av typen ${svT(m.ret)} på alla vägar. Lägg till en return-sats.`, m.line, 'missing-return');
      return V('void', null);
    } catch (e) {
      if (e instanceof ReturnSig) {
        if (m.ret === 'void') {
          if (e.v) throw cErr('CS0127', `${m.name} är void och kan inte returnera ett värde.`, m.line, 'void-return');
          return V('void', null);
        }
        if (!e.v) throw cErr('CS0126', `${m.name} behöver returnera ett värde.`, m.line, 'missing-return');
        return this.convert(e.v, m.ret, m.line);
      }
      throw e;
    }
  }
}
const numOf = (v) => (v.t === 'char' ? v.v.charCodeAt(0) : v.v);

export function parseCSharp(code) {
  return new Parser(tokenize(code.replace(/\r\n?/g, '\n'))).program();
}

function fromJS(x, type) {
  if (genBase(type) === 'Dictionary') {
    const [kt, vt] = genArgs(type);
    return V(type, new Map(Object.entries(x || {}).map(([k, y]) => [fromJS(kt === 'int' ? +k : k, kt).v, fromJS(y, vt).v])));
  }
  const et = elemOf(type);
  if (et) return V(type, x.map((y) => fromJS(y, et).v));
  if (type === 'double') return V('double', +x);
  if (type === 'int') return V('int', x | 0);
  if (type === 'char') return V('char', String(x));
  if (type === 'bool') return V('bool', !!x);
  if (type === 'string') return V('string', x === null ? null : String(x));
  return V(typeof x === 'number' ? (Number.isInteger(x) ? 'int' : 'double') : typeof x === 'boolean' ? 'bool' : 'string', x);
}
function toJS(val) {
  if (val.v instanceof CsObject) return csStr(val);
  if (val.v === null) return null;
  if (genBase(val.t) === 'Dictionary') {
    const vt = genArgs(val.t)[1];
    const o = {};
    for (const [k, x] of val.v) o[String(k)] = toJS(V(vt, x));
    return o;
  }
  const et = elemOf(val.t);
  if (et) return val.v.map((x) => toJS(V(et, x)));
  return val.v;
}

export function runCSharp(code, { calls = [], maxSteps } = {}) {
  const res = { output: '', error: null, calls: [] };
  let interp;
  try {
    const prog = parseCSharp(code);
    interp = new Interp(prog, { maxSteps });
    interp.run();
  } catch (e) {
    res.error = asError(e);
    // ett kompileringsfel betyder att programmet aldrig hade körts
    res.output = interp && res.error.phase !== 'compile' ? interp.out.join('') : '';
    return res;
  }
  res.output = interp.out.join('');
  for (const c of calls) {
    const before = interp.out.length;
    const r = { value: undefined, error: null, output: '', repr: '' };
    try {
      interp.steps = 0;
      interp.depth = 0;
      const m = interp.prog.methods.get(c.fn);
      if (!m) throw cErr('CS0103', `Metoden ${c.fn} finns inte. Kontrollera att den är definierad och att namnet är rätt stavat (stora och små bokstäver spelar roll).`, null, 'missing-function');
      if (m.params.length !== c.args.length) throw cErr('CS1501', `${c.fn} ska ta ${c.args.length} parametrar men har ${m.params.length}.`, m.line, 'arg-count');
      const v = interp.invoke(m, c.args.map((x, i) => fromJS(x, m.params[i].type)), null);
      r.value = toJS(v);
      r.repr = csStr(v);
      r.isFloat = v.t === 'double';
      r.type = v.t;
    } catch (e) { r.error = asError(e); }
    r.output = interp.out.slice(before).join('');
    res.calls.push(r);
  }
  return res;
}

function asError(e) {
  if (e instanceof CsThrow) {
    const o = e.val.v;
    return { kind: o.cls.name, message: o.fields.get('Message').value, line: o.throwLine ?? e.line ?? null, hint: o.hint || 'thrown', phase: 'runtime' };
  }
  if (e instanceof CodeError) return e.toJSON();
  if (e instanceof ReturnSig) return { kind: 'CS0127', message: 'return används på fel ställe.', line: null, hint: 'syntax', phase: 'compile' };
  if (e instanceof BreakSig || e instanceof ContinueSig) return { kind: 'CS0139', message: 'break/continue kan bara användas i en loop eller switch.', line: null, hint: 'syntax', phase: 'compile' };
  if (e instanceof RangeError) return { kind: 'StackOverflowException', message: 'Programmet gick för djupt i metodanrop.', line: null, hint: 'recursion', phase: 'runtime' };
  return { kind: 'Internt fel', message: String(e && e.message || e), line: null, hint: 'internal', phase: 'runtime' };
}
