// Temaval: Klassisk (standard) eller Minecraft. Samma app, konto och framsteg.
const KEY = 'kodstig.theme';
export const THEMES = ['classic', 'minecraft'];

export function currentTheme() {
  try { const t = localStorage.getItem(KEY); if (THEMES.includes(t)) return t; } catch { /* ignore */ }
  return 'classic';
}
export function applyTheme(t) {
  document.documentElement.dataset.theme = THEMES.includes(t) ? t : 'classic';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'minecraft' ? '#1f2a1a' : '#f7f4fd');
}
export function setTheme(t) {
  try { localStorage.setItem(KEY, t); } catch { /* ignore */ }
  applyTheme(t);
}
