// Fel från kodmotorerna. `kind` är språkets felnamn (t.ex. NameError, CS1002),
// `hint` är en kort nyckel som ledtrådsmotorn använder.
export class CodeError extends Error {
  constructor(kind, message, line, hint, phase = 'runtime') {
    super(message);
    this.kind = kind;
    this.line = line ?? null;
    this.hint = hint ?? kind;
    this.phase = phase;
  }
  toJSON() {
    return { kind: this.kind, message: this.message, line: this.line, hint: this.hint, phase: this.phase };
  }
}

export class StepLimit extends CodeError {
  constructor(line) {
    super('Stegbegränsning', 'Programmet tog för många steg. Det kan vara en loop som aldrig slutar.', line, 'infinite-loop');
  }
}

export const MAX_STEPS = 200000;
export const MAX_OUTPUT = 20000;

// Delat för båda tolkarna: indata rad för rad och en slumpgenerator som går att
// starta om med samma frö. Talen blir inte samma som i riktig Python eller .NET.
export function inputLines(text) {
  if (typeof text !== 'string' || text === '') return [];
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  return lines;
}
export function makeRng(seed = Date.now() ^ (Math.random() * 0x7fffffff)) {
  let a = (typeof seed === 'number' ? seed : [...String(seed)].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261)) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
