// Minecraft-temats lilla dekorvärld: himmel som följer dygnet, en kista med
// tips och en höna man kan klicka på. Allt är dekor och kan hoppas över.
import { h, esc, on, reducedMotion } from './dom.js';

const TIPS = [
  'Läs felmeddelandet nerifrån och upp. Radnumret pekar ofta precis på problemet.',
  'Kör koden ofta. Små steg gör det lättare att se vad som ändrades.',
  'Fastnat? Förklara koden högt för dig själv, rad för rad. Det kallas gummianka-felsökning.',
  'Ge variabler namn som säger vad de innehåller, till exempel poang i stället för p.',
  'Det är helt normalt att något inte fungerar första gången. Så ser programmering ut för alla.',
  'Repetera en gammal lektion dagen efter. Då fastnar kunskapen bättre, och du får en liten bonus.',
  'Kopiera inte bara en lösning. Stäng den och skriv den själv, då lär du dig mer.',
  'I Python bestämmer indraget vad som hör ihop. Använd fyra mellanslag.',
  'I C# avslutas de flesta satser med semikolon.',
  'I CSS: väljare, klammer, egenskap, kolon, värde, semikolon.',
];

const px = (rows, colors, size = 1) => rows.flatMap((row, y) => [...row].map((c, x) => (c === '.' ? '' : `<rect x="${x * size}" y="${y * size}" width="${size}" height="${size}" fill="${colors[c]}"/>`))).join('');

const CHEST_COLORS = { k: '#3b2410', b: '#8a5a2b', d: '#a8733b', g: '#2b2b2b', y: '#f2d14b' };
// Locket och lådan ritas var för sig så att locket kan öppnas.
const CHEST_LID = px([
  'kkkkkkkkkkkk',
  'kbbbbbbbbbbk',
  'kbddddddddbk',
  'kbddddddddbk',
  'kkkkkggkkkkk',
], CHEST_COLORS);
const CHEST_BASE = px([
  'kbbbbgybbbbk',
  'kbddddddddbk',
  'kbddddddddbk',
  'kbddddddddbk',
  'kkkkkkkkkkkk',
], CHEST_COLORS).replace(/y="(\d+)"/g, (m, y) => `y="${Number(y) + 5}"`);

const CHICKEN = px([
  '...www..',
  '...wkw..',
  '..owww..',
  '...rww..',
  'wwwwwww.',
  'wwwwwwww',
  '.wwwwww.',
  '..y..y..',
  '..y..y..',
], { w: '#f7f5ef', k: '#222', o: '#f0a020', r: '#d33', y: '#e8a21b' });

const TREE = px([
  '..llll..',
  '.llllll.',
  'llllllll',
  'llllllll',
  '.llllll.',
  '...tt...',
  '...tt...',
  '...tt...',
], { l: '#3f8a2e', t: '#6b4a2b' });

export function isNight(d = new Date()) {
  const hr = d.getHours();
  return hr < 6 || hr >= 20;
}

const BUBBLE_MS = 180;

