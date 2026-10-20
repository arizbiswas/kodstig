// En avgränsad Python-tolk för Kodstigs övningar.
// Stöder variabler, tal, text, f-strängar, villkor, loopar, listor, tupler,
// ordböcker, funktioner och vanliga inbyggda funktioner. Den kör aldrig
// JavaScript-eval: koden tolkas steg för steg med en stegbudget.
import { CodeError, StepLimit, MAX_STEPS, MAX_OUTPUT } from './errors.js';

const KEYWORDS = new Set(['if', 'elif', 'else', 'while', 'for', 'in', 'def', 'return', 'pass', 'break', 'continue',
  'and', 'or', 'not', 'True', 'False', 'None', 'is', 'global', 'lambda', 'import', 'from', 'class', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'async', 'await', 'del', 'as']);
const OPS = ['**=', '//=', '**', '//', '==', '!=', '<=', '>=', '+=', '-=', '*=', '/=', '%=', '->',
  '+', '-', '*', '/', '%', '<', '>', '=', '|', '&', '(', ')', '[', ']', '{', '}', ',', ':', '.', ';'];

const syntax = (msg, line, hint = 'syntax') => new CodeError('SyntaxError', msg, line, hint, 'compile');

// ---------- Tokenizer ----------
function tokenize(src) {
  const toks = [];
  const indents = [0];
  let i = 0, line = 1, depth = 0, atLineStart = true;
  const n = src.length;
  const push = (t, v, l = line) => toks.push({ t, v, line: l });
  while (i < n) {
    if (atLineStart && depth === 0) {
      let col = 0, j = i;
      while (j < n && (src[j] === ' ' || src[j] === '\t')) { col += src[j] === '\t' ? 4 : 1; j++; }
      if (j >= n || src[j] === '\n' || src[j] === '\r' || src[j] === '#') {
        // tom rad eller kommentar: påverkar inte indragning
        while (j < n && src[j] !== '\n') j++;
        if (j < n) { j++; line++; }
        i = j;
        continue;
      }
      const top = indents[indents.length - 1];
      if (col > top) { indents.push(col); push('INDENT', col); }
      else if (col < top) {
        while (indents.length && col < indents[indents.length - 1]) { indents.pop(); push('DEDENT', col); }
        if (indents[indents.length - 1] !== col) {
          throw new CodeError('IndentationError', 'Indragningen matchar ingen tidigare nivå. Kontrollera att raderna i samma block har lika många mellanslag.', line, 'indent', 'compile');
        }
      }
      i = j;
      atLineStart = false;
      continue;
    }
    const c = src[i];
    if (c === '\n') {
      // Inuti parenteser fortsätter uttrycket på nästa rad, så där finns ingen ny rad eller indragning.
      if (depth === 0) push('NEWLINE', null);
      line++; i++; atLineStart = depth === 0; continue;
    }
    if (c === ' ' || c === '\t' || c === '\r') { i++; continue; }
    if (c === '\\' && src[i + 1] === '\n') { i += 2; line++; continue; }
    if (c === '#') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '“' || c === '”' || c === '‘' || c === '’') {
      throw syntax('Det här citattecknet är ett ”snyggt” typografiskt tecken. Skriv om det med vanliga " eller \'.', line, 'smart-quotes');
    }
    // strängar (med valfritt f-prefix)
    let isF = false;
    if ((c === 'f' || c === 'F') && (src[i + 1] === '"' || src[i + 1] === "'")) { isF = true; i++; }
    const q = src[i];
    if (q === '"' || q === "'") {
      const triple = src.substr(i, 3) === q.repeat(3);
      const startLine = line;
      i += triple ? 3 : 1;
      let s = '';
      for (;;) {
        if (i >= n || (!triple && src[i] === '\n')) {
          throw syntax('Texten saknar ett avslutande citattecken.', startLine, 'unclosed-string');
        }
        if (triple ? src.substr(i, 3) === q.repeat(3) : src[i] === q) { i += triple ? 3 : 1; break; }
        if (src[i] === '\\' && i + 1 < n) {
          const e = src[i + 1];
          const map = { n: '\n', t: '\t', '\\': '\\', "'": "'", '"': '"' };
          if (isF && (e === '{' || e === '}')) s += '\\' + e; else s += map[e] ?? '\\' + e;
          i += 2; continue;
        }
        if (src[i] === '\n') line++;
        s += src[i++];
      }
      push(isF ? 'FSTR' : 'STR', s, startLine);
      continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) {
      let j = i; let isFloat = false;
      while (j < n && /[0-9_]/.test(src[j])) j++;
      if (src[j] === '.' && /[0-9]/.test(src[j + 1] || '')) { isFloat = true; j++; while (j < n && /[0-9_]/.test(src[j])) j++; }
      else if (src[j] === '.' ) { isFloat = true; j++; }
      if ((src[j] === 'e' || src[j] === 'E') && /[0-9+-]/.test(src[j + 1] || '')) { isFloat = true; j += 2; while (j < n && /[0-9]/.test(src[j])) j++; }
      const raw = src.slice(i, j).replace(/_/g, '');
      push('NUM', isFloat ? new PyFloat(parseFloat(raw)) : parseInt(raw, 10));
      i = j; continue;
    }
    if (/[A-Za-z_À-ɏ]/.test(c)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_À-ɏ]/.test(src[j])) j++;
      const w = src.slice(i, j);
      push(KEYWORDS.has(w) ? 'KW' : 'NAME', w);
      i = j; continue;
    }
    const op = OPS.find((o) => src.startsWith(o, i));
    if (op) {
      if ('([{'.includes(op)) depth++;
      if (')]}'.includes(op)) {
        depth--;
        if (depth < 0) throw syntax(`Det finns ett ${op} för mycket, eller så saknas motsvarande startparentes.`, line, 'parens');
      }
      push('OP', op); i += op.length; continue;
    }
    throw syntax(`Tecknet ${JSON.stringify(c)} känns inte igen här.`, line, 'bad-char');
  }
  if (depth > 0) throw syntax('En parentes eller hakparentes är aldrig stängd.', line, 'parens');
  push('NEWLINE', null);
  while (indents.length > 1) { indents.pop(); push('DEDENT', 0); }
  push('EOF', null);
  return toks;
}

