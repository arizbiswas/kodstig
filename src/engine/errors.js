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
