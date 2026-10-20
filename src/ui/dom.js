// Små DOM-hjälpare. All text som kommer från användare eller innehåll escapas.

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Enkel formatering av lektionstext: stycken, `kod` och **fetstil**.
export function rich(text) {
  return String(text || '').split(/\n\n+/).map((para) => {
    const parts = para.split(/(`[^`]+`)/g).map((p) => {
      if (p.startsWith('`') && p.endsWith('`') && p.length > 1) return `<code>${esc(p.slice(1, -1))}</code>`;
      return esc(p).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    });
    return `<p>${parts.join('')}</p>`;
  }).join('');
}

export function h(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export function qs(root, sel) { return root.querySelector(sel); }
export function qsa(root, sel) { return [...root.querySelectorAll(sel)]; }

export function on(root, type, selector, fn) {
  const handler = (e) => {
    const t = e.target.closest(selector);
    if (t && root.contains(t)) fn(e, t);
  };
  root.addEventListener(type, handler);
  return () => root.removeEventListener(type, handler);
}

export const reducedMotion = () => {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
};

export function announce(text) {
  const live = document.getElementById('live');
  if (!live) return;
  live.textContent = '';
  setTimeout(() => { live.textContent = text; }, 30);
}

// Kodfält: en textarea med Tab-indrag och radnummer.
export function codeEditor({ value = '', lang = 'python', label = 'Kod', onInput, rows = 10, id }) {
  const wrap = h(`<div class="editor" data-lang="${esc(lang)}">
    <div class="editor-lines" aria-hidden="true"></div>
    <textarea class="editor-input" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" rows="${rows}" aria-label="${esc(label)}" ${id ? `id="${esc(id)}"` : ''}></textarea>
  </div>`);
  const ta = wrap.querySelector('textarea');
  const lines = wrap.querySelector('.editor-lines');
  ta.value = value;
  const indent = lang === 'web' ? '  ' : '    ';
  const syncLines = () => {
    const n = ta.value.split('\n').length;
    lines.textContent = Array.from({ length: n }, (_, i) => i + 1).join('\n');
    lines.scrollTop = ta.scrollTop;
  };
  ta.addEventListener('scroll', () => { lines.scrollTop = ta.scrollTop; });
  ta.addEventListener('input', () => { syncLines(); onInput && onInput(ta.value); });
  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      // Esc följt av Tab lämnar fältet, så tangentbordsanvändare fastnar inte.
      if (wrap.dataset.escaped === '1') { wrap.dataset.escaped = '0'; return; }
      e.preventDefault();
      const { selectionStart: s, selectionEnd: en } = ta;
      ta.setRangeText(indent, s, en, 'end');
      ta.dispatchEvent(new Event('input'));
    } else if (e.key === 'Escape') {
      wrap.dataset.escaped = '1';
    } else if (e.key === 'Enter' && !e.shiftKey) {
      const s = ta.selectionStart;
      const lineStart = ta.value.lastIndexOf('\n', s - 1) + 1;
      const cur = ta.value.slice(lineStart, s);
      let ws = (cur.match(/^[ \t]*/) || [''])[0];
      if (/[:{]\s*$/.test(cur)) ws += indent;
      if (ws) { e.preventDefault(); ta.setRangeText('\n' + ws, s, ta.selectionEnd, 'end'); ta.dispatchEvent(new Event('input')); }
    } else {
      wrap.dataset.escaped = '0';
    }
  });
  syncLines();
  return {
    el: wrap,
    textarea: ta,
    get value() { return ta.value; },
    set value(v) { ta.value = v; syncLines(); },
  };
}

// Dialog med fokushantering. Fokus återgår till det som var fokuserat innan.
export function openDialog({ title, body, className = '', onClose, labelledBy, dismissible = true }) {
  const prev = document.activeElement;
  const dlg = h(`<dialog class="dialog ${esc(className)}" aria-labelledby="dlg-title">
    <div class="dialog-inner">
      ${title ? `<header class="dialog-head"><h2 id="dlg-title">${esc(title)}</h2>${dismissible ? '<button class="icon-btn" data-close aria-label="Stäng">✕</button>' : ''}</header>` : ''}
      <div class="dialog-body"></div>
    </div>
  </dialog>`);
  if (labelledBy) dlg.setAttribute('aria-labelledby', labelledBy);
  const bodyEl = dlg.querySelector('.dialog-body');
  if (typeof body === 'string') bodyEl.innerHTML = body; else if (body) bodyEl.append(body);
  document.body.append(dlg);
  let closed = false;
  const close = (reason) => {
    if (closed) return;
    closed = true;
    try { dlg.close(); } catch { /* redan stängd */ }
    dlg.remove();
    onClose && onClose(reason);
    if (prev && prev.isConnected && typeof prev.focus === 'function') prev.focus();
  };
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); if (dismissible) close('escape'); });
  dlg.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) close('button');
    else if (e.target === dlg && dismissible) close('backdrop');
  });
  dlg.showModal();
  const first = dlg.querySelector('[autofocus]') || dlg.querySelector('.dialog-body button, .dialog-body input, .dialog-body a, .dialog-body [tabindex="0"]') || dlg.querySelector('[data-close]');
  if (first) first.focus();
  return { el: dlg, body: bodyEl, close };
}

export function toast(text, kind = 'info') {
  const host = document.getElementById('toasts');
  if (!host) return;
  const t = h(`<div class="toast toast-${esc(kind)}" role="status">${esc(text)}</div>`);
  host.append(t);
  setTimeout(() => t.classList.add('out'), 3200);
  setTimeout(() => t.remove(), 3700);
}
