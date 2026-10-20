// Kontroller för HTML/CSS-övningar. Elevens HTML tolkas med DOMParser i ett
// inert dokument: inga skript körs och inget kopplas till appens sida.

export function parseCss(text) {
  const rules = [];
  const src = text.replace(/\/\*[\s\S]*?\*\//g, '');
  let i = 0;
  const readBlock = (media) => {
    while (i < src.length) {
      const open = src.indexOf('{', i);
      const close = src.indexOf('}', i);
      if (close !== -1 && (open === -1 || close < open)) { i = close + 1; return; }
      if (open === -1) { i = src.length; return; }
      const head = src.slice(i, open).trim();
      i = open + 1;
      if (head.startsWith('@media')) { readBlock(head.slice(6).trim()); continue; }
      const end = src.indexOf('}', i);
      const body = src.slice(i, end === -1 ? src.length : end);
      i = end === -1 ? src.length : end + 1;
      const decls = {};
      body.split(';').forEach((d) => {
        const k = d.indexOf(':');
        if (k > 0) decls[d.slice(0, k).trim().toLowerCase()] = d.slice(k + 1).trim();
      });
      rules.push({ selectors: head.split(',').map((s) => s.trim().replace(/\s+/g, ' ')), decls, media });
    }
  };
  readBlock(null);
  return rules;
}

export function cssBalance(text) {
  const src = text.replace(/\/\*[\s\S]*?\*\//g, '');
  let d = 0;
  for (const c of src) { if (c === '{') d++; else if (c === '}') { d--; if (d < 0) return -1; } }
  return d;
}

export function styleText(html) {
  const out = [];
  const re = /<style[^>]*>([\s\S]*?)(<\/style>|$)/gi;
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out.join('\n');
}

function ruleMatches(rule, sel) {
  return rule.selectors.some((s) => s === sel);
}

// Egenskapsnamnet kan vara ett mönster, t.ex. "background(-color)?".
function propValue(decls, prop) {
  if (decls[prop] !== undefined) return decls[prop];
  if (!/[()?|*+[\]]/.test(prop)) return undefined;
  const re = new RegExp(`^(?:${prop})$`);
  const key = Object.keys(decls).find((k) => re.test(k));
  return key === undefined ? undefined : decls[key];
}
const declOk = (r, c) => {
  if (!c.prop) return true;
  const v = propValue(r.decls, c.prop);
  return v !== undefined && (!c.re || new RegExp(c.re, 'i').test(v));
};

export function runWebChecks(ex, html, parse) {
  const doc = parse(html);
  const css = styleText(html);
  const rules = parseCss(css);
  const tests = (ex.checks || []).map((c) => {
    let ok = false;
    try {
      if (c.q && c.attr) {
        const els = [...doc.querySelectorAll(c.q)];
        ok = els.length > 0 && els.every((el) => el.hasAttribute(c.attr) && (!c.re || new RegExp(c.re, 'i').test(el.getAttribute(c.attr) || '')));
      } else if (c.q && c.text) {
        const els = [...doc.querySelectorAll(c.q)];
        ok = els.some((el) => new RegExp(c.text, 'i').test(el.textContent.trim()));
      } else if (c.q) {
        const n = doc.querySelectorAll(c.q).length;
        ok = n >= (c.min ?? 1) && (c.max === undefined || n <= c.max);
      } else if (c.css) {
        ok = rules.some((r) => ruleMatches(r, c.css) && declOk(r, c) && (!c.inMedia || r.media));
      } else if (c.prop) {
        ok = rules.some((r) => declOk(r, c) && (!c.inMedia || r.media));
      } else if (c.media) {
        ok = rules.some((r) => r.media && (!c.re || new RegExp(c.re, 'i').test(r.media)));
      } else if (c.labels) {
        const fields = [...doc.querySelectorAll('input, select, textarea')].filter((el) => !['submit', 'hidden', 'button', 'reset'].includes((el.getAttribute('type') || '').toLowerCase()));
        ok = fields.length > 0 && fields.every((el) => {
          const id = el.getAttribute('id');
          return (id && doc.querySelector(`label[for="${CSS.escape ? CSS.escape(id) : id}"]`)) || el.closest('label') || el.hasAttribute('aria-label');
        });
      } else if (c.balanced) {
        ok = cssBalance(css) === 0;
      } else if (c.source) {
        ok = new RegExp(c.source, c.flags || 'i').test(html);
      }
      if (c.invert) ok = !ok;
    } catch { ok = false; }
    return { label: c.msg, ok };
  });
  const failed = tests.filter((t) => !t.ok);
  if (!failed.length) return { ok: true, title: 'Alla krav uppfyllda!', detail: ex.explain, tests };
  return { ok: false, title: `${tests.length - failed.length} av ${tests.length} krav uppfyllda.`, detail: ex.hint, tests };
}

// Byggs in i förhandsvisningens iframe (sandbox utan allow-same-origin).
export function previewDoc(html, theme = 'light') {
  const base = `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data: https:; font-src https: data:">
<style>body{font-family:system-ui,sans-serif;margin:12px;color:#1f1d2b;background:${theme === 'dark' ? '#fff' : '#fff'}}</style>`;
  return `<!doctype html><html lang="sv"><head>${base}</head><body>${html}</body></html>`;
}