// ---------- Parser ----------
class Parser {
  constructor(toks) { this.toks = toks; this.p = 0; this.inFunc = 0; this.inLoop = 0; }
  get cur() { return this.toks[this.p]; }
  peek(k = 1) { return this.toks[this.p + k]; }
  is(t, v) { const c = this.cur; return c.t === t && (v === undefined || c.v === v); }
  isOp(v) { return this.is('OP', v); }
  isKw(v) { return this.is('KW', v); }
  next() { return this.toks[this.p++]; }
  expectOp(v, msg, hint) {
    if (!this.isOp(v)) throw syntax(msg || `Här förväntades ${v}.`, this.cur.line, hint);
    return this.next();
  }
  program() {
    const body = [];
    while (!this.is('EOF')) {
      if (this.is('NEWLINE')) { this.next(); continue; }
      body.push(...this.statement());
    }
    return body;
  }
  block() {
    this.expectOp(':', 'Det saknas ett kolon (:) i slutet av raden.', 'missing-colon');
    if (!this.is('NEWLINE')) return this.simpleLine();
    this.next();
    while (this.is('NEWLINE')) this.next();
    if (!this.is('INDENT')) {
      throw new CodeError('IndentationError', 'Raden efter kolonet behöver dras in, till exempel med fyra mellanslag.', this.cur.line, 'expected-indent', 'compile');
    }
    this.next();
    const body = [];
    while (!this.is('DEDENT') && !this.is('EOF')) {
      if (this.is('NEWLINE')) { this.next(); continue; }
      body.push(...this.statement());
    }
    if (this.is('DEDENT')) this.next();
    return body;
  }
  statement() {
    const c = this.cur;
    if (c.t === 'INDENT') throw new CodeError('IndentationError', 'Den här raden är indragen utan anledning. Ta bort mellanslagen i början.', c.line, 'unexpected-indent', 'compile');
    if (c.t === 'KW') {
      switch (c.v) {
        case 'if': return [this.ifStmt()];
        case 'while': {
          this.next();
          const test = this.condition();
          this.inLoop++; const body = this.block(); this.inLoop--;
          return [{ k: 'While', test, body, line: c.line }];
        }
        case 'for': {
          this.next();
          const target = this.target();
          if (!this.isKw('in')) throw syntax('En for-loop behöver ordet in, till exempel: for tal in lista:', this.cur.line, 'for-in');
          this.next();
          const iter = this.exprList();
          this.inLoop++; const body = this.block(); this.inLoop--;
          return [{ k: 'For', target, iter, body, line: c.line }];
        }
        case 'def': return [this.funcDef()];
        case 'class': return [this.classDef()];
        case 'try': return [this.tryStmt()];
        case 'elif': case 'else':
          throw syntax(`${c.v} måste komma direkt efter ett if-block med samma indragning.`, c.line, 'stray-else');
        case 'except': case 'finally':
          throw syntax(`${c.v} måste komma direkt efter ett try-block med samma indragning.`, c.line, 'stray-except');
        case 'import': case 'from': case 'with': case 'yield': case 'async': case 'await': case 'del':
          throw new CodeError('Stöds inte', `Kodstigs övningsmotor stöder inte ${c.v} ännu.`, c.line, 'unsupported', 'compile');
        default: break;
      }
    }
    return this.simpleLine();
  }
  simpleLine() {
    const out = [this.simple()];
    while (this.isOp(';')) { this.next(); if (this.is('NEWLINE')) break; out.push(this.simple()); }
    if (!this.is('NEWLINE') && !this.is('EOF')) {
      const t = this.cur;
      if (t.t === 'STR' || t.t === 'NAME' || t.t === 'NUM') {
        throw syntax('Här verkar något saknas mellan två delar, till exempel ett komma eller ett operatortecken.', t.line, 'missing-comma');
      }
      throw syntax(`Oväntat ${t.v ?? t.t} på raden.`, t.line);
    }
    if (this.is('NEWLINE')) this.next();
    return out;
  }
  simple() {
    const c = this.cur;
    if (c.t === 'KW') {
      if (c.v === 'pass') { this.next(); return { k: 'Pass', line: c.line }; }
      if (c.v === 'break' || c.v === 'continue') {
        if (!this.inLoop) throw syntax(`${c.v} kan bara användas inuti en loop.`, c.line);
        this.next(); return { k: c.v === 'break' ? 'Break' : 'Continue', line: c.line };
      }
      if (c.v === 'return') {
        if (!this.inFunc) throw syntax('return kan bara användas inuti en funktion.', c.line, 'return-outside');
        this.next();
        const value = this.is('NEWLINE') || this.isOp(';') || this.is('EOF') ? null : this.exprList();
        return { k: 'Return', value, line: c.line };
      }
      if (c.v === 'raise') {
        this.next();
        const exc = this.is('NEWLINE') || this.isOp(';') || this.is('EOF') ? null : this.expr();
        return { k: 'Raise', exc, line: c.line };
      }
      if (c.v === 'global') {
        this.next(); const names = [this.name()];
        while (this.isOp(',')) { this.next(); names.push(this.name()); }
        return { k: 'Global', names, line: c.line };
      }
    }
    const e = this.exprList();
    if (this.isOp('=')) {
      const targets = [e];
      let value;
      while (this.isOp('=')) { this.next(); value = this.exprList(); targets.push(value); }
      value = targets.pop();
      targets.forEach((t) => this.checkTarget(t));
      return { k: 'Assign', targets, value, line: c.line };
    }
    const aug = ['+=', '-=', '*=', '/=', '//=', '%=', '**='];
    if (this.is('OP') && aug.includes(this.cur.v)) {
      const op = this.next().v.slice(0, -1);
      this.checkTarget(e);
      const value = this.exprList();
      return { k: 'AugAssign', target: e, op, value, line: c.line };
    }
    return { k: 'Expr', value: e, line: c.line };
  }
  checkTarget(t) {
    if (t.k === 'Name' || t.k === 'Index' || t.k === 'Attr') return;
    if (t.k === 'Tuple' || t.k === 'List') { t.items.forEach((x) => this.checkTarget(x)); return; }
    throw syntax('Det går inte att tilldela ett värde till det här. Vänstersidan av = ska vara ett variabelnamn.', t.line, 'bad-assign');
  }
  target() {
    const first = this.postfix();
    if (!this.isOp(',')) return first;
    const items = [first];
    while (this.isOp(',')) { this.next(); items.push(this.postfix()); }
    return { k: 'Tuple', items, line: first.line };
  }
  name() {
    if (!this.is('NAME')) throw syntax('Här förväntades ett namn.', this.cur.line);
    return this.next().v;
  }
  condition() {
    const e = this.expr();
    if (this.isOp('=')) throw syntax('Använd == för att jämföra. Ett ensamt = betyder tilldelning.', this.cur.line, 'assign-in-condition');
    return e;
  }
  ifStmt() {
    const line = this.next().line;
    const test = this.condition();
    const body = this.block();
    let orelse = [];
    while (this.is('NEWLINE')) this.next();
    if (this.isKw('elif')) { orelse = [this.ifStmt()]; }
    else if (this.isKw('else')) { this.next(); orelse = this.block(); }
    return { k: 'If', test, body, orelse, line };
  }
  funcDef() {
    const line = this.next().line;
    const name = this.name();
    this.expectOp('(', 'Efter funktionens namn behövs parenteser, till exempel def hej():', 'parens');
    const params = [];
    while (!this.isOp(')')) {
      const pname = this.name();
      let def = null;
      if (this.isOp(':')) { this.next(); this.expr(); } // typannotering ignoreras
      if (this.isOp('=')) { this.next(); def = this.expr(); }
      params.push({ name: pname, def });
      if (!this.isOp(',')) break;
      this.next();
    }
    this.expectOp(')', 'Parameterlistan behöver avslutas med ).', 'parens');
    if (this.isOp('->')) { this.next(); this.expr(); }
    this.inFunc++; const loops = this.inLoop; this.inLoop = 0;
    const body = this.block();
    this.inFunc--; this.inLoop = loops;
    return { k: 'Def', name, params, body, line };
  }
  classDef() {
    const line = this.next().line;
    const name = this.name();
    let base = null;
    if (this.isOp('(')) {
      this.next();
      if (!this.isOp(')')) base = this.expr();
      this.expectOp(')', 'Det saknas en avslutande parentes ) efter basklassen.', 'parens');
    }
    const loops = this.inLoop; this.inLoop = 0;
    const body = this.block();
    this.inLoop = loops;
    return { k: 'Class', name, base, body, line };
  }
  tryStmt() {
    const line = this.next().line;
    const body = this.block();
    const handlers = [];
    let orelse = [], fin = [];
    const skip = () => { while (this.is('NEWLINE')) this.next(); };
    skip();
    while (this.isKw('except')) {
      const hl = this.next().line;
      let types = null, name = null;
      if (!this.isOp(':')) {
        types = this.expr();
        if (this.isKw('as')) { this.next(); name = this.name(); }
      }
      handlers.push({ types, name, body: this.block(), line: hl });
      skip();
    }
    if (this.isKw('else') && handlers.length) { this.next(); orelse = this.block(); skip(); }
    if (this.isKw('finally')) { this.next(); fin = this.block(); }
    if (!handlers.length && !fin.length) throw syntax('Ett try-block behöver minst ett except eller finally efter sig.', line, 'try-without-except');
    return { k: 'Try', body, handlers, orelse, fin, line };
  }
  exprList() {
    const first = this.expr();
    if (!this.isOp(',')) return first;
    const items = [first];
    while (this.isOp(',')) {
      this.next();
      if (this.is('NEWLINE') || this.isOp('=') || this.isOp(')')) break;
      items.push(this.expr());
    }
    return { k: 'Tuple', items, line: first.line };
  }
  expr() {
    if (this.isKw('lambda')) {
      const line = this.next().line;
      const params = [];
      while (!this.isOp(':')) {
        const pname = this.name();
        let def = null;
        if (this.isOp('=')) { this.next(); def = this.expr(); }
        params.push({ name: pname, def });
        if (!this.isOp(',')) break;
        this.next();
      }
      this.expectOp(':', 'En lambda skrivs lambda x: uttryck.');
      const value = this.expr();
      return { k: 'Lambda', def: { name: '<lambda>', params, body: [{ k: 'Return', value, line }], line }, line };
    }
    const e = this.orExpr();
    if (this.isKw('if')) {
      this.next();
      const test = this.orExpr();
      if (!this.isKw('else')) throw syntax('Ett villkorsuttryck behöver else.', this.cur.line);
      this.next();
      const orelse = this.expr();
      return { k: 'IfExp', test, body: e, orelse, line: e.line };
    }
    return e;
  }
  orExpr() {
    let l = this.andExpr();
    while (this.isKw('or')) { const line = this.next().line; l = { k: 'Bool', op: 'or', l, r: this.andExpr(), line }; }
    return l;
  }
  andExpr() {
    let l = this.notExpr();
    while (this.isKw('and')) { const line = this.next().line; l = { k: 'Bool', op: 'and', l, r: this.notExpr(), line }; }
    return l;
  }
  notExpr() {
    if (this.isKw('not')) { const line = this.next().line; return { k: 'Not', v: this.notExpr(), line }; }
    return this.comparison();
  }
  comparison() {
    const first = this.bitOr();
    const ops = [], rights = [];
    for (;;) {
      let op = null;
      if (this.is('OP') && ['<', '>', '==', '!=', '<=', '>='].includes(this.cur.v)) op = this.next().v;
      else if (this.isKw('in')) { this.next(); op = 'in'; }
      else if (this.isKw('not') && this.peek().t === 'KW' && this.peek().v === 'in') { this.next(); this.next(); op = 'not in'; }
      else if (this.isKw('is')) { this.next(); op = 'is'; if (this.isKw('not')) { this.next(); op = 'is not'; } }
      if (!op) break;
      ops.push(op); rights.push(this.bitOr());
    }
    if (!ops.length) return first;
    return { k: 'Compare', first, ops, rights, line: first.line };
  }
  bitOr() {
    let l = this.bitAnd();
    while (this.isOp('|')) { const t = this.next(); l = { k: 'Bin', op: '|', l, r: this.bitAnd(), line: t.line }; }
    return l;
  }
  bitAnd() {
    let l = this.sum();
    while (this.isOp('&')) { const t = this.next(); l = { k: 'Bin', op: '&', l, r: this.sum(), line: t.line }; }
    return l;
  }
  sum() {
    let l = this.term();
    while (this.isOp('+') || this.isOp('-')) { const t = this.next(); l = { k: 'Bin', op: t.v, l, r: this.term(), line: t.line }; }
    return l;
  }
  term() {
    let l = this.factor();
    while (['*', '/', '//', '%'].some((o) => this.isOp(o))) { const t = this.next(); l = { k: 'Bin', op: t.v, l, r: this.factor(), line: t.line }; }
    return l;
  }
  factor() {
    if (this.isOp('-') || this.isOp('+')) { const t = this.next(); return { k: 'Unary', op: t.v, v: this.factor(), line: t.line }; }
    return this.power();
  }
  power() {
    const base = this.postfix();
    if (this.isOp('**')) { const t = this.next(); return { k: 'Bin', op: '**', l: base, r: this.factor(), line: t.line }; }
    return base;
  }
  // Läser "for mål in samling [if villkor]" i en listbyggare.
  compTail() {
    this.next();
    const target = this.target();
    if (!this.isKw('in')) throw syntax('Här förväntades in.', this.cur.line);
    this.next();
    const iter = this.orExpr();
    let cond = null;
    if (this.isKw('if')) { this.next(); cond = this.orExpr(); }
    return { target, iter, cond };
  }
  postfix() {
    let e = this.atom();
    for (;;) {
      if (this.isOp('(')) {
        const line = this.next().line;
        const args = [], kwargs = [];
        while (!this.isOp(')')) {
          if (this.is('NAME') && this.peek().t === 'OP' && this.peek().v === '=') {
            const name = this.next().v; this.next();
            kwargs.push({ name, value: this.expr() });
          } else {
            if (kwargs.length) throw syntax('Namngivna argument måste komma efter de vanliga argumenten.', this.cur.line);
            args.push(this.expr());
            // Generatoruttryck som enda argument, t.ex. sum(x * x for x in tal), körs som en listbyggare.
            if (this.isKw('for') && args.length === 1 && !kwargs.length) {
              const c = this.compTail();
              args[0] = { k: 'ListComp', elt: args[0], ...c, line };
            }
          }
          if (!this.isOp(',')) break;
          this.next();
        }
        this.expectOp(')', 'Det saknas en avslutande parentes ) i funktionsanropet.', 'parens');
        e = { k: 'Call', fn: e, args, kwargs, line };
      } else if (this.isOp('[')) {
        const line = this.next().line;
        let index;
        if (this.isOp(':') || this.peekSlice()) index = this.slice();
        else index = this.exprList();
        this.expectOp(']', 'Det saknas en avslutande hakparentes ].', 'parens');
        e = { k: 'Index', obj: e, index, line };
      } else if (this.isOp('.')) {
        const line = this.next().line;
        e = { k: 'Attr', obj: e, name: this.name(), line };
      } else break;
    }
    return e;
  }
  peekSlice() {
    // titta framåt efter ett kolon på samma hakparentesnivå
    let d = 0;
    for (let k = this.p; k < this.toks.length; k++) {
      const t = this.toks[k];
      if (t.t !== 'OP') continue;
      if ('([{'.includes(t.v)) d++;
      else if (')]}'.includes(t.v)) { if (d === 0) return false; d--; }
      else if (t.v === ':' && d === 0) return true;
    }
    return false;
  }
  slice() {
    const line = this.cur.line;
    const part = () => (this.isOp(':') || this.isOp(']') ? null : this.expr());
    const lo = part();
    this.expectOp(':');
    const hi = part();
    let step = null;
    if (this.isOp(':')) { this.next(); step = part(); }
    return { k: 'Slice', lo, hi, step, line };
  }
  atom() {
    const t = this.cur;
    switch (t.t) {
      case 'NAME': this.next(); return { k: 'Name', name: t.v, line: t.line };
      case 'NUM': this.next(); return { k: 'Const', v: t.v, line: t.line };
      case 'STR': {
        this.next(); let s = t.v;
        while (this.is('STR')) s += this.next().v;
        return { k: 'Const', v: s, line: t.line };
      }
      case 'FSTR': this.next(); return parseFString(t.v, t.line);
      case 'KW':
        if (t.v === 'True' || t.v === 'False') { this.next(); return { k: 'Const', v: t.v === 'True', line: t.line }; }
        if (t.v === 'None') { this.next(); return { k: 'Const', v: null, line: t.line }; }
        throw syntax(`Ordet ${t.v} kan inte stå här.`, t.line, 'keyword');
      case 'OP':
        if (t.v === '(') {
          this.next();
          if (this.isOp(')')) { this.next(); return { k: 'Tuple', items: [], line: t.line }; }
          const first = this.expr();
          if (this.isOp(')')) { this.next(); return first; }
          if (this.isKw('for')) {
            const c = this.compTail();
            this.expectOp(')', 'Det saknas en avslutande parentes ).', 'parens');
            return { k: 'ListComp', elt: first, ...c, line: t.line };
          }
          const items = [first];
          while (this.isOp(',')) { this.next(); if (this.isOp(')')) break; items.push(this.expr()); }
          this.expectOp(')', 'Det saknas en avslutande parentes ).', 'parens');
          return { k: 'Tuple', items, line: t.line };
        }
        if (t.v === '[') {
          this.next();
          const items = [];
          if (!this.isOp(']')) {
            const first = this.expr();
            if (this.isKw('for')) {
              this.next();
              const target = this.target();
              if (!this.isKw('in')) throw syntax('Här förväntades in.', this.cur.line);
              this.next();
              const iter = this.orExpr();
              let cond = null;
              if (this.isKw('if')) { this.next(); cond = this.orExpr(); }
              this.expectOp(']', 'Det saknas en avslutande hakparentes ].', 'parens');
              return { k: 'ListComp', elt: first, target, iter, cond, line: t.line };
            }
            items.push(first);
            while (this.isOp(',')) { this.next(); if (this.isOp(']')) break; items.push(this.expr()); }
          }
          this.expectOp(']', 'Det saknas en avslutande hakparentes ] eller ett komma mellan värdena.', 'parens');
          return { k: 'List', items, line: t.line };
        }
        if (t.v === '{') {
          this.next();
          const keys = [], values = [];
          if (!this.isOp('}')) {
            const first = this.expr();
            if (!this.isOp(':') && this.isKw('for')) {
              const c = this.compTail();
              this.expectOp('}', 'Det saknas en avslutande klammer }.', 'parens');
              return { k: 'SetComp', elt: first, ...c, line: t.line };
            }
            if (!this.isOp(':')) {
              // Mängd: {1, 2, 3}
              const items = [first];
              while (this.isOp(',')) { this.next(); if (this.isOp('}')) break; items.push(this.expr()); }
              this.expectOp('}', 'Det saknas en avslutande klammer }.', 'parens');
              return { k: 'Set', items, line: t.line };
            }
            this.next();
            const firstVal = this.expr();
            if (this.isKw('for')) {
              this.next();
              const target = this.target();
              if (!this.isKw('in')) throw syntax('Här förväntades in.', this.cur.line);
              this.next();
              const iter = this.orExpr();
              let cond = null;
              if (this.isKw('if')) { this.next(); cond = this.orExpr(); }
              this.expectOp('}', 'Det saknas en avslutande klammer }.', 'parens');
              return { k: 'DictComp', key: first, value: firstVal, target, iter, cond, line: t.line };
            }
            keys.push(first); values.push(firstVal);
            if (this.isOp(',')) this.next();
          }
          while (!this.isOp('}')) {
            keys.push(this.expr());
            this.expectOp(':', 'I en ordbok skrivs nyckel: värde.');
            values.push(this.expr());
            if (!this.isOp(',')) break;
            this.next();
          }
          this.expectOp('}', 'Det saknas en avslutande klammer }.', 'parens');
          return { k: 'Dict', keys, values, line: t.line };
        }
        break;
      default: break;
    }
    if (t.t === 'NEWLINE' || t.t === 'EOF') throw syntax('Raden tar slut för tidigt. Något saknas i slutet.', t.line, 'incomplete');
    if (t.t === 'INDENT') throw new CodeError('IndentationError', 'Oväntad indragning.', t.line, 'unexpected-indent', 'compile');
    throw syntax(`Oväntat ${t.v ?? t.t}.`, t.line);
  }
}

