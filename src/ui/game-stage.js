// Spelytan i Pixelvärlden. Tangenterna gäller bara när ytan har fokus, och
// fokusramen syns tydligt. På pekskärm finns pilknappar under ytan.
import { h, announce } from './dom.js';
import { sprite } from './pixel-art.js';
import { colorHex } from '../engine/pixel/core.js';
import { GAME_W, GAME_H } from '../engine/pixel/game.js';
import { createGameRunner } from '../engine/game-runner.js';

const KEYMAP = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', ' ': 'space', Enter: 'enter' };

export function createGameStage({ onError = () => {}, onOutput = () => {}, onState = () => {} } = {}) {
  const el = h(`<div class="game-stage">
    <canvas class="game-canvas" tabindex="0" role="img" aria-label="Spelyta. Klicka här och styr med piltangenterna och mellanslag."></canvas>
    <p class="tiny muted game-help">Klicka på spelytan och styr med piltangenterna. Tangenterna fungerar bara när ytan har en ram runt sig.</p>
    <div class="game-pad" role="group" aria-label="Styrknappar">
      <button class="btn secondary small" type="button" data-key="left" aria-label="Vänster">←</button>
      <button class="btn secondary small" type="button" data-key="up" aria-label="Upp">↑</button>
      <button class="btn secondary small" type="button" data-key="down" aria-label="Ner">↓</button>
      <button class="btn secondary small" type="button" data-key="right" aria-label="Höger">→</button>
      <button class="btn secondary small" type="button" data-key="space">Mellanslag</button>
    </div>
    <div class="row gap"><button class="btn ghost small" type="button" data-game-stop disabled>Stoppa spelet</button></div>
  </div>`);
  const canvas = el.querySelector('canvas');
  const g = canvas.getContext('2d');
  const stopBtn = el.querySelector('[data-game-stop]');
  let C = 24, ops = null;

  function resize() {
    const box = el.getBoundingClientRect();
    C = Math.max(12, Math.min(40, Math.floor((box.width || 480) / GAME_W)));
    const dpr = window.devicePixelRatio || 1;
    canvas.width = GAME_W * C * dpr; canvas.height = GAME_H * C * dpr;
    canvas.style.width = `${GAME_W * C}px`; canvas.style.height = `${GAME_H * C}px`;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function paint() {
    g.imageSmoothingEnabled = false;
    g.fillStyle = '#fbfaf6';
    g.fillRect(0, 0, GAME_W * C, GAME_H * C);
    if (!ops) {
      g.fillStyle = '#1d1a2b'; g.font = `600 ${Math.round(C * 0.7)}px system-ui, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('Tryck på Kör för att starta spelet', (GAME_W * C) / 2, (GAME_H * C) / 2);
      g.textAlign = 'start';
      return;
    }
    for (const o of ops) {
      if (o[0] === 'fill') { g.fillStyle = colorHex(o[1]); g.fillRect(0, 0, GAME_W * C, GAME_H * C); }
      else if (o[0] === 'rect') { g.fillStyle = colorHex(o[5]); g.fillRect(o[1] * C, o[2] * C, o[3] * C, o[4] * C); }
      else if (o[0] === 'sprite') g.drawImage(sprite(o[1]), Math.round(o[2] * C), Math.round(o[3] * C), C, C);
      else if (o[0] === 'text') { g.fillStyle = colorHex(o[4]); g.font = `600 ${Math.round(C * 0.75)}px system-ui, sans-serif`; g.textBaseline = 'top'; g.fillText(o[1], o[2] * C, o[3] * C); }
    }
  }
  const runner = createGameRunner({
    onFrame: (o) => { ops = o; paint(); },
    onError: (e) => { onError(e); announce(`Spelet stoppades: ${e.message}`); },
    onOutput,
    onStop: () => { stopBtn.disabled = true; onState(false); },
  });

  const down = (e) => {
    const k = KEYMAP[e.key] || (/^[a-z]$/i.test(e.key) ? e.key.toLowerCase() : null);
    if (!k) return;
    if (k in KEYMAP || ['left', 'right', 'up', 'down', 'space'].includes(k)) e.preventDefault();
    runner.setKey(k, true);
  };
  const up = (e) => {
    const k = KEYMAP[e.key] || (/^[a-z]$/i.test(e.key) ? e.key.toLowerCase() : null);
    if (k) runner.setKey(k, false);
  };
  canvas.addEventListener('keydown', down);
  canvas.addEventListener('keyup', up);
  canvas.addEventListener('blur', () => runner.clearKeys());
  canvas.addEventListener('pointerdown', () => canvas.focus());
  const pad = el.querySelector('.game-pad');
  const padKey = (e, on) => { const b = e.target.closest('[data-key]'); if (b) { e.preventDefault(); runner.setKey(b.dataset.key, on); } };
  pad.addEventListener('pointerdown', (e) => padKey(e, true));
  for (const t of ['pointerup', 'pointerleave', 'pointercancel']) pad.addEventListener(t, (e) => padKey(e, false));
  stopBtn.addEventListener('click', () => { runner.stop(); announce('Spelet stoppades.'); });
  const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(() => { resize(); paint(); }) : null;
  if (ro) ro.observe(el);
  requestAnimationFrame(() => { resize(); paint(); });

  return {
    el,
    async start(lang, code) {
      ops = null;
      stopBtn.disabled = false;
      onState(true);
      await runner.start(lang, code);
      if (runner.running) { canvas.focus({ preventScroll: true }); announce('Spelet är igång. Styr med piltangenterna.'); }
    },
    stop() { runner.stop(); },
    get running() { return runner.running; },
    destroy() { runner.destroy(); if (ro) ro.disconnect(); },
  };
}
