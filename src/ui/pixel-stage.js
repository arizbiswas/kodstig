// Scenen i Pixelvärlden: spelar upp händelserna från en körning, ruta för ruta,
// och lyser upp raden som körs. Används i Kodlabbet, i delade länkar och i lektioner.
import { h, esc, reducedMotion } from './dom.js';
import { sprite } from './pixel-art.js';
import { parseMap, colorHex, colorName, ITEM_SV, DIR_SV, DIRS } from '../engine/pixel/core.js';

// Hastighet 1–5: händelser per sekund för rörelser. 6 = direkt.
const SPEEDS = [null, 1.2, 2.5, 5, 10, 25];
const SPEED_NAMES = ['', 'Mycket långsamt', 'Långsamt', 'Normalt', 'Snabbt', 'Mycket snabbt', 'Direkt'];
const TURTLE_VIEW = 400; // turtle ritar på en yta från -200 till 200, som ett litet Python-fönster

function freshState(level) {
  return {
    world: level && level.map ? parseMap(level.map, level.dir || 'right') : null,
    canvases: [], turtles: [], lines: [], fills: [], dots: [], writes: [], bg: null,
    bubble: null, bump: null,
  };
}

/** En mening om vad som hände, för skärmläsare. */
export function describe(ev) {
  switch (ev.t) {
    case 'move': return ev.ok ? `Hjälten går ${DIR_SV[ev.dir]} till (${ev.x}, ${ev.y}).` : `Hjälten kan inte gå ${DIR_SV[ev.dir]}.`;
    case 'turn': return `Hjälten vänder sig och tittar ${DIR_SV[ev.dir]}.`;
    case 'say': return `Hjälten säger: ${ev.text}`;
    case 'pick': return `Hjälten plockar upp ${ev.item === 'key' ? 'en nyckel' : ev.item === 'gem' ? 'en ädelsten' : 'ett mynt'} på (${ev.x}, ${ev.y}).`;
    case 'drop': return `Hjälten lägger ner en ${ITEM_SV[ev.item]} på (${ev.x}, ${ev.y}).`;
    case 'open': return `Hjälten öppnar dörren på (${ev.x}, ${ev.y}).`;
    case 'canvas': return `Ett rutnät på ${ev.w} gånger ${ev.h} rutor skapas.`;
    case 'pixel': return `Rutan (${ev.x}, ${ev.y}) blir ${colorName(ev.c)}.`;
    case 'fill': return ev.c ? `Hela rutnätet blir ${colorName(ev.c)}.` : 'Rutnätet töms.';
    case 'draw': return `${ev.cells.length} rutor målas.`;
    case 'tmove': return ev.pen ? `Sköldpaddan ritar ett streck till (${Math.round(ev.x2)}, ${Math.round(ev.y2)}).` : `Sköldpaddan flyttar sig till (${Math.round(ev.x2)}, ${Math.round(ev.y2)}) utan att rita.`;
    case 'tturn': return `Sköldpaddan vänder sig mot ${Math.round(ev.h)} grader.`;
    case 'tfill': return `Figuren fylls med ${colorName(ev.c)}.`;
    case 'tdot': return `En prick i ${colorName(ev.c)}.`;
    case 'twrite': return `Sköldpaddan skriver: ${ev.text}`;
    case 'tbg': return `Bakgrunden blir ${colorName(ev.c)}.`;
    default: return '';
  }
}

