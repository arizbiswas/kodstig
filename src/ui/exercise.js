// En övning: flerval, lucka, kod, felsökning eller HTML/CSS med förhandsvisning.
// Obegränsade försök. Efter några försök kan ett lösningsförslag visas.
import { h, esc, on, codeEditor, announce } from './dom.js';
import { grade, show } from '../engine/grade.js';
import { runCode, checkWeb, previewSrcdoc } from '../engine/runner.js';
import { playCorrect } from './media.js';

const TYPE_LABEL = { choice: 'Flerval', fill: 'Fyll i', code: 'Skriv kod', debug: 'Hitta felet', web: 'Bygg' };

export function renderExercise(ex, { lang, saved, solved = false, onChange, onSolved, soundOn = () => true, idPrefix = 'ex' }) {
  const isCode = ex.type === 'code' || ex.type === 'debug';
  const el = h(`<div class="exercise" data-type="${ex.type}">
    <p class="ex-kind">${TYPE_LABEL[ex.type]}</p>
    <div class="ex-prompt">${prompt(ex.prompt)}</div>
    ${ex.type === 'choice' && ex.code ? `<pre class="code-block"><code>${esc(ex.code)}</code></pre>` : ''}
    <div class="ex-input"></div>
    <div class="feedback" role="status" aria-live="polite"></div>
    <div class="ex-actions row gap wrap">
      ${isCode ? '<button class="btn secondary" type="button" data-run>Kör</button>' : ''}
      <button class="btn primary" type="button" data-check>${solved ? 'Kontrollera igen' : 'Kontrollera'}</button>
    </div>
    <div class="solution-slot"></div>
  </div>`);
  const input = el.querySelector('.ex-input');
  const fb = el.querySelector('.feedback');
  let attempts = 0;
  let getAnswer;
  let editor = null;

  if (ex.type === 'choice') {
    const name = `${idPrefix}-choice`;
    input.innerHTML = `<fieldset class="choices"><legend class="sr-only">Välj ett svar</legend>
      ${ex.options.map((o, i) => `<label class="choice"><input type="radio" name="${name}" value="${i}" ${saved === i ? 'checked' : ''}><span>${o.includes('\n') ? `<pre>${esc(o)}</pre>` : esc(o)}</span></label>`).join('')}
    </fieldset>`;
    getAnswer = () => { const s = input.querySelector('input:checked'); return s ? Number(s.value) : null; };
    input.addEventListener('change', () => onChange && onChange(getAnswer()));
  } else if (ex.type === 'fill') {
    let i = 0;
    const parts = esc(ex.code).split('___');
    const html = parts.map((p, k) => (k === 0 ? p : `<input class="blank" data-i="${i}" aria-label="Lucka ${++i}" autocomplete="off" autocapitalize="off" spellcheck="false" size="${Math.max(4, Math.max(...ex.answers[i - 1].map((a) => a.length)) + 1)}">${p}`)).join('');
    input.innerHTML = `<pre class="code-block fill-code"><code>${html}</code></pre>`;
    const blanks = [...input.querySelectorAll('.blank')];
    if (Array.isArray(saved)) blanks.forEach((b, k) => { b.value = saved[k] ?? ''; });
    getAnswer = () => blanks.map((b) => b.value);
    input.addEventListener('input', () => onChange && onChange(getAnswer()));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
  } else if (isCode) {
    editor = codeEditor({ value: typeof saved === 'string' ? saved : ex.starter || '', lang, label: 'Din kod', rows: Math.min(16, Math.max(6, (ex.starter || '').split('\n').length + 3)), onInput: (v) => onChange && onChange(v) });
    input.append(editor.el);
    input.insertAdjacentHTML('beforeend', '<div class="output" hidden><span class="output-label">Utskrift</span><pre></pre></div>');
    getAnswer = () => editor.value;
  } else if (ex.type === 'web') {
    editor = codeEditor({ value: typeof saved === 'string' ? saved : ex.starter || '', lang: 'web', label: 'Din HTML och CSS', rows: 12, onInput: (v) => { onChange && onChange(v); schedulePreview(); } });
    input.classList.add('web-split');
    input.append(editor.el);
    input.insertAdjacentHTML('beforeend', '<div class="preview"><span class="output-label">Förhandsvisning</span><iframe title="Förhandsvisning av din sida" sandbox="" referrerpolicy="no-referrer"></iframe></div>');
    getAnswer = () => editor.value;
  }

  const iframe = el.querySelector('iframe');
  let pt = null;
  const updatePreview = () => { if (iframe) iframe.srcdoc = previewSrcdoc(editor.value); };
  function schedulePreview() { clearTimeout(pt); pt = setTimeout(updatePreview, 300); }
  if (iframe) updatePreview();

  const setFeedback = (res) => {
    fb.className = `feedback ${res.ok ? 'good' : 'bad'}`;
    let html = `<p class="fb-title"><span class="fb-icon" aria-hidden="true">${res.ok ? '✓' : '↻'}</span><strong>${esc(res.title)}</strong></p>`;
    if (res.error) {
      html += `<div class="err"><p><strong>${esc(res.error.kind)}${res.error.line ? ` på rad ${res.error.line}` : ''}:</strong> ${esc(res.error.message)}</p></div>`;
    }
    if (res.tests && res.tests.length) {
      html += `<ul class="tests">${res.tests.map((t) => `<li class="${t.ok ? 'pass' : 'fail'}"><span class="t-icon" aria-hidden="true">${t.ok ? '✓' : '✗'}</span><span class="sr-only">${t.ok ? 'Klar:' : 'Inte klar:'}</span> ${esc(t.label)}${!t.ok && t.expected !== undefined ? `<div class="t-detail"><span>Förväntat: <code>${esc(t.expected)}</code></span><span>Ditt resultat: <code>${esc(t.got === '' ? '(tomt)' : t.got)}</code></span>${t.edge ? `<span class="edge">Gränsfall: ${esc(t.edge)}</span>` : ''}</div>` : ''}</li>`).join('')}</ul>`;
    }
    if (res.detail) html += `<p class="fb-detail">${res.ok ? '<strong>Därför fungerar det:</strong> ' : '<strong>Ledtråd:</strong> '}${prompt(res.detail)}</p>`;
    fb.innerHTML = html;
  };

  const showOutput = (run) => {
    const out = el.querySelector('.output');
    if (!out) return;
    out.hidden = false;
    const pre = out.querySelector('pre');
    pre.textContent = run.output ? run.output.replace(/\n$/, '') : (run.error ? '' : '(ingen utskrift)');
    if (run.error) pre.insertAdjacentHTML('beforeend', `${run.output ? '\n' : ''}<span class="err-inline">${esc(run.error.kind)}${run.error.line ? ` (rad ${run.error.line})` : ''}: ${esc(run.error.message)}</span>`);
  };

  async function check() {
    const answer = getAnswer();
    if (ex.type === 'choice' && answer === null) { fb.className = 'feedback info'; fb.textContent = 'Välj ett svar först.'; return; }
    const btn = el.querySelector('[data-check]');
    btn.disabled = true;
    let res;
    try {
      res = await grade(ex, answer, { lang, runner: runCode, webChecker: checkWeb });
    } finally { btn.disabled = false; }
    if (res.run) showOutput(res.run);
    setFeedback(res);
    announce(res.ok ? 'Rätt svar.' : 'Inte rätt än. Läs ledtråden och försök igen.');
    if (res.ok) {
      if (soundOn()) playCorrect();
      btn.hidden = true;
      el.classList.add('solved');
      onSolved && onSolved();
    } else {
      attempts++;
      if (attempts >= 3) offerSolution();
    }
  }

  function offerSolution() {
    const slot = el.querySelector('.solution-slot');
    if (slot.childElementCount) return;
    let sol = '';
    if (ex.type === 'fill') sol = ex.answers.map((a) => a[0]).join('  ·  ');
    else if (ex.type === 'choice') return;
    else sol = ex.solution || '';
    if (!sol) return;
    slot.innerHTML = `<details class="solution"><summary>Visa ett lösningsförslag</summary>
      <p class="tiny muted">Läs det, stäng det och prova att skriva lösningen själv. Det finns ofta flera sätt som fungerar.</p>
      <pre class="code-block"><code>${esc(sol)}</code></pre></details>`;
  }

  const cleanups = [
    on(el, 'click', '[data-check]', () => check()),
    on(el, 'click', '[data-run]', async (e, b) => {
      b.disabled = true;
      try { showOutput(await runCode(lang, editor.value, [])); } finally { b.disabled = false; }
    }),
  ];
  if (solved) el.classList.add('was-solved');

  return {
    el,
    focus() {
      const t = el.querySelector('.choice input, .blank, textarea');
      if (t) t.focus({ preventScroll: false });
    },
    code: () => (editor ? editor.value : null),
    destroy() { clearTimeout(pt); cleanups.forEach((f) => f()); },
  };
}

function prompt(text) {
  return esc(text).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

export { show };
