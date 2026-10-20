# Kodstigs projektplan

Utgår från rapporten "Kodstig jämfört med Mimo och andra kodappar" (20 oktober 2026, `research/kodstig-jamforelse.md` i projektmappen). Rapporten skrevs mot commit 97348a4 (71 lektioner, 264 övningar). Siffran inom parentes efter en punkt är förslagets nummer i rapporten.

## Fas 0: Avstämning
- [x] Gå igenom rapportens 14 kritikpunkter och 16 förslag mot appen som den är nu och bocka av det som redan är gjort. Se [Avstämning](#avstämning-20-oktober-2026) längst ner.

## Fas 1: Snabba vinster
- [ ] Ledtrådar steg för steg (trappan från Kodlabbet) i alla lektionsövningar (2)
- [ ] Rad med kodtecken ovanför mobilens tangentbord (4)
- [ ] Förklaring till varje fel svar i alla flervalsfrågor (5)
- [ ] Korta stegrubriker i kodexemplen (16)

## Fas 2: Daglig repetition
- [ ] Repetitionskö per begrepp: fel och gamla begrepp kommer tillbaka efter 1, 3, 7 och 14 dagar i ett kort dagligt pass. Ersätter repetitionsbonusen (1)
- [ ] Snällare svit med frysningar eller veckomål, där repetitionen räknas (12)

## Fas 3: Nya sätt att öva
- [ ] Ordningspussel där man lägger kodrader i rätt ordning, med knappar (3)
- [ ] Nivåtest i början och "testa ut" per kapitel (10)
- [ ] Trappan förutsäg, pussel, lucka, tom editor i lektioner som saknar den (6)
- [ ] Stegvis körning som visar variablernas värden rad för rad (15)

## Fas 4: Vägen till riktig utvecklare
- [ ] Ta med dig koden: köra koden i VS Code och terminalen, ladda ner sin kod (9)
- [ ] Det som fortfarande saknas för egna program, till exempel input()/ReadLine, import random och lite JavaScript (7)
- [ ] Grunderna i Git

## Fas 5: Milo och delning
- [ ] Milo får uppgiften, facit och testresultatet och ger bara ledtrådar, aldrig hela lösningen (8)
- [ ] Dela ett projekt med en länk (13)
- [ ] Anonym statistik över var elever fastnar (14). Bara om zira säger ja

## Beslut för zira
- [ ] Målgrupp: tonåringar 12–16 eller vuxna (11). Behövs före fas 4.

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
| 3 | Ingen repetition som fungerar | Kvar (fas 2). |
| 4 | Svag återkoppling i flerval | **Delvis.** 98 av 206 flervalsfrågor förklarar varje fel svar (var 5 av 109). Alla nya frågor har det, de gamla saknar (fas 1). |
| 5 | Ledtrådstrappan bara i Kodlabbet | Kvar (fas 1). |
| 6 | Jobbigt att skriva kod i mobilen | Kvar (fas 1). |
| 7 | Ingen väg ut ur appen | Kvar (fas 4). |
| 8 | Egna tolkar kan lära ut fel saker | **Delvis.** Tolkarna klarar mycket mer nu och skillnaderna står i Kodlabbet och README. Byte till Pyodide är inte planerat. |
| 9 | Milo når få och är osäker | Kvar (fas 5). |
| 10 | Strikt linjär stig utan nivåtest | Kvar (fas 3). |
| 11 | Mycket korta lektionstexter | **Delvis.** Snitt 361 tecken (var 221), fortsättningskapitlen har längre texter. Stegrubriker kvar (fas 1). |
| 12 | Ingen social del | Kvar (fas 5). |
| 13 | Profilen spretar | Beslut för zira (målgrupp). |
| 14 | Ingen mätning av var elever fastnar | Kvar, bara om zira säger ja (fas 5). |

### Förslagen

| # | Förslag | Läge nu |
| --- | --- | --- |
| 1 | Daglig repetitionskö | Fas 2 |
| 2 | Ledtrådstrappan i alla övningar | Fas 1 |
| 3 | Ordningspussel | Fas 3 |
| 4 | Symbolrad på mobil | Fas 1 |
| 5 | Förklaring per fel svar | Fas 1 (108 frågor kvar) |
| 6 | Fler övningar och en trappa per lektion | **Delvis gjort** (158 extraövningar i grundlektionerna, minst två skrivövningar i nästan alla). Trappan i fas 3. |
| 7 | Fler kapitel för egna program | **Delvis gjort** (klasser, undantag). Inläsning, `import random`, filer och JavaScript i fas 4. |
| 8 | Milo får facit och testresultat | Fas 5 |
| 9 | Ta med dig koden | Fas 4 |
| 10 | Nivåtest och testa ut | Fas 3 |
| 11 | Bestäm målgrupp | Beslut för zira |
| 12 | Förlåtande svit med frysningar | Fas 2 |
| 13 | Dela projekt med länk | Fas 5 |
| 14 | Anonym statistik | Fas 5, bara med zira ja |
| 15 | Stegvis körning | Fas 3 |
| 16 | Stegetiketter i exemplen | Fas 1 |
