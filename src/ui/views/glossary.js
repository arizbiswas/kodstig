// Ordlista: sökbar lista över begrepp med korta förklaringar och exempel.
import { h, esc, on } from '../dom.js';
import { GLOSSARY } from '../../content/glossary.js';

const LANG_NAME = { python: 'Python', csharp: 'C#', web: 'HTML/CSS', all: 'Alla språk' };

const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function render() {
  const terms = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, 'sv'));
  const el = h(`<section class="page glossary" aria-labelledby="gl-h">
    <header class="page-head"><h1 id="gl-h">Ordlista</h1><p class="muted">Ord och begrepp som dyker upp i lektionerna.</p></header>
    <div class="search-row">
      <label for="gl-search" class="sr-only">Sök i ordlistan</label>
      <input id="gl-search" type="search" placeholder="Sök, till exempel variabel eller loop" autocomplete="off">
      <div class="filter" role="group" aria-label="Filtrera på språk">
        ${['alla', 'python', 'csharp', 'web'].map((k) => `<button class="chip" type="button" data-filter="${k}" aria-pressed="${k === 'alla'}">${k === 'alla' ? 'Alla' : LANG_NAME[k]}</button>`).join('')}
      </div>
    </div>
    <p class="gl-count tiny muted" role="status" aria-live="polite"></p>
    <dl class="terms"></dl>
  </section>`);
  const list = el.querySelector('.terms');
  const count = el.querySelector('.gl-count');
  const input = el.querySelector('#gl-search');
  let filter = 'alla';

  const draw = () => {
    const q = fold(input.value.trim());
    const hits = terms.filter((t) => (filter === 'alla' || t.lang === filter || t.lang === 'all')
      && (!q || fold(t.term).includes(q) || fold(t.text).includes(q)));
    list.innerHTML = hits.map((t) => `<div class="term card">
      <dt>${esc(t.term)} <span class="tag">${esc(LANG_NAME[t.lang] || '')}</span></dt>
      <dd><p>${esc(t.text)}</p>${t.example ? `<pre class="code-block small"><code>${esc(t.example)}</code></pre>` : ''}</dd>
    </div>`).join('') || '<p class="muted">Inga ord matchar. Prova ett kortare sökord.</p>';
    count.textContent = `${hits.length} ${hits.length === 1 ? 'begrepp' : 'begrepp'}`;
  };

  const offs = [
    on(el, 'input', '#gl-search', draw),
    on(el, 'click', '[data-filter]', (e, b) => {
      filter = b.dataset.filter;
      el.querySelectorAll('[data-filter]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      draw();
    }),
  ];
  draw();
  return { el, destroy: () => offs.forEach((f) => f()) };
}
