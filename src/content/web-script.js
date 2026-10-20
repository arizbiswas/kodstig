// Webbspårets sista kapitel: en första smak av JavaScript i en HTML-sida.
const T = (s) => s.replace(/^\n/, '');

// Delar som återkommer i miniprojektet
const LISTA_HTML = T(`
<style>
  .klar { text-decoration: line-through; color: #777; }
</style>
<h1>Inköpslista</h1>
<label for="vara">Vara</label>
<input id="vara">
<button id="lagg-till">Lägg till</button>
<ul id="lista"></ul>
<p id="antal">Varor: 0</p>
`);
const LISTA_JS1 = T(`
<script>
  const falt = document.querySelector('#vara');
  const lista = document.querySelector('#lista');
  const antalText = document.querySelector('#antal');
  let antal = 0;

  function laggTill() {
    const li = document.createElement('li');
    li.textContent = falt.value;
    lista.append(li);
    antal = antal + 1;
    antalText.textContent = 'Varor: ' + antal;
    falt.value = '';
  }

  document.querySelector('#lagg-till').addEventListener('click', laggTill);
</script>
`);
const LISTA_JS2 = T(`
<script>
  const falt = document.querySelector('#vara');
  const lista = document.querySelector('#lista');
  const antalText = document.querySelector('#antal');
  let antal = 0;

  function laggTill() {
    const li = document.createElement('li');
    li.textContent = falt.value;
    function bocka() {
      li.classList.toggle('klar');
    }
    li.addEventListener('click', bocka);
    lista.append(li);
    antal = antal + 1;
    antalText.textContent = 'Varor: ' + antal;
    falt.value = '';
  }

  document.querySelector('#lagg-till').addEventListener('click', laggTill);
</script>
`);
const TARN_HTML = T(`
<h1>Tärning</h1>
<button id="sla">Slå tärningen</button>
<p id="resultat">Tryck på knappen.</p>
<ul id="historik"></ul>
`);
const SYSSLOR_HTML = T(`
<h1>Vem gör vad?</h1>
<button id="slumpa">Slumpa en syssla</button>
<p id="syssla"></p>
`);

