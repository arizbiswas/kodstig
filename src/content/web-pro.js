// HTML/CSS-spårets fortsättning: avancerad layout, formulär och tillgänglighet,
// modern CSS och tre slutprojekt. Kapitlen läggs efter web1–web6 så att gamla
// lektions-id:n och sparade framsteg fortsätter att stämma.
// Slutprojektens delar bygger på varandra, så HTML och CSS som återkommer ligger i konstanter här uppe.

// Slutprojekt: landningssida
const LAND_HTML = `<header class="sidhuvud">
  <a class="logga" href="#start">Cykelpoolen</a>
  <nav aria-label="Huvudmeny">
    <ul>
      <li><a href="#start">Start</a></li>
      <li><a href="#sa-funkar-det">Så funkar det</a></li>
      <li><a href="#kontakt">Kontakt</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero" id="start">
    <h1>Låna en lådcykel i ditt kvarter</h1>
    <p>Boka på webben, lås upp med koden och kör. Från 49 kr i timmen.</p>
    <a class="knapp" href="#sa-funkar-det">Så funkar det</a>
  </section>
  <section class="funktioner" id="sa-funkar-det">
    <h2>Så funkar det</h2>
    <div class="rutnat">
      <article><h3>Boka</h3><p>Välj en cykel och en tid som passar dig.</p></article>
      <article><h3>Hämta</h3><p>Cyklarna står i ställ runt hela kvarteret.</p></article>
      <article><h3>Lämna</h3><p>Ställ tillbaka cykeln där du hämtade den.</p></article>
    </div>
  </section>
</main>
<footer id="kontakt">
  <p>Cykelpoolen, Storgatan 12, Småstad. hej@cykelpoolen.se</p>
</footer>`;
const LAND_CSS2 = `  :root { --accent: #1f7a5c; --accent-text: #ffffff; --bg: #fbfaf7; --text: #1d2321; --yta: #eef5f1; --radie: 12px; }
  body { margin: 0; background: var(--bg); color: var(--text); line-height: 1.5; }
  .hero h1 { font-size: clamp(2rem, 6vw, 3.5rem); line-height: 1.1; }
  .knapp { display: inline-block; background: var(--accent); color: var(--accent-text); padding: 12px 20px; border-radius: var(--radie); text-decoration: none; }`;
const LAND_CSS3 = `${LAND_CSS2}
  .sidhuvud { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding: 12px 16px; }
  .sidhuvud ul { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
  main { max-width: 960px; margin-inline: auto; padding: 0 16px; }
  .rutnat { display: grid; gap: 16px; grid-template-columns: 1fr; }
  .rutnat article { background: var(--yta); padding: 16px; border-radius: var(--radie); }
  @media (min-width: 700px) {
    .rutnat { grid-template-columns: repeat(3, 1fr); }
  }`;
const LAND_CSS4 = `${LAND_CSS3}
  .knapp { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .knapp:hover, .knapp:focus-visible { transform: translateY(-2px); box-shadow: 0 6px 14px rgb(0 0 0 / 0.15); }
  a:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) {
    .knapp { transition: none; }
  }`;

// Slutprojekt: portfolio
const PORT_CARDS = `    <div class="kortlista">
      <article class="projektkort">
        <img src="https://picsum.photos/id/0/600/400" alt="Laptop på ett skrivbord">
        <h3>Bokningssida för frisör</h3>
        <p>Responsiv sida med formulär för tidsbokning.</p>
        <a href="#">Läs om bokningssidan</a>
      </article>
      <article class="projektkort">
        <img src="https://picsum.photos/id/180/600/400" alt="Anteckningsbok bredvid en dator">
        <h3>Väderdagbok</h3>
        <p>En lättläst sida som visar veckans väder.</p>
        <a href="#">Läs om väderdagboken</a>
      </article>
      <article class="projektkort">
        <img src="https://picsum.photos/id/292/600/400" alt="Grönsaker på en skärbräda">
        <h3>Receptsamling</h3>
        <p>Recept med tydliga steg och utskriftsvänlig stil.</p>
        <a href="#">Läs om receptsamlingen</a>
      </article>
    </div>
`;
const port = (cards) => `<a class="hoppa" href="#innehall">Hoppa till innehållet</a>
<header class="sidhuvud">
  <a href="#">Sara Lind</a>
  <nav aria-label="Huvudmeny">
    <a href="#projekt">Projekt</a>
    <a href="#kontakt">Kontakt</a>
  </nav>
</header>
<main id="innehall">
  <h1>Hej, jag är Sara. Jag bygger tillgängliga webbsidor.</h1>
  <section class="projekt" id="projekt">
    <h2>Utvalda projekt</h2>
${cards}  </section>
</main>
<footer id="kontakt">
  <p>Mejla mig: sara@example.se</p>
</footer>`;
const PORT_CSS1 = `  .hoppa { position: absolute; left: -9999px; }
  .hoppa:focus { left: 16px; top: 16px; background: #ffffff; padding: 8px 12px; z-index: 10; }
  .sidhuvud { position: sticky; top: 0; background: #ffffff; display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; }
  .sidhuvud nav { display: flex; gap: 16px; }`;
const PORT_CSS2 = `${PORT_CSS1}
  .kortlista { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
  .projektkort { background: #f4f2fa; padding: 12px; border-radius: 12px; }
  .projektkort img { display: block; width: 100%; height: auto; border-radius: 8px; }`;
const PORT_CSS3 = `${PORT_CSS2}
  .projektkort { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .projektkort:hover, .projektkort:focus-within { transform: translateY(-4px); box-shadow: 0 8px 20px rgb(0 0 0 / 0.15); }
  @media (prefers-reduced-motion: reduce) {
    .projektkort { transition: none; }
  }`;
const PORT_CSS4 = `  :root { color-scheme: light dark; --bg: #ffffff; --text: #1f1d2b; --yta: #f4f2fa; --accent: #5a3fb0; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #16141d; --text: #ece9f5; --yta: #24212e; --accent: #c7b6ff; }
  }
  body { background: var(--bg); color: var(--text); }
  a { color: var(--accent); }
  .hoppa { position: absolute; left: -9999px; }
  .hoppa:focus { left: 16px; top: 16px; background: var(--bg); padding: 8px 12px; z-index: 10; }
  .sidhuvud { position: sticky; top: 0; background: var(--bg); display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; }
  .sidhuvud nav { display: flex; gap: 16px; }
  .kortlista { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
  .projektkort { background: var(--yta); padding: 12px; border-radius: 12px; }
  .projektkort img { display: block; width: 100%; height: auto; border-radius: 8px; }
  .projektkort { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .projektkort:hover, .projektkort:focus-within { transform: translateY(-4px); box-shadow: 0 8px 20px rgb(0 0 0 / 0.15); }
  @media (prefers-reduced-motion: reduce) {
    .projektkort { transition: none; }
  }`;

// Slutprojekt: registreringsformulär
const SIGN_OM = `  <h2>Gå med i kodklubben</h2>
  <fieldset>
    <legend>Om dig</legend>
    <div class="namnrad">
      <div class="falt">
        <label for="fornamn">Förnamn</label>
        <input id="fornamn" name="fornamn" autocomplete="given-name" required>
      </div>
      <div class="falt">
        <label for="efternamn">Efternamn</label>
        <input id="efternamn" name="efternamn" autocomplete="family-name" required>
      </div>
    </div>
  </fieldset>
`;
const SIGN_NIVA = `  <fieldset>
    <legend>Erfarenhet</legend>
    <div class="val"><input type="radio" id="niva-ny" name="niva" value="ny" required><label for="niva-ny">Helt ny</label></div>
    <div class="val"><input type="radio" id="niva-lite" name="niva" value="lite"><label for="niva-lite">Har testat lite</label></div>
    <div class="val"><input type="radio" id="niva-van" name="niva" value="van"><label for="niva-van">Van</label></div>
  </fieldset>
  <button type="submit">Skapa konto</button>
`;
const SIGN_F1 = `<form class="registrering">
${SIGN_OM}  <fieldset>
    <legend>Konto</legend>
    <div class="falt">
      <label for="epost">E-post</label>
      <input id="epost" name="epost" type="email" autocomplete="email" required>
    </div>
    <div class="falt">
      <label for="losenord">Lösenord</label>
      <input id="losenord" name="losenord" type="password" autocomplete="new-password" minlength="8" required>
    </div>
  </fieldset>
${SIGN_NIVA}</form>`;
const SIGN_F2 = `<form class="registrering">
${SIGN_OM}  <fieldset>
    <legend>Konto</legend>
    <div class="falt">
      <label for="anvandarnamn">Användarnamn</label>
      <input id="anvandarnamn" name="anvandarnamn" autocomplete="username" pattern="[a-z0-9_]{3,16}" aria-describedby="anvandarnamn-hjalp" required>
      <p class="hjalp" id="anvandarnamn-hjalp">3 till 16 tecken: små bokstäver, siffror och understreck.</p>
    </div>
    <div class="falt">
      <label for="epost">E-post</label>
      <input id="epost" name="epost" type="email" autocomplete="email" required>
    </div>
    <div class="falt">
      <label for="losenord">Lösenord</label>
      <input id="losenord" name="losenord" type="password" autocomplete="new-password" minlength="8" aria-describedby="losenord-hjalp" required>
      <p class="hjalp" id="losenord-hjalp">Minst 8 tecken.</p>
    </div>
  </fieldset>
${SIGN_NIVA}</form>`;
const SIGN_CSS3 = `  input { font: inherit; padding: 8px 10px; border: 2px solid #8a8799; border-radius: 8px; }
  input:focus-visible { outline: 3px solid #6b4fbb; outline-offset: 2px; }
  input:user-invalid { border-color: #b3261e; }
  .hjalp { font-size: 0.875rem; color: #5c596b; margin: 4px 0 0; }`;
const SIGN_CSS4 = `${SIGN_CSS3}
  .registrering { display: grid; gap: 16px; max-width: 560px; }
  fieldset { display: grid; gap: 12px; border: 1px solid #d6d3e0; border-radius: 12px; }
  .falt { display: grid; gap: 4px; }
  .namnrad { display: grid; gap: 12px; }
  button[type="submit"] { justify-self: start; font: inherit; padding: 10px 18px; border: 0; border-radius: 8px; background: #6b4fbb; color: white; }
  @media (min-width: 520px) {
    .namnrad { grid-template-columns: 1fr 1fr; }
  }`;
const style = (css) => `<style>\n${css}\n</style>\n`;

