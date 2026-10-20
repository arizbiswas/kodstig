// En avgränsad C#-tolk för Kodstigs övningar.
// Stöder toppnivåsatser, klass Program med Main, statiska metoder, int/double/
// string/char/bool, var, arrayer, List<T>, villkor, loopar, stränginterpolering
// och de vanligaste metoderna i Console, Math och string. Typfel och namnfel
// rapporteras som kompileringsfel. Ingen JavaScript-eval används.
import { CodeError, StepLimit, MAX_STEPS, MAX_OUTPUT } from './errors.js';

const TYPE_KW = new Set(['int', 'double', 'string', 'bool', 'char', 'var', 'decimal', 'float', 'long', 'void', 'object']);
const KW = new Set([...TYPE_KW, 'if', 'else', 'while', 'for', 'foreach', 'in', 'do', 'return', 'break', 'continue', 'new',
  'true', 'false', 'null', 'static', 'public', 'private', 'class', 'using', 'namespace', 'const', 'internal', 'switch', 'case', 'default']);
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

// ---------- Parser ----------
class Parser {
  constructor(toks) { this.toks = toks; this.p = 0; }
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
    const prog = { methods: new Map(), body: [], classMain: null };
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
      if (this.isMethodStart()) { this.methodDecl(prog, true); continue; }
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
    while (['public', 'internal', 'static', 'private'].some((m) => this.isKw(m, k))) k++;
    return this.isKw('class', k);
  }
  classDecl(prog) {
    while (!this.isKw('class')) this.next();
    this.next(); this.id();
    this.expectOp('{', 'CS1514', '{ förväntades efter klassens namn.', 'braces');
    while (!this.isOp('}')) {
      if (this.cur.t === 'EOF') throw cErr('CS1513', 'Det saknas en avslutande klammer } för klassen.', this.prevLine(), 'braces');
      if (this.isMethodStart()) { this.methodDecl(prog, false); continue; }
      throw cErr('CS1519', 'Inuti klassen förväntades en metod, till exempel static void Main().', this.cur.line, 'class-member');
    }
    this.next();
  }
  isMethodStart() {
    let k = 0;
    let hasStatic = false;
    while (['public', 'private', 'static', 'internal'].some((m) => this.isKw(m, k))) { if (this.isKw('static', k)) hasStatic = true; k++; }
    const save = this.p;
    this.p += k;
    let ok = false;
    try {
      if (this.isTypeAhead()) { this.type(); ok = this.cur.t === 'ID' && this.isOp('(', 1); }
    } catch { ok = false; }
    this.p = save;
    return ok || (hasStatic && false);
  }
  isTypeAhead() {
    const t = this.cur;
    if (t.t === 'KW' && TYPE_KW.has(t.v)) return true;
    if (t.t === 'ID' && t.v === 'List' && this.isOp('<', 1)) return true;
    if (t.t === 'ID' && (t.v === 'String' || t.v === 'Int32' || t.v === 'Boolean' || t.v === 'Double') && !this.isOp('.', 1)) return true;
    return false;
  }
  type() {
    const t = this.next();
    let name;
    if (t.t === 'ID' && t.v === 'List') {
      this.expectOp('<', 'CS1003', '< förväntades.');
      const inner = this.type();
      this.expectOp('>', 'CS1003', '> förväntades efter typen i List<...>.');
      name = `List<${inner}>`;
    } else name = normType(t.v);
    while (this.isOp('[') && this.isOp(']', 1)) { this.next(); this.next(); name += '[]'; }
    return name;
  }
  methodDecl(prog, topLevel) {
    const line = this.cur.line;
    let isStatic = false;
    while (['public', 'private', 'static', 'internal'].some((m) => this.isKw(m))) { if (this.next().v === 'static') isStatic = true; }
    const ret = this.type();
    const name = this.id();
    this.expectOp('(', 'CS1003', '( förväntades.');
    const params = [];
    while (!this.isOp(')')) {
      if (!this.isTypeAhead()) throw cErr('CS1001', 'Varje parameter behöver en typ och ett namn, till exempel int tal.', this.cur.line, 'param-type');
      const pt = this.type();
      const pn = this.id('Parametern behöver ett namn.');
      params.push({ type: pt, name: pn });
      if (!this.isOp(',')) break;
      this.next();
    }
    this.expectOp(')', 'CS1026', ') förväntades.', 'parens');
    let body;
    if (this.isOp('=>')) { this.next(); const e = this.expr(); this.semi(); body = [ret === 'void' ? { k: 'Expr', e, line } : { k: 'Return', e, line }]; }
    else body = this.blockBody();
    if (prog.methods.has(name)) throw cErr('CS0111', `Det finns redan en metod som heter ${name}.`, line, 'duplicate-method');
    const m = { name, ret, params, body, line, captures: topLevel && !isStatic };
    prog.methods.set(name, m);
    if (!topLevel && name === 'Main') prog.classMain = m;
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
        case 'switch': throw cErr('Stöds inte', 'switch stöds inte i övningsmotorn ännu. Använd if och else if.', line, 'unsupported');
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
    if (!['Assign', 'Call', 'IncDec', 'New'].includes(e.k)) {
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
    const left = this.ternary();
    if (this.cur.t === 'OP' && ['=', '+=', '-=', '*=', '/=', '%='].includes(this.cur.v)) {
      const op = this.next().v;
      if (!['Name', 'Index', 'Member'].includes(left.k)) throw cErr('CS0131', 'Vänstersidan av en tilldelning måste vara en variabel.', left.line, 'bad-assign');
      const right = this.isOp('{') ? this.arrayInit(null) : this.assignment();
      return { k: 'Assign', op, target: left, value: right, line: left.line };
    }
    return left;
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
  rel() { return this.bin(['<', '>', '<=', '>='], () => this.add()); }
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
        const line = this.next().line;
        const args = [];
        while (!this.isOp(')')) {
          if (this.cur.t === 'EOF' || this.isOp(';')) throw cErr('CS1026', 'Det saknas en avslutande parentes ).', this.prevLine(), 'parens');
          args.push(this.expr());
          if (!this.isOp(',')) break;
          this.next();
        }
        this.expectOp(')', 'CS1026', 'Det saknas en avslutande parentes ) eller ett komma mellan argumenten.', 'parens');
        e = { k: 'Call', fn: e, args, line };
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
    let base;
    if (t.t === 'ID' && t.v === 'List') {
      base = this.type();
      if (this.isOp('(')) { this.next(); this.expectOp(')', 'CS1026', ') förväntades.', 'parens'); }
      let items = [];
      if (this.isOp('{')) items = this.arrayInit(null).items;
      return { k: 'New', type: base, items, line };
    }
    if (t.t === 'KW' && TYPE_KW.has(t.v)) {
      this.next();
      base = normType(t.v);
      this.expectOp('[', 'CS1526', 'Efter new int förväntades [storlek].');
      if (this.isOp(']')) { this.next(); return { ...this.arrayInit(base), line }; }
      const size = this.expr();
      this.expectOp(']', 'CS1003', '] förväntades.');
      if (this.isOp('{')) { const lit = this.arrayInit(base); return { ...lit, size, line }; }
      return { k: 'NewArray', elem: base, size, line };
    }
    throw cErr('CS1526', 'Kodstigs motor kan skapa arrayer och List<T> med new.', line, 'unsupported');
  }
}
function normType(t) {
  const alias = { float: 'double', decimal: 'double', Double: 'double', long: 'int', Int32: 'int', String: 'string', Boolean: 'bool' };
  return alias[t] || t;
}
function exprName(e) { return e.k === 'Name' ? e.name : e.k === 'Member' ? `${exprName(e.obj)}.${e.name}` : '?'; }