export function createStage({ onLine = () => {}, target = null } = {}) {
  const el = h(`<div class="pixel-stage">
    <div class="pixel-canvas-wrap"><canvas class="pixel-canvas" role="img" aria-label="Pixelvärlden"></canvas></div>
    <div class="pixel-readout tiny muted" aria-hidden="true"></div>
    <div class="pixel-controls row gap wrap">
      <button class="btn secondary small" type="button" data-px-play disabled>Paus</button>
      <button class="btn secondary small" type="button" data-px-step disabled>Ett steg</button>
      <button class="btn ghost small" type="button" data-px-restart disabled>Börja om</button>
      <label class="pixel-speed tiny"><span>Hastighet</span><input type="range" min="1" max="6" step="1" value="3" data-px-speed aria-valuetext="Normalt"></label>
      <label class="tiny pixel-gridtoggle"><input type="checkbox" data-px-grid> Rutnät och koordinater</label>
    </div>
    <ul class="pixel-goals" hidden></ul>
    <p class="sr-only" aria-live="polite" data-px-live></p>
  </div>`);
  const canvas = el.querySelector('canvas');
  const g = canvas.getContext('2d');
  const live = el.querySelector('[data-px-live]');
  const readout = el.querySelector('.pixel-readout');
  const btnPlay = el.querySelector('[data-px-play]');
  const btnStep = el.querySelector('[data-px-step]');
  const btnRestart = el.querySelector('[data-px-restart]');
  const speedInput = el.querySelector('[data-px-speed]');
  const gridInput = el.querySelector('[data-px-grid]');
  const goalsEl = el.querySelector('.pixel-goals');

  let level = null, result = null, events = [], state = freshState(null);
  let i = 0, anim = null, playing = false, raf = 0, speed = 3, showGrid = false, alive = true;
  let layout = null, lastLine = null, onEnd = null;
  let size = { w: 400, h: 400 };

  const announce = (t) => { if (!t) return; live.textContent = ''; setTimeout(() => { live.textContent = t; }, 20); };

  // ---------- Händelser ----------
  function apply(ev) {
    const W = state.world;
    switch (ev.t) {
      case 'move':
        if (W) {
          W.hero.dir = ev.dir;
          if (ev.ok) { W.hero.x = ev.x; W.hero.y = ev.y; state.bubble = null; } else state.bump = { dir: ev.dir };
        }
        break;
      case 'turn': if (W) W.hero.dir = ev.dir; break;
      case 'say': state.bubble = { text: ev.text, auto: !!ev.auto }; break;
      case 'pick': if (W) { W.items = W.items.filter((it) => !(it.x === ev.x && it.y === ev.y)); W.hero.bag.push(ev.item); } break;
      case 'drop': if (W) { W.hero.bag.pop(); W.items.push({ x: ev.x, y: ev.y, item: ev.item }); } break;
      case 'open': if (W) W.tiles[ev.y][ev.x] = 'floor'; break;
      case 'canvas': state.canvases[ev.id] = { w: ev.w, h: ev.h, px: Array.from({ length: ev.h }, () => Array(ev.w).fill(null)) }; break;
      case 'pixel': state.canvases[ev.id].px[ev.y][ev.x] = ev.c; break;
      case 'fill': for (const row of state.canvases[ev.id].px) row.fill(ev.c); break;
      case 'draw': for (const [x, y, c] of ev.cells) state.canvases[ev.id].px[y][x] = c; break;
      case 'turtle': state.turtles[ev.id] = { x: 0, y: 0, h: 0, visible: true, c: 'black', speed: 3 }; break;
      case 'tmove': {
        const t = state.turtles[ev.id];
        t.x = ev.x2; t.y = ev.y2; t.c = ev.c;
        if (ev.pen) state.lines.push({ id: ev.id, x1: ev.x1, y1: ev.y1, x2: ev.x2, y2: ev.y2, c: ev.c, w: ev.w });
        break;
      }
      case 'tturn': state.turtles[ev.id].h = ev.h; break;
      case 'tcolor': state.turtles[ev.id].c = ev.c; break;
      case 'tspeed': state.turtles[ev.id].speed = ev.s; break;
      case 'tfill': state.fills.push({ id: ev.id, pts: ev.pts, c: ev.c }); break;
      case 'tdot': state.dots.push({ id: ev.id, x: ev.x, y: ev.y, s: ev.s, c: ev.c }); break;
      case 'twrite': state.writes.push({ id: ev.id, x: ev.x, y: ev.y, text: ev.text, c: ev.c }); break;
      case 'tshow': state.turtles[ev.id].visible = ev.v; break;
      case 'tclear': {
        const mine = (o) => o.id !== ev.id;
        state.lines = state.lines.filter(mine); state.fills = state.fills.filter(mine); state.dots = state.dots.filter(mine); state.writes = state.writes.filter(mine);
        break;
      }
      case 'tbg': state.bg = ev.c; break;
      default: break;
    }
  }
  function duration(ev) {
    if (speed >= 6) return 0;
    const per = 1000 / SPEEDS[speed];
    switch (ev.t) {
      case 'move': return ev.ok ? per : per * 1.2;
      case 'turn': return per * 0.5;
      case 'say': return Math.max(per * 1.5, 700);
      case 'pick': case 'drop': case 'open': return per * 0.6;
      case 'tmove': return state.turtles[ev.id]?.speed === 0 ? 0 : per * 0.8;
      case 'tturn': return state.turtles[ev.id]?.speed === 0 ? 0 : per * 0.3;
      case 'pixel': return per * 0.15;
      case 'draw': case 'fill': case 'tfill': return per * 0.5;
      default: return 0;
    }
  }

  // ---------- Ritning ----------
  function resize() {
    const box = canvas.parentElement.getBoundingClientRect();
    const W = Math.max(200, Math.floor(box.width));
    // Världen: rutorna blir högst 56 pixlar, så att små banor inte blir jättestora.
    const H = state.world
      ? Math.min(state.world.h * Math.min(Math.floor(W / state.world.w), 56), 640)
      : Math.round(Math.min(W, 480));
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      canvas.style.height = `${H}px`;
    }
    size = { w: W, h: H, dpr };
  }
  function computeLayout() {
    const { w, h: H } = size;
    const L = { turtle: { s: Math.min(w, H) / TURTLE_VIEW, cx: w / 2, cy: H / 2 } };
    if (state.world) {
      const T = Math.min(56, Math.floor(Math.min(w / state.world.w, H / state.world.h)));
      L.world = { T, ox: Math.floor((w - T * state.world.w) / 2), oy: Math.floor((H - T * state.world.h) / 2) };
    }
    const cv = state.canvases[state.canvases.length - 1] || (target && target.canvas);
    if (cv) {
      const C = Math.floor(Math.min((w - 8) / cv.w, (H - 8) / cv.h));
      L.canvas = { C, ox: Math.floor((w - C * cv.w) / 2), oy: Math.floor((H - C * cv.h) / 2), w: cv.w, h: cv.h };
    }
    layout = L;
  }
  const tx = (x) => layout.turtle.cx + x * layout.turtle.s;
  const ty = (y) => layout.turtle.cy - y * layout.turtle.s;

  function drawWorld(p) {
    const W = state.world, { T, ox, oy } = layout.world;
    g.imageSmoothingEnabled = false;
    for (let y = 0; y < W.h; y++) for (let x = 0; x < W.w; x++) {
      const t = W.tiles[y][x];
      g.drawImage(sprite(t === 'wall' ? 'wall' : t === 'water' ? 'water' : t === 'door' ? 'door' : 'grass'), ox + x * T, oy + y * T, T, T);
      if (t === 'goal') g.drawImage(sprite('goal'), ox + x * T, oy + y * T, T, T);
    }
    for (const it of W.items) g.drawImage(sprite(it.item), ox + it.x * T, oy + it.y * T, T, T);
    if (showGrid) {
      g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 1;
      for (let x = 0; x <= W.w; x++) { g.beginPath(); g.moveTo(ox + x * T + 0.5, oy); g.lineTo(ox + x * T + 0.5, oy + W.h * T); g.stroke(); }
      for (let y = 0; y <= W.h; y++) { g.beginPath(); g.moveTo(ox, oy + y * T + 0.5); g.lineTo(ox + W.w * T, oy + y * T + 0.5); g.stroke(); }
    }
    // Hjälten, med mjuk rörelse mellan rutorna.
    let hx = W.hero.x, hy = W.hero.y;
    if (p && p.ev.t === 'move' && p.ev.ok) {
      const [dx, dy] = DIRS[p.ev.dir];
      hx = p.ev.x - dx * (1 - p.k); hy = p.ev.y - dy * (1 - p.k);
    } else if (p && p.ev.t === 'move' && !p.ev.ok) {
      const [dx, dy] = DIRS[p.ev.dir];
      const nudge = Math.sin(Math.min(p.k, 1) * Math.PI) * 0.28;
      hx += dx * nudge; hy += dy * nudge;
    }
    const dir = p && (p.ev.t === 'move' || p.ev.t === 'turn') ? p.ev.dir : W.hero.dir;
    const px = ox + hx * T, py = oy + hy * T;
    g.drawImage(sprite('hero', dir === 'left'), px, py, T, T);
    drawArrow(px + T / 2, py + T / 2, dir, T);
    const bubble = state.bubble || (p && p.ev.t === 'say' ? { text: p.ev.text, auto: p.ev.auto } : null);
    if (bubble) drawBubble(px + T / 2, py, bubble.text, bubble.auto);
  }
  // En pil på den sida hjälten tittar åt, så riktningen alltid syns (även upp och ner).
  function drawArrow(cx, cy, dir, T) {
    const [dx, dy] = DIRS[dir];
    const r = T * 0.5, s = Math.max(4, T * 0.16);
    const ax = cx + dx * r, ay = cy + dy * r;
    g.save();
    g.translate(ax, ay);
    g.rotate(Math.atan2(dy, dx));
    g.beginPath(); g.moveTo(s, 0); g.lineTo(-s * 0.6, -s); g.lineTo(-s * 0.6, s); g.closePath();
    g.fillStyle = '#f0c419'; g.strokeStyle = '#1d1a2b'; g.lineWidth = 2;
    g.fill(); g.stroke();
    g.restore();
  }
  function drawBubble(cx, top, text, warn) {
    const font = Math.max(12, Math.min(16, size.w / 32));
    g.font = `600 ${font}px system-ui, sans-serif`;
    const words = String(text).split(' ');
    const maxW = Math.min(size.w * 0.6, 260);
    const lines = [];
    let cur = '';
    for (const w of words) { const t = cur ? `${cur} ${w}` : w; if (g.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
    if (cur) lines.push(cur);
    const bw = Math.max(...lines.map((l) => g.measureText(l).width)) + 16, bh = lines.length * (font + 4) + 10;
    let bx = Math.min(Math.max(cx - bw / 2, 4), size.w - bw - 4);
    let by = top - bh - 10;
    if (by < 4) by = top + 4;
    g.fillStyle = warn ? '#fff1e6' : '#ffffff'; g.strokeStyle = warn ? '#d55e00' : '#1d1a2b'; g.lineWidth = 2;
    g.beginPath(); g.roundRect(bx, by, bw, bh, 8); g.fill(); g.stroke();
    g.fillStyle = '#1d1a2b'; g.textBaseline = 'top';
    lines.forEach((l, k) => g.fillText(l, bx + 8, by + 6 + k * (font + 4)));
  }
  function drawCanvasGrid() {
    const cv = state.canvases[state.canvases.length - 1];
    const L = layout.canvas;
    if (!L) return;
    const { C, ox, oy } = L;
    // Rutigt mönster visar tomma rutor.
    for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) {
      g.fillStyle = (x + y) % 2 ? '#ece9f3' : '#f7f5fb';
      g.fillRect(ox + x * C, oy + y * C, C, C);
    }
    if (target && target.canvas) {
      g.globalAlpha = 0.28;
      target.canvas.px.forEach((row, y) => row.forEach((c, x) => { if (c) { g.fillStyle = colorHex(c); g.fillRect(ox + x * C, oy + y * C, C, C); } }));
      g.globalAlpha = 1;
    }
    if (cv) cv.px.forEach((row, y) => row.forEach((c, x) => { if (c) { g.fillStyle = colorHex(c); g.fillRect(ox + x * C, oy + y * C, C, C); } }));
    if (showGrid || C >= 14) {
      g.strokeStyle = 'rgba(29,26,43,.18)'; g.lineWidth = 1;
      for (let x = 0; x <= L.w; x++) { g.beginPath(); g.moveTo(ox + x * C + 0.5, oy); g.lineTo(ox + x * C + 0.5, oy + L.h * C); g.stroke(); }
      for (let y = 0; y <= L.h; y++) { g.beginPath(); g.moveTo(ox, oy + y * C + 0.5); g.lineTo(ox + L.w * C, oy + y * C + 0.5); g.stroke(); }
    }
  }
  function drawTurtles(p) {
    const s = layout.turtle.s;
    if (showGrid && !state.world && !state.canvases.length) {
      g.strokeStyle = 'rgba(29,26,43,.12)'; g.lineWidth = 1;
      for (let v = -200; v <= 200; v += 50) {
        g.beginPath(); g.moveTo(tx(v), ty(-200)); g.lineTo(tx(v), ty(200)); g.stroke();
        g.beginPath(); g.moveTo(tx(-200), ty(v)); g.lineTo(tx(200), ty(v)); g.stroke();
      }
      g.strokeStyle = 'rgba(29,26,43,.35)';
      g.beginPath(); g.moveTo(tx(0), ty(-200)); g.lineTo(tx(0), ty(200)); g.stroke();
      g.beginPath(); g.moveTo(tx(-200), ty(0)); g.lineTo(tx(200), ty(0)); g.stroke();
    }
    if (target && target.lines) {
      g.globalAlpha = 0.3; g.lineCap = 'round';
      for (const l of target.lines) { g.strokeStyle = colorHex(l.c || 'gray'); g.lineWidth = Math.max(2, (l.w || 1) * s * 2); g.beginPath(); g.moveTo(tx(l.x1), ty(l.y1)); g.lineTo(tx(l.x2), ty(l.y2)); g.stroke(); }
      g.globalAlpha = 1;
    }
    for (const f of state.fills) {
      g.fillStyle = colorHex(f.c); g.beginPath();
      f.pts.forEach(([x, y], k) => (k ? g.lineTo(tx(x), ty(y)) : g.moveTo(tx(x), ty(y))));
      g.closePath(); g.fill();
    }
    g.lineCap = 'round'; g.lineJoin = 'round';
    for (const l of state.lines) { g.strokeStyle = colorHex(l.c); g.lineWidth = Math.max(2, l.w * s * 1.5); g.beginPath(); g.moveTo(tx(l.x1), ty(l.y1)); g.lineTo(tx(l.x2), ty(l.y2)); g.stroke(); }
    for (const d of state.dots) { g.fillStyle = colorHex(d.c); g.beginPath(); g.arc(tx(d.x), ty(d.y), Math.max(1.5, d.s * s / 2), 0, Math.PI * 2); g.fill(); }
    for (const w of state.writes) { g.fillStyle = colorHex(w.c); g.font = `${Math.max(11, 14 * s)}px system-ui, sans-serif`; g.textBaseline = 'bottom'; g.fillText(w.text, tx(w.x), ty(w.y)); }
    state.turtles.forEach((t, id) => {
      if (!t) return;
      let x = t.x, y = t.y, hd = t.h;
      if (p && p.ev.id === id && p.ev.t === 'tmove') {
        x = p.ev.x1 + (p.ev.x2 - p.ev.x1) * p.k; y = p.ev.y1 + (p.ev.y2 - p.ev.y1) * p.k;
        if (p.ev.pen) { g.strokeStyle = colorHex(p.ev.c); g.lineWidth = Math.max(2, p.ev.w * s * 1.5); g.beginPath(); g.moveTo(tx(p.ev.x1), ty(p.ev.y1)); g.lineTo(tx(x), ty(y)); g.stroke(); }
      }
      if (p && p.ev.id === id && p.ev.t === 'tturn') {
        let d = p.ev.h - t.h; if (d > 180) d -= 360; if (d < -180) d += 360;
        hd = t.h + d * p.k;
      }
      if (t.visible) drawTurtleShape(tx(x), ty(y), hd, t.c);
    });
  }
  // Sköldpaddan som en pil, så att riktningen syns.
  function drawTurtleShape(x, y, deg, c) {
    const r = Math.max(9, Math.min(size.w, size.h) / 34);
    g.save(); g.translate(x, y); g.rotate(-deg * Math.PI / 180);
    g.beginPath(); g.moveTo(r, 0); g.lineTo(-r * 0.7, -r * 0.65); g.lineTo(-r * 0.35, 0); g.lineTo(-r * 0.7, r * 0.65); g.closePath();
    g.fillStyle = c === 'white' ? '#999999' : colorHex(c); g.strokeStyle = '#ffffff'; g.lineWidth = 2;
    g.stroke(); g.fill();
    g.restore();
  }

  function render(p = null) {
    if (!alive) return;
    resize();
    computeLayout();
    g.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
    g.fillStyle = state.bg ? colorHex(state.bg) : state.world ? '#3f8a3a' : '#fbfaf6';
    g.fillRect(0, 0, size.w, size.h);
    if (state.world) drawWorld(p);
    else if (layout.canvas) drawCanvasGrid();
    drawTurtles(p);
  }

  // ---------- Uppspelning ----------
  function setLine(line) { if (line !== lastLine) { lastLine = line; onLine(line); } }
  function frame(now) {
    raf = 0;
    if (!alive) return;
    let budget = 400; // fler händelser per bildruta när de går snabbt
    while (playing && budget-- > 0) {
      if (!anim) {
        if (i >= events.length) { finish(); return; }
        const ev = events[i];
        state.bump = null;
        anim = { ev, t0: now, dur: duration(ev) };
        setLine(ev.line);
        if (speed <= 2) announce(describe(ev));
      }
      const k = anim.dur ? (now - anim.t0) / anim.dur : 1;
      if (k >= 1) { apply(anim.ev); i++; anim = null; continue; }
      render({ ev: anim.ev, k });
      raf = requestAnimationFrame(frame);
      return;
    }
    render();
    if (playing) raf = requestAnimationFrame(frame);
  }
  function startLoop() { if (!raf) raf = requestAnimationFrame(frame); }
  function stopLoop() { if (raf) cancelAnimationFrame(raf); raf = 0; }

  function finish() {
    playing = false;
    anim = null;
    stopLoop();
    render();
    updateButtons();
    showGoals();
    const err = result && result.error;
    setLine(err && err.line ? err.line : null);
    announce(summary());
    if (onEnd) onEnd();
  }
  function summary() {
    const parts = [];
    if (state.world) parts.push(`Hjälten står på (${state.world.hero.x}, ${state.world.hero.y}) och tittar ${DIR_SV[state.world.hero.dir]}.`);
    if (state.lines.length) parts.push(`${state.lines.length} streck ritade.`);
    if (result && result.goals && result.goals.length) parts.push(`${result.goals.filter((x) => x.met).length} av ${result.goals.length} mål klara.`);
    if (result && result.error) parts.push(`Fel på rad ${result.error.line ?? '?'}: ${result.error.message}`);
    return parts.join(' ');
  }
  function showGoals() {
    const goals = (result && result.goals) || [];
    goalsEl.hidden = !goals.length;
    goalsEl.innerHTML = goals.map((x) => `<li class="${x.met ? 'met' : 'unmet'}"><span aria-hidden="true">${x.met ? '✓' : '○'}</span> <span class="sr-only">${x.met ? 'Klart:' : 'Inte klart:'}</span> ${esc(x.text)}</li>`).join('')
      + (result && result.otherWorld ? `<li class="unmet other"><span aria-hidden="true">!</span> I startvärld ${result.otherWorld.index} av ${result.worlds} blev det inte rätt${result.otherWorld.error ? `: ${esc(result.otherWorld.error.message)}` : ''}. Koden ska fungera på alla kartor, inte bara den du ser.</li>` : '');
  }
  function updateButtons() {
    const any = events.length > 0 || !!result;
    btnPlay.disabled = !any || (i >= events.length && !playing);
    btnPlay.textContent = playing ? 'Paus' : i > 0 && i < events.length ? 'Fortsätt' : 'Spela';
    btnStep.disabled = !any || i >= events.length;
    btnRestart.disabled = !any;
  }
  function reset() {
    stopLoop();
    state = freshState(level);
    i = 0; anim = null; playing = false; lastLine = null;
    goalsEl.hidden = true;
    onLine(null);
  }

  const api = {
    el,
    /** Ny bana (eller null för fri ritning). Visar startläget. */
    setLevel(lv) { level = lv; result = null; events = []; reset(); render(); updateButtons(); },
    setTarget(t) { target = t; render(); },
    /** Spelar upp en körning. mode: 'play' eller 'step'. */
    load(res, { mode = 'play', onDone } = {}) {
      result = res; events = res.events || []; onEnd = onDone || null;
      reset();
      if (mode === 'step') { render(); updateButtons(); announce('Tryck på Ett steg för att köra nästa rad.'); return; }
      if (reducedMotion() || speed >= 6) { while (i < events.length) apply(events[i++]); finish(); return; }
      playing = true; updateButtons(); startLoop();
    },
    step() {
      if (playing) { playing = false; stopLoop(); }
      if (anim) { apply(anim.ev); i++; anim = null; }
      if (i < events.length) {
        const ev = events[i];
        state.bump = null;
        apply(ev); i++;
        setLine(ev.line);
        announce(describe(ev));
        // Hoppa över händelser som inte syns för sig själva (t.ex. att en sköldpadda skapas).
        while (i < events.length && events[i].line === ev.line && ['turtle', 'canvas', 'tspeed', 'tcolor', 'tpen', 'tbegin'].includes(events[i].t)) apply(events[i++]);
      }
      render();
      if (i >= events.length) finish(); else updateButtons();
    },
    pause() { if (playing) { playing = false; stopLoop(); if (anim) { apply(anim.ev); i++; anim = null; } render(); updateButtons(); } },
    play() { if (i >= events.length) return; playing = true; updateButtons(); startLoop(); },
    restart() { const r = result; if (r) api.load(r, { mode: 'play', onDone: onEnd }); },
    get playing() { return playing; },
    get done() { return i >= events.length; },
    render,
    destroy() { alive = false; stopLoop(); ro && ro.disconnect(); },
  };

  btnPlay.addEventListener('click', () => (playing ? api.pause() : api.play()));
  btnStep.addEventListener('click', () => api.step());
  btnRestart.addEventListener('click', () => api.restart());
  speedInput.addEventListener('input', () => {
    speed = Number(speedInput.value);
    speedInput.setAttribute('aria-valuetext', SPEED_NAMES[speed]);
    if (speed >= 6 && playing) { while (i < events.length) apply(events[i++]); anim = null; finish(); }
  });
  gridInput.addEventListener('change', () => { showGrid = gridInput.checked; render(); });
  // Koordinaten där musen pekar.
  canvas.addEventListener('mousemove', (e) => {
    if (!layout) return;
    const r = canvas.getBoundingClientRect();
    const mx = e.clientX - r.left, my = e.clientY - r.top;
    let text = '';
    if (state.world && layout.world) {
      const { T, ox, oy } = layout.world;
      const x = Math.floor((mx - ox) / T), y = Math.floor((my - oy) / T);
      if (x >= 0 && y >= 0 && x < state.world.w && y < state.world.h) {
        const t = state.world.tiles[y][x];
        const it = state.world.items.find((o) => o.x === x && o.y === y);
        text = `Ruta (${x}, ${y}): ${it ? ITEM_SV[it.item] : { wall: 'vägg', water: 'vatten', door: 'låst dörr', goal: 'mål', floor: 'gräs' }[t]}`;
      }
    } else if (layout.canvas) {
      const { C, ox, oy, w, h: hh } = layout.canvas;
      const x = Math.floor((mx - ox) / C), y = Math.floor((my - oy) / C);
      if (x >= 0 && y >= 0 && x < w && y < hh) text = `Ruta (${x}, ${y})`;
    } else {
      text = `x ${Math.round((mx - layout.turtle.cx) / layout.turtle.s)}, y ${Math.round((layout.turtle.cy - my) / layout.turtle.s)}`;
    }
    readout.textContent = text;
  });
  canvas.addEventListener('mouseleave', () => { readout.textContent = ''; });
  const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(() => { if (!playing) render(); }) : null;
  if (ro) ro.observe(canvas.parentElement);
  updateButtons();
  return api;
}