function parseFString(raw, line) {
  const parts = [];
  let i = 0, lit = '';
  while (i < raw.length) {
    const c = raw[i];
    if (c === '\\' && (raw[i + 1] === '{' || raw[i + 1] === '}')) { lit += raw[i + 1]; i += 2; continue; }
    if (c === '{' && raw[i + 1] === '{') { lit += '{'; i += 2; continue; }
    if (c === '}' && raw[i + 1] === '}') { lit += '}'; i += 2; continue; }
    if (c === '{') {
      let d = 1, j = i + 1;
      while (j < raw.length && d) { if (raw[j] === '{') d++; else if (raw[j] === '}') d--; if (d) j++; }
      if (d) throw syntax('En { i f-strängen är aldrig stängd med }.', line, 'fstring');
      let inner = raw.slice(i + 1, j);
      let spec = null;
      const colon = findTopColon(inner);
      if (colon >= 0) { spec = inner.slice(colon + 1); inner = inner.slice(0, colon); }
      if (!inner.trim()) throw syntax('Det står inget mellan { och } i f-strängen.', line, 'fstring');
      if (lit) parts.push({ k: 'Const', v: lit, line });
      lit = '';
      const toks = tokenize(inner.trim()).filter((tk) => tk.t !== 'NEWLINE' && tk.t !== 'INDENT' && tk.t !== 'DEDENT');
      toks.forEach((tk) => { tk.line = line; });
      const p = new Parser(toks);
      const e = p.expr();
      parts.push({ k: 'FVal', v: e, spec, line });
      i = j + 1; continue;
    }
    if (c === '}') throw syntax('En ensam } i f-strängen. Skriv }} för att visa en klammer.', line, 'fstring');
    lit += c; i++;
  }
  if (lit) parts.push({ k: 'Const', v: lit, line });
  return { k: 'FStr', parts, line };
}
function findTopColon(s) {
  let d = 0, q = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === q) q = null; continue; }
    if (c === '"' || c === "'") q = c;
    else if ('([{'.includes(c)) d++;
    else if (')]}'.includes(c)) d--;
    else if (c === ':' && d === 0) return i;
    else if (c === '!' && s[i + 1] === '=') i++;
  }
  return -1;
}

const EXC_NAMES = ['Exception', 'ArithmeticError', 'ValueError', 'TypeError', 'ZeroDivisionError', 'KeyError', 'IndexError', 'NameError', 'AttributeError', 'RuntimeError', 'NotImplementedError'];

// ---------- Värden ----------
export class PyFloat { constructor(v) { this.v = v; } }
class Tuple { constructor(items) { this.items = items; } }
class Range { constructor(start, stop, step) { this.start = start; this.stop = stop; this.step = step; } }
class PyDict {
  constructor() { this.map = new Map(); }
  static key(k, line) {
    if (typeof k === 'string') return 's:' + k;
    if (typeof k === 'number' || typeof k === 'boolean' || k instanceof PyFloat) return 'n:' + num(k);
    if (k === null) return 'none';
    if (k instanceof Tuple) return 't:' + k.items.map((x) => PyDict.key(x, line)).join('|');
    if (k instanceof PyObject) return 'o:' + k.id;
    if (k instanceof PyClass) return 'c:' + k.name;
    throw new CodeError('TypeError', `En ${typeName(k)} kan inte användas som nyckel i en ordbok.`, line, 'type');
  }
  get(k, line) { const e = this.map.get(PyDict.key(k, line)); return e; }
  set(k, v, line) { this.map.set(PyDict.key(k, line), [k, v]); }
  has(k, line) { return this.map.has(PyDict.key(k, line)); }
}
class PyFunc { constructor(def, interp, closure = null) { this.def = def; this.name = def.name; this.interp = interp; this.closure = closure; this.owner = null; } }
class PyClass {
  constructor(name, base, attrs = new Map(), isExc = false) { this.name = name; this.base = base; this.attrs = attrs; this.isExc = isExc || !!(base && base.isExc); }
  find(name) { for (let c = this; c; c = c.base) if (c.attrs.has(name)) return c.attrs.get(name); return undefined; }
  isSub(other) { for (let c = this; c; c = c.base) if (c === other) return true; return false; }
}
let objIds = 0;
class PyObject { constructor(cls, interp) { this.cls = cls; this.attrs = new Map(); this.interp = interp; this.id = ++objIds; } }
class BoundMethod { constructor(fn, self) { this.fn = fn; this.self = self; this.name = fn.name; } }
class SuperProxy { constructor(cls, self) { this.cls = cls; this.self = self; } }
class PySet {
  constructor(items = [], line) { this.map = new Map(); for (const x of items) this.add(x, line); }
  add(x, line) { this.map.set(PyDict.key(x, line), x); }
  has(x, line) { return this.map.has(PyDict.key(x, line)); }
  items() { return [...this.map.values()]; }
}
// Ett undantag som kastats med raise (eller ett motorfel som fångats och kastats vidare).
class PyRaise { constructor(exc, line) { this.exc = exc; this.line = line; } }
class Builtin { constructor(name, fn) { this.name = name; this.fn = fn; } }
class BreakSig {}
class ContinueSig {}
class ReturnSig { constructor(v) { this.v = v; } }