// ---------- Värden ----------
// Ett värde är { t: typ, v: rådata }. Arrayer och listor har v = JS-array av rådata.
const V = (t, v) => ({ t, v });
const isNumT = (t) => t === 'int' || t === 'double' || t === 'char';
const elemOf = (t) => (t.endsWith('[]') ? t.slice(0, -2) : t.startsWith('List<') ? t.slice(5, -1) : null);
const SV = { int: 'int (heltal)', double: 'double (decimaltal)', string: 'string (text)', bool: 'bool (sant/falskt)', char: 'char (tecken)', null: 'null' };
const svT = (t) => SV[t] || t;
const CLR = { int: 'System.Int32', double: 'System.Double', string: 'System.String', bool: 'System.Boolean', char: 'System.Char' };

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
  if (t === 'bool') return v ? 'True' : 'False';
  if (t === 'double') return fmtDouble(v);
  if (t === 'int' || t === 'string' || t === 'char') return String(v);
  if (t.endsWith('[]')) return `${CLR[elemOf(t)] || elemOf(t)}[]`;
  if (t.startsWith('List<')) return `System.Collections.Generic.List\`1[${CLR[elemOf(t)] || elemOf(t)}]`;
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

class BreakSig {}
class ContinueSig {}
class ReturnSig { constructor(v) { this.v = v; } }

