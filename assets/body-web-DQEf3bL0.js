import{v as e}from"./index-BYtOnYW3.js";var t=`<header class="sidhuvud">
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
</footer>`,n=`  :root { --accent: #1f7a5c; --accent-text: #ffffff; --bg: #fbfaf7; --text: #1d2321; --yta: #eef5f1; --radie: 12px; }
  body { margin: 0; background: var(--bg); color: var(--text); line-height: 1.5; }
  .hero h1 { font-size: clamp(2rem, 6vw, 3.5rem); line-height: 1.1; }
  .knapp { display: inline-block; background: var(--accent); color: var(--accent-text); padding: 12px 20px; border-radius: var(--radie); text-decoration: none; }`,r=`${n}
  .sidhuvud { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding: 12px 16px; }
  .sidhuvud ul { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
  main { max-width: 960px; margin-inline: auto; padding: 0 16px; }
  .rutnat { display: grid; gap: 16px; grid-template-columns: 1fr; }
  .rutnat article { background: var(--yta); padding: 16px; border-radius: var(--radie); }
  @media (min-width: 700px) {
    .rutnat { grid-template-columns: repeat(3, 1fr); }
  }`,i=`${r}
  .knapp { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .knapp:hover, .knapp:focus-visible { transform: translateY(-2px); box-shadow: 0 6px 14px rgb(0 0 0 / 0.15); }
  a:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) {
    .knapp { transition: none; }
  }`,a=`    <div class="kortlista">
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
`,o=e=>`<a class="hoppa" href="#innehall">Hoppa till innehållet</a>
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
${e}  </section>
</main>
<footer id="kontakt">
  <p>Mejla mig: sara@example.se</p>
</footer>`,s=`  .hoppa { position: absolute; left: -9999px; }
  .hoppa:focus { left: 16px; top: 16px; background: #ffffff; padding: 8px 12px; z-index: 10; }
  .sidhuvud { position: sticky; top: 0; background: #ffffff; display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; }
  .sidhuvud nav { display: flex; gap: 16px; }`,c=`${s}
  .kortlista { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
  .projektkort { background: #f4f2fa; padding: 12px; border-radius: 12px; }
  .projektkort img { display: block; width: 100%; height: auto; border-radius: 8px; }`,l=`${c}
  .projektkort { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .projektkort:hover, .projektkort:focus-within { transform: translateY(-4px); box-shadow: 0 8px 20px rgb(0 0 0 / 0.15); }
  @media (prefers-reduced-motion: reduce) {
    .projektkort { transition: none; }
  }`,u=`  :root { color-scheme: light dark; --bg: #ffffff; --text: #1f1d2b; --yta: #f4f2fa; --accent: #5a3fb0; }
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
  }`,d=`  <h2>Gå med i kodklubben</h2>
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
`,f=`  <fieldset>
    <legend>Erfarenhet</legend>
    <div class="val"><input type="radio" id="niva-ny" name="niva" value="ny" required><label for="niva-ny">Helt ny</label></div>
    <div class="val"><input type="radio" id="niva-lite" name="niva" value="lite"><label for="niva-lite">Har testat lite</label></div>
    <div class="val"><input type="radio" id="niva-van" name="niva" value="van"><label for="niva-van">Van</label></div>
  </fieldset>
  <button type="submit">Skapa konto</button>
`,p=`<form class="registrering">
${d}  <fieldset>
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
${f}</form>`,m=`<form class="registrering">
${d}  <fieldset>
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
${f}</form>`,h=`  input { font: inherit; padding: 8px 10px; border: 2px solid #8a8799; border-radius: 8px; }
  input:focus-visible { outline: 3px solid #6b4fbb; outline-offset: 2px; }
  input:user-invalid { border-color: #b3261e; }
  .hjalp { font-size: 0.875rem; color: #5c596b; margin: 4px 0 0; }`,g=`${h}
  .registrering { display: grid; gap: 16px; max-width: 560px; }
  fieldset { display: grid; gap: 12px; border: 1px solid #d6d3e0; border-radius: 12px; }
  .falt { display: grid; gap: 4px; }
  .namnrad { display: grid; gap: 12px; }
  button[type="submit"] { justify-self: start; font: inherit; padding: 10px 18px; border: 0; border-radius: 8px; background: #6b4fbb; color: white; }
  @media (min-width: 520px) {
    .namnrad { grid-template-columns: 1fr 1fr; }
  }`,_=e=>`<style>\n${e}\n</style>\n`,v=[{id:`web7`,title:`Avancerad layout`,lessons:[{id:`web-flex-adv`,title:`Flexbox på djupet`,tier:4,text:"Flexbox har två axlar. `justify-content` fördelar barnen längs **huvudaxeln**, som är raden, och `align-items` placerar dem längs **tväraxeln**. Med `flex-wrap: wrap;` får barnen bryta till en ny rad i stället för att tryckas ihop, och `gap` ger jämna avstånd utan att du behöver marginaler.\n\n`flex` är en förkortning av tre värden: `flex-grow` (hur mycket barnet får växa), `flex-shrink` (hur mycket det får krympa) och `flex-basis` (storleken det utgår från). `flex: 1;` betyder att barnet tar sin del av den lediga platsen.\n\nI riktiga projekt används flexbox till saker i en dimension: en navigeringsrad med logga till vänster och länkar till höger, en rad kort som bryter snyggt, eller en sidfot som alltid ligger längst ner.",example:`<style>
  /* 1. Sidhuvud och meny */
  .topp { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px; background: #f6f2ff; }
  .meny { display: flex; gap: 12px; list-style: none; margin: 0; padding: 0; }
  /* 2. Kort som bryts */
  .kort-rad { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; }
  .kort-rad div { flex: 1 1 140px; padding: 12px; background: #eef6ff; }
</style>
<!-- 3. Sidhuvudet -->
<header class="topp">
  <strong>Kafé Kod</strong>
  <nav>
    <ul class="meny">
      <li><a href="#">Meny</a></li>
      <li><a href="#">Hitta hit</a></li>
    </ul>
  </nav>
</header>
<!-- 4. Raden med kort -->
<div class="kort-rad">
  <div>Kaffe</div>
  <div>Te</div>
  <div>Bulle</div>
</div>`,exercises:[{type:`choice`,prompt:"En flexrad har tre barn och `justify-content: space-between;`. Var hamnar de?",options:[`Första och sista barnet hamnar vid kanterna, och den lediga platsen delas mellan barnen`,`Alla tre samlas i mitten`,`Barnen sträcks ut så att de fyller hela raden`],answer:0,explain:`space-between lägger all ledig plats mellan barnen, ingen utanför. Perfekt för logga till vänster och meny till höger.`,why:{1:`Det är justify-content: center som samlar barnen i mitten.`,2:`justify-content ändrar inte barnens storlek, den flyttar bara den lediga platsen. Att växa gör man med flex-grow.`}},{type:`choice`,prompt:"En rad har en logga, ett sökfält och en knapp. Sökfältet har `flex: 1;`. Vad händer?",code:`<style>
  .rad { display: flex; gap: 8px; }
  .sok { flex: 1; }
</style>`,options:[`Sökfältet tar all ledig plats som blir över`,`Sökfältet blir exakt 1px brett`,`Sökfältet hamnar på en egen rad`],answer:0,explain:`flex: 1 ger flex-grow: 1. Loggan och knappen behåller sin storlek och sökfältet fyller resten.`,why:{1:`Talet i flex är en andel av den lediga platsen, inte en längd i pixlar.`,2:`Ett barn bryter bara till ny rad med flex-wrap: wrap när platsen tar slut. flex: 1 gör tvärtom att det växer på samma rad.`}},{type:`fill`,prompt:`Låt bilderna bryta till nya rader och få 12px mellanrum.`,code:`<style>
  .galleri {
    display: flex;
    flex-___: wrap;
    ___: 12px;
  }
</style>`,answers:[[`wrap`],[`gap`]],explain:`flex-wrap: wrap låter raden bryta, och gap ger avstånd både mellan kolumner och rader.`},{type:`web`,prompt:"Bygg en navigeringsrad. Gör `.topp` till en flexrad med `justify-content: space-between` och `align-items: center`, så att loggan hamnar till vänster och menyn till höger. Gör sedan `.meny` till en flexrad med `gap` och ta bort punkterna med `list-style: none`.",starter:`<style>
  .topp { padding: 12px 16px; background: #f6f2ff; }
  .meny { margin: 0; padding: 0; }
</style>
<header class="topp">
  <a class="logga" href="#">Kafé Kod</a>
  <nav>
    <ul class="meny">
      <li><a href="#">Meny</a></li>
      <li><a href="#">Öppettider</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>
</header>
`,checks:[{css:`.topp`,prop:`display`,re:`^flex$`,msg:`.topp har display: flex`},{css:`.topp`,prop:`justify-content`,re:`space-between`,msg:`.topp har justify-content: space-between`},{css:`.topp`,prop:`align-items`,re:`center`,msg:`.topp har align-items: center`},{css:`.meny`,prop:`display`,re:`^flex$`,msg:`.meny har display: flex`},{css:`.meny`,prop:`gap`,msg:`.meny har gap`},{css:`.meny`,prop:`list-style(-type)?`,re:`none`,msg:`.meny har list-style: none`}],solution:`<style>
  .topp { padding: 12px 16px; background: #f6f2ff; display: flex; justify-content: space-between; align-items: center; }
  .meny { margin: 0; padding: 0; display: flex; gap: 16px; list-style: none; }
</style>
<header class="topp">
  <a class="logga" href="#">Kafé Kod</a>
  <nav>
    <ul class="meny">
      <li><a href="#">Meny</a></li>
      <li><a href="#">Öppettider</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>
</header>`,explain:`Två flexrader i varandra: den yttre fördelar logga och meny, den inre lägger länkarna bredvid varandra. Menyn är fortfarande en lista, vilket skärmläsare har nytta av.`,hint:`Tre deklarationer i .topp och tre i .meny.`},{type:`web`,prompt:"Korten trycks ihop på smala skärmar. Ge `.kort-rad` `flex-wrap: wrap` och ett `gap`, och ge `.kort` `flex: 1 1 200px` så att varje kort utgår från 200px men får växa och krympa.",starter:`<style>
  .kort-rad { display: flex; }
  .kort { padding: 12px; background: #eef6ff; border-radius: 8px; }
</style>
<div class="kort-rad">
  <div class="kort">Kanelbulle, 35 kr</div>
  <div class="kort">Kardemummabulle, 38 kr</div>
  <div class="kort">Chokladboll, 25 kr</div>
  <div class="kort">Morotskaka, 45 kr</div>
</div>
`,checks:[{css:`.kort-rad`,prop:`flex-wrap`,re:`^wrap$`,msg:`.kort-rad har flex-wrap: wrap`},{css:`.kort-rad`,prop:`gap`,msg:`.kort-rad har gap`},{css:`.kort`,prop:`flex`,re:`^1\\s+1\\s+200px$`,msg:`.kort har flex: 1 1 200px`}],solution:`<style>
  .kort-rad { display: flex; flex-wrap: wrap; gap: 12px; }
  .kort { padding: 12px; background: #eef6ff; border-radius: 8px; flex: 1 1 200px; }
</style>
<div class="kort-rad">
  <div class="kort">Kanelbulle, 35 kr</div>
  <div class="kort">Kardemummabulle, 38 kr</div>
  <div class="kort">Chokladboll, 25 kr</div>
  <div class="kort">Morotskaka, 45 kr</div>
</div>`,explain:`När raden blir smalare än korten tillsammans bryter de till en ny rad, och de som är kvar växer för att fylla bredden.`,hint:`flex-wrap och gap på raden, flex: 1 1 200px på korten.`},{type:`web`,prompt:"Sidfoten ska ligga längst ner även när innehållet är kort. Gör `.sida` till en flexkolumn (`display: flex` och `flex-direction: column`) med `min-height: 100vh`, och ge `main` `flex: 1` så att den fyller platsen som blir över.",starter:`<style>
  .sidfot { background: #1f1d2b; color: white; padding: 12px; }
</style>
<div class="sida">
  <header><h1>Kafé Kod</h1></header>
  <main><p>Välkommen in på en kopp.</p></main>
  <footer class="sidfot">Öppet alla dagar 8 till 17</footer>
</div>
`,checks:[{css:`.sida`,prop:`display`,re:`^flex$`,msg:`.sida har display: flex`},{css:`.sida`,prop:`flex-direction`,re:`^column$`,msg:`.sida har flex-direction: column`},{css:`.sida`,prop:`min-height`,msg:`.sida har en min-height`},{css:`main`,prop:`flex(-grow)?`,re:`^1`,msg:`main har flex: 1`}],solution:`<style>
  .sida { display: flex; flex-direction: column; min-height: 100vh; }
  main { flex: 1; }
  .sidfot { background: #1f1d2b; color: white; padding: 12px; }
</style>
<div class="sida">
  <header><h1>Kafé Kod</h1></header>
  <main><p>Välkommen in på en kopp.</p></main>
  <footer class="sidfot">Öppet alla dagar 8 till 17</footer>
</div>`,explain:`main växer och knuffar ner sidfoten. Det här mönstret finns på nästan alla webbplatser.`,hint:`Tre deklarationer i .sida och en ny regel för main.`}]},{id:`web-grid-areas`,title:`Grid med områden`,tier:4,text:"Med `grid-template-areas` ritar du layouten med ord. Varje textsträng är en rad och varje ord en cell. Skriver du samma namn två gånger på en rad sträcker sig området över två kolumner. En punkt `.` betyder en tom cell.\n\nSedan talar du om var varje element ska ligga med `grid-area: namn;`. Namnen hittar du på själv, men de måste stämma överens mellan mallen och elementen, och alla rader måste ha lika många celler.\n\nDet fina är att du kan byta hela layouten i en mediefråga utan att röra HTML:en. På en smal skärm skriver du bara om mallen till en kolumn.",example:`<style>
  /* 1. Mallen med områden */
  .sida {
    display: grid;
    grid-template-columns: 160px 1fr;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    gap: 12px;
  }
  /* 2. Koppla element till områden */
  header { grid-area: header; }
  aside { grid-area: sidebar; }
  main { grid-area: main; }
  footer { grid-area: footer; }
  .sida > * { background: #f6f2ff; padding: 12px; }
  /* 3. En kolumn på mobil */
  @media (max-width: 600px) {
    .sida {
      grid-template-columns: 1fr;
      grid-template-areas: "header" "sidebar" "main" "footer";
    }
  }
</style>
<!-- 4. Sidans delar -->
<div class="sida">
  <header>Sidhuvud</header>
  <aside>Meny</aside>
  <main>Innehåll</main>
  <footer>Sidfot</footer>
</div>`,exercises:[{type:`choice`,prompt:'Vad betyder raden `"header header"` i `grid-template-areas`?',options:[`Området header sträcker sig över båda kolumnerna`,`Det finns två olika sidhuvuden`,`Det är ett fel, ett namn får bara stå en gång`],answer:0,explain:`Samma namn i flera celler bredvid varandra slår ihop cellerna till ett område.`,why:{1:`Ett namn pekar alltid på ett och samma område. Två ord blir två celler i samma område.`,2:`Att upprepa namn är själva poängen. Så skapar man områden som spänner över flera celler.`}},{type:`choice`,prompt:`Varför fungerar inte den här mallen?`,code:`<style>
  .sida {
    grid-template-areas:
      "sidebar main"
      "footer";
  }
</style>`,options:[`Alla rader måste ha lika många celler`,`Namnen måste vara samma som taggarnas namn`,`Mallen får bara ha en rad`],answer:0,explain:`Första raden har två celler och andra bara en. Då blir mallen ogiltig och ignoreras helt. Skriv "footer footer".`,why:{1:`Namnen är fria. Att de här råkar likna taggnamn gör det bara lättare att läsa.`,2:`En mall kan ha hur många rader som helst, en sträng per rad.`}},{type:`fill`,prompt:`Fyll i egenskapen för mallen och egenskapen som placerar sidhuvudet.`,code:`<style>
  .sida { grid-template-___: "header" "main"; }
  header { ___: header; }
</style>`,answers:[[`areas`],[`grid-area`]],explain:`grid-template-areas ritar mallen och grid-area placerar elementet i ett område.`},{type:`web`,prompt:"Ge `.sida` en `grid-template-areas` med tre rader: `header` över båda kolumnerna, sedan `sidebar` och `main`, och sist `footer` över båda kolumnerna. Placera sedan `header`, `aside`, `main` och `footer` med `grid-area` (använd taggarna som väljare).",starter:`<style>
  .sida { display: grid; grid-template-columns: 200px 1fr; gap: 16px; }
  .sida > * { background: #f6f2ff; padding: 12px; }
</style>
<div class="sida">
  <header><h1>Bibliotekets blogg</h1></header>
  <aside>Kategorier</aside>
  <main>Veckans boktips</main>
  <footer>Kontakta oss</footer>
</div>
`,checks:[{css:`.sida`,prop:`grid-template-areas`,re:`header\\s+header[\\s\\S]*sidebar\\s+main[\\s\\S]*footer\\s+footer`,msg:`.sida har en mall med header, sidebar main och footer`},{css:`header`,prop:`grid-area`,re:`^header$`,msg:`header har grid-area: header`},{css:`aside`,prop:`grid-area`,re:`^sidebar$`,msg:`aside har grid-area: sidebar`},{css:`main`,prop:`grid-area`,re:`^main$`,msg:`main har grid-area: main`},{css:`footer`,prop:`grid-area`,re:`^footer$`,msg:`footer har grid-area: footer`}],solution:`<style>
  .sida {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    gap: 16px;
  }
  header { grid-area: header; }
  aside { grid-area: sidebar; }
  main { grid-area: main; }
  footer { grid-area: footer; }
  .sida > * { background: #f6f2ff; padding: 12px; }
</style>
<div class="sida">
  <header><h1>Bibliotekets blogg</h1></header>
  <aside>Kategorier</aside>
  <main>Veckans boktips</main>
  <footer>Kontakta oss</footer>
</div>`,explain:`Mallen visar layouten nästan som en bild. Den som läser CSS:en ser direkt hur sidan är uppbyggd.`,hint:`Tre strängar efter varandra: "header header" "sidebar main" "footer footer".`},{type:`web`,prompt:'Gör layouten mobilvänlig. Lägg till `@media (max-width: 600px)` där `.sida` får `grid-template-columns: 1fr` och en mall med en kolumn: `"header" "sidebar" "main" "footer"`.',starter:`<style>
  .sida {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    gap: 16px;
  }
  header { grid-area: header; }
  aside { grid-area: sidebar; }
  main { grid-area: main; }
  footer { grid-area: footer; }
  .sida > * { background: #f6f2ff; padding: 12px; }
</style>
<div class="sida">
  <header><h1>Bibliotekets blogg</h1></header>
  <aside>Kategorier</aside>
  <main>Veckans boktips</main>
  <footer>Kontakta oss</footer>
</div>
`,checks:[{media:!0,re:`max-width`,msg:`Det finns en mediefråga med max-width`},{css:`.sida`,prop:`grid-template-columns`,re:`^1fr$`,inMedia:!0,msg:`I mediefrågan har .sida grid-template-columns: 1fr`},{css:`.sida`,prop:`grid-template-areas`,re:`[\\x22\\x27]header[\\x22\\x27]\\s*[\\x22\\x27]sidebar[\\x22\\x27]\\s*[\\x22\\x27]main[\\x22\\x27]\\s*[\\x22\\x27]footer[\\x22\\x27]`,inMedia:!0,msg:`I mediefrågan har mallen en kolumn i ordningen header, sidebar, main, footer`},{css:`.sida`,prop:`grid-template-areas`,re:`header\\s+header`,msg:`Den breda mallen finns kvar utanför mediefrågan`}],solution:`<style>
  .sida {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    gap: 16px;
  }
  header { grid-area: header; }
  aside { grid-area: sidebar; }
  main { grid-area: main; }
  footer { grid-area: footer; }
  .sida > * { background: #f6f2ff; padding: 12px; }
  @media (max-width: 600px) {
    .sida {
      grid-template-columns: 1fr;
      grid-template-areas: "header" "sidebar" "main" "footer";
    }
  }
</style>
<div class="sida">
  <header><h1>Bibliotekets blogg</h1></header>
  <aside>Kategorier</aside>
  <main>Veckans boktips</main>
  <footer>Kontakta oss</footer>
</div>`,explain:`Elementen behåller sina grid-area, bara mallen byts. Därför räcker det med två rader CSS för en helt ny layout.`,hint:`Skriv om .sida inuti @media (max-width: 600px) { ... }.`},{type:`choice`,prompt:`Layouten ska byta till en kolumn på mobil. Vad behöver du ändra i HTML:en?`,options:[`Ingenting, det räcker att ändra mallen och kolumnerna i CSS`,`Flytta elementen så att de står i rätt ordning för mobil`,`Ge varje element en ny klass för mobil`],answer:0,explain:`Placeringen styrs helt av grid-template-areas, så HTML:en kan stå kvar i sin logiska ordning.`,why:{1:`Ordningen i mallen bestämmer var elementen hamnar, inte ordningen i HTML. Håll ändå HTML:en i en logisk läsordning, för det är den skärmläsare följer.`,2:`Elementen har redan sina grid-area. Det är mallen som byts i mediefrågan.`}}]},{id:`web-position`,title:`Positionering`,tier:4,text:"Normalt ligger element i **flödet**, efter varandra. Med `position` kan du flytta ut dem. `relative` låter elementet ligga kvar men gör det till en referenspunkt. `absolute` lyfter ut elementet ur flödet och placerar det med `top`, `right`, `bottom` och `left` i förhållande till närmaste förälder som har en position.\n\n`fixed` placeras mot själva fönstret och följer med när man skrollar. `sticky` ligger i flödet tills man skrollar förbi det, och fastnar sedan vid till exempel `top: 0`.\n\nNär positionerade element överlappar avgör `z-index` vilket som ligger överst: högre tal hamnar framför. Typiska exempel är en etikett i hörnet av ett kort och ett sidhuvud som stannar kvar högst upp.",example:`<style>
  /* 1. Fäst sidhuvudet */
  .topp { position: sticky; top: 0; z-index: 10; background: #6b4fbb; color: white; padding: 8px 12px; }
  /* 2. Kortet blir referens */
  .kort { position: relative; max-width: 220px; padding: 12px; background: #f6f2ff; border-radius: 12px; margin-top: 12px; }
  /* 3. Etiketten i hörnet */
  .etikett { position: absolute; top: 8px; right: 8px; background: #f2c94c; padding: 2px 8px; border-radius: 999px; font-size: 14px; }
</style>
<!-- 4. Sidhuvud och kort -->
<header class="topp">Kafé Kod</header>
<article class="kort">
  <img src="https://picsum.photos/id/431/200/120" alt="En kopp kaffe på ett träbord">
  <span class="etikett">Nyhet</span>
  <h3>Havrelatte</h3>
</article>`,exercises:[{type:`choice`,prompt:`Etiketten ska ligga i kortets hörn men hamnar i sidans övre högra hörn. Varför?`,code:`<style>
  .kort { padding: 12px; }
  .etikett { position: absolute; top: 8px; right: 8px; }
</style>`,options:[`Kortet saknar position: relative, så etiketten placeras mot sidan`,`top och right fungerar bara med position: fixed`,`Etiketten saknar z-index`],answer:0,explain:`absolute placeras mot närmaste förälder som har en position. Utan position: relative på kortet blir det hela sidan.`,why:{1:`top och right fungerar med relative, absolute, fixed och sticky. Det är bara static som ignorerar dem.`,2:`z-index styr vad som ligger överst, inte var elementet hamnar.`}},{type:`choice`,prompt:`Vilken position ligger kvar i flödet tills man skrollar förbi, och fastnar sedan?`,options:[`position: sticky`,`position: fixed`,`position: absolute`],answer:0,explain:`sticky beter sig som ett vanligt element tills tröskeln, till exempel top: 0, nås.`,why:{1:`fixed är lyft ur flödet från början och sitter alltid på samma plats i fönstret.`,2:`absolute är också lyft ur flödet och följer med sin förälder när man skrollar.`}},{type:`fill`,prompt:`Få menyn att fastna högst upp och ligga framför annat innehåll.`,code:`<style>
  .meny {
    position: ___;
    top: 0;
    ___: 10;
  }
</style>`,answers:[[`sticky`],[`z-index`]],explain:`sticky med top: 0 fäster menyn, och z-index lägger den över innehållet som skrollar under.`},{type:`web`,prompt:"Placera etiketten `Rea` i kortets övre högra hörn. Ge `.kort` `position: relative` och `.etikett` `position: absolute` med `top` och `right`.",starter:`<style>
  .kort { max-width: 240px; padding: 12px; background: #f6f2ff; border-radius: 12px; }
  .kort img { max-width: 100%; }
  .etikett { background: #f2c94c; padding: 2px 8px; border-radius: 999px; }
</style>
<article class="kort">
  <img src="https://picsum.photos/id/1080/240/160" alt="Jordgubbar i en skål">
  <span class="etikett">Rea</span>
  <h3>Jordgubbstårta</h3>
  <p>59 kr</p>
</article>
`,checks:[{css:`.kort`,prop:`position`,re:`^relative$`,msg:`.kort har position: relative`},{css:`.etikett`,prop:`position`,re:`^absolute$`,msg:`.etikett har position: absolute`},{css:`.etikett`,prop:`top`,msg:`.etikett har ett top-värde`},{css:`.etikett`,prop:`right`,msg:`.etikett har ett right-värde`}],solution:`<style>
  .kort { position: relative; max-width: 240px; padding: 12px; background: #f6f2ff; border-radius: 12px; }
  .kort img { max-width: 100%; }
  .etikett { position: absolute; top: 20px; right: 20px; background: #f2c94c; padding: 2px 8px; border-radius: 999px; }
</style>
<article class="kort">
  <img src="https://picsum.photos/id/1080/240/160" alt="Jordgubbar i en skål">
  <span class="etikett">Rea</span>
  <h3>Jordgubbstårta</h3>
  <p>59 kr</p>
</article>`,explain:`Kortet är referenspunkten, så etiketten följer med kortet vart det än hamnar på sidan.`,hint:`position: relative på .kort, och position: absolute; top: ...; right: ...; på .etikett.`},{type:`web`,prompt:"Gör sidhuvudet `.topp` klistrigt: `position: sticky`, `top: 0`, ett `z-index` och en bakgrundsfärg så att texten under inte syns igenom. Skrolla i förhandsvisningen och se det fastna.",starter:`<style>
  .topp { padding: 12px; }
</style>
<header class="topp"><strong>Receptboken</strong></header>
<main>
  <h1>Pannkakor</h1>
  <p>Vispa ihop mjöl och salt med hälften av mjölken till en slät smet.</p>
  <p>Vispa i resten av mjölken och äggen. Låt smeten vila en stund.</p>
  <p>Smält smör i stekpannan och häll i ett tunt lager smet.</p>
  <p>Vänd pannkakan när undersidan har fått färg.</p>
  <p>Servera med sylt och grädde.</p>
  <p>Pannkakor går bra att frysa och värma igen.</p>
</main>
`,checks:[{css:`.topp`,prop:`position`,re:`^sticky$`,msg:`.topp har position: sticky`},{css:`.topp`,prop:`top`,re:`^0(px)?$`,msg:`.topp har top: 0`},{css:`.topp`,prop:`z-index`,re:`^\\d+$`,msg:`.topp har ett z-index`},{css:`.topp`,prop:`background(-color)?`,msg:`.topp har en bakgrund`}],solution:`<style>
  .topp { padding: 12px; position: sticky; top: 0; z-index: 10; background: #fffdf7; }
</style>
<header class="topp"><strong>Receptboken</strong></header>
<main>
  <h1>Pannkakor</h1>
  <p>Vispa ihop mjöl och salt med hälften av mjölken till en slät smet.</p>
  <p>Vispa i resten av mjölken och äggen. Låt smeten vila en stund.</p>
  <p>Smält smör i stekpannan och häll i ett tunt lager smet.</p>
  <p>Vänd pannkakan när undersidan har fått färg.</p>
  <p>Servera med sylt och grädde.</p>
  <p>Pannkakor går bra att frysa och värma igen.</p>
</main>`,explain:`Utan bakgrund blir sidhuvudet genomskinligt och texten krockar. Utan z-index kan andra positionerade element hamna framför.`,hint:`Fyra deklarationer i .topp: position, top, z-index och background.`},{type:`web`,prompt:"Gör länken `.upp` till en knapp som alltid syns i fönstrets nedre högra hörn: `position: fixed` med `bottom` och `right`.",starter:`<style>
  .upp { background: #6b4fbb; color: white; padding: 8px 12px; border-radius: 999px; text-decoration: none; }
</style>
<h1 id="topp">Veckans recept</h1>
<p>Måndag: linssoppa.</p>
<p>Tisdag: pasta med tomatsås.</p>
<p>Onsdag: fiskgratäng.</p>
<p>Torsdag: ärtsoppa och pannkakor.</p>
<p>Fredag: tacos.</p>
<a class="upp" href="#topp">Till toppen</a>
`,checks:[{css:`.upp`,prop:`position`,re:`^fixed$`,msg:`.upp har position: fixed`},{css:`.upp`,prop:`bottom`,msg:`.upp har ett bottom-värde`},{css:`.upp`,prop:`right`,msg:`.upp har ett right-värde`}],solution:`<style>
  .upp { position: fixed; bottom: 16px; right: 16px; background: #6b4fbb; color: white; padding: 8px 12px; border-radius: 999px; text-decoration: none; }
</style>
<h1 id="topp">Veckans recept</h1>
<p>Måndag: linssoppa.</p>
<p>Tisdag: pasta med tomatsås.</p>
<p>Onsdag: fiskgratäng.</p>
<p>Torsdag: ärtsoppa och pannkakor.</p>
<p>Fredag: tacos.</p>
<a class="upp" href="#topp">Till toppen</a>`,explain:`fixed placeras mot fönstret, så knappen ligger kvar i hörnet vart man än skrollar. Använd det sparsamt, eftersom det täcker innehåll på små skärmar.`,hint:`position: fixed; bottom: 16px; right: 16px;`}]},{id:`web-units`,title:`Enheter och flytande storlekar`,tier:4,text:"`px` är en fast storlek. `rem` utgår från sidans grundstorlek på text, oftast 16px, och följer med om användaren har valt större text i webbläsaren. `em` utgår från elementets egen textstorlek, vilket passar för padding på en knapp som ska växa med texten. `%` är en andel av föräldern, och `vw` och `vh` är en hundradel av fönstrets bredd och höjd.\n\nLång text är svår att läsa om raderna blir för breda. `max-width` tillsammans med `margin: 0 auto;` ger en lagom bred kolumn som centreras.\n\nMed `clamp(min, önskat, max)` får du storlekar som flyter med skärmen men håller sig inom gränser, till exempel `font-size: clamp(1.5rem, 5vw, 3rem);`. `min()` och `max()` väljer det minsta eller största av flera värden: `width: min(100%, 400px);` blir aldrig bredare än föräldern.",example:`<style>
  /* 1. Bredd i rem */
  main { max-width: 600px; margin: 0 auto; padding: 0 1rem; }
  /* 2. Text som skalar */
  h1 { font-size: clamp(1.75rem, 5vw, 3rem); }
  p { font-size: 1.125rem; }
  .knapp { font-size: 1rem; padding: 0.5em 1em; }
  /* 3. Bild med övre gräns */
  img { width: min(100%, 400px); }
</style>
<!-- 4. Innehållet -->
<main>
  <h1>Flytande rubrik</h1>
  <p>Ändra fönstrets bredd och se hur rubriken växer, men bara lagom mycket.</p>
  <img src="https://picsum.photos/id/1015/800/400" alt="En flod som slingrar sig genom en dal">
  <p><button class="knapp">Läs mer</button></p>
</main>`,exercises:[{type:`choice`,prompt:`Sidans grundstorlek är 16px. Hur stor blir texten?`,code:`<style>
  h2 { font-size: 1.5rem; }
</style>`,options:[`24px`,`1.5px`,`150px`],answer:0,explain:`1.5 gånger 16px blir 24px.`,why:{1:`rem är en multiplikator av grundstorleken, inte en egen pixelstorlek.`,2:`Det skulle vara 1.5 gånger 100. rem räknas mot grundstorleken, som oftast är 16px.`}},{type:`choice`,prompt:"Varför använder många `rem` i stället för `px` för textstorlek?",options:[`rem följer med när användaren ställer in större text i webbläsaren`,`rem gör sidan snabbare att ladda`,`px fungerar inte på mobiler`],answer:0,explain:`Den som ser dåligt kan ha valt större grundtext. Med rem respekteras det valet, med px låses storleken.`,why:{1:`Enheten påverkar inte laddningstiden alls.`,2:`px fungerar överallt. Problemet är att fasta storlekar inte följer användarens inställningar.`}},{type:`choice`,prompt:"Vad gör `font-size: clamp(1.5rem, 4vw, 3rem);`?",options:[`Storleken följer 4vw men blir aldrig mindre än 1.5rem eller större än 3rem`,`Webbläsaren väljer slumpvis ett av värdena`,`Den använder alltid det största värdet`],answer:0,explain:`Mittvärdet är det önskade, och de andra två är golv och tak.`,why:{1:`CSS gör aldrig slumpvisa val. clamp räknas ut på samma sätt varje gång.`,2:`Det är max() som väljer det största värdet. clamp håller värdet mellan två gränser.`}},{type:`fill`,prompt:`Centrera kolumnen och låt den bli högst 700px bred.`,code:`<style>
  .innehall {
    ___: 700px;
    margin: 0 ___;
  }
</style>`,answers:[[`max-width`],[`auto`]],explain:`max-width begränsar bredden, och auto delar den lediga platsen lika på båda sidor.`},{type:`web`,prompt:"Gör artikeln lätt att läsa. Ge `main` en `max-width` (till exempel `65ch` eller `680px`), centrera den med `margin: 0 auto` och ge den luft på sidorna med en `padding` i `rem`.",starter:`<style>
  main { background: #fffdf7; }
</style>
<main>
  <h1>Om kaffe</h1>
  <p>Kaffebönor är egentligen kärnor från ett bär. De rostas för att få fram smak och doft, och ju längre rostningen pågår desto mörkare och beskare blir kaffet. En ljus rostning ger ofta mer syra och fruktiga toner.</p>
</main>
`,checks:[{css:`main`,prop:`max-width`,msg:`main har en max-width`},{css:`main`,prop:`margin(-inline)?`,re:`auto`,msg:`main centreras med margin auto`},{css:`main`,prop:`padding(-inline)?`,re:`rem`,msg:`main har padding i rem`}],solution:`<style>
  main { background: #fffdf7; max-width: 65ch; margin: 0 auto; padding: 0 1rem; }
</style>
<main>
  <h1>Om kaffe</h1>
  <p>Kaffebönor är egentligen kärnor från ett bär. De rostas för att få fram smak och doft, och ju längre rostningen pågår desto mörkare och beskare blir kaffet. En ljus rostning ger ofta mer syra och fruktiga toner.</p>
</main>`,explain:`Enheten ch är bredden av en nolla, så 65ch ger ungefär 65 tecken per rad. Det är en bekväm radlängd att läsa.`,hint:`max-width: 65ch; margin: 0 auto; padding: 0 1rem;`},{type:`web`,prompt:"Gör sidan flytande. Ge `h1` en `font-size` med `clamp(...)` och tre värden, ge `p` en `font-size` i `rem`, och byt `.omslag`s fasta bredd mot `width: min(100%, 500px)`.",starter:`<style>
  h1 { font-size: 48px; }
  p { font-size: 18px; }
  .omslag { width: 500px; }
</style>
<h1>Höstens bästa böcker</h1>
<img class="omslag" src="https://picsum.photos/id/24/800/500" alt="En uppslagen bok på ett bord">
<p>Vi har läst, diskuterat och valt ut fem böcker att krypa upp i soffan med.</p>
`,checks:[{css:`h1`,prop:`font-size`,re:`^clamp\\([^,]+,[^,]+,[^,]+\\)$`,msg:`h1 har font-size med clamp() och tre värden`},{css:`p`,prop:`font-size`,re:`rem$`,msg:`p har font-size i rem`},{css:`.omslag`,prop:`width`,re:`^min\\(`,msg:`.omslag har width med min()`}],solution:`<style>
  h1 { font-size: clamp(1.75rem, 6vw, 3rem); }
  p { font-size: 1.125rem; }
  .omslag { width: min(100%, 500px); }
</style>
<h1>Höstens bästa böcker</h1>
<img class="omslag" src="https://picsum.photos/id/24/800/500" alt="En uppslagen bok på ett bord">
<p>Vi har läst, diskuterat och valt ut fem böcker att krypa upp i soffan med.</p>`,explain:`Nu krymper rubriken lagom på mobil, texten följer användarens inställningar och bilden spräcker aldrig sidan.`,hint:`clamp(1.75rem, 6vw, 3rem), 1.125rem och min(100%, 500px).`}]}]},{id:`web8`,title:`Formulär och tillgänglighet`,lessons:[{id:`web-inputs`,title:`Inmatningsfält och validering`,tier:3,text:'Rätt `type` på ett `input` ger rätt tangentbord på mobilen och inbyggd kontroll i webbläsaren: `email`, `number`, `date`, `tel` och `url`. Med `required` måste fältet fyllas i, `min` och `max` begränsar tal och datum, `minlength` begränsar textens längd och `pattern` kräver att texten följer ett mönster.\n\n`placeholder` är ett exempel som försvinner när man börjar skriva. Det ersätter aldrig en etikett. `autocomplete`, till exempel `autocomplete="email"`, låter webbläsaren fylla i uppgifter som användaren redan har sparat.\n\nWebbläsarens kontroller är en hjälp för användaren, inte ett skydd. Den som tar emot formuläret på servern måste alltid kontrollera uppgifterna igen.',example:`<form>
  <!-- 1. E-post -->
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" autocomplete="email" required>
  <!-- 2. Antal med gränser -->
  <label for="antal">Antal biljetter</label>
  <input id="antal" name="antal" type="number" min="1" max="6" value="1">
  <!-- 3. Postnummer med mönster -->
  <label for="postnr">Postnummer</label>
  <input id="postnr" name="postnr" inputmode="numeric" pattern="[0-9]{5}" placeholder="12345" autocomplete="postal-code">
  <!-- 4. Skicka-knapp -->
  <button type="submit">Boka</button>
</form>`,exercises:[{type:`choice`,prompt:"Vilken `type` passar bäst för ett telefonnummer?",options:[`tel`,`number`,`text`],answer:0,explain:`tel ger sifferknappar på mobilen men tillåter också plustecken och mellanslag.`,why:{1:`number är för tal man räknar med, som ett antal. Ett telefonnummer kan börja med + och innehålla mellanslag, och det räknar man aldrig med.`,2:`text fungerar, men ger ett vanligt tangentbord på mobilen och säger inget om vad fältet innehåller.`}},{type:`choice`,prompt:`Vad är problemet med fältet?`,code:`<input name="namn" placeholder="Namn">`,options:[`Texten försvinner när man börjar skriva, och fältet saknar en riktig etikett`,`placeholder syns inte på mobiler`,`Inget, placeholder fungerar som etikett`],answer:0,explain:`Lägg till en label. Placeholder kan finnas kvar som exempel, till exempel "Kim Andersson".`,why:{1:`placeholder syns på mobiler också. Problemet är att den försvinner och har för svag kontrast.`,2:`Skärmläsare läser inte alltid upp placeholder, och den som har skrivit något ser inte längre vad fältet gällde.`}},{type:`fill`,prompt:`Begränsa antalet till mellan 1 och 10.`,code:`<input type="number" id="antal" name="antal" ___="1" ___="10">`,answers:[[`min`],[`max`]],explain:`min och max gäller för tal och datum. Webbläsaren säger ifrån om värdet hamnar utanför.`},{type:`web`,prompt:'Ge fälten rätt typer. E-post ska vara `type="email"` och `required`. Antal biljetter ska vara `type="number"` med `min="1"` och `max="6"`. Datum ska vara `type="date"`.',starter:`<form>
  <label for="epost">E-post</label>
  <input id="epost" name="epost">
  <label for="antal">Antal biljetter</label>
  <input id="antal" name="antal">
  <label for="datum">Datum</label>
  <input id="datum" name="datum">
  <button type="submit">Boka</button>
</form>
`,checks:[{q:`#epost`,attr:`type`,re:`^email$`,msg:`E-postfältet har type="email"`},{q:`#epost[required]`,min:1,msg:`E-postfältet är required`},{q:`#antal`,attr:`type`,re:`^number$`,msg:`Antalsfältet har type="number"`},{q:`#antal`,attr:`min`,re:`^1$`,msg:`Antalsfältet har min="1"`},{q:`#antal`,attr:`max`,re:`^6$`,msg:`Antalsfältet har max="6"`},{q:`#datum`,attr:`type`,re:`^date$`,msg:`Datumfältet har type="date"`},{labels:!0,msg:`Alla fält har kvar sina etiketter`}],solution:`<form>
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" required>
  <label for="antal">Antal biljetter</label>
  <input id="antal" name="antal" type="number" min="1" max="6">
  <label for="datum">Datum</label>
  <input id="datum" name="datum" type="date">
  <button type="submit">Boka</button>
</form>`,explain:`Nu får användaren en datumväljare, sifferknappar och ett tydligt felmeddelande om e-posten saknas, helt utan egen kod.`,hint:`Lägg till type, required, min och max som attribut i starttaggarna.`},{type:`web`,prompt:'Fälten har bara placeholder. Ge båda en kopplad `label`. Gör telefonfältet till `type="tel"` med `autocomplete="tel"`. Ge postnumret `autocomplete="postal-code"` och ett `pattern` som kräver exakt fem siffror, till exempel `[0-9]{5}`.',starter:`<form>
  <input id="telefon" name="telefon" placeholder="Telefon">
  <input id="postnummer" name="postnummer" placeholder="Postnummer">
  <button type="submit">Spara</button>
</form>
`,checks:[{labels:!0,msg:`Båda fälten har en kopplad label`},{q:`#telefon`,attr:`type`,re:`^tel$`,msg:`Telefonfältet har type="tel"`},{q:`#telefon`,attr:`autocomplete`,re:`^tel$`,msg:`Telefonfältet har autocomplete="tel"`},{q:`#postnummer`,attr:`pattern`,re:`(\\\\d|\\[0-9\\])\\{5\\}`,msg:`Postnumret har ett pattern för fem siffror`},{q:`#postnummer`,attr:`autocomplete`,re:`^postal-code$`,msg:`Postnumret har autocomplete="postal-code"`}],solution:`<form>
  <label for="telefon">Telefon</label>
  <input id="telefon" name="telefon" type="tel" autocomplete="tel" placeholder="070 123 45 67">
  <label for="postnummer">Postnummer</label>
  <input id="postnummer" name="postnummer" pattern="[0-9]{5}" autocomplete="postal-code" placeholder="12345">
  <button type="submit">Spara</button>
</form>`,explain:`Etiketterna står kvar när man skriver, och autocomplete låter webbläsaren fylla i båda fälten med ett klick.`,hint:`Två <label for="..."> och attributen type, autocomplete och pattern.`}]},{id:`web-choices`,title:`Val i formulär`,tier:3,text:'**Radioknappar** används när man ska välja ett av flera alternativ. Alla knappar i samma grupp måste ha samma `name`, men olika `value`. **Kryssrutor** (`type="checkbox"`) är fristående ja eller nej, så man kan kryssa i flera.\n\nGruppera hörande fält med `<fieldset>` och ge gruppen en rubrik med `<legend>`. Skärmläsare läser upp legend tillsammans med varje alternativ, så frågan hänger med.\n\nFör långa listor passar `<select>` med `<option>`, och för längre text `<textarea>`. Alla fält behöver fortfarande en etikett.',example:`<form>
  <!-- 1. Radioknappar för storlek -->
  <fieldset>
    <legend>Storlek</legend>
    <input type="radio" id="liten" name="storlek" value="liten">
    <label for="liten">Liten</label>
    <input type="radio" id="stor" name="storlek" value="stor">
    <label for="stor">Stor</label>
  </fieldset>
  <!-- 2. Kryssruta för tillbehör -->
  <fieldset>
    <legend>Tillbehör</legend>
    <input type="checkbox" id="mjolk" name="tillbehor" value="mjolk">
    <label for="mjolk">Havremjölk</label>
  </fieldset>
  <!-- 3. Lista att välja i -->
  <label for="leverans">Leverans</label>
  <select id="leverans" name="leverans">
    <option value="hamta">Hämta själv</option>
    <option value="bud">Bud</option>
  </select>
  <!-- 4. Fritt meddelande -->
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande" rows="3"></textarea>
</form>`,exercises:[{type:`choice`,prompt:`Det går att välja alla tre radioknapparna samtidigt. Varför?`,code:`<input type="radio" id="s" name="liten" value="s">
<input type="radio" id="m" name="mellan" value="m">
<input type="radio" id="l" name="stor" value="l">`,options:[`De har olika name, så webbläsaren ser dem som tre separata grupper`,`De saknar value`,`Radioknappar måste ligga i en select`],answer:0,explain:`Ge alla samma name, till exempel name="storlek". Då kan bara en vara vald åt gången.`,why:{1:`Alla tre har value. Det är name som avgör vilken grupp en knapp hör till.`,2:`select och radioknappar är två olika sätt att göra ett val. De används inte tillsammans.`}},{type:`choice`,prompt:`Frågan är ”Vilka tillbehör vill du ha?” och man får välja flera. Vad passar?`,options:[`Kryssrutor`,`Radioknappar`,`En vanlig select`],answer:0,explain:`Kryssrutor är oberoende av varandra, så man kan välja noll, ett eller flera.`,why:{1:`Radioknappar i en grupp tillåter bara ett val.`,2:`En vanlig select ger bara ett val, och flervalsläget är krångligt att använda.`}},{type:`fill`,prompt:`Gruppera radioknapparna och ge dem samma grupp.`,code:`<___>
  <legend>Storlek</legend>
  <input type="radio" id="liten" ___="storlek" value="liten">
  <label for="liten">Liten</label>
</fieldset>`,answers:[[`fieldset`],[`name`]],explain:`fieldset grupperar och name kopplar ihop knapparna till en grupp.`},{type:`web`,prompt:'Bygg ett storleksval. Lägg en `fieldset` med `legend` ”Välj storlek” i formuläret, med tre radioknappar som alla har `name="storlek"`, var sitt `value` och var sin kopplad `label`.',starter:`<form>

</form>
`,checks:[{q:`fieldset`,min:1,msg:`Det finns en fieldset`},{q:`fieldset legend`,text:`\\S`,msg:`Fieldset har en legend med text`},{q:`fieldset input[type="radio"]`,min:3,msg:`Det finns minst tre radioknappar i fieldset`},{q:`input[type="radio"]`,attr:`name`,re:`^storlek$`,msg:`Alla radioknappar har name="storlek"`},{q:`input[type="radio"]`,attr:`value`,re:`\\S`,msg:`Alla radioknappar har ett value`},{labels:!0,msg:`Alla radioknappar har en kopplad label`}],solution:`<form>
  <fieldset>
    <legend>Välj storlek</legend>
    <input type="radio" id="liten" name="storlek" value="liten">
    <label for="liten">Liten</label>
    <input type="radio" id="mellan" name="storlek" value="mellan">
    <label for="mellan">Mellan</label>
    <input type="radio" id="stor" name="storlek" value="stor">
    <label for="stor">Stor</label>
  </fieldset>
</form>`,explain:`En skärmläsare säger nu till exempel ”Välj storlek, Mellan, radioknapp 2 av 3”.`,hint:`Varje alternativ: <input type="radio" id="x" name="storlek" value="x"> och <label for="x">.`},{type:`web`,prompt:"Gör färdigt beställningen. Lägg till en `fieldset` med `legend` och minst två kryssrutor för tillbehör, fyll `select#leverans` med minst tre `option`, och lägg till en `textarea` för meddelande. Alla fält ska ha kopplade etiketter.",starter:`<form>
  <label for="leverans">Leverans</label>
  <select id="leverans" name="leverans">
  </select>
  <button type="submit">Beställ</button>
</form>
`,checks:[{q:`fieldset input[type="checkbox"]`,min:2,msg:`Det finns minst två kryssrutor i en fieldset`},{q:`fieldset:has(input[type="checkbox"]) legend`,min:1,msg:`Kryssrutornas fieldset har en legend`},{q:`select#leverans option`,min:3,msg:`Leveransvalet har minst tre alternativ`},{q:`textarea`,min:1,msg:`Det finns en textarea`},{labels:!0,msg:`Alla fält har kopplade etiketter`}],solution:`<form>
  <fieldset>
    <legend>Tillbehör</legend>
    <input type="checkbox" id="mjolk" name="tillbehor" value="mjolk">
    <label for="mjolk">Havremjölk</label>
    <input type="checkbox" id="sirap" name="tillbehor" value="sirap">
    <label for="sirap">Vaniljsirap</label>
  </fieldset>
  <label for="leverans">Leverans</label>
  <select id="leverans" name="leverans">
    <option value="hamta">Hämta själv</option>
    <option value="cykel">Cykelbud</option>
    <option value="post">Post</option>
  </select>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande" rows="3"></textarea>
  <button type="submit">Beställ</button>
</form>`,explain:`Varje typ av val har sitt eget fält, och alla har etiketter. Då fungerar formuläret med mus, tangentbord och skärmläsare.`,hint:`Bygg en del i taget: fieldset med kryssrutor, sedan option-taggarna, sist textarea.`}]},{id:`web-a11y`,title:`Tillgänglighet på riktigt`,tier:4,text:'**Landmärken** som `<header>`, `<nav>`, `<main>` och `<footer>` låter skärmläsaranvändare hoppa direkt till rätt del av sidan. Rubrikerna fungerar som en innehållsförteckning: en `h1`, och sedan nivåer i ordning utan att hoppa över någon. Välj nivå efter struktur, och storlek med CSS.\n\nEn **hopplänk** först på sidan, till exempel ”Hoppa till innehållet”, låter tangentbordsanvändare slippa tabba genom hela menyn. En knapp med bara en ikon behöver `aria-label` så att den får ett namn, och `aria-describedby` kopplar en hjälptext till ett fält så att den läses upp.\n\n`<html lang="sv">` gör att skärmläsaren uttalar texten på svenska. Och text måste ha tillräcklig **kontrast** mot bakgrunden, för vanlig text minst 4,5 gånger så ljus eller mörk.',example:`<style>
  /* 1. Göm hopplänken tills fokus */
  .hoppa { position: absolute; left: -999px; }
  .hoppa:focus { left: 8px; top: 8px; background: white; padding: 8px; }
</style>
<!-- 2. Hopplänk först -->
<a class="hoppa" href="#innehall">Hoppa till innehållet</a>
<!-- 3. Sidhuvud med meny -->
<header>
  <h1>Stadsbiblioteket</h1>
  <nav aria-label="Huvudmeny">
    <a href="#">Låna</a>
    <a href="#">Evenemang</a>
  </nav>
</header>
<!-- 4. Huvudinnehåll och sidfot -->
<main id="innehall">
  <h2>Veckans tips</h2>
  <button aria-label="Stäng">✕</button>
</main>
<footer>Öppet 10 till 19</footer>`,exercises:[{type:`choice`,prompt:"Sidan har en `h1`. Underrubriken ”Ingredienser” ser för stor ut som `h2`. Vad gör du?",options:[`Behåller h2 och gör den mindre med CSS`,`Byter till h4 så att den blir mindre`,`Byter till ett p med fet text`],answer:0,explain:`Rubriknivån beskriver strukturen. Utseendet styr du med font-size.`,why:{1:`Då hoppar du över h2 och h3, och den som navigerar med rubriker tror att något saknas.`,2:`Då är det ingen rubrik längre, och skärmläsaranvändare kan inte hoppa dit.`}},{type:`choice`,prompt:`Vilken kombination har bäst kontrast?`,options:[`Mörkgrå #333 på vit bakgrund`,`Ljusgrå #ccc på vit bakgrund`,`Gul #ffeb3b på vit bakgrund`],answer:0,explain:`#333 på vitt har en kontrast runt 12:1, långt över kravet 4,5:1 för vanlig text.`,why:{1:`Ljusgrått på vitt har en kontrast på bara cirka 1,6:1. Många kan inte läsa det alls.`,2:`Gult på vitt har ännu lägre kontrast. Gult fungerar bättre som bakgrund bakom mörk text.`}},{type:`fill`,prompt:`Tala om att sidan är på svenska.`,code:`<!doctype html>
<html ___="sv">`,answers:[[`lang`]],explain:`Med lang="sv" väljer skärmläsaren svensk röst och översättningsverktyg vet vilket språk det är.`},{type:`web`,prompt:"Byt ut div-taggarna mot landmärken: `header`, `nav`, `main` och `footer`. Sidan ska ha exakt en `h1`, så gör om den andra till en `h2`.",starter:`<div class="topp">
  <h1>Stadsbiblioteket</h1>
</div>
<div class="meny">
  <a href="#">Låna</a>
  <a href="#">Evenemang</a>
</div>
<div class="innehall">
  <h1>Veckans boktips</h1>
  <p>Tre böcker vi gillar just nu.</p>
</div>
<div class="botten">
  <p>Öppet 10 till 19</p>
</div>
`,checks:[{q:`header`,min:1,msg:`Sidan har en header`},{q:`nav a`,min:2,msg:`Länkarna ligger i en nav`},{q:`main`,min:1,max:1,msg:`Sidan har exakt en main`},{q:`footer`,min:1,msg:`Sidan har en footer`},{q:`h1`,min:1,max:1,msg:`Sidan har exakt en h1`},{q:`main h2`,min:1,msg:`Rubriken i main är en h2`}],solution:`<header>
  <h1>Stadsbiblioteket</h1>
</header>
<nav>
  <a href="#">Låna</a>
  <a href="#">Evenemang</a>
</nav>
<main>
  <h2>Veckans boktips</h2>
  <p>Tre böcker vi gillar just nu.</p>
</main>
<footer>
  <p>Öppet 10 till 19</p>
</footer>`,explain:`Sidan ser likadan ut, men nu finns det fyra landmärken att hoppa mellan och en tydlig rubrikordning.`,hint:`Byt taggnamnen i både start- och sluttaggen, och byt den andra h1 till h2.`},{type:`web`,prompt:'Lägg till en hopplänk. Först på sidan ska en länk med klassen `hoppa` och `href="#innehall"` ligga, och `main` ska få `id="innehall"`. Göm länken med `.hoppa { position: absolute; left: -999px; }` och visa den igen i en `.hoppa:focus`-regel.',starter:`<style>

</style>
<header>
  <h1>Stadsbiblioteket</h1>
  <nav>
    <a href="#">Låna</a>
    <a href="#">Evenemang</a>
    <a href="#">Kontakt</a>
  </nav>
</header>
<main>
  <h2>Veckans boktips</h2>
</main>
`,checks:[{q:`a.hoppa`,attr:`href`,re:`^#innehall$`,msg:`Länken .hoppa går till #innehall`},{q:`main#innehall`,min:1,msg:`main har id="innehall"`},{source:`<a[^>]*hoppa[\\s\\S]*<header`,msg:`Hopplänken kommer före header`},{css:`.hoppa`,prop:`position`,re:`^absolute$`,msg:`.hoppa har position: absolute`},{source:`\\.hoppa:focus(-visible)?\\s*\\{`,msg:`Det finns en .hoppa:focus-regel som visar länken`}],solution:`<style>
  .hoppa { position: absolute; left: -999px; }
  .hoppa:focus { left: 8px; top: 8px; background: white; padding: 8px; }
</style>
<a class="hoppa" href="#innehall">Hoppa till innehållet</a>
<header>
  <h1>Stadsbiblioteket</h1>
  <nav>
    <a href="#">Låna</a>
    <a href="#">Evenemang</a>
    <a href="#">Kontakt</a>
  </nav>
</header>
<main id="innehall">
  <h2>Veckans boktips</h2>
</main>`,explain:`Länken syns inte för den som använder mus, men första Tab-trycket visar den. Ett Enter tar användaren förbi hela menyn.`,hint:`Lägg <a class="hoppa" href="#innehall">Hoppa till innehållet</a> direkt efter style-blocket.`},{type:`web`,prompt:'Ge ikonknappen `.ikon` namnet ”Stäng” med `aria-label`. Ge hjälptexten `id="sok-hjalp"` och koppla den till sökfältet med `aria-describedby`.',starter:`<header>
  <h1>Sök recept</h1>
  <button class="ikon">✕</button>
</header>
<main>
  <label for="sok">Sökord</label>
  <input id="sok" name="sok" type="search">
  <p>Skriv en råvara, till exempel morot.</p>
</main>
`,checks:[{q:`button.ikon`,attr:`aria-label`,re:`stäng`,msg:`Ikonknappen har aria-label="Stäng"`},{q:`#sok-hjalp`,text:`\\S`,msg:`Hjälptexten har id="sok-hjalp"`},{q:`#sok`,attr:`aria-describedby`,re:`^sok-hjalp$`,msg:`Sökfältet har aria-describedby="sok-hjalp"`},{labels:!0,msg:`Sökfältet har kvar sin etikett`}],solution:`<header>
  <h1>Sök recept</h1>
  <button class="ikon" aria-label="Stäng">✕</button>
</header>
<main>
  <label for="sok">Sökord</label>
  <input id="sok" name="sok" type="search" aria-describedby="sok-hjalp">
  <p id="sok-hjalp">Skriv en råvara, till exempel morot.</p>
</main>`,explain:`Utan aria-label läses knappen upp som ”multiplikationstecken, knapp”. Nu heter den ”Stäng”, och sökfältet läses upp med sin hjälptext.`,hint:`Tre attribut: aria-label på knappen, id på stycket och aria-describedby på fältet.`}]},{id:`web-tables`,title:`Tabeller`,tier:3,text:'Tabeller är till för **data** med rader och kolumner, som ett schema, en prislista eller resultat. Använd dem aldrig för att placera ut delar av sidan. Skärmläsare läser upp tabeller cell för cell med rad- och kolumnrubriker, och layouttabeller går sönder på smala skärmar. Layout gör du med flexbox och grid.\n\nEn tabell byggs av `<table>`, en `<caption>` som är tabellens rubrik, `<thead>` med rubrikceller `<th>` och `<tbody>` med datarader. Varje rad är en `<tr>` och varje datacell en `<td>`. `scope="col"` på en `th` talar om att den är rubrik för sin kolumn, och `scope="row"` att den gäller sin rad.\n\nFör att styla tabellen slår du ihop kanterna med `border-collapse: collapse;`, ger cellerna padding och gör varannan rad randig med `tbody tr:nth-child(even)`.',example:`<style>
  /* 1. Tabellens stil */
  table { border-collapse: collapse; }
  th, td { padding: 6px 10px; border-bottom: 1px solid #ddd; text-align: left; }
  tbody tr:nth-child(even) { background: #f6f2ff; }
</style>
<!-- 2. Tabell med rubrik -->
<table>
  <caption>Simskolans schema</caption>
  <!-- 3. Kolumnrubriker -->
  <thead>
    <tr><th scope="col">Dag</th><th scope="col">Tid</th><th scope="col">Grupp</th></tr>
  </thead>
  <!-- 4. Rader med data -->
  <tbody>
    <tr><td>Måndag</td><td>17.00</td><td>Sälen</td></tr>
    <tr><td>Onsdag</td><td>17.30</td><td>Pingvinen</td></tr>
    <tr><td>Fredag</td><td>16.00</td><td>Hajen</td></tr>
  </tbody>
</table>`,exercises:[{type:`choice`,prompt:`När är en tabell rätt val?`,options:[`För ett schema med dagar och tider`,`För att lägga en meny bredvid innehållet`,`För att centrera en bild`],answer:0,explain:`Ett schema är data där varje cell hör ihop med både en rad och en kolumn.`,why:{1:`Det är layout. En skärmläsare skulle läsa upp menyn som en tabell med rader och kolumner. Använd grid eller flexbox.`,2:`Centrering är layout och görs med CSS, till exempel margin: 0 auto eller flexbox.`}},{type:`choice`,prompt:'Vad betyder `scope="col"` på en `th`?',options:[`Rubriken gäller cellerna under den, i samma kolumn`,`Rubriken blir fet`,`Kolumnen går att sortera`],answer:0,explain:`Då kan skärmläsaren säga ”Tid, 17.30” när användaren står i en cell.`,why:{1:`th visas ofta fet av webbläsaren, men det gäller med eller utan scope. scope handlar om betydelse.`,2:`Sortering kräver JavaScript. scope beskriver bara vilka celler rubriken hör till.`}},{type:`fill`,prompt:`Slå ihop kanterna och gör varannan rad randig.`,code:`<style>
  table { border-___: collapse; }
  tbody tr:nth-child(___) { background: #f6f2ff; }
</style>`,answers:[[`collapse`],[`even`,`2n`,`odd`,`2n+1`]],explain:`border-collapse: collapse ger enkla linjer, och :nth-child(even) väljer var andra rad.`},{type:`web`,prompt:'Bygg en tabell över lånade böcker. Den ska ha en `caption`, en `thead` med tre `th` med `scope="col"` (Titel, Författare, Återlämnas) och en `tbody` med minst tre rader med `td`.',starter:`<table>

</table>
`,checks:[{q:`table caption`,text:`\\S`,msg:`Tabellen har en caption med text`},{q:`thead th`,min:3,msg:`thead har minst tre th`},{q:`thead th`,attr:`scope`,re:`^col$`,msg:`Alla th i thead har scope="col"`},{q:`tbody tr`,min:3,msg:`tbody har minst tre rader`},{q:`tbody td`,min:9,msg:`Varje rad har tre celler (td)`}],solution:`<table>
  <caption>Mina lånade böcker</caption>
  <thead>
    <tr><th scope="col">Titel</th><th scope="col">Författare</th><th scope="col">Återlämnas</th></tr>
  </thead>
  <tbody>
    <tr><td>Bröderna Lejonhjärta</td><td>Astrid Lindgren</td><td>3 november</td></tr>
    <tr><td>Muminpappans memoarer</td><td>Tove Jansson</td><td>10 november</td></tr>
    <tr><td>Doktor Glas</td><td>Hjalmar Söderberg</td><td>17 november</td></tr>
  </tbody>
</table>`,explain:`caption berättar vad tabellen handlar om, och rubrikcellerna med scope gör varje cell begriplig även när den läses upp ensam.`,hint:`Börja med caption, sedan thead med en tr, sist tbody med tre tr.`},{type:`web`,prompt:"Styla tabellen. Ge `table` `border-collapse: collapse`, ge `td` (gärna även `th`) en `padding`, och gör varannan rad i `tbody` randig med `:nth-child` och en bakgrund.",starter:`<style>

</style>
<table>
  <caption>Mina lånade böcker</caption>
  <thead>
    <tr><th scope="col">Titel</th><th scope="col">Författare</th><th scope="col">Återlämnas</th></tr>
  </thead>
  <tbody>
    <tr><td>Bröderna Lejonhjärta</td><td>Astrid Lindgren</td><td>3 november</td></tr>
    <tr><td>Muminpappans memoarer</td><td>Tove Jansson</td><td>10 november</td></tr>
    <tr><td>Doktor Glas</td><td>Hjalmar Söderberg</td><td>17 november</td></tr>
    <tr><td>Kallocain</td><td>Karin Boye</td><td>24 november</td></tr>
  </tbody>
</table>
`,checks:[{css:`table`,prop:`border-collapse`,re:`^collapse$`,msg:`table har border-collapse: collapse`},{css:`td`,prop:`padding`,msg:`td har padding`},{source:`tr:nth-child\\(\\s*(even|odd|2n|2n\\s*\\+\\s*1)\\s*\\)[^{]*\\{[^}]*background`,msg:`Varannan rad har en bakgrund via :nth-child`}],solution:`<style>
  table { border-collapse: collapse; }
  th, td { padding: 6px 10px; border-bottom: 1px solid #ddd; text-align: left; }
  tbody tr:nth-child(even) { background: #f6f2ff; }
</style>
<table>
  <caption>Mina lånade böcker</caption>
  <thead>
    <tr><th scope="col">Titel</th><th scope="col">Författare</th><th scope="col">Återlämnas</th></tr>
  </thead>
  <tbody>
    <tr><td>Bröderna Lejonhjärta</td><td>Astrid Lindgren</td><td>3 november</td></tr>
    <tr><td>Muminpappans memoarer</td><td>Tove Jansson</td><td>10 november</td></tr>
    <tr><td>Doktor Glas</td><td>Hjalmar Söderberg</td><td>17 november</td></tr>
    <tr><td>Kallocain</td><td>Karin Boye</td><td>24 november</td></tr>
  </tbody>
</table>`,explain:`Ränderna gör det lättare att följa en rad med blicken, och luften i cellerna gör tabellen lugnare att läsa.`,hint:`Tre regler: table, th, td och tbody tr:nth-child(even).`}]}]},{id:`web9`,title:`Modern CSS`,lessons:[{id:`web-variables`,title:`CSS-variabler och teman`,tier:4,text:"En **CSS-variabel** (custom property) är ett namn som börjar med två bindestreck, till exempel `--accent: #6b4fbb;`. Du läser värdet med `var(--accent)`. Lägger du variablerna på `:root` gäller de på hela sidan.\n\nI riktiga projekt samlas färger, avstånd och rundningar som variabler, ofta kallade **design tokens**. Vill du byta accentfärg ändrar du på ett ställe i stället för på trettio.\n\nVariabler ärvs som vanliga egenskaper. Därför kan en klass som `.mörk` skriva över `--bg` och `--text`, och allt inuti följer med. Med `var(--radie, 8px)` får du ett reservvärde om variabeln saknas.",example:`<style>
  /* 1. Variabler för ljust tema */
  :root { --accent: #6b4fbb; --bg: #ffffff; --text: #1f1d2b; --radie: 10px; }
  /* 2. Byt värden för mörkt */
  .mörk { --bg: #1f1d2b; --text: #f4f1ff; --accent: #c7b6ff; }
  /* 3. Använd variablerna */
  .ruta { background: var(--bg); color: var(--text); padding: 16px; border-radius: var(--radie); border: 1px solid #ddd; margin-bottom: 12px; }
  .ruta a { color: var(--accent); }
</style>
<!-- 4. Två rutor -->
<div class="ruta"><p>Ljust tema. <a href="#">En länk</a></p></div>
<div class="ruta mörk"><p>Mörkt tema, samma CSS. <a href="#">En länk</a></p></div>`,exercises:[{type:`choice`,prompt:`Vilken bakgrund får knappen?`,code:`<style>
  :root { --accent: teal; }
  .knapp { background: var(--primär, orange); }
</style>
<button class="knapp">Spara</button>`,options:[`teal`,`orange`,`Ingen bakgrund alls`],answer:1,explain:`Variabeln --primär finns inte, så reservvärdet efter kommatecknet används.`,why:{0:`--accent finns, men regeln läser --primär. Namnet måste stämma exakt.`,2:`Reservvärdet efter kommatecknet används just när variabeln saknas.`}},{type:`fill`,prompt:`Definiera variabeln och använd den i rubriken.`,code:`:root { ___: #c2410c; }
.rubrik { color: ___(--varning); }`,answers:[[`--varning`],[`var`]],explain:`Variabeln skapas med två bindestreck och läses med var().`},{type:`web`,prompt:"Samma lila färg är hårdkodad på tre ställen. Skapa variabeln `--accent` på `:root` och byt alla tre `#6b4fbb` mot `var(--accent)`.",starter:`<style>
  h1 { color: #6b4fbb; }
  .kort { border-left: 4px solid #6b4fbb; padding: 12px; }
  .knapp { background: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; font: inherit; }
</style>
<h1>Kafé Bönan</h1>
<div class="kort"><p>Nybryggt kaffe och kanelbullar varje dag från klockan 7.</p></div>
<button class="knapp">Boka bord</button>
`,checks:[{css:`:root`,prop:`--accent`,msg:`:root definierar --accent`},{css:`h1`,prop:`color`,re:`var\\(\\s*--accent`,msg:`h1 använder var(--accent)`},{css:`.kort`,prop:`border-left`,re:`var\\(\\s*--accent`,msg:`.kort använder var(--accent) i kantlinjen`},{css:`.knapp`,prop:`background(-color)?`,re:`var\\(\\s*--accent`,msg:`.knapp använder var(--accent) som bakgrund`},{source:`#6b4fbb[\\s\\S]*#6b4fbb`,invert:!0,msg:`Färgkoden står bara på ett ställe`}],solution:`<style>
  :root { --accent: #6b4fbb; }
  h1 { color: var(--accent); }
  .kort { border-left: 4px solid var(--accent); padding: 12px; }
  .knapp { background: var(--accent); color: white; border: 0; padding: 10px 16px; border-radius: 8px; font: inherit; }
</style>
<h1>Kafé Bönan</h1>
<div class="kort"><p>Nybryggt kaffe och kanelbullar varje dag från klockan 7.</p></div>
<button class="knapp">Boka bord</button>`,explain:`Nu byter du hela sidans accentfärg genom att ändra en enda rad.`,hint:`Skriv :root { --accent: #6b4fbb; } och ersätt sedan de tre färgkoderna med var(--accent).`},{type:`web`,prompt:"Den andra sektionen har klassen `mörk`, men den regeln saknas. Lägg till en regel `.mörk` som bara skriver över variablerna `--bg`, `--text` och `--accent` med mörka värden. Ändra inte `.sida`-reglerna, och sätt ingen `background` direkt i `.mörk`.",starter:`<style>
  :root { --bg: #ffffff; --text: #1f1d2b; --accent: #5a3fb0; }
  .sida { background: var(--bg); color: var(--text); padding: 16px; border-radius: 12px; border: 1px solid #ddd; }
  .sida a { color: var(--accent); }
</style>
<section class="sida"><h2>Dagens lunch</h2><p>Linssoppa med surdegsbröd. <a href="#">Se hela menyn</a></p></section>
<section class="sida mörk"><h2>Kvällsmeny</h2><p>Grillad halloumi med rostade rotfrukter. <a href="#">Se hela menyn</a></p></section>
`,checks:[{css:`.mörk`,prop:`--bg`,msg:`.mörk skriver över --bg`},{css:`.mörk`,prop:`--text`,msg:`.mörk skriver över --text`},{css:`.mörk`,prop:`--accent`,msg:`.mörk skriver över --accent`},{css:`.mörk`,prop:`background(-color)?`,invert:!0,msg:`.mörk sätter inte background direkt, bara variabler`},{css:`.sida`,prop:`background(-color)?`,re:`var\\(\\s*--bg`,msg:`.sida använder fortfarande var(--bg)`}],solution:`<style>
  :root { --bg: #ffffff; --text: #1f1d2b; --accent: #5a3fb0; }
  .mörk { --bg: #1f1d2b; --text: #f4f1ff; --accent: #c7b6ff; }
  .sida { background: var(--bg); color: var(--text); padding: 16px; border-radius: 12px; border: 1px solid #ddd; }
  .sida a { color: var(--accent); }
</style>
<section class="sida"><h2>Dagens lunch</h2><p>Linssoppa med surdegsbröd. <a href="#">Se hela menyn</a></p></section>
<section class="sida mörk"><h2>Kvällsmeny</h2><p>Grillad halloumi med rostade rotfrukter. <a href="#">Se hela menyn</a></p></section>`,explain:`Variablerna ärvs nedåt, så .sida och länken inuti byter färg utan att du rör deras regler.`,hint:`Skriv .mörk { --bg: ...; --text: ...; --accent: ...; } med en mörk bakgrund och ljus text.`},{type:`web`,prompt:"Variabler kan också styra en enda komponent. Ge `.kort` bakgrunden `var(--kort-bg, #f6f2ff)` (med reservvärde) i stället för den hårdkodade färgen. Skapa sedan varianten `.kort-utvald` som bara sätter `--kort-bg` till en gul ton.",starter:`<style>
  .kort { background: #f6f2ff; padding: 16px; border-radius: 12px; margin-bottom: 12px; }
</style>
<article class="kort"><h3>Grundkurs</h3><p>Fyra kvällar, 1 200 kr.</p></article>
<article class="kort kort-utvald"><h3>Populärast: helgkurs</h3><p>Lördag och söndag, 1 500 kr.</p></article>
`,checks:[{css:`.kort`,prop:`background(-color)?`,re:`var\\(\\s*--kort-bg\\s*,\\s*\\S`,msg:`.kort använder var(--kort-bg, ...) med ett reservvärde`},{css:`.kort-utvald`,prop:`--kort-bg`,msg:`.kort-utvald sätter --kort-bg`},{css:`.kort-utvald`,prop:`background(-color)?`,invert:!0,msg:`.kort-utvald ändrar bara variabeln, inte background`}],solution:`<style>
  .kort { background: var(--kort-bg, #f6f2ff); padding: 16px; border-radius: 12px; margin-bottom: 12px; }
  .kort-utvald { --kort-bg: #fff3d6; }
</style>
<article class="kort"><h3>Grundkurs</h3><p>Fyra kvällar, 1 200 kr.</p></article>
<article class="kort kort-utvald"><h3>Populärast: helgkurs</h3><p>Lördag och söndag, 1 500 kr.</p></article>`,explain:`Komponenten har ett standardvärde, och varianten ändrar bara den variabel som skiljer.`,hint:`Byt #f6f2ff mot var(--kort-bg, #f6f2ff) och lägg till .kort-utvald { --kort-bg: #fff3d6; }.`}]},{id:`web-transitions`,title:`Övergångar och animationer`,tier:4,text:"Ett gränssnitt känns levande när det svarar på det du gör. `:hover` gäller när muspekaren är över elementet och `:focus-visible` när det har tangentbordsfokus. Ge båda samma tydliga feedback, så att ingen missar den.\n\n`transition: transform 0.2s ease;` gör att en ändring glider fram i stället för att hoppa. `transform` flyttar (`translateY(-2px)`), skalar (`scale(1.05)`) och roterar (`rotate(10deg)`) utan att resten av sidan flyttar sig, och är billigt för webbläsaren att animera. För rörelse som går av sig själv skriver du en `@keyframes`-regel och kopplar den med `animation`.\n\nVissa blir yra eller illamående av rörelse och har ställt in det i sitt system. Med `@media (prefers-reduced-motion: reduce)` stänger du av animationerna för dem.",example:`<style>
  /* 1. Mjuk övergång */
  .knapp { background: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; font: inherit; transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .knapp:hover, .knapp:focus-visible { transform: translateY(-2px); box-shadow: 0 6px 12px rgb(0 0 0 / 0.2); }
  .knapp:focus-visible { outline: 3px solid #f2c94c; outline-offset: 2px; }
  /* 2. Snurrande laddare */
  .laddar { width: 24px; height: 24px; margin-top: 16px; border: 4px solid #ddd; border-top-color: #6b4fbb; border-radius: 50%; animation: snurra 1s linear infinite; }
  @keyframes snurra { to { transform: rotate(360deg); } }
  /* 3. Respektera minskad rörelse */
  @media (prefers-reduced-motion: reduce) {
    .knapp { transition: none; }
    .laddar { animation: none; }
  }
</style>
<!-- 4. Knapp och laddare -->
<button class="knapp">Håll över mig</button>
<div class="laddar" role="status" aria-label="Laddar"></div>`,exercises:[{type:`choice`,prompt:"Var ska `transition` stå för att knappen ska glida både in i och ut ur hover-läget?",options:["I grundregeln `.knapp`","Bara i `.knapp:hover`","I en `@keyframes`-regel"],answer:0,explain:`I grundregeln gäller övergången hela tiden, åt båda hållen.`,why:{1:`Då gäller övergången bara på väg in. När musen lämnar knappen försvinner :hover-regeln och knappen hoppar tillbaka.`,2:`@keyframes används för animationer som går av sig själva, inte för övergångar mellan två lägen.`}},{type:`choice`,prompt:`Du vill att ett kort lyfter lite när man håller över det. Vilket är bäst att ändra?`,options:["`margin-top: -4px`","`transform: translateY(-4px)`","`top: -4px` på ett element utan `position`"],answer:1,explain:`transform flyttar bara hur elementet ritas. Inget annat på sidan rör sig, och animationen blir mjuk.`,why:{0:`margin flyttar även allt runt omkring, och webbläsaren måste räkna om layouten i varje bildruta.`,2:`top gör ingenting på ett element med position: static, som är standard.`}},{type:`web`,prompt:"Gör receptkortet interaktivt. Ge `.kort` en `transition` på `transform`. Lägg sedan till regeln `.kort:hover, .kort:focus-within` som lyfter kortet med `transform: translateY(...)` med ett negativt värde. `:focus-within` gäller när något inuti kortet, här länken, har fokus.",starter:`<style>
  .kort { max-width: 260px; padding: 12px; border-radius: 12px; background: #f6f2ff; }
  .kort img { max-width: 100%; border-radius: 8px; }
</style>
<article class="kort">
  <img src="https://picsum.photos/id/1080/400/260" alt="Jordgubbar i en skål">
  <h3>Jordgubbstårta</h3>
  <p>En svensk sommarklassiker på en timme.</p>
  <a href="#">Se receptet</a>
</article>
`,checks:[{css:`.kort`,prop:`transition`,re:`transform|all`,msg:`.kort har en transition på transform`},{css:`.kort:hover`,prop:`transform`,re:`translateY\\(\\s*-`,msg:`.kort:hover lyfter kortet med translateY(-...)`},{css:`.kort:focus-within`,prop:`transform`,re:`translateY\\(\\s*-`,msg:`.kort:focus-within får samma lyft`}],solution:`<style>
  .kort { max-width: 260px; padding: 12px; border-radius: 12px; background: #f6f2ff; transition: transform 0.2s ease; }
  .kort:hover, .kort:focus-within { transform: translateY(-4px); }
  .kort img { max-width: 100%; border-radius: 8px; }
</style>
<article class="kort">
  <img src="https://picsum.photos/id/1080/400/260" alt="Jordgubbar i en skål">
  <h3>Jordgubbstårta</h3>
  <p>En svensk sommarklassiker på en timme.</p>
  <a href="#">Se receptet</a>
</article>`,explain:`Mus och tangentbord får samma feedback, och övergången gör rörelsen mjuk åt båda hållen.`,hint:`Lägg transition: transform 0.2s ease; i .kort och skriv en ny regel med båda väljarna åtskilda av kommatecken.`},{type:`web`,prompt:"Notisbrickan ska pulsera för att dra till sig blicken. Skriv `@keyframes pulsa` som går från `transform: scale(1)` till `transform: scale(1.2)`, och ge `.bricka` `animation: pulsa 1s ease-in-out infinite alternate`.",starter:`<style>
  .bricka { display: inline-block; min-width: 24px; padding: 2px 8px; border-radius: 999px; background: #c2410c; color: white; text-align: center; }
</style>
<p>Inkorg <span class="bricka">3</span></p>
`,checks:[{source:`@keyframes\\s+pulsa\\s*\\{`,msg:`Det finns en @keyframes pulsa`},{source:`scale\\(\\s*1\\.\\d+\\s*\\)`,msg:`Animationen skalar upp till något större än 1`},{css:`.bricka`,prop:`animation(-name)?`,re:`pulsa`,msg:`.bricka använder animationen pulsa`},{css:`.bricka`,prop:`animation(-iteration-count)?`,re:`infinite`,msg:`Animationen upprepas med infinite`}],solution:`<style>
  .bricka { display: inline-block; min-width: 24px; padding: 2px 8px; border-radius: 999px; background: #c2410c; color: white; text-align: center; animation: pulsa 1s ease-in-out infinite alternate; }
  @keyframes pulsa {
    from { transform: scale(1); }
    to { transform: scale(1.2); }
  }
</style>
<p>Inkorg <span class="bricka">3</span></p>`,explain:`alternate gör att animationen går fram och tillbaka i stället för att hoppa tillbaka till början.`,hint:`Skriv @keyframes pulsa { from { ... } to { ... } } och lägg till animation i .bricka.`},{type:`web`,prompt:"Sidan har både en pulserande bricka och en knapp med övergång. Respektera användare som vill ha mindre rörelse: lägg till `@media (prefers-reduced-motion: reduce)` som sätter `animation: none` på `.bricka` och `transition: none` på `.knapp`.",starter:`<style>
  .bricka { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #c2410c; color: white; animation: pulsa 1s ease-in-out infinite alternate; }
  @keyframes pulsa {
    from { transform: scale(1); }
    to { transform: scale(1.2); }
  }
  .knapp { background: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; font: inherit; transition: transform 0.2s ease; }
  .knapp:hover, .knapp:focus-visible { transform: scale(1.05); }
</style>
<p>Inkorg <span class="bricka">3</span></p>
<button class="knapp">Läs nya meddelanden</button>
`,checks:[{media:!0,re:`prefers-reduced-motion\\s*:\\s*reduce`,msg:`Det finns en media-fråga för prefers-reduced-motion: reduce`},{css:`.bricka`,prop:`animation`,re:`none`,inMedia:!0,msg:`.bricka får animation: none i media-frågan`},{css:`.knapp`,prop:`transition`,re:`none`,inMedia:!0,msg:`.knapp får transition: none i media-frågan`}],solution:`<style>
  .bricka { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #c2410c; color: white; animation: pulsa 1s ease-in-out infinite alternate; }
  @keyframes pulsa {
    from { transform: scale(1); }
    to { transform: scale(1.2); }
  }
  .knapp { background: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; font: inherit; transition: transform 0.2s ease; }
  .knapp:hover, .knapp:focus-visible { transform: scale(1.05); }
  @media (prefers-reduced-motion: reduce) {
    .bricka { animation: none; }
    .knapp { transition: none; }
  }
</style>
<p>Inkorg <span class="bricka">3</span></p>
<button class="knapp">Läs nya meddelanden</button>`,explain:`Sidan fungerar likadant, men den som har bett om mindre rörelse slipper animationerna.`,hint:`Skriv @media (prefers-reduced-motion: reduce) { ... } längst ner med två regler inuti.`}]},{id:`web-selectors`,title:`Avancerade väljare`,tier:4,text:'Du kan välja element utifrån var de står. `nav a` (med mellanslag) betyder alla a någonstans inuti nav. `ul > li` betyder bara direkta barn. `h2 + p` är stycket direkt efter en h2, och `h2 ~ p` alla stycken som kommer efter den på samma nivå.\n\nPseudoklasser väljer efter position eller tillstånd: `li:first-child`, `li:last-child`, `tr:nth-child(even)` för varannan rad och `li:not(:last-child)` för alla utom den sista. Attributväljare som `a[href^="https"]` (börjar med) och `a[href$=".pdf"]` (slutar med) väljer efter attribut.\n\nPseudoelementen `::before` och `::after` lägger till dekoration med `content`. Lägg bara dekor där, aldrig information som måste förstås, eftersom innehållet inte alltid läses upp eller går att markera.',example:`<style>
  /* 1. Grundstil för listan */
  .lista { list-style: none; padding: 0; }
  .lista > li { padding: 8px; }
  /* 2. Varannan rad och kanter */
  .lista > li:nth-child(odd) { background: #f6f2ff; }
  .lista > li:not(:last-child) { border-bottom: 1px solid #ddd; }
  /* 3. Innehåll före och efter */
  .lista > li::before { content: "→ "; color: #6b4fbb; }
  a[href^="https"]::after { content: " ↗"; }
</style>
<!-- 4. Listan och länken -->
<ul class="lista">
  <li>Mjöl</li>
  <li>Ägg</li>
  <li>Mjölk</li>
</ul>
<p><a href="https://sv.wikipedia.org/wiki/Pannkaka">Läs om pannkakor</a></p>`,exercises:[{type:`choice`,prompt:"Vilka länkar väljer `.meny > li > a`?",code:`<ul class="meny">
  <li><a href="#">Hem</a></li>
  <li>Om oss
    <ul>
      <li><a href="#">Team</a></li>
    </ul>
  </li>
</ul>`,options:[`Bara Hem`,`Både Hem och Team`,`Ingen av dem`],answer:0,explain:`> kräver ett direkt barn i varje steg. Bara Hem-länken uppfyller det.`,why:{1:`Team ligger i en inre ul. Dess li är barn till den inre listan, inte direkt till .meny.`,2:`Hem-länken är ett a direkt i ett li som är direkt i .meny, så den matchar.`}},{type:`fill`,prompt:`Ge alla rader utom den sista en kantlinje, och varannan rad en bakgrund.`,code:`li:___(:last-child) { border-bottom: 1px solid #ddd; }
li:nth-child(___) { background: #f6f2ff; }`,answers:[[`not`],[`even`,`odd`,`2n`,`2n+1`,`2n + 1`]],explain:`:not() vänder på en väljare, och :nth-child(even) eller (odd) väljer varannan.`},{type:`web`,prompt:"Gör tidtabellen lättläst. Ge varannan rad i `tbody` en bakgrund med `tbody tr:nth-child(even)` (eller `odd`), och gör första cellen i varje rad fetstilt med `td:first-child` och `font-weight`.",starter:`<style>
  table { border-collapse: collapse; }
  th, td { padding: 6px 12px; text-align: left; }
</style>
<table>
  <caption>Avgångar från Centralen</caption>
  <thead><tr><th scope="col">Tid</th><th scope="col">Till</th><th scope="col">Spår</th></tr></thead>
  <tbody>
    <tr><td>08.05</td><td>Uppsala</td><td>3</td></tr>
    <tr><td>08.20</td><td>Västerås</td><td>5</td></tr>
    <tr><td>08.35</td><td>Nyköping</td><td>2</td></tr>
    <tr><td>08.50</td><td>Gävle</td><td>4</td></tr>
  </tbody>
</table>
`,checks:[{source:`tr:nth-child\\(\\s*(even|odd|2n(\\s*\\+\\s*1)?)\\s*\\)\\s*\\{[^}]*background`,msg:`Varannan rad har en bakgrund via :nth-child`},{source:`td:first-child\\s*\\{[^}]*font-weight`,msg:`Första cellen i varje rad är fetstilt via td:first-child`}],solution:`<style>
  table { border-collapse: collapse; }
  th, td { padding: 6px 12px; text-align: left; }
  tbody tr:nth-child(even) { background: #f6f2ff; }
  td:first-child { font-weight: bold; }
</style>
<table>
  <caption>Avgångar från Centralen</caption>
  <thead><tr><th scope="col">Tid</th><th scope="col">Till</th><th scope="col">Spår</th></tr></thead>
  <tbody>
    <tr><td>08.05</td><td>Uppsala</td><td>3</td></tr>
    <tr><td>08.20</td><td>Västerås</td><td>5</td></tr>
    <tr><td>08.35</td><td>Nyköping</td><td>2</td></tr>
    <tr><td>08.50</td><td>Gävle</td><td>4</td></tr>
  </tbody>
</table>`,explain:`Ränderna följer med automatiskt när du lägger till eller tar bort rader, utan extra klasser i HTML.`,hint:`Två nya regler: tbody tr:nth-child(even) { background: ... } och td:first-child { font-weight: bold; }.`},{type:`web`,prompt:'Lägg till dekor med CSS i stället för i HTML. Ge `.fördelar li::before` innehållet `"✓ "`. Märk externa länkar med `a[href^="https"]::after` och `content: " ↗"`, och låt länken till prislistan få texten `" (PDF)"` med `a[href$=".pdf"]::after`.',starter:`<style>
  .fördelar { list-style: none; padding: 0; }
</style>
<h2>Därför väljer folk oss</h2>
<ul class="fördelar">
  <li>Fri frakt över 300 kr</li>
  <li>30 dagars öppet köp</li>
  <li>Svensk kundtjänst</li>
</ul>
<p><a href="/filer/prislista.pdf">Ladda ner prislistan</a></p>
<p><a href="https://www.konsumentverket.se">Läs om dina rättigheter</a></p>
`,checks:[{source:`\\.fördelar\\s*>?\\s*li::before\\s*\\{[^}]*content\\s*:\\s*["']✓`,msg:`Listpunkterna i .fördelar får en bock med ::before`},{source:`a\\[href\\^=["']?https["']?\\]::after\\s*\\{[^}]*content`,msg:`Externa länkar får en pil med a[href^="https"]::after`},{source:`a\\[href\\$=["']?\\.pdf["']?\\]::after\\s*\\{[^}]*content\\s*:\\s*["'][^"']*PDF`,msg:`PDF-länken får texten (PDF) med a[href$=".pdf"]::after`}],solution:`<style>
  .fördelar { list-style: none; padding: 0; }
  .fördelar li::before { content: "✓ "; color: #1f7a5c; }
  a[href^="https"]::after { content: " ↗"; }
  a[href$=".pdf"]::after { content: " (PDF)"; }
</style>
<h2>Därför väljer folk oss</h2>
<ul class="fördelar">
  <li>Fri frakt över 300 kr</li>
  <li>30 dagars öppet köp</li>
  <li>Svensk kundtjänst</li>
</ul>
<p><a href="/filer/prislista.pdf">Ladda ner prislistan</a></p>
<p><a href="https://www.konsumentverket.se">Läs om dina rättigheter</a></p>`,explain:`Nya länkar märks automatiskt efter sina adresser, och HTML:en innehåller bara riktigt innehåll.`,hint:`Tre regler. Glöm inte citattecknen runt värdet i content.`},{type:`web`,prompt:"Gör att-göra-listan levande utan JavaScript. När en kryssruta är ikryssad ska etiketten direkt efter bli genomstruken och grå. Använd syskonväljaren `input:checked + label` med `text-decoration: line-through` och en `color`.",starter:`<style>
  .uppgift { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }
</style>
<h2>Inför flytten</h2>
<div class="uppgift"><input type="checkbox" id="u1" checked><label for="u1">Beställ flyttkartonger</label></div>
<div class="uppgift"><input type="checkbox" id="u2"><label for="u2">Säg upp elavtalet</label></div>
<div class="uppgift"><input type="checkbox" id="u3"><label for="u3">Anmäl ny adress</label></div>
`,checks:[{source:`:checked\\s*\\+\\s*label\\s*\\{[^}]*text-decoration(-line)?\\s*:\\s*line-through`,msg:`input:checked + label får text-decoration: line-through`},{source:`:checked\\s*\\+\\s*label\\s*\\{[^}]*[^-]color\\s*:`,msg:`Den avbockade etiketten får en annan färg`},{labels:!0,msg:`Alla kryssrutor har kvar sina etiketter`}],solution:`<style>
  .uppgift { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }
  input:checked + label { text-decoration: line-through; color: #6b6878; }
</style>
<h2>Inför flytten</h2>
<div class="uppgift"><input type="checkbox" id="u1" checked><label for="u1">Beställ flyttkartonger</label></div>
<div class="uppgift"><input type="checkbox" id="u2"><label for="u2">Säg upp elavtalet</label></div>
<div class="uppgift"><input type="checkbox" id="u3"><label for="u3">Anmäl ny adress</label></div>`,explain:`+ väljer elementet direkt efter, och :checked ändras när du klickar. Testa att kryssa i rutorna i förhandsvisningen.`,hint:`En enda regel: input:checked + label { text-decoration: line-through; color: ...; }.`}]},{id:`web-darkmode`,title:`Mörkt läge och användarens inställningar`,tier:4,text:"Många har mörkt läge påslaget i telefonen eller datorn. Med `@media (prefers-color-scheme: dark)` kan sidan följa det valet. Har du redan färgerna som variabler räcker det att skriva över variablerna i media-frågan. Resten av CSS:en rör du inte.\n\n`color-scheme: light dark;` på `:root` talar om för webbläsaren att sidan klarar båda lägena. Då får formulärfält, rullningslister och standardfärger rätt utseende automatiskt.\n\nMörkt läge är mer än att vända färgerna. Kontrollera att text, länkar och fokusramar har tillräcklig kontrast i båda temana. En mörklila fokusram som syns bra på vitt kan nästan försvinna mot en mörk bakgrund, så ge även den en egen variabel.",example:`<style>
  /* 1. Färger för ljust läge */
  :root { color-scheme: light dark; --bg: #ffffff; --text: #1f1d2b; --länk: #5a3fb0; --fokus: #6b4fbb; }
  /* 2. Färger för mörkt läge */
  @media (prefers-color-scheme: dark) {
    :root { --bg: #18161f; --text: #ece9f5; --länk: #c7b6ff; --fokus: #f2c94c; }
  }
  /* 3. Använd färgerna */
  .sida { background: var(--bg); color: var(--text); padding: 16px; border-radius: 12px; }
  .sida a { color: var(--länk); }
  .sida a:focus-visible, .sida input:focus-visible { outline: 3px solid var(--fokus); outline-offset: 2px; }
</style>
<!-- 4. Innehållet -->
<div class="sida">
  <p>Byt till mörkt läge i ditt system och se sidan följa med. <a href="#">En länk</a></p>
  <label for="sok">Sök</label> <input id="sok" type="search">
</div>`,exercises:[{type:`choice`,prompt:"Vad gör `color-scheme: light dark;` på `:root`?",options:[`Byter automatiskt alla dina egna färger till mörka`,`Talar om att sidan stöder båda lägena, så att formulärfält och rullningslister får rätt färger`,`Tvingar sidan att alltid vara mörk`],answer:1,explain:`Webbläsarens egna delar följer då användarens läge. Dina egna färger styr du själv med variabler.`,why:{0:`Dina egna färger ändrar du själv, till exempel med variabler i en prefers-color-scheme-fråga.`,2:`light dark betyder att båda fungerar. Användarens inställning avgör vilket som visas.`}},{type:`choice`,prompt:"I mörkt läge har sidan bakgrunden `#18161f` och fokusramen är `#3b2a80`, en mörklila. Vad är problemet?",options:[`Inget, fokusramar behöver inte synas tydligt`,`Ramen har för låg kontrast mot bakgrunden och syns knappt för den som använder tangentbord`,`outline fungerar inte i mörkt läge`],answer:1,explain:`Ge fokusfärgen en egen variabel och välj en ljus färg för mörkt läge.`,why:{0:`Fokus måste synas, annars vet tangentbordsanvändare inte var de är på sidan.`,2:`outline fungerar precis likadant i båda lägena. Det är färgvalet som är problemet.`}},{type:`fill`,prompt:`Fyll i så att sidan stöder båda lägena och byter variabler i mörkt läge.`,code:`:root { ___: light dark; --bg: #ffffff; --text: #1f1d2b; }
@media (prefers-color-scheme: ___) {
  :root { --bg: #18161f; --text: #ece9f5; }
}`,answers:[[`color-scheme`],[`dark`]],explain:`color-scheme gäller webbläsarens egna delar, media-frågan dina egna variabler.`},{type:`web`,prompt:"Sidan har redan sina färger som variabler. Lägg till `@media (prefers-color-scheme: dark)` där `:root` får nya, mörka värden på `--bg` och ljusa på `--text`. Rör inte `body`-regeln.",starter:`<style>
  :root { --bg: #ffffff; --text: #1f1d2b; }
  body { background: var(--bg); color: var(--text); }
</style>
<h1>Löparklubben Fart</h1>
<p>Vi springer tillsammans varje tisdag och torsdag klockan 18.</p>
`,checks:[{media:!0,re:`prefers-color-scheme\\s*:\\s*dark`,msg:`Det finns en media-fråga för prefers-color-scheme: dark`},{css:`:root`,prop:`--bg`,inMedia:!0,msg:`:root får ett nytt --bg i mörkt läge`},{css:`:root`,prop:`--text`,inMedia:!0,msg:`:root får ett nytt --text i mörkt läge`},{css:`body`,prop:`background(-color)?`,re:`var\\(\\s*--bg`,msg:`body använder fortfarande var(--bg)`}],solution:`<style>
  :root { --bg: #ffffff; --text: #1f1d2b; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #18161f; --text: #ece9f5; }
  }
  body { background: var(--bg); color: var(--text); }
</style>
<h1>Löparklubben Fart</h1>
<p>Vi springer tillsammans varje tisdag och torsdag klockan 18.</p>`,explain:`Bara variablerna byts. body-regeln är densamma i båda lägena.`,hint:`Skriv @media (prefers-color-scheme: dark) { :root { --bg: ...; --text: ...; } }.`},{type:`web`,prompt:"Länkfärgen är hårdkodad och fokus är bortplockat, så sidan är svår att använda i mörkt läge. Lägg till `color-scheme: light dark` på `:root`. Skapa variablerna `--länk` och `--fokus` i båda temana (mörkare färger i ljust läge, ljusa i mörkt läge). Låt `a` använda `var(--länk)`, ta bort `outline: none` och ge `a:focus-visible` och `button:focus-visible` en `outline` med `var(--fokus)`.",starter:`<style>
  :root { --bg: #ffffff; --text: #1f1d2b; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #18161f; --text: #ece9f5; }
  }
  body { background: var(--bg); color: var(--text); }
  a { color: #3b2a80; }
  a, button { outline: none; }
  button { font: inherit; padding: 8px 14px; }
</style>
<h1>Löparklubben Fart</h1>
<p>Nästa pass: intervaller i Slottsparken. <a href="#">Se hela schemat</a></p>
<button>Anmäl dig</button>
`,checks:[{css:`:root`,prop:`color-scheme`,re:`light\\s+dark|dark\\s+light`,msg:`:root har color-scheme: light dark`},{source:`--länk\\s*:[\\s\\S]*--länk\\s*:`,msg:`--länk definieras i både ljust och mörkt tema`},{source:`--fokus\\s*:[\\s\\S]*--fokus\\s*:`,msg:`--fokus definieras i både ljust och mörkt tema`},{css:`:root`,prop:`--länk`,inMedia:!0,msg:`Mörkt läge har ett eget värde på --länk`},{css:`a`,prop:`color`,re:`var\\(\\s*--länk`,msg:`Länkarna använder var(--länk)`},{source:`outline\\s*:\\s*none`,invert:!0,msg:`outline: none är borttaget`},{source:`a:focus-visible[^{]*\\{[^}]*outline\\s*:[^;}]*var\\(\\s*--fokus`,msg:`a:focus-visible har en outline med var(--fokus)`},{source:`button:focus-visible[^{]*\\{[^}]*outline\\s*:[^;}]*var\\(\\s*--fokus`,msg:`button:focus-visible har en outline med var(--fokus)`}],solution:`<style>
  :root { color-scheme: light dark; --bg: #ffffff; --text: #1f1d2b; --länk: #3b2a80; --fokus: #6b4fbb; }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #18161f; --text: #ece9f5; --länk: #c7b6ff; --fokus: #f2c94c; }
  }
  body { background: var(--bg); color: var(--text); }
  a { color: var(--länk); }
  a:focus-visible, button:focus-visible { outline: 3px solid var(--fokus); outline-offset: 2px; }
  button { font: inherit; padding: 8px 14px; }
</style>
<h1>Löparklubben Fart</h1>
<p>Nästa pass: intervaller i Slottsparken. <a href="#">Se hela schemat</a></p>
<button>Anmäl dig</button>`,explain:`Länkar och fokus har nu god kontrast i båda lägena, och knappen följer systemets tema tack vare color-scheme.`,hint:`Lägg till color-scheme, --länk och --fokus i båda :root-reglerna, och skriv en gemensam regel a:focus-visible, button:focus-visible.`}]}]},{id:`web10`,title:`Slutprojekt i HTML och CSS`,lessons:[{id:`web-landing`,title:`Slutprojekt: landningssida`,tier:5,text:`Nu bygger du en hel landningssida för en påhittad tjänst, Cykelpoolen, som hyr ut lådcyklar i kvarteret. Du använder semantisk struktur, ett tema med variabler, flytande rubriker med \`clamp()\` och ett responsivt grid.

Arbeta i samma ordning som en front-end-utvecklare: först innehåll och struktur, sedan tema, sedan layout och sist detaljer som fokus och rörelse. Varje del bygger vidare på den förra.`,example:`<style>
  /* 1. Accentfärg */
  :root { --accent: #1f7a5c; }
  /* 2. Rubrik och knapp */
  .hero h1 { font-size: clamp(2rem, 6vw, 3.5rem); }
  .knapp { display: inline-block; background: var(--accent); color: white; padding: 12px 20px; border-radius: 12px; text-decoration: none; }
</style>
<!-- 3. Sidans hero -->
<section class="hero">
  <h1>Låna en lådcykel</h1>
  <p>Från 49 kr i timmen.</p>
  <a class="knapp" href="#">Så funkar det</a>
</section>`,exercises:[{type:`web`,prompt:'Del 1: Bygg strukturen. Ett `header` med logotyptext och en `nav` med minst tre länkar i en lista. I `main`: en `section class="hero"` med sidans enda `h1`, ett stycke och en länk med klassen `knapp`, och sedan en `section class="funktioner"` med en `h2` och en `div class="rutnat"` med minst tre `article`, var och en med `h3` och ett stycke. Avsluta med en `footer`.',starter:`<!-- Bygg Cykelpoolens sida här -->
`,checks:[{q:`header nav ul li a`,min:3,msg:`header har en nav med minst tre länkar i en lista`},{q:`h1`,min:1,max:1,msg:`Sidan har exakt en h1`},{q:`main section.hero h1`,msg:`h1 ligger i section.hero inuti main`},{q:`section.hero a.knapp`,msg:`Hero-sektionen har en länk med klassen knapp`},{q:`main section.funktioner h2`,msg:`section.funktioner har en h2`},{q:`section.funktioner .rutnat > article`,min:3,msg:`Minst tre article i .rutnat`},{q:`.rutnat > article h3`,min:3,msg:`Varje article har en h3`},{q:`.rutnat > article p`,min:3,msg:`Varje article har ett stycke`},{q:`footer`,msg:`Sidan har en footer`}],solution:t,explain:`Strukturen säger vad allt är. Skärmläsare kan hoppa mellan header, main, sektioner och footer.`,hint:`Bygg uppifrån och ner: header med nav och ul, main med två section, och footer sist.`},{type:`web`,prompt:"Del 2: Tema och typografi. Definiera minst `--accent`, `--bg` och `--text` på `:root`. Låt `body` använda `var(--bg)` som bakgrund och `var(--text)` som textfärg, och ge `.knapp` bakgrunden `var(--accent)`. Gör hero-rubriken flytande med `.hero h1 { font-size: clamp(...); }`.",starter:`<style>

</style>
`+t+`
`,checks:[{css:`:root`,prop:`--accent`,msg:`:root definierar --accent`},{css:`:root`,prop:`--bg`,msg:`:root definierar --bg`},{css:`:root`,prop:`--text`,msg:`:root definierar --text`},{css:`body`,prop:`background(-color)?`,re:`var\\(\\s*--bg`,msg:`body använder var(--bg) som bakgrund`},{css:`body`,prop:`color`,re:`var\\(\\s*--text`,msg:`body använder var(--text) som textfärg`},{css:`.knapp`,prop:`background(-color)?`,re:`var\\(\\s*--accent`,msg:`.knapp har bakgrunden var(--accent)`},{css:`.hero h1`,prop:`font-size`,re:`clamp\\(`,msg:`.hero h1 har font-size med clamp()`}],solution:_(n)+t,explain:`clamp(2rem, 6vw, 3.5rem) växer med skärmen men blir aldrig mindre än 2rem eller större än 3.5rem.`,hint:`Börja med :root { ... }, sedan body, .hero h1 och .knapp.`},{type:`web`,prompt:"Del 3: Layout. Gör `.sidhuvud` till en flexrad med `justify-content: space-between`, och menylistan `.sidhuvud ul` till en flexrad. Begränsa `main` med `max-width` och centrera den med `margin-inline: auto` (eller `margin: 0 auto`). Ge `.rutnat` `display: grid` och `gap`, och lägg till en `@media (min-width: ...)` där `.rutnat` får tre kolumner.",starter:_(n)+t+`
`,checks:[{css:`.sidhuvud`,prop:`display`,re:`flex`,msg:`.sidhuvud är en flexrad`},{css:`.sidhuvud`,prop:`justify-content`,re:`space-between`,msg:`.sidhuvud har justify-content: space-between`},{css:`.sidhuvud ul`,prop:`display`,re:`flex`,msg:`.sidhuvud ul är en flexrad`},{css:`main`,prop:`max-width`,msg:`main har en max-width`},{source:`main\\s*\\{[^}]*margin(-inline)?\\s*:\\s*(0\\s+)?auto`,msg:`main centreras med auto-marginaler`},{css:`.rutnat`,prop:`display`,re:`grid`,msg:`.rutnat är ett grid`},{css:`.rutnat`,prop:`gap`,msg:`.rutnat har gap`},{media:!0,re:`min-width`,msg:`Det finns en media-fråga med min-width`},{css:`.rutnat`,prop:`grid-template-columns`,re:`repeat\\(\\s*3\\s*,|^\\s*1fr\\s+1fr\\s+1fr`,inMedia:!0,msg:`.rutnat får tre kolumner i media-frågan`}],solution:_(r)+t,explain:`Mobilen får en kolumn som standard och bredare skärmar tre. Det kallas mobile first.`,hint:`Skriv reglerna för .sidhuvud, .sidhuvud ul, main och .rutnat, och sist @media (min-width: 700px) { .rutnat { grid-template-columns: repeat(3, 1fr); } }.`},{type:`web`,prompt:"Del 4: Finputs. Ge `.knapp` en `transition` och skriv regeln `.knapp:hover, .knapp:focus-visible` som lyfter knappen med `transform`. Ge `a:focus-visible` en tydlig `outline` i accentfärgen med `var(--accent)`. Stäng till sist av knappens övergång i `@media (prefers-reduced-motion: reduce)`.",starter:_(r)+t+`
`,checks:[{css:`.knapp`,prop:`transition`,re:`transform|all`,msg:`.knapp har en transition`},{css:`.knapp:hover`,prop:`transform`,msg:`.knapp:hover flyttar knappen med transform`},{css:`.knapp:focus-visible`,prop:`transform`,msg:`.knapp:focus-visible får samma effekt`},{source:`a:focus-visible[^{]*\\{[^}]*outline\\s*:[^;}]*var\\(\\s*--accent`,msg:`a:focus-visible har en outline med var(--accent)`},{media:!0,re:`prefers-reduced-motion\\s*:\\s*reduce`,msg:`Det finns en media-fråga för prefers-reduced-motion: reduce`},{css:`.knapp`,prop:`transition`,re:`none`,inMedia:!0,msg:`Övergången stängs av för den som vill ha mindre rörelse`}],solution:_(i)+t,explain:`Sidan är klar: semantisk, responsiv, tematiserad och lika tydlig med mus som med tangentbord.`,hint:`Fyra tillägg sist i style: transition på .knapp, hover- och fokusregeln, a:focus-visible och media-frågan.`}]},{id:`web-portfolio`,title:`Slutprojekt: portfolio`,tier:5,text:`En portfolio är ofta det första en arbetsgivare ser av dig. Här bygger du en åt Sara, som söker jobb som front-end-utvecklare: projektkort i ett grid, en meny som följer med när man scrollar, en hopplänk för tangentbordsanvändare och mörkt läge.

En **hopplänk** är den första länken på sidan. Den är gömd tills den får fokus, och låter den som tabbar hoppa förbi menyn direkt till innehållet. En **klistrig** meny (\`position: sticky; top: 0;\`) ligger kvar i överkanten när sidan scrollas.`,example:`<style>
  /* 1. Hopplänk som syns vid fokus */
  .hoppa { position: absolute; left: -9999px; }
  .hoppa:focus { left: 16px; top: 16px; background: white; padding: 8px 12px; }
  /* 2. Sidhuvud som fastnar */
  .sidhuvud { position: sticky; top: 0; background: white; padding: 12px; border-bottom: 1px solid #ddd; }
</style>
<!-- 3. Hopplänk, sidhuvud, innehåll -->
<a class="hoppa" href="#innehall">Hoppa till innehållet</a>
<header class="sidhuvud">Sara Lind</header>
<main id="innehall">
  <p>Tryck Tab i förhandsvisningen så dyker hopplänken upp.</p>
</main>`,exercises:[{type:`web`,prompt:'Del 1: Struktur, hopplänk och klistrig meny. Börja med hopplänken `<a class="hoppa" href="#innehall">Hoppa till innehållet</a>` före allt annat. Lägg sedan ett `header class="sidhuvud"` med Saras namn och en `nav` med minst två länkar, ett `main id="innehall"` med en `h1` och en `section class="projekt"` med en `h2`, och en `footer`. I CSS: göm `.hoppa` med `position: absolute` och ett stort negativt `left`, visa den igen i `.hoppa:focus`, och ge `.sidhuvud` `position: sticky`, `top: 0` och en bakgrund.',starter:`<style>

</style>
<!-- Hopplänk, sidhuvud, main och footer här -->
`,checks:[{q:`a.hoppa[href="#innehall"]`,msg:`Det finns en hopplänk a.hoppa till #innehall`},{source:`class="hoppa"[\\s\\S]*<header`,msg:`Hopplänken kommer före header`},{q:`header.sidhuvud nav a`,min:2,msg:`header.sidhuvud har en nav med minst två länkar`},{q:`main#innehall h1`,msg:`main har id="innehall" och en h1`},{q:`main section.projekt h2`,msg:`main har en section.projekt med en h2`},{q:`footer`,msg:`Sidan har en footer`},{css:`.hoppa`,prop:`position`,re:`absolute`,msg:`.hoppa är gömd med position: absolute`},{source:`\\.hoppa:focus(-visible)?\\s*\\{[^}]*left`,msg:`.hoppa:focus flyttar in hopplänken igen`},{css:`.sidhuvud`,prop:`position`,re:`sticky`,msg:`.sidhuvud har position: sticky`},{css:`.sidhuvud`,prop:`top`,re:`^0`,msg:`.sidhuvud har top: 0`},{css:`.sidhuvud`,prop:`background(-color)?`,msg:`.sidhuvud har en bakgrund`}],solution:_(s)+o(``),explain:`Den som tabbar möts först av hopplänken och slipper gå igenom hela menyn på varje sida.`,hint:`HTML först: a.hoppa, header, main, footer. Sedan tre CSS-regler: .hoppa, .hoppa:focus och .sidhuvud.`},{type:`web`,prompt:'Del 2: Projektkort. Lägg en `div class="kortlista"` i `.projekt` med minst tre `article class="projektkort"`. Varje kort har en bild med alt-text, en `h3`, en kort beskrivning och en länk med unik text. Gör `.kortlista` till ett grid med `gap` och `repeat(auto-fit, minmax(...))`, ge korten en bakgrund, och ge `.projektkort img` `width: 100%` (eller `max-width: 100%`).',starter:_(s)+o(``)+`
`,checks:[{q:`.projekt .kortlista > article.projektkort`,min:3,msg:`Minst tre article.projektkort i .kortlista`},{q:`article.projektkort img[alt]`,min:3,msg:`Varje kort har en bild med alt-text`},{q:`article.projektkort h3`,min:3,msg:`Varje kort har en h3`},{q:`article.projektkort a[href]`,min:3,msg:`Varje kort har en länk`},{css:`.kortlista`,prop:`display`,re:`grid`,msg:`.kortlista är ett grid`},{css:`.kortlista`,prop:`gap`,msg:`.kortlista har gap`},{css:`.kortlista`,prop:`grid-template-columns`,re:`repeat\\(\\s*auto-(fit|fill)\\s*,\\s*minmax\\(`,msg:`Kolumnerna använder repeat(auto-fit, minmax(...))`},{css:`.projektkort`,prop:`background(-color)?`,msg:`.projektkort har en bakgrund`},{css:`.projektkort img`,prop:`(max-)?width`,re:`100%`,msg:`Bilderna anpassar sig efter kortets bredd`}],solution:_(c)+o(a),explain:`Korten fördelar sig själva: en kolumn på mobil och fler när det finns plats.`,hint:`Skriv ett kort färdigt och kopiera det. Tre CSS-regler: .kortlista, .projektkort och .projektkort img.`},{type:`web`,prompt:"Del 3: Rörelse. Ge `.projektkort` en `transition` på `transform` och `box-shadow`. Skriv regeln `.projektkort:hover, .projektkort:focus-within` som lyfter kortet med `transform: translateY(...)` och ger det en `box-shadow`. Stäng av övergången i `@media (prefers-reduced-motion: reduce)`.",starter:_(c)+o(a)+`
`,checks:[{css:`.projektkort`,prop:`transition`,re:`transform|all`,msg:`.projektkort har en transition på transform`},{css:`.projektkort:hover`,prop:`transform`,re:`translateY\\(\\s*-`,msg:`.projektkort:hover lyfter kortet`},{css:`.projektkort:hover`,prop:`box-shadow`,msg:`.projektkort:hover får en skugga`},{css:`.projektkort:focus-within`,prop:`transform`,re:`translateY\\(\\s*-`,msg:`.projektkort:focus-within får samma lyft`},{media:!0,re:`prefers-reduced-motion\\s*:\\s*reduce`,msg:`Det finns en media-fråga för prefers-reduced-motion: reduce`},{css:`.projektkort`,prop:`transition`,re:`none`,inMedia:!0,msg:`Övergången stängs av i media-frågan`}],solution:_(l)+o(a),explain:`Kortet reagerar både när musen är över det och när länken inuti får fokus med Tab.`,hint:`Lägg transition i .projektkort, skriv hover- och focus-within-regeln och avsluta med media-frågan.`},{type:`web`,prompt:"Del 4: Mörkt läge. Byt de hårdkodade färgerna mot variabler. Lägg `color-scheme: light dark`, `--bg`, `--text` och `--yta` på `:root`, och ge dem mörka värden i `@media (prefers-color-scheme: dark)`. Låt `body` och `.sidhuvud` använda `var(--bg)` och `.projektkort` använda `var(--yta)`, och ge `body` textfärgen `var(--text)`.",starter:_(l)+o(a)+`
`,checks:[{css:`:root`,prop:`color-scheme`,re:`light\\s+dark|dark\\s+light`,msg:`:root har color-scheme: light dark`},{css:`:root`,prop:`--bg`,msg:`:root definierar --bg`},{css:`:root`,prop:`--yta`,msg:`:root definierar --yta`},{media:!0,re:`prefers-color-scheme\\s*:\\s*dark`,msg:`Det finns en media-fråga för prefers-color-scheme: dark`},{css:`:root`,prop:`--bg`,inMedia:!0,msg:`--bg får ett mörkt värde i mörkt läge`},{css:`:root`,prop:`--yta`,inMedia:!0,msg:`--yta får ett mörkt värde i mörkt läge`},{css:`:root`,prop:`--text`,inMedia:!0,msg:`--text får ett ljust värde i mörkt läge`},{css:`body`,prop:`background(-color)?`,re:`var\\(\\s*--bg`,msg:`body använder var(--bg)`},{css:`body`,prop:`color`,re:`var\\(\\s*--text`,msg:`body använder var(--text) som textfärg`},{css:`.sidhuvud`,prop:`background(-color)?`,re:`var\\(\\s*--bg`,msg:`.sidhuvud använder var(--bg)`},{css:`.projektkort`,prop:`background(-color)?`,re:`var\\(\\s*--yta`,msg:`.projektkort använder var(--yta)`}],solution:_(u)+o(a),explain:`Portfolion följer besökarens tema. Glöm inte att även klistriga menyn behöver variabeln, annars blir den en vit rand i mörkt läge.`,hint:`Lägg till :root och media-frågan överst, och byt #ffffff och #f4f2fa mot var(--bg) och var(--yta).`}]},{id:`web-signup`,title:`Slutprojekt: registreringsformulär`,tier:5,text:"Det sista projektet är ett registreringsformulär till en kodklubb. Formulär är där tillgänglighet märks mest: fel som inte syns, etiketter som saknas eller regler som ingen förklarar gör att folk ger upp.\n\nDu grupperar fälten med `fieldset` och `legend`, låter webbläsaren kontrollera innehållet med `required`, `type`, `minlength` och `pattern`, kopplar hjälptexter med `aria-describedby` och gör fokus och fel tydliga med CSS. `:user-invalid` fungerar som `:invalid` men väntar tills användaren har ändrat fältet, så att formuläret inte är rött redan från början. Sist gör du layouten responsiv.",example:`<style>
  /* 1. Stil på fälten */
  input { font: inherit; padding: 8px; border: 2px solid #8a8799; border-radius: 8px; }
  input:focus-visible { outline: 3px solid #6b4fbb; outline-offset: 2px; }
  /* 2. Röd kant vid fel */
  input:user-invalid { border-color: #b3261e; }
  /* 3. Hjälptext */
  .hjalp { font-size: 0.875rem; color: #5c596b; }
</style>
<!-- 4. Fält med hjälptext -->
<fieldset>
  <legend>Konto</legend>
  <label for="exempel-epost">E-post</label>
  <input id="exempel-epost" type="email" aria-describedby="exempel-hjalp" required>
  <p class="hjalp" id="exempel-hjalp">Vi skickar en bekräftelse hit.</p>
</fieldset>`,exercises:[{type:`web`,prompt:'Del 1: Struktur. Formuläret har redan ett `fieldset` för namnet. Lägg till ett `fieldset` med `legend` "Konto" som har e-post (`type="email"`, `autocomplete="email"`, `required`) och lösenord (`type="password"`, `autocomplete="new-password"`, `minlength="8"`, `required`). Lägg till ett tredje `fieldset` med `legend` "Erfarenhet" och minst tre radioknappar med `name="niva"`. Alla fält ska ha kopplade etiketter, och formuläret ska ha en knapp med `type="submit"`.',starter:`<form class="registrering">
`+d+`</form>
`,checks:[{q:`form.registrering fieldset > legend`,min:3,msg:`Formuläret har tre fieldset med legend`},{q:`input[type="email"][autocomplete="email"][required]`,msg:`E-post har type="email", autocomplete="email" och required`},{q:`input[type="password"][autocomplete="new-password"][required]`,msg:`Lösenordet har type="password", autocomplete="new-password" och required`},{q:`input[type="password"]`,attr:`minlength`,re:`^([89]|[1-9]\\d+)$`,msg:`Lösenordet kräver minst 8 tecken med minlength`},{q:`fieldset input[type="radio"][name="niva"]`,min:3,msg:`Minst tre radioknappar med name="niva"`},{labels:!0,msg:`Alla fält har kopplade etiketter`},{q:`form.registrering button[type="submit"]`,msg:`Det finns en skicka-knapp`}],solution:p,explain:`Grupperna gör formuläret lätt att överblicka, och skärmläsare läser upp legend tillsammans med fälten i gruppen.`,hint:`Följ mönstret i "Om dig": en div.falt med label och input per fält. Radioknapparna behöver var sitt id och samma name.`},{type:`web`,prompt:'Del 2: Hjälptexter och regler. Lägg en hjälptext under lösenordet, `<p class="hjalp" id="losenord-hjalp">Minst 8 tecken.</p>`, och koppla den med `aria-describedby="losenord-hjalp"`. Lägg sedan först i Konto till ett användarnamn med `id="anvandarnamn"`, `pattern="[a-z0-9_]{3,16}"` och `required`, med en etikett och en hjälptext `id="anvandarnamn-hjalp"` som förklarar reglerna, kopplad på samma sätt.',starter:p+`
`,checks:[{q:`#losenord`,attr:`aria-describedby`,re:`(^|\\s)losenord-hjalp(\\s|$)`,msg:`Lösenordet pekar på hjälptexten med aria-describedby`},{q:`#losenord-hjalp`,text:`\\S`,msg:`Hjälptexten för lösenordet finns och har innehåll`},{q:`input#anvandarnamn[required]`,msg:`Det finns ett obligatoriskt fält med id="anvandarnamn"`},{q:`#anvandarnamn`,attr:`pattern`,re:`\\S`,msg:`Användarnamnet har ett pattern`},{q:`#anvandarnamn`,attr:`aria-describedby`,re:`(^|\\s)anvandarnamn-hjalp(\\s|$)`,msg:`Användarnamnet pekar på sin hjälptext`},{q:`#anvandarnamn-hjalp`,text:`\\S`,msg:`Hjälptexten för användarnamnet finns och har innehåll`},{labels:!0,msg:`Alla fält har kopplade etiketter`}],solution:m,explain:`Reglerna står nu bredvid fälten och läses upp när fältet får fokus, inte först när något har gått fel.`,hint:`Kopiera mönstret: div.falt med label, input och p.hjalp. Id:t på p:n ska stå i inputens aria-describedby.`},{type:`web`,prompt:"Del 3: Fokus och fel. Skriv en regel `input` med `font: inherit`, `padding` och en `border`. Ge `input:focus-visible` en `outline` på minst 2px och en `outline-offset`. Ge ogiltiga fält en röd kant med `input:user-invalid` (eller `input:invalid`) och `border-color`. Ge `.hjalp` mindre text med `font-size` och en dämpad `color`.",starter:`<style>

</style>
`+m+`
`,checks:[{css:`input`,prop:`font`,re:`inherit`,msg:`input har font: inherit`},{css:`input`,prop:`border`,msg:`input har en egen kantlinje`},{css:`input:focus-visible`,prop:`outline`,re:`([2-9]|\\d{2,})px`,msg:`input:focus-visible har en outline på minst 2px`},{css:`input:focus-visible`,prop:`outline-offset`,msg:`input:focus-visible har en outline-offset`},{source:`input:(user-)?invalid[^{]*\\{[^}]*border(-color)?\\s*:`,msg:`Ogiltiga fält får en egen kantfärg`},{css:`.hjalp`,prop:`font-size`,msg:`.hjalp har en mindre font-size`},{css:`.hjalp`,prop:`color`,msg:`.hjalp har en egen färg`}],solution:_(h)+m,explain:`Skriv något kort i användarnamnet och lämna fältet, så blir kanten röd. Felet visas när det är relevant, inte innan.`,hint:`Fyra regler: input, input:focus-visible, input:user-invalid och .hjalp.`},{type:`web`,prompt:"Del 4: Responsiv layout. Gör `.registrering` till ett grid med `gap` och en `max-width`, och `.falt` till en kolumn med `display: grid` (eller flex). Ge `.namnrad` `display: grid` och `gap` så att förnamn och efternamn ligger under varandra på mobil, och lägg till en `@media (min-width: ...)` där `.namnrad` får två kolumner med `grid-template-columns`.",starter:_(h)+m+`
`,checks:[{css:`.registrering`,prop:`display`,re:`grid`,msg:`.registrering är ett grid`},{css:`.registrering`,prop:`gap`,msg:`.registrering har gap`},{css:`.registrering`,prop:`max-width`,msg:`.registrering har en max-width`},{css:`.falt`,prop:`display`,re:`grid|flex`,msg:`.falt lägger etikett och fält i en kolumn`},{css:`.namnrad`,prop:`display`,re:`grid`,msg:`.namnrad är ett grid`},{css:`.namnrad`,prop:`gap`,msg:`.namnrad har gap`},{media:!0,re:`min-width`,msg:`Det finns en media-fråga med min-width`},{css:`.namnrad`,prop:`grid-template-columns`,inMedia:!0,msg:`.namnrad får två kolumner i media-frågan`}],solution:_(g)+m,explain:`Formuläret är klart: grupperat, förklarat, validerat, tydligt i alla lägen och bekvämt på både mobil och dator. Det är så ett riktigt formulär ska fungera.`,hint:`Regler för .registrering, .falt och .namnrad, och sist @media (min-width: 520px) { .namnrad { grid-template-columns: 1fr 1fr; } }.`}]}]}],y=e=>e.replace(/^\n/,``),b=y(`
<style>
  .klar { text-decoration: line-through; color: #777; }
</style>
<h1>Inköpslista</h1>
<label for="vara">Vara</label>
<input id="vara">
<button id="lagg-till">Lägg till</button>
<ul id="lista"></ul>
<p id="antal">Varor: 0</p>
`),x=y(`
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
<\/script>
`),S=y(`
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
<\/script>
`),C=y(`
<h1>Tärning</h1>
<button id="sla">Slå tärningen</button>
<p id="resultat">Tryck på knappen.</p>
<ul id="historik"></ul>
`),w=y(`
<h1>Vem gör vad?</h1>
<button id="slumpa">Slumpa en syssla</button>
<p id="syssla"></p>
`),T=[{id:`web11`,title:`Lite JavaScript`,lessons:[{id:`web-js-script`,title:`Ditt första skript`,tier:2,text:"HTML bestämmer vad som finns på sidan och CSS hur det ser ut. **JavaScript** är webbens programspråk: det gör att sidan kan ändra sig medan någon använder den. Koden skriver du i en `<script>`-tagg.\n\nLägg `<script>` **sist**, efter elementen. Webbläsaren läser sidan uppifrån och ned, så ett skript högst upp letar efter element som inte finns än.\n\n`document.querySelector('#rubrik')` hittar ett element med samma väljare som i CSS. Elementets `textContent` är texten inuti, och den kan du byta: `rubrik.textContent = 'Hej!';`. Text står alltid inom citattecken.\n\nEtt värde sparar du i en variabel. `const` används för sådant som inte ska bytas, till exempel ett element. `let` används när värdet ska ändras senare, som en poäng. Text och variabler sätter du ihop med `+`.\n\nI en riktig webbläsare kan du skriva ut saker i konsolen (tryck F12). Här i Kodstig syns ingen konsol, så allt resultat ska synas på själva sidan.",example:y(`
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
<\/script>`),exercises:[{type:`choice`,prompt:"Varför brukar `<script>` ligga sist, efter sidans element?",options:[`För att JavaScript bara fungerar i slutet av en fil`,`För att elementen ska finnas när skriptet letar efter dem`,`För att CSS annars slutar fungera`],answer:1,explain:`Webbläsaren läser sidan uppifrån. När skriptet ligger sist har alla element ovanför redan skapats, så querySelector hittar dem.`,why:{0:`Skriptet kan stå var som helst, men högt upp finns inte elementen under det än.`,2:`CSS påverkas inte av var skriptet står.`}},{type:`order`,prompt:"Ordna raderna: först ett tomt stycke med id `halsning`, sedan ett skript som hittar stycket och skriver Hej, världen! i det.",lines:[`<p id="halsning"></p>`,`<script>`,`  const p = document.querySelector('#halsning');`,`  p.textContent = 'Hej, världen!';`,`<\/script>`],distractors:[{line:`  p.textContent = Hej, världen!;`,why:`Text måste stå inom citattecken, annars tror JavaScript att det är variabelnamn.`}],explain:`Stycket finns först, sedan letar skriptet upp det och byter texten. Variabeln p måste skapas innan den används.`,hint:`Elementet först, skriptet sist. Inuti skriptet: hitta först, ändra sedan.`},{type:`web`,js:!0,prompt:'Rubriken säger "Min sida". Ändra inte HTML-koden, utan skriv JavaScript i skriptet som hittar `#titel` med `document.querySelector` och byter texten till `Välkommen!`.',starter:`<h1 id="titel">Min sida</h1>
<script>
  // Hitta rubriken och byt texten

<\/script>
`,checks:[{q:`#titel`,text:`^Välkommen!$`,msg:`Rubriken visar Välkommen!`},{source:`<h1 id="titel">Min sida</h1>`,msg:`HTML-koden för rubriken är oförändrad`},{source:`querySelector`,msg:`Du använder document.querySelector`}],solution:`<h1 id="titel">Min sida</h1>
<script>
  const titel = document.querySelector('#titel');
  titel.textContent = 'Välkommen!';
<\/script>
`,explain:`Sidan skickades med texten Min sida, men skriptet bytte den innan du hann se den. Så fungerar många sidor som visar ditt namn när du loggat in.`,hint:`Två rader: const titel = document.querySelector('#titel'); och titel.textContent = 'Välkommen!';`},{type:`web`,js:!0,prompt:"Variabeln `poang` börjar på 10. Öka den med 5 i koden (med `poang = poang + 5;`) och visa den sedan i `#poang` som texten `Poäng: 15`. Sätt ihop texten med `+` och variabeln.",starter:`<p id="poang"></p>
<script>
  let poang = 10;
  // Öka poang med 5 och visa den i stycket

<\/script>
`,checks:[{q:`#poang`,text:`^Poäng: 15$`,msg:`Stycket visar Poäng: 15`},{source:`poang\\s*(\\+=\\s*5|=\\s*poang\\s*\\+\\s*5)`,msg:`Du ökar poang med 5 i koden`}],solution:`<p id="poang"></p>
<script>
  let poang = 10;
  poang = poang + 5;
  document.querySelector('#poang').textContent = 'Poäng: ' + poang;
<\/script>
`,explain:`poang skapades med let, så den fick ändras. Med const hade raden poang = poang + 5 gett ett fel.`,hint:`Skriv poang = poang + 5; och sedan document.querySelector('#poang').textContent = 'Poäng: ' + poang;`},{type:`web`,js:!0,prompt:"Skriptet har två variabler, `namn` och `stad`. Bygg texten `Sam bor i Malmö.` av variablerna med `+` och visa den i `#om`.",starter:`<h2>Om mig</h2>
<p id="om"></p>
<script>
  const namn = 'Sam';
  const stad = 'Malmö';
  // Visa: Sam bor i Malmö.

<\/script>
`,checks:[{q:`#om`,text:`^Sam bor i Malmö\\.$`,msg:`Stycket visar Sam bor i Malmö.`},{source:`\\+\\s*stad`,msg:`Texten byggs med variabeln stad`}],solution:`<h2>Om mig</h2>
<p id="om"></p>
<script>
  const namn = 'Sam';
  const stad = 'Malmö';
  document.querySelector('#om').textContent = namn + ' bor i ' + stad + '.';
<\/script>
`,explain:`Glöm inte mellanslagen inuti citattecknen. JavaScript lägger inte till några själv när du sätter ihop text.`,hint:`namn + ' bor i ' + stad + '.'`},{type:`web`,js:!0,prompt:`Det här skriptet ger ett fel: det hittar inte stycket. Flytta skriptet så att det fungerar. Själva koden i skriptet behöver inte ändras.`,starter:`<script>
  const status = document.querySelector('#status');
  status.textContent = 'Skriptet hittade stycket!';
<\/script>
<p id="status">Väntar...</p>
`,checks:[{q:`#status`,text:`^Skriptet hittade stycket!$`,msg:`Stycket visar Skriptet hittade stycket!`}],solution:`<p id="status">Väntar...</p>
<script>
  const status = document.querySelector('#status');
  status.textContent = 'Skriptet hittade stycket!';
<\/script>
`,explain:`När skriptet låg först fanns stycket inte än, så querySelector gav null och nästa rad kraschade. Sist på sidan finns allt.`,hint:`Klipp ut hela script-blocket och klistra in det efter stycket.`}]},{id:`web-js-click`,title:`Knappar och klick`,tier:2,text:`Ett skript som bara körs en gång när sidan laddas är bra, men det roliga börjar när sidan svarar på det du gör. Då behövs **funktioner** och **händelser**.

En funktion är ett namngivet stycke kod som körs först när någon anropar den: \`function okaRakning() { ... }\`. Med \`knapp.addEventListener('click', okaRakning);\` säger du till webbläsaren: kör funktionen varje gång knappen klickas.

Skriv funktionens namn **utan** parenteser där. \`okaRakning()\` betyder "kör nu", och då körs den en gång direkt i stället för vid klick.

Vill du att något ska minnas mellan klicken, som en räknare, ska variabeln skapas med \`let\` **utanför** funktionen. En variabel som skapas inuti funktionen börjar om från början vid varje klick.

I övningarna klickar Kodstig på knapparna åt dig och tittar sedan på hur sidan ser ut.`,example:y(`
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
<\/script>`),exercises:[{type:`choice`,prompt:`Vad händer med den här raden?`,code:`knapp.addEventListener('click', visa());`,options:[`visa körs vid varje klick, precis som tänkt`,`Webbläsaren klickar på knappen automatiskt`,`visa körs en gång direkt när sidan laddas, inte vid klick`],answer:2,explain:`Parenteserna betyder "kör funktionen nu". Det som kopplas till klicket blir då det funktionen lämnar tillbaka, inte funktionen själv.`,why:{0:`Det hade stämt utan parenteser: addEventListener('click', visa).`,1:`Ingen klickar. Funktionen anropas bara direkt på grund av parenteserna.`}},{type:`order`,prompt:`Ordna skriptet: hitta knappen, skapa räknaren, skriv funktionen som ökar räknaren och visar den på knappen, och koppla funktionen till klick sist.`,lines:[`<script>`,`  const knapp = document.querySelector('#knapp');`,`  let antal = 0;`,`  function rakna() {`,`    antal = antal + 1;`,`    knapp.textContent = 'Klick: ' + antal;`,`  }`,`  knapp.addEventListener('click', rakna);`,`<\/script>`],alt:[[`<script>`,`  let antal = 0;`,`  const knapp = document.querySelector('#knapp');`,`  function rakna() {`,`    antal = antal + 1;`,`    knapp.textContent = 'Klick: ' + antal;`,`  }`,`  knapp.addEventListener('click', rakna);`,`<\/script>`]],distractors:[{line:`  knapp.addEventListener('click', rakna());`,why:`Med parenteser körs rakna direkt en gång i stället för vid klick.`}],explain:`Räknaren ökas först och visas sedan, annars visar knappen ett klick för lite. Kopplingen till klick kommer sist, när allt den behöver finns.`,hint:`Inuti funktionen: öka först, visa sedan.`},{type:`web`,js:!0,prompt:"När man klickar på knappen `#hej` ska stycket `#svar` visa texten `Hej på dig!`. Skriv en funktion och koppla den med `addEventListener`.",actions:[{q:`#hej`}],starter:`<button id="hej">Säg hej</button>
<p id="svar"></p>
<script>
  // Skriv en funktion och koppla den till knappen

<\/script>
`,checks:[{q:`#svar`,text:`^Hej på dig!$`,msg:`Efter klick visar stycket Hej på dig!`},{source:`addEventListener\\(\\s*['"]click['"]`,msg:`Du använder addEventListener med click`}],solution:`<button id="hej">Säg hej</button>
<p id="svar"></p>
<script>
  function sagHej() {
    document.querySelector('#svar').textContent = 'Hej på dig!';
  }
  document.querySelector('#hej').addEventListener('click', sagHej);
<\/script>
`,explain:`Funktionen väntar tills någon klickar. Det är grunden för nästan alla knappar på webben.`,hint:`function sagHej() { ... } och sedan document.querySelector('#hej').addEventListener('click', sagHej);`},{type:`web`,js:!0,prompt:"Plus-knappen fungerar redan. Lägg till en funktion för minus-knappen `#minus` som minskar talet med 1 och visar det i `#tal`. Kodstig klickar plus tre gånger och minus en gång, och då ska det stå `2`.",actions:[{q:`#plus`},{q:`#plus`},{q:`#plus`},{q:`#minus`}],starter:`<button id="minus">-</button>
<span id="tal">0</span>
<button id="plus">+</button>
<script>
  const talText = document.querySelector('#tal');
  let tal = 0;

  function plus() {
    tal = tal + 1;
    talText.textContent = tal;
  }
  document.querySelector('#plus').addEventListener('click', plus);

  // Gör likadant för minus

<\/script>
`,checks:[{q:`#tal`,text:`^2$`,msg:`Efter tre plus och ett minus står det 2`}],solution:`<button id="minus">-</button>
<span id="tal">0</span>
<button id="plus">+</button>
<script>
  const talText = document.querySelector('#tal');
  let tal = 0;

  function plus() {
    tal = tal + 1;
    talText.textContent = tal;
  }
  document.querySelector('#plus').addEventListener('click', plus);

  function minus() {
    tal = tal - 1;
    talText.textContent = tal;
  }
  document.querySelector('#minus').addEventListener('click', minus);
<\/script>
`,explain:`Båda funktionerna ändrar samma variabel tal, eftersom den ligger utanför dem. Så funkar antal-väljaren i en webbutik.`,hint:`Kopiera plus-funktionen, döp den till minus, byt + 1 mot - 1 och koppla den till #minus.`},{type:`web`,js:!0,prompt:"Räknaren visar fel: efter två klick står det `Klick: 1`. Hitta felet på kopplingsraden och rätta det.",actions:[{q:`#knapp`},{q:`#knapp`}],starter:`<button id="knapp">Klicka</button>
<p id="rakning">Klick: 0</p>
<script>
  const rakning = document.querySelector('#rakning');
  let antal = 0;
  function okaRakning() {
    antal = antal + 1;
    rakning.textContent = 'Klick: ' + antal;
  }
  document.querySelector('#knapp').addEventListener('click', okaRakning());
<\/script>
`,checks:[{q:`#rakning`,text:`^Klick: 2$`,msg:`Efter två klick står det Klick: 2`}],solution:`<button id="knapp">Klicka</button>
<p id="rakning">Klick: 0</p>
<script>
  const rakning = document.querySelector('#rakning');
  let antal = 0;
  function okaRakning() {
    antal = antal + 1;
    rakning.textContent = 'Klick: ' + antal;
  }
  document.querySelector('#knapp').addEventListener('click', okaRakning);
<\/script>
`,explain:`Med parenteserna kördes funktionen en gång när sidan laddades, och sedan hände inget vid klick. Utan parenteser lämnar du över själva funktionen.`,hint:`Titta på okaRakning() i sista raden. Behövs parenteserna där?`},{type:`web`,js:!0,prompt:"Den här räknaren fastnar på `Klick: 1` hur många gånger man än klickar. Rätta koden så att det står `Klick: 3` efter tre klick.",actions:[{q:`#knapp`},{q:`#knapp`},{q:`#knapp`}],starter:`<button id="knapp">Klicka</button>
<p id="rakning">Klick: 0</p>
<script>
  const rakning = document.querySelector('#rakning');
  function okaRakning() {
    let antal = 0;
    antal = antal + 1;
    rakning.textContent = 'Klick: ' + antal;
  }
  document.querySelector('#knapp').addEventListener('click', okaRakning);
<\/script>
`,checks:[{q:`#rakning`,text:`^Klick: 3$`,msg:`Efter tre klick står det Klick: 3`}],solution:`<button id="knapp">Klicka</button>
<p id="rakning">Klick: 0</p>
<script>
  const rakning = document.querySelector('#rakning');
  let antal = 0;
  function okaRakning() {
    antal = antal + 1;
    rakning.textContent = 'Klick: ' + antal;
  }
  document.querySelector('#knapp').addEventListener('click', okaRakning);
<\/script>
`,explain:`Inuti funktionen skapades en ny variabel med värdet 0 vid varje klick. Utanför funktionen skapas den bara en gång och minns sitt värde.`,hint:`Flytta raden let antal = 0; upp ovanför funktionen.`}]},{id:`web-js-input`,title:`Läsa från fält`,tier:3,text:"Ett inmatningsfält gör sidan till ett verktyg. Det som står i fältet läser du med `falt.value`. Läs värdet **inuti** klickfunktionen: då får du det som står i fältet när knappen trycks. Läser du det direkt när sidan laddas är fältet fortfarande tomt.\n\nEtt fälts värde är alltid **text**, även om någon skrev siffror. Med text betyder `+` att sätta ihop, så `'5' + '3'` blir `'53'`. Gör om texten till ett tal med `Number(falt.value)` innan du räknar. Om texten inte är ett tal blir resultatet `NaN`, som betyder \"inte ett tal\".\n\nResultatet visar du som förut med `textContent`. Så byggs små verktyg som räknar ut moms, dricks eller hur länge det är kvar till lov. I övningarna skriver Kodstig in värden i fälten åt dig och klickar på knappen.",example:y(`
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
<\/script>`),exercises:[{type:`choice`,prompt:"Fältet `#antal` innehåller 5. Vad visas i stycket?",code:`const antal = document.querySelector('#antal').value;
document.querySelector('#svar').textContent = antal + 3;`,options:[`53`,`8`,`NaN`],answer:0,explain:`value är alltid text. Text plus ett tal sätts ihop till ny text, så det blir 53. Med Number(...) runt hade det blivit 8.`,why:{1:`Det kräver att texten först görs om till ett tal med Number().`,2:`NaN får du när text inte går att göra om till ett tal. Här sätts texten bara ihop.`}},{type:`order`,prompt:`Ordna raderna: etikett, fält, knapp och ett tomt stycke i den ordningen, och sist ett skript som skriver Hej och namnet i stycket när man klickar.`,lines:[`<label for="namn">Namn</label>`,`<input id="namn">`,`<button id="hej">Hälsa</button>`,`<p id="svar"></p>`,`<script>`,`  function halsa() {`,`    const namn = document.querySelector('#namn').value;`,`    document.querySelector('#svar').textContent = 'Hej ' + namn + '!';`,`  }`,`  document.querySelector('#hej').addEventListener('click', halsa);`,`<\/script>`],distractors:[{line:`    const namn = document.querySelector('#namn').textContent;`,why:`Det man skrivit i ett fält läser man med value, inte textContent.`}],explain:`Namnet läses inuti funktionen, alltså när knappen trycks. Raden som läser måste komma före raden som använder namn.`,hint:`Läs värdet först, visa det sedan. Kopplingen till klick står efter funktionen.`},{type:`web`,js:!0,prompt:"Gör en hälsning. När man klickar på `#knapp` ska stycket `#svar` visa `Hej` följt av namnet i fältet `#namn` och ett utropstecken, till exempel `Hej Kim!`. Kodstig skriver först Ali och klickar, sedan Kim och klickar.",actions:[{q:`#namn`,value:`Ali`},{q:`#knapp`},{q:`#namn`,value:`Kim`},{q:`#knapp`}],starter:`<label for="namn">Vad heter du?</label>
<input id="namn">
<button id="knapp">Hälsa</button>
<p id="svar"></p>
<script>
  // Läs namnet när knappen klickas och visa hälsningen

<\/script>
`,checks:[{q:`#svar`,text:`^Hej Kim!$`,msg:`Efter andra klicket står det Hej Kim!`}],solution:`<label for="namn">Vad heter du?</label>
<input id="namn">
<button id="knapp">Hälsa</button>
<p id="svar"></p>
<script>
  function halsa() {
    const namn = document.querySelector('#namn').value;
    document.querySelector('#svar').textContent = 'Hej ' + namn + '!';
  }
  document.querySelector('#knapp').addEventListener('click', halsa);
<\/script>
`,explain:`Eftersom fältet läses vid varje klick följer hälsningen med när namnet ändras.`,hint:`Inuti funktionen: const namn = document.querySelector('#namn').value; och sedan 'Hej ' + namn + '!'.`},{type:`web`,js:!0,prompt:"Den här miniräknaren säger att 12 + 30 är 1230. Rätta den så att den räknar på riktigt och visar `Summa: 42`.",actions:[{q:`#a`,value:`12`},{q:`#b`,value:`30`},{q:`#rakna`}],starter:`<label for="a">Tal 1</label> <input id="a">
<label for="b">Tal 2</label> <input id="b">
<button id="rakna">Räkna</button>
<p id="summa"></p>
<script>
  function rakna() {
    const a = document.querySelector('#a').value;
    const b = document.querySelector('#b').value;
    document.querySelector('#summa').textContent = 'Summa: ' + (a + b);
  }
  document.querySelector('#rakna').addEventListener('click', rakna);
<\/script>
`,checks:[{q:`#summa`,text:`^Summa: 42$`,msg:`Med 12 och 30 visas Summa: 42`}],solution:`<label for="a">Tal 1</label> <input id="a">
<label for="b">Tal 2</label> <input id="b">
<button id="rakna">Räkna</button>
<p id="summa"></p>
<script>
  function rakna() {
    const a = Number(document.querySelector('#a').value);
    const b = Number(document.querySelector('#b').value);
    document.querySelector('#summa').textContent = 'Summa: ' + (a + b);
  }
  document.querySelector('#rakna').addEventListener('click', rakna);
<\/script>
`,explain:`Fälten gav texten 12 och 30, som sattes ihop. Med Number blir de tal som går att addera.`,hint:`Lägg Number( ... ) runt document.querySelector('#a').value, och likadant för b.`},{type:`web`,js:!0,prompt:"Skriv ett skript som räknar ut hur gammal man är om tio år. Läs `#alder` när man klickar på `#visa`, gör om till ett tal och visa `Om tio år är du 22 år.` i `#svar` när fältet innehåller 12.",actions:[{q:`#alder`,value:`12`},{q:`#visa`}],starter:`<label for="alder">Din ålder</label>
<input id="alder" type="number">
<button id="visa">Visa</button>
<p id="svar"></p>
<script>

<\/script>
`,checks:[{q:`#svar`,text:`^Om tio år är du 22 år\\.$`,msg:`Med 12 i fältet visas Om tio år är du 22 år.`}],solution:`<label for="alder">Din ålder</label>
<input id="alder" type="number">
<button id="visa">Visa</button>
<p id="svar"></p>
<script>
  function visa() {
    const alder = Number(document.querySelector('#alder').value);
    document.querySelector('#svar').textContent = 'Om tio år är du ' + (alder + 10) + ' år.';
  }
  document.querySelector('#visa').addEventListener('click', visa);
<\/script>
`,explain:`Även ett fält med type="number" ger text i value. Number behövs ändå, annars blir det 1210.`,hint:`Räkna i en parentes: 'Om tio år är du ' + (alder + 10) + ' år.'`},{type:`web`,js:!0,prompt:"En biobiljett kostar 85 kr. När man klickar på `#rakna` ska `#pris` visa vad det kostar för antalet i `#antal`, till exempel `Att betala: 340 kr` för 4 biljetter.",actions:[{q:`#antal`,value:`4`},{q:`#rakna`}],starter:`<h2>Biobiljetter</h2>
<label for="antal">Antal biljetter</label>
<input id="antal" type="number" value="1">
<button id="rakna">Räkna ut</button>
<p id="pris"></p>
<script>
  const biljettpris = 85;

<\/script>
`,checks:[{q:`#pris`,text:`^Att betala: 340 kr$`,msg:`Med 4 biljetter visas Att betala: 340 kr`}],solution:`<h2>Biobiljetter</h2>
<label for="antal">Antal biljetter</label>
<input id="antal" type="number" value="1">
<button id="rakna">Räkna ut</button>
<p id="pris"></p>
<script>
  const biljettpris = 85;
  function raknaPris() {
    const antal = Number(document.querySelector('#antal').value);
    document.querySelector('#pris').textContent = 'Att betala: ' + (antal * biljettpris) + ' kr';
  }
  document.querySelector('#rakna').addEventListener('click', raknaPris);
<\/script>
`,explain:`Priset ligger i en const högst upp. Höjs biljettpriset ändrar du bara den raden.`,hint:`Läs antalet med Number(...), multiplicera med biljettpris och visa 'Att betala: ' + ... + ' kr'.`}]},{id:`web-js-style`,title:`Ändra utseende med klasser`,tier:3,text:`JavaScript kan ändra hur sidan ser ut. Det enklaste och snyggaste sättet är att låta **CSS** beskriva utseendet i klasser och låta JavaScript bara slå på och av klasserna. Då ligger all design på ett ställe.

Varje element har en \`classList\`:

- \`el.classList.add('mork')\` lägger till klassen.
- \`el.classList.remove('mork')\` tar bort den.
- \`el.classList.toggle('mork')\` växlar: lägger till om den saknas, tar bort om den finns.

Klassnamnet skrivs **utan** punkt här. Punkten hör bara till CSS-väljaren.

Med en klass som \`.dold { display: none; }\` kan du gömma och visa saker, till exempel svaret på en gåta eller en meny på mobilen. Med en klass för mörka färger gör du en knapp för mörkt läge. Precis så fungerar det på många riktiga webbplatser.`,example:y(`
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
<\/script>`),exercises:[{type:`choice`,prompt:"Rutan har redan klassen `mork`. Vad gör raden?",code:`ruta.classList.toggle('mork');`,options:[`Lägger till klassen en gång till`,`Tar bort klassen mork`,`Ingenting, toggle kan bara lägga till`],answer:1,explain:`toggle växlar. Finns klassen tas den bort, saknas den läggs den till. Därför passar toggle för en knapp som byter fram och tillbaka.`,why:{0:`Ett element kan inte ha samma klass två gånger, och toggle tar bort när klassen redan finns.`,2:`Det är add som bara lägger till. toggle tar bort när klassen finns.`}},{type:`order`,prompt:"Ordna raderna: CSS-regeln för `.dold` först, sedan knappen, sedan det gömda svaret och sist skriptet som visar svaret vid klick.",lines:[`<style>`,`  .dold { display: none; }`,`</style>`,`<button id="visa">Visa svaret</button>`,`<p id="svar" class="dold">Svaret är 42.</p>`,`<script>`,`  function visaSvar() {`,`    document.querySelector('#svar').classList.remove('dold');`,`  }`,`  document.querySelector('#visa').addEventListener('click', visaSvar);`,`<\/script>`],distractors:[{line:`    document.querySelector('#svar').classList.remove('.dold');`,why:`I classList skrivs klassnamnet utan punkt. Punkten hör bara till CSS-väljaren.`}],explain:`CSS gömmer stycket från början. Vid klick tar skriptet bort klassen, och då gäller inte display: none längre.`,hint:`Stilen överst, sedan HTML, sist skriptet.`},{type:`web`,js:!0,prompt:"Stilen `.mork` finns redan. När man klickar på `#tema` ska `#sida` få klassen `mork` med `classList`.",actions:[{q:`#tema`}],starter:`<style>
  .sida { padding: 16px; border-radius: 12px; }
  .mork { background: #1f1d2b; color: #f4f1ff; }
</style>
<div class="sida" id="sida">
  <h2>Nattläge</h2>
  <p>Skonsamt för ögonen på kvällen.</p>
  <button id="tema">Mörkt läge</button>
</div>
<script>

<\/script>
`,checks:[{q:`#sida.mork`,msg:`Efter klick har #sida klassen mork`},{source:`class="sida" id="sida"`,msg:`Klassen läggs till av skriptet, inte i HTML`}],solution:`<style>
  .sida { padding: 16px; border-radius: 12px; }
  .mork { background: #1f1d2b; color: #f4f1ff; }
</style>
<div class="sida" id="sida">
  <h2>Nattläge</h2>
  <p>Skonsamt för ögonen på kvällen.</p>
  <button id="tema">Mörkt läge</button>
</div>
<script>
  function morkLage() {
    document.querySelector('#sida').classList.add('mork');
  }
  document.querySelector('#tema').addEventListener('click', morkLage);
<\/script>
`,explain:`Färgerna står i CSS, och JavaScript säger bara när de ska gälla.`,hint:`I funktionen: document.querySelector('#sida').classList.add('mork');`},{type:`web`,js:!0,prompt:"Den här rutan börjar i mörkt läge. Gör så att ett klick på `#ljus` tar bort klassen `mork` från `#sida`.",actions:[{q:`#ljus`}],starter:`<style>
  .sida { padding: 16px; border-radius: 12px; }
  .mork { background: #1f1d2b; color: #f4f1ff; }
</style>
<div class="sida mork" id="sida">
  <p>Klicka för ljust läge.</p>
  <button id="ljus">Ljust läge</button>
</div>
<script>

<\/script>
`,checks:[{q:`#sida`,msg:`Rutan #sida finns kvar`},{q:`#sida.mork`,invert:!0,msg:`Efter klick har #sida inte längre klassen mork`}],solution:`<style>
  .sida { padding: 16px; border-radius: 12px; }
  .mork { background: #1f1d2b; color: #f4f1ff; }
</style>
<div class="sida mork" id="sida">
  <p>Klicka för ljust läge.</p>
  <button id="ljus">Ljust läge</button>
</div>
<script>
  function ljustLage() {
    document.querySelector('#sida').classList.remove('mork');
  }
  document.querySelector('#ljus').addEventListener('click', ljustLage);
<\/script>
`,explain:`remove tar bara bort mork. Klassen sida finns kvar, så rutan behåller sin padding och sina rundade hörn.`,hint:`classList.remove('mork') i en funktion som kopplas till #ljus.`},{type:`web`,js:!0,prompt:"Ingredienslistan är gömd med klassen `dold`. Gör så att knappen `#visa` växlar klassen med `classList.toggle`, så att samma knapp både visar och gömmer listan. Kodstig klickar tre gånger, och då ska listan synas.",actions:[{q:`#visa`},{q:`#visa`},{q:`#visa`}],starter:`<style>
  .dold { display: none; }
</style>
<h2>Pannkakor</h2>
<button id="visa">Visa ingredienser</button>
<ul id="ingredienser" class="dold">
  <li>3 dl vetemjöl</li>
  <li>6 dl mjölk</li>
  <li>3 ägg</li>
</ul>
<script>

<\/script>
`,checks:[{q:`#ingredienser`,msg:`Listan finns`},{q:`#ingredienser.dold`,invert:!0,msg:`Efter tre klick syns listan`},{source:`classList\\.toggle`,msg:`Du använder classList.toggle`}],solution:`<style>
  .dold { display: none; }
</style>
<h2>Pannkakor</h2>
<button id="visa">Visa ingredienser</button>
<ul id="ingredienser" class="dold">
  <li>3 dl vetemjöl</li>
  <li>6 dl mjölk</li>
  <li>3 ägg</li>
</ul>
<script>
  function vaxla() {
    document.querySelector('#ingredienser').classList.toggle('dold');
  }
  document.querySelector('#visa').addEventListener('click', vaxla);
<\/script>
`,explain:`Klick ett visar, klick två gömmer och klick tre visar igen. Med toggle behöver du inte hålla reda på läget själv.`,hint:`document.querySelector('#ingredienser').classList.toggle('dold'); i en funktion.`},{type:`web`,js:!0,prompt:"Gör en knapp för större text. Skriv först en CSS-regel `.stor` med en större `font-size`. Gör sedan så att ett klick på `#storre` lägger till klassen `stor` på stycket `#text`.",actions:[{q:`#storre`}],starter:`<style>

</style>
<button id="storre">Större text</button>
<p id="text">Det här stycket ska gå att läsa även utan glasögon.</p>
<script>

<\/script>
`,checks:[{css:`.stor`,prop:`font-size`,msg:`Regeln .stor har en font-size`},{q:`#text.stor`,msg:`Efter klick har #text klassen stor`}],solution:`<style>
  .stor { font-size: 1.5rem; }
</style>
<button id="storre">Större text</button>
<p id="text">Det här stycket ska gå att läsa även utan glasögon.</p>
<script>
  function storreText() {
    document.querySelector('#text').classList.add('stor');
  }
  document.querySelector('#storre').addEventListener('click', storreText);
<\/script>
`,explain:`CSS och JavaScript samarbetar: regeln beskriver hur stor texten är, och skriptet bestämmer när den gäller.`,hint:`Skriv .stor { font-size: 1.5rem; } i style och classList.add('stor') i skriptet.`}]},{id:`web-js-list`,title:`Listor från arrayer`,tier:3,text:"En **array** är en lista med värden: `const varor = ['Mjölk', 'Bröd', 'Ägg'];`. `varor.length` är hur många det är, `varor[0]` är det första och `varor.push('Ost')` lägger till ett nytt sist.\n\nMed `for (const vara of varor) { ... }` körs koden inuti en gång för varje värde. Variabeln `vara` får ett nytt värde varje varv.\n\nFör att visa varje värde på sidan skapar du nya element:\n\n1. `const li = document.createElement('li');` skapar ett tomt li.\n2. `li.textContent = vara;` fyller i texten.\n3. `lista.append(li);` lägger in det sist i listan på sidan.\n\nVarför inte skriva alla `<li>` för hand? För att data ofta kommer någon annanstans ifrån, som en sökning eller det användaren skriver. Med en loop fungerar samma kod oavsett om arrayen har 3 eller 300 värden.",example:y(`
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
<\/script>`),exercises:[{type:`choice`,prompt:"Hur många `li` hamnar i listan?",code:`const djur = ['katt', 'hund'];
djur.push('häst');
for (const d of djur) {
  const li = document.createElement('li');
  li.textContent = d;
  lista.append(li);
}`,options:[`2`,`Inga, eftersom li inte står i HTML-koden`,`3`],answer:2,explain:`push lägger till häst, så arrayen har tre värden. Loopen skapar och lägger till ett li per värde.`,why:{0:`push lägger till ett tredje värde innan loopen börjar.`,1:`createElement skapar elementen och append lägger in dem på sidan. De behöver inte finnas i HTML-koden.`}},{type:`order`,prompt:`Ordna raderna: en tom lista, sedan ett skript som hittar listan, skapar arrayen med färger och gör ett li för varje färg. Skapa li, fyll i texten och lägg till det i listan, i den ordningen.`,lines:[`<ul id="lista"></ul>`,`<script>`,`  const lista = document.querySelector('#lista');`,`  const farger = ['röd', 'grön', 'blå'];`,`  for (const farg of farger) {`,`    const li = document.createElement('li');`,`    li.textContent = farg;`,`    lista.append(li);`,`  }`,`<\/script>`],alt:[[`<ul id="lista"></ul>`,`<script>`,`  const farger = ['röd', 'grön', 'blå'];`,`  const lista = document.querySelector('#lista');`,`  for (const farg of farger) {`,`    const li = document.createElement('li');`,`    li.textContent = farg;`,`    lista.append(li);`,`  }`,`<\/script>`]],distractors:[{line:`  for (const farg in farger) {`,why:`for...in går igenom platserna 0, 1, 2. För själva värdena använder du for...of.`}],explain:`Loopen gör samma tre steg för varje färg: skapa ett li, fyll i texten och lägg in det i listan.`,hint:`Inuti loopen: createElement, textContent, append.`},{type:`web`,js:!0,prompt:"Bygg inköpslistan från arrayen `varor`. Gå igenom arrayen med `for...of`, skapa ett `li` för varje vara med `document.createElement` och lägg in det i `#inkop`. Skriv inga `li` i HTML-koden.",starter:`<h2>Att handla</h2>
<ul id="inkop"></ul>
<script>
  const varor = ['Mjölk', 'Bröd', 'Ägg', 'Kaffe'];
  const lista = document.querySelector('#inkop');

<\/script>
`,checks:[{q:`#inkop li`,min:4,max:4,msg:`Listan har fyra li`},{q:`#inkop li`,text:`^Kaffe$`,msg:`Kaffe finns med i listan`},{source:`createElement`,msg:`Du skapar li med document.createElement`}],solution:`<h2>Att handla</h2>
<ul id="inkop"></ul>
<script>
  const varor = ['Mjölk', 'Bröd', 'Ägg', 'Kaffe'];
  const lista = document.querySelector('#inkop');
  for (const vara of varor) {
    const li = document.createElement('li');
    li.textContent = vara;
    lista.append(li);
  }
<\/script>
`,explain:`Lägg till en vara i arrayen, så dyker den upp i listan utan att du rör HTML-koden.`,hint:`for (const vara of varor) { const li = document.createElement('li'); li.textContent = vara; lista.append(li); }`},{type:`web`,js:!0,prompt:"Visa varje poäng som ett `li` i `#poang`, och räkna samtidigt ihop dem i loopen med en `let`-variabel. Visa sedan `Totalt: 60` i `#summa`.",starter:`<h2>Veckans poäng</h2>
<ul id="poang"></ul>
<p id="summa"></p>
<script>
  const poang = [10, 20, 30];
  const lista = document.querySelector('#poang');

<\/script>
`,checks:[{q:`#poang li`,min:3,max:3,msg:`Listan har tre li`},{q:`#poang li`,text:`^20$`,msg:`Poängen 20 finns i listan`},{q:`#summa`,text:`^Totalt: 60$`,msg:`Stycket visar Totalt: 60`}],solution:`<h2>Veckans poäng</h2>
<ul id="poang"></ul>
<p id="summa"></p>
<script>
  const poang = [10, 20, 30];
  const lista = document.querySelector('#poang');
  let summa = 0;
  for (const p of poang) {
    const li = document.createElement('li');
    li.textContent = p;
    lista.append(li);
    summa = summa + p;
  }
  document.querySelector('#summa').textContent = 'Totalt: ' + summa;
<\/script>
`,explain:`summa skapas före loopen, växer i varje varv och visas efter loopen. Samma mönster räknar ihop en kundvagn eller en budget.`,hint:`let summa = 0; före loopen, summa = summa + p; inuti, och visa summan efter loopen.`},{type:`web`,js:!0,prompt:"Listan blir bara ett enda `li` i stället för tre. Hitta felet och rätta det, så att alla tre lag syns i `#lag`.",starter:`<h2>Lag i turneringen</h2>
<ul id="lag"></ul>
<script>
  const lagnamn = ['Blixtarna', 'Ugglorna', 'Vågorna'];
  const lista = document.querySelector('#lag');
  const li = document.createElement('li');
  for (const namn of lagnamn) {
    li.textContent = namn;
    lista.append(li);
  }
<\/script>
`,checks:[{q:`#lag li`,min:3,max:3,msg:`Listan har tre li`},{q:`#lag li`,text:`^Blixtarna$`,msg:`Blixtarna finns med`}],solution:`<h2>Lag i turneringen</h2>
<ul id="lag"></ul>
<script>
  const lagnamn = ['Blixtarna', 'Ugglorna', 'Vågorna'];
  const lista = document.querySelector('#lag');
  for (const namn of lagnamn) {
    const li = document.createElement('li');
    li.textContent = namn;
    lista.append(li);
  }
<\/script>
`,explain:`Det fanns bara ett li, som fick ny text och flyttades varje varv. Skapas li inuti loopen blir det ett nytt för varje lag.`,hint:`Var skapas li? Det behövs ett nytt li i varje varv.`},{type:`web`,js:!0,prompt:"Gör så att man kan lägga till saker själv. När man klickar på `#lagg-till` ska ett nytt `li` med texten från fältet `#ny` läggas till sist i `#lista`. Kodstig lägger till Bananer och sedan Ost.",actions:[{q:`#ny`,value:`Bananer`},{q:`#lagg-till`},{q:`#ny`,value:`Ost`},{q:`#lagg-till`}],starter:`<label for="ny">Ny sak</label>
<input id="ny">
<button id="lagg-till">Lägg till</button>
<ul id="lista"></ul>
<script>

<\/script>
`,checks:[{q:`#lista li`,min:2,max:2,msg:`Listan har två li efter två klick`},{q:`#lista li:last-child`,text:`^Ost$`,msg:`Ost ligger sist`}],solution:`<label for="ny">Ny sak</label>
<input id="ny">
<button id="lagg-till">Lägg till</button>
<ul id="lista"></ul>
<script>
  function laggTill() {
    const li = document.createElement('li');
    li.textContent = document.querySelector('#ny').value;
    document.querySelector('#lista').append(li);
  }
  document.querySelector('#lagg-till').addEventListener('click', laggTill);
<\/script>
`,explain:`Varje klick skapar ett nytt li. Det här är kärnan i alla att göra-listor du har använt.`,hint:`I klickfunktionen: createElement, textContent från fältets value och append till #lista.`}]},{id:`web-js-project`,title:`Miniprojekt: lista och tärning`,tier:5,text:"Nu bygger du två små appar med allt från kapitlet: en inköpslista där man kan bocka av varor, och ett tärningsspel.\n\nEn nyhet: en funktion kan skrivas **inuti** en annan funktion. I inköpslistan skapar du en liten funktion `bocka` för varje ny vara. Den kommer ihåg just sitt eget `li`, så klick på en vara bockar bara av den varan.\n\nFör slump finns `Math.random()`, som ger ett tal från 0 till strax under 1. Ett tärningsslag får du med `Math.floor(Math.random() * 6) + 1`: gånger 6 ger 0 till 5,99, `Math.floor` avrundar nedåt till 0 till 5, och plus 1 ger 1 till 6. Samma knep väljer ett slumpat värde ur en array: `lista[Math.floor(Math.random() * lista.length)]`.\n\nEftersom slumpen ger nya värden varje gång kontrollerar Kodstig bara att resultatet ser rätt ut, till exempel att det står Du slog och ett tal från 1 till 6.",example:y(`
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
<\/script>`),exercises:[{type:`web`,js:!0,prompt:"Del 1: Inköpslistan. När man klickar på `#lagg-till` ska varan i `#vara` bli ett nytt `li` i `#lista`. Räkna varorna med en `let`-variabel och visa `Varor: 3` i `#antal` efter tre varor. Töm fältet efter varje vara med `falt.value = '';`.",actions:[{q:`#vara`,value:`Mjölk`},{q:`#lagg-till`},{q:`#vara`,value:`Bröd`},{q:`#lagg-till`},{q:`#vara`,value:`Ägg`},{q:`#lagg-till`}],starter:b+`<script>
  // Hitta fältet, listan och antal-stycket
  // Skriv funktionen laggTill och koppla den till knappen

<\/script>
`,checks:[{q:`#lista li`,min:3,max:3,msg:`Listan har tre varor`},{q:`#lista li`,text:`^Bröd$`,msg:`Bröd finns i listan`},{q:`#antal`,text:`^Varor: 3$`,msg:`Stycket visar Varor: 3`}],solution:b+x,explain:`Listan växer vid varje klick och räknaren följer med. Att tömma fältet gör det snabbt att skriva nästa vara.`,hint:`Mönstret från förra lektionen plus en räknare: antal = antal + 1; och sedan antalText.textContent = 'Varor: ' + antal;`},{type:`web`,js:!0,prompt:"Del 2: Bocka av. Klassen `.klar` stryker över text. Inuti `laggTill`, skriv en funktion `bocka` som växlar klassen `klar` på just det nya `li`, och koppla den till klick på `li`. Kodstig lägger till två varor och klickar sedan på den första.",actions:[{q:`#vara`,value:`Mjölk`},{q:`#lagg-till`},{q:`#vara`,value:`Bröd`},{q:`#lagg-till`},{q:`#lista li`}],starter:b+x,checks:[{q:`#lista li`,min:2,max:2,msg:`Listan har två varor`},{q:`#lista li.klar`,min:1,max:1,msg:`Precis en vara är avbockad`},{q:`#lista li:first-child.klar`,msg:`Det är den klickade varan som är avbockad`}],solution:b+S,explain:`Varje li fick sin egen bocka-funktion som minns just det li:t. Klicka igen, så tar toggle bort strecket.`,hint:`Efter li.textContent: function bocka() { li.classList.toggle('klar'); } och li.addEventListener('click', bocka);`},{type:`web`,js:!0,prompt:"Del 3: Tärningen. När man klickar på `#sla` ska `#resultat` visa `Du slog` och ett slumpat tal från 1 till 6, till exempel `Du slog 4`. Varje slag ska också läggas till som ett `li` med bara talet i `#historik`. Kodstig slår fem gånger.",actions:[{q:`#sla`},{q:`#sla`},{q:`#sla`},{q:`#sla`},{q:`#sla`}],starter:C+`<script>

<\/script>
`,checks:[{q:`#resultat`,text:`^Du slog [1-6]$`,msg:`Resultatet är Du slog och ett tal från 1 till 6`},{q:`#historik li`,min:5,max:5,msg:`Historiken har fem slag`},{q:`#historik li`,text:`^[1-6]$`,msg:`Historiken visar tal från 1 till 6`},{source:`Math\\.random`,msg:`Du använder Math.random`}],solution:C+`<script>
  const historik = document.querySelector('#historik');
  function sla() {
    const tarning = Math.floor(Math.random() * 6) + 1;
    document.querySelector('#resultat').textContent = 'Du slog ' + tarning;
    const li = document.createElement('li');
    li.textContent = tarning;
    historik.append(li);
  }
  document.querySelector('#sla').addEventListener('click', sla);
<\/script>
`,explain:`Klicka själv några gånger i förhandsvisningen. Historiken visar att alla sex sidor dyker upp förr eller senare.`,hint:`const tarning = Math.floor(Math.random() * 6) + 1; och sedan samma createElement-mönster som i listan.`},{type:`web`,js:!0,prompt:"Del 4: Vem gör vad? Skapa en array med minst fyra sysslor, till exempel Diska och Vattna blommorna. När man klickar på `#slumpa` ska `#syssla` visa `Dagens syssla: ` följt av en slumpad syssla ur arrayen.",actions:[{q:`#slumpa`}],starter:w+`<script>

<\/script>
`,checks:[{q:`#syssla`,text:`^Dagens syssla: \\S`,msg:`Stycket visar Dagens syssla: och en syssla`},{source:`\\[\\s*(['"][^'"]+['"]\\s*,\\s*){3,}['"][^'"]+['"]\\s*,?\\s*\\]`,msg:`Det finns en array med minst fyra sysslor`},{source:`Math\\.random\\(\\)\\s*\\*\\s*\\w+\\.length`,msg:`Du slumpar en plats med Math.random() * arrayens length`}],solution:w+`<script>
  const sysslor = ['Diska', 'Dammsuga', 'Vattna blommorna', 'Gå ut med soporna'];
  function slumpa() {
    const plats = Math.floor(Math.random() * sysslor.length);
    document.querySelector('#syssla').textContent = 'Dagens syssla: ' + sysslor[plats];
  }
  document.querySelector('#slumpa').addEventListener('click', slumpa);
<\/script>
`,explain:`Med sysslor.length i stället för 4 fungerar koden även när du lägger till fler sysslor. Samma knep slumpar fram en fråga i ett quiz eller ett lag i en turnering.`,hint:`const plats = Math.floor(Math.random() * sysslor.length); och sedan sysslor[plats].`}]}]}],E={id:`web`,name:`HTML/CSS`,lang:`web`,chapters:[{id:`web1`,title:`Ge sidan innehåll`,lessons:[{id:`web-headings`,title:`Rubriker och stycken`,tier:1,text:"HTML beskriver vad innehållet **är**. Det skrivs med taggar: `<h1>` är en huvudrubrik och `<p>` ett stycke text.\n\nDe flesta taggar har en start och ett slut: `<p>Text</p>`. Rubriker finns i nivåer från `<h1>` (viktigast) till `<h6>`.",example:`<!-- 1. Huvudrubrik och stycke -->
<h1>Min första sida</h1>
<p>Det här är ett stycke.</p>
<!-- 2. Underrubrik och stycke -->
<h2>Om mig</h2>
<p>Jag lär mig HTML.</p>`,exercises:[{type:`choice`,prompt:`Vilken tagg används för sidans huvudrubrik?`,options:[`<p>`,`<h1>`,`<head>`],answer:1,why:{0:`<p> är ett vanligt stycke text, inte en rubrik. Rubriker har taggar som börjar på h följt av en siffra.`,2:`<head> låter som huvud, men den rymmer sidans osynliga information som titel och teckenkodning, inget som syns på sidan.`},explain:`<h1> är den viktigaste rubriken. <head> är något helt annat: sidans osynliga information.`},{type:`choice`,prompt:`Hur avslutas ett stycke?`,options:[`</p>`,`<p/>`,`<end>`],answer:0,why:{1:`<p/> ser ut som ett slut, men så skrivs bara tomma element i vissa andra språk. I HTML har sluttaggen snedstrecket före namnet.`,2:`Det finns ingen tagg som heter <end>. Sluttaggen upprepar alltid namnet på starttaggen.`},explain:`Sluttaggen har ett snedstreck före namnet.`},{type:`fill`,prompt:`Fyll i sluttaggen.`,code:`<h2>Om mig___`,answers:[[`</h2>`]],explain:`Sluttaggen måste ha samma namn som starttaggen.`},{type:`web`,prompt:"Skapa en sida med en `h1` som innehåller ditt namn (eller ett påhittat), och två stycken (`p`) om något du gillar.",starter:`<!-- Skriv din HTML här -->
`,checks:[{q:`h1`,min:1,max:1,msg:`Sidan har exakt en h1`},{q:`h1`,text:`\\S`,msg:`Rubriken har text`},{q:`p`,min:2,msg:`Sidan har minst två stycken (p)`}],solution:`<h1>Milo</h1>
<p>Jag gillar bambu.</p>
<p>Jag gillar också att koda.</p>`,explain:`En h1 per sida gör det tydligt vad sidan handlar om, både för läsare och skärmläsare.`,hint:`Skriv <h1>Namn</h1> och sedan två <p>...</p>.`}]},{id:`web-links`,title:`Länkar`,tier:1,text:'En länk skrivs med `<a>`. Adressen står i **attributet** `href`: `<a href="https://example.com">Läs mer</a>`.\n\nLänktexten ska berätta vart länken leder. ”Klicka här” säger ingenting för den som hoppar mellan länkar med en skärmläsare.',example:`<p>Läs mer på <a href="https://sv.wikipedia.org">Wikipedia</a>.</p>`,exercises:[{type:`choice`,prompt:`I vilket attribut står länkens adress?`,options:[`src`,`href`,`link`],answer:1,why:{0:`src används för att hämta in något på sidan, som en bild. En länk pekar vidare till en annan sida och använder ett annat attribut.`,2:`link är ett eget element i <head>, inte ett attribut. Adressen för en länk står i ett attribut på <a>.`},explain:`href står för hypertext reference.`},{type:`choice`,prompt:`Vilken länktext är mest begriplig?`,options:[`Klicka här`,`Läs mer om pandor`,`Länk`],answer:1,why:{0:`”Klicka här” säger inte vart man hamnar. Den som hoppar mellan länkar med skärmläsare hör bara texten utan sammanhang.`,2:`”Länk” berättar bara att det är en länk, vilket man redan vet. Texten ska beskriva målet.`},explain:`Bra länktext beskriver målet även när den läses ensam.`},{type:`fill`,prompt:`Fyll i attributet så att länken fungerar.`,code:`<a ___="https://example.com">Exempelsidan</a>`,answers:[[`href`]],explain:`Attribut skrivs i starttaggen: namn="värde".`},{type:`web`,prompt:"Skapa ett stycke med en länk till `https://sv.wikipedia.org/wiki/Jättepanda` med länktexten `Läs om jättepandor`.",starter:`<p>
  
</p>
`,checks:[{q:`p a`,min:1,msg:`Länken ligger i ett stycke`},{q:`a`,attr:`href`,re:`^https://sv\\.wikipedia\\.org/wiki/J`,msg:`Länken går till Wikipedia-sidan`},{q:`a`,text:`jättepandor`,msg:`Länktexten berättar vart länken leder`}],solution:`<p>
  <a href="https://sv.wikipedia.org/wiki/Jättepanda">Läs om jättepandor</a>
</p>`,explain:`Länken har både en tydlig text och en fullständig adress.`,hint:`<a href="adress">text</a>`}]},{id:`web-lists`,title:`Listor`,tier:1,text:"`<ul>` är en punktlista och `<ol>` en numrerad lista. Varje punkt skrivs med `<li>`.\n\nAnvänd `<ol>` när ordningen spelar roll, som i ett recept, och `<ul>` annars.",example:`<!-- 1. Punktlista -->
<h2>Att packa</h2>
<ul>
  <li>Vattenflaska</li>
  <li>Matsäck</li>
</ul>
<!-- 2. Numrerad lista -->
<h2>Så gör du</h2>
<ol>
  <li>Koka vatten</li>
  <li>Häll upp teet</li>
</ol>`,exercises:[{type:`choice`,prompt:`Vilken lista passar för stegen i ett recept?`,options:[`<ul>`,`<ol>`,`<li>`],answer:1,why:{0:`<ul> är en punktlista utan ordning. I ett recept måste stegen göras i en viss följd.`,2:`<li> är en enskild punkt, inte själva listan. Punkterna behöver ligga i en lista som visar om ordningen spelar roll.`},explain:`I ett recept spelar ordningen roll, så en numrerad lista passar.`},{type:`choice`,prompt:`Vilken tagg används för varje punkt i en lista?`,options:[`<li>`,`<item>`,`<p>`],answer:0,why:{1:`Taggnamnen i HTML är förkortningar och <item> finns inte. Tänk på vad ”list item” blir förkortat.`,2:`<p> är ett stycke text. Punkter i en lista har en egen tagg som hör ihop med <ul> och <ol>.`},explain:`li betyder list item.`},{type:`fill`,prompt:`Fyll i taggen för en punktlista.`,code:`<___>
  <li>Sol</li>
  <li>Bad</li>
</ul>`,answers:[[`ul`]],explain:`ul står för unordered list.`},{type:`web`,prompt:`Gör en numrerad lista med tre steg för att göra en smörgås.`,starter:`<h2>Smörgås</h2>
`,checks:[{q:`ol`,min:1,msg:`Det finns en numrerad lista (ol)`},{q:`ol > li`,min:3,msg:`Listan har minst tre punkter`}],solution:`<h2>Smörgås</h2>
<ol>
  <li>Ta fram brödet</li>
  <li>Bred på smör</li>
  <li>Lägg på pålägg</li>
</ol>`,explain:`Listpunkterna ligger direkt i ol, så webbläsaren numrerar dem.`,hint:`<ol> med tre <li> inuti.`}]},{id:`web-images`,title:`Bilder och alt-text`,tier:1,text:"`<img>` visar en bild. Den har ingen sluttagg. `src` är bildens adress och `alt` en kort beskrivning.\n\nAlt-texten läses upp av skärmläsare och visas om bilden inte laddas. Beskriv vad bilden visar, inte att det är en bild.",example:`<img src="https://picsum.photos/id/237/200/150" alt="En svart valp som tittar upp">`,exercises:[{type:`choice`,prompt:`Vilken alt-text är bäst för en bild på en panda som äter?`,options:[`bild`,`panda.jpg`,`En panda som tuggar på bambu`],answer:2,why:{0:`”bild” berättar bara att det är en bild, vilket skärmläsaren redan säger. Alt-texten ska beskriva vad bilden visar.`,1:`Ett filnamn säger inget till den som inte ser bilden. Beskriv innehållet med vanliga ord.`},explain:`Alt-texten ska ge samma information som bilden.`},{type:`fill`,prompt:`Lägg till attributet för bildens beskrivning.`,code:`<img src="panda.jpg" ___="En panda som vinkar">`,answers:[[`alt`]],explain:`alt står för alternativ text.`},{type:`web`,prompt:"Lägg in en bild från `https://picsum.photos/id/1025/200/150` med en beskrivande alt-text (den visar en hund i en filt).",starter:``,checks:[{q:`img`,attr:`src`,re:`picsum\\.photos`,msg:`Bilden har rätt src`},{q:`img`,attr:`alt`,re:`\\S{3,}`,msg:`Bilden har en beskrivande alt-text`}],solution:`<img src="https://picsum.photos/id/1025/200/150" alt="En hund insvept i en filt">`,explain:`Både src och alt behövs för en tillgänglig bild.`,hint:`<img src="..." alt="...">`}]}]},{id:`web2`,title:`Gör sidan till din`,lessons:[{id:`web-css`,title:`Din första CSS`,tier:1,text:"CSS bestämmer hur sidan ser ut. Du kan skriva CSS i ett `<style>`-block.\n\nEn regel består av en **väljare** och **deklarationer**: `h1 { color: purple; }`. Egenskap och värde skiljs med kolon, och varje deklaration avslutas med semikolon.",example:`<style>
  /* 1. Färg på rubriken */
  h1 { color: purple; }
  /* 2. Storlek på texten */
  p { font-size: 18px; }
</style>
<!-- 3. Innehållet -->
<h1>Hej!</h1>
<p>Nu med stil.</p>`,exercises:[{type:`choice`,prompt:"Vad är väljaren i `p { color: gray; }`?",options:[`p`,`color`,`gray`],answer:0,why:{1:`color är en egenskap, alltså vad som ändras. Väljaren står först och talar om vilka element som påverkas.`,2:`gray är värdet på egenskapen. Väljaren är det som står före klamrarna.`},explain:`Väljaren talar om vilka element regeln gäller.`},{type:`choice`,prompt:`Vilket tecken avslutar en deklaration?`,options:[`,`,`;`,`.`],answer:1,why:{0:`Komma används för att räkna upp flera värden eller väljare, inte för att avsluta en deklaration.`,2:`Punkt används i CSS för klassväljare, inte för att avsluta en deklaration.`},explain:`Semikolon skiljer deklarationerna åt.`},{type:`fill`,prompt:`Fyll i tecknet mellan egenskap och värde.`,code:`<style>
  h1 { color___ teal; }
</style>`,answers:[[`:`]],explain:`Kolon står mellan egenskapen och värdet.`},{type:`web`,prompt:"Ge alla `h1` färgen `purple` och alla stycken textstorleken `18px`.",starter:`<style>

</style>
<h1>Rubrik</h1>
<p>Text</p>
`,checks:[{css:`h1`,prop:`color`,re:`purple`,msg:`h1 har color: purple`},{css:`p`,prop:`font-size`,re:`^18px$`,msg:`p har font-size: 18px`},{balanced:!0,msg:`Alla klamrar är stängda`}],solution:`<style>
  h1 { color: purple; }
  p { font-size: 18px; }
</style>
<h1>Rubrik</h1>
<p>Text</p>`,explain:`Två regler, en per väljare.`,hint:`h1 { color: purple; } och p { font-size: 18px; }`}]},{id:`web-colors`,title:`Färger`,tier:1,text:"Färger kan skrivas som namn (`teal`), hexkoder (`#6b4fbb`) eller `rgb(107, 79, 187)`.\n\n`color` är textfärgen och `background-color` bakgrunden. Se till att kontrasten är tillräcklig så att texten går att läsa.",example:`<style>
  /* 1. Bakgrund på sidan */
  body { background-color: #f6f2ff; }
  /* 2. Färg på rubriken */
  h1 { color: #4b2e9a; }
</style>
<!-- 3. Rubriken -->
<h1>Lavendel</h1>`,exercises:[{type:`choice`,prompt:`Vilken egenskap ändrar bakgrundsfärgen?`,options:[`color`,`background-color`,`fill`],answer:1,why:{0:`color ändrar textens färg, inte bakgrunden. Bakgrunden har en egen egenskap.`,2:`fill används för att färga SVG-figurer, inte bakgrunden på vanliga HTML-element.`},explain:`color gäller texten.`},{type:`choice`,prompt:`Vilken kombination är svårast att läsa?`,options:[`Svart text på vitt`,`Ljusgrå text på vitt`,`Vit text på mörklila`],answer:1,why:{0:`Svart på vitt har mycket hög kontrast och är lätt att läsa. Leta efter färger som ligger nära varandra i ljushet.`,2:`Vit text på en mörk färg ger stor skillnad i ljushet, så den är lätt att läsa.`},explain:`Ljusgrått mot vitt har för låg kontrast.`},{type:`fill`,prompt:`Ge stycket en mörkblå textfärg.`,code:`<style>
  p { ___: #1f3a8a; }
</style>
<p>Text</p>`,answers:[[`color`]],explain:`color sätter textens färg.`},{type:`web`,prompt:"Ge `body` bakgrunden `#fff8e7` och `h1` textfärgen `#7a3e00`.",starter:`<style>

</style>
<h1>Solsken</h1>
`,checks:[{css:`body`,prop:`background-color`,re:`#fff8e7`,msg:`body har bakgrunden #fff8e7`},{css:`h1`,prop:`color`,re:`#7a3e00`,msg:`h1 har färgen #7a3e00`}],solution:`<style>
  body { background-color: #fff8e7; }
  h1 { color: #7a3e00; }
</style>
<h1>Solsken</h1>`,explain:`Mörkbrun text på ljus bakgrund ger god kontrast.`,hint:`Använd background-color på body och color på h1.`}]},{id:`web-classes`,title:`Klasser`,tier:1,text:'En **klass** låter dig styla utvalda element. I HTML: `class="viktig"`. I CSS skrivs klassväljaren med punkt: `.viktig { ... }`.\n\nSamma klass kan användas på många element, och ett element kan ha flera klasser: `class="kort stor"`.',example:`<style>
  /* 1. Stil för klassen */
  .viktig { color: crimson; font-weight: bold; }
</style>
<!-- 2. Text utan och med klass -->
<p>Vanlig text.</p>
<p class="viktig">Viktig text!</p>`,exercises:[{type:`choice`,prompt:"Hur skrivs en väljare för klassen `kort` i CSS?",options:[`#kort`,`.kort`,`kort`],answer:1,why:{0:`# används för id, som bara får finnas en gång på sidan. Klasser har ett annat tecken.`,2:`Utan tecken framför väljer CSS ett element med det taggnamnet, och det finns ingen tagg som heter kort.`},explain:`Punkt betyder klass. # betyder id.`},{type:`choice`,prompt:`Hur många element kan ha samma klass?`,options:[`Ett`,`Hur många som helst`,`Högst tre`],answer:1,why:{0:`Det är id som bara får finnas en gång. En klass är tänkt att delas av många element.`,2:`Det finns ingen gräns för hur många element som kan dela en klass. Det är just det som gör dem användbara.`},explain:`Klasser är gjorda för att återanvändas.`},{type:`fill`,prompt:`Fyll i attributet som ger stycket klassen tips.`,code:`<p ___="tips">Spara ofta!</p>`,answers:[[`class`]],explain:`class-attributet kopplar elementet till CSS-regeln.`},{type:`web`,prompt:"Ge de två styckena klassen `tips` och skapa en regel för `.tips` med bakgrundsfärgen `#eef6ff`.",starter:`<style>

</style>
<p>Spara ofta.</p>
<p>Testa små steg.</p>
<p>Vanlig text.</p>
`,checks:[{q:`p.tips`,min:2,msg:`Två stycken har klassen tips`},{q:`p:not(.tips)`,min:1,msg:`Det sista stycket är fortfarande vanligt`},{css:`.tips`,prop:`background-color`,re:`#eef6ff`,msg:`.tips har bakgrundsfärgen #eef6ff`}],solution:`<style>
  .tips { background-color: #eef6ff; }
</style>
<p class="tips">Spara ofta.</p>
<p class="tips">Testa små steg.</p>
<p>Vanlig text.</p>`,explain:`Klassen gör att bara de utvalda styckena påverkas.`,hint:`class="tips" i HTML och .tips { ... } i CSS.`}]},{id:`web-spacing`,title:`Avstånd: margin och padding`,tier:1,text:"`padding` är luften **inuti** ett element, mellan innehållet och kanten. `margin` är avståndet **utanför**, till andra element.\n\nMed ett värde gäller det alla sidor: `padding: 16px;`. Med två värden: först upp/ner, sedan vänster/höger.",example:`<style>
  /* 1. Padding och margin */
  .ruta { background: #f0e9ff; padding: 16px; margin: 24px 0; }
</style>
<!-- 2. Två rutor -->
<div class="ruta">Luft runt texten</div>
<div class="ruta">Och avstånd mellan rutorna</div>`,exercises:[{type:`choice`,prompt:`Vilken egenskap ger luft mellan texten och elementets egen kant?`,options:[`margin`,`padding`,`gap`],answer:1,why:{0:`margin ger luft utanför kanten, alltså mot andra element. Frågan gäller luften innanför.`,2:`gap ger avstånd mellan barnen i flex och grid, inte mellan texten och elementets egen kant.`},explain:`Padding ligger innanför kanten.`},{type:`fill`,prompt:`Ge rutan 20px avstånd till andra element.`,code:`<style>
  .ruta { ___: 20px; }
</style>`,answers:[[`margin`]],explain:`Margin är avståndet utanför elementet.`},{type:`web`,prompt:"Ge `.kort` en padding på `16px` och en margin-bottom på `12px`.",starter:`<style>
  .kort { background: #f0e9ff; }
</style>
<div class="kort">Ett</div>
<div class="kort">Två</div>
`,checks:[{css:`.kort`,prop:`padding`,re:`^16px$`,msg:`.kort har padding: 16px`},{css:`.kort`,prop:`margin-bottom`,re:`^12px$`,msg:`.kort har margin-bottom: 12px`}],solution:`<style>
  .kort { background: #f0e9ff; padding: 16px; margin-bottom: 12px; }
</style>
<div class="kort">Ett</div>
<div class="kort">Två</div>`,explain:`Padding ger luft inuti, margin skapar avstånd mellan korten.`,hint:`Lägg till padding: 16px; och margin-bottom: 12px; i regeln.`}]}]},{id:`web3`,title:`Bygg en liten profil`,lessons:[{id:`web-fonts`,title:`Typsnitt och textstorlek`,tier:1,text:"`font-family` väljer typsnitt. Ange alltid en reserv sist, till exempel `sans-serif`.\n\n`font-size` styr storleken och `line-height` radavståndet. För brödtext är ett radavstånd runt `1.5` lätt att läsa.",example:`<style>
  /* 1. Typsnitt och radavstånd */
  body { font-family: Georgia, serif; line-height: 1.6; }
  /* 2. Rubrikens storlek */
  h1 { font-size: 32px; }
</style>
<!-- 3. Rubrik och text -->
<h1>Läsbar text</h1>
<p>Lagom radavstånd gör långa stycken lättare att följa.</p>`,exercises:[{type:`choice`,prompt:"Varför skrivs `sans-serif` sist i `font-family: Inter, sans-serif;`?",options:[`Det är snyggast`,`Som reserv om första typsnittet saknas`,`Det krävs alltid exakt två`],answer:1,why:{0:`Ordningen handlar inte om utseende. Webbläsaren går igenom listan från vänster och tar det första som finns.`,2:`Listan kan vara hur lång som helst. Det sista typsnittet är där för säkerhets skull.`},explain:`Webbläsaren tar första typsnittet som finns.`},{type:`choice`,prompt:`Vilket radavstånd passar bäst för långa stycken?`,options:[`line-height: 0.8`,`line-height: 1.5`,`line-height: 4`],answer:1,why:{0:`Under 1 hamnar raderna så tätt att bokstäverna kan krocka. Långa stycken behöver mer luft.`,2:`Med 4 blir avståndet så stort att ögat tappar bort vilken rad som kommer härnäst.`},explain:`Runt 1.5 ger luft utan att raderna tappar sammanhang.`},{type:`fill`,prompt:`Sätt radavståndet till 1.5.`,code:`<style>
  p { ___: 1.5; }
</style>`,answers:[[`line-height`]],explain:`line-height styr radavståndet.`},{type:`web`,prompt:"Ge `body` typsnittet `system-ui, sans-serif` och radavståndet `1.5`, och gör `h1` `36px` stor.",starter:`<style>

</style>
<h1>Profil</h1>
<p>Lite text om mig.</p>
`,checks:[{css:`body`,prop:`font-family`,re:`sans-serif`,msg:`body har ett typsnitt med reserv (sans-serif)`},{css:`body`,prop:`line-height`,re:`^1\\.5$`,msg:`body har line-height: 1.5`},{css:`h1`,prop:`font-size`,re:`^36px$`,msg:`h1 har font-size: 36px`}],solution:`<style>
  body { font-family: system-ui, sans-serif; line-height: 1.5; }
  h1 { font-size: 36px; }
</style>
<h1>Profil</h1>
<p>Lite text om mig.</p>`,explain:`Typografin på body ärvs av alla element på sidan.`,hint:`Tre deklarationer: font-family, line-height och font-size.`}]},{id:`web-borders`,title:`Kanter och rundade hörn`,tier:1,text:"`border` skrivs med tre delar: tjocklek, stil och färg, till exempel `border: 2px solid #6b4fbb;`.\n\n`border-radius` rundar hörnen. `50%` på en kvadrat ger en cirkel.",example:`<style>
  /* 1. Kant med runda hörn */
  .ram { border: 2px solid #6b4fbb; border-radius: 12px; padding: 12px; }
  /* 2. Cirkel */
  .rund { width: 60px; height: 60px; background: #ffd6e7; border-radius: 50%; }
</style>
<!-- 3. Rutorna -->
<div class="ram">Mjuka hörn</div>
<div class="rund"></div>`,exercises:[{type:`choice`,prompt:"Vad saknas i `border: 2px #333;`?",options:[`Stilen, till exempel solid`,`Bredden`,`Ingenting`],answer:0,why:{1:`2px är bredden, så den finns redan med. Titta efter vilken av de tre delarna som saknas.`,2:`En kant behöver bredd, stil och färg. Utan stil ritas ingen kant alls.`},explain:`Utan stil syns ingen kant.`},{type:`choice`,prompt:`Hur gör man en kvadratisk bild rund?`,options:[`border: round;`,`border-radius: 50%;`,`shape: circle;`],answer:1,why:{0:`round är inget giltigt värde för border. Runda hörn styrs av en egen egenskap.`,2:`shape finns inte som egenskap i CSS. Hörnen rundas med en egenskap som har med kanten att göra.`},explain:`50 % radie på alla hörn blir en cirkel.`},{type:`fill`,prompt:`Runda hörnen med 8px.`,code:`<style>
  .knapp { ___: 8px; }
</style>`,answers:[[`border-radius`]],explain:`border-radius styr hörnens rundning.`},{type:`web`,prompt:"Ge `.avatar` en kant på `3px solid #6b4fbb` och gör den rund med `border-radius: 50%`.",starter:`<style>
  .avatar { width: 80px; height: 80px; background: #e8defc; }
</style>
<div class="avatar"></div>
`,checks:[{css:`.avatar`,prop:`border`,re:`3px\\s+solid\\s+#6b4fbb`,msg:`.avatar har border: 3px solid #6b4fbb`},{css:`.avatar`,prop:`border-radius`,re:`^50%$`,msg:`.avatar har border-radius: 50%`}],solution:`<style>
  .avatar { width: 80px; height: 80px; background: #e8defc; border: 3px solid #6b4fbb; border-radius: 50%; }
</style>
<div class="avatar"></div>`,explain:`Kant och rundning tillsammans ger en tydlig profilbild.`,hint:`Lägg till border och border-radius i .avatar-regeln.`}]},{id:`web-box`,title:`Boxmodellen`,tier:2,text:"Varje element är en låda: **innehåll**, sedan **padding**, sedan **border** och sist **margin**.\n\nSom standard läggs padding och border **till** på bredden. Med `box-sizing: border-box;` räknas de in i `width`, vilket gör layouter lättare att förutse.",example:`<style>
  /* 1. Utan border-box */
  .a { width: 200px; padding: 20px; border: 5px solid #6b4fbb; }
  /* 2. Med border-box */
  .b { width: 200px; padding: 20px; border: 5px solid #2f9e7a; box-sizing: border-box; }
</style>
<!-- 3. Jämför bredderna -->
<div class="a">250px bred</div>
<div class="b">200px bred</div>`,exercises:[{type:`choice`,prompt:"Hur bred blir lådan? `width: 100px; padding: 10px; border: 2px solid;` (utan border-box)",options:[`100px`,`124px`,`112px`],answer:1,why:{0:`Utan border-box är width bara innehållets bredd. Padding och kant läggs till på båda sidor.`,2:`Här räknas padding och kant bara på ena sidan. De finns både till vänster och höger.`},explain:`100 + 10 + 10 + 2 + 2 = 124.`},{type:`choice`,prompt:"Hur bred blir samma låda med `box-sizing: border-box;`?",options:[`100px`,`124px`,`76px`],answer:0,why:{1:`Det blir bredden utan border-box. Med border-box räknas padding och kant in i width.`,2:`76px är bredden som blir kvar till innehållet. Själva lådan blir så bred som width säger.`},explain:`Med border-box ryms padding och border inom de 100 pixlarna.`},{type:`fill`,prompt:`Fyll i värdet så att padding räknas in i bredden.`,code:`<style>
  * { box-sizing: ___; }
</style>`,answers:[[`border-box`]],explain:`Många sätter detta på alla element med * för att få förutsägbara bredder.`},{type:`web`,prompt:"Gör så att `.panel` blir exakt 300px bred totalt trots padding och kant, genom att lägga till rätt box-sizing.",starter:`<style>
  .panel { width: 300px; padding: 24px; border: 4px solid #6b4fbb; }
</style>
<div class="panel">Panel</div>
`,checks:[{css:`.panel`,prop:`box-sizing`,re:`border-box`,msg:`.panel använder box-sizing: border-box`},{css:`.panel`,prop:`width`,re:`^300px$`,msg:`Bredden är fortfarande 300px`}],solution:`<style>
  .panel { width: 300px; padding: 24px; border: 4px solid #6b4fbb; box-sizing: border-box; }
</style>
<div class="panel">Panel</div>`,explain:`Nu är 300px den faktiska bredden, och innehållet krymper i stället.`,hint:`Lägg till box-sizing: border-box; i regeln.`}]},{id:`web-profile`,title:`Ett profilkort`,tier:2,text:`Nu kombinerar du det du kan: rubriker, bild, text, klasser, avstånd, kanter och typografi.

Börja med strukturen i HTML, och lägg sedan på CSS steg för steg. Ändra en sak i taget och titta på förhandsvisningen.`,example:`<style>
  /* 1. Kortets ram */
  .profil { max-width: 260px; padding: 16px; border-radius: 16px; background: #f6f2ff; text-align: center; }
  /* 2. Rund bild */
  .profil img { border-radius: 50%; }
</style>
<!-- 3. Kortets innehåll -->
<div class="profil">
  <img src="https://picsum.photos/id/64/96/96" alt="Porträtt av en person med glasögon">
  <h2>Ada</h2>
  <p>Gillar matte och maskiner.</p>
</div>`,exercises:[{type:`choice`,prompt:"Vad väljer väljaren `.profil img`?",options:[`Alla bilder på sidan`,`Bilder som ligger inuti ett element med klassen profil`,`Element som har både klassen profil och är en bild`],answer:1,why:{0:`Utan .profil skulle regeln gälla alla bilder. Mellanslaget gör att bara bilder inuti träffas.`,2:`Det skulle skrivas utan mellanslag, som img.profil. Mellanslaget betyder att det ena ligger inuti det andra.`},explain:`Mellanslaget betyder ”inuti”.`},{type:`fill`,prompt:`Centrera texten i kortet.`,code:`<style>
  .profil { text-align: ___; }
</style>`,answers:[[`center`]],explain:`text-align: center centrerar text och inline-innehåll.`},{type:`web`,prompt:"Bygg ett profilkort: en `div` med klassen `profil` som innehåller en bild med alt-text, en `h2` och ett stycke. Ge `.profil` padding, en bakgrundsfärg och `border-radius`.",starter:`<style>

</style>
`,checks:[{q:`.profil`,min:1,msg:`Det finns ett element med klassen profil`},{q:`.profil img[alt]`,min:1,msg:`Kortet har en bild med alt-text`},{q:`.profil h2`,min:1,msg:`Kortet har en h2`},{q:`.profil p`,min:1,msg:`Kortet har ett stycke`},{css:`.profil`,prop:`padding`,msg:`.profil har padding`},{css:`.profil`,prop:`border-radius`,msg:`.profil har rundade hörn`},{css:`.profil`,prop:`background(-color)?`,msg:`.profil har en bakgrundsfärg`}],solution:`<style>
  .profil { padding: 16px; background-color: #f6f2ff; border-radius: 16px; }
</style>
<div class="profil">
  <img src="https://picsum.photos/id/64/96/96" alt="Porträtt av en person">
  <h2>Ada</h2>
  <p>Gillar matte.</p>
</div>`,explain:`Strukturen och stilen hålls isär: HTML säger vad, CSS säger hur.`,hint:`Bygg HTML-delen först, och lägg sedan till tre deklarationer i .profil.`}]}]},{id:`web4`,title:`Layout som håller`,lessons:[{id:`web-flex`,title:`Flexbox`,tier:2,text:"`display: flex;` lägger barnen på en rad. `gap` ger avstånd mellan dem.\n\n`justify-content` fördelar dem längs raden och `align-items` placerar dem på tvären. `flex-wrap: wrap;` låter dem bryta till nästa rad när platsen tar slut.",example:`<style>
  /* 1. Gör en flexrad */
  .rad { display: flex; gap: 12px; justify-content: space-between; align-items: center; }
  /* 2. Stil på barnen */
  .rad div { background: #f0e9ff; padding: 12px; }
</style>
<!-- 3. Raden med tre barn -->
<div class="rad"><div>Ett</div><div>Två</div><div>Tre</div></div>`,exercises:[{type:`choice`,prompt:`Vilken egenskap ger avstånd mellan flex-barnen?`,options:[`margin-between`,`gap`,`space`],answer:1,why:{0:`margin-between finns inte i CSS. Avståndet mellan barnen sätts på föräldern med en kort egenskap.`,2:`space är ingen egenskap i CSS. Egenskapen har ett namn som betyder mellanrum.`},explain:`gap fungerar i både flex och grid.`},{type:`choice`,prompt:"Vad gör `flex-wrap: wrap;`?",options:[`Barnen krymper`,`Barnen får bryta till nästa rad`,`Raden döljs`],answer:1,why:{0:`wrap betyder ombrytning, inte krympning. Barnen behåller sin storlek och flyttar ner när platsen tar slut.`,2:`Inget döljs med wrap. Det handlar om att barnen får fler rader att fördela sig på.`},explain:`Utan wrap trängs alla barnen ihop på en rad.`},{type:`fill`,prompt:`Gör menyn till en flex-container.`,code:`<style>
  .meny { display: ___; }
</style>`,answers:[[`flex`]],explain:`display: flex gör barnen till flex-element.`},{type:`web`,prompt:"Gör `.meny` till en flex-rad med `gap: 16px` och centrera länkarna vertikalt med `align-items: center`.",starter:`<style>
  .meny a { padding: 8px; }
</style>
<nav class="meny">
  <a href="#">Hem</a>
  <a href="#">Lektioner</a>
  <a href="#">Om</a>
</nav>
`,checks:[{css:`.meny`,prop:`display`,re:`flex`,msg:`.meny har display: flex`},{css:`.meny`,prop:`gap`,re:`16px`,msg:`.meny har gap: 16px`},{css:`.meny`,prop:`align-items`,re:`center`,msg:`.meny har align-items: center`}],solution:`<style>
  .meny { display: flex; gap: 16px; align-items: center; }
  .meny a { padding: 8px; }
</style>
<nav class="meny">
  <a href="#">Hem</a>
  <a href="#">Lektioner</a>
  <a href="#">Om</a>
</nav>`,explain:`Flexbox gör enradiga layouter som menyer enkla.`,hint:`Tre deklarationer i en ny .meny-regel.`}]},{id:`web-grid`,title:`Grid`,tier:4,text:"`display: grid;` gör ett rutnät. `grid-template-columns` bestämmer kolumnerna: `1fr 1fr 1fr` ger tre lika breda.\n\nMed `repeat(auto-fit, minmax(160px, 1fr))` får du så många kolumner som får plats, var och en minst 160px. Det är ett vanligt sätt att göra galleriet responsivt utan media queries.",example:`<style>
  /* 1. Rutnät med kolumner */
  .galleri { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; }
  /* 2. Stil på rutorna */
  .galleri div { background: #f0e9ff; padding: 24px; }
</style>
<!-- 3. Galleriet -->
<div class="galleri"><div>1</div><div>2</div><div>3</div><div>4</div></div>`,exercises:[{type:`choice`,prompt:"Vad betyder `grid-template-columns: 2fr 1fr;`?",options:[`Två kolumner där den första är dubbelt så bred`,`Tre kolumner`,`Två kolumner på 2px och 1px`],answer:0,why:{1:`Varje värde i listan blir en kolumn, och här finns två värden. fr är en enhet, inte en egen kolumn.`,2:`fr är inte pixlar. Det är en andel av det lediga utrymmet.`},explain:`fr är en andel av det lediga utrymmet.`},{type:`fill`,prompt:`Gör tre lika breda kolumner.`,code:`<style>
  .rutnät { display: grid; grid-template-columns: ___(3, 1fr); }
</style>`,answers:[[`repeat`]],explain:`repeat(3, 1fr) är samma sak som 1fr 1fr 1fr.`},{type:`web`,prompt:"Gör `.galleri` till ett grid med tre lika breda kolumner och `gap: 12px`.",starter:`<style>
  .galleri div { background: #f0e9ff; padding: 20px; }
</style>
<div class="galleri">
  <div>A</div><div>B</div><div>C</div>
  <div>D</div><div>E</div><div>F</div>
</div>
`,checks:[{css:`.galleri`,prop:`display`,re:`grid`,msg:`.galleri har display: grid`},{css:`.galleri`,prop:`grid-template-columns`,re:`(1fr\\s+1fr\\s+1fr|repeat\\(\\s*3\\s*,\\s*1fr\\s*\\))`,msg:`Tre lika breda kolumner`},{css:`.galleri`,prop:`gap`,re:`12px`,msg:`gap: 12px`}],solution:`<style>
  .galleri { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .galleri div { background: #f0e9ff; padding: 20px; }
</style>
<div class="galleri">
  <div>A</div><div>B</div><div>C</div>
  <div>D</div><div>E</div><div>F</div>
</div>`,explain:`Grid placerar automatiskt barnen i rader och kolumner.`,hint:`display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;`},{type:`web`,prompt:"Gör galleriet responsivt med `repeat(auto-fit, minmax(140px, 1fr))` så att antalet kolumner anpassar sig efter bredden.",starter:`<style>
  .galleri { display: grid; gap: 12px; }
  .galleri div { background: #f0e9ff; padding: 20px; }
</style>
<div class="galleri">
  <div>A</div><div>B</div><div>C</div><div>D</div>
</div>
`,checks:[{css:`.galleri`,prop:`grid-template-columns`,re:`repeat\\(\\s*auto-(fit|fill)\\s*,\\s*minmax\\(\\s*140px\\s*,\\s*1fr\\s*\\)\\s*\\)`,msg:`Kolumnerna använder repeat(auto-fit, minmax(140px, 1fr))`}],solution:`<style>
  .galleri { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
  .galleri div { background: #f0e9ff; padding: 20px; }
</style>
<div class="galleri">
  <div>A</div><div>B</div><div>C</div><div>D</div>
</div>`,explain:`Kolumnerna blir aldrig smalare än 140px och fyller ut resten av raden.`,hint:`Lägg till grid-template-columns i .galleri-regeln.`}]},{id:`web-responsive`,title:`Responsiv design med media queries`,tier:4,text:"En **media query** gör att regler bara gäller vid vissa skärmbredder: `@media (max-width: 600px) { ... }`.\n\nEtt robust arbetssätt är att börja med mobilen och lägga till mer layout när skärmen blir bredare med `min-width`. Glöm inte `max-width: 100%` på bilder så att de aldrig blir bredare än sin behållare.",example:`<style>
  /* 1. En kolumn som grund */
  .kolumner { display: grid; gap: 12px; }
  /* 2. Två kolumner på bred skärm */
  @media (min-width: 600px) {
    .kolumner { grid-template-columns: 1fr 1fr; }
  }
  /* 3. Bilder som krymper */
  img { max-width: 100%; height: auto; }
</style>
<!-- 4. Kolumnerna -->
<div class="kolumner"><div>Vänster</div><div>Höger</div></div>`,exercises:[{type:`choice`,prompt:"När gäller reglerna i `@media (min-width: 700px)`?",options:[`När skärmen är minst 700px bred`,`När skärmen är högst 700px bred`,`Alltid`],answer:0,why:{1:`Det skulle vara max-width. min-width betyder att skärmen måste vara minst så bred.`,2:`Reglerna i en media query gäller bara när villkoret i parentesen är uppfyllt.`},explain:`min-width betyder ”från och med denna bredd”.`},{type:`choice`,prompt:`Vad hindrar en stor bild från att bli bredare än sin behållare?`,options:[`width: 9999px;`,`max-width: 100%;`,`overflow: auto;`],answer:1,why:{0:`En fast och jättestor bredd gör bilden bredare än nästan alla skärmar. Tänk på en övre gräns i stället.`,2:`overflow: auto ger en rullningslist när innehållet inte får plats, men bilden blir lika stor ändå.`},explain:`max-width: 100% låter bilden krympa men aldrig växa förbi behållaren.`},{type:`fill`,prompt:`Fyll i så att regeln gäller från 800px och uppåt.`,code:`<style>
  @media (___: 800px) {
    .meny { display: flex; }
  }
</style>`,answers:[[`min-width`]],explain:`min-width används när man bygger mobil först.`},{type:`web`,prompt:"Låt `.kort-rad` vara en kolumn på mobil. Lägg till en media query för `min-width: 600px` där `.kort-rad` får `display: flex`. Ge också `img` regeln `max-width: 100%`.",starter:`<style>
  .kort-rad { display: block; }
</style>
<div class="kort-rad">
  <div>Kort 1</div>
  <div>Kort 2</div>
</div>
<img src="https://picsum.photos/id/10/1200/400" alt="Skog vid en sjö">
`,checks:[{media:!0,re:`min-width:\\s*600px`,msg:`Det finns en media query för min-width: 600px`},{css:`.kort-rad`,prop:`display`,re:`flex`,inMedia:!0,msg:`.kort-rad blir flex i media queryn`},{css:`img`,prop:`max-width`,re:`100%`,msg:`img har max-width: 100%`}],solution:`<style>
  .kort-rad { display: block; }
  @media (min-width: 600px) {
    .kort-rad { display: flex; }
  }
  img { max-width: 100%; }
</style>
<div class="kort-rad">
  <div>Kort 1</div>
  <div>Kort 2</div>
</div>
<img src="https://picsum.photos/id/10/1200/400" alt="Skog vid en sjö">`,explain:`Mobil först: grundregeln gäller alltid, och media queryn lägger till layout på bredare skärmar.`,hint:`@media (min-width: 600px) { .kort-rad { display: flex; } } och img { max-width: 100%; }`}]},{id:`web-overflow`,title:`Felsök för breda layouter`,tier:4,text:"Om sidan går att skrolla i sidled på mobilen är något bredare än skärmen. Vanliga orsaker: fasta bredder som `width: 800px`, bilder utan `max-width`, långa ord eller länkar som inte bryts.\n\nByt fasta bredder mot `max-width`, ge bilder `max-width: 100%` och låt långa ord brytas med `overflow-wrap: anywhere`.",example:`<style>
  /* 1. Begränsa bredden */
  .ruta { max-width: 600px; padding: 16px; background: #f0e9ff; }
  /* 2. Bryt långa ord */
  .lång { overflow-wrap: anywhere; }
</style>
<!-- 3. Rutan med lång adress -->
<div class="ruta"><p class="lång">https://example.com/en/mycket/lång/adress/som/annars/skulle/sticka/ut</p></div>`,exercises:[{type:`choice`,prompt:`Vilken regel orsakar troligast sidledsskroll på en mobil?`,options:[`.ruta { max-width: 600px; }`,`.ruta { width: 900px; }`,`.ruta { padding: 8px; }`],answer:1,why:{0:`max-width sätter en övre gräns men får rutan att krympa på smala skärmar, så den orsakar inte skroll.`,2:`Lite padding gör bara rutan något större. Leta efter en regel som tvingar fram en bredd som är större än skärmen.`},explain:`En fast bredd på 900px är bredare än de flesta mobilskärmar.`},{type:`fill`,prompt:`Byt ut den fasta bredden mot en övre gräns.`,code:`<style>
  .innehåll { ___: 700px; }
</style>`,answers:[[`max-width`]],explain:`max-width låter elementet krympa på små skärmar.`},{type:`web`,prompt:"Rätta layouten så att den inte blir för bred: byt `width: 900px` mot `max-width: 900px` i `.sida`, ge `img` `max-width: 100%` och låt `.adress` brytas med `overflow-wrap: anywhere`.",starter:`<style>
  .sida { width: 900px; background: #f6f2ff; }
</style>
<div class="sida">
  <img src="https://picsum.photos/id/1018/1400/500" alt="Berg i dimma">
  <p class="adress">https://example.com/en-valdigt-lang-adress-utan-mellanslag-som-inte-bryts</p>
</div>
`,checks:[{css:`.sida`,prop:`max-width`,re:`900px`,msg:`.sida använder max-width i stället för width`},{source:`\\.sida\\s*\\{[^}]*(^|[^-])width\\s*:\\s*900px`,flags:`i`,msg:`Den fasta bredden finns kvar`,invert:!0},{css:`img`,prop:`max-width`,re:`100%`,msg:`img har max-width: 100%`},{css:`.adress`,prop:`overflow-wrap`,re:`anywhere|break-word`,msg:`.adress får brytas`}],solution:`<style>
  .sida { max-width: 900px; background: #f6f2ff; }
  img { max-width: 100%; }
  .adress { overflow-wrap: anywhere; }
</style>
<div class="sida">
  <img src="https://picsum.photos/id/1018/1400/500" alt="Berg i dimma">
  <p class="adress">https://example.com/en-valdigt-lang-adress-utan-mellanslag-som-inte-bryts</p>
</div>`,explain:`Alla tre orsakerna till sidledsskroll är åtgärdade.`,hint:`Tre ändringar: max-width på .sida, max-width på img och overflow-wrap på .adress.`}]}]},{id:`web5`,title:`Struktur & användbarhet`,lessons:[{id:`web-semantic`,title:`Semantisk HTML`,tier:3,text:"**Semantiska** element beskriver vad delarna av sidan är: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>` och `<footer>`.\n\nDe ser ut som vanliga `<div>` men hjälper skärmläsare, sökmotorer och dig själv att förstå strukturen. En sida har ett `<main>`.",example:`<!-- 1. Sidhuvud och meny -->
<header><h1>Kodstig</h1></header>
<nav><a href="#">Hem</a> <a href="#">Om</a></nav>
<!-- 2. Huvudinnehåll -->
<main>
  <article>
    <h2>Dagens lektion</h2>
    <p>Semantisk HTML.</p>
  </article>
</main>
<!-- 3. Sidfot -->
<footer><p>© Kodstig</p></footer>`,exercises:[{type:`choice`,prompt:`Vilket element passar för sidans huvudinnehåll?`,options:[`<div>`,`<main>`,`<section>`],answer:1,why:{0:`<div> fungerar, men säger ingenting om vad innehållet är. Det finns ett element som just betyder huvudinnehåll.`,2:`<section> är en del av sidan med eget tema, och det kan finnas många. Huvudinnehållet har ett eget element.`},explain:`main markerar det unika huvudinnehållet, och det finns bara ett per sida.`},{type:`choice`,prompt:`Vilket element passar för en grupp navigeringslänkar?`,options:[`<nav>`,`<links>`,`<menu-bar>`],answer:0,why:{1:`<links> finns inte i HTML. Elementet för navigering har ett kort namn som kommer från navigation.`,2:`<menu-bar> är inget HTML-element. Påhittade taggar har ingen betydelse för webbläsare eller skärmläsare.`},explain:`nav finns i HTML just för navigering.`},{type:`fill`,prompt:`Byt div mot rätt semantiskt element för sidfoten.`,code:`<___>
  <p>Kontakt: hej@example.com</p>
</footer>`,answers:[[`footer`]],explain:`footer innehåller sidfotsinformation.`},{type:`web`,prompt:"Bygg sidans skelett: en `header` med en `h1`, en `nav` med två länkar, ett `main` med en `article` som har en `h2`, och en `footer`.",starter:``,checks:[{q:`header h1`,min:1,msg:`header innehåller en h1`},{q:`nav a`,min:2,msg:`nav har minst två länkar`},{q:`main`,min:1,max:1,msg:`Det finns exakt ett main`},{q:`main article h2`,min:1,msg:`main innehåller en article med h2`},{q:`footer`,min:1,msg:`Det finns en footer`}],solution:`<header><h1>Min blogg</h1></header>
<nav><a href="#">Hem</a> <a href="#">Arkiv</a></nav>
<main>
  <article>
    <h2>Första inlägget</h2>
    <p>Hej!</p>
  </article>
</main>
<footer><p>Tack för besöket</p></footer>`,explain:`Strukturen går nu att förstå även utan CSS.`,hint:`Börja uppifrån: header, nav, main (med article) och footer.`}]},{id:`web-forms`,title:`Formulär och etiketter`,tier:3,text:'Formulär byggs med `<form>`, `<input>`, `<textarea>` och `<button>`. Varje fält behöver en **etikett**: `<label for="namn">Namn</label>` kopplas till `<input id="namn">`.\n\nEtiketten läses upp av skärmläsare och gör klickytan större. Rätt `type`, som `email`, ger dessutom rätt tangentbord på mobilen.',example:`<form>
  <!-- 1. Etikett och fält -->
  <label for="epost">E-post</label>
  <input id="epost" type="email" name="epost" required>
  <!-- 2. Skicka-knapp -->
  <button type="submit">Skicka</button>
</form>`,exercises:[{type:`choice`,prompt:`Hur kopplas en label till ett input?`,options:[`label-attributet på input`,`for på label matchar id på input`,`De står bredvid varandra`],answer:1,why:{0:`input har inget label-attribut. Kopplingen görs med två attribut som får samma värde, ett på varje element.`,2:`Att de står bredvid varandra räcker inte för en skärmläsare. Kopplingen måste stå i koden.`},explain:`for och id måste ha samma värde.`},{type:`choice`,prompt:`Varför räcker inte bara en placeholder som etikett?`,options:[`Den försvinner när man skriver och läses inte alltid upp`,`Den är för liten`,`Den fungerar bara på mobil`],answer:0,why:{1:`Storleken går att ändra med CSS. Det verkliga problemet är vad som händer när man börjar skriva.`,2:`placeholder fungerar på alla skärmar. Problemet är att texten försvinner och inte alltid läses upp.`},explain:`En riktig label finns kvar och läses upp av hjälpmedel.`},{type:`fill`,prompt:`Fyll i attributet som kopplar etiketten till fältet.`,code:`<label ___="stad">Stad</label>
<input id="stad" name="stad">`,answers:[[`for`]],explain:`for="stad" pekar på fältet med id="stad".`},{type:`web`,prompt:'Skapa ett formulär med ett namnfält och ett e-postfält (`type="email"`). Båda ska ha en kopplad `label`. Avsluta med en skicka-knapp.',starter:`<form>

</form>
`,checks:[{q:`form input`,min:2,msg:`Formuläret har minst två fält`},{q:`input[type="email"]`,min:1,msg:`E-postfältet har type="email"`},{labels:!0,msg:`Alla fält har en kopplad label`},{q:`form button`,min:1,msg:`Formuläret har en knapp`}],solution:`<form>
  <label for="namn">Namn</label>
  <input id="namn" name="namn">
  <label for="epost">E-post</label>
  <input id="epost" type="email" name="epost">
  <button type="submit">Skicka</button>
</form>`,explain:`Kopplade etiketter gör formuläret begripligt för alla.`,hint:`Varje fält: <label for="x">…</label><input id="x">.`}]},{id:`web-focus`,title:`Tangentbordsfokus`,tier:3,text:"Många navigerar med tangentbordet. Med **Tab** flyttas fokus mellan länkar, knappar och fält. Därför måste fokus synas.\n\nTa aldrig bort fokusramen med `outline: none` utan att ersätta den. Använd `:focus-visible` för en tydlig ram som syns för tangentbordsanvändare.",example:`<style>
  /* 1. Synlig fokusram */
  a:focus-visible, button:focus-visible {
    outline: 3px solid #6b4fbb;
    outline-offset: 2px;
  }
</style>
<!-- 2. Saker att tabba till -->
<a href="#">En länk</a>
<button>En knapp</button>`,exercises:[{type:`choice`,prompt:"Vad är problemet med `button { outline: none; }`?",options:[`Knappen blir för stor`,`Tangentbordsanvändare ser inte var fokus är`,`Inget problem`],answer:1,why:{0:`outline påverkar inte storleken, den ritas utanför elementet. Tänk på vem som behöver se ramen.`,2:`Ramen är inte bara pynt. Den visar var man är för den som använder tangentbordet.`},explain:`Utan synligt fokus vet man inte var man är på sidan.`},{type:`choice`,prompt:`Vilket element ska användas för något man klickar på för att utföra en handling?`,options:[`<div onclick>`,`<button>`,`<span>`],answer:1,why:{0:`En div med onclick går inte att nå med Tab och saknar rätt roll för skärmläsare, om man inte lägger till mycket extra kod.`,2:`<span> är bara en behållare för text och saknar både tangentbordsstöd och rätt roll.`},explain:`button går att nå med Tab och aktivera med Enter och mellanslag, helt utan extra kod.`},{type:`fill`,prompt:`Fyll i pseudoklassen som visar fokus vid tangentbordsnavigering.`,code:`<style>
  button:___ { outline: 3px solid #6b4fbb; }
</style>`,answers:[[`focus-visible`]],explain:`:focus-visible visar fokus när det behövs, oftast vid tangentbord.`},{type:`web`,prompt:"Den här sidan tar bort fokusramen. Behåll knappens stil men ta bort `outline: none` och lägg till en tydlig `:focus-visible`-stil med `outline` på `.knapp`.",starter:`<style>
  .knapp { background: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; outline: none; }
</style>
<button class="knapp">Spara</button>
`,checks:[{css:`.knapp:focus-visible`,prop:`outline`,re:`\\d+px`,msg:`.knapp:focus-visible har en synlig outline`},{css:`.knapp`,prop:`background`,msg:`Knappen har kvar sin bakgrund`},{source:`\\.knapp\\s*\\{[^}]*outline\\s*:\\s*none`,flags:`i`,invert:!0,msg:`outline: none är borttaget`}],solution:`<style>
  .knapp { background: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; }
  .knapp:focus-visible { outline: 3px solid #f2c94c; outline-offset: 2px; }
</style>
<button class="knapp">Spara</button>`,explain:`Nu syns det tydligt när knappen har fokus.`,hint:`Ta bort outline: none; och skapa regeln .knapp:focus-visible { outline: 3px solid ...; }.`}]},{id:`web-cascade`,title:`CSS-kaskaden och specificitet`,tier:3,text:"När flera regler gäller samma element avgör **specificiteten** vilken som vinner: id (`#topp`) slår klass (`.kort`), som slår element (`p`). Vid lika specificitet vinner regeln som kommer **sist**.\n\nHåll specificiteten låg med klasser, så blir CSS:en lätt att ändra.",example:`<style>
  /* 1. Tre regler i ordning */
  p { color: gray; }
  .viktig { color: crimson; }
  p { color: navy; }
</style>
<!-- 2. Text som visar vinnaren -->
<p>Blå, eftersom sista p-regeln vinner.</p>
<p class="viktig">Röd, eftersom en klass slår ett element.</p>`,exercises:[{type:`choice`,prompt:`Vilken färg får texten?`,code:`<style>
  .kort { color: green; }
  p { color: red; }
</style>
<p class="kort">Hej</p>`,options:[`Grön`,`Röd`,`Svart`],answer:0,why:{1:`Den röda regeln står sist, men ordningen avgör bara när specificiteten är lika. Klass väger tyngre än element.`,2:`Texten blir svart bara om ingen regel träffar, men här träffar två regler elementet.`},explain:`Klassväljaren är mer specifik än elementväljaren, oavsett ordning.`},{type:`choice`,prompt:`Vilken färg får texten?`,code:`<style>
  .a { color: green; }
  .b { color: purple; }
</style>
<p class="a b">Hej</p>`,options:[`Grön`,`Lila`],answer:1,why:{0:`Båda är klassväljare och väger lika mycket. Då avgör ordningen i CSS:en, inte ordningen i class-attributet.`},explain:`Samma specificitet, så den sista regeln vinner.`},{type:`choice`,prompt:`Vilken väljare har högst specificitet?`,options:[`p`,`.text`,`#intro`],answer:2,why:{0:`En elementväljare är den svagaste sorten. Den träffar många element och väger därför minst.`,1:`En klass väger mer än ett element, men det finns en sorts väljare som väger ännu mer.`},explain:`Id slår klass, som slår element.`},{type:`web`,prompt:"Stycket med klassen `notis` ska bli `darkgreen`, men regeln längre ner skriver över den. Lös det genom att flytta `.notis`-regeln så att den kommer sist (ändra inte till id eller !important).",starter:`<style>
  .notis { color: darkgreen; }
  .text { color: gray; }
</style>
<p class="text notis">Sparat!</p>
`,checks:[{css:`.notis`,prop:`color`,re:`darkgreen`,msg:`.notis har color: darkgreen`},{source:`\\.text\\s*\\{[^}]*\\}[\\s\\S]*\\.notis\\s*\\{`,msg:`.notis-regeln kommer efter .text-regeln`},{source:`!important`,invert:!0,msg:`Lösningen använder inte !important`}],solution:`<style>
  .text { color: gray; }
  .notis { color: darkgreen; }
</style>
<p class="text notis">Sparat!</p>`,explain:`Vid lika specificitet vinner den sista regeln.`,hint:`Byt plats på de två reglerna.`}]}]},{id:`web6`,title:`Komponenter & miniprojekt`,lessons:[{id:`web-components`,title:`Återanvändbara komponenter`,tier:4,text:"En **komponent** är en bit gränssnitt som återkommer: en knapp, ett kort, en notis. Ge den en tydlig basklass, till exempel `.knapp`, och lägg varianter som extra klasser: `.knapp-sekundär`.\n\nDå räcker det att ändra på ett ställe för att alla knappar ska följa med.",example:`<style>
  /* 1. Grundklass för knappar */
  .knapp { display: inline-block; padding: 10px 16px; border-radius: 8px; border: 2px solid #6b4fbb; background: #6b4fbb; color: white; font: inherit; }
  /* 2. Variant som ändrar lite */
  .knapp-sekundär { background: white; color: #6b4fbb; }
</style>
<!-- 3. Knapparna -->
<button class="knapp">Spara</button>
<button class="knapp knapp-sekundär">Avbryt</button>`,exercises:[{type:`choice`,prompt:'Varför är `class="knapp knapp-sekundär"` bättre än en helt separat klass för varje knapp?',options:[`Gemensam stil ligger på ett ställe, varianten ändrar bara det som skiljer`,`Det laddar snabbare`,`Det krävs av HTML`],answer:0,why:{1:`Hastigheten påverkas knappt. Vinsten är att den gemensamma stilen bara finns på ett ställe.`,2:`HTML kräver inte något särskilt sätt att namnge klasser. Det är ett sätt att hålla CSS:en lätt att ändra.`},explain:`Basen och varianterna hålls isär, så ändringar sprider sig rätt.`},{type:`choice`,prompt:`Vilken tagg passar bäst för en knapp som skickar ett formulär?`,options:[`<a>`,`<button>`,`<div>`],answer:1,why:{0:`<a> är för att gå till en annan sida, inte för att skicka formulär. En länk saknar också rätt roll för en handling.`,2:`<div> har inget tangentbordsstöd och ingen roll. Det finns ett element som är byggt för handlingar.`},explain:`button har inbyggt tangentbordsstöd och rätt roll.`},{type:`fill`,prompt:`Ge knappen både basklassen och varianten fara.`,code:`<button class="knapp ___">Radera</button>`,answers:[[`knapp-fara`]],explain:`Flera klasser skiljs åt med mellanslag.`},{type:`web`,prompt:"Skapa en `.notis`-komponent (padding, rundade hörn, bakgrundsfärg) och en variant `.notis-varning` som bara byter bakgrundsfärg. Använd båda på var sitt `div`.",starter:`<style>

</style>
`,checks:[{css:`.notis`,prop:`padding`,msg:`.notis har padding`},{css:`.notis`,prop:`border-radius`,msg:`.notis har rundade hörn`},{css:`.notis`,prop:`background(-color)?`,msg:`.notis har en bakgrundsfärg`},{css:`.notis-varning`,prop:`background(-color)?`,msg:`.notis-varning byter bakgrundsfärg`},{q:`div.notis:not(.notis-varning)`,min:1,msg:`En vanlig notis används`},{q:`div.notis.notis-varning`,min:1,msg:`En varningsnotis har både bas och variant`}],solution:`<style>
  .notis { padding: 12px; border-radius: 8px; background-color: #eef6ff; }
  .notis-varning { background-color: #fff3d6; }
</style>
<div class="notis">Sparat.</div>
<div class="notis notis-varning">Kontrollera e-posten.</div>`,explain:`Varianten ärver allt från basen och ändrar bara färgen.`,hint:`Två regler, och class="notis notis-varning" på den andra rutan.`}]},{id:`web-cards`,title:`Miniprojekt: responsiva produktkort`,tier:5,text:`Nu bygger du en rad produktkort som fungerar från mobil till dator. Du kombinerar semantik, komponenter, grid, responsivitet och tillgänglighet.

Varje kort ska ha bild med alt-text, rubrik, pris och en knapp. Korten ska aldrig orsaka sidledsskroll.`,example:`<style>
  /* 1. Rutnät för korten */
  .produkter { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  /* 2. Stil på varje kort */
  .produkt { padding: 12px; border-radius: 12px; background: #f6f2ff; }
  .produkt img { max-width: 100%; }
</style>
<!-- 3. Ett produktkort -->
<section class="produkter">
  <article class="produkt">
    <img src="https://picsum.photos/id/30/300/200" alt="En vit kaffemugg">
    <h3>Mugg</h3>
    <p>99 kr</p>
    <button>Lägg i varukorg</button>
  </article>
</section>`,exercises:[{type:`web`,prompt:"Del 1: Bygg strukturen. En `section` med klassen `produkter` som innehåller minst tre `article` med klassen `produkt`. Varje artikel har en bild med alt-text, en `h3`, ett pris i ett `p` och en `button`.",starter:`<section class="produkter">

</section>
`,checks:[{q:`section.produkter > article.produkt`,min:3,msg:`Minst tre article.produkt i section.produkter`},{q:`article.produkt img[alt]`,min:3,msg:`Varje produkt har en bild med alt-text`},{q:`article.produkt h3`,min:3,msg:`Varje produkt har en h3`},{q:`article.produkt p`,min:3,msg:`Varje produkt har ett pris`},{q:`article.produkt button`,min:3,msg:`Varje produkt har en knapp`}],solution:`<section class="produkter">
  <article class="produkt"><img src="https://picsum.photos/id/30/300/200" alt="Kaffemugg"><h3>Mugg</h3><p>99 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/300/200" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/292/300/200" alt="Grönsaker"><h3>Låda</h3><p>149 kr</p><button>Köp</button></article>
</section>`,explain:`article passar eftersom varje produkt kan stå på egen hand.`,hint:`Kopiera en article när den första fungerar.`},{type:`web`,prompt:"Del 2: Gör layouten responsiv. Ge `.produkter` `display: grid`, ett `gap` och `grid-template-columns` med `repeat(auto-fit, minmax(...))`. Ge `.produkt img` `max-width: 100%`.",starter:`<style>

</style>
<section class="produkter">
  <article class="produkt"><img src="https://picsum.photos/id/30/600/400" alt="Kaffemugg"><h3>Mugg</h3><p>99 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/600/400" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/292/600/400" alt="Grönsaker"><h3>Låda</h3><p>149 kr</p><button>Köp</button></article>
</section>
`,checks:[{css:`.produkter`,prop:`display`,re:`grid`,msg:`.produkter är ett grid`},{css:`.produkter`,prop:`gap`,msg:`.produkter har gap`},{css:`.produkter`,prop:`grid-template-columns`,re:`repeat\\(\\s*auto-(fit|fill)\\s*,\\s*minmax\\(`,msg:`Kolumnerna använder repeat(auto-fit, minmax(...))`},{css:`.produkt img`,prop:`max-width`,re:`100%`,msg:`Bilderna har max-width: 100%`}],solution:`<style>
  .produkter { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .produkt img { max-width: 100%; }
</style>
<section class="produkter">
  <article class="produkt"><img src="https://picsum.photos/id/30/600/400" alt="Kaffemugg"><h3>Mugg</h3><p>99 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/600/400" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/292/600/400" alt="Grönsaker"><h3>Låda</h3><p>149 kr</p><button>Köp</button></article>
</section>`,explain:`Grid med auto-fit gör att korten fördelar sig själva efter skärmbredden.`,hint:`Fyra deklarationer fördelade på två regler.`},{type:`web`,prompt:"Del 3: Gör korten till en snygg och tillgänglig komponent. Ge `.produkt` padding, rundade hörn och bakgrund. Ge knapparna klassen `knapp` med en egen stil, och en synlig `.knapp:focus-visible` med `outline`.",starter:`<style>
  .produkter { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .produkt img { max-width: 100%; }
</style>
<section class="produkter">
  <article class="produkt"><img src="https://picsum.photos/id/30/600/400" alt="Kaffemugg"><h3>Mugg</h3><p>99 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/600/400" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button>Köp</button></article>
</section>
`,checks:[{css:`.produkt`,prop:`padding`,msg:`.produkt har padding`},{css:`.produkt`,prop:`border-radius`,msg:`.produkt har rundade hörn`},{css:`.produkt`,prop:`background(-color)?`,msg:`.produkt har en bakgrund`},{q:`button.knapp`,min:2,msg:`Knapparna har klassen knapp`},{css:`.knapp`,msg:`Det finns en .knapp-regel`},{css:`.knapp:focus-visible`,prop:`outline`,msg:`.knapp:focus-visible har en outline`}],solution:`<style>
  .produkter { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .produkt { padding: 12px; border-radius: 12px; background: #f6f2ff; }
  .produkt img { max-width: 100%; }
  .knapp { background: #6b4fbb; color: white; border: 0; padding: 8px 14px; border-radius: 8px; }
  .knapp:focus-visible { outline: 3px solid #f2c94c; }
</style>
<section class="produkter">
  <article class="produkt"><img src="https://picsum.photos/id/30/600/400" alt="Kaffemugg"><h3>Mugg</h3><p>99 kr</p><button class="knapp">Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/600/400" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button class="knapp">Köp</button></article>
</section>`,explain:`Komponenten är responsiv, tydlig och går att använda med tangentbord.`,hint:`Lägg till .produkt-stil, klassen knapp på knapparna och två .knapp-regler.`}]},{id:`web-form-project`,title:`Miniprojekt: ett användbart formulär`,tier:5,text:`I sista miniprojektet bygger du ett kontaktformulär som är lätt att fylla i för alla. Det ska ha etiketter, rätt fälttyper, tydliga obligatoriska fält, synligt fokus och en layout som fungerar på mobil.

Tänk på den som använder tangentbord, skärmläsare eller en liten skärm.`,example:`<form class="formular">
  <!-- 1. Etikett och fält -->
  <label for="namn">Namn</label>
  <input id="namn" name="namn" autocomplete="name" required>
  <!-- 2. Skicka-knapp -->
  <button type="submit">Skicka</button>
</form>`,exercises:[{type:`web`,prompt:'Del 1: Bygg ett formulär med klassen `formular` och fälten namn, e-post (`type="email"`) och meddelande (`textarea`). Alla fält ska ha kopplade etiketter, namn och e-post ska vara `required`, och det ska finnas en skicka-knapp med `type="submit"`.',starter:`<form class="formular">

</form>
`,checks:[{q:`form.formular`,min:1,msg:`Formuläret har klassen formular`},{q:`input[type="email"][required]`,min:1,msg:`E-post är type="email" och required`},{q:`input[required]:not([type="email"])`,min:1,msg:`Namnfältet är required`},{q:`textarea`,min:1,msg:`Det finns en textarea för meddelandet`},{labels:!0,msg:`Alla fält har kopplade etiketter`},{q:`button[type="submit"]`,min:1,msg:`Det finns en skicka-knapp`}],solution:`<form class="formular">
  <label for="namn">Namn</label>
  <input id="namn" name="namn" required>
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
  <button type="submit">Skicka</button>
</form>`,explain:`Webbläsaren kan nu själv kontrollera obligatoriska fält och e-postformat.`,hint:`Tre etikett-och-fält-par och en knapp.`},{type:`web`,prompt:'Del 2: Lägg till `autocomplete` på namn (`name`) och e-post (`email`), och en hjälptext under e-postfältet med `id="epost-hjalp"` som kopplas med `aria-describedby="epost-hjalp"`.',starter:`<form class="formular">
  <label for="namn">Namn</label>
  <input id="namn" name="namn" required>
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
  <button type="submit">Skicka</button>
</form>
`,checks:[{q:`#namn`,attr:`autocomplete`,re:`^name$`,msg:`Namnfältet har autocomplete="name"`},{q:`#epost`,attr:`autocomplete`,re:`^email$`,msg:`E-postfältet har autocomplete="email"`},{q:`#epost`,attr:`aria-describedby`,re:`^epost-hjalp$`,msg:`E-postfältet pekar på hjälptexten`},{q:`#epost-hjalp`,text:`\\S`,msg:`Hjälptexten finns och har innehåll`}],solution:`<form class="formular">
  <label for="namn">Namn</label>
  <input id="namn" name="namn" autocomplete="name" required>
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" autocomplete="email" aria-describedby="epost-hjalp" required>
  <p id="epost-hjalp">Vi svarar inom två dagar.</p>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
  <button type="submit">Skicka</button>
</form>`,explain:`autocomplete sparar tid, och hjälptexten läses upp tillsammans med fältet.`,hint:`Lägg till attributen och ett <p id="epost-hjalp"> efter e-postfältet.`},{type:`web`,prompt:"Del 3: Styla formuläret. Gör `.formular` till en kolumn med `display: grid` och `gap`, begränsa bredden med `max-width`, ge fälten `font: inherit` och en `padding`, och ge `input:focus-visible` (eller `textarea:focus-visible`) en tydlig `outline`.",starter:`<style>

</style>
<form class="formular">
  <label for="namn">Namn</label>
  <input id="namn" name="namn" autocomplete="name" required>
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" autocomplete="email" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
  <button type="submit">Skicka</button>
</form>
`,checks:[{css:`.formular`,prop:`display`,re:`grid`,msg:`.formular har display: grid`},{css:`.formular`,prop:`gap`,msg:`.formular har gap`},{css:`.formular`,prop:`max-width`,msg:`.formular har en max-width`},{prop:`font`,re:`inherit`,msg:`Fälten ärver typsnittet med font: inherit`},{source:`(input|textarea)(,\\s*(input|textarea))?\\s*\\{[^}]*padding`,msg:`Fälten har padding`},{source:`(input|textarea):focus-visible[^{]*\\{[^}]*outline\\s*:\\s*\\d`,msg:`Fälten har en tydlig fokusram`}],solution:`<style>
  .formular { display: grid; gap: 8px; max-width: 420px; }
  input, textarea { font: inherit; padding: 8px; }
  input:focus-visible, textarea:focus-visible { outline: 3px solid #6b4fbb; }
</style>
<form class="formular">
  <label for="namn">Namn</label>
  <input id="namn" name="namn" autocomplete="name" required>
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" autocomplete="email" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
  <button type="submit">Skicka</button>
</form>`,explain:`Formuläret är nu läsbart, lagom brett och tydligt att navigera med tangentbord.`,hint:`Grid och gap på formuläret, font och padding på fälten, och en :focus-visible-regel.`}]}]},...v,...T]},D=e(E,{"web-headings":[{type:`web`,prompt:"Felsök: sidan ska ha en enda huvudrubrik, underrubrikerna ska vara `h2` och alla stycken ska ha sluttaggar. Rätta koden.",starter:`<h1>Pannkakor</h1>
<h1>Ingredienser</h1>
<p>Mjöl, mjölk och ägg.
<h1>Gör så här</h1>
<p>Vispa ihop allt och stek.</p>
`,checks:[{q:`h1`,min:1,max:1,msg:`Sidan har exakt en h1`},{q:`h2`,min:2,msg:`Ingredienser och Gör så här är h2`},{q:`h2`,text:`Ingredienser`,msg:`Rubriken Ingredienser finns kvar som h2`},{source:`<p>[^<]*</p>[\\s\\S]*<p>[^<]*</p>`,msg:`Båda styckena har sluttaggen </p>`}],solution:`<h1>Pannkakor</h1>
<h2>Ingredienser</h2>
<p>Mjöl, mjölk och ägg.</p>
<h2>Gör så här</h2>
<p>Vispa ihop allt och stek.</p>`,explain:`En h1 för hela sidan och h2 för avsnitten gör strukturen tydlig. Sluttaggen visar var stycket tar slut.`,hint:`Byt de två sista h1 mot h2 och lägg till </p> efter första stycket.`},{type:`web`,prompt:"Skriv en liten artikel om ett djur: en `h1`, två avsnitt med var sin `h2` och minst ett stycke, och under det andra avsnittet en `h3` med ett eget stycke. Hoppa inte över nivåer: `h3` ska komma efter en `h2`.",starter:`<!-- Skriv din artikel här -->
`,checks:[{q:`h1`,min:1,max:1,msg:`Artikeln har exakt en h1`},{q:`h2`,min:2,msg:`Det finns två avsnitt med h2`},{q:`h3`,min:1,msg:`Det finns en h3`},{q:`p`,min:3,msg:`Varje rubrik följs av text (minst tre stycken)`},{source:`<h1[\\s\\S]*<h2[\\s\\S]*<h2[\\s\\S]*<h3`,msg:`Ordningen är h1, h2, h2 och sist h3`}],solution:`<h1>Rödpandan</h1>
<p>Ett litet djur som bor i bergsskogar.</p>
<h2>Utseende</h2>
<p>Den har rödbrun päls och lång svans.</p>
<h2>Mat</h2>
<p>Den äter mest bambu.</p>
<h3>Favoritmat</h3>
<p>Unga bambuskott.</p>`,explain:`Rubriknivåerna bildar en innehållsförteckning: h3 är ett underavsnitt till närmaste h2 ovanför.`,hint:`h1 överst, sedan h2 + p två gånger, och sist h3 + p.`}],"web-links":[{type:`web`,prompt:"Skriv **ett** stycke som tipsar om två sidor i samma mening: en länk till `https://sv.wikipedia.org` och en till `https://www.w3.org`. Båda länktexterna ska säga vart länken leder, så inget ”klicka här” eller bara ”här”.",starter:`<p>
  
</p>
`,checks:[{q:`p a:nth-of-type(2)`,min:1,msg:`Båda länkarna ligger i samma stycke`},{q:`a[href^="https://sv.wikipedia.org"]`,min:1,msg:`Det finns en länk till Wikipedia`},{q:`a[href^="https://www.w3.org"]`,min:1,msg:`Det finns en länk till W3C`},{q:`a`,text:`^(klicka här|här|länk)$`,invert:!0,msg:`Ingen länktext är bara ”här” eller ”klicka här”`}],solution:`<p>
  Jag lär mig från <a href="https://sv.wikipedia.org">svenska Wikipedia</a> och <a href="https://www.w3.org">W3C:s webbplats</a>.
</p>`,explain:`Länkar kan stå mitt i en mening, och med tydlig text går de att förstå även när de läses en och en.`,hint:`Två <a href="...">...</a> i samma <p>.`},{type:`web`,prompt:`Felsök: ingen av de tre länkarna är skriven rätt. Hitta felet i varje länk: ett saknat citattecken, fel attribut och en dålig länktext.`,starter:`<p>Läs mer på <a href=https://sv.wikipedia.org">Wikipedia</a>.</p>
<p>Det finns exempel på <a src="https://example.com">Exempelsidan</a>.</p>
<p><a href="https://www.w3.org">Klicka här</a></p>
`,checks:[{q:`a`,min:3,msg:`Alla tre länkar finns kvar`},{q:`a`,attr:`href`,re:`^https://[^"\\s]+$`,msg:`Alla länkar har en korrekt href med citattecken runt adressen`},{q:`a[src]`,min:0,max:0,msg:`Ingen länk använder src`},{q:`a`,text:`^(klicka här|här)$`,invert:!0,msg:`Ingen länktext är ”klicka här”`}],solution:`<p>Läs mer på <a href="https://sv.wikipedia.org">Wikipedia</a>.</p>
<p>Det finns exempel på <a href="https://example.com">Exempelsidan</a>.</p>
<p><a href="https://www.w3.org">Läs om webbstandarder hos W3C</a></p>`,explain:`Värdet ska stå inom två citattecken, adressen hör hemma i href och länktexten ska beskriva målet.`,hint:`Lägg till " före https i första länken, byt src mot href och skriv en ny text i sista länken.`}],"web-lists":[{type:`web`,prompt:"Gör en sida för en utflykt: en `h2` ”Packa” med en punktlista på minst fyra saker, och en `h2` ”Vägbeskrivning” med en numrerad lista på minst tre steg. Ett av stegen ska innehålla en länk till `https://www.openstreetmap.org`.",starter:`<h1>Utflykt</h1>
`,checks:[{q:`h2`,min:2,msg:`Det finns två h2-rubriker`},{q:`ul > li`,min:4,msg:`Packlistan har minst fyra punkter`},{q:`ol > li`,min:3,msg:`Vägbeskrivningen har minst tre steg`},{q:`ol li a`,attr:`href`,re:`openstreetmap\\.org`,msg:`Ett steg har en länk till kartan`}],solution:`<h1>Utflykt</h1>
<h2>Packa</h2>
<ul>
  <li>Vattenflaska</li>
  <li>Matsäck</li>
  <li>Regnjacka</li>
  <li>Plåster</li>
</ul>
<h2>Vägbeskrivning</h2>
<ol>
  <li>Ta bussen till sjön</li>
  <li>Följ stigen enligt <a href="https://www.openstreetmap.org">kartan på OpenStreetMap</a></li>
  <li>Stanna vid utsiktsplatsen</li>
</ol>`,explain:`Packlistan har ingen ordning och blir ul. Stegen har det och blir ol. En länk kan ligga inuti en listpunkt.`,hint:`h2 + ul med fyra li, sedan h2 + ol med tre li. Lägg <a> inuti en av li.`},{type:`web`,prompt:`Felsök receptet: stegen ska göras i ordning, men de ligger i en punktlista, och ett steg är ett stycke i stället för en listpunkt. Rätta listan.`,starter:`<h2>Pannkakor</h2>
<ul>
  <li>Vispa ihop mjöl och mjölk</li>
  <p>Tillsätt ägg</p>
  <li>Stek i smör</li>
</ul>
`,checks:[{q:`ol > li`,min:3,msg:`Stegen ligger i en numrerad lista`},{q:`ul`,min:0,max:0,msg:`Receptet använder inte punktlista`},{q:`ol p`,min:0,max:0,msg:`Inget stycke ligger i listan`},{q:`li`,text:`Tillsätt ägg`,msg:`Tillsätt ägg är en listpunkt`}],solution:`<h2>Pannkakor</h2>
<ol>
  <li>Vispa ihop mjöl och mjölk</li>
  <li>Tillsätt ägg</li>
  <li>Stek i smör</li>
</ol>`,explain:`I en lista ska varje punkt vara ett li, och när ordningen spelar roll ska listan vara ol.`,hint:`Byt ul mot ol (både start och slut) och p mot li.`}],"web-images":[{type:`web`,prompt:"Gör ett litet galleri under rubriken `h2` ”Djur” med tre bilder: `https://picsum.photos/id/1025/200/150` (en hund i en filt), `https://picsum.photos/id/237/200/150` (en svart valp) och `https://picsum.photos/id/1084/200/150` (valrossar). Varje bild ska ha en egen alt-text som beskriver vad den visar, utan ord som ”bild” eller ”foto”.",starter:`<h2>Djur</h2>
`,checks:[{q:`img`,min:3,msg:`Galleriet har tre bilder`},{q:`img`,attr:`src`,re:`^https://picsum\\.photos/id/\\d+/`,msg:`Alla bilder har en src från picsum`},{q:`img`,attr:`alt`,re:`^(?!.*\\b(bild|foto)\\b)(?!.*\\.(jpe?g|png)$).*\\S{3,}`,msg:`Alla alt-texter beskriver motivet (inte ”bild” eller ett filnamn)`},{q:`img[alt*="hund" i]`,min:1,msg:`En alt-text nämner hunden`},{q:`img[alt*="valp" i]`,min:1,msg:`En alt-text nämner valpen`},{q:`img[alt*="valross" i]`,min:1,msg:`En alt-text nämner valrossarna`}],solution:`<h2>Djur</h2>
<img src="https://picsum.photos/id/1025/200/150" alt="En hund insvept i en filt">
<img src="https://picsum.photos/id/237/200/150" alt="En svart valp som tittar upp">
<img src="https://picsum.photos/id/1084/200/150" alt="Valrossar som vilar på en klippa">`,explain:`Varje bild har sin egen beskrivning, så den som inte ser bilderna får ändå veta vad galleriet visar.`,hint:`Tre <img src="..." alt="..."> där varje alt beskriver djuret.`},{type:`web`,prompt:"Felsök bilderna. Den första saknar alt-text (den visar en svart valp), den andra har ett filnamn som alt-text (den visar en hund i en filt) och den tredje har en sluttagg som `img` inte ska ha. Den tredje visar en grå katt.",starter:`<h2>Mina husdjur</h2>
<img src="https://picsum.photos/id/237/200/150">
<img src="https://picsum.photos/id/1025/200/150" alt="hund.jpg">
<img src="https://picsum.photos/id/40/200/150" alt="Bild"></img>
`,checks:[{q:`img`,min:3,max:3,msg:`Alla tre bilder finns kvar`},{q:`img`,attr:`alt`,re:`^(?!.*\\b(bild|foto)\\b)(?!.*\\.(jpe?g|png)$).*\\S{3,}`,msg:`Alla bilder har en beskrivande alt-text`},{source:`</img>`,invert:!0,msg:`Ingen bild har en sluttagg`}],solution:`<h2>Mina husdjur</h2>
<img src="https://picsum.photos/id/237/200/150" alt="En svart valp som tittar upp">
<img src="https://picsum.photos/id/1025/200/150" alt="En hund insvept i en filt">
<img src="https://picsum.photos/id/40/200/150" alt="En grå katt">`,explain:`img saknar sluttagg, och alt-texten ska beskriva motivet. Filnamn och ordet ”bild” säger ingenting.`,hint:`Lägg till alt på första, skriv om alt på andra och ta bort </img> på tredje.`}],"web-css":[{type:`web`,prompt:"Ge sidan en egen stil med tre regler: `h1` får färgen `darkslateblue` och storleken `40px`, `h2` får färgen `teal` och `p` får storleken `18px` och färgen `dimgray`.",starter:`<style>

</style>
<h1>Min sida</h1>
<h2>Om mig</h2>
<p>Jag lär mig CSS.</p>
`,checks:[{css:`h1`,prop:`color`,re:`^darkslateblue$`,msg:`h1 har color: darkslateblue`},{css:`h1`,prop:`font-size`,re:`^40px$`,msg:`h1 har font-size: 40px`},{css:`h2`,prop:`color`,re:`^teal$`,msg:`h2 har color: teal`},{css:`p`,prop:`font-size`,re:`^18px$`,msg:`p har font-size: 18px`},{css:`p`,prop:`color`,re:`^dimgray$`,msg:`p har color: dimgray`},{balanced:!0,msg:`Alla klamrar är stängda`}],solution:`<style>
  h1 { color: darkslateblue; font-size: 40px; }
  h2 { color: teal; }
  p { font-size: 18px; color: dimgray; }
</style>
<h1>Min sida</h1>
<h2>Om mig</h2>
<p>Jag lär mig CSS.</p>`,explain:`En regel kan ha flera deklarationer, var och en avslutad med semikolon.`,hint:`Tre regler: h1 med två deklarationer, h2 med en och p med två.`},{type:`web`,prompt:"Felsök CSS:en. Den har två fel, så bara en del av stilen fungerar. `h1` ska vara `purple`, `h2` `teal` och `p` ska ha storleken `18px`.",starter:`<style>
  h1 { color purple; }
  h2 { color: teal;
  p { font-size: 18px; }
</style>
<h1>Rubrik</h1>
<h2>Underrubrik</h2>
<p>Text</p>
`,checks:[{css:`h1`,prop:`color`,re:`^purple$`,msg:`h1 har color: purple`},{css:`h2`,prop:`color`,re:`^teal$`,msg:`h2 har color: teal`},{css:`p`,prop:`font-size`,re:`^18px$`,msg:`p har font-size: 18px`},{balanced:!0,msg:`Alla klamrar är stängda`}],solution:`<style>
  h1 { color: purple; }
  h2 { color: teal; }
  p { font-size: 18px; }
</style>
<h1>Rubrik</h1>
<h2>Underrubrik</h2>
<p>Text</p>`,explain:`Ett saknat kolon gör deklarationen ogiltig, och en saknad } gör att nästa regel hamnar inuti den förra.`,hint:`Titta efter ett kolon som saknas och en klammer som aldrig stängs.`}],"web-colors":[{type:`web`,prompt:"Gör en mörk sida: `body` får bakgrunden `#1f1d2b` och textfärgen `#f4f1ff`. Ge `h1` en ljus färg skriven som hexkod och `p` en ljus färg skriven med `rgb(...)`.",starter:`<style>

</style>
<h1>Nattläge</h1>
<p>Ljus text på mörk bakgrund.</p>
`,checks:[{css:`body`,prop:`background-color`,re:`^#1f1d2b$`,msg:`body har bakgrunden #1f1d2b`},{css:`body`,prop:`color`,re:`^#f4f1ff$`,msg:`body har textfärgen #f4f1ff`},{css:`h1`,prop:`color`,re:`^#([0-9a-f]{3}|[0-9a-f]{6})$`,msg:`h1 har en färg som hexkod`},{css:`p`,prop:`color`,re:`^rgb\\(\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*\\)$`,msg:`p har en färg skriven med rgb()`}],solution:`<style>
  body { background-color: #1f1d2b; color: #f4f1ff; }
  h1 { color: #ffd6e7; }
  p { color: rgb(220, 214, 255); }
</style>
<h1>Nattläge</h1>
<p>Ljus text på mörk bakgrund.</p>`,explain:`Hexkod och rgb() är två sätt att skriva samma sak. På mörk bakgrund behövs ljus text för god kontrast.`,hint:`body får två deklarationer, h1 color: #..., p color: rgb(.., .., ..).`},{type:`web`,prompt:"Felsök kontrasten: texten syns knappt mot den vita bakgrunden. Byt färgerna på `h1` och `p` mot mörka hexkoder. En mörk hexkod börjar med en låg siffra, till exempel `#2a2a2a` eller `#3b1f6e`. Bakgrunden ska fortsätta vara vit.",starter:`<style>
  body { background-color: white; }
  h1 { color: #eeeeee; }
  p { color: lightgray; }
</style>
<h1>Öppettider</h1>
<p>Vardagar 9 till 17.</p>
`,checks:[{css:`body`,prop:`background-color`,re:`^(white|#fff|#ffffff)$`,msg:`Bakgrunden är fortfarande vit`},{css:`h1`,prop:`color`,re:`^#[0-4][0-9a-f]{2}([0-9a-f]{3})?$`,msg:`h1 har en mörk hexfärg`},{css:`p`,prop:`color`,re:`^#[0-4][0-9a-f]{2}([0-9a-f]{3})?$`,msg:`p har en mörk hexfärg`}],solution:`<style>
  body { background-color: white; }
  h1 { color: #3b1f6e; }
  p { color: #2a2a2a; }
</style>
<h1>Öppettider</h1>
<p>Vardagar 9 till 17.</p>`,explain:`Mörk text på vitt ger hög kontrast och är lätt att läsa för alla.`,hint:`Byt #eeeeee och lightgray mot till exempel #3b1f6e och #2a2a2a.`}],"web-classes":[{type:`web`,prompt:"Ge de två första styckena klassen `kort`, och ge det andra stycket **dessutom** klassen `stor`. Skapa en regel för `.kort` med en bakgrundsfärg och en för `.stor` med `font-size: 24px`. Det tredje stycket ska vara vanligt.",starter:`<style>

</style>
<p>Första kortet.</p>
<p>Andra kortet, lite större.</p>
<p>Vanlig text.</p>
`,checks:[{q:`p.kort`,min:2,max:2,msg:`Två stycken har klassen kort`},{q:`p.kort.stor`,min:1,max:1,msg:`Ett stycke har både kort och stor`},{q:`p:not(.kort)`,min:1,msg:`Det tredje stycket är vanligt`},{css:`.kort`,prop:`background-color`,msg:`.kort har en bakgrundsfärg`},{css:`.stor`,prop:`font-size`,re:`^24px$`,msg:`.stor har font-size: 24px`}],solution:`<style>
  .kort { background-color: #f0e9ff; }
  .stor { font-size: 24px; }
</style>
<p class="kort">Första kortet.</p>
<p class="kort stor">Andra kortet, lite större.</p>
<p>Vanlig text.</p>`,explain:`Med två klasser får elementet stilen från båda reglerna.`,hint:`Flera klasser skrivs i samma attribut med mellanslag: class="kort stor".`},{type:`web`,prompt:"Felsök klasserna. Det första stycket ska bli rött via `.viktig`, och det andra ska ha både klassen `tips` och klassen `stor`. Det finns tre fel att hitta.",starter:`<style>
  viktig { color: crimson; }
  .tips { background-color: #eef6ff; }
  .stor { font-size: 24px; }
</style>
<p class=".viktig">Stäng av spisen!</p>
<p class="tips" class="stor">Spara ofta.</p>
`,checks:[{css:`.viktig`,prop:`color`,re:`^crimson$`,msg:`Regeln .viktig har color: crimson`},{q:`p.viktig`,min:1,msg:`Första stycket har klassen viktig`},{source:`class="\\.`,invert:!0,msg:`Ingen punkt i class-attributet`},{q:`p.tips.stor`,min:1,msg:`Andra stycket har både tips och stor`}],solution:`<style>
  .viktig { color: crimson; }
  .tips { background-color: #eef6ff; }
  .stor { font-size: 24px; }
</style>
<p class="viktig">Stäng av spisen!</p>
<p class="tips stor">Spara ofta.</p>`,explain:`Punkten hör till CSS-väljaren, inte till HTML. Och ett element kan bara ha ett class-attribut, så flera klasser skrivs i samma.`,hint:`Lägg till punkt framför viktig i CSS, ta bort punkten i HTML och slå ihop de två class-attributen.`}],"web-spacing":[{type:`web`,prompt:"Använd två värden: ge `.etikett` `padding: 4px 12px`. Ge `.kort` `padding: 16px` och `margin: 24px 0`. Ge båda en bakgrundsfärg så att du ser luften.",starter:`<style>

</style>
<div class="etikett">Nyhet</div>
<div class="kort">Ett kort</div>
<div class="kort">Ett till</div>
`,checks:[{css:`.etikett`,prop:`padding`,re:`^4px 12px$`,msg:`.etikett har padding: 4px 12px`},{css:`.kort`,prop:`padding`,re:`^16px$`,msg:`.kort har padding: 16px`},{css:`.kort`,prop:`margin`,re:`^24px 0(px)?$`,msg:`.kort har margin: 24px 0`},{css:`.etikett`,prop:`background(-color)?`,msg:`.etikett har en bakgrund`},{css:`.kort`,prop:`background(-color)?`,msg:`.kort har en bakgrund`}],solution:`<style>
  .etikett { background-color: #ffd6e7; padding: 4px 12px; }
  .kort { background-color: #f0e9ff; padding: 16px; margin: 24px 0; }
</style>
<div class="etikett">Nyhet</div>
<div class="kort">Ett kort</div>
<div class="kort">Ett till</div>`,explain:`Med två värden gäller det första uppåt och nedåt och det andra åt sidorna.`,hint:`Första värdet är upp/ner, andra är vänster/höger.`},{type:`web`,prompt:"Felsök: texten ligger kloss mot kanten upptill och nertill och rutorna har konstiga avstånd åt sidorna. Någon har blandat ihop margin och padding. Rutan ska ha `16px` luft inuti på alla sidor och `12px` avstånd uppåt och nedåt, men inget åt sidorna, till andra element.",starter:`<style>
  .ruta { background-color: #f0e9ff; margin: 16px; padding: 12px 0; }
</style>
<div class="ruta">Första rutan</div>
<div class="ruta">Andra rutan</div>
`,checks:[{css:`.ruta`,prop:`padding`,re:`^16px$`,msg:`.ruta har padding: 16px`},{css:`.ruta`,prop:`margin`,re:`^12px 0(px)?$`,msg:`.ruta har margin: 12px 0`}],solution:`<style>
  .ruta { background-color: #f0e9ff; margin: 12px 0; padding: 16px; }
</style>
<div class="ruta">Första rutan</div>
<div class="ruta">Andra rutan</div>`,explain:`Padding är luften innanför kanten, margin avståndet utanför.`,hint:`padding: 16px; och margin: 12px 0;`}],"web-fonts":[{type:`web`,prompt:"Ge `body` typsnittet `Georgia, serif` och radavståndet `1.6`. Ge `h1` ett annat typsnitt, `system-ui, sans-serif`, och storleken `40px`. Ge stycket med klassen `ingress` storleken `20px`.",starter:`<style>

</style>
<h1>Min resa</h1>
<p class="ingress">En vecka i fjällen.</p>
<p>Första dagen regnade det, men sedan blev det sol.</p>
`,checks:[{css:`body`,prop:`font-family`,re:`georgia\\s*,\\s*serif`,msg:`body har font-family: Georgia, serif`},{css:`body`,prop:`line-height`,re:`^1\\.6$`,msg:`body har line-height: 1.6`},{css:`h1`,prop:`font-family`,re:`system-ui\\s*,\\s*sans-serif`,msg:`h1 har font-family: system-ui, sans-serif`},{css:`h1`,prop:`font-size`,re:`^40px$`,msg:`h1 har font-size: 40px`},{css:`.ingress`,prop:`font-size`,re:`^20px$`,msg:`.ingress har font-size: 20px`}],solution:`<style>
  body { font-family: Georgia, serif; line-height: 1.6; }
  h1 { font-family: system-ui, sans-serif; font-size: 40px; }
  .ingress { font-size: 20px; }
</style>
<h1>Min resa</h1>
<p class="ingress">En vecka i fjällen.</p>
<p>Första dagen regnade det, men sedan blev det sol.</p>`,explain:`h1 ärver från body men får ett eget typsnitt eftersom regeln för h1 gäller just den.`,hint:`Tre regler: body, h1 och .ingress.`},{type:`web`,prompt:`Felsök typografin: typsnittet saknar reserv, radavståndet är alldeles för stort och rubrikens storlek saknar enhet, så den ignoreras. Rätta alla tre. Behåll gärna Comic Neue först i listan och välj ett radavstånd mellan 1.3 och 1.8.`,starter:`<style>
  body { font-family: Comic Neue; line-height: 4; }
  h1 { font-size: 36; }
</style>
<h1>Läsbart?</h1>
<p>Ett stycke med lite text som ska vara lätt att läsa.</p>
`,checks:[{css:`body`,prop:`font-family`,re:`,\\s*(sans-serif|serif|monospace)\\s*$`,msg:`Typsnittet har en reserv sist`},{css:`body`,prop:`line-height`,re:`^1\\.[3-8]\\d*$`,msg:`Radavståndet är mellan 1.3 och 1.8`},{css:`h1`,prop:`font-size`,re:`^\\d+px$`,msg:`h1 har en storlek med enheten px`}],solution:`<style>
  body { font-family: "Comic Neue", sans-serif; line-height: 1.5; }
  h1 { font-size: 36px; }
</style>
<h1>Läsbart?</h1>
<p>Ett stycke med lite text som ska vara lätt att läsa.</p>`,explain:`En reserv gör att texten ser rimlig ut även om typsnittet saknas, och en storlek utan enhet är ogiltig.`,hint:`Lägg till , sans-serif efter typsnittet, sänk line-height och skriv 36px.`}],"web-borders":[{type:`web`,prompt:"Ge `.kort` en streckad kant (`2px dashed` och en färg) och `border-radius: 12px`. Gör `.avatar` till en cirkel: `64px` bred och hög, `border-radius: 50%` och en heldragen kant (`solid`).",starter:`<style>
  .kort { padding: 16px; }
  .avatar { background-color: #ffd6e7; }
</style>
<div class="kort">
  <div class="avatar"></div>
  <p>Milo</p>
</div>
`,checks:[{css:`.kort`,prop:`border`,re:`2px\\s+dashed\\s+\\S+`,msg:`.kort har en streckad kant på 2px med färg`},{css:`.kort`,prop:`border-radius`,re:`^12px$`,msg:`.kort har border-radius: 12px`},{css:`.avatar`,prop:`width`,re:`^64px$`,msg:`.avatar är 64px bred`},{css:`.avatar`,prop:`height`,re:`^64px$`,msg:`.avatar är 64px hög`},{css:`.avatar`,prop:`border-radius`,re:`^50%$`,msg:`.avatar har border-radius: 50%`},{css:`.avatar`,prop:`border`,re:`\\d+px\\s+solid\\s+\\S+`,msg:`.avatar har en heldragen kant`}],solution:`<style>
  .kort { padding: 16px; border: 2px dashed #6b4fbb; border-radius: 12px; }
  .avatar { background-color: #ffd6e7; width: 64px; height: 64px; border-radius: 50%; border: 3px solid #6b4fbb; }
</style>
<div class="kort">
  <div class="avatar"></div>
  <p>Milo</p>
</div>`,explain:`dashed ger en streckad kant. Lika bredd och höjd plus 50 % radie blir en cirkel.`,hint:`border: 2px dashed färg; i .kort, och width, height, border-radius och border i .avatar.`},{type:`web`,prompt:"Felsök: kanten på `.ram` syns inte, hörnen rundas inte och `.rund` blir ett ägg i stället för en cirkel. Rätta de tre felen.",starter:`<style>
  .ram { border: 2px #6b4fbb; border-radius: 12 px; padding: 12px; }
  .rund { width: 60px; height: 80px; background-color: #ffd6e7; border-radius: 50%; }
</style>
<div class="ram">Mjuka hörn</div>
<div class="rund"></div>
`,checks:[{css:`.ram`,prop:`border`,re:`2px\\s+solid\\s+#6b4fbb`,msg:`.ram har border: 2px solid #6b4fbb`},{css:`.ram`,prop:`border-radius`,re:`^12px$`,msg:`.ram har border-radius: 12px`},{css:`.rund`,prop:`width`,re:`^60px$`,msg:`.rund är 60px bred`},{css:`.rund`,prop:`height`,re:`^60px$`,msg:`.rund är 60px hög`}],solution:`<style>
  .ram { border: 2px solid #6b4fbb; border-radius: 12px; padding: 12px; }
  .rund { width: 60px; height: 60px; background-color: #ffd6e7; border-radius: 50%; }
</style>
<div class="ram">Mjuka hörn</div>
<div class="rund"></div>`,explain:`Kanten behöver en stil, enheten måste sitta ihop med talet och en cirkel kräver lika bredd och höjd.`,hint:`Lägg till solid, ta bort mellanslaget i 12 px och gör höjden lika med bredden.`}],"web-box":[{type:`web`,prompt:"`.a` och `.b` ska båda ta exakt 240px i bredd, kant och padding inräknade. Lös `.a` genom att räkna ut rätt `width` (utan box-sizing), och lös `.b` med `box-sizing: border-box`.",starter:`<style>
  .a { width: 240px; padding: 20px; border: 5px solid #6b4fbb; }
  .b { width: 240px; padding: 20px; border: 5px solid #2f9e7a; }
</style>
<div class="a">A</div>
<div class="b">B</div>
`,checks:[{css:`.a`,prop:`width`,re:`^190px$`,msg:`.a har rätt uträknad width`},{source:`\\.a\\s*\\{[^}]*box-sizing`,invert:!0,msg:`.a använder inte box-sizing`},{source:`\\*\\s*\\{[^}]*box-sizing`,invert:!0,msg:`box-sizing sätts inte på alla element`},{css:`.b`,prop:`box-sizing`,re:`^border-box$`,msg:`.b har box-sizing: border-box`},{css:`.b`,prop:`width`,re:`^240px$`,msg:`.b har width: 240px`}],solution:`<style>
  .a { width: 190px; padding: 20px; border: 5px solid #6b4fbb; }
  .b { width: 240px; padding: 20px; border: 5px solid #2f9e7a; box-sizing: border-box; }
</style>
<div class="a">A</div>
<div class="b">B</div>`,explain:`190 + 20 + 20 + 5 + 5 = 240. Med border-box slipper du räkna: width är hela bredden.`,hint:`Dra av padding och kant på båda sidor från 240 för .a.`},{type:`choice`,prompt:`Hur mycket plats tar lådan i sidled, margin inräknad?`,code:`<style>
  .låda { width: 100px; padding: 10px 20px; border: 3px solid black; margin: 0 8px; }
</style>`,options:[`146px`,`162px`,`126px`,`100px`],answer:1,explain:`Lådan är 100 + 20 + 20 + 3 + 3 = 146px bred, och 8px margin på varje sida gör att den tar 162px.`,why:{0:`146px är lådans egen bredd, men margin tar också plats i sidled.`,2:`Med två värden gäller 10px upp och ner. Åt sidorna är det 20px.`,3:`Utan border-box läggs padding och kant till på width.`}}],"web-profile":[{type:`web`,prompt:"Bygg ett större profilkort: en `div` med klassen `profil` med en bild (alt-text), en `h2`, ett stycke, en punktlista med minst tre intressen och en länk. Gör bilden rund med `.profil img`. Ge `.profil` `max-width`, padding, bakgrundsfärg, rundade hörn och `text-align: center`.",starter:`<style>

</style>
`,checks:[{q:`.profil img[alt]`,min:1,msg:`Kortet har en bild med alt-text`},{q:`.profil h2`,min:1,msg:`Kortet har en h2`},{q:`.profil p`,min:1,msg:`Kortet har ett stycke`},{q:`.profil ul > li`,min:3,msg:`Kortet har en lista med minst tre intressen`},{q:`.profil a[href]`,min:1,msg:`Kortet har en länk`},{css:`.profil img`,prop:`border-radius`,re:`^50%$`,msg:`Bilden är rund`},{css:`.profil`,prop:`max-width`,msg:`.profil har en max-width`},{css:`.profil`,prop:`padding`,msg:`.profil har padding`},{css:`.profil`,prop:`background(-color)?`,msg:`.profil har en bakgrundsfärg`},{css:`.profil`,prop:`border-radius`,msg:`.profil har rundade hörn`},{css:`.profil`,prop:`text-align`,re:`^center$`,msg:`.profil har text-align: center`}],solution:`<style>
  .profil { max-width: 280px; padding: 16px; background-color: #f6f2ff; border-radius: 16px; text-align: center; }
  .profil img { border-radius: 50%; }
</style>
<div class="profil">
  <img src="https://picsum.photos/id/64/96/96" alt="Porträtt av en person med glasögon">
  <h2>Ada</h2>
  <p>Gillar matte och maskiner.</p>
  <ul>
    <li>Schack</li>
    <li>Robotar</li>
    <li>Stickning</li>
  </ul>
  <a href="https://sv.wikipedia.org/wiki/Ada_Lovelace">Läs om Ada Lovelace</a>
</div>`,explain:`Allt du lärt dig hittills samlat i en komponent: struktur i HTML och utseende i CSS.`,hint:`Bygg HTML först. Sedan två regler: .profil och .profil img.`},{type:`web`,prompt:`Felsök profilkortet. Stilen fungerar inte alls och bilden är inte tillgänglig. Det finns fyra fel: ett i klassnamnet i HTML, ett i varje CSS-regel och ett på bilden (den visar en person med glasögon).`,starter:`<style>
  .profil { padding 16px; background-color: #f6f2ff; border-radius: 16px; }
  .profil image { border-radius: 50%; }
</style>
<div class="proffil">
  <img src="https://picsum.photos/id/64/96/96">
  <h2>Ada</h2>
  <p>Gillar matte och maskiner.</p>
</div>
`,checks:[{q:`div.profil`,min:1,msg:`Kortet har klassen profil`},{q:`.profil img`,attr:`alt`,re:`\\S{3,}`,msg:`Bilden har en alt-text`},{css:`.profil`,prop:`padding`,re:`^16px$`,msg:`.profil har padding: 16px`},{css:`.profil img`,prop:`border-radius`,re:`^50%$`,msg:`Regeln .profil img gör bilden rund`}],solution:`<style>
  .profil { padding: 16px; background-color: #f6f2ff; border-radius: 16px; }
  .profil img { border-radius: 50%; }
</style>
<div class="profil">
  <img src="https://picsum.photos/id/64/96/96" alt="Porträtt av en person med glasögon">
  <h2>Ada</h2>
  <p>Gillar matte och maskiner.</p>
</div>`,explain:`Klassnamnet måste stavas exakt lika i HTML och CSS, och väljaren för bilder heter img.`,hint:`Jämför klassnamnet i HTML med CSS, leta efter ett saknat kolon, rätta väljaren image och lägg till alt.`}],"web-flex":[{type:`web`,prompt:"Gör en sidhuvudrad: `.topp` ska lägga rubriken till vänster och menyn till höger med `justify-content: space-between`, och centrera dem vertikalt. Menyn `.meny` ska i sin tur vara en egen flex-rad med `gap: 16px`. Flexbox inuti flexbox!",starter:`<style>

</style>
<div class="topp">
  <h1>Kodstig</h1>
  <nav class="meny">
    <a href="#">Hem</a>
    <a href="#">Lektioner</a>
    <a href="#">Om</a>
  </nav>
</div>
`,checks:[{css:`.topp`,prop:`display`,re:`^flex$`,msg:`.topp har display: flex`},{css:`.topp`,prop:`justify-content`,re:`^space-between$`,msg:`.topp har justify-content: space-between`},{css:`.topp`,prop:`align-items`,re:`^center$`,msg:`.topp har align-items: center`},{css:`.meny`,prop:`display`,re:`^flex$`,msg:`.meny har display: flex`},{css:`.meny`,prop:`gap`,re:`^16px$`,msg:`.meny har gap: 16px`}],solution:`<style>
  .topp { display: flex; justify-content: space-between; align-items: center; }
  .meny { display: flex; gap: 16px; }
</style>
<div class="topp">
  <h1>Kodstig</h1>
  <nav class="meny">
    <a href="#">Hem</a>
    <a href="#">Lektioner</a>
    <a href="#">Om</a>
  </nav>
</div>`,explain:`Ett flex-barn kan själv vara en flex-container. Så byggs de flesta sidhuvuden.`,hint:`En regel för .topp med tre deklarationer och en för .meny med två.`},{type:`web`,prompt:"Gör en rad med taggar som bryter till nästa rad när platsen tar slut: `.taggar` ska vara flex med `flex-wrap: wrap` och `gap: 8px`. Varje `.tagg` ska ha padding med två värden, en bakgrundsfärg och rundade hörn. Lägg till minst två egna taggar så att det blir minst åtta.",starter:`<style>

</style>
<div class="taggar">
  <a class="tagg" href="#">HTML</a>
  <a class="tagg" href="#">CSS</a>
  <a class="tagg" href="#">Färger</a>
  <a class="tagg" href="#">Klasser</a>
  <a class="tagg" href="#">Flexbox</a>
  <a class="tagg" href="#">Typsnitt</a>
</div>
`,checks:[{css:`.taggar`,prop:`display`,re:`^flex$`,msg:`.taggar har display: flex`},{css:`.taggar`,prop:`flex-wrap`,re:`^wrap$`,msg:`.taggar har flex-wrap: wrap`},{css:`.taggar`,prop:`gap`,re:`^8px$`,msg:`.taggar har gap: 8px`},{css:`.tagg`,prop:`padding`,re:`^\\d+px \\d+px$`,msg:`.tagg har padding med två värden`},{css:`.tagg`,prop:`background(-color)?`,msg:`.tagg har en bakgrundsfärg`},{css:`.tagg`,prop:`border-radius`,msg:`.tagg har rundade hörn`},{q:`.taggar .tagg`,min:8,msg:`Det finns minst åtta taggar`}],solution:`<style>
  .taggar { display: flex; flex-wrap: wrap; gap: 8px; }
  .tagg { padding: 4px 12px; background-color: #f0e9ff; border-radius: 12px; }
</style>
<div class="taggar">
  <a class="tagg" href="#">HTML</a>
  <a class="tagg" href="#">CSS</a>
  <a class="tagg" href="#">Färger</a>
  <a class="tagg" href="#">Klasser</a>
  <a class="tagg" href="#">Flexbox</a>
  <a class="tagg" href="#">Typsnitt</a>
  <a class="tagg" href="#">Kanter</a>
  <a class="tagg" href="#">Boxmodellen</a>
</div>`,explain:`Med flex-wrap hoppar taggarna ner på nästa rad i stället för att tryckas ihop.`,hint:`Tre deklarationer på .taggar, tre på .tagg och två nya länkar.`}],"web-grid":[{type:`web`,prompt:"Gör `.layout` till ett grid där innehållet tar dubbelt så mycket plats som sidopanelen, med `gap: 24px`. Använd `fr`.",starter:`<style>
  .innehåll { background-color: #f0e9ff; padding: 16px; }
  .sidopanel { background-color: #e6f7ee; padding: 16px; }
</style>
<div class="layout">
  <div class="innehåll">Artikel</div>
  <div class="sidopanel">Senaste nytt</div>
</div>
`,checks:[{css:`.layout`,prop:`display`,re:`^grid$`,msg:`.layout har display: grid`},{css:`.layout`,prop:`grid-template-columns`,re:`^2fr\\s+1fr$`,msg:`Kolumnerna är 2fr 1fr`},{css:`.layout`,prop:`gap`,re:`^24px$`,msg:`.layout har gap: 24px`}],solution:`<style>
  .layout { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
  .innehåll { background-color: #f0e9ff; padding: 16px; }
  .sidopanel { background-color: #e6f7ee; padding: 16px; }
</style>
<div class="layout">
  <div class="innehåll">Artikel</div>
  <div class="sidopanel">Senaste nytt</div>
</div>`,explain:`2fr och 1fr delar utrymmet i tre andelar: två till innehållet och en till panelen.`,hint:`grid-template-columns: 2fr 1fr;`},{type:`web`,prompt:"Felsök galleriet. Det ska vara tre lika breda kolumner med `gap: 12px`, men det finns tre fel i regeln för `.galleri`.",starter:`<style>
  .galleri { display: flex; grid-template-columns: repeat(3 1fr); gap 12px; }
  .galleri div { background-color: #f0e9ff; padding: 20px; }
</style>
<div class="galleri">
  <div>A</div><div>B</div><div>C</div>
  <div>D</div><div>E</div><div>F</div>
</div>
`,checks:[{css:`.galleri`,prop:`display`,re:`^grid$`,msg:`.galleri har display: grid`},{css:`.galleri`,prop:`grid-template-columns`,re:`^(1fr\\s+1fr\\s+1fr|repeat\\(\\s*3\\s*,\\s*1fr\\s*\\))$`,msg:`Kolumnerna är tre lika breda`},{css:`.galleri`,prop:`gap`,re:`^12px$`,msg:`.galleri har gap: 12px`}],solution:`<style>
  .galleri { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .galleri div { background-color: #f0e9ff; padding: 20px; }
</style>
<div class="galleri">
  <div>A</div><div>B</div><div>C</div>
  <div>D</div><div>E</div><div>F</div>
</div>`,explain:`grid-template-columns gör ingenting utan display: grid, repeat behöver ett kommatecken och varje deklaration ett kolon.`,hint:`Titta på display, på tecknet mellan 3 och 1fr och på gap.`},{type:`web`,prompt:"Bygg en kurslista: en `div` med klassen `kurser` som innehåller minst fyra `div` med klassen `kort`, var och en med en `h3` och ett stycke. Gör `.kurser` till ett responsivt grid med `repeat(auto-fit, minmax(160px, 1fr))` och ett `gap`. Ge `.kort` padding, bakgrundsfärg och rundade hörn.",starter:`<style>

</style>
<h2>Kurser</h2>
<div class="kurser">

</div>
`,checks:[{q:`.kurser > .kort`,min:4,msg:`Det finns minst fyra kort i .kurser`},{q:`.kort h3`,min:4,msg:`Varje kort har en h3`},{q:`.kort p`,min:4,msg:`Varje kort har ett stycke`},{css:`.kurser`,prop:`display`,re:`^grid$`,msg:`.kurser har display: grid`},{css:`.kurser`,prop:`grid-template-columns`,re:`repeat\\(\\s*auto-(fit|fill)\\s*,\\s*minmax\\(\\s*160px\\s*,\\s*1fr\\s*\\)\\s*\\)`,msg:`Kolumnerna använder repeat(auto-fit, minmax(160px, 1fr))`},{css:`.kurser`,prop:`gap`,msg:`.kurser har gap`},{css:`.kort`,prop:`padding`,msg:`.kort har padding`},{css:`.kort`,prop:`background(-color)?`,msg:`.kort har en bakgrundsfärg`},{css:`.kort`,prop:`border-radius`,msg:`.kort har rundade hörn`}],solution:`<style>
  .kurser { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }
  .kort { padding: 16px; background-color: #f0e9ff; border-radius: 12px; }
</style>
<h2>Kurser</h2>
<div class="kurser">
  <div class="kort"><h3>HTML</h3><p>Struktur och innehåll.</p></div>
  <div class="kort"><h3>CSS</h3><p>Färger och form.</p></div>
  <div class="kort"><h3>Flexbox</h3><p>Rader som anpassar sig.</p></div>
  <div class="kort"><h3>Grid</h3><p>Rutnät för layout.</p></div>
</div>`,explain:`Rutnätet räknar själv ut hur många kort som får plats per rad.`,hint:`Skriv ett kort först, kopiera det tre gånger och lägg sedan till två regler.`}],"web-responsive":[{type:`web`,prompt:"Bygg mobil först i tre steg: `.kolumner` är ett grid med `gap` och en kolumn. Från `min-width: 600px` får det två lika breda kolumner och från `min-width: 900px` tre. Lägg 900px-frågan sist så att den vinner på breda skärmar.",starter:`<style>

</style>
<div class="kolumner">
  <div>Ett</div><div>Två</div><div>Tre</div>
</div>
`,checks:[{css:`.kolumner`,prop:`display`,re:`^grid$`,msg:`.kolumner har display: grid`},{css:`.kolumner`,prop:`gap`,msg:`.kolumner har gap`},{source:`@media\\s*\\(\\s*min-width:\\s*600px\\s*\\)\\s*\\{\\s*\\.kolumner\\s*\\{[^}]*grid-template-columns\\s*:\\s*(1fr\\s+1fr|repeat\\(\\s*2\\s*,\\s*1fr\\s*\\))\\s*;?`,msg:`Från 600px blir det två kolumner`},{source:`@media\\s*\\(\\s*min-width:\\s*900px\\s*\\)\\s*\\{\\s*\\.kolumner\\s*\\{[^}]*grid-template-columns\\s*:\\s*(1fr\\s+1fr\\s+1fr|repeat\\(\\s*3\\s*,\\s*1fr\\s*\\))\\s*;?`,msg:`Från 900px blir det tre kolumner`},{source:`600px[\\s\\S]*900px`,msg:`900px-frågan kommer efter 600px-frågan`},{balanced:!0,msg:`Alla klamrar är stängda`}],solution:`<style>
  .kolumner { display: grid; gap: 12px; }
  @media (min-width: 600px) {
    .kolumner { grid-template-columns: 1fr 1fr; }
  }
  @media (min-width: 900px) {
    .kolumner { grid-template-columns: repeat(3, 1fr); }
  }
</style>
<div class="kolumner">
  <div>Ett</div><div>Två</div><div>Tre</div>
</div>`,explain:`Grundregeln gäller alltid och varje media query lägger till lite mer layout när skärmen växer.`,hint:`En grundregel och två @media-block, var och en med en .kolumner-regel inuti.`},{type:`web`,prompt:`Felsök: menyn ska bli en flex-rad från 600px och bilden ska aldrig bli bredare än sin behållare. Media queryn saknar parenteser och en klammer, och bilden har en fast bredd. Rätta alla tre.`,starter:`<style>
  .meny { display: block; }
  @media min-width: 600px {
    .meny { display: flex; gap: 12px; }

  img { width: 1200px; }
</style>
<nav class="meny">
  <a href="#">Hem</a>
  <a href="#">Om</a>
</nav>
<img src="https://picsum.photos/id/10/1200/400" alt="Skog vid en sjö">
`,checks:[{media:!0,re:`^\\(\\s*min-width:\\s*600px\\s*\\)$`,msg:`Media queryn skrivs (min-width: 600px)`},{css:`.meny`,prop:`display`,re:`^flex$`,inMedia:!0,msg:`.meny blir flex i media queryn`},{balanced:!0,msg:`Alla klamrar är stängda`},{css:`img`,prop:`max-width`,re:`^100%$`,msg:`img har max-width: 100%`},{source:`(^|[^-])width\\s*:\\s*1200px`,invert:!0,msg:`Den fasta bredden 1200px är borta`}],solution:`<style>
  .meny { display: block; }
  @media (min-width: 600px) {
    .meny { display: flex; gap: 12px; }
  }
  img { max-width: 100%; }
</style>
<nav class="meny">
  <a href="#">Hem</a>
  <a href="#">Om</a>
</nav>
<img src="https://picsum.photos/id/10/1200/400" alt="Skog vid en sjö">`,explain:`Villkoret i en media query står inom parenteser, och blocket måste stängas för att reglerna efter ska gälla alltid.`,hint:`@media (min-width: 600px) { ... } och byt width: 1200px mot max-width: 100%.`},{type:`web`,prompt:"Gör reseblogg-sidan responsiv, mobil först: `.sida` är ett grid med `gap` och en kolumn. Från `min-width: 700px` får `.sida` kolumnerna `2fr 1fr`. `h1` är `28px` som grund och `40px` från 700px. Bilder får `max-width: 100%` och `height: auto`.",starter:`<style>

</style>
<h1>Reseblogg</h1>
<div class="sida">
  <div class="innehåll">
    <img src="https://picsum.photos/id/1018/1200/600" alt="Berg i dimma">
    <p>Dag ett i fjällen.</p>
  </div>
  <div class="sidopanel">
    <h2>Om mig</h2>
    <p>Jag gillar att vandra.</p>
  </div>
</div>
`,checks:[{css:`.sida`,prop:`display`,re:`^grid$`,msg:`.sida har display: grid`},{css:`.sida`,prop:`gap`,msg:`.sida har gap`},{media:!0,re:`min-width:\\s*700px`,msg:`Det finns en media query för min-width: 700px`},{css:`.sida`,prop:`grid-template-columns`,re:`^2fr\\s+1fr$`,inMedia:!0,msg:`.sida får 2fr 1fr i media queryn`},{source:`^(?:(?!@media)[\\s\\S])*h1\\s*\\{[^}]*font-size\\s*:\\s*28px`,msg:`h1 är 28px i grundregeln (före media queryn)`},{css:`h1`,prop:`font-size`,re:`^40px$`,inMedia:!0,msg:`h1 blir 40px i media queryn`},{css:`img`,prop:`max-width`,re:`^100%$`,msg:`img har max-width: 100%`},{css:`img`,prop:`height`,re:`^auto$`,msg:`img har height: auto`}],solution:`<style>
  .sida { display: grid; gap: 16px; }
  h1 { font-size: 28px; }
  img { max-width: 100%; height: auto; }
  @media (min-width: 700px) {
    .sida { grid-template-columns: 2fr 1fr; }
    h1 { font-size: 40px; }
  }
</style>
<h1>Reseblogg</h1>
<div class="sida">
  <div class="innehåll">
    <img src="https://picsum.photos/id/1018/1200/600" alt="Berg i dimma">
    <p>Dag ett i fjällen.</p>
  </div>
  <div class="sidopanel">
    <h2>Om mig</h2>
    <p>Jag gillar att vandra.</p>
  </div>
</div>`,explain:`En media query kan innehålla flera regler, så både layout och typografi kan växa med skärmen.`,hint:`Tre grundregler (.sida, h1, img) och ett @media-block med två regler.`}],"web-overflow":[{type:`web`,prompt:"Felsök: sidan skrollar i sidled på mobilen. `.kort` har `width: 100%` men padding och kant läggs till ovanpå, bilden har en fast bredd och `.knapprad` är 500px bred. Rätta alla tre utan att ta bort kortets padding eller kant.",starter:`<style>
  .kort { width: 100%; padding: 20px; border: 2px solid #6b4fbb; }
  img { width: 1000px; }
  .knapprad { width: 500px; }
</style>
<div class="kort">
  <img src="https://picsum.photos/id/1018/1000/400" alt="Berg i dimma">
  <div class="knapprad"><button>Spara</button> <button>Dela</button></div>
</div>
`,checks:[{source:`(\\*|\\.kort)\\s*\\{[^}]*box-sizing\\s*:\\s*border-box`,msg:`.kort använder box-sizing: border-box`},{css:`.kort`,prop:`padding`,msg:`.kort har kvar sin padding`},{css:`.kort`,prop:`border`,msg:`.kort har kvar sin kant`},{css:`img`,prop:`max-width`,re:`^100%$`,msg:`img har max-width: 100%`},{source:`img\\s*\\{[^}]*[^-]width\\s*:\\s*1000px`,invert:!0,msg:`Bilden har ingen fast bredd`},{css:`.knapprad`,prop:`max-width`,re:`^500px$`,msg:`.knapprad använder max-width: 500px`},{source:`\\.knapprad\\s*\\{[^}]*[^-]width\\s*:\\s*500px`,invert:!0,msg:`.knapprad har ingen fast bredd`}],solution:`<style>
  .kort { width: 100%; padding: 20px; border: 2px solid #6b4fbb; box-sizing: border-box; }
  img { max-width: 100%; }
  .knapprad { max-width: 500px; }
</style>
<div class="kort">
  <img src="https://picsum.photos/id/1018/1000/400" alt="Berg i dimma">
  <div class="knapprad"><button>Spara</button> <button>Dela</button></div>
</div>`,explain:`width: 100% plus padding och kant blir mer än 100 %. Med border-box ryms de inom bredden.`,hint:`Boxmodellen från tidigare: box-sizing: border-box. Byt sedan width mot max-width på två ställen.`},{type:`web`,prompt:"Felsök galleriet: fyra kolumner på 250px blir 1000px, och den långa adressen sticker ut. Gör kolumnerna responsiva med `repeat(auto-fit, minmax(150px, 1fr))` och låt `.länk` brytas.",starter:`<style>
  .galleri { display: grid; gap: 8px; grid-template-columns: repeat(4, 250px); }
  .galleri div { background-color: #f0e9ff; padding: 16px; }
</style>
<div class="galleri">
  <div>1</div><div>2</div><div>3</div><div>4</div>
</div>
<p class="länk">https://example.com/bilder/galleri/sommar/en-mycket-lang-adress-utan-mellanslag</p>
`,checks:[{css:`.galleri`,prop:`grid-template-columns`,re:`repeat\\(\\s*auto-(fit|fill)\\s*,\\s*minmax\\(\\s*150px\\s*,\\s*1fr\\s*\\)\\s*\\)`,msg:`Kolumnerna använder repeat(auto-fit, minmax(150px, 1fr))`},{source:`repeat\\(\\s*4\\s*,\\s*250px`,invert:!0,msg:`De fasta kolumnerna är borta`},{css:`.länk`,prop:`overflow-wrap`,re:`anywhere|break-word`,msg:`.länk får brytas`}],solution:`<style>
  .galleri { display: grid; gap: 8px; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); }
  .galleri div { background-color: #f0e9ff; padding: 16px; }
  .länk { overflow-wrap: anywhere; }
</style>
<div class="galleri">
  <div>1</div><div>2</div><div>3</div><div>4</div>
</div>
<p class="länk">https://example.com/bilder/galleri/sommar/en-mycket-lang-adress-utan-mellanslag</p>`,explain:`Fasta kolumnbredder i grid ger samma problem som fasta bredder på element. minmax låter kolumnerna krympa.`,hint:`Byt repeat(4, 250px) och lägg till en regel för .länk.`},{type:`choice`,prompt:`Ger den här regeln sidledsskroll på en mobil som är 375px bred?`,code:`<style>
  .ruta { width: 100%; padding: 16px; }
</style>`,options:[`Nej, width: 100% passar alltid`,`Ja, padding läggs till så rutan blir 32px bredare än skärmen`,`Ja, men bara om texten i rutan är lång`],answer:1,explain:`Utan box-sizing: border-box räknas padding utanför width, så rutan blir 100 % + 16px + 16px.`,why:{0:`width: 100% gäller bara innehållet. Padding läggs till på båda sidor.`,2:`Rutan sticker ut oavsett text, eftersom det är padding som gör den för bred.`}}],"web-semantic":[{type:`web`,prompt:"Bygg en bloggsida helt utan `div`: en `header` med en `h1` och en `nav` med minst tre länkar, ett `main` med minst två `article` (var och en med `h2` och stycke) och en `footer` med en länk.",starter:``,checks:[{q:`header h1`,min:1,msg:`header innehåller en h1`},{q:`header nav a`,min:3,msg:`nav i header har minst tre länkar`},{q:`main`,min:1,max:1,msg:`Det finns exakt ett main`},{q:`main > article`,min:2,msg:`main har minst två article`},{q:`article h2`,min:2,msg:`Varje article har en h2`},{q:`article p`,min:2,msg:`Varje article har ett stycke`},{q:`footer a`,min:1,msg:`footer har en länk`},{q:`div`,min:0,max:0,msg:`Sidan använder inga div`}],solution:`<header>
  <h1>Min blogg</h1>
  <nav><a href="#">Hem</a> <a href="#">Arkiv</a> <a href="#">Om</a></nav>
</header>
<main>
  <article>
    <h2>Första inlägget</h2>
    <p>Hej världen!</p>
  </article>
  <article>
    <h2>Andra inlägget</h2>
    <p>Nu kan jag semantisk HTML.</p>
  </article>
</main>
<footer><p><a href="https://sv.wikipedia.org">Läs mer på Wikipedia</a></p></footer>`,explain:`Varje del av sidan har ett element som berättar vad den är, så div behövs inte.`,hint:`nav kan ligga inuti header. Varje inlägg är en egen article.`},{type:`web`,prompt:"Felsök strukturen: sidan består bara av `div`. Byt dem mot `header`, `nav`, `main` och `footer`. Byt också väljarna i CSS:en till elementnamnen `header` och `footer` så att stilen följer med.",starter:`<style>
  .huvud { background-color: #6b4fbb; color: white; padding: 12px; }
  .fot { background-color: #f0e9ff; padding: 12px; }
</style>
<div class="huvud">
  <h1>Kodstig</h1>
  <div class="meny"><a href="#">Hem</a> <a href="#">Om</a></div>
</div>
<div class="innehåll">
  <h2>Dagens lektion</h2>
  <p>Semantisk HTML.</p>
</div>
<div class="fot"><p>Tack för besöket</p></div>
`,checks:[{q:`header h1`,min:1,msg:`Rubriken ligger i header`},{q:`header nav a`,min:2,msg:`Länkarna ligger i en nav i header`},{q:`main h2`,min:1,msg:`Innehållet ligger i main`},{q:`footer p`,min:1,msg:`Sidfoten är en footer`},{q:`div`,min:0,max:0,msg:`Inga div finns kvar`},{css:`header`,prop:`background(-color)?`,msg:`header har kvar sin bakgrund`},{css:`footer`,prop:`background(-color)?`,msg:`footer har kvar sin bakgrund`}],solution:`<style>
  header { background-color: #6b4fbb; color: white; padding: 12px; }
  footer { background-color: #f0e9ff; padding: 12px; }
</style>
<header>
  <h1>Kodstig</h1>
  <nav><a href="#">Hem</a> <a href="#">Om</a></nav>
</header>
<main>
  <h2>Dagens lektion</h2>
  <p>Semantisk HTML.</p>
</main>
<footer><p>Tack för besöket</p></footer>`,explain:`Sidan ser likadan ut, men nu förstår skärmläsare och sökmotorer vad varje del är.`,hint:`Byt varje div och dess sluttagg, och byt .huvud mot header och .fot mot footer i CSS.`}],"web-forms":[{type:`web`,prompt:'Bygg ett anmälningsformulär med tre fält: namn, e-post (`type="email"`) och en `textarea` där man berättar om sig själv. Alla fält ska ha en kopplad etikett och ett `name`, e-post ska vara `required`, och formuläret avslutas med en knapp med `type="submit"`.',starter:`<form>

</form>
`,checks:[{q:`form input`,min:2,msg:`Formuläret har minst två input`},{q:`form textarea`,min:1,msg:`Formuläret har en textarea`},{labels:!0,msg:`Alla fält har en kopplad label`},{q:`input, textarea`,attr:`name`,re:`\\S`,msg:`Alla fält har ett name`},{q:`input[type="email"][required]`,min:1,msg:`E-post har type="email" och required`},{q:`form button[type="submit"]`,min:1,msg:`Det finns en knapp med type="submit"`}],solution:`<form>
  <label for="namn">Namn</label>
  <input id="namn" name="namn">
  <label for="epost">E-post</label>
  <input id="epost" type="email" name="epost" required>
  <label for="om">Om dig</label>
  <textarea id="om" name="om"></textarea>
  <button type="submit">Anmäl mig</button>
</form>`,explain:`name avgör vad fältet heter när formuläret skickas, och etiketten gör det begripligt för alla.`,hint:`Tre par av <label for="x"> och fält med id="x" och name.`},{type:`web`,prompt:"Felsök formuläret. Namnets etikett är inte kopplad, e-postetiketten pekar på fel id, e-postfältet har fel typ, stad har bara en placeholder och skicka-knappen är en `div`. Rätta allt.",starter:`<form>
  <label>Namn</label>
  <input id="namn" name="namn">
  <label for="mejl">E-post</label>
  <input id="epost" name="epost" type="text">
  <input name="stad" placeholder="Stad">
  <div>Skicka</div>
</form>
`,checks:[{q:`input`,min:3,msg:`Alla tre fält finns kvar`},{labels:!0,msg:`Alla fält har en kopplad label`},{q:`input[type="email"]`,min:1,msg:`E-postfältet har type="email"`},{q:`form button`,min:1,msg:`Skicka är en riktig button`},{source:`<div[^>]*>\\s*Skicka`,invert:!0,msg:`Ingen div används som knapp`}],solution:`<form>
  <label for="namn">Namn</label>
  <input id="namn" name="namn">
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email">
  <label for="stad">Stad</label>
  <input id="stad" name="stad">
  <button type="submit">Skicka</button>
</form>`,explain:`for och id måste matcha exakt, och en placeholder ersätter inte en etikett.`,hint:`Lägg till for="namn", ändra for="mejl" till epost, byt typ, ge stad en label och id, och byt div mot button.`}],"web-focus":[{type:`web`,prompt:"Sidan döljer fokus för både länkar och knappar. Ta bort `outline: none` och skapa en gemensam regel för `a:focus-visible, button:focus-visible` med en tydlig `outline` och en `outline-offset`.",starter:`<style>
  a, button { outline: none; }
  button { background-color: #6b4fbb; color: white; border: 0; padding: 10px 16px; }
</style>
<p><a href="#">Läs mer om kursen</a></p>
<button>Spara</button>
`,checks:[{source:`outline\\s*:\\s*none`,invert:!0,msg:`outline: none är borttaget`},{css:`a:focus-visible`,prop:`outline`,re:`\\d+px`,msg:`a:focus-visible har en synlig outline`},{css:`button:focus-visible`,prop:`outline`,re:`\\d+px`,msg:`button:focus-visible har en synlig outline`},{prop:`outline-offset`,msg:`Fokusramen har en outline-offset`},{css:`button`,prop:`background(-color)?`,msg:`Knappen har kvar sin bakgrund`}],solution:`<style>
  button { background-color: #6b4fbb; color: white; border: 0; padding: 10px 16px; }
  a:focus-visible, button:focus-visible { outline: 3px solid #f2c94c; outline-offset: 2px; }
</style>
<p><a href="#">Läs mer om kursen</a></p>
<button>Spara</button>`,explain:`En regel med två väljare ger alla klickbara element samma tydliga fokusram.`,hint:`Ta bort hela a, button-regeln och skriv a:focus-visible, button:focus-visible { ... }.`},{type:`web`,prompt:"Felsök: ”knapparna” är en `div` och en `span`, så de går inte att nå med Tab. Gör om båda till riktiga `button` med klassen `knapp`, och ge `.knapp:focus-visible` en tydlig `outline`.",starter:`<style>
  .knapp { background-color: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; }
</style>
<div class="knapp">Spara</div>
<span class="knapp">Avbryt</span>
`,checks:[{q:`button.knapp`,min:2,msg:`Båda är button med klassen knapp`},{q:`div.knapp, span.knapp`,min:0,max:0,msg:`Inga låtsasknappar finns kvar`},{css:`.knapp:focus-visible`,prop:`outline`,re:`\\d+px`,msg:`.knapp:focus-visible har en synlig outline`},{css:`.knapp`,prop:`background(-color)?`,msg:`Knapparna har kvar sin bakgrund`}],solution:`<style>
  .knapp { background-color: #6b4fbb; color: white; border: 0; padding: 10px 16px; border-radius: 8px; }
  .knapp:focus-visible { outline: 3px solid #f2c94c; outline-offset: 2px; }
</style>
<button class="knapp">Spara</button>
<button class="knapp">Avbryt</button>`,explain:`button får fokus med Tab och fungerar med Enter och mellanslag, helt utan extra kod.`,hint:`Byt div och span mot button och lägg till en .knapp:focus-visible-regel.`}],"web-cascade":[{type:`choice`,prompt:`Vilken färg får texten?`,code:`<style>
  p { color: orange; }
  #intro { color: navy; }
  .text { color: green; }
  .text { color: purple; }
  p { color: red; }
</style>
<p id="intro" class="text">Hej</p>`,options:[`Orange`,`Marinblå (navy)`,`Grön`,`Lila`,`Röd`],answer:1,explain:`Id-väljaren är mest specifik, så den vinner oavsett var den står.`,why:{0:`Den första p-regeln förlorar både mot id, klasser och den senare p-regeln.`,2:`.text kommer två gånger, och den andra vinner över den första. Men id slår ändå klass.`,3:`Lila vinner bland klassreglerna, men id slår klass.`,4:`Sist vinner bara vid lika specificitet. Ett element är svagare än både klass och id.`}},{type:`web`,prompt:"Felsök: knappens stil hänger på ett id och en `!important`, vilket gör CSS:en svår att ändra. Skriv om med låg specificitet: ge knappen klasserna `knapp` och `knapp-fara`, flytta stilen från `#spara` till `.knapp` och se till att `.knapp-fara` vinner genom att komma sist. Ta bort id:t och `!important`.",starter:`<style>
  #spara { background-color: #6b4fbb; color: white; padding: 8px 14px; }
  .knapp-fara { background-color: crimson !important; }
</style>
<button id="spara" class="knapp-fara">Radera</button>
`,checks:[{q:`button.knapp.knapp-fara`,min:1,msg:`Knappen har klasserna knapp och knapp-fara`},{q:`button[id]`,min:0,max:0,msg:`Knappen har inget id`},{css:`.knapp`,prop:`background-color`,msg:`.knapp har en bakgrundsfärg`},{css:`.knapp-fara`,prop:`background-color`,re:`^crimson$`,msg:`.knapp-fara har background-color: crimson`},{source:`!important`,invert:!0,msg:`Ingen !important används`},{source:`#spara`,invert:!0,msg:`Id-väljaren #spara är borta`},{source:`\\.knapp\\s*\\{[\\s\\S]*\\.knapp-fara\\s*\\{`,msg:`.knapp-fara kommer efter .knapp`}],solution:`<style>
  .knapp { background-color: #6b4fbb; color: white; padding: 8px 14px; }
  .knapp-fara { background-color: crimson; }
</style>
<button class="knapp knapp-fara">Radera</button>`,explain:`Två klasser har samma specificitet, så den sista vinner. Ingen behöver id eller !important.`,hint:`Byt #spara mot .knapp, ta bort !important och id, och skriv class="knapp knapp-fara".`}],"web-components":[{type:`web`,prompt:"Bygg ett knappsystem: basklassen `.knapp` med padding, rundade hörn, kant och bakgrundsfärg, plus varianterna `.knapp-sekundär` och `.knapp-fara` som bara byter färger (ingen padding eller border-radius i varianterna). Ge knapparna rätt klasser och lägg till en synlig `.knapp:focus-visible`.",starter:`<style>

</style>
<button>Spara</button>
<button>Avbryt</button>
<button>Radera</button>
`,checks:[{css:`.knapp`,prop:`padding`,msg:`.knapp har padding`},{css:`.knapp`,prop:`border-radius`,msg:`.knapp har rundade hörn`},{css:`.knapp`,prop:`border`,msg:`.knapp har en kant`},{css:`.knapp`,prop:`background(-color)?`,msg:`.knapp har en bakgrundsfärg`},{css:`.knapp-sekundär`,prop:`background(-color)?`,msg:`.knapp-sekundär byter bakgrund`},{css:`.knapp-fara`,prop:`background(-color)?`,msg:`.knapp-fara byter bakgrund`},{source:`\\.knapp-(sekundär|fara)\\s*\\{[^}]*(padding|border-radius)`,invert:!0,msg:`Varianterna ändrar bara färger`},{q:`button.knapp`,min:3,msg:`Alla knappar har basklassen knapp`},{q:`button.knapp.knapp-sekundär`,min:1,msg:`En knapp är sekundär`},{q:`button.knapp.knapp-fara`,min:1,msg:`En knapp är fara`},{css:`.knapp:focus-visible`,prop:`outline`,msg:`.knapp:focus-visible har en outline`}],solution:`<style>
  .knapp { padding: 10px 16px; border-radius: 8px; border: 2px solid #6b4fbb; background-color: #6b4fbb; color: white; }
  .knapp-sekundär { background-color: white; color: #6b4fbb; }
  .knapp-fara { background-color: crimson; border-color: crimson; }
  .knapp:focus-visible { outline: 3px solid #f2c94c; outline-offset: 2px; }
</style>
<button class="knapp">Spara</button>
<button class="knapp knapp-sekundär">Avbryt</button>
<button class="knapp knapp-fara">Radera</button>`,explain:`Basen har formen och varianterna bara färgerna, så alla knappar ser ut att höra ihop.`,hint:`Fyra regler: .knapp, två varianter och .knapp:focus-visible.`},{type:`web`,prompt:"Felsök upprepningen: två kort har samma kod kopierad. Gör om dem till en komponent: basklassen `.kort` med padding, rundade hörn, margin och den blå bakgrunden, och varianten `.kort-grön` som bara byter bakgrund. Klassen `kort-blå` behövs inte längre.",starter:`<style>
  .kort-blå { padding: 16px; border-radius: 12px; margin-bottom: 12px; background-color: #eef6ff; }
  .kort-grön { padding: 16px; border-radius: 12px; margin-bottom: 12px; background-color: #e6f7ee; }
</style>
<div class="kort-blå">Ett blått kort</div>
<div class="kort-grön">Ett grönt kort</div>
`,checks:[{css:`.kort`,prop:`padding`,msg:`.kort har padding`},{css:`.kort`,prop:`border-radius`,msg:`.kort har rundade hörn`},{css:`.kort`,prop:`margin(-bottom)?`,msg:`.kort har margin`},{css:`.kort`,prop:`background(-color)?`,msg:`.kort har en bakgrund`},{css:`.kort-grön`,prop:`background(-color)?`,msg:`.kort-grön byter bakgrund`},{source:`\\.kort-grön\\s*\\{[^}]*(padding|border-radius|margin)`,invert:!0,msg:`.kort-grön upprepar inte basens stil`},{q:`div.kort`,min:2,msg:`Båda korten har basklassen kort`},{q:`div.kort.kort-grön`,min:1,msg:`Det gröna kortet har både bas och variant`},{source:`kort-blå`,invert:!0,msg:`kort-blå används inte längre`}],solution:`<style>
  .kort { padding: 16px; border-radius: 12px; margin-bottom: 12px; background-color: #eef6ff; }
  .kort-grön { background-color: #e6f7ee; }
</style>
<div class="kort">Ett blått kort</div>
<div class="kort kort-grön">Ett grönt kort</div>`,explain:`Nu finns formen på ett enda ställe. Vill du ändra padding på alla kort ändrar du bara .kort.`,hint:`Döp om .kort-blå till .kort och rensa bort allt utom bakgrunden i .kort-grön.`},{type:`web`,prompt:"Bygg en tagg-komponent i en flex-rad: `.taggar` är flex med `flex-wrap: wrap` och `gap`. Basklassen `.tagg` har padding, rundade hörn och bakgrund, och varianten `.tagg-vald` byter bakgrund och textfärg. Alla länkar ska få `tagg`, och exakt en av dem ska också vara `tagg-vald`. Ge `.tagg:focus-visible` en outline.",starter:`<style>

</style>
<div class="taggar">
  <a href="#">HTML</a>
  <a href="#">CSS</a>
  <a href="#">Flexbox</a>
  <a href="#">Grid</a>
</div>
`,checks:[{css:`.taggar`,prop:`display`,re:`^flex$`,msg:`.taggar har display: flex`},{css:`.taggar`,prop:`flex-wrap`,re:`^wrap$`,msg:`.taggar har flex-wrap: wrap`},{css:`.taggar`,prop:`gap`,msg:`.taggar har gap`},{css:`.tagg`,prop:`padding`,msg:`.tagg har padding`},{css:`.tagg`,prop:`border-radius`,msg:`.tagg har rundade hörn`},{css:`.tagg`,prop:`background(-color)?`,msg:`.tagg har en bakgrund`},{css:`.tagg-vald`,prop:`background(-color)?`,msg:`.tagg-vald byter bakgrund`},{css:`.tagg-vald`,prop:`color`,msg:`.tagg-vald byter textfärg`},{q:`a.tagg`,min:4,msg:`Alla länkar har klassen tagg`},{q:`a.tagg.tagg-vald`,min:1,max:1,msg:`Exakt en tagg är vald`},{css:`.tagg:focus-visible`,prop:`outline`,msg:`.tagg:focus-visible har en outline`}],solution:`<style>
  .taggar { display: flex; flex-wrap: wrap; gap: 8px; }
  .tagg { padding: 4px 12px; border-radius: 12px; background-color: #f0e9ff; }
  .tagg-vald { background-color: #6b4fbb; color: white; }
  .tagg:focus-visible { outline: 3px solid #f2c94c; }
</style>
<div class="taggar">
  <a class="tagg tagg-vald" href="#">HTML</a>
  <a class="tagg" href="#">CSS</a>
  <a class="tagg" href="#">Flexbox</a>
  <a class="tagg" href="#">Grid</a>
</div>`,explain:`Komponent, variant, layout och fokus i ett: precis så byggs riktiga gränssnitt.`,hint:`Fyra regler: .taggar, .tagg, .tagg-vald och .tagg:focus-visible.`}],"web-cards":[{type:`web`,prompt:"Del 4: Lägg till en rea-variant. Ge en av produkterna även klassen `produkt-rea`, som bara byter bakgrund. Lägg till ett stycke med klassen `rea-pris` i den produkten och ge `.rea-pris` en egen färg och `font-weight: bold`.",starter:`<style>
  .produkter { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .produkt { padding: 12px; border-radius: 12px; background: #f6f2ff; }
  .produkt img { max-width: 100%; }
</style>
<section class="produkter">
  <article class="produkt"><img src="https://picsum.photos/id/30/600/400" alt="Kaffemugg"><h3>Mugg</h3><p>99 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/600/400" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button>Köp</button></article>
</section>
`,checks:[{q:`article.produkt.produkt-rea`,min:1,max:1,msg:`Exakt en produkt har klassen produkt-rea`},{css:`.produkt-rea`,prop:`background(-color)?`,msg:`.produkt-rea byter bakgrund`},{source:`\\.produkt-rea\\s*\\{[^}]*(padding|border-radius)`,invert:!0,msg:`.produkt-rea ändrar bara bakgrunden`},{q:`.produkt-rea .rea-pris`,min:1,msg:`Rea-produkten har ett stycke med klassen rea-pris`},{css:`.rea-pris`,prop:`color`,msg:`.rea-pris har en egen färg`},{css:`.rea-pris`,prop:`font-weight`,re:`^(bold|700)$`,msg:`.rea-pris har font-weight: bold`}],solution:`<style>
  .produkter { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .produkt { padding: 12px; border-radius: 12px; background: #f6f2ff; }
  .produkt-rea { background: #fff3d6; }
  .rea-pris { color: #a4001d; font-weight: bold; }
  .produkt img { max-width: 100%; }
</style>
<section class="produkter">
  <article class="produkt produkt-rea"><img src="https://picsum.photos/id/30/600/400" alt="Kaffemugg"><h3>Mugg</h3><p>99 kr</p><p class="rea-pris">Nu 69 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/600/400" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button>Köp</button></article>
</section>`,explain:`Varianten kommer efter basen och har samma specificitet, så dess bakgrund vinner.`,hint:`class="produkt produkt-rea", en ny <p class="rea-pris"> och två nya regler.`},{type:`web`,prompt:`Del 5, felsökning: någon har ändrat i produktkorten. Nu skrollar sidan i sidled på mobilen och en knapp går inte att nå med tangentbordet. Rätta layouten (grid med auto-fit), de fasta bredderna, bilderna, alt-texten, knapparna och fokusramen.`,starter:`<style>
  .produkter { display: flex; gap: 16px; }
  .produkt { width: 400px; padding: 12px; border-radius: 12px; background: #f6f2ff; }
  .produkt img { width: 600px; }
  .knapp { background: #6b4fbb; color: white; border: 0; padding: 8px 14px; border-radius: 8px; outline: none; }
</style>
<section class="produkter">
  <article class="produkt"><img src="https://picsum.photos/id/30/600/400"><h3>Mugg</h3><p>99 kr</p><div class="knapp">Köp</div></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/600/400" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button class="knapp">Köp</button></article>
</section>
`,checks:[{css:`.produkter`,prop:`display`,re:`^grid$`,msg:`.produkter är ett grid`},{css:`.produkter`,prop:`grid-template-columns`,re:`repeat\\(\\s*auto-(fit|fill)\\s*,\\s*minmax\\(`,msg:`Kolumnerna använder repeat(auto-fit, minmax(...))`},{source:`\\.produkt\\s*\\{[^}]*[^-]width\\s*:\\s*400px`,invert:!0,msg:`.produkt har ingen fast bredd`},{css:`.produkt img`,prop:`max-width`,re:`^100%$`,msg:`Bilderna har max-width: 100%`},{source:`[^-]width\\s*:\\s*600px`,invert:!0,msg:`Bilderna har ingen fast bredd`},{q:`article.produkt img`,attr:`alt`,re:`\\S{3,}`,msg:`Alla bilder har alt-text`},{q:`button.knapp`,min:2,msg:`Båda knapparna är button`},{q:`div.knapp`,min:0,max:0,msg:`Ingen div används som knapp`},{source:`outline\\s*:\\s*none`,invert:!0,msg:`outline: none är borttaget`},{css:`.knapp:focus-visible`,prop:`outline`,re:`\\d+px`,msg:`.knapp:focus-visible har en synlig outline`}],solution:`<style>
  .produkter { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .produkt { padding: 12px; border-radius: 12px; background: #f6f2ff; }
  .produkt img { max-width: 100%; }
  .knapp { background: #6b4fbb; color: white; border: 0; padding: 8px 14px; border-radius: 8px; }
  .knapp:focus-visible { outline: 3px solid #f2c94c; }
</style>
<section class="produkter">
  <article class="produkt"><img src="https://picsum.photos/id/30/600/400" alt="Kaffemugg"><h3>Mugg</h3><p>99 kr</p><button class="knapp">Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/600/400" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button class="knapp">Köp</button></article>
</section>`,explain:`Alla fel från tidigare lektioner på en gång: fasta bredder, otillgängliga bilder, låtsasknappar och dolt fokus.`,hint:`Gå igenom en rad i taget: layout, bredd, bild, alt, knapp och fokus.`},{type:`web`,prompt:"Del 6: Styr kolumnerna själv i stället för med auto-fit. På mobil ska `.produkter` ha en kolumn. Från `min-width: 600px` blir det två lika breda kolumner och från `min-width: 900px` fyra. Lägg också en `h2` direkt före sektionen och gör den större med `font-size` från 900px.",starter:`<style>
  .produkter { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .produkt { padding: 12px; border-radius: 12px; background: #f6f2ff; }
  .produkt img { max-width: 100%; }
</style>
<section class="produkter">
  <article class="produkt"><img src="https://picsum.photos/id/30/600/400" alt="Kaffemugg"><h3>Mugg</h3><p>99 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/600/400" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/292/600/400" alt="Grönsaker"><h3>Låda</h3><p>149 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/431/600/400" alt="Kaffekopp på ett bord"><h3>Kaffe</h3><p>59 kr</p><button>Köp</button></article>
</section>
`,checks:[{css:`.produkter`,prop:`display`,re:`^grid$`,msg:`.produkter är ett grid`},{source:`auto-(fit|fill)`,invert:!0,msg:`auto-fit används inte längre`},{source:`@media\\s*\\(\\s*min-width:\\s*600px\\s*\\)\\s*\\{[^@]*\\.produkter\\s*\\{[^}]*grid-template-columns\\s*:\\s*(1fr\\s+1fr|repeat\\(\\s*2\\s*,\\s*1fr\\s*\\))\\s*;?`,msg:`Från 600px blir det två kolumner`},{source:`@media\\s*\\(\\s*min-width:\\s*900px\\s*\\)\\s*\\{[^@]*\\.produkter\\s*\\{[^}]*grid-template-columns\\s*:\\s*(1fr\\s+1fr\\s+1fr\\s+1fr|repeat\\(\\s*4\\s*,\\s*1fr\\s*\\))\\s*;?`,msg:`Från 900px blir det fyra kolumner`},{source:`600px[\\s\\S]*900px`,msg:`900px-frågan kommer efter 600px-frågan`},{q:`h2 + section.produkter`,min:1,msg:`En h2 står direkt före sektionen`},{source:`@media\\s*\\(\\s*min-width:\\s*900px\\s*\\)\\s*\\{[^@]*h2\\s*\\{[^}]*font-size`,msg:`h2 blir större från 900px`},{balanced:!0,msg:`Alla klamrar är stängda`}],solution:`<style>
  .produkter { display: grid; gap: 16px; }
  .produkt { padding: 12px; border-radius: 12px; background: #f6f2ff; }
  .produkt img { max-width: 100%; }
  @media (min-width: 600px) {
    .produkter { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 900px) {
    .produkter { grid-template-columns: repeat(4, 1fr); }
    h2 { font-size: 36px; }
  }
</style>
<h2>Veckans fynd</h2>
<section class="produkter">
  <article class="produkt"><img src="https://picsum.photos/id/30/600/400" alt="Kaffemugg"><h3>Mugg</h3><p>99 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/225/600/400" alt="Tekopp"><h3>Kopp</h3><p>89 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/292/600/400" alt="Grönsaker"><h3>Låda</h3><p>149 kr</p><button>Köp</button></article>
  <article class="produkt"><img src="https://picsum.photos/id/431/600/400" alt="Kaffekopp på ett bord"><h3>Kaffe</h3><p>59 kr</p><button>Köp</button></article>
</section>`,explain:`Med egna brytpunkter bestämmer du exakt hur många kort som syns per rad på varje skärmstorlek.`,hint:`Ta bort grid-template-columns ur grundregeln och lägg två @media-block efter den.`}],"web-form-project":[{type:`web`,prompt:'Del 4: Bygg ett nytt formulär från grunden, en anmälan till en kodkurs. Det ska ha klassen `formular` och fälten namn, e-post och ”Vad vill du lära dig?” (`textarea`). Alla fält har kopplade etiketter och `name`, namn och e-post är `required` och har rätt `autocomplete`, textarean har en hjälptext med `id="kurs-hjalp"` som kopplas med `aria-describedby`, och det finns en skicka-knapp.',starter:`<form class="formular">

</form>
`,checks:[{q:`form.formular`,min:1,msg:`Formuläret har klassen formular`},{labels:!0,msg:`Alla fält har kopplade etiketter`},{q:`input, textarea`,attr:`name`,re:`\\S`,msg:`Alla fält har ett name`},{q:`input[autocomplete="name"][required]`,min:1,msg:`Namnfältet har autocomplete="name" och required`},{q:`input[type="email"][autocomplete="email"][required]`,min:1,msg:`E-post har type="email", autocomplete="email" och required`},{q:`textarea`,attr:`aria-describedby`,re:`^kurs-hjalp$`,msg:`Textarean pekar på hjälptexten`},{q:`#kurs-hjalp`,text:`\\S`,msg:`Hjälptexten finns och har innehåll`},{q:`button[type="submit"]`,min:1,msg:`Det finns en skicka-knapp`}],solution:`<form class="formular">
  <label for="namn">Namn</label>
  <input id="namn" name="namn" autocomplete="name" required>
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" autocomplete="email" required>
  <label for="mal">Vad vill du lära dig?</label>
  <textarea id="mal" name="mal" aria-describedby="kurs-hjalp"></textarea>
  <p id="kurs-hjalp">Skriv gärna vad du redan kan.</p>
  <button type="submit">Anmäl mig</button>
</form>`,explain:`Allt från miniprojektet i ett nytt formulär: etiketter, rätt typer, autocomplete och hjälptext.`,hint:`Tre etikett-och-fält-par, en <p id="kurs-hjalp"> och en knapp.`},{type:`web`,prompt:`Del 5, felsökning: formuläret ser okej ut men är svårt att använda. Namnfältet har bara en placeholder, e-postetiketten pekar på fel id, e-postfältet har fel typ, fokusramen är borttagen och formuläret har en fast bredd som ger sidledsskroll på mobil. Rätta allt.`,starter:`<style>
  .formular { display: grid; gap: 8px; width: 600px; }
  input, textarea { font: inherit; padding: 8px; outline: none; }
</style>
<form class="formular">
  <input id="namn" name="namn" placeholder="Namn">
  <label for="mejl">E-post</label>
  <input id="epost" name="epost" type="text" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
  <button type="submit">Skicka</button>
</form>
`,checks:[{labels:!0,msg:`Alla fält har kopplade etiketter`},{q:`#epost[type="email"]`,min:1,msg:`E-postfältet har type="email"`},{source:`outline\\s*:\\s*none`,invert:!0,msg:`outline: none är borttaget`},{source:`(input|textarea):focus-visible[^{]*\\{[^}]*outline\\s*:\\s*\\d`,msg:`Fälten har en tydlig fokusram`},{css:`.formular`,prop:`max-width`,msg:`.formular har en max-width`},{source:`\\.formular\\s*\\{[^}]*[^-]width\\s*:\\s*600px`,invert:!0,msg:`Den fasta bredden är borta`}],solution:`<style>
  .formular { display: grid; gap: 8px; max-width: 600px; }
  input, textarea { font: inherit; padding: 8px; }
  input:focus-visible, textarea:focus-visible { outline: 3px solid #6b4fbb; }
</style>
<form class="formular">
  <label for="namn">Namn</label>
  <input id="namn" name="namn">
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
  <button type="submit">Skicka</button>
</form>`,explain:`Formuläret fungerar nu för den som använder skärmläsare, tangentbord eller en liten skärm.`,hint:`Lägg till en label för namn, rätta for och type, byt outline: none mot en :focus-visible-regel och width mot max-width.`},{type:`web`,prompt:"Del 6: På bredare skärmar ska etiketterna stå till vänster om fälten. Lägg till en media query för `min-width: 600px` där `.formular` får `grid-template-columns: 1fr 2fr`. Ge också `button` padding och en egen `button:focus-visible` med `outline`.",starter:`<style>
  .formular { display: grid; gap: 8px; max-width: 600px; }
  input, textarea { font: inherit; padding: 8px; }
  input:focus-visible, textarea:focus-visible { outline: 3px solid #6b4fbb; }
</style>
<form class="formular">
  <label for="namn">Namn</label>
  <input id="namn" name="namn" autocomplete="name" required>
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" autocomplete="email" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
  <button type="submit">Skicka</button>
</form>
`,checks:[{media:!0,re:`min-width:\\s*600px`,msg:`Det finns en media query för min-width: 600px`},{css:`.formular`,prop:`grid-template-columns`,re:`^1fr\\s+2fr$`,inMedia:!0,msg:`.formular får 1fr 2fr i media queryn`},{source:`(^|[\\s,}])button\\s*\\{[^}]*padding`,msg:`button har padding`},{source:`(^|[\\s,}])button:focus-visible[^{]*\\{[^}]*outline\\s*:\\s*\\d`,msg:`button:focus-visible har en tydlig outline`},{balanced:!0,msg:`Alla klamrar är stängda`}],solution:`<style>
  .formular { display: grid; gap: 8px; max-width: 600px; }
  input, textarea { font: inherit; padding: 8px; }
  input:focus-visible, textarea:focus-visible { outline: 3px solid #6b4fbb; }
  button { font: inherit; padding: 8px 16px; }
  button:focus-visible { outline: 3px solid #6b4fbb; outline-offset: 2px; }
  @media (min-width: 600px) {
    .formular { grid-template-columns: 1fr 2fr; }
  }
</style>
<form class="formular">
  <label for="namn">Namn</label>
  <input id="namn" name="namn" autocomplete="name" required>
  <label for="epost">E-post</label>
  <input id="epost" name="epost" type="email" autocomplete="email" required>
  <label for="meddelande">Meddelande</label>
  <textarea id="meddelande" name="meddelande"></textarea>
  <button type="submit">Skicka</button>
</form>`,explain:`På mobil ligger allt i en kolumn, och på bredare skärmar hamnar varje etikett bredvid sitt fält.`,hint:`@media (min-width: 600px) { .formular { ... } } plus två regler för button.`}]},{"web-headings":[{type:`order`,prompt:`Ordna raderna: först huvudrubriken Mitt band och ett stycke om bandet, sedan underrubriken Konserter och ett stycke om nästa spelning.`,lines:[`<h1>Mitt band</h1>`,`<p>Vi spelar rock varje fredag.</p>`,`<h2>Konserter</h2>`,`<p>Nästa spelning är i maj.</p>`],distractors:[{line:`<p>Vi spelar rock varje fredag.<p>`,why:`Sluttaggen behöver ett snedstreck: </p>.`}],explain:`Varje rubrik följs av stycket som hör till den. h1 är huvudrubriken och kommer först, h2 är en underrubrik längre ner.`,hint:`Börja med den viktigaste rubriken, h1.`}],"web-links":[{type:`order`,prompt:`Ordna raderna så att stycket blir ”Kolla vädret hos SMHI:s prognos innan matchen.”, där ”SMHI:s prognos” är en länk.`,lines:[`<p>`,`  Kolla vädret hos`,`  <a href="https://www.smhi.se">`,`    SMHI:s prognos`,`  </a>`,`  innan matchen.`,`</p>`],distractors:[{line:`  <a src="https://www.smhi.se">`,why:`En länks adress står i attributet href, inte src.`}],explain:`Länken ligger inuti stycket, och länktexten ligger mellan <a> och </a>. Texten före och efter länken står i stycket runt omkring.`,hint:`Stycket öppnas först och stängs sist. Vilken text ska vara klickbar?`}],"web-lists":[{type:`order`,prompt:`Ordna raderna till en rubrik och en numrerad lista med stegen för att koka pasta: koka upp vatten, lägg i pastan, häll av vattnet.`,lines:[`<h2>Koka pasta</h2>`,`<ol>`,`  <li>Koka upp vatten</li>`,`  <li>Lägg i pastan</li>`,`  <li>Häll av vattnet</li>`,`</ol>`],explain:`Rubriken står före listan. Varje steg är en <li> inuti <ol>, i den ordning man gör dem.`,hint:`Alla <li> ska ligga mellan listans start- och sluttagg.`}],"web-images":[{type:`order`,prompt:`Ordna raderna: rubriken Semesterbilder först, sedan ett stycke där en bild på fjäll är en länk till galleriet.`,lines:[`<h2>Semesterbilder</h2>`,`<p>`,`  <a href="https://example.com/galleri">`,`    <img src="fjall.jpg" alt="Snöklädda fjäll i solnedgång">`,`  </a>`,`</p>`],distractors:[{line:`    </img>`,why:`img har ingen sluttagg.`}],explain:`Bilden ligger inuti länken, som ligger inuti stycket. Det som öppnas sist stängs först.`,hint:`Tänk inifrån och ut: bilden i mitten, länken runt den och stycket ytterst.`}],"web-css":[{type:`order`,prompt:`Ordna raderna så att rubriken Skolans fotbollslag blir mörkgrön.`,lines:[`<style>`,`  h1 {`,`    color: darkgreen;`,`  }`,`</style>`,`<h1>Skolans fotbollslag</h1>`],distractors:[{line:`    color darkgreen;`,why:`Egenskap och värde skiljs med ett kolon: color: darkgreen;`}],explain:`CSS-regeln ligger i style-blocket. Väljaren h1 kommer före klammern, och deklarationen står inuti klamrarna.`,hint:`En regel börjar med väljaren och en öppnande klammer.`}],"web-colors":[{type:`order`,prompt:`Ordna raderna så att sidan får ljusgul bakgrund och rubriken Glassmenyn blir brun. Skriv regeln för body först.`,lines:[`<style>`,`  body {`,`    background-color: #fff8e1;`,`  }`,`  h1 {`,`    color: #8a4b00;`,`  }`,`</style>`,`<h1>Glassmenyn</h1>`],explain:`background-color hör till body så att hela sidan blir gul, och color hör till h1 så att rubrikens text blir brun.`,hint:`Bakgrunden gäller hela sidan, textfärgen gäller rubriken.`}],"web-classes":[{type:`order`,prompt:`Ordna raderna så att bara stycket med klassen rea blir rött. Tröjan står först, jackan på rea efter.`,lines:[`<style>`,`  .rea {`,`    color: crimson;`,`  }`,`</style>`,`<p>Tröja 299 kr</p>`,`<p class="rea">Jacka 399 kr, nu 199 kr</p>`],distractors:[{line:`  rea {`,why:`En klassväljare skrivs med punkt först: .rea`}],explain:`Regeln .rea gäller bara element med class="rea". Stycket utan klass behåller sin vanliga färg.`,hint:`Klassväljaren i CSS börjar med en punkt.`}],"web-spacing":[{type:`order`,prompt:`Ordna raderna så att varje kort får luft inuti och avstånd till nästa kort. Mattekortet kommer före engelskakortet.`,lines:[`<style>`,`  .kort {`,`    padding: 16px;`,`    margin: 24px 0;`,`  }`,`</style>`,`<div class="kort">Matte: kapitel 3</div>`,`<div class="kort">Engelska: glosor</div>`],alt:[[`<style>`,`  .kort {`,`    margin: 24px 0;`,`    padding: 16px;`,`  }`,`</style>`,`<div class="kort">Matte: kapitel 3</div>`,`<div class="kort">Engelska: glosor</div>`]],explain:`Båda deklarationerna ligger i regeln .kort, så de gäller båda korten. padding ger luft inuti och margin avstånd utanför.`,hint:`Deklarationerna ska stå mellan klamrarna efter .kort.`}],"web-fonts":[{type:`order`,prompt:`Ordna raderna så att sidan får typsnittet Verdana med reserv och luftigt radavstånd, och rubriken blir 28px. Skriv regeln för body först.`,lines:[`<style>`,`  body {`,`    font-family: Verdana, sans-serif;`,`    line-height: 1.5;`,`  }`,`  h1 {`,`    font-size: 28px;`,`  }`,`</style>`,`<h1>Bokklubben</h1>`],alt:[[`<style>`,`  body {`,`    line-height: 1.5;`,`    font-family: Verdana, sans-serif;`,`  }`,`  h1 {`,`    font-size: 28px;`,`  }`,`</style>`,`<h1>Bokklubben</h1>`]],explain:`Typsnitt och radavstånd hör till body så att de gäller hela sidan. Storleken på rubriken sätts i en egen regel för h1.`,hint:`Vilka deklarationer gäller hela sidan, och vilken gäller bara rubriken?`}],"web-borders":[{type:`order`,prompt:`Ordna raderna så att biljetten får en blå kant och rundade hörn.`,lines:[`<style>`,`  .biljett {`,`    border: 2px solid navy;`,`    border-radius: 8px;`,`  }`,`</style>`,`<div class="biljett">Köp biljett</div>`],alt:[[`<style>`,`  .biljett {`,`    border-radius: 8px;`,`    border: 2px solid navy;`,`  }`,`</style>`,`<div class="biljett">Köp biljett</div>`]],explain:`Både kanten och rundningen står i regeln .biljett, och div-elementet får regeln genom sin klass.`,hint:`Börja med style-blocket och väljaren .biljett.`}],"web-box":[{type:`order`,prompt:`Ordna raderna så att rutan blir exakt 300px bred, padding inräknad.`,lines:[`<style>`,`  .ruta {`,`    width: 300px;`,`    padding: 20px;`,`    box-sizing: border-box;`,`  }`,`</style>`,`<div class="ruta">Exakt 300px</div>`],alt:[[`<style>`,`  .ruta {`,`    width: 300px;`,`    box-sizing: border-box;`,`    padding: 20px;`,`  }`,`</style>`,`<div class="ruta">Exakt 300px</div>`],[`<style>`,`  .ruta {`,`    padding: 20px;`,`    width: 300px;`,`    box-sizing: border-box;`,`  }`,`</style>`,`<div class="ruta">Exakt 300px</div>`],[`<style>`,`  .ruta {`,`    padding: 20px;`,`    box-sizing: border-box;`,`    width: 300px;`,`  }`,`</style>`,`<div class="ruta">Exakt 300px</div>`],[`<style>`,`  .ruta {`,`    box-sizing: border-box;`,`    width: 300px;`,`    padding: 20px;`,`  }`,`</style>`,`<div class="ruta">Exakt 300px</div>`],[`<style>`,`  .ruta {`,`    box-sizing: border-box;`,`    padding: 20px;`,`    width: 300px;`,`  }`,`</style>`,`<div class="ruta">Exakt 300px</div>`]],explain:`Med box-sizing: border-box räknas padding in i width. Alla tre deklarationerna hör till samma regel.`,hint:`Alla tre deklarationerna ska ligga inuti klamrarna för .ruta.`}],"web-profile":[{type:`order`,prompt:`Ordna raderna till ett profilkort med rund bild. I kortet kommer bilden först, sedan namnet och sist texten.`,lines:[`<style>`,`  .profil img {`,`    border-radius: 50%;`,`  }`,`</style>`,`<div class="profil">`,`  <img src="lisa.jpg" alt="Lisa som håller i en gitarr">`,`  <h2>Lisa</h2>`,`  <p>Spelar gitarr i skolbandet.</p>`,`</div>`],explain:`Bild, namn och text ligger inuti kortets div. Väljaren .profil img gör bara bilden i kortet rund.`,hint:`Kortets div öppnas före innehållet och stängs sist.`}],"web-flex":[{type:`order`,prompt:`Ordna raderna till en meny där länkarna Hem, Lag och Matcher ligger på en rad med mellanrum.`,lines:[`<style>`,`  .meny {`,`    display: flex;`,`    gap: 12px;`,`  }`,`</style>`,`<div class="meny">`,`  <a href="#">Hem</a>`,`  <a href="#">Lag</a>`,`  <a href="#">Matcher</a>`,`</div>`],alt:[[`<style>`,`  .meny {`,`    gap: 12px;`,`    display: flex;`,`  }`,`</style>`,`<div class="meny">`,`  <a href="#">Hem</a>`,`  <a href="#">Lag</a>`,`  <a href="#">Matcher</a>`,`</div>`]],explain:`display: flex sätts på föräldern, och länkarna är dess barn. gap ger avstånd mellan dem.`,hint:`Flexregeln gäller behållaren, inte länkarna.`}],"web-grid":[{type:`order`,prompt:`Ordna raderna till ett rutnät med tre lika breda kolumner: Gitarr, Trummor och Bas.`,lines:[`<style>`,`  .galleri {`,`    display: grid;`,`    grid-template-columns: 1fr 1fr 1fr;`,`  }`,`</style>`,`<div class="galleri">`,`  <div>Gitarr</div>`,`  <div>Trummor</div>`,`  <div>Bas</div>`,`</div>`],alt:[[`<style>`,`  .galleri {`,`    grid-template-columns: 1fr 1fr 1fr;`,`    display: grid;`,`  }`,`</style>`,`<div class="galleri">`,`  <div>Gitarr</div>`,`  <div>Trummor</div>`,`  <div>Bas</div>`,`</div>`]],explain:`Rutnätet sätts på behållaren, och varje barn hamnar i en egen cell.`,hint:`Ett ord i grid-template-columns blir en kolumn.`}],"web-responsive":[{type:`order`,prompt:`Ordna raderna mobilen först: en kolumn som grund, och två kolumner när skärmen är minst 600px bred.`,lines:[`<style>`,`  .lista {`,`    display: grid;`,`  }`,`  @media (min-width: 600px) {`,`    .lista {`,`      grid-template-columns: 1fr 1fr;`,`    }`,`  }`,`</style>`],distractors:[{line:`  @media (max-width: 600px) {`,why:`Mobilen först betyder att du lägger till layout när skärmen blir bredare, med min-width.`}],explain:`Grundregeln gäller alla skärmar. Regeln inuti @media läggs till bara när skärmen är minst 600px bred, så den kommer efter grunden.`,hint:`En regel inuti en media query har en extra nivå av klamrar.`}],"web-overflow":[{type:`order`,prompt:`Ordna raderna så att rutan aldrig blir bredare än 600px och den långa adressen bryts. Skriv regeln för rutan först.`,lines:[`<style>`,`  .ruta {`,`    max-width: 600px;`,`  }`,`  .adress {`,`    overflow-wrap: anywhere;`,`  }`,`</style>`,`<div class="ruta">`,`  <p class="adress">https://example.com/resultat/innebandy/hosten/alla-matcher</p>`,`</div>`],explain:`max-width låter rutan krympa på smala skärmar, och overflow-wrap: anywhere låter adressen brytas. Stycket med adressen ligger inuti rutan.`,hint:`Stycket med adressen ska ligga inuti rutans div.`}],"web-semantic":[{type:`order`,prompt:`Ordna raderna till en sida för skoltidningen: sidhuvud med rubrik, huvudinnehåll med en artikel, och en sidfot sist.`,lines:[`<header>`,`  <h1>Skoltidningen</h1>`,`</header>`,`<main>`,`  <article>`,`    <h2>Vinst i innebandy</h2>`,`  </article>`,`</main>`,`<footer>Skrivet av klass 9B</footer>`],explain:`header kommer först och footer sist. Artikeln är en del av huvudinnehållet, så article ligger inuti main.`,hint:`Vilket element ska ligga inuti main?`}],"web-forms":[{type:`order`,prompt:`Ordna raderna till ett anmälningsformulär: först namn, sedan e-post, med etiketten före varje fält, och knappen sist.`,lines:[`<form>`,`  <label for="namn">Namn</label>`,`  <input id="namn" type="text" name="namn">`,`  <label for="epost">E-post</label>`,`  <input id="epost" type="email" name="epost">`,`  <button type="submit">Anmäl mig</button>`,`</form>`],distractors:[{line:`  <label for="e-post">E-post</label>`,why:`for måste vara exakt samma som fältets id, här epost.`}],explain:`Varje etikett står direkt före sitt fält och kopplas till det med for och id. Allt ligger inuti form.`,hint:`Etikettens for ska matcha fältets id.`}],"web-focus":[{type:`order`,prompt:`Ordna raderna så att knappen får en tydlig orange fokusram när man tabbar till den.`,lines:[`<style>`,`  button:focus-visible {`,`    outline: 3px solid darkorange;`,`    outline-offset: 2px;`,`  }`,`</style>`,`<button>Spela igen</button>`],distractors:[{line:`    outline: none;`,why:`outline: none tar bort fokusramen. Då ser tangentbordsanvändare inte var de är.`}],alt:[[`<style>`,`  button:focus-visible {`,`    outline-offset: 2px;`,`    outline: 3px solid darkorange;`,`  }`,`</style>`,`<button>Spela igen</button>`]],explain:`Väljaren button:focus-visible gäller när knappen har tangentbordsfokus, och deklarationerna ritar ramen.`,hint:`Ramen skrivs med outline inuti regeln för :focus-visible.`}],"web-cascade":[{type:`order`,prompt:`Ordna raderna så att vanliga stycken blir marinblå (navy) och stycket med klassen rea blir rött. Den grå regeln står först i style-blocket, och stycket Ordinarie pris står före rea-stycket.`,lines:[`<style>`,`  p { color: gray; }`,`  .rea { color: red; }`,`  p { color: navy; }`,`</style>`,`<p>Ordinarie pris</p>`,`<p class="rea">Nu halva priset</p>`],alt:[[`<style>`,`  p { color: gray; }`,`  p { color: navy; }`,`  .rea { color: red; }`,`</style>`,`<p>Ordinarie pris</p>`,`<p class="rea">Nu halva priset</p>`]],explain:`De två p-reglerna har samma specificitet, så den som står sist vinner: navy måste komma efter gray. Klassen .rea slår p oavsett var den står.`,hint:`Vid lika specificitet vinner regeln som kommer sist.`}],"web-components":[{type:`order`,prompt:`Ordna raderna till en notis-komponent med en felvariant. Skriv basklassen före varianten, och visa Sparat! före felnotisen.`,lines:[`<style>`,`  .notis {`,`    padding: 12px;`,`    border-radius: 8px;`,`  }`,`  .notis-fel {`,`    background: #ffe0e0;`,`  }`,`</style>`,`<div class="notis">Sparat!</div>`,`<div class="notis notis-fel">Något gick fel.</div>`],distractors:[{line:`<div class="notis-fel">Något gick fel.</div>`,why:`Varianten ändrar bara lite. Elementet behöver basklassen notis också.`}],alt:[[`<style>`,`  .notis {`,`    border-radius: 8px;`,`    padding: 12px;`,`  }`,`  .notis-fel {`,`    background: #ffe0e0;`,`  }`,`</style>`,`<div class="notis">Sparat!</div>`,`<div class="notis notis-fel">Något gick fel.</div>`]],explain:`Basklassen ger alla notiser samma grund. Felnotisen har båda klasserna, så den får grunden plus den röda bakgrunden.`,hint:`Ett element kan ha två klasser med mellanslag emellan.`}],"web-flex-adv":[{type:`order`,prompt:`Ordna raderna så att korten i .kort-rad delar på platsen och bryter till ny rad när det blir trångt. Skriv regeln för raden först.`,lines:[`<style>`,`  .kort-rad {`,`    display: flex;`,`    flex-wrap: wrap;`,`  }`,`  .kort-rad div {`,`    flex: 1 1 140px;`,`  }`,`</style>`],alt:[[`<style>`,`  .kort-rad {`,`    flex-wrap: wrap;`,`    display: flex;`,`  }`,`  .kort-rad div {`,`    flex: 1 1 140px;`,`  }`,`</style>`]],explain:`display: flex och flex-wrap sätts på behållaren. flex: 1 1 140px sätts på barnen, så de utgår från 140px och delar på resten.`,hint:`Vilka egenskaper hör till behållaren och vilken hör till barnen?`}],"web-grid-areas":[{type:`order`,prompt:`Ordna raderna till ett rutnät där topp sträcker sig över två kolumner och meny och innehåll ligger bredvid varandra under. Koppla sedan header, nav och main i den ordningen.`,lines:[`<style>`,`  .sida {`,`    display: grid;`,`    grid-template-areas:`,`      "topp topp"`,`      "meny innehall";`,`  }`,`  header { grid-area: topp; }`,`  nav { grid-area: meny; }`,`  main { grid-area: innehall; }`,`</style>`],distractors:[{line:`      "meny innehall innehall";`,why:`Alla rader i mallen måste ha lika många celler, här två.`}],alt:[[`<style>`,`  .sida {`,`    grid-template-areas:`,`      "topp topp"`,`      "meny innehall";`,`    display: grid;`,`  }`,`  header { grid-area: topp; }`,`  nav { grid-area: meny; }`,`  main { grid-area: innehall; }`,`</style>`]],explain:`Varje textsträng är en rad i mallen, och topp står två gånger för att sträcka sig över båda kolumnerna. Sedan kopplas elementen till områdena med grid-area.`,hint:`Den översta raden i layouten är den första strängen.`}],"web-position":[{type:`order`,prompt:`Ordna raderna så att etiketten Rea hamnar i övre högra hörnet av kortet. Skriv regeln för kortet först.`,lines:[`<style>`,`  .kort {`,`    position: relative;`,`  }`,`  .etikett {`,`    position: absolute;`,`    top: 8px;`,`    right: 8px;`,`  }`,`</style>`,`<article class="kort"><span class="etikett">Rea</span></article>`],alt:[[`<style>`,`  .kort {`,`    position: relative;`,`  }`,`  .etikett {`,`    position: absolute;`,`    right: 8px;`,`    top: 8px;`,`  }`,`</style>`,`<article class="kort"><span class="etikett">Rea</span></article>`],[`<style>`,`  .kort {`,`    position: relative;`,`  }`,`  .etikett {`,`    top: 8px;`,`    position: absolute;`,`    right: 8px;`,`  }`,`</style>`,`<article class="kort"><span class="etikett">Rea</span></article>`],[`<style>`,`  .kort {`,`    position: relative;`,`  }`,`  .etikett {`,`    top: 8px;`,`    right: 8px;`,`    position: absolute;`,`  }`,`</style>`,`<article class="kort"><span class="etikett">Rea</span></article>`],[`<style>`,`  .kort {`,`    position: relative;`,`  }`,`  .etikett {`,`    right: 8px;`,`    position: absolute;`,`    top: 8px;`,`  }`,`</style>`,`<article class="kort"><span class="etikett">Rea</span></article>`],[`<style>`,`  .kort {`,`    position: relative;`,`  }`,`  .etikett {`,`    right: 8px;`,`    top: 8px;`,`    position: absolute;`,`  }`,`</style>`,`<article class="kort"><span class="etikett">Rea</span></article>`]],explain:`Kortet får position: relative och blir referenspunkt. Etiketten med position: absolute placeras sedan mot kortet, och därför ligger den inuti det.`,hint:`Vilket element ska vara referenspunkt, och vilket ska flyttas?`}],"web-units":[{type:`order`,prompt:`Ordna raderna så att innehållet blir en centrerad kolumn på högst 40rem och rubriken växer med skärmen inom gränser. Skriv regeln för main först.`,lines:[`<style>`,`  main {`,`    max-width: 40rem;`,`    margin: 0 auto;`,`  }`,`  h1 {`,`    font-size: clamp(1.5rem, 5vw, 3rem);`,`  }`,`</style>`,`<main>`,`  <h1>Turneringen</h1>`,`</main>`],alt:[[`<style>`,`  main {`,`    margin: 0 auto;`,`    max-width: 40rem;`,`  }`,`  h1 {`,`    font-size: clamp(1.5rem, 5vw, 3rem);`,`  }`,`</style>`,`<main>`,`  <h1>Turneringen</h1>`,`</main>`]],explain:`max-width och margin: 0 auto ger en lagom bred, centrerad kolumn. clamp låter rubriken flyta med fönstret men aldrig bli mindre än 1.5rem eller större än 3rem.`,hint:`clamp skrivs som clamp(min, önskat, max).`}],"web-inputs":[{type:`order`,prompt:`Ordna raderna till ett formulär: först ålder (ett tal mellan 13 och 99 som måste fyllas i), sedan telefon, med etiketten före varje fält, och knappen sist.`,lines:[`<form>`,`  <label for="alder">Ålder</label>`,`  <input id="alder" name="alder" type="number" min="13" max="99" required>`,`  <label for="tel">Telefon</label>`,`  <input id="tel" name="tel" type="tel" autocomplete="tel">`,`  <button type="submit">Anmäl</button>`,`</form>`],explain:`type="number" med min och max ger en kontroll av åldern, och type="tel" ger siffertangentbord på mobilen. Varje fält har sin etikett direkt före.`,hint:`Etiketten för ålder kommer före åldersfältet.`}],"web-choices":[{type:`order`,prompt:`Ordna raderna till en grupp radioknappar med frågan Vilken sport? där man väljer Fotboll eller Tennis, i den ordningen.`,lines:[`<form>`,`  <fieldset>`,`    <legend>Vilken sport?</legend>`,`    <input type="radio" id="fotboll" name="sport" value="fotboll">`,`    <label for="fotboll">Fotboll</label>`,`    <input type="radio" id="tennis" name="sport" value="tennis">`,`    <label for="tennis">Tennis</label>`,`  </fieldset>`,`</form>`],distractors:[{line:`    <input type="radio" id="tennis" name="tennis" value="tennis">`,why:`Radioknappar i samma grupp måste ha samma name, annars kan man välja båda.`}],explain:`legend är gruppens rubrik och står först i fieldset. Varje radioknapp följs av sin etikett, och båda knapparna har name="sport".`,hint:`legend kommer direkt efter att fieldset öppnas.`}],"web-a11y":[{type:`order`,prompt:`Ordna raderna: hopplänken först på sidan, sedan sidhuvudet med rubrik och meny, och sist huvudinnehållet som hopplänken leder till.`,lines:[`<a class="hoppa" href="#innehall">Hoppa till innehållet</a>`,`<header>`,`  <h1>Simhallen</h1>`,`  <nav aria-label="Huvudmeny">`,`    <a href="#">Öppettider</a>`,`  </nav>`,`</header>`,`<main id="innehall">`,`  <h2>Priser</h2>`,`</main>`],distractors:[{line:`  <h3>Priser</h3>`,why:`Hoppa inte över rubriknivåer. Efter h1 kommer h2.`}],explain:`Hopplänken står först så att tangentbordsanvändare når den direkt. Den pekar på main med id="innehall", och rubrikerna går i ordning från h1 till h2.`,hint:`Menyn ligger i sidhuvudet, före huvudinnehållet.`}],"web-tables":[{type:`order`,prompt:`Ordna raderna till en tabell över matcherna i maj, med rubrik, kolumnrubriker och datarader i datumordning.`,lines:[`<table>`,`  <caption>Matcher i maj</caption>`,`  <thead>`,`    <tr><th scope="col">Datum</th><th scope="col">Motståndare</th></tr>`,`  </thead>`,`  <tbody>`,`    <tr><td>3 maj</td><td>Hajarna</td></tr>`,`    <tr><td>10 maj</td><td>Örnarna</td></tr>`,`  </tbody>`,`</table>`],explain:`caption står först i table. thead med kolumnrubrikerna kommer före tbody med datan.`,hint:`Tabellens rubrik, caption, är det första inuti table.`}],"web-variables":[{type:`order`,prompt:`Ordna raderna så att accentfärgen sparas i en variabel på :root och knappen använder den som bakgrund. Skriv :root först.`,lines:[`<style>`,`  :root {`,`    --accent: #2f9e7a;`,`  }`,`  .knapp {`,`    background: var(--accent);`,`    color: white;`,`  }`,`</style>`,`<button class="knapp">Gå med</button>`],alt:[[`<style>`,`  :root {`,`    --accent: #2f9e7a;`,`  }`,`  .knapp {`,`    color: white;`,`    background: var(--accent);`,`  }`,`</style>`,`<button class="knapp">Gå med</button>`]],explain:`Variabeln definieras på :root så att den gäller hela sidan, och knappen läser den med var(--accent).`,hint:`Variabeln skapas på ett ställe och läses på ett annat.`}],"web-transitions":[{type:`order`,prompt:`Ordna raderna så att kortet växer mjukt när man håller över det, men utan övergång för den som valt minskad rörelse. Skriv grundregeln först och hover-regeln sedan.`,lines:[`<style>`,`  .kort {`,`    transition: transform 0.2s ease;`,`  }`,`  .kort:hover { transform: scale(1.05); }`,`  @media (prefers-reduced-motion: reduce) {`,`    .kort {`,`      transition: none;`,`    }`,`  }`,`</style>`],explain:`Övergången sätts på grundregeln och förändringen på :hover. Media-frågan kommer sist så att transition: none vinner för den som valt minskad rörelse.`,hint:`Vid lika specificitet vinner regeln som kommer sist.`}],"web-selectors":[{type:`order`,prompt:`Ordna raderna så att alla menyrader utom den sista får en kant under sig. Raderna är Start, Resultat och Kontakt.`,lines:[`<style>`,`  .meny > li:not(:last-child) {`,`    border-bottom: 1px solid #ddd;`,`  }`,`</style>`,`<ul class="meny">`,`  <li>Start</li>`,`  <li>Resultat</li>`,`  <li>Kontakt</li>`,`</ul>`],explain:`:not(:last-child) väljer alla li utom den sista, så kanten hamnar bara mellan raderna.`,hint:`Väljaren ska utesluta den sista raden.`}],"web-darkmode":[{type:`order`,prompt:`Ordna raderna så att sidan är ljus som standard och mörk när användaren har valt mörkt läge. Skriv body-regeln sist.`,lines:[`<style>`,`  :root {`,`    color-scheme: light dark;`,`    --bg: #ffffff;`,`  }`,`  @media (prefers-color-scheme: dark) {`,`    :root {`,`      --bg: #18161f;`,`    }`,`  }`,`  body { background: var(--bg); }`,`</style>`],alt:[[`<style>`,`  :root {`,`    --bg: #ffffff;`,`    color-scheme: light dark;`,`  }`,`  @media (prefers-color-scheme: dark) {`,`    :root {`,`      --bg: #18161f;`,`    }`,`  }`,`  body { background: var(--bg); }`,`</style>`]],explain:`De ljusa värdena står först. Media-frågan kommer efter och skriver över --bg i mörkt läge, och body läser variabeln.`,hint:`Media-frågan måste komma efter de ljusa värdena för att vinna.`}]});export{D as default};