const isNum = (v) => typeof v === 'number' || typeof v === 'boolean' || v instanceof PyFloat;
const num = (v) => (v instanceof PyFloat ? v.v : typeof v === 'boolean' ? (v ? 1 : 0) : v);
const isFloat = (v) => v instanceof PyFloat;
const mkNum = (r, float) => (float ? new PyFloat(r) : r);

export function typeName(v) {
  if (v === null) return 'NoneType';
  if (typeof v === 'boolean') return 'bool';
  if (typeof v === 'number') return 'int';
  if (v instanceof PyFloat) return 'float';
  if (typeof v === 'string') return 'str';
  if (Array.isArray(v)) return 'list';
  if (v instanceof Tuple) return 'tuple';
  if (v instanceof PyDict) return 'dict';
  if (v instanceof Range) return 'range';
  if (v instanceof PyFunc || v instanceof Builtin || v instanceof BoundMethod) return 'function';
  if (v instanceof PySet) return 'set';
  if (v instanceof PyObject) return v.cls.name;
  if (v instanceof PyClass) return 'type';
  return 'object';
}
const SV_TYPE = { int: 'heltal (int)', float: 'decimaltal (float)', str: 'text (str)', bool: 'sanningsvärde (bool)', NoneType: 'None', list: 'lista (list)', tuple: 'tupel (tuple)', dict: 'ordbok (dict)', range: 'range', function: 'funktion', set: 'mängd (set)', type: 'klass' };
const sv = (v) => (v instanceof PyObject ? `ett ${v.cls.name}-objekt` : SV_TYPE[typeName(v)] || typeName(v));

function fmtFloat(x) {
  if (Number.isNaN(x)) return 'nan';
  if (x === Infinity) return 'inf';
  if (x === -Infinity) return '-inf';
  if (Number.isInteger(x) && Math.abs(x) < 1e16) return x.toFixed(1);
  let s = String(x);
  if (s.includes('e')) s = s.replace(/e([+-])(\d)$/, 'e$10$2');
  return s;
}
export function pyStr(v) {
  if (typeof v === 'string') return v;
  if (v instanceof PyObject) {
    const m = v.cls.find('__str__');
    if (m instanceof PyFunc) return v.interp.strResult(v.interp.callFunc(m, [v], {}, null), '__str__');
    if (v.cls.isExc) { const a = v.attrs.get('args'); const items = a instanceof Tuple ? a.items : []; return items.length === 1 ? pyStr(items[0]) : items.length ? pyRepr(a) : ''; }
  }
  return pyRepr(v);
}
export function pyRepr(v, seen = new Set()) {
  if (v === null) return 'None';
  if (v === true) return 'True';
  if (v === false) return 'False';
  if (typeof v === 'number') return String(v);
  if (v instanceof PyFloat) return fmtFloat(v.v);
  if (typeof v === 'string') {
    const q = v.includes("'") && !v.includes('"') ? '"' : "'";
    const body = v.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\t/g, '\\t');
    return q + (q === "'" ? body.replace(/'/g, "\\'") : body) + q;
  }
  if (Array.isArray(v)) { if (seen.has(v)) return '[...]'; seen.add(v); const s = '[' + v.map((x) => pyRepr(x, seen)).join(', ') + ']'; seen.delete(v); return s; }
  if (v instanceof Tuple) return v.items.length === 1 ? `(${pyRepr(v.items[0], seen)},)` : '(' + v.items.map((x) => pyRepr(x, seen)).join(', ') + ')';
  if (v instanceof PyDict) return '{' + [...v.map.values()].map(([k, x]) => `${pyRepr(k, seen)}: ${pyRepr(x, seen)}`).join(', ') + '}';
  if (v instanceof Range) return v.step === 1 ? `range(${v.start}, ${v.stop})` : `range(${v.start}, ${v.stop}, ${v.step})`;
  if (v instanceof PyFunc || v instanceof Builtin) return `<function ${v.name}>`;
  if (v instanceof BoundMethod) return `<metod ${v.name}>`;
  if (v instanceof PySet) return v.map.size ? '{' + v.items().map((x) => pyRepr(x, seen)).join(', ') + '}' : 'set()';
  if (v instanceof PyClass) return `<class '${v.name}'>`;
  if (v instanceof PyObject) {
    const m = v.cls.find('__repr__');
    if (m instanceof PyFunc) return v.interp.strResult(v.interp.callFunc(m, [v], {}, null), '__repr__');
    if (v.cls.isExc) { const a = v.attrs.get('args'); return `${v.cls.name}(${a instanceof Tuple ? a.items.map((x) => pyRepr(x, seen)).join(', ') : ''})`; }
    return `<${v.cls.name}-objekt>`;
  }
  return String(v);
}

function truthy(v) {
  if (v === null || v === false) return false;
  if (v === true) return true;
  if (typeof v === 'number') return v !== 0;
  if (v instanceof PyFloat) return v.v !== 0;
  if (typeof v === 'string' || Array.isArray(v)) return v.length > 0;
  if (v instanceof Tuple) return v.items.length > 0;
  if (v instanceof PyDict) return v.map.size > 0;
  if (v instanceof Range) return rangeLen(v) > 0;
  if (v instanceof PySet) return v.map.size > 0;
  return true;
}
function rangeLen(r) { return Math.max(0, Math.ceil((r.stop - r.start) / r.step)); }

function pyEq(a, b) {
  if (isNum(a) && isNum(b)) return num(a) === num(b);
  if (typeof a === 'string' && typeof b === 'string') return a === b;
  if (a === null || b === null) return a === b;
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((x, i) => pyEq(x, b[i]));
  if (a instanceof Tuple && b instanceof Tuple) return a.items.length === b.items.length && a.items.every((x, i) => pyEq(x, b.items[i]));
  if (a instanceof PySet && b instanceof PySet) return a.map.size === b.map.size && [...a.map.keys()].every((k) => b.map.has(k));
  if (a instanceof PyObject && b instanceof PyObject && a.cls.find('__eq__') instanceof PyFunc) return truthy(a.interp.callFunc(a.cls.find('__eq__'), [a, b], {}, null));
  if (a instanceof PyDict && b instanceof PyDict) {
    if (a.map.size !== b.map.size) return false;
    for (const [k, [, v]] of a.map) { const o = b.map.get(k); if (!o || !pyEq(v, o[1])) return false; }
    return true;
  }
  return a === b;
}
function pyCmp(a, b, line, op) {
  if (isNum(a) && isNum(b)) return num(a) < num(b) ? -1 : num(a) > num(b) ? 1 : 0;
  if (typeof a === 'string' && typeof b === 'string') return a < b ? -1 : a > b ? 1 : 0;
  const seq = (x) => (Array.isArray(x) ? x : x instanceof Tuple ? x.items : null);
  const sa = seq(a), sb = seq(b);
  if (sa && sb && Array.isArray(a) === Array.isArray(b)) {
    for (let i = 0; i < Math.min(sa.length, sb.length); i++) {
      if (!pyEq(sa[i], sb[i])) return pyCmp(sa[i], sb[i], line, op);
    }
    return sa.length - sb.length;
  }
  throw new CodeError('TypeError', `Det går inte att jämföra ${sv(a)} och ${sv(b)} med ${op}.`, line, 'type-compare');
}

function iterate(v, line) {
  if (Array.isArray(v)) return v.slice();
  if (typeof v === 'string') return [...v];
  if (v instanceof Tuple) return v.items.slice();
  if (v instanceof PyDict) return [...v.map.values()].map(([k]) => k);
  if (v instanceof PySet) return v.items();
  if (v instanceof Range) {
    const out = [];
    const len = rangeLen(v);
    if (len > 1000000) throw new CodeError('Stegbegränsning', 'range är för stor för övningsmotorn.', line, 'infinite-loop');
    for (let i = 0; i < len; i++) out.push(v.start + i * v.step);
    return out;
  }
  throw new CodeError('TypeError', `Det går inte att loopa över ${sv(v)}.`, line, 'not-iterable');
}

function normIndex(i, len, line, what) {
  if (!(typeof i === 'number' || typeof i === 'boolean')) throw new CodeError('TypeError', `Index måste vara ett heltal, inte ${sv(i)}.`, line, 'index-type');
  let k = num(i);
  if (k < 0) k += len;
  if (k < 0 || k >= len) throw new CodeError('IndexError', `Index ${num(i)} finns inte i ${what}. Giltiga index är 0 till ${len - 1}${len ? ` (eller -${len} till -1)` : ' men den är tom'}.`, line, 'index-range');
  return k;
}
function sliceIdx(lo, hi, step, len) {
  step = step ?? 1;
  const clamp = (x, d) => {
    if (x === null || x === undefined) return d;
    let k = num(x); if (k < 0) k += len;
    return step > 0 ? Math.min(Math.max(k, 0), len) : Math.min(Math.max(k, -1), len - 1);
  };
  const start = clamp(lo, step > 0 ? 0 : len - 1);
  const stop = clamp(hi, step > 0 ? len : -1);
  const idx = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) idx.push(i);
  return idx;
}

function pyRound(x, nd) {
  if (nd === undefined || nd === null) {
    const f = Math.floor(x), d = x - f;
    if (d > 0.5) return f + 1;
    if (d < 0.5) return f;
    return f % 2 === 0 ? f : f + 1;
  }
  const m = 10 ** nd;
  return new PyFloat(Math.round(x * m) / m);
}

function formatSpec(v, spec, line) {
  const m = /^([<>^]?)(\d*)(,?)(?:\.(\d+))?([fdse%]?)$/.exec(spec);
  if (!m) throw new CodeError('ValueError', `Formatet :${spec} stöds inte i övningsmotorn.`, line, 'format');
  const [, align, width, comma, prec, type] = m;
  let s;
  if (type === 'f' || type === '%' || (prec && type !== 's')) {
    if (!isNum(v)) throw new CodeError('ValueError', `Formatet :${spec} fungerar bara för tal.`, line, 'format');
    let x = num(v); if (type === '%') x *= 100;
    s = x.toFixed(prec ? +prec : 6);
    if (type === '%') s += '%';
  } else if (type === 'd') {
    if (!(typeof v === 'number')) throw new CodeError('ValueError', `Formatet :d fungerar bara för heltal.`, line, 'format');
    s = String(v);
  } else s = pyStr(v);
  if (comma) { const [a, b] = s.split('.'); s = a.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (b ? '.' + b : ''); }
  const w = +width || 0;
  if (s.length < w) {
    const pad = w - s.length;
    const al = align || (isNum(v) ? '>' : '<');
    if (al === '>') s = ' '.repeat(pad) + s;
    else if (al === '^') s = ' '.repeat(Math.floor(pad / 2)) + s + ' '.repeat(Math.ceil(pad / 2));
    else s += ' '.repeat(pad);
  }
  return s;
}

