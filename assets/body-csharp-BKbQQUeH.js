import{v as e}from"./index-BYtOnYW3.js";import{t}from"./pixel-chapter-CjDjKOXA.js";var n=(e,t)=>({re:e,msg:t}),r=[{id:`cs7`,title:`Fel och undantag`,lessons:[{id:`cs-errors`,title:`Läsa felmeddelanden`,tier:3,text:"I C# finns två sorters fel. **Kompileringsfel** hittas innan programmet startar, till exempel ett saknat semikolon eller text som sparas i en int. Programmet körs inte alls förrän felet är rättat.\n\n**Undantag** (exceptions) uppstår medan programmet kör. De vanligaste är `FormatException` (texten går inte att tolka som tal), `IndexOutOfRangeException` (index utanför arrayen), `DivideByZeroException` (heltal delat med noll), `NullReferenceException` (värdet är null), `KeyNotFoundException` (nyckeln saknas i en Dictionary), `InvalidOperationException` (åtgärden går inte just nu) och `ArgumentException` (ett ogiltigt argument).\n\nFelmeddelandet talar om typen av fel och raden. Läs dem noga, för typen säger nästan alltid vad du ska leta efter.",example:`int[] tal = {10, 20, 30};
Console.WriteLine(tal[2]);
// tal[3] skulle ge IndexOutOfRangeException,
// eftersom arrayen bara har index 0, 1 och 2.`,exercises:[{type:`choice`,prompt:'Vad händer med raden `int antal = "fem";`?',options:[`Ett kompileringsfel: programmet startar inte alls`,`Ett undantag när just den raden körs`,`Inget fel, antal blir 0`],answer:0,explain:`C# kontrollerar typerna innan programmet körs. Text kan inte sparas i en int, så felet hittas redan vid kompileringen.`,why:{1:`Undantag uppstår medan programmet kör. Här upptäcker C# felet innan programmet ens startar.`,2:`C# gissar aldrig ett värde åt dig. Fel typ är alltid ett fel.`}},{type:`choice`,prompt:'Vilket undantag ger `int.Parse("tolv")`?',options:[`FormatException`,`ArgumentException`,`NullReferenceException`],answer:0,explain:`Texten finns, men den har fel format för att tolkas som ett heltal. Det är en FormatException.`,why:{1:`ArgumentException är ett mer allmänt fel. int.Parse säger mer exakt att formatet är fel.`,2:`NullReferenceException gäller värden som är null. "tolv" är en riktig text.`}},{type:`choice`,prompt:'Vilket undantag ger raden `Console.WriteLine(priser["banan"]);` om Dictionary:n `priser` bara innehåller nyckeln "äpple"?',options:[`IndexOutOfRangeException`,`KeyNotFoundException`,`FormatException`],answer:1,explain:`Nyckeln "banan" finns inte, så Dictionary:n kastar KeyNotFoundException.`,why:{0:`IndexOutOfRangeException gäller index i arrayer. En Dictionary använder nycklar.`,2:`FormatException gäller text som ska tolkas som tal. Här saknas en nyckel.`}},{type:`debug`,prompt:`Metoden ska returnera det sista talet i arrayen, men kraschar med IndexOutOfRangeException. Rätta den, och låt den returnera -1 om arrayen är tom.`,starter:`static int Sista(int[] tal)
{
    return tal[tal.Length];
}`,tests:[{fn:`Sista`,args:[[4,8,15]],expect:15},{fn:`Sista`,args:[[7]],expect:7,edge:`ett enda tal`},{fn:`Sista`,args:[[]],expect:-1,edge:`tom array`}],solution:`static int Sista(int[] tal)
{
    if (tal.Length == 0)
    {
        return -1;
    }
    return tal[tal.Length - 1];
}`,explain:`Index börjar på 0, så det sista indexet är Length - 1. En tom array har inget sista tal och måste hanteras först.`,hint:`Sista index är tal.Length - 1. Kontrollera tal.Length == 0 innan du läser.`},{type:`debug`,prompt:`Metoden räknar ut medelvärdet (som heltal) men kraschar med DivideByZeroException för en tom array. Låt den returnera 0 i det fallet.`,starter:`static int Medel(int[] tal)
{
    int summa = 0;
    foreach (int t in tal)
    {
        summa += t;
    }
    return summa / tal.Length;
}`,tests:[{fn:`Medel`,args:[[2,4,9]],expect:5},{fn:`Medel`,args:[[-3,3]],expect:0,edge:`negativa tal`},{fn:`Medel`,args:[[]],expect:0,edge:`tom array`}],solution:`static int Medel(int[] tal)
{
    if (tal.Length == 0)
    {
        return 0;
    }
    int summa = 0;
    foreach (int t in tal)
    {
        summa += t;
    }
    return summa / tal.Length;
}`,explain:`tal.Length är 0 för en tom array, och heltal kan inte delas med 0. Ett tidigt return skyddar divisionen.`,hint:`Kontrollera tal.Length == 0 först och returnera 0.`},{type:`debug`,prompt:`Metoden ska returnera antalet tecken i ett namn, men kraschar med NullReferenceException när namnet är null. Returnera 0 för null.`,starter:`static int Längd(string namn)
{
    return namn.Length;
}`,tests:[{fn:`Längd`,args:[`Ada`],expect:3},{fn:`Längd`,args:[``],expect:0,edge:`tom text`},{fn:`Längd`,args:[null],expect:0,edge:`null`}],solution:`static int Längd(string namn)
{
    if (namn == null)
    {
        return 0;
    }
    return namn.Length;
}`,explain:`null betyder att det inte finns någon text alls, så det finns ingen Length att läsa. Kontrollera null innan du använder värdet.`,hint:`Skriv if (namn == null) och returnera 0.`}]},{id:`cs-try`,title:`Fånga fel med try och catch`,tier:3,text:"Med `try` och `catch` kan programmet hantera ett undantag i stället för att krascha. C# kör koden i try. Om ett undantag uppstår hoppar programmet direkt till catch, och resten av try-blocket körs aldrig.\n\nAnge vilken typ av undantag du väntar dig, till exempel `catch (FormatException e)`. Variabeln `e` innehåller undantaget, och `e.Message` är dess felmeddelande. Oväntade fel av andra typer fångas inte och syns fortfarande, och det är just dem du vill hitta.",example:`// 1. Text som inte är ett tal
string text = "tolv";
// 2. Försök tolka texten
try
{
    int tal = int.Parse(text);
    Console.WriteLine("Talet är " + tal);
}
// 3. Fånga felet
catch (FormatException)
{
    Console.WriteLine("Det där var inget heltal.");
}
// 4. Programmet går vidare
Console.WriteLine("Programmet fortsätter.");`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`string svar = "";
try
{
    svar += "A";
    int tal = int.Parse("x");
    svar += "B";
}
catch (FormatException)
{
    svar += "C";
}
Console.WriteLine(svar);`,options:[`AC`,`ABC`,`C`],answer:0,out:!0,explain:`A hinner läggas till. Sedan kastar int.Parse ett undantag och programmet hoppar direkt till catch, som lägger till C.`,why:{1:`När undantaget uppstår hoppar programmet direkt till catch. Raden med B körs aldrig.`,2:`Koden före felet hinner köras, så A kommer med.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`int[] tal = new int[2];
try
{
    tal[5] = 1;
    Console.WriteLine("A");
}
catch (FormatException)
{
    Console.WriteLine("F");
}
catch (IndexOutOfRangeException)
{
    Console.WriteLine("I");
}
Console.WriteLine("slut");`,options:[`I
slut`,`F
slut`,`A
I
slut`],answer:0,out:!0,explain:`C# provar catch-blocken uppifrån och kör det första som passar typen. Index 5 finns inte, så det blir IndexOutOfRangeException.`,why:{1:`catch (FormatException) passar inte, eftersom felet är ett IndexOutOfRangeException.`,2:`Raden som skriver A kommer efter felet och körs aldrig.`}},{type:`fill`,prompt:`Fyll i ordet som fångar undantaget och skriv ut meddelandet.`,code:`try
{
    throw new FormatException("Fel format");
}
___ (FormatException e)
{
    Console.WriteLine(e.Message);
}`,answers:[[`catch`]],output:`Fel format`,explain:`catch (FormatException e) fångar undantaget, och e.Message innehåller texten.`,hint:`Ordet betyder ”fånga” på engelska.`},{type:`code`,prompt:"Skriv `static int TillTal(string text)` som returnerar `int.Parse(text)`, eller 0 om texten inte är ett heltal. Använd try och catch.",starter:`static int TillTal(string text)
{
}`,tests:[{fn:`TillTal`,args:[`42`],expect:42},{fn:`TillTal`,args:[`-7`],expect:-7,edge:`negativt tal`},{fn:`TillTal`,args:[`hej`],expect:0,edge:`inte ett tal`},{fn:`TillTal`,args:[``],expect:0,edge:`tom text`}],require:[n(`\\btry\\b`,`Använd try.`),n(`catch\\s*\\(\\s*FormatException`,`Fånga felet med catch (FormatException).`)],forbid:[n(`TryParse`,`Lös det med try och catch den här gången. TryParse kommer i en senare lektion.`)],solution:`static int TillTal(string text)
{
    try
    {
        return int.Parse(text);
    }
    catch (FormatException)
    {
        return 0;
    }
}`,explain:`Om int.Parse lyckas returneras talet direkt. Annars tar catch över och returnerar 0.`,hint:`Lägg return int.Parse(text); i try och return 0; i catch (FormatException).`},{type:`code`,prompt:"Skriv `static int Pris(Dictionary<string, int> priser, string vara)` som returnerar priset, eller -1 om varan saknas. Lös det med try och catch (KeyNotFoundException), utan ContainsKey och TryGetValue.",starter:`static int Pris(Dictionary<string, int> priser, string vara)
{
}`,tests:[{fn:`Pris`,args:[{äpple:5,päron:7},`päron`],expect:7},{fn:`Pris`,args:[{äpple:5},`banan`],expect:-1,edge:`varan saknas`},{fn:`Pris`,args:[{},`äpple`],expect:-1,edge:`tom Dictionary`}],require:[n(`catch\\s*\\(\\s*KeyNotFoundException`,`Fånga felet med catch (KeyNotFoundException).`)],forbid:[n(`ContainsKey|TryGetValue`,`Lös det med try och catch den här gången.`)],solution:`static int Pris(Dictionary<string, int> priser, string vara)
{
    try
    {
        return priser[vara];
    }
    catch (KeyNotFoundException)
    {
        return -1;
    }
}`,explain:`priser[vara] kastar KeyNotFoundException när nyckeln saknas, och catch gör om det till -1.`,hint:`return priser[vara]; i try och return -1; i catch.`},{type:`code`,prompt:"Skriv `static int SummeraTexter(List<string> texter)` som summerar alla texter som går att tolka som heltal och hoppar över resten. Ett enda konstigt värde får inte stoppa hela summeringen.",starter:`static int SummeraTexter(List<string> texter)
{
}`,tests:[{fn:`SummeraTexter`,args:[[`4`,`x`,`6`]],expect:10},{fn:`SummeraTexter`,args:[[`a`,`b`]],expect:0,edge:`inga tal alls`},{fn:`SummeraTexter`,args:[[]],expect:0,edge:`tom lista`},{fn:`SummeraTexter`,args:[[`-2`,`5`]],expect:3,edge:`negativt tal`}],require:[n(`catch\\s*\\(\\s*FormatException`,`Fånga felet med catch (FormatException) inne i loopen.`)],solution:`static int SummeraTexter(List<string> texter)
{
    int summa = 0;
    foreach (string t in texter)
    {
        try
        {
            summa += int.Parse(t);
        }
        catch (FormatException)
        {
            // Hoppa över texter som inte är tal
        }
    }
    return summa;
}`,explain:`När try och catch ligger inne i loopen hanteras varje text för sig. Ett fel hoppar bara över den texten, och loopen fortsätter.`,hint:`Lägg try och catch inuti foreach-loopen, runt summa += int.Parse(t);.`}]},{id:`cs-throw`,title:`Kasta egna undantag`,tier:4,text:`Du kan själv kasta ett undantag med \`throw new ArgumentException("meddelande");\`. Det används när en metod får ett värde som den inte kan arbeta med, till exempel ett negativt pris.

Kontrollen ska ligga **först** i metoden, innan något ändras. Då kan ett felaktigt värde aldrig lämna saker halvfärdiga.

Metoden som kastar bestämmer **vad** som är fel. Koden som anropar metoden bestämmer **hur** felet ska hanteras, med try och catch. Så arbetar riktiga bibliotek, och därför är det bättre än att i tysthet returnera ett konstigt värde som -1.`,example:`// 1. Anropa metoden
try
{
    Console.WriteLine(Dela(10, 2));
    Console.WriteLine(Dela(1, 0));
}
// 2. Fånga felet
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}

// 3. Kasta fel vid nolla
static int Dela(int a, int b)
{
    if (b == 0)
    {
        throw new ArgumentException("Nämnaren får inte vara 0");
    }
    return a / b;
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`try
{
    Kontrollera(-1);
    Console.WriteLine("OK");
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}

static void Kontrollera(int x)
{
    Console.WriteLine("start");
    if (x < 0)
    {
        throw new ArgumentException("negativt");
    }
    Console.WriteLine("klar");
}`,options:[`start
negativt`,`start
klar
OK`,`negativt`],answer:0,out:!0,explain:`start skrivs ut. Sedan kastas undantaget, metoden avbryts direkt och catch hos anroparen skriver ut meddelandet.`,why:{1:`throw avbryter metoden direkt. Varken klar eller OK hinner skrivas ut.`,2:`Raden som skriver start körs innan undantaget kastas.`}},{type:`choice`,prompt:"En metod `TaBort()` ska ta bort första elementet i en kö, men kön är tom. Vilket undantag passar bäst?",options:[`ArgumentException`,`InvalidOperationException`,`FormatException`],answer:1,explain:`InvalidOperationException betyder att åtgärden inte går att göra i objektets nuvarande läge. Det är inget fel på argumenten, det finns bara inget att ta bort.`,why:{0:`ArgumentException passar när ett argument är ogiltigt. TaBort() har inga argument.`,2:`FormatException gäller text som har fel format, till exempel vid int.Parse.`}},{type:`fill`,prompt:`Fyll i det som saknas för att kasta undantaget.`,code:`try
{
    throw ___ ArgumentException("Ogiltigt namn");
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}`,answers:[[`new`]],output:`Ogiltigt namn`,explain:`Ett undantag är ett objekt. Det skapas med new och kastas med throw.`,hint:`Samma ord som när du skapar en ny List.`},{type:`code`,prompt:'Gör klart `Rabatterat(int pris, int procent)`. Den ska returnera priset efter rabatt. Kasta `ArgumentException("Priset kan inte vara negativt")` om priset är negativt och `ArgumentException("Procent måste vara mellan 0 och 100")` om procent är utanför 0 till 100.',starter:`Console.WriteLine(Rabatterat(200, 25));
try
{
    Rabatterat(200, 150);
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}
try
{
    Rabatterat(-5, 10);
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}

static int Rabatterat(int pris, int procent)
{
    return pris - pris * procent / 100;
}`,output:`150
Fel: Procent måste vara mellan 0 och 100
Fel: Priset kan inte vara negativt`,require:[n(`throw\\s+new\\s+ArgumentException`,`Kasta felen med throw new ArgumentException("...").`)],solution:`Console.WriteLine(Rabatterat(200, 25));
try
{
    Rabatterat(200, 150);
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}
try
{
    Rabatterat(-5, 10);
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}

static int Rabatterat(int pris, int procent)
{
    if (pris < 0)
    {
        throw new ArgumentException("Priset kan inte vara negativt");
    }
    if (procent < 0 || procent > 100)
    {
        throw new ArgumentException("Procent måste vara mellan 0 och 100");
    }
    return pris - pris * procent / 100;
}`,explain:`Valideringen ligger först i metoden. Själva uträkningen kan då lita på att värdena är rimliga.`,hint:`Två if-satser med throw new ArgumentException(...) före return.`},{type:`code`,prompt:'`Dela` kastar redan ett undantag. Skriv `static string Försök(int a, int b)` som anropar Dela och returnerar `"Svar: X"`, eller `"Fel: "` följt av meddelandet om Dela kastar ett ArgumentException.',starter:`static int Dela(int a, int b)
{
    if (b == 0)
    {
        throw new ArgumentException("Nämnaren får inte vara 0");
    }
    return a / b;
}

static string Försök(int a, int b)
{
}`,tests:[{fn:`Försök`,args:[10,2],expect:`Svar: 5`},{fn:`Försök`,args:[7,0],expect:`Fel: Nämnaren får inte vara 0`,edge:`b är 0`},{fn:`Försök`,args:[0,3],expect:`Svar: 0`,edge:`a är 0`}],require:[n(`Försök[\\s\\S]*Dela\\s*\\(`,`Anropa Dela inne i Försök.`),n(`catch\\s*\\(\\s*ArgumentException\\s+[\\wåäö]+`,`Fånga undantaget med en variabel, till exempel catch (ArgumentException e).`)],forbid:[n(`Försök[\\s\\S]*b\\s*==\\s*0`,`Låt Dela sköta kontrollen och fånga undantaget i stället för att kontrollera b själv.`)],solution:`static int Dela(int a, int b)
{
    if (b == 0)
    {
        throw new ArgumentException("Nämnaren får inte vara 0");
    }
    return a / b;
}

static string Försök(int a, int b)
{
    try
    {
        return $"Svar: {Dela(a, b)}";
    }
    catch (ArgumentException e)
    {
        return "Fel: " + e.Message;
    }
}`,explain:`Dela vet vad som är fel och säger det i meddelandet. Försök bestämmer hur felet ska visas. Ingen av dem behöver veta hur den andra fungerar inuti.`,hint:`Lägg anropet till Dela i try och använd e.Message i catch (ArgumentException e).`},{type:`debug`,prompt:`LäggTill ska vägra tomma namn, men det tomma namnet hamnar ändå i listan innan undantaget kastas. Programmet ska skriva ut felet och sedan att listan har 1 namn. Rätta metoden.`,starter:`List<string> namn = new List<string>();
LäggTill(namn, "Ada");
try
{
    LäggTill(namn, "");
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}
Console.WriteLine(namn.Count);

static void LäggTill(List<string> lista, string nytt)
{
    lista.Add(nytt);
    if (nytt == "")
    {
        throw new ArgumentException("Namnet får inte vara tomt");
    }
}`,output:`Fel: Namnet får inte vara tomt
1`,solution:`List<string> namn = new List<string>();
LäggTill(namn, "Ada");
try
{
    LäggTill(namn, "");
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}
Console.WriteLine(namn.Count);

static void LäggTill(List<string> lista, string nytt)
{
    if (nytt == "")
    {
        throw new ArgumentException("Namnet får inte vara tomt");
    }
    lista.Add(nytt);
}`,explain:`Kontrollera först, ändra sedan. Annars hinner det felaktiga värdet sparas innan undantaget kastas.`,hint:`Flytta lista.Add(nytt); så att den kommer efter if-satsen.`}]},{id:`cs-tryparse`,title:`TryParse och finally`,tier:4,text:"`int.TryParse(text, out int tal)` försöker tolka texten. Den returnerar true eller false, och om det lyckas hamnar talet i `tal`. Ordet `out` betyder att metoden skriver ett värde till variabeln åt dig. Om det misslyckas blir `tal` 0. `double.TryParse` fungerar likadant för decimaltal.\n\nTumregel: använd **TryParse** när felaktig indata är något vanligt och väntat, till exempel det en användare skriver. Använd **try/catch** för fel som du inte kan kontrollera i förväg.\n\nEtt `finally`-block körs **alltid** efter try, både när det gick bra och när det blev fel, och även om try gör return. Där lägger man det som alltid måste göras, som att stänga en fil eller skriva en logg.",example:`// 1. Svar att tolka
string[] svar = {"12", "tolv", "7"};
// 2. Gå igenom varje svar
foreach (string s in svar)
{
    // 3. Tolka utan att krascha
    if (int.TryParse(s, out int tal))
    {
        Console.WriteLine($"{s} blev {tal}");
    }
    else
    {
        Console.WriteLine($"{s} är inget tal");
    }
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`bool ok = int.TryParse("12a", out int tal);
Console.WriteLine(ok + " " + tal);`,options:[`False 0`,`True 12`,`Ett FormatException`],answer:0,out:!0,explain:`TryParse kastar aldrig FormatException. Den returnerar false och sätter tal till 0.`,why:{1:`Hela texten måste vara ett tal. "12a" innehåller en bokstav, så tolkningen misslyckas.`,2:`Det är int.Parse som kastar. TryParse returnerar false i stället.`}},{type:`fill`,prompt:`Fyll i ordet som låter TryParse skriva talet till variabeln.`,code:`string text = "42";
if (int.TryParse(text, ___ int tal))
{
    Console.WriteLine(tal + 1);
}`,answers:[[`out`]],output:`43`,explain:`out betyder att metoden fyller i variabeln åt dig.`,hint:`Ett kort engelskt ord som betyder ”ut”.`},{type:`choice`,prompt:`Ett formulär låter användaren skriva sin ålder. Felstavningar är vanliga. Vilket sätt är bäst för att läsa värdet?`,options:[`int.TryParse, eftersom felaktig text är något väntat`,`int.Parse utan try, eftersom användaren borde skriva rätt`,`try/catch runt hela programmet`],answer:0,explain:`När fel är vanliga och väntade är TryParse tydligast. Ingen undantagshantering behövs, bara en if.`,why:{1:`Programmet kraschar första gången någon skriver fel. Indata från användare måste alltid kontrolleras.`,2:`Ett stort try runt allt gömmer var felet uppstod och gör det svårt att ge ett bra svar till användaren.`}},{type:`code`,prompt:"Skriv `static int Ålder(string text)` som returnerar åldern om texten är ett heltal mellan 0 och 130. Annars ska den returnera -1. Använd int.TryParse, inte try/catch.",starter:`static int Ålder(string text)
{
}`,tests:[{fn:`Ålder`,args:[`15`],expect:15},{fn:`Ålder`,args:[`femton`],expect:-1,edge:`inte ett tal`},{fn:`Ålder`,args:[`-3`],expect:-1,edge:`negativ ålder`},{fn:`Ålder`,args:[`0`],expect:0,edge:`exakt 0 är okej`},{fn:`Ålder`,args:[`131`],expect:-1,edge:`över 130`}],require:[n(`int\\.TryParse`,`Använd int.TryParse.`)],forbid:[n(`\\btry\\b`,`Lös det utan try/catch den här gången.`)],solution:`static int Ålder(string text)
{
    if (!int.TryParse(text, out int ålder))
    {
        return -1;
    }
    if (ålder < 0 || ålder > 130)
    {
        return -1;
    }
    return ålder;
}`,explain:`Först kontrolleras att texten är ett tal, sedan att talet är rimligt. Båda sorters fel hanteras med vanliga if-satser.`,hint:`if (!int.TryParse(text, out int ålder)) return -1; och kontrollera sedan intervallet.`},{type:`code`,prompt:"Skriv `static double Medel(List<string> texter)` som räknar medelvärdet av de texter som går att tolka som decimaltal och hoppar över resten. Om inga tal finns ska den returnera 0.",starter:`static double Medel(List<string> texter)
{
}`,tests:[{fn:`Medel`,args:[[`4`,`x`,`8`]],expect:6},{fn:`Medel`,args:[[`2.5`,`3.5`]],expect:3,edge:`decimaltal`},{fn:`Medel`,args:[[`a`,``]],expect:0,edge:`inga giltiga tal`},{fn:`Medel`,args:[[]],expect:0,edge:`tom lista`}],require:[n(`double\\.TryParse`,`Använd double.TryParse.`)],solution:`static double Medel(List<string> texter)
{
    double summa = 0;
    int antal = 0;
    foreach (string t in texter)
    {
        if (double.TryParse(t, out double tal))
        {
            summa += tal;
            antal++;
        }
    }
    if (antal == 0)
    {
        return 0;
    }
    return summa / antal;
}`,explain:`Du räknar bara de texter som lyckades, så snittet delas med antalet giltiga tal. Kontrollen av antal skyddar mot division med noll.`,hint:`Håll både summa och antal. Dela bara om antal är större än 0.`},{type:`code`,prompt:"Lägg till ett `finally` i Läs som skriver ut `Läste X` varje gång metoden körs, både när det gick bra och när det blev fel.",starter:`Console.WriteLine(Läs("4"));
Console.WriteLine(Läs("x"));

static int Läs(string text)
{
    try
    {
        return int.Parse(text);
    }
    catch (FormatException)
    {
        return 0;
    }
}`,output:`Läste 4
4
Läste x
0`,require:[n(`\\bfinally\\b`,`Skriv ut texten i ett finally-block.`)],solution:`Console.WriteLine(Läs("4"));
Console.WriteLine(Läs("x"));

static int Läs(string text)
{
    try
    {
        return int.Parse(text);
    }
    catch (FormatException)
    {
        return 0;
    }
    finally
    {
        Console.WriteLine("Läste " + text);
    }
}`,explain:`finally körs innan metoden faktiskt lämnas, även efter return. Därför skrivs Läste ut före talet som metoden returnerar.`,hint:`Lägg finally { Console.WriteLine("Läste " + text); } efter catch-blocket.`}]}]},{id:`cs8`,title:`Klasser och objekt`,lessons:[{id:`cs-class`,title:`Din första klass`,tier:3,text:"En **klass** är en ritning. Ett **objekt** är en sak som byggs efter ritningen. Klassen Hund beskriver vad alla hundar har, och varje hund du skapar med `new Hund()` är ett eget objekt.\n\nVariablerna i en klass kallas **fält**. Med `public` får koden utanför klassen läsa och ändra dem, och du når dem med punkt: `h.Namn`.\n\nKlasser låter dig samla data som hör ihop. I stället för tre separata arrayer med namn, ålder och ras har du en lista med hundar. I C# skriver du klasserna under programmets övriga kod.",example:`// 1. Skapa ett objekt
Hund h = new Hund();
// 2. Fyll i fälten
h.Namn = "Milo";
h.Ålder = 3;
// 3. Skriv ut objektet
Console.WriteLine($"{h.Namn} är {h.Ålder} år");

// 4. Klassen är ritningen
class Hund
{
    public string Namn;
    public int Ålder;
}`,exercises:[{type:`choice`,prompt:`Vad är skillnaden mellan en klass och ett objekt?`,options:[`Klassen är ritningen, objektet är en sak byggd efter ritningen`,`De är samma sak med olika namn`,`Ett objekt kan innehålla flera klasser, men en klass bara ett objekt`],answer:0,explain:`En klass kan användas för att skapa hur många objekt som helst, och varje objekt har sina egna värden.`,why:{1:`Klassen beskriver hur objekten ska se ut. Objekten är de faktiska sakerna som skapas med new.`,2:`Det är tvärtom: en klass kan ge upphov till många objekt.`}},{type:`fill`,prompt:`Fyll i ordet som skapar ett nytt objekt.`,code:`Bok b = ___ Bok();
b.Titel = "Mio min Mio";
Console.WriteLine(b.Titel);

class Bok
{
    public string Titel;
}`,answers:[[`new`]],output:`Mio min Mio`,explain:`new skapar ett nytt objekt av klassen.`,hint:`Samma ord som när du skapar en ny List.`},{type:`choice`,prompt:`Vad skrivs ut?`,code:`Spelare a = new Spelare();
Spelare b = new Spelare();
a.Poäng = 5;
b.Poäng = 7;
a.Poäng += 1;
Console.WriteLine(a.Poäng);
Console.WriteLine(b.Poäng);

class Spelare
{
    public int Poäng;
}`,options:[`6
7`,`6
8`,`8
8`],answer:0,out:!0,explain:`a och b är två olika objekt med var sitt fält Poäng. Att a ändras påverkar inte b.`,why:{1:`Bara a.Poäng ökade. b har sitt eget värde, 7.`,2:`Varje objekt har egna fält. Ändringarna blandas inte ihop.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`Elev a = new Elev();
a.Namn = "Bo";
Elev b = a;
b.Namn = "Li";
Console.WriteLine(a.Namn);

class Elev
{
    public string Namn;
}`,options:[`Li`,`Bo`,`Ett fel`],answer:0,out:!0,explain:`Elev b = a; skapar inget nytt objekt. Både a och b pekar på samma objekt, så ändringen syns via båda.`,why:{1:`Bara new skapar ett nytt objekt. Här finns bara ett objekt, med två variabler som pekar på det.`,2:`Det är helt tillåtet att två variabler pekar på samma objekt.`}},{type:`code`,prompt:"Skriv klassen `Elev` med de publika fälten `Namn` och `Klass` (båda string), så att programmet skriver ut `Sara går i 7B`.",starter:`Elev e = new Elev();
e.Namn = "Sara";
e.Klass = "7B";
Console.WriteLine($"{e.Namn} går i {e.Klass}");

class Elev
{
}`,output:`Sara går i 7B`,solution:`Elev e = new Elev();
e.Namn = "Sara";
e.Klass = "7B";
Console.WriteLine($"{e.Namn} går i {e.Klass}");

class Elev
{
    public string Namn;
    public string Klass;
}`,explain:`Varje fält har en typ och ett namn. public gör att programmet utanför klassen kan använda dem.`,hint:`Skriv public string Namn; och public string Klass; inne i klassen.`},{type:`code`,prompt:"Korgen innehåller tre varor. Räkna ut totalpriset med en loop och skriv ut `Totalt: X kr`.",starter:`List<Vara> korg = new List<Vara>
{
    new Vara { Namn = "Mjölk", Pris = 15 },
    new Vara { Namn = "Bröd", Pris = 30 },
    new Vara { Namn = "Ost", Pris = 55 },
};
// Räkna ut totalen med en loop här

class Vara
{
    public string Namn;
    public int Pris;
}`,output:`Totalt: 100 kr`,require:[n(`\\bforeach\\b|\\bfor\\b`,`Använd en loop över korgen.`),n(`\\.Pris`,`Läs priset med v.Pris.`)],forbid:[n(`Totalt:\\s*100`,`Räkna fram summan i stället för att skriva 100.`)],solution:`List<Vara> korg = new List<Vara>
{
    new Vara { Namn = "Mjölk", Pris = 15 },
    new Vara { Namn = "Bröd", Pris = 30 },
    new Vara { Namn = "Ost", Pris = 55 },
};
int summa = 0;
foreach (Vara v in korg)
{
    summa += v.Pris;
}
Console.WriteLine($"Totalt: {summa} kr");

class Vara
{
    public string Namn;
    public int Pris;
}`,explain:`Objekt kan ligga i listor precis som tal. v.Pris läser fältet på varje vara.`,hint:`Skapa int summa = 0; och loopa med foreach (Vara v in korg).`}]},{id:`cs-ctor`,title:`Konstruktorer`,tier:3,text:'En **konstruktor** är en speciell metod som körs när objektet skapas med new. Den heter samma sak som klassen och har ingen returtyp. Med parametrar kan du ge objektet sina värden direkt: `new Hund("Milo", 3)`.\n\nNär parametern och fältet heter likadant skriver du `this.namn = namn;`. Ordet `this` betyder ”just det här objektet”, så `this.namn` är fältet och `namn` är parametern.\n\nKonstruktorn är också rätt plats att **validera**. Om den kastar ett undantag skapas inget objekt alls, och då kan det aldrig finnas ett objekt med ogiltiga värden.',example:`// 1. Skapa objektet med konstruktorn
Hund h = new Hund("Milo", 3);
Console.WriteLine($"{h.namn} är {h.ålder} år");

// 2. Klassen med fält
class Hund
{
    public string namn;
    public int ålder;

    // 3. Konstruktorn sätter fälten
    public Hund(string namn, int ålder)
    {
        this.namn = namn;
        this.ålder = ålder;
    }
}`,exercises:[{type:`choice`,prompt:`Vilket påstående om en konstruktor stämmer?`,options:[`Den heter som klassen, har ingen returtyp och körs vid new`,`Den måste anropas manuellt efter new`,`Den måste returnera objektet med return`],answer:0,explain:`C# anropar konstruktorn automatiskt när du skriver new, och det nya objektet blir resultatet av new.`,why:{1:`Konstruktorn körs automatiskt av new. Du anropar den aldrig själv.`,2:`En konstruktor har ingen returtyp och returnerar inget värde.`}},{type:`fill`,prompt:`Fyll i ordet som betyder ”just det här objektet” så att fältet får parameterns värde.`,code:`Bok b = new Bok("Bröderna Lejonhjärta");
Console.WriteLine(b.titel);

class Bok
{
    public string titel;

    public Bok(string titel)
    {
        ___.titel = titel;
    }
}`,answers:[[`this`]],output:`Bröderna Lejonhjärta`,explain:`this.titel är objektets fält och titel är parametern.`,hint:`Ett fyrbokstavsord på engelska som betyder ”den här”.`},{type:`debug`,prompt:"Programmet ska skriva ut `Milo`, men namnet blir tomt. Konstruktorn sparar aldrig värdet i fältet. Rätta den.",starter:`Katt k = new Katt("Milo");
Console.WriteLine(k.namn);

class Katt
{
    public string namn;

    public Katt(string namn)
    {
        namn = namn;
    }
}`,output:`Milo`,solution:`Katt k = new Katt("Milo");
Console.WriteLine(k.namn);

class Katt
{
    public string namn;

    public Katt(string namn)
    {
        this.namn = namn;
    }
}`,explain:`Utan this syftar namn på parametern på båda sidor, så parametern sparas i sig själv. this.namn pekar ut fältet.`,hint:`Skriv this. framför fältet på vänster sida.`},{type:`code`,prompt:"Skriv en konstruktor `Rektangel(int bredd, int höjd)` som sparar värdena i fälten, så att programmet skriver ut arean `12`.",starter:`Rektangel r = new Rektangel(3, 4);
Console.WriteLine(r.Bredd * r.Höjd);

class Rektangel
{
    public int Bredd;
    public int Höjd;
}`,output:`12`,require:[n(`public\\s+Rektangel\\s*\\(`,`Skriv en konstruktor: public Rektangel(int bredd, int höjd).`)],solution:`Rektangel r = new Rektangel(3, 4);
Console.WriteLine(r.Bredd * r.Höjd);

class Rektangel
{
    public int Bredd;
    public int Höjd;

    public Rektangel(int bredd, int höjd)
    {
        Bredd = bredd;
        Höjd = höjd;
    }
}`,explain:`När fälten heter Bredd och parametern bredd är namnen olika, så this behövs inte. Det går lika bra att skriva this.Bredd = bredd;.`,hint:`public Rektangel(int bredd, int höjd) { Bredd = bredd; Höjd = höjd; }`},{type:`code`,prompt:'Konstruktorn ska vägra ogiltiga värden. Kasta `ArgumentException("Namnet får inte vara tomt")` om namnet är tomt eller bara mellanslag, och `ArgumentException("Ogiltig ålder")` om åldern är negativ.',starter:`Elev a = new Elev("Ada", 12);
Console.WriteLine(a.Namn);
try
{
    Elev b = new Elev(" ", 10);
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}
try
{
    Elev c = new Elev("Bo", -1);
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}

class Elev
{
    public string Namn;
    public int Ålder;

    public Elev(string namn, int ålder)
    {
        Namn = namn;
        Ålder = ålder;
    }
}`,output:`Ada
Fel: Namnet får inte vara tomt
Fel: Ogiltig ålder`,require:[n(`throw\\s+new\\s+ArgumentException`,`Kasta felen med throw new ArgumentException("...").`)],solution:`Elev a = new Elev("Ada", 12);
Console.WriteLine(a.Namn);
try
{
    Elev b = new Elev(" ", 10);
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}
try
{
    Elev c = new Elev("Bo", -1);
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}

class Elev
{
    public string Namn;
    public int Ålder;

    public Elev(string namn, int ålder)
    {
        if (string.IsNullOrWhiteSpace(namn))
        {
            throw new ArgumentException("Namnet får inte vara tomt");
        }
        if (ålder < 0)
        {
            throw new ArgumentException("Ogiltig ålder");
        }
        Namn = namn;
        Ålder = ålder;
    }
}`,explain:`Eftersom konstruktorn kastar innan objektet blir klart, kan det aldrig finnas en Elev med tomt namn eller negativ ålder.`,hint:`Använd string.IsNullOrWhiteSpace(namn) och ålder < 0, med throw före tilldelningarna.`}]},{id:`cs-props`,title:`Egenskaper och inkapsling`,tier:4,text:"Med publika fält kan vem som helst skriva vad som helst, till exempel ett negativt saldo. **Inkapsling** betyder att objektet själv bestämmer över sina värden. Fälten görs `private`, och omvärlden får gå via **egenskaper** (properties) och metoder.\n\n`public string Namn { get; set; }` är en egenskap som kan läsas och ändras. Med `{ get; private set; }` kan alla läsa värdet, men bara klassen själv kan ändra det. En **beräknad egenskap** som `public int Ålder => 2026 - Födelseår;` räknas ut varje gång den läses.\n\nI C# skriver man nästan alltid egenskaper i stället för publika fält. Då kan du lägga till validering senare utan att ändra koden som använder klassen.",example:`// 1. Skapa och skriv ut
Person p = new Person("Ada", 2012);
Console.WriteLine($"{p.Namn} är {p.Ålder} år");

class Person
{
    // 2. Egenskaper med get
    public string Namn { get; private set; }
    public int Födelseår { get; private set; }
    public int Ålder => 2026 - Födelseår;

    // 3. Konstruktorn sätter värdena
    public Person(string namn, int födelseår)
    {
        Namn = namn;
        Födelseår = födelseår;
    }
}`,exercises:[{type:`choice`,prompt:"Varför skriver man `public int Saldo { get; private set; }` i en kontoklass?",options:[`Alla kan läsa saldot, men bara klassens egna metoder kan ändra det`,`Ingen utanför klassen kan läsa saldot`,`Saldot kan aldrig ändras efter att objektet skapats`],answer:0,explain:`get är public, set är private. Då måste ändringar gå via metoder som SättIn, som kan kontrollera beloppet.`,why:{1:`get är public, så saldot går att läsa överallt.`,2:`Klassens egna metoder kan fortfarande ändra saldot via den privata set.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`Person p = new Person();
p.Född = 2010;
Console.WriteLine(p.Ålder);
p.Född = 2000;
Console.WriteLine(p.Ålder);

class Person
{
    public int Född { get; set; }
    public int Ålder => 2026 - Född;
}`,options:[`16
26`,`16
16`,`26
26`],answer:0,out:!0,explain:`En beräknad egenskap räknas ut på nytt varje gång den läses, så den följer med när Född ändras.`,why:{1:`Ålder sparas inte. Den räknas ut igen vid varje läsning, med det nya värdet på Född.`,2:`Första gången är Född 2010, så Ålder blir 16.`}},{type:`debug`,prompt:`Programmet försöker sätta saldot direkt, vilket ger ett kompileringsfel eftersom set är private. Ändra programmet (inte klassen) så att det sätter in 500 kr på rätt sätt.`,starter:`Konto k = new Konto();
k.Saldo = 500;
Console.WriteLine(k.Saldo);

class Konto
{
    public int Saldo { get; private set; }

    public void SättIn(int belopp)
    {
        if (belopp > 0)
        {
            Saldo += belopp;
        }
    }
}`,output:`500`,require:[n(`\\.SättIn\\s*\\(\\s*500\\s*\\)`,`Använd metoden SättIn(500).`)],forbid:[n(`public\\s+int\\s+Saldo\\s*\\{\\s*get;\\s*set;`,`Låt set vara private. Ändra programmet i stället för klassen.`)],solution:`Konto k = new Konto();
k.SättIn(500);
Console.WriteLine(k.Saldo);

class Konto
{
    public int Saldo { get; private set; }

    public void SättIn(int belopp)
    {
        if (belopp > 0)
        {
            Saldo += belopp;
        }
    }
}`,explain:`Kompileringsfelet är ett skydd. Saldot ska bara ändras via SättIn, som kontrollerar beloppet.`,hint:`Byt raden k.Saldo = 500; mot ett anrop till k.SättIn(500);.`},{type:`code`,prompt:'Gör klart egenskapen `Pris`. Den ska läsa det privata fältet `pris`, och dess set ska kasta `ArgumentException("Priset kan inte vara negativt")` för negativa värden.',starter:`Produkt p = new Produkt();
p.Pris = 49;
Console.WriteLine(p.Pris);
try
{
    p.Pris = -10;
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}
Console.WriteLine(p.Pris);

class Produkt
{
    private int pris;

    public int Pris
    {
        get { return 0; }
        set { }
    }
}`,output:`49
Fel: Priset kan inte vara negativt
49`,require:[n(`throw\\s+new\\s+ArgumentException`,`Kasta felet i set med throw new ArgumentException("...").`),n(`\\bvalue\\b`,`I set heter det nya värdet value.`)],solution:`Produkt p = new Produkt();
p.Pris = 49;
Console.WriteLine(p.Pris);
try
{
    p.Pris = -10;
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}
Console.WriteLine(p.Pris);

class Produkt
{
    private int pris;

    public int Pris
    {
        get { return pris; }
        set
        {
            if (value < 0)
            {
                throw new ArgumentException("Priset kan inte vara negativt");
            }
            pris = value;
        }
    }
}`,explain:`Inne i set heter det nya värdet value. Kontrollen sker innan fältet ändras, så priset behåller sitt gamla värde vid fel.`,hint:`get returnerar pris. I set: kontrollera value < 0 och kasta, annars pris = value;.`},{type:`code`,prompt:"Lägg till två beräknade egenskaper i `Rektangel`: `Area` (bredd gånger höjd) och `ÄrKvadrat` (true om bredd och höjd är lika).",starter:`Rektangel a = new Rektangel(3, 4);
Rektangel b = new Rektangel(5, 5);
Console.WriteLine($"{a.Area} {a.ÄrKvadrat}");
Console.WriteLine($"{b.Area} {b.ÄrKvadrat}");

class Rektangel
{
    public int Bredd { get; }
    public int Höjd { get; }

    public Rektangel(int bredd, int höjd)
    {
        Bredd = bredd;
        Höjd = höjd;
    }
}`,output:`12 False
25 True`,require:[n(`Area\\s*=>`,`Skriv Area som en beräknad egenskap med =>.`),n(`ÄrKvadrat\\s*=>`,`Skriv ÄrKvadrat som en beräknad egenskap med =>.`)],solution:`Rektangel a = new Rektangel(3, 4);
Rektangel b = new Rektangel(5, 5);
Console.WriteLine($"{a.Area} {a.ÄrKvadrat}");
Console.WriteLine($"{b.Area} {b.ÄrKvadrat}");

class Rektangel
{
    public int Bredd { get; }
    public int Höjd { get; }
    public int Area => Bredd * Höjd;
    public bool ÄrKvadrat => Bredd == Höjd;

    public Rektangel(int bredd, int höjd)
    {
        Bredd = bredd;
        Höjd = höjd;
    }
}`,explain:`Beräknade egenskaper sparar inget eget värde. De kan aldrig bli inaktuella eftersom de räknas ut från Bredd och Höjd varje gång.`,hint:`public int Area => Bredd * Höjd; och public bool ÄrKvadrat => Bredd == Höjd;`}]},{id:`cs-objmethods`,title:`Metoder och ToString`,tier:4,text:"En klass kan ha egna **metoder** som läser och ändrar objektets värden. De skrivs utan `static`, eftersom de hör till ett visst objekt. Ett konto vet själv sitt saldo och vet hur man sätter in pengar.\n\nNär du skriver ut ett objekt anropar C# dess `ToString()`. Utan egen version skrivs bara klassens namn ut. Med `public override string ToString()` bestämmer du själv hur objektet ska se ut som text.\n\nObjekt läggs ofta i en `List<Klass>`. Då kan du loopa över dem, söka och summera, precis som med tal.",example:`// 1. Använd objektet
Räknare r = new Räknare();
r.Öka();
r.Öka();
Console.WriteLine(r);

class Räknare
{
    public int Värde { get; private set; }

    // 2. Metod som ändrar objektet
    public void Öka()
    {
        Värde++;
    }

    // 3. Bestäm hur objektet skrivs ut
    public override string ToString()
    {
        return $"Räknaren står på {Värde}";
    }
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Lampa l = new Lampa();
l.Växla();
l.Växla();
l.Växla();
Console.WriteLine(l.På);

class Lampa
{
    public bool På { get; private set; }

    public void Växla()
    {
        På = !På;
    }
}`,options:[`True`,`False`,`Lampa`],answer:0,out:!0,explain:`En bool börjar som false. Tre växlingar ger true, false, true.`,why:{1:`Räkna växlingarna: false blir true, sedan false, sedan true.`,2:`Här skrivs egenskapen På ut, inte objektet.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`Hund h = new Hund();
h.Namn = "Rex";
Console.WriteLine(h);

class Hund
{
    public string Namn;
}`,options:[`Hund`,`Rex`,`Ett kompileringsfel`],answer:0,out:!0,explain:`Utan en egen ToString skriver C# bara ut klassens namn. Det är därför man nästan alltid skriver en egen.`,why:{1:`C# vet inte att Namn är det viktiga fältet. Det måste du själv säga i ToString.`,2:`Alla objekt kan skrivas ut. Utan egen ToString blir det bara klassens namn.`}},{type:`code`,prompt:"Ge `Bok` en `ToString()` så att programmet skriver ut `Mio min Mio av Astrid Lindgren`.",starter:`Bok b = new Bok("Mio min Mio", "Astrid Lindgren");
Console.WriteLine(b);

class Bok
{
    public string Titel { get; }
    public string Författare { get; }

    public Bok(string titel, string författare)
    {
        Titel = titel;
        Författare = författare;
    }
}`,output:`Mio min Mio av Astrid Lindgren`,require:[n(`public\\s+override\\s+string\\s+ToString\\s*\\(`,`Skriv metoden som public override string ToString().`)],solution:`Bok b = new Bok("Mio min Mio", "Astrid Lindgren");
Console.WriteLine(b);

class Bok
{
    public string Titel { get; }
    public string Författare { get; }

    public Bok(string titel, string författare)
    {
        Titel = titel;
        Författare = författare;
    }

    public override string ToString()
    {
        return $"{Titel} av {Författare}";
    }
}`,explain:`override betyder att du ersätter den inbyggda versionen av ToString. Console.WriteLine använder den automatiskt.`,hint:`public override string ToString() { return $"{Titel} av {Författare}"; }`},{type:`code`,prompt:"Gör klart `Varukorg`. `LäggTill(int pris)` ska spara priset i listan, men ignorera priser som är 0 eller mindre. `Totalt()` ska returnera summan av alla priser.",starter:`Varukorg k = new Varukorg();
k.LäggTill(25);
k.LäggTill(-5);
k.LäggTill(40);
Console.WriteLine($"{k.Antal} varor, {k.Totalt()} kr");
Varukorg tom = new Varukorg();
Console.WriteLine($"{tom.Antal} varor, {tom.Totalt()} kr");

class Varukorg
{
    private List<int> priser = new List<int>();
    public int Antal => priser.Count;

    public void LäggTill(int pris)
    {
    }

    public int Totalt()
    {
        return 0;
    }
}`,output:`2 varor, 65 kr
0 varor, 0 kr`,solution:`Varukorg k = new Varukorg();
k.LäggTill(25);
k.LäggTill(-5);
k.LäggTill(40);
Console.WriteLine($"{k.Antal} varor, {k.Totalt()} kr");
Varukorg tom = new Varukorg();
Console.WriteLine($"{tom.Antal} varor, {tom.Totalt()} kr");

class Varukorg
{
    private List<int> priser = new List<int>();
    public int Antal => priser.Count;

    public void LäggTill(int pris)
    {
        if (pris > 0)
        {
            priser.Add(pris);
        }
    }

    public int Totalt()
    {
        int summa = 0;
        foreach (int p in priser)
        {
            summa += p;
        }
        return summa;
    }
}`,explain:`Listan är private, så det enda sättet att lägga till något är LäggTill. Då kan inga felaktiga priser hamna i korgen.`,hint:`I LäggTill: if (pris > 0) priser.Add(pris);. I Totalt: summera med en foreach.`},{type:`code`,prompt:"Klassen `Elev` är klar. Skriv programmet som först skriver ut alla elever med minst 50 poäng (en per rad, med ToString), och sist `Bäst: NAMN`.",starter:`List<Elev> elever = new List<Elev>
{
    new Elev("Ada", 72),
    new Elev("Bo", 45),
    new Elev("Cia", 88),
    new Elev("Dan", 50),
};
// Skriv din kod här

class Elev
{
    public string Namn { get; }
    public int Poäng { get; }

    public Elev(string namn, int poäng)
    {
        Namn = namn;
        Poäng = poäng;
    }

    public override string ToString()
    {
        return $"{Namn}: {Poäng} p";
    }
}`,output:`Ada: 72 p
Cia: 88 p
Dan: 50 p
Bäst: Cia`,require:[n(`\\bforeach\\b|\\bfor\\b`,`Använd en loop över elever.`),n(`\\.Poäng`,`Jämför med e.Poäng.`)],forbid:[n(`Bäst:\\s*Cia`,`Hitta den bästa eleven med kod i stället för att skriva namnet.`)],solution:`List<Elev> elever = new List<Elev>
{
    new Elev("Ada", 72),
    new Elev("Bo", 45),
    new Elev("Cia", 88),
    new Elev("Dan", 50),
};
Elev bäst = elever[0];
foreach (Elev e in elever)
{
    if (e.Poäng >= 50)
    {
        Console.WriteLine(e);
    }
    if (e.Poäng > bäst.Poäng)
    {
        bäst = e;
    }
}
Console.WriteLine($"Bäst: {bäst.Namn}");

class Elev
{
    public string Namn { get; }
    public int Poäng { get; }

    public Elev(string namn, int poäng)
    {
        Namn = namn;
        Poäng = poäng;
    }

    public override string ToString()
    {
        return $"{Namn}: {Poäng} p";
    }
}`,explain:`Du kan spara ett helt objekt i en variabel, som bäst. Då har du både namn och poäng tillgängliga efteråt.`,hint:`Spara Elev bäst = elever[0]; och byt ut den i loopen när någon har fler poäng.`}]},{id:`cs-bank`,title:`Miniprojekt: bankkonto`,tier:5,text:`Nu bygger du ett litet banksystem. Du kombinerar klasser, egenskaper med \`private set\`, konstruktorer, egna undantag och felhantering med try och catch.

Kontot ska vara omöjligt att få i ett ogiltigt läge: saldot ändras bara via metoder som kontrollerar beloppen. Ta en del i taget. Varje del bygger vidare på den förra.`,example:`// 1. Skapa ett konto
Konto k = new Konto("Ada");
Console.WriteLine($"{k.Ägare} har {k.Saldo} kr");

class Konto
{
    // 2. Egenskaper för ägare och saldo
    public string Ägare { get; }
    public int Saldo { get; private set; }

    // 3. Konstruktorn sätter ägaren
    public Konto(string ägare)
    {
        Ägare = ägare;
    }
}`,exercises:[{type:`code`,prompt:'Del 1: Gör klart `SättIn(int belopp)`. Den ska öka saldot, men kasta `ArgumentException("Beloppet måste vara positivt")` om beloppet är 0 eller mindre.',starter:`Konto k = new Konto("Ada");
k.SättIn(100);
try
{
    k.SättIn(-5);
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}
Console.WriteLine(k.Saldo);

class Konto
{
    public string Ägare { get; }
    public int Saldo { get; private set; }

    public Konto(string ägare)
    {
        Ägare = ägare;
    }

    public void SättIn(int belopp)
    {
    }
}`,output:`Fel: Beloppet måste vara positivt
100`,require:[n(`throw\\s+new\\s+ArgumentException`,`Kasta felet med throw new ArgumentException("...").`)],solution:`Konto k = new Konto("Ada");
k.SättIn(100);
try
{
    k.SättIn(-5);
}
catch (ArgumentException e)
{
    Console.WriteLine("Fel: " + e.Message);
}
Console.WriteLine(k.Saldo);

class Konto
{
    public string Ägare { get; }
    public int Saldo { get; private set; }

    public Konto(string ägare)
    {
        Ägare = ägare;
    }

    public void SättIn(int belopp)
    {
        if (belopp <= 0)
        {
            throw new ArgumentException("Beloppet måste vara positivt");
        }
        Saldo += belopp;
    }
}`,explain:`Kontrollen kommer före ändringen, så ett felaktigt belopp rör aldrig saldot.`,hint:`Kontrollera belopp <= 0 och kasta undantaget innan du ändrar Saldo.`},{type:`code`,prompt:'Del 2: Gör klart `TaUt(int belopp)`. Belopp på 0 eller mindre ger `ArgumentException("Beloppet måste vara positivt")`, och ett belopp större än saldot ger `InvalidOperationException("Täckning saknas")`. Lyckade insättningar och uttag sparas i historiken som `+100` och `-30`.',starter:`Konto k = new Konto("Ada");
k.SättIn(100);
k.TaUt(30);
int[] försök = {500, 0};
foreach (int b in försök)
{
    try
    {
        k.TaUt(b);
    }
    catch (ArgumentException e)
    {
        Console.WriteLine("Fel belopp: " + e.Message);
    }
    catch (InvalidOperationException e)
    {
        Console.WriteLine("Nekat: " + e.Message);
    }
}
Console.WriteLine(k.Saldo);
Console.WriteLine(string.Join(", ", k.Historik));

class Konto
{
    private List<string> historik = new List<string>();
    public string Ägare { get; }
    public int Saldo { get; private set; }
    public List<string> Historik => historik;

    public Konto(string ägare)
    {
        Ägare = ägare;
    }

    public void SättIn(int belopp)
    {
        if (belopp <= 0)
        {
            throw new ArgumentException("Beloppet måste vara positivt");
        }
        Saldo += belopp;
        historik.Add($"+{belopp}");
    }

    public void TaUt(int belopp)
    {
    }
}`,output:`Nekat: Täckning saknas
Fel belopp: Beloppet måste vara positivt
70
+100, -30`,require:[n(`throw\\s+new\\s+InvalidOperationException`,`Kasta InvalidOperationException när täckning saknas.`)],solution:`Konto k = new Konto("Ada");
k.SättIn(100);
k.TaUt(30);
int[] försök = {500, 0};
foreach (int b in försök)
{
    try
    {
        k.TaUt(b);
    }
    catch (ArgumentException e)
    {
        Console.WriteLine("Fel belopp: " + e.Message);
    }
    catch (InvalidOperationException e)
    {
        Console.WriteLine("Nekat: " + e.Message);
    }
}
Console.WriteLine(k.Saldo);
Console.WriteLine(string.Join(", ", k.Historik));

class Konto
{
    private List<string> historik = new List<string>();
    public string Ägare { get; }
    public int Saldo { get; private set; }
    public List<string> Historik => historik;

    public Konto(string ägare)
    {
        Ägare = ägare;
    }

    public void SättIn(int belopp)
    {
        if (belopp <= 0)
        {
            throw new ArgumentException("Beloppet måste vara positivt");
        }
        Saldo += belopp;
        historik.Add($"+{belopp}");
    }

    public void TaUt(int belopp)
    {
        if (belopp <= 0)
        {
            throw new ArgumentException("Beloppet måste vara positivt");
        }
        if (belopp > Saldo)
        {
            throw new InvalidOperationException("Täckning saknas");
        }
        Saldo -= belopp;
        historik.Add($"-{belopp}");
    }
}`,explain:`Två olika undantagstyper låter anroparen skilja på ett felaktigt belopp och ett belopp som inte går att ta ut just nu. Misslyckade uttag hamnar aldrig i historiken.`,hint:`Två if med throw först, sedan Saldo -= belopp; och historik.Add($"-{belopp}");.`},{type:`code`,prompt:"Del 3: Ge Konto en `ToString()` som visar `Ada: 60 kr`. Skriv sedan `static void Överför(Konto från, Konto till, int belopp)`. Om något går fel ska den skriva ut `Överföringen stoppades: ` följt av meddelandet, och inget saldo får ändras. Programmet skriver till sist ut alla konton och bankens totala saldo.",starter:`Konto a = new Konto("Ada");
Konto b = new Konto("Bo");
Konto c = new Konto("Cia");
a.SättIn(100);
c.SättIn(20);
Överför(a, b, 40);
Överför(a, b, 500);
Överför(c, a, -5);
List<Konto> konton = new List<Konto> { a, b, c };
int totalt = 0;
foreach (Konto k in konton)
{
    Console.WriteLine(k);
    totalt += k.Saldo;
}
Console.WriteLine($"Banken totalt: {totalt} kr");

static void Överför(Konto från, Konto till, int belopp)
{
}

class Konto
{
    public string Ägare { get; }
    public int Saldo { get; private set; }

    public Konto(string ägare)
    {
        Ägare = ägare;
    }

    public void SättIn(int belopp)
    {
        if (belopp <= 0)
        {
            throw new ArgumentException("Beloppet måste vara positivt");
        }
        Saldo += belopp;
    }

    public void TaUt(int belopp)
    {
        if (belopp <= 0)
        {
            throw new ArgumentException("Beloppet måste vara positivt");
        }
        if (belopp > Saldo)
        {
            throw new InvalidOperationException("Täckning saknas");
        }
        Saldo -= belopp;
    }
}`,output:`Överföringen stoppades: Täckning saknas
Överföringen stoppades: Beloppet måste vara positivt
Ada: 60 kr
Bo: 40 kr
Cia: 20 kr
Banken totalt: 120 kr`,require:[n(`public\\s+override\\s+string\\s+ToString\\s*\\(`,`Ge Konto en public override string ToString().`),n(`\\btry\\b`,`Använd try och catch i Överför.`)],solution:`Konto a = new Konto("Ada");
Konto b = new Konto("Bo");
Konto c = new Konto("Cia");
a.SättIn(100);
c.SättIn(20);
Överför(a, b, 40);
Överför(a, b, 500);
Överför(c, a, -5);
List<Konto> konton = new List<Konto> { a, b, c };
int totalt = 0;
foreach (Konto k in konton)
{
    Console.WriteLine(k);
    totalt += k.Saldo;
}
Console.WriteLine($"Banken totalt: {totalt} kr");

static void Överför(Konto från, Konto till, int belopp)
{
    try
    {
        från.TaUt(belopp);
        till.SättIn(belopp);
    }
    catch (ArgumentException e)
    {
        Console.WriteLine("Överföringen stoppades: " + e.Message);
    }
    catch (InvalidOperationException e)
    {
        Console.WriteLine("Överföringen stoppades: " + e.Message);
    }
}

class Konto
{
    public string Ägare { get; }
    public int Saldo { get; private set; }

    public Konto(string ägare)
    {
        Ägare = ägare;
    }

    public void SättIn(int belopp)
    {
        if (belopp <= 0)
        {
            throw new ArgumentException("Beloppet måste vara positivt");
        }
        Saldo += belopp;
    }

    public void TaUt(int belopp)
    {
        if (belopp <= 0)
        {
            throw new ArgumentException("Beloppet måste vara positivt");
        }
        if (belopp > Saldo)
        {
            throw new InvalidOperationException("Täckning saknas");
        }
        Saldo -= belopp;
    }

    public override string ToString()
    {
        return $"{Ägare}: {Saldo} kr";
    }
}`,explain:`Uttaget görs först. Misslyckas det hoppar programmet till catch innan insättningen, så inga pengar försvinner eller skapas. Bankens totala saldo stämmer därför alltid.`,hint:`Lägg från.TaUt(belopp); och till.SättIn(belopp); i try, och fånga båda undantagstyperna.`}]}]},{id:`cs9`,title:`Arv och interface`,lessons:[{id:`cs-inherit`,title:`Arv`,tier:4,text:"Ibland liknar flera klasser varandra. En hund och en katt har båda namn och ålder. I stället för att skriva samma kod två gånger lägger du det gemensamma i en **basklass**, `Djur`, och skriver `class Hund : Djur`. Då ärver Hund alla fält, egenskaper och metoder från Djur.\n\nOm basklassens konstruktor tar parametrar måste den ärvande klassen skicka vidare värdena med `: base(...)`. Basklassens konstruktor körs alltid först, sedan den egna.\n\n`private` stänger ute alla utom klassen själv, även klasser som ärver. `protected` släpper in ärvande klasser men håller resten av programmet ute. Arv gör att gemensam logik bara finns på ett ställe, så en ändring där gäller alla klasser som ärver.",example:`// 1. Använd en Hund
Hund rex = new Hund("Rex", 3);
rex.Presentera();
rex.Skälla();

// 2. Basklassen
class Djur
{
    public string Namn { get; }
    protected int ålder;

    public Djur(string namn, int ålder)
    {
        Namn = namn;
        this.ålder = ålder;
    }

    public void Presentera()
    {
        Console.WriteLine($"{Namn}, {ålder} år");
    }
}

// 3. Hund ärver från Djur
class Hund : Djur
{
    public Hund(string namn, int ålder) : base(namn, ålder)
    {
    }

    public void Skälla()
    {
        Console.WriteLine($"{Namn} säger voff");
    }
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`new Hund();

class Djur
{
    public Djur()
    {
        Console.WriteLine("Djur");
    }
}

class Hund : Djur
{
    public Hund()
    {
        Console.WriteLine("Hund");
    }
}`,options:[`Djur
Hund`,`Hund
Djur`,`Hund`],answer:0,out:!0,explain:`När ett Hund-objekt skapas körs basklassens konstruktor först, sedan Hunds egen.`,why:{1:`Ordningen är tvärtom. Basen byggs först, sedan det som läggs till.`,2:`Basklassens konstruktor körs också, även när du inte skriver : base() själv.`}},{type:`choice`,prompt:"Fältet `energi` i `Djur` ska kunna ändras i `Hund : Djur`, men inte från resten av programmet. Vilket ord ska stå framför fältet?",options:[`protected`,`private`,`public`],answer:0,explain:`protected betyder: klassen själv och klasser som ärver från den.`,why:{1:`private stänger ute även Hund, så Hund kan inte ändra fältet.`,2:`public släpper in hela programmet, och det var just det som skulle undvikas.`}},{type:`fill`,prompt:`Låt Katt ärva från Djur och skicka namnet vidare till basklassens konstruktor.`,code:`Katt k = new Katt("Misse");
Console.WriteLine(k.Namn);

class Djur
{
    public string Namn { get; }

    public Djur(string namn)
    {
        Namn = namn;
    }
}

class Katt ___ Djur
{
    public Katt(string namn) : ___(namn)
    {
    }
}`,answers:[[`:`],[`base`]],output:`Misse`,explain:`Kolon efter klassnamnet betyder ärver från. : base(namn) skickar namnet till Djurs konstruktor.`},{type:`code`,prompt:"Skriv klasserna `Bil` och `Cykel` som båda ärver från `Fordon`. Bil tar märke och antal platser och har egenskapen `Platser`. Cykel tar bara märke. Använd `: base(...)` för märket.",starter:`Bil bil = new Bil("Volvo", 5);
Cykel cykel = new Cykel("Crescent");
Console.WriteLine(bil.Beskriv());
Console.WriteLine($"Platser: {bil.Platser}");
Console.WriteLine(cykel.Beskriv());

class Fordon
{
    public string Märke { get; }

    public Fordon(string märke)
    {
        Märke = märke;
    }

    public string Beskriv()
    {
        return $"Ett fordon från {Märke}";
    }
}

// Skriv klasserna Bil och Cykel här
`,output:`Ett fordon från Volvo
Platser: 5
Ett fordon från Crescent`,require:[n(`class\\s+Bil\\s*:\\s*Fordon`,`Bil ska ärva från Fordon: class Bil : Fordon.`),n(`class\\s+Cykel\\s*:\\s*Fordon`,`Cykel ska ärva från Fordon.`),n(`:\\s*base\\s*\\(`,`Skicka märket vidare med : base(märke).`)],solution:`Bil bil = new Bil("Volvo", 5);
Cykel cykel = new Cykel("Crescent");
Console.WriteLine(bil.Beskriv());
Console.WriteLine($"Platser: {bil.Platser}");
Console.WriteLine(cykel.Beskriv());

class Fordon
{
    public string Märke { get; }

    public Fordon(string märke)
    {
        Märke = märke;
    }

    public string Beskriv()
    {
        return $"Ett fordon från {Märke}";
    }
}

class Bil : Fordon
{
    public int Platser { get; }

    public Bil(string märke, int platser) : base(märke)
    {
        Platser = platser;
    }
}

class Cykel : Fordon
{
    public Cykel(string märke) : base(märke)
    {
    }
}`,explain:`Beskriv() och Märke skrevs en gång i Fordon men fungerar för både Bil och Cykel. Bil lägger bara till det som är unikt för bilar.`,hint:`class Bil : Fordon med en egenskap Platser och konstruktorn public Bil(string märke, int platser) : base(märke).`},{type:`debug`,prompt:"Programmet går inte att köra eftersom Hund inte får ändra `energi`. Rätta det så att Hund kommer åt fältet, men resten av programmet fortfarande inte gör det.",starter:`Hund h = new Hund();
h.Lek();
h.Lek();
h.VisaEnergi();

class Djur
{
    private int energi = 100;

    public void VisaEnergi()
    {
        Console.WriteLine($"Energi: {energi}");
    }
}

class Hund : Djur
{
    public void Lek()
    {
        energi -= 10;
        Console.WriteLine("Hunden leker");
    }
}`,output:`Hunden leker
Hunden leker
Energi: 80`,require:[n(`protected\\s+int\\s+energi`,`Gör fältet protected, inte public.`)],solution:`Hund h = new Hund();
h.Lek();
h.Lek();
h.VisaEnergi();

class Djur
{
    protected int energi = 100;

    public void VisaEnergi()
    {
        Console.WriteLine($"Energi: {energi}");
    }
}

class Hund : Djur
{
    public void Lek()
    {
        energi -= 10;
        Console.WriteLine("Hunden leker");
    }
}`,explain:`private gäller bara Djur själv. protected släpper in Hund men inte koden högst upp.`,hint:`Byt private mot protected på fältet energi.`},{type:`code`,prompt:"Skriv `Chef : Anställd`. En chef har namn, månadslön och en årlig bonus. Lägg till metoden `int TotalLön()` som returnerar årslönen plus bonusen. Använd det skyddade fältet `månadslön` eller metoden `Årslön()` från basklassen.",starter:`Anställd a = new Anställd("Bo", 30000);
Chef c = new Chef("Sara", 40000, 50000);
Console.WriteLine($"{a.Namn}: {a.Årslön()}");
Console.WriteLine($"{c.Namn}: {c.Årslön()} + bonus = {c.TotalLön()}");

class Anställd
{
    public string Namn { get; }
    protected int månadslön;

    public Anställd(string namn, int månadslön)
    {
        Namn = namn;
        this.månadslön = månadslön;
    }

    public int Årslön()
    {
        return månadslön * 12;
    }
}

// Skriv klassen Chef här
`,output:`Bo: 360000
Sara: 480000 + bonus = 530000`,require:[n(`class\\s+Chef\\s*:\\s*Anställd`,`Chef ska ärva från Anställd.`),n(`:\\s*base\\s*\\(`,`Skicka namn och månadslön vidare med : base(...).`)],solution:`Anställd a = new Anställd("Bo", 30000);
Chef c = new Chef("Sara", 40000, 50000);
Console.WriteLine($"{a.Namn}: {a.Årslön()}");
Console.WriteLine($"{c.Namn}: {c.Årslön()} + bonus = {c.TotalLön()}");

class Anställd
{
    public string Namn { get; }
    protected int månadslön;

    public Anställd(string namn, int månadslön)
    {
        Namn = namn;
        this.månadslön = månadslön;
    }

    public int Årslön()
    {
        return månadslön * 12;
    }
}

class Chef : Anställd
{
    private int bonus;

    public Chef(string namn, int månadslön, int bonus) : base(namn, månadslön)
    {
        this.bonus = bonus;
    }

    public int TotalLön()
    {
        return Årslön() + bonus;
    }
}`,explain:`Konstruktorn tar tre värden men skickar bara två till basen. Bonusen är Chefs egen sak och sparas i ett eget fält.`,hint:`public Chef(string namn, int månadslön, int bonus) : base(namn, månadslön) och spara bonus i ett fält.`}]},{id:`cs-virtual`,title:`Virtuella metoder`,tier:4,text:"Ibland ska en ärvande klass göra samma sak på sitt eget sätt. Markera metoden med `virtual` i basklassen, så kan den ärvande klassen skriva en egen version med `override`. Inuti en override kan du anropa basklassens version med `base.Metod()` och bygga vidare på den.\n\nDet riktigt användbara kallas **polymorfism**: en `List<Djur>` kan innehålla både hundar och katter, och när du anropar `d.Låt()` körs rätt version för varje objekt. Koden som loopar behöver inte veta vilken sorts djur det är.\n\nMed `is` kan du kolla vilken typ ett objekt har: `if (d is Hund)`. Det är ibland praktiskt, men oftast är en override bättre. Då hamnar koden för hundar i klassen Hund och inte i en lång if-kedja.",example:`// 1. Skapa en lista med djur
List<Djur> djur = new List<Djur> { new Hund(), new Katt(), new Djur() };
// 2. Anropa Låt för varje djur
foreach (Djur d in djur)
{
    Console.WriteLine(d.Låt());
}

// 3. Basklass med virtual
class Djur
{
    public virtual string Låt()
    {
        return "...";
    }
}

// 4. Underklasser med override
class Hund : Djur
{
    public override string Låt()
    {
        return "Voff";
    }
}

class Katt : Djur
{
    public override string Låt()
    {
        return "Mjau";
    }
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`List<Djur> djur = new List<Djur> { new Hund(), new Katt() };
foreach (Djur d in djur)
{
    Console.WriteLine(d.Låt());
}

class Djur
{
    public virtual string Låt() => "...";
}

class Hund : Djur
{
    public override string Låt() => "Voff";
}

class Katt : Djur
{
}`,options:[`Voff
...`,`Voff
Mjau`,`...
...`],answer:0,out:!0,explain:`Hund har en egen override. Katt har ingen, så den använder basklassens version.`,why:{1:`Katt har ingen egen Låt(), och "Mjau" står ingenstans i koden.`,2:`Listan har typen Djur, men varje objekt kör ändå sin egen override. Det är hela poängen med virtual.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`Console.WriteLine(new Stamkund().Hälsning());

class Kund
{
    public virtual string Hälsning() => "Hej";
}

class Stamkund : Kund
{
    public override string Hälsning() => base.Hälsning() + " och välkommen tillbaka";
}`,options:[`Hej och välkommen tillbaka`,` och välkommen tillbaka`,`Hej`],answer:0,out:!0,explain:`base.Hälsning() ger "Hej", och sedan läggs resten till.`,why:{1:`base.Hälsning() anropar Kunds version, som returnerar "Hej".`,2:`Stamkund har en override, så det är den som körs. Den använder "Hej" men lägger till mer.`}},{type:`fill`,prompt:`Gör så att Pingvin kan ha en egen version av Rör().`,code:`Fågel f = new Pingvin();
Console.WriteLine(f.Rör());

class Fågel
{
    public ___ string Rör() => "Flyger";
}

class Pingvin : Fågel
{
    public ___ string Rör() => "Simmar";
}`,answers:[[`virtual`],[`override`]],output:`Simmar`,explain:`virtual i basen tillåter en ny version, override i den ärvande klassen skriver den.`},{type:`code`,prompt:"Barnbiljetter kostar 60 kr och pensionärsbiljetter 90 kr, men alla biljetter kostar just nu 120. Gör `Pris()` virtuell och skriv överskuggningar i `Barnbiljett` och `Pensionärsbiljett`.",starter:`List<Biljett> köp = new List<Biljett>
{
    new Biljett(), new Barnbiljett(), new Barnbiljett(), new Pensionärsbiljett()
};
int totalt = 0;
foreach (Biljett b in köp)
{
    totalt += b.Pris();
}
Console.WriteLine($"Totalt: {totalt} kr");

class Biljett
{
    public int Pris()
    {
        return 120;
    }
}

class Barnbiljett : Biljett
{
}

class Pensionärsbiljett : Biljett
{
}
`,output:`Totalt: 330 kr`,require:[n(`virtual\\s+int\\s+Pris`,`Markera Pris() i Biljett som virtual.`),n(`override\\s+int\\s+Pris[\\s\\S]*override\\s+int\\s+Pris`,`Båda de ärvande klasserna behöver en override.`)],solution:`List<Biljett> köp = new List<Biljett>
{
    new Biljett(), new Barnbiljett(), new Barnbiljett(), new Pensionärsbiljett()
};
int totalt = 0;
foreach (Biljett b in köp)
{
    totalt += b.Pris();
}
Console.WriteLine($"Totalt: {totalt} kr");

class Biljett
{
    public virtual int Pris()
    {
        return 120;
    }
}

class Barnbiljett : Biljett
{
    public override int Pris()
    {
        return 60;
    }
}

class Pensionärsbiljett : Biljett
{
    public override int Pris()
    {
        return 90;
    }
}`,explain:`120 + 60 + 60 + 90 = 330. Loopen ändrades inte alls, varje biljett vet själv sitt pris.`,hint:`public virtual int Pris() i Biljett och public override int Pris() i de andra två.`},{type:`code`,prompt:"Ett sparkonto ska beskrivas som ett vanligt konto plus räntan, till exempel `Konto 1002: 500 kr (ränta 3 %)`. Skriv en override av `Beskriv()` i `Sparkonto` som använder `base.Beskriv()`.",starter:`Konto a = new Konto(1001, 200);
Konto b = new Sparkonto(1002, 500, 3);
Console.WriteLine(a.Beskriv());
Console.WriteLine(b.Beskriv());

class Konto
{
    public int Nummer { get; }
    public int Saldo { get; }

    public Konto(int nummer, int saldo)
    {
        Nummer = nummer;
        Saldo = saldo;
    }

    public virtual string Beskriv()
    {
        return $"Konto {Nummer}: {Saldo} kr";
    }
}

class Sparkonto : Konto
{
    public int Ränta { get; }

    public Sparkonto(int nummer, int saldo, int ränta) : base(nummer, saldo)
    {
        Ränta = ränta;
    }
}
`,output:`Konto 1001: 200 kr
Konto 1002: 500 kr (ränta 3 %)`,require:[n(`override\\s+string\\s+Beskriv`,`Skriv public override string Beskriv() i Sparkonto.`),n(`base\\s*\\.\\s*Beskriv\\s*\\(`,`Använd base.Beskriv() i stället för att skriva texten igen.`)],solution:`Konto a = new Konto(1001, 200);
Konto b = new Sparkonto(1002, 500, 3);
Console.WriteLine(a.Beskriv());
Console.WriteLine(b.Beskriv());

class Konto
{
    public int Nummer { get; }
    public int Saldo { get; }

    public Konto(int nummer, int saldo)
    {
        Nummer = nummer;
        Saldo = saldo;
    }

    public virtual string Beskriv()
    {
        return $"Konto {Nummer}: {Saldo} kr";
    }
}

class Sparkonto : Konto
{
    public int Ränta { get; }

    public Sparkonto(int nummer, int saldo, int ränta) : base(nummer, saldo)
    {
        Ränta = ränta;
    }

    public override string Beskriv()
    {
        return base.Beskriv() + $" (ränta {Ränta} %)";
    }
}`,explain:`Om formatet för vanliga konton ändras följer sparkontot automatiskt med, eftersom texten bara finns på ett ställe.`,hint:`return base.Beskriv() + $" (ränta {Ränta} %)";`},{type:`debug`,prompt:"Alla djur säger `...`, trots att Hund och Katt har egna versioner av `Låt()`. Rätta det så att varje djur låter som sig självt. Räkna sedan hundarna med `is` och skriv ut `Hundar: 2` sist.",starter:`List<Djur> djur = new List<Djur> { new Hund(), new Katt(), new Hund() };
foreach (Djur d in djur)
{
    Console.WriteLine(d.Låt());
}

class Djur
{
    public string Låt() => "...";
}

class Hund : Djur
{
    public string Låt() => "Voff";
}

class Katt : Djur
{
    public string Låt() => "Mjau";
}
`,output:`Voff
Mjau
Voff
Hundar: 2`,require:[n(`\\bis\\s+Hund\\b`,`Räkna hundarna med is Hund.`)],solution:`List<Djur> djur = new List<Djur> { new Hund(), new Katt(), new Hund() };
int hundar = 0;
foreach (Djur d in djur)
{
    Console.WriteLine(d.Låt());
    if (d is Hund)
    {
        hundar++;
    }
}
Console.WriteLine($"Hundar: {hundar}");

class Djur
{
    public virtual string Låt() => "...";
}

class Hund : Djur
{
    public override string Låt() => "Voff";
}

class Katt : Djur
{
    public override string Låt() => "Mjau";
}`,explain:`Utan virtual bestämmer variabelns typ, Djur, vilken metod som körs. Med virtual och override bestämmer objektets verkliga typ.`,hint:`Lägg till virtual i Djur och override i Hund och Katt. Räkna med if (d is Hund) i loopen.`}]},{id:`cs-abstract`,title:`Abstrakta klasser`,tier:4,text:'Ibland är basklassen bara en idé. Det finns ingen sak som bara är en "form", det finns cirklar och rektanglar. Då gör du basklassen `abstract`. Du kan inte skapa ett objekt av den med `new`, bara av klasserna som ärver.\n\nEn abstrakt klass kan ha **abstrakta metoder**: `public abstract double Area();` har ingen kropp alls. Varje klass som ärver måste skriva en egen version med `override`, annars går programmet inte att köra. Så kan du inte glömma bort den.\n\nEn abstrakt klass kan också ha vanliga fält, konstruktorer och metoder som alla delar. En vanlig metod i basklassen får till och med anropa den abstrakta metoden, och då körs rätt version för varje objekt.',example:`// 1. Skapa former
List<Form> former = new List<Form> { new Cirkel(2), new Rektangel(3, 4) };
// 2. Beskriv varje form
foreach (Form f in former)
{
    Console.WriteLine(f.Beskriv());
}

// 3. Abstrakt basklass
abstract class Form
{
    public abstract double Area();

    public string Beskriv()
    {
        return $"Area: {Area():F2}";
    }
}

// 4. Konkreta former
class Cirkel : Form
{
    private double radie;

    public Cirkel(double radie)
    {
        this.radie = radie;
    }

    public override double Area()
    {
        return Math.PI * radie * radie;
    }
}

class Rektangel : Form
{
    private double bredd;
    private double höjd;

    public Rektangel(double bredd, double höjd)
    {
        this.bredd = bredd;
        this.höjd = höjd;
    }

    public override double Area()
    {
        return bredd * höjd;
    }
}`,exercises:[{type:`choice`,prompt:"`Form` är en abstrakt klass. Vad händer med raden `Form f = new Form();`?",options:[`Programmet går inte att köra, för det går inte att skapa objekt av en abstrakt klass`,`Det skapas en tom form med arean 0`,`Det fungerar, men Area() returnerar null`],answer:0,explain:`abstract betyder just att klassen bara är en mall för andra klasser. Du skapar en Cirkel eller Rektangel i stället.`,why:{1:`C# hittar inte på något standardvärde. Det blir fel redan innan något körs.`,2:`Det går inte ens att skapa objektet, så Area() kan aldrig anropas på det.`}},{type:`choice`,prompt:"Vad är skillnaden mellan en `virtual` och en `abstract` metod?",options:[`En virtual metod har en kropp och får skrivas om. En abstract metod saknar kropp och måste skrivas om.`,`Det är samma sak med olika namn`,`En abstract metod får bara finnas i interface`],answer:0,explain:`Använd virtual när det finns ett vettigt standardbeteende, och abstract när varje klass måste bestämma själv.`,why:{1:`En virtual metod har en egen kod som används om ingen override finns. En abstract har ingen kod alls.`,2:`Abstrakta metoder finns i abstrakta klasser, som Form i exemplet.`}},{type:`fill`,prompt:`Gör Form abstrakt och skriv Kvadratens version av Area().`,code:`Form f = new Kvadrat(3);
Console.WriteLine(f.Area());

___ class Form
{
    public abstract double Area();
}

class Kvadrat : Form
{
    private double sida;

    public Kvadrat(double sida)
    {
        this.sida = sida;
    }

    public ___ double Area() => sida * sida;
}`,answers:[[`abstract`],[`override`]],output:`9`,explain:`En klass med en abstrakt metod måste själv vara abstrakt. Kvadrat skriver sin version med override.`},{type:`code`,prompt:'Lägg till klassen `Triangel : Form` med bas och höjd. Arean är bas gånger höjd delat med 2. Namnet "Triangel" skickas till basklassen med `: base("Triangel")`.',starter:`List<Form> former = new List<Form> { new Cirkel(1), new Rektangel(2, 3), new Triangel(4, 3) };
foreach (Form f in former)
{
    Console.WriteLine(f.Beskriv());
}

abstract class Form
{
    public string Namn { get; }

    protected Form(string namn)
    {
        Namn = namn;
    }

    public abstract double Area();

    public string Beskriv()
    {
        return $"{Namn}: {Area():F1}";
    }
}

class Cirkel : Form
{
    private double radie;

    public Cirkel(double radie) : base("Cirkel")
    {
        this.radie = radie;
    }

    public override double Area() => Math.PI * radie * radie;
}

class Rektangel : Form
{
    private double bredd;
    private double höjd;

    public Rektangel(double bredd, double höjd) : base("Rektangel")
    {
        this.bredd = bredd;
        this.höjd = höjd;
    }

    public override double Area() => bredd * höjd;
}

// Skriv klassen Triangel här
`,output:`Cirkel: 3.1
Rektangel: 6.0
Triangel: 6.0`,require:[n(`class\\s+Triangel\\s*:\\s*Form`,`Triangel ska ärva från Form.`),n(`base\\s*\\(\\s*"Triangel"\\s*\\)`,`Skicka namnet med : base("Triangel").`)],solution:`List<Form> former = new List<Form> { new Cirkel(1), new Rektangel(2, 3), new Triangel(4, 3) };
foreach (Form f in former)
{
    Console.WriteLine(f.Beskriv());
}

abstract class Form
{
    public string Namn { get; }

    protected Form(string namn)
    {
        Namn = namn;
    }

    public abstract double Area();

    public string Beskriv()
    {
        return $"{Namn}: {Area():F1}";
    }
}

class Cirkel : Form
{
    private double radie;

    public Cirkel(double radie) : base("Cirkel")
    {
        this.radie = radie;
    }

    public override double Area() => Math.PI * radie * radie;
}

class Rektangel : Form
{
    private double bredd;
    private double höjd;

    public Rektangel(double bredd, double höjd) : base("Rektangel")
    {
        this.bredd = bredd;
        this.höjd = höjd;
    }

    public override double Area() => bredd * höjd;
}

class Triangel : Form
{
    private double bas;
    private double höjd;

    public Triangel(double bas, double höjd) : base("Triangel")
    {
        this.bas = bas;
        this.höjd = höjd;
    }

    public override double Area() => bas * höjd / 2;
}`,explain:`Triangel behöver bara skriva det som är unikt: sina mått och sin area. Beskriv() och Namn får den från Form.`,hint:`Två fält, en konstruktor med : base("Triangel") och public override double Area() => bas * höjd / 2;`},{type:`code`,prompt:"Skriv den abstrakta klassen `Anställd` med egenskapen `Namn` och den abstrakta metoden `int Lön()`. Skriv sedan `Fast` (namn, månadslön) och `Timanställd` (namn, timmar, timlön) som ärver från den.",starter:`List<Anställd> personal = new List<Anställd>
{
    new Fast("Ada", 32000),
    new Timanställd("Bo", 80, 150),
    new Timanställd("Cy", 0, 200)
};
int total = 0;
foreach (Anställd a in personal)
{
    Console.WriteLine($"{a.Namn}: {a.Lön()} kr");
    total += a.Lön();
}
Console.WriteLine($"Totalt: {total} kr");

// Skriv klasserna Anställd, Fast och Timanställd här
`,output:`Ada: 32000 kr
Bo: 12000 kr
Cy: 0 kr
Totalt: 44000 kr`,require:[n(`abstract\\s+class\\s+Anställd`,`Anställd ska vara en abstract class.`),n(`abstract\\s+int\\s+Lön\\s*\\(`,`Lön() ska vara abstract i Anställd.`)],solution:`List<Anställd> personal = new List<Anställd>
{
    new Fast("Ada", 32000),
    new Timanställd("Bo", 80, 150),
    new Timanställd("Cy", 0, 200)
};
int total = 0;
foreach (Anställd a in personal)
{
    Console.WriteLine($"{a.Namn}: {a.Lön()} kr");
    total += a.Lön();
}
Console.WriteLine($"Totalt: {total} kr");

abstract class Anställd
{
    public string Namn { get; }

    protected Anställd(string namn)
    {
        Namn = namn;
    }

    public abstract int Lön();
}

class Fast : Anställd
{
    private int månadslön;

    public Fast(string namn, int månadslön) : base(namn)
    {
        this.månadslön = månadslön;
    }

    public override int Lön() => månadslön;
}

class Timanställd : Anställd
{
    private int timmar;
    private int timlön;

    public Timanställd(string namn, int timmar, int timlön) : base(namn)
    {
        this.timmar = timmar;
        this.timlön = timlön;
    }

    public override int Lön() => timmar * timlön;
}`,explain:`Lönelistan behöver inte veta hur lönen räknas ut. Kommer det en ny sorts anställd senare skriver du bara en ny klass.`,hint:`Börja med abstract class Anställd med Namn, en konstruktor och public abstract int Lön();. Fast och Timanställd skickar namnet med : base(namn).`},{type:`debug`,prompt:`Programmet har två fel och går inte att köra. Läs felmeddelandena och rätta dem ett i taget.`,starter:`Form f = new Cirkel(2);
Console.WriteLine($"{f.Area():F2}");

class Form
{
    public abstract double Area();
}

class Cirkel : Form
{
    private double radie;

    public Cirkel(double radie)
    {
        this.radie = radie;
    }

    public double Area()
    {
        return Math.PI * radie * radie;
    }
}`,output:`12.57`,solution:`Form f = new Cirkel(2);
Console.WriteLine($"{f.Area():F2}");

abstract class Form
{
    public abstract double Area();
}

class Cirkel : Form
{
    private double radie;

    public Cirkel(double radie)
    {
        this.radie = radie;
    }

    public override double Area()
    {
        return Math.PI * radie * radie;
    }
}`,explain:`En klass med en abstrakt metod måste vara abstract, och metoden som fyller i den måste ha override.`,hint:`Form saknar ett ord framför class, och Cirkels Area() saknar ett ord framför double.`}]},{id:`cs-interface`,title:`Interface`,tier:4,text:"Ett **interface** är ett kontrakt. `interface IBetalbar { int Pris(); }` säger bara att den som skriver under måste ha en metod Pris(). Det säger vad som ska finnas, inte hur det fungerar. Namnet börjar med I enligt konvention.\n\nKlasser som annars inte har något gemensamt kan implementera samma interface: `class Kaffe : IBetalbar` och `class Biljett : IBetalbar`. Metoderna skrivs som vanliga `public` metoder, utan override. Sedan kan en `List<IBetalbar>` hålla båda, och koden som räknar ihop priset bryr sig bara om kontraktet.\n\nSkillnaden mot en abstrakt klass: en klass kan bara ärva från en basklass men implementera många interface, till exempel `class Anka : ISimmare, IFlygare`. En abstrakt klass kan dela kod och fält, ett interface beskriver bara vad något kan göra. I riktiga projekt används interface hela tiden för att delar av programmet ska kunna bytas ut utan att resten märker det.",example:`// 1. Skapa köpen
List<IBetalbar> köp = new List<IBetalbar> { new Kaffe(), new Biljett() };
// 2. Summera priserna
int summa = 0;
foreach (IBetalbar b in köp)
{
    summa += b.Pris();
}
Console.WriteLine($"Att betala: {summa} kr");

// 3. Gränssnittet
interface IBetalbar
{
    int Pris();
}

// 4. Klasser som uppfyller det
class Kaffe : IBetalbar
{
    public int Pris()
    {
        return 35;
    }
}

class Biljett : IBetalbar
{
    public int Pris()
    {
        return 40;
    }
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`List<IFordon> fordon = new List<IFordon> { new Bil(), new Cykel(), new Bil() };
int hjul = 0;
foreach (IFordon f in fordon)
{
    hjul += f.AntalHjul();
}
Console.WriteLine(hjul);

interface IFordon
{
    int AntalHjul();
}

class Bil : IFordon
{
    public int AntalHjul() => 4;
}

class Cykel : IFordon
{
    public int AntalHjul() => 2;
}`,options:[`10`,`6`,`3`],answer:0,out:!0,explain:`Två bilar och en cykel: 4 + 2 + 4 = 10.`,why:{1:`Listan har två bilar, inte en.`,2:`Det är antalet fordon. Koden summerar hjulen.`}},{type:`choice`,prompt:`Hur många basklasser och hur många interface kan en klass i C# ärva från?`,options:[`En basklass men många interface`,`Hur många som helst av båda`,`En av varje`],answer:0,explain:`class Anka : Djur, ISimmare, IFlygare fungerar. Två basklasser efter kolonet fungerar inte.`,why:{1:`C# tillåter bara en basklass. Det är en av anledningarna till att interface finns.`,2:`Interface går det bra att ha flera av.`}},{type:`fill`,prompt:`Skapa interfacet och låt Lampa implementera det.`,code:`IStrömbrytare s = new Lampa();
s.Slå();
s.Slå();

___ IStrömbrytare
{
    void Slå();
}

class Lampa ___ IStrömbrytare
{
    private bool på = false;

    public void Slå()
    {
        på = !på;
        Console.WriteLine(på ? "Tänd" : "Släckt");
    }
}`,answers:[[`interface`],[`:`]],output:`Tänd
Släckt`,explain:`Ett interface skapas med ordet interface, och en klass implementerar det med kolon, precis som vid arv.`},{type:`code`,prompt:"Skriv klassen `Biljett : IBetalbar`. Konstruktorn tar antal zoner, priset är 20 kr per zon och beskrivningen är till exempel `Biljett 2 zoner`.",starter:`List<IBetalbar> köp = new List<IBetalbar> { new Kaffe(), new Biljett(2), new Kaffe() };
int summa = 0;
foreach (IBetalbar b in köp)
{
    Console.WriteLine($"{b.Beskrivning()}: {b.Pris()} kr");
    summa += b.Pris();
}
Console.WriteLine($"Att betala: {summa} kr");

interface IBetalbar
{
    string Beskrivning();
    int Pris();
}

class Kaffe : IBetalbar
{
    public string Beskrivning() => "Kaffe";
    public int Pris() => 35;
}

// Skriv klassen Biljett här
`,output:`Kaffe: 35 kr
Biljett 2 zoner: 40 kr
Kaffe: 35 kr
Att betala: 110 kr`,require:[n(`class\\s+Biljett\\s*:\\s*IBetalbar`,`Biljett ska implementera IBetalbar.`)],solution:`List<IBetalbar> köp = new List<IBetalbar> { new Kaffe(), new Biljett(2), new Kaffe() };
int summa = 0;
foreach (IBetalbar b in köp)
{
    Console.WriteLine($"{b.Beskrivning()}: {b.Pris()} kr");
    summa += b.Pris();
}
Console.WriteLine($"Att betala: {summa} kr");

interface IBetalbar
{
    string Beskrivning();
    int Pris();
}

class Kaffe : IBetalbar
{
    public string Beskrivning() => "Kaffe";
    public int Pris() => 35;
}

class Biljett : IBetalbar
{
    private int zoner;

    public Biljett(int zoner)
    {
        this.zoner = zoner;
    }

    public string Beskrivning() => $"Biljett {zoner} zoner";
    public int Pris() => zoner * 20;
}`,explain:`Biljett har ett eget fält och en egen konstruktor. Kassakoden behöver bara veta att den uppfyller kontraktet IBetalbar.`,hint:`Spara zoner i ett fält. Skriv public string Beskrivning() och public int Pris() precis som i Kaffe.`},{type:`code`,prompt:"Butiken har olika rabatter. Skriv `Procentrabatt` (tar en procentsats) och `Kronrabatt` (tar ett belopp) som implementerar `IRabatt`. Procentrabatten avrundas nedåt till heltal, och en kronrabatt får aldrig göra priset lägre än 0.",starter:`List<IRabatt> rabatter = new List<IRabatt> { new Procentrabatt(10), new Kronrabatt(50) };
int pris = 300;
foreach (IRabatt r in rabatter)
{
    pris = r.Applicera(pris);
    Console.WriteLine(pris);
}
Console.WriteLine(new Kronrabatt(100).Applicera(70));

interface IRabatt
{
    int Applicera(int pris);
}

// Skriv klasserna Procentrabatt och Kronrabatt här
`,output:`270
220
0`,require:[n(`class\\s+Procentrabatt\\s*:\\s*IRabatt`,`Procentrabatt ska implementera IRabatt.`),n(`class\\s+Kronrabatt\\s*:\\s*IRabatt`,`Kronrabatt ska implementera IRabatt.`)],solution:`List<IRabatt> rabatter = new List<IRabatt> { new Procentrabatt(10), new Kronrabatt(50) };
int pris = 300;
foreach (IRabatt r in rabatter)
{
    pris = r.Applicera(pris);
    Console.WriteLine(pris);
}
Console.WriteLine(new Kronrabatt(100).Applicera(70));

interface IRabatt
{
    int Applicera(int pris);
}

class Procentrabatt : IRabatt
{
    private int procent;

    public Procentrabatt(int procent)
    {
        this.procent = procent;
    }

    public int Applicera(int pris)
    {
        return pris - pris * procent / 100;
    }
}

class Kronrabatt : IRabatt
{
    private int belopp;

    public Kronrabatt(int belopp)
    {
        this.belopp = belopp;
    }

    public int Applicera(int pris)
    {
        return Math.Max(0, pris - belopp);
    }
}`,explain:`Varje rabatt är en egen liten klass. Vill butiken ha en ny sorts rabatt skriver man en ny klass, och loopen behöver inte ändras.`,hint:`Procent: pris - pris * procent / 100. Krona: Math.Max(0, pris - belopp).`},{type:`code`,prompt:"Låt `Anka` implementera både `ISimmare` och `IFlygare`, och `Pingvin` bara `ISimmare`. I loopen ska varje fågel simma, och de som också är `IFlygare` ska dessutom flyga. Använd `is` för att kolla det.",starter:`List<ISimmare> fåglar = new List<ISimmare> { new Anka(), new Pingvin() };
foreach (ISimmare f in fåglar)
{
    f.Simma();
    // Låt fågeln flyga om den är en IFlygare
}

interface ISimmare
{
    void Simma();
}

interface IFlygare
{
    void Flyg();
}

class Anka
{
}

class Pingvin
{
}
`,output:`Ankan simmar
Ankan flyger
Pingvinen simmar`,require:[n(`class\\s+Anka\\s*:\\s*ISimmare\\s*,\\s*IFlygare|class\\s+Anka\\s*:\\s*IFlygare\\s*,\\s*ISimmare`,`Anka ska implementera båda interfacen: class Anka : ISimmare, IFlygare.`),n(`\\bis\\s+IFlygare\\b`,`Kolla med is IFlygare.`)],solution:`List<ISimmare> fåglar = new List<ISimmare> { new Anka(), new Pingvin() };
foreach (ISimmare f in fåglar)
{
    f.Simma();
    if (f is IFlygare flygare)
    {
        flygare.Flyg();
    }
}

interface ISimmare
{
    void Simma();
}

interface IFlygare
{
    void Flyg();
}

class Anka : ISimmare, IFlygare
{
    public void Simma() => Console.WriteLine("Ankan simmar");
    public void Flyg() => Console.WriteLine("Ankan flyger");
}

class Pingvin : ISimmare
{
    public void Simma() => Console.WriteLine("Pingvinen simmar");
}`,explain:`Listan vet bara att alla kan simma. f is IFlygare flygare kollar om objektet också kan flyga och ger det samtidigt ett namn av typen IFlygare, så att du kan anropa Flyg().`,hint:`class Anka : ISimmare, IFlygare. I loopen: if (f is IFlygare flygare) och sedan flygare.Flyg();`}]}]},{id:`cs10`,title:`Dictionary och LINQ`,lessons:[{id:`cs-dict`,title:`Dictionary`,tier:3,text:'En `Dictionary<string, int>` kopplar **nycklar** till **värden**, som en ordlista eller en telefonkatalog. `priser["kaffe"] = 35;` sparar och `priser["kaffe"]` läser. Varje nyckel finns bara en gång.\n\n`Add` lägger till en ny nyckel men kastar ArgumentException om den redan finns. Indexeringen `d[nyckel] = värde` lägger till eller skriver över. Att läsa en nyckel som saknas ger KeyNotFoundException, så kolla först med `ContainsKey`, eller använd `TryGetValue` som kollar och hämtar i samma steg. `Remove` tar bort en nyckel.\n\nDictionary är perfekt för att räkna saker: för varje ord, öka räknaren för just det ordet. Med `foreach (KeyValuePair<string, int> par in d)` går du igenom alla par och läser `par.Key` och `par.Value`.',example:`// 1. Skapa och fyll lagret
Dictionary<string, int> lager = new Dictionary<string, int>();
lager.Add("äpple", 12);
lager["banan"] = 5;
lager["banan"] += 3;

// 2. Läs säkert med TryGetValue
if (lager.TryGetValue("päron", out int antal))
{
    Console.WriteLine($"Päron: {antal}");
}
else
{
    Console.WriteLine("Inga päron");
}

// 3. Gå igenom alla par
foreach (KeyValuePair<string, int> par in lager)
{
    Console.WriteLine($"{par.Key}: {par.Value}");
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Dictionary<string, int> lager = new Dictionary<string, int>();
lager["äpple"] = 5;
lager["äpple"] = 8;
Console.WriteLine(lager["äpple"] + " " + lager.Count);`,options:[`8 1`,`5 1`,`8 2`],answer:0,out:!0,explain:`Indexeringen skriver över det gamla värdet. Det finns fortfarande bara en nyckel.`,why:{1:`Den andra raden skriver över 5 med 8.`,2:`Samma nyckel kan bara finnas en gång, så Count är 1.`}},{type:`choice`,prompt:'Nyckeln "äpple" finns redan. Vad händer vid `lager.Add("äpple", 3);`?',options:[`Ett ArgumentException kastas`,`Värdet skrivs över med 3`,`3 läggs till på det gamla värdet`],answer:0,explain:`Add är till för nya nycklar. Vill du skriva över använder du lager["äpple"] = 3.`,why:{1:`Det är vad indexeringen lager["äpple"] = 3 gör. Add vägrar i stället.`,2:`Ingen av metoderna adderar automatiskt. Det får du göra själv med +=.`}},{type:`fill`,prompt:`Slå upp numret på ett säkert sätt, så att programmet inte kraschar när namnet saknas.`,code:`Dictionary<string, string> telefon = new Dictionary<string, string>
{
    ["Ada"] = "070-111",
    ["Bo"] = "070-222"
};
if (telefon.___("Cy", out string nummer))
{
    Console.WriteLine(nummer);
}
else
{
    Console.WriteLine("Okänd");
}`,answers:[[`TryGetValue`]],output:`Okänd`,explain:`TryGetValue returnerar false när nyckeln saknas, i stället för att kasta ett fel.`},{type:`code`,prompt:"Skriv `static Dictionary<string, int> RäknaOrd(List<string> ord)` som räknar hur många gånger varje ord förekommer.",starter:`static Dictionary<string, int> RäknaOrd(List<string> ord)
{
}
`,tests:[{fn:`RäknaOrd`,args:[[`hej`,`du`,`hej`]],expect:{hej:2,du:1}},{fn:`RäknaOrd`,args:[[`a`,`A`,`a`]],expect:{a:2,A:1},edge:`stora och små bokstäver räknas som olika ord`},{fn:`RäknaOrd`,args:[[]],expect:{},edge:`en tom lista ska ge en tom Dictionary`}],solution:`static Dictionary<string, int> RäknaOrd(List<string> ord)
{
    Dictionary<string, int> antal = new Dictionary<string, int>();
    foreach (string o in ord)
    {
        if (antal.ContainsKey(o))
        {
            antal[o]++;
        }
        else
        {
            antal[o] = 1;
        }
    }
    return antal;
}`,explain:`Första gången ett ord dyker upp finns det ingen nyckel att öka, därför behövs ContainsKey.`,hint:`Om ordet redan finns: öka med ++. Annars: sätt det till 1.`},{type:`code`,prompt:"Skriv `static int Kvitto(Dictionary<string, int> meny, List<string> beställning)` som returnerar totalpriset. Rätter som inte finns på menyn ska hoppas över.",starter:`static int Kvitto(Dictionary<string, int> meny, List<string> beställning)
{
}
`,tests:[{fn:`Kvitto`,args:[{kaffe:35,bulle:25},[`kaffe`,`bulle`,`kaffe`]],expect:95},{fn:`Kvitto`,args:[{kaffe:35},[`kaffe`,`pizza`]],expect:35,edge:`pizza finns inte på menyn`},{fn:`Kvitto`,args:[{kaffe:35},[]],expect:0,edge:`tom beställning`}],solution:`static int Kvitto(Dictionary<string, int> meny, List<string> beställning)
{
    int summa = 0;
    foreach (string rätt in beställning)
    {
        if (meny.TryGetValue(rätt, out int pris))
        {
            summa += pris;
        }
    }
    return summa;
}`,explain:`TryGetValue kollar och hämtar i samma steg, så en okänd rätt kraschar inte programmet.`,hint:`Loopa över beställningen och använd meny.TryGetValue(rätt, out int pris).`},{type:`code`,prompt:"Skriv `static Dictionary<string, int> RensaLager(Dictionary<string, int> lager)` som tar bort alla varor med 0 eller färre i lager och returnerar samma Dictionary. Tänk på att du inte får ta bort nycklar medan du loopar över samma Dictionary.",starter:`static Dictionary<string, int> RensaLager(Dictionary<string, int> lager)
{
    foreach (KeyValuePair<string, int> par in lager)
    {
        if (par.Value <= 0)
        {
            lager.Remove(par.Key);
        }
    }
    return lager;
}
`,tests:[{fn:`RensaLager`,args:[{mjölk:4,ost:0,bröd:2}],expect:{mjölk:4,bröd:2}},{fn:`RensaLager`,args:[{a:-1,b:0}],expect:{},edge:`allt ska bort, även negativt lager`},{fn:`RensaLager`,args:[{a:1}],expect:{a:1},edge:`inget att ta bort`}],require:[n(`\\.Remove\\s*\\(`,`Ta bort nycklarna med Remove.`)],solution:`static Dictionary<string, int> RensaLager(Dictionary<string, int> lager)
{
    List<string> slut = new List<string>();
    foreach (KeyValuePair<string, int> par in lager)
    {
        if (par.Value <= 0)
        {
            slut.Add(par.Key);
        }
    }
    foreach (string vara in slut)
    {
        lager.Remove(vara);
    }
    return lager;
}`,explain:`Först samlar du nycklarna som ska bort i en egen lista, sedan tar du bort dem i en andra loop. Då ändras inte samlingen medan den loopas.`,hint:`Spara nycklarna i en List<string> i första loopen, och anropa Remove i en andra loop över den listan.`}]},{id:`cs-lambda`,title:`Lambdas`,tier:4,text:'En **lambda** är en liten metod utan namn som du skriver direkt där den behövs. `x => x * 2` betyder "ta x och ge tillbaka x gånger 2". Till vänster om pilen står parametern, till höger det som returneras.\n\nMånga List-metoder tar en lambda som säger vad de ska leta efter. `Find` ger första träffen, `FindAll` ger en lista med alla träffar, `Exists` svarar true eller false och `RemoveAll` tar bort alla som matchar och returnerar hur många det var. `Sort((a, b) => a.Length.CompareTo(b.Length))` sorterar efter det du väljer.\n\nDu behöver inte ge lambdan något namn eller skriva ut några typer. C# räknar ut att x är en int när listan innehåller int. Villkoret står precis där det används, och det gör koden kort och lätt att läsa. Hittar `Find` ingenting får du standardvärdet: 0 för tal och null för text.',example:`// 1. Skapa listan
List<int> tal = new List<int> { 4, 15, 8, 23, 16 };
// 2. Sök med lambdauttryck
Console.WriteLine(tal.Find(t => t > 10));
Console.WriteLine(string.Join(", ", tal.FindAll(t => t % 2 == 0)));
Console.WriteLine(tal.Exists(t => t > 100));
// 3. Sortera fallande
tal.Sort((a, b) => b.CompareTo(a));
Console.WriteLine(string.Join(", ", tal));`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`List<int> tal = new List<int> { 4, 9, 12, 7 };
Console.WriteLine(tal.Find(t => t > 8));`,options:[`9`,`12`,`9, 12`],answer:0,out:!0,explain:`Find ger den första som uppfyller villkoret, och 9 kommer före 12.`,why:{1:`12 matchar också, men Find stannar vid första träffen.`,2:`Det skulle FindAll ge. Find returnerar bara ett element.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`List<string> djur = new List<string> { "katt", "ko", "kanin", "gnu" };
int borta = djur.RemoveAll(d => d.Length < 3);
Console.WriteLine($"{borta} {string.Join(",", djur)}");`,options:[`1 katt,kanin,gnu`,`2 katt,kanin`,`1 ko`],answer:0,out:!0,explain:`Bara "ko" är kortare än 3 tecken. RemoveAll returnerar antalet borttagna, och listan ändras på plats.`,why:{1:`"gnu" har 3 tecken, och 3 < 3 är falskt.`,2:`RemoveAll returnerar antalet, och listan innehåller det som blev kvar, inte det som togs bort.`}},{type:`code`,prompt:"Skriv `static List<string> LångaOrd(List<string> ord, int min)` som returnerar alla ord med minst `min` tecken. Använd `FindAll` med en lambda.",starter:`static List<string> LångaOrd(List<string> ord, int min)
{
}
`,tests:[{fn:`LångaOrd`,args:[[`sol`,`regnbåge`,`is`,`snö`],3],expect:[`sol`,`regnbåge`,`snö`]},{fn:`LångaOrd`,args:[[`a`,`bb`],5],expect:[],edge:`inga ord är tillräckligt långa`},{fn:`LångaOrd`,args:[[],1],expect:[],edge:`tom lista`}],require:[n(`FindAll\\s*\\(`,`Använd FindAll.`),n(`=>`,`Skicka in villkoret som en lambda med =>.`)],solution:`static List<string> LångaOrd(List<string> ord, int min)
{
    return ord.FindAll(o => o.Length >= min);
}`,explain:`Lambdan kan använda parametern min, fast den inte är en av lambdans egna parametrar.`,hint:`return ord.FindAll(o => o.Length >= min);`},{type:`code`,prompt:"En sensor ger ibland trasiga värden. Skriv `static int RensaMätningar(List<int> mätningar)` som tar bort alla värden under 0 eller över 100 ur listan och returnerar hur många som togs bort.",starter:`static int RensaMätningar(List<int> mätningar)
{
    return 0;
}
`,tests:[{fn:`RensaMätningar`,args:[[20,-5,101,50]],expect:2},{fn:`RensaMätningar`,args:[[0,100]],expect:0,edge:`0 och 100 är giltiga`},{fn:`RensaMätningar`,args:[[]],expect:0,edge:`tom lista`}],require:[n(`RemoveAll\\s*\\(`,`Använd RemoveAll.`)],solution:`static int RensaMätningar(List<int> mätningar)
{
    return mätningar.RemoveAll(m => m < 0 || m > 100);
}`,explain:`RemoveAll gör både jobbet och räkningen. Med || räcker det att ett av villkoren stämmer.`,hint:`return mätningar.RemoveAll(m => m < 0 || m > 100);`},{type:`code`,prompt:'Skriv `static string FörstaMed(List<string> namn, string början)` som returnerar första namnet som börjar på `början`, eller `"ingen"` om inget gör det. Använd `Find`.',starter:`static string FörstaMed(List<string> namn, string början)
{
    return namn.Find(n => n.StartsWith(början));
}
`,tests:[{fn:`FörstaMed`,args:[[`Ada`,`Bo`,`Bea`],`B`],expect:`Bo`},{fn:`FörstaMed`,args:[[`Ada`,`Bo`],`X`],expect:`ingen`,edge:`ingen träff, då ger Find null`},{fn:`FörstaMed`,args:[[],`A`],expect:`ingen`,edge:`tom lista`}],require:[n(`Find\\s*\\(`,`Använd Find.`)],solution:`static string FörstaMed(List<string> namn, string början)
{
    string träff = namn.Find(n => n.StartsWith(början));
    if (träff == null)
    {
        return "ingen";
    }
    return träff;
}`,explain:`Find ger null när inget matchar. Att kolla null innan du använder värdet är något riktiga utvecklare gör hela tiden.`,hint:`Spara resultatet av Find i en variabel och kolla om den är null.`},{type:`code`,prompt:"Skriv `static List<string> EfterLängd(List<string> ord)` som sorterar listan med kortast ord först. Ord med samma längd ska komma i bokstavsordning. Använd `Sort` med en lambda och returnera listan.",starter:`static List<string> EfterLängd(List<string> ord)
{
    ord.Sort();
    return ord;
}
`,tests:[{fn:`EfterLängd`,args:[[`banan`,`fikon`,`kiwi`,`ananas`]],expect:[`kiwi`,`banan`,`fikon`,`ananas`]},{fn:`EfterLängd`,args:[[`ccc`,`bb`,`aa`]],expect:[`aa`,`bb`,`ccc`],edge:`lika långa ord i bokstavsordning`},{fn:`EfterLängd`,args:[[]],expect:[],edge:`tom lista`}],require:[n(`Sort\\s*\\(\\s*\\(`,`Skicka en lambda med två parametrar till Sort: Sort((a, b) => ...).`)],solution:`static List<string> EfterLängd(List<string> ord)
{
    ord.Sort((a, b) =>
    {
        if (a.Length != b.Length)
        {
            return a.Length.CompareTo(b.Length);
        }
        return a.CompareTo(b);
    });
    return ord;
}`,explain:`CompareTo ger ett negativt tal om a ska före b, 0 om de är lika och ett positivt tal annars. Vid samma längd får texten avgöra.`,hint:`Jämför a.Length med b.Length. Om de är lika, returnera a.CompareTo(b). En lambda kan ha en hel kropp med { }.`}]},{id:`cs-linq`,title:`LINQ: filtrera och omvandla`,tier:4,text:"**LINQ** är en samling metoder som fungerar på alla listor och arrayer. `Where` behåller de element som uppfyller ett villkor och `Select` gör om varje element till något annat. De går att kedja: `tal.Where(x => x > 0).Select(x => x * 2)`.\n\nResultatet av Where och Select är ingen lista ännu, utan en beskrivning av hur värdena ska tas fram. Lägg till `.ToList()` sist när du behöver en riktig List, till exempel för att returnera den, spara den eller lägga till fler element. Tumregeln: avsluta med ToList() när resultatet ska sparas.\n\n`Count(x => ...)` räknar hur många som uppfyller ett villkor, `Any` svarar om minst ett gör det och `All` om alla gör det. Observera att `All` på en tom lista ger true, eftersom inget element bryter mot villkoret. LINQ ersätter många loopar du annars hade skrivit för hand, och så skriver de flesta C#-utvecklare den här sortens kod.",example:`// 1. Skapa listan
List<int> tal = new List<int> { 3, -1, 8, 0, 5 };
// 2. Filtrera och omvandla
List<int> dubblade = tal.Where(t => t > 0).Select(t => t * 2).ToList();
Console.WriteLine(string.Join(", ", dubblade));
// 3. Räkna och testa
Console.WriteLine(tal.Count(t => t > 4));
Console.WriteLine(tal.Any(t => t < 0));
Console.WriteLine(tal.All(t => t < 10));`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int[] tal = { 1, 2, 3, 4, 5, 6 };
Console.WriteLine(string.Join(" ", tal.Where(t => t % 2 == 0).Select(t => t * 10)));`,options:[`20 40 60`,`10 30 50`,`10 20 30 40 50 60`],answer:0,out:!0,explain:`Where behåller 2, 4 och 6. Select gångrar sedan varje tal med 10.`,why:{1:`t % 2 == 0 är sant för jämna tal, så det är de som blir kvar.`,2:`Where tar bort de udda talen innan Select körs.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`List<int> tom = new List<int>();
Console.WriteLine($"{tom.Any(t => t > 0)} {tom.All(t => t > 0)}");`,options:[`False True`,`False False`,`True True`],answer:0,out:!0,explain:`Any behöver minst ett element som matchar, så den blir False. All letar efter något som bryter mot villkoret, och hittar inget, så den blir True.`,why:{1:`All på en tom lista är True. Det finns inget element som bryter mot villkoret.`,2:`Any på en tom lista är alltid False, det finns ju inget att hitta.`}},{type:`fill`,prompt:`Räkna hur många som fick minst 50 poäng.`,code:`List<int> poäng = new List<int> { 45, 50, 72, 38, 90 };
int godkända = poäng.___(p => p >= 50);
Console.WriteLine(godkända);`,answers:[[`Count`]],output:`3`,explain:`Count med en lambda räknar bara de element som uppfyller villkoret.`},{type:`code`,prompt:"Skriv `static List<int> PositivaKvadrater(List<int> tal)` som returnerar kvadraten av varje positivt tal. Använd `Where`, `Select` och `ToList`, utan loop.",starter:`static List<int> PositivaKvadrater(List<int> tal)
{
}
`,tests:[{fn:`PositivaKvadrater`,args:[[3,-2,0,5]],expect:[9,25]},{fn:`PositivaKvadrater`,args:[[-4,2]],expect:[4],edge:`negativa tal ska bort, fast kvadraten blir positiv`},{fn:`PositivaKvadrater`,args:[[0,1]],expect:[1],edge:`0 är inte positivt`}],require:[n(`\\.Where\\s*\\(`,`Använd Where.`),n(`\\.Select\\s*\\(`,`Använd Select.`),n(`\\.ToList\\s*\\(`,`Avsluta med ToList().`)],forbid:[n(`\\bfor(each)?\\s*\\(`,`Lös den med LINQ, utan loop.`)],solution:`static List<int> PositivaKvadrater(List<int> tal)
{
    return tal.Where(t => t > 0).Select(t => t * t).ToList();
}`,explain:`Filtrera först och omvandla sedan. 0 räknas inte som positivt.`,hint:`tal.Where(t => t > 0).Select(t => t * t).ToList()`},{type:`code`,prompt:"Skriv `static List<string> Mejladresser(List<string> namn)` som gör om varje namn till en mejladress: små bokstäver, utan mellanslag runt omkring, och `@firma.se` på slutet. Tomma namn eller namn med bara mellanslag ska hoppas över.",starter:`static List<string> Mejladresser(List<string> namn)
{
    return namn.Select(n => n + "@firma.se").ToList();
}
`,tests:[{fn:`Mejladresser`,args:[[`Ada`,` Bo `]],expect:[`ada@firma.se`,`bo@firma.se`]},{fn:`Mejladresser`,args:[[``,`Cy`,`   `]],expect:[`cy@firma.se`],edge:`tomma namn ska hoppas över`},{fn:`Mejladresser`,args:[[`EVA`]],expect:[`eva@firma.se`],edge:`stora bokstäver ska bli små`}],require:[n(`\\.Where\\s*\\(`,`Filtrera bort tomma namn med Where.`)],solution:`static List<string> Mejladresser(List<string> namn)
{
    return namn
        .Where(n => n.Trim() != "")
        .Select(n => n.Trim().ToLower() + "@firma.se")
        .ToList();
}`,explain:`En lång kedja blir lättare att läsa om varje steg står på en egen rad.`,hint:`Lägg till .Where(n => n.Trim() != "") före Select, och använd Trim() och ToLower() i Select.`},{type:`code`,prompt:"Skriv `static bool GiltigaKoder(List<string> koder)` som returnerar true om varje kod är exakt 4 tecken lång och bara innehåller siffror. En tom lista räknas som giltig.",starter:`static bool GiltigaKoder(List<string> koder)
{
    return koder.Any(k => k.Length == 4);
}
`,tests:[{fn:`GiltigaKoder`,args:[[`1234`,`0000`]],expect:!0},{fn:`GiltigaKoder`,args:[[`1234`,`12a4`]],expect:!1,edge:`en kod innehåller en bokstav`},{fn:`GiltigaKoder`,args:[[`1234`,`123`]],expect:!1,edge:`en kod är för kort`},{fn:`GiltigaKoder`,args:[[]],expect:!0,edge:`tom lista`}],require:[n(`\\.All\\s*\\(`,`Använd All.`)],solution:`static bool GiltigaKoder(List<string> koder)
{
    return koder.All(k => k.Length == 4 && k.All(c => char.IsDigit(c)));
}`,explain:`En sträng är en följd av tecken, så All fungerar på den också. Den yttre All kollar varje kod, den inre varje tecken i koden.`,hint:`koder.All(k => k.Length == 4 && k.All(c => char.IsDigit(c)))`}]},{id:`cs-linq-sort`,title:`LINQ: sortera och räkna`,tier:4,text:"`OrderBy(x => x)` sorterar stigande och `OrderByDescending` fallande. Med lambdan väljer du vad som jämförs, till exempel `varor.OrderBy(v => v.Pris)`. Om två värden är lika kan du lägga till `ThenBy` för en andra sorteringsnyckel. Till skillnad från `List.Sort` ändrar LINQ inte originalet, du får en ny sekvens.\n\n`Sum`, `Average`, `Max` och `Min` kan ta en lambda som väljer vilket värde som ska räknas: `varor.Sum(v => v.Pris)`. `First` ger första elementet och kastar InvalidOperationException om det inte finns något. `FirstOrDefault` ger i stället standardvärdet, 0 för tal och null för objekt. Average, Max och Min kastar också fel på en tom samling, så kolla med `Any()` först.\n\n`Take(3)` tar de tre första, `Skip(3)` hoppar över tre och `Distinct()` tar bort dubbletter. Tillsammans blir det kraftfullt: en topplista är bara `OrderByDescending(...).Take(3)`. I riktiga program används LINQ mest på listor av objekt.",example:`// 1. Skapa varorna
List<Vara> varor = new List<Vara>
{
    new Vara { Namn = "Ost", Pris = 55 },
    new Vara { Namn = "Mjölk", Pris = 15 },
    new Vara { Namn = "Bröd", Pris = 30 }
};
// 2. Sortera efter pris
foreach (Vara v in varor.OrderBy(v => v.Pris))
{
    Console.WriteLine($"{v.Namn}: {v.Pris} kr");
}
// 3. Summa och största värde
Console.WriteLine($"Summa: {varor.Sum(v => v.Pris)} kr");
Console.WriteLine($"Dyrast: {varor.Max(v => v.Pris)} kr");

// 4. Klassen för en vara
class Vara
{
    public string Namn { get; set; }
    public int Pris { get; set; }
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int[] tal = { 5, 1, 4, 1, 3, 5 };
Console.WriteLine(string.Join(",", tal.Distinct().OrderByDescending(t => t).Take(3)));`,options:[`5,4,3`,`5,5,4`,`1,3,4`],answer:0,out:!0,explain:`Distinct tar bort dubbletterna, sedan sorteras det största först och de tre första tas.`,why:{1:`Distinct körs först, så det finns bara en femma kvar.`,2:`OrderByDescending sorterar störst först, inte minst först.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`List<int> tal = new List<int> { 3, 5 };
Console.WriteLine(tal.FirstOrDefault(t => t > 10));`,options:[`0`,`3`,`null`],answer:0,out:!0,explain:`Inget tal är större än 10, så FirstOrDefault ger standardvärdet för int, som är 0. First hade kastat ett fel här.`,why:{1:`3 matchar inte villkoret t > 10.`,2:`En int kan inte vara null. Standardvärdet för tal är 0.`}},{type:`code`,prompt:"Skriv `static List<int> Topp3(List<int> poäng)` som returnerar de tre högsta poängen, högst först. Finns det färre än tre returneras alla.",starter:`static List<int> Topp3(List<int> poäng)
{
    return poäng.Take(3).ToList();
}
`,tests:[{fn:`Topp3`,args:[[40,95,70,88,12]],expect:[95,88,70]},{fn:`Topp3`,args:[[50,90,90,10]],expect:[90,90,50],edge:`lika poäng ska båda vara med`},{fn:`Topp3`,args:[[7]],expect:[7],edge:`färre än tre poäng`},{fn:`Topp3`,args:[[]],expect:[],edge:`tom lista`}],require:[n(`OrderByDescending\\s*\\(`,`Sortera med OrderByDescending.`)],solution:`static List<int> Topp3(List<int> poäng)
{
    return poäng.OrderByDescending(p => p).Take(3).ToList();
}`,explain:`Take kraschar inte om det finns färre element än du ber om, den tar bara de som finns.`,hint:`Sortera med OrderByDescending(p => p) före Take(3).`},{type:`code`,prompt:"I en tävling stryks det sämsta resultatet. Skriv `static double SnittUtanSämsta(List<int> poäng)` som tar bort ett av de lägsta värdena och returnerar medelvärdet av resten. Har listan färre än två värden ska metoden returnera 0.",starter:`static double SnittUtanSämsta(List<int> poäng)
{
    return poäng.Average();
}
`,tests:[{fn:`SnittUtanSämsta`,args:[[6,2,8,7]],expect:7},{fn:`SnittUtanSämsta`,args:[[5,5,9]],expect:7,edge:`bara en av femmorna ska strykas`},{fn:`SnittUtanSämsta`,args:[[4]],expect:0,edge:`bara ett värde`},{fn:`SnittUtanSämsta`,args:[[]],expect:0,edge:`tom lista, Average skulle krascha`}],require:[n(`\\.Skip\\s*\\(`,`Använd Skip(1) för att hoppa över det lägsta.`)],solution:`static double SnittUtanSämsta(List<int> poäng)
{
    if (poäng.Count < 2)
    {
        return 0;
    }
    return poäng.OrderBy(p => p).Skip(1).Average();
}`,explain:`Efter sorteringen ligger det lägsta först, och Skip(1) hoppar över exakt ett element även om flera är lika låga.`,hint:`Kolla Count < 2 först. Sedan poäng.OrderBy(p => p).Skip(1).Average().`},{type:`code`,prompt:`Skriv ut varorna sorterade efter kategori och, inom samma kategori, billigast först. Skriv sedan summan och namnet på den dyraste varan. Använd LINQ.`,starter:`List<Vara> varor = new List<Vara>
{
    new Vara { Namn = "Ost", Pris = 55, Kategori = "Mejeri" },
    new Vara { Namn = "Äpple", Pris = 15, Kategori = "Frukt" },
    new Vara { Namn = "Mjölk", Pris = 15, Kategori = "Mejeri" },
    new Vara { Namn = "Banan", Pris = 12, Kategori = "Frukt" }
};

// Skriv din kod här

class Vara
{
    public string Namn { get; set; }
    public int Pris { get; set; }
    public string Kategori { get; set; }
}
`,output:`Frukt: Banan 12 kr
Frukt: Äpple 15 kr
Mejeri: Mjölk 15 kr
Mejeri: Ost 55 kr
Summa: 97 kr
Dyrast: Ost`,require:[n(`\\.OrderBy\\s*\\(`,`Sortera med OrderBy.`),n(`\\.ThenBy\\s*\\(`,`Använd ThenBy för priset.`),n(`\\.Sum\\s*\\(`,`Räkna summan med Sum.`)],solution:`List<Vara> varor = new List<Vara>
{
    new Vara { Namn = "Ost", Pris = 55, Kategori = "Mejeri" },
    new Vara { Namn = "Äpple", Pris = 15, Kategori = "Frukt" },
    new Vara { Namn = "Mjölk", Pris = 15, Kategori = "Mejeri" },
    new Vara { Namn = "Banan", Pris = 12, Kategori = "Frukt" }
};

foreach (Vara v in varor.OrderBy(v => v.Kategori).ThenBy(v => v.Pris))
{
    Console.WriteLine($"{v.Kategori}: {v.Namn} {v.Pris} kr");
}
Console.WriteLine($"Summa: {varor.Sum(v => v.Pris)} kr");
Vara dyrast = varor.OrderByDescending(v => v.Pris).First();
Console.WriteLine($"Dyrast: {dyrast.Namn}");

class Vara
{
    public string Namn { get; set; }
    public int Pris { get; set; }
    public string Kategori { get; set; }
}`,explain:`Max(v => v.Pris) ger bara talet 55. För att få hela varan sorterar du fallande och tar First().`,hint:`varor.OrderBy(v => v.Kategori).ThenBy(v => v.Pris) i en foreach. För den dyraste: OrderByDescending(v => v.Pris).First().`},{type:`code`,prompt:'Gör en topplista. Skriv ut de tre bästa som `1. Ada 92` och så vidare (vid lika poäng i bokstavsordning). Skriv sedan `Övriga: ` följt av resten av namnen i samma ordning, separerade med `, `. Sök till sist efter en elev som heter "Eva" med `FirstOrDefault` och skriv `Eva: 81` om hon finns, annars `Eva finns inte`.',starter:`List<Elev> elever = new List<Elev>
{
    new Elev { Namn = "Bo", Poäng = 75 },
    new Elev { Namn = "Ada", Poäng = 92 },
    new Elev { Namn = "Dan", Poäng = 60 },
    new Elev { Namn = "Cy", Poäng = 92 },
    new Elev { Namn = "Fia", Poäng = 81 }
};

// Skriv din kod här

class Elev
{
    public string Namn { get; set; }
    public int Poäng { get; set; }
}
`,output:`1. Ada 92
2. Cy 92
3. Fia 81
Övriga: Bo, Dan
Eva finns inte`,require:[n(`\\.Take\\s*\\(`,`Använd Take för de tre bästa.`),n(`\\.Skip\\s*\\(`,`Använd Skip för resten.`),n(`FirstOrDefault\\s*\\(`,`Sök med FirstOrDefault.`)],solution:`List<Elev> elever = new List<Elev>
{
    new Elev { Namn = "Bo", Poäng = 75 },
    new Elev { Namn = "Ada", Poäng = 92 },
    new Elev { Namn = "Dan", Poäng = 60 },
    new Elev { Namn = "Cy", Poäng = 92 },
    new Elev { Namn = "Fia", Poäng = 81 }
};

List<Elev> sorterade = elever.OrderByDescending(e => e.Poäng).ThenBy(e => e.Namn).ToList();
int plats = 1;
foreach (Elev e in sorterade.Take(3))
{
    Console.WriteLine($"{plats}. {e.Namn} {e.Poäng}");
    plats++;
}
Console.WriteLine("Övriga: " + string.Join(", ", sorterade.Skip(3).Select(e => e.Namn)));

Elev eva = elever.FirstOrDefault(e => e.Namn == "Eva");
if (eva == null)
{
    Console.WriteLine("Eva finns inte");
}
else
{
    Console.WriteLine($"Eva: {eva.Poäng}");
}

class Elev
{
    public string Namn { get; set; }
    public int Poäng { get; set; }
}`,explain:`Sortera en gång och spara listan, sedan ger Take och Skip de två delarna. FirstOrDefault ger null för objekt som inte finns, så kolla det innan du läser eva.Poäng.`,hint:`OrderByDescending(e => e.Poäng).ThenBy(e => e.Namn).ToList(). Använd Take(3), Skip(3) och Select(e => e.Namn).`}]}]},{id:`cs11`,title:`Algoritmer`,lessons:[{id:`cs-switch`,title:`switch och tillståndsmaskiner`,tier:4,text:"När ett värde kan ha många olika lägen blir långa kedjor av if och else if svåra att läsa. En **switch**-sats jämför ett värde mot flera `case`, och `default` tar hand om allt annat. Varje case måste avslutas med `break`, `return` eller `throw`. Flera case kan staplas på varandra om de ska göra samma sak.\n\nEn **tillståndsmaskin** är ett program som befinner sig i ett läge i taget, till exempel ett trafikljus eller en kaffeautomat. En switch på det nuvarande läget avgör vad som händer härnäst. Mönstret finns överallt i riktig kod: spel, beställningsflöden och betalningar.",example:`// 1. Startläge
string läge = "Röd";
// 2. Upprepa fyra gånger
for (int i = 0; i < 4; i++)
{
    Console.WriteLine(läge);
    // 3. Välj nästa läge
    switch (läge)
    {
        case "Röd":
            läge = "Grön";
            break;
        case "Grön":
            läge = "Gul";
            break;
        case "Gul":
            läge = "Röd";
            break;
    }
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int dag = 6;
switch (dag)
{
    case 6:
    case 7:
        Console.WriteLine("Helg");
        break;
    default:
        Console.WriteLine("Vardag");
        break;
}
Console.WriteLine("Klart");`,options:[`Helg
Klart`,`Vardag
Klart`,`Helg
Vardag
Klart`],answer:0,out:!0,explain:`case 6 och case 7 är staplade, så båda kör samma kod. break hoppar sedan ut ur hela switchen.`,why:{1:`case 6 matchar, eftersom 6 och 7 delar samma kod.`,2:`C# faller aldrig vidare till nästa case. break hoppar ut ur hela switchen.`}},{type:`choice`,prompt:`Vad händer om ett case i C# innehåller kod men saknar break, return och throw?`,options:[`Koden kompilerar inte`,`Programmet fortsätter in i nästa case`,`Det caset hoppas över`],answer:0,explain:`C# kräver att varje case avslutas tydligt. Det stoppar en klassisk bugg där man av misstag kör flera case.`,why:{1:`Så fungerar det i C och Java, men C# tillåter det inte för att undvika svåra buggar.`,2:`Caset körs om det matchar. Problemet är att det inte avslutas.`}},{type:`code`,prompt:"Skriv `static int DagarIMånad(int månad)` som returnerar antal dagar i månaden (februari räknas som 28). Ett ogiltigt månadsnummer ska ge -1. Använd en switch med staplade case.",starter:`static int DagarIMånad(int månad)
{
}
`,tests:[{fn:`DagarIMånad`,args:[1],expect:31},{fn:`DagarIMånad`,args:[4],expect:30},{fn:`DagarIMånad`,args:[2],expect:28},{fn:`DagarIMånad`,args:[12],expect:31},{fn:`DagarIMånad`,args:[13],expect:-1,edge:`månad 13 finns inte`},{fn:`DagarIMånad`,args:[0],expect:-1,edge:`månad 0 finns inte`}],require:[n(`\\bswitch\\s*\\(`,`Använd en switch-sats.`)],solution:`static int DagarIMånad(int månad)
{
    switch (månad)
    {
        case 2:
            return 28;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        default:
            return -1;
    }
}`,explain:`Staplade case låter flera värden dela samma return. default fångar allt som inte är en riktig månad.`,hint:`Lägg case 4, 6, 9 och 11 direkt under varandra före return 30. Glöm inte default.`},{type:`debug`,prompt:"Ett svenskt trafikljus går Röd, RödGul, Grön, Gul och sedan Röd igen. Ett okänt läge, till exempel efter ett strömavbrott, ska ge `Fel` så att ljuset kan larma. Metoden har två fel. Rätta dem.",starter:`static string Nästa(string läge)
{
    switch (läge)
    {
        case "Röd":
            return "RödGul";
        case "RödGul":
            return "Grön";
        case "Grön":
            return "Gul";
        case "Gul":
            return "Grön";
        default:
            return "Röd";
    }
}`,tests:[{fn:`Nästa`,args:[`Röd`],expect:`RödGul`},{fn:`Nästa`,args:[`Grön`],expect:`Gul`},{fn:`Nästa`,args:[`Gul`],expect:`Röd`},{fn:`Nästa`,args:[`Blå`],expect:`Fel`,edge:`okänt läge`},{fn:`Nästa`,args:[``],expect:`Fel`,edge:`tom text`}],solution:`static string Nästa(string läge)
{
    switch (läge)
    {
        case "Röd":
            return "RödGul";
        case "RödGul":
            return "Grön";
        case "Grön":
            return "Gul";
        case "Gul":
            return "Röd";
        default:
            return "Fel";
    }
}`,explain:`Varje case beskriver en övergång i tillståndsmaskinen. default ska inte låtsas att allt är normalt, utan säga ifrån.`,hint:`Följ ordningen i uppgiften och jämför med varje case. Vad ska default returnera?`},{type:`code`,prompt:"Skriv tillståndsmaskinen för en dryckesautomat: `static int Automat(string[] händelser)`. Automaten startar i läget `Väntar`. I `Väntar` gör händelsen `mynt` att den går till `Betald`, allt annat ignoreras. I `Betald` ger `knapp` en dryck och automaten går tillbaka till `Väntar`, `avbryt` går tillbaka till `Väntar` utan dryck, och allt annat ignoreras. Returnera hur många drycker som levererades.",starter:`static int Automat(string[] händelser)
{
    string läge = "Väntar";
    int drycker = 0;
    foreach (string h in händelser)
    {
        // Avgör vad som händer utifrån läge och h
    }
    return drycker;
}`,tests:[{fn:`Automat`,args:[[`mynt`,`knapp`]],expect:1},{fn:`Automat`,args:[[`mynt`,`knapp`,`mynt`,`knapp`]],expect:2},{fn:`Automat`,args:[[`knapp`,`mynt`,`mynt`,`knapp`,`knapp`]],expect:1,edge:`knapp utan betalning och extra mynt`},{fn:`Automat`,args:[[`mynt`,`avbryt`,`knapp`]],expect:0,edge:`avbrutet köp`},{fn:`Automat`,args:[[`mynt`,`hej`,`knapp`]],expect:1,edge:`okänd händelse`},{fn:`Automat`,args:[[]],expect:0,edge:`inga händelser`}],require:[n(`\\bswitch\\s*\\(\\s*läge\\s*\\)`,`Använd switch (läge) för att välja vad som händer.`)],solution:`static int Automat(string[] händelser)
{
    string läge = "Väntar";
    int drycker = 0;
    foreach (string h in händelser)
    {
        switch (läge)
        {
            case "Väntar":
                if (h == "mynt")
                {
                    läge = "Betald";
                }
                break;
            case "Betald":
                if (h == "knapp")
                {
                    drycker++;
                    läge = "Väntar";
                }
                else if (h == "avbryt")
                {
                    läge = "Väntar";
                }
                break;
        }
    }
    return drycker;
}`,explain:`Samma händelse betyder olika saker i olika lägen. Därför väljer switchen först läge och sedan avgör händelsen vad som händer. Allt som inte nämns lämnar läget orört.`,hint:`Gör switch (läge) med case "Väntar" och case "Betald". Inne i varje case kollar du h med if.`}]},{id:`cs-search`,title:`Sökning: linjär och binär`,tier:4,text:`Att leta efter något är en av de vanligaste sakerna ett program gör. **Linjär sökning** går igenom elementen ett i taget från början. Den fungerar på alla arrayer, men i värsta fall måste den titta på varenda element: en miljon tal kan kräva en miljon jämförelser.

Om arrayen är **sorterad** finns ett mycket snabbare sätt. **Binärsökning** tittar i mitten. Är målet större letar du vidare i högra halvan, annars i vänstra. Varje steg halverar sökområdet, så en miljon tal kräver högst cirka 20 jämförelser. Utan sortering vet du inte vilken halva du ska välja.

I riktig kod finns färdiga metoder som \`Array.BinarySearch\`, men att skriva sökningen själv är en klassisk intervjufråga som tränar dig att tänka i gränser och index.`,example:`// 1. Sorterad data och mål
int[] tal = {2, 4, 7, 10, 15, 21, 30};
int mål = 21;
// 2. Sök i hela arrayen
int lo = 0;
int hi = tal.Length - 1;
// 3. Halvera tills målet hittas
while (lo <= hi)
{
    int mitt = (lo + hi) / 2;
    Console.WriteLine($"Tittar på index {mitt}: {tal[mitt]}");
    if (tal[mitt] == mål)
    {
        Console.WriteLine("Hittad!");
        break;
    }
    if (tal[mitt] < mål)
    {
        lo = mitt + 1;
    }
    else
    {
        hi = mitt - 1;
    }
}`,exercises:[{type:`choice`,prompt:`Du söker efter ett tal som saknas i en sorterad array med 1 000 tal. Ungefär hur många jämförelser gör binärsökning, och hur många gör linjär sökning?`,options:[`Cirka 10 och 1 000`,`Cirka 500 och 1 000`,`Cirka 10 och 10`],answer:0,explain:`Binärsökning halverar området varje gång, och 2 upphöjt till 10 är 1 024. Linjär sökning måste titta på alla 1 000 innan den vet att talet saknas.`,why:{1:`Binärsökning halverar området i varje steg, så det går mycket snabbare än att titta på hälften.`,2:`Linjär sökning måste titta på varje element för att vara säker på att talet saknas.`}},{type:`code`,prompt:"Skriv `static int LinjärSök(string[] namn, string mål)` som returnerar index för det första namnet som är lika med `mål` om man bortser från stora och små bokstäver. Saknas det, returnera -1. Skriv loopen själv.",starter:`static int LinjärSök(string[] namn, string mål)
{
}
`,tests:[{fn:`LinjärSök`,args:[[`Ada`,`Linus`,`Grace`],`linus`],expect:1},{fn:`LinjärSök`,args:[[`Ada`,`ada`],`ADA`],expect:0,edge:`flera träffar: den första vinner`},{fn:`LinjärSök`,args:[[`Ada`,`Linus`],`Bo`],expect:-1,edge:`saknas`},{fn:`LinjärSök`,args:[[],`Ada`],expect:-1,edge:`tom array`}],forbid:[n(`IndexOf|FindIndex|Array\\.|\\.Contains\\s*\\(`,`Skriv sökningen själv med en loop.`)],solution:`static int LinjärSök(string[] namn, string mål)
{
    for (int i = 0; i < namn.Length; i++)
    {
        if (namn[i].ToLower() == mål.ToLower())
        {
            return i;
        }
    }
    return -1;
}`,explain:`return inne i loopen avbryter direkt vid första träffen. Kommer loopen till slutet utan träff finns namnet inte.`,hint:`Loopa med index och jämför namn[i].ToLower() med mål.ToLower().`},{type:`code`,prompt:"Skriv `static int BinärSök(int[] tal, int mål)` som returnerar index för `mål` i den sorterade arrayen, eller -1 om det saknas. Använd en while-loop som halverar sökområdet.",starter:`static int BinärSök(int[] tal, int mål)
{
}
`,tests:[{fn:`BinärSök`,args:[[1,3,5,7,9,11],7],expect:3},{fn:`BinärSök`,args:[[1,3,5],1],expect:0,edge:`första elementet`},{fn:`BinärSök`,args:[[1,3,5],5],expect:2,edge:`sista elementet`},{fn:`BinärSök`,args:[[1,3,5],4],expect:-1,edge:`saknas`},{fn:`BinärSök`,args:[[-8,-2,0,4],-8],expect:0,edge:`negativa tal`},{fn:`BinärSök`,args:[[],1],expect:-1,edge:`tom array`}],require:[n(`\\bwhile\\b`,`Använd en while-loop.`)],forbid:[n(`BinarySearch|IndexOf|\\bfor(each)?\\b`,`Skriv binärsökningen själv med while, utan for och färdiga metoder.`)],solution:`static int BinärSök(int[] tal, int mål)
{
    int lo = 0;
    int hi = tal.Length - 1;
    while (lo <= hi)
    {
        int mitt = (lo + hi) / 2;
        if (tal[mitt] == mål)
        {
            return mitt;
        }
        if (tal[mitt] < mål)
        {
            lo = mitt + 1;
        }
        else
        {
            hi = mitt - 1;
        }
    }
    return -1;
}`,explain:`lo och hi är gränserna för området som återstår. När lo passerar hi är området tomt och talet finns inte. En tom array ger hi = -1, så loopen körs inte alls.`,hint:`lo = 0, hi = tal.Length - 1 och while (lo <= hi). Räkna ut mitten och flytta en av gränserna.`},{type:`debug`,prompt:`Den här binärsökningen hittar inte alltid talet, till exempel 5 i {1, 3, 5}. Hitta felet.`,starter:`static int BinärSök(int[] tal, int mål)
{
    int lo = 0;
    int hi = tal.Length - 1;
    while (lo < hi)
    {
        int mitt = (lo + hi) / 2;
        if (tal[mitt] == mål)
        {
            return mitt;
        }
        if (tal[mitt] < mål)
        {
            lo = mitt + 1;
        }
        else
        {
            hi = mitt - 1;
        }
    }
    return -1;
}`,tests:[{fn:`BinärSök`,args:[[1,3,5],3],expect:1},{fn:`BinärSök`,args:[[1,3,5],5],expect:2,edge:`sista elementet`},{fn:`BinärSök`,args:[[1,3,5],1],expect:0,edge:`första elementet`},{fn:`BinärSök`,args:[[5],5],expect:0,edge:`ett enda element`},{fn:`BinärSök`,args:[[1,3,5],2],expect:-1}],solution:`static int BinärSök(int[] tal, int mål)
{
    int lo = 0;
    int hi = tal.Length - 1;
    while (lo <= hi)
    {
        int mitt = (lo + hi) / 2;
        if (tal[mitt] == mål)
        {
            return mitt;
        }
        if (tal[mitt] < mål)
        {
            lo = mitt + 1;
        }
        else
        {
            hi = mitt - 1;
        }
    }
    return -1;
}`,explain:`När lo och hi pekar på samma index finns det fortfarande ett element kvar att titta på. Med lo < hi slutar loopen ett varv för tidigt. Sådana fel kallas ”off by one” och är de vanligaste i sökkod.`,hint:`Vad händer när lo och hi är lika? Finns det något kvar att kontrollera då?`},{type:`code`,prompt:"Skriv `static int Jämförelser(int[] tal, int mål)` som gör en binärsökning och returnerar hur många gånger den tittade på ett mittelement, oavsett om talet hittades eller inte.",starter:`static int Jämförelser(int[] tal, int mål)
{
}
`,tests:[{fn:`Jämförelser`,args:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],8],expect:1,edge:`mitten hittas direkt`},{fn:`Jämförelser`,args:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],1],expect:4},{fn:`Jämförelser`,args:[[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],99],expect:4,edge:`saknas`},{fn:`Jämförelser`,args:[[],3],expect:0,edge:`tom array`}],require:[n(`\\bwhile\\b`,`Använd en while-loop som i binärsökningen.`)],solution:`static int Jämförelser(int[] tal, int mål)
{
    int lo = 0;
    int hi = tal.Length - 1;
    int antal = 0;
    while (lo <= hi)
    {
        int mitt = (lo + hi) / 2;
        antal++;
        if (tal[mitt] == mål)
        {
            return antal;
        }
        if (tal[mitt] < mål)
        {
            lo = mitt + 1;
        }
        else
        {
            hi = mitt - 1;
        }
    }
    return antal;
}`,explain:`För 15 tal behövs högst 4 jämförelser, medan linjär sökning kan behöva 15. Skillnaden växer snabbt: för en miljon tal är det 20 mot en miljon.`,hint:`Ta binärsökningen och öka en räknare varje gång du räknar ut mitt. Returnera räknaren i stället för index.`}]},{id:`cs-recursion`,title:`Rekursion`,tier:4,text:`En **rekursiv** metod anropar sig själv med ett mindre problem. Den behöver alltid ett **basfall**, ett läge där den slutar anropa sig själv och bara returnerar ett svar. Varje annat anrop ska komma ett steg närmare basfallet.

Utan basfall fortsätter anropen tills minnet för anropen, stacken, tar slut. Då kraschar programmet med \`StackOverflowException\`, ett av få fel i .NET som inte ens går att fånga med try och catch.

Rekursion passar bra för problem som är byggda av mindre kopior av sig själva: mappar i mappar, träd och flera sorteringsalgoritmer. För arrayer skickar man ofta med ett index som visar hur långt man har kommit.`,example:`// 1. Starta rekursionen
Nedräkning(3);

static void Nedräkning(int n)
{
    // 2. Basfall: sluta
    if (n == 0)
    {
        Console.WriteLine("Start!");
        return;
    }
    // 3. Anropa sig själv med mindre n
    Console.WriteLine(n);
    Nedräkning(n - 1);
}`,exercises:[{type:`choice`,prompt:"Vad händer när `Summa(3)` anropas?",code:`static int Summa(int n)
{
    return n + Summa(n - 1);
}`,options:[`Den anropar sig själv tills stacken tar slut och programmet kraschar med StackOverflowException`,`Den returnerar 6 när n når 0`,`Koden kompilerar inte`],answer:0,explain:`Det finns inget basfall, så n fortsätter till -1, -2 och vidare tills stacken är full.`,why:{1:`Inget i koden stoppar vid 0. Den fortsätter med negativa tal.`,2:`Koden är giltig C#. Felet märks först när programmet körs.`}},{type:`code`,prompt:"Skriv `static int Fakultet(int n)` rekursivt. n! = n * (n - 1)!, och 0! = 1.",starter:`static int Fakultet(int n)
{
}
`,tests:[{fn:`Fakultet`,args:[5],expect:120},{fn:`Fakultet`,args:[1],expect:1},{fn:`Fakultet`,args:[10],expect:3628800},{fn:`Fakultet`,args:[0],expect:1,edge:`basfallet 0`}],require:[n(`Fakultet\\s*\\(\\s*n\\s*-\\s*1\\s*\\)`,`Anropa Fakultet(n - 1) inne i metoden.`)],forbid:[n(`\\b(for|foreach|while)\\b`,`Lös det med rekursion, utan loopar.`)],solution:`static int Fakultet(int n)
{
    if (n == 0)
    {
        return 1;
    }
    return n * Fakultet(n - 1);
}`,explain:`Basfallet 0 stoppar rekursionen. Alla andra fall bygger på ett mindre fall. Fakulteter växer snabbt: redan 13! får inte plats i en int.`,hint:`if (n == 0) return 1; annars return n * Fakultet(n - 1);`},{type:`code`,prompt:"Skriv `static int SifferSumma(int n)` rekursivt. Den ska summera siffrorna i ett heltal som inte är negativt, utan loopar och utan att göra om talet till text.",starter:`static int SifferSumma(int n)
{
}
`,tests:[{fn:`SifferSumma`,args:[1234],expect:10},{fn:`SifferSumma`,args:[7],expect:7,edge:`en siffra`},{fn:`SifferSumma`,args:[1e3],expect:1,edge:`nollor i talet`},{fn:`SifferSumma`,args:[0],expect:0,edge:`noll`}],require:[n(`SifferSumma\\s*\\(\\s*n\\s*/\\s*10\\s*\\)`,`Anropa SifferSumma(n / 10).`)],forbid:[n(`\\b(for|foreach|while)\\b`,`Lös det med rekursion, utan loopar.`),n(`ToString|\\+\\s*""|""\\s*\\+`,`Räkna med / och %, utan att göra om talet till text.`)],solution:`static int SifferSumma(int n)
{
    if (n < 10)
    {
        return n;
    }
    return n % 10 + SifferSumma(n / 10);
}`,explain:`n % 10 är sista siffran och n / 10 är talet utan sista siffran. Ett tal under 10 är sin egen siffersumma.`,hint:`Basfall: n < 10. Annars sista siffran plus siffersumman av resten.`},{type:`code`,prompt:"Skriv `static int Potens(int bas, int exp)` rekursivt, där exp är ett heltal som inte är negativt. Använd varken Math.Pow eller loopar.",starter:`static int Potens(int bas, int exp)
{
}
`,tests:[{fn:`Potens`,args:[2,10],expect:1024},{fn:`Potens`,args:[3,1],expect:3},{fn:`Potens`,args:[5,0],expect:1,edge:`exponent 0`},{fn:`Potens`,args:[-3,3],expect:-27,edge:`negativ bas`},{fn:`Potens`,args:[0,4],expect:0,edge:`bas 0`}],forbid:[n(`Math\\.Pow`,`Lös det utan Math.Pow.`),n(`\\b(for|foreach|while)\\b`,`Lös det med rekursion, utan loopar.`)],solution:`static int Potens(int bas, int exp)
{
    if (exp == 0)
    {
        return 1;
    }
    return bas * Potens(bas, exp - 1);
}`,explain:`Allt upphöjt till 0 är 1, och det blir basfallet. Varje anrop minskar exponenten med 1 tills basfallet nås.`,hint:`if (exp == 0) return 1; annars return bas * Potens(bas, exp - 1);`},{type:`debug`,prompt:"`Summa(tal, i)` ska returnera summan av talen från index `i` till slutet, så `Summa(tal, 0)` summerar hela arrayen. Metoden kraschar eftersom den saknar basfall. Lägg till det.",starter:`static int Summa(int[] tal, int i)
{
    return tal[i] + Summa(tal, i + 1);
}`,tests:[{fn:`Summa`,args:[[1,2,3],0],expect:6},{fn:`Summa`,args:[[1,2,3],1],expect:5,edge:`börjar mitt i`},{fn:`Summa`,args:[[4],0],expect:4},{fn:`Summa`,args:[[],0],expect:0,edge:`tom array`}],forbid:[n(`\\b(for|foreach|while)\\b`,`Lös det med rekursion, utan loopar.`)],solution:`static int Summa(int[] tal, int i)
{
    if (i >= tal.Length)
    {
        return 0;
    }
    return tal[i] + Summa(tal, i + 1);
}`,explain:`När i har passerat sista indexet finns inget kvar att summera, och svaret är 0. Indexet är det som gör problemet mindre för varje anrop.`,hint:`Vad ska summan vara när i == tal.Length? Kontrollera det före tal[i].`}]},{id:`cs-sorting`,title:`Sorteringsalgoritmer`,tier:4,text:"I riktig kod sorterar du med `Sort()` eller `OrderBy()`. Men att skriva sorteringen själv tränar nästlade loopar, index och platsbyten, och det kommer ofta upp på arbetsintervjuer. **Bubbelsortering** jämför grannar och byter plats på dem om de står i fel ordning, varv efter varv tills inget byts. **Urvalssortering** letar upp det minsta värdet och byter in det på första platsen, sedan det minsta av resten till andra platsen, och så vidare.\n\nEtt platsbyte gör du med en temporär variabel, annars skriver du över ett av värdena.\n\nEn sortering är **stabil** om element som räknas som lika behåller sin inbördes ordning. Det spelar roll när du sorterar i flera steg. Både `OrderBy` och bubbelsortering är stabila, medan `List.Sort` inte lovar det.",example:`// 1. Skapa arrayen
int[] tal = {5, 2, 8};
// 2. Byt plats med en hjälpvariabel
int temp = tal[0];
tal[0] = tal[1];
tal[1] = temp;
// 3. Skriv ut resultatet
Console.WriteLine(string.Join(", ", tal));`,exercises:[{type:`choice`,prompt:`Personerna ”Bo 30”, ”Ada 25” och ”Cy 30” står i den ordningen och sorteras med en stabil sortering efter ålder. Vilket blir resultatet?`,options:[`Ada 25, Bo 30, Cy 30`,`Ada 25, Cy 30, Bo 30`,`Bo 30, Cy 30, Ada 25`],answer:0,explain:`Bo och Cy är lika gamla. En stabil sortering behåller deras ursprungliga ordning, och Bo stod före Cy.`,why:{1:`Bo och Cy räknas som lika. En stabil sortering låter Bo stå kvar före Cy, som från början.`,2:`Sorteringen går från lägst till högst ålder, så Ada 25 kommer först.`}},{type:`code`,prompt:"Skriv `static int[] BubbelSortera(int[] tal)` som sorterar talen i stigande ordning med bubbelsortering och returnerar arrayen. Fortsätt göra varv tills ett helt varv går utan byten.",starter:`static int[] BubbelSortera(int[] tal)
{
}
`,tests:[{fn:`BubbelSortera`,args:[[5,2,8,1]],expect:[1,2,5,8]},{fn:`BubbelSortera`,args:[[3,3,1]],expect:[1,3,3],edge:`dubbletter`},{fn:`BubbelSortera`,args:[[1,2,3]],expect:[1,2,3],edge:`redan sorterad`},{fn:`BubbelSortera`,args:[[-1,-5,0]],expect:[-5,-1,0],edge:`negativa tal`},{fn:`BubbelSortera`,args:[[]],expect:[],edge:`tom array`}],forbid:[n(`\\.Sort\\s*\\(|OrderBy|Array\\.Sort`,`Skriv sorteringen själv, utan Sort() och OrderBy().`)],solution:`static int[] BubbelSortera(int[] tal)
{
    bool bytt = true;
    while (bytt)
    {
        bytt = false;
        for (int i = 0; i < tal.Length - 1; i++)
        {
            if (tal[i] > tal[i + 1])
            {
                int temp = tal[i];
                tal[i] = tal[i + 1];
                tal[i + 1] = temp;
                bytt = true;
            }
        }
    }
    return tal;
}`,explain:`Efter varje varv har det största kvarvarande talet ”bubblat” upp till slutet. När ett varv går utan byten är allt sorterat, och då slutar while-loopen.`,hint:`En while-loop som kör så länge något byttes, och inuti en for-loop som jämför tal[i] med tal[i + 1].`},{type:`code`,prompt:"Skriv `static int[] UrvalsSortera(int[] tal)` med urvalssortering: för varje plats i, hitta index för det minsta talet från i och framåt, och byt plats på det och tal[i].",starter:`static int[] UrvalsSortera(int[] tal)
{
}
`,tests:[{fn:`UrvalsSortera`,args:[[4,1,3,0]],expect:[0,1,3,4]},{fn:`UrvalsSortera`,args:[[2,2,2]],expect:[2,2,2],edge:`alla lika`},{fn:`UrvalsSortera`,args:[[9]],expect:[9],edge:`ett element`},{fn:`UrvalsSortera`,args:[[10,-10,0,5]],expect:[-10,0,5,10],edge:`negativa tal`},{fn:`UrvalsSortera`,args:[[]],expect:[],edge:`tom array`}],forbid:[n(`\\.Sort\\s*\\(|OrderBy|Array\\.Sort`,`Skriv sorteringen själv, utan Sort() och OrderBy().`),n(`\\.Min\\s*\\(`,`Leta upp det minsta själv, utan Min().`)],solution:`static int[] UrvalsSortera(int[] tal)
{
    for (int i = 0; i < tal.Length; i++)
    {
        int minsta = i;
        for (int j = i + 1; j < tal.Length; j++)
        {
            if (tal[j] < tal[minsta])
            {
                minsta = j;
            }
        }
        int temp = tal[i];
        tal[i] = tal[minsta];
        tal[minsta] = temp;
    }
    return tal;
}`,explain:`Den yttre loopen väljer plats och den inre letar upp det minsta av resten. Två nästlade loopar betyder ungefär n * n jämförelser, vilket är långsamt för stora mängder data.`,hint:`Yttre loop över i. Inre loop från i + 1 som sparar index för det minsta. Byt sedan tal[i] och tal[minsta].`},{type:`code`,prompt:"Skriv `static List<string> EfterLängd(List<string> ord)` som sorterar orden efter längd, kortast först, med bubbelsortering. Sorteringen ska vara **stabil**: ord med samma längd behåller sin ordning.",starter:`static List<string> EfterLängd(List<string> ord)
{
}
`,tests:[{fn:`EfterLängd`,args:[[`ccc`,`a`,`bb`,`d`]],expect:[`a`,`d`,`bb`,`ccc`],edge:`stabil: a ska stå före d`},{fn:`EfterLängd`,args:[[`hej`,`på`,`dig`]],expect:[`på`,`hej`,`dig`],edge:`stabil: hej före dig`},{fn:`EfterLängd`,args:[[`ord`]],expect:[`ord`]},{fn:`EfterLängd`,args:[[]],expect:[],edge:`tom lista`}],forbid:[n(`\\.Sort\\s*\\(|OrderBy|Array\\.Sort`,`Skriv sorteringen själv, utan Sort() och OrderBy().`)],solution:`static List<string> EfterLängd(List<string> ord)
{
    bool bytt = true;
    while (bytt)
    {
        bytt = false;
        for (int i = 0; i < ord.Count - 1; i++)
        {
            if (ord[i].Length > ord[i + 1].Length)
            {
                string temp = ord[i];
                ord[i] = ord[i + 1];
                ord[i + 1] = temp;
                bytt = true;
            }
        }
    }
    return ord;
}`,explain:`Nyckeln är > i stället för >=. Grannar med samma längd byts aldrig, så de behåller sin ordning. Med >= skulle de byta plats fram och tillbaka för evigt.`,hint:`Bubbelsortera som förut, men jämför ord[i].Length med ord[i + 1].Length och byt bara om den första är strikt längre.`},{type:`code`,prompt:"Nu använder du de inbyggda verktygen. Skriv `static List<string> Topplista(List<string> ord)` som returnerar orden sorterade med längst först, och vid samma längd i bokstavsordning. Använd LINQ eller Sort.",starter:`static List<string> Topplista(List<string> ord)
{
    return ord;
}
`,tests:[{fn:`Topplista`,args:[[`bo`,`ada`,`cy`,`eva`]],expect:[`ada`,`eva`,`bo`,`cy`]},{fn:`Topplista`,args:[[`b`,`a`,`c`]],expect:[`a`,`b`,`c`],edge:`alla lika långa`},{fn:`Topplista`,args:[[]],expect:[],edge:`tom lista`}],require:[n(`OrderBy|\\.Sort\\s*\\(`,`Använd OrderByDescending/ThenBy eller Sort.`)],solution:`static List<string> Topplista(List<string> ord)
{
    return ord.OrderByDescending(o => o.Length).ThenBy(o => o).ToList();
}`,explain:`En rad i stället för tjugo, och den är vältestad. Därför använder man de inbyggda verktygen i riktig kod och skriver egna sorteringar för att förstå vad som händer bakom.`,hint:`ord.OrderByDescending(o => o.Length).ThenBy(o => o).ToList()`}]}]},{id:`cs12`,title:`Slutprojekt i C#`,lessons:[{id:`cs-library`,title:`Slutprojekt: bibliotekssystem`,tier:5,text:`Nu bygger du kärnan i ett bibliotekssystem med samma byggstenar som i riktiga verksamhetssystem: klasser som skyddar sina regler, en lista som håller ordning på objekten, undantag när någon försöker göra något ogiltigt och LINQ för sökningar och rapporter.

Ta en del i taget. Varje del bygger vidare på den förra, och testprogrammet överst i koden visar om allt fungerar. Ändra inte testprogrammet, ändra klasserna.`,example:`// 1. Skapa en bok
var bok = new Bok("Dune", "Frank Herbert", 1965);
Console.WriteLine($"{bok.Titel} skrevs {bok.År}");

// 2. Klassen med egenskaper
class Bok
{
    public string Titel { get; }
    public string Författare { get; }
    public int År { get; }

    // 3. Konstruktorn
    public Bok(string titel, string författare, int år)
    {
        Titel = titel;
        Författare = författare;
        År = år;
    }
}`,exercises:[{type:`code`,prompt:'Del 1: Gör klart klassen `Bok`. Konstruktorn ska kasta `ArgumentException("Titel saknas")` om titeln är tom eller bara mellanslag, och `ArgumentException("Ogiltigt år")` om året är mindre än 0 eller större än 2100. Lägg också till `ToString()` som returnerar till exempel `Dune av Frank Herbert (1965)`.',starter:`var dune = new Bok("Dune", "Frank Herbert", 1965);
Console.WriteLine(dune);
try
{
    new Bok("  ", "Okänd", 2000);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}
try
{
    new Bok("Framtiden", "Någon", 3000);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}

class Bok
{
    public string Titel { get; }
    public string Författare { get; }
    public int År { get; }

    public Bok(string titel, string författare, int år)
    {
        Titel = titel;
        Författare = författare;
        År = år;
    }
}
`,output:`Dune av Frank Herbert (1965)
Titel saknas
Ogiltigt år`,require:[n(`throw\\s+new\\s+ArgumentException`,`Kasta felen med throw new ArgumentException(...).`),n(`public\\s+override\\s+string\\s+ToString\\s*\\(`,`Skriv public override string ToString().`)],solution:`var dune = new Bok("Dune", "Frank Herbert", 1965);
Console.WriteLine(dune);
try
{
    new Bok("  ", "Okänd", 2000);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}
try
{
    new Bok("Framtiden", "Någon", 3000);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}

class Bok
{
    public string Titel { get; }
    public string Författare { get; }
    public int År { get; }

    public Bok(string titel, string författare, int år)
    {
        if (string.IsNullOrWhiteSpace(titel))
        {
            throw new ArgumentException("Titel saknas");
        }
        if (år < 0 || år > 2100)
        {
            throw new ArgumentException("Ogiltigt år");
        }
        Titel = titel;
        Författare = författare;
        År = år;
    }

    public override string ToString()
    {
        return $"{Titel} av {Författare} ({År})";
    }
}`,explain:`När konstruktorn vägrar skapa ogiltiga böcker kan resten av programmet lita på att varje Bok har en titel och ett rimligt år.`,hint:`Två if-satser med throw överst i konstruktorn. string.IsNullOrWhiteSpace(titel) fångar både tom text och mellanslag.`},{type:`code`,prompt:'Del 2: Ge `Bok` metoderna `Låna()` och `LämnaTillbaka()`. Att låna en bok som redan är utlånad ska kasta `InvalidOperationException("Dune är redan utlånad")`, och att lämna tillbaka en bok som inte är utlånad ska kasta `InvalidOperationException("Dune är inte utlånad")` (med bokens titel). En utlånad bok ska visa ` [utlånad]` sist i ToString.',starter:`var dune = new Bok("Dune", "Frank Herbert", 1965);
dune.Låna();
Console.WriteLine(dune);
try
{
    dune.Låna();
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}
dune.LämnaTillbaka();
Console.WriteLine(dune);
try
{
    dune.LämnaTillbaka();
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}

class Bok
{
    public string Titel { get; }
    public string Författare { get; }
    public int År { get; }
    public bool Utlånad { get; private set; }

    public Bok(string titel, string författare, int år)
    {
        if (string.IsNullOrWhiteSpace(titel))
        {
            throw new ArgumentException("Titel saknas");
        }
        if (år < 0 || år > 2100)
        {
            throw new ArgumentException("Ogiltigt år");
        }
        Titel = titel;
        Författare = författare;
        År = år;
    }

    public void Låna()
    {
    }

    public void LämnaTillbaka()
    {
    }

    public override string ToString()
    {
        return $"{Titel} av {Författare} ({År})";
    }
}
`,output:`Dune av Frank Herbert (1965) [utlånad]
Dune är redan utlånad
Dune av Frank Herbert (1965)
Dune är inte utlånad`,require:[n(`throw\\s+new\\s+InvalidOperationException`,`Kasta felen med throw new InvalidOperationException(...).`)],solution:`var dune = new Bok("Dune", "Frank Herbert", 1965);
dune.Låna();
Console.WriteLine(dune);
try
{
    dune.Låna();
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}
dune.LämnaTillbaka();
Console.WriteLine(dune);
try
{
    dune.LämnaTillbaka();
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}

class Bok
{
    public string Titel { get; }
    public string Författare { get; }
    public int År { get; }
    public bool Utlånad { get; private set; }

    public Bok(string titel, string författare, int år)
    {
        if (string.IsNullOrWhiteSpace(titel))
        {
            throw new ArgumentException("Titel saknas");
        }
        if (år < 0 || år > 2100)
        {
            throw new ArgumentException("Ogiltigt år");
        }
        Titel = titel;
        Författare = författare;
        År = år;
    }

    public void Låna()
    {
        if (Utlånad)
        {
            throw new InvalidOperationException($"{Titel} är redan utlånad");
        }
        Utlånad = true;
    }

    public void LämnaTillbaka()
    {
        if (!Utlånad)
        {
            throw new InvalidOperationException($"{Titel} är inte utlånad");
        }
        Utlånad = false;
    }

    public override string ToString()
    {
        string text = $"{Titel} av {Författare} ({År})";
        if (Utlånad)
        {
            text += " [utlånad]";
        }
        return text;
    }
}`,explain:`InvalidOperationException betyder att anropet inte är tillåtet i objektets nuvarande läge. Värdet är inte fel i sig, men det går inte att låna en bok två gånger. Tack vare private set kan ingen utanför klassen ändra Utlånad direkt.`,hint:`I Låna: om Utlånad redan är true, kasta felet, annars sätt Utlånad = true. LämnaTillbaka är spegelvänd.`},{type:`code`,prompt:'Del 3: Gör klart klassen `Bibliotek`. `Låna(titel)` och `LämnaTillbaka(titel)` ska hitta boken oavsett stora och små bokstäver och mellanslag runt titeln, och kasta `InvalidOperationException("Hittar inte TITEL")` om den saknas. `LäggTill` ska kasta `InvalidOperationException("Finns redan: TITEL")` om en bok med samma titel redan finns. Tips: skriv en privat hjälpmetod `Hitta`.',starter:`var bib = new Bibliotek();
bib.LäggTill(new Bok("Dune", "Frank Herbert", 1965));
bib.LäggTill(new Bok("Emma", "Jane Austen", 1815));
string[] försök = {"dune", "Dune", "Hobbit"};
foreach (string titel in försök)
{
    try
    {
        bib.Låna(titel);
        Console.WriteLine($"Lånade {titel}");
    }
    catch (InvalidOperationException e)
    {
        Console.WriteLine($"Nekad: {e.Message}");
    }
}
try
{
    bib.LäggTill(new Bok("DUNE", "Någon annan", 2021));
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"Nekad: {e.Message}");
}
bib.LämnaTillbaka(" DUNE ");
bib.Låna("Dune");
Console.WriteLine($"Dune lånades igen, {bib.Antal} böcker totalt");

class Bok
{
    public string Titel { get; }
    public string Författare { get; }
    public int År { get; }
    public bool Utlånad { get; private set; }

    public Bok(string titel, string författare, int år)
    {
        if (string.IsNullOrWhiteSpace(titel))
        {
            throw new ArgumentException("Titel saknas");
        }
        if (år < 0 || år > 2100)
        {
            throw new ArgumentException("Ogiltigt år");
        }
        Titel = titel;
        Författare = författare;
        År = år;
    }

    public void Låna()
    {
        if (Utlånad)
        {
            throw new InvalidOperationException($"{Titel} är redan utlånad");
        }
        Utlånad = true;
    }

    public void LämnaTillbaka()
    {
        if (!Utlånad)
        {
            throw new InvalidOperationException($"{Titel} är inte utlånad");
        }
        Utlånad = false;
    }

    public override string ToString()
    {
        string text = $"{Titel} av {Författare} ({År})";
        if (Utlånad)
        {
            text += " [utlånad]";
        }
        return text;
    }
}

class Bibliotek
{
    private List<Bok> böcker = new List<Bok>();

    public int Antal => böcker.Count;

    public void LäggTill(Bok bok)
    {
        böcker.Add(bok);
    }

    public void Låna(string titel)
    {
    }

    public void LämnaTillbaka(string titel)
    {
    }
}
`,output:`Lånade dune
Nekad: Dune är redan utlånad
Nekad: Hittar inte Hobbit
Nekad: Finns redan: DUNE
Dune lånades igen, 2 böcker totalt`,require:[n(`FirstOrDefault|\\.Find\\s*\\(`,`Leta upp boken med FirstOrDefault eller Find.`)],solution:`var bib = new Bibliotek();
bib.LäggTill(new Bok("Dune", "Frank Herbert", 1965));
bib.LäggTill(new Bok("Emma", "Jane Austen", 1815));
string[] försök = {"dune", "Dune", "Hobbit"};
foreach (string titel in försök)
{
    try
    {
        bib.Låna(titel);
        Console.WriteLine($"Lånade {titel}");
    }
    catch (InvalidOperationException e)
    {
        Console.WriteLine($"Nekad: {e.Message}");
    }
}
try
{
    bib.LäggTill(new Bok("DUNE", "Någon annan", 2021));
}
catch (InvalidOperationException e)
{
    Console.WriteLine($"Nekad: {e.Message}");
}
bib.LämnaTillbaka(" DUNE ");
bib.Låna("Dune");
Console.WriteLine($"Dune lånades igen, {bib.Antal} böcker totalt");

class Bok
{
    public string Titel { get; }
    public string Författare { get; }
    public int År { get; }
    public bool Utlånad { get; private set; }

    public Bok(string titel, string författare, int år)
    {
        if (string.IsNullOrWhiteSpace(titel))
        {
            throw new ArgumentException("Titel saknas");
        }
        if (år < 0 || år > 2100)
        {
            throw new ArgumentException("Ogiltigt år");
        }
        Titel = titel;
        Författare = författare;
        År = år;
    }

    public void Låna()
    {
        if (Utlånad)
        {
            throw new InvalidOperationException($"{Titel} är redan utlånad");
        }
        Utlånad = true;
    }

    public void LämnaTillbaka()
    {
        if (!Utlånad)
        {
            throw new InvalidOperationException($"{Titel} är inte utlånad");
        }
        Utlånad = false;
    }

    public override string ToString()
    {
        string text = $"{Titel} av {Författare} ({År})";
        if (Utlånad)
        {
            text += " [utlånad]";
        }
        return text;
    }
}

class Bibliotek
{
    private List<Bok> böcker = new List<Bok>();

    public int Antal => böcker.Count;

    private Bok Hitta(string titel)
    {
        string sökt = titel.Trim().ToLower();
        return böcker.FirstOrDefault(b => b.Titel.ToLower() == sökt);
    }

    public void LäggTill(Bok bok)
    {
        if (Hitta(bok.Titel) != null)
        {
            throw new InvalidOperationException($"Finns redan: {bok.Titel}");
        }
        böcker.Add(bok);
    }

    public void Låna(string titel)
    {
        Bok bok = Hitta(titel);
        if (bok == null)
        {
            throw new InvalidOperationException($"Hittar inte {titel}");
        }
        bok.Låna();
    }

    public void LämnaTillbaka(string titel)
    {
        Bok bok = Hitta(titel);
        if (bok == null)
        {
            throw new InvalidOperationException($"Hittar inte {titel}");
        }
        bok.LämnaTillbaka();
    }
}`,explain:`Hitta samlar sökregeln på ett ställe, så Låna, LämnaTillbaka och LäggTill alltid är överens om vad som räknas som samma titel. Biblioteket letar upp boken, men det är Bok som avgör om den går att låna.`,hint:`private Bok Hitta(string titel) kan returnera böcker.FirstOrDefault(b => b.Titel.ToLower() == titel.Trim().ToLower()). Kontrollera om svaret är null.`},{type:`code`,prompt:"Del 4: Lägg till `Sök(ord)` som returnerar alla böcker där titeln eller författaren innehåller ordet (oavsett stora och små bokstäver), sorterade efter utgivningsår. Lägg också till `Rapport()` som returnerar till exempel `4 böcker, utlånade: 1, tillgängliga: Dune, Hobbit` med de tillgängliga titlarna i bokstavsordning, eller `tillgängliga: inga` om inga finns. Använd LINQ.",starter:`var bib = new Bibliotek();
bib.LäggTill(new Bok("Dune", "Frank Herbert", 1965));
bib.LäggTill(new Bok("Emma", "Jane Austen", 1815));
bib.LäggTill(new Bok("Stolthet och fördom", "Jane Austen", 1813));
bib.LäggTill(new Bok("Hobbit", "J.R.R. Tolkien", 1937));
bib.Låna("Emma");
foreach (Bok b in bib.Sök("AUSTEN"))
{
    Console.WriteLine(b);
}
Console.WriteLine(bib.Sök("xyz").Count);
Console.WriteLine(bib.Rapport());
Console.WriteLine(new Bibliotek().Rapport());

class Bok
{
    public string Titel { get; }
    public string Författare { get; }
    public int År { get; }
    public bool Utlånad { get; private set; }

    public Bok(string titel, string författare, int år)
    {
        if (string.IsNullOrWhiteSpace(titel))
        {
            throw new ArgumentException("Titel saknas");
        }
        if (år < 0 || år > 2100)
        {
            throw new ArgumentException("Ogiltigt år");
        }
        Titel = titel;
        Författare = författare;
        År = år;
    }

    public void Låna()
    {
        if (Utlånad)
        {
            throw new InvalidOperationException($"{Titel} är redan utlånad");
        }
        Utlånad = true;
    }

    public void LämnaTillbaka()
    {
        if (!Utlånad)
        {
            throw new InvalidOperationException($"{Titel} är inte utlånad");
        }
        Utlånad = false;
    }

    public override string ToString()
    {
        string text = $"{Titel} av {Författare} ({År})";
        if (Utlånad)
        {
            text += " [utlånad]";
        }
        return text;
    }
}

class Bibliotek
{
    private List<Bok> böcker = new List<Bok>();

    public int Antal => böcker.Count;

    private Bok Hitta(string titel)
    {
        string sökt = titel.Trim().ToLower();
        return böcker.FirstOrDefault(b => b.Titel.ToLower() == sökt);
    }

    public void LäggTill(Bok bok)
    {
        if (Hitta(bok.Titel) != null)
        {
            throw new InvalidOperationException($"Finns redan: {bok.Titel}");
        }
        böcker.Add(bok);
    }

    public void Låna(string titel)
    {
        Bok bok = Hitta(titel);
        if (bok == null)
        {
            throw new InvalidOperationException($"Hittar inte {titel}");
        }
        bok.Låna();
    }

    public void LämnaTillbaka(string titel)
    {
        Bok bok = Hitta(titel);
        if (bok == null)
        {
            throw new InvalidOperationException($"Hittar inte {titel}");
        }
        bok.LämnaTillbaka();
    }

    public List<Bok> Sök(string ord)
    {
        return new List<Bok>();
    }

    public string Rapport()
    {
        return "";
    }
}
`,output:`Stolthet och fördom av Jane Austen (1813)
Emma av Jane Austen (1815) [utlånad]
0
4 böcker, utlånade: 1, tillgängliga: Dune, Hobbit, Stolthet och fördom
0 böcker, utlånade: 0, tillgängliga: inga`,require:[n(`\\.Where\\s*\\(`,`Filtrera med Where.`),n(`\\.OrderBy\\s*\\(`,`Sortera med OrderBy.`)],solution:`var bib = new Bibliotek();
bib.LäggTill(new Bok("Dune", "Frank Herbert", 1965));
bib.LäggTill(new Bok("Emma", "Jane Austen", 1815));
bib.LäggTill(new Bok("Stolthet och fördom", "Jane Austen", 1813));
bib.LäggTill(new Bok("Hobbit", "J.R.R. Tolkien", 1937));
bib.Låna("Emma");
foreach (Bok b in bib.Sök("AUSTEN"))
{
    Console.WriteLine(b);
}
Console.WriteLine(bib.Sök("xyz").Count);
Console.WriteLine(bib.Rapport());
Console.WriteLine(new Bibliotek().Rapport());

class Bok
{
    public string Titel { get; }
    public string Författare { get; }
    public int År { get; }
    public bool Utlånad { get; private set; }

    public Bok(string titel, string författare, int år)
    {
        if (string.IsNullOrWhiteSpace(titel))
        {
            throw new ArgumentException("Titel saknas");
        }
        if (år < 0 || år > 2100)
        {
            throw new ArgumentException("Ogiltigt år");
        }
        Titel = titel;
        Författare = författare;
        År = år;
    }

    public void Låna()
    {
        if (Utlånad)
        {
            throw new InvalidOperationException($"{Titel} är redan utlånad");
        }
        Utlånad = true;
    }

    public void LämnaTillbaka()
    {
        if (!Utlånad)
        {
            throw new InvalidOperationException($"{Titel} är inte utlånad");
        }
        Utlånad = false;
    }

    public override string ToString()
    {
        string text = $"{Titel} av {Författare} ({År})";
        if (Utlånad)
        {
            text += " [utlånad]";
        }
        return text;
    }
}

class Bibliotek
{
    private List<Bok> böcker = new List<Bok>();

    public int Antal => böcker.Count;

    private Bok Hitta(string titel)
    {
        string sökt = titel.Trim().ToLower();
        return böcker.FirstOrDefault(b => b.Titel.ToLower() == sökt);
    }

    public void LäggTill(Bok bok)
    {
        if (Hitta(bok.Titel) != null)
        {
            throw new InvalidOperationException($"Finns redan: {bok.Titel}");
        }
        böcker.Add(bok);
    }

    public void Låna(string titel)
    {
        Bok bok = Hitta(titel);
        if (bok == null)
        {
            throw new InvalidOperationException($"Hittar inte {titel}");
        }
        bok.Låna();
    }

    public void LämnaTillbaka(string titel)
    {
        Bok bok = Hitta(titel);
        if (bok == null)
        {
            throw new InvalidOperationException($"Hittar inte {titel}");
        }
        bok.LämnaTillbaka();
    }

    public List<Bok> Sök(string ord)
    {
        string sökt = ord.Trim().ToLower();
        return böcker
            .Where(b => b.Titel.ToLower().Contains(sökt) || b.Författare.ToLower().Contains(sökt))
            .OrderBy(b => b.År)
            .ToList();
    }

    public string Rapport()
    {
        int utlånade = böcker.Count(b => b.Utlånad);
        var lediga = böcker.Where(b => !b.Utlånad).OrderBy(b => b.Titel).Select(b => b.Titel).ToList();
        string lista = lediga.Count == 0 ? "inga" : string.Join(", ", lediga);
        return $"{böcker.Count} böcker, utlånade: {utlånade}, tillgängliga: {lista}";
    }
}`,explain:`Where, OrderBy och Select gör sökningen och rapporten till några korta rader. Det tomma biblioteket visar varför gränsfall behöver egen kod: string.Join på en tom lista ger bara en tom text.`,hint:`Sök: böcker.Where(...).OrderBy(b => b.År).ToList(). Rapport: räkna utlånade med Count(b => b.Utlånad) och hämta de lediga titlarna med Where, OrderBy och Select.`}]},{id:`cs-shop`,title:`Slutprojekt: kundvagn`,tier:5,text:`I det här projektet bygger du kundvagnen i en webbutik. Det är kod där fel kostar pengar, så varje metod ska stoppa ogiltiga värden med tydliga undantag i stället för att räkna fel i tysthet.

Du kombinerar klasser, en \`Dictionary<string, int>\` som håller antal per produkt, LINQ för summor och en switch för rabattkoder. Varje del bygger på den förra.`,example:`// 1. Skapa varukorgen
var antal = new Dictionary<string, int>();
// 2. Lägg till varor
antal["Kaffe"] = 2;
antal["Bulle"] = 1;
antal["Kaffe"] += 1;
// 3. Skriv ut varje rad
foreach (var rad in antal)
{
    Console.WriteLine($"{rad.Value} x {rad.Key}");
}`,exercises:[{type:`code`,prompt:'Del 1: Gör klart klassen `Produkt`. Ett tomt namn ska ge `ArgumentException("Namn saknas")` och ett negativt pris `ArgumentException("Priset kan inte vara negativt")`. Ett pris på 0 är tillåtet. ToString ska visa priset med två decimaler, till exempel `Kaffe 49.90 kr`.',starter:`Console.WriteLine(new Produkt("Kaffe", 49.9));
Console.WriteLine(new Produkt("Provbit", 0));
try
{
    new Produkt("Bulle", -15);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}
try
{
    new Produkt("", 10);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}

class Produkt
{
    public string Namn { get; }
    public double Pris { get; }

    public Produkt(string namn, double pris)
    {
        Namn = namn;
        Pris = pris;
    }
}
`,output:`Kaffe 49.90 kr
Provbit 0.00 kr
Priset kan inte vara negativt
Namn saknas`,require:[n(`throw\\s+new\\s+ArgumentException`,`Kasta felen med throw new ArgumentException(...).`)],solution:`Console.WriteLine(new Produkt("Kaffe", 49.9));
Console.WriteLine(new Produkt("Provbit", 0));
try
{
    new Produkt("Bulle", -15);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}
try
{
    new Produkt("", 10);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}

class Produkt
{
    public string Namn { get; }
    public double Pris { get; }

    public Produkt(string namn, double pris)
    {
        if (string.IsNullOrWhiteSpace(namn))
        {
            throw new ArgumentException("Namn saknas");
        }
        if (pris < 0)
        {
            throw new ArgumentException("Priset kan inte vara negativt");
        }
        Namn = namn;
        Pris = pris;
    }

    public override string ToString()
    {
        return $"{Namn} {Pris:F2} kr";
    }
}`,explain:`:F2 i interpolationen ger alltid två decimaler, vilket är vad man vill se på ett pris. Kontrollen är pris < 0 och inte pris <= 0, eftersom gratis varor finns.`,hint:`Två if med throw i konstruktorn, och return $"{Namn} {Pris:F2} kr"; i ToString.`},{type:`code`,prompt:'Del 2: Gör klart `Kundvagn`. `LäggTill(namn, st)` ska kasta `ArgumentException("Antal måste vara minst 1")` om st är mindre än 1 och `InvalidOperationException("NAMN finns inte i sortimentet")` om produkten saknas. `TaBort(namn)` tar bort ett exemplar, kastar `InvalidOperationException("NAMN finns inte i kundvagnen")` om varan saknas, och tar bort nyckeln helt när antalet når 0. `Antal(namn)` ger 0 för varor som inte finns i vagnen, och `AntalVaror` är det totala antalet.',starter:`var sortiment = new List<Produkt> { new Produkt("Kaffe", 49.9), new Produkt("Bulle", 15) };
var vagn = new Kundvagn(sortiment);
vagn.LäggTill("Kaffe");
vagn.LäggTill("Bulle", 3);
vagn.TaBort("Bulle");
Console.WriteLine($"{vagn.Antal("Kaffe")} kaffe, {vagn.Antal("Bulle")} bullar, {vagn.AntalVaror} varor");
vagn.TaBort("Kaffe");
Console.WriteLine($"{vagn.Antal("Kaffe")} kaffe");
try
{
    vagn.LäggTill("Te");
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}
try
{
    vagn.LäggTill("Bulle", 0);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}
try
{
    vagn.TaBort("Kaffe");
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}

class Produkt
{
    public string Namn { get; }
    public double Pris { get; }

    public Produkt(string namn, double pris)
    {
        if (string.IsNullOrWhiteSpace(namn))
        {
            throw new ArgumentException("Namn saknas");
        }
        if (pris < 0)
        {
            throw new ArgumentException("Priset kan inte vara negativt");
        }
        Namn = namn;
        Pris = pris;
    }

    public override string ToString()
    {
        return $"{Namn} {Pris:F2} kr";
    }
}

class Kundvagn
{
    private List<Produkt> sortiment;
    private Dictionary<string, int> antal = new Dictionary<string, int>();

    public Kundvagn(List<Produkt> sortiment)
    {
        this.sortiment = sortiment;
    }

    public int AntalVaror => 0;

    public int Antal(string namn)
    {
        return 0;
    }

    public void LäggTill(string namn, int st = 1)
    {
    }

    public void TaBort(string namn)
    {
    }
}
`,output:`1 kaffe, 2 bullar, 3 varor
0 kaffe
Te finns inte i sortimentet
Antal måste vara minst 1
Kaffe finns inte i kundvagnen`,require:[n(`TryGetValue|ContainsKey`,`Använd TryGetValue eller ContainsKey för att kolla om varan finns i vagnen.`),n(`\\.Remove\\s*\\(`,`Ta bort nyckeln med Remove när antalet når 0.`)],solution:`var sortiment = new List<Produkt> { new Produkt("Kaffe", 49.9), new Produkt("Bulle", 15) };
var vagn = new Kundvagn(sortiment);
vagn.LäggTill("Kaffe");
vagn.LäggTill("Bulle", 3);
vagn.TaBort("Bulle");
Console.WriteLine($"{vagn.Antal("Kaffe")} kaffe, {vagn.Antal("Bulle")} bullar, {vagn.AntalVaror} varor");
vagn.TaBort("Kaffe");
Console.WriteLine($"{vagn.Antal("Kaffe")} kaffe");
try
{
    vagn.LäggTill("Te");
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}
try
{
    vagn.LäggTill("Bulle", 0);
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}
try
{
    vagn.TaBort("Kaffe");
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}

class Produkt
{
    public string Namn { get; }
    public double Pris { get; }

    public Produkt(string namn, double pris)
    {
        if (string.IsNullOrWhiteSpace(namn))
        {
            throw new ArgumentException("Namn saknas");
        }
        if (pris < 0)
        {
            throw new ArgumentException("Priset kan inte vara negativt");
        }
        Namn = namn;
        Pris = pris;
    }

    public override string ToString()
    {
        return $"{Namn} {Pris:F2} kr";
    }
}

class Kundvagn
{
    private List<Produkt> sortiment;
    private Dictionary<string, int> antal = new Dictionary<string, int>();

    public Kundvagn(List<Produkt> sortiment)
    {
        this.sortiment = sortiment;
    }

    public int AntalVaror => antal.Values.Sum();

    public int Antal(string namn)
    {
        if (antal.TryGetValue(namn, out int st))
        {
            return st;
        }
        return 0;
    }

    public void LäggTill(string namn, int st = 1)
    {
        if (st < 1)
        {
            throw new ArgumentException("Antal måste vara minst 1");
        }
        if (!sortiment.Any(p => p.Namn == namn))
        {
            throw new InvalidOperationException($"{namn} finns inte i sortimentet");
        }
        antal[namn] = Antal(namn) + st;
    }

    public void TaBort(string namn)
    {
        if (!antal.ContainsKey(namn))
        {
            throw new InvalidOperationException($"{namn} finns inte i kundvagnen");
        }
        antal[namn]--;
        if (antal[namn] == 0)
        {
            antal.Remove(namn);
        }
    }
}`,explain:`Att ta bort nyckeln vid 0 gör att vagnen aldrig innehåller rader som ”0 x Kaffe”. Valideringen sker innan något ändras, så ett ogiltigt anrop lämnar vagnen orörd.`,hint:`LäggTill: kontrollera st, sedan sortiment.Any(p => p.Namn == namn), och gör antal[namn] = Antal(namn) + st. TaBort: ContainsKey, minska, och Remove om det blev 0.`},{type:`code`,prompt:"Del 3: Lägg till `Totalt()` som räknar ut summan för hela vagnen, och `Kvitto()` som returnerar en rad per vara i bokstavsordning, till exempel `3 x Bulle = 45.00 kr`. Använd LINQ, och tänk på att en tom vagn ska kosta 0.",starter:`var sortiment = new List<Produkt> { new Produkt("Kaffe", 49.9), new Produkt("Bulle", 15), new Produkt("Te", 29) };
var vagn = new Kundvagn(sortiment);
Console.WriteLine($"Tom vagn: {vagn.Totalt():F2} kr");
vagn.LäggTill("Kaffe", 2);
vagn.LäggTill("Bulle", 3);
vagn.LäggTill("Te");
vagn.TaBort("Te");
foreach (string rad in vagn.Kvitto())
{
    Console.WriteLine(rad);
}
Console.WriteLine($"Totalt: {vagn.Totalt():F2} kr");

class Produkt
{
    public string Namn { get; }
    public double Pris { get; }

    public Produkt(string namn, double pris)
    {
        if (string.IsNullOrWhiteSpace(namn))
        {
            throw new ArgumentException("Namn saknas");
        }
        if (pris < 0)
        {
            throw new ArgumentException("Priset kan inte vara negativt");
        }
        Namn = namn;
        Pris = pris;
    }

    public override string ToString()
    {
        return $"{Namn} {Pris:F2} kr";
    }
}

class Kundvagn
{
    private List<Produkt> sortiment;
    private Dictionary<string, int> antal = new Dictionary<string, int>();

    public Kundvagn(List<Produkt> sortiment)
    {
        this.sortiment = sortiment;
    }

    public int AntalVaror => antal.Values.Sum();

    public int Antal(string namn)
    {
        if (antal.TryGetValue(namn, out int st))
        {
            return st;
        }
        return 0;
    }

    public void LäggTill(string namn, int st = 1)
    {
        if (st < 1)
        {
            throw new ArgumentException("Antal måste vara minst 1");
        }
        if (!sortiment.Any(p => p.Namn == namn))
        {
            throw new InvalidOperationException($"{namn} finns inte i sortimentet");
        }
        antal[namn] = Antal(namn) + st;
    }

    public void TaBort(string namn)
    {
        if (!antal.ContainsKey(namn))
        {
            throw new InvalidOperationException($"{namn} finns inte i kundvagnen");
        }
        antal[namn]--;
        if (antal[namn] == 0)
        {
            antal.Remove(namn);
        }
    }

    public double Totalt()
    {
        return 0;
    }

    public List<string> Kvitto()
    {
        return new List<string>();
    }
}
`,output:`Tom vagn: 0.00 kr
3 x Bulle = 45.00 kr
2 x Kaffe = 99.80 kr
Totalt: 144.80 kr`,require:[n(`\\.Sum\\s*\\(`,`Räkna totalen med Sum.`),n(`\\.OrderBy\\s*\\(`,`Sortera kvittot med OrderBy.`)],solution:`var sortiment = new List<Produkt> { new Produkt("Kaffe", 49.9), new Produkt("Bulle", 15), new Produkt("Te", 29) };
var vagn = new Kundvagn(sortiment);
Console.WriteLine($"Tom vagn: {vagn.Totalt():F2} kr");
vagn.LäggTill("Kaffe", 2);
vagn.LäggTill("Bulle", 3);
vagn.LäggTill("Te");
vagn.TaBort("Te");
foreach (string rad in vagn.Kvitto())
{
    Console.WriteLine(rad);
}
Console.WriteLine($"Totalt: {vagn.Totalt():F2} kr");

class Produkt
{
    public string Namn { get; }
    public double Pris { get; }

    public Produkt(string namn, double pris)
    {
        if (string.IsNullOrWhiteSpace(namn))
        {
            throw new ArgumentException("Namn saknas");
        }
        if (pris < 0)
        {
            throw new ArgumentException("Priset kan inte vara negativt");
        }
        Namn = namn;
        Pris = pris;
    }

    public override string ToString()
    {
        return $"{Namn} {Pris:F2} kr";
    }
}

class Kundvagn
{
    private List<Produkt> sortiment;
    private Dictionary<string, int> antal = new Dictionary<string, int>();

    public Kundvagn(List<Produkt> sortiment)
    {
        this.sortiment = sortiment;
    }

    public int AntalVaror => antal.Values.Sum();

    public int Antal(string namn)
    {
        if (antal.TryGetValue(namn, out int st))
        {
            return st;
        }
        return 0;
    }

    public void LäggTill(string namn, int st = 1)
    {
        if (st < 1)
        {
            throw new ArgumentException("Antal måste vara minst 1");
        }
        if (!sortiment.Any(p => p.Namn == namn))
        {
            throw new InvalidOperationException($"{namn} finns inte i sortimentet");
        }
        antal[namn] = Antal(namn) + st;
    }

    public void TaBort(string namn)
    {
        if (!antal.ContainsKey(namn))
        {
            throw new InvalidOperationException($"{namn} finns inte i kundvagnen");
        }
        antal[namn]--;
        if (antal[namn] == 0)
        {
            antal.Remove(namn);
        }
    }

    private double Pris(string namn)
    {
        return sortiment.First(p => p.Namn == namn).Pris;
    }

    public double Totalt()
    {
        return antal.Sum(rad => Pris(rad.Key) * rad.Value);
    }

    public List<string> Kvitto()
    {
        var rader = new List<string>();
        foreach (string namn in antal.Keys.OrderBy(n => n))
        {
            rader.Add($"{antal[namn]} x {namn} = {Pris(namn) * antal[namn]:F2} kr");
        }
        return rader;
    }
}`,explain:`Vagnen sparar bara namn och antal, så priset hämtas från sortimentet. En privat Pris-metod gör att både Totalt och Kvitto kan använda samma uppslag. Sum på en tom samling ger 0 helt automatiskt.`,hint:`Skriv private double Pris(string namn) med sortiment.First(...). Totalt: antal.Sum(rad => Pris(rad.Key) * rad.Value).`},{type:`code`,prompt:'Del 4: Lägg till `AttBetala(kod)` som använder en switch på rabattkoden (utan mellanslag runt och oavsett stora och små bokstäver). Tom kod ger fullt pris, `STUDENT` ger 10 % rabatt, `VIP` och `PERSONAL` ger 20 % rabatt, och `FIKA` ger 20 kr rabatt men kastar `InvalidOperationException("FIKA kräver minst 100 kr")` om totalen är under 100. Alla andra koder ger `ArgumentException("Okänd rabattkod: KOD")`.',starter:`var sortiment = new List<Produkt> { new Produkt("Kaffe", 49.9), new Produkt("Bulle", 15) };
var vagn = new Kundvagn(sortiment);
vagn.LäggTill("Kaffe", 2);
vagn.LäggTill("Bulle");
string[] koder = {"", "student", " Vip ", "FIKA", "GRATIS"};
foreach (string kod in koder)
{
    try
    {
        Console.WriteLine($"[{kod.Trim()}] {vagn.AttBetala(kod):F2} kr");
    }
    catch (Exception e)
    {
        Console.WriteLine($"[{kod.Trim()}] {e.Message}");
    }
}
var liten = new Kundvagn(sortiment);
liten.LäggTill("Bulle");
try
{
    Console.WriteLine(liten.AttBetala("fika"));
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}

class Produkt
{
    public string Namn { get; }
    public double Pris { get; }

    public Produkt(string namn, double pris)
    {
        if (string.IsNullOrWhiteSpace(namn))
        {
            throw new ArgumentException("Namn saknas");
        }
        if (pris < 0)
        {
            throw new ArgumentException("Priset kan inte vara negativt");
        }
        Namn = namn;
        Pris = pris;
    }

    public override string ToString()
    {
        return $"{Namn} {Pris:F2} kr";
    }
}

class Kundvagn
{
    private List<Produkt> sortiment;
    private Dictionary<string, int> antal = new Dictionary<string, int>();

    public Kundvagn(List<Produkt> sortiment)
    {
        this.sortiment = sortiment;
    }

    public int AntalVaror => antal.Values.Sum();

    public int Antal(string namn)
    {
        if (antal.TryGetValue(namn, out int st))
        {
            return st;
        }
        return 0;
    }

    public void LäggTill(string namn, int st = 1)
    {
        if (st < 1)
        {
            throw new ArgumentException("Antal måste vara minst 1");
        }
        if (!sortiment.Any(p => p.Namn == namn))
        {
            throw new InvalidOperationException($"{namn} finns inte i sortimentet");
        }
        antal[namn] = Antal(namn) + st;
    }

    public void TaBort(string namn)
    {
        if (!antal.ContainsKey(namn))
        {
            throw new InvalidOperationException($"{namn} finns inte i kundvagnen");
        }
        antal[namn]--;
        if (antal[namn] == 0)
        {
            antal.Remove(namn);
        }
    }

    private double Pris(string namn)
    {
        return sortiment.First(p => p.Namn == namn).Pris;
    }

    public double Totalt()
    {
        return antal.Sum(rad => Pris(rad.Key) * rad.Value);
    }

    public List<string> Kvitto()
    {
        var rader = new List<string>();
        foreach (string namn in antal.Keys.OrderBy(n => n))
        {
            rader.Add($"{antal[namn]} x {namn} = {Pris(namn) * antal[namn]:F2} kr");
        }
        return rader;
    }

    public double AttBetala(string kod)
    {
        return Totalt();
    }
}
`,output:`[] 114.80 kr
[student] 103.32 kr
[Vip] 91.84 kr
[FIKA] 94.80 kr
[GRATIS] Okänd rabattkod: GRATIS
FIKA kräver minst 100 kr`,require:[n(`\\bswitch\\s*\\(`,`Välj rabatt med en switch-sats.`)],solution:`var sortiment = new List<Produkt> { new Produkt("Kaffe", 49.9), new Produkt("Bulle", 15) };
var vagn = new Kundvagn(sortiment);
vagn.LäggTill("Kaffe", 2);
vagn.LäggTill("Bulle");
string[] koder = {"", "student", " Vip ", "FIKA", "GRATIS"};
foreach (string kod in koder)
{
    try
    {
        Console.WriteLine($"[{kod.Trim()}] {vagn.AttBetala(kod):F2} kr");
    }
    catch (Exception e)
    {
        Console.WriteLine($"[{kod.Trim()}] {e.Message}");
    }
}
var liten = new Kundvagn(sortiment);
liten.LäggTill("Bulle");
try
{
    Console.WriteLine(liten.AttBetala("fika"));
}
catch (InvalidOperationException e)
{
    Console.WriteLine(e.Message);
}

class Produkt
{
    public string Namn { get; }
    public double Pris { get; }

    public Produkt(string namn, double pris)
    {
        if (string.IsNullOrWhiteSpace(namn))
        {
            throw new ArgumentException("Namn saknas");
        }
        if (pris < 0)
        {
            throw new ArgumentException("Priset kan inte vara negativt");
        }
        Namn = namn;
        Pris = pris;
    }

    public override string ToString()
    {
        return $"{Namn} {Pris:F2} kr";
    }
}

class Kundvagn
{
    private List<Produkt> sortiment;
    private Dictionary<string, int> antal = new Dictionary<string, int>();

    public Kundvagn(List<Produkt> sortiment)
    {
        this.sortiment = sortiment;
    }

    public int AntalVaror => antal.Values.Sum();

    public int Antal(string namn)
    {
        if (antal.TryGetValue(namn, out int st))
        {
            return st;
        }
        return 0;
    }

    public void LäggTill(string namn, int st = 1)
    {
        if (st < 1)
        {
            throw new ArgumentException("Antal måste vara minst 1");
        }
        if (!sortiment.Any(p => p.Namn == namn))
        {
            throw new InvalidOperationException($"{namn} finns inte i sortimentet");
        }
        antal[namn] = Antal(namn) + st;
    }

    public void TaBort(string namn)
    {
        if (!antal.ContainsKey(namn))
        {
            throw new InvalidOperationException($"{namn} finns inte i kundvagnen");
        }
        antal[namn]--;
        if (antal[namn] == 0)
        {
            antal.Remove(namn);
        }
    }

    private double Pris(string namn)
    {
        return sortiment.First(p => p.Namn == namn).Pris;
    }

    public double Totalt()
    {
        return antal.Sum(rad => Pris(rad.Key) * rad.Value);
    }

    public List<string> Kvitto()
    {
        var rader = new List<string>();
        foreach (string namn in antal.Keys.OrderBy(n => n))
        {
            rader.Add($"{antal[namn]} x {namn} = {Pris(namn) * antal[namn]:F2} kr");
        }
        return rader;
    }

    public double AttBetala(string kod)
    {
        double totalt = Totalt();
        switch (kod.Trim().ToUpper())
        {
            case "":
                return totalt;
            case "STUDENT":
                return totalt * 0.9;
            case "VIP":
            case "PERSONAL":
                return totalt * 0.8;
            case "FIKA":
                if (totalt < 100)
                {
                    throw new InvalidOperationException("FIKA kräver minst 100 kr");
                }
                return totalt - 20;
            default:
                throw new ArgumentException($"Okänd rabattkod: {kod.Trim()}");
        }
    }
}`,explain:`Genom att normalisera koden med Trim och ToUpper innan switchen behöver varje case bara skrivas en gång. VIP och PERSONAL delar kod med staplade case, och default ser till att en felstavad kod aldrig ger rabatt av misstag.`,hint:`switch (kod.Trim().ToUpper()) med case "", case "STUDENT", staplade case "VIP" och "PERSONAL", case "FIKA" och default som kastar.`}]},{id:`cs-grades`,title:`Slutprojekt: betygsrapport`,tier:5,text:"I det sista projektet läser du in rådata, ungefär som från en exporterad fil, och gör om den till en betygsrapport. Riktig data är aldrig perfekt: det saknas fält, någon har skrivit text där det skulle stå ett tal och poäng hamnar utanför skalan.\n\nEn robust inläsning hoppar över trasiga rader i stället för att krascha. Därför använder du `int.TryParse` och inte `int.Parse`. Sedan grupperar du per elev med en `Dictionary<string, List<int>>`, räknar snitt, sätter betyg med en switch och sorterar rapporten med LINQ.",example:`// 1. En rad med data
string rad = "Ada;Matte;85";
// 2. Dela upp raden
string[] delar = rad.Split(';');
// 3. Tolka poängen säkert
if (int.TryParse(delar[2], out int poäng))
{
    Console.WriteLine($"{delar[0]} fick {poäng} poäng i {delar[1]}");
}
Console.WriteLine(int.TryParse("åttio", out int fel));`,exercises:[{type:`code`,prompt:"Del 1: Skriv `static int Poäng(string rad)` som tolkar en rad som `Ada;Matte;85` och returnerar poängen. Mellanslag runt fälten är okej. Om raden inte har exakt tre fält, om namnet är tomt, om poängen inte är ett heltal eller om den ligger utanför 0 till 100 ska metoden returnera -1.",starter:`static int Poäng(string rad)
{
}
`,tests:[{fn:`Poäng`,args:[`Ada;Matte;85`],expect:85},{fn:`Poäng`,args:[` Ada ; Matte ; 90 `],expect:90,edge:`mellanslag runt fälten`},{fn:`Poäng`,args:[`Ada;Matte;0`],expect:0,edge:`0 är en giltig poäng`},{fn:`Poäng`,args:[`Ada;Matte`],expect:-1,edge:`för få fält`},{fn:`Poäng`,args:[`Ada;Matte;85;extra`],expect:-1,edge:`för många fält`},{fn:`Poäng`,args:[`Ada;Matte;åttio`],expect:-1,edge:`inte ett tal`},{fn:`Poäng`,args:[`Ada;Matte;101`],expect:-1,edge:`över 100`},{fn:`Poäng`,args:[` ;Matte;50`],expect:-1,edge:`namn saknas`},{fn:`Poäng`,args:[``],expect:-1,edge:`tom rad`}],require:[n(`int\\.TryParse`,`Använd int.TryParse så att en trasig rad inte kraschar programmet.`)],forbid:[n(`int\\.Parse\\s*\\(`,`Använd int.TryParse i stället för int.Parse.`)],solution:`static int Poäng(string rad)
{
    string[] delar = rad.Split(';');
    if (delar.Length != 3)
    {
        return -1;
    }
    if (delar[0].Trim() == "")
    {
        return -1;
    }
    if (!int.TryParse(delar[2].Trim(), out int poäng))
    {
        return -1;
    }
    if (poäng < 0 || poäng > 100)
    {
        return -1;
    }
    return poäng;
}`,explain:`Varje kontroll stoppar ett sätt som raden kan vara trasig på. TryParse returnerar false i stället för att kasta FormatException, så metoden behöver inte ens try och catch.`,hint:`Split(';'), kontrollera Length == 3, Trim på namnet och int.TryParse(delar[2].Trim(), out int poäng). Kontrollera sist intervallet.`},{type:`code`,prompt:"Del 2: Skriv `static Dictionary<string, List<int>> Gruppera(string[] rader)` som samlar alla giltiga poäng per elev (namnet utan mellanslag runt). Trasiga rader hoppas över. Använd Poäng från del 1.",starter:`static int Poäng(string rad)
{
    string[] delar = rad.Split(';');
    if (delar.Length != 3)
    {
        return -1;
    }
    if (delar[0].Trim() == "")
    {
        return -1;
    }
    if (!int.TryParse(delar[2].Trim(), out int poäng))
    {
        return -1;
    }
    if (poäng < 0 || poäng > 100)
    {
        return -1;
    }
    return poäng;
}

static Dictionary<string, List<int>> Gruppera(string[] rader)
{
}
`,tests:[{fn:`Gruppera`,args:[[`Ada;Matte;85`,`Linus;Matte;70`,`Ada;Svenska;90`]],expect:{Ada:[85,90],Linus:[70]}},{fn:`Gruppera`,args:[[` Ada ;Matte;85`,`Ada;Fysik;x`,`Ada;Svenska;60`]],expect:{Ada:[85,60]},edge:`mellanslag i namnet och en trasig rad`},{fn:`Gruppera`,args:[[`fel`,`;;`]],expect:{},edge:`bara trasiga rader`},{fn:`Gruppera`,args:[[]],expect:{},edge:`inga rader`}],require:[n(`Gruppera[\\s\\S]*Poäng\\s*\\(`,`Använd Poäng från del 1 i Gruppera.`)],solution:`static int Poäng(string rad)
{
    string[] delar = rad.Split(';');
    if (delar.Length != 3)
    {
        return -1;
    }
    if (delar[0].Trim() == "")
    {
        return -1;
    }
    if (!int.TryParse(delar[2].Trim(), out int poäng))
    {
        return -1;
    }
    if (poäng < 0 || poäng > 100)
    {
        return -1;
    }
    return poäng;
}

static Dictionary<string, List<int>> Gruppera(string[] rader)
{
    var resultat = new Dictionary<string, List<int>>();
    foreach (string rad in rader)
    {
        int p = Poäng(rad);
        if (p == -1)
        {
            continue;
        }
        string namn = rad.Split(';')[0].Trim();
        if (!resultat.ContainsKey(namn))
        {
            resultat[namn] = new List<int>();
        }
        resultat[namn].Add(p);
    }
    return resultat;
}`,explain:`Mönstret ”skapa listan om nyckeln saknas, lägg sedan till” är standardsättet att gruppera med en Dictionary. continue hoppar direkt till nästa rad när raden är trasig.`,hint:`Hoppa över raden med continue om Poäng(rad) är -1. Skapa en ny List<int> om namnet inte finns som nyckel, och lägg sedan till poängen.`},{type:`code`,prompt:"Del 3: Skriv `static string Betyg(double snitt)` som ger A för 90 och uppåt, B för 80 till 89, C för 70 till 79, D för 60 till 69, E för 50 till 59 och annars F. Använd en switch på tiotalet, `(int)snitt / 10`.",starter:`static string Betyg(double snitt)
{
}
`,tests:[{fn:`Betyg`,args:[95],expect:`A`},{fn:`Betyg`,args:[100],expect:`A`,edge:`full pott`},{fn:`Betyg`,args:[89.9],expect:`B`,edge:`precis under A`},{fn:`Betyg`,args:[72],expect:`C`},{fn:`Betyg`,args:[60],expect:`D`,edge:`precis på gränsen`},{fn:`Betyg`,args:[50],expect:`E`},{fn:`Betyg`,args:[49.5],expect:`F`,edge:`precis under E`},{fn:`Betyg`,args:[0],expect:`F`}],require:[n(`\\bswitch\\s*\\(`,`Använd en switch-sats.`)],solution:`static string Betyg(double snitt)
{
    switch ((int)snitt / 10)
    {
        case 10:
        case 9:
            return "A";
        case 8:
            return "B";
        case 7:
            return "C";
        case 6:
            return "D";
        case 5:
            return "E";
        default:
            return "F";
    }
}`,explain:`(int) kapar decimalerna, så 89.9 blir 89 och 89 / 10 blir 8. Staplade case 10 och 9 gör att även 100 blir A.`,hint:`switch ((int)snitt / 10) med case 10: case 9: return "A"; och så vidare ner till default: return "F";`},{type:`code`,prompt:"Del 4: Skriv `static List<string> Rapport(string[] rader)` som returnerar en rad per elev, till exempel `Ada: 87.5 (B)` med snittet på en decimal. Högst snitt kommer först, och vid lika snitt sorteras eleverna i bokstavsordning. Använd metoderna från tidigare delar.",starter:`static int Poäng(string rad)
{
    string[] delar = rad.Split(';');
    if (delar.Length != 3)
    {
        return -1;
    }
    if (delar[0].Trim() == "")
    {
        return -1;
    }
    if (!int.TryParse(delar[2].Trim(), out int poäng))
    {
        return -1;
    }
    if (poäng < 0 || poäng > 100)
    {
        return -1;
    }
    return poäng;
}

static Dictionary<string, List<int>> Gruppera(string[] rader)
{
    var resultat = new Dictionary<string, List<int>>();
    foreach (string rad in rader)
    {
        int p = Poäng(rad);
        if (p == -1)
        {
            continue;
        }
        string namn = rad.Split(';')[0].Trim();
        if (!resultat.ContainsKey(namn))
        {
            resultat[namn] = new List<int>();
        }
        resultat[namn].Add(p);
    }
    return resultat;
}

static string Betyg(double snitt)
{
    switch ((int)snitt / 10)
    {
        case 10:
        case 9:
            return "A";
        case 8:
            return "B";
        case 7:
            return "C";
        case 6:
            return "D";
        case 5:
            return "E";
        default:
            return "F";
    }
}

static List<string> Rapport(string[] rader)
{
}
`,tests:[{fn:`Rapport`,args:[[`Ada;Matte;80`,`Ada;Svenska;95`,`Linus;Matte;92`,`Grace;Matte;x`,`Bo;Matte;87`,`Bo;Fysik;88`]],expect:[`Linus: 92.0 (A)`,`Ada: 87.5 (B)`,`Bo: 87.5 (B)`],edge:`lika snitt och en trasig rad`},{fn:`Rapport`,args:[[`Cy;Matte;49`,`Cy;Fysik;50`]],expect:[`Cy: 49.5 (F)`],edge:`snittet avgör, inte enskilda poäng`},{fn:`Rapport`,args:[[`x;y`,`Ada;Matte;101`]],expect:[],edge:`bara trasiga rader`},{fn:`Rapport`,args:[[]],expect:[],edge:`inga rader`}],require:[n(`OrderByDescending`,`Sortera med OrderByDescending.`),n(`Rapport[\\s\\S]*Gruppera\\s*\\(`,`Använd Gruppera i Rapport.`)],solution:`static int Poäng(string rad)
{
    string[] delar = rad.Split(';');
    if (delar.Length != 3)
    {
        return -1;
    }
    if (delar[0].Trim() == "")
    {
        return -1;
    }
    if (!int.TryParse(delar[2].Trim(), out int poäng))
    {
        return -1;
    }
    if (poäng < 0 || poäng > 100)
    {
        return -1;
    }
    return poäng;
}

static Dictionary<string, List<int>> Gruppera(string[] rader)
{
    var resultat = new Dictionary<string, List<int>>();
    foreach (string rad in rader)
    {
        int p = Poäng(rad);
        if (p == -1)
        {
            continue;
        }
        string namn = rad.Split(';')[0].Trim();
        if (!resultat.ContainsKey(namn))
        {
            resultat[namn] = new List<int>();
        }
        resultat[namn].Add(p);
    }
    return resultat;
}

static string Betyg(double snitt)
{
    switch ((int)snitt / 10)
    {
        case 10:
        case 9:
            return "A";
        case 8:
            return "B";
        case 7:
            return "C";
        case 6:
            return "D";
        case 5:
            return "E";
        default:
            return "F";
    }
}

static List<string> Rapport(string[] rader)
{
    Dictionary<string, List<int>> elever = Gruppera(rader);
    var ordning = elever.Keys
        .OrderByDescending(namn => elever[namn].Average())
        .ThenBy(namn => namn);
    var rapport = new List<string>();
    foreach (string namn in ordning)
    {
        double snitt = elever[namn].Average();
        rapport.Add($"{namn}: {snitt:F1} ({Betyg(snitt)})");
    }
    return rapport;
}`,explain:`Rapport gör nästan inget själv. Den kopplar ihop små, testade metoder: Poäng tolkar, Gruppera samlar, Betyg bedömer och LINQ sorterar. Så ser bra kod ut i riktiga projekt.`,hint:`Hämta elever = Gruppera(rader). Sortera elever.Keys med OrderByDescending på elever[namn].Average() och ThenBy(namn => namn), och lägg till en text per elev i en ny List<string> med foreach.`}]}]}],i=(e,t)=>({re:e,msg:t}),a=[{id:`cs13`,title:`Program som pratar med dig`,lessons:[{id:`cs-readline`,title:`Fråga användaren med ReadLine`,tier:2,text:'Hittills har dina program gjort exakt samma sak varje gång. Med `Console.ReadLine()` kan programmet fråga användaren och få ett nytt svar varje gång. Programmet stannar, väntar tills användaren har skrivit en rad och tryckt Enter, och ger sedan tillbaka raden som en `string`.\n\nInnan du läser är det bra att visa en fråga. `Console.Write` skriver text **utan** radbrytning, så svaret hamnar direkt efter frågan. Lägg ett mellanslag sist i frågan, `Console.Write("Namn? ");`, så klistras svaret inte ihop med frågetecknet.\n\nReadLine ger alltid text, även när användaren skriver 42. Hur du gör om texten till ett tal lär du dig i nästa lektion.\n\n**Skillnad mot en riktig dator:** I Kodstig är indatan bestämd i förväg, en rad per ReadLine, och det som "skrivs" syns inte i utskriften. Därför blir utskriften `Namn? Hej Ali` i stället för att Ali står på en egen rad. Om indatan tar slut ger ReadLine `null`, precis som i .NET.',example:`// 1. Visa en fråga utan radbrytning
Console.Write("Vad heter du? ");
// 2. Läs svaret som text
string namn = Console.ReadLine();
// 3. Använd svaret
Console.WriteLine($"Hej {namn}!");
// 4. Fråga en gång till
Console.Write("Favoritmat? ");
string mat = Console.ReadLine();
Console.WriteLine($"{namn} gillar {mat}.");`,exampleInput:`Ali
pizza`,exercises:[{type:`choice`,prompt:"Vad skrivs ut när indatan är `Malmö`?",code:`Console.Write("Stad? ");
string stad = Console.ReadLine();
Console.WriteLine("Du bor i " + stad);`,input:`Malmö`,options:[`Du bor i Malmö`,`Stad? Du bor i Malmö`,`Stad? Du bor i stad`],answer:1,out:!0,explain:`Console.Write skriver frågan utan radbrytning. Sedan läses Malmö in, och WriteLine skriver ut resten på samma rad.`,why:{0:`Frågan skrivs också ut. Console.Write("Stad? ") körs först.`,2:`stad är en variabel, inte texten "stad". Den innehåller det som lästes in.`}},{type:`choice`,prompt:"Användaren skriver `42`. Vilken typ har värdet som `Console.ReadLine()` ger tillbaka?",options:[`int`,`Det beror på vad användaren skriver`,`string`],answer:2,explain:`ReadLine ger alltid en string. Tecknen 4 och 2 är text tills du själv gör om dem till ett tal.`,why:{0:`C# gissar aldrig typen åt dig. Texten "42" måste göras om till int i ett eget steg.`,1:`Typen är alltid densamma: string. Annars skulle kompilatorn inte kunna kontrollera din kod i förväg.`}},{type:`order`,prompt:"Ordna raderna så att programmet frågar efter ett smeknamn, säger hej och sedan visar hur långt namnet är. Indata: `Zorro`.",input:`Zorro`,lines:[`Console.WriteLine("== Profil ==");`,`Console.Write("Smeknamn? ");`,`string smeknamn = Console.ReadLine();`,`Console.WriteLine($"Hej {smeknamn}!");`,`Console.WriteLine($"Ditt namn har {smeknamn.Length} tecken.");`],output:`== Profil ==
Smeknamn? Hej Zorro!
Ditt namn har 5 tecken.`,alt:[[`Console.WriteLine("== Profil ==");`,`string smeknamn = Console.ReadLine();`,`Console.Write("Smeknamn? ");`,`Console.WriteLine($"Hej {smeknamn}!");`,`Console.WriteLine($"Ditt namn har {smeknamn.Length} tecken.");`],[`string smeknamn = Console.ReadLine();`,`Console.WriteLine("== Profil ==");`,`Console.Write("Smeknamn? ");`,`Console.WriteLine($"Hej {smeknamn}!");`,`Console.WriteLine($"Ditt namn har {smeknamn.Length} tecken.");`]],distractors:[{line:`string smeknamn = Console.WriteLine();`,why:`WriteLine skriver ut text. Det är ReadLine som läser in.`}],explain:`Rubriken och frågan visas först, sedan läses svaret in. Variabeln måste finnas innan den används. Kodstig godkänner också att läsningen står före frågan, men på en riktig dator skulle användaren då behöva skriva innan frågan syns.`,hint:`Rubrik, fråga, läs in, och sedan de två raderna som använder smeknamn.`},{type:`fill`,prompt:`Fyll i metoden som läser en rad från användaren.`,code:`Console.Write("Vilket lag hejar du på? ");
string lag = Console.___();
Console.WriteLine("Heja " + lag + "!");`,input:`Bajen`,answers:[[`ReadLine`]],output:`Vilket lag hejar du på? Heja Bajen!`,explain:`Console.ReadLine() läser en hel rad och ger tillbaka den som text.`,hint:`Metoden heter "läs rad" på engelska.`},{type:`code`,prompt:"Skriv ett program som frågar `Vad heter du? ` och sedan skriver ut `Välkommen, NAMN!` med namnet som lästes in.",starter:`// Fråga efter namnet och hälsa
`,runs:[{input:`Ali`,output:`Vad heter du? Välkommen, Ali!`},{input:`Maja`,output:`Vad heter du? Välkommen, Maja!`}],require:[i(`Console\\.ReadLine\\s*\\(`,`Läs namnet med Console.ReadLine().`),i(`Console\\.Write\\s*\\(`,`Visa frågan med Console.Write, så hamnar svaret på samma rad.`)],solution:`Console.Write("Vad heter du? ");
string namn = Console.ReadLine();
Console.WriteLine($"Välkommen, {namn}!");`,explain:`Programmet körs med två olika namn och ska fungera med båda. Därför går det inte att skriva in namnet i koden.`,hint:`Console.Write("Vad heter du? "); sedan string namn = Console.ReadLine(); och sist WriteLine.`},{type:`code`,prompt:"Gör ett litet kvitto. Fråga `Vara? ` och sedan `Pris? `, och skriv ut till exempel `Kvitto: Kaffe kostar 35 kr`.",starter:`Console.Write("Vara? ");
`,runs:[{input:`Kaffe
35`,output:`Vara? Pris? Kvitto: Kaffe kostar 35 kr`},{input:`Bulle
20`,output:`Vara? Pris? Kvitto: Bulle kostar 20 kr`}],require:[i(`ReadLine[\\s\\S]*ReadLine`,`Läs två rader, en för varan och en för priset.`)],solution:`Console.Write("Vara? ");
string vara = Console.ReadLine();
Console.Write("Pris? ");
string pris = Console.ReadLine();
Console.WriteLine($"Kvitto: {vara} kostar {pris} kr");`,explain:`Varje ReadLine läser nästa rad. Priset behöver inte bli ett tal här, eftersom det bara skrivs ut igen.`,hint:`Två frågor och två ReadLine, sedan en WriteLine med båda variablerna.`},{type:`debug`,prompt:`Svaret ska hamna på samma rad som frågan, men nu blir det en radbrytning efter frågan. Rätta programmet.`,starter:`Console.WriteLine("Lösenord? ");
string lösen = Console.ReadLine();
Console.WriteLine("Du skrev " + lösen.Length + " tecken.");
`,runs:[{input:`hemlig`,output:`Lösenord? Du skrev 6 tecken.`},{input:`abc`,output:`Lösenord? Du skrev 3 tecken.`}],solution:`Console.Write("Lösenord? ");
string lösen = Console.ReadLine();
Console.WriteLine("Du skrev " + lösen.Length + " tecken.");`,explain:`WriteLine lägger till en radbrytning efter texten. Write gör det inte, så nästa utskrift fortsätter på samma rad.`,hint:`Byt ut en metod på första raden.`},{type:`code`,prompt:"Gör en namnskylt. Fråga `Namn? ` och `Stad? ` och skriv ut till exempel `ALI FRÅN MALMÖ`. Ta bort mellanslag runt svaren, för användare råkar ofta skriva sådana.",starter:`// Läs namn och stad, och skriv ut skylten
`,runs:[{input:`Ali
Malmö`,output:`Namn? Stad? ALI FRÅN MALMÖ`},{input:`  Sara 
 Umeå`,output:`Namn? Stad? SARA FRÅN UMEÅ`}],require:[i(`\\.Trim\\s*\\(`,`Ta bort mellanslagen med Trim().`)],solution:`Console.Write("Namn? ");
string namn = Console.ReadLine().Trim();
Console.Write("Stad? ");
string stad = Console.ReadLine().Trim();
Console.WriteLine($"{namn} från {stad}".ToUpper());`,explain:`Trim tar bort mellanslag i början och slutet, och ToUpper gör allt till stora bokstäver. Att städa indata direkt när den läses in är en bra vana.`,hint:`Console.ReadLine().Trim() och sedan ToUpper() på texten som skrivs ut.`}]},{id:`cs-parse-input`,title:`Gör om svaret till ett tal`,tier:3,text:'ReadLine ger text, och med text går det inte att räkna: `"5" + "3"` blir `"53"`. Därför gör du om svaret med `int.Parse(text)` eller `double.Parse(text)` för decimaltal.\n\nMen användare skriver fel. Om någon skriver `fem` kastar Parse ett `FormatException`, och utan hantering kraschar programmet. Du har två verktyg: `try`/`catch (FormatException)` runt Parse, eller `int.TryParse(text, out int tal)` som returnerar false i stället för att krascha.\n\nEtt vänligt program **frågar igen** tills svaret går att använda: en `while (true)`-loop som gör `break` först när TryParse lyckas.\n\n**Skillnad mot en riktig dator:** I Kodstig är punkt alltid decimaltecken. På en dator med svenska inställningar förväntar sig `double.Parse` ofta komma, så `2.5` kan ge fel där. Felmeddelandena står dessutom på engelska i .NET.',example:`// 1. Fråga tills svaret är ett heltal
int ålder;
while (true)
{
    Console.Write("Ålder? ");
    string text = Console.ReadLine();
    // 2. Försök tolka texten
    if (int.TryParse(text, out ålder))
    {
        break;
    }
    // 3. Be om ett nytt svar
    Console.WriteLine("Skriv åldern med siffror.");
}
// 4. Nu går det att räkna
Console.WriteLine($"Nästa år är du {ålder + 1}.");`,exampleInput:`tretton
13`,exercises:[{type:`choice`,prompt:"Vad skrivs ut när indatan är `5` och `3`?",code:`string a = Console.ReadLine();
string b = Console.ReadLine();
Console.WriteLine(a + b);
Console.WriteLine(int.Parse(a) + int.Parse(b));`,input:`5
3`,options:[`8
8`,`53
8`,`53
53`],answer:1,out:!0,explain:`a + b sätter ihop två texter till "53". Efter int.Parse är de tal, och 5 + 3 blir 8.`,why:{0:`a och b är text. + mellan två texter sätter ihop dem.`,2:`int.Parse gör om texterna till tal, så andra raden räknar på riktigt.`}},{type:`order`,prompt:"Ordna raderna så att programmet läser saldot och priset och skriver ut hur mycket som blir kvar. Indata: `100` och `35`.",input:`100
35`,lines:[`int saldo = int.Parse(Console.ReadLine());`,`int pris = int.Parse(Console.ReadLine());`,`int kvar = saldo - pris;`,`Console.WriteLine($"Kvar: {kvar} kr");`],output:`Kvar: 65 kr`,distractors:[{line:`int pris = Console.ReadLine();`,why:`ReadLine ger en string. En string kan inte sparas i en int utan int.Parse.`}],explain:`Raderna läser indata i tur och ordning. Saldot kommer först i indatan, så det måste läsas först. Annars blir det 35 - 100.`,hint:`Läs saldo, läs pris, räkna, skriv ut.`},{type:`fill`,prompt:`Fyll i metoden som gör om texten till ett heltal.`,code:`Console.Write("Antal kakor? ");
int kakor = int.___(Console.ReadLine());
Console.WriteLine($"{kakor / 3} var, {kakor % 3} över");`,input:`14`,answers:[[`Parse`]],output:`Antal kakor? 4 var, 2 över`,explain:`int.Parse gör om texten "14" till talet 14. Sedan fungerar / och % som vanligt.`,hint:`Samma metod som du använde i kapitlet om undantag.`},{type:`code`,prompt:"Fråga `Celsius? ` och skriv ut temperaturen i Fahrenheit med en decimal, till exempel `68.0 °F`. Formeln är `c * 9 / 5 + 32`. Svaret kan vara ett decimaltal.",starter:`Console.Write("Celsius? ");
`,runs:[{input:`20`,output:`Celsius? 68.0 °F`},{input:`-40`,output:`Celsius? -40.0 °F`},{input:`36.6`,output:`Celsius? 97.9 °F`}],require:[i(`double\\.Parse|double\\.TryParse`,`Gör om svaret med double.Parse, eftersom det kan vara ett decimaltal.`)],solution:`Console.Write("Celsius? ");
double c = double.Parse(Console.ReadLine());
double f = c * 9 / 5 + 32;
Console.WriteLine($"{f:F1} °F");`,explain:`double.Parse klarar både 20 och 36.6. Med :F1 visas alltid exakt en decimal.`,hint:`double c = double.Parse(Console.ReadLine()); och sedan $"{f:F1} °F".`},{type:`code`,prompt:"Fråga `Ålder? ` tills svaret är ett heltal. Vid fel ska programmet skriva `Skriv ett heltal.` och fråga igen. Skriv till sist `Om fem år är du X.`",starter:`Console.Write("Ålder? ");
int ålder = int.Parse(Console.ReadLine());
Console.WriteLine($"Om fem år är du {ålder + 5}.");
`,runs:[{input:`15`,output:`Ålder? Om fem år är du 20.`},{input:`femton
15`,output:`Ålder? Skriv ett heltal.
Ålder? Om fem år är du 20.`},{input:`x

7`,output:`Ålder? Skriv ett heltal.
Ålder? Skriv ett heltal.
Ålder? Om fem år är du 12.`}],require:[i(`while`,`Använd en while-loop som frågar igen.`)],solution:`int ålder;
while (true)
{
    Console.Write("Ålder? ");
    if (int.TryParse(Console.ReadLine(), out ålder))
    {
        break;
    }
    Console.WriteLine("Skriv ett heltal.");
}
Console.WriteLine($"Om fem år är du {ålder + 5}.");`,explain:`Loopen fortsätter så länge TryParse misslyckas. När den lyckas lämnar break loopen, och ålder har ett värde. En tom rad är också fel svar.`,hint:`while (true) med Write och TryParse inuti. break när det lyckas, annars felmeddelandet.`},{type:`code`,prompt:"Skriv metoden `static int LäsHeltal(string fråga)` som visar frågan och läser tills svaret är ett heltal. Använd `int.Parse` med `try` och `catch (FormatException)`, och skriv `Fel, försök igen.` vid fel. Programmet räknar sedan ut biljettpriset: vuxen 120 kr, barn 60 kr.",starter:`int vuxna = LäsHeltal("Vuxna? ");
int barn = LäsHeltal("Barn? ");
Console.WriteLine($"Att betala: {vuxna * 120 + barn * 60} kr");

static int LäsHeltal(string fråga)
{
    return 0;
}
`,runs:[{input:`2
1`,output:`Vuxna? Barn? Att betala: 300 kr`},{input:`två
2
tre
0`,output:`Vuxna? Fel, försök igen.
Vuxna? Barn? Fel, försök igen.
Barn? Att betala: 240 kr`}],require:[i(`catch\\s*\\(\\s*FormatException`,`Fånga felet med catch (FormatException).`),i(`int\\.Parse`,`Använd int.Parse den här gången.`)],solution:`int vuxna = LäsHeltal("Vuxna? ");
int barn = LäsHeltal("Barn? ");
Console.WriteLine($"Att betala: {vuxna * 120 + barn * 60} kr");

static int LäsHeltal(string fråga)
{
    while (true)
    {
        Console.Write(fråga);
        try
        {
            return int.Parse(Console.ReadLine());
        }
        catch (FormatException)
        {
            Console.WriteLine("Fel, försök igen.");
        }
    }
}`,explain:`return inne i try lämnar både loopen och metoden när det lyckas. Vid fel tar catch över och loopen frågar igen. Nu kan du läsa hur många tal som helst med en rad kod var.`,hint:`while (true) { Console.Write(fråga); try { return int.Parse(...); } catch (FormatException) { ... } }`},{type:`debug`,prompt:"Priset kan ha ören, men programmet kraschar när någon skriver `12.50`. Rätta det så att totalen skrivs med två decimaler.",starter:`Console.Write("Pris? ");
int pris = int.Parse(Console.ReadLine());
Console.Write("Antal? ");
int antal = int.Parse(Console.ReadLine());
Console.WriteLine($"Totalt: {pris * antal:F2} kr");
`,runs:[{input:`12.50
3`,output:`Pris? Antal? Totalt: 37.50 kr`},{input:`10
2`,output:`Pris? Antal? Totalt: 20.00 kr`}],solution:`Console.Write("Pris? ");
double pris = double.Parse(Console.ReadLine());
Console.Write("Antal? ");
int antal = int.Parse(Console.ReadLine());
Console.WriteLine($"Totalt: {pris * antal:F2} kr");`,explain:`Priset kan ha decimaler och ska därför vara double. Antalet är fortfarande ett heltal, för man köper inte en halv bulle.`,hint:`Vilken typ ska priset ha? Ändra både variabeltypen och Parse-metoden.`},{type:`code`,prompt:"Be om ett betyg med `Betyg 1 till 5? ` tills svaret är ett heltal från 1 till och med 5. Skriv `Ogiltigt.` vid fel svar, både text och tal utanför intervallet. Skriv till sist `Tack för betyget X!`",starter:`// Fråga tills betyget är giltigt
`,runs:[{input:`4`,output:`Betyg 1 till 5? Tack för betyget 4!`},{input:`9
0
5`,output:`Betyg 1 till 5? Ogiltigt.
Betyg 1 till 5? Ogiltigt.
Betyg 1 till 5? Tack för betyget 5!`},{input:`fem
1`,output:`Betyg 1 till 5? Ogiltigt.
Betyg 1 till 5? Tack för betyget 1!`}],require:[i(`int\\.TryParse`,`Använd int.TryParse.`)],solution:`int betyg;
while (true)
{
    Console.Write("Betyg 1 till 5? ");
    if (int.TryParse(Console.ReadLine(), out betyg) && betyg >= 1 && betyg <= 5)
    {
        break;
    }
    Console.WriteLine("Ogiltigt.");
}
Console.WriteLine($"Tack för betyget {betyg}!");`,explain:`&& kontrollerar villkoren från vänster. Intervallet testas bara om TryParse lyckades, så betyg har alltid ett riktigt värde där.`,hint:`Samma loop som förut, men villkoret blir TryParse(...) && betyg >= 1 && betyg <= 5.`}]},{id:`cs-random`,title:`Slump med Random`,tier:3,text:"Spel, quiz och lotterier behöver slump. I C# skapar du en slumpgenerator med `Random rnd = new Random();` och ber den sedan om tal.\n\n`rnd.Next(1, 7)` ger ett heltal från 1 till 6. Det andra talet är alltså **inte** med. Det låter konstigt, men passar perfekt ihop med index: `rnd.Next(lista.Count)` ger alltid ett giltigt index från 0 till Count - 1, så `lista[rnd.Next(lista.Count)]` väljer ett slumpat element. `rnd.NextDouble()` ger ett decimaltal från 0 upp till 1, bra för chanser: `rnd.NextDouble() < 0.25` är sant ungefär var fjärde gång.\n\nFör att blanda en lista byter du plats på varje element, bakifrån, med ett slumpat element framför det. Skapa **en** Random och återanvänd den.\n\nSlumpen gör program svåra att testa. Ett knep är att lägga logiken i en metod som får talet som parameter. I Kodstig körs slumpövningar många gånger, och talen blir inte desamma som i .NET.",example:`// 1. Skapa en slumpgenerator
Random rnd = new Random();
// 2. Kasta en tärning: 1 till 6
int tärning = rnd.Next(1, 7);
Console.WriteLine($"Du slog {tärning}");
// 3. Välj ett slumpat element
List<string> mat = new List<string> { "pizza", "tacos", "soppa" };
Console.WriteLine($"Ikväll blir det {mat[rnd.Next(mat.Count)]}");
// 4. 30 procents chans
if (rnd.NextDouble() < 0.3)
{
    Console.WriteLine("Bonus: efterrätt!");
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Random rnd = new Random();
int tal = rnd.Next(5, 6);
Console.WriteLine(tal);`,options:[`5`,`6`,`Ibland 5 och ibland 6`],answer:0,out:!0,explain:`Det andra talet är inte med. Next(5, 6) kan bara ge 5.`,why:{1:`Max-talet i Next är aldrig med i resultatet.`,2:`Bara 5 ligger från 5 upp till, men inte med, 6.`}},{type:`choice`,prompt:`Vilket anrop ger ett tärningskast från 1 till 6?`,options:[`rnd.Next(1, 6)`,`rnd.Next(0, 6)`,`rnd.Next(1, 7)`],answer:2,explain:`Next(1, 7) ger 1, 2, 3, 4, 5 eller 6, eftersom 7 inte är med.`,why:{0:`Då blir det bara 1 till 5. Max-talet är inte med.`,1:`Då blir det 0 till 5. En tärning har ingen nolla.`}},{type:`order`,prompt:`Ordna raderna så att programmet kastar tre tärningar och kontrollerar att summan ligger mellan 3 och 18.`,lines:[`Random rnd = new Random();`,`int summa = 0;`,`for (int i = 0; i < 3; i++)`,`{`,`    summa += rnd.Next(1, 7);`,`}`,`Console.WriteLine(summa >= 3 && summa <= 18);`],alt:[[`int summa = 0;`,`Random rnd = new Random();`,`for (int i = 0; i < 3; i++)`,`{`,`    summa += rnd.Next(1, 7);`,`}`,`Console.WriteLine(summa >= 3 && summa <= 18);`]],output:`True`,distractors:[{line:`    summa += rnd.Next(1, 6);`,why:`Next(1, 6) ger bara 1 till 5. En tärning ska kunna visa 6.`}],explain:`Generatorn och summan skapas före loopen. Loopen kastar tre gånger, och summan blir alltid minst 3 och högst 18.`,hint:`Skapa först det loopen behöver. Utskriften kommer efter loopen.`},{type:`fill`,prompt:`Fyll i så att programmet väljer ett slumpat index som alltid finns i listan.`,code:`Random rnd = new Random();
List<string> vinster = new List<string> { "Godis", "Biobiljett", "Nyckelring" };
int index = rnd.Next(vinster.___);
Console.WriteLine("Du vann: " + vinster[index]);`,answers:[[`Count`]],explain:`Next(vinster.Count) ger 0, 1 eller 2. Det är precis de index som finns i en lista med tre element.`,hint:`Egenskapen som säger hur många element listan har.`},{type:`code`,prompt:"Skriv ett program som kastar en tärning och skriver ut `Du slog X`, där X är 1 till 6.",starter:`// Kasta en tärning
`,runs:[{outputRe:`Du slog [1-6]`,repeat:20,expectText:`Du slog och ett tal från 1 till 6`}],require:[i(`new\\s+Random\\s*\\(`,`Skapa en slumpgenerator med new Random().`),i(`\\.Next\\s*\\(`,`Slumpa talet med Next.`)],solution:`Random rnd = new Random();
int tärning = rnd.Next(1, 7);
Console.WriteLine($"Du slog {tärning}");`,explain:`Programmet körs 20 gånger med olika slump, och varje gång måste talet vara från 1 till 6.`,hint:`Next(1, 7) ger 1 till 6.`},{type:`code`,prompt:"Skriv ett program som slumpar fram dagens mellanmål ur listan och skriver ut till exempel `Dagens mellanmål: banan`.",starter:`Random rnd = new Random();
List<string> mellanmål = new List<string> { "äpple", "banan", "yoghurt", "smörgås" };
`,runs:[{outputRe:`Dagens mellanmål: (äpple|banan|yoghurt|smörgås)`,repeat:20,expectText:`Dagens mellanmål: och något från listan`}],require:[i(`\\.Next\\s*\\(\\s*mellanmål\\.Count\\s*\\)`,`Slumpa ett index med rnd.Next(mellanmål.Count).`)],solution:`Random rnd = new Random();
List<string> mellanmål = new List<string> { "äpple", "banan", "yoghurt", "smörgås" };
string valt = mellanmål[rnd.Next(mellanmål.Count)];
Console.WriteLine($"Dagens mellanmål: {valt}");`,explain:`Next(mellanmål.Count) ger ett index från 0 till 3. Om listan växer fungerar koden ändå, eftersom Count följer med.`,hint:`mellanmål[rnd.Next(mellanmål.Count)]`},{type:`code`,prompt:"Skriv `static int TillTärning(double r)` som gör om ett slumptal från 0 upp till 1 (som NextDouble ger) till ett tärningskast 1 till 6. Tips: `(int)(r * 6) + 1`. Metoden har ingen slump i sig, så den går att testa exakt.",starter:`static int TillTärning(double r)
{
    return 0;
}
`,tests:[{fn:`TillTärning`,args:[0],expect:1,edge:`minsta värdet`},{fn:`TillTärning`,args:[.5],expect:4},{fn:`TillTärning`,args:[.2],expect:2},{fn:`TillTärning`,args:[.999],expect:6,edge:`nästan 1`}],solution:`static int TillTärning(double r)
{
    return (int)(r * 6) + 1;
}`,explain:`r * 6 ligger från 0 upp till 6. (int) kapar decimalerna till 0 till 5, och + 1 ger 1 till 6. Ungefär så gör Next(1, 7) inuti.`,hint:`Multiplicera med 6, gör om till int och lägg till 1.`},{type:`code`,prompt:'Blanda kortleken och skriv ut den med `string.Join(", ", kort)`. Gå bakifrån: för varje plats i, välj ett slumpat j från 0 till i och byt plats på kort[i] och kort[j].',starter:`Random rnd = new Random();
List<string> kort = new List<string> { "A", "B", "C", "D", "E" };
// Blanda här

Console.WriteLine(string.Join(", ", kort));
`,runs:[{outputRe:`(?=.*A)(?=.*B)(?=.*C)(?=.*D)(?=.*E)[A-E](, [A-E]){4}`,repeat:20,expectText:`alla fem korten A till E en gång var, i någon ordning`}],require:[i(`\\bfor\\b`,`Använd en for-loop som går bakifrån.`),i(`\\.Next\\s*\\(`,`Slumpa j med rnd.Next.`)],solution:`Random rnd = new Random();
List<string> kort = new List<string> { "A", "B", "C", "D", "E" };
for (int i = kort.Count - 1; i > 0; i--)
{
    int j = rnd.Next(i + 1);
    string tmp = kort[i];
    kort[i] = kort[j];
    kort[j] = tmp;
}
Console.WriteLine(string.Join(", ", kort));`,explain:`Varje kort byter plats med ett slumpat kort framför sig, så alla ordningar blir lika troliga. Byten tappar aldrig ett kort, därför finns alla fem kvar.`,hint:`for (int i = kort.Count - 1; i > 0; i--), sedan int j = rnd.Next(i + 1); och ett byte med en tillfällig variabel.`}]},{id:`cs-menu-loop`,title:`Menyer med while (true)`,tier:4,text:"Många program fungerar som en meny: bankomaten, en kassa eller en att göra-lista. De visar val, läser vad användaren vill, gör det och börjar om. Det upprepas tills användaren väljer att avsluta.\n\nMönstret är en `while (true)`-loop. Inuti läser du valet, och när det är avslutningsvalet lämnar du loopen med `break`. Vanliga fall hanteras med en `switch`.\n\n**Se upp:** `break` inne i ett `case` lämnar bara switchen, inte loopen. Kontrollera därför avslutet med en `if` före switchen.\n\nLägg listor och Dictionary **före** loopen, så minns programmet allt mellan varven. Lägg större uppgifter i egna metoder, så blir loopen kort och lätt att läsa.\n\nKontrollera också `null`. I Kodstig ger ReadLine null när indatan tar slut, och på en riktig dator händer samma sak om användaren trycker Ctrl+Z eller Ctrl+D.",example:`// 1. Listan finns före loopen och minns allt
List<string> lista = new List<string>();
while (true)
{
    // 2. Visa menyn och läs ett val
    Console.WriteLine("1) Lägg till  2) Visa  0) Avsluta");
    Console.Write("Val? ");
    string val = Console.ReadLine();
    // 3. Avsluta före switch
    if (val == null || val == "0")
    {
        break;
    }
    // 4. Gör det användaren valde
    switch (val)
    {
        case "1":
            Console.Write("Vara? ");
            lista.Add(Console.ReadLine());
            break;
        case "2":
            Console.WriteLine(string.Join(", ", lista));
            break;
        default:
            Console.WriteLine("Okänt val.");
            break;
    }
}
Console.WriteLine("Hej då!");`,exampleInput:`1
mjölk
1
bröd
2
0`,exercises:[{type:`choice`,prompt:"Vad skrivs ut när indatan är `4`, `6`, `stopp` och `10`?",code:`int summa = 0;
while (true)
{
    string rad = Console.ReadLine();
    if (rad == "stopp")
    {
        break;
    }
    summa += int.Parse(rad);
}
Console.WriteLine("Summa: " + summa);`,input:`4
6
stopp
10`,options:[`Summa: 20`,`Summa: 0`,`Summa: 10`],answer:2,out:!0,explain:`4 och 6 läggs ihop. När stopp läses lämnar break loopen, så 10 läses aldrig.`,why:{0:`Loopen slutar vid stopp. Raden 10 läses aldrig.`,1:`Talen läggs till i summa innan stopp kommer.`}},{type:`choice`,prompt:'En meny har `case "0": break;` inne i en switch, som i sin tur ligger i `while (true)`. Vad händer när användaren väljer 0?',options:[`Loopen fortsätter, för break lämnar bara switchen`,`Programmet avslutas`,`Både switchen och loopen avslutas`],answer:0,explain:`break lämnar det närmaste den står i, och det är switchen. Därför ska avslutet kontrolleras med en if före switchen.`,why:{1:`break avslutar inget program, och här lämnar den bara switchen.`,2:`break lämnar bara en nivå, den närmaste switchen eller loopen.`}},{type:`order`,prompt:"Ordna raderna så att programmet räknar svaren tills användaren skriver `klar`. Indata: `a`, `b` och `klar`.",input:`a
b
klar`,lines:[`int antal = 0;`,`while (true)`,`{`,`    string svar = Console.ReadLine();`,`    if (svar == "klar")`,`    {`,`        break;`,`    }`,`    antal++;`,`}`,`Console.WriteLine($"Du svarade {antal} gånger");`],output:`Du svarade 2 gånger`,distractors:[{line:`        continue;`,why:`continue hoppar till nästa varv. För att lämna loopen behövs break.`}],explain:`Räknaren skapas före loopen. Kontrollen av klar kommer före antal++, annars räknas även klar.`,hint:`Räknaren först, sedan loopen. Inne i loopen: läs, kontrollera, räkna.`},{type:`fill`,prompt:"Fyll i så att loopen fortsätter tills användaren skriver `q`.",code:`int varv = 0;
while (___)
{
    string kommando = Console.ReadLine();
    if (kommando == "q")
    {
        ___;
    }
    varv++;
}
Console.WriteLine(varv);`,input:`x
y
z
q`,answers:[[`true`],[`break`]],output:`3`,explain:`while (true) snurrar för evigt, och break är enda vägen ut. Tre kommandon hann läsas före q.`,hint:`Ett villkor som alltid är sant, och ordet som lämnar loopen.`},{type:`code`,prompt:"Läs priser, ett per rad, tills användaren skriver `klar`. Skriv sedan `3 varor, totalt 64.50 kr` med två decimaler. Visa ingen fråga.",starter:`// Läs priser tills det står klar
`,runs:[{input:`12.50
40
12
klar`,output:`3 varor, totalt 64.50 kr`},{input:`klar`,output:`0 varor, totalt 0.00 kr`},{input:`9.90
klar`,output:`1 varor, totalt 9.90 kr`}],require:[i(`while`,`Använd en while-loop.`),i(`break`,`Lämna loopen med break.`)],solution:`int antal = 0;
double summa = 0;
while (true)
{
    string rad = Console.ReadLine();
    if (rad == null || rad == "klar")
    {
        break;
    }
    summa += double.Parse(rad);
    antal++;
}
Console.WriteLine($"{antal} varor, totalt {summa:F2} kr");`,explain:`antal och summa finns före loopen och växer för varje varv. Fallet med noll varor fungerar direkt, för loopen avslutas på första raden.`,hint:`while (true): läs, break om klar, annars öka summa och antal.`},{type:`debug`,prompt:`Valet 0 ska avsluta programmet, men loopen fortsätter. Rätta det.`,starter:`int poäng = 0;
while (true)
{
    Console.Write("Val? ");
    string val = Console.ReadLine();
    switch (val)
    {
        case "0":
            break;
        case "1":
            poäng++;
            Console.WriteLine("Poäng!");
            break;
        default:
            Console.WriteLine("Okänt val.");
            break;
    }
}
Console.WriteLine($"Slutpoäng: {poäng}");
`,runs:[{input:`1
1
0`,output:`Val? Poäng!
Val? Poäng!
Val? Slutpoäng: 2`},{input:`7
0`,output:`Val? Okänt val.
Val? Slutpoäng: 0`}],solution:`int poäng = 0;
while (true)
{
    Console.Write("Val? ");
    string val = Console.ReadLine();
    if (val == null || val == "0")
    {
        break;
    }
    switch (val)
    {
        case "1":
            poäng++;
            Console.WriteLine("Poäng!");
            break;
        default:
            Console.WriteLine("Okänt val.");
            break;
    }
}
Console.WriteLine($"Slutpoäng: {poäng}");`,explain:`break i case "0" lämnade bara switchen. En if före switchen lämnar loopen på riktigt.`,hint:`Flytta kontrollen av "0" till en if före switchen.`},{type:`code`,prompt:"Gör en poängtavla. Kommandot `1` läser ett namn och ger det namnet en poäng. Kommandot `2` skriver ut alla som `Namn: X`. Kommandot `0` avslutar. Visa ingen meny eller fråga. Använd en `Dictionary<string, int>`.",starter:`Dictionary<string, int> poäng = new Dictionary<string, int>();
// Menyloopen här
`,runs:[{input:`1
Ada
1
Bo
1
Ada
2
0`,output:`Ada: 2
Bo: 1`},{input:`2
1
Eli
2
0`,output:`Eli: 1`}],require:[i(`while\\s*\\(\\s*true\\s*\\)`,`Använd while (true).`)],solution:`Dictionary<string, int> poäng = new Dictionary<string, int>();
while (true)
{
    string val = Console.ReadLine();
    if (val == null || val == "0")
    {
        break;
    }
    if (val == "1")
    {
        string namn = Console.ReadLine();
        if (poäng.ContainsKey(namn))
        {
            poäng[namn]++;
        }
        else
        {
            poäng[namn] = 1;
        }
    }
    else if (val == "2")
    {
        foreach (var rad in poäng)
        {
            Console.WriteLine($"{rad.Key}: {rad.Value}");
        }
    }
}`,explain:`Dictionary ligger före loopen och minns poängen mellan varven. ContainsKey avgör om namnet ska få sin första poäng eller en till. Att visa en tom tavla skriver inget alls.`,hint:`Kolla ContainsKey(namn). Om namnet finns, öka med ++, annars sätt värdet till 1.`},{type:`code`,prompt:"Skriv `static bool ÄrAvslut(string val)` som returnerar true om valet betyder avsluta: `null`, `0`, `q` eller `Q`, även med mellanslag runt. Allt annat ger false.",starter:`static bool ÄrAvslut(string val)
{
    return val == "0";
}
`,tests:[{fn:`ÄrAvslut`,args:[`0`],expect:!0},{fn:`ÄrAvslut`,args:[`q`],expect:!0},{fn:`ÄrAvslut`,args:[` Q `],expect:!0,edge:`stort Q med mellanslag`},{fn:`ÄrAvslut`,args:[null],expect:!0,edge:`indatan är slut`},{fn:`ÄrAvslut`,args:[`1`],expect:!1},{fn:`ÄrAvslut`,args:[`quit`],expect:!1,edge:`bara q räknas`}],solution:`static bool ÄrAvslut(string val)
{
    if (val == null)
    {
        return true;
    }
    string v = val.Trim().ToLower();
    return v == "0" || v == "q";
}`,explain:`null måste kontrolleras först, för val.Trim() på null ger NullReferenceException. Med en sådan metod blir if-satsen i menyloopen kort: if (ÄrAvslut(val)) break;`,hint:`Returnera true direkt om val är null. Annars Trim, ToLower och jämför med "0" och "q".`}]},{id:`cs-real-project`,title:`Ett riktigt .NET-projekt`,tier:2,text:'Allt du skrivit i Kodstig kan köras på din egen dator. Installera **.NET SDK**, som är gratis från Microsoft. Öppna sedan en terminal och skriv `dotnet new console -o Gissa`. Då skapas mappen Gissa med två viktiga filer: `Program.cs`, där koden står, och `Gissa.csproj`, som beskriver projektet. Gå in i mappen med `cd Gissa` och kör programmet med `dotnet run`. Kommandot kompilerar och startar programmet. Fastnar programmet i en loop stoppar du det med Ctrl+C.\n\nI Program.cs står bara `Console.WriteLine("Hello, World!");`. Det kallas **toppnivåsatser**: koden körs uppifrån och ner, och kompilatorn bygger metoden `Main` åt dig. Därför ser din Kodstig-kod likadan ut. I äldre kod ser du `class Program` med `static void Main(string[] args)`. Det betyder samma sak, med mer text runt omkring.\n\n**Skillnader mot Kodstig:** En riktig kompilator kräver att klasser står efter toppnivåkoden. Den varnar också för `string namn = Console.ReadLine();`, eftersom ReadLine kan ge null. Då skriver man `string?`, vilket Kodstig inte stöder.',example:`// 1. Toppnivåsatser körs uppifrån och ner
Console.Write("Vad heter du? ");
string namn = Console.ReadLine();
Console.WriteLine(Hälsning(namn));

// 2. Metoder står efter koden som körs
static string Hälsning(string namn)
{
    // 3. Logiken bor i metoden
    return $"Hej {namn}, välkommen till ditt första projekt!";
}`,exampleInput:`Sam`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Console.WriteLine("Start");
Hälsa("Ada");
Console.WriteLine("Slut");

static void Hälsa(string namn)
{
    Console.WriteLine($"Hej {namn}");
}`,options:[`Hej Ada
Start
Slut`,`Start
Slut
Hej Ada`,`Start
Hej Ada
Slut`],answer:2,out:!0,explain:`Toppnivåkoden körs uppifrån och ner. Metoden körs först när den anropas, mitt emellan Start och Slut.`,why:{0:`Metoden körs inte för att den står i filen, bara när den anropas.`,1:`Anropet Hälsa("Ada") står före Slut, så Hej Ada skrivs ut innan.`}},{type:`choice`,prompt:`Vilket terminalkommando skapar ett nytt konsolprojekt?`,options:[`dotnet run`,`dotnet new console`,`dotnet Program.cs`],answer:1,explain:`dotnet new console skapar ett projekt med Program.cs och en .csproj-fil. Med -o Namn hamnar det i en egen mapp.`,why:{0:`dotnet run kör ett projekt som redan finns.`,2:`Det kommandot finns inte. Program.cs körs genom projektet med dotnet run.`}},{type:`order`,prompt:"Ordna raderna till ett program i den gamla stilen med `class Program` och `Main`.",lines:[`class Program`,`{`,`    static void Main(string[] args)`,`    {`,`        Console.WriteLine("Hej från Main!");`,`    }`,`}`],output:`Hej från Main!`,distractors:[{line:`    void Main(string[] args)`,why:`Main måste vara static, så att den kan köras utan att något objekt skapas först.`}],explain:`Klassen omsluter Main, och Main omsluter koden. Varje { har en matchande } på samma indrag.`,hint:`Ytterst klassen, sedan Main, och koden längst in.`},{type:`fill`,prompt:`Fyll i de två orden som saknas i Main.`,code:`class Program
{
    ___ ___ Main(string[] args)
    {
        Console.WriteLine("Programmet startar");
    }
}`,answers:[[`static`],[`void`]],output:`Programmet startar`,explain:`static betyder att metoden hör till klassen, inte till ett objekt. void betyder att Main inte returnerar något.`,hint:`Samma två ord som står före dina egna metoder som inte returnerar något.`},{type:`choice`,prompt:"Visual Studio visar en gul varning på `string namn = Console.ReadLine();`. Varför?",options:[`ReadLine kan ge null, och string utan ? säger att värdet aldrig är null`,`ReadLine ska alltid stå i en try`,`Variabler som heter namn är reserverade`],answer:0,explain:`Varningen skyddar mot NullReferenceException. string? namn eller en kontroll av null tar bort den. Det är en varning, så programmet går ändå att köra.`,why:{1:`ReadLine kastar inga vanliga undantag. Varningen gäller null.`,2:`namn är ett helt vanligt variabelnamn.`}},{type:`code`,prompt:"Skriv om programmet till toppnivåsatser: ta bort `class Program` och `Main` men behåll det programmet gör.",starter:`class Program
{
    static void Main(string[] args)
    {
        Console.Write("Stad? ");
        string stad = Console.ReadLine();
        Console.WriteLine($"Vädret i {stad}: sol");
    }
}
`,runs:[{input:`Luleå`,output:`Stad? Vädret i Luleå: sol`},{input:`Visby`,output:`Stad? Vädret i Visby: sol`}],forbid:[i(`\\bMain\\b`,`Ta bort Main och låt koden stå direkt i filen.`),i(`\\bclass\\b`,`Ta bort class Program.`)],solution:`Console.Write("Stad? ");
string stad = Console.ReadLine();
Console.WriteLine($"Vädret i {stad}: sol");`,explain:`Tre rader i stället för nio. Kompilatorn bygger Main åt dig, så resultatet blir exakt detsamma.`,hint:`Behåll bara de tre raderna i mitten.`},{type:`code`,prompt:"Skriv ett program som du kan köra med dotnet run hemma. Fråga `Namn? ` och `Födelseår? `, och skriv `Hej NAMN! År 2030 fyller du X.` Räkna ut åldern i metoden `static int ÅlderÅr(int födelseår, int år)` som står efter toppnivåkoden.",starter:`// Toppnivåkoden här

static int ÅlderÅr(int födelseår, int år)
{
    return 0;
}
`,runs:[{input:`Ada
2010`,output:`Namn? Födelseår? Hej Ada! År 2030 fyller du 20.`},{input:`Bo
1975`,output:`Namn? Födelseår? Hej Bo! År 2030 fyller du 55.`}],require:[i(`ÅlderÅr\\s*\\([^)]*,\\s*2030\\s*\\)`,`Anropa ÅlderÅr med födelseåret och 2030.`)],solution:`Console.Write("Namn? ");
string namn = Console.ReadLine();
Console.Write("Födelseår? ");
int födelseår = int.Parse(Console.ReadLine());
Console.WriteLine($"Hej {namn}! År 2030 fyller du {ÅlderÅr(födelseår, 2030)}.");

static int ÅlderÅr(int födelseår, int år)
{
    return år - födelseår;
}`,explain:`Toppnivåkoden sköter in och ut, och metoden sköter räkningen. Den uppdelningen gör programmet lätt att ändra och testa.`,hint:`Läs namn och år, gör om året med int.Parse och anropa ÅlderÅr(födelseår, 2030).`},{type:`code`,prompt:"Lägg klassen `Vara` efter toppnivåkoden och gör klart den: en konstruktor som sparar namn och pris, och `ToString()` som ger till exempel `Kaffe, 35 kr`. Programmet läser en vara och skriver ut den.",starter:`Console.Write("Vara? ");
string namn = Console.ReadLine();
Console.Write("Pris? ");
int pris = int.Parse(Console.ReadLine());
Vara v = new Vara(namn, pris);
Console.WriteLine(v);

class Vara
{
    public string Namn { get; }
    public int Pris { get; }
}
`,runs:[{input:`Kaffe
35`,output:`Vara? Pris? Kaffe, 35 kr`},{input:`Te
25`,output:`Vara? Pris? Te, 25 kr`}],require:[i(`override\\s+string\\s+ToString`,`Skriv public override string ToString().`)],solution:`Console.Write("Vara? ");
string namn = Console.ReadLine();
Console.Write("Pris? ");
int pris = int.Parse(Console.ReadLine());
Vara v = new Vara(namn, pris);
Console.WriteLine(v);

class Vara
{
    public string Namn { get; }
    public int Pris { get; }

    public Vara(string namn, int pris)
    {
        Namn = namn;
        Pris = pris;
    }

    public override string ToString()
    {
        return $"{Namn}, {Pris} kr";
    }
}`,explain:`Så ser en vanlig Program.cs ut: toppnivåkoden först och klasserna sist. I större projekt flyttar man varje klass till en egen fil, till exempel Vara.cs.`,hint:`public Vara(string namn, int pris) { Namn = namn; Pris = pris; } och en ToString som returnerar $"{Namn}, {Pris} kr".`}]},{id:`cs-io-project`,title:`Miniprojekt: gissa talet och budget`,tier:5,text:`Nu bygger du två hela program som du kan köra hemma med dotnet run. Det första är ett spel: datorn tänker på ett tal från 1 till 100 och du gissar. Programmet säger för lågt eller för högt och räknar dina försök. Det andra är ett praktiskt verktyg: en budget där du lägger in utgifter i olika kategorier och ser hur mycket som finns kvar.

Båda använder allt från kapitlet: ReadLine och TryParse för säker indata, en menyloop med \`while (true)\`, metoder som delar upp arbetet och samlingar som minns data. Spelet byggs i tre steg. Först en metod utan slump som går att testa exakt, sedan spelet med ett bestämt tal och sist med riktig slump. Så testar riktiga utvecklare också kod med slump.`,example:`// 1. Logik utan slump, lätt att testa
Console.WriteLine(Jämför(30, 42));
Console.WriteLine(Jämför(42, 42));

static string Jämför(int gissning, int hemligt)
{
    // 2. Tre möjliga svar
    if (gissning < hemligt)
    {
        return "För lågt!";
    }
    if (gissning > hemligt)
    {
        return "För högt!";
    }
    return "Rätt!";
}`,exercises:[{type:`code`,prompt:"Del 1: Skriv `static string Jämför(int gissning, int hemligt)` som returnerar `För lågt!`, `För högt!` eller `Rätt!`. Den har ingen slump och ingen indata, så den går att testa exakt.",starter:`static string Jämför(int gissning, int hemligt)
{
    return "";
}
`,tests:[{fn:`Jämför`,args:[30,42],expect:`För lågt!`},{fn:`Jämför`,args:[80,42],expect:`För högt!`},{fn:`Jämför`,args:[42,42],expect:`Rätt!`},{fn:`Jämför`,args:[1,2],expect:`För lågt!`,edge:`precis under`},{fn:`Jämför`,args:[100,99],expect:`För högt!`,edge:`precis över`}],solution:`static string Jämför(int gissning, int hemligt)
{
    if (gissning < hemligt)
    {
        return "För lågt!";
    }
    if (gissning > hemligt)
    {
        return "För högt!";
    }
    return "Rätt!";
}`,explain:`Spelets regel bor nu i en metod. Den kan du lita på när resten av spelet byggs runt den.`,hint:`Två if-satser med return, och "Rätt!" sist.`},{type:`code`,prompt:"Del 2: Skriv `static void Spela(int hemligt)`. Den frågar `Gissa? ` tills gissningen är rätt och skriver svaret från Jämför efter varje gissning. Text som inte är ett heltal ger `Skriv ett heltal.` och räknas inte som försök. Till sist: `Du klarade det på N försök.` Det hemliga talet är bestämt här, så att programmet går att testa.",starter:`Spela(42);

static void Spela(int hemligt)
{
}

static string Jämför(int gissning, int hemligt)
{
    if (gissning < hemligt)
    {
        return "För lågt!";
    }
    if (gissning > hemligt)
    {
        return "För högt!";
    }
    return "Rätt!";
}
`,runs:[{input:`50
25
hej
42`,output:`Gissa? För högt!
Gissa? För lågt!
Gissa? Skriv ett heltal.
Gissa? Rätt!
Du klarade det på 3 försök.`},{input:`42`,output:`Gissa? Rätt!
Du klarade det på 1 försök.`}],require:[i(`Jämför\\s*\\(`,`Använd Jämför för att avgöra svaret.`),i(`int\\.TryParse`,`Läs gissningen säkert med int.TryParse.`)],solution:`Spela(42);

static void Spela(int hemligt)
{
    int försök = 0;
    while (true)
    {
        Console.Write("Gissa? ");
        if (!int.TryParse(Console.ReadLine(), out int gissning))
        {
            Console.WriteLine("Skriv ett heltal.");
            continue;
        }
        försök++;
        string svar = Jämför(gissning, hemligt);
        Console.WriteLine(svar);
        if (svar == "Rätt!")
        {
            break;
        }
    }
    Console.WriteLine($"Du klarade det på {försök} försök.");
}

static string Jämför(int gissning, int hemligt)
{
    if (gissning < hemligt)
    {
        return "För lågt!";
    }
    if (gissning > hemligt)
    {
        return "För högt!";
    }
    return "Rätt!";
}`,explain:`continue hoppar över resten av varvet när svaret inte är ett tal, så försök ökar bara för riktiga gissningar. Spela tar emot det hemliga talet som parameter, och därför kan testet bestämma det.`,hint:`int försök = 0; före loopen. I loopen: fråga, TryParse, öka försök, skriv Jämför och break vid "Rätt!".`},{type:`code`,prompt:"Del 3: Nu på riktigt. Ändra första raden så att det hemliga talet slumpas från 1 till och med 100 med `Random`. Testet gissar 1, 2, 3 och så vidare upp till 100, så spelet måste alltid gå att vinna.",starter:`Spela(42);

static void Spela(int hemligt)
{
    int försök = 0;
    while (true)
    {
        Console.Write("Gissa? ");
        if (!int.TryParse(Console.ReadLine(), out int gissning))
        {
            Console.WriteLine("Skriv ett heltal.");
            continue;
        }
        försök++;
        string svar = Jämför(gissning, hemligt);
        Console.WriteLine(svar);
        if (svar == "Rätt!")
        {
            break;
        }
    }
    Console.WriteLine($"Du klarade det på {försök} försök.");
}

static string Jämför(int gissning, int hemligt)
{
    if (gissning < hemligt)
    {
        return "För lågt!";
    }
    if (gissning > hemligt)
    {
        return "För högt!";
    }
    return "Rätt!";
}
`,runs:[{input:Array.from({length:100},(e,t)=>String(t+1)).join(`
`),outputRe:`(Gissa\\? För lågt!\\n)*Gissa\\? Rätt!\\nDu klarade det på ([1-9]|[1-9][0-9]|100) försök\\.`,repeat:20,label:`Gissar 1, 2, 3 och uppåt`,expectText:`några "För lågt!", sedan "Rätt!" och antalet försök`}],require:[i(`new\\s+Random\\s*\\(`,`Skapa en slumpgenerator med new Random().`),i(`\\.Next\\s*\\(\\s*1\\s*,\\s*101\\s*\\)`,`Slumpa med Next(1, 101), så att 100 också kan komma.`)],solution:`Random rnd = new Random();
Spela(rnd.Next(1, 101));

static void Spela(int hemligt)
{
    int försök = 0;
    while (true)
    {
        Console.Write("Gissa? ");
        if (!int.TryParse(Console.ReadLine(), out int gissning))
        {
            Console.WriteLine("Skriv ett heltal.");
            continue;
        }
        försök++;
        string svar = Jämför(gissning, hemligt);
        Console.WriteLine(svar);
        if (svar == "Rätt!")
        {
            break;
        }
    }
    Console.WriteLine($"Du klarade det på {försök} försök.");
}

static string Jämför(int gissning, int hemligt)
{
    if (gissning < hemligt)
    {
        return "För lågt!";
    }
    if (gissning > hemligt)
    {
        return "För högt!";
    }
    return "Rätt!";
}`,explain:`Bara en rad behövde ändras, eftersom slumpen hålls utanför Spela. Next(1, 101) ger 1 till 100, för max-talet är inte med. Kopiera gärna hela programmet till Program.cs och spela på riktigt!`,hint:`Random rnd = new Random(); och sedan Spela(rnd.Next(1, 101));`},{type:`code`,prompt:"Budget: Programmet läser först inkomsten med `Inkomst? `. Sedan en menyloop med `Val? `: `1` frågar `Kategori? ` och `Belopp? ` och lägger beloppet till kategorin, `2` skriver varje kategori som `Mat: 450.00 kr` och sist `Kvar: X kr`, och `0` avslutar. Ett belopp som inte är ett tal ger `Ogiltigt belopp.` Ett okänt val ger `Okänt val.` Använd `Dictionary<string, double>` och visa alla belopp med två decimaler.",starter:`Console.Write("Inkomst? ");
double inkomst = double.Parse(Console.ReadLine());
Dictionary<string, double> utgifter = new Dictionary<string, double>();
// Menyloopen här
`,runs:[{input:`10000
1
Mat
450
1
Hyra
6000
1
Mat
50.50
2
0`,output:`Inkomst? Val? Kategori? Belopp? Val? Kategori? Belopp? Val? Kategori? Belopp? Val? Mat: 500.50 kr
Hyra: 6000.00 kr
Kvar: 3499.50 kr
Val?`},{input:`500
1
Nöje
mycket
3
2
0`,output:`Inkomst? Val? Kategori? Belopp? Ogiltigt belopp.
Val? Okänt val.
Val? Kvar: 500.00 kr
Val?`},{input:`200
1
Godis
250
2`,output:`Inkomst? Val? Kategori? Belopp? Val? Godis: 250.00 kr
Kvar: -50.00 kr
Val?`}],require:[i(`while\\s*\\(\\s*true\\s*\\)`,`Använd en menyloop med while (true).`),i(`double\\.TryParse`,`Läs beloppet säkert med double.TryParse.`)],solution:`Console.Write("Inkomst? ");
double inkomst = double.Parse(Console.ReadLine());
Dictionary<string, double> utgifter = new Dictionary<string, double>();
while (true)
{
    Console.Write("Val? ");
    string val = Console.ReadLine();
    if (val == null || val == "0")
    {
        break;
    }
    switch (val)
    {
        case "1":
            LäggTill(utgifter);
            break;
        case "2":
            VisaBudget(inkomst, utgifter);
            break;
        default:
            Console.WriteLine("Okänt val.");
            break;
    }
}

static void LäggTill(Dictionary<string, double> utgifter)
{
    Console.Write("Kategori? ");
    string kategori = Console.ReadLine();
    Console.Write("Belopp? ");
    if (!double.TryParse(Console.ReadLine(), out double belopp))
    {
        Console.WriteLine("Ogiltigt belopp.");
        return;
    }
    if (utgifter.ContainsKey(kategori))
    {
        utgifter[kategori] += belopp;
    }
    else
    {
        utgifter[kategori] = belopp;
    }
}

static void VisaBudget(double inkomst, Dictionary<string, double> utgifter)
{
    double summa = 0;
    foreach (var rad in utgifter)
    {
        Console.WriteLine($"{rad.Key}: {rad.Value:F2} kr");
        summa += rad.Value;
    }
    Console.WriteLine($"Kvar: {inkomst - summa:F2} kr");
}`,explain:`Menyloopen är kort eftersom varje val har en egen metod. Dictionary samlar beloppen per kategori, och en minussiffra på Kvar visar direkt att budgeten inte håller. Det sista testet tar slut utan 0, och då räddar kontrollen av null programmet.`,hint:`Skriv metoderna LäggTill och VisaBudget. I loopen: Write("Val? "), läs, break vid null eller "0", och en switch för resten.`}]}]}],o=(e,t)=>({re:e,msg:t}),s={id:`csharp`,name:`C#`,lang:`csharp`,chapters:[{id:`cs1`,title:`De första byggstenarna`,lessons:[{id:`cs-hello`,title:`Din första kodrad`,tier:1,text:"Ett program är en lista med instruktioner som datorn följer uppifrån och ner.\n\n`Console.WriteLine` skriver ut en rad text. Texten står mellan dubbla citattecken, och raden avslutas med semikolon `;`.",example:`Console.WriteLine("Hej, kodare!");
Console.WriteLine("Det här är rad två.");`,exercises:[{type:`choice`,prompt:`Vad skriver programmet ut?`,code:`Console.WriteLine("Kodstig");`,options:[`Kodstig`,`"Kodstig"`,`Console.WriteLine`],answer:0,out:!0,explain:`Citattecknen visar var texten börjar och slutar. De skrivs inte ut.`,why:{1:`Citattecknen visar bara var texten börjar och slutar, de skrivs inte ut.`,2:`Console.WriteLine är kommandot som gör utskriften. Det är texten inom parentesen som visas.`}},{type:`choice`,prompt:`Vilket tecken avslutar en sats i C#?`,options:[`Punkt .`,`Semikolon ;`,`Kolon :`],answer:1,explain:`Semikolon talar om för C# att instruktionen är färdig.`,why:{0:`Punkt används i C# för att nå något inuti, som Console.WriteLine. Den avslutar inte en sats.`,2:`Kolon används på andra ställen i C#. En sats behöver ett annat tecken på slutet.`}},{type:`fill`,prompt:`Fyll i det som saknas så att programmet skriver ut Hej!`,code:`Console.___("Hej!");`,answers:[[`WriteLine`]],output:`Hej!`,explain:`WriteLine betyder ”skriv en rad”. Stora W och L behövs, eftersom C# skiljer på stora och små bokstäver.`,hint:`Metoden heter Write + Line, med stor bokstav i båda orden.`},{type:`code`,prompt:"Skriv ett program som skriver ut de två raderna `Jag heter Milo` och `Jag gillar bambu`.",starter:`// Skriv din kod här
`,output:`Jag heter Milo
Jag gillar bambu`,solution:`Console.WriteLine("Jag heter Milo");
Console.WriteLine("Jag gillar bambu");`,explain:`Varje WriteLine ger en egen rad, i samma ordning som i koden.`,hint:`Använd två Console.WriteLine-rader, en för varje mening.`}]},{id:`cs-int`,title:`Heltal och variabler`,tier:1,text:"En **variabel** är en namngiven låda som håller ett värde. I C# talar du om vilken typ av värde lådan ska ha.\n\n`int` betyder heltal. `int steg = 1;` skapar en variabel som heter `steg` med värdet 1. Senare kan du ge den ett nytt värde utan att skriva `int` igen.",example:`// 1. Skapa variabeln
int steg = 1;
Console.WriteLine(steg);
// 2. Ge den ett nytt värde
steg = 5;
Console.WriteLine(steg);`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int poäng = 3;
poäng = 7;
Console.WriteLine(poäng);`,options:[`3`,`7`,`10`],answer:1,out:!0,explain:`Variabeln får först 3 och sedan 7. Det senaste värdet gäller.`,why:{0:`Raden poäng = 7; byter ut värdet. Det är det senaste värdet som skrivs ut.`,2:`Det nya värdet ersätter det gamla, det läggs inte ihop.`}},{type:`fill`,prompt:`Skapa en heltalsvariabel som heter antal med värdet 4.`,code:`___ antal = 4;
Console.WriteLine(antal);`,answers:[[`int`]],output:`4`,explain:`int talar om att variabeln håller ett heltal.`,hint:`Typen för heltal är tre bokstäver lång.`},{type:`choice`,prompt:`Vad skrivs ut?`,code:`int a = 2;
int b = a;
a = 10;
Console.WriteLine(b);`,options:[`2`,`10`,`12`],answer:0,out:!0,explain:`b fick en kopia av värdet 2. Att a ändras efteråt påverkar inte b.`,why:{1:`b fick en kopia av värdet när den skapades. Den följer inte med när a ändras senare.`,2:`Ingenting läggs ihop här. b får bara en kopia av värdet a hade just då.`}},{type:`code`,prompt:"Skapa en variabel `ålder` med värdet 12 och skriv ut den. Ändra den sedan till 13 och skriv ut den igen.",starter:``,output:`12
13`,solution:`int ålder = 12;
Console.WriteLine(ålder);
ålder = 13;
Console.WriteLine(ålder);`,require:[o(`ålder\\s*=\\s*13`,`Ge variabeln det nya värdet med ålder = 13; i stället för att skriva 13 direkt.`)],explain:`Typen skrivs bara när variabeln skapas. Därefter ändras värdet med =.`,hint:`Skriv int ålder = 12; först. Ändra sedan med ålder = 13; (utan int).`}]},{id:`cs-math`,title:`Räkna med kod`,tier:1,text:"C# kan räkna med `+`, `-`, `*` (gånger) och `/` (delat med).\n\nNär två **heltal** delas blir svaret också ett heltal: `7 / 2` blir `3`. Resten får du med `%`: `7 % 2` blir `1`.",example:`// 1. Spara två heltal
int a = 7;
int b = 2;
// 2. Räkna och skriv ut
Console.WriteLine(a + b);
Console.WriteLine(a * b);
Console.WriteLine(a / b);
Console.WriteLine(a % b);`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Console.WriteLine(2 + 3 * 4);`,options:[`20`,`14`,`24`],answer:1,out:!0,explain:`Multiplikation räknas före addition, precis som i matematiken: 3 * 4 = 12, sedan 2 + 12.`,why:{0:`Du räknade från vänster till höger. Multiplikation räknas före addition.`,2:`Kolla vilket tal som multipliceras. Det är bara 3 * 4 som räknas först, sedan läggs 2 till.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`Console.WriteLine(9 / 2);`,options:[`4.5`,`4`,`5`],answer:1,out:!0,explain:`Två heltal ger ett heltal. Decimalerna kapas bort, så 4.5 blir 4.`,why:{0:`Det hade stämt med decimaltal, men 9 och 2 är heltal.`,2:`C# avrundar inte, det kapar bort decimalerna.`}},{type:`fill`,prompt:`Använd rätt operator så att resten vid 10 delat med 3 skrivs ut (svaret ska bli 1).`,code:`Console.WriteLine(10 ___ 3);`,answers:[[`%`]],output:`1`,explain:`% ger resten efter en heltalsdivision: 10 = 3 · 3 + 1.`,hint:`Restoperatorn ser ut som ett procenttecken.`},{type:`code`,prompt:`En pizza har 8 bitar och ni är 3 personer. Skriv ut hur många hela bitar var och en får, och sedan hur många bitar som blir över.`,starter:`int bitar = 8;
int personer = 3;
`,output:`2
2`,solution:`int bitar = 8;
int personer = 3;
Console.WriteLine(bitar / personer);
Console.WriteLine(bitar % personer);`,require:[o(`bitar\\s*/\\s*personer`,`Räkna ut svaret med variablerna, till exempel bitar / personer.`)],explain:`Heltalsdivision ger hela bitar, och % ger det som blir över.`,hint:`Använd / för hela bitar och % för resten.`}]},{id:`cs-string`,title:`Text och sammanfogning`,tier:1,text:"Text har typen `string`. Du kan sätta ihop text med `+`.\n\nEtt smidigare sätt är **stränginterpolering**: sätt `$` före citattecknet och skriv variabler inom `{ }`.",example:`// 1. Spara namn och år
string namn = "Ada";
int år = 1815;
// 2. Sätt ihop med +
Console.WriteLine("Hej " + namn);
// 3. Sätt ihop med interpolering
Console.WriteLine($"{namn} föddes {år}.");`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`string djur = "panda";
Console.WriteLine("En " + djur + "!");`,options:[`En panda!`,`En djur!`,`En+panda+!`],answer:0,out:!0,explain:`Variabeln ersätts av sitt värde, och + sätter ihop texterna.`,why:{1:`djur står utan citattecken, så det är en variabel. Det är dess värde som skrivs ut, inte namnet.`,2:`Plustecknen är en del av koden och sätter ihop texterna. De skrivs inte ut.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`Console.WriteLine("1" + 2);`,options:[`3`,`12`,`Ett fel`],answer:1,out:!0,explain:`När ena sidan är text blir + sammanfogning. "1" och 2 blir texten "12".`,why:{0:`"1" är text, inte ett tal. När ena sidan är text sätts de ihop i stället för att räknas.`,2:`C# tillåter text + tal. Talet görs om till text och läggs till på slutet.`}},{type:`fill`,prompt:`Gör om raden till stränginterpolering så att den skriver ut Hej Mo.`,code:`string namn = "Mo";
Console.WriteLine(___"Hej {namn}");`,answers:[[`$`]],output:`Hej Mo`,explain:`$ före citattecknet gör att {namn} byts ut mot variabelns värde.`,hint:`Ett tecken som också betyder dollar.`},{type:`code`,prompt:'Skapa `string stad = "Malmö";` och `int grader = 18;`. Skriv ut exakt: `I Malmö är det 18 grader.`',starter:``,output:`I Malmö är det 18 grader.`,solution:`string stad = "Malmö";
int grader = 18;
Console.WriteLine($"I {stad} är det {grader} grader.");`,require:[o(`\\bstad\\b[\\s\\S]*\\bgrader\\b[\\s\\S]*(\\{stad\\}|\\+\\s*stad)`,`Använd variablerna stad och grader i utskriften.`)],explain:`Interpolering gör det lätt att se hur den färdiga meningen kommer att se ut.`,hint:`Prova Console.WriteLine($"I {stad} är det {grader} grader.");`}]},{id:`cs-bool`,title:`Sant eller falskt`,tier:1,text:"Typen `bool` har bara två värden: `true` och `false`.\n\nJämförelser ger en bool: `>` större än, `<` mindre än, `>=` minst, `<=` högst, `==` lika med och `!=` inte lika med. Observera dubbla `==` för att jämföra.",example:`// 1. Spara åldern
int ålder = 15;
// 2. Spara en jämförelse
bool tonåring = ålder >= 13;
// 3. Skriv ut resultaten
Console.WriteLine(tonåring);
Console.WriteLine(ålder == 20);`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int x = 5;
Console.WriteLine(x > 3);`,options:[`True`,`False`,`5`],answer:0,out:!0,explain:`5 är större än 3, så jämförelsen blir true. C# skriver ut bool-värden som True och False.`,why:{1:`Jämför 5 med 3 en gång till. Är 5 större än 3?`,2:`x > 3 är en jämförelse. Den ger ett sant eller falskt svar, inte värdet av x.`}},{type:`choice`,prompt:"Vilken rad jämför om `svar` är lika med 42?",options:[`svar = 42`,`svar == 42`,`svar => 42`],answer:1,explain:`== jämför. Ett ensamt = ger variabeln ett nytt värde.`,why:{0:`Ett = ger svar värdet 42. För att jämföra behövs ==.`,2:`=> är en pil som används till annat i C#. För att jämföra likhet behövs två likhetstecken.`}},{type:`fill`,prompt:`Fyll i operatorn så att programmet skriver ut True när lösenordet INTE är "1234".`,code:`string lösen = "panda";
Console.WriteLine(lösen ___ "1234");`,answers:[[`!=`]],output:`True`,explain:`!= betyder ”inte lika med”.`,hint:`Utropstecken betyder ”inte” i C#.`}]}]},{id:`cs2`,title:`Få koden att tänka`,lessons:[{id:`cs-if`,title:`Om något är sant: if`,tier:1,text:"Med `if` kör programmet ett block bara när ett villkor är sant.\n\nVillkoret står inom parenteser, och blocket inom klamrar `{ }`. Det finns inget semikolon direkt efter `if (...)`.",example:`// 1. Spara temperaturen
int temp = 25;
// 2. Testa villkoret
if (temp > 20)
{
    Console.WriteLine("Varmt ute!");
}
// 3. Körs alltid
Console.WriteLine("Klar.");`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int poäng = 4;
if (poäng > 5)
{
    Console.WriteLine("Bra!");
}
Console.WriteLine("Slut");`,options:[`Bra!
Slut`,`Slut`,`Bra!`],answer:1,out:!0,explain:`4 är inte större än 5, så blocket hoppas över. Raden efter blocket körs alltid.`,why:{0:`Villkoret är falskt eftersom 4 inte är större än 5. Då hoppas blocket över.`,2:`Raden efter blocket ligger utanför if och körs alltid, oavsett villkoret.`}},{type:`fill`,prompt:`Fyll i nyckelordet som startar ett villkor.`,code:`int x = 10;
___ (x == 10)
{
    Console.WriteLine("Tio!");
}`,answers:[[`if`]],output:`Tio!`,explain:`if betyder ”om” och kör blocket när villkoret är sant.`},{type:`debug`,prompt:"Programmet ska skriva ut `Grattis!` när `poäng` är 10, men det går inte att köra. Hitta och rätta felet.",starter:`int poäng = 10;
if (poäng = 10)
{
    Console.WriteLine("Grattis!");
}`,output:`Grattis!`,solution:`int poäng = 10;
if (poäng == 10)
{
    Console.WriteLine("Grattis!");
}`,explain:`Ett villkor behöver == för att jämföra. Med ett = försöker koden ändra variabeln.`,hint:`Titta på likhetstecknen i villkoret.`},{type:`code`,prompt:"`int batteri = 15;` Skriv ett program som skriver ut `Ladda snart` om batteriet är under 20.",starter:`int batteri = 15;
`,output:`Ladda snart`,solution:`int batteri = 15;
if (batteri < 20)
{
    Console.WriteLine("Ladda snart");
}`,require:[o(`if\\s*\\(`,`Använd en if-sats så att texten bara skrivs ut när batteriet är lågt.`)],explain:`If-satsen gör att meddelandet bara visas när det behövs.`,hint:`Villkoret blir batteri < 20.`}]},{id:`cs-else`,title:`else och else if`,tier:1,text:"`else` körs när villkoret i `if` är falskt. Med `else if` kan du testa flera villkor i tur och ordning.\n\nC# testar uppifrån och ner och kör bara det **första** blocket vars villkor är sant.",example:`// 1. Spara poängen
int poäng = 72;
// 2. Första sanna villkoret vinner
if (poäng >= 90)
{
    Console.WriteLine("Toppen");
}
else if (poäng >= 50)
{
    Console.WriteLine("Godkänt");
}
else
{
    Console.WriteLine("Försök igen");
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int x = 0;
if (x > 0)
{
    Console.WriteLine("positivt");
}
else
{
    Console.WriteLine("inte positivt");
}`,options:[`positivt`,`inte positivt`,`ingenting`],answer:1,out:!0,explain:`0 är inte större än 0, så else-blocket körs.`,why:{0:`0 är inte större än 0. Villkoret är alltså falskt.`,2:`När if är falskt körs else. Ett av blocken körs alltid.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`int ålder = 70;
if (ålder >= 18)
{
    Console.WriteLine("vuxen");
}
else if (ålder >= 65)
{
    Console.WriteLine("pensionär");
}`,options:[`vuxen`,`pensionär`,`vuxen
pensionär`],answer:0,out:!0,explain:`Det första sanna villkoret vinner. 70 >= 18 är sant, så resten testas aldrig. Ordningen spelar roll!`,why:{1:`Villkoren testas uppifrån. 70 >= 18 är redan sant, så else if testas aldrig.`,2:`I en kedja med else if körs bara ett block, det första vars villkor är sant.`}},{type:`fill`,prompt:`Fyll i så att programmet skriver ut Udda.`,code:`int tal = 7;
if (tal % 2 == 0)
{
    Console.WriteLine("Jämnt");
}
___
{
    Console.WriteLine("Udda");
}`,answers:[[`else`]],output:`Udda`,explain:`else fångar alla fall där villkoret var falskt.`},{type:`code`,prompt:"Skriv en if/else if/else för `int temp = 8;` som skriver ut `Kallt` under 10, `Lagom` från 10 till och med 22 och annars `Varmt`.",starter:`int temp = 8;
`,output:`Kallt`,solution:`int temp = 8;
if (temp < 10)
{
    Console.WriteLine("Kallt");
}
else if (temp <= 22)
{
    Console.WriteLine("Lagom");
}
else
{
    Console.WriteLine("Varmt");
}`,require:[o(`else\\s+if`,`Använd else if för det mellersta fallet.`),o(`else\\s*\\{`,`Avsluta med ett else-block för det sista fallet.`)],explain:`Med else if behöver det mellersta villkoret bara kontrollera övre gränsen, eftersom fallet under 10 redan är hanterat.`,hint:`Testa temp < 10 först, sedan temp <= 22, och ta resten med else.`}]},{id:`cs-while`,title:`Upprepa med while`,tier:1,text:"En `while`-loop upprepar ett block så länge villkoret är sant.\n\nNågot i blocket måste ändra villkoret, annars slutar loopen aldrig. `i++` ökar `i` med 1.",example:`// 1. Startvärde
int i = 1;
// 2. Loopa medan villkoret gäller
while (i <= 3)
{
    Console.WriteLine(i);
    // 3. Öka räknaren
    i++;
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int n = 3;
while (n > 0)
{
    Console.WriteLine(n);
    n--;
}`,options:[`3
2
1`,`3
2
1
0`,`1
2
3`],answer:0,out:!0,explain:`n-- minskar n med 1. När n blir 0 är villkoret n > 0 falskt och loopen slutar.`,why:{1:`När n blir 0 är n > 0 falskt. Loopen slutar innan 0 hinner skrivas ut.`,2:`n börjar på 3 och minskar med n--. Utskriften går alltså nedåt.`}},{type:`choice`,prompt:`Hur många gånger skrivs Hej ut?`,code:`int i = 0;
while (i < 4)
{
    Console.WriteLine("Hej");
    i += 2;
}`,options:[`4`,`2`,`3`],answer:1,explain:`i blir 0, 2 och sedan 4. När i är 4 är i < 4 falskt. Alltså två varv.`,why:{0:`i ökar med 2 varje varv, inte med 1. Räkna vilka värden i får.`,2:`När i blir 4 är i < 4 falskt. Det blir inget varv för i = 4.`}},{type:`debug`,prompt:`Loopen ska skriva ut 1 till 3 men tar aldrig slut. Rätta den.`,starter:`int i = 1;
while (i <= 3)
{
    Console.WriteLine(i);
}`,output:`1
2
3`,solution:`int i = 1;
while (i <= 3)
{
    Console.WriteLine(i);
    i++;
}`,explain:`Utan i++ förblir i lika med 1, så villkoret är alltid sant.`,hint:`Vilken rad borde ändra i varje varv?`},{type:`code`,prompt:`Använd en while-loop för att skriva ut 10, 20, 30, 40 och 50 på varsin rad.`,starter:``,output:`10
20
30
40
50`,solution:`int tal = 10;
while (tal <= 50)
{
    Console.WriteLine(tal);
    tal += 10;
}`,require:[o(`while\\s*\\(`,`Uppgiften övar while, så använd en while-loop.`)],explain:`Variabeln startar på 10 och växer med 10 i varje varv tills villkoret inte längre gäller.`,hint:`Börja på 10 och öka med tal += 10 i varje varv.`}]},{id:`cs-for`,title:`Räkna med for`,tier:1,text:"En `for`-loop samlar tre delar på en rad: **start**, **villkor** och **steg**.\n\n`for (int i = 0; i < 3; i++)` betyder: börja med i = 0, fortsätt så länge i < 3, öka i med 1 efter varje varv.",example:`for (int i = 0; i < 3; i++)
{
    Console.WriteLine($"Varv {i}");
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`for (int i = 1; i <= 4; i++)
{
    Console.Write(i);
}`,options:[`1234`,`123`,`01234`],answer:0,out:!0,explain:`Write skriver utan radbrytning. i går från 1 till och med 4.`,why:{1:`Villkoret är i <= 4, så 4 kommer också med.`,2:`Loopen startar på i = 1, inte på 0.`}},{type:`fill`,prompt:`Fyll i villkoret så att loopen skriver ut 0, 1, 2, 3, 4.`,code:`for (int i = 0; ___; i++)
{
    Console.WriteLine(i);
}`,answers:[[`i < 5`,`i <= 4`,`5 > i`]],output:`0
1
2
3
4`,explain:`i < 5 betyder att loopen kör för 0 till 4, alltså fem varv.`,hint:`Loopen ska sluta innan i blir 5.`},{type:`code`,prompt:"Skriv ut 3-gångertabellen: `3 x 1 = 3` till och med `3 x 5 = 15`, en rad per tal. Använd en for-loop.",starter:``,output:`3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15`,solution:`for (int i = 1; i <= 5; i++)
{
    Console.WriteLine($"3 x {i} = {3 * i}");
}`,require:[o(`for\\s*\\(`,`Använd en for-loop.`)],explain:`Interpolering kan innehålla uträkningar: {3 * i}.`,hint:`Låt i gå från 1 till 5 och skriv ut $"3 x {i} = {3 * i}".`}]}]},{id:`cs3`,title:`Bygg vidare`,lessons:[{id:`cs-double`,title:`Decimaltal och typer`,tier:1,text:"`double` håller decimaltal. Decimaltecknet i kod är alltid **punkt**: `2.5`.\n\nOm ena talet i en division är en double blir svaret också en double: `7 / 2.0` blir `3.5`. Med `(double)` framför ett heltal gör du om det till decimaltal.",example:`// 1. Räkna med decimaltal
double pris = 19.90;
int antal = 3;
Console.WriteLine(pris * antal);
// 2. Gör om heltal till double
int summa = 7;
Console.WriteLine((double)summa / 2);`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Console.WriteLine(7 / 2.0);`,options:[`3`,`3.5`,`4`],answer:1,out:!0,explain:`2.0 är en double, så divisionen görs med decimaler.`,why:{0:`Kapningen gäller bara när båda talen är heltal. 2.0 är en double.`,2:`C# avrundar inte uppåt här. Med en double i divisionen behålls decimalerna.`}},{type:`choice`,prompt:`Vilken rad ger ett fel?`,options:[`double a = 5;`,`int b = 2.5;`,`double c = 2.5;`],answer:1,explain:`En int kan inte ha decimaler, så C# vägrar spara 2.5 där. Ett heltal i en double går däremot bra.`,why:{0:`Ett heltal får plats i en double. Det blir bara 5.0.`,2:`En double är gjord för decimaltal, så 2.5 passar där.`}},{type:`fill`,prompt:`Gör om summa till double före divisionen så att svaret blir 2.5.`,code:`int summa = 5;
int antal = 2;
Console.WriteLine((___)summa / antal);`,answers:[[`double`]],output:`2.5`,explain:`(double) gör om värdet innan divisionen, så resultatet får decimaler.`},{type:`code`,prompt:`Räkna ut medelvärdet av de tre heltalen 4, 5 och 8 och skriv ut det som decimaltal. Svaret ska bli 5.666666666666667.`,starter:`int a = 4;
int b = 5;
int c = 8;
`,output:`5.666666666666667`,solution:`int a = 4;
int b = 5;
int c = 8;
double snitt = (a + b + c) / 3.0;
Console.WriteLine(snitt);`,explain:`Genom att dela med 3.0 (eller använda (double)) behålls decimalerna.`,hint:`Om du delar med 3 blir svaret 5. Dela med 3.0 i stället.`}]},{id:`cs-array`,title:`Arrayer`,tier:1,text:"En **array** håller flera värden av samma typ. `int[] tal = {4, 8, 15};` skapar en array med tre heltal.\n\nVärdena nås med **index** som börjar på 0: `tal[0]` är 4. `tal.Length` är antalet element.",example:`// 1. Skapa arrayen
string[] frukter = {"äpple", "päron", "kiwi"};
// 2. Läs element och längd
Console.WriteLine(frukter[0]);
Console.WriteLine(frukter.Length);
// 3. Byt ut ett element
frukter[2] = "mango";
Console.WriteLine(frukter[2]);`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int[] tal = {10, 20, 30};
Console.WriteLine(tal[1]);`,options:[`10`,`20`,`30`],answer:1,out:!0,explain:`Index börjar på 0, så tal[1] är det andra elementet.`,why:{0:`Index börjar på 0. tal[0] är det första elementet, så tal[1] är nästa.`,2:`30 ligger på index 2. Kom ihåg att räkningen börjar på 0.`}},{type:`choice`,prompt:`Vilket index har sista elementet i en array med 5 element?`,options:[`5`,`4`,`6`],answer:1,explain:`Index 0, 1, 2, 3, 4. Det sista är alltid Length - 1.`,why:{0:`Index börjar på 0, så det finns inget index 5 i en array med 5 element.`,2:`Index kan aldrig vara större än antalet element. Räkningen börjar på 0.`}},{type:`fill`,prompt:`Skriv ut antalet element i arrayen.`,code:`string[] namn = {"Ada", "Linus", "Grace"};
Console.WriteLine(namn.___);`,answers:[[`Length`]],output:`3`,explain:`Length ger antalet element i en array.`},{type:`code`,prompt:"Skapa en array `int[] veckodagar` med talen 1 till 7. Ändra sedan första elementet till 0 och skriv ut första och sista elementet på varsin rad.",starter:``,output:`0
7`,solution:`int[] veckodagar = {1, 2, 3, 4, 5, 6, 7};
veckodagar[0] = 0;
Console.WriteLine(veckodagar[0]);
Console.WriteLine(veckodagar[veckodagar.Length - 1]);`,require:[o(`veckodagar\\s*\\[\\s*0\\s*\\]\\s*=`,`Ändra första elementet med veckodagar[0] = 0;.`)],explain:`veckodagar[veckodagar.Length - 1] fungerar för det sista elementet oavsett hur lång arrayen är.`,hint:`Första elementet har index 0, sista har index Length - 1.`}]},{id:`cs-foreach`,title:`Gå igenom en array`,tier:2,text:`\`foreach\` går igenom varje element i en array, ett i taget, utan att du behöver hålla reda på index.

En variabel som samlar ihop ett resultat, till exempel en summa, skapas **före** loopen.`,example:`// 1. Skapa tal och summa
int[] tal = {3, 5, 2};
int summa = 0;
// 2. Lägg ihop varje tal
foreach (int t in tal)
{
    summa += t;
}
// 3. Skriv ut summan
Console.WriteLine(summa);`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`string[] ord = {"kod", "stig"};
foreach (string o in ord)
{
    Console.Write(o);
}`,options:[`kodstig`,`kod stig`,`o o`],answer:0,out:!0,explain:`o får värdet av varje element i tur och ordning. Write lägger inga mellanslag.`,why:{1:`Write lägger inte till mellanslag. Texterna hamnar direkt efter varandra.`,2:`o är en variabel som får värdet av varje element. Det är värdet som skrivs ut.`}},{type:`fill`,prompt:`Fyll i nyckelordet mellan variabeln och arrayen.`,code:`int[] tal = {1, 2, 3};
foreach (int t ___ tal)
{
    Console.WriteLine(t * 10);
}`,answers:[[`in`]],output:`10
20
30`,explain:`foreach (typ namn in samling) läses som ”för varje t i tal”.`},{type:`debug`,prompt:`Summan ska bli 12 men programmet skriver fel värde. Rätta det.`,starter:`int[] tal = {2, 4, 6};
foreach (int t in tal)
{
    int summa = 0;
    summa += t;
    Console.WriteLine(summa);
}`,output:`12`,solution:`int[] tal = {2, 4, 6};
int summa = 0;
foreach (int t in tal)
{
    summa += t;
}
Console.WriteLine(summa);`,explain:`Summan måste skapas före loopen, annars nollställs den varje varv. Utskriften flyttas efter loopen så att bara slutresultatet visas.`,hint:`Var skapas summa, och var skrivs den ut?`},{type:`code`,prompt:"Räkna hur många tal i `{3, 12, 7, 20, 15}` som är större än 10, och skriv ut antalet.",starter:`int[] tal = {3, 12, 7, 20, 15};
`,output:`3`,solution:`int[] tal = {3, 12, 7, 20, 15};
int antal = 0;
foreach (int t in tal)
{
    if (t > 10)
    {
        antal++;
    }
}
Console.WriteLine(antal);`,require:[o(`foreach|for\\s*\\(`,`Gå igenom arrayen med en loop.`)],forbid:[o(`WriteLine\\s*\\(\\s*3\\s*\\)`,`Räkna fram svaret med koden i stället för att skriva 3 direkt.`)],explain:`En räknare som ökar inne i ett if kombinerar loop och villkor.`,hint:`Skapa int antal = 0; före loopen och öka den när t > 10.`}]},{id:`cs-strmethods`,title:`Arbeta med text`,tier:2,text:'Text har inbyggda metoder. `ToUpper()` gör versaler, `ToLower()` gemener och `Trim()` tar bort mellanslag i kanterna.\n\n`Contains("x")` svarar true eller false, och `Length` ger antalet tecken. En text kan också indexeras: `"kod"[0]` är tecknet `k`.',example:`// 1. Spara texten
string ord = "  Kodstig ";
// 2. Ta bort mellanslag
string rent = ord.Trim();
// 3. Använd strängmetoder
Console.WriteLine(rent.ToUpper());
Console.WriteLine(rent.Length);
Console.WriteLine(rent.Contains("stig"));`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`string s = "Panda";
Console.WriteLine(s.ToLower() + s.Length);`,options:[`panda5`,`PANDA5`,`panda 5`],answer:0,out:!0,explain:`ToLower ger "panda" och Length är 5. + sätter ihop dem utan mellanslag.`,why:{1:`ToLower gör om till små bokstäver. Det är ToUpper som ger stora.`,2:`+ sätter ihop texten utan att lägga till mellanslag.`}},{type:`fill`,prompt:`Ta bort mellanslagen runt texten innan den skrivs ut.`,code:`string in1 = "  hej  ";
Console.WriteLine(in1.___());`,answers:[[`Trim`]],output:`hej`,explain:`Trim() är bra när text kommer från ett formulär där någon råkat skriva mellanslag.`},{type:`code`,prompt:'Skriv ut första bokstaven i `string namn = "milo";` som stor bokstav, följt av resten av namnet. Resultatet ska bli `Milo`.',starter:`string namn = "milo";
`,output:`Milo`,solution:`string namn = "milo";
string först = namn.Substring(0, 1).ToUpper();
Console.WriteLine(först + namn.Substring(1));`,forbid:[o(`"Milo"`,`Bygg ihop resultatet från variabeln namn i stället för att skriva "Milo" direkt.`)],explain:`Substring(0, 1) ger första tecknet och Substring(1) resten.`,hint:`Använd namn.Substring(0, 1).ToUpper() och namn.Substring(1).`}]}]},{id:`cs4`,title:`Logik i flera steg`,lessons:[{id:`cs-andor`,title:`Sammansatta villkor`,tier:2,text:"`&&` betyder **och**: båda villkoren måste vara sanna. `||` betyder **eller**: det räcker att ett är sant. `!` vänder på ett värde.\n\nSkriv gärna parenteser runt delarna när du blandar `&&` och `||`, så blir det tydligt vad som hör ihop.",example:`// 1. Spara värdena
int ålder = 15;
bool harBiljett = true;
// 2. Båda måste vara sanna
if (ålder >= 13 && harBiljett)
{
    Console.WriteLine("Välkommen in");
}
// 3. Vänd på ett värde med !
bool helg = false;
if (!helg)
{
    Console.WriteLine("Vardag");
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int x = 7;
Console.WriteLine(x > 5 && x < 10);`,options:[`True`,`False`],answer:0,out:!0,explain:`Båda delarna är sanna: 7 > 5 och 7 < 10.`,why:{1:`Kolla båda delarna var för sig. Både 7 > 5 och 7 < 10 är sanna.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`bool regn = false;
bool blåst = true;
Console.WriteLine(regn || blåst);`,options:[`True`,`False`],answer:0,out:!0,explain:`Med || räcker det att en del är sann.`,why:{1:`Med || räcker det att en av delarna är sann. Att regn är false gör inget.`}},{type:`fill`,prompt:`Fyll i så att Rabatt skrivs ut om kunden är under 18 ELLER över 65.`,code:`int ålder = 70;
if (ålder < 18 ___ ålder > 65)
{
    Console.WriteLine("Rabatt");
}`,answers:[[`||`]],output:`Rabatt`,explain:`|| ger true om minst ett av villkoren stämmer.`},{type:`code`,prompt:"Skriv en metod `static bool KanÅka(int längd, bool vuxenMed)` som returnerar true om längden är minst 120 cm, eller om längden är minst 100 cm och en vuxen är med.",starter:`static bool KanÅka(int längd, bool vuxenMed)
{
    // din kod
}
`,tests:[{fn:`KanÅka`,args:[130,!1],expect:!0},{fn:`KanÅka`,args:[110,!0],expect:!0},{fn:`KanÅka`,args:[110,!1],expect:!1},{fn:`KanÅka`,args:[120,!1],expect:!0,edge:`exakt 120 cm ska räknas som tillräckligt`},{fn:`KanÅka`,args:[99,!0],expect:!1,edge:`under 100 cm hjälper det inte att en vuxen är med`}],solution:`static bool KanÅka(int längd, bool vuxenMed)
{
    return längd >= 120 || (längd >= 100 && vuxenMed);
}`,explain:`Parenteserna visar att ”minst 100 och vuxen med” är en egen del som kombineras med || .`,hint:`Returnera längd >= 120 || (längd >= 100 && vuxenMed).`}]},{id:`cs-bounds`,title:`Gränsvärden`,tier:2,text:"Många fel uppstår precis vid gränsen. Är 18 år ”minst 18”? Är 0 positivt?\n\nTesta alltid värdet **på** gränsen och värdena precis under och över. `>` och `>=` skiljer sig bara i just det fallet.",example:`// 1. Spara poängen
int poäng = 50;
// 2. Testa gränsen med >=
if (poäng >= 50)
{
    Console.WriteLine("Godkänt");
}
else
{
    Console.WriteLine("Inte än");
}`,exercises:[{type:`choice`,prompt:`Gränsen för godkänt är ”minst 60 poäng”. Vilket villkor är rätt?`,options:[`poäng > 60`,`poäng >= 60`,`poäng == 60`],answer:1,explain:`”Minst 60” betyder att 60 ska räknas. Det ger >= .`,why:{0:`Då blir exakt 60 poäng underkänt.`,2:`Då blir bara exakt 60 godkänt. Minst 60 betyder att högre poäng också räknas.`}},{type:`choice`,prompt:"Vilka värden är viktigast att testa för villkoret `ålder >= 13`?",options:[`1, 50 och 100`,`12, 13 och 14`,`0 och 13`],answer:1,explain:`Värdena runt gränsen avslöjar om > och >= har blandats ihop.`,why:{0:`De här talen ligger långt från gränsen. Fel med > och >= syns bara nära 13.`,2:`Det saknas ett värde precis under gränsen och ett precis över. Testa runt 13.`}},{type:`debug`,prompt:`Rea gäller för köp på **minst** 500 kr, men ett köp på exakt 500 kr får ingen rea. Rätta metoden.`,starter:`static bool HarRea(int belopp)
{
    return belopp > 500;
}
`,tests:[{fn:`HarRea`,args:[500],expect:!0,edge:`exakt 500 kr`},{fn:`HarRea`,args:[499],expect:!1},{fn:`HarRea`,args:[800],expect:!0}],solution:`static bool HarRea(int belopp)
{
    return belopp >= 500;
}`,explain:`”Minst” inkluderar gränsen, så >= behövs.`,hint:`Vad händer exakt vid 500?`},{type:`code`,prompt:'Skriv `static string Betyg(int poäng)` som returnerar `"A"` för 90–100, `"C"` för 60–89 och `"F"` för 0–59.',starter:`static string Betyg(int poäng)
{
}
`,tests:[{fn:`Betyg`,args:[95],expect:`A`},{fn:`Betyg`,args:[90],expect:`A`,edge:`exakt 90 ska bli A`},{fn:`Betyg`,args:[89],expect:`C`},{fn:`Betyg`,args:[60],expect:`C`,edge:`exakt 60 ska bli C`},{fn:`Betyg`,args:[59],expect:`F`},{fn:`Betyg`,args:[0],expect:`F`}],solution:`static string Betyg(int poäng)
{
    if (poäng >= 90)
    {
        return "A";
    }
    if (poäng >= 60)
    {
        return "C";
    }
    return "F";
}`,explain:`Börja med den högsta gränsen. Varje return avslutar metoden, så nästa if behöver bara den nedre gränsen.`,hint:`Testa poäng >= 90 först, sedan poäng >= 60, och returnera "F" sist.`}]},{id:`cs-accum`,title:`Ackumulatorer: summa, antal och största`,tier:4,text:`En **ackumulator** är en variabel som samlar upp något medan en loop går: en summa, ett antal eller det största värdet hittills.

Startvärdet är viktigt. En summa börjar på 0. Det största värdet börjar lämpligen på **första elementet**, inte på 0 – tänk om alla tal är negativa!`,example:`// 1. Skapa arrayen
int[] temp = {-3, -8, -1, -5};
// 2. Starta med första elementet
int högst = temp[0];
// 3. Spara det högsta värdet
foreach (int t in temp)
{
    if (t > högst)
    {
        högst = t;
    }
}
// 4. Skriv ut svaret
Console.WriteLine(högst);`,exercises:[{type:`choice`,prompt:"Varför startar `högst` på `temp[0]` i exemplet i stället för på 0?",options:[`Det går snabbare`,`Om alla tal är negativa skulle 0 felaktigt bli största värdet`,`C# kräver det`],answer:1,explain:`0 finns inte ens i arrayen. Att starta med ett riktigt element gör lösningen korrekt för alla tal.`,why:{0:`Hastigheten påverkas inte. Det handlar om att svaret ska bli rätt.`,2:`C# tillåter vilket startvärde som helst. Frågan är vilket som ger rätt svar.`}},{type:`code`,prompt:"Skriv `static int Summa(int[] tal)` som returnerar summan av alla tal.",starter:`static int Summa(int[] tal)
{
}
`,tests:[{fn:`Summa`,args:[[1,2,3]],expect:6},{fn:`Summa`,args:[[10,-4]],expect:6},{fn:`Summa`,args:[[]],expect:0,edge:`en tom array ska ge 0`}],solution:`static int Summa(int[] tal)
{
    int summa = 0;
    foreach (int t in tal)
    {
        summa += t;
    }
    return summa;
}`,explain:`Startvärdet 0 gör att även en tom array fungerar.`,hint:`Skapa int summa = 0; före loopen och returnera den efteråt.`},{type:`code`,prompt:"Skriv `static int Störst(int[] tal)` som returnerar det största talet. Arrayen har alltid minst ett element.",starter:`static int Störst(int[] tal)
{
}
`,tests:[{fn:`Störst`,args:[[3,9,2]],expect:9},{fn:`Störst`,args:[[7]],expect:7},{fn:`Störst`,args:[[-5,-2,-9]],expect:-2,edge:`bara negativa tal`}],solution:`static int Störst(int[] tal)
{
    int störst = tal[0];
    foreach (int t in tal)
    {
        if (t > störst)
        {
            störst = t;
        }
    }
    return störst;
}`,explain:`Att starta på tal[0] fungerar även när alla tal är negativa.`,hint:`Börja med störst = tal[0] och byt när du hittar ett större.`},{type:`code`,prompt:"Skriv `static double Snitt(int[] tal)` som returnerar medelvärdet. För en tom array ska metoden returnera 0 i stället för att krascha.",starter:`static double Snitt(int[] tal)
{
}
`,tests:[{fn:`Snitt`,args:[[2,4]],expect:3},{fn:`Snitt`,args:[[1,2]],expect:1.5,edge:`svaret har decimaler`},{fn:`Snitt`,args:[[]],expect:0,edge:`tom array`}],solution:`static double Snitt(int[] tal)
{
    if (tal.Length == 0)
    {
        return 0;
    }
    int summa = 0;
    foreach (int t in tal)
    {
        summa += t;
    }
    return (double)summa / tal.Length;
}`,explain:`Ett tidigt return skyddar mot division med noll, och (double) behåller decimalerna.`,hint:`Kontrollera tal.Length == 0 först. Dela sedan (double)summa / tal.Length.`}]},{id:`cs-index`,title:`Index och sökning`,tier:4,text:"Ibland behövs **positionen**, inte bara värdet. Då använder du en `for`-loop med index.\n\nEn vanlig konvention är att returnera `-1` när något inte hittas, eftersom -1 aldrig är ett giltigt index.",example:`// 1. Skapa arrayen
string[] namn = {"Ada", "Linus", "Grace"};
// 2. Gå igenom varje index
for (int i = 0; i < namn.Length; i++)
{
    // 3. Leta efter Linus
    if (namn[i] == "Linus")
    {
        Console.WriteLine($"Hittade på index {i}");
    }
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int[] t = {5, 6, 7};
for (int i = t.Length - 1; i >= 0; i--)
{
    Console.Write(t[i]);
}`,options:[`567`,`765`,`76`],answer:1,out:!0,explain:`Loopen startar på sista index och går baklänges till 0.`,why:{0:`Loopen startar på sista index och räknar ner med i--. Den går baklänges.`,2:`Villkoret är i >= 0, så index 0 kommer också med.`}},{type:`code`,prompt:"Skriv `static int HittaIndex(int[] tal, int mål)` som returnerar indexet för första förekomsten av `mål`, eller -1 om det inte finns.",starter:`static int HittaIndex(int[] tal, int mål)
{
}
`,tests:[{fn:`HittaIndex`,args:[[4,8,15],8],expect:1},{fn:`HittaIndex`,args:[[4,8,4],4],expect:0,edge:`första förekomsten ska returneras`},{fn:`HittaIndex`,args:[[1,2],9],expect:-1,edge:`talet saknas`},{fn:`HittaIndex`,args:[[],1],expect:-1}],solution:`static int HittaIndex(int[] tal, int mål)
{
    for (int i = 0; i < tal.Length; i++)
    {
        if (tal[i] == mål)
        {
            return i;
        }
    }
    return -1;
}`,explain:`return i inne i loopen avslutar direkt vid första träffen. Om loopen tar slut utan träff returneras -1.`,hint:`Använd for med index och return i vid träff. Lägg return -1 efter loopen.`},{type:`code`,prompt:"Skriv `static int AntalÖkningar(int[] tal)` som räknar hur många gånger ett tal är större än talet före det.",starter:`static int AntalÖkningar(int[] tal)
{
}
`,tests:[{fn:`AntalÖkningar`,args:[[1,3,2,5]],expect:2},{fn:`AntalÖkningar`,args:[[5,4,3]],expect:0},{fn:`AntalÖkningar`,args:[[7]],expect:0,edge:`bara ett element`},{fn:`AntalÖkningar`,args:[[]],expect:0,edge:`tom array`}],solution:`static int AntalÖkningar(int[] tal)
{
    int antal = 0;
    for (int i = 1; i < tal.Length; i++)
    {
        if (tal[i] > tal[i - 1])
        {
            antal++;
        }
    }
    return antal;
}`,explain:`Genom att börja på i = 1 finns alltid ett tal före, tal[i - 1].`,hint:`Starta loopen på i = 1 och jämför tal[i] med tal[i - 1].`}]}]},{id:`cs5`,title:`Funktioner & samlingar`,lessons:[{id:`cs-methods`,title:`Egna metoder`,tier:3,text:"En **metod** är ett namngivet kodblock som du kan anropa många gånger. I Kodstig skriver du metoder längst ner, efter resten av koden.\n\n`static void Hälsa()` skapar en metod som inte lämnar tillbaka något värde (`void`). Du anropar den med `Hälsa();`.",example:`// 1. Anropa metoden två gånger
Hälsa();
Hälsa();

// 2. Definiera metoden
static void Hälsa()
{
    Console.WriteLine("Hej från en metod!");
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Console.WriteLine("A");
B();
Console.WriteLine("C");

static void B()
{
    Console.WriteLine("B");
}`,options:[`A
B
C`,`A
C
B`,`B
A
C`],answer:0,out:!0,explain:`Metoden körs när den anropas, alltså mellan A och C.`,why:{1:`Metoden körs där den anropas, inte där den står i filen.`,2:`Att metoden finns körs den inte av sig själv. Den körs först när B(); anropas.`}},{type:`choice`,prompt:"Vad betyder `void`?",options:[`Att metoden är tom`,`Att metoden inte returnerar något värde`,`Att metoden är privat`],answer:1,explain:`void betyder att metoden gör något men inte lämnar tillbaka ett värde.`,why:{0:`En void-metod kan innehålla massor av kod. Ordet säger något om vad metoden lämnar tillbaka.`,2:`Om en metod är privat styrs av andra ord, som private.`}},{type:`fill`,prompt:`Anropa metoden Rita två gånger.`,code:`___;
___;

static void Rita()
{
    Console.WriteLine("***");
}`,answers:[[`Rita()`],[`Rita()`]],output:`***
***`,explain:`Parenteserna gör att metoden körs.`},{type:`code`,prompt:"Skriv en metod `static void Linje()` som skriver ut `----------` (tio bindestreck). Använd den för att skriva ut en linje, sedan `Meny`, sedan en linje till.",starter:``,output:`----------
Meny
----------`,solution:`Linje();
Console.WriteLine("Meny");
Linje();

static void Linje()
{
    Console.WriteLine("----------");
}`,require:[o(`static\\s+void\\s+Linje\\s*\\(\\s*\\)`,`Skapa metoden static void Linje().`),o(`Linje\\s*\\(\\s*\\)\\s*;[\\s\\S]*Linje\\s*\\(\\s*\\)\\s*;`,`Anropa Linje() två gånger.`)],explain:`Om linjen ska ändras behöver du nu bara ändra på ett ställe.`,hint:`Anropa Linje(); före och efter Console.WriteLine("Meny");.`}]},{id:`cs-params`,title:`Parametrar`,tier:3,text:`En **parameter** gör metoden flexibel. \`static void Hälsa(string namn)\` tar emot en text varje gång den anropas.

Värdet du skickar in kallas **argument**. Antal och typer måste matcha parametrarna.`,example:`// 1. Anropa med argument
Hälsa("Ada");
Hälsa("Milo");
RitaRad(5);

// 2. Metod med en textparameter
static void Hälsa(string namn)
{
    Console.WriteLine($"Hej {namn}!");
}

// 3. Metod med en talparameter
static void RitaRad(int längd)
{
    for (int i = 0; i < längd; i++)
    {
        Console.Write("*");
    }
    Console.WriteLine();
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Visa(3, "x");

static void Visa(int antal, string tecken)
{
    for (int i = 0; i < antal; i++)
    {
        Console.Write(tecken);
    }
}`,options:[`xxx`,`3x`,`x3`],answer:0,out:!0,explain:`antal blir 3 och tecken blir "x", så x skrivs ut tre gånger.`,why:{1:`antal används för att styra loopen. Det skrivs aldrig ut.`,2:`Bara tecken skrivs ut. antal bestämmer hur många gånger.`}},{type:`fill`,prompt:`Lägg till en parameter av typen string som heter namn.`,code:`Hej("Mo");

static void Hej(___ namn)
{
    Console.WriteLine("Hej " + namn);
}`,answers:[[`string`]],output:`Hej Mo`,explain:`Parametern behöver både typ och namn.`},{type:`debug`,prompt:"Anropet stämmer inte med metoden. Rätta anropet så att programmet skriver ut `Ada är 36 år`.",starter:`Presentera(36, "Ada");

static void Presentera(string namn, int ålder)
{
    Console.WriteLine($"{namn} är {ålder} år");
}`,output:`Ada är 36 år`,solution:`Presentera("Ada", 36);

static void Presentera(string namn, int ålder)
{
    Console.WriteLine($"{namn} är {ålder} år");
}`,explain:`Argumenten matchas mot parametrarna i ordning: först namn, sedan ålder.`,hint:`Jämför ordningen i anropet med ordningen i metodens parenteser.`},{type:`code`,prompt:"Skriv `static void Nedräkning(int från)` som skriver ut talen från `från` ner till 1 och sedan `Lyft!`. Anropa den med 3.",starter:``,output:`3
2
1
Lyft!`,solution:`Nedräkning(3);

static void Nedräkning(int från)
{
    for (int i = från; i >= 1; i--)
    {
        Console.WriteLine(i);
    }
    Console.WriteLine("Lyft!");
}`,require:[o(`static\\s+void\\s+Nedräkning\\s*\\(\\s*int\\s+[\\wåäöÅÄÖ]+\\s*\\)`,`Skapa metoden static void Nedräkning(int från).`)],explain:`Loopen använder parametern som startvärde, så samma metod fungerar för alla tal.`,hint:`Låt for-loopen starta på från och räkna ner med i--.`}]},{id:`cs-return`,title:`Returvärden`,tier:3,text:"En metod kan **returnera** ett värde med `return`. Typen före namnet talar om vilken sorts värde: `static int Dubbla(int x)` returnerar ett heltal.\n\nDet returnerade värdet kan sparas i en variabel eller användas direkt. `return` avslutar också metoden.",example:`// 1. Spara det returnerade värdet
int svar = Dubbla(21);
Console.WriteLine(svar);
// 2. Använd svaret direkt
Console.WriteLine(Dubbla(svar));

// 3. Metoden returnerar ett värde
static int Dubbla(int x)
{
    return x * 2;
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Console.WriteLine(Kvadrat(Kvadrat(2)));

static int Kvadrat(int x)
{
    return x * x;
}`,options:[`4`,`8`,`16`],answer:2,out:!0,explain:`Kvadrat(2) blir 4, och Kvadrat(4) blir 16.`,why:{0:`Kvadrat anropas två gånger. Resultatet av den inre skickas in i den yttre.`,1:`Kvadrat multiplicerar talet med sig självt. 4 * 4 är inte 8.`}},{type:`choice`,prompt:`Vad är skillnaden mellan att returnera ett värde och att skriva ut det?`,options:[`Ingen`,`Ett returnerat värde kan användas vidare i koden`,`Utskrift går snabbare`],answer:1,explain:`Return lämnar tillbaka värdet till den som anropade, så det kan räknas vidare med. Utskrift visar det bara.`,why:{0:`Utskrift visar bara värdet på skärmen. Koden kan inte räkna vidare med det.`,2:`Skillnaden handlar inte om fart, utan om vad koden kan göra med värdet efteråt.`}},{type:`code`,prompt:"Skriv `static int Moms(int pris)` som returnerar 25 % moms på priset, avrundat nedåt till heltal.",starter:`static int Moms(int pris)
{
}
`,tests:[{fn:`Moms`,args:[100],expect:25},{fn:`Moms`,args:[40],expect:10},{fn:`Moms`,args:[10],expect:2,edge:`2.5 ska bli 2`},{fn:`Moms`,args:[0],expect:0}],solution:`static int Moms(int pris)
{
    return pris * 25 / 100;
}`,explain:`Genom att multiplicera först och dela sist behålls heltalen hela vägen.`,hint:`Prova return pris * 25 / 100;`},{type:`code`,prompt:"Skriv `static bool ÄrJämnt(int tal)` som returnerar true för jämna tal.",starter:`static bool ÄrJämnt(int tal)
{
}
`,tests:[{fn:`ÄrJämnt`,args:[4],expect:!0},{fn:`ÄrJämnt`,args:[7],expect:!1},{fn:`ÄrJämnt`,args:[0],expect:!0,edge:`0 är jämnt`},{fn:`ÄrJämnt`,args:[-2],expect:!0,edge:`negativa tal`}],solution:`static bool ÄrJämnt(int tal)
{
    return tal % 2 == 0;
}`,explain:`Jämförelsen blir själv true eller false, så den kan returneras direkt.`,hint:`Ett tal är jämnt om resten vid delning med 2 är 0.`}]},{id:`cs-list`,title:`List<T> tillsammans med metoder`,tier:3,text:"En `List<int>` är som en array som kan växa. Du lägger till med `Add` och antalet heter `Count`.\n\nMetoder kan både ta emot och returnera listor. Då kan du bygga små verktyg, till exempel en metod som plockar ut vissa värden.",example:`// 1. Skapa och fyll listan
List<int> tal = new List<int> {5, 12, 8};
tal.Add(20);
Console.WriteLine(tal.Count);
// 2. Filtrera med en metod
List<int> stora = Över(tal, 10);
Console.WriteLine(string.Join(", ", stora));

// 3. Metoden bygger en ny lista
static List<int> Över(List<int> lista, int gräns)
{
    List<int> resultat = new List<int>();
    foreach (int t in lista)
    {
        if (t > gräns)
        {
            resultat.Add(t);
        }
    }
    return resultat;
}`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`List<string> l = new List<string>();
l.Add("a");
l.Add("b");
l.Add("c");
Console.WriteLine(l.Count + " " + l[2]);`,options:[`3 c`,`2 c`,`3 b`],answer:0,out:!0,explain:`Listan har tre element och index 2 är det tredje, "c".`,why:{1:`Count räknar alla element som lagts till. Listan har tre.`,2:`Index börjar på 0. l[2] är det tredje elementet.`}},{type:`fill`,prompt:`Lägg till talet 7 i listan.`,code:`List<int> tal = new List<int>();
tal.___(7);
Console.WriteLine(tal[0]);`,answers:[[`Add`]],output:`7`,explain:`Add lägger till ett element sist i listan.`},{type:`code`,prompt:"Skriv `static List<int> BaraJämna(List<int> tal)` som returnerar en ny lista med bara de jämna talen, i samma ordning.",starter:`static List<int> BaraJämna(List<int> tal)
{
}
`,tests:[{fn:`BaraJämna`,args:[[1,2,3,4]],expect:[2,4]},{fn:`BaraJämna`,args:[[1,3]],expect:[],edge:`inga jämna tal ska ge en tom lista`},{fn:`BaraJämna`,args:[[]],expect:[]}],solution:`static List<int> BaraJämna(List<int> tal)
{
    List<int> resultat = new List<int>();
    foreach (int t in tal)
    {
        if (t % 2 == 0)
        {
            resultat.Add(t);
        }
    }
    return resultat;
}`,explain:`Att bygga en ny lista lämnar originalet orört.`,hint:`Skapa en tom lista, lägg till de tal där t % 2 == 0 och returnera den.`}]}]},{id:`cs6`,title:`Tillämpning & miniprojekt`,lessons:[{id:`cs-validate`,title:`Validera indata`,tier:4,text:`Riktiga program får konstiga värden: negativa antal, tomma namn, siffror i fel format. **Validering** betyder att kontrollera värdet innan du använder det.

Ett bra mönster är att hantera de ogiltiga fallen först med tidiga \`return\`, så blir resten av metoden enkel.`,example:`// 1. Testa med olika indata
Console.WriteLine(Hälsning("  "));
Console.WriteLine(Hälsning(" Ada "));

static string Hälsning(string namn)
{
    // 2. Stoppa tomt namn
    if (string.IsNullOrWhiteSpace(namn))
    {
        return "Skriv ditt namn först.";
    }
    // 3. Hälsa när namnet är okej
    return $"Hej {namn.Trim()}!";
}`,exercises:[{type:`choice`,prompt:`Vilken av dessa är INTE en bra valideringsregel för ett antal varor i en varukorg?`,options:[`Antalet får inte vara negativt`,`Antalet måste vara ett heltal`,`Antalet måste vara exakt 1`],answer:2,explain:`Validering ska stoppa omöjliga värden, inte tillåtna val. Man får köpa fler än en vara.`,why:{0:`Ett negativt antal varor är omöjligt. Det är bra att stoppa.`,1:`Man kan inte köpa en halv vara i en varukorg, så regeln stoppar ett omöjligt värde.`}},{type:`code`,prompt:"Skriv `static bool GiltigtPin(string pin)` som returnerar true bara om pin är exakt 4 tecken och alla är siffror.",starter:`static bool GiltigtPin(string pin)
{
}
`,tests:[{fn:`GiltigtPin`,args:[`1234`],expect:!0},{fn:`GiltigtPin`,args:[`123`],expect:!1,edge:`för kort`},{fn:`GiltigtPin`,args:[`12a4`],expect:!1,edge:`en bokstav`},{fn:`GiltigtPin`,args:[`12345`],expect:!1,edge:`för lång`},{fn:`GiltigtPin`,args:[``],expect:!1,edge:`tom text`}],solution:`static bool GiltigtPin(string pin)
{
    if (pin.Length != 4)
    {
        return false;
    }
    foreach (char c in pin)
    {
        if (!char.IsDigit(c))
        {
            return false;
        }
    }
    return true;
}`,explain:`Längden kontrolleras först. Sedan räcker ett enda ogiltigt tecken för att returnera false.`,hint:`Kontrollera pin.Length, gå sedan igenom varje char och använd char.IsDigit(c).`},{type:`code`,prompt:"Skriv `static int Säkert(string text)` som returnerar talet i texten om det är ett heltal mellan 1 och 10 (mellanslag runt om är okej). Annars ska den returnera -1.",starter:`static int Säkert(string text)
{
}
`,tests:[{fn:`Säkert`,args:[`7`],expect:7},{fn:`Säkert`,args:[` 3 `],expect:3,edge:`mellanslag runt talet`},{fn:`Säkert`,args:[`11`],expect:-1,edge:`över 10`},{fn:`Säkert`,args:[`0`],expect:-1,edge:`under 1`},{fn:`Säkert`,args:[`tre`],expect:-1,edge:`inte ett tal`},{fn:`Säkert`,args:[``],expect:-1,edge:`tom text`}],solution:`static int Säkert(string text)
{
    string t = text.Trim();
    if (t.Length == 0)
    {
        return -1;
    }
    foreach (char c in t)
    {
        if (!char.IsDigit(c))
        {
            return -1;
        }
    }
    int tal = int.Parse(t);
    if (tal < 1 || tal > 10)
    {
        return -1;
    }
    return tal;
}`,explain:`Genom att kontrollera tecknen före int.Parse undviker du att programmet kraschar på text som ”tre”.`,hint:`Trimma, kontrollera att alla tecken är siffror, gör om med int.Parse och kontrollera sist intervallet.`},{type:`debug`,prompt:`Metoden ska räkna ut pris per person, men kraschar när antalet personer är 0. Låt den returnera 0 i det fallet.`,starter:`static int PerPerson(int total, int personer)
{
    return total / personer;
}
`,tests:[{fn:`PerPerson`,args:[300,3],expect:100},{fn:`PerPerson`,args:[300,0],expect:0,edge:`0 personer`}],solution:`static int PerPerson(int total, int personer)
{
    if (personer <= 0)
    {
        return 0;
    }
    return total / personer;
}`,explain:`Ett tidigt return skyddar divisionen.`,hint:`Kontrollera personer innan du delar.`}]},{id:`cs-split`,title:`Dela upp en lösning`,tier:4,text:`Stora problem blir lättare om du delar upp dem i små metoder som var och en gör **en** sak. Varje del kan testas för sig.

En metod kan anropa andra metoder. Namnge dem efter vad de gör, så läses koden nästan som en mening.`,example:`// 1. Skapa data och skriv ut
int[] poäng = {7, 9, 4};
Console.WriteLine(Beskriv(poäng));

// 2. Metod som räknar summan
static int Summa(int[] t)
{
    int s = 0;
    foreach (int x in t) s += x;
    return s;
}

// 3. Metod som bygger texten
static string Beskriv(int[] t)
{
    return $"{t.Length} rundor, totalt {Summa(t)} poäng";
}`,exercises:[{type:`choice`,prompt:`Varför är det bra att dela upp kod i små metoder?`,options:[`Programmet blir alltid snabbare`,`Varje del blir lättare att förstå, testa och återanvända`,`Det krävs i C#`],answer:1,explain:`Små delar med tydliga namn gör det lättare att hitta fel och att återanvända lösningar.`,why:{0:`Små metoder gör inte koden snabbare. Vinsten är att koden blir lättare att arbeta med.`,2:`C# tillåter all kod i en enda metod. Uppdelningen är ett val för att göra koden tydligare.`}},{type:`code`,prompt:'Skriv två metoder: `static int Antal(int[] tal, int gräns)` som räknar talen som är minst `gräns`, och `static string Rapport(int[] tal)` som returnerar till exempel `"2 av 3 godkända"`, där godkänd betyder minst 50. Rapport ska använda Antal.',starter:`static int Antal(int[] tal, int gräns)
{
}

static string Rapport(int[] tal)
{
}
`,tests:[{fn:`Antal`,args:[[50,49,80],50],expect:2,edge:`exakt 50 ska räknas`},{fn:`Rapport`,args:[[50,49,80]],expect:`2 av 3 godkända`},{fn:`Rapport`,args:[[]],expect:`0 av 0 godkända`,edge:`tom array`}],require:[o(`Rapport[\\s\\S]*Antal\\s*\\(`,`Låt Rapport anropa Antal i stället för att räkna en gång till.`)],solution:`static int Antal(int[] tal, int gräns)
{
    int antal = 0;
    foreach (int t in tal)
    {
        if (t >= gräns)
        {
            antal++;
        }
    }
    return antal;
}

static string Rapport(int[] tal)
{
    return $"{Antal(tal, 50)} av {tal.Length} godkända";
}`,explain:`Rapport behöver inte veta hur räkningen går till, bara vad Antal returnerar.`,hint:`Bygg texten i Rapport med $"{Antal(tal, 50)} av {tal.Length} godkända".`},{type:`code`,prompt:'Skriv `static string Kvitto(int[] priser)` som returnerar texten `"Summa: X kr"` där X är summan. Om summan är minst 500 dras 50 kr av och texten blir `"Summa: X kr (rabatt 50 kr)"`. Dela gärna upp i en egen summa-metod.',starter:``,tests:[{fn:`Kvitto`,args:[[100,200]],expect:`Summa: 300 kr`},{fn:`Kvitto`,args:[[300,200]],expect:`Summa: 450 kr (rabatt 50 kr)`,edge:`exakt 500 ger rabatt`},{fn:`Kvitto`,args:[[]],expect:`Summa: 0 kr`}],solution:`static int Summa(int[] t)
{
    int s = 0;
    foreach (int x in t)
    {
        s += x;
    }
    return s;
}

static string Kvitto(int[] priser)
{
    int summa = Summa(priser);
    if (summa >= 500)
    {
        return $"Summa: {summa - 50} kr (rabatt 50 kr)";
    }
    return $"Summa: {summa} kr";
}`,explain:`När summeringen ligger i en egen metod blir Kvitto kort och lätt att läsa.`,hint:`Räkna summan först. Avgör sedan med if om rabatten gäller.`}]},{id:`cs-budget`,title:`Miniprojekt: en robust budget`,tier:5,text:`Nu bygger du en liten budgetkalkylator. Den ska tåla konstiga värden och ge tydliga svar.

Du kombinerar arrayer, loopar, villkor, validering och metoder som anropar varandra. Ta en del i taget och kör testerna ofta.`,example:`// 1. Spara utgifter och inkomst
// Utgifter i kronor per kategori
int[] utgifter = {4500, 1200, 800};
int inkomst = 7000;
// 2. Räkna ut det som blir kvar
int kvar = inkomst - 6500;
// 3. Skriv ut svaret
Console.WriteLine($"Kvar: {kvar} kr");`,exercises:[{type:`code`,prompt:"Del 1: Skriv `static int Totalt(int[] utgifter)` som summerar utgifterna men **hoppar över negativa värden**, eftersom en utgift inte kan vara negativ.",starter:`static int Totalt(int[] utgifter)
{
}
`,tests:[{fn:`Totalt`,args:[[4500,1200,800]],expect:6500},{fn:`Totalt`,args:[[100,-50,200]],expect:300,edge:`negativa värden ska ignoreras`},{fn:`Totalt`,args:[[]],expect:0}],solution:`static int Totalt(int[] utgifter)
{
    int summa = 0;
    foreach (int u in utgifter)
    {
        if (u > 0)
        {
            summa += u;
        }
    }
    return summa;
}`,explain:`Validering inne i loopen gör att ett felaktigt värde inte förstör hela summan.`,hint:`Lägg bara till u när u > 0.`},{type:`code`,prompt:'Del 2: Skriv `static string Status(int inkomst, int[] utgifter)`. Returnera `"Plus X kr"` om det blir pengar över, `"Minus X kr"` om utgifterna är större (X utan minustecken) och `"Precis noll"` om det går jämnt ut. Om inkomsten är negativ, returnera `"Ogiltig inkomst"`. Skriv med Totalt från del 1.',starter:`static int Totalt(int[] utgifter)
{
    int summa = 0;
    foreach (int u in utgifter)
    {
        if (u > 0)
        {
            summa += u;
        }
    }
    return summa;
}

static string Status(int inkomst, int[] utgifter)
{
}
`,tests:[{fn:`Status`,args:[7e3,[4500,1200]],expect:`Plus 1300 kr`},{fn:`Status`,args:[1e3,[1500]],expect:`Minus 500 kr`,edge:`X ska skrivas utan minustecken`},{fn:`Status`,args:[500,[500]],expect:`Precis noll`},{fn:`Status`,args:[-1,[10]],expect:`Ogiltig inkomst`,edge:`negativ inkomst`}],solution:`static int Totalt(int[] utgifter)
{
    int summa = 0;
    foreach (int u in utgifter)
    {
        if (u > 0)
        {
            summa += u;
        }
    }
    return summa;
}

static string Status(int inkomst, int[] utgifter)
{
    if (inkomst < 0)
    {
        return "Ogiltig inkomst";
    }
    int kvar = inkomst - Totalt(utgifter);
    if (kvar > 0)
    {
        return $"Plus {kvar} kr";
    }
    if (kvar < 0)
    {
        return $"Minus {-kvar} kr";
    }
    return "Precis noll";
}`,explain:`Ogiltiga värden hanteras först. Sedan räcker tre enkla fall.`,hint:`Kontrollera inkomsten först, räkna kvar = inkomst - Totalt(utgifter) och välj text med if.`},{type:`code`,prompt:"Del 3: Skriv `static int MånaderTillMål(int sparPerMånad, int mål)` som returnerar hur många hela månader det tar att nå sparmålet. Om sparPerMånad är 0 eller mindre går målet aldrig att nå – returnera då -1. Ett mål på 0 eller mindre är redan nått (0 månader).",starter:`static int MånaderTillMål(int sparPerMånad, int mål)
{
}
`,tests:[{fn:`MånaderTillMål`,args:[500,2e3],expect:4},{fn:`MånaderTillMål`,args:[500,2100],expect:5,edge:`en påbörjad månad räknas som en hel`},{fn:`MånaderTillMål`,args:[0,100],expect:-1,edge:`inget sparande`},{fn:`MånaderTillMål`,args:[100,0],expect:0,edge:`målet är redan nått`}],solution:`static int MånaderTillMål(int sparPerMånad, int mål)
{
    if (mål <= 0)
    {
        return 0;
    }
    if (sparPerMånad <= 0)
    {
        return -1;
    }
    int sparat = 0;
    int månader = 0;
    while (sparat < mål)
    {
        sparat += sparPerMånad;
        månader++;
    }
    return månader;
}`,explain:`Kontrollen av sparPerMånad gör att while-loopen aldrig kan fastna.`,hint:`Hantera specialfallen först. Använd sedan en while-loop som lägger till sparPerMånad tills målet är nått.`}]},{id:`cs-scores`,title:`Miniprojekt: poängsammanställning`,tier:5,text:`I det sista miniprojektet sammanställer du poäng från en tävling. Du kombinerar listor, index, sökning, gränsfall och uppdelning i metoder.

Tänk på vad som ska hända med tomma listor och oavgjorda resultat. Det är de fallen som skiljer en robust lösning från en skör.`,example:`// 1. Två arrayer i samma ordning
string[] namn = {"Ada", "Linus"};
int[] poäng = {12, 9};
// 2. Samma index i båda
for (int i = 0; i < namn.Length; i++)
{
    Console.WriteLine($"{namn[i]}: {poäng[i]}");
}`,exercises:[{type:`code`,prompt:"Del 1: Skriv `static int BästaIndex(int[] poäng)` som returnerar index för högsta poängen. Vid lika vinner den som kom först. Tom array ger -1.",starter:`static int BästaIndex(int[] poäng)
{
}
`,tests:[{fn:`BästaIndex`,args:[[3,9,5]],expect:1},{fn:`BästaIndex`,args:[[7,2,7]],expect:0,edge:`lika poäng: den första vinner`},{fn:`BästaIndex`,args:[[]],expect:-1,edge:`tom array`},{fn:`BästaIndex`,args:[[-4,-1]],expect:1,edge:`negativa poäng`}],solution:`static int BästaIndex(int[] poäng)
{
    if (poäng.Length == 0)
    {
        return -1;
    }
    int bäst = 0;
    for (int i = 1; i < poäng.Length; i++)
    {
        if (poäng[i] > poäng[bäst])
        {
            bäst = i;
        }
    }
    return bäst;
}`,explain:`Med > (inte >=) byts vinnaren bara när någon har strikt fler poäng, så den första behåller ledningen vid lika.`,hint:`Spara indexet för den bästa hittills och jämför med poäng[bäst].`},{type:`code`,prompt:'Del 2: Skriv `static string Vinnare(string[] namn, int[] poäng)` som returnerar `"Vinnare: NAMN med X poäng"`. Om ingen deltar, returnera `"Inga deltagare"`. Om arrayerna har olika längd, returnera `"Fel i data"`. Använd BästaIndex.',starter:`static int BästaIndex(int[] poäng)
{
    if (poäng.Length == 0)
    {
        return -1;
    }
    int bäst = 0;
    for (int i = 1; i < poäng.Length; i++)
    {
        if (poäng[i] > poäng[bäst])
        {
            bäst = i;
        }
    }
    return bäst;
}

static string Vinnare(string[] namn, int[] poäng)
{
}
`,tests:[{fn:`Vinnare`,args:[[`Ada`,`Linus`],[12,15]],expect:`Vinnare: Linus med 15 poäng`},{fn:`Vinnare`,args:[[],[]],expect:`Inga deltagare`,edge:`tomma arrayer`},{fn:`Vinnare`,args:[[`Ada`],[1,2]],expect:`Fel i data`,edge:`olika långa arrayer`}],require:[o(`Vinnare[\\s\\S]*BästaIndex\\s*\\(`,`Använd BästaIndex inne i Vinnare.`)],solution:`static int BästaIndex(int[] poäng)
{
    if (poäng.Length == 0)
    {
        return -1;
    }
    int bäst = 0;
    for (int i = 1; i < poäng.Length; i++)
    {
        if (poäng[i] > poäng[bäst])
        {
            bäst = i;
        }
    }
    return bäst;
}

static string Vinnare(string[] namn, int[] poäng)
{
    if (namn.Length != poäng.Length)
    {
        return "Fel i data";
    }
    int i = BästaIndex(poäng);
    if (i == -1)
    {
        return "Inga deltagare";
    }
    return $"Vinnare: {namn[i]} med {poäng[i]} poäng";
}`,explain:`Datakontrollen kommer först, och sedan återanvänds BästaIndex.`,hint:`Kontrollera längderna, hämta index med BästaIndex och bygg texten.`},{type:`code`,prompt:"Del 3: Skriv `static List<string> ÖverSnittet(string[] namn, int[] poäng)` som returnerar namnen på alla som fick **mer än** medelpoängen, i ursprunglig ordning. Tomma arrayer ger en tom lista.",starter:`static List<string> ÖverSnittet(string[] namn, int[] poäng)
{
}
`,tests:[{fn:`ÖverSnittet`,args:[[`A`,`B`,`C`],[10,20,30]],expect:[`C`]},{fn:`ÖverSnittet`,args:[[`A`,`B`],[5,5]],expect:[],edge:`alla lika: ingen är över snittet`},{fn:`ÖverSnittet`,args:[[`A`,`B`,`C`],[1,2,4]],expect:[`C`],edge:`snittet har decimaler (2,33)`},{fn:`ÖverSnittet`,args:[[],[]],expect:[]}],solution:`static List<string> ÖverSnittet(string[] namn, int[] poäng)
{
    List<string> resultat = new List<string>();
    if (poäng.Length == 0)
    {
        return resultat;
    }
    int summa = 0;
    foreach (int p in poäng)
    {
        summa += p;
    }
    double snitt = (double)summa / poäng.Length;
    for (int i = 0; i < poäng.Length; i++)
    {
        if (poäng[i] > snitt)
        {
            resultat.Add(namn[i]);
        }
    }
    return resultat;
}`,explain:`Snittet räknas som double så att decimaler inte försvinner, och samma index kopplar ihop namn och poäng.`,hint:`Räkna snittet som double först. Gå sedan igenom med index och lägg till namn[i] när poäng[i] > snitt.`}]}]},...r,...a,t(`csharp`)]},c=(e,t)=>({re:e,msg:t}),l={"cs-hello":[{type:`debug`,prompt:"Programmet ska skriva ut `Hej` och sedan `Kodstig`, men det har tre små fel. Hitta och rätta alla.",starter:`console.WriteLine("Hej")
Console.WriteLine("Kodstig);`,output:`Hej
Kodstig`,solution:`Console.WriteLine("Hej");
Console.WriteLine("Kodstig");`,explain:`Console ska ha stort C, varje rad slutar med semikolon och texten måste ha citattecken på båda sidor.`,hint:`Titta på första bokstaven i första raden, slutet av första raden och citattecknen på andra raden.`},{type:`code`,prompt:`Rita en liten skylt med tre rader text. Utskriften ska bli exakt:

\`\`\`
+------+
| Milo |
+------+
\`\`\``,starter:`Console.WriteLine("+------+");
`,output:`+------+
| Milo |
+------+`,solution:`Console.WriteLine("+------+");
Console.WriteLine("| Milo |");
Console.WriteLine("+------+");`,explain:`Allt mellan citattecknen skrivs ut precis som det står, även mellanslag och tecken som + och |.`,hint:`Du behöver tre WriteLine-rader. Räkna mellanslagen runt Milo noga.`}],"cs-int":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int a = 1;
int b = 2;
a = b;
b = a;
Console.WriteLine(a);
Console.WriteLine(b);`,options:[`2
2`,`2
1`,`1
2`],answer:0,out:!0,explain:`Först får a värdet 2. När b = a körs har a redan blivit 2, så b får också 2. Det gamla värdet 1 är borta.`,why:{1:`Det hade stämt om b fick a:s gamla värde, men a har redan ändrats till 2 när b = a körs.`,2:`Båda variablerna får nya värden innan något skrivs ut.`}},{type:`code`,prompt:"Byt plats på värdena i `a` och `b` så att programmet skriver ut 8 och sedan 3. Du får inte skriva talen 3 eller 8 igen. Tips: en tredje variabel kan hålla ett värde tillfälligt.",starter:`int a = 3;
int b = 8;
// byt plats på värdena här
Console.WriteLine(a);
Console.WriteLine(b);`,output:`8
3`,solution:`int a = 3;
int b = 8;
int tillfällig = a;
a = b;
b = tillfällig;
Console.WriteLine(a);
Console.WriteLine(b);`,forbid:[c(`\\b(a|b)\\s*=\\s*(3|8)\\s*;[\\s\\S]*\\b(a|b)\\s*=\\s*(3|8)\\s*;[\\s\\S]*\\b(a|b)\\s*=\\s*(3|8)\\s*;`,`Byt plats med hjälp av variablerna i stället för att skriva in talen igen.`),c(`int\\s+a\\s*=\\s*8|int\\s+b\\s*=\\s*3`,`Låt startvärdena vara kvar och byt plats på dem med kod.`)],require:[c(`int\\s+[\\wåäöÅÄÖ]+\\s*=\\s*a\\s*;`,`Spara a:s värde i en ny variabel innan du skriver över a.`)],explain:`Om du skriver a = b direkt försvinner a:s gamla värde. Därför sparas det först i en tillfällig variabel.`,hint:`Skriv int tillfällig = a; sedan a = b; och sist b = tillfällig;.`}],"cs-math":[{type:`code`,prompt:"En låt är `135` sekunder lång. Skriv ut hur många hela minuter det är, och på nästa rad hur många sekunder som blir över.",starter:`int sekunder = 135;
`,output:`2
15`,solution:`int sekunder = 135;
Console.WriteLine(sekunder / 60);
Console.WriteLine(sekunder % 60);`,require:[c(`sekunder\\s*/\\s*60`,`Räkna ut minuterna med sekunder / 60.`),c(`sekunder\\s*%\\s*60`,`Räkna ut resten med sekunder % 60.`)],explain:`Heltalsdivision med 60 ger hela minuter, och % 60 ger sekunderna som blir kvar.`,hint:`En minut är 60 sekunder. Använd / och %.`},{type:`code`,prompt:"Räkna ut siffersumman av `int tal = 472;` (4 + 7 + 2) med hjälp av `/` och `%`, och skriv ut den. Koden ska fungera även om du byter till ett annat tresiffrigt tal.",starter:`int tal = 472;
`,output:`13`,solution:`int tal = 472;
int hundratal = tal / 100;
int tiotal = tal / 10 % 10;
int ental = tal % 10;
Console.WriteLine(hundratal + tiotal + ental);`,require:[c(`tal\\s*%\\s*10`,`Plocka ut sista siffran med tal % 10.`),c(`tal\\s*/\\s*100`,`Plocka ut första siffran med tal / 100.`)],forbid:[c(`WriteLine\\s*\\(\\s*13\\s*\\)|4\\s*\\+\\s*7\\s*\\+\\s*2`,`Räkna fram siffrorna ur variabeln tal i stället för att skriva dem direkt.`)],explain:`tal % 10 ger sista siffran, tal / 100 ger första, och tal / 10 % 10 ger den i mitten: 472 / 10 är 47, och 47 % 10 är 7.`,hint:`Första siffran: tal / 100. Mittensiffran: tal / 10 % 10. Sista siffran: tal % 10.`}],"cs-string":[{type:`debug`,prompt:"Programmet ska skriva ut `Summa: 5`, men det skriver ut `Summa: 23`. Rätta det så att talen räknas ihop.",starter:`int a = 2;
int b = 3;
Console.WriteLine("Summa: " + a + b);`,output:`Summa: 5`,solution:`int a = 2;
int b = 3;
Console.WriteLine("Summa: " + (a + b));`,forbid:[c(`"Summa: 5"|\\b5\\b`,`Låt koden räkna ut 5 med a och b.`)],explain:`C# läser + från vänster. "Summa: " + a blir text, och sedan klistras b på som text. Med parenteser räknas a + b ut först.`,hint:`Sätt parenteser runt a + b, eller räkna ut summan i en egen variabel först.`},{type:`code`,prompt:"Använd variablerna och skriv ut exakt `Lovelace, Ada (210 år)`. Åldern ska räknas ut från `född` och `nu`.",starter:`string förnamn = "Ada";
string efternamn = "Lovelace";
int född = 1815;
int nu = 2025;
`,output:`Lovelace, Ada (210 år)`,solution:`string förnamn = "Ada";
string efternamn = "Lovelace";
int född = 1815;
int nu = 2025;
int ålder = nu - född;
Console.WriteLine($"{efternamn}, {förnamn} ({ålder} år)");`,forbid:[c(`210|Lovelace,|Ada\\s*\\(`,`Bygg texten med variablerna och räkna ut åldern i stället för att skriva den direkt.`)],require:[c(`nu\\s*-\\s*född`,`Räkna ut åldern med nu - född.`)],explain:`Räkna ut åldern i en egen variabel först. Sedan blir interpoleringen lätt att läsa.`,hint:`Skapa int ålder = nu - född; och skriv ut $"{efternamn}, {förnamn} ({ålder} år)".`}],"cs-bool":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int a = 7;
int b = 2;
bool lika = a / b == 3;
Console.WriteLine(lika);`,options:[`True`,`False`,`3`],answer:0,out:!0,explain:`Två heltal ger ett heltal, så 7 / 2 blir 3. Sedan jämförs 3 == 3, som är sant.`,why:{1:`7 / 2 blir inte 3.5 här, eftersom båda talen är heltal. Det blir 3.`,2:`Jämförelsen med == ger alltid True eller False, aldrig ett tal.`}},{type:`code`,prompt:"Skriv ut tre rader för `int tal = 17;`: om tal är jämnt, om tal är större än 10, och om tal gånger 2 är lika med 34. Låt jämförelserna räkna fram True och False.",starter:`int tal = 17;
`,output:`False
True
True`,solution:`int tal = 17;
Console.WriteLine(tal % 2 == 0);
Console.WriteLine(tal > 10);
Console.WriteLine(tal * 2 == 34);`,require:[c(`tal\\s*%\\s*2\\s*==\\s*0`,`Ett tal är jämnt om tal % 2 == 0.`),c(`tal\\s*\\*\\s*2\\s*==\\s*34`,`Jämför tal * 2 med 34 med ==.`)],forbid:[c(`WriteLine\\s*\\(\\s*"?(True|False|true|false)"?\\s*\\)`,`Låt jämförelserna räkna fram svaret i stället för att skriva True eller False direkt.`)],explain:`En jämförelse kan skrivas ut direkt. Den blir True eller False.`,hint:`Använd tal % 2 == 0, tal > 10 och tal * 2 == 34 inne i WriteLine.`}],"cs-if":[{type:`debug`,prompt:"Talet är bara 3, men programmet ska ändå bara skriva ut `Klart`. Nu går det inte ens att köra. Hitta felet.",starter:`int x = 3;
if (x > 10);
{
    Console.WriteLine("Stort tal");
}
Console.WriteLine("Klart");`,output:`Klart`,solution:`int x = 3;
if (x > 10)
{
    Console.WriteLine("Stort tal");
}
Console.WriteLine("Klart");`,explain:`Ett semikolon direkt efter if (...) gör if-satsen tom, och blocket efter skulle köras ändå. Därför ska det inte stå något semikolon där.`,hint:`Titta noga i slutet av raden med if.`},{type:`code`,prompt:"Skriv tre **separata** if-satser för `int tal = -6;`. Skriv ut `Negativt` om tal är mindre än 0, `Jämnt` om tal är jämnt och `Delbart med 3` om tal är delbart med 3. Alla som stämmer ska skrivas ut, i den ordningen.",starter:`int tal = -6;
`,output:`Negativt
Jämnt
Delbart med 3`,solution:`int tal = -6;
if (tal < 0)
{
    Console.WriteLine("Negativt");
}
if (tal % 2 == 0)
{
    Console.WriteLine("Jämnt");
}
if (tal % 3 == 0)
{
    Console.WriteLine("Delbart med 3");
}`,require:[c(`if[\\s\\S]*if[\\s\\S]*if`,`Använd tre if-satser, en för varje kontroll.`),c(`%\\s*3\\s*==\\s*0`,`Delbart med 3 betyder att tal % 3 == 0.`)],explain:`Varje if testas för sig, så flera block kan köras. -6 % 2 och -6 % 3 blir båda 0.`,hint:`Villkoren blir tal < 0, tal % 2 == 0 och tal % 3 == 0.`}],"cs-else":[{type:`debug`,prompt:"Med 95 poäng ska programmet skriva ut `Toppen`, men det skriver `Godkänt`. Rätta ordningen på villkoren.",starter:`int poäng = 95;
if (poäng >= 50)
{
    Console.WriteLine("Godkänt");
}
else if (poäng >= 90)
{
    Console.WriteLine("Toppen");
}
else
{
    Console.WriteLine("Underkänt");
}`,output:`Toppen`,solution:`int poäng = 95;
if (poäng >= 90)
{
    Console.WriteLine("Toppen");
}
else if (poäng >= 50)
{
    Console.WriteLine("Godkänt");
}
else
{
    Console.WriteLine("Underkänt");
}`,require:[c(`else\\s+if`,`Behåll else if-strukturen.`)],explain:`Bara det första sanna villkoret körs. Eftersom 95 >= 50 kom först nådde koden aldrig Toppen. Den strängaste gränsen ska testas först.`,hint:`Vilket villkor borde testas först, >= 90 eller >= 50?`},{type:`code`,prompt:"Avgör om `int år = 1900;` är ett skottår. Reglerna, i tur och ordning: delbart med 400 ger skottår. Annars: delbart med 100 ger inte skottår. Annars: delbart med 4 ger skottår. Annars är det inte skottår. Skriv ut `Skottår` eller `Inte skottår`.",starter:`int år = 1900;
`,output:`Inte skottår`,solution:`int år = 1900;
if (år % 400 == 0)
{
    Console.WriteLine("Skottår");
}
else if (år % 100 == 0)
{
    Console.WriteLine("Inte skottår");
}
else if (år % 4 == 0)
{
    Console.WriteLine("Skottår");
}
else
{
    Console.WriteLine("Inte skottår");
}`,require:[c(`år\\s*%\\s*400`,`Testa först år % 400.`),c(`år\\s*%\\s*100`,`Testa år % 100.`),c(`år\\s*%\\s*4\\b`,`Testa år % 4.`),c(`else\\s+if`,`Använd else if för reglerna efter den första.`)],explain:`Ordningen är hela poängen: 1900 är delbart med 4, men regeln om 100 testas före och stoppar det. Prova gärna med 2000, 2024 och 2023 också.`,hint:`Skriv if (år % 400 == 0), else if (år % 100 == 0), else if (år % 4 == 0) och sist else.`}],"cs-while":[{type:`code`,prompt:"Börja med `int tal = 100;`. Skriv ut talet, halvera det med heltalsdivision och upprepa så länge talet är större än 1. Sista raden ska vara 1.",starter:`int tal = 100;
`,output:`100
50
25
12
6
3
1`,solution:`int tal = 100;
while (tal > 1)
{
    Console.WriteLine(tal);
    tal = tal / 2;
}
Console.WriteLine(tal);`,require:[c(`while\\s*\\(`,`Använd en while-loop.`),c(`tal\\s*=\\s*tal\\s*/\\s*2`,`Halvera med tal = tal / 2;.`)],explain:`Loopen slutar när tal blir 1, så den sista utskriften görs efter loopen. 25 / 2 blir 12 eftersom det är heltal.`,hint:`Skriv ut och halvera inne i loopen med villkoret tal > 1. Skriv ut tal en gång till efter loopen.`},{type:`code`,prompt:`Lägg ihop 1 + 2 + 3 + ... tills summan blir **större än 50**. Skriv sedan ut hur många tal som behövdes och på nästa rad vilken summa det blev.`,starter:`int summa = 0;
int tal = 0;
`,output:`10
55`,solution:`int summa = 0;
int tal = 0;
while (summa <= 50)
{
    tal++;
    summa += tal;
}
Console.WriteLine(tal);
Console.WriteLine(summa);`,require:[c(`while\\s*\\(`,`Använd en while-loop, eftersom du inte vet i förväg hur många varv som behövs.`)],forbid:[c(`WriteLine\\s*\\(\\s*(10|55)\\s*\\)`,`Låt loopen räkna fram svaren.`)],explain:`while passar när du inte vet hur många varv det blir, bara när det ska sluta. Loopen fortsätter så länge summan är högst 50.`,hint:`Villkoret blir summa <= 50. Öka tal med 1 och lägg till det i summa i varje varv.`}],"cs-for":[{type:`code`,prompt:`Rita en trappa med en for-loop. Utskriften ska bli fem rader där rad 1 har en stjärna, rad 2 två stjärnor och så vidare upp till fem. Bygg upp raden i en string-variabel.`,starter:`string rad = "";
`,output:`*
**
***
****
*****`,solution:`string rad = "";
for (int i = 1; i <= 5; i++)
{
    rad = rad + "*";
    Console.WriteLine(rad);
}`,require:[c(`for\\s*\\(`,`Använd en for-loop.`)],forbid:[c(`"\\*\\*`,`Låt loopen bygga upp raderna en stjärna i taget.`)],explain:`Variabeln rad växer med en stjärna i varje varv, och skrivs ut efter varje tillägg.`,hint:`Lägg till en stjärna med rad = rad + "*"; och skriv ut rad i varje varv.`},{type:`code`,prompt:"FizzBuzz! Skriv ut talen 1 till 15 med en for-loop, men skriv `Fizz` för tal delbara med 3, `Buzz` för tal delbara med 5 och `FizzBuzz` för tal delbara med både 3 och 5.",starter:``,output:`1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`,solution:`for (int i = 1; i <= 15; i++)
{
    if (i % 15 == 0)
    {
        Console.WriteLine("FizzBuzz");
    }
    else if (i % 3 == 0)
    {
        Console.WriteLine("Fizz");
    }
    else if (i % 5 == 0)
    {
        Console.WriteLine("Buzz");
    }
    else
    {
        Console.WriteLine(i);
    }
}`,require:[c(`for\\s*\\(`,`Använd en for-loop.`),c(`else`,`Använd else if och else så att bara en rad skrivs per tal.`)],explain:`Det mest specifika fallet, delbart med både 3 och 5 (alltså med 15), måste testas först. Annars fångas 15 redan av Fizz.`,hint:`Testa i % 15 == 0 först, sedan i % 3 == 0, sedan i % 5 == 0 och sist else.`}],"cs-double":[{type:`code`,prompt:"Gör om `double celsius = 21.5;` till Fahrenheit och skriv ut svaret. Formeln är F = C · 9 / 5 + 32. Svaret ska bli 70.7.",starter:`double celsius = 21.5;
`,output:`70.7`,solution:`double celsius = 21.5;
double fahrenheit = celsius * 9 / 5 + 32;
Console.WriteLine(fahrenheit);`,require:[c(`celsius\\s*\\*\\s*9`,`Använd variabeln celsius i formeln.`)],forbid:[c(`70\\.7`,`Låt koden räkna fram svaret.`)],explain:`Eftersom celsius är en double räknas hela uttrycket med decimaler.`,hint:`Skriv double fahrenheit = celsius * 9 / 5 + 32;.`},{type:`debug`,prompt:`Du hade 7 rätt av 8 frågor och programmet ska skriva ut 87.5 (procent), men det skriver ut 0. Rätta uträkningen.`,starter:`int rätt = 7;
int frågor = 8;
double procent = rätt / frågor * 100;
Console.WriteLine(procent);`,output:`87.5`,solution:`int rätt = 7;
int frågor = 8;
double procent = (double)rätt / frågor * 100;
Console.WriteLine(procent);`,forbid:[c(`87\\.5`,`Rätta uträkningen i stället för att skriva svaret.`)],explain:`rätt / frågor är två heltal, så 7 / 8 blir 0 redan innan värdet sparas i en double. Med (double) görs divisionen med decimaler.`,hint:`Det hjälper inte att variabeln är en double om divisionen redan blivit 0. Gör om rätt till double före divisionen.`}],"cs-array":[{type:`debug`,prompt:`Programmet ska skriva ut varje djur med sitt index, men det kraschar på slutet. Rätta loopen.`,starter:`string[] djur = {"panda", "räv", "uggla"};
for (int i = 0; i <= djur.Length; i++)
{
    Console.WriteLine($"{i}: {djur[i]}");
}`,output:`0: panda
1: räv
2: uggla`,solution:`string[] djur = {"panda", "räv", "uggla"};
for (int i = 0; i < djur.Length; i++)
{
    Console.WriteLine($"{i}: {djur[i]}");
}`,explain:`Arrayen har 3 element med index 0, 1 och 2. Med <= försöker loopen läsa djur[3], som inte finns.`,hint:`Vilket är det sista giltiga indexet? Jämför med villkoret i loopen.`},{type:`code`,prompt:"Byt plats på första och sista elementet i arrayen och skriv sedan ut alla element, ett per rad, med en for-loop. Använd `Length` för att hitta sista indexet.",starter:`int[] tal = {4, 8, 15, 16, 23, 42};
`,output:`42
8
15
16
23
4`,solution:`int[] tal = {4, 8, 15, 16, 23, 42};
int först = tal[0];
tal[0] = tal[tal.Length - 1];
tal[tal.Length - 1] = först;
for (int i = 0; i < tal.Length; i++)
{
    Console.WriteLine(tal[i]);
}`,require:[c(`Length\\s*-\\s*1`,`Hitta sista indexet med tal.Length - 1.`),c(`for\\s*\\(`,`Skriv ut elementen med en for-loop.`)],forbid:[c(`=\\s*(42|4)\\s*;`,`Byt plats med hjälp av elementen i stället för att skriva in talen.`)],explain:`Som när du byter plats på två variabler behöver du spara det ena värdet tillfälligt.`,hint:`Spara tal[0] i en variabel, flytta sista elementet till index 0 och lägg det sparade värdet sist.`}],"cs-foreach":[{type:`code`,prompt:`Gå igenom arrayen med foreach. Skriv ut summan av de **positiva** talen och på nästa rad **antalet** negativa tal.`,starter:`int[] tal = {4, -3, 7, 10, -8, 5};
`,output:`26
2`,solution:`int[] tal = {4, -3, 7, 10, -8, 5};
int summa = 0;
int negativa = 0;
foreach (int t in tal)
{
    if (t > 0)
    {
        summa += t;
    }
    if (t < 0)
    {
        negativa++;
    }
}
Console.WriteLine(summa);
Console.WriteLine(negativa);`,require:[c(`foreach\\s*\\(`,`Använd foreach.`)],forbid:[c(`WriteLine\\s*\\(\\s*(26|2)\\s*\\)`,`Låt loopen räkna fram svaren.`)],explain:`Två ackumulatorer kan uppdateras i samma loop. Båda skapas före loopen.`,hint:`Skapa int summa = 0; och int negativa = 0; före loopen och uppdatera dem med två if-satser.`},{type:`debug`,prompt:`Medelbetyget ska bli 4.25, men programmet skriver ut 4. Rätta det.`,starter:`int[] betyg = {3, 4, 5, 5};
int summa = 0;
foreach (int b in betyg)
{
    summa += b;
}
double snitt = summa / betyg.Length;
Console.WriteLine(snitt);`,output:`4.25`,solution:`int[] betyg = {3, 4, 5, 5};
int summa = 0;
foreach (int b in betyg)
{
    summa += b;
}
double snitt = (double)summa / betyg.Length;
Console.WriteLine(snitt);`,forbid:[c(`4\\.25`,`Rätta uträkningen i stället för att skriva svaret.`)],explain:`summa och betyg.Length är båda heltal, så divisionen kapar decimalerna. (double) räddar dem.`,hint:`Samma fälla som i lektionen om decimaltal: gör om summa till double före divisionen.`}],"cs-strmethods":[{type:`code`,prompt:"Skriv ut initialerna som versaler med punkt efter, alltså `A.L.`. Använd variablerna.",starter:`string förnamn = "ada";
string efternamn = "lovelace";
`,output:`A.L.`,solution:`string förnamn = "ada";
string efternamn = "lovelace";
string f = förnamn.Substring(0, 1).ToUpper();
string e = efternamn.Substring(0, 1).ToUpper();
Console.WriteLine(f + "." + e + ".");`,require:[c(`ToUpper\\s*\\(`,`Gör om bokstäverna till versaler med ToUpper().`)],forbid:[c(`"A|"L`,`Plocka ut bokstäverna ur variablerna i stället för att skriva dem direkt.`)],explain:`Substring(0, 1) ger första tecknet som text, och ToUpper gör det stort.`,hint:`Använd förnamn.Substring(0, 1).ToUpper() och samma för efternamn. Sätt ihop med ".".`},{type:`code`,prompt:'Räkna hur många a som finns i `string ord = "Ananas";`, både stora och små. Svaret ska bli 3. Gå igenom texten med en for-loop.',starter:`string ord = "Ananas";
`,output:`3`,solution:`string ord = "Ananas";
string liten = ord.ToLower();
int antal = 0;
for (int i = 0; i < liten.Length; i++)
{
    if (liten.Substring(i, 1) == "a")
    {
        antal++;
    }
}
Console.WriteLine(antal);`,require:[c(`for\\s*\\(`,`Gå igenom texten med en for-loop.`),c(`ToLower|ToUpper`,`Gör om texten till små (eller stora) bokstäver först, så räknas både A och a.`)],forbid:[c(`WriteLine\\s*\\(\\s*3\\s*\\)`,`Låt loopen räkna fram svaret.`)],explain:`Genom att göra om hela texten till gemener först behöver du bara jämföra med "a".`,hint:`Gör string liten = ord.ToLower(); och jämför liten.Substring(i, 1) == "a" i varje varv.`}],"cs-andor":[{type:`code`,prompt:"Skriv `static bool ÄrSkottår(int år)`. Ett år är skottår om det är delbart med 4 och inte med 100, eller om det är delbart med 400. Lös det med `&&` och `||` i ett enda return.",starter:`static bool ÄrSkottår(int år)
{
}
`,tests:[{fn:`ÄrSkottår`,args:[2024],expect:!0},{fn:`ÄrSkottår`,args:[2023],expect:!1},{fn:`ÄrSkottår`,args:[1900],expect:!1,edge:`delbart med 100 men inte 400`},{fn:`ÄrSkottår`,args:[2e3],expect:!0,edge:`delbart med 400`}],solution:`static bool ÄrSkottår(int år)
{
    return (år % 4 == 0 && år % 100 != 0) || år % 400 == 0;
}`,require:[c(`&&`,`Använd && för ”delbart med 4 och inte med 100”.`),c(`\\|\\|`,`Använd || för ”eller delbart med 400”.`)],explain:`Parenteserna håller ihop ”delbart med 4 och inte med 100” som en del, och || lägger till undantaget för 400.`,hint:`return (år % 4 == 0 && år % 100 != 0) || år % 400 == 0;`},{type:`code`,prompt:"Skriv `static bool StarktLösen(string lösen)` som returnerar true om lösenordet är minst 8 tecken, saknar mellanslag och innehåller `!` eller `?`.",starter:`static bool StarktLösen(string lösen)
{
}
`,tests:[{fn:`StarktLösen`,args:[`panda123!`],expect:!0},{fn:`StarktLösen`,args:[`kodstig?`],expect:!0,edge:`exakt 8 tecken`},{fn:`StarktLösen`,args:[`panda!`],expect:!1,edge:`för kort`},{fn:`StarktLösen`,args:[`pandapanda`],expect:!1,edge:`varken ! eller ?`},{fn:`StarktLösen`,args:[`panda 123!`],expect:!1,edge:`innehåller mellanslag`}],solution:`static bool StarktLösen(string lösen)
{
    return lösen.Length >= 8 && !lösen.Contains(" ") && (lösen.Contains("!") || lösen.Contains("?"));
}`,explain:`Tre krav som alla måste gälla binds ihop med &&. Det sista kravet har två alternativ, så det får egna parenteser med ||.`,hint:`Kombinera lösen.Length >= 8, !lösen.Contains(" ") och (lösen.Contains("!") || lösen.Contains("?")).`}],"cs-bounds":[{type:`code`,prompt:'Skriv `static string Biljett(int ålder)` som returnerar `"Gratis"` för 0 till 6 år, `"Barn"` för 7 till 17, `"Vuxen"` för 18 till 64 och `"Pensionär"` från 65. En negativ ålder ger `"Ogiltig"`.',starter:`static string Biljett(int ålder)
{
}
`,tests:[{fn:`Biljett`,args:[6],expect:`Gratis`,edge:`exakt 6`},{fn:`Biljett`,args:[7],expect:`Barn`,edge:`exakt 7`},{fn:`Biljett`,args:[17],expect:`Barn`},{fn:`Biljett`,args:[18],expect:`Vuxen`,edge:`exakt 18`},{fn:`Biljett`,args:[64],expect:`Vuxen`},{fn:`Biljett`,args:[65],expect:`Pensionär`,edge:`exakt 65`},{fn:`Biljett`,args:[0],expect:`Gratis`,edge:`nyfödd`},{fn:`Biljett`,args:[-1],expect:`Ogiltig`,edge:`negativ ålder`}],solution:`static string Biljett(int ålder)
{
    if (ålder < 0)
    {
        return "Ogiltig";
    }
    if (ålder <= 6)
    {
        return "Gratis";
    }
    if (ålder <= 17)
    {
        return "Barn";
    }
    if (ålder <= 64)
    {
        return "Vuxen";
    }
    return "Pensionär";
}`,explain:`Med ett villkor per gräns, i ordning från lägst, behöver varje if bara den övre gränsen. Testerna kollar båda sidor om varje gräns.`,hint:`Hantera ålder < 0 först. Testa sedan ålder <= 6, <= 17 och <= 64, och returnera "Pensionär" sist.`},{type:`debug`,prompt:"`ÄrInom` ska returnera true om x ligger mellan min och max, **gränserna inräknade**. Men 1 och 10 räknas inte som inom 1 till 10. Rätta metoden.",starter:`static bool ÄrInom(int x, int min, int max)
{
    return x > min && x < max;
}
`,tests:[{fn:`ÄrInom`,args:[5,1,10],expect:!0},{fn:`ÄrInom`,args:[1,1,10],expect:!0,edge:`x på nedre gränsen`},{fn:`ÄrInom`,args:[10,1,10],expect:!0,edge:`x på övre gränsen`},{fn:`ÄrInom`,args:[0,1,10],expect:!1},{fn:`ÄrInom`,args:[11,1,10],expect:!1},{fn:`ÄrInom`,args:[3,3,3],expect:!0,edge:`min och max är samma tal`}],solution:`static bool ÄrInom(int x, int min, int max)
{
    return x >= min && x <= max;
}`,explain:`”Gränserna inräknade” betyder >= och <= på båda sidor.`,hint:`Båda jämförelserna behöver ett likhetstecken.`}],"cs-accum":[{type:`code`,prompt:"Skriv `static int Spann(int[] tal)` som returnerar skillnaden mellan det största och det minsta talet. En tom array ger 0. Hitta båda i samma loop.",starter:`static int Spann(int[] tal)
{
}
`,tests:[{fn:`Spann`,args:[[3,9,2,7]],expect:7},{fn:`Spann`,args:[[5]],expect:0,edge:`bara ett tal`},{fn:`Spann`,args:[[-5,-2,-9]],expect:7,edge:`bara negativa tal`},{fn:`Spann`,args:[[]],expect:0,edge:`tom array`}],solution:`static int Spann(int[] tal)
{
    if (tal.Length == 0)
    {
        return 0;
    }
    int störst = tal[0];
    int minst = tal[0];
    foreach (int t in tal)
    {
        if (t > störst)
        {
            störst = t;
        }
        if (t < minst)
        {
            minst = t;
        }
    }
    return störst - minst;
}`,explain:`Båda ackumulatorerna startar på tal[0]. Därför måste den tomma arrayen hanteras först, annars finns inget tal[0].`,hint:`Returnera 0 om tal.Length == 0. Starta störst och minst på tal[0] och uppdatera båda i loopen.`},{type:`code`,prompt:"Skriv `static int LängstaPlusserie(int[] tal)` som returnerar längden på den längsta serien av positiva tal (större än 0) i rad. Till exempel ger `{1, 2, -1, 3, 4, 5, 0, 2}` svaret 3.",starter:`static int LängstaPlusserie(int[] tal)
{
}
`,tests:[{fn:`LängstaPlusserie`,args:[[1,2,-1,3,4,5,0,2]],expect:3},{fn:`LängstaPlusserie`,args:[[4,4,4]],expect:3,edge:`hela arrayen är en serie`},{fn:`LängstaPlusserie`,args:[[-1,-2]],expect:0,edge:`inga positiva tal`},{fn:`LängstaPlusserie`,args:[[0,1,0]],expect:1,edge:`0 räknas inte som positivt`},{fn:`LängstaPlusserie`,args:[[]],expect:0,edge:`tom array`}],solution:`static int LängstaPlusserie(int[] tal)
{
    int nu = 0;
    int bäst = 0;
    foreach (int t in tal)
    {
        if (t > 0)
        {
            nu++;
            if (nu > bäst)
            {
                bäst = nu;
            }
        }
        else
        {
            nu = 0;
        }
    }
    return bäst;
}`,explain:`Två ackumulatorer: nu räknar den pågående serien och nollställs vid ett tal som inte är positivt, bäst minns den längsta hittills.`,hint:`Öka nu när t > 0, annars sätt nu = 0. Uppdatera bäst när nu blir större.`},{type:`code`,prompt:'Skriv `static string Längst(string[] ord)` som returnerar det längsta ordet. Om flera är lika långa vinner det första. En tom array ger tom text `""`.',starter:`static string Längst(string[] ord)
{
}
`,tests:[{fn:`Längst`,args:[[`kod`,`panda`,`is`]],expect:`panda`},{fn:`Längst`,args:[[`katt`,`hund`,`räv`]],expect:`katt`,edge:`lika långa: det första vinner`},{fn:`Längst`,args:[[]],expect:``,edge:`tom array`},{fn:`Längst`,args:[[`a`,`bb`,`ccc`]],expect:`ccc`,edge:`det längsta ligger sist`}],solution:`static string Längst(string[] ord)
{
    string längst = "";
    foreach (string o in ord)
    {
        if (o.Length > längst.Length)
        {
            längst = o;
        }
    }
    return längst;
}`,explain:`Här fungerar "" som startvärde, eftersom inget ord kan vara kortare än tom text. Med > (inte >=) behåller det första ordet ledningen vid lika längd.`,hint:`Starta med string längst = ""; och byt när o.Length > längst.Length.`}],"cs-index":[{type:`code`,prompt:"Skriv `static int SistaIndex(int[] tal, int mål)` som returnerar indexet för den **sista** förekomsten av `mål`, eller -1 om det inte finns.",starter:`static int SistaIndex(int[] tal, int mål)
{
}
`,tests:[{fn:`SistaIndex`,args:[[4,8,4,2],4],expect:2,edge:`flera träffar: den sista gäller`},{fn:`SistaIndex`,args:[[4,8,15],4],expect:0},{fn:`SistaIndex`,args:[[1,2],9],expect:-1,edge:`talet saknas`},{fn:`SistaIndex`,args:[[],1],expect:-1,edge:`tom array`}],solution:`static int SistaIndex(int[] tal, int mål)
{
    for (int i = tal.Length - 1; i >= 0; i--)
    {
        if (tal[i] == mål)
        {
            return i;
        }
    }
    return -1;
}`,explain:`Om du går baklänges blir den första träffen den sista förekomsten, och då kan du returnera direkt.`,hint:`Låt loopen gå från tal.Length - 1 ner till 0 och returnera i vid första träffen.`},{type:`code`,prompt:"Skriv `static bool ÄrSorterad(int[] tal)` som returnerar true om talen aldrig minskar, alltså om varje tal är minst lika stort som talet före.",starter:`static bool ÄrSorterad(int[] tal)
{
}
`,tests:[{fn:`ÄrSorterad`,args:[[1,3,7]],expect:!0},{fn:`ÄrSorterad`,args:[[1,5,4]],expect:!1},{fn:`ÄrSorterad`,args:[[2,2,3]],expect:!0,edge:`lika tal i rad är okej`},{fn:`ÄrSorterad`,args:[[9]],expect:!0,edge:`ett enda tal`},{fn:`ÄrSorterad`,args:[[]],expect:!0,edge:`tom array`},{fn:`ÄrSorterad`,args:[[1,2,3,0]],expect:!1,edge:`felet ligger sist`}],solution:`static bool ÄrSorterad(int[] tal)
{
    for (int i = 1; i < tal.Length; i++)
    {
        if (tal[i] < tal[i - 1])
        {
            return false;
        }
    }
    return true;
}`,explain:`Ett enda fall där ett tal är mindre än talet före räcker för att svara false. Hittas inget sådant är arrayen sorterad.`,hint:`Starta på i = 1 och returnera false om tal[i] < tal[i - 1]. Returnera true efter loopen.`},{type:`code`,prompt:"Skriv `static int NärmastIndex(int[] tal, int mål)` som returnerar index för det tal som ligger närmast `mål`. Vid lika avstånd vinner det första. Tom array ger -1.",starter:`static int NärmastIndex(int[] tal, int mål)
{
}
`,tests:[{fn:`NärmastIndex`,args:[[10,22,35],20],expect:1},{fn:`NärmastIndex`,args:[[3,7],5],expect:0,edge:`lika avstånd: det första vinner`},{fn:`NärmastIndex`,args:[[-8,1,30],-5],expect:0,edge:`negativa tal`},{fn:`NärmastIndex`,args:[[4,9,4],9],expect:1,edge:`exakt träff`},{fn:`NärmastIndex`,args:[[],3],expect:-1,edge:`tom array`}],solution:`static int NärmastIndex(int[] tal, int mål)
{
    if (tal.Length == 0)
    {
        return -1;
    }
    int bäst = 0;
    int bästAvstånd = tal[0] - mål;
    if (bästAvstånd < 0)
    {
        bästAvstånd = -bästAvstånd;
    }
    for (int i = 1; i < tal.Length; i++)
    {
        int avstånd = tal[i] - mål;
        if (avstånd < 0)
        {
            avstånd = -avstånd;
        }
        if (avstånd < bästAvstånd)
        {
            bäst = i;
            bästAvstånd = avstånd;
        }
    }
    return bäst;
}`,explain:`Avståndet är skillnaden utan minustecken. Du sparar både index och avstånd för den bästa hittills, och byter bara vid strikt kortare avstånd.`,hint:`Räkna avstånd = tal[i] - mål och gör det positivt med avstånd = -avstånd om det är negativt. Spara bästa index och avstånd.`}],"cs-methods":[{type:`code`,prompt:"Skriv `static void Rad()` som skriver ut `+---+`, och `static void Låda()` som anropar Rad, skriver ut `|   |` och anropar Rad igen. Anropa sedan Låda två gånger.",starter:``,output:`+---+
|   |
+---+
+---+
|   |
+---+`,solution:`Låda();
Låda();

static void Rad()
{
    Console.WriteLine("+---+");
}

static void Låda()
{
    Rad();
    Console.WriteLine("|   |");
    Rad();
}`,require:[c(`static\\s+void\\s+Rad\\s*\\(\\s*\\)`,`Skapa metoden static void Rad().`),c(`static\\s+void\\s+Låda\\s*\\(\\s*\\)\\s*\\{[^}]*Rad\\s*\\(\\s*\\)`,`Låt Låda anropa Rad.`)],forbid:[c(`"\\+---\\+"[\\s\\S]*"\\+---\\+"`,`Skriv texten +---+ bara på ett ställe, i Rad.`)],explain:`En metod kan anropa en annan. Låda bygger på Rad, så +---+ finns bara på ett enda ställe i koden.`,hint:`I Låda: Rad(); Console.WriteLine("|   |"); Rad();. Anropa Låda(); två gånger högst upp.`},{type:`debug`,prompt:"Programmet ska skriva ut `Start`, talen 1 till 3 och sedan `Slut`, men anropet av metoden är fel på två sätt. Rätta det.",starter:`Console.WriteLine("Start");
räknaTill3;
Console.WriteLine("Slut");

static void RäknaTill3()
{
    for (int i = 1; i <= 3; i++)
    {
        Console.WriteLine(i);
    }
}`,output:`Start
1
2
3
Slut`,solution:`Console.WriteLine("Start");
RäknaTill3();
Console.WriteLine("Slut");

static void RäknaTill3()
{
    for (int i = 1; i <= 3; i++)
    {
        Console.WriteLine(i);
    }
}`,explain:`Namnet måste stavas exakt som metoden, med stort R, och parenteserna () behövs för att metoden ska köras.`,hint:`Jämför namnet i anropet med metodens namn bokstav för bokstav. Vad saknas efter namnet?`}],"cs-params":[{type:`code`,prompt:'Skriv `static void Rektangel(int bredd, int höjd, string tecken)` som ritar en rektangel med tecknet. Anropa den med `Rektangel(4, 2, "#");` och sedan `Rektangel(2, 3, "*");`.',starter:``,output:`####
####
**
**
**`,solution:`Rektangel(4, 2, "#");
Rektangel(2, 3, "*");

static void Rektangel(int bredd, int höjd, string tecken)
{
    for (int rad = 0; rad < höjd; rad++)
    {
        for (int i = 0; i < bredd; i++)
        {
            Console.Write(tecken);
        }
        Console.WriteLine();
    }
}`,require:[c(`static\\s+void\\s+Rektangel\\s*\\(\\s*int\\s+[\\wåäöÅÄÖ]+\\s*,\\s*int\\s+[\\wåäöÅÄÖ]+\\s*,\\s*string\\s+[\\wåäöÅÄÖ]+\\s*\\)`,`Skapa metoden static void Rektangel(int bredd, int höjd, string tecken).`)],forbid:[c(`"##|"\\*\\*`,`Låt loopar och parametrar bygga raderna.`)],explain:`En loop för raderna och en loop inuti för tecknen på varje rad. Parametrarna styr hur många varv varje loop går.`,hint:`Yttre loop: höjd varv. Inre loop: skriv tecken bredd gånger med Console.Write. Avsluta varje rad med Console.WriteLine();.`},{type:`code`,prompt:'Skriv `static void Kvitto(string vara, int antal, int styckpris)` som skriver ut till exempel `3 st Kaffe: 75 kr`. Om antal är 0 eller mindre ska den i stället skriva ut `Ingen Kaffe`. Anropa den med `Kvitto("Kaffe", 3, 25);` och `Kvitto("Bulle", 0, 15);`.',starter:``,output:`3 st Kaffe: 75 kr
Ingen Bulle`,solution:`Kvitto("Kaffe", 3, 25);
Kvitto("Bulle", 0, 15);

static void Kvitto(string vara, int antal, int styckpris)
{
    if (antal <= 0)
    {
        Console.WriteLine($"Ingen {vara}");
    }
    else
    {
        Console.WriteLine($"{antal} st {vara}: {antal * styckpris} kr");
    }
}`,require:[c(`static\\s+void\\s+Kvitto\\s*\\(\\s*string\\s+[\\wåäöÅÄÖ]+\\s*,\\s*int\\s+[\\wåäöÅÄÖ]+\\s*,\\s*int\\s+[\\wåäöÅÄÖ]+\\s*\\)`,`Skapa metoden static void Kvitto(string vara, int antal, int styckpris).`)],forbid:[c(`75|"Ingen Bulle"|"3 st`,`Låt metoden bygga texten från parametrarna.`)],explain:`Parametrarna kan användas både i villkor och i uträkningar. Samma metod ger rätt text för alla varor.`,hint:`Testa antal <= 0 med if. Annars skriv ut $"{antal} st {vara}: {antal * styckpris} kr".`}],"cs-return":[{type:`code`,prompt:"Skriv `static int Siffersumma(int tal)` som returnerar summan av talets siffror, till exempel 13 för 472. Använd en while-loop så att det fungerar för tal av alla längder. Ett negativt tal räknas som det positiva.",starter:`static int Siffersumma(int tal)
{
}
`,tests:[{fn:`Siffersumma`,args:[472],expect:13},{fn:`Siffersumma`,args:[5],expect:5,edge:`en siffra`},{fn:`Siffersumma`,args:[1e3],expect:1,edge:`nollor i talet`},{fn:`Siffersumma`,args:[0],expect:0},{fn:`Siffersumma`,args:[-472],expect:13,edge:`negativt tal`}],solution:`static int Siffersumma(int tal)
{
    if (tal < 0)
    {
        tal = -tal;
    }
    int summa = 0;
    while (tal > 0)
    {
        summa += tal % 10;
        tal = tal / 10;
    }
    return summa;
}`,require:[c(`while\\s*\\(`,`Använd en while-loop.`)],explain:`tal % 10 plockar sista siffran och tal / 10 tar bort den. Loopen fortsätter tills inga siffror är kvar.`,hint:`Gör tal positivt först. Lägg sedan till tal % 10 i summan och dela tal med 10 tills tal är 0.`},{type:`code`,prompt:"Skriv `static int Max2(int a, int b)` som returnerar det största av två tal, och `static int Max3(int a, int b, int c)` som returnerar det största av tre. Max3 ska använda returvärdet från Max2.",starter:`static int Max2(int a, int b)
{
}

static int Max3(int a, int b, int c)
{
}
`,tests:[{fn:`Max2`,args:[3,8],expect:8},{fn:`Max2`,args:[5,5],expect:5,edge:`lika tal`},{fn:`Max3`,args:[3,9,4],expect:9},{fn:`Max3`,args:[1,2,7],expect:7,edge:`störst sist`},{fn:`Max3`,args:[-3,-9,-4],expect:-3,edge:`bara negativa tal`}],solution:`static int Max2(int a, int b)
{
    if (a > b)
    {
        return a;
    }
    return b;
}

static int Max3(int a, int b, int c)
{
    return Max2(Max2(a, b), c);
}`,require:[c(`Max3[\\s\\S]*Max2\\s*\\(`,`Låt Max3 anropa Max2.`)],explain:`Returvärdet från Max2(a, b) kan skickas rakt in i ett nytt anrop. Så återanvänder du lösningen i stället för att skriva fler if-satser.`,hint:`Max3 kan bli en enda rad: return Max2(Max2(a, b), c);`}],"cs-list":[{type:`code`,prompt:"Skriv `static List<int> Omvänd(List<int> tal)` som returnerar en **ny** lista med talen i omvänd ordning.",starter:`static List<int> Omvänd(List<int> tal)
{
}
`,tests:[{fn:`Omvänd`,args:[[1,2,3]],expect:[3,2,1]},{fn:`Omvänd`,args:[[7]],expect:[7],edge:`ett element`},{fn:`Omvänd`,args:[[]],expect:[],edge:`tom lista`}],solution:`static List<int> Omvänd(List<int> tal)
{
    List<int> resultat = new List<int>();
    for (int i = tal.Count - 1; i >= 0; i--)
    {
        resultat.Add(tal[i]);
    }
    return resultat;
}`,explain:`En lista har Count i stället för Length. Genom att gå baklänges och lägga till med Add hamnar sista talet först.`,hint:`Låt en for-loop gå från tal.Count - 1 ner till 0 och lägg till tal[i] i en ny lista.`},{type:`code`,prompt:"Skriv `static List<int> Löpande(List<int> tal)` som returnerar den löpande summan: varje element är summan av alla tal fram till och med den platsen. `{1, 2, 3, 4}` ger `{1, 3, 6, 10}`.",starter:`static List<int> Löpande(List<int> tal)
{
}
`,tests:[{fn:`Löpande`,args:[[1,2,3,4]],expect:[1,3,6,10]},{fn:`Löpande`,args:[[5,-5,2]],expect:[5,0,2],edge:`negativa tal`},{fn:`Löpande`,args:[[]],expect:[],edge:`tom lista`}],solution:`static List<int> Löpande(List<int> tal)
{
    List<int> resultat = new List<int>();
    int summa = 0;
    foreach (int t in tal)
    {
        summa += t;
        resultat.Add(summa);
    }
    return resultat;
}`,explain:`En ackumulator och en ny lista samarbetar: summan växer i varje varv och läggs till i listan direkt.`,hint:`Håll en summa som du ökar med t i varje varv, och lägg till summan i resultatlistan.`}],"cs-validate":[{type:`code`,prompt:'Skriv `static string KollaNamn(string namn)` för ett användarnamn. Trimma först. Returnera sedan den första regeln som bryts: tomt ger `"Tomt namn"`, under 3 tecken `"För kort"`, över 12 tecken `"För långt"`, mellanslag inuti `"Inga mellanslag"`, siffra först `"Börjar med siffra"`. Annars `"OK"`.',starter:`static string KollaNamn(string namn)
{
}
`,tests:[{fn:`KollaNamn`,args:[`panda99`],expect:`OK`},{fn:`KollaNamn`,args:[`   `],expect:`Tomt namn`,edge:`bara mellanslag`},{fn:`KollaNamn`,args:[`ab`],expect:`För kort`},{fn:`KollaNamn`,args:[` abc `],expect:`OK`,edge:`mellanslag runt om trimmas bort`},{fn:`KollaNamn`,args:[`abcdefghijklm`],expect:`För långt`,edge:`13 tecken`},{fn:`KollaNamn`,args:[`abcdefghijkl`],expect:`OK`,edge:`exakt 12 tecken`},{fn:`KollaNamn`,args:[`ada love`],expect:`Inga mellanslag`},{fn:`KollaNamn`,args:[`9lives`],expect:`Börjar med siffra`}],solution:`static string KollaNamn(string namn)
{
    if (string.IsNullOrWhiteSpace(namn))
    {
        return "Tomt namn";
    }
    string n = namn.Trim();
    if (n.Length < 3)
    {
        return "För kort";
    }
    if (n.Length > 12)
    {
        return "För långt";
    }
    if (n.Contains(" "))
    {
        return "Inga mellanslag";
    }
    if (char.IsDigit(n[0]))
    {
        return "Börjar med siffra";
    }
    return "OK";
}`,explain:`Varje ogiltigt fall får ett eget tidigt return. Det som är kvar längst ner är bara det giltiga fallet.`,hint:`Börja med string.IsNullOrWhiteSpace, trimma, och testa sedan reglerna i tur och ordning. char.IsDigit(n[0]) kollar första tecknet.`},{type:`code`,prompt:"Skriv `static bool GiltigtPostnummer(string s)` som godkänner svenska postnummer skrivna som `12345` eller `123 45`. Allt annat ska ge false.",starter:`static bool GiltigtPostnummer(string s)
{
}
`,tests:[{fn:`GiltigtPostnummer`,args:[`12345`],expect:!0},{fn:`GiltigtPostnummer`,args:[`123 45`],expect:!0,edge:`med mellanslag`},{fn:`GiltigtPostnummer`,args:[`12 345`],expect:!1,edge:`mellanslag på fel plats`},{fn:`GiltigtPostnummer`,args:[`1234`],expect:!1,edge:`för kort`},{fn:`GiltigtPostnummer`,args:[`123456`],expect:!1,edge:`sex siffror`},{fn:`GiltigtPostnummer`,args:[`123-45`],expect:!1,edge:`bindestreck`},{fn:`GiltigtPostnummer`,args:[`1a345`],expect:!1,edge:`en bokstav`},{fn:`GiltigtPostnummer`,args:[``],expect:!1,edge:`tom text`}],solution:`static bool GiltigtPostnummer(string s)
{
    string siffror = s;
    if (s.Length == 6)
    {
        if (s.Substring(3, 1) != " ")
        {
            return false;
        }
        siffror = s.Substring(0, 3) + s.Substring(4);
    }
    if (siffror.Length != 5)
    {
        return false;
    }
    foreach (char c in siffror)
    {
        if (!char.IsDigit(c))
        {
            return false;
        }
    }
    return true;
}`,explain:`Ta först bort det enda tillåtna mellanslaget, på index 3. Sedan räcker det att kolla att exakt fem siffror är kvar.`,hint:`Om längden är 6 måste tecknet på index 3 vara ett mellanslag. Plocka bort det med Substring och kontrollera sedan fem siffror.`}],"cs-split":[{type:`code`,prompt:"Skriv `static bool ÄrPrimtal(int n)` och `static List<int> Primtal(int max)`. Ett primtal är större än 1 och delbart bara med 1 och sig självt. Primtal ska returnera alla primtal från 2 till och med max, och använda ÄrPrimtal.",starter:`static bool ÄrPrimtal(int n)
{
}

static List<int> Primtal(int max)
{
}
`,tests:[{fn:`ÄrPrimtal`,args:[7],expect:!0},{fn:`ÄrPrimtal`,args:[9],expect:!1},{fn:`ÄrPrimtal`,args:[2],expect:!0,edge:`2 är det minsta primtalet`},{fn:`ÄrPrimtal`,args:[1],expect:!1,edge:`1 är inte ett primtal`},{fn:`Primtal`,args:[20],expect:[2,3,5,7,11,13,17,19]},{fn:`Primtal`,args:[1],expect:[],edge:`inga primtal upp till 1`}],require:[c(`Primtal\\s*\\(\\s*int\\s+max\\s*\\)[\\s\\S]*ÄrPrimtal\\s*\\(`,`Låt Primtal anropa ÄrPrimtal.`)],solution:`static bool ÄrPrimtal(int n)
{
    if (n < 2)
    {
        return false;
    }
    for (int d = 2; d < n; d++)
    {
        if (n % d == 0)
        {
            return false;
        }
    }
    return true;
}

static List<int> Primtal(int max)
{
    List<int> resultat = new List<int>();
    for (int i = 2; i <= max; i++)
    {
        if (ÄrPrimtal(i))
        {
            resultat.Add(i);
        }
    }
    return resultat;
}`,explain:`ÄrPrimtal löser en liten fråga om ett tal. Primtal behöver bara loopa och fråga, så varje metod blir enkel.`,hint:`I ÄrPrimtal: returnera false för n < 2 och för varje d från 2 som delar n. I Primtal: loopa från 2 till max och lägg till i när ÄrPrimtal(i) är true.`},{type:`code`,prompt:'Skriv `static string TvåSiffror(int n)` som gör om 5 till `"05"` men låter 12 vara `"12"`, och `static string Tid(int sekunder)` som returnerar tiden som `"TT:MM:SS"`. 3725 sekunder blir `"01:02:05"`. Negativa sekunder ger `"Ogiltig tid"`. Tid ska använda TvåSiffror.',starter:`static string TvåSiffror(int n)
{
}

static string Tid(int sekunder)
{
}
`,tests:[{fn:`TvåSiffror`,args:[5],expect:`05`},{fn:`TvåSiffror`,args:[12],expect:`12`},{fn:`Tid`,args:[3725],expect:`01:02:05`},{fn:`Tid`,args:[0],expect:`00:00:00`,edge:`noll sekunder`},{fn:`Tid`,args:[86399],expect:`23:59:59`,edge:`en sekund före midnatt`},{fn:`Tid`,args:[-1],expect:`Ogiltig tid`,edge:`negativ tid`}],require:[c(`Tid\\s*\\(\\s*int\\s+sekunder\\s*\\)[\\s\\S]*TvåSiffror\\s*\\(`,`Låt Tid anropa TvåSiffror.`)],solution:`static string TvåSiffror(int n)
{
    if (n < 10)
    {
        return "0" + n;
    }
    return $"{n}";
}

static string Tid(int sekunder)
{
    if (sekunder < 0)
    {
        return "Ogiltig tid";
    }
    int timmar = sekunder / 3600;
    int minuter = sekunder % 3600 / 60;
    int sek = sekunder % 60;
    return $"{TvåSiffror(timmar)}:{TvåSiffror(minuter)}:{TvåSiffror(sek)}";
}`,explain:`Utfyllnaden med nolla görs på ett enda ställe, och Tid använder den tre gånger. / och % delar upp sekunderna i timmar, minuter och sekunder.`,hint:`Timmar: sekunder / 3600. Minuter: sekunder % 3600 / 60. Sekunder: sekunder % 60. Lägg till "0" framför tal under 10.`}],"cs-budget":[{type:`code`,prompt:'Del 4: Skriv `static string StörstaPost(string[] kategorier, int[] belopp)` som returnerar till exempel `"Hyra: 4500 kr"` för den största utgiften. Negativa belopp hoppas över, och vid lika vinner den första. Olika långa arrayer ger `"Fel i data"`, och om ingen utgift är större än 0 blir svaret `"Inga utgifter"`.',starter:`static string StörstaPost(string[] kategorier, int[] belopp)
{
}
`,tests:[{fn:`StörstaPost`,args:[[`Hyra`,`Mat`,`Nöje`],[4500,1200,800]],expect:`Hyra: 4500 kr`},{fn:`StörstaPost`,args:[[`Mat`,`Nöje`],[900,900]],expect:`Mat: 900 kr`,edge:`lika belopp: den första vinner`},{fn:`StörstaPost`,args:[[`Retur`,`Buss`],[-2e3,300]],expect:`Buss: 300 kr`,edge:`negativa belopp ignoreras`},{fn:`StörstaPost`,args:[[`A`],[-5]],expect:`Inga utgifter`,edge:`inga giltiga utgifter`},{fn:`StörstaPost`,args:[[],[]],expect:`Inga utgifter`,edge:`tomma arrayer`},{fn:`StörstaPost`,args:[[`A`,`B`],[10]],expect:`Fel i data`,edge:`olika långa arrayer`}],solution:`static string StörstaPost(string[] kategorier, int[] belopp)
{
    if (kategorier.Length != belopp.Length)
    {
        return "Fel i data";
    }
    int bäst = -1;
    for (int i = 0; i < belopp.Length; i++)
    {
        if (belopp[i] > 0 && (bäst == -1 || belopp[i] > belopp[bäst]))
        {
            bäst = i;
        }
    }
    if (bäst == -1)
    {
        return "Inga utgifter";
    }
    return $"{kategorier[bäst]}: {belopp[bäst]} kr";
}`,explain:`Indexet -1 betyder ”ingen hittad än”. Så kan samma loop både hoppa över ogiltiga belopp och hitta det största.`,hint:`Kontrollera längderna först. Spara bästa index, startat på -1, och byt bara när beloppet är positivt och större än det bästa hittills.`},{type:`code`,prompt:'Del 5: Skriv `static List<string> ÖverBudget(string[] kategorier, int[] utgifter, int[] budget)` som returnerar en rad som `"Mat: 300 kr över"` för varje kategori där utgiften är större än budgeten, i ursprunglig ordning. Om arrayerna inte är lika långa returneras en tom lista.',starter:`static List<string> ÖverBudget(string[] kategorier, int[] utgifter, int[] budget)
{
}
`,tests:[{fn:`ÖverBudget`,args:[[`Hyra`,`Mat`,`Nöje`],[4500,2300,900],[4500,2e3,600]],expect:[`Mat: 300 kr över`,`Nöje: 300 kr över`]},{fn:`ÖverBudget`,args:[[`Mat`],[2e3],[2e3]],expect:[],edge:`exakt på budget är inte över`},{fn:`ÖverBudget`,args:[[`Mat`,`Buss`],[100,50],[200]],expect:[],edge:`olika långa arrayer`},{fn:`ÖverBudget`,args:[[],[],[]],expect:[]}],solution:`static List<string> ÖverBudget(string[] kategorier, int[] utgifter, int[] budget)
{
    List<string> resultat = new List<string>();
    if (kategorier.Length != utgifter.Length || utgifter.Length != budget.Length)
    {
        return resultat;
    }
    for (int i = 0; i < utgifter.Length; i++)
    {
        if (utgifter[i] > budget[i])
        {
            resultat.Add($"{kategorier[i]}: {utgifter[i] - budget[i]} kr över");
        }
    }
    return resultat;
}`,explain:`Samma index i tre arrayer hör ihop. Därför måste alla tre vara lika långa innan du börjar.`,hint:`Kontrollera alla tre längderna med ||. Gå sedan igenom med index och lägg till en rad när utgifter[i] > budget[i].`},{type:`code`,prompt:"Del 6: Skriv `static int SaldoEfter(int start, int procent, int år)`. Varje år växer saldot med `saldo * procent / 100` (heltalsdivision, så det avrundas nedåt varje år). Om något av värdena är negativt, returnera -1.",starter:`static int SaldoEfter(int start, int procent, int år)
{
}
`,tests:[{fn:`SaldoEfter`,args:[1e3,10,2],expect:1210},{fn:`SaldoEfter`,args:[100,5,3],expect:115,edge:`räntan avrundas nedåt varje år`},{fn:`SaldoEfter`,args:[1e3,10,0],expect:1e3,edge:`noll år`},{fn:`SaldoEfter`,args:[1e3,0,5],expect:1e3,edge:`ingen ränta`},{fn:`SaldoEfter`,args:[1e3,10,-1],expect:-1,edge:`negativt antal år`},{fn:`SaldoEfter`,args:[-50,10,1],expect:-1,edge:`negativt startbelopp`}],solution:`static int SaldoEfter(int start, int procent, int år)
{
    if (start < 0 || procent < 0 || år < 0)
    {
        return -1;
    }
    int saldo = start;
    for (int i = 0; i < år; i++)
    {
        saldo += saldo * procent / 100;
    }
    return saldo;
}`,explain:`Ränta på ränta: varje år räknas räntan på det nya saldot. Eftersom det är heltal försvinner öresdelarna varje år, därför blir 100 kr med 5 % bara 115 efter tre år.`,hint:`Validera först. Loopa sedan år gånger och gör saldo += saldo * procent / 100;.`}],"cs-scores":[{type:`code`,prompt:"Del 4: Skriv `static int Placering(int[] poäng, int index)` som returnerar placeringen för deltagaren på `index`: 1 plus antalet som har **fler** poäng. Delad plats är alltså möjlig. Ett ogiltigt index ger -1.",starter:`static int Placering(int[] poäng, int index)
{
}
`,tests:[{fn:`Placering`,args:[[10,30,20],0],expect:3},{fn:`Placering`,args:[[10,30,20],1],expect:1},{fn:`Placering`,args:[[10,30,30],2],expect:1,edge:`delad förstaplats`},{fn:`Placering`,args:[[5,9,9,1],3],expect:4,edge:`två delar plats 2, så nästa blir 4`},{fn:`Placering`,args:[[10,20],2],expect:-1,edge:`index för stort`},{fn:`Placering`,args:[[10,20],-1],expect:-1,edge:`negativt index`}],solution:`static int Placering(int[] poäng, int index)
{
    if (index < 0 || index >= poäng.Length)
    {
        return -1;
    }
    int plats = 1;
    foreach (int p in poäng)
    {
        if (p > poäng[index])
        {
            plats++;
        }
    }
    return plats;
}`,explain:`Placeringen räknas ut utan att sortera: det räcker att räkna hur många som har strikt fler poäng.`,hint:`Kontrollera att index ligger mellan 0 och poäng.Length - 1. Räkna sedan alla p > poäng[index] och lägg till 1.`},{type:`code`,prompt:"Del 5: Skriv `static List<string> Ledare(string[] namn, int[] poäng)` som returnerar namnen på **alla** som har högsta poängen, i ursprunglig ordning. Tomma arrayer ger en tom lista.",starter:`static List<string> Ledare(string[] namn, int[] poäng)
{
}
`,tests:[{fn:`Ledare`,args:[[`Ada`,`Linus`,`Grace`],[12,15,9]],expect:[`Linus`]},{fn:`Ledare`,args:[[`Ada`,`Linus`,`Grace`],[15,9,15]],expect:[`Ada`,`Grace`],edge:`delad ledning`},{fn:`Ledare`,args:[[`A`,`B`],[-3,-1]],expect:[`B`],edge:`negativa poäng`},{fn:`Ledare`,args:[[],[]],expect:[],edge:`tomma arrayer`}],solution:`static List<string> Ledare(string[] namn, int[] poäng)
{
    List<string> resultat = new List<string>();
    if (poäng.Length == 0)
    {
        return resultat;
    }
    int högst = poäng[0];
    foreach (int p in poäng)
    {
        if (p > högst)
        {
            högst = p;
        }
    }
    for (int i = 0; i < poäng.Length; i++)
    {
        if (poäng[i] == högst)
        {
            resultat.Add(namn[i]);
        }
    }
    return resultat;
}`,explain:`Två varv är enklast: först hittar du högsta poängen, sedan samlar du alla som har just den.`,hint:`Hitta högsta poängen i en första loop. Gå sedan igenom med index och lägg till namn[i] när poäng[i] == högst.`},{type:`code`,prompt:'Del 6: Skriv `static string Medalj(int[] poäng, int index)` som returnerar `"Guld"`, `"Silver"` eller `"Brons"` för placering 1, 2 och 3, annars `"Ingen medalj"`. Ett ogiltigt index ger `"Fel index"`. Använd Placering från del 4.',starter:`static int Placering(int[] poäng, int index)
{
    if (index < 0 || index >= poäng.Length)
    {
        return -1;
    }
    int plats = 1;
    foreach (int p in poäng)
    {
        if (p > poäng[index])
        {
            plats++;
        }
    }
    return plats;
}

static string Medalj(int[] poäng, int index)
{
}
`,tests:[{fn:`Medalj`,args:[[10,30,20],1],expect:`Guld`},{fn:`Medalj`,args:[[10,30,20],2],expect:`Silver`},{fn:`Medalj`,args:[[10,30,20],0],expect:`Brons`},{fn:`Medalj`,args:[[10,30,20,5],3],expect:`Ingen medalj`},{fn:`Medalj`,args:[[9,9,1],1],expect:`Guld`,edge:`delat guld`},{fn:`Medalj`,args:[[9,9,1],2],expect:`Brons`,edge:`efter delat guld blir nästa plats 3`},{fn:`Medalj`,args:[[1,2],7],expect:`Fel index`,edge:`ogiltigt index`}],require:[c(`Medalj[\\s\\S]*Placering\\s*\\(`,`Använd Placering inne i Medalj.`)],solution:`static int Placering(int[] poäng, int index)
{
    if (index < 0 || index >= poäng.Length)
    {
        return -1;
    }
    int plats = 1;
    foreach (int p in poäng)
    {
        if (p > poäng[index])
        {
            plats++;
        }
    }
    return plats;
}

static string Medalj(int[] poäng, int index)
{
    int plats = Placering(poäng, index);
    if (plats == -1)
    {
        return "Fel index";
    }
    if (plats == 1)
    {
        return "Guld";
    }
    if (plats == 2)
    {
        return "Silver";
    }
    if (plats == 3)
    {
        return "Brons";
    }
    return "Ingen medalj";
}`,explain:`Medalj behöver inte veta hur placeringen räknas, bara vad Placering returnerar. Felvärdet -1 översätts till en tydlig text.`,hint:`Spara int plats = Placering(poäng, index); och välj text med if för -1, 1, 2 och 3.`}]},u=e(s,l,{"cs-hello":[{type:`order`,prompt:`Ordna raderna så att spelet först hälsar dig välkommen, sedan laddar nivå 1 och sist önskar lycka till.`,lines:[`Console.WriteLine("Välkommen till spelet!");`,`Console.WriteLine("Nivå 1 laddas...");`,`Console.WriteLine("Lycka till!");`],output:`Välkommen till spelet!
Nivå 1 laddas...
Lycka till!`,distractors:[{line:`Console.WriteLine("Lycka till!")`,why:`Varje sats i C# måste avslutas med semikolon.`}],explain:`Programmet körs uppifrån och ner, så raderna skrivs ut i den ordning de står.`,hint:`Tänk på i vilken ordning det händer när du startar ett spel.`}],"cs-int":[{type:`order`,prompt:`Ordna raderna så att programmet skriver ut ställningen 0, sedan 2 och sist 3 mål.`,lines:[`int mål = 0;`,`Console.WriteLine(mål);`,`mål = 2;`,`Console.WriteLine(mål);`,`mål = 3;`,`Console.WriteLine(mål);`],output:`0
2
3`,distractors:[{line:`int mål = 2;`,why:`Variabeln finns redan. För att ge den ett nytt värde skriver du bara mål = 2; utan int.`}],explain:`Variabeln skapas en gång med int. Sedan får den nya värden, och varje utskrift visar värdet just då.`,hint:`Skapa variabeln först. Varje nytt värde ska stå före utskriften som ska visa det.`}],"cs-math":[{type:`order`,prompt:`Ordna raderna så att 17 kakor delas på 5 barn: först hur många varje barn får, sedan hur många som blir över.`,lines:[`int kakor = 17;`,`int barn = 5;`,`Console.WriteLine(kakor / barn);`,`Console.WriteLine(kakor % barn);`],alt:[[`int barn = 5;`,`int kakor = 17;`,`Console.WriteLine(kakor / barn);`,`Console.WriteLine(kakor % barn);`]],output:`3
2`,distractors:[{line:`Console.WriteLine(kakor * barn);`,why:`* betyder gånger. Här ska kakorna delas, och resten fås med %.`}],explain:`Båda variablerna måste finnas innan de används. Heltalsdivision ger 3 hela kakor var, och % ger de 2 som blir över.`,hint:`Först variablerna, sedan / för hela kakor och % för resten.`}],"cs-string":[{type:`order`,prompt:`Ordna raderna så att programmet först visar vem som spelar och sedan att Kim har tagit över.`,lines:[`string spelare = "Sam";`,`Console.WriteLine("Spelare: " + spelare);`,`spelare = "Kim";`,`Console.WriteLine($"Nu spelar {spelare}.");`],output:`Spelare: Sam
Nu spelar Kim.`,distractors:[{line:`Console.WriteLine("Nu spelar {spelare}.");`,why:`Utan $ före citattecknet skrivs {spelare} ut som vanlig text.`}],explain:`Första utskriften sker medan variabeln är "Sam". Efter att den ändrats visar interpoleringen "Kim".`,hint:`Vilket namn ska variabeln ha när varje rad skrivs ut?`}],"cs-bool":[{type:`order`,prompt:`Ordna raderna så att programmet först skriver om pengarna räcker och sedan om du har exakt 80 kr.`,lines:[`int pris = 80;`,`int pengar = pris + 20;`,`bool räcker = pengar >= pris;`,`Console.WriteLine(räcker);`,`Console.WriteLine(pengar == 80);`],output:`True
False`,distractors:[{line:`Console.WriteLine(pengar = 80);`,why:`Ett enda = ger variabeln ett nytt värde. För att jämföra behövs ==.`}],explain:`pengar räknas ut från pris, och räcker från båda. 100 >= 80 är sant, men 100 == 80 är falskt.`,hint:`En variabel kan bara användas efter raden där den skapas.`}],"cs-if":[{type:`order`,prompt:`Ordna raderna så att programmet berättar hur mycket du slog rekordet med.`,lines:[`int rekord = 100;`,`int poäng = rekord + 20;`,`if (poäng > rekord)`,`{`,`    int skillnad = poäng - rekord;`,`    Console.WriteLine($"Nytt rekord med {skillnad} poäng!");`,`}`],output:`Nytt rekord med 20 poäng!`,distractors:[{line:`if (poäng > rekord);`,why:`Ett semikolon direkt efter if (...) avslutar if-satsen, och blocket körs då alltid.`}],explain:`Villkoret står inom parenteser och blocket inom klamrar. skillnad måste räknas ut innan den skrivs ut.`,hint:`Först variablerna, sedan if med villkoret, och sist blocket inom { }.`}],"cs-else":[{type:`order`,prompt:`Ordna raderna så att programmet skriver Badväder om det är minst 25 grader, och annars hur många grader som fattas.`,lines:[`int temp = 18;`,`if (temp >= 25)`,`{`,`    Console.WriteLine("Badväder");`,`}`,`else`,`{`,`    int fattas = 25 - temp;`,`    Console.WriteLine($"{fattas} grader kvar till badväder");`,`}`],output:`7 grader kvar till badväder`,explain:`18 är inte minst 25, så if-blocket hoppas över och else-blocket körs. else står direkt efter if-blockets slutklammer.`,hint:`Först if med sitt block, sedan else med sitt. Räkna ut fattas innan du skriver ut den.`}],"cs-while":[{type:`order`,prompt:`Ordna raderna så att programmet skriver Varv 1, Varv 2 och Varv 3 och sedan Målgång!`,lines:[`int varv = 1;`,`while (varv <= 3)`,`{`,`    Console.WriteLine($"Varv {varv}");`,`    varv++;`,`}`,`Console.WriteLine("Målgång!");`],output:`Varv 1
Varv 2
Varv 3
Målgång!`,distractors:[{line:`while (varv <= 3);`,why:`Semikolonet gör loopen tom. Den kör då ingenting i blocket och slutar aldrig.`}],explain:`Räknaren skapas före loopen, skrivs ut och ökas i blocket. Målgång står efter blocket så att den bara körs en gång.`,hint:`Skriv ut varvet innan du ökar räknaren.`}],"cs-for":[{type:`order`,prompt:`Ordna raderna så att programmet skriver ut femmans tabell från 1 till 4 med en rubrik först.`,lines:[`Console.WriteLine("Femmans tabell:");`,`for (int i = 1; i <= 4; i++)`,`{`,`    int svar = i * 5;`,`    Console.WriteLine($"{i} x 5 = {svar}");`,`}`],output:`Femmans tabell:
1 x 5 = 5
2 x 5 = 10
3 x 5 = 15
4 x 5 = 20`,distractors:[{line:`for (int i = 1; i < 4; i++)`,why:`Med i < 4 slutar loopen efter 3, så 4 x 5 kommer aldrig med.`}],explain:`Rubriken skrivs en gång före loopen. I blocket räknas svaret ut först och skrivs sedan ut, ett varv per tal.`,hint:`Rubriken ska inte upprepas, så den står utanför loopen.`}],"cs-double":[{type:`order`,prompt:`Ordna raderna så att programmet först skriver snittet som decimaltal och sedan vad heltalsdivision ger.`,lines:[`int poäng = 7;`,`int prov = 2;`,`double snitt = (double)poäng / prov;`,`Console.WriteLine(snitt);`,`Console.WriteLine(poäng / prov);`],alt:[[`int prov = 2;`,`int poäng = 7;`,`double snitt = (double)poäng / prov;`,`Console.WriteLine(snitt);`,`Console.WriteLine(poäng / prov);`]],output:`3.5
3`,distractors:[{line:`double snitt = poäng / prov;`,why:`Två heltal delas som heltal och ger 3. Gör om ena talet till double först.`}],explain:`Med (double) blir divisionen ett decimaltal, 3.5. Utan den delas två heltal och decimalerna försvinner.`,hint:`Snittet räknas ut efter variablerna och skrivs ut före heltalsdivisionen.`}],"cs-array":[{type:`order`,prompt:`Ordna raderna så att programmet skriver första poängen, sedan summan av första och sista efter en ändring, och sist antalet.`,lines:[`int[] poäng = {12, 7, 9};`,`Console.WriteLine(poäng[0]);`,`poäng[0] = 15;`,`Console.WriteLine(poäng[0] + poäng[2]);`,`Console.WriteLine(poäng.Length);`],output:`12
24
3`,distractors:[{line:`Console.WriteLine(poäng[3]);`,why:`Index börjar på 0, så tre element har index 0, 1 och 2. poäng[3] finns inte.`}],explain:`Första utskriften visar 12. Efter att poäng[0] blivit 15 blir summan 15 + 9 = 24. Length är 3.`,hint:`Utskriften av 12 måste komma innan första elementet byts ut.`}],"cs-foreach":[{type:`order`,prompt:`Ordna raderna så att programmet visar summan efter varje vara och sist totalen.`,lines:[`int[] priser = {25, 40, 15};`,`int summa = 0;`,`foreach (int p in priser)`,`{`,`    summa += p;`,`    Console.WriteLine($"Hittills: {summa} kr");`,`}`,`Console.WriteLine($"Totalt: {summa} kr");`],alt:[[`int summa = 0;`,`int[] priser = {25, 40, 15};`,`foreach (int p in priser)`,`{`,`    summa += p;`,`    Console.WriteLine($"Hittills: {summa} kr");`,`}`,`Console.WriteLine($"Totalt: {summa} kr");`]],output:`Hittills: 25 kr
Hittills: 65 kr
Hittills: 80 kr
Totalt: 80 kr`,distractors:[{line:`foreach (p in priser)`,why:`Loopvariabeln behöver en typ: foreach (int p in priser).`}],explain:`summa skapas före loopen. I varje varv läggs priset till och delsumman skrivs ut. Totalen skrivs en gång efter loopen.`,hint:`Lägg till priset innan du skriver ut delsumman.`}],"cs-strmethods":[{type:`order`,prompt:`Ordna raderna så att namnet rensas från mellanslag och sedan skrivs med versaler, följt av antal tecken och om det innehåller "ar".`,lines:[`string namn = "  sara  ";`,`string rent = namn.Trim();`,`Console.WriteLine(rent.ToUpper());`,`Console.WriteLine(rent.Length);`,`Console.WriteLine(rent.Contains("ar"));`],output:`SARA
4
True`,explain:`Trim tar bort mellanslagen i kanterna, så rent blir "sara" med 4 tecken. Utskrifterna kommer i den ordning frågan anger.`,hint:`Rensa texten innan du använder den. Ordningen på utskrifterna står i uppgiften.`}],"cs-andor":[{type:`order`,prompt:`Ordna raderna så att programmet först skriver om du kommer in och sedan resultatet av det andra villkoret.`,lines:[`int ålder = 16;`,`bool harBiljett = true;`,`bool kommerIn = ålder >= 15 && harBiljett;`,`Console.WriteLine(kommerIn);`,`Console.WriteLine(!kommerIn || ålder > 18);`],alt:[[`bool harBiljett = true;`,`int ålder = 16;`,`bool kommerIn = ålder >= 15 && harBiljett;`,`Console.WriteLine(kommerIn);`,`Console.WriteLine(!kommerIn || ålder > 18);`]],output:`True
False`,distractors:[{line:`bool kommerIn = ålder >= 15 & harBiljett`,why:`Och skrivs && i villkor, och raden saknar semikolon.`}],explain:`Båda delarna är sanna, så kommerIn blir True. !kommerIn är False och 16 > 18 är False, så || ger False.`,hint:`kommerIn behöver både ålder och harBiljett, och måste finnas innan den skrivs ut.`}],"cs-bounds":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int poäng = 60;
if (poäng > 60)
{
    Console.WriteLine("Bonus!");
}
else
{
    Console.WriteLine("Ingen bonus");
}
Console.WriteLine(poäng >= 60);`,options:[`Ingen bonus
True`,`Bonus!
True`,`Ingen bonus
False`],answer:0,out:!0,why:{1:`60 > 60 är falskt, eftersom 60 inte är större än sig självt. Då körs else.`,2:`>= betyder minst, och 60 är minst 60. Därför blir det True.`},explain:`På gränsen skiljer sig > och >=. 60 > 60 är falskt men 60 >= 60 är sant.`},{type:`order`,prompt:`Ordna raderna så att programmet testar åldrarna 17, 18 och 19 mot gränsen 18 år.`,lines:[`int gräns = 18;`,`for (int ålder = 17; ålder <= 19; ålder++)`,`{`,`    bool myndig = ålder >= gräns;`,`    Console.WriteLine($"{ålder}: {myndig}");`,`}`],output:`17: False
18: True
19: True`,distractors:[{line:`    bool myndig = ålder > gräns;`,why:`Med > räknas inte 18 som myndig. Den som fyllt 18 ska räknas med, så det behövs >=.`}],explain:`Loopen testar värdet under, på och över gränsen. Med >= blir just 18 True.`,hint:`Gränsen skapas först. I blocket räknas myndig ut innan den skrivs ut.`}],"cs-accum":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int[] tal = {5, 3, 8};
int minst = 0;
foreach (int t in tal)
{
    if (t < minst)
    {
        minst = t;
    }
}
Console.WriteLine(minst);`,options:[`3`,`5`,`0`],answer:2,out:!0,why:{0:`Det hade stämt om minst startat på tal[0]. Men inget tal är mindre än 0, så minst ändras aldrig.`,1:`5 är första talet, men minst startar på 0 och inte på tal[0].`},explain:`Startvärdet 0 är redan mindre än alla talen, så villkoret blir aldrig sant. Starta med tal[0] i stället.`},{type:`order`,prompt:`Ordna raderna så att programmet går igenom målen match för match och skriver ut när ett nytt rekord sätts.`,lines:[`int[] mål = {2, 0, 3, 1};`,`int flest = mål[0];`,`int matcher = 0;`,`foreach (int m in mål)`,`{`,`    matcher++;`,`    if (m > flest)`,`    {`,`        flest = m;`,`        Console.WriteLine($"Match {matcher}: nytt rekord {flest}");`,`    }`,`}`],alt:[[`int[] mål = {2, 0, 3, 1};`,`int matcher = 0;`,`int flest = mål[0];`,`foreach (int m in mål)`,`{`,`    matcher++;`,`    if (m > flest)`,`    {`,`        flest = m;`,`        Console.WriteLine($"Match {matcher}: nytt rekord {flest}");`,`    }`,`}`],[`int[] mål = {2, 0, 3, 1};`,`int flest = mål[0];`,`int matcher = 0;`,`foreach (int m in mål)`,`{`,`    matcher++;`,`    if (m > flest)`,`    {`,`        flest = m;`,`        Console.WriteLine($"Match {matcher}: nytt rekord {flest}");`,`}`,`    }`],[`int[] mål = {2, 0, 3, 1};`,`int matcher = 0;`,`int flest = mål[0];`,`foreach (int m in mål)`,`{`,`    matcher++;`,`    if (m > flest)`,`    {`,`        flest = m;`,`        Console.WriteLine($"Match {matcher}: nytt rekord {flest}");`,`}`,`    }`]],output:`Match 3: nytt rekord 3`,distractors:[{line:`int flest = 0;`,why:`Det största värdet ska starta på första elementet. Med 0 blir det fel om alla tal är negativa.`}],explain:`Ackumulatorerna skapas före loopen. Räknaren ökar varje varv, och flest uppdateras innan rekordet skrivs ut.`,hint:`matcher ska öka i varje varv, men utskriften ska bara ske när ett nytt rekord sätts.`}],"cs-index":[{type:`order`,prompt:`Ordna raderna så att programmet letar upp Vargar och skriver ut både index och placering.`,lines:[`string[] lag = {"Ugglor", "Vargar", "Falkar"};`,`for (int i = 0; i < lag.Length; i++)`,`{`,`    string namn = lag[i];`,`    if (namn == "Vargar")`,`    {`,`        int plats = i + 1;`,`        Console.WriteLine($"{namn} står på index {i}, plats {plats}");`,`    }`,`}`],alt:[[`string[] lag = {"Ugglor", "Vargar", "Falkar"};`,`for (int i = 0; i < lag.Length; i++)`,`{`,`    string namn = lag[i];`,`    if (namn == "Vargar")`,`    {`,`        int plats = i + 1;`,`        Console.WriteLine($"{namn} står på index {i}, plats {plats}");`,`}`,`    }`]],output:`Vargar står på index 1, plats 2`,distractors:[{line:`for (int i = 0; i <= lag.Length; i++)`,why:`Med <= blir sista varvet i = 3, och lag[3] finns inte.`}],explain:`for-loopen ger dig index i. Värdet hämtas med lag[i], och när det är Vargar räknas placeringen ut från indexet.`,hint:`Hämta namnet först i loopen, testa det sedan med if.`}],"cs-methods":[{type:`order`,prompt:`Ordna raderna så att programmet först visar menyn med en metod och sedan skriver att spelet startar.`,lines:[`Meny();`,`Console.WriteLine("Spelet startar!");`,`static void Meny()`,`{`,`    Console.WriteLine("1. Spela");`,`    Console.WriteLine("2. Avsluta");`,`}`],output:`1. Spela
2. Avsluta
Spelet startar!`,distractors:[{line:`static void Meny();`,why:`Efter metodens namn kommer blocket med { }, inget semikolon.`}],explain:`Anropet står först och metoden skrivs längst ner. Metodens rader körs när den anropas.`,hint:`I Kodstig står metoderna efter resten av koden.`}],"cs-params":[{type:`order`,prompt:`Ordna raderna så att metoden skriver ut priset för kaffe och sedan för bulle.`,lines:[`Pris("Kaffe", 35);`,`Pris("Bulle", 20);`,`static void Pris(string vara, int kr)`,`{`,`    Console.WriteLine($"{vara} kostar {kr} kr");`,`}`],output:`Kaffe kostar 35 kr
Bulle kostar 20 kr`,distractors:[{line:`Pris(35, "Kaffe");`,why:`Argumenten måste komma i samma ordning som parametrarna: först texten, sedan talet.`}],explain:`Varje anrop skickar in en vara och ett pris. Metoden står sist och använder parametrarna i sin utskrift.`,hint:`Anropen kommer först, i den ordning utskriften ska ske.`}],"cs-return":[{type:`order`,prompt:`Ordna raderna så att programmet räknar ut 3 i kvadrat och sedan kvadraten av det svaret.`,lines:[`int a = Kvadrat(3);`,`int b = Kvadrat(a);`,`Console.WriteLine($"{a} och {b}");`,`static int Kvadrat(int x)`,`{`,`    return x * x;`,`}`],output:`9 och 81`,distractors:[{line:`static void Kvadrat(int x)`,why:`void betyder att metoden inte lämnar tillbaka något. Här ska den returnera ett int.`}],explain:`a behövs för att räkna ut b, så a kommer först. Metoden returnerar x * x till den som anropar.`,hint:`Vilket värde behövs för att räkna ut det andra?`}],"cs-list":[{type:`order`,prompt:`Ordna raderna så att metoden bygger en ny lista med halva priset för varje vara och programmet skriver ut den.`,lines:[`List<int> priser = new List<int> {10, 24, 40};`,`Console.WriteLine(string.Join(", ", Halva(priser)));`,`static List<int> Halva(List<int> lista)`,`{`,`    List<int> resultat = new List<int>();`,`    foreach (int p in lista)`,`    {`,`        int ny = p / 2;`,`        resultat.Add(ny);`,`    }`,`    return resultat;`,`}`],output:`5, 12, 20`,explain:`Metoden skapar en tom lista, lägger till ett halverat pris per varv och returnerar listan först när loopen är klar.`,hint:`return ska stå efter loopen, annars kommer bara första priset med.`}],"cs-validate":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Console.WriteLine(Biljetter(-2));
Console.WriteLine(Biljetter(3));

static string Biljetter(int antal)
{
    if (antal <= 0)
    {
        return "Ogiltigt antal";
    }
    return $"{antal} biljetter bokade";
}`,options:[`-2 biljetter bokade
3 biljetter bokade`,`Ogiltigt antal
3 biljetter bokade`,`Ogiltigt antal
Ogiltigt antal`],answer:1,out:!0,why:{0:`-2 fångas av kontrollen antal <= 0, och return avslutar metoden direkt.`,2:`3 är större än 0, så villkoret är falskt och metoden går vidare till sista return.`},explain:`Det ogiltiga fallet hanteras först med ett tidigt return. Giltiga värden går förbi kontrollen.`},{type:`order`,prompt:`Ordna raderna så att metoden stoppar för korta lösenord med ett tidigt return och godkänner resten.`,lines:[`Console.WriteLine(Lösen("abc"));`,`Console.WriteLine(Lösen("hemligt123"));`,`static string Lösen(string ord)`,`{`,`    if (ord.Length < 8)`,`    {`,`        int saknas = 8 - ord.Length;`,`        return $"För kort, {saknas} tecken till";`,`    }`,`    return "Lösenordet är okej";`,`}`],output:`För kort, 5 tecken till
Lösenordet är okej`,explain:`Kontrollen står först i metoden. Ett för kort lösenord stoppas med return, och bara giltiga når sista raden.`,hint:`Det ogiltiga fallet hanteras först, det godkända sist.`}],"cs-split":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int[] t = {3, 5};
Console.WriteLine(Rapport(t));

static int Dubbel(int x)
{
    return x * 2;
}

static string Rapport(int[] t)
{
    int s = 0;
    foreach (int x in t) s += Dubbel(x);
    return $"Summa: {s}";
}`,options:[`Summa: 16`,`Summa: 8`,`Summa: 10`],answer:0,out:!0,why:{1:`8 är 3 + 5 utan dubblering. Rapport anropar Dubbel för varje tal.`,2:`10 är bara 5 dubblat. 3 dubblas också och blir 6.`},explain:`Rapport anropar Dubbel för varje tal: 6 + 10 = 16.`},{type:`order`,prompt:`Ordna raderna så att en metod räknar ut snittet och en annan bygger texten som skrivs ut.`,lines:[`int[] poäng = {6, 8, 10};`,`Console.WriteLine(Omdöme(poäng));`,`static int Medel(int[] t)`,`{`,`    int s = 0;`,`    foreach (int x in t) s += x;`,`    return s / t.Length;`,`}`,`static string Omdöme(int[] t)`,`{`,`    return $"Snitt {Medel(t)} poäng";`,`}`],alt:[[`int[] poäng = {6, 8, 10};`,`Console.WriteLine(Omdöme(poäng));`,`static string Omdöme(int[] t)`,`{`,`    return $"Snitt {Medel(t)} poäng";`,`}`,`static int Medel(int[] t)`,`{`,`    int s = 0;`,`    foreach (int x in t) s += x;`,`    return s / t.Length;`,`}`]],output:`Snitt 8 poäng`,explain:`Varje metod gör en sak. Medel summerar och delar, och Omdöme anropar Medel för att bygga texten.`,hint:`I Medel ska summan börja på 0, fyllas i loopen och delas sist.`}],"cs-errors":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int[] tal = {4, 8, 15};
Console.WriteLine(tal.Length);
Console.WriteLine(tal[tal.Length - 1]);`,options:[`3
IndexOutOfRangeException`,`2
15`,`3
15`],answer:2,out:!0,why:{0:`tal.Length - 1 är 2, det sista giltiga indexet, så inget undantag uppstår.`,1:`Length räknar antalet element, och de är 3. Det är indexen som slutar på 2.`},explain:`Length är 3 och sista index är Length - 1, alltså 2. Därför skrivs 15 ut.`},{type:`order`,prompt:`Ordna raderna så att programmet bara läser dagen om indexet finns i arrayen.`,lines:[`string[] dagar = {"mån", "tis", "ons"};`,`int i = 2;`,`if (i < dagar.Length)`,`{`,`    string dag = dagar[i];`,`    Console.WriteLine($"Index {i} är {dag}");`,`}`],alt:[[`int i = 2;`,`string[] dagar = {"mån", "tis", "ons"};`,`if (i < dagar.Length)`,`{`,`    string dag = dagar[i];`,`    Console.WriteLine($"Index {i} är {dag}");`,`}`]],output:`Index 2 är ons`,distractors:[{line:`if (i <= dagar.Length)`,why:`Med <= släpps i = 3 igenom, och dagar[3] ger IndexOutOfRangeException.`}],explain:`Kontrollen gör att dagar[i] bara läses när indexet finns. Med i = 3 hade if-blocket hoppats över i stället för att ge IndexOutOfRangeException.`,hint:`Läs elementet först inne i if-blocket, efter kontrollen.`}],"cs-try":[{type:`order`,prompt:`Ordna raderna så att programmet försöker tolka svaret som ett tal och ger ett tips när det inte går.`,lines:[`string svar = "tolv";`,`try`,`{`,`    int antal = int.Parse(svar);`,`    Console.WriteLine($"Du köper {antal} biljetter");`,`}`,`catch (FormatException)`,`{`,`    string tips = "Skriv med siffror, till exempel 12.";`,`    Console.WriteLine(tips);`,`}`],output:`Skriv med siffror, till exempel 12.`,distractors:[{line:`catch (DivideByZeroException)`,why:`int.Parse på text som inte är ett tal ger FormatException. Ett catch för fel typ fångar det inte.`}],explain:`int.Parse kastar FormatException, så resten av try hoppas över och catch-blocket körs.`,hint:`try-blocket kommer först, sedan catch med rätt undantagstyp.`}],"cs-throw":[{type:`order`,prompt:`Ordna raderna så att ett negativt antal stoppas med ett undantag som fångas och skrivs ut.`,lines:[`int antal = -2;`,`try`,`{`,`    if (antal <= 0) throw new ArgumentException("Antalet måste vara minst 1");`,`    Console.WriteLine($"Du köper {antal} biljetter");`,`}`,`catch (ArgumentException e)`,`{`,`    Console.WriteLine("Fel: " + e.Message);`,`}`],output:`Fel: Antalet måste vara minst 1`,distractors:[{line:`    if (antal <= 0) throw ArgumentException("Antalet måste vara minst 1");`,why:`Undantaget är ett objekt som måste skapas: throw new ArgumentException(...).`}],explain:`Kontrollen står först, så köpet skrivs aldrig ut. throw hoppar direkt till catch, där e.Message är texten.`,hint:`Kontrollen ska ligga före raden som gör något med antalet.`}],"cs-tryparse":[{type:`order`,prompt:`Ordna raderna så att programmet summerar de svar som är tal och hoppar över resten utan att krascha.`,lines:[`string[] svar = {"5", "fem", "12"};`,`int summa = 0;`,`foreach (string s in svar)`,`{`,`    int.TryParse(s, out int tal);`,`    summa += tal;`,`}`,`Console.WriteLine($"Summa: {summa}");`],alt:[[`int summa = 0;`,`string[] svar = {"5", "fem", "12"};`,`foreach (string s in svar)`,`{`,`    int.TryParse(s, out int tal);`,`    summa += tal;`,`}`,`Console.WriteLine($"Summa: {summa}");`]],output:`Summa: 17`,distractors:[{line:`    int tal = int.Parse(s);`,why:`int.Parse kraschar med FormatException på "fem". TryParse klarar det utan undantag.`}],explain:`När TryParse misslyckas blir tal 0, så "fem" påverkar inte summan. Summan skrivs ut efter loopen.`,hint:`Tolka först, lägg sedan till. Utskriften ska bara ske en gång.`}],"cs-class":[{type:`order`,prompt:`Ordna raderna så att programmet skapar en låt, fyller i fälten och skriver ut titel och längd i minuter.`,lines:[`Låt l = new Låt();`,`l.Titel = "Sommarvind";`,`l.Sekunder = 200;`,`Console.WriteLine($"{l.Titel}: {l.Sekunder / 60} min");`,`class Låt`,`{`,`    public string Titel;`,`    public int Sekunder;`,`}`],alt:[[`Låt l = new Låt();`,`l.Sekunder = 200;`,`l.Titel = "Sommarvind";`,`Console.WriteLine($"{l.Titel}: {l.Sekunder / 60} min");`,`class Låt`,`{`,`    public string Titel;`,`    public int Sekunder;`,`}`],[`Låt l = new Låt();`,`l.Titel = "Sommarvind";`,`l.Sekunder = 200;`,`Console.WriteLine($"{l.Titel}: {l.Sekunder / 60} min");`,`class Låt`,`{`,`    public int Sekunder;`,`    public string Titel;`,`}`],[`Låt l = new Låt();`,`l.Sekunder = 200;`,`l.Titel = "Sommarvind";`,`Console.WriteLine($"{l.Titel}: {l.Sekunder / 60} min");`,`class Låt`,`{`,`    public int Sekunder;`,`    public string Titel;`,`}`]],output:`Sommarvind: 3 min`,distractors:[{line:`Låt l = Låt();`,why:`Ett nytt objekt skapas med new: new Låt().`}],explain:`Objektet skapas med new innan fälten fylls i. Klassen står under resten av koden.`,hint:`Ritningen, klassen, står sist. Objektet måste skapas innan du använder det.`}],"cs-ctor":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Spelare s = new Spelare("Mo", 3);
s.liv = s.liv - 1;
Console.WriteLine($"{s.namn} har {s.liv} liv");

class Spelare
{
    public string namn;
    public int liv;

    public Spelare(string namn, int liv)
    {
        this.namn = namn;
        this.liv = liv;
    }
}`,options:[`Mo har 2 liv`,`Mo har 3 liv`,`namn har 2 liv`],answer:0,out:!0,why:{1:`Konstruktorn ger 3 liv, men raden efter minskar fältet med 1.`,2:`Inom { } i interpoleringen skrivs värdet av s.namn ut, inte ordet namn.`},explain:`Konstruktorn sätter namn och liv, och sedan minskas liv till 2.`},{type:`order`,prompt:`Ordna raderna så att konstruktorn ger boken titel och sidantal direkt när den skapas.`,lines:[`Bok b = new Bok("Dune", 412);`,`Console.WriteLine($"{b.titel} har {b.sidor} sidor");`,`class Bok`,`{`,`    public string titel;`,`    public int sidor;`,`    public Bok(string titel, int sidor)`,`    {`,`        this.titel = titel;`,`        this.sidor = sidor;`,`    }`,`}`],alt:[[`Bok b = new Bok("Dune", 412);`,`Console.WriteLine($"{b.titel} har {b.sidor} sidor");`,`class Bok`,`{`,`    public int sidor;`,`    public string titel;`,`    public Bok(string titel, int sidor)`,`    {`,`        this.titel = titel;`,`        this.sidor = sidor;`,`    }`,`}`],[`Bok b = new Bok("Dune", 412);`,`Console.WriteLine($"{b.titel} har {b.sidor} sidor");`,`class Bok`,`{`,`    public string titel;`,`    public int sidor;`,`    public Bok(string titel, int sidor)`,`    {`,`        this.sidor = sidor;`,`        this.titel = titel;`,`    }`,`}`],[`Bok b = new Bok("Dune", 412);`,`Console.WriteLine($"{b.titel} har {b.sidor} sidor");`,`class Bok`,`{`,`    public int sidor;`,`    public string titel;`,`    public Bok(string titel, int sidor)`,`    {`,`        this.sidor = sidor;`,`        this.titel = titel;`,`    }`,`}`],[`Bok b = new Bok("Dune", 412);`,`Console.WriteLine($"{b.titel} har {b.sidor} sidor");`,`class Bok`,`{`,`    public string titel;`,`    public int sidor;`,`    public Bok(string titel, int sidor)`,`    {`,`        this.titel = titel;`,`        this.sidor = sidor;`,`}`,`    }`],[`Bok b = new Bok("Dune", 412);`,`Console.WriteLine($"{b.titel} har {b.sidor} sidor");`,`class Bok`,`{`,`    public int sidor;`,`    public string titel;`,`    public Bok(string titel, int sidor)`,`    {`,`        this.titel = titel;`,`        this.sidor = sidor;`,`}`,`    }`],[`Bok b = new Bok("Dune", 412);`,`Console.WriteLine($"{b.titel} har {b.sidor} sidor");`,`class Bok`,`{`,`    public string titel;`,`    public int sidor;`,`    public Bok(string titel, int sidor)`,`    {`,`        this.sidor = sidor;`,`        this.titel = titel;`,`}`,`    }`],[`Bok b = new Bok("Dune", 412);`,`Console.WriteLine($"{b.titel} har {b.sidor} sidor");`,`class Bok`,`{`,`    public int sidor;`,`    public string titel;`,`    public Bok(string titel, int sidor)`,`    {`,`        this.sidor = sidor;`,`        this.titel = titel;`,`}`,`    }`]],output:`Dune har 412 sidor`,distractors:[{line:`        titel = titel;`,why:`Utan this sätter parametern sig själv, och fältet förblir tomt. this.titel är fältet.`}],explain:`Konstruktorn heter som klassen och har ingen returtyp. this.titel är fältet och titel är parametern.`,hint:`Fälten först i klassen, sedan konstruktorn som fyller dem.`}],"cs-props":[{type:`order`,prompt:`Ordna raderna så att varan får sitt pris i konstruktorn och reapriset räknas ut av en beräknad egenskap.`,lines:[`Vara v = new Vara(400);`,`Console.WriteLine(v.Pris);`,`Console.WriteLine(v.Rea);`,`class Vara`,`{`,`    public int Pris { get; private set; }`,`    public int Rea => Pris / 2;`,`    public Vara(int pris)`,`    {`,`        Pris = pris;`,`    }`,`}`],alt:[[`Vara v = new Vara(400);`,`Console.WriteLine(v.Pris);`,`Console.WriteLine(v.Rea);`,`class Vara`,`{`,`    public int Rea => Pris / 2;`,`    public int Pris { get; private set; }`,`    public Vara(int pris)`,`    {`,`        Pris = pris;`,`    }`,`}`],[`Vara v = new Vara(400);`,`Console.WriteLine(v.Pris);`,`Console.WriteLine(v.Rea);`,`class Vara`,`{`,`    public int Pris { get; private set; }`,`    public int Rea => Pris / 2;`,`    public Vara(int pris)`,`    {`,`        Pris = pris;`,`}`,`    }`],[`Vara v = new Vara(400);`,`Console.WriteLine(v.Pris);`,`Console.WriteLine(v.Rea);`,`class Vara`,`{`,`    public int Rea => Pris / 2;`,`    public int Pris { get; private set; }`,`    public Vara(int pris)`,`    {`,`        Pris = pris;`,`}`,`    }`]],output:`400
200`,distractors:[{line:`v.Pris = 0;`,why:`Pris har private set, så bara klassen själv får ändra det.`}],explain:`Konstruktorn sätter Pris. Rea har ingen egen lagring utan räknas ut från Pris varje gång den läses.`,hint:`Pris skrivs ut före Rea. Egenskaperna står först i klassen, konstruktorn efter.`}],"cs-objmethods":[{type:`order`,prompt:`Ordna raderna så att spargrisen får pengar via en metod och skrivs ut med en egen ToString.`,lines:[`Spargris g = new Spargris();`,`g.Lägg(20);`,`Console.WriteLine(g);`,`class Spargris`,`{`,`    public int Kronor { get; private set; }`,`    public void Lägg(int belopp)`,`    {`,`        Kronor += belopp;`,`    }`,`    public override string ToString() { return $"Spargrisen har {Kronor} kr"; }`,`}`],alt:[[`Spargris g = new Spargris();`,`g.Lägg(20);`,`Console.WriteLine(g);`,`class Spargris`,`{`,`    public int Kronor { get; private set; }`,`    public override string ToString() { return $"Spargrisen har {Kronor} kr"; }`,`    public void Lägg(int belopp)`,`    {`,`        Kronor += belopp;`,`    }`,`}`]],output:`Spargrisen har 20 kr`,distractors:[{line:`    public static void Lägg(int belopp)`,why:`En metod som hör till ett visst objekt skrivs utan static.`}],explain:`Lägg ändrar objektets eget värde. När objektet skrivs ut anropar C# dess ToString.`,hint:`Pengarna ska läggas i innan grisen skrivs ut. I klassen kommer egenskapen först.`}],"cs-inherit":[{type:`order`,prompt:`Ordna raderna så att Hund ärver metoden Presentera från Djur och programmet anropar den.`,lines:[`Hund h = new Hund();`,`h.Presentera();`,`class Djur`,`{`,`    public void Presentera()`,`    {`,`        Console.WriteLine("Jag är ett djur och kan presentera mig");`,`    }`,`}`,`class Hund : Djur`,`{`,`}`],alt:[[`Hund h = new Hund();`,`h.Presentera();`,`class Djur`,`{`,`    public void Presentera()`,`    {`,`        Console.WriteLine("Jag är ett djur och kan presentera mig");`,`}`,`    }`,`class Hund : Djur`,`{`,`}`],[`Hund h = new Hund();`,`h.Presentera();`,`class Hund : Djur`,`{`,`}`,`class Djur`,`{`,`    public void Presentera()`,`    {`,`        Console.WriteLine("Jag är ett djur och kan presentera mig");`,`    }`,`}`],[`Hund h = new Hund();`,`h.Presentera();`,`class Hund : Djur`,`{`,`}`,`class Djur`,`{`,`    public void Presentera()`,`    {`,`        Console.WriteLine("Jag är ett djur och kan presentera mig");`,`}`,`    }`]],output:`Jag är ett djur och kan presentera mig`,distractors:[{line:`class Hund extends Djur`,why:`I C# skrivs arv med kolon: class Hund : Djur.`}],explain:`Hund har inga egna metoder, men ärver Presentera från basklassen Djur. Därför fungerar h.Presentera().`,hint:`Basklassen har metoden. Den ärvande klassen anger basklassen efter ett kolon.`}],"cs-virtual":[{type:`order`,prompt:`Ordna raderna så att samma variabel först pekar på ett Instrument och sedan på en Gitarr, och rätt version av Spela körs.`,lines:[`Instrument i = new Instrument();`,`Console.WriteLine(i.Spela());`,`i = new Gitarr();`,`Console.WriteLine(i.Spela());`,`class Instrument`,`{`,`    public virtual string Spela() { return "Ett ljud"; }`,`}`,`class Gitarr : Instrument`,`{`,`    public override string Spela() { return "Plink"; }`,`}`],alt:[[`Instrument i = new Instrument();`,`Console.WriteLine(i.Spela());`,`i = new Gitarr();`,`Console.WriteLine(i.Spela());`,`class Gitarr : Instrument`,`{`,`    public override string Spela() { return "Plink"; }`,`}`,`class Instrument`,`{`,`    public virtual string Spela() { return "Ett ljud"; }`,`}`]],output:`Ett ljud
Plink`,distractors:[{line:`    public string Spela() { return "Plink"; }`,why:`Utan override körs basklassens version när variabeln har typen Instrument.`}],explain:`Spela är virtual i basklassen och override i Gitarr. Vilken version som körs beror på objektet, inte på variabelns typ.`,hint:`virtual står i basklassen, override i den ärvande klassen.`}],"cs-abstract":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`List<Form> former = new List<Form> { new Kvadrat(3), new Kvadrat(1) };
foreach (Form f in former)
{
    Console.WriteLine(f.Beskriv());
}

abstract class Form
{
    public abstract int Area();

    public string Beskriv()
    {
        return $"Area {Area()}";
    }
}

class Kvadrat : Form
{
    private int sida;

    public Kvadrat(int sida)
    {
        this.sida = sida;
    }

    public override int Area()
    {
        return sida * sida;
    }
}`,options:[`Area 6
Area 2`,`Area 9
Area 1`,`Area 12
Area 4`],answer:1,out:!0,why:{0:`6 vore sida gånger 2. Kvadratens Area räknar sida * sida.`,2:`12 är omkretsen, 4 gånger sidan. Area returnerar sida * sida.`},explain:`Beskriv finns i den abstrakta klassen men anropar Area, och då körs Kvadratens version: 3 * 3 och 1 * 1.`},{type:`order`,prompt:`Ordna raderna så att den abstrakta klassen Biljett bygger kvittot och Barnbiljett bestämmer priset.`,lines:[`Biljett b = new Barnbiljett();`,`Console.WriteLine(b.Kvitto());`,`abstract class Biljett`,`{`,`    public abstract int Pris();`,`    public string Kvitto() { return $"Att betala: {Pris()} kr"; }`,`}`,`class Barnbiljett : Biljett`,`{`,`    public override int Pris() { return 60; }`,`}`],alt:[[`Biljett b = new Barnbiljett();`,`Console.WriteLine(b.Kvitto());`,`abstract class Biljett`,`{`,`    public string Kvitto() { return $"Att betala: {Pris()} kr"; }`,`    public abstract int Pris();`,`}`,`class Barnbiljett : Biljett`,`{`,`    public override int Pris() { return 60; }`,`}`],[`Biljett b = new Barnbiljett();`,`Console.WriteLine(b.Kvitto());`,`class Barnbiljett : Biljett`,`{`,`    public override int Pris() { return 60; }`,`}`,`abstract class Biljett`,`{`,`    public abstract int Pris();`,`    public string Kvitto() { return $"Att betala: {Pris()} kr"; }`,`}`],[`Biljett b = new Barnbiljett();`,`Console.WriteLine(b.Kvitto());`,`class Barnbiljett : Biljett`,`{`,`    public override int Pris() { return 60; }`,`}`,`abstract class Biljett`,`{`,`    public string Kvitto() { return $"Att betala: {Pris()} kr"; }`,`    public abstract int Pris();`,`}`]],output:`Att betala: 60 kr`,distractors:[{line:`Biljett b = new Biljett();`,why:`En abstrakt klass kan inte skapas med new. Skapa en klass som ärver från den.`}],explain:`Pris saknar kropp i Biljett och måste skrivas med override i Barnbiljett. Kvitto anropar den versionen.`,hint:`Den abstrakta metoden har bara ett semikolon. Kroppen finns i klassen som ärver.`}],"cs-interface":[{type:`order`,prompt:`Ordna raderna så att Kvitto uppfyller interfacet ISkrivbar och programmet skriver ut texten.`,lines:[`ISkrivbar s = new Kvitto();`,`Console.WriteLine(s.Text());`,`interface ISkrivbar`,`{`,`    string Text();`,`}`,`class Kvitto : ISkrivbar`,`{`,`    public string Text() { return "Tack för köpet!"; }`,`}`],alt:[[`ISkrivbar s = new Kvitto();`,`Console.WriteLine(s.Text());`,`class Kvitto : ISkrivbar`,`{`,`    public string Text() { return "Tack för köpet!"; }`,`}`,`interface ISkrivbar`,`{`,`    string Text();`,`}`]],output:`Tack för köpet!`,distractors:[{line:`    public override string Text() { return "Tack för köpet!"; }`,why:`Metoder från ett interface skrivs som vanliga public-metoder, utan override.`}],explain:`Interfacet säger bara att Text måste finnas. Kvitto skriver hur den fungerar, och variabeln kan ha interfacets typ.`,hint:`I interfacet finns bara metodens rubrik med semikolon.`}],"cs-dict":[{type:`order`,prompt:`Ordna raderna så att Ida och Leo får sina mål, Leo får 3 till, och alla par skrivs ut.`,lines:[`Dictionary<string, int> mål = new Dictionary<string, int>();`,`mål["Ida"] = 2;`,`mål["Leo"] = 1;`,`mål["Leo"] += 3;`,`foreach (KeyValuePair<string, int> par in mål)`,`{`,`    string rad = $"{par.Key}: {par.Value}";`,`    Console.WriteLine(rad);`,`}`],output:`Ida: 2
Leo: 4`,distractors:[{line:`mål.Add("Leo", 3);`,why:`Add kastar ArgumentException om nyckeln redan finns. Använd += för att öka värdet.`}],explain:`Nyckeln måste finnas innan += kan öka den. Paren kommer ut i den ordning nycklarna lades till.`,hint:`Ida ska skrivas ut först. Leo måste ha ett värde innan det kan ökas.`}],"cs-lambda":[{type:`order`,prompt:`Ordna raderna så att låtarna sorteras efter längd, första långa titeln hittas, korta titlar tas bort och listan skrivs ut.`,lines:[`List<string> låtar = new List<string> { "Ja", "Solsken", "Regn", "Midnattssol" };`,`låtar.Sort((a, b) => a.Length.CompareTo(b.Length));`,`Console.WriteLine(låtar.Find(l => l.Length > 3));`,`Console.WriteLine(låtar.RemoveAll(l => l.Length < 3));`,`Console.WriteLine(string.Join(", ", låtar));`],output:`Regn
1
Regn, Solsken, Midnattssol`,distractors:[{line:`låtar.Sort((a, b) => b.Length.CompareTo(a.Length));`,why:`Med b först sorteras listan fallande, längst först.`}],explain:`Efter sorteringen är Regn den första titeln längre än 3 tecken. RemoveAll tar bort Ja och returnerar 1.`,hint:`Sortera först, sedan Find, RemoveAll och sist hela listan.`}],"cs-linq":[{type:`order`,prompt:`Ordna raderna så att de dyra varorna får halva priset, ett extrapris läggs till, och listan skrivs ut följt av om något kostar under 50.`,lines:[`List<int> priser = new List<int> { 120, 45, 300, 80 };`,`List<int> rea = priser.Where(p => p >= 100).Select(p => p / 2).ToList();`,`rea.Add(25);`,`Console.WriteLine(string.Join(", ", rea));`,`Console.WriteLine(priser.Any(p => p < 50));`],output:`60, 150, 25
True`,distractors:[{line:`List<int> rea = priser.Where(p => p >= 100).Select(p => p / 2);`,why:`Where och Select ger ingen lista ännu. Avsluta med .ToList() för att få en List.`}],explain:`Where behåller 120 och 300, Select halverar dem och ToList gör en riktig lista som Add fungerar på.`,hint:`Listan måste finnas innan du lägger till något i den.`}],"cs-linq-sort":[{type:`order`,prompt:`Ordna raderna så att tiderna skrivs ut sorterade, sedan den första tiden i originallistan och sist den snabbaste.`,lines:[`List<int> tider = new List<int> { 52, 47, 61, 49 };`,`List<int> sorterade = tider.OrderBy(t => t).ToList();`,`Console.WriteLine(string.Join(", ", sorterade));`,`Console.WriteLine(tider.First());`,`Console.WriteLine($"Snabbast: {tider.Min()}");`],output:`47, 49, 52, 61
52
Snabbast: 47`,explain:`OrderBy ger en ny sorterad sekvens och ändrar inte originalet, så tider.First() är fortfarande 52.`,hint:`Sortera innan du skriver ut den sorterade listan. Följ ordningen i uppgiften.`}],"cs-switch":[{type:`order`,prompt:`Ordna raderna så att metoden ger nästa läge för ett trafikljus: Röd blir Grön och allt annat blir Röd.`,lines:[`Console.WriteLine(Nästa("Röd"));`,`Console.WriteLine(Nästa("Gul"));`,`static string Nästa(string ljus)`,`{`,`    switch (ljus)`,`    {`,`        case "Röd":`,`            return "Grön";`,`        default:`,`            return "Röd";`,`    }`,`}`],alt:[[`Console.WriteLine(Nästa("Röd"));`,`Console.WriteLine(Nästa("Gul"));`,`static string Nästa(string ljus)`,`{`,`    switch (ljus)`,`    {`,`        case "Röd":`,`            return "Grön";`,`        default:`,`            return "Röd";`,`}`,`    }`]],output:`Grön
Röd`,distractors:[{line:`        case Röd:`,why:`Texten i ett case måste stå inom citattecken: case "Röd":.`}],explain:`switch jämför ljus med varje case. "Gul" matchar inget case och hamnar i default. return avslutar varje case.`,hint:`Varje case följs av sitt eget return. default står sist.`}],"cs-search":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int[] tal = {3, 6, 9, 12, 15};
int lo = 0;
int hi = tal.Length - 1;
while (lo <= hi)
{
    int mitt = (lo + hi) / 2;
    Console.WriteLine(tal[mitt]);
    if (tal[mitt] == 12)
    {
        break;
    }
    if (tal[mitt] < 12)
    {
        lo = mitt + 1;
    }
    else
    {
        hi = mitt - 1;
    }
}`,options:[`3
6
9
12`,`9
15
12`,`9
12`],answer:2,out:!0,why:{0:`Så letar linjär sökning. Binärsökning börjar i mitten.`,1:`Efter 9 blir lo 3 och hi 4. Mitten är (3 + 4) / 2 = 3, alltså 12, eftersom heltalsdivision avrundar nedåt.`},explain:`Först mitten, index 2 med 9. 9 är mindre än 12, så sökningen fortsätter till höger och hittar 12 på index 3.`},{type:`order`,prompt:`Ordna raderna så att binärsökningen letar efter 14 och skriver ut varje tal den tittar på.`,lines:[`int[] tal = {2, 5, 8, 11, 14, 17};`,`int lo = 0;`,`int hi = tal.Length - 1;`,`while (lo <= hi)`,`{`,`    int mitt = (lo + hi) / 2;`,`    Console.WriteLine($"Tittar på {tal[mitt]}");`,`    if (tal[mitt] == 14) break;`,`    if (tal[mitt] < 14) lo = mitt + 1;`,`    else hi = mitt - 1;`,`}`],alt:[[`int lo = 0;`,`int[] tal = {2, 5, 8, 11, 14, 17};`,`int hi = tal.Length - 1;`,`while (lo <= hi)`,`{`,`    int mitt = (lo + hi) / 2;`,`    Console.WriteLine($"Tittar på {tal[mitt]}");`,`    if (tal[mitt] == 14) break;`,`    if (tal[mitt] < 14) lo = mitt + 1;`,`    else hi = mitt - 1;`,`}`],[`int[] tal = {2, 5, 8, 11, 14, 17};`,`int hi = tal.Length - 1;`,`int lo = 0;`,`while (lo <= hi)`,`{`,`    int mitt = (lo + hi) / 2;`,`    Console.WriteLine($"Tittar på {tal[mitt]}");`,`    if (tal[mitt] == 14) break;`,`    if (tal[mitt] < 14) lo = mitt + 1;`,`    else hi = mitt - 1;`,`}`]],output:`Tittar på 8
Tittar på 14`,distractors:[{line:`while (lo < hi)`,why:`Med < slutar sökningen när lo och hi är lika, och det sista kvarvarande talet testas aldrig.`}],explain:`Mitten räknas ut och skrivs ut först. Är talet målet avbryts loopen, annars halveras sökområdet åt rätt håll.`,hint:`else hör ihop med if-satsen precis ovanför.`}],"cs-recursion":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`Console.WriteLine(Summa(4));

static int Summa(int n)
{
    if (n == 0)
    {
        return 0;
    }
    return n + Summa(n - 1);
}`,options:[`10`,`4`,`0`],answer:0,out:!0,why:{1:`Metoden returnerar inte bara n. Den lägger till Summa(n - 1), alltså 4 + 3 + 2 + 1 + 0.`,2:`Basfallet returnerar 0, men det är bara det innersta anropet. Varje nivå lägger till sitt n.`},explain:`Summa(4) blir 4 + Summa(3), och så vidare ner till basfallet Summa(0) = 0. Totalt 10.`},{type:`order`,prompt:`Ordna raderna så att den rekursiva metoden först når botten och sedan skriver stegen 1, 2 och 3 på vägen upp.`,lines:[`Trappa(3);`,`static void Trappa(int n)`,`{`,`    if (n == 0)`,`    {`,`        Console.WriteLine("Botten");`,`        return;`,`    }`,`    Trappa(n - 1);`,`    Console.WriteLine($"Steg {n}");`,`}`],output:`Botten
Steg 1
Steg 2
Steg 3`,distractors:[{line:`    Trappa(n);`,why:`Anropet måste komma närmare basfallet. Med samma n tar anropen aldrig slut.`}],explain:`Basfallet stoppar rekursionen. Eftersom anropet står före utskriften skrivs stegen ut när anropen återvänder, från 1 och uppåt.`,hint:`Basfallet först. Ska steget skrivas ut före eller efter det rekursiva anropet för att få 1, 2, 3?`}],"cs-sorting":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`int[] t = {3, 4, 1};
for (int i = 0; i < t.Length - 1; i++)
{
    if (t[i] > t[i + 1])
    {
        int temp = t[i];
        t[i] = t[i + 1];
        t[i + 1] = temp;
    }
}
Console.WriteLine(string.Join(", ", t));`,options:[`1, 3, 4`,`3, 1, 4`,`3, 4, 1`],answer:1,out:!0,why:{0:`Det är ett enda varv. Det flyttar det största talet sist, men hela arrayen blir inte sorterad.`,2:`4 är större än 1, så de byter plats i andra jämförelsen.`},explain:`Först jämförs 3 och 4, inget byte. Sedan 4 och 1, som byter plats. Efter ett varv är bara största talet på plats.`},{type:`order`,prompt:`Ordna raderna så att programmet gör ett varv av bubbelsortering och skriver ut arrayen efter varje jämförelse.`,lines:[`int[] t = {5, 2, 9, 1};`,`for (int i = 0; i < t.Length - 1; i++)`,`{`,`    if (t[i] > t[i + 1])`,`    {`,`        int temp = t[i];`,`        t[i] = t[i + 1];`,`        t[i + 1] = temp;`,`    }`,`    Console.WriteLine(string.Join(", ", t));`,`}`],output:`2, 5, 9, 1
2, 5, 9, 1
2, 5, 1, 9`,distractors:[{line:`        t[i + 1] = t[i];`,why:`Utan hjälpvariabeln skrivs värdet över, och båda platserna får samma tal.`}],explain:`Grannar som står i fel ordning byter plats via temp. Efter ett varv har det största talet hamnat sist.`,hint:`Spara t[i] i temp först, annars försvinner värdet.`}]});export{u as default};