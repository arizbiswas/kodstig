// Webbläsartester av huvudflödena (Playwright + Chromium) mot den byggda appen.
// Kör: npm run build && npm run test:e2e
// Milo testas här med den riktiga koden men utan WebGPU (headless Chromium har
// ingen), så modellen laddas aldrig. Riktiga modellsvar testas inte automatiskt.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';
import { LESSON_BY_ID, LESSONS, STATS, TRACKS } from '../../src/content/index.js';

const PORT = 4174;
const DEV_PORT = 4175;
const BASE = `http://localhost:${PORT}/`;
const EXE = process.env.CHROMIUM_PATH || (existsSync('/opt/pw-browsers/chromium-1194/chrome-linux/chrome') ? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' : undefined);

const results = [];
async function check(name, fn) {
  const t = Date.now();
  try { await fn(); results.push({ name, ok: true }); console.log(`✓ ${name} (${Date.now() - t} ms)`); }
  catch (e) { results.push({ name, ok: false, err: e }); console.log(`✗ ${name}\n    ${String(e && e.stack || e).split('\n').slice(0, 4).join('\n    ')}`); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || 'assert'); }
const eq = (a, b, msg) => assert(a === b, `${msg || 'eq'}: förväntade ${JSON.stringify(b)}, fick ${JSON.stringify(a)}`);

function serve(args, port) {
  const p = spawn('npx', ['vite', ...args, '--port', String(port), '--strictPort'], { stdio: 'pipe' });
  return p;
}
async function waitFor(url) {
  for (let i = 0; i < 100; i++) {
    try { const r = await fetch(url); if (r.ok) return; } catch { /* vänta */ }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`servern svarade inte: ${url}`);
}

async function solveExercise(page, ex) {
  const card = page.locator('.exercise-card');
  if (ex.type === 'choice') await card.locator(`.choice input[value="${ex.answer}"]`).check();
  else if (ex.type === 'fill') {
    const blanks = card.locator('.blank');
    for (let k = 0; k < ex.answers.length; k++) await blanks.nth(k).fill(ex.answers[k][0]);
  } else if (ex.type === 'order') {
    for (const line of ex.lines) {
      await card.evaluate((c, l) => [...c.querySelectorAll('.order-pick')].find((b) => b.textContent === (l || '\u00a0')).click(), line);
    }
  } else await card.locator('textarea').fill(ex.solution);
  await card.locator('[data-check]').click();
  await card.locator('.feedback.good').waitFor({ timeout: 8000 });
}

// Knappen kan röra sig medan läskortet glider in, så klicket görs om tills övningen visas.
async function startPractice(page) {
  for (let i = 0; i < 3; i++) {
    await page.locator('[data-start]').click();
    try { await page.locator('.exercise-card').waitFor({ timeout: 1500 }); return; } catch { /* försök igen */ }
  }
  throw new Error('övningen startade inte');
}

async function finishLesson(page, id) {
  const lesson = LESSON_BY_ID.get(id);
  await page.goto(`${BASE}#/lektion/${id}`);
  await startPractice(page);
  for (const ex of lesson.sequence.map((i) => lesson.exercises[i])) {
    // Hoppa över redan lösta (utkast) genom att lösa igen; det är tillåtet.
    await solveExercise(page, ex);
    await page.locator('[data-next]').click();
  }
  await page.locator('dialog.celebrate').waitFor();
}

const xpText = (page) => page.locator('.side-xp').first().textContent();

async function newGuest(browser, opts = {}) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...opts });
  const page = await context.newPage();
  page.errors = [];
  page.on('pageerror', (e) => page.errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) page.errors.push(m.text()); });
  await page.goto(BASE);
  await page.locator('.hero [data-login]').click();
  await page.locator('dialog [data-guest]').click();
  await page.locator('#learn-h').waitFor();
  return { context, page };
}

async function noHorizontalScroll(page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
}

