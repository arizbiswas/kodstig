// Jämför elevens bild med målbilden. Turtle-streck jämförs som sträckor med
// tolerans, oberoende av ordning och riktning: en sida kan ritas som ett streck
// eller flera. Återkopplingen säger vad som skiljer, till exempel att en sida är
// för kort eller att vinkeln är gissad.
import { colorName } from './core.js';

const TOL = 3;
const STEP = 2;
const len = (l) => Math.hypot(l.x2 - l.x1, l.y2 - l.y1);
function distToSeg(px, py, l) {
  const dx = l.x2 - l.x1, dy = l.y2 - l.y1;
  const L2 = dx * dx + dy * dy;
  const t = L2 ? Math.max(0, Math.min(1, ((px - l.x1) * dx + (py - l.y1) * dy) / L2)) : 0;
  return Math.hypot(px - (l.x1 + t * dx), py - (l.y1 + t * dy));
}
const near = (x, y, lines) => lines.some((l) => distToSeg(x, y, l) <= TOL);
// Punkter längs en sträcka, ungefär var annan enhet.
function samples(l) {
  const n = Math.max(1, Math.ceil(len(l) / STEP));
  return Array.from({ length: n + 1 }, (_, k) => [l.x1 + (l.x2 - l.x1) * (k / n), l.y1 + (l.y2 - l.y1) * (k / n)]);
}
const r0 = (v) => Math.round(v);

// Vridningarna i ordning för sköldpadda 0, i grader (positivt = vänster).
export function turnsOf(events) {
  const out = [];
  let h = 0;
  for (const e of events || []) {
    if (e.t === 'tturn' && e.id === 0) {
      let d = e.h - h;
      if (d > 180) d -= 360;
      if (d <= -180) d += 360;
      if (Math.abs(d) > 1e-6) out.push(d);
      h = e.h;
    }
  }
  return out;
}

/** { ok, msg } för turtle-bilder. target och got är { lines, events }. */
export function compareTurtle(target, got, lang = 'python') {
  const cs = lang === 'csharp';
  const T = target.lines.filter((l) => len(l) > 0.01), G = got.lines.filter((l) => len(l) > 0.01);
  if (!G.length) return { ok: false, msg: 'Sköldpaddan har inte ritat något än. Är pennan nere? Kom ihåg forward().' };
  // Sidor i målet som saknas helt eller delvis.
  for (const [k, l] of T.entries()) {
    const pts = samples(l);
    const covered = pts.filter(([x, y]) => near(x, y, G)).length / pts.length;
    if (covered < 0.97) {
      const missing = Math.round(len(l) * (1 - covered));
      const side = T.length > 1 ? `Sida ${k + 1}` : 'Strecket';
      const turnMsg = angleHint(target.events, got.events);
      if (turnMsg) return { ok: false, msg: turnMsg.replace(/left/g, cs ? 'Left' : 'left').replace(/right/g, cs ? 'Right' : 'right') };
      if (covered > 0.05) {
        // Är det slutet av sidan som saknas? Då är den för kort.
        const lastNear = near(...pts[pts.length - 1], G);
        return { ok: false, msg: lastNear ? `${side} är inte riktigt rätt, ungefär ${missing} steg saknas på mitten.` : `${side} är ungefär ${missing} steg för kort.` };
      }
      return { ok: false, msg: `${side}, från (${r0(l.x1)}, ${r0(l.y1)}) till (${r0(l.x2)}, ${r0(l.y2)}), saknas.` };
    }
  }
  // Streck som inte finns i målet.
  for (const l of G) {
    const extra = samples(l).find(([x, y]) => !near(x, y, T));
    if (extra) {
      const penHint = (target.events || []).some((e) => e.t === 'tmove' && !e.pen) ? ` Glömde du ${cs ? 'PenUp()' : 'penup()'} innan sköldpaddan flyttade sig?` : '';
      // Spegelvänt i y-led: målets punkter ovanför eller under x-axeln finns speglade hos eleven.
      const off = T.flatMap(samples).filter(([, y]) => Math.abs(y) > 5);
      const mirrored = off.length > 0 && off.every(([x, y]) => near(x, -y, G) && !near(x, y, G));
      const yHint = mirrored ? ` I turtle växer y uppåt, så ${cs ? 'Left()' : 'left()'} vrider moturs.` : '';
      const turnMsg = angleHint(target.events, got.events);
      if (turnMsg) return { ok: false, msg: turnMsg };
      return { ok: false, msg: `Det finns ett streck som inte finns i målbilden, nära (${r0(extra[0])}, ${r0(extra[1])}).${penHint}${yHint}` };
    }
  }
  const tc = target.lines.map((l) => l.c), gc = G.map((l) => l.c);
  const wrongColor = tc.find((c) => !gc.includes(c));
  if (wrongColor) return { ok: false, msg: `Formen stämmer, men målbilden har ${colorName(wrongColor)} streck.` };
  return { ok: true, msg: '' };
}