export default [
  {
    id: 'web11',
    title: 'Lite JavaScript',
    lessons: [
      {
        id: 'web-js-script', title: 'Ditt första skript', tier: 2,
        text: 'HTML bestämmer vad som finns på sidan och CSS hur det ser ut. **JavaScript** är webbens programspråk: det gör att sidan kan ändra sig medan någon använder den. Koden skriver du i en `<script>`-tagg.\n\nLägg `<script>` **sist**, efter elementen. Webbläsaren läser sidan uppifrån och ned, så ett skript högst upp letar efter element som inte finns än.\n\n`document.querySelector(\'#rubrik\')` hittar ett element med samma väljare som i CSS. Elementets `textContent` är texten inuti, och den kan du byta: `rubrik.textContent = \'Hej!\';`. Text står alltid inom citattecken.\n\nEtt värde sparar du i en variabel. `const` används för sådant som inte ska bytas, till exempel ett element. `let` används när värdet ska ändras senare, som en poäng. Text och variabler sätter du ihop med `+`.\n\nI en riktig webbläsare kan du skriva ut saker i konsolen (tryck F12). Här i Kodstig syns ingen konsol, så allt resultat ska synas på själva sidan.',
        example: T(`
<h1 id="rubrik">Laddar...</h1>
<p id="info"></p>
<script>
  // 1. Hitta elementen med CSS-väljare
  const rubrik = document.querySelector('#rubrik');
  const info = document.querySelector('#info');
  // 2. Byt texten i rubriken
  rubrik.textContent = 'Hej från JavaScript!';
  // 3. let kan ändras senare
  let antal = 3;
  antal = antal + 1;
  // 4. Sätt ihop text och variabel med +
  info.textContent = 'Antal: ' + antal;
</script>`),
        exercises: [
          { type: 'choice', prompt: 'Varför brukar `<script>` ligga sist, efter sidans element?', options: ['För att JavaScript bara fungerar i slutet av en fil', 'För att elementen ska finnas när skriptet letar efter dem', 'För att CSS annars slutar fungera'], answer: 1,
            explain: 'Webbläsaren läser sidan uppifrån. När skriptet ligger sist har alla element ovanför redan skapats, så querySelector hittar dem.',
            why: { 0: 'Skriptet kan stå var som helst, men högt upp finns inte elementen under det än.', 2: 'CSS påverkas inte av var skriptet står.' } },
          { type: 'order', prompt: 'Ordna raderna: först ett tomt stycke med id `halsning`, sedan ett skript som hittar stycket och skriver Hej, världen! i det.',
            lines: ['<p id="halsning"></p>', '<script>', "  const p = document.querySelector('#halsning');", "  p.textContent = 'Hej, världen!';", '</script>'],
            distractors: [{ line: '  p.textContent = Hej, världen!;', why: 'Text måste stå inom citattecken, annars tror JavaScript att det är variabelnamn.' }],
            explain: 'Stycket finns först, sedan letar skriptet upp det och byter texten. Variabeln p måste skapas innan den används.', hint: 'Elementet först, skriptet sist. Inuti skriptet: hitta först, ändra sedan.' },
          { type: 'web', js: true, prompt: 'Rubriken säger "Min sida". Ändra inte HTML-koden, utan skriv JavaScript i skriptet som hittar `#titel` med `document.querySelector` och byter texten till `Välkommen!`.',
            starter: '<h1 id="titel">Min sida</h1>\n<script>\n  // Hitta rubriken och byt texten\n\n</script>\n',
            checks: [{ q: '#titel', text: '^Välkommen!$', msg: 'Rubriken visar Välkommen!' }, { source: '<h1 id="titel">Min sida</h1>', msg: 'HTML-koden för rubriken är oförändrad' }, { source: 'querySelector', msg: 'Du använder document.querySelector' }],
            solution: "<h1 id=\"titel\">Min sida</h1>\n<script>\n  const titel = document.querySelector('#titel');\n  titel.textContent = 'Välkommen!';\n</script>\n",
            explain: 'Sidan skickades med texten Min sida, men skriptet bytte den innan du hann se den. Så fungerar många sidor som visar ditt namn när du loggat in.', hint: "Två rader: const titel = document.querySelector('#titel'); och titel.textContent = 'Välkommen!';" },
          { type: 'web', js: true, prompt: 'Variabeln `poang` börjar på 10. Öka den med 5 i koden (med `poang = poang + 5;`) och visa den sedan i `#poang` som texten `Poäng: 15`. Sätt ihop texten med `+` och variabeln.',
            starter: "<p id=\"poang\"></p>\n<script>\n  let poang = 10;\n  // Öka poang med 5 och visa den i stycket\n\n</script>\n",
            checks: [{ q: '#poang', text: '^Poäng: 15$', msg: 'Stycket visar Poäng: 15' }, { source: 'poang\\s*(\\+=\\s*5|=\\s*poang\\s*\\+\\s*5)', msg: 'Du ökar poang med 5 i koden' }],
            solution: "<p id=\"poang\"></p>\n<script>\n  let poang = 10;\n  poang = poang + 5;\n  document.querySelector('#poang').textContent = 'Poäng: ' + poang;\n</script>\n",
            explain: 'poang skapades med let, så den fick ändras. Med const hade raden poang = poang + 5 gett ett fel.', hint: "Skriv poang = poang + 5; och sedan document.querySelector('#poang').textContent = 'Poäng: ' + poang;" },
          { type: 'web', js: true, prompt: 'Skriptet har två variabler, `namn` och `stad`. Bygg texten `Sam bor i Malmö.` av variablerna med `+` och visa den i `#om`.',
            starter: "<h2>Om mig</h2>\n<p id=\"om\"></p>\n<script>\n  const namn = 'Sam';\n  const stad = 'Malmö';\n  // Visa: Sam bor i Malmö.\n\n</script>\n",
            checks: [{ q: '#om', text: '^Sam bor i Malmö\\.$', msg: 'Stycket visar Sam bor i Malmö.' }, { source: '\\+\\s*stad', msg: 'Texten byggs med variabeln stad' }],
            solution: "<h2>Om mig</h2>\n<p id=\"om\"></p>\n<script>\n  const namn = 'Sam';\n  const stad = 'Malmö';\n  document.querySelector('#om').textContent = namn + ' bor i ' + stad + '.';\n</script>\n",
            explain: 'Glöm inte mellanslagen inuti citattecknen. JavaScript lägger inte till några själv när du sätter ihop text.', hint: "namn + ' bor i ' + stad + '.'" },
          { type: 'web', js: true, prompt: 'Det här skriptet ger ett fel: det hittar inte stycket. Flytta skriptet så att det fungerar. Själva koden i skriptet behöver inte ändras.',
            starter: "<script>\n  const status = document.querySelector('#status');\n  status.textContent = 'Skriptet hittade stycket!';\n</script>\n<p id=\"status\">Väntar...</p>\n",
            checks: [{ q: '#status', text: '^Skriptet hittade stycket!$', msg: 'Stycket visar Skriptet hittade stycket!' }],
            solution: "<p id=\"status\">Väntar...</p>\n<script>\n  const status = document.querySelector('#status');\n  status.textContent = 'Skriptet hittade stycket!';\n</script>\n",
            explain: 'När skriptet låg först fanns stycket inte än, så querySelector gav null och nästa rad kraschade. Sist på sidan finns allt.', hint: 'Klipp ut hela script-blocket och klistra in det efter stycket.' },
        ],
      },
      {
        id: 'web-js-click', title: 'Knappar och klick', tier: 2,
        text: 'Ett skript som bara körs en gång när sidan laddas är bra, men det roliga börjar när sidan svarar på det du gör. Då behövs **funktioner** och **händelser**.\n\nEn funktion är ett namngivet stycke kod som körs först när någon anropar den: `function okaRakning() { ... }`. Med `knapp.addEventListener(\'click\', okaRakning);` säger du till webbläsaren: kör funktionen varje gång knappen klickas.\n\nSkriv funktionens namn **utan** parenteser där. `okaRakning()` betyder "kör nu", och då körs den en gång direkt i stället för vid klick.\n\nVill du att något ska minnas mellan klicken, som en räknare, ska variabeln skapas med `let` **utanför** funktionen. En variabel som skapas inuti funktionen börjar om från början vid varje klick.\n\nI övningarna klickar Kodstig på knapparna åt dig och tittar sedan på hur sidan ser ut.',
        example: T(`
<button id="knapp">Klicka</button>
<p id="rakning">Klick: 0</p>
<script>
  // 1. Hitta knappen och stycket
  const knapp = document.querySelector('#knapp');
  const rakning = document.querySelector('#rakning');
  // 2. Variabeln ligger utanför funktionen, så den minns
  let antal = 0;
  // 3. Funktionen körs vid varje klick
  function okaRakning() {
    antal = antal + 1;
    rakning.textContent = 'Klick: ' + antal;
  }
  // 4. Koppla funktionen till klick, utan parenteser
  knapp.addEventListener('click', okaRakning);
</script>`),
        exercises: [
          { type: 'choice', prompt: 'Vad händer med den här raden?', code: "knapp.addEventListener('click', visa());", options: ['visa körs vid varje klick, precis som tänkt', 'Webbläsaren klickar på knappen automatiskt', 'visa körs en gång direkt när sidan laddas, inte vid klick'], answer: 2,
            explain: 'Parenteserna betyder "kör funktionen nu". Det som kopplas till klicket blir då det funktionen lämnar tillbaka, inte funktionen själv.',
            why: { 0: 'Det hade stämt utan parenteser: addEventListener(\'click\', visa).', 1: 'Ingen klickar. Funktionen anropas bara direkt på grund av parenteserna.' } },
          { type: 'order', prompt: 'Ordna skriptet: hitta knappen, skapa räknaren, skriv funktionen som ökar räknaren och visar den på knappen, och koppla funktionen till klick sist.',
            lines: ['<script>', "  const knapp = document.querySelector('#knapp');", '  let antal = 0;', '  function rakna() {', '    antal = antal + 1;', "    knapp.textContent = 'Klick: ' + antal;", '  }', "  knapp.addEventListener('click', rakna);", '</script>'],
            alt: [['<script>', '  let antal = 0;', "  const knapp = document.querySelector('#knapp');", '  function rakna() {', '    antal = antal + 1;', "    knapp.textContent = 'Klick: ' + antal;", '  }', "  knapp.addEventListener('click', rakna);", '</script>']],
            distractors: [{ line: "  knapp.addEventListener('click', rakna());", why: 'Med parenteser körs rakna direkt en gång i stället för vid klick.' }],
            explain: 'Räknaren ökas först och visas sedan, annars visar knappen ett klick för lite. Kopplingen till klick kommer sist, när allt den behöver finns.', hint: 'Inuti funktionen: öka först, visa sedan.' },
          { type: 'web', js: true, prompt: 'När man klickar på knappen `#hej` ska stycket `#svar` visa texten `Hej på dig!`. Skriv en funktion och koppla den med `addEventListener`.',
            actions: [{ q: '#hej' }],
            starter: '<button id="hej">Säg hej</button>\n<p id="svar"></p>\n<script>\n  // Skriv en funktion och koppla den till knappen\n\n</script>\n',
            checks: [{ q: '#svar', text: '^Hej på dig!$', msg: 'Efter klick visar stycket Hej på dig!' }, { source: "addEventListener\\(\\s*['\"]click['\"]", msg: 'Du använder addEventListener med click' }],
            solution: "<button id=\"hej\">Säg hej</button>\n<p id=\"svar\"></p>\n<script>\n  function sagHej() {\n    document.querySelector('#svar').textContent = 'Hej på dig!';\n  }\n  document.querySelector('#hej').addEventListener('click', sagHej);\n</script>\n",
            explain: 'Funktionen väntar tills någon klickar. Det är grunden för nästan alla knappar på webben.', hint: "function sagHej() { ... } och sedan document.querySelector('#hej').addEventListener('click', sagHej);" },
          { type: 'web', js: true, prompt: 'Plus-knappen fungerar redan. Lägg till en funktion för minus-knappen `#minus` som minskar talet med 1 och visar det i `#tal`. Kodstig klickar plus tre gånger och minus en gång, och då ska det stå `2`.',
            actions: [{ q: '#plus' }, { q: '#plus' }, { q: '#plus' }, { q: '#minus' }],
            starter: "<button id=\"minus\">-</button>\n<span id=\"tal\">0</span>\n<button id=\"plus\">+</button>\n<script>\n  const talText = document.querySelector('#tal');\n  let tal = 0;\n\n  function plus() {\n    tal = tal + 1;\n    talText.textContent = tal;\n  }\n  document.querySelector('#plus').addEventListener('click', plus);\n\n  // Gör likadant för minus\n\n</script>\n",
            checks: [{ q: '#tal', text: '^2$', msg: 'Efter tre plus och ett minus står det 2' }],
            solution: "<button id=\"minus\">-</button>\n<span id=\"tal\">0</span>\n<button id=\"plus\">+</button>\n<script>\n  const talText = document.querySelector('#tal');\n  let tal = 0;\n\n  function plus() {\n    tal = tal + 1;\n    talText.textContent = tal;\n  }\n  document.querySelector('#plus').addEventListener('click', plus);\n\n  function minus() {\n    tal = tal - 1;\n    talText.textContent = tal;\n  }\n  document.querySelector('#minus').addEventListener('click', minus);\n</script>\n",
            explain: 'Båda funktionerna ändrar samma variabel tal, eftersom den ligger utanför dem. Så funkar antal-väljaren i en webbutik.', hint: 'Kopiera plus-funktionen, döp den till minus, byt + 1 mot - 1 och koppla den till #minus.' },
          { type: 'web', js: true, prompt: 'Räknaren visar fel: efter två klick står det `Klick: 1`. Hitta felet på kopplingsraden och rätta det.',
            actions: [{ q: '#knapp' }, { q: '#knapp' }],
            starter: "<button id=\"knapp\">Klicka</button>\n<p id=\"rakning\">Klick: 0</p>\n<script>\n  const rakning = document.querySelector('#rakning');\n  let antal = 0;\n  function okaRakning() {\n    antal = antal + 1;\n    rakning.textContent = 'Klick: ' + antal;\n  }\n  document.querySelector('#knapp').addEventListener('click', okaRakning());\n</script>\n",
            checks: [{ q: '#rakning', text: '^Klick: 2$', msg: 'Efter två klick står det Klick: 2' }],
            solution: "<button id=\"knapp\">Klicka</button>\n<p id=\"rakning\">Klick: 0</p>\n<script>\n  const rakning = document.querySelector('#rakning');\n  let antal = 0;\n  function okaRakning() {\n    antal = antal + 1;\n    rakning.textContent = 'Klick: ' + antal;\n  }\n  document.querySelector('#knapp').addEventListener('click', okaRakning);\n</script>\n",
            explain: 'Med parenteserna kördes funktionen en gång när sidan laddades, och sedan hände inget vid klick. Utan parenteser lämnar du över själva funktionen.', hint: 'Titta på okaRakning() i sista raden. Behövs parenteserna där?' },
          { type: 'web', js: true, prompt: 'Den här räknaren fastnar på `Klick: 1` hur många gånger man än klickar. Rätta koden så att det står `Klick: 3` efter tre klick.',
            actions: [{ q: '#knapp' }, { q: '#knapp' }, { q: '#knapp' }],
            starter: "<button id=\"knapp\">Klicka</button>\n<p id=\"rakning\">Klick: 0</p>\n<script>\n  const rakning = document.querySelector('#rakning');\n  function okaRakning() {\n    let antal = 0;\n    antal = antal + 1;\n    rakning.textContent = 'Klick: ' + antal;\n  }\n  document.querySelector('#knapp').addEventListener('click', okaRakning);\n</script>\n",
            checks: [{ q: '#rakning', text: '^Klick: 3$', msg: 'Efter tre klick står det Klick: 3' }],
            solution: "<button id=\"knapp\">Klicka</button>\n<p id=\"rakning\">Klick: 0</p>\n<script>\n  const rakning = document.querySelector('#rakning');\n  let antal = 0;\n  function okaRakning() {\n    antal = antal + 1;\n    rakning.textContent = 'Klick: ' + antal;\n  }\n  document.querySelector('#knapp').addEventListener('click', okaRakning);\n</script>\n",
            explain: 'Inuti funktionen skapades en ny variabel med värdet 0 vid varje klick. Utanför funktionen skapas den bara en gång och minns sitt värde.', hint: 'Flytta raden let antal = 0; upp ovanför funktionen.' },
        ],
      },
      {
        id: 'web-js-input', title: 'Läsa från fält', tier: 3,
        text: 'Ett inmatningsfält gör sidan till ett verktyg. Det som står i fältet läser du med `falt.value`. Läs värdet **inuti** klickfunktionen: då får du det som står i fältet när knappen trycks. Läser du det direkt när sidan laddas är fältet fortfarande tomt.\n\nEtt fälts värde är alltid **text**, även om någon skrev siffror. Med text betyder `+` att sätta ihop, så `\'5\' + \'3\'` blir `\'53\'`. Gör om texten till ett tal med `Number(falt.value)` innan du räknar. Om texten inte är ett tal blir resultatet `NaN`, som betyder "inte ett tal".\n\nResultatet visar du som förut med `textContent`. Så byggs små verktyg som räknar ut moms, dricks eller hur länge det är kvar till lov. I övningarna skriver Kodstig in värden i fälten åt dig och klickar på knappen.',
        example: T(`
<label for="tal1">Första talet</label>
<input id="tal1" value="5">
<label for="tal2">Andra talet</label>
<input id="tal2" value="3">
<button id="plus">Räkna</button>
<p id="svar"></p>
<script>
  // 1. Funktionen körs vid klick
  function raknaUt() {
    // 2. Läs fälten nu, när knappen trycks
    const a = Number(document.querySelector('#tal1').value);
    const b = Number(document.querySelector('#tal2').value);
    // 3. Visa resultatet
    document.querySelector('#svar').textContent = a + ' + ' + b + ' = ' + (a + b);
  }
  // 4. Koppla till knappen
  document.querySelector('#plus').addEventListener('click', raknaUt);
</script>`),
        exercises: [
          { type: 'choice', prompt: 'Fältet `#antal` innehåller 5. Vad visas i stycket?', code: "const antal = document.querySelector('#antal').value;\ndocument.querySelector('#svar').textContent = antal + 3;", options: ['53', '8', 'NaN'], answer: 0,
            explain: 'value är alltid text. Text plus ett tal sätts ihop till ny text, så det blir 53. Med Number(...) runt hade det blivit 8.',
            why: { 1: 'Det kräver att texten först görs om till ett tal med Number().', 2: 'NaN får du när text inte går att göra om till ett tal. Här sätts texten bara ihop.' } },
          { type: 'order', prompt: 'Ordna raderna: etikett, fält, knapp och ett tomt stycke i den ordningen, och sist ett skript som skriver Hej och namnet i stycket när man klickar.',
            lines: ['<label for="namn">Namn</label>', '<input id="namn">', '<button id="hej">Hälsa</button>', '<p id="svar"></p>', '<script>', '  function halsa() {', "    const namn = document.querySelector('#namn').value;", "    document.querySelector('#svar').textContent = 'Hej ' + namn + '!';", '  }', "  document.querySelector('#hej').addEventListener('click', halsa);", '</script>'],
            distractors: [{ line: "    const namn = document.querySelector('#namn').textContent;", why: 'Det man skrivit i ett fält läser man med value, inte textContent.' }],
            explain: 'Namnet läses inuti funktionen, alltså när knappen trycks. Raden som läser måste komma före raden som använder namn.', hint: 'Läs värdet först, visa det sedan. Kopplingen till klick står efter funktionen.' },
          { type: 'web', js: true, prompt: 'Gör en hälsning. När man klickar på `#knapp` ska stycket `#svar` visa `Hej` följt av namnet i fältet `#namn` och ett utropstecken, till exempel `Hej Kim!`. Kodstig skriver först Ali och klickar, sedan Kim och klickar.',
            actions: [{ q: '#namn', value: 'Ali' }, { q: '#knapp' }, { q: '#namn', value: 'Kim' }, { q: '#knapp' }],
            starter: '<label for="namn">Vad heter du?</label>\n<input id="namn">\n<button id="knapp">Hälsa</button>\n<p id="svar"></p>\n<script>\n  // Läs namnet när knappen klickas och visa hälsningen\n\n</script>\n',
            checks: [{ q: '#svar', text: '^Hej Kim!$', msg: 'Efter andra klicket står det Hej Kim!' }],
            solution: "<label for=\"namn\">Vad heter du?</label>\n<input id=\"namn\">\n<button id=\"knapp\">Hälsa</button>\n<p id=\"svar\"></p>\n<script>\n  function halsa() {\n    const namn = document.querySelector('#namn').value;\n    document.querySelector('#svar').textContent = 'Hej ' + namn + '!';\n  }\n  document.querySelector('#knapp').addEventListener('click', halsa);\n</script>\n",
            explain: 'Eftersom fältet läses vid varje klick följer hälsningen med när namnet ändras.', hint: "Inuti funktionen: const namn = document.querySelector('#namn').value; och sedan 'Hej ' + namn + '!'." },
          { type: 'web', js: true, prompt: 'Den här miniräknaren säger att 12 + 30 är 1230. Rätta den så att den räknar på riktigt och visar `Summa: 42`.',
            actions: [{ q: '#a', value: '12' }, { q: '#b', value: '30' }, { q: '#rakna' }],
            starter: "<label for=\"a\">Tal 1</label> <input id=\"a\">\n<label for=\"b\">Tal 2</label> <input id=\"b\">\n<button id=\"rakna\">Räkna</button>\n<p id=\"summa\"></p>\n<script>\n  function rakna() {\n    const a = document.querySelector('#a').value;\n    const b = document.querySelector('#b').value;\n    document.querySelector('#summa').textContent = 'Summa: ' + (a + b);\n  }\n  document.querySelector('#rakna').addEventListener('click', rakna);\n</script>\n",
            checks: [{ q: '#summa', text: '^Summa: 42$', msg: 'Med 12 och 30 visas Summa: 42' }],
            solution: "<label for=\"a\">Tal 1</label> <input id=\"a\">\n<label for=\"b\">Tal 2</label> <input id=\"b\">\n<button id=\"rakna\">Räkna</button>\n<p id=\"summa\"></p>\n<script>\n  function rakna() {\n    const a = Number(document.querySelector('#a').value);\n    const b = Number(document.querySelector('#b').value);\n    document.querySelector('#summa').textContent = 'Summa: ' + (a + b);\n  }\n  document.querySelector('#rakna').addEventListener('click', rakna);\n</script>\n",
            explain: 'Fälten gav texten 12 och 30, som sattes ihop. Med Number blir de tal som går att addera.', hint: "Lägg Number( ... ) runt document.querySelector('#a').value, och likadant för b." },
          { type: 'web', js: true, prompt: 'Skriv ett skript som räknar ut hur gammal man är om tio år. Läs `#alder` när man klickar på `#visa`, gör om till ett tal och visa `Om tio år är du 22 år.` i `#svar` när fältet innehåller 12.',
            actions: [{ q: '#alder', value: '12' }, { q: '#visa' }],
            starter: '<label for="alder">Din ålder</label>\n<input id="alder" type="number">\n<button id="visa">Visa</button>\n<p id="svar"></p>\n<script>\n\n</script>\n',
            checks: [{ q: '#svar', text: '^Om tio år är du 22 år\\.$', msg: 'Med 12 i fältet visas Om tio år är du 22 år.' }],
            solution: "<label for=\"alder\">Din ålder</label>\n<input id=\"alder\" type=\"number\">\n<button id=\"visa\">Visa</button>\n<p id=\"svar\"></p>\n<script>\n  function visa() {\n    const alder = Number(document.querySelector('#alder').value);\n    document.querySelector('#svar').textContent = 'Om tio år är du ' + (alder + 10) + ' år.';\n  }\n  document.querySelector('#visa').addEventListener('click', visa);\n</script>\n",
            explain: 'Även ett fält med type="number" ger text i value. Number behövs ändå, annars blir det 1210.', hint: "Räkna i en parentes: 'Om tio år är du ' + (alder + 10) + ' år.'" },
          { type: 'web', js: true, prompt: 'En biobiljett kostar 85 kr. När man klickar på `#rakna` ska `#pris` visa vad det kostar för antalet i `#antal`, till exempel `Att betala: 340 kr` för 4 biljetter.',
            actions: [{ q: '#antal', value: '4' }, { q: '#rakna' }],
            starter: '<h2>Biobiljetter</h2>\n<label for="antal">Antal biljetter</label>\n<input id="antal" type="number" value="1">\n<button id="rakna">Räkna ut</button>\n<p id="pris"></p>\n<script>\n  const biljettpris = 85;\n\n</script>\n',
            checks: [{ q: '#pris', text: '^Att betala: 340 kr$', msg: 'Med 4 biljetter visas Att betala: 340 kr' }],
            solution: "<h2>Biobiljetter</h2>\n<label for=\"antal\">Antal biljetter</label>\n<input id=\"antal\" type=\"number\" value=\"1\">\n<button id=\"rakna\">Räkna ut</button>\n<p id=\"pris\"></p>\n<script>\n  const biljettpris = 85;\n  function raknaPris() {\n    const antal = Number(document.querySelector('#antal').value);\n    document.querySelector('#pris').textContent = 'Att betala: ' + (antal * biljettpris) + ' kr';\n  }\n  document.querySelector('#rakna').addEventListener('click', raknaPris);\n</script>\n",
            explain: 'Priset ligger i en const högst upp. Höjs biljettpriset ändrar du bara den raden.', hint: "Läs antalet med Number(...), multiplicera med biljettpris och visa 'Att betala: ' + ... + ' kr'." },
        ],
      },
      {
        id: 'web-js-style', title: 'Ändra utseende med klasser', tier: 3,
        text: 'JavaScript kan ändra hur sidan ser ut. Det enklaste och snyggaste sättet är att låta **CSS** beskriva utseendet i klasser och låta JavaScript bara slå på och av klasserna. Då ligger all design på ett ställe.\n\nVarje element har en `classList`:\n\n- `el.classList.add(\'mork\')` lägger till klassen.\n- `el.classList.remove(\'mork\')` tar bort den.\n- `el.classList.toggle(\'mork\')` växlar: lägger till om den saknas, tar bort om den finns.\n\nKlassnamnet skrivs **utan** punkt här. Punkten hör bara till CSS-väljaren.\n\nMed en klass som `.dold { display: none; }` kan du gömma och visa saker, till exempel svaret på en gåta eller en meny på mobilen. Med en klass för mörka färger gör du en knapp för mörkt läge. Precis så fungerar det på många riktiga webbplatser.',
        example: T(`
<style>
  .sida { padding: 16px; border-radius: 12px; border: 1px solid #ddd; }
  .mork { background: #1f1d2b; color: #f4f1ff; }
  .dold { display: none; }
</style>
<div class="sida" id="sida">
  <button id="tema">Byt tema</button>
  <button id="visa">Visa svaret</button>
  <p>Vad har tänder men kan inte bita?</p>
  <p id="svar" class="dold">En kam!</p>
</div>
<script>
  // 1. Växla mörkt tema vid varje klick
  function bytTema() {
    document.querySelector('#sida').classList.toggle('mork');
  }
  // 2. Ta bort klassen dold så att svaret syns
  function visaSvar() {
    document.querySelector('#svar').classList.remove('dold');
  }
  // 3. Koppla funktionerna till knapparna
  document.querySelector('#tema').addEventListener('click', bytTema);
  document.querySelector('#visa').addEventListener('click', visaSvar);
</script>`),
        exercises: [
          { type: 'choice', prompt: 'Rutan har redan klassen `mork`. Vad gör raden?', code: "ruta.classList.toggle('mork');", options: ['Lägger till klassen en gång till', 'Tar bort klassen mork', 'Ingenting, toggle kan bara lägga till'], answer: 1,
            explain: 'toggle växlar. Finns klassen tas den bort, saknas den läggs den till. Därför passar toggle för en knapp som byter fram och tillbaka.',
            why: { 0: 'Ett element kan inte ha samma klass två gånger, och toggle tar bort när klassen redan finns.', 2: 'Det är add som bara lägger till. toggle tar bort när klassen finns.' } },
          { type: 'order', prompt: 'Ordna raderna: CSS-regeln för `.dold` först, sedan knappen, sedan det gömda svaret och sist skriptet som visar svaret vid klick.',
            lines: ['<style>', '  .dold { display: none; }', '</style>', '<button id="visa">Visa svaret</button>', '<p id="svar" class="dold">Svaret är 42.</p>', '<script>', '  function visaSvar() {', "    document.querySelector('#svar').classList.remove('dold');", '  }', "  document.querySelector('#visa').addEventListener('click', visaSvar);", '</script>'],
            distractors: [{ line: "    document.querySelector('#svar').classList.remove('.dold');", why: 'I classList skrivs klassnamnet utan punkt. Punkten hör bara till CSS-väljaren.' }],
            explain: 'CSS gömmer stycket från början. Vid klick tar skriptet bort klassen, och då gäller inte display: none längre.', hint: 'Stilen överst, sedan HTML, sist skriptet.' },
          { type: 'web', js: true, prompt: 'Stilen `.mork` finns redan. När man klickar på `#tema` ska `#sida` få klassen `mork` med `classList`.',
            actions: [{ q: '#tema' }],
            starter: '<style>\n  .sida { padding: 16px; border-radius: 12px; }\n  .mork { background: #1f1d2b; color: #f4f1ff; }\n</style>\n<div class="sida" id="sida">\n  <h2>Nattläge</h2>\n  <p>Skonsamt för ögonen på kvällen.</p>\n  <button id="tema">Mörkt läge</button>\n</div>\n<script>\n\n</script>\n',
            checks: [{ q: '#sida.mork', msg: 'Efter klick har #sida klassen mork' }, { source: 'class="sida" id="sida"', msg: 'Klassen läggs till av skriptet, inte i HTML' }],
            solution: "<style>\n  .sida { padding: 16px; border-radius: 12px; }\n  .mork { background: #1f1d2b; color: #f4f1ff; }\n</style>\n<div class=\"sida\" id=\"sida\">\n  <h2>Nattläge</h2>\n  <p>Skonsamt för ögonen på kvällen.</p>\n  <button id=\"tema\">Mörkt läge</button>\n</div>\n<script>\n  function morkLage() {\n    document.querySelector('#sida').classList.add('mork');\n  }\n  document.querySelector('#tema').addEventListener('click', morkLage);\n</script>\n",
            explain: 'Färgerna står i CSS, och JavaScript säger bara när de ska gälla.', hint: "I funktionen: document.querySelector('#sida').classList.add('mork');" },
          { type: 'web', js: true, prompt: 'Den här rutan börjar i mörkt läge. Gör så att ett klick på `#ljus` tar bort klassen `mork` från `#sida`.',
            actions: [{ q: '#ljus' }],
            starter: '<style>\n  .sida { padding: 16px; border-radius: 12px; }\n  .mork { background: #1f1d2b; color: #f4f1ff; }\n</style>\n<div class="sida mork" id="sida">\n  <p>Klicka för ljust läge.</p>\n  <button id="ljus">Ljust läge</button>\n</div>\n<script>\n\n</script>\n',
            checks: [{ q: '#sida', msg: 'Rutan #sida finns kvar' }, { q: '#sida.mork', invert: true, msg: 'Efter klick har #sida inte längre klassen mork' }],
            solution: "<style>\n  .sida { padding: 16px; border-radius: 12px; }\n  .mork { background: #1f1d2b; color: #f4f1ff; }\n</style>\n<div class=\"sida mork\" id=\"sida\">\n  <p>Klicka för ljust läge.</p>\n  <button id=\"ljus\">Ljust läge</button>\n</div>\n<script>\n  function ljustLage() {\n    document.querySelector('#sida').classList.remove('mork');\n  }\n  document.querySelector('#ljus').addEventListener('click', ljustLage);\n</script>\n",
            explain: 'remove tar bara bort mork. Klassen sida finns kvar, så rutan behåller sin padding och sina rundade hörn.', hint: "classList.remove('mork') i en funktion som kopplas till #ljus." },
          { type: 'web', js: true, prompt: 'Ingredienslistan är gömd med klassen `dold`. Gör så att knappen `#visa` växlar klassen med `classList.toggle`, så att samma knapp både visar och gömmer listan. Kodstig klickar tre gånger, och då ska listan synas.',
            actions: [{ q: '#visa' }, { q: '#visa' }, { q: '#visa' }],
            starter: '<style>\n  .dold { display: none; }\n</style>\n<h2>Pannkakor</h2>\n<button id="visa">Visa ingredienser</button>\n<ul id="ingredienser" class="dold">\n  <li>3 dl vetemjöl</li>\n  <li>6 dl mjölk</li>\n  <li>3 ägg</li>\n</ul>\n<script>\n\n</script>\n',
            checks: [{ q: '#ingredienser', msg: 'Listan finns' }, { q: '#ingredienser.dold', invert: true, msg: 'Efter tre klick syns listan' }, { source: 'classList\\.toggle', msg: 'Du använder classList.toggle' }],
            solution: "<style>\n  .dold { display: none; }\n</style>\n<h2>Pannkakor</h2>\n<button id=\"visa\">Visa ingredienser</button>\n<ul id=\"ingredienser\" class=\"dold\">\n  <li>3 dl vetemjöl</li>\n  <li>6 dl mjölk</li>\n  <li>3 ägg</li>\n</ul>\n<script>\n  function vaxla() {\n    document.querySelector('#ingredienser').classList.toggle('dold');\n  }\n  document.querySelector('#visa').addEventListener('click', vaxla);\n</script>\n",
            explain: 'Klick ett visar, klick två gömmer och klick tre visar igen. Med toggle behöver du inte hålla reda på läget själv.', hint: "document.querySelector('#ingredienser').classList.toggle('dold'); i en funktion." },
          { type: 'web', js: true, prompt: 'Gör en knapp för större text. Skriv först en CSS-regel `.stor` med en större `font-size`. Gör sedan så att ett klick på `#storre` lägger till klassen `stor` på stycket `#text`.',
            actions: [{ q: '#storre' }],
            starter: '<style>\n\n</style>\n<button id="storre">Större text</button>\n<p id="text">Det här stycket ska gå att läsa även utan glasögon.</p>\n<script>\n\n</script>\n',
            checks: [{ css: '.stor', prop: 'font-size', msg: 'Regeln .stor har en font-size' }, { q: '#text.stor', msg: 'Efter klick har #text klassen stor' }],
            solution: "<style>\n  .stor { font-size: 1.5rem; }\n</style>\n<button id=\"storre\">Större text</button>\n<p id=\"text\">Det här stycket ska gå att läsa även utan glasögon.</p>\n<script>\n  function storreText() {\n    document.querySelector('#text').classList.add('stor');\n  }\n  document.querySelector('#storre').addEventListener('click', storreText);\n</script>\n",
            explain: 'CSS och JavaScript samarbetar: regeln beskriver hur stor texten är, och skriptet bestämmer när den gäller.', hint: "Skriv .stor { font-size: 1.5rem; } i style och classList.add('stor') i skriptet." },
        ],
      },
      {
        id: 'web-js-list', title: 'Listor från arrayer', tier: 3,
        text: 'En **array** är en lista med värden: `const varor = [\'Mjölk\', \'Bröd\', \'Ägg\'];`. `varor.length` är hur många det är, `varor[0]` är det första och `varor.push(\'Ost\')` lägger till ett nytt sist.\n\nMed `for (const vara of varor) { ... }` körs koden inuti en gång för varje värde. Variabeln `vara` får ett nytt värde varje varv.\n\nFör att visa varje värde på sidan skapar du nya element:\n\n1. `const li = document.createElement(\'li\');` skapar ett tomt li.\n2. `li.textContent = vara;` fyller i texten.\n3. `lista.append(li);` lägger in det sist i listan på sidan.\n\nVarför inte skriva alla `<li>` för hand? För att data ofta kommer någon annanstans ifrån, som en sökning eller det användaren skriver. Med en loop fungerar samma kod oavsett om arrayen har 3 eller 300 värden.',
        example: T(`
<h2>Veckans middagar</h2>
<ul id="middagar"></ul>
<p id="antal"></p>
<script>
  // 1. Data i en array
  const middagar = ['Tacos', 'Linssoppa', 'Pasta'];
  middagar.push('Pizza');
  const lista = document.querySelector('#middagar');
  // 2. Ett varv per middag
  for (const middag of middagar) {
    // 3. Skapa, fyll i och lägg till
    const li = document.createElement('li');
    li.textContent = middag;
    lista.append(li);
  }
  // 4. Visa hur många det blev
  document.querySelector('#antal').textContent = middagar.length + ' middagar planerade';
</script>`),
        exercises: [
          { type: 'choice', prompt: 'Hur många `li` hamnar i listan?', code: "const djur = ['katt', 'hund'];\ndjur.push('häst');\nfor (const d of djur) {\n  const li = document.createElement('li');\n  li.textContent = d;\n  lista.append(li);\n}", options: ['2', 'Inga, eftersom li inte står i HTML-koden', '3'], answer: 2,
            explain: 'push lägger till häst, så arrayen har tre värden. Loopen skapar och lägger till ett li per värde.',
            why: { 0: 'push lägger till ett tredje värde innan loopen börjar.', 1: 'createElement skapar elementen och append lägger in dem på sidan. De behöver inte finnas i HTML-koden.' } },
          { type: 'order', prompt: 'Ordna raderna: en tom lista, sedan ett skript som hittar listan, skapar arrayen med färger och gör ett li för varje färg. Skapa li, fyll i texten och lägg till det i listan, i den ordningen.',
            lines: ['<ul id="lista"></ul>', '<script>', "  const lista = document.querySelector('#lista');", "  const farger = ['röd', 'grön', 'blå'];", '  for (const farg of farger) {', "    const li = document.createElement('li');", '    li.textContent = farg;', '    lista.append(li);', '  }', '</script>'],
            alt: [['<ul id="lista"></ul>', '<script>', "  const farger = ['röd', 'grön', 'blå'];", "  const lista = document.querySelector('#lista');", '  for (const farg of farger) {', "    const li = document.createElement('li');", '    li.textContent = farg;', '    lista.append(li);', '  }', '</script>']],
            distractors: [{ line: '  for (const farg in farger) {', why: 'for...in går igenom platserna 0, 1, 2. För själva värdena använder du for...of.' }],
            explain: 'Loopen gör samma tre steg för varje färg: skapa ett li, fyll i texten och lägg in det i listan.', hint: 'Inuti loopen: createElement, textContent, append.' },
          { type: 'web', js: true, prompt: 'Bygg inköpslistan från arrayen `varor`. Gå igenom arrayen med `for...of`, skapa ett `li` för varje vara med `document.createElement` och lägg in det i `#inkop`. Skriv inga `li` i HTML-koden.',
            starter: "<h2>Att handla</h2>\n<ul id=\"inkop\"></ul>\n<script>\n  const varor = ['Mjölk', 'Bröd', 'Ägg', 'Kaffe'];\n  const lista = document.querySelector('#inkop');\n\n</script>\n",
            checks: [{ q: '#inkop li', min: 4, max: 4, msg: 'Listan har fyra li' }, { q: '#inkop li', text: '^Kaffe$', msg: 'Kaffe finns med i listan' }, { source: 'createElement', msg: 'Du skapar li med document.createElement' }],
            solution: "<h2>Att handla</h2>\n<ul id=\"inkop\"></ul>\n<script>\n  const varor = ['Mjölk', 'Bröd', 'Ägg', 'Kaffe'];\n  const lista = document.querySelector('#inkop');\n  for (const vara of varor) {\n    const li = document.createElement('li');\n    li.textContent = vara;\n    lista.append(li);\n  }\n</script>\n",
            explain: 'Lägg till en vara i arrayen, så dyker den upp i listan utan att du rör HTML-koden.', hint: "for (const vara of varor) { const li = document.createElement('li'); li.textContent = vara; lista.append(li); }" },
          { type: 'web', js: true, prompt: 'Visa varje poäng som ett `li` i `#poang`, och räkna samtidigt ihop dem i loopen med en `let`-variabel. Visa sedan `Totalt: 60` i `#summa`.',
            starter: "<h2>Veckans poäng</h2>\n<ul id=\"poang\"></ul>\n<p id=\"summa\"></p>\n<script>\n  const poang = [10, 20, 30];\n  const lista = document.querySelector('#poang');\n\n</script>\n",
            checks: [{ q: '#poang li', min: 3, max: 3, msg: 'Listan har tre li' }, { q: '#poang li', text: '^20$', msg: 'Poängen 20 finns i listan' }, { q: '#summa', text: '^Totalt: 60$', msg: 'Stycket visar Totalt: 60' }],
            solution: "<h2>Veckans poäng</h2>\n<ul id=\"poang\"></ul>\n<p id=\"summa\"></p>\n<script>\n  const poang = [10, 20, 30];\n  const lista = document.querySelector('#poang');\n  let summa = 0;\n  for (const p of poang) {\n    const li = document.createElement('li');\n    li.textContent = p;\n    lista.append(li);\n    summa = summa + p;\n  }\n  document.querySelector('#summa').textContent = 'Totalt: ' + summa;\n</script>\n",
            explain: 'summa skapas före loopen, växer i varje varv och visas efter loopen. Samma mönster räknar ihop en kundvagn eller en budget.', hint: 'let summa = 0; före loopen, summa = summa + p; inuti, och visa summan efter loopen.' },
          { type: 'web', js: true, prompt: 'Listan blir bara ett enda `li` i stället för tre. Hitta felet och rätta det, så att alla tre lag syns i `#lag`.',
            starter: "<h2>Lag i turneringen</h2>\n<ul id=\"lag\"></ul>\n<script>\n  const lagnamn = ['Blixtarna', 'Ugglorna', 'Vågorna'];\n  const lista = document.querySelector('#lag');\n  const li = document.createElement('li');\n  for (const namn of lagnamn) {\n    li.textContent = namn;\n    lista.append(li);\n  }\n</script>\n",
            checks: [{ q: '#lag li', min: 3, max: 3, msg: 'Listan har tre li' }, { q: '#lag li', text: '^Blixtarna$', msg: 'Blixtarna finns med' }],
            solution: "<h2>Lag i turneringen</h2>\n<ul id=\"lag\"></ul>\n<script>\n  const lagnamn = ['Blixtarna', 'Ugglorna', 'Vågorna'];\n  const lista = document.querySelector('#lag');\n  for (const namn of lagnamn) {\n    const li = document.createElement('li');\n    li.textContent = namn;\n    lista.append(li);\n  }\n</script>\n",
            explain: 'Det fanns bara ett li, som fick ny text och flyttades varje varv. Skapas li inuti loopen blir det ett nytt för varje lag.', hint: 'Var skapas li? Det behövs ett nytt li i varje varv.' },
          { type: 'web', js: true, prompt: 'Gör så att man kan lägga till saker själv. När man klickar på `#lagg-till` ska ett nytt `li` med texten från fältet `#ny` läggas till sist i `#lista`. Kodstig lägger till Bananer och sedan Ost.',
            actions: [{ q: '#ny', value: 'Bananer' }, { q: '#lagg-till' }, { q: '#ny', value: 'Ost' }, { q: '#lagg-till' }],
            starter: '<label for="ny">Ny sak</label>\n<input id="ny">\n<button id="lagg-till">Lägg till</button>\n<ul id="lista"></ul>\n<script>\n\n</script>\n',
            checks: [{ q: '#lista li', min: 2, max: 2, msg: 'Listan har två li efter två klick' }, { q: '#lista li:last-child', text: '^Ost$', msg: 'Ost ligger sist' }],
            solution: "<label for=\"ny\">Ny sak</label>\n<input id=\"ny\">\n<button id=\"lagg-till\">Lägg till</button>\n<ul id=\"lista\"></ul>\n<script>\n  function laggTill() {\n    const li = document.createElement('li');\n    li.textContent = document.querySelector('#ny').value;\n    document.querySelector('#lista').append(li);\n  }\n  document.querySelector('#lagg-till').addEventListener('click', laggTill);\n</script>\n",
            explain: 'Varje klick skapar ett nytt li. Det här är kärnan i alla att göra-listor du har använt.', hint: 'I klickfunktionen: createElement, textContent från fältets value och append till #lista.' },
        ],
      },
      {
        id: 'web-js-project', title: 'Miniprojekt: lista och tärning', tier: 5,
        text: 'Nu bygger du två små appar med allt från kapitlet: en inköpslista där man kan bocka av varor, och ett tärningsspel.\n\nEn nyhet: en funktion kan skrivas **inuti** en annan funktion. I inköpslistan skapar du en liten funktion `bocka` för varje ny vara. Den kommer ihåg just sitt eget `li`, så klick på en vara bockar bara av den varan.\n\nFör slump finns `Math.random()`, som ger ett tal från 0 till strax under 1. Ett tärningsslag får du med `Math.floor(Math.random() * 6) + 1`: gånger 6 ger 0 till 5,99, `Math.floor` avrundar nedåt till 0 till 5, och plus 1 ger 1 till 6. Samma knep väljer ett slumpat värde ur en array: `lista[Math.floor(Math.random() * lista.length)]`.\n\nEftersom slumpen ger nya värden varje gång kontrollerar Kodstig bara att resultatet ser rätt ut, till exempel att det står Du slog och ett tal från 1 till 6.',
        example: T(`
<button id="sla">Slå tärningen</button>
<p id="resultat">Tryck på knappen.</p>
<script>
  // 1. Ett slumpat heltal från 1 till 6
  function sla() {
    const tarning = Math.floor(Math.random() * 6) + 1;
    // 2. Visa resultatet på sidan
    document.querySelector('#resultat').textContent = 'Du slog ' + tarning;
  }
  // 3. Ett nytt slag vid varje klick
  document.querySelector('#sla').addEventListener('click', sla);
</script>`),
        exercises: [
          { type: 'web', js: true, prompt: 'Del 1: Inköpslistan. När man klickar på `#lagg-till` ska varan i `#vara` bli ett nytt `li` i `#lista`. Räkna varorna med en `let`-variabel och visa `Varor: 3` i `#antal` efter tre varor. Töm fältet efter varje vara med `falt.value = \'\';`.',
            actions: [{ q: '#vara', value: 'Mjölk' }, { q: '#lagg-till' }, { q: '#vara', value: 'Bröd' }, { q: '#lagg-till' }, { q: '#vara', value: 'Ägg' }, { q: '#lagg-till' }],
            starter: LISTA_HTML + '<script>\n  // Hitta fältet, listan och antal-stycket\n  // Skriv funktionen laggTill och koppla den till knappen\n\n</script>\n',
            checks: [{ q: '#lista li', min: 3, max: 3, msg: 'Listan har tre varor' }, { q: '#lista li', text: '^Bröd$', msg: 'Bröd finns i listan' }, { q: '#antal', text: '^Varor: 3$', msg: 'Stycket visar Varor: 3' }],
            solution: LISTA_HTML + LISTA_JS1,
            explain: 'Listan växer vid varje klick och räknaren följer med. Att tömma fältet gör det snabbt att skriva nästa vara.', hint: 'Mönstret från förra lektionen plus en räknare: antal = antal + 1; och sedan antalText.textContent = \'Varor: \' + antal;' },
          { type: 'web', js: true, prompt: 'Del 2: Bocka av. Klassen `.klar` stryker över text. Inuti `laggTill`, skriv en funktion `bocka` som växlar klassen `klar` på just det nya `li`, och koppla den till klick på `li`. Kodstig lägger till två varor och klickar sedan på den första.',
            actions: [{ q: '#vara', value: 'Mjölk' }, { q: '#lagg-till' }, { q: '#vara', value: 'Bröd' }, { q: '#lagg-till' }, { q: '#lista li' }],
            starter: LISTA_HTML + LISTA_JS1,
            checks: [{ q: '#lista li', min: 2, max: 2, msg: 'Listan har två varor' }, { q: '#lista li.klar', min: 1, max: 1, msg: 'Precis en vara är avbockad' }, { q: '#lista li:first-child.klar', msg: 'Det är den klickade varan som är avbockad' }],
            solution: LISTA_HTML + LISTA_JS2,
            explain: 'Varje li fick sin egen bocka-funktion som minns just det li:t. Klicka igen, så tar toggle bort strecket.', hint: "Efter li.textContent: function bocka() { li.classList.toggle('klar'); } och li.addEventListener('click', bocka);" },
          { type: 'web', js: true, prompt: 'Del 3: Tärningen. När man klickar på `#sla` ska `#resultat` visa `Du slog` och ett slumpat tal från 1 till 6, till exempel `Du slog 4`. Varje slag ska också läggas till som ett `li` med bara talet i `#historik`. Kodstig slår fem gånger.',
            actions: [{ q: '#sla' }, { q: '#sla' }, { q: '#sla' }, { q: '#sla' }, { q: '#sla' }],
            starter: TARN_HTML + '<script>\n\n</script>\n',
            checks: [{ q: '#resultat', text: '^Du slog [1-6]$', msg: 'Resultatet är Du slog och ett tal från 1 till 6' }, { q: '#historik li', min: 5, max: 5, msg: 'Historiken har fem slag' }, { q: '#historik li', text: '^[1-6]$', msg: 'Historiken visar tal från 1 till 6' }, { source: 'Math\\.random', msg: 'Du använder Math.random' }],
            solution: TARN_HTML + "<script>\n  const historik = document.querySelector('#historik');\n  function sla() {\n    const tarning = Math.floor(Math.random() * 6) + 1;\n    document.querySelector('#resultat').textContent = 'Du slog ' + tarning;\n    const li = document.createElement('li');\n    li.textContent = tarning;\n    historik.append(li);\n  }\n  document.querySelector('#sla').addEventListener('click', sla);\n</script>\n",
            explain: 'Klicka själv några gånger i förhandsvisningen. Historiken visar att alla sex sidor dyker upp förr eller senare.', hint: "const tarning = Math.floor(Math.random() * 6) + 1; och sedan samma createElement-mönster som i listan." },
          { type: 'web', js: true, prompt: 'Del 4: Vem gör vad? Skapa en array med minst fyra sysslor, till exempel Diska och Vattna blommorna. När man klickar på `#slumpa` ska `#syssla` visa `Dagens syssla: ` följt av en slumpad syssla ur arrayen.',
            actions: [{ q: '#slumpa' }],
            starter: SYSSLOR_HTML + '<script>\n\n</script>\n',
            checks: [{ q: '#syssla', text: '^Dagens syssla: \\S', msg: 'Stycket visar Dagens syssla: och en syssla' }, { source: '\\[\\s*([\'"][^\'"]+[\'"]\\s*,\\s*){3,}[\'"][^\'"]+[\'"]\\s*,?\\s*\\]', msg: 'Det finns en array med minst fyra sysslor' }, { source: 'Math\\.random\\(\\)\\s*\\*\\s*\\w+\\.length', msg: 'Du slumpar en plats med Math.random() * arrayens length' }],
            solution: SYSSLOR_HTML + "<script>\n  const sysslor = ['Diska', 'Dammsuga', 'Vattna blommorna', 'Gå ut med soporna'];\n  function slumpa() {\n    const plats = Math.floor(Math.random() * sysslor.length);\n    document.querySelector('#syssla').textContent = 'Dagens syssla: ' + sysslor[plats];\n  }\n  document.querySelector('#slumpa').addEventListener('click', slumpa);\n</script>\n",
            explain: 'Med sysslor.length i stället för 4 fungerar koden även när du lägger till fler sysslor. Samma knep slumpar fram en fråga i ett quiz eller ett lag i en turnering.', hint: "const plats = Math.floor(Math.random() * sysslor.length); och sedan sysslor[plats]." },
        ],
      },
    ],
  },
];
