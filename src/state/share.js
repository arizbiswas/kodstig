// Dela kod med en länk. Koden packas ihop och läggs i själva länken (efter #),
// så den skickas aldrig till någon server och inget sparas hos Kodstig.
export const SHARE_LANGS = { python: 'Python', csharp: 'C#', web: 'HTML/CSS' };
export const MAX_SHARE_CHARS = 8000;

const toB64 = (bytes) => {
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const fromB64 = (str) => {
  const s = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(s, (c) => c.charCodeAt(0));
};

async function pipe(bytes, stream) {
  const out = new Blob([bytes]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(out).arrayBuffer());
}

/** Packar koden. "z" = komprimerad, "u" = bara kodad (äldre webbläsare). */
export async function encodeCode(code) {
  const bytes = new TextEncoder().encode(code);
  if (typeof CompressionStream === 'function') {
    try { return `z${toB64(await pipe(bytes, new CompressionStream('deflate-raw')))}`; } catch { /* faller tillbaka */ }
  }
  return `u${toB64(bytes)}`;
}

export async function decodeCode(packed) {
  const kind = packed[0];
  const bytes = fromB64(packed.slice(1));
  if (kind === 'u') return new TextDecoder().decode(bytes);
  if (kind === 'z') {
    if (typeof DecompressionStream !== 'function') throw new Error('Webbläsaren kan inte packa upp länken.');
    return new TextDecoder().decode(await pipe(bytes, new DecompressionStream('deflate-raw')));
  }
  throw new Error('Länken är trasig.');
}

export async function shareUrl(lang, code, base = `${location.origin}${location.pathname}`) {
  if (!SHARE_LANGS[lang]) throw new Error('Okänt språk.');
  if (code.length > MAX_SHARE_CHARS) throw new Error(`Koden är för lång för en länk. Högst ${MAX_SHARE_CHARS} tecken går att dela.`);
  return `${base}#/delat?sprak=${lang}&kod=${await encodeCode(code)}`;
}

/** Läser en delad länk. Ger { lang, code } eller { error }. */
export async function readShared(params) {
  const lang = params.sprak;
  if (!SHARE_LANGS[lang] || !params.kod) return { error: 'Länken är ofullständig. Be den som delade den att kopiera hela länken.' };
  try {
    const code = await decodeCode(params.kod);
    if (code.length > MAX_SHARE_CHARS) return { error: 'Koden i länken är för lång.' };
    return { lang, code };
  } catch {
    return { error: 'Länken är trasig. Be den som delade den att kopiera hela länken.' };
  }
}
