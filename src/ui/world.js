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

const CHEST = px([
  'kkkkkkkkkkkk',
  'kbbbbbbbbbbk',
  'kbddddddddbk',
  'kbddddddddbk',
  'kkkkkggkkkkk',
  'kbbbbgybbbbk',
  'kbddddddddbk',
  'kbddddddddbk',
  'kbddddddddbk',
  'kkkkkkkkkkkk',
], { k: '#3b2410', b: '#8a5a2b', d: '#a8733b', g: '#2b2b2b', y: '#f2d14b' });

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

export function renderWorld() {
  const night = isNight();
  const el = h(`<section class="world ${night ? 'night' : 'day'}" aria-label="Dekorativ värld">
    <div class="sky" aria-hidden="true">
      <span class="sun-moon"></span>
      <span class="cloud c1"></span><span class="cloud c2"></span>
      ${night ? '<span class="stars"></span>' : ''}
    </div>
    <svg class="tree" viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true">${TREE}</svg>
    <button class="chest" type="button" aria-label="Öppna kistan och få ett tips" aria-expanded="false">
      <svg viewBox="0 0 12 10" shape-rendering="crispEdges" aria-hidden="true">${CHEST}</svg>
    </button>
    <button class="chicken" type="button" aria-label="Klappa hönan">
      <svg viewBox="0 0 8 9" shape-rendering="crispEdges" aria-hidden="true">${CHICKEN}</svg>
    </button>
    <div class="ground" aria-hidden="true"></div>
    <p class="world-tip" role="status" aria-live="polite" hidden></p>
    <p class="world-time sr-only">${night ? 'Det är natt i världen.' : 'Det är dag i världen.'}</p>
  </section>`);

  const tipEl = el.querySelector('.world-tip');
  const chest = el.querySelector('.chest');
  let tipIndex = Math.floor(Math.random() * TIPS.length);
  let clucks = 0;
  let hideTimer = null;

  const offs = [
    on(el, 'click', '.chest', () => {
      const open = chest.getAttribute('aria-expanded') === 'true';
      if (open) {
        chest.setAttribute('aria-expanded', 'false');
        chest.classList.remove('open');
        tipEl.hidden = true;
        return;
      }
      tipIndex = (tipIndex + 1) % TIPS.length;
      chest.setAttribute('aria-expanded', 'true');
      chest.classList.add('open');
      tipEl.hidden = false;
      tipEl.innerHTML = `<strong>Tips från kistan:</strong> ${esc(TIPS[tipIndex])}`;
    }),
    on(el, 'click', '.chicken', (e, b) => {
      clucks++;
      if (!reducedMotion()) {
        b.classList.remove('hop');
        void b.offsetWidth;
        b.classList.add('hop');
      }
      tipEl.hidden = false;
      tipEl.textContent = clucks === 7 ? 'Kluck! Du har klappat hönan sju gånger. Hon tycker om dig.' : 'Kluck!';
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => { if (chest.getAttribute('aria-expanded') !== 'true') tipEl.hidden = true; }, 1800);
    }),
  ];
  return { el, destroy() { clearTimeout(hideTimer); offs.forEach((f) => f()); } };
}