// ---------- Tolk ----------
class Interp {
  constructor(opts = {}) {
    this.out = [];
    this.outLen = 0;
    this.steps = 0;
    this.maxSteps = opts.maxSteps || MAX_STEPS;
    this.depth = 0;
    this.globals = new Map();
    this.handling = [];
    this.builtins = this.makeBuiltins();
  }
  step(line) { if (++this.steps > this.maxSteps) throw new StepLimit(line); }
  write(s) {
    this.outLen += s.length;
    if (this.outLen > MAX_OUTPUT) throw new CodeError('Utskriftsgräns', 'Programmet skrev ut väldigt mycket text. Kanske en loop som aldrig slutar?', null, 'infinite-loop');
    this.out.push(s);
  }
  output() { return this.out.join(''); }

  makeBuiltins() {
    const B = new Map();
    const def = (name, fn) => B.set(name, new Builtin(name, fn));
    const argc = (name, args, min, max, line) => {
      if (args.length < min || args.length > max) {
        throw new CodeError('TypeError', `${name}() tar ${min === max ? min : `${min}–${max}`} argument men fick ${args.length}.`, line, 'arg-count');
      }
    };
    def('print', (args, kw) => {
      const sep = kw.sep !== undefined ? pyStr(kw.sep) : ' ';
      const end = kw.end !== undefined ? pyStr(kw.end) : '\n';
      this.write(args.map(pyStr).join(sep) + end);
      return null;
    });
    def('input', (a, k, line) => { throw new CodeError('Stöds inte', 'input() stöds inte i Kodstig. Ge variabeln ett värde direkt i koden i stället.', line, 'input'); });
    def('len', (args, kw, line) => {
      argc('len', args, 1, 1, line);
      const v = args[0];
      if (typeof v === 'string' || Array.isArray(v)) return v.length;
      if (v instanceof Tuple) return v.items.length;
      if (v instanceof PyDict) return v.map.size;
      if (v instanceof Range) return rangeLen(v);
      if (v instanceof PySet) return v.map.size;
      if (v instanceof PyObject && v.cls.find('__len__') instanceof PyFunc) return this.callFunc(v.cls.find('__len__'), [v], {}, line);
      throw new CodeError('TypeError', `${sv(v)} har ingen längd.`, line, 'type');
    });
    def('str', (args) => (args.length ? pyStr(args[0]) : ''));
    def('repr', (args) => pyRepr(args[0]));
    def('int', (args, kw, line) => {
      if (!args.length) return 0;
      const v = args[0];
      if (typeof v === 'string') {
        const s = v.trim();
        if (!/^[+-]?\d+$/.test(s.replace(/_/g, ''))) throw new CodeError('ValueError', `int() kan inte göra om ${pyRepr(v)} till ett heltal.`, line, 'value-int');
        return parseInt(s.replace(/_/g, ''), 10);
      }
      if (isNum(v)) return Math.trunc(num(v));
      throw new CodeError('TypeError', `int() kan inte ta ${sv(v)}.`, line, 'type');
    });
    def('float', (args, kw, line) => {
      if (!args.length) return new PyFloat(0);
      const v = args[0];
      if (typeof v === 'string') {
        const s = v.trim().toLowerCase();
        if (s === 'inf' || s === 'infinity') return new PyFloat(Infinity);
        if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/.test(s)) throw new CodeError('ValueError', `float() kan inte göra om ${pyRepr(v)} till ett decimaltal. Använd punkt som decimaltecken.`, line, 'value-float');
        return new PyFloat(parseFloat(s));
      }
      if (isNum(v)) return new PyFloat(num(v));
      throw new CodeError('TypeError', `float() kan inte ta ${sv(v)}.`, line, 'type');
    });
    def('bool', (args) => (args.length ? truthy(args[0]) : false));
    def('abs', (args, kw, line) => { argc('abs', args, 1, 1, line); this.needNum(args[0], 'abs', line); return mkNum(Math.abs(num(args[0])), isFloat(args[0])); });
    def('round', (args, kw, line) => {
      argc('round', args, 1, 2, line); this.needNum(args[0], 'round', line);
      if (args.length === 1 || args[1] === null) return pyRound(num(args[0]));
      if (!isFloat(args[0])) return args[0];
      return pyRound(num(args[0]), num(args[1]));
    });
    const minmax = (name, pick) => (args, kw, line) => {
      let items = args.length === 1 ? iterate(args[0], line) : args;
      if (!items.length) {
        if ('default' in kw) return kw.default;
        throw new CodeError('ValueError', `${name}() fick en tom samling.`, line, 'empty');
      }
      if (kw.key) items = items.map((x) => [this.callValue(kw.key, [x], {}, line), x]); else items = items.map((x) => [x, x]);
      let best = items[0];
      for (const it of items.slice(1)) if (pick(pyCmp(it[0], best[0], line, '<'))) best = it;
      return best[1];
    };
    def('min', minmax('min', (c) => c < 0));
    def('max', minmax('max', (c) => c > 0));
    def('sum', (args, kw, line) => {
      let acc = args.length > 1 ? args[1] : 0;
      for (const x of iterate(args[0], line)) acc = this.binop('+', acc, x, line);
      return acc;
    });
    def('range', (args, kw, line) => {
      argc('range', args, 1, 3, line);
      args.forEach((a) => { if (typeof a !== 'number' && typeof a !== 'boolean') throw new CodeError('TypeError', `range() behöver heltal, inte ${sv(a)}.`, line, 'range-type'); });
      const [a, b, c] = args.map(num);
      if (c === 0) throw new CodeError('ValueError', 'range() kan inte ha steget 0.', line, 'value');
      return args.length === 1 ? new Range(0, a, 1) : new Range(a, b, c ?? 1);
    });
    def('list', (args, kw, line) => (args.length ? iterate(args[0], line) : []));
    def('tuple', (args, kw, line) => new Tuple(args.length ? iterate(args[0], line) : []));
    def('dict', (args, kw, line) => {
      const d = new PyDict();
      if (args.length) {
        const src = args[0];
        const pairs = src instanceof PyDict ? [...src.map.values()] : iterate(src, line).map((p) => {
          const kv = iterate(p, line);
          if (kv.length !== 2) throw new CodeError('ValueError', 'dict() behöver par med exakt två värden: nyckel och värde.', line, 'value');
          return kv;
        });
        for (const [k, v] of pairs) d.set(k, v, line);
      }
      for (const [k, v] of Object.entries(kw)) d.set(k, v, line);
      return d;
    });
    def('sorted', (args, kw, line) => {
      const items = iterate(args[0], line);
      const keyed = kw.key ? items.map((x) => [this.callValue(kw.key, [x], {}, line), x]) : items.map((x) => [x, x]);
      keyed.sort((a, b) => pyCmp(a[0], b[0], line, '<'));
      const res = keyed.map((p) => p[1]);
      return kw.reverse && truthy(kw.reverse) ? res.reverse() : res;
    });
    def('reversed', (args, kw, line) => iterate(args[0], line).reverse());
    def('enumerate', (args, kw, line) => iterate(args[0], line).map((x, i) => new Tuple([i + (args[1] ? num(args[1]) : 0), x])));
    def('zip', (args, kw, line) => {
      const ls = args.map((a) => iterate(a, line));
      const n = Math.min(...ls.map((l) => l.length));
      return Array.from({ length: n }, (_, i) => new Tuple(ls.map((l) => l[i])));
    });
    def('type', (args) => (args[0] instanceof PyObject ? args[0].cls : `<class '${typeName(args[0])}'>`));
    def('isinstance', (args, kw, line) => {
      const t = args[1];
      const types = t instanceof Tuple ? t.items : [t];
      const v = args[0];
      return types.some((x) => {
        if (x instanceof PyClass) return v instanceof PyObject && v.cls.isSub(x);
        const tn = typeName(v);
        return x && (x.name === tn || (tn === 'bool' && x.name === 'int'));
      });
    });
    // Undantagsklasser som går att fånga med except och kasta med raise.
    const Exc = new PyClass('Exception', null, new Map(), true);
    Exc.attrs.set('__init__', new Builtin('__init__', (a) => { a[0].attrs.set('args', new Tuple(a.slice(1))); return null; }));
    B.set('Exception', Exc);
    for (const n of EXC_NAMES) if (n !== 'Exception') B.set(n, new PyClass(n, n === 'ZeroDivisionError' ? B.get('ArithmeticError') || Exc : Exc, new Map(), true));
    def('set', (args, kw, line) => new PySet(args.length ? iterate(args[0], line) : [], line));
    def('map', (args, kw, line) => iterate(args[1], line).map((x) => this.callValue(args[0], [x], {}, line)));
    def('filter', (args, kw, line) => iterate(args[1], line).filter((x) => truthy(args[0] === null ? x : this.callValue(args[0], [x], {}, line))));
    def('divmod', (args, kw, line) => new Tuple([this.binop('//', args[0], args[1], line), this.binop('%', args[0], args[1], line)]));
    def('pow', (args, kw, line) => this.binop('**', args[0], args[1], line));
    def('chr', (args) => String.fromCodePoint(num(args[0])));
    def('ord', (args, kw, line) => { if (typeof args[0] !== 'string' || [...args[0]].length !== 1) throw new CodeError('TypeError', 'ord() behöver exakt ett tecken.', line, 'type'); return args[0].codePointAt(0); });
    def('hasattr', (args) => args[0] instanceof PyObject && (args[0].attrs.has(args[1]) || args[0].cls.find(args[1]) !== undefined));
    def('super', (args, kw, line) => { throw new CodeError('TypeError', 'super() kan bara användas inuti en metod i en klass.', line, 'super'); });
    def('any', (args, kw, line) => iterate(args[0], line).some(truthy));
    def('all', (args, kw, line) => iterate(args[0], line).every(truthy));
    return B;
  }
  needNum(v, name, line) {
    if (!isNum(v)) throw new CodeError('TypeError', `${name}() behöver ett tal, men fick ${sv(v)}.`, line, 'type');
  }

  run(body) { this.execBlock(body, null); }

  execBlock(body, scope) { for (const s of body) this.exec(s, scope); }

  exec(s, scope) {
    this.step(s.line);
    switch (s.k) {
      case 'Expr': this.eval(s.value, scope); return;
      case 'Assign': {
        const v = this.eval(s.value, scope);
        for (const t of s.targets) this.assign(t, v, scope, s.line);
        return;
      }
      case 'AugAssign': {
        const cur = this.eval(s.target, scope);
        const v = this.binop(s.op, cur, this.eval(s.value, scope), s.line);
        this.assign(s.target, v, scope, s.line);
        return;
      }
      case 'If':
        if (truthy(this.eval(s.test, scope))) this.execBlock(s.body, scope);
        else this.execBlock(s.orelse, scope);
        return;
      case 'While':
        while (truthy(this.eval(s.test, scope))) {
          this.step(s.line);
          try { this.execBlock(s.body, scope); } catch (e) {
            if (e instanceof BreakSig) break;
            if (e instanceof ContinueSig) continue;
            throw e;
          }
        }
        return;
      case 'For': {
        const items = iterate(this.eval(s.iter, scope), s.line);
        for (const it of items) {
          this.step(s.line);
          this.assign(s.target, it, scope, s.line);
          try { this.execBlock(s.body, scope); } catch (e) {
            if (e instanceof BreakSig) break;
            if (e instanceof ContinueSig) continue;
            throw e;
          }
        }
        return;
      }
      case 'Def': this.setVar(s.name, new PyFunc(s, this, scope && scope.isClass ? scope.parent : scope), scope); return;
      case 'Class': {
        let base = null;
        if (s.base) {
          base = this.eval(s.base, scope);
          if (!(base instanceof PyClass)) throw new CodeError('TypeError', `En klass kan bara ärva från en annan klass, inte ${sv(base)}.`, s.line, 'type');
        }
        const cscope = { vars: new Map(), globals: new Set(), parent: scope, isClass: true };
        this.execBlock(s.body, cscope);
        const cls = new PyClass(s.name, base, cscope.vars);
        for (const v of cls.attrs.values()) if (v instanceof PyFunc) v.owner = cls;
        this.setVar(s.name, cls, scope);
        return;
      }
      case 'Raise': {
        if (!s.exc) {
          if (!this.handling.length) throw new CodeError('RuntimeError', 'Ett ensamt raise fungerar bara inuti ett except-block.', s.line, 'raise');
          throw new PyRaise(this.handling[this.handling.length - 1], s.line);
        }
        let exc = this.eval(s.exc, scope);
        if (exc instanceof PyClass && exc.isExc) exc = this.instantiate(exc, [], {}, s.line);
        if (!(exc instanceof PyObject && exc.cls.isExc)) throw new CodeError('TypeError', 'raise behöver ett undantag, till exempel raise ValueError("förklaring").', s.line, 'raise');
        throw new PyRaise(exc, s.line);
      }
      case 'Try': {
        let ok = false;
        try {
          try { this.execBlock(s.body, scope); ok = true; } catch (e) {
            const exc = this.toPyExc(e);
            if (!exc) throw e;
            const h = s.handlers.find((hd) => !hd.types || this.excMatches(exc, this.eval(hd.types, scope), hd.line));
            if (!h) throw e;
            if (h.name) this.setVar(h.name, exc, scope);
            this.handling.push(exc);
            try { this.execBlock(h.body, scope); } finally { this.handling.pop(); }
          }
          if (ok) this.execBlock(s.orelse, scope);
        } finally {
          if (s.fin.length) this.execBlock(s.fin, scope);
        }
        return;
      }
      case 'Return': throw new ReturnSig(s.value ? this.eval(s.value, scope) : null);
      case 'Break': throw new BreakSig();
      case 'Continue': throw new ContinueSig();
      case 'Pass': return;
      case 'Global': if (scope) s.names.forEach((n) => scope.globals.add(n)); return;
      default: throw new CodeError('Internt fel', 'Okänd sats.', s.line);
    }
  }

  setVar(name, v, scope) {
    if (scope && !scope.globals.has(name)) scope.vars.set(name, v);
    else this.globals.set(name, v);
  }
  lookup(name, scope, line) {
    if (scope && !scope.globals.has(name)) {
      for (let sc = scope; sc; sc = sc.parent) if (sc.vars.has(name)) return sc.vars.get(name);
    }
    if (this.globals.has(name)) return this.globals.get(name);
    if (this.builtins.has(name)) return this.builtins.get(name);
    const typeNames = { int: 1, float: 1, str: 1, bool: 1, list: 1, dict: 1, tuple: 1 };
    if (Object.hasOwn(typeNames, name)) return this.builtins.get(name);
    const lower = name.toLowerCase();
    let tip = '';
    if (lower === 'print' && name !== 'print') tip = ' Skriv print med små bokstäver.';
    else if (lower === 'true' || lower === 'false') tip = ` Python skriver ${lower === 'true' ? 'True' : 'False'} med stor bokstav.`;
    throw new CodeError('NameError', `Namnet '${name}' är inte definierat.${tip}`, line, 'name');
  }
  assign(t, v, scope, line) {
    if (t.k === 'Name') { this.setVar(t.name, v, scope); return; }
    if (t.k === 'Index') {
      const obj = this.eval(t.obj, scope);
      const idx = this.eval(t.index, scope);
      if (Array.isArray(obj)) { obj[normIndex(idx, obj.length, line, 'listan')] = v; return; }
      if (obj instanceof PyDict) { obj.set(idx, v, line); return; }
      if (typeof obj === 'string') throw new CodeError('TypeError', 'Text kan inte ändras tecken för tecken. Skapa en ny text i stället.', line, 'str-immutable');
      throw new CodeError('TypeError', `${sv(obj)} går inte att ändra med index.`, line, 'type');
    }
    if (t.k === 'Attr') {
      const obj = this.eval(t.obj, scope);
      if (obj instanceof PyObject || obj instanceof PyClass) { obj.attrs.set(t.name, v); return; }
      throw new CodeError('AttributeError', `Det går inte att sätta egenskapen ${t.name} på ${sv(obj)}.`, line, 'attr');
    }
    if (t.k === 'Tuple' || t.k === 'List') {
      const items = iterate(v, line);
      if (items.length !== t.items.length) throw new CodeError('ValueError', `Det finns ${items.length} värden men ${t.items.length} variabler att packa upp till.`, line, 'unpack');
      t.items.forEach((tt, i) => this.assign(tt, items[i], scope, line));
      return;
    }
    throw new CodeError('SyntaxError', 'Ogiltig tilldelning.', line, 'bad-assign');
  }

  eval(e, scope) {
    switch (e.k) {
      case 'Const': return e.v;
      case 'Name': return this.lookup(e.name, scope, e.line);
      case 'FStr': return e.parts.map((p) => (p.k === 'Const' ? p.v : p.spec ? formatSpec(this.eval(p.v, scope), p.spec, e.line) : pyStr(this.eval(p.v, scope)))).join('');
      case 'List': return e.items.map((x) => this.eval(x, scope));
      case 'Tuple': return new Tuple(e.items.map((x) => this.eval(x, scope)));
      case 'Dict': {
        const d = new PyDict();
        e.keys.forEach((k, i) => d.set(this.eval(k, scope), this.eval(e.values[i], scope), e.line));
        return d;
      }
      case 'Set': return new PySet(e.items.map((x) => this.eval(x, scope)), e.line);
      case 'Lambda': return new PyFunc(e.def, this, scope);
      case 'DictComp': {
        const d = new PyDict();
        for (const it of iterate(this.eval(e.iter, scope), e.line)) {
          this.step(e.line);
          this.assign(e.target, it, scope, e.line);
          if (!e.cond || truthy(this.eval(e.cond, scope))) d.set(this.eval(e.key, scope), this.eval(e.value, scope), e.line);
        }
        return d;
      }
      case 'SetComp': return new PySet(this.eval({ ...e, k: 'ListComp' }, scope), e.line);
      case 'ListComp': {
        const out = [];
        for (const it of iterate(this.eval(e.iter, scope), e.line)) {
          this.step(e.line);
          this.assign(e.target, it, scope, e.line);
          if (!e.cond || truthy(this.eval(e.cond, scope))) out.push(this.eval(e.elt, scope));
        }
        return out;
      }
      case 'Bin': return this.binop(e.op, this.eval(e.l, scope), this.eval(e.r, scope), e.line);
      case 'Unary': {
        const v = this.eval(e.v, scope);
        if (!isNum(v)) throw new CodeError('TypeError', `Det går inte att sätta ${e.op} framför ${sv(v)}.`, e.line, 'type');
        return mkNum(e.op === '-' ? -num(v) : num(v), isFloat(v));
      }
      case 'Not': return !truthy(this.eval(e.v, scope));
      case 'Bool': {
        const l = this.eval(e.l, scope);
        if (e.op === 'and') return truthy(l) ? this.eval(e.r, scope) : l;
        return truthy(l) ? l : this.eval(e.r, scope);
      }
      case 'IfExp': return truthy(this.eval(e.test, scope)) ? this.eval(e.body, scope) : this.eval(e.orelse, scope);
      case 'Compare': {
        let l = this.eval(e.first, scope);
        for (let i = 0; i < e.ops.length; i++) {
          const r = this.eval(e.rights[i], scope);
          if (!this.compare(e.ops[i], l, r, e.line)) return false;
          l = r;
        }
        return true;
      }
      case 'Index': {
        const obj = this.eval(e.obj, scope);
        if (e.index.k === 'Slice') {
          const lo = e.index.lo && this.eval(e.index.lo, scope);
          const hi = e.index.hi && this.eval(e.index.hi, scope);
          const st = e.index.step ? num(this.eval(e.index.step, scope)) : 1;
          if (st === 0) throw new CodeError('ValueError', 'Steget i en slice kan inte vara 0.', e.line, 'value');
          const seq = typeof obj === 'string' ? [...obj] : Array.isArray(obj) ? obj : obj instanceof Tuple ? obj.items : null;
          if (!seq) throw new CodeError('TypeError', `${sv(obj)} går inte att dela upp med [:].`, e.line, 'type');
          const res = sliceIdx(lo, hi, st, seq.length).map((i) => seq[i]);
          return typeof obj === 'string' ? res.join('') : obj instanceof Tuple ? new Tuple(res) : res;
        }
        const idx = this.eval(e.index, scope);
        if (Array.isArray(obj)) return obj[normIndex(idx, obj.length, e.line, 'listan')];
        if (typeof obj === 'string') return obj[normIndex(idx, obj.length, e.line, 'texten')];
        if (obj instanceof Tuple) return obj.items[normIndex(idx, obj.items.length, e.line, 'tupeln')];
        if (obj instanceof PyDict) {
          const got = obj.get(idx, e.line);
          if (!got) throw new CodeError('KeyError', `Nyckeln ${pyRepr(idx)} finns inte i ordboken.`, e.line, 'key');
          return got[1];
        }
        if (obj instanceof Range) return iterate(obj, e.line)[normIndex(idx, rangeLen(obj), e.line, 'range')];
        throw new CodeError('TypeError', `${sv(obj)} går inte att indexera med [].`, e.line, 'type');
      }
      case 'Attr': return this.getAttr(this.eval(e.obj, scope), e.name, e.line);
      case 'Call': {
        if (e.fn.k === 'Name' && e.fn.name === 'super' && !e.args.length) {
          let sc = scope;
          while (sc && !sc.owner) sc = sc.parent;
          if (!sc) throw new CodeError('TypeError', 'super() kan bara användas inuti en metod i en klass.', e.line, 'super');
          return new SuperProxy(sc.owner.base, sc.self);
        }
        const fn = this.eval(e.fn, scope);
        const args = e.args.map((a) => this.eval(a, scope));
        const kw = {};
        for (const k of e.kwargs) kw[k.name] = this.eval(k.value, scope);
        return this.callValue(fn, args, kw, e.line);
      }
      default: throw new CodeError('Internt fel', 'Okänt uttryck.', e.line);
    }
  }

  compare(op, l, r, line) {
    switch (op) {
      case '==': return pyEq(l, r);
      case '!=': return !pyEq(l, r);
      case '<': return pyCmp(l, r, line, op) < 0;
      case '>': return pyCmp(l, r, line, op) > 0;
      case '<=': return pyCmp(l, r, line, op) <= 0;
      case '>=': return pyCmp(l, r, line, op) >= 0;
      case 'is': return l === r || (l === null && r === null);
      case 'is not': return !(l === r);
      case 'in': case 'not in': {
        let res;
        if (typeof r === 'string') {
          if (typeof l !== 'string') throw new CodeError('TypeError', `Bara text kan sökas i text, inte ${sv(l)}.`, line, 'type');
          res = r.includes(l);
        } else if (r instanceof PyDict) res = r.has(l, line);
        else res = iterate(r, line).some((x) => pyEq(x, l));
        return op === 'in' ? res : !res;
      }
      default: return false;
    }
  }

  binop(op, a, b, line) {
    if (isNum(a) && isNum(b)) {
      const x = num(a), y = num(b), f = isFloat(a) || isFloat(b);
      switch (op) {
        case '+': return mkNum(x + y, f);
        case '-': return mkNum(x - y, f);
        case '*': return mkNum(x * y, f);
        case '/':
          if (y === 0) throw new CodeError('ZeroDivisionError', 'Division med noll går inte.', line, 'zero-div');
          return new PyFloat(x / y);
        case '//':
          if (y === 0) throw new CodeError('ZeroDivisionError', 'Heltalsdivision med noll går inte.', line, 'zero-div');
          return mkNum(Math.floor(x / y), f);
        case '%':
          if (y === 0) throw new CodeError('ZeroDivisionError', 'Rest vid division med noll går inte.', line, 'zero-div');
          return mkNum(((x % y) + y) % y, f);
        case '**': {
          if (!f && y >= 0) return x ** y;
          return new PyFloat(x ** y);
        }
        default: break;
      }
    }
    if (a instanceof PySet && b instanceof PySet && ['|', '&', '-'].includes(op)) {
      if (op === '|') return new PySet([...a.items(), ...b.items()], line);
      if (op === '&') return new PySet(a.items().filter((x) => b.has(x, line)), line);
      return new PySet(a.items().filter((x) => !b.has(x, line)), line);
    }
    if (op === '+') {
      if (typeof a === 'string' && typeof b === 'string') return a + b;
      if (Array.isArray(a) && Array.isArray(b)) return a.concat(b);
      if (a instanceof Tuple && b instanceof Tuple) return new Tuple(a.items.concat(b.items));
      if (typeof a === 'string' || typeof b === 'string') {
        throw new CodeError('TypeError', `Det går inte att lägga ihop ${sv(a)} och ${sv(b)} med +. Gör om talet till text med str(), eller använd en f-sträng.`, line, 'str-plus-num');
      }
    }
    if (op === '*') {
      const rep = (s, n) => { if (n > 100000) throw new CodeError('Stegbegränsning', 'Resultatet blir för stort.', line, 'infinite-loop'); return n; };
      if (typeof a === 'string' && typeof b === 'number') return a.repeat(Math.max(0, rep(a, b)));
      if (typeof b === 'string' && typeof a === 'number') return b.repeat(Math.max(0, rep(b, a)));
      if (Array.isArray(a) && typeof b === 'number') return Array.from({ length: Math.max(0, rep(a, b)) }, () => a).flat();
    }
    throw new CodeError('TypeError', `Operatorn ${op} fungerar inte mellan ${sv(a)} och ${sv(b)}.`, line, typeof a === 'string' || typeof b === 'string' ? 'str-plus-num' : 'type');
  }

  callValue(fn, args, kw, line) {
    if (fn instanceof Builtin) return fn.fn(args, kw, line);
    if (fn instanceof PyFunc) return this.callFunc(fn, args, kw, line);
    if (fn instanceof BoundMethod) return this.callValue(fn.fn, [fn.self, ...args], kw, line);
    if (fn instanceof PyClass) return this.instantiate(fn, args, kw, line);
    throw new CodeError('TypeError', `${sv(fn)} går inte att anropa som en funktion.`, line, 'not-callable');
  }
  callFunc(fn, args, kw, line) {
    const d = fn.def;
    const req = d.params.filter((p) => !p.def).length;
    if (args.length > d.params.length || args.length + Object.keys(kw).length < req) {
      if (fn.owner && (!d.params.length || d.params[0].name !== 'self')) {
        throw new CodeError('TypeError', `Metoden ${d.name}() i klassen ${fn.owner.name} saknar self som första parameter. Skriv def ${d.name}(self${d.params.length ? ', ...' : ''}):`, d.line, 'missing-self');
      }
      const off = fn.owner ? 1 : 0;
      throw new CodeError('TypeError', `${d.name}() tar ${req === d.params.length ? req - off : `${req - off}–${d.params.length - off}`} argument men fick ${args.length + Object.keys(kw).length - off}.`, line, 'arg-count');
    }
    if (++this.depth > 200) throw new CodeError('RecursionError', 'Funktionen anropar sig själv för många gånger.', line, 'recursion');
    const scope = { vars: new Map(), globals: new Set(), parent: fn.closure, owner: fn.owner, self: fn.owner ? args[0] : undefined };
    d.params.forEach((p, i) => {
      let v;
      if (i < args.length) v = args[i];
      else if (p.name in kw) v = kw[p.name];
      else if (p.def) v = this.eval(p.def, null);
      else throw new CodeError('TypeError', `${d.name}() saknar argumentet ${p.name}.`, line, 'arg-count');
      scope.vars.set(p.name, v);
    });
    for (const k of Object.keys(kw)) if (!d.params.some((p) => p.name === k)) throw new CodeError('TypeError', `${d.name}() har ingen parameter som heter ${k}.`, line, 'arg-count');
    try {
      this.execBlock(d.body, scope);
      return null;
    } catch (e) {
      if (e instanceof ReturnSig) return e.v;
      throw e;
    } finally { this.depth--; }
  }

  instantiate(cls, args, kw, line) {
    const obj = new PyObject(cls, this);
    if (cls.isExc) obj.attrs.set('args', new Tuple(args));
    const init = cls.find('__init__');
    if (init instanceof PyFunc || (init instanceof Builtin && !cls.isExc)) this.callValue(init, [obj, ...args], kw, line);
    else if (init instanceof Builtin) { /* undantag utan egen __init__: args är redan satta */ }
    else if (args.length || Object.keys(kw).length) {
      throw new CodeError('TypeError', `${cls.name}() tar inga argument eftersom klassen saknar __init__. Lägg till def __init__(self, ...):`, line, 'no-init');
    }
    return obj;
  }

  strResult(v, what) {
    if (typeof v !== 'string') throw new CodeError('TypeError', `${what} måste returnera text, men returnerade ${sv(v)}.`, null, 'type');
    return v;
  }

  // Gör om ett fel till ett Python-undantag som except kan fånga. Stegbegränsningar
  // och fel i själva koden (syntax) går inte att fånga.
  toPyExc(e) {
    if (e instanceof PyRaise) return e.exc;
    if (e instanceof StepLimit || !(e instanceof CodeError) || e.phase === 'compile') return null;
    const cls = this.builtins.get(e.kind);
    if (!(cls instanceof PyClass)) return null;
    const obj = new PyObject(cls, this);
    obj.attrs.set('args', new Tuple([e.message]));
    return obj;
  }

  excMatches(exc, t, line) {
    const types = t instanceof Tuple ? t.items : [t];
    return types.some((x) => {
      if (!(x instanceof PyClass)) throw new CodeError('TypeError', 'Efter except ska det stå en undantagsklass, till exempel except ValueError:', line, 'except-type');
      return exc.cls.isSub(x);
    });
  }

  getAttr(obj, name, line) {
    const m = (fn) => new Builtin(name, fn);
    if (obj instanceof PyObject) {
      if (obj.attrs.has(name)) return obj.attrs.get(name);
      const v = obj.cls.find(name);
      if (v instanceof PyFunc || v instanceof Builtin) return new BoundMethod(v, obj);
      if (v !== undefined) return v;
      throw new CodeError('AttributeError', `Objektet av typen ${obj.cls.name} har ingen egenskap eller metod som heter ${name}.${obj.cls.find('__init__') ? '' : ' Klassen saknar __init__, så inga egenskaper har satts.'}`, line, 'attr');
    }
    if (obj instanceof PyClass) {
      if (name === '__name__') return obj.name;
      const v = obj.find(name);
      if (v !== undefined) return v;
      throw new CodeError('AttributeError', `Klassen ${obj.name} har inget som heter ${name}.`, line, 'attr');
    }
    if (obj instanceof SuperProxy) {
      const v = obj.cls ? obj.cls.find(name) : undefined;
      if (v instanceof PyFunc || v instanceof Builtin) return new BoundMethod(v, obj.self);
      if (v !== undefined) return v;
      throw new CodeError('AttributeError', `Basklassen har ingen metod som heter ${name}.`, line, 'attr');
    }
    if (obj instanceof PySet) {
      const T = {
        add: (a) => { obj.add(a[0], line); return null; },
        remove: (a) => { if (!obj.has(a[0], line)) throw new CodeError('KeyError', `${pyRepr(a[0])} finns inte i mängden.`, line, 'key'); obj.map.delete(PyDict.key(a[0], line)); return null; },
        discard: (a) => { obj.map.delete(PyDict.key(a[0], line)); return null; },
        union: (a) => this.binop('|', obj, new PySet(iterate(a[0], line), line), line),
        intersection: (a) => this.binop('&', obj, new PySet(iterate(a[0], line), line), line),
        difference: (a) => this.binop('-', obj, new PySet(iterate(a[0], line), line), line),
        issubset: (a) => { const o = new PySet(iterate(a[0], line), line); return obj.items().every((x) => o.has(x, line)); },
        copy: () => new PySet(obj.items(), line),
        clear: () => { obj.map.clear(); return null; },
      };
      if (Object.hasOwn(T, name)) return m((a) => T[name](a));
      throw new CodeError('AttributeError', `En mängd har ingen metod som heter ${name}.`, line, 'attr');
    }
    const noAttr = () => new CodeError('AttributeError', `${sv(obj)} har ingen metod eller egenskap som heter ${name}.`, line, 'attr');
    if (typeof obj === 'string') {
      const s = obj;
      const S = {
        upper: () => s.toUpperCase(), lower: () => s.toLowerCase(),
        strip: (a) => (a[0] ? s.replace(new RegExp(`^[${escRe(a[0])}]+|[${escRe(a[0])}]+$`, 'g'), '') : s.trim()),
        lstrip: () => s.replace(/^\s+/, ''), rstrip: () => s.replace(/\s+$/, ''),
        title: () => s.toLowerCase().replace(/(^|[^a-zåäöA-ZÅÄÖ])([a-zåäö])/g, (x, p, c) => p + c.toUpperCase()),
        capitalize: () => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(),
        split: (a) => (a[0] === undefined || a[0] === null ? s.split(/\s+/).filter(Boolean) : s.split(a[0])),
        join: (a) => iterate(a[0], line).map((x) => {
          if (typeof x !== 'string') throw new CodeError('TypeError', `join() behöver text, men hittade ${sv(x)}. Använd str() först.`, line, 'type');
          return x;
        }).join(s),
        replace: (a) => s.split(a[0]).join(a[1]),
        startswith: (a) => s.startsWith(a[0]), endswith: (a) => s.endsWith(a[0]),
        find: (a) => s.indexOf(a[0]), count: (a) => (a[0] === '' ? s.length + 1 : s.split(a[0]).length - 1),
        isdigit: () => s.length > 0 && /^\d+$/.test(s), isalpha: () => s.length > 0 && /^[A-Za-zÅÄÖåäöÉé]+$/.test(s),
        isupper: () => /[A-ZÅÄÖ]/.test(s) && s === s.toUpperCase(), islower: () => /[a-zåäö]/.test(s) && s === s.toLowerCase(),
        format: (a) => { let i = 0; return s.replace(/\{\}/g, () => pyStr(a[i++])); },
        center: (a) => formatSpec(s, '^' + num(a[0]), line),
        ljust: (a) => s.padEnd(num(a[0]), a[1] ?? ' '), rjust: (a) => s.padStart(num(a[0]), a[1] ?? ' '),
        zfill: (a) => (s.startsWith('-') ? '-' + s.slice(1).padStart(num(a[0]) - 1, '0') : s.padStart(num(a[0]), '0')),
        isalnum: () => s.length > 0 && /^[A-Za-zÅÄÖåäö0-9]+$/.test(s), isspace: () => s.length > 0 && /^\s+$/.test(s),
        index: (a) => { const i = s.indexOf(a[0]); if (i < 0) throw new CodeError('ValueError', `${pyRepr(a[0])} finns inte i texten.`, line, 'value'); return i; },
      };
      if (Object.hasOwn(S, name)) return m((a) => S[name](a));
      throw noAttr();
    }
    if (Array.isArray(obj)) {
      const L = {
        append: (a) => { obj.push(a[0]); return null; },
        extend: (a) => { obj.push(...iterate(a[0], line)); return null; },
        insert: (a) => { let i = num(a[0]); if (i < 0) i = Math.max(0, obj.length + i); obj.splice(Math.min(i, obj.length), 0, a[1]); return null; },
        pop: (a) => {
          if (!obj.length) throw new CodeError('IndexError', 'pop() på en tom lista.', line, 'index-range');
          const i = a.length ? normIndex(a[0], obj.length, line, 'listan') : obj.length - 1;
          return obj.splice(i, 1)[0];
        },
        remove: (a) => {
          const i = obj.findIndex((x) => pyEq(x, a[0]));
          if (i < 0) throw new CodeError('ValueError', `${pyRepr(a[0])} finns inte i listan.`, line, 'value');
          obj.splice(i, 1); return null;
        },
        index: (a) => {
          const i = obj.findIndex((x) => pyEq(x, a[0]));
          if (i < 0) throw new CodeError('ValueError', `${pyRepr(a[0])} finns inte i listan.`, line, 'value');
          return i;
        },
        count: (a) => obj.filter((x) => pyEq(x, a[0])).length,
        sort: (a, kw) => {
          const keyed = kw.key ? obj.map((x) => [this.callValue(kw.key, [x], {}, line), x]) : obj.map((x) => [x, x]);
          keyed.sort((p, q) => pyCmp(p[0], q[0], line, '<'));
          if (kw.reverse && truthy(kw.reverse)) keyed.reverse();
          keyed.forEach((p, i) => { obj[i] = p[1]; });
          return null;
        },
        reverse: () => { obj.reverse(); return null; },
        copy: () => obj.slice(), clear: () => { obj.length = 0; return null; },
      };
      if (Object.hasOwn(L, name)) return m((a, kw) => L[name](a, kw || {}));
      throw noAttr();
    }
    if (obj instanceof PyDict) {
      const D = {
        get: (a) => { const g = obj.get(a[0], line); return g ? g[1] : (a.length > 1 ? a[1] : null); },
        keys: () => [...obj.map.values()].map((p) => p[0]),
        values: () => [...obj.map.values()].map((p) => p[1]),
        items: () => [...obj.map.values()].map((p) => new Tuple([p[0], p[1]])),
        pop: (a) => { const g = obj.get(a[0], line); if (!g) throw new CodeError('KeyError', `Nyckeln ${pyRepr(a[0])} finns inte.`, line, 'key'); obj.map.delete(PyDict.key(a[0], line)); return g[1]; },
      };
      D.setdefault = (a) => { const g = obj.get(a[0], line); if (g) return g[1]; const v = a.length > 1 ? a[1] : null; obj.set(a[0], v, line); return v; };
      D.update = (a) => { if (a[0] instanceof PyDict) for (const [k, v] of a[0].map.values()) obj.set(k, v, line); return null; };
      D.copy = () => { const c = new PyDict(); for (const [k, v] of obj.map.values()) c.set(k, v, line); return c; };
      D.clear = () => { obj.map.clear(); return null; };
      if (Object.hasOwn(D, name)) return m((a) => D[name](a));
      throw noAttr();
    }
    throw noAttr();
  }
}
const escRe = (s) => s.replace(/[\\\]^-]/g, '\\$&');