async function main() {
  const preview = serve(['preview'], PORT);
  const dev = serve([], DEV_PORT);
  await waitFor(BASE);
  await waitFor(`http://localhost:${DEV_PORT}/`);
  const browser = await chromium.launch({ executablePath: EXE });
  try {
    // 1. Introduktion och demo
    await check('Introduktion: rubrik och knappar', async () => {
      const page = await browser.newPage();
      await page.goto(BASE);
      const h1 = await page.locator('h1').textContent();
      assert(h1.includes('Din första kodrad.') && h1.includes('Början på något mer.'), h1);
      assert(await page.locator('a:has-text("Prova ett första steg")').isVisible());
      assert(await page.locator('.hero button:has-text("Logga in")').isVisible());
      await page.locator('details.more summary').click();
      assert((await page.locator('details.more').textContent()).includes(`${STATS.lessons} lektioner`));
      await page.close();
    });

    await check('Demo: tre steg utan konto och utan XP', async () => {
      const page = await browser.newPage();
      await page.goto(`${BASE}#/prova`);
      assert((await page.locator('pre').first().textContent()).includes('steg = 1'));
      await page.locator('[data-next]').click();
      await page.locator('input[name="d2"][value="2"]').check();
      await page.locator('[data-check2]').click();
      assert(await page.locator('.feedback.bad').isVisible(), 'fel svar ger ledtråd');
      await page.locator('input[name="d2"][value="0"]').check();
      await page.locator('[data-check2]').click();
      await page.locator('.feedback.good').waitFor();
      await page.locator('[data-next]').click();
      await page.locator('.blank').fill('Print');
      await page.locator('[data-check3]').click();
      assert((await page.locator('.feedback').textContent()).includes('små bokstäver'));
      await page.locator('.blank').fill('print');
      await page.locator('[data-check3]').click();
      eq((await page.locator('.output pre').textContent()).trim(), 'Hej, kodare!');
      await page.locator('[data-next]').click();
      assert(await page.locator('[data-guest]').isVisible());
      const stored = await page.evaluate(() => localStorage.getItem('kodstig.guest.v1'));
      eq(stored, null, 'demon sparar inget');
      await page.close();
    });

    // 2. Inloggning utan konfiguration är ärlig
    await check('Inloggning: ingen låtsasknapp när Supabase saknas', async () => {
      const page = await browser.newPage();
      await page.goto(BASE);
      await page.locator('.hero [data-login]').click();
      const text = await page.locator('dialog').textContent();
      assert(text.includes('inte konfigurerad'), text);
      eq(await page.locator('dialog [data-google]').count(), 0);
      await page.close();
    });

    // 3–4. Lektion, XP, omladdning, ingen dubbel-XP
    await check('Lektion ger XP en gång och sparas efter omladdning', async () => {
      const { context, page } = await newGuest(browser);
      eq((await xpText(page)).trim(), '0 XP');
      await finishLesson(page, 'py-print');
      assert((await page.locator('dialog.celebrate').textContent()).includes('+30 XP'));
      await page.locator('dialog.celebrate [data-secondary]').click();
      eq((await xpText(page)).trim(), '30 XP');
      await page.reload();
      await page.locator('#learn-h').waitFor();
      eq((await xpText(page)).trim(), '30 XP');
      await finishLesson(page, 'py-print');
      assert((await page.locator('dialog.celebrate').textContent()).includes('XP får du bara första gången'));
      await page.keyboard.press('Escape');
      eq((await xpText(page)).trim(), '30 XP', 'ingen dubbel XP');
      eq(page.errors.length, 0, page.errors.join('\n'));
      await context.close();
    });

    await check('Utkast i en övning finns kvar efter omladdning', async () => {
      const { context, page } = await newGuest(browser);
      await page.goto(`${BASE}#/lektion/py-print`);
      await startPractice(page);
      const pp = LESSON_BY_ID.get('py-print');
      for (const i of pp.sequence) {
        if (pp.exercises[i].type === 'fill') break;
        await solveExercise(page, pp.exercises[i]);
        await page.locator('[data-next]').click();
      }
      await page.locator('.blank').fill('pri');
      await page.waitForTimeout(1200);
      await page.reload();
      await page.locator('.exercise-card').waitFor();
      eq(await page.locator('.blank').inputValue(), 'pri');
      await context.close();
    });

    await check('Lektionsövning: ledtrådstrappa steg för steg, lösningen först efter två försök', async () => {
      const { context, page } = await newGuest(browser);
      await page.goto(`${BASE}#/lektion/py-print`);
      await startPractice(page);
      const pp = LESSON_BY_ID.get('py-print');
      for (const i of pp.sequence) {
        if (pp.exercises[i].type === 'code') break;
        await solveExercise(page, pp.exercises[i]);
        await page.locator('[data-next]').click();
      }
      const card = page.locator('.exercise-card');
      await card.locator('textarea').fill('print("Jag heter Milo"\n');
      await card.locator('[data-check]').click();
      await card.locator('.feedback.bad').waitFor();
      assert((await card.locator('.fb-detail').textContent()).startsWith('Ledtråd 1'), 'första ledtråden visas direkt');
      let shown = 0;
      while (await card.locator('[data-ladder-more]').count()) { await card.locator('[data-ladder-more]').click(); shown++; }
      assert(shown >= 2, `minst två ledtrådar till (${shown})`);
      assert(await card.locator('.ladder').textContent().then((t) => t.includes('Försök en gång till')), 'lösningen är låst efter ett försök');
      eq(await card.locator('.ladder-steps .is-solution').count(), 0);
      await card.locator('[data-check]').click();
      await card.locator('[data-ladder-more]').click();
      eq(await card.locator('.ladder-steps .is-solution').count(), 1, 'lösningen visas efter andra försöket');
      eq(page.errors.length, 0, page.errors.join('\n'));
      await context.close();
    });

    await check('Mobil: rad med kodtecken infogar tecken och behåller fokus', async () => {
      const { context, page } = await newGuest(browser, { viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });
      await page.goto(`${BASE}#/labb`);
      const ta = page.locator('.editor textarea').first();
      await ta.fill('');
      await ta.tap();
      const row = page.locator('.key-row').first();
      await row.waitFor();
      await row.locator('.key[aria-label="Parenteser"]').tap();
      eq(await ta.inputValue(), '()');
      eq(await ta.evaluate((t) => t.selectionStart), 1, 'markören hamnar mellan parenteserna');
      eq(await page.evaluate(() => document.activeElement.tagName), 'TEXTAREA', 'fokus stannar i kodfältet');
      assert(await noHorizontalScroll(page), 'raden ger ingen horisontell scroll');
      await context.close();
    });

    await check('Ordningspussel: fel ordning ger ledtråd, pilarna flyttar rader, rätt ordning godkänns', async () => {
      const { context, page } = await newGuest(browser, { viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });
      const pp = LESSON_BY_ID.get('py-print');
      const oi = pp.exercises.findIndex((e) => e.type === 'order');
      const ex = pp.exercises[oi];
      await page.goto(`${BASE}#/lektion/py-print`);
      await startPractice(page);
      for (const i of pp.sequence) {
        if (i === oi) break;
        await solveExercise(page, pp.exercises[i]);
        await page.locator('[data-next]').click();
      }
      const card = page.locator('.exercise-card');
      eq(await card.locator('.ex-kind').textContent(), 'Ordna raderna');
      const pick = (l) => card.evaluate((c, line) => [...c.querySelectorAll('.order-pick')].find((b) => b.textContent === (line || ' ')).click(), l);
      // Rätt rader men de två första i omvänd ordning.
      await pick(ex.lines[1]); await pick(ex.lines[0]);
      for (const l of ex.lines.slice(2)) await pick(l);
      await card.locator('[data-check]').click();
      await card.locator('.feedback.bad').waitFor();
      await card.locator('[data-down="0"]').click();
      eq(await card.locator('.order-answer li .order-line').first().textContent(), ex.lines[0] || ' ', 'raden flyttades ner');
      await card.locator('[data-check]').click();
      await card.locator('.feedback.good').waitFor();
      assert(await noHorizontalScroll(page), 'ingen horisontell scroll');
      eq(page.errors.length, 0, page.errors.join('\n'));
      await context.close();
    });

    await check('Testa ut: fyra av fem rätt låser upp kapitlet efter, utan XP', async () => {
      const { context, page } = await newGuest(browser);
      const py = TRACKS.find((t) => t.id === 'python');
      await page.goto(`${BASE}#/lar?kapitel=${py.chapters[1].id}`);
      await page.locator('.chapter-panel a[href^="#/testa/"]').click();
      await page.locator('[data-quiz-start]').click();
      let n = 0;
      while (!(await page.locator('.quiz-result').count())) {
        const card = page.locator('.quiz .exercise-card');
        await card.waitFor();
        const lesson = LESSON_BY_ID.get(await card.getAttribute('data-lesson'));
        const ex = lesson.exercises[Number(await card.getAttribute('data-i'))];
        if (n === 0 && ex.type === 'choice') {
          await card.locator(`.choice input[value="${ex.answer === 0 ? 1 : 0}"]`).check();
          await card.locator('[data-check]').click();
        } else await solveExercise(page, ex);
        eq(await card.locator('[data-check]').isVisible(), false, 'bara första svaret räknas');
        await card.locator('[data-quiz-next]').click();
        if (++n > 6) throw new Error('testet tog aldrig slut');
      }
      eq(n, 5);
      assert((await page.locator('.quiz-result').textContent()).includes('Godkänt'));
      await page.locator('.quiz-result a.btn.primary').click();
      await page.locator('#learn-h').waitFor();
      eq(await page.locator(`.station[data-ch="${py.chapters[1].id}"].s-skipped`).count(), 1, 'kapitel 2 är uttestat');
      eq(await page.locator(`.station[data-ch="${py.chapters[2].id}"].s-open`).count(), 1, 'kapitel 3 är öppet');
      eq(await page.locator('.next-card h2').textContent(), py.chapters[2].lessons[0].title, 'nästa steg är kapitel 3');
      eq(parseInt(await xpText(page), 10), 0, 'ingen XP för testet');
      eq(page.errors.length, 0, page.errors.join('\n'));
      await context.close();
    });

    await check('Nivåtest: slutar vid första felet och erbjuder att börja där', async () => {
      const { context, page } = await newGuest(browser);
      const py = TRACKS.find((t) => t.id === 'python');
      await page.goto(`${BASE}#/lar`);
      await page.locator('.placement-link a').click();
      await page.locator('[data-quiz-start]').click();
      let n = 0;
      while (!(await page.locator('.quiz-result').count())) {
        const card = page.locator('.quiz .exercise-card');
        await card.waitFor();
        const ex = LESSON_BY_ID.get(await card.getAttribute('data-lesson')).exercises[Number(await card.getAttribute('data-i'))];
        if (n < 2) await solveExercise(page, ex);
        else {
          // Fel svar i kapitel 2: tom ordning, fel lucka eller fel alternativ.
          if (ex.type === 'choice') await card.locator(`.choice input[value="${ex.answer === 0 ? 1 : 0}"]`).check();
          else if (ex.type === 'fill') await card.locator('.blank').first().fill('zzz');
          else await card.evaluate((c) => [...c.querySelectorAll('.order-pick')].reverse().forEach((b) => b.click()));
          await card.locator('[data-check]').click();
        }
        await card.locator('[data-quiz-next]').click();
        if (++n > 4) throw new Error('testet slutade inte vid felet');
      }
      eq(n, 3, 'två rätt i kapitel 1 och ett fel i kapitel 2');
      await page.locator('[data-quiz-primary]').click();
      await page.locator('#learn-h').waitFor();
      eq(await page.locator(`.station[data-ch="${py.chapters[0].id}"].s-skipped`).count(), 1);
      eq(await page.locator('.placement-link').count(), 0, 'nivåtestet erbjuds inte igen');
      eq(page.errors.length, 0, page.errors.join('\n'));
      await context.close();
    });

    await check('Kodlabbet: stegvis körning visar rad, variabler och utskrift', async () => {
      const { context, page } = await newGuest(browser);
      await page.goto(`${BASE}#/labb?sprak=python`);
      const ta = page.locator('.editor textarea').first();
      await ta.fill('summa = 0\nfor i in range(3):\n    summa += i\nprint(summa)\n');
      await page.locator('[data-trace]').click();
      await page.locator('.tracer').waitFor();
      eq(await page.locator('.tracer-code li.cur').textContent(), 'summa = 0');
      await page.keyboard.press('ArrowRight');
      await page.locator('.tracer-controls .btn.primary').click();
      assert((await page.locator('.vars').first().textContent()).includes('summa'), 'variabeltabellen visar summa');
      await page.locator('[aria-label="Till slutet"]').click();
      assert((await page.locator('.tracer-status').textContent()).includes('klart'));
      eq((await page.locator('.tracer .output pre').textContent()).trim(), '3');
      await ta.fill('print(1)\n');
      eq(await page.locator('.tracer').count(), 0, 'ändrad kod stänger steg för steg');
      eq(page.errors.length, 0, page.errors.join('\n'));
      await context.close();
    });

    await check('Repetition: klarad lektion kommer tillbaka dagen efter, passet ger XP en gång', async () => {
      const { context, page } = await newGuest(browser);
      await finishLesson(page, 'py-print');
      await page.keyboard.press('Escape');
      await page.goto(`${BASE}#/lar`);
      eq(await page.locator('.review-card').count(), 0, 'inget att repetera samma dag');
      const xp0 = parseInt(await xpText(page), 10);
      await page.clock.setFixedTime(new Date(Date.now() + 2 * 86400000));
      await page.reload();
      await page.locator('.review-card a[href="#/repetition"]').click();
      let n = 0;
      while (!(await page.locator('.review-done').count())) {
        const card = page.locator('.review .exercise-card');
        const lesson = LESSON_BY_ID.get(await card.getAttribute('data-lesson'));
        const i = Number(await card.getAttribute('data-i'));
        await solveExercise(page, lesson.exercises[i]);
        await page.locator('.review [data-next]').click();
        if (++n > 6) throw new Error('passet tog aldrig slut');
      }
      eq(n, 1, 'en klarad lektion ger en fråga');
      assert((await page.locator('.review-done').textContent()).includes('+10 XP'));
      eq(parseInt(await xpText(page), 10), xp0 + 10);
      await page.goto(`${BASE}#/lar`);
      assert(await page.locator('.review-card.claimed').count(), 'kortet visar klart för i dag');
      await page.goto(`${BASE}#/repetition`);
      assert(!(await page.locator('.review-done').textContent()).includes('XP'), 'ingen XP en gång till');
      eq(page.errors.length, 0, page.errors.join('\n'));
      await context.close();
    });

    // 5. Lärstigen och spårbyte, i båda temana
    await check('Lärstig: kapitel öppnas/stängs, spårbyte stänger, linjen träffar stationerna', async () => {
      const { context, page } = await newGuest(browser);
      for (const theme of ['minecraft', 'classic']) {
        await page.evaluate((t) => { localStorage.setItem('kodstig.theme', t); }, theme);
        await page.goto(`${BASE}#/lar`);
        await page.reload();
        eq(await page.evaluate(() => document.documentElement.dataset.theme), theme);
        eq(await page.locator('.world').count(), theme === 'minecraft' ? 1 : 0, 'världen bara i Minecraft');
        await page.locator('[data-chapter="py1"]').click();
        assert(await page.locator('#chapter-panel').isVisible());
        eq(await page.locator('[data-chapter="py1"]').getAttribute('aria-expanded'), 'true');
        assert(page.url().includes('kapitel=py1'));
        await page.locator('[data-track="web"]').click();
        eq(await page.locator('#chapter-panel').count(), 0, 'spårbyte stänger kapitlet');
        await page.locator('[data-chapter="web2"]').click();
        await page.keyboard.press('Escape');
        eq(await page.locator('#chapter-panel').count(), 0, 'Esc stänger kapitlet');
        for (const width of [1280, 700, 380]) {
          await page.setViewportSize({ width, height: 900 });
          await page.waitForTimeout(250);
          const miss = await page.evaluate(() => {
            const path = document.querySelector('.path-bg');
            const svg = path.ownerSVGElement.getBoundingClientRect();
            const nodes = [...document.querySelectorAll('.station-node')].map((n) => { const r = n.getBoundingClientRect(); return { x: r.left - svg.left + r.width / 2, y: r.top - svg.top + r.height / 2 }; });
            const len = path.getTotalLength();
            let worst = 0;
            for (const n of nodes) {
              let best = Infinity;
              for (let s = 0; s <= len; s += 2) { const p = path.getPointAtLength(s); best = Math.min(best, Math.hypot(p.x - n.x, p.y - n.y)); }
              worst = Math.max(worst, best);
            }
            return worst;
          });
          assert(miss < 3, `linjen missar en station med ${miss.toFixed(1)} px vid ${width} px bredd (${theme})`);
        }
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.locator('[data-track="python"]').click();
      }
      await page.evaluate(() => localStorage.setItem('kodstig.theme', 'minecraft'));
      await context.close();
    });

    await check('Klart kapitel blir grönt och nästa låses upp', async () => {
      const { context, page } = await newGuest(browser);
      for (const id of ['web-headings', 'web-links', 'web-lists', 'web-images']) {
        await finishLesson(page, id);
        await page.keyboard.press('Escape');
      }
      await page.goto(`${BASE}#/lar`);
      await page.locator('[data-track="web"]').click();
      assert(await page.locator('.station[data-ch="web1"]').evaluate((e) => e.classList.contains('s-done')));
      assert(await page.locator('.station[data-ch="web2"]').evaluate((e) => e.classList.contains('s-open')));
      const color = await page.locator('.station[data-ch="web1"] .station-node').evaluate((e) => getComputedStyle(e).backgroundColor);
      assert(/rgb\((6[0-9]|5[0-9]|4[0-9]|3[0-9]), (1[5-9][0-9]|2[0-9]{2}), /.test(color), `grön färg: ${color}`);
      eq((await xpText(page)).trim(), '120 XP');
      await context.close();
    });

    await check('Minecraft-världen: kistan och hönan har bubblor som stängs vid klick utanför', async () => {
      const { context, page } = await newGuest(browser, { viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });
      await page.evaluate(() => localStorage.setItem('kodstig.theme', 'minecraft'));
      await page.goto(`${BASE}#/lar`);
      await page.reload();
      await page.locator('.chest').click();
      const cb = page.locator('#chest-bubble');
      await cb.waitFor({ state: 'visible' });
      assert((await cb.textContent()).includes('Tips från kistan'));
      eq(await page.locator('.chest').getAttribute('aria-expanded'), 'true');
      assert(await noHorizontalScroll(page), 'bubblan ger ingen horisontell scroll');
      await page.locator('.chicken').click();
      await page.locator('#chicken-bubble').waitFor({ state: 'visible' });
      await cb.waitFor({ state: 'hidden' });
      assert(await noHorizontalScroll(page), 'hönans bubbla ger ingen horisontell scroll');
      await page.locator('#learn-h').click();
      await page.locator('#chicken-bubble').waitFor({ state: 'hidden' });
      await page.locator('.chest').click();
      await cb.waitFor({ state: 'visible' });
      await page.mouse.click(5, 400);
      await cb.waitFor({ state: 'hidden' });
      eq(await page.locator('.chest').getAttribute('aria-expanded'), 'false');
      await page.locator('.chest').focus();
      await page.keyboard.press('Enter');
      await cb.waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await cb.waitFor({ state: 'hidden' });
      await context.close();
    });

    // 6. Kodlabbet: fel, ledtrådar, oändlig loop, isolering
    await check('Kodlabbet: fel visas och ledtrådarna börjar om när koden ändras', async () => {
      const { context, page } = await newGuest(browser);
      await page.goto(`${BASE}#/labb`);
      const ta = page.locator('#lab-code');
      await ta.fill('if 3 > 2\n    print("ja")');
      await page.locator('[data-run]').click();
      await page.locator('.result-slot .err').waitFor();
      assert((await page.locator('.result-slot .err').textContent()).includes('rad 1'));
      await page.locator('[data-hint]').click();
      eq(await page.locator('.hints li').count(), 1);
      await page.locator('[data-hint-more]').click();
      await page.locator('[data-hint-more]').click();
      eq(await page.locator('.hints li').count(), 3);
      assert(await page.locator('.hints pre').count() >= 1, 'tredje ledtråden har exempel');
      await ta.press('End');
      await ta.type(' ');
      eq(await page.locator('.hints').count(), 0, 'ledtrådar nollställs vid ändring');
      await ta.fill('while True:\n    x = 1');
      await page.locator('[data-run]').click();
      await page.locator('.result-slot .err').waitFor({ timeout: 9000 });
      assert(/för lång tid|steg/i.test(await page.locator('.result-slot .err').textContent()));
      await page.locator('[data-lang="csharp"]').click();
      await page.locator('#lab-code').fill('int x = 5;\nConsole.WriteLine($"x är {x * 2}");');
      await page.locator('[data-run]').click();
      await page.waitForFunction(() => document.querySelector('.result-slot pre')?.textContent.includes('x är 10'));
      await page.waitForTimeout(1000);
      await page.reload();
      await page.locator('#lab-code').waitFor();
      assert((await page.locator('#lab-code').inputValue()).includes('x * 2'), 'koden sparas per språk');
      await page.locator('[data-lang="python"]').click();
      assert((await page.locator('#lab-code').inputValue()).includes('while True'), 'python-koden sparad separat');
      await context.close();
    });

    await check('Kodlabbet: HTML körs isolerat i sandlåda', async () => {
      const { context, page } = await newGuest(browser);
      await page.goto(`${BASE}#/labb`);
      await page.locator('[data-lang="web"]').click();
      await page.evaluate(() => { window.__hacked = false; });
      await page.locator('#lab-code').fill('<h1 id="t">Hej</h1><script>parent.__hacked = true; document.title = "x"</script><img src=x onerror="parent.__hacked=true">');
      await page.waitForTimeout(700);
      const iframe = page.locator('.result-slot iframe');
      eq(await iframe.getAttribute('sandbox'), '');
      const access = await iframe.evaluate((f) => { try { return f.contentDocument === null ? 'blockerad' : 'öppen'; } catch { return 'blockerad'; } });
      eq(access, 'blockerad');
      eq(await page.evaluate(() => window.__hacked), false);
      const frame = page.frames().find((f) => f !== page.mainFrame());
      eq(await frame.locator('#t').textContent(), 'Hej');
      await context.close();
    });

    // 7. Mobil
    await check('Mobil: ingen horisontell scroll, bottenmeny och Milo-knapp', async () => {
      const { context, page } = await newGuest(browser, { viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true });
      for (const r of ['lar', 'labb', 'ordlista', 'utveckling', 'installningar', 'lektion/py-print']) {
        await page.goto(`${BASE}#/${r}`);
        await page.waitForTimeout(300);
        assert(await noHorizontalScroll(page), `horisontell scroll på ${r}`);
      }
      assert(await page.locator('.bottom-nav').isVisible());
      assert(!(await page.locator('.sidebar').isVisible()));
      await page.locator('.milo-mini').click();
      assert(await page.locator('#milo-panel').isVisible());
      assert(await noHorizontalScroll(page));
      await page.goto(BASE + '#/prova');
      assert(await noHorizontalScroll(page));
      await context.close();
    });

    // 8. Tangentbord och fokus
    await check('Tangentbord: hoppa-länk, fokus på rubrik, Esc i kodfält', async () => {
      const { context, page } = await newGuest(browser);
      await page.goto(`${BASE}#/ordlista`);
      eq(await page.evaluate(() => document.activeElement.id), 'gl-h');
      await page.goto(`${BASE}#/labb`);
      await page.locator('#lab-code').focus();
      await page.keyboard.press('Tab');
      eq(await page.evaluate(() => document.activeElement.id), 'lab-code', 'Tab drar in');
      await page.keyboard.press('Escape');
      await page.keyboard.press('Tab');
      assert(await page.evaluate(() => document.activeElement.id !== 'lab-code'), 'Esc + Tab lämnar kodfältet');
      await page.goto(`${BASE}#/lar`);
      const first = await page.evaluate(() => [...document.querySelectorAll('.shell a[href], .shell button')].find((e) => e.offsetParent !== null || e.classList.contains('skip')).className);
      eq(first, 'skip', 'hoppa-länken är först');
      await page.locator('.skip').focus();
      assert(await page.locator('.skip').isVisible(), 'syns vid fokus');
      await page.keyboard.press('Enter');
      eq(await page.evaluate(() => document.activeElement.id), 'main');
      assert(page.url().endsWith('#/lar'), 'routen ändras inte');
      // Dialoger: Esc stänger och fokus går tillbaka.
      await page.locator('[data-chapter="py1"]').focus();
      await page.keyboard.press('Enter');
      eq(await page.evaluate(() => document.activeElement.id), 'chapter-panel');
      await page.keyboard.press('Escape');
      eq(await page.evaluate(() => document.activeElement.dataset.chapter), 'py1');
      await context.close();
    });

    // 9. Minskad rörelse
    await check('Minskad rörelse: stillbild i firandet och ingen konfetti', async () => {
      const { context, page } = await newGuest(browser, { reducedMotion: 'reduce' });
      await finishLesson(page, 'py-print');
      const media = await page.locator('dialog.celebrate [data-media]').innerHTML();
      assert(!media.includes('level-complete.gif'), 'ingen GIF');
      eq(await page.locator('canvas').count(), 0);
      await context.close();
    });

    // 10. Milo
    await check('Milo: ingen nedladdning förrän Starta, ärligt fel utan WebGPU', async () => {
      const { context, page } = await newGuest(browser);
      const big = [];
      page.on('request', (r) => { if (/huggingface|mlc|\.wasm|lib-.*\.js/.test(r.url())) big.push(r.url()); });
      await page.locator('.milo-launch').click();
      assert((await page.locator('#milo-panel').textContent()).includes('1 GB'));
      eq(big.length, 0, `inget laddades: ${big.join(', ')}`);
      await page.locator('#milo-panel [data-start]').click();
      await page.locator('#milo-panel [role="alert"]').waitFor();
      const msg = await page.locator('#milo-panel [role="alert"]').textContent();
      assert(/WebGPU|grafikkort/.test(msg), msg);
      eq(big.filter((u) => /huggingface|\.wasm/.test(u)).length, 0, 'ingen modell hämtades');
      await page.keyboard.press('Escape');
      eq(await page.locator('#milo-panel').isVisible(), false);
      await context.close();
    });

    await check('Milo (låtsasmodell): svar, kod bara när man väljer, samtalet glöms vid utloggning', async () => {
      const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
      await context.addInitScript(() => {
        window.__miloCalls = [];
        window.__KODSTIG_FAKE_MILO = {
          support: async () => ({ ok: true, model: 'fake' }),
          engineFactory: async ({ onProgress }) => {
            onProgress({ progress: 0.5, text: 'Hämtar (låtsas)' });
            await new Promise((r) => setTimeout(r, 300));
            return {
              async chat(messages) {
                window.__miloCalls.push(messages);
                const text = `Låtsassvar ${window.__miloCalls.length}.`;
                return (async function* () { for (const w of text.split(' ')) { await new Promise((r) => setTimeout(r, 30)); yield w + ' '; } })();
              },
              interrupt() {}, async unload() {},
            };
          },
        };
      });
      const page = await context.newPage();
      const DEV = `http://localhost:${DEV_PORT}/`;
      await page.goto(DEV);
      await page.locator('.hero [data-login]').click();
      await page.locator('dialog [data-guest]').click();
      await page.goto(`${DEV}#/labb`);
      await page.locator('#lab-code').fill('print("hemlig kod")');
      await page.locator('.milo-launch').click();
      await page.locator('#milo-panel [data-start]').click();
      await page.locator('#milo-input').waitFor();
      const attach = page.locator('#milo-attach');
      eq(await attach.isChecked(), false, 'kod bifogas inte som standard');
      await page.locator('#milo-input').fill('Hej Milo');
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.querySelector('#milo-panel .msg.bot:last-child')?.textContent.includes('Låtsassvar 1'));
      let sent = await page.evaluate(() => JSON.stringify(window.__miloCalls[0]));
      assert(!sent.includes('hemlig kod'), 'koden skickades inte');
      await page.locator('#milo-input').fill('Vad gör koden?');
      await page.locator('#milo-attach').check();
      await page.locator('#milo-panel [type="submit"]').click();
      await page.waitForFunction(() => document.querySelector('#milo-panel .msg.bot:last-child')?.textContent.includes('Låtsassvar 2'));
      sent = await page.evaluate(() => JSON.stringify(window.__miloCalls[1]));
      assert(sent.includes('hemlig kod'), 'koden skickades när den valdes');
      assert(await page.locator('#milo-panel .tag:has-text("Kod bifogad")').count() === 1);
      await page.goto(`${DEV}#/installningar`);
      await page.locator('[data-logout]').click();
      await page.locator('.hero').waitFor();
      const keys = await page.evaluate(() => Object.keys(sessionStorage).filter((k) => k.startsWith('kodstig.milo')));
      eq(keys.length, 0, 'samtalet rensat');
      await context.close();
    });

    // 11. Nollställning, flera flikar
    await check('Flera flikar: framsteg delas, och nollställning vinner över gammal flik', async () => {
      const { context, page } = await newGuest(browser);
      const other = await context.newPage();
      await other.goto(`${BASE}#/lar`);
      await other.locator('#learn-h').waitFor();
      await finishLesson(page, 'py-print');
      await page.keyboard.press('Escape');
      await other.waitForFunction(() => document.querySelector('.side-xp')?.textContent.trim() === '30 XP', null, { timeout: 5000 });
      await page.goto(`${BASE}#/installningar`);
      await page.locator('[data-reset]').click();
      const submit = page.locator('dialog [type="submit"]');
      assert(await submit.isDisabled(), 'kräver bekräftelseord');
      await page.locator('#reset-word').fill('nollställ');
      await submit.click();
      await page.locator('#learn-h').waitFor();
      eq((await xpText(page)).trim(), '0 XP');
      // Den gamla fliken gör en ändring; den får inte återställa framstegen.
      await other.goto(`${BASE}#/installningar`);
      await other.locator('#set-name').fill('Gammal flik');
      await other.locator('[data-name-form] button').click();
      await other.waitForTimeout(1500);
      await page.reload();
      await page.locator('#learn-h').waitFor();
      eq((await xpText(page)).trim(), '0 XP', 'gamla fliken återställde inget');
      eq((await xpText(other)).trim(), '0 XP');
      await context.close();
    });

    // 12. Alla HTML/CSS-lösningar klarar sina kontroller i en riktig webbläsare
    await check('Innehåll: alla HTML/CSS-lösningar klarar kontrollerna i webbläsaren', async () => {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${DEV_PORT}/`);
      const items = LESSONS.filter((l) => l.lang === 'web').flatMap((l) => l.exercises.map((ex, i) => ({ id: `${l.id}#${i}`, ex })).filter((x) => x.ex.type === 'web'));
      const fails = await page.evaluate(async (list) => {
        const { checkWeb } = await import('/src/engine/runner.js');
        const out = [];
        for (const { id, ex } of list) {
          const good = checkWeb(ex, ex.solution);
          if (!good.ok) out.push(`${id}: lösningen underkänns`);
          const bad = checkWeb(ex, ex.starter || '');
          if (bad.ok) out.push(`${id}: startkoden godkänns redan`);
        }
        return out;
      }, items.map((x) => ({ id: x.id, ex: JSON.parse(JSON.stringify(x.ex, (k, v) => (v instanceof RegExp ? v.source : v))) })));
      eq(fails.length, 0, fails.join('\n'));
      console.log(`    (${items.length} HTML/CSS-övningar kontrollerade)`);
      await page.close();
    });
  } finally {
    await browser.close();
    preview.kill();
    dev.kill();
  }
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length} av ${results.length} flöden klarade.`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