class Scope {
  constructor(parent, fnRoot = false) { this.parent = parent; this.vars = new Map(); this.fnRoot = fnRoot; }
  find(name) {
    for (let s = this; s; s = s.parent) if (s.vars.has(name)) return s.vars.get(name);
    return null;
  }
  findInFn(name) {
    for (let s = this; s; s = s.parent) { if (s.vars.has(name)) return s.vars.get(name); if (s.fnRoot) break; }
    return null;
  }
}

class Interp {
  constructor(prog, opts = {}) {
    this.prog = prog;
    this.out = [];
    this.outLen = 0;
    this.steps = 0;
    this.maxSteps = opts.maxSteps || MAX_STEPS;
    this.depth = 0;
    this.globalScope = new Scope(null, true);
  }
  step(line) { if (++this.steps > this.maxSteps) throw new StepLimit(line); }
  write(s) {
    this.outLen += s.length;
    if (this.outLen > MAX_OUTPUT) throw rErr('Utskriftsgräns', 'Programmet skrev ut väldigt mycket text. Kanske en loop som aldrig slutar?', null, 'infinite-loop');
    this.out.push(s);
  }
  run() {
    if (this.prog.body.length) this.execBlock(this.prog.body, this.globalScope, false);
    else if (this.prog.classMain) this.invoke(this.prog.classMain, [], null);
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
        else if ((et = elemOf(coll.t))) items = coll.v.slice();
        else throw cErr('CS1579', `foreach kan inte gå igenom ${svT(coll.t)}.`, s.line, 'not-iterable');
        const vt = s.vt === 'var' ? et : s.vt;
        for (const it of items) {
          this.step(s.line);
          const ls = new Scope(scope);
          this.declare(ls, s.name, vt, this.convert(V(et, it), vt, s.line).v, s.line);
          try { this.exec(s.body, ls); } catch (e) { if (e instanceof BreakSig) break; if (e instanceof ContinueSig) continue; throw e; }
        }
        return;
      }
      case 'Return': throw new ReturnSig(s.e ? this.eval(s.e, scope) : null);
      case 'Break': throw new BreakSig();
      case 'Continue': throw new ContinueSig();
      default: throw rErr('Internt fel', 'Okänd sats.', s.line);
    }
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
    if (from === 'null') {
      if (['int', 'double', 'bool', 'char'].includes(to)) throw cErr('CS0037', `null kan inte sparas i en ${svT(to)}.`, line, 'type-convert');
      return V(to, null);
    }
    if (to === 'double' && (from === 'int' || from === 'char')) return V('double', from === 'char' ? from.charCodeAt(0) : val.v);
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
    if (elemOf(to) && elemOf(from) && to.endsWith('[]') === from.endsWith('[]')) {
      const te = elemOf(to), fe = elemOf(from);
      if (te === 'double' && fe === 'int') return V(to, val.v.slice());
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
      else if (name === 'String' || name === 'Int') tip = '';
      throw cErr('CS0103', `Namnet '${name}' finns inte här. Har variabeln deklarerats (till exempel int ${name} = 0;) innan den används, och är den stavad likadant?${tip}`, line, 'name');
    }
    return ref;
  }

  eval(e, scope) {
    switch (e.k) {
      case 'Lit': return V(e.t, e.v);
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
        const ref = this.lookupVar(e.name, scope, e.line);
        if (!ref.assigned) throw cErr('CS0165', `Variabeln ${e.name} används innan den har fått ett värde. Ge den ett startvärde, till exempel = 0.`, e.line, 'unassigned');
        return V(ref.type, ref.value);
      }
      case 'ArrayLit': return this.evalArrayLit(e, e.elem, scope);
      case 'NewArray': {
        const sz = this.convert(this.eval(e.size, scope), 'int', e.line).v;
        if (sz < 0) throw rErr('OverflowException', 'En array kan inte ha negativ storlek.', e.line, 'array-size');
        if (sz > 1000000) throw rErr('OutOfMemoryException', 'Arrayen är för stor för övningsmotorn.', e.line);
        return V(e.elem + '[]', Array.from({ length: sz }, () => defaultOf(e.elem)));
      }
      case 'New': {
        const et = elemOf(e.type);
        return V(e.type, e.items.map((x) => this.convert(this.eval(x, scope), et, e.line).v));
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
        if (idx.t !== 'int') throw cErr('CS0029', `Ett index måste vara ett heltal (int), inte ${svT(idx.t)}.`, e.line, 'index-type');
        if (obj.t === 'string') {
          if (idx.v < 0 || idx.v >= obj.v.length) throw rErr('IndexOutOfRangeException', `Index ${idx.v} finns inte i texten, som har ${obj.v.length} tecken (index 0 till ${obj.v.length - 1}).`, e.line, 'index-range');
          return V('char', obj.v[idx.v]);
        }
        const et = elemOf(obj.t);
        if (!et) throw cErr('CS0021', `${svT(obj.t)} kan inte indexeras med [].`, e.line, 'type');
        if (obj.v === null) throw rErr('NullReferenceException', 'Arrayen är null.', e.line, 'null');
        this.checkIndex(obj, idx.v, e.line);
        return V(et, obj.v[idx.v]);
      }
      case 'Member': return this.member(e, scope);
      case 'Call': return this.call(e, scope);
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
      const ref = this.lookupVar(target.name, scope, line);
      if (ref.isConst) throw cErr('CS0131', `${target.name} är en konstant och kan inte ändras.`, line, 'const');
      ref.value = this.convert(val, ref.type, line).v;
      ref.assigned = true;
      return;
    }
    if (target.k === 'Index') {
      const obj = this.eval(target.obj, scope);
      const idx = this.eval(target.index, scope);
      if (obj.t === 'string') throw cErr('CS0200', 'Text (string) kan inte ändras tecken för tecken. Skapa en ny text i stället.', line, 'str-immutable');
      const et = elemOf(obj.t);
      if (!et) throw cErr('CS0021', `${svT(obj.t)} kan inte indexeras med [].`, line, 'type');
      if (idx.t !== 'int') throw cErr('CS0029', 'Ett index måste vara ett heltal (int).', line, 'index-type');
      this.checkIndex(obj, idx.v, line);
      obj.v[idx.v] = this.convert(val, et, line).v;
      return;
    }
    throw cErr('CS0200', 'Det här kan inte tilldelas ett nytt värde.', line, 'bad-assign');
  }
  assign(e, scope) {
    let val = e.value.k === 'ArrayLit' && !e.value.elem
      ? this.evalArrayLit(e.value, e.target.k === 'Name' ? elemOf(this.lookupVar(e.target.name, scope, e.line).type) : null, scope)
      : this.eval(e.value, scope);
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
      else if (l.t === r.t || l.t === 'null' || r.t === 'null') eq = l.v === r.v;
      else throw cErr('CS0019', `Det går inte att jämföra ${svT(l.t)} med ${svT(r.t)} med ${op}.`, e.line, 'op-type');
      return V('bool', op === '==' ? eq : !eq);
    }
    if (['<', '>', '<=', '>='].includes(op)) {
      if (!(isNumT(l.t) && isNumT(r.t))) {
        const tip = l.t === 'string' || r.t === 'string' ? ' Text jämförs inte med < och >. Jämför ett tal, till exempel text.Length.' : '';
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
    // statiska egenskaper
    if (e.obj.k === 'Name' && !scope.find(e.obj.name)) {
      const full = `${e.obj.name}.${e.name}`;
      if (full === 'Math.PI') return V('double', Math.PI);
      if (full === 'int.MaxValue') return V('int', 2147483647);
      if (full === 'int.MinValue') return V('int', -2147483648);
      if (full === 'string.Empty' || full === 'String.Empty') return V('string', '');
      throw this.unknownStatic(e.obj.name, e.name, e.line);
    }
    const obj = this.eval(e.obj, scope);
    if (obj.v === null && obj.t !== 'null') throw rErr('NullReferenceException', 'Värdet är null, så det har inga egenskaper.', e.line, 'null');
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
    const args = () => e.args.map((a) => this.eval(a, scope));
    const fn = e.fn;
    if (fn.k === 'Name') {
      const m = this.prog.methods.get(fn.name);
      if (!m) {
        const ci = [...this.prog.methods.keys()].find((k) => k.toLowerCase() === fn.name.toLowerCase());
        throw cErr('CS0103', `Metoden ${fn.name} finns inte.${ci ? ` Menade du ${ci}?` : ''}`, e.line, 'name');
      }
      return this.invoke(m, args(), e.line, scope);
    }
    if (fn.k !== 'Member') throw cErr('CS0149', 'Det här går inte att anropa.', e.line);
    if (fn.obj.k === 'Name' && !scope.find(fn.obj.name)) return this.staticCall(fn.obj.name, fn.name, args(), e.line);
    const obj = this.eval(fn.obj, scope);
    return this.instanceCall(obj, fn.name, args(), e.line);
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
        } else if (a.length === 1) s = csStr(a[0]);
        else if (a.length > 1) throw cErr('CS1501', `${name} tar ett värde. Slå ihop delarna med + eller $"..."`, line, 'arg-count');
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
        let r = Math.abs(diff - 0.5) < 1e-9 ? (f % 2 === 0 ? f : f + 1) : Math.round(y);
        return V(a[0].t === 'int' && !a[1] ? 'double' : 'double', r / m);
      }
      case 'int.Parse': case 'Convert.ToInt32': {
        this.argCount(full, a, 1, 1, line);
        if (a[0].t === 'double') return V('int', Math.round(a[0].v));
        if (a[0].t !== 'string') return V('int', numOf(a[0]));
        const s = a[0].v.trim();
        if (!/^[+-]?\d+$/.test(s)) throw rErr('FormatException', `Texten "${a[0].v}" kan inte tolkas som ett heltal.`, line, 'parse');
        return V('int', parseInt(s, 10));
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
        return V('string', a[1].v.map((x) => csStr(V(et, x))).join(csStr(a[0])));
      }
      case 'string.IsNullOrEmpty': return V('bool', a[0].v === null || a[0].v === '');
      case 'string.IsNullOrWhiteSpace': return V('bool', a[0].v === null || !String(a[0].v).trim());
      case 'char.IsDigit': return V('bool', /^\d$/.test(a[0].v));
      case 'char.IsLetter': return V('bool', /^\p{L}$/u.test(a[0].v));
      case 'char.ToUpper': return V('char', a[0].v.toUpperCase());
      case 'Array.Sort': {
        const et = elemOf(a[0].t);
        a[0].v.sort((x, y) => (et === 'string' ? (x < y ? -1 : x > y ? 1 : 0) : x - y));
        return V('void', null);
      }
      case 'Array.Reverse': a[0].v.reverse(); return V('void', null);
      default: break;
    }
    throw this.unknownStatic(cls, name, line);
  }
  instanceCall(obj, name, a, line) {
    const t = obj.t;
    if (obj.v === null && t !== 'null') throw rErr('NullReferenceException', 'Värdet är null, så metoden kan inte anropas.', line, 'null');
    if (name === 'ToString') {
      if (a.length && isNumT(t)) return V('string', fmtNumber(obj, a[0].v, line));
      return V('string', csStr(obj));
    }
    if (name === 'Equals') return V('bool', obj.v === a[0].v);
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
        default: break;
      }
    }
    if (t.startsWith('List<')) {
      const et = elemOf(t);
      switch (name) {
        case 'Add': this.argCount('Add', a, 1, 1, line); obj.v.push(this.convert(a[0], et, line).v); return V('void', null);
        case 'Insert': this.argCount('Insert', a, 2, 2, line); if (a[0].v < 0 || a[0].v > obj.v.length) this.checkIndex(obj, a[0].v, line); obj.v.splice(a[0].v, 0, this.convert(a[1], et, line).v); return V('void', null);
        case 'Remove': { const i = obj.v.indexOf(a[0].v); if (i >= 0) obj.v.splice(i, 1); return V('bool', i >= 0); }
        case 'RemoveAt': this.checkIndex(obj, a[0].v, line); obj.v.splice(a[0].v, 1); return V('void', null);
        case 'Contains': return V('bool', obj.v.includes(a[0].v));
        case 'IndexOf': return V('int', obj.v.indexOf(a[0].v));
        case 'Clear': obj.v.length = 0; return V('void', null);
        case 'Sort': obj.v.sort((x, y) => (et === 'string' ? (x < y ? -1 : x > y ? 1 : 0) : x - y)); return V('void', null);
        case 'Reverse': obj.v.reverse(); return V('void', null);
        case 'ToArray': return V(et + '[]', obj.v.slice());
        default: break;
      }
    }
    if (t.endsWith('[]') || t.startsWith('List<')) {
      const et = elemOf(t);
      if (['Sum', 'Max', 'Min', 'Average'].includes(name)) {
        throw cErr('CS1061', `${name}() kräver LINQ, som Kodstigs motor inte har. Räkna fram värdet med en loop i stället.`, line, 'linq');
      }
      if (name === 'Contains' && t.endsWith('[]')) return V('bool', obj.v.includes(a[0].v));
      void et;
    }
    if (t.endsWith('[]') && name === 'Add') throw cErr('CS1061', 'En array har en fast storlek och saknar Add. Använd List<T> om du vill lägga till element.', line, 'array-add');
    const ci = ['ToUpper', 'ToLower', 'Trim', 'Contains', 'Replace', 'Substring', 'Add', 'Split', 'StartsWith', 'EndsWith'].find((k) => k.toLowerCase() === name.toLowerCase());
    throw cErr('CS1061', `${svT(t)} har ingen metod som heter ${name}.${ci ? ` Menade du ${ci}?` : ''}`, line, ci ? 'member-case' : 'member');
  }

  invoke(m, args, line, callerScope) {
    if (args.length !== m.params.length) {
      throw cErr('CS1501', `${m.name} tar ${m.params.length} argument men fick ${args.length}.`, line ?? m.line, 'arg-count');
    }
    if (++this.depth > 300) throw rErr('StackOverflowException', 'Metoden anropar sig själv för många gånger.', line, 'recursion');
    const parent = m.captures ? this.globalScope : null;
    const scope = new Scope(parent, true);
    m.params.forEach((p, i) => scope.vars.set(p.name, { type: p.type, value: this.convert(args[i], p.type, line ?? m.line).v, assigned: true }));
    void callerScope;
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
    } finally { this.depth--; }
  }
}
const numOf = (v) => (v.t === 'char' ? v.v.charCodeAt(0) : v.v);

export function parseCSharp(code) {
  return new Parser(tokenize(code.replace(/\r\n?/g, '\n'))).program();
}

function fromJS(x, type) {
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
  if (elemOf(val.t)) return val.v.slice();
  return val.v;
}

export function runCSharp(code, { calls = [], maxSteps } = {}) {
  const res = { output: '', error: null, calls: [] };
  let interp;
  try {
    const prog = parseCSharp(code);
    if (!prog.body.length && !prog.classMain && !calls.length && !prog.methods.size) {
      // tomt program
    }
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
  if (e instanceof CodeError) return e.toJSON();
  if (e instanceof ReturnSig) return { kind: 'CS0127', message: 'return används på fel ställe.', line: null, hint: 'syntax', phase: 'compile' };
  if (e instanceof BreakSig || e instanceof ContinueSig) return { kind: 'CS0139', message: 'break/continue kan bara användas i en loop.', line: null, hint: 'syntax', phase: 'compile' };
  if (e instanceof RangeError) return { kind: 'StackOverflowException', message: 'Programmet gick för djupt i metodanrop.', line: null, hint: 'recursion', phase: 'runtime' };
  return { kind: 'Internt fel', message: String(e && e.message || e), line: null, hint: 'internal', phase: 'runtime' };
}