export function renderWorld() {
  const night = isNight();
  const el = h(`<section class="world ${night ? 'night' : 'day'}" aria-label="Dekorativ värld">
    <div class="sky" aria-hidden="true">
      <span class="sun-moon"></span>
      <span class="cloud c1"></span><span class="cloud c2"></span>
      ${night ? '<span class="stars"></span>' : ''}
    </div>
    <svg class="tree" viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true">${TREE}</svg>
    <button class="chest" type="button" aria-label="Öppna kistan och få ett tips" aria-expanded="false" aria-controls="chest-bubble">
        <svg viewBox="0 0 12 10" shape-rendering="crispEdges" aria-hidden="true"><g class="chest-base">${CHEST_BASE}</g><g class="chest-lid">${CHEST_LID}</g></svg>
    </button>
    <button class="chicken" type="button" aria-label="Klappa hönan" aria-controls="chicken-bubble">
        <svg viewBox="0 0 8 9" shape-rendering="crispEdges" aria-hidden="true">${CHICKEN}</svg>
    </button>
    <div class="ground" aria-hidden="true"></div>
    <p class="bubble-w" id="chest-bubble" role="status" aria-live="polite" hidden></p>
    <p class="bubble-w" id="chicken-bubble" role="status" aria-live="polite" hidden></p>
    <p class="world-time sr-only">${night ? 'Det är natt i världen.' : 'Det är dag i världen.'}</p>
  </section>`);

  const chest = el.querySelector('.chest');
  const chicken = el.querySelector('.chicken');
  const bubbles = { chest: el.querySelector('#chest-bubble'), chicken: el.querySelector('#chicken-bubble') };
  const timers = { chest: null, chicken: null };
  let tipIndex = Math.floor(Math.random() * TIPS.length);
  let clucks = 0;
  let chickenTimer = null;

  // Startar om en CSS-animation på ett element.
  const replay = (node, cls) => {
    node.classList.remove(cls);
    void node.getBoundingClientRect();
    node.classList.add(cls);
  };

  // Placerar bubblan ovanför sin ägare men inom världens kanter, med pilen mot ägaren.
  const place = (key) => {
    const b = bubbles[key];
    const owner = key === 'chest' ? chest : chicken;
    const w = el.getBoundingClientRect();
    const o = owner.getBoundingClientRect();
    const cx = o.left + o.width / 2 - w.left;
    const bw = b.offsetWidth;
    const left = Math.max(8, Math.min(w.width - bw - 8, cx - bw / 2));
    b.style.left = `${left}px`;
    b.style.bottom = `${w.bottom - o.top + 10}px`;
    b.style.setProperty('--tail', `${Math.max(14, Math.min(bw - 14, cx - left))}px`);
  };

  const showBubble = (key, html) => {
    const b = bubbles[key];
    clearTimeout(timers[key]);
    b.innerHTML = html;
    b.hidden = false;
    place(key);
    b.classList.remove('out');
    replay(b, 'in');
  };
  const hideBubble = (key) => {
    const b = bubbles[key];
    if (b.hidden || b.classList.contains('out')) return;
    clearTimeout(timers[key]);
    b.classList.remove('in');
    if (reducedMotion()) { b.hidden = true; } else {
      b.classList.add('out');
      timers[key] = setTimeout(() => { b.hidden = true; b.classList.remove('out'); }, BUBBLE_MS);
    }
    if (key === 'chest') { chest.setAttribute('aria-expanded', 'false'); chest.classList.remove('open'); }
  };
  const hideAll = () => { hideBubble('chest'); hideBubble('chicken'); };

  const offs = [
    on(el, 'click', '.chest', () => {
      if (chest.getAttribute('aria-expanded') === 'true') { hideBubble('chest'); return; }
      hideBubble('chicken');
      tipIndex = (tipIndex + 1) % TIPS.length;
      chest.setAttribute('aria-expanded', 'true');
      chest.classList.add('open');
      if (!reducedMotion()) replay(chest, 'pop');
      showBubble('chest', `<strong>Tips från kistan:</strong> ${esc(TIPS[tipIndex])}`);
    }),
    on(el, 'click', '.chicken', () => {
      clucks++;
      hideBubble('chest');
      if (!reducedMotion()) replay(chicken, 'hop');
      showBubble('chicken', clucks % 7 === 0 ? 'Kluck! Du har klappat hönan sju gånger. Hon tycker om dig.' : ['Kluck!', 'Kluck kluck!', 'Pip?', 'Kluck! 🥚'][clucks % 4]);
      clearTimeout(chickenTimer);
      chickenTimer = setTimeout(() => hideBubble('chicken'), 2200);
    }),
  ];

  // Ett klick var som helst utanför kistan, hönan och pratbubblorna stänger bubblorna.
  const onDocDown = (e) => {
    if (e.target.closest('.chest, .chicken, .bubble-w')) return;
    hideAll();
  };
  const onKey = (e) => {
    if (e.key === 'Escape' && (!bubbles.chest.hidden || !bubbles.chicken.hidden)) {
      const wasChest = !bubbles.chest.hidden;
      hideAll();
      if (wasChest && el.contains(document.activeElement)) chest.focus();
    }
  };
  document.addEventListener('pointerdown', onDocDown);
  document.addEventListener('keydown', onKey);

  return {
    el,
    destroy() {
      clearTimeout(chickenTimer);
      clearTimeout(timers.chest);
      clearTimeout(timers.chicken);
      document.removeEventListener('pointerdown', onDocDown);
      document.removeEventListener('keydown', onKey);
      offs.forEach((f) => f());
    },
  };
}