// ---------- Publikt API ----------
export function parsePython(code) {
  return new Parser(tokenize(code.replace(/\r\n?/g, '\n'))).program();
}

export function fromJS(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') return Number.isInteger(v) ? v : new PyFloat(v);
  if (Array.isArray(v)) return v.map(fromJS);
  if (typeof v === 'object' && v.$float !== undefined) return new PyFloat(v.$float);
  if (typeof v === 'object' && v.$tuple) return new Tuple(v.$tuple.map(fromJS));
  if (typeof v === 'object') { const d = new PyDict(); for (const [k, x] of Object.entries(v)) d.set(k, fromJS(x)); return d; }
  return v;
}
export function toJS(v) {
  if (v instanceof PyFloat) return v.v;
  if (Array.isArray(v)) return v.map(toJS);
  if (v instanceof Tuple) return v.items.map(toJS);
  if (v instanceof PyDict) { const o = {}; for (const [, [k, x]] of v.map) o[pyStr(k)] = toJS(x); return o; }
  if (v instanceof Range) return iterate(v).map(toJS);
  if (v instanceof PyFunc || v instanceof Builtin) return `<function ${v.name}>`;
  if (v instanceof PySet) return v.items().map(toJS);
  if (v instanceof PyObject || v instanceof PyClass || v instanceof BoundMethod) return pyStr(v);
  return v;
}

