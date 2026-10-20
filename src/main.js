import './styles/base.css';
import './styles/minecraft.css';
import { App } from './app.js';

const app = new App(document.getElementById('app'));
app.boot().catch((e) => {
  console.error(e);
  document.getElementById('app').innerHTML = '<div class="boot error" role="alert"><h1>Kodstig kunde inte starta</h1><p>Ladda om sidan. Om felet finns kvar, prova en annan webbläsare.</p></div>';
});
