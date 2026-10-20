# Kodstig

Kodstig är en svensk app för nybörjare som vill lära sig C#, Python och HTML/CSS. Den innehåller korta lektioner, en lärstig, ett kodlabb och Milo, en liten AI-studiekompis som körs i webbläsaren.

Allt lektionsinnehåll är **nyskrivet för den här versionen**. Det är inte kopierat från någon tidigare app. Totalt finns 130 lektioner, 852 övningar och 17 miniprojekt:

| Spår | Lektioner | Övningar |
| --- | --- | --- |
| C# | 49 | 327 |
| Python | 43 | 277 |
| HTML/CSS | 38 | 248 |

## Kom igång

Du behöver Node.js 20 eller senare.

```bash
npm install
npm run dev        # utvecklingsserver på http://localhost:5173
npm run build      # bygger till dist/
npm run preview    # visar det byggda resultatet
npm test           # enhetstester (motorer, innehåll, XP, synk, Milo)
npm run test:e2e   # webbläsartester (kräver npm run build först och Chromium via Playwright)
```

Utan konfiguration startar appen direkt i läget **Fortsätt utan konto**. Framstegen sparas då bara i webbläsaren, och det står tydligt i appen. Inloggningsknappen talar ärligt om att inloggning inte är konfigurerad. Den låtsas aldrig skapa ett konto.

## Publicerad version

Appen publiceras automatiskt på GitHub Pages varje gång `main` uppdateras (se `.github/workflows/pages.yml`): https://arizbiswas.github.io/kodstig/

Kodstig är en installerbar webbapp (PWA). I Chrome eller Edge på datorn installerar du den med installationsikonen i adressfältet. På Android väljer du **Installera app** i webbläsarens meny, och på iPhone trycker du på **Dela → Lägg till på hemskärmen** i Safari. Appen kan starta utan nät. Milos modell och data från andra tjänster sparas aldrig av appens service worker (`public/sw.js`), och sidan hämtas alltid från nätet först så att uppdateringar syns direkt.

Bygger du för en annan sökväg sätter du `BASE_PATH`, till exempel `BASE_PATH=/kodstig/ npm run build`.

## Konton med Supabase (Google-inloggning)