/**
 * Kör Python-kod. `calls` är valfria funktionsanrop som görs efter att
 * programmet körts: [{ fn: 'namn', args: [...] }].
 */
export function runPython(code, { calls = [], maxSteps } = {}) {
  const res = { output: '', error: null, calls: [] };
  let interp;
  try {
    const ast = parsePython(code);
    interp = new Interp({ maxSteps });
    interp.run(ast);
  } catch (e) {
    res.output = interp ? interp.output() : '';
    res.error = asError(e);
    return res;
  }
  res.output = interp.output();
  for (const c of calls) {
    const before = interp.out.length;
    const r = { value: undefined, error: null, output: '', repr: '' };
    try {
      interp.steps = 0;
      const fn = interp.globals.get(c.fn);
      if (!(fn instanceof PyFunc)) throw new CodeError('NameError', `Funktionen ${c.fn}() finns inte. Kontrollera att den är definierad med def ${c.fn}(...) och att namnet är rätt stavat.`, null, 'missing-function');
      const v = interp.callFunc(fn, c.args.map(fromJS), {}, null);
      r.value = toJS(v);
      r.repr = pyRepr(v);
      r.isFloat = v instanceof PyFloat;
    } catch (e) { r.error = asError(e); }
    r.output = interp.out.slice(before).join('');
    res.calls.push(r);
  }
  return res;
}

function asError(e) {
  if (e instanceof CodeError) return e.toJSON();
  if (e instanceof PyRaise) {
    let msg = '';
    try { msg = pyStr(e.exc); } catch { /* ignore */ }
    return { kind: e.exc.cls.name, message: msg || `Undantaget ${e.exc.cls.name} kastades utan förklaring.`, line: e.line, hint: 'raised', phase: 'runtime' };
  }
  if (e instanceof ReturnSig || e instanceof BreakSig || e instanceof ContinueSig) return { kind: 'SyntaxError', message: 'Felplacerad return/break.', line: null, hint: 'syntax', phase: 'compile' };
  if (e instanceof RangeError) return { kind: 'RecursionError', message: 'Programmet gick för djupt i funktionsanrop.', line: null, hint: 'recursion', phase: 'runtime' };
  return { kind: 'Internt fel', message: String(e && e.message || e), line: null, hint: 'internal', phase: 'runtime' };
}

export const formatPy = pyRepr;