// Riktad återkoppling för vinklar: gissade vinklar (71, 73 i stället för 72) och
// inre vinkel i stället för yttre.
function angleHint(tEvents, gEvents) {
  const t = turnsOf(tEvents), g = turnsOf(gEvents);
  for (let k = 0; k < Math.min(t.length, g.length); k++) {
    const want = Math.abs(t[k]), had = Math.abs(g[k]);
    if (Math.abs(want - had) < 0.5) {
      if (Math.sign(t[k]) !== Math.sign(g[k])) return `Hörn ${k + 1}: sköldpaddan svängde åt fel håll. Byt left mot right eller tvärtom.`;
      continue;
    }
    const n = Math.round(360 / want);
    const nice = Math.abs(360 / n - want) < 0.01 && n >= 3;
    if (nice && Math.abs(had - (180 - want)) < 0.5) {
      return `Hörn ${k + 1}: ${fmt(had)} grader är den inre vinkeln. Sköldpaddan ska vrida den yttre vinkeln, 360 / ${n} = ${fmt(want)} grader.`;
    }
    if (nice && Math.abs(had - want) <= 6) {
      return `Hörn ${k + 1}: sköldpaddan vred ${fmt(had)} grader, men det behövs ${fmt(want)}. Gissa inte: ett helt varv är 360 grader, så vrid 360 / ${n}.`;
    }
    return `Hörn ${k + 1}: sköldpaddan vred ${fmt(had)} grader, men det behövs ${fmt(want)}.`;
  }
  return null;
}
const fmt = (v) => (Math.abs(v - Math.round(v)) < 1e-6 ? String(Math.round(v)) : v.toFixed(1));

/** { ok, msg } för pixelrutnät. */
export function compareCanvas(target, got) {
  if (!got) return { ok: false, msg: 'Det finns inget rutnät än. Skapa ett, till exempel Canvas(8, 8).' };
  if (target.w !== got.w || target.h !== got.h) return { ok: false, msg: `Rutnätet ska vara ${target.w} brett och ${target.h} högt, men ditt är ${got.w} gånger ${got.h}.` };
  let wrong = 0, first = null;
  for (let y = 0; y < target.h; y++) for (let x = 0; x < target.w; x++) {
    if ((target.px[y][x] || null) !== (got.px[y][x] || null)) { wrong++; if (!first) first = { x, y, want: target.px[y][x], had: got.px[y][x] }; }
  }
  if (!wrong) return { ok: true, msg: '' };
  const c = (v) => (v ? colorName(v) : 'tom');
  return { ok: false, msg: `${wrong} ${wrong === 1 ? 'ruta skiljer' : 'rutor skiljer'} sig från målbilden. Till exempel ska (${first.x}, ${first.y}) vara ${c(first.want)}, men den är ${c(first.had)}.` };
}