export default [
  {
    id: 'web7',
    title: 'Avancerad layout',
    lessons: [
      {
        id: 'web-flex-adv', title: 'Flexbox på djupet', tier: 4,
        text: 'Flexbox har två axlar. `justify-content` fördelar barnen längs **huvudaxeln**, som är raden, och `align-items` placerar dem längs **tväraxeln**. Med `flex-wrap: wrap;` får barnen bryta till en ny rad i stället för att tryckas ihop, och `gap` ger jämna avstånd utan att du behöver marginaler.\n\n`flex` är en förkortning av tre värden: `flex-grow` (hur mycket barnet får växa), `flex-shrink` (hur mycket det får krympa) och `flex-basis` (storleken det utgår från). `flex: 1;` betyder att barnet tar sin del av den lediga platsen.\n\nI riktiga projekt används flexbox till saker i en dimension: en navigeringsrad med logga till vänster och länkar till höger, en rad kort som bryter snyggt, eller en sidfot som alltid ligger längst ner.',
        example: '<style>\n  .topp { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px; background: #f6f2ff; }\n  .meny { display: flex; gap: 12px; list-style: none; margin: 0; padding: 0; }\n  .kort-rad { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; }\n  .kort-rad div { flex: 1 1 140px; padding: 12px; background: #eef6ff; }\n</style>\n<header class="topp">\n  <strong>Kafé Kod</strong>\n  <nav>\n    <ul class="meny">\n      <li><a href="#">Meny</a></li>\n      <li><a href="#">Hitta hit</a></li>\n    </ul>\n  </nav>\n</header>\n<div class="kort-rad">\n  <div>Kaffe</div>\n  <div>Te</div>\n  <div>Bulle</div>\n</div>',
        exercises: [
          { type: 'choice', prompt: 'En flexrad har tre barn och `justify-content: space-between;`. Var hamnar de?', options: ['Första och sista barnet hamnar vid kanterna, och den lediga platsen delas mellan barnen', 'Alla tre samlas i mitten', 'Barnen sträcks ut så att de fyller hela raden'], answer: 0,
            explain: 'space-between lägger all ledig plats mellan barnen, ingen utanför. Perfekt för logga till vänster och meny till höger.',
            why: { 1: 'Det är justify-content: center som samlar barnen i mitten.', 2: 'justify-content ändrar inte barnens storlek, den flyttar bara den lediga platsen. Att växa gör man med flex-grow.' } },
          { type: 'choice', prompt: 'En rad har en logga, ett sökfält och en knapp. Sökfältet har `flex: 1;`. Vad händer?', code: '<style>\n  .rad { display: flex; gap: 8px; }\n  .sok { flex: 1; }\n</style>', options: ['Sökfältet tar all ledig plats som blir över', 'Sökfältet blir exakt 1px brett', 'Sökfältet hamnar på en egen rad'], answer: 0,
            explain: 'flex: 1 ger flex-grow: 1. Loggan och knappen behåller sin storlek och sökfältet fyller resten.',
            why: { 1: 'Talet i flex är en andel av den lediga platsen, inte en längd i pixlar.', 2: 'Ett barn bryter bara till ny rad med flex-wrap: wrap när platsen tar slut. flex: 1 gör tvärtom att det växer på samma rad.' } },
          { type: 'fill', prompt: 'Låt bilderna bryta till nya rader och få 12px mellanrum.', code: '<style>\n  .galleri {\n    display: flex;\n    flex-___: wrap;\n    ___: 12px;\n  }\n</style>', answers: [['wrap'], ['gap']], explain: 'flex-wrap: wrap låter raden bryta, och gap ger avstånd både mellan kolumner och rader.' },
          { type: 'web', prompt: 'Bygg en navigeringsrad. Gör `.topp` till en flexrad med `justify-content: space-between` och `align-items: center`, så att loggan hamnar till vänster och menyn till höger. Gör sedan `.meny` till en flexrad med `gap` och ta bort punkterna med `list-style: none`.',
            starter: '<style>\n  .topp { padding: 12px 16px; background: #f6f2ff; }\n  .meny { margin: 0; padding: 0; }\n</style>\n<header class="topp">\n  <a class="logga" href="#">Kafé Kod</a>\n  <nav>\n    <ul class="meny">\n      <li><a href="#">Meny</a></li>\n      <li><a href="#">Öppettider</a></li>\n      <li><a href="#">Kontakt</a></li>\n    </ul>\n  </nav>\n</header>\n',
            checks: [{ css: '.topp', prop: 'display', re: '^flex$', msg: '.topp har display: flex' }, { css: '.topp', prop: 'justify-content', re: 'space-between', msg: '.topp har justify-content: space-between' }, { css: '.topp', prop: 'align-items', re: 'center', msg: '.topp har align-items: center' }, { css: '.meny', prop: 'display', re: '^flex$', msg: '.meny har display: flex' }, { css: '.meny', prop: 'gap', msg: '.meny har gap' }, { css: '.meny', prop: 'list-style(-type)?', re: 'none', msg: '.meny har list-style: none' }],
            solution: '<style>\n  .topp { padding: 12px 16px; background: #f6f2ff; display: flex; justify-content: space-between; align-items: center; }\n  .meny { margin: 0; padding: 0; display: flex; gap: 16px; list-style: none; }\n</style>\n<header class="topp">\n  <a class="logga" href="#">Kafé Kod</a>\n  <nav>\n    <ul class="meny">\n      <li><a href="#">Meny</a></li>\n      <li><a href="#">Öppettider</a></li>\n      <li><a href="#">Kontakt</a></li>\n    </ul>\n  </nav>\n</header>',
            explain: 'Två flexrader i varandra: den yttre fördelar logga och meny, den inre lägger länkarna bredvid varandra. Menyn är fortfarande en lista, vilket skärmläsare har nytta av.', hint: 'Tre deklarationer i .topp och tre i .meny.' },
          { type: 'web', prompt: 'Korten trycks ihop på smala skärmar. Ge `.kort-rad` `flex-wrap: wrap` och ett `gap`, och ge `.kort` `flex: 1 1 200px` så att varje kort utgår från 200px men får växa och krympa.',
            starter: '<style>\n  .kort-rad { display: flex; }\n  .kort { padding: 12px; background: #eef6ff; border-radius: 8px; }\n</style>\n<div class="kort-rad">\n  <div class="kort">Kanelbulle, 35 kr</div>\n  <div class="kort">Kardemummabulle, 38 kr</div>\n  <div class="kort">Chokladboll, 25 kr</div>\n  <div class="kort">Morotskaka, 45 kr</div>\n</div>\n',
            checks: [{ css: '.kort-rad', prop: 'flex-wrap', re: '^wrap$', msg: '.kort-rad har flex-wrap: wrap' }, { css: '.kort-rad', prop: 'gap', msg: '.kort-rad har gap' }, { css: '.kort', prop: 'flex', re: '^1\\s+1\\s+200px$', msg: '.kort har flex: 1 1 200px' }],
            solution: '<style>\n  .kort-rad { display: flex; flex-wrap: wrap; gap: 12px; }\n  .kort { padding: 12px; background: #eef6ff; border-radius: 8px; flex: 1 1 200px; }\n</style>\n<div class="kort-rad">\n  <div class="kort">Kanelbulle, 35 kr</div>\n  <div class="kort">Kardemummabulle, 38 kr</div>\n  <div class="kort">Chokladboll, 25 kr</div>\n  <div class="kort">Morotskaka, 45 kr</div>\n</div>',
            explain: 'När raden blir smalare än korten tillsammans bryter de till en ny rad, och de som är kvar växer för att fylla bredden.', hint: 'flex-wrap och gap på raden, flex: 1 1 200px på korten.' },
          { type: 'web', prompt: 'Sidfoten ska ligga längst ner även när innehållet är kort. Gör `.sida` till en flexkolumn (`display: flex` och `flex-direction: column`) med `min-height: 100vh`, och ge `main` `flex: 1` så att den fyller platsen som blir över.',
            starter: '<style>\n  .sidfot { background: #1f1d2b; color: white; padding: 12px; }\n</style>\n<div class="sida">\n  <header><h1>Kafé Kod</h1></header>\n  <main><p>Välkommen in på en kopp.</p></main>\n  <footer class="sidfot">Öppet alla dagar 8 till 17</footer>\n</div>\n',
            checks: [{ css: '.sida', prop: 'display', re: '^flex$', msg: '.sida har display: flex' }, { css: '.sida', prop: 'flex-direction', re: '^column$', msg: '.sida har flex-direction: column' }, { css: '.sida', prop: 'min-height', msg: '.sida har en min-height' }, { css: 'main', prop: 'flex(-grow)?', re: '^1', msg: 'main har flex: 1' }],
            solution: '<style>\n  .sida { display: flex; flex-direction: column; min-height: 100vh; }\n  main { flex: 1; }\n  .sidfot { background: #1f1d2b; color: white; padding: 12px; }\n</style>\n<div class="sida">\n  <header><h1>Kafé Kod</h1></header>\n  <main><p>Välkommen in på en kopp.</p></main>\n  <footer class="sidfot">Öppet alla dagar 8 till 17</footer>\n</div>',
            explain: 'main växer och knuffar ner sidfoten. Det här mönstret finns på nästan alla webbplatser.', hint: 'Tre deklarationer i .sida och en ny regel för main.' },
        ],
      },
      {
        id: 'web-grid-areas', title: 'Grid med områden', tier: 4,
        text: 'Med `grid-template-areas` ritar du layouten med ord. Varje textsträng är en rad och varje ord en cell. Skriver du samma namn två gånger på en rad sträcker sig området över två kolumner. En punkt `.` betyder en tom cell.\n\nSedan talar du om var varje element ska ligga med `grid-area: namn;`. Namnen hittar du på själv, men de måste stämma överens mellan mallen och elementen, och alla rader måste ha lika många celler.\n\nDet fina är att du kan byta hela layouten i en mediefråga utan att röra HTML:en. På en smal skärm skriver du bara om mallen till en kolumn.',
        example: '<style>\n  .sida {\n    display: grid;\n    grid-template-columns: 160px 1fr;\n    grid-template-areas:\n      "header header"\n      "sidebar main"\n      "footer footer";\n    gap: 12px;\n  }\n  header { grid-area: header; }\n  aside { grid-area: sidebar; }\n  main { grid-area: main; }\n  footer { grid-area: footer; }\n  .sida > * { background: #f6f2ff; padding: 12px; }\n  @media (max-width: 600px) {\n    .sida {\n      grid-template-columns: 1fr;\n      grid-template-areas: "header" "sidebar" "main" "footer";\n    }\n  }\n</style>\n<div class="sida">\n  <header>Sidhuvud</header>\n  <aside>Meny</aside>\n  <main>Innehåll</main>\n  <footer>Sidfot</footer>\n</div>',
        exercises: [
          { type: 'choice', prompt: 'Vad betyder raden `"header header"` i `grid-template-areas`?', options: ['Området header sträcker sig över båda kolumnerna', 'Det finns två olika sidhuvuden', 'Det är ett fel, ett namn får bara stå en gång'], answer: 0,
            explain: 'Samma namn i flera celler bredvid varandra slår ihop cellerna till ett område.',
            why: { 1: 'Ett namn pekar alltid på ett och samma område. Två ord blir två celler i samma område.', 2: 'Att upprepa namn är själva poängen. Så skapar man områden som spänner över flera celler.' } },
          { type: 'choice', prompt: 'Varför fungerar inte den här mallen?', code: '<style>\n  .sida {\n    grid-template-areas:\n      "sidebar main"\n      "footer";\n  }\n</style>', options: ['Alla rader måste ha lika många celler', 'Namnen måste vara samma som taggarnas namn', 'Mallen får bara ha en rad'], answer: 0,
            explain: 'Första raden har två celler och andra bara en. Då blir mallen ogiltig och ignoreras helt. Skriv "footer footer".',
            why: { 1: 'Namnen är fria. Att de här råkar likna taggnamn gör det bara lättare att läsa.', 2: 'En mall kan ha hur många rader som helst, en sträng per rad.' } },
          { type: 'fill', prompt: 'Fyll i egenskapen för mallen och egenskapen som placerar sidhuvudet.', code: '<style>\n  .sida { grid-template-___: "header" "main"; }\n  header { ___: header; }\n</style>', answers: [['areas'], ['grid-area']], explain: 'grid-template-areas ritar mallen och grid-area placerar elementet i ett område.' },
          { type: 'web', prompt: 'Ge `.sida` en `grid-template-areas` med tre rader: `header` över båda kolumnerna, sedan `sidebar` och `main`, och sist `footer` över båda kolumnerna. Placera sedan `header`, `aside`, `main` och `footer` med `grid-area` (använd taggarna som väljare).',
            starter: '<style>\n  .sida { display: grid; grid-template-columns: 200px 1fr; gap: 16px; }\n  .sida > * { background: #f6f2ff; padding: 12px; }\n</style>\n<div class="sida">\n  <header><h1>Bibliotekets blogg</h1></header>\n  <aside>Kategorier</aside>\n  <main>Veckans boktips</main>\n  <footer>Kontakta oss</footer>\n</div>\n',
            checks: [{ css: '.sida', prop: 'grid-template-areas', re: 'header\\s+header[\\s\\S]*sidebar\\s+main[\\s\\S]*footer\\s+footer', msg: '.sida har en mall med header, sidebar main och footer' }, { css: 'header', prop: 'grid-area', re: '^header$', msg: 'header har grid-area: header' }, { css: 'aside', prop: 'grid-area', re: '^sidebar$', msg: 'aside har grid-area: sidebar' }, { css: 'main', prop: 'grid-area', re: '^main$', msg: 'main har grid-area: main' }, { css: 'footer', prop: 'grid-area', re: '^footer$', msg: 'footer har grid-area: footer' }],
            solution: '<style>\n  .sida {\n    display: grid;\n    grid-template-columns: 200px 1fr;\n    grid-template-areas:\n      "header header"\n      "sidebar main"\n      "footer footer";\n    gap: 16px;\n  }\n  header { grid-area: header; }\n  aside { grid-area: sidebar; }\n  main { grid-area: main; }\n  footer { grid-area: footer; }\n  .sida > * { background: #f6f2ff; padding: 12px; }\n</style>\n<div class="sida">\n  <header><h1>Bibliotekets blogg</h1></header>\n  <aside>Kategorier</aside>\n  <main>Veckans boktips</main>\n  <footer>Kontakta oss</footer>\n</div>',
            explain: 'Mallen visar layouten nästan som en bild. Den som läser CSS:en ser direkt hur sidan är uppbyggd.', hint: 'Tre strängar efter varandra: "header header" "sidebar main" "footer footer".' },
          { type: 'web', prompt: 'Gör layouten mobilvänlig. Lägg till `@media (max-width: 600px)` där `.sida` får `grid-template-columns: 1fr` och en mall med en kolumn: `"header" "sidebar" "main" "footer"`.',
            starter: '<style>\n  .sida {\n    display: grid;\n    grid-template-columns: 200px 1fr;\n    grid-template-areas:\n      "header header"\n      "sidebar main"\n      "footer footer";\n    gap: 16px;\n  }\n  header { grid-area: header; }\n  aside { grid-area: sidebar; }\n  main { grid-area: main; }\n  footer { grid-area: footer; }\n  .sida > * { background: #f6f2ff; padding: 12px; }\n</style>\n<div class="sida">\n  <header><h1>Bibliotekets blogg</h1></header>\n  <aside>Kategorier</aside>\n  <main>Veckans boktips</main>\n  <footer>Kontakta oss</footer>\n</div>\n',
            checks: [{ media: true, re: 'max-width', msg: 'Det finns en mediefråga med max-width' }, { css: '.sida', prop: 'grid-template-columns', re: '^1fr$', inMedia: true, msg: 'I mediefrågan har .sida grid-template-columns: 1fr' }, { css: '.sida', prop: 'grid-template-areas', re: '[\\x22\\x27]header[\\x22\\x27]\\s*[\\x22\\x27]sidebar[\\x22\\x27]\\s*[\\x22\\x27]main[\\x22\\x27]\\s*[\\x22\\x27]footer[\\x22\\x27]', inMedia: true, msg: 'I mediefrågan har mallen en kolumn i ordningen header, sidebar, main, footer' }, { css: '.sida', prop: 'grid-template-areas', re: 'header\\s+header', msg: 'Den breda mallen finns kvar utanför mediefrågan' }],
            solution: '<style>\n  .sida {\n    display: grid;\n    grid-template-columns: 200px 1fr;\n    grid-template-areas:\n      "header header"\n      "sidebar main"\n      "footer footer";\n    gap: 16px;\n  }\n  header { grid-area: header; }\n  aside { grid-area: sidebar; }\n  main { grid-area: main; }\n  footer { grid-area: footer; }\n  .sida > * { background: #f6f2ff; padding: 12px; }\n  @media (max-width: 600px) {\n    .sida {\n      grid-template-columns: 1fr;\n      grid-template-areas: "header" "sidebar" "main" "footer";\n    }\n  }\n</style>\n<div class="sida">\n  <header><h1>Bibliotekets blogg</h1></header>\n  <aside>Kategorier</aside>\n  <main>Veckans boktips</main>\n  <footer>Kontakta oss</footer>\n</div>',
            explain: 'Elementen behåller sina grid-area, bara mallen byts. Därför räcker det med två rader CSS för en helt ny layout.', hint: 'Skriv om .sida inuti @media (max-width: 600px) { ... }.' },
          { type: 'choice', prompt: 'Layouten ska byta till en kolumn på mobil. Vad behöver du ändra i HTML:en?', options: ['Ingenting, det räcker att ändra mallen och kolumnerna i CSS', 'Flytta elementen så att de står i rätt ordning för mobil', 'Ge varje element en ny klass för mobil'], answer: 0,
            explain: 'Placeringen styrs helt av grid-template-areas, så HTML:en kan stå kvar i sin logiska ordning.',
            why: { 1: 'Ordningen i mallen bestämmer var elementen hamnar, inte ordningen i HTML. Håll ändå HTML:en i en logisk läsordning, för det är den skärmläsare följer.', 2: 'Elementen har redan sina grid-area. Det är mallen som byts i mediefrågan.' } },
        ],
      },
      {
        id: 'web-position', title: 'Positionering', tier: 4,
        text: 'Normalt ligger element i **flödet**, efter varandra. Med `position` kan du flytta ut dem. `relative` låter elementet ligga kvar men gör det till en referenspunkt. `absolute` lyfter ut elementet ur flödet och placerar det med `top`, `right`, `bottom` och `left` i förhållande till närmaste förälder som har en position.\n\n`fixed` placeras mot själva fönstret och följer med när man skrollar. `sticky` ligger i flödet tills man skrollar förbi det, och fastnar sedan vid till exempel `top: 0`.\n\nNär positionerade element överlappar avgör `z-index` vilket som ligger överst: högre tal hamnar framför. Typiska exempel är en etikett i hörnet av ett kort och ett sidhuvud som stannar kvar högst upp.',
        example: '<style>\n  .topp { position: sticky; top: 0; z-index: 10; background: #6b4fbb; color: white; padding: 8px 12px; }\n  .kort { position: relative; max-width: 220px; padding: 12px; background: #f6f2ff; border-radius: 12px; margin-top: 12px; }\n  .etikett { position: absolute; top: 8px; right: 8px; background: #f2c94c; padding: 2px 8px; border-radius: 999px; font-size: 14px; }\n</style>\n<header class="topp">Kafé Kod</header>\n<article class="kort">\n  <img src="https://picsum.photos/id/431/200/120" alt="En kopp kaffe på ett träbord">\n  <span class="etikett">Nyhet</span>\n  <h3>Havrelatte</h3>\n</article>',
        exercises: [
          { type: 'choice', prompt: 'Etiketten ska ligga i kortets hörn men hamnar i sidans övre högra hörn. Varför?', code: '<style>\n  .kort { padding: 12px; }\n  .etikett { position: absolute; top: 8px; right: 8px; }\n</style>', options: ['Kortet saknar position: relative, så etiketten placeras mot sidan', 'top och right fungerar bara med position: fixed', 'Etiketten saknar z-index'], answer: 0,
            explain: 'absolute placeras mot närmaste förälder som har en position. Utan position: relative på kortet blir det hela sidan.',
            why: { 1: 'top och right fungerar med relative, absolute, fixed och sticky. Det är bara static som ignorerar dem.', 2: 'z-index styr vad som ligger överst, inte var elementet hamnar.' } },
          { type: 'choice', prompt: 'Vilken position ligger kvar i flödet tills man skrollar förbi, och fastnar sedan?', options: ['position: sticky', 'position: fixed', 'position: absolute'], answer: 0,
            explain: 'sticky beter sig som ett vanligt element tills tröskeln, till exempel top: 0, nås.',
            why: { 1: 'fixed är lyft ur flödet från början och sitter alltid på samma plats i fönstret.', 2: 'absolute är också lyft ur flödet och följer med sin förälder när man skrollar.' } },
          { type: 'fill', prompt: 'Få menyn att fastna högst upp och ligga framför annat innehåll.', code: '<style>\n  .meny {\n    position: ___;\n    top: 0;\n    ___: 10;\n  }\n</style>', answers: [['sticky'], ['z-index']], explain: 'sticky med top: 0 fäster menyn, och z-index lägger den över innehållet som skrollar under.' },
          { type: 'web', prompt: 'Placera etiketten `Rea` i kortets övre högra hörn. Ge `.kort` `position: relative` och `.etikett` `position: absolute` med `top` och `right`.',
            starter: '<style>\n  .kort { max-width: 240px; padding: 12px; background: #f6f2ff; border-radius: 12px; }\n  .kort img { max-width: 100%; }\n  .etikett { background: #f2c94c; padding: 2px 8px; border-radius: 999px; }\n</style>\n<article class="kort">\n  <img src="https://picsum.photos/id/1080/240/160" alt="Jordgubbar i en skål">\n  <span class="etikett">Rea</span>\n  <h3>Jordgubbstårta</h3>\n  <p>59 kr</p>\n</article>\n',
            checks: [{ css: '.kort', prop: 'position', re: '^relative$', msg: '.kort har position: relative' }, { css: '.etikett', prop: 'position', re: '^absolute$', msg: '.etikett har position: absolute' }, { css: '.etikett', prop: 'top', msg: '.etikett har ett top-värde' }, { css: '.etikett', prop: 'right', msg: '.etikett har ett right-värde' }],
            solution: '<style>\n  .kort { position: relative; max-width: 240px; padding: 12px; background: #f6f2ff; border-radius: 12px; }\n  .kort img { max-width: 100%; }\n  .etikett { position: absolute; top: 20px; right: 20px; background: #f2c94c; padding: 2px 8px; border-radius: 999px; }\n</style>\n<article class="kort">\n  <img src="https://picsum.photos/id/1080/240/160" alt="Jordgubbar i en skål">\n  <span class="etikett">Rea</span>\n  <h3>Jordgubbstårta</h3>\n  <p>59 kr</p>\n</article>',
            explain: 'Kortet är referenspunkten, så etiketten följer med kortet vart det än hamnar på sidan.', hint: 'position: relative på .kort, och position: absolute; top: ...; right: ...; på .etikett.' },
          { type: 'web', prompt: 'Gör sidhuvudet `.topp` klistrigt: `position: sticky`, `top: 0`, ett `z-index` och en bakgrundsfärg så att texten under inte syns igenom. Skrolla i förhandsvisningen och se det fastna.',
            starter: '<style>\n  .topp { padding: 12px; }\n</style>\n<header class="topp"><strong>Receptboken</strong></header>\n<main>\n  <h1>Pannkakor</h1>\n  <p>Vispa ihop mjöl och salt med hälften av mjölken till en slät smet.</p>\n  <p>Vispa i resten av mjölken och äggen. Låt smeten vila en stund.</p>\n  <p>Smält smör i stekpannan och häll i ett tunt lager smet.</p>\n  <p>Vänd pannkakan när undersidan har fått färg.</p>\n  <p>Servera med sylt och grädde.</p>\n  <p>Pannkakor går bra att frysa och värma igen.</p>\n</main>\n',
            checks: [{ css: '.topp', prop: 'position', re: '^sticky$', msg: '.topp har position: sticky' }, { css: '.topp', prop: 'top', re: '^0(px)?$', msg: '.topp har top: 0' }, { css: '.topp', prop: 'z-index', re: '^\\d+$', msg: '.topp har ett z-index' }, { css: '.topp', prop: 'background(-color)?', msg: '.topp har en bakgrund' }],
            solution: '<style>\n  .topp { padding: 12px; position: sticky; top: 0; z-index: 10; background: #fffdf7; }\n</style>\n<header class="topp"><strong>Receptboken</strong></header>\n<main>\n  <h1>Pannkakor</h1>\n  <p>Vispa ihop mjöl och salt med hälften av mjölken till en slät smet.</p>\n  <p>Vispa i resten av mjölken och äggen. Låt smeten vila en stund.</p>\n  <p>Smält smör i stekpannan och häll i ett tunt lager smet.</p>\n  <p>Vänd pannkakan när undersidan har fått färg.</p>\n  <p>Servera med sylt och grädde.</p>\n  <p>Pannkakor går bra att frysa och värma igen.</p>\n</main>',
            explain: 'Utan bakgrund blir sidhuvudet genomskinligt och texten krockar. Utan z-index kan andra positionerade element hamna framför.', hint: 'Fyra deklarationer i .topp: position, top, z-index och background.' },
          { type: 'web', prompt: 'Gör länken `.upp` till en knapp som alltid syns i fönstrets nedre högra hörn: `position: fixed` med `bottom` och `right`.',
            starter: '<style>\n  .upp { background: #6b4fbb; color: white; padding: 8px 12px; border-radius: 999px; text-decoration: none; }\n</style>\n<h1 id="topp">Veckans recept</h1>\n<p>Måndag: linssoppa.</p>\n<p>Tisdag: pasta med tomatsås.</p>\n<p>Onsdag: fiskgratäng.</p>\n<p>Torsdag: ärtsoppa och pannkakor.</p>\n<p>Fredag: tacos.</p>\n<a class="upp" href="#topp">Till toppen</a>\n',
            checks: [{ css: '.upp', prop: 'position', re: '^fixed$', msg: '.upp har position: fixed' }, { css: '.upp', prop: 'bottom', msg: '.upp har ett bottom-värde' }, { css: '.upp', prop: 'right', msg: '.upp har ett right-värde' }],
            solution: '<style>\n  .upp { position: fixed; bottom: 16px; right: 16px; background: #6b4fbb; color: white; padding: 8px 12px; border-radius: 999px; text-decoration: none; }\n</style>\n<h1 id="topp">Veckans recept</h1>\n<p>Måndag: linssoppa.</p>\n<p>Tisdag: pasta med tomatsås.</p>\n<p>Onsdag: fiskgratäng.</p>\n<p>Torsdag: ärtsoppa och pannkakor.</p>\n<p>Fredag: tacos.</p>\n<a class="upp" href="#topp">Till toppen</a>',
            explain: 'fixed placeras mot fönstret, så knappen ligger kvar i hörnet vart man än skrollar. Använd det sparsamt, eftersom det täcker innehåll på små skärmar.', hint: 'position: fixed; bottom: 16px; right: 16px;' },
        ],
      },
      {
        id: 'web-units', title: 'Enheter och flytande storlekar', tier: 4,
        text: '`px` är en fast storlek. `rem` utgår från sidans grundstorlek på text, oftast 16px, och följer med om användaren har valt större text i webbläsaren. `em` utgår från elementets egen textstorlek, vilket passar för padding på en knapp som ska växa med texten. `%` är en andel av föräldern, och `vw` och `vh` är en hundradel av fönstrets bredd och höjd.\n\nLång text är svår att läsa om raderna blir för breda. `max-width` tillsammans med `margin: 0 auto;` ger en lagom bred kolumn som centreras.\n\nMed `clamp(min, önskat, max)` får du storlekar som flyter med skärmen men håller sig inom gränser, till exempel `font-size: clamp(1.5rem, 5vw, 3rem);`. `min()` och `max()` väljer det minsta eller största av flera värden: `width: min(100%, 400px);` blir aldrig bredare än föräldern.',
        example: '<style>\n  main { max-width: 600px; margin: 0 auto; padding: 0 1rem; }\n  h1 { font-size: clamp(1.75rem, 5vw, 3rem); }\n  p { font-size: 1.125rem; }\n  .knapp { font-size: 1rem; padding: 0.5em 1em; }\n  img { width: min(100%, 400px); }\n</style>\n<main>\n  <h1>Flytande rubrik</h1>\n  <p>Ändra fönstrets bredd och se hur rubriken växer, men bara lagom mycket.</p>\n  <img src="https://picsum.photos/id/1015/800/400" alt="En flod som slingrar sig genom en dal">\n  <p><button class="knapp">Läs mer</button></p>\n</main>',
        exercises: [
          { type: 'choice', prompt: 'Sidans grundstorlek är 16px. Hur stor blir texten?', code: '<style>\n  h2 { font-size: 1.5rem; }\n</style>', options: ['24px', '1.5px', '150px'], answer: 0,
            explain: '1.5 gånger 16px blir 24px.',
            why: { 1: 'rem är en multiplikator av grundstorleken, inte en egen pixelstorlek.', 2: 'Det skulle vara 1.5 gånger 100. rem räknas mot grundstorleken, som oftast är 16px.' } },
          { type: 'choice', prompt: 'Varför använder många `rem` i stället för `px` för textstorlek?', options: ['rem följer med när användaren ställer in större text i webbläsaren', 'rem gör sidan snabbare att ladda', 'px fungerar inte på mobiler'], answer: 0,
            explain: 'Den som ser dåligt kan ha valt större grundtext. Med rem respekteras det valet, med px låses storleken.',
            why: { 1: 'Enheten påverkar inte laddningstiden alls.', 2: 'px fungerar överallt. Problemet är att fasta storlekar inte följer användarens inställningar.' } },
          { type: 'choice', prompt: 'Vad gör `font-size: clamp(1.5rem, 4vw, 3rem);`?', options: ['Storleken följer 4vw men blir aldrig mindre än 1.5rem eller större än 3rem', 'Webbläsaren väljer slumpvis ett av värdena', 'Den använder alltid det största värdet'], answer: 0,
            explain: 'Mittvärdet är det önskade, och de andra två är golv och tak.',
            why: { 1: 'CSS gör aldrig slumpvisa val. clamp räknas ut på samma sätt varje gång.', 2: 'Det är max() som väljer det största värdet. clamp håller värdet mellan två gränser.' } },
          { type: 'fill', prompt: 'Centrera kolumnen och låt den bli högst 700px bred.', code: '<style>\n  .innehall {\n    ___: 700px;\n    margin: 0 ___;\n  }\n</style>', answers: [['max-width'], ['auto']], explain: 'max-width begränsar bredden, och auto delar den lediga platsen lika på båda sidor.' },
          { type: 'web', prompt: 'Gör artikeln lätt att läsa. Ge `main` en `max-width` (till exempel `65ch` eller `680px`), centrera den med `margin: 0 auto` och ge den luft på sidorna med en `padding` i `rem`.',
            starter: '<style>\n  main { background: #fffdf7; }\n</style>\n<main>\n  <h1>Om kaffe</h1>\n  <p>Kaffebönor är egentligen kärnor från ett bär. De rostas för att få fram smak och doft, och ju längre rostningen pågår desto mörkare och beskare blir kaffet. En ljus rostning ger ofta mer syra och fruktiga toner.</p>\n</main>\n',
            checks: [{ css: 'main', prop: 'max-width', msg: 'main har en max-width' }, { css: 'main', prop: 'margin(-inline)?', re: 'auto', msg: 'main centreras med margin auto' }, { css: 'main', prop: 'padding(-inline)?', re: 'rem', msg: 'main har padding i rem' }],
            solution: '<style>\n  main { background: #fffdf7; max-width: 65ch; margin: 0 auto; padding: 0 1rem; }\n</style>\n<main>\n  <h1>Om kaffe</h1>\n  <p>Kaffebönor är egentligen kärnor från ett bär. De rostas för att få fram smak och doft, och ju längre rostningen pågår desto mörkare och beskare blir kaffet. En ljus rostning ger ofta mer syra och fruktiga toner.</p>\n</main>',
            explain: 'Enheten ch är bredden av en nolla, så 65ch ger ungefär 65 tecken per rad. Det är en bekväm radlängd att läsa.', hint: 'max-width: 65ch; margin: 0 auto; padding: 0 1rem;' },
          { type: 'web', prompt: 'Gör sidan flytande. Ge `h1` en `font-size` med `clamp(...)` och tre värden, ge `p` en `font-size` i `rem`, och byt `.omslag`s fasta bredd mot `width: min(100%, 500px)`.',
            starter: '<style>\n  h1 { font-size: 48px; }\n  p { font-size: 18px; }\n  .omslag { width: 500px; }\n</style>\n<h1>Höstens bästa böcker</h1>\n<img class="omslag" src="https://picsum.photos/id/24/800/500" alt="En uppslagen bok på ett bord">\n<p>Vi har läst, diskuterat och valt ut fem böcker att krypa upp i soffan med.</p>\n',
            checks: [{ css: 'h1', prop: 'font-size', re: '^clamp\\([^,]+,[^,]+,[^,]+\\)$', msg: 'h1 har font-size med clamp() och tre värden' }, { css: 'p', prop: 'font-size', re: 'rem$', msg: 'p har font-size i rem' }, { css: '.omslag', prop: 'width', re: '^min\\(', msg: '.omslag har width med min()' }],
            solution: '<style>\n  h1 { font-size: clamp(1.75rem, 6vw, 3rem); }\n  p { font-size: 1.125rem; }\n  .omslag { width: min(100%, 500px); }\n</style>\n<h1>Höstens bästa böcker</h1>\n<img class="omslag" src="https://picsum.photos/id/24/800/500" alt="En uppslagen bok på ett bord">\n<p>Vi har läst, diskuterat och valt ut fem böcker att krypa upp i soffan med.</p>',
            explain: 'Nu krymper rubriken lagom på mobil, texten följer användarens inställningar och bilden spräcker aldrig sidan.', hint: 'clamp(1.75rem, 6vw, 3rem), 1.125rem och min(100%, 500px).' },
        ],
      },
    ],
  },
  {
    id: 'web8',
    title: 'Formulär och tillgänglighet',
    lessons: [
      {
        id: 'web-inputs', title: 'Inmatningsfält och validering', tier: 3,
        text: 'Rätt `type` på ett `input` ger rätt tangentbord på mobilen och inbyggd kontroll i webbläsaren: `email`, `number`, `date`, `tel` och `url`. Med `required` måste fältet fyllas i, `min` och `max` begränsar tal och datum, `minlength` begränsar textens längd och `pattern` kräver att texten följer ett mönster.\n\n`placeholder` är ett exempel som försvinner när man börjar skriva. Det ersätter aldrig en etikett. `autocomplete`, till exempel `autocomplete="email"`, låter webbläsaren fylla i uppgifter som användaren redan har sparat.\n\nWebbläsarens kontroller är en hjälp för användaren, inte ett skydd. Den som tar emot formuläret på servern måste alltid kontrollera uppgifterna igen.',
        example: '<form>\n  <label for="epost">E-post</label>\n  <input id="epost" name="epost" type="email" autocomplete="email" required>\n  <label for="antal">Antal biljetter</label>\n  <input id="antal" name="antal" type="number" min="1" max="6" value="1">\n  <label for="postnr">Postnummer</label>\n  <input id="postnr" name="postnr" inputmode="numeric" pattern="[0-9]{5}" placeholder="12345" autocomplete="postal-code">\n  <button type="submit">Boka</button>\n</form>',
        exercises: [
          { type: 'choice', prompt: 'Vilken `type` passar bäst för ett telefonnummer?', options: ['tel', 'number', 'text'], answer: 0,
            explain: 'tel ger sifferknappar på mobilen men tillåter också plustecken och mellanslag.',
            why: { 1: 'number är för tal man räknar med, som ett antal. Ett telefonnummer kan börja med + och innehålla mellanslag, och det räknar man aldrig med.', 2: 'text fungerar, men ger ett vanligt tangentbord på mobilen och säger inget om vad fältet innehåller.' } },
          { type: 'choice', prompt: 'Vad är problemet med fältet?', code: '<input name="namn" placeholder="Namn">', options: ['Texten försvinner när man börjar skriva, och fältet saknar en riktig etikett', 'placeholder syns inte på mobiler', 'Inget, placeholder fungerar som etikett'], answer: 0,
            explain: 'Lägg till en label. Placeholder kan finnas kvar som exempel, till exempel "Kim Andersson".',
            why: { 1: 'placeholder syns på mobiler också. Problemet är att den försvinner och har för svag kontrast.', 2: 'Skärmläsare läser inte alltid upp placeholder, och den som har skrivit något ser inte längre vad fältet gällde.' } },
          { type: 'fill', prompt: 'Begränsa antalet till mellan 1 och 10.', code: '<input type="number" id="antal" name="antal" ___="1" ___="10">', answers: [['min'], ['max']], explain: 'min och max gäller för tal och datum. Webbläsaren säger ifrån om värdet hamnar utanför.' },
          { type: 'web', prompt: 'Ge fälten rätt typer. E-post ska vara `type="email"` och `required`. Antal biljetter ska vara `type="number"` med `min="1"` och `max="6"`. Datum ska vara `type="date"`.',
            starter: '<form>\n  <label for="epost">E-post</label>\n  <input id="epost" name="epost">\n  <label for="antal">Antal biljetter</label>\n  <input id="antal" name="antal">\n  <label for="datum">Datum</label>\n  <input id="datum" name="datum">\n  <button type="submit">Boka</button>\n</form>\n',
            checks: [{ q: '#epost', attr: 'type', re: '^email$', msg: 'E-postfältet har type="email"' }, { q: '#epost[required]', min: 1, msg: 'E-postfältet är required' }, { q: '#antal', attr: 'type', re: '^number$', msg: 'Antalsfältet har type="number"' }, { q: '#antal', attr: 'min', re: '^1$', msg: 'Antalsfältet har min="1"' }, { q: '#antal', attr: 'max', re: '^6$', msg: 'Antalsfältet har max="6"' }, { q: '#datum', attr: 'type', re: '^date$', msg: 'Datumfältet har type="date"' }, { labels: true, msg: 'Alla fält har kvar sina etiketter' }],
            solution: '<form>\n  <label for="epost">E-post</label>\n  <input id="epost" name="epost" type="email" required>\n  <label for="antal">Antal biljetter</label>\n  <input id="antal" name="antal" type="number" min="1" max="6">\n  <label for="datum">Datum</label>\n  <input id="datum" name="datum" type="date">\n  <button type="submit">Boka</button>\n</form>',
            explain: 'Nu får användaren en datumväljare, sifferknappar och ett tydligt felmeddelande om e-posten saknas, helt utan egen kod.', hint: 'Lägg till type, required, min och max som attribut i starttaggarna.' },
          { type: 'web', prompt: 'Fälten har bara placeholder. Ge båda en kopplad `label`. Gör telefonfältet till `type="tel"` med `autocomplete="tel"`. Ge postnumret `autocomplete="postal-code"` och ett `pattern` som kräver exakt fem siffror, till exempel `[0-9]{5}`.',
            starter: '<form>\n  <input id="telefon" name="telefon" placeholder="Telefon">\n  <input id="postnummer" name="postnummer" placeholder="Postnummer">\n  <button type="submit">Spara</button>\n</form>\n',
            checks: [{ labels: true, msg: 'Båda fälten har en kopplad label' }, { q: '#telefon', attr: 'type', re: '^tel$', msg: 'Telefonfältet har type="tel"' }, { q: '#telefon', attr: 'autocomplete', re: '^tel$', msg: 'Telefonfältet har autocomplete="tel"' }, { q: '#postnummer', attr: 'pattern', re: '(\\\\d|\\[0-9\\])\\{5\\}', msg: 'Postnumret har ett pattern för fem siffror' }, { q: '#postnummer', attr: 'autocomplete', re: '^postal-code$', msg: 'Postnumret har autocomplete="postal-code"' }],
            solution: '<form>\n  <label for="telefon">Telefon</label>\n  <input id="telefon" name="telefon" type="tel" autocomplete="tel" placeholder="070 123 45 67">\n  <label for="postnummer">Postnummer</label>\n  <input id="postnummer" name="postnummer" pattern="[0-9]{5}" autocomplete="postal-code" placeholder="12345">\n  <button type="submit">Spara</button>\n</form>',
            explain: 'Etiketterna står kvar när man skriver, och autocomplete låter webbläsaren fylla i båda fälten med ett klick.', hint: 'Två <label for="..."> och attributen type, autocomplete och pattern.' },
        ],
      },
      {
        id: 'web-choices', title: 'Val i formulär', tier: 3,
        text: '**Radioknappar** används när man ska välja ett av flera alternativ. Alla knappar i samma grupp måste ha samma `name`, men olika `value`. **Kryssrutor** (`type="checkbox"`) är fristående ja eller nej, så man kan kryssa i flera.\n\nGruppera hörande fält med `<fieldset>` och ge gruppen en rubrik med `<legend>`. Skärmläsare läser upp legend tillsammans med varje alternativ, så frågan hänger med.\n\nFör långa listor passar `<select>` med `<option>`, och för längre text `<textarea>`. Alla fält behöver fortfarande en etikett.',
        example: '<form>\n  <fieldset>\n    <legend>Storlek</legend>\n    <input type="radio" id="liten" name="storlek" value="liten">\n    <label for="liten">Liten</label>\n    <input type="radio" id="stor" name="storlek" value="stor">\n    <label for="stor">Stor</label>\n  </fieldset>\n  <fieldset>\n    <legend>Tillbehör</legend>\n    <input type="checkbox" id="mjolk" name="tillbehor" value="mjolk">\n    <label for="mjolk">Havremjölk</label>\n  </fieldset>\n  <label for="leverans">Leverans</label>\n  <select id="leverans" name="leverans">\n    <option value="hamta">Hämta själv</option>\n    <option value="bud">Bud</option>\n  </select>\n  <label for="meddelande">Meddelande</label>\n  <textarea id="meddelande" name="meddelande" rows="3"></textarea>\n</form>',
        exercises: [
          { type: 'choice', prompt: 'Det går att välja alla tre radioknapparna samtidigt. Varför?', code: '<input type="radio" id="s" name="liten" value="s">\n<input type="radio" id="m" name="mellan" value="m">\n<input type="radio" id="l" name="stor" value="l">', options: ['De har olika name, så webbläsaren ser dem som tre separata grupper', 'De saknar value', 'Radioknappar måste ligga i en select'], answer: 0,
            explain: 'Ge alla samma name, till exempel name="storlek". Då kan bara en vara vald åt gången.',
            why: { 1: 'Alla tre har value. Det är name som avgör vilken grupp en knapp hör till.', 2: 'select och radioknappar är två olika sätt att göra ett val. De används inte tillsammans.' } },
          { type: 'choice', prompt: 'Frågan är ”Vilka tillbehör vill du ha?” och man får välja flera. Vad passar?', options: ['Kryssrutor', 'Radioknappar', 'En vanlig select'], answer: 0,
            explain: 'Kryssrutor är oberoende av varandra, så man kan välja noll, ett eller flera.',
            why: { 1: 'Radioknappar i en grupp tillåter bara ett val.', 2: 'En vanlig select ger bara ett val, och flervalsläget är krångligt att använda.' } },
          { type: 'fill', prompt: 'Gruppera radioknapparna och ge dem samma grupp.', code: '<___>\n  <legend>Storlek</legend>\n  <input type="radio" id="liten" ___="storlek" value="liten">\n  <label for="liten">Liten</label>\n</fieldset>', answers: [['fieldset'], ['name']], explain: 'fieldset grupperar och name kopplar ihop knapparna till en grupp.' },
          { type: 'web', prompt: 'Bygg ett storleksval. Lägg en `fieldset` med `legend` ”Välj storlek” i formuläret, med tre radioknappar som alla har `name="storlek"`, var sitt `value` och var sin kopplad `label`.',
            starter: '<form>\n\n</form>\n',
            checks: [{ q: 'fieldset', min: 1, msg: 'Det finns en fieldset' }, { q: 'fieldset legend', text: '\\S', msg: 'Fieldset har en legend med text' }, { q: 'fieldset input[type="radio"]', min: 3, msg: 'Det finns minst tre radioknappar i fieldset' }, { q: 'input[type="radio"]', attr: 'name', re: '^storlek$', msg: 'Alla radioknappar har name="storlek"' }, { q: 'input[type="radio"]', attr: 'value', re: '\\S', msg: 'Alla radioknappar har ett value' }, { labels: true, msg: 'Alla radioknappar har en kopplad label' }],
            solution: '<form>\n  <fieldset>\n    <legend>Välj storlek</legend>\n    <input type="radio" id="liten" name="storlek" value="liten">\n    <label for="liten">Liten</label>\n    <input type="radio" id="mellan" name="storlek" value="mellan">\n    <label for="mellan">Mellan</label>\n    <input type="radio" id="stor" name="storlek" value="stor">\n    <label for="stor">Stor</label>\n  </fieldset>\n</form>',
            explain: 'En skärmläsare säger nu till exempel ”Välj storlek, Mellan, radioknapp 2 av 3”.', hint: 'Varje alternativ: <input type="radio" id="x" name="storlek" value="x"> och <label for="x">.' },
          { type: 'web', prompt: 'Gör färdigt beställningen. Lägg till en `fieldset` med `legend` och minst två kryssrutor för tillbehör, fyll `select#leverans` med minst tre `option`, och lägg till en `textarea` för meddelande. Alla fält ska ha kopplade etiketter.',
            starter: '<form>\n  <label for="leverans">Leverans</label>\n  <select id="leverans" name="leverans">\n  </select>\n  <button type="submit">Beställ</button>\n</form>\n',
            checks: [{ q: 'fieldset input[type="checkbox"]', min: 2, msg: 'Det finns minst två kryssrutor i en fieldset' }, { q: 'fieldset:has(input[type="checkbox"]) legend', min: 1, msg: 'Kryssrutornas fieldset har en legend' }, { q: 'select#leverans option', min: 3, msg: 'Leveransvalet har minst tre alternativ' }, { q: 'textarea', min: 1, msg: 'Det finns en textarea' }, { labels: true, msg: 'Alla fält har kopplade etiketter' }],
            solution: '<form>\n  <fieldset>\n    <legend>Tillbehör</legend>\n    <input type="checkbox" id="mjolk" name="tillbehor" value="mjolk">\n    <label for="mjolk">Havremjölk</label>\n    <input type="checkbox" id="sirap" name="tillbehor" value="sirap">\n    <label for="sirap">Vaniljsirap</label>\n  </fieldset>\n  <label for="leverans">Leverans</label>\n  <select id="leverans" name="leverans">\n    <option value="hamta">Hämta själv</option>\n    <option value="cykel">Cykelbud</option>\n    <option value="post">Post</option>\n  </select>\n  <label for="meddelande">Meddelande</label>\n  <textarea id="meddelande" name="meddelande" rows="3"></textarea>\n  <button type="submit">Beställ</button>\n</form>',
            explain: 'Varje typ av val har sitt eget fält, och alla har etiketter. Då fungerar formuläret med mus, tangentbord och skärmläsare.', hint: 'Bygg en del i taget: fieldset med kryssrutor, sedan option-taggarna, sist textarea.' },
        ],
      },
      {
        id: 'web-a11y', title: 'Tillgänglighet på riktigt', tier: 4,
        text: '**Landmärken** som `<header>`, `<nav>`, `<main>` och `<footer>` låter skärmläsaranvändare hoppa direkt till rätt del av sidan. Rubrikerna fungerar som en innehållsförteckning: en `h1`, och sedan nivåer i ordning utan att hoppa över någon. Välj nivå efter struktur, och storlek med CSS.\n\nEn **hopplänk** först på sidan, till exempel ”Hoppa till innehållet”, låter tangentbordsanvändare slippa tabba genom hela menyn. En knapp med bara en ikon behöver `aria-label` så att den får ett namn, och `aria-describedby` kopplar en hjälptext till ett fält så att den läses upp.\n\n`<html lang="sv">` gör att skärmläsaren uttalar texten på svenska. Och text måste ha tillräcklig **kontrast** mot bakgrunden, för vanlig text minst 4,5 gånger så ljus eller mörk.',
        example: '<style>\n  .hoppa { position: absolute; left: -999px; }\n  .hoppa:focus { left: 8px; top: 8px; background: white; padding: 8px; }\n</style>\n<a class="hoppa" href="#innehall">Hoppa till innehållet</a>\n<header>\n  <h1>Stadsbiblioteket</h1>\n  <nav aria-label="Huvudmeny">\n    <a href="#">Låna</a>\n    <a href="#">Evenemang</a>\n  </nav>\n</header>\n<main id="innehall">\n  <h2>Veckans tips</h2>\n  <button aria-label="Stäng">✕</button>\n</main>\n<footer>Öppet 10 till 19</footer>',
        exercises: [
          { type: 'choice', prompt: 'Sidan har en `h1`. Underrubriken ”Ingredienser” ser för stor ut som `h2`. Vad gör du?', options: ['Behåller h2 och gör den mindre med CSS', 'Byter till h4 så att den blir mindre', 'Byter till ett p med fet text'], answer: 0,
            explain: 'Rubriknivån beskriver strukturen. Utseendet styr du med font-size.',
            why: { 1: 'Då hoppar du över h2 och h3, och den som navigerar med rubriker tror att något saknas.', 2: 'Då är det ingen rubrik längre, och skärmläsaranvändare kan inte hoppa dit.' } },
          { type: 'choice', prompt: 'Vilken kombination har bäst kontrast?', options: ['Mörkgrå #333 på vit bakgrund', 'Ljusgrå #ccc på vit bakgrund', 'Gul #ffeb3b på vit bakgrund'], answer: 0,
            explain: '#333 på vitt har en kontrast runt 12:1, långt över kravet 4,5:1 för vanlig text.',
            why: { 1: 'Ljusgrått på vitt har en kontrast på bara cirka 1,6:1. Många kan inte läsa det alls.', 2: 'Gult på vitt har ännu lägre kontrast. Gult fungerar bättre som bakgrund bakom mörk text.' } },
          { type: 'fill', prompt: 'Tala om att sidan är på svenska.', code: '<!doctype html>\n<html ___="sv">', answers: [['lang']], explain: 'Med lang="sv" väljer skärmläsaren svensk röst och översättningsverktyg vet vilket språk det är.' },
          { type: 'web', prompt: 'Byt ut div-taggarna mot landmärken: `header`, `nav`, `main` och `footer`. Sidan ska ha exakt en `h1`, så gör om den andra till en `h2`.',
            starter: '<div class="topp">\n  <h1>Stadsbiblioteket</h1>\n</div>\n<div class="meny">\n  <a href="#">Låna</a>\n  <a href="#">Evenemang</a>\n</div>\n<div class="innehall">\n  <h1>Veckans boktips</h1>\n  <p>Tre böcker vi gillar just nu.</p>\n</div>\n<div class="botten">\n  <p>Öppet 10 till 19</p>\n</div>\n',
            checks: [{ q: 'header', min: 1, msg: 'Sidan har en header' }, { q: 'nav a', min: 2, msg: 'Länkarna ligger i en nav' }, { q: 'main', min: 1, max: 1, msg: 'Sidan har exakt en main' }, { q: 'footer', min: 1, msg: 'Sidan har en footer' }, { q: 'h1', min: 1, max: 1, msg: 'Sidan har exakt en h1' }, { q: 'main h2', min: 1, msg: 'Rubriken i main är en h2' }],
            solution: '<header>\n  <h1>Stadsbiblioteket</h1>\n</header>\n<nav>\n  <a href="#">Låna</a>\n  <a href="#">Evenemang</a>\n</nav>\n<main>\n  <h2>Veckans boktips</h2>\n  <p>Tre böcker vi gillar just nu.</p>\n</main>\n<footer>\n  <p>Öppet 10 till 19</p>\n</footer>',
            explain: 'Sidan ser likadan ut, men nu finns det fyra landmärken att hoppa mellan och en tydlig rubrikordning.', hint: 'Byt taggnamnen i både start- och sluttaggen, och byt den andra h1 till h2.' },
          { type: 'web', prompt: 'Lägg till en hopplänk. Först på sidan ska en länk med klassen `hoppa` och `href="#innehall"` ligga, och `main` ska få `id="innehall"`. Göm länken med `.hoppa { position: absolute; left: -999px; }` och visa den igen i en `.hoppa:focus`-regel.',
            starter: '<style>\n\n</style>\n<header>\n  <h1>Stadsbiblioteket</h1>\n  <nav>\n    <a href="#">Låna</a>\n    <a href="#">Evenemang</a>\n    <a href="#">Kontakt</a>\n  </nav>\n</header>\n<main>\n  <h2>Veckans boktips</h2>\n</main>\n',
            checks: [{ q: 'a.hoppa', attr: 'href', re: '^#innehall$', msg: 'Länken .hoppa går till #innehall' }, { q: 'main#innehall', min: 1, msg: 'main har id="innehall"' }, { source: '<a[^>]*hoppa[\\s\\S]*<header', msg: 'Hopplänken kommer före header' }, { css: '.hoppa', prop: 'position', re: '^absolute$', msg: '.hoppa har position: absolute' }, { source: '\\.hoppa:focus(-visible)?\\s*\\{', msg: 'Det finns en .hoppa:focus-regel som visar länken' }],
            solution: '<style>\n  .hoppa { position: absolute; left: -999px; }\n  .hoppa:focus { left: 8px; top: 8px; background: white; padding: 8px; }\n</style>\n<a class="hoppa" href="#innehall">Hoppa till innehållet</a>\n<header>\n  <h1>Stadsbiblioteket</h1>\n  <nav>\n    <a href="#">Låna</a>\n    <a href="#">Evenemang</a>\n    <a href="#">Kontakt</a>\n  </nav>\n</header>\n<main id="innehall">\n  <h2>Veckans boktips</h2>\n</main>',
            explain: 'Länken syns inte för den som använder mus, men första Tab-trycket visar den. Ett Enter tar användaren förbi hela menyn.', hint: 'Lägg <a class="hoppa" href="#innehall">Hoppa till innehållet</a> direkt efter style-blocket.' },
          { type: 'web', prompt: 'Ge ikonknappen `.ikon` namnet ”Stäng” med `aria-label`. Ge hjälptexten `id="sok-hjalp"` och koppla den till sökfältet med `aria-describedby`.',
            starter: '<header>\n  <h1>Sök recept</h1>\n  <button class="ikon">✕</button>\n</header>\n<main>\n  <label for="sok">Sökord</label>\n  <input id="sok" name="sok" type="search">\n  <p>Skriv en råvara, till exempel morot.</p>\n</main>\n',
            checks: [{ q: 'button.ikon', attr: 'aria-label', re: 'stäng', msg: 'Ikonknappen har aria-label="Stäng"' }, { q: '#sok-hjalp', text: '\\S', msg: 'Hjälptexten har id="sok-hjalp"' }, { q: '#sok', attr: 'aria-describedby', re: '^sok-hjalp$', msg: 'Sökfältet har aria-describedby="sok-hjalp"' }, { labels: true, msg: 'Sökfältet har kvar sin etikett' }],
            solution: '<header>\n  <h1>Sök recept</h1>\n  <button class="ikon" aria-label="Stäng">✕</button>\n</header>\n<main>\n  <label for="sok">Sökord</label>\n  <input id="sok" name="sok" type="search" aria-describedby="sok-hjalp">\n  <p id="sok-hjalp">Skriv en råvara, till exempel morot.</p>\n</main>',
            explain: 'Utan aria-label läses knappen upp som ”multiplikationstecken, knapp”. Nu heter den ”Stäng”, och sökfältet läses upp med sin hjälptext.', hint: 'Tre attribut: aria-label på knappen, id på stycket och aria-describedby på fältet.' },
        ],
      },
      {
        id: 'web-tables', title: 'Tabeller', tier: 3,
        text: 'Tabeller är till för **data** med rader och kolumner, som ett schema, en prislista eller resultat. Använd dem aldrig för att placera ut delar av sidan. Skärmläsare läser upp tabeller cell för cell med rad- och kolumnrubriker, och layouttabeller går sönder på smala skärmar. Layout gör du med flexbox och grid.\n\nEn tabell byggs av `<table>`, en `<caption>` som är tabellens rubrik, `<thead>` med rubrikceller `<th>` och `<tbody>` med datarader. Varje rad är en `<tr>` och varje datacell en `<td>`. `scope="col"` på en `th` talar om att den är rubrik för sin kolumn, och `scope="row"` att den gäller sin rad.\n\nFör att styla tabellen slår du ihop kanterna med `border-collapse: collapse;`, ger cellerna padding och gör varannan rad randig med `tbody tr:nth-child(even)`.',
        example: '<style>\n  table { border-collapse: collapse; }\n  th, td { padding: 6px 10px; border-bottom: 1px solid #ddd; text-align: left; }\n  tbody tr:nth-child(even) { background: #f6f2ff; }\n</style>\n<table>\n  <caption>Simskolans schema</caption>\n  <thead>\n    <tr><th scope="col">Dag</th><th scope="col">Tid</th><th scope="col">Grupp</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Måndag</td><td>17.00</td><td>Sälen</td></tr>\n    <tr><td>Onsdag</td><td>17.30</td><td>Pingvinen</td></tr>\n    <tr><td>Fredag</td><td>16.00</td><td>Hajen</td></tr>\n  </tbody>\n</table>',
        exercises: [
          { type: 'choice', prompt: 'När är en tabell rätt val?', options: ['För ett schema med dagar och tider', 'För att lägga en meny bredvid innehållet', 'För att centrera en bild'], answer: 0,
            explain: 'Ett schema är data där varje cell hör ihop med både en rad och en kolumn.',
            why: { 1: 'Det är layout. En skärmläsare skulle läsa upp menyn som en tabell med rader och kolumner. Använd grid eller flexbox.', 2: 'Centrering är layout och görs med CSS, till exempel margin: 0 auto eller flexbox.' } },
          { type: 'choice', prompt: 'Vad betyder `scope="col"` på en `th`?', options: ['Rubriken gäller cellerna under den, i samma kolumn', 'Rubriken blir fet', 'Kolumnen går att sortera'], answer: 0,
            explain: 'Då kan skärmläsaren säga ”Tid, 17.30” när användaren står i en cell.',
            why: { 1: 'th visas ofta fet av webbläsaren, men det gäller med eller utan scope. scope handlar om betydelse.', 2: 'Sortering kräver JavaScript. scope beskriver bara vilka celler rubriken hör till.' } },
          { type: 'fill', prompt: 'Slå ihop kanterna och gör varannan rad randig.', code: '<style>\n  table { border-___: collapse; }\n  tbody tr:nth-child(___) { background: #f6f2ff; }\n</style>', answers: [['collapse'], ['even', '2n', 'odd', '2n+1']], explain: 'border-collapse: collapse ger enkla linjer, och :nth-child(even) väljer var andra rad.' },
          { type: 'web', prompt: 'Bygg en tabell över lånade böcker. Den ska ha en `caption`, en `thead` med tre `th` med `scope="col"` (Titel, Författare, Återlämnas) och en `tbody` med minst tre rader med `td`.',
            starter: '<table>\n\n</table>\n',
            checks: [{ q: 'table caption', text: '\\S', msg: 'Tabellen har en caption med text' }, { q: 'thead th', min: 3, msg: 'thead har minst tre th' }, { q: 'thead th', attr: 'scope', re: '^col$', msg: 'Alla th i thead har scope="col"' }, { q: 'tbody tr', min: 3, msg: 'tbody har minst tre rader' }, { q: 'tbody td', min: 9, msg: 'Varje rad har tre celler (td)' }],
            solution: '<table>\n  <caption>Mina lånade böcker</caption>\n  <thead>\n    <tr><th scope="col">Titel</th><th scope="col">Författare</th><th scope="col">Återlämnas</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Bröderna Lejonhjärta</td><td>Astrid Lindgren</td><td>3 november</td></tr>\n    <tr><td>Muminpappans memoarer</td><td>Tove Jansson</td><td>10 november</td></tr>\n    <tr><td>Doktor Glas</td><td>Hjalmar Söderberg</td><td>17 november</td></tr>\n  </tbody>\n</table>',
            explain: 'caption berättar vad tabellen handlar om, och rubrikcellerna med scope gör varje cell begriplig även när den läses upp ensam.', hint: 'Börja med caption, sedan thead med en tr, sist tbody med tre tr.' },
          { type: 'web', prompt: 'Styla tabellen. Ge `table` `border-collapse: collapse`, ge `td` (gärna även `th`) en `padding`, och gör varannan rad i `tbody` randig med `:nth-child` och en bakgrund.',
            starter: '<style>\n\n</style>\n<table>\n  <caption>Mina lånade böcker</caption>\n  <thead>\n    <tr><th scope="col">Titel</th><th scope="col">Författare</th><th scope="col">Återlämnas</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Bröderna Lejonhjärta</td><td>Astrid Lindgren</td><td>3 november</td></tr>\n    <tr><td>Muminpappans memoarer</td><td>Tove Jansson</td><td>10 november</td></tr>\n    <tr><td>Doktor Glas</td><td>Hjalmar Söderberg</td><td>17 november</td></tr>\n    <tr><td>Kallocain</td><td>Karin Boye</td><td>24 november</td></tr>\n  </tbody>\n</table>\n',
            checks: [{ css: 'table', prop: 'border-collapse', re: '^collapse$', msg: 'table har border-collapse: collapse' }, { css: 'td', prop: 'padding', msg: 'td har padding' }, { source: 'tr:nth-child\\(\\s*(even|odd|2n|2n\\s*\\+\\s*1)\\s*\\)[^{]*\\{[^}]*background', msg: 'Varannan rad har en bakgrund via :nth-child' }],
            solution: '<style>\n  table { border-collapse: collapse; }\n  th, td { padding: 6px 10px; border-bottom: 1px solid #ddd; text-align: left; }\n  tbody tr:nth-child(even) { background: #f6f2ff; }\n</style>\n<table>\n  <caption>Mina lånade böcker</caption>\n  <thead>\n    <tr><th scope="col">Titel</th><th scope="col">Författare</th><th scope="col">Återlämnas</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Bröderna Lejonhjärta</td><td>Astrid Lindgren</td><td>3 november</td></tr>\n    <tr><td>Muminpappans memoarer</td><td>Tove Jansson</td><td>10 november</td></tr>\n    <tr><td>Doktor Glas</td><td>Hjalmar Söderberg</td><td>17 november</td></tr>\n    <tr><td>Kallocain</td><td>Karin Boye</td><td>24 november</td></tr>\n  </tbody>\n</table>',
            explain: 'Ränderna gör det lättare att följa en rad med blicken, och luften i cellerna gör tabellen lugnare att läsa.', hint: 'Tre regler: table, th, td och tbody tr:nth-child(even).' },
        ],
      },
    ],
  },
  {
    id: 'web9',
    title: 'Modern CSS',
    lessons: [
      {
        id: 'web-variables', title: 'CSS-variabler och teman', tier: 4,
        text: 'En **CSS-variabel** (custom property) är ett namn som börjar med två bindestreck, till exempel `--accent: #6b4fbb;`. Du läser värdet med `var(--accent)`. Lägger du variablerna på `:root` gäller de på hela sidan.\n\nI riktiga projekt samlas färger, avstånd och rundningar som variabler, ofta kallade **design tokens**. Vill du byta accentfärg ändrar du på ett ställe i stället för på trettio.\n\nVariabler ärvs som vanliga egenskaper. Därför kan en klass som `.mörk` skriva över `--bg` och `--text`, och allt inuti följer med. Med `var(--radie, 8px)` får du ett reservvärde om variabeln saknas.',
        example: '<style>\n  :root { --accent: #6b4fbb; --bg: #ffffff; --text: #1f1d2b; --radie: 10px; }\n  .mörk { --bg: #1f1d2b; --text: #f4f1ff; --accent: #c7b6ff; }\n  .ruta { background: var(--bg); color: var(--text); padding: 16px; border-radius: var(--radie); border: 1px solid #ddd; margin-bottom: 12px; }\n  .ruta a { color: var(--accent); }\n</style>\n<div class="ruta"><p>Ljust tema. <a href="#">En länk</a></p></div>\n<div class="ruta mörk"><p>Mörkt tema, samma CSS. <a href="#">En länk</a></p></div>',
        exercises: [
          { type: 'choice', prompt: 'Vilken bakgrund får knappen?', code: '<style>\n  :root { --accent: teal; }\n  .knapp { background: var(--primär, orange); }\n</style>\n<button class="knapp">Spara</button>', options: ['teal', 'orange', 'Ingen bakgrund alls'], answer: 1,
            explain: 'Variabeln --primär finns inte, så reservvärdet efter kommatecknet används.',
            why: { 0: '--accent finns, men regeln läser --primär. Namnet måste stämma exakt.', 2: 'Reservvärdet efter kommatecknet används just när variabeln saknas.' } },
          { type: 'fill', prompt: 'Definiera variabeln och använd den i rubriken.', code: ':root { ___: #c2410c; }\n.rubrik { color: ___(--varning); }', answers: [['--varning'], ['var']], explain: 'Variabeln skapas med två bindestreck och läses med var().' },
          { type: 'web', prompt: 'Samma lila färg är hårdkodad på tre ställen. Skapa variabeln `--accent` på `:root` och byt alla tre `#6b4fbb` mot `var(--accent)`.',
            starter: '<style>\n  h1 { color: #6b4fbb; }\n  .kort { border-left: 4px solid #6b4fbb; padding: 12px; }\n  .knapp { background: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; font: inherit; }\n</style>\n<h1>Kafé Bönan</h1>\n<div class="kort"><p>Nybryggt kaffe och kanelbullar varje dag från klockan 7.</p></div>\n<button class="knapp">Boka bord</button>\n',
            checks: [{ css: ':root', prop: '--accent', msg: ':root definierar --accent' }, { css: 'h1', prop: 'color', re: 'var\\(\\s*--accent', msg: 'h1 använder var(--accent)' }, { css: '.kort', prop: 'border-left', re: 'var\\(\\s*--accent', msg: '.kort använder var(--accent) i kantlinjen' }, { css: '.knapp', prop: 'background(-color)?', re: 'var\\(\\s*--accent', msg: '.knapp använder var(--accent) som bakgrund' }, { source: '#6b4fbb[\\s\\S]*#6b4fbb', invert: true, msg: 'Färgkoden står bara på ett ställe' }],
            solution: '<style>\n  :root { --accent: #6b4fbb; }\n  h1 { color: var(--accent); }\n  .kort { border-left: 4px solid var(--accent); padding: 12px; }\n  .knapp { background: var(--accent); color: white; border: 0; padding: 10px 16px; border-radius: 8px; font: inherit; }\n</style>\n<h1>Kafé Bönan</h1>\n<div class="kort"><p>Nybryggt kaffe och kanelbullar varje dag från klockan 7.</p></div>\n<button class="knapp">Boka bord</button>',
            explain: 'Nu byter du hela sidans accentfärg genom att ändra en enda rad.', hint: 'Skriv :root { --accent: #6b4fbb; } och ersätt sedan de tre färgkoderna med var(--accent).' },
          { type: 'web', prompt: 'Den andra sektionen har klassen `mörk`, men den regeln saknas. Lägg till en regel `.mörk` som bara skriver över variablerna `--bg`, `--text` och `--accent` med mörka värden. Ändra inte `.sida`-reglerna, och sätt ingen `background` direkt i `.mörk`.',
            starter: '<style>\n  :root { --bg: #ffffff; --text: #1f1d2b; --accent: #5a3fb0; }\n  .sida { background: var(--bg); color: var(--text); padding: 16px; border-radius: 12px; border: 1px solid #ddd; }\n  .sida a { color: var(--accent); }\n</style>\n<section class="sida"><h2>Dagens lunch</h2><p>Linssoppa med surdegsbröd. <a href="#">Se hela menyn</a></p></section>\n<section class="sida mörk"><h2>Kvällsmeny</h2><p>Grillad halloumi med rostade rotfrukter. <a href="#">Se hela menyn</a></p></section>\n',
            checks: [{ css: '.mörk', prop: '--bg', msg: '.mörk skriver över --bg' }, { css: '.mörk', prop: '--text', msg: '.mörk skriver över --text' }, { css: '.mörk', prop: '--accent', msg: '.mörk skriver över --accent' }, { css: '.mörk', prop: 'background(-color)?', invert: true, msg: '.mörk sätter inte background direkt, bara variabler' }, { css: '.sida', prop: 'background(-color)?', re: 'var\\(\\s*--bg', msg: '.sida använder fortfarande var(--bg)' }],
            solution: '<style>\n  :root { --bg: #ffffff; --text: #1f1d2b; --accent: #5a3fb0; }\n  .mörk { --bg: #1f1d2b; --text: #f4f1ff; --accent: #c7b6ff; }\n  .sida { background: var(--bg); color: var(--text); padding: 16px; border-radius: 12px; border: 1px solid #ddd; }\n  .sida a { color: var(--accent); }\n</style>\n<section class="sida"><h2>Dagens lunch</h2><p>Linssoppa med surdegsbröd. <a href="#">Se hela menyn</a></p></section>\n<section class="sida mörk"><h2>Kvällsmeny</h2><p>Grillad halloumi med rostade rotfrukter. <a href="#">Se hela menyn</a></p></section>',
            explain: 'Variablerna ärvs nedåt, så .sida och länken inuti byter färg utan att du rör deras regler.', hint: 'Skriv .mörk { --bg: ...; --text: ...; --accent: ...; } med en mörk bakgrund och ljus text.' },
          { type: 'web', prompt: 'Variabler kan också styra en enda komponent. Ge `.kort` bakgrunden `var(--kort-bg, #f6f2ff)` (med reservvärde) i stället för den hårdkodade färgen. Skapa sedan varianten `.kort-utvald` som bara sätter `--kort-bg` till en gul ton.',
            starter: '<style>\n  .kort { background: #f6f2ff; padding: 16px; border-radius: 12px; margin-bottom: 12px; }\n</style>\n<article class="kort"><h3>Grundkurs</h3><p>Fyra kvällar, 1 200 kr.</p></article>\n<article class="kort kort-utvald"><h3>Populärast: helgkurs</h3><p>Lördag och söndag, 1 500 kr.</p></article>\n',
            checks: [{ css: '.kort', prop: 'background(-color)?', re: 'var\\(\\s*--kort-bg\\s*,\\s*\\S', msg: '.kort använder var(--kort-bg, ...) med ett reservvärde' }, { css: '.kort-utvald', prop: '--kort-bg', msg: '.kort-utvald sätter --kort-bg' }, { css: '.kort-utvald', prop: 'background(-color)?', invert: true, msg: '.kort-utvald ändrar bara variabeln, inte background' }],
            solution: '<style>\n  .kort { background: var(--kort-bg, #f6f2ff); padding: 16px; border-radius: 12px; margin-bottom: 12px; }\n  .kort-utvald { --kort-bg: #fff3d6; }\n</style>\n<article class="kort"><h3>Grundkurs</h3><p>Fyra kvällar, 1 200 kr.</p></article>\n<article class="kort kort-utvald"><h3>Populärast: helgkurs</h3><p>Lördag och söndag, 1 500 kr.</p></article>',
            explain: 'Komponenten har ett standardvärde, och varianten ändrar bara den variabel som skiljer.', hint: 'Byt #f6f2ff mot var(--kort-bg, #f6f2ff) och lägg till .kort-utvald { --kort-bg: #fff3d6; }.' },
        ],
      },
      {
        id: 'web-transitions', title: 'Övergångar och animationer', tier: 4,
        text: 'Ett gränssnitt känns levande när det svarar på det du gör. `:hover` gäller när muspekaren är över elementet och `:focus-visible` när det har tangentbordsfokus. Ge båda samma tydliga feedback, så att ingen missar den.\n\n`transition: transform 0.2s ease;` gör att en ändring glider fram i stället för att hoppa. `transform` flyttar (`translateY(-2px)`), skalar (`scale(1.05)`) och roterar (`rotate(10deg)`) utan att resten av sidan flyttar sig, och är billigt för webbläsaren att animera. För rörelse som går av sig själv skriver du en `@keyframes`-regel och kopplar den med `animation`.\n\nVissa blir yra eller illamående av rörelse och har ställt in det i sitt system. Med `@media (prefers-reduced-motion: reduce)` stänger du av animationerna för dem.',
        example: '<style>\n  .knapp { background: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; font: inherit; transition: transform 0.2s ease, box-shadow 0.2s ease; }\n  .knapp:hover, .knapp:focus-visible { transform: translateY(-2px); box-shadow: 0 6px 12px rgb(0 0 0 / 0.2); }\n  .knapp:focus-visible { outline: 3px solid #f2c94c; outline-offset: 2px; }\n  .laddar { width: 24px; height: 24px; margin-top: 16px; border: 4px solid #ddd; border-top-color: #6b4fbb; border-radius: 50%; animation: snurra 1s linear infinite; }\n  @keyframes snurra { to { transform: rotate(360deg); } }\n  @media (prefers-reduced-motion: reduce) {\n    .knapp { transition: none; }\n    .laddar { animation: none; }\n  }\n</style>\n<button class="knapp">Håll över mig</button>\n<div class="laddar" role="status" aria-label="Laddar"></div>',
        exercises: [
          { type: 'choice', prompt: 'Var ska `transition` stå för att knappen ska glida både in i och ut ur hover-läget?', options: ['I grundregeln `.knapp`', 'Bara i `.knapp:hover`', 'I en `@keyframes`-regel'], answer: 0,
            explain: 'I grundregeln gäller övergången hela tiden, åt båda hållen.',
            why: { 1: 'Då gäller övergången bara på väg in. När musen lämnar knappen försvinner :hover-regeln och knappen hoppar tillbaka.', 2: '@keyframes används för animationer som går av sig själva, inte för övergångar mellan två lägen.' } },
          { type: 'choice', prompt: 'Du vill att ett kort lyfter lite när man håller över det. Vilket är bäst att ändra?', options: ['`margin-top: -4px`', '`transform: translateY(-4px)`', '`top: -4px` på ett element utan `position`'], answer: 1,
            explain: 'transform flyttar bara hur elementet ritas. Inget annat på sidan rör sig, och animationen blir mjuk.',
            why: { 0: 'margin flyttar även allt runt omkring, och webbläsaren måste räkna om layouten i varje bildruta.', 2: 'top gör ingenting på ett element med position: static, som är standard.' } },
          { type: 'web', prompt: 'Gör receptkortet interaktivt. Ge `.kort` en `transition` på `transform`. Lägg sedan till regeln `.kort:hover, .kort:focus-within` som lyfter kortet med `transform: translateY(...)` med ett negativt värde. `:focus-within` gäller när något inuti kortet, här länken, har fokus.',
            starter: '<style>\n  .kort { max-width: 260px; padding: 12px; border-radius: 12px; background: #f6f2ff; }\n  .kort img { max-width: 100%; border-radius: 8px; }\n</style>\n<article class="kort">\n  <img src="https://picsum.photos/id/1080/400/260" alt="Jordgubbar i en skål">\n  <h3>Jordgubbstårta</h3>\n  <p>En svensk sommarklassiker på en timme.</p>\n  <a href="#">Se receptet</a>\n</article>\n',
            checks: [{ css: '.kort', prop: 'transition', re: 'transform|all', msg: '.kort har en transition på transform' }, { css: '.kort:hover', prop: 'transform', re: 'translateY\\(\\s*-', msg: '.kort:hover lyfter kortet med translateY(-...)' }, { css: '.kort:focus-within', prop: 'transform', re: 'translateY\\(\\s*-', msg: '.kort:focus-within får samma lyft' }],
            solution: '<style>\n  .kort { max-width: 260px; padding: 12px; border-radius: 12px; background: #f6f2ff; transition: transform 0.2s ease; }\n  .kort:hover, .kort:focus-within { transform: translateY(-4px); }\n  .kort img { max-width: 100%; border-radius: 8px; }\n</style>\n<article class="kort">\n  <img src="https://picsum.photos/id/1080/400/260" alt="Jordgubbar i en skål">\n  <h3>Jordgubbstårta</h3>\n  <p>En svensk sommarklassiker på en timme.</p>\n  <a href="#">Se receptet</a>\n</article>',
            explain: 'Mus och tangentbord får samma feedback, och övergången gör rörelsen mjuk åt båda hållen.', hint: 'Lägg transition: transform 0.2s ease; i .kort och skriv en ny regel med båda väljarna åtskilda av kommatecken.' },
          { type: 'web', prompt: 'Notisbrickan ska pulsera för att dra till sig blicken. Skriv `@keyframes pulsa` som går från `transform: scale(1)` till `transform: scale(1.2)`, och ge `.bricka` `animation: pulsa 1s ease-in-out infinite alternate`.',
            starter: '<style>\n  .bricka { display: inline-block; min-width: 24px; padding: 2px 8px; border-radius: 999px; background: #c2410c; color: white; text-align: center; }\n</style>\n<p>Inkorg <span class="bricka">3</span></p>\n',
            checks: [{ source: '@keyframes\\s+pulsa\\s*\\{', msg: 'Det finns en @keyframes pulsa' }, { source: 'scale\\(\\s*1\\.\\d+\\s*\\)', msg: 'Animationen skalar upp till något större än 1' }, { css: '.bricka', prop: 'animation(-name)?', re: 'pulsa', msg: '.bricka använder animationen pulsa' }, { css: '.bricka', prop: 'animation(-iteration-count)?', re: 'infinite', msg: 'Animationen upprepas med infinite' }],
            solution: '<style>\n  .bricka { display: inline-block; min-width: 24px; padding: 2px 8px; border-radius: 999px; background: #c2410c; color: white; text-align: center; animation: pulsa 1s ease-in-out infinite alternate; }\n  @keyframes pulsa {\n    from { transform: scale(1); }\n    to { transform: scale(1.2); }\n  }\n</style>\n<p>Inkorg <span class="bricka">3</span></p>',
            explain: 'alternate gör att animationen går fram och tillbaka i stället för att hoppa tillbaka till början.', hint: 'Skriv @keyframes pulsa { from { ... } to { ... } } och lägg till animation i .bricka.' },
          { type: 'web', prompt: 'Sidan har både en pulserande bricka och en knapp med övergång. Respektera användare som vill ha mindre rörelse: lägg till `@media (prefers-reduced-motion: reduce)` som sätter `animation: none` på `.bricka` och `transition: none` på `.knapp`.',
            starter: '<style>\n  .bricka { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #c2410c; color: white; animation: pulsa 1s ease-in-out infinite alternate; }\n  @keyframes pulsa {\n    from { transform: scale(1); }\n    to { transform: scale(1.2); }\n  }\n  .knapp { background: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; font: inherit; transition: transform 0.2s ease; }\n  .knapp:hover, .knapp:focus-visible { transform: scale(1.05); }\n</style>\n<p>Inkorg <span class="bricka">3</span></p>\n<button class="knapp">Läs nya meddelanden</button>\n',
            checks: [{ media: true, re: 'prefers-reduced-motion\\s*:\\s*reduce', msg: 'Det finns en media-fråga för prefers-reduced-motion: reduce' }, { css: '.bricka', prop: 'animation', re: 'none', inMedia: true, msg: '.bricka får animation: none i media-frågan' }, { css: '.knapp', prop: 'transition', re: 'none', inMedia: true, msg: '.knapp får transition: none i media-frågan' }],
            solution: '<style>\n  .bricka { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #c2410c; color: white; animation: pulsa 1s ease-in-out infinite alternate; }\n  @keyframes pulsa {\n    from { transform: scale(1); }\n    to { transform: scale(1.2); }\n  }\n  .knapp { background: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; font: inherit; transition: transform 0.2s ease; }\n  .knapp:hover, .knapp:focus-visible { transform: scale(1.05); }\n  @media (prefers-reduced-motion: reduce) {\n    .bricka { animation: none; }\n    .knapp { transition: none; }\n  }\n</style>\n<p>Inkorg <span class="bricka">3</span></p>\n<button class="knapp">Läs nya meddelanden</button>',
            explain: 'Sidan fungerar likadant, men den som har bett om mindre rörelse slipper animationerna.', hint: 'Skriv @media (prefers-reduced-motion: reduce) { ... } längst ner med två regler inuti.' },
        ],
      },
      {
        id: 'web-selectors', title: 'Avancerade väljare', tier: 4,
        text: 'Du kan välja element utifrån var de står. `nav a` (med mellanslag) betyder alla a någonstans inuti nav. `ul > li` betyder bara direkta barn. `h2 + p` är stycket direkt efter en h2, och `h2 ~ p` alla stycken som kommer efter den på samma nivå.\n\nPseudoklasser väljer efter position eller tillstånd: `li:first-child`, `li:last-child`, `tr:nth-child(even)` för varannan rad och `li:not(:last-child)` för alla utom den sista. Attributväljare som `a[href^="https"]` (börjar med) och `a[href$=".pdf"]` (slutar med) väljer efter attribut.\n\nPseudoelementen `::before` och `::after` lägger till dekoration med `content`. Lägg bara dekor där, aldrig information som måste förstås, eftersom innehållet inte alltid läses upp eller går att markera.',
        example: '<style>\n  .lista { list-style: none; padding: 0; }\n  .lista > li { padding: 8px; }\n  .lista > li:nth-child(odd) { background: #f6f2ff; }\n  .lista > li:not(:last-child) { border-bottom: 1px solid #ddd; }\n  .lista > li::before { content: "→ "; color: #6b4fbb; }\n  a[href^="https"]::after { content: " ↗"; }\n</style>\n<ul class="lista">\n  <li>Mjöl</li>\n  <li>Ägg</li>\n  <li>Mjölk</li>\n</ul>\n<p><a href="https://sv.wikipedia.org/wiki/Pannkaka">Läs om pannkakor</a></p>',
        exercises: [
          { type: 'choice', prompt: 'Vilka länkar väljer `.meny > li > a`?', code: '<ul class="meny">\n  <li><a href="#">Hem</a></li>\n  <li>Om oss\n    <ul>\n      <li><a href="#">Team</a></li>\n    </ul>\n  </li>\n</ul>', options: ['Bara Hem', 'Både Hem och Team', 'Ingen av dem'], answer: 0,
            explain: '> kräver ett direkt barn i varje steg. Bara Hem-länken uppfyller det.',
            why: { 1: 'Team ligger i en inre ul. Dess li är barn till den inre listan, inte direkt till .meny.', 2: 'Hem-länken är ett a direkt i ett li som är direkt i .meny, så den matchar.' } },
          { type: 'fill', prompt: 'Ge alla rader utom den sista en kantlinje, och varannan rad en bakgrund.', code: 'li:___(:last-child) { border-bottom: 1px solid #ddd; }\nli:nth-child(___) { background: #f6f2ff; }', answers: [['not'], ['even', 'odd', '2n', '2n+1', '2n + 1']], explain: ':not() vänder på en väljare, och :nth-child(even) eller (odd) väljer varannan.' },
          { type: 'web', prompt: 'Gör tidtabellen lättläst. Ge varannan rad i `tbody` en bakgrund med `tbody tr:nth-child(even)` (eller `odd`), och gör första cellen i varje rad fetstilt med `td:first-child` och `font-weight`.',
            starter: '<style>\n  table { border-collapse: collapse; }\n  th, td { padding: 6px 12px; text-align: left; }\n</style>\n<table>\n  <caption>Avgångar från Centralen</caption>\n  <thead><tr><th scope="col">Tid</th><th scope="col">Till</th><th scope="col">Spår</th></tr></thead>\n  <tbody>\n    <tr><td>08.05</td><td>Uppsala</td><td>3</td></tr>\n    <tr><td>08.20</td><td>Västerås</td><td>5</td></tr>\n    <tr><td>08.35</td><td>Nyköping</td><td>2</td></tr>\n    <tr><td>08.50</td><td>Gävle</td><td>4</td></tr>\n  </tbody>\n</table>\n',
            checks: [{ source: 'tr:nth-child\\(\\s*(even|odd|2n(\\s*\\+\\s*1)?)\\s*\\)\\s*\\{[^}]*background', msg: 'Varannan rad har en bakgrund via :nth-child' }, { source: 'td:first-child\\s*\\{[^}]*font-weight', msg: 'Första cellen i varje rad är fetstilt via td:first-child' }],
            solution: '<style>\n  table { border-collapse: collapse; }\n  th, td { padding: 6px 12px; text-align: left; }\n  tbody tr:nth-child(even) { background: #f6f2ff; }\n  td:first-child { font-weight: bold; }\n</style>\n<table>\n  <caption>Avgångar från Centralen</caption>\n  <thead><tr><th scope="col">Tid</th><th scope="col">Till</th><th scope="col">Spår</th></tr></thead>\n  <tbody>\n    <tr><td>08.05</td><td>Uppsala</td><td>3</td></tr>\n    <tr><td>08.20</td><td>Västerås</td><td>5</td></tr>\n    <tr><td>08.35</td><td>Nyköping</td><td>2</td></tr>\n    <tr><td>08.50</td><td>Gävle</td><td>4</td></tr>\n  </tbody>\n</table>',
            explain: 'Ränderna följer med automatiskt när du lägger till eller tar bort rader, utan extra klasser i HTML.', hint: 'Två nya regler: tbody tr:nth-child(even) { background: ... } och td:first-child { font-weight: bold; }.' },
          { type: 'web', prompt: 'Lägg till dekor med CSS i stället för i HTML. Ge `.fördelar li::before` innehållet `"✓ "`. Märk externa länkar med `a[href^="https"]::after` och `content: " ↗"`, och låt länken till prislistan få texten `" (PDF)"` med `a[href$=".pdf"]::after`.',
            starter: '<style>\n  .fördelar { list-style: none; padding: 0; }\n</style>\n<h2>Därför väljer folk oss</h2>\n<ul class="fördelar">\n  <li>Fri frakt över 300 kr</li>\n  <li>30 dagars öppet köp</li>\n  <li>Svensk kundtjänst</li>\n</ul>\n<p><a href="/filer/prislista.pdf">Ladda ner prislistan</a></p>\n<p><a href="https://www.konsumentverket.se">Läs om dina rättigheter</a></p>\n',
            checks: [{ source: '\\.fördelar\\s*>?\\s*li::before\\s*\\{[^}]*content\\s*:\\s*["\']✓', msg: 'Listpunkterna i .fördelar får en bock med ::before' }, { source: 'a\\[href\\^=["\']?https["\']?\\]::after\\s*\\{[^}]*content', msg: 'Externa länkar får en pil med a[href^="https"]::after' }, { source: 'a\\[href\\$=["\']?\\.pdf["\']?\\]::after\\s*\\{[^}]*content\\s*:\\s*["\'][^"\']*PDF', msg: 'PDF-länken får texten (PDF) med a[href$=".pdf"]::after' }],
            solution: '<style>\n  .fördelar { list-style: none; padding: 0; }\n  .fördelar li::before { content: "✓ "; color: #1f7a5c; }\n  a[href^="https"]::after { content: " ↗"; }\n  a[href$=".pdf"]::after { content: " (PDF)"; }\n</style>\n<h2>Därför väljer folk oss</h2>\n<ul class="fördelar">\n  <li>Fri frakt över 300 kr</li>\n  <li>30 dagars öppet köp</li>\n  <li>Svensk kundtjänst</li>\n</ul>\n<p><a href="/filer/prislista.pdf">Ladda ner prislistan</a></p>\n<p><a href="https://www.konsumentverket.se">Läs om dina rättigheter</a></p>',
            explain: 'Nya länkar märks automatiskt efter sina adresser, och HTML:en innehåller bara riktigt innehåll.', hint: 'Tre regler. Glöm inte citattecknen runt värdet i content.' },
          { type: 'web', prompt: 'Gör att-göra-listan levande utan JavaScript. När en kryssruta är ikryssad ska etiketten direkt efter bli genomstruken och grå. Använd syskonväljaren `input:checked + label` med `text-decoration: line-through` och en `color`.',
            starter: '<style>\n  .uppgift { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }\n</style>\n<h2>Inför flytten</h2>\n<div class="uppgift"><input type="checkbox" id="u1" checked><label for="u1">Beställ flyttkartonger</label></div>\n<div class="uppgift"><input type="checkbox" id="u2"><label for="u2">Säg upp elavtalet</label></div>\n<div class="uppgift"><input type="checkbox" id="u3"><label for="u3">Anmäl ny adress</label></div>\n',
            checks: [{ source: ':checked\\s*\\+\\s*label\\s*\\{[^}]*text-decoration(-line)?\\s*:\\s*line-through', msg: 'input:checked + label får text-decoration: line-through' }, { source: ':checked\\s*\\+\\s*label\\s*\\{[^}]*[^-]color\\s*:', msg: 'Den avbockade etiketten får en annan färg' }, { labels: true, msg: 'Alla kryssrutor har kvar sina etiketter' }],
            solution: '<style>\n  .uppgift { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }\n  input:checked + label { text-decoration: line-through; color: #6b6878; }\n</style>\n<h2>Inför flytten</h2>\n<div class="uppgift"><input type="checkbox" id="u1" checked><label for="u1">Beställ flyttkartonger</label></div>\n<div class="uppgift"><input type="checkbox" id="u2"><label for="u2">Säg upp elavtalet</label></div>\n<div class="uppgift"><input type="checkbox" id="u3"><label for="u3">Anmäl ny adress</label></div>',
            explain: '+ väljer elementet direkt efter, och :checked ändras när du klickar. Testa att kryssa i rutorna i förhandsvisningen.', hint: 'En enda regel: input:checked + label { text-decoration: line-through; color: ...; }.' },
        ],
      },
      {
        id: 'web-darkmode', title: 'Mörkt läge och användarens inställningar', tier: 4,
        text: 'Många har mörkt läge påslaget i telefonen eller datorn. Med `@media (prefers-color-scheme: dark)` kan sidan följa det valet. Har du redan färgerna som variabler räcker det att skriva över variablerna i media-frågan. Resten av CSS:en rör du inte.\n\n`color-scheme: light dark;` på `:root` talar om för webbläsaren att sidan klarar båda lägena. Då får formulärfält, rullningslister och standardfärger rätt utseende automatiskt.\n\nMörkt läge är mer än att vända färgerna. Kontrollera att text, länkar och fokusramar har tillräcklig kontrast i båda temana. En mörklila fokusram som syns bra på vitt kan nästan försvinna mot en mörk bakgrund, så ge även den en egen variabel.',
        example: '<style>\n  :root { color-scheme: light dark; --bg: #ffffff; --text: #1f1d2b; --länk: #5a3fb0; --fokus: #6b4fbb; }\n  @media (prefers-color-scheme: dark) {\n    :root { --bg: #18161f; --text: #ece9f5; --länk: #c7b6ff; --fokus: #f2c94c; }\n  }\n  .sida { background: var(--bg); color: var(--text); padding: 16px; border-radius: 12px; }\n  .sida a { color: var(--länk); }\n  .sida a:focus-visible, .sida input:focus-visible { outline: 3px solid var(--fokus); outline-offset: 2px; }\n</style>\n<div class="sida">\n  <p>Byt till mörkt läge i ditt system och se sidan följa med. <a href="#">En länk</a></p>\n  <label for="sok">Sök</label> <input id="sok" type="search">\n</div>',
        exercises: [
          { type: 'choice', prompt: 'Vad gör `color-scheme: light dark;` på `:root`?', options: ['Byter automatiskt alla dina egna färger till mörka', 'Talar om att sidan stöder båda lägena, så att formulärfält och rullningslister får rätt färger', 'Tvingar sidan att alltid vara mörk'], answer: 1,
            explain: 'Webbläsarens egna delar följer då användarens läge. Dina egna färger styr du själv med variabler.',
            why: { 0: 'Dina egna färger ändrar du själv, till exempel med variabler i en prefers-color-scheme-fråga.', 2: 'light dark betyder att båda fungerar. Användarens inställning avgör vilket som visas.' } },
          { type: 'choice', prompt: 'I mörkt läge har sidan bakgrunden `#18161f` och fokusramen är `#3b2a80`, en mörklila. Vad är problemet?', options: ['Inget, fokusramar behöver inte synas tydligt', 'Ramen har för låg kontrast mot bakgrunden och syns knappt för den som använder tangentbord', 'outline fungerar inte i mörkt läge'], answer: 1,
            explain: 'Ge fokusfärgen en egen variabel och välj en ljus färg för mörkt läge.',
            why: { 0: 'Fokus måste synas, annars vet tangentbordsanvändare inte var de är på sidan.', 2: 'outline fungerar precis likadant i båda lägena. Det är färgvalet som är problemet.' } },
          { type: 'fill', prompt: 'Fyll i så att sidan stöder båda lägena och byter variabler i mörkt läge.', code: ':root { ___: light dark; --bg: #ffffff; --text: #1f1d2b; }\n@media (prefers-color-scheme: ___) {\n  :root { --bg: #18161f; --text: #ece9f5; }\n}', answers: [['color-scheme'], ['dark']], explain: 'color-scheme gäller webbläsarens egna delar, media-frågan dina egna variabler.' },
          { type: 'web', prompt: 'Sidan har redan sina färger som variabler. Lägg till `@media (prefers-color-scheme: dark)` där `:root` får nya, mörka värden på `--bg` och ljusa på `--text`. Rör inte `body`-regeln.',
            starter: '<style>\n  :root { --bg: #ffffff; --text: #1f1d2b; }\n  body { background: var(--bg); color: var(--text); }\n</style>\n<h1>Löparklubben Fart</h1>\n<p>Vi springer tillsammans varje tisdag och torsdag klockan 18.</p>\n',
            checks: [{ media: true, re: 'prefers-color-scheme\\s*:\\s*dark', msg: 'Det finns en media-fråga för prefers-color-scheme: dark' }, { css: ':root', prop: '--bg', inMedia: true, msg: ':root får ett nytt --bg i mörkt läge' }, { css: ':root', prop: '--text', inMedia: true, msg: ':root får ett nytt --text i mörkt läge' }, { css: 'body', prop: 'background(-color)?', re: 'var\\(\\s*--bg', msg: 'body använder fortfarande var(--bg)' }],
            solution: '<style>\n  :root { --bg: #ffffff; --text: #1f1d2b; }\n  @media (prefers-color-scheme: dark) {\n    :root { --bg: #18161f; --text: #ece9f5; }\n  }\n  body { background: var(--bg); color: var(--text); }\n</style>\n<h1>Löparklubben Fart</h1>\n<p>Vi springer tillsammans varje tisdag och torsdag klockan 18.</p>',
            explain: 'Bara variablerna byts. body-regeln är densamma i båda lägena.', hint: 'Skriv @media (prefers-color-scheme: dark) { :root { --bg: ...; --text: ...; } }.' },
          { type: 'web', prompt: 'Länkfärgen är hårdkodad och fokus är bortplockat, så sidan är svår att använda i mörkt läge. Lägg till `color-scheme: light dark` på `:root`. Skapa variablerna `--länk` och `--fokus` i båda temana (mörkare färger i ljust läge, ljusa i mörkt läge). Låt `a` använda `var(--länk)`, ta bort `outline: none` och ge `a:focus-visible` och `button:focus-visible` en `outline` med `var(--fokus)`.',
            starter: '<style>\n  :root { --bg: #ffffff; --text: #1f1d2b; }\n  @media (prefers-color-scheme: dark) {\n    :root { --bg: #18161f; --text: #ece9f5; }\n  }\n  body { background: var(--bg); color: var(--text); }\n  a { color: #3b2a80; }\n  a, button { outline: none; }\n  button { font: inherit; padding: 8px 14px; }\n</style>\n<h1>Löparklubben Fart</h1>\n<p>Nästa pass: intervaller i Slottsparken. <a href="#">Se hela schemat</a></p>\n<button>Anmäl dig</button>\n',
            checks: [{ css: ':root', prop: 'color-scheme', re: 'light\\s+dark|dark\\s+light', msg: ':root har color-scheme: light dark' }, { source: '--länk\\s*:[\\s\\S]*--länk\\s*:', msg: '--länk definieras i både ljust och mörkt tema' }, { source: '--fokus\\s*:[\\s\\S]*--fokus\\s*:', msg: '--fokus definieras i både ljust och mörkt tema' }, { css: ':root', prop: '--länk', inMedia: true, msg: 'Mörkt läge har ett eget värde på --länk' }, { css: 'a', prop: 'color', re: 'var\\(\\s*--länk', msg: 'Länkarna använder var(--länk)' }, { source: 'outline\\s*:\\s*none', invert: true, msg: 'outline: none är borttaget' }, { source: 'a:focus-visible[^{]*\\{[^}]*outline\\s*:[^;}]*var\\(\\s*--fokus', msg: 'a:focus-visible har en outline med var(--fokus)' }, { source: 'button:focus-visible[^{]*\\{[^}]*outline\\s*:[^;}]*var\\(\\s*--fokus', msg: 'button:focus-visible har en outline med var(--fokus)' }],
            solution: '<style>\n  :root { color-scheme: light dark; --bg: #ffffff; --text: #1f1d2b; --länk: #3b2a80; --fokus: #6b4fbb; }\n  @media (prefers-color-scheme: dark) {\n    :root { --bg: #18161f; --text: #ece9f5; --länk: #c7b6ff; --fokus: #f2c94c; }\n  }\n  body { background: var(--bg); color: var(--text); }\n  a { color: var(--länk); }\n  a:focus-visible, button:focus-visible { outline: 3px solid var(--fokus); outline-offset: 2px; }\n  button { font: inherit; padding: 8px 14px; }\n</style>\n<h1>Löparklubben Fart</h1>\n<p>Nästa pass: intervaller i Slottsparken. <a href="#">Se hela schemat</a></p>\n<button>Anmäl dig</button>',
            explain: 'Länkar och fokus har nu god kontrast i båda lägena, och knappen följer systemets tema tack vare color-scheme.', hint: 'Lägg till color-scheme, --länk och --fokus i båda :root-reglerna, och skriv en gemensam regel a:focus-visible, button:focus-visible.' },
        ],
      },
    ],
  },
  {
    id: 'web10',
    title: 'Slutprojekt i HTML och CSS',
    lessons: [
      {
        id: 'web-landing', title: 'Slutprojekt: landningssida', tier: 5,
        text: 'Nu bygger du en hel landningssida för en påhittad tjänst, Cykelpoolen, som hyr ut lådcyklar i kvarteret. Du använder semantisk struktur, ett tema med variabler, flytande rubriker med `clamp()` och ett responsivt grid.\n\nArbeta i samma ordning som en front-end-utvecklare: först innehåll och struktur, sedan tema, sedan layout och sist detaljer som fokus och rörelse. Varje del bygger vidare på den förra.',
        example: '<style>\n  :root { --accent: #1f7a5c; }\n  .hero h1 { font-size: clamp(2rem, 6vw, 3.5rem); }\n  .knapp { display: inline-block; background: var(--accent); color: white; padding: 12px 20px; border-radius: 12px; text-decoration: none; }\n</style>\n<section class="hero">\n  <h1>Låna en lådcykel</h1>\n  <p>Från 49 kr i timmen.</p>\n  <a class="knapp" href="#">Så funkar det</a>\n</section>',
        exercises: [
          { type: 'web', prompt: 'Del 1: Bygg strukturen. Ett `header` med logotyptext och en `nav` med minst tre länkar i en lista. I `main`: en `section class="hero"` med sidans enda `h1`, ett stycke och en länk med klassen `knapp`, och sedan en `section class="funktioner"` med en `h2` och en `div class="rutnat"` med minst tre `article`, var och en med `h3` och ett stycke. Avsluta med en `footer`.',
            starter: '<!-- Bygg Cykelpoolens sida här -->\n',
            checks: [{ q: 'header nav ul li a', min: 3, msg: 'header har en nav med minst tre länkar i en lista' }, { q: 'h1', min: 1, max: 1, msg: 'Sidan har exakt en h1' }, { q: 'main section.hero h1', msg: 'h1 ligger i section.hero inuti main' }, { q: 'section.hero a.knapp', msg: 'Hero-sektionen har en länk med klassen knapp' }, { q: 'main section.funktioner h2', msg: 'section.funktioner har en h2' }, { q: 'section.funktioner .rutnat > article', min: 3, msg: 'Minst tre article i .rutnat' }, { q: '.rutnat > article h3', min: 3, msg: 'Varje article har en h3' }, { q: '.rutnat > article p', min: 3, msg: 'Varje article har ett stycke' }, { q: 'footer', msg: 'Sidan har en footer' }],
            solution: LAND_HTML,
            explain: 'Strukturen säger vad allt är. Skärmläsare kan hoppa mellan header, main, sektioner och footer.', hint: 'Bygg uppifrån och ner: header med nav och ul, main med två section, och footer sist.' },
          { type: 'web', prompt: 'Del 2: Tema och typografi. Definiera minst `--accent`, `--bg` och `--text` på `:root`. Låt `body` använda `var(--bg)` som bakgrund och `var(--text)` som textfärg, och ge `.knapp` bakgrunden `var(--accent)`. Gör hero-rubriken flytande med `.hero h1 { font-size: clamp(...); }`.',
            starter: '<style>\n\n</style>\n' + LAND_HTML + '\n',
            checks: [{ css: ':root', prop: '--accent', msg: ':root definierar --accent' }, { css: ':root', prop: '--bg', msg: ':root definierar --bg' }, { css: ':root', prop: '--text', msg: ':root definierar --text' }, { css: 'body', prop: 'background(-color)?', re: 'var\\(\\s*--bg', msg: 'body använder var(--bg) som bakgrund' }, { css: 'body', prop: 'color', re: 'var\\(\\s*--text', msg: 'body använder var(--text) som textfärg' }, { css: '.knapp', prop: 'background(-color)?', re: 'var\\(\\s*--accent', msg: '.knapp har bakgrunden var(--accent)' }, { css: '.hero h1', prop: 'font-size', re: 'clamp\\(', msg: '.hero h1 har font-size med clamp()' }],
            solution: style(LAND_CSS2) + LAND_HTML,
            explain: 'clamp(2rem, 6vw, 3.5rem) växer med skärmen men blir aldrig mindre än 2rem eller större än 3.5rem.', hint: 'Börja med :root { ... }, sedan body, .hero h1 och .knapp.' },
          { type: 'web', prompt: 'Del 3: Layout. Gör `.sidhuvud` till en flexrad med `justify-content: space-between`, och menylistan `.sidhuvud ul` till en flexrad. Begränsa `main` med `max-width` och centrera den med `margin-inline: auto` (eller `margin: 0 auto`). Ge `.rutnat` `display: grid` och `gap`, och lägg till en `@media (min-width: ...)` där `.rutnat` får tre kolumner.',
            starter: style(LAND_CSS2) + LAND_HTML + '\n',
            checks: [{ css: '.sidhuvud', prop: 'display', re: 'flex', msg: '.sidhuvud är en flexrad' }, { css: '.sidhuvud', prop: 'justify-content', re: 'space-between', msg: '.sidhuvud har justify-content: space-between' }, { css: '.sidhuvud ul', prop: 'display', re: 'flex', msg: '.sidhuvud ul är en flexrad' }, { css: 'main', prop: 'max-width', msg: 'main har en max-width' }, { source: 'main\\s*\\{[^}]*margin(-inline)?\\s*:\\s*(0\\s+)?auto', msg: 'main centreras med auto-marginaler' }, { css: '.rutnat', prop: 'display', re: 'grid', msg: '.rutnat är ett grid' }, { css: '.rutnat', prop: 'gap', msg: '.rutnat har gap' }, { media: true, re: 'min-width', msg: 'Det finns en media-fråga med min-width' }, { css: '.rutnat', prop: 'grid-template-columns', re: 'repeat\\(\\s*3\\s*,|^\\s*1fr\\s+1fr\\s+1fr', inMedia: true, msg: '.rutnat får tre kolumner i media-frågan' }],
            solution: style(LAND_CSS3) + LAND_HTML,
            explain: 'Mobilen får en kolumn som standard och bredare skärmar tre. Det kallas mobile first.', hint: 'Skriv reglerna för .sidhuvud, .sidhuvud ul, main och .rutnat, och sist @media (min-width: 700px) { .rutnat { grid-template-columns: repeat(3, 1fr); } }.' },
          { type: 'web', prompt: 'Del 4: Finputs. Ge `.knapp` en `transition` och skriv regeln `.knapp:hover, .knapp:focus-visible` som lyfter knappen med `transform`. Ge `a:focus-visible` en tydlig `outline` i accentfärgen med `var(--accent)`. Stäng till sist av knappens övergång i `@media (prefers-reduced-motion: reduce)`.',
            starter: style(LAND_CSS3) + LAND_HTML + '\n',
            checks: [{ css: '.knapp', prop: 'transition', re: 'transform|all', msg: '.knapp har en transition' }, { css: '.knapp:hover', prop: 'transform', msg: '.knapp:hover flyttar knappen med transform' }, { css: '.knapp:focus-visible', prop: 'transform', msg: '.knapp:focus-visible får samma effekt' }, { source: 'a:focus-visible[^{]*\\{[^}]*outline\\s*:[^;}]*var\\(\\s*--accent', msg: 'a:focus-visible har en outline med var(--accent)' }, { media: true, re: 'prefers-reduced-motion\\s*:\\s*reduce', msg: 'Det finns en media-fråga för prefers-reduced-motion: reduce' }, { css: '.knapp', prop: 'transition', re: 'none', inMedia: true, msg: 'Övergången stängs av för den som vill ha mindre rörelse' }],
            solution: style(LAND_CSS4) + LAND_HTML,
            explain: 'Sidan är klar: semantisk, responsiv, tematiserad och lika tydlig med mus som med tangentbord.', hint: 'Fyra tillägg sist i style: transition på .knapp, hover- och fokusregeln, a:focus-visible och media-frågan.' },
        ],
      },
      {
        id: 'web-portfolio', title: 'Slutprojekt: portfolio', tier: 5,
        text: 'En portfolio är ofta det första en arbetsgivare ser av dig. Här bygger du en åt Sara, som söker jobb som front-end-utvecklare: projektkort i ett grid, en meny som följer med när man scrollar, en hopplänk för tangentbordsanvändare och mörkt läge.\n\nEn **hopplänk** är den första länken på sidan. Den är gömd tills den får fokus, och låter den som tabbar hoppa förbi menyn direkt till innehållet. En **klistrig** meny (`position: sticky; top: 0;`) ligger kvar i överkanten när sidan scrollas.',
        example: '<style>\n  .hoppa { position: absolute; left: -9999px; }\n  .hoppa:focus { left: 16px; top: 16px; background: white; padding: 8px 12px; }\n  .sidhuvud { position: sticky; top: 0; background: white; padding: 12px; border-bottom: 1px solid #ddd; }\n</style>\n<a class="hoppa" href="#innehall">Hoppa till innehållet</a>\n<header class="sidhuvud">Sara Lind</header>\n<main id="innehall">\n  <p>Tryck Tab i förhandsvisningen så dyker hopplänken upp.</p>\n</main>',
        exercises: [
          { type: 'web', prompt: 'Del 1: Struktur, hopplänk och klistrig meny. Börja med hopplänken `<a class="hoppa" href="#innehall">Hoppa till innehållet</a>` före allt annat. Lägg sedan ett `header class="sidhuvud"` med Saras namn och en `nav` med minst två länkar, ett `main id="innehall"` med en `h1` och en `section class="projekt"` med en `h2`, och en `footer`. I CSS: göm `.hoppa` med `position: absolute` och ett stort negativt `left`, visa den igen i `.hoppa:focus`, och ge `.sidhuvud` `position: sticky`, `top: 0` och en bakgrund.',
            starter: '<style>\n\n</style>\n<!-- Hopplänk, sidhuvud, main och footer här -->\n',
            checks: [{ q: 'a.hoppa[href="#innehall"]', msg: 'Det finns en hopplänk a.hoppa till #innehall' }, { source: 'class="hoppa"[\\s\\S]*<header', msg: 'Hopplänken kommer före header' }, { q: 'header.sidhuvud nav a', min: 2, msg: 'header.sidhuvud har en nav med minst två länkar' }, { q: 'main#innehall h1', msg: 'main har id="innehall" och en h1' }, { q: 'main section.projekt h2', msg: 'main har en section.projekt med en h2' }, { q: 'footer', msg: 'Sidan har en footer' }, { css: '.hoppa', prop: 'position', re: 'absolute', msg: '.hoppa är gömd med position: absolute' }, { source: '\\.hoppa:focus(-visible)?\\s*\\{[^}]*left', msg: '.hoppa:focus flyttar in hopplänken igen' }, { css: '.sidhuvud', prop: 'position', re: 'sticky', msg: '.sidhuvud har position: sticky' }, { css: '.sidhuvud', prop: 'top', re: '^0', msg: '.sidhuvud har top: 0' }, { css: '.sidhuvud', prop: 'background(-color)?', msg: '.sidhuvud har en bakgrund' }],
            solution: style(PORT_CSS1) + port(''),
            explain: 'Den som tabbar möts först av hopplänken och slipper gå igenom hela menyn på varje sida.', hint: 'HTML först: a.hoppa, header, main, footer. Sedan tre CSS-regler: .hoppa, .hoppa:focus och .sidhuvud.' },
          { type: 'web', prompt: 'Del 2: Projektkort. Lägg en `div class="kortlista"` i `.projekt` med minst tre `article class="projektkort"`. Varje kort har en bild med alt-text, en `h3`, en kort beskrivning och en länk med unik text. Gör `.kortlista` till ett grid med `gap` och `repeat(auto-fit, minmax(...))`, ge korten en bakgrund, och ge `.projektkort img` `width: 100%` (eller `max-width: 100%`).',
            starter: style(PORT_CSS1) + port('') + '\n',
            checks: [{ q: '.projekt .kortlista > article.projektkort', min: 3, msg: 'Minst tre article.projektkort i .kortlista' }, { q: 'article.projektkort img[alt]', min: 3, msg: 'Varje kort har en bild med alt-text' }, { q: 'article.projektkort h3', min: 3, msg: 'Varje kort har en h3' }, { q: 'article.projektkort a[href]', min: 3, msg: 'Varje kort har en länk' }, { css: '.kortlista', prop: 'display', re: 'grid', msg: '.kortlista är ett grid' }, { css: '.kortlista', prop: 'gap', msg: '.kortlista har gap' }, { css: '.kortlista', prop: 'grid-template-columns', re: 'repeat\\(\\s*auto-(fit|fill)\\s*,\\s*minmax\\(', msg: 'Kolumnerna använder repeat(auto-fit, minmax(...))' }, { css: '.projektkort', prop: 'background(-color)?', msg: '.projektkort har en bakgrund' }, { css: '.projektkort img', prop: '(max-)?width', re: '100%', msg: 'Bilderna anpassar sig efter kortets bredd' }],
            solution: style(PORT_CSS2) + port(PORT_CARDS),
            explain: 'Korten fördelar sig själva: en kolumn på mobil och fler när det finns plats.', hint: 'Skriv ett kort färdigt och kopiera det. Tre CSS-regler: .kortlista, .projektkort och .projektkort img.' },
          { type: 'web', prompt: 'Del 3: Rörelse. Ge `.projektkort` en `transition` på `transform` och `box-shadow`. Skriv regeln `.projektkort:hover, .projektkort:focus-within` som lyfter kortet med `transform: translateY(...)` och ger det en `box-shadow`. Stäng av övergången i `@media (prefers-reduced-motion: reduce)`.',
            starter: style(PORT_CSS2) + port(PORT_CARDS) + '\n',
            checks: [{ css: '.projektkort', prop: 'transition', re: 'transform|all', msg: '.projektkort har en transition på transform' }, { css: '.projektkort:hover', prop: 'transform', re: 'translateY\\(\\s*-', msg: '.projektkort:hover lyfter kortet' }, { css: '.projektkort:hover', prop: 'box-shadow', msg: '.projektkort:hover får en skugga' }, { css: '.projektkort:focus-within', prop: 'transform', re: 'translateY\\(\\s*-', msg: '.projektkort:focus-within får samma lyft' }, { media: true, re: 'prefers-reduced-motion\\s*:\\s*reduce', msg: 'Det finns en media-fråga för prefers-reduced-motion: reduce' }, { css: '.projektkort', prop: 'transition', re: 'none', inMedia: true, msg: 'Övergången stängs av i media-frågan' }],
            solution: style(PORT_CSS3) + port(PORT_CARDS),
            explain: 'Kortet reagerar både när musen är över det och när länken inuti får fokus med Tab.', hint: 'Lägg transition i .projektkort, skriv hover- och focus-within-regeln och avsluta med media-frågan.' },
          { type: 'web', prompt: 'Del 4: Mörkt läge. Byt de hårdkodade färgerna mot variabler. Lägg `color-scheme: light dark`, `--bg`, `--text` och `--yta` på `:root`, och ge dem mörka värden i `@media (prefers-color-scheme: dark)`. Låt `body` och `.sidhuvud` använda `var(--bg)` och `.projektkort` använda `var(--yta)`, och ge `body` textfärgen `var(--text)`.',
            starter: style(PORT_CSS3) + port(PORT_CARDS) + '\n',
            checks: [{ css: ':root', prop: 'color-scheme', re: 'light\\s+dark|dark\\s+light', msg: ':root har color-scheme: light dark' }, { css: ':root', prop: '--bg', msg: ':root definierar --bg' }, { css: ':root', prop: '--yta', msg: ':root definierar --yta' }, { media: true, re: 'prefers-color-scheme\\s*:\\s*dark', msg: 'Det finns en media-fråga för prefers-color-scheme: dark' }, { css: ':root', prop: '--bg', inMedia: true, msg: '--bg får ett mörkt värde i mörkt läge' }, { css: ':root', prop: '--yta', inMedia: true, msg: '--yta får ett mörkt värde i mörkt läge' }, { css: ':root', prop: '--text', inMedia: true, msg: '--text får ett ljust värde i mörkt läge' }, { css: 'body', prop: 'background(-color)?', re: 'var\\(\\s*--bg', msg: 'body använder var(--bg)' }, { css: 'body', prop: 'color', re: 'var\\(\\s*--text', msg: 'body använder var(--text) som textfärg' }, { css: '.sidhuvud', prop: 'background(-color)?', re: 'var\\(\\s*--bg', msg: '.sidhuvud använder var(--bg)' }, { css: '.projektkort', prop: 'background(-color)?', re: 'var\\(\\s*--yta', msg: '.projektkort använder var(--yta)' }],
            solution: style(PORT_CSS4) + port(PORT_CARDS),
            explain: 'Portfolion följer besökarens tema. Glöm inte att även klistriga menyn behöver variabeln, annars blir den en vit rand i mörkt läge.', hint: 'Lägg till :root och media-frågan överst, och byt #ffffff och #f4f2fa mot var(--bg) och var(--yta).' },
        ],
      },
      {
        id: 'web-signup', title: 'Slutprojekt: registreringsformulär', tier: 5,
        text: 'Det sista projektet är ett registreringsformulär till en kodklubb. Formulär är där tillgänglighet märks mest: fel som inte syns, etiketter som saknas eller regler som ingen förklarar gör att folk ger upp.\n\nDu grupperar fälten med `fieldset` och `legend`, låter webbläsaren kontrollera innehållet med `required`, `type`, `minlength` och `pattern`, kopplar hjälptexter med `aria-describedby` och gör fokus och fel tydliga med CSS. `:user-invalid` fungerar som `:invalid` men väntar tills användaren har ändrat fältet, så att formuläret inte är rött redan från början. Sist gör du layouten responsiv.',
        example: '<style>\n  input { font: inherit; padding: 8px; border: 2px solid #8a8799; border-radius: 8px; }\n  input:focus-visible { outline: 3px solid #6b4fbb; outline-offset: 2px; }\n  input:user-invalid { border-color: #b3261e; }\n  .hjalp { font-size: 0.875rem; color: #5c596b; }\n</style>\n<fieldset>\n  <legend>Konto</legend>\n  <label for="exempel-epost">E-post</label>\n  <input id="exempel-epost" type="email" aria-describedby="exempel-hjalp" required>\n  <p class="hjalp" id="exempel-hjalp">Vi skickar en bekräftelse hit.</p>\n</fieldset>',
        exercises: [
          { type: 'web', prompt: 'Del 1: Struktur. Formuläret har redan ett `fieldset` för namnet. Lägg till ett `fieldset` med `legend` "Konto" som har e-post (`type="email"`, `autocomplete="email"`, `required`) och lösenord (`type="password"`, `autocomplete="new-password"`, `minlength="8"`, `required`). Lägg till ett tredje `fieldset` med `legend` "Erfarenhet" och minst tre radioknappar med `name="niva"`. Alla fält ska ha kopplade etiketter, och formuläret ska ha en knapp med `type="submit"`.',
            starter: '<form class="registrering">\n' + SIGN_OM + '</form>\n',
            checks: [{ q: 'form.registrering fieldset > legend', min: 3, msg: 'Formuläret har tre fieldset med legend' }, { q: 'input[type="email"][autocomplete="email"][required]', msg: 'E-post har type="email", autocomplete="email" och required' }, { q: 'input[type="password"][autocomplete="new-password"][required]', msg: 'Lösenordet har type="password", autocomplete="new-password" och required' }, { q: 'input[type="password"]', attr: 'minlength', re: '^([89]|[1-9]\\d+)$', msg: 'Lösenordet kräver minst 8 tecken med minlength' }, { q: 'fieldset input[type="radio"][name="niva"]', min: 3, msg: 'Minst tre radioknappar med name="niva"' }, { labels: true, msg: 'Alla fält har kopplade etiketter' }, { q: 'form.registrering button[type="submit"]', msg: 'Det finns en skicka-knapp' }],
            solution: SIGN_F1,
            explain: 'Grupperna gör formuläret lätt att överblicka, och skärmläsare läser upp legend tillsammans med fälten i gruppen.', hint: 'Följ mönstret i "Om dig": en div.falt med label och input per fält. Radioknapparna behöver var sitt id och samma name.' },
          { type: 'web', prompt: 'Del 2: Hjälptexter och regler. Lägg en hjälptext under lösenordet, `<p class="hjalp" id="losenord-hjalp">Minst 8 tecken.</p>`, och koppla den med `aria-describedby="losenord-hjalp"`. Lägg sedan först i Konto till ett användarnamn med `id="anvandarnamn"`, `pattern="[a-z0-9_]{3,16}"` och `required`, med en etikett och en hjälptext `id="anvandarnamn-hjalp"` som förklarar reglerna, kopplad på samma sätt.',
            starter: SIGN_F1 + '\n',
            checks: [{ q: '#losenord', attr: 'aria-describedby', re: '(^|\\s)losenord-hjalp(\\s|$)', msg: 'Lösenordet pekar på hjälptexten med aria-describedby' }, { q: '#losenord-hjalp', text: '\\S', msg: 'Hjälptexten för lösenordet finns och har innehåll' }, { q: 'input#anvandarnamn[required]', msg: 'Det finns ett obligatoriskt fält med id="anvandarnamn"' }, { q: '#anvandarnamn', attr: 'pattern', re: '\\S', msg: 'Användarnamnet har ett pattern' }, { q: '#anvandarnamn', attr: 'aria-describedby', re: '(^|\\s)anvandarnamn-hjalp(\\s|$)', msg: 'Användarnamnet pekar på sin hjälptext' }, { q: '#anvandarnamn-hjalp', text: '\\S', msg: 'Hjälptexten för användarnamnet finns och har innehåll' }, { labels: true, msg: 'Alla fält har kopplade etiketter' }],
            solution: SIGN_F2,
            explain: 'Reglerna står nu bredvid fälten och läses upp när fältet får fokus, inte först när något har gått fel.', hint: 'Kopiera mönstret: div.falt med label, input och p.hjalp. Id:t på p:n ska stå i inputens aria-describedby.' },
          { type: 'web', prompt: 'Del 3: Fokus och fel. Skriv en regel `input` med `font: inherit`, `padding` och en `border`. Ge `input:focus-visible` en `outline` på minst 2px och en `outline-offset`. Ge ogiltiga fält en röd kant med `input:user-invalid` (eller `input:invalid`) och `border-color`. Ge `.hjalp` mindre text med `font-size` och en dämpad `color`.',
            starter: '<style>\n\n</style>\n' + SIGN_F2 + '\n',
            checks: [{ css: 'input', prop: 'font', re: 'inherit', msg: 'input har font: inherit' }, { css: 'input', prop: 'border', msg: 'input har en egen kantlinje' }, { css: 'input:focus-visible', prop: 'outline', re: '([2-9]|\\d{2,})px', msg: 'input:focus-visible har en outline på minst 2px' }, { css: 'input:focus-visible', prop: 'outline-offset', msg: 'input:focus-visible har en outline-offset' }, { source: 'input:(user-)?invalid[^{]*\\{[^}]*border(-color)?\\s*:', msg: 'Ogiltiga fält får en egen kantfärg' }, { css: '.hjalp', prop: 'font-size', msg: '.hjalp har en mindre font-size' }, { css: '.hjalp', prop: 'color', msg: '.hjalp har en egen färg' }],
            solution: style(SIGN_CSS3) + SIGN_F2,
            explain: 'Skriv något kort i användarnamnet och lämna fältet, så blir kanten röd. Felet visas när det är relevant, inte innan.', hint: 'Fyra regler: input, input:focus-visible, input:user-invalid och .hjalp.' },
          { type: 'web', prompt: 'Del 4: Responsiv layout. Gör `.registrering` till ett grid med `gap` och en `max-width`, och `.falt` till en kolumn med `display: grid` (eller flex). Ge `.namnrad` `display: grid` och `gap` så att förnamn och efternamn ligger under varandra på mobil, och lägg till en `@media (min-width: ...)` där `.namnrad` får två kolumner med `grid-template-columns`.',
            starter: style(SIGN_CSS3) + SIGN_F2 + '\n',
            checks: [{ css: '.registrering', prop: 'display', re: 'grid', msg: '.registrering är ett grid' }, { css: '.registrering', prop: 'gap', msg: '.registrering har gap' }, { css: '.registrering', prop: 'max-width', msg: '.registrering har en max-width' }, { css: '.falt', prop: 'display', re: 'grid|flex', msg: '.falt lägger etikett och fält i en kolumn' }, { css: '.namnrad', prop: 'display', re: 'grid', msg: '.namnrad är ett grid' }, { css: '.namnrad', prop: 'gap', msg: '.namnrad har gap' }, { media: true, re: 'min-width', msg: 'Det finns en media-fråga med min-width' }, { css: '.namnrad', prop: 'grid-template-columns', inMedia: true, msg: '.namnrad får två kolumner i media-frågan' }],
            solution: style(SIGN_CSS4) + SIGN_F2,
            explain: 'Formuläret är klart: grupperat, förklarat, validerat, tydligt i alla lägen och bekvämt på både mobil och dator. Det är så ett riktigt formulär ska fungera.', hint: 'Regler för .registrering, .falt och .namnrad, och sist @media (min-width: 520px) { .namnrad { grid-template-columns: 1fr 1fr; } }.' },
        ],
      },
    ],
  },
];