Kodstig använder [Supabase](https://supabase.com) för riktig inloggning, både med Google och med e-postlänk. Supabase har en gratisnivå.

1. Skapa ett projekt i Supabase.
2. Gå till **SQL Editor → New query**, klistra in hela `supabase/schema.sql` och kör den. Då skapas tabellen, radnivåsäkerheten (RLS) och tre funktioner: `kodstig_load`, `kodstig_save` och `kodstig_reset`.
3. Aktivera Google under **Authentication → Providers → Google**:
   - Skapa ett OAuth-klient-ID av typen *Web application* i Google Cloud Console (APIs & Services → Credentials).
   - Lägg till Supabase callback-URL som *Authorized redirect URI*. Den står på Google-sidan i Supabase och ser ut som `https://<projekt>.supabase.co/auth/v1/callback`.
   - Klistra in klient-ID och klienthemlighet i Supabase. **Klienthemligheten ska bara ligga i Supabase**, aldrig i Kodstigs kod.
4. Under **Authentication → URL Configuration** anger du appens adress som *Site URL*, och lägger till samma adress (och `http://localhost:5173` för utveckling) under *Redirect URLs*.
5. Hämta *Project URL* och *anon public key* under **Project Settings → API** och ange dem på ett av två sätt:
   - vid bygget: skapa `.env.local` med `VITE_SUPABASE_URL=...` och `VITE_SUPABASE_ANON_KEY=...`, eller
   - efter bygget: fyll i `public/config.js` (blir `dist/config.js`).

Anon-nyckeln är publik i Supabase och får ligga i webbläsaren, eftersom skyddet ligger i databasens RLS. Lägg **aldrig** in `service_role`-nyckeln någonstans i appen.

Vill du bara ha Google kan du sätta `emailEnabled: false` i `config.js`.

### Så skyddas och synkas datan

- Varje rad i `kodstig_profiles` tillhör `auth.uid()` från den inloggades verifierade token. Klienten skickar aldrig något användar-ID, utan servern avgör vem som äger datan.
- RLS gör att en användare bara kan läsa och ändra sin egen rad. Det är testat mot en lokal Postgres, se nedan.
- Sparningar har versionsnummer (`rev`). Om två flikar eller enheter sparar samtidigt slås ändringarna ihop i stället för att skriva över varandra.
- Avklarade lektioner och bonusar är mängder med nycklar, så samma lektion kan aldrig ge XP två gånger, inte ens när flera enheter slås ihop.
- Repetitionskön (`review`) sparas per lektion med en tidsstämpel, och den senaste ändringen vinner när enheter slås ihop. Logiken finns i `src/state/review.js`, sviten med frysningar i `src/state/streak.js`.
- Nollställning höjer ett `epoch`-nummer. En gammal flik som fortfarande har gamla framsteg kan därför inte återställa dem efter en nollställning.
- Appen fungerar offline. Ändringar sparas lokalt och skickas när anslutningen är tillbaka, med nya försök efter 1, 2, 5, 10 och 30 sekunder.
- Vid utloggning rensas den lokala kopian av kontot och Milos samtal.
- Den som har övat utan konto och sedan loggar in får en engångsfråga om att flytta framstegen till kontot. Därefter tas den lokala profilen bort.

## Mediefiler som du behöver lägga in

Ljud- och bildfilerna följer inte med i koden. Använd bara material som du har rätt att använda. Länkar till YouTube-klipp är inte filerna själva, så filerna behöver laddas ner eller skapas separat.

| Fil | Används till | Om filen saknas |
| --- | --- | --- |
| `public/audio/rizz-sound-effect.mp3` | Ljud vid rätt svar | En kort ersättningston spelas |
| `public/audio/level-complete-loop.wav` | Firandet när en lektion är klar (bara de första 4 sekunderna, i en slinga) | Firandet blir tyst |
| `public/media/level-complete.gif` | Animationen när en lektion är klar | Milo visas i stället |
| `public/media/level-complete-poster.jpg` | Stillbild vid minskad rörelse och paus | Milo visas i stället |
| `public/companions/milo.svg` | Milo (finns redan) | – |

Firandeljudet stoppas när användaren går vidare, stänger, pausar, stänger av ljudet eller lämnar vyn, och det spelas aldrig två slingor samtidigt.

## Milo

- Milo använder [WebLLM](https://github.com/mlc-ai/web-llm) med **Qwen3 1.7B** (q4f16, eller q4f32 om grafikkortet saknar shader-f16). Modellen körs i en Web Worker på WebGPU, direkt i användarens webbläsare. Ingen server och ingen API-nyckel behövs.
- Modellen hämtas först när användaren trycker på **Starta Milo**. Innan dess visas en varning om att det är ungefär 1 GB. Under nedladdningen visas verklig framdrift, och den går att avbryta. AI-koden ligger i en egen fil som inte laddas förrän då.
- Koden från Kodlabbet eller lektionen skickas bara med när användaren själv kryssar i **Ta med koden från Kodlabbet**.
- Samtalet sparas per konto i flikens session och rensas vid utloggning. Ett svar som kommer efter utloggning eller kontobyte visas inte.
- Utan WebGPU (till exempel i många mobilwebbläsare och Safari) säger Milo det tydligt. Tipsen i Kodlabbet fungerar ändå, eftersom de inte använder AI.

## Kodlabbet och kodmotorerna

Elevens kod körs aldrig med `eval`. Python och C# tolkas av två egna, förenklade tolkar (`src/engine/`) i en Web Worker. Varje körning har en stegbudget och en tidsgräns på 5 sekunder, och workern avslutas helt om något hänger sig. HTML/CSS visas i en `iframe` med tom `sandbox` och en strikt CSP, så elevens sida kan inte köra skript eller nå appens DOM eller kontodata.

Tolkarna har tydliga gränser, och det står i appen under **Vad klarar Kodlabbet?**:

- **Python:** variabler, if/elif/else, while/for, range, funktioner, rekursion, listor, ordlistor, tupler, mängder, listbyggare, lambda och `sorted(key=...)`, klasser med arv och `super()`, `try/except/else/finally` och `raise`, strängmetoder och f-strängar. Följande saknas: `import`, `with`, `*args`, filer och `input()`.
- **C#:** toppnivåsatser eller `class Program` med `Main`, metoder med standardvärden, int/double/bool/string/char, arrayer, `List<T>`, `Dictionary<K,V>`, egna klasser med fält, egenskaper, konstruktorer, arv, `abstract`/`virtual`/`override` och interface, `try`/`catch`/`finally`/`throw`, `switch`, lambdas och vanliga LINQ-metoder (`Where`, `Select`, `OrderBy`, `Sum`, `Count`, `Any`, `First` med flera), `out` med `TryParse`/`TryGetValue`, stränginterpolation med format och `Math`. Följande saknas: `Console.ReadLine`, egna generiska typer, `struct`, `record`, `async`, switch-uttryck och namespaces utöver det enklaste.

Felmeddelandena är på svenska och pekar på raden. **Fastnat? Få en ledtråd** ger tre steg (en fråga, en förklaring och ett exempel). Ledtrådarna börjar om när koden ändras.

## Teman

Det finns två teman, **Minecraft** (standard) och **Klassisk**. Byt i sidomenyn eller under Inställningar. Minecraft-temat har blocktexturer, pixeltypsnittet Pixelify Sans på rubriker och knappar (brödtexten är kvar i ett lättläst typsnitt) och en liten värld på startsidan. Världen har dag och natt efter klockan, en kista med tips och en höna man kan klicka på. Pixeltypsnittet hämtas från Google Fonts, och saknas det används ett vanligt typsnitt.

## Projektstruktur

```
src/
  app.js              skal, sessioner, routing, navigation
  content/            lektioner (csharp.js, python.js, web.js, fortsättningskapitlen i *-pro.js, extraövningar i *-extra.js, ordningspussel och förutsägelsefrågor i *-order.js) och ordlista
  engine/             Python- och C#-tolkar, rättning, HTML-kontroller, ledtrådar
  state/              datamodell, XP och nivåer, synk, Supabase, aktiv tid
  ai/                 Milo (logik, WebLLM-motor, worker)
  ui/                 vyer, övningar, firande, Milo-panel, värld, ikoner
  styles/             base.css (Klassisk) och minecraft.css
supabase/schema.sql   tabell, RLS och funktioner
tests/unit            enhetstester (node --test)
tests/e2e             webbläsartester (Playwright)
tests/sql             RLS-test mot lokal Postgres
```

## Vad som är testat och vad som inte är det

**Automatiskt testat (alla gröna):**

- 39 enhetstester (`npm test`):
  - **Läroplanen:** antal lektioner och övningar, att alla exempel och lösningar går att köra och ger rätt svar, att svarsalternativ som beskriver utskrift stämmer med motorn, och att likvärdiga blanksteg godtas.
  - **Motorerna:** stegbudget, sandlådeförsök, kompileringsfel och ledtrådar.
  - **XP och synk:** nivåer, bonusar, sammanslagning, två flikar, dubbelklick, nollställning mot gammal flik, offline och omladdning.
  - **Milo med låtsasmotor:** ingen laddning före start, kod bara när man väljer, sena svar efter utloggning, kortad historik och avbruten start.
- 16 webbläsarflöden i Chromium (`npm run test:e2e`):
  - **Start:** introduktion, demo utan XP och ärlig inloggning utan konfiguration.
  - **Lektioner:** XP en gång, framsteg som finns kvar efter omladdning och utkast.
  - **Lärstigen:** öppna och stänga kapitel, spårbyte i båda temana, att linjen träffar stationerna vid tre bredder, och klart kapitel som blir grönt.
  - **Kodlabbet:** fel, ledtrådar som börjar om, oändlig loop och sparning per språk, samt HTML-isolering i sandlådan.
  - **Tillgänglighet:** mobil utan horisontell scroll, tangentbord och fokus, och minskad rörelse.
  - **Milo:** ingen nedladdning före start och ärligt fel utan WebGPU, plus ett separat flöde med låtsasmodell.
  - **Flera flikar och nollställning.**
  - **Alla 28 HTML/CSS-lösningar** klarar sina kontroller i webbläsaren.
- RLS och funktionerna i `schema.sql` är testade mot en lokal Postgres 16 med en Supabase-lik `auth.uid()` (`tests/sql/`). Användare B ser 0 rader från A och kan inte ändra eller skapa A:s rad, en gammal flik får konflikt efter nollställning, och `anon` nekas.

**Inte testat, eftersom det kräver sådant som inte fanns i testmiljön:**

- **Milo med den riktiga modellen.** Testmiljön har ingen WebGPU, så själva nedladdningen av Qwen3 och riktiga svar är inte körda. Gränssnittet och logiken är testade med en låtsasmotor, och det är tydligt avskilt från riktiga körningar.
- **Riktig inloggning mot Supabase och Google.** Det kräver ditt Supabase-projekt och Google-klient. Databasdelen är testad lokalt, men själva OAuth-flödet är det inte.
- **Ljud- och bildfilerna,** eftersom de inte finns med. Reservbeteendet när de saknas är testat.
- Safari och Firefox är inte testade, bara Chromium.
