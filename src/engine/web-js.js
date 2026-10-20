// Lite JavaScript i elevens webbsida. Sidan körs i en iframe med sandbox="allow-scripts"
// men utan allow-same-origin, så den får ett eget, tomt ursprung: den kommer inte åt
// Kodstigs sida, konto eller lagring. CSP stoppar allt nätverk och alla externa skript.
// Loopar får ett skydd som stoppar dem efter väldigt många varv, så att en loop som
// aldrig slutar inte låser hela appen.

export const LOOP_LIMIT = 1000000;
const CSP = "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data: https:; font-src https: data:";
const GUARD = `if(++__kl>${LOOP_LIMIT})throw new Error('En loop körde för många varv och stoppades. Kanske en loop som aldrig slutar?');`;

export const hasScript = (html) => /<script\b/i.test(html);

/** Lägger in loopskyddet efter varje for-, while- och do-huvud med klammer. */
export function protectLoops(js) {
  let out = '';
  let i = 0;
  const n = js.length;
  while (i < n) {
    const c = js[i];
    // Hoppa över strängar och kommentarer så att de inte ändras.
    if (c === '"' || c === "'" || c === '`') {
      let j = i + 1;
      while (j < n && js[j] !== c) j += js[j] === '\\' ? 2 : 1;
      out += js.slice(i, j + 1); i = j + 1; continue;
    }
    if (c === '/' && js[i + 1] === '/') { const j = js.indexOf('\n', i); const e = j < 0 ? n : j; out += js.slice(i, e); i = e; continue; }
    if (c === '/' && js[i + 1] === '*') { const j = js.indexOf('*/', i + 2); const e = j < 0 ? n : j + 2; out += js.slice(i, e); i = e; continue; }
    const m = /^(for|while)\b\s*\(/.exec(js.slice(i, i + 12));
    if (m && !/[\w$.]/.test(js[i - 1] || '')) {
      // Hitta parentesen som stänger loophuvudet.
      let j = i + m[0].length, depth = 1;
      while (j < n && depth) { if (js[j] === '(') depth++; else if (js[j] === ')') depth--; j++; }
      let k = j;
      while (k < n && /\s/.test(js[k])) k++;
      if (js[k] === '{') { out += `${js.slice(i, k + 1)}${GUARD}`; i = k + 1; continue; }
      out += js.slice(i, j); i = j; continue;
    }
    const d = /^do\s*\{/.exec(js.slice(i, i + 8));
    if (d && !/[\w$.]/.test(js[i - 1] || '')) { out += `${d[0]}${GUARD}`; i += d[0].length; continue; }
    out += c; i++;
  }
  return out;
}

function protectHtml(html) {
  return html.replace(/(<script\b[^>]*>)([\s\S]*?)(<\/script>)/gi, (all, open, body, close) => (/\bsrc\s*=/i.test(open) ? '' : `${open}${protectLoops(body)}${close}`));
}

const PRELUDE = `<script>var __kl=0;window.__kodstigErr=[];window.addEventListener('error',function(e){window.__kodstigErr.push(String(e.message||'okänt fel').replace(/^Uncaught /,''))});</script>`;

/** srcdoc för en sida där skript får köra. */
export function scriptSrcdoc(html, extra = '') {
  return `<!doctype html><html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="${CSP}">${PRELUDE}<style>html{background:#fff;color:#1f1d2b}body{font-family:system-ui,sans-serif;margin:12px}</style></head><body>${protectHtml(html)}${extra}</body></html>`;
}

// Körs sist i sidan: gör det övningen säger (klick, skriv i fält) och skickar
// sedan tillbaka hur sidan ser ut. Föräldern litar bara på svar från sin egen iframe.
function reporter(nonce, actions) {
  return `<script>(function(){var acts=${JSON.stringify(actions || []).replace(/</g, '\\u003c')};
function done(){parent.postMessage({kodstig:${JSON.stringify(nonce)},html:document.documentElement.outerHTML,errors:window.__kodstigErr},'*')}
function run(i){if(i>=acts.length){setTimeout(done,40);return}var a=acts[i];try{var el=document.querySelector(a.q);
if(!el){window.__kodstigErr.push('Hittar inget element som matchar '+a.q+'.')}else if(a.value!==undefined){el.value=a.value;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}))}else{el.click()}}catch(e){window.__kodstigErr.push(String(e&&e.message||e))}
setTimeout(function(){run(i+1)},15)}
if(document.readyState==='complete')run(0);else addEventListener('load',function(){run(0)})})();</script>`;
}

/** Kör sidan i en dold iframe och returnerar { html, errors } efter övningens handlingar. */
export function runPage(html, actions = [], timeoutMs = 3000) {
  return new Promise((resolve) => {
    const nonce = `k${Math.random().toString(36).slice(2)}`;
    const frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    frame.style.cssText = 'position:fixed;left:-9999px;top:0;width:400px;height:300px;border:0;visibility:hidden';
    const finish = (res) => { clearTimeout(timer); window.removeEventListener('message', onMsg); frame.remove(); resolve(res); };
    const onMsg = (e) => {
      if (e.source !== frame.contentWindow || !e.data || e.data.kodstig !== nonce) return;
      finish({ html: String(e.data.html || ''), errors: Array.isArray(e.data.errors) ? e.data.errors.map(String).slice(0, 5) : [] });
    };
    const timer = setTimeout(() => finish({ html: '', errors: ['Sidan blev aldrig klar. Kanske en loop som aldrig slutar?'], timeout: true }), timeoutMs);
    window.addEventListener('message', onMsg);
    frame.srcdoc = scriptSrcdoc(html, reporter(nonce, actions));
    document.body.append(frame);
  });
}
