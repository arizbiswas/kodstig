import './styles/base.css';
import './styles/minecraft.css';
import { App } from './app.js';

const app = new App(document.getElementById('app'));
app.boot().catch((e) => {
  console.error(e);
  document.getElementById('app').innerHTML = '<div class="boot error" role="alert"><h1>Kodstig kunde inte starta</h1><p>Ladda om sidan. Om felet finns kvar, prova en annan webbläsare.</p></div>';
});

// Gör appen installerbar och startbar offline (bara i det byggda resultatet).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL }).catch(() => {});
  });
}
