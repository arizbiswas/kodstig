# Kodstigs projektplan

Utgår från rapporten "Kodstig jämfört med Mimo och andra kodappar" (20 oktober 2026, `research/kodstig-jamforelse.md` i projektmappen). Rapporten skrevs mot commit 97348a4 (71 lektioner, 264 övningar). Siffran inom parentes efter en punkt är förslagets nummer i rapporten.

## Fas 0: Avstämning
- [x] Gå igenom rapportens 14 kritikpunkter och 16 förslag mot appen som den är nu och bocka av det som redan är gjort. Se [Avstämning](#avstämning-20-oktober-2026) längst ner.

## Fas 1: Snabba vinster (klar 20 oktober 2026)
- [x] Ledtrådar steg för steg (trappan från Kodlabbet) i alla lektionsövningar (2)
- [x] Rad med kodtecken ovanför mobilens tangentbord (4)
- [x] Förklaring till varje fel svar i alla flervalsfrågor (5)
- [x] Korta stegrubriker i kodexemplen (16)

## Fas 2: Daglig repetition (klar 20 oktober 2026)
- [x] Repetitionskö per begrepp: fel och gamla begrepp kommer tillbaka efter 1, 3, 7 och 14 dagar i ett kort dagligt pass. Ersätter repetitionsbonusen (1)
- [x] Snällare svit med frysningar eller veckomål, där repetitionen räknas (12)

Så blev det: varje klarad lektion är ett begrepp i en kö som kommer tillbaka efter 1, 3, 7, 14 och 30 dagar. Övningar som gick fel kommer först. Dagens pass har högst fem frågor och ger 10 XP en gång per dag. Rena projektlektioner utan korta övningar repeteras inte. Sviten räknar lektion, dagsmål, repetition och dagens utmaning, och två missade dagar per vecka fryses automatiskt.

## Fas 3: Nya sätt att öva (klar 20 oktober 2026)
- [x] Ordningspussel där man lägger kodrader i rätt ordning, med knappar (3). Ett per lektion utom miniprojekten, 113 st, ofta med en felaktig rad att välja bort.
- [x] Nivåtest i början och "testa ut" per kapitel (10). Nivåtestet: två frågor per grundkapitel tills något blir fel. Testa ut: 4 av 5 rätt. Ger ingen XP, lektionerna finns kvar.
- [x] Trappan förutsäg, pussel, lucka, tom editor i lektioner som saknar den (6). Övningarna visas i den ordningen i alla lektioner, och 16 lektioner fick en "Vad skrivs ut?"-fråga.
- [x] Stegvis körning som visar variablernas värden rad för rad (15). Knappen "Kör steg för steg" i Kodlabbet, för Python och C#.

## Fas 4: Vägen till riktig utvecklare (klar 20 oktober 2026)
- [x] Ta med dig koden: köra koden i VS Code och terminalen, ladda ner sin kod (9). Kodlabbet har "Ladda ner" och en guide per språk, C#-kapitlet har en lektion om riktiga .NET-projekt.
- [x] Det som fortfarande saknas för egna program, till exempel input()/ReadLine, import random och lite JavaScript (7). Nya kapitel "Program som pratar med dig" i Python och C#, och "Lite JavaScript" i HTML/CSS. JavaScript körs isolerat i en sandlåda utan nätverk, med loopskydd.
- [x] Grunderna i Git. Nytt spår "Git och terminalen" med tre kapitel: terminalen, Git på datorn, grenar och GitHub.

## Fas 5: Milo och delning (klar 21 oktober 2026)
- [x] Milo får uppgiften, facit och testresultatet och ger bara ledtrådar, aldrig hela lösningen (8). Bara när eleven själv kryssar i "Ta med uppgiften". Facit sparas inte i samtalet, och svar som avslöjar lösningen filtreras bort.
- [x] Dela ett projekt med en länk (13). Kodlabbet har "Dela med länk". Koden ligger bara i länken, inget sparas hos Kodstig, och mottagaren behöver inget konto. Varning om att inte skriva personuppgifter i koden.
- [x] Anonym statistik över var elever fastnar (14): **nej, inte nu** (zira, 21 oktober 2026). Kodstig samlar ingen statistik.

## Beslut för zira
- [x] Målgrupp (11): **alla åldrar** (zira, 20 oktober 2026). Det betyder: enkelt språk som fungerar för både tonåringar och vuxna, projekt som lockar båda (spel och praktiska verktyg), och teman som Minecraft som ett val, inte appens grundidentitet. Allt som rör konton och delning ska fungera för elever under 13 år (GDPR), till exempel utan krav på att visa namn eller e-post för andra.
- [x] Standardtema: **Klassisk** för nya besökare (zira, 21 oktober 2026). Minecraft finns kvar som val i sidomenyn och under Inställningar, och den som redan valt ett tema behåller det.
- [x] Anonym statistik (14): **nej, inte nu** (zira, 21 oktober 2026).

## Behålls hela tiden
Inga hjärtan eller energi, ingen betalvägg, inga globala topplistor, lokalt först utan spårning, svenska felmeddelanden och testrättning med gränsfall.

## Arbetssätt
En fas i taget. Efter varje fas: alla tester gröna, publicerat på sidan, sparat framsteg kvar och en kort rapport till zira.

---

## Avstämning 20 oktober 2026

Läget efter läroplansutbyggnaden samma dag (commit 1af57c5): 130 lektioner, 723 övningar, 17 miniprojekt, 12 nivåer. Uppmätt ur koden.

### Kritikpunkterna

| # | Kritik | Läge nu |
| --- | --- | --- |
| 1 | Innehållet tar slut för tidigt | **Till stor del åtgärdat.** Python har nu undantag, klasser, samlingar, algoritmer och slutprojekt. C# har undantag, egna klasser, arv, interface, Dictionary, LINQ och slutprojekt. Kvar: `input()`/`ReadLine`, `import`, filer och JavaScript (fas 4). |
| 2 | För få övningar per begrepp | **Delvis åtgärdat.** 5,6 övningar per lektion (var 3,7). Flerval är 28 % (var 41 %), skriv kod och hitta felet är 45 %. |
| 3 | Ingen repetition som fungerar | **Åtgärdat i fas 2.** Daglig repetitionskö med 1, 3, 7, 14 och 30 dagar. |
| 4 | Svag återkoppling i flerval | **Åtgärdat i fas 1.** Alla 206 flervalsfrågor förklarar varje fel svar, och ett test kräver det för nya frågor. |
| 5 | Ledtrådstrappan bara i Kodlabbet | **Åtgärdat i fas 1.** Alla lektionsövningar har trappan, lösningen först efter två försök. |
| 6 | Jobbigt att skriva kod i mobilen | **Åtgärdat.** Rad med kodtecken på pekskärm (fas 1) och ordningspussel som bara kräver tryck (fas 3). |
| 7 | Ingen väg ut ur appen | **Åtgärdat i fas 4.** Ladda ner koden, guide för egen dator, Git och terminalen. |
| 8 | Egna tolkar kan lära ut fel saker | **Delvis.** Tolkarna klarar mycket mer nu och skillnaderna står i Kodlabbet och README. Byte till Pyodide är inte planerat. |
| 9 | Milo når få och är osäker | **Delvis åtgärdat i fas 5.** Milo ser uppgiften, facit och testresultatet och ger träffsäkrare ledtrådar. Kräver fortfarande WebGPU. |
| 10 | Strikt linjär stig utan nivåtest | **Åtgärdat i fas 3.** Nivåtest per spår och "Testa ut" per låst kapitel. |
| 11 | Mycket korta lektionstexter | **Delvis.** Snitt 361 tecken (var 221), fortsättningskapitlen har längre texter. Stegrubriker kvar (fas 1). |
| 12 | Ingen social del | **Delvis åtgärdat i fas 5.** Dela kod med länk, utan konton eller topplistor. |
| 13 | Profilen spretar | **Beslutat:** alla åldrar (se Beslut). |
| 14 | Ingen mätning av var elever fastnar | Kvar, bara om zira säger ja (fas 5). |

### Förslagen

| # | Förslag | Läge nu |
| --- | --- | --- |
| 1 | Daglig repetitionskö | **Gjort** (fas 2) |
| 2 | Ledtrådstrappan i alla övningar | **Gjort** (fas 1) |
| 3 | Ordningspussel | **Gjort** (fas 3) |
| 4 | Symbolrad på mobil | **Gjort** (fas 1) |
| 5 | Förklaring per fel svar | **Gjort** (fas 1) |
| 6 | Fler övningar och en trappa per lektion | **Gjort** (158 extraövningar i grundlektionerna, trappan förutsäg, pussel, lucka, kod i fas 3) |
| 7 | Fler kapitel för egna program | **Gjort** (klasser och undantag, sedan inläsning, slump, moduler och lite JavaScript i fas 4). Filer finns inte, eftersom allt körs i webbläsaren. |
| 8 | Milo får facit och testresultat | **Gjort** (fas 5) |
| 9 | Ta med dig koden | **Gjort** (fas 4) |
| 10 | Nivåtest och testa ut | **Gjort** (fas 3) |
| 11 | Bestäm målgrupp | **Beslutat:** alla åldrar |
| 12 | Förlåtande svit med frysningar | **Gjort** (fas 2) |
| 13 | Dela projekt med länk | **Gjort** (fas 5) |
| 14 | Anonym statistik | **Beslutat:** nej, inte nu |
| 15 | Stegvis körning | **Gjort** (fas 3) |
| 16 | Stegetiketter i exemplen | **Gjort** (fas 1) |
