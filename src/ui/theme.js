// Temaval: Minecraft (standard) eller Klassisk. Samma app, konto och framsteg.
const KEY = 'kodstig.theme';
export const THEMES = ['minecraft', 'classic'];

export function currentTheme() {
  try { const t = localStorage.getItem(KEY); if (THEMES.includes(t)) return t; } catch { /* ignore */ }
  return 'minecraft';
}
export function applyTheme(t) {
  document.documentElement.dataset.theme = THEMES.includes(t) ? t : 'minecraft';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'classic' ? '#f7f4fd' : '#1f2a1a');
}
export function setTheme(t) {
  try { localStorage.setItem(KEY, t); } catch { /* ignore */ }
  applyTheme(t);
}
