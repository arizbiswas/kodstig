// Stegvisa ledtrådar i Kodlabbet. Fungerar helt utan AI: reglerna utgår från
// valt språk, elevens kod och kodmotorns verkliga felmeddelande.
import { cssBalance, styleText } from './html-check.js';

const L = (line) => (line ? `rad ${line}` : 'koden');

const PY = {
  'missing-colon': (c) => [
    `Titta på slutet av ${L(c.line)}. Vad brukar stå sist på en rad som startar ett block, som if, for, while eller def?`,
    'Rader som startar ett block avslutas med kolon (:). Raderna som hör till blocket dras sedan in.',
    { text: 'Jämför med det här lilla exemplet:', example: 'tal = 3\nif tal > 2:\n    print("stort")' },
  ],
  'expected-indent': (c) => [
    `Raden efter kolonet på ${L(c.line - 1 || c.line)} – hur långt in börjar den?`,
    'Allt som hör till ett if, for, while eller def ska dras in med samma antal mellanslag, oftast fyra.',
    { text: 'Indragningen visar vad som hör ihop:', example: 'for i in range(2):\n    print(i)\nprint("klar")' },
  ],
  'unexpected-indent': (c) => [
    `Börjar ${L(c.line)} med mellanslag fast raden ovanför inte slutar med kolon?`,
    'I Python betyder indragning att raden hör till ett block. Rader på toppnivå ska börja längst till vänster.',
    { text: 'Två rader på samma nivå:', example: 'namn = "Ada"\nprint(namn)' },
  ],
  indent: (c) => [
    `Jämför hur många mellanslag ${L(c.line)} har med raderna ovanför.`,
    'Rader i samma block måste ha exakt samma indragning. Blanda inte tre och fyra mellanslag.',
    { text: 'Samma indragning i hela blocket:', example: 'if True:\n    print("a")\n    print("b")' },
  ],
  'unclosed-string': (c) => [
    `Räkna citattecknen på ${L(c.line)}. Har varje text både ett start- och ett slutcitattecken?`,
    'En text (str) börjar och slutar med samma sorts citattecken: "så här" eller \'så här\'.',
    { text: 'En komplett text:', example: 'print("Hej, kodare!")' },
  ],
  'smart-quotes': (c) => [
    `Citattecknen på ${L(c.line)} ser lite annorlunda ut. Har de kopierats från ett dokument?`,
    'Ordbehandlare gör om " till ” eller “. Python förstår bara de raka tecknen " och \'.',
    { text: 'Skriv om citattecknen med tangentbordet:', example: 'print("Hej")' },
  ],
  parens: (c) => [
    `Räkna parenteserna på ${L(c.line)}. Har varje ( en matchande ) och varje [ en ]?`,
    'Ett funktionsanrop som print( ... ) behöver stängas med ). Listor skrivs inom [ och ].',
    { text: 'Parenteser i par:', example: 'tal = [1, 2, 3]\nprint(len(tal))' },
  ],
  name: (c) => [
    `Vilket namn klagar felet på? Leta efter var det namnet får sitt värde${c.line ? ` före ${L(c.line)}` : ''}.`,
    'En variabel måste få ett värde innan den används, och namnet måste stavas exakt likadant varje gång – även stora och små bokstäver.',
    { text: 'Skapa först, använd sedan:', example: 'poäng = 10\nprint(poäng)' },
  ],
  'str-plus-num': (c) => [
    `På ${L(c.line)} försöker koden lägga ihop text och ett tal. Vilken av delarna är ett tal?`,
    'Python vägrar gissa om "5" + 3 ska bli "53" eller 8. Gör om talet till text med str(), eller använd en f-sträng.',
    { text: 'Två sätt som fungerar:', example: 'ålder = 12\nprint("Ålder: " + str(ålder))\nprint(f"Ålder: {ålder}")' },
  ],
  'zero-div': (c) => [
    `Vilket värde har det du delar med på ${L(c.line)}? Kan det bli 0?`,
    'Division med noll går inte. Kontrollera nämnaren med ett if innan du delar.',
    { text: 'Skydda divisionen:', example: 'antal = 0\nif antal != 0:\n    print(10 / antal)\nelse:\n    print("Inget att dela med")' },
  ],
  'index-range': (c) => [
    `Hur många element har listan, och vilket index försöker ${L(c.line)} läsa?`,
    'Index börjar på 0. En lista med 3 element har index 0, 1 och 2. Sista elementet nås även med -1.',
    { text: 'Säkra index:', example: 'frukt = ["äpple", "päron", "kiwi"]\nprint(frukt[0])\nprint(frukt[len(frukt) - 1])' },
  ],
  'infinite-loop': () => [
    'Följ loopens villkor. Vilken rad ändrar värdet som villkoret testar?',
    'En while-loop slutar bara när villkoret blir falskt. Se till att något i loopen för den närmare slutet, till exempel i += 1.',
    { text: 'En loop som slutar:', example: 'i = 0\nwhile i < 3:\n    print(i)\n    i += 1' },
  ],
  'assign-in-condition': (c) => [
    `Titta på jämförelsen på ${L(c.line)}. Hur många likhetstecken står där?`,
    '= ger en variabel ett värde. == frågar om två värden är lika.',
    { text: 'Jämför med ==:', example: 'svar = 3\nif svar == 3:\n    print("Rätt")' },
  ],
  'arg-count': (c) => [
    `Jämför anropet på ${L(c.line)} med hur funktionen är definierad. Hur många värden skickas in?`,
    'Antalet argument i anropet måste matcha parametrarna i def-raden.',
    { text: 'En parameter, ett argument:', example: 'def hälsa(namn):\n    print("Hej", namn)\n\nhälsa("Mo")' },
  ],
  'missing-function': () => [
    'Har funktionen exakt det namn som uppgiften ber om?',
    'Uppgiften testar en funktion med ett bestämt namn. Kontrollera stavning och att den skapas med def.',
    { text: 'En funktion som returnerar ett värde:', example: 'def dubbla(x):\n    return x * 2\n\nprint(dubbla(4))' },
  ],
  'type-compare': (c) => [
    `Vilka typer jämförs på ${L(c.line)}? Är den ena text och den andra ett tal?`,
    'Text och tal kan inte jämföras med < eller >. Gör om texten till ett tal med int() först.',
    { text: 'Jämför tal med tal:', example: 'text = "7"\nif int(text) > 5:\n    print("större")' },
  ],
  'value-int': () => [
    'Vilken text försöker du göra om till ett heltal?',
    'int() fungerar bara på text som består av siffror, till exempel "42". Mellanslag i kanterna går bra, bokstäver och decimaler gör det inte.',
    { text: 'Omvandling som fungerar:', example: 'print(int("42") + 1)' },
  ],
  'stray-else': (c) => [
    `Står else/elif på ${L(c.line)} lika långt in som sitt if?`,
    'elif och else måste komma direkt efter if-blocket och ha samma indragning som if.',
    { text: 'if, elif och else i rad:', example: 'tal = 0\nif tal > 0:\n    print("positivt")\nelif tal == 0:\n    print("noll")\nelse:\n    print("negativt")' },
  ],
  'return-outside': (c) => [
    `Ligger return på ${L(c.line)} inuti en funktion?`,
    'return skickar tillbaka ett värde från en funktion. Kolla att raden är indragen under def.',
    { text: 'return inuti funktionen:', example: 'def summa(a, b):\n    return a + b\n\nprint(summa(2, 3))' },
  ],
  'missing-comma': (c) => [
    `Står det två värden bredvid varandra på ${L(c.line)} utan något mellan?`,
    'Värden i en lista eller ett anrop skiljs åt med komma. Text och variabler slås ihop med + eller en f-sträng.',
    { text: 'Komma mellan argumenten:', example: 'namn = "Ada"\nprint("Hej", namn)' },
  ],
  input: () => [
    'Vilket värde vill du att programmet ska arbeta med?',
    'Kodlabbet kan inte fråga användaren. Skriv in värdet direkt i en variabel så kan du ändra det och köra igen.',
    { text: 'Ett värde direkt i koden:', example: 'namn = "Kim"  # byt namnet och kör igen\nprint("Hej", namn)' },
  ],
  attr: (c) => [
    `Vilken metod anropas på ${L(c.line)}, och vilken typ har värdet?`,
    'Metoder hör till en viss typ. Text har till exempel upper(), listor har append().',
    { text: 'Metoder på text och lista:', example: 'ord = "hej"\nprint(ord.upper())\nlista = []\nlista.append(1)\nprint(lista)' },
  ],
  key: (c) => [
    `Vilken nyckel försöker ${L(c.line)} läsa? Finns den i ordboken?`,
    'Använd .get(nyckel, standardvärde) eller kontrollera med in innan du läser.',
    { text: 'Läs säkert:', example: 'pris = {"kaffe": 30}\nprint(pris.get("te", 0))' },
  ],
  raised: (c) => [
    `Programmet kastade ett undantag på ${L(c.line)}. Var det meningen, och var ska det i så fall fångas?`,
    'Ett undantag som ingen fångar stoppar programmet. Lägg koden som kan gå fel i ett try-block och fånga felet med except.',
    { text: 'Kasta och fånga:', example: 'def kolla(ålder):\n    if ålder < 0:\n        raise ValueError("Åldern kan inte vara negativ")\n    return ålder\n\ntry:\n    kolla(-1)\nexcept ValueError as fel:\n    print("Fel:", fel)' },
  ],
  'missing-self': (c) => [
    `Titta på metoden på ${L(c.line)}. Vad står först inom parentesen?`,
    'Metoder i en klass får alltid objektet själv som första parameter. Den heter self enligt konvention.',
    { text: 'En metod med self:', example: 'class Katt:\n    def __init__(self, namn):\n        self.namn = namn\n    def jama(self):\n        print(self.namn, "säger mjau")\n\nKatt("Misse").jama()' },
  ],
  'no-init': (c) => [
    `Klassen på ${L(c.line)} får argument. Var tar klassen emot dem?`,
    'Argument till klassen tas emot av metoden __init__ och sparas ofta på self.',
    { text: 'Ta emot värden i __init__:', example: 'class Bok:\n    def __init__(self, titel):\n        self.titel = titel\n\nb = Bok("Kodstig")\nprint(b.titel)' },
  ],
  'try-without-except': (c) => [
    `Vad händer efter try-blocket på ${L(c.line)}?`,
    'Ett try-block följs av minst ett except (eller finally) med samma indragning som try.',
    { text: 'try med except:', example: 'try:\n    tal = int("12")\nexcept ValueError:\n    tal = 0\nprint(tal)' },
  ],
  'stray-except': (c) => [
    `Står except på ${L(c.line)} på samma indragning som sitt try?`,
    'except och finally hör till närmaste try ovanför och ska börja lika långt in som det.',
    { text: 'Samma indragning:', example: 'try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print("Inte med noll")' },
  ],
  'except-type': (c) => [
    `Vad står efter except på ${L(c.line)}?`,
    'Efter except skriver du namnet på en undantagsklass, till exempel ValueError, eller flera inom parentes.',
    { text: 'Fånga flera sorters fel:', example: 'try:\n    print([1, 2][5])\nexcept (IndexError, KeyError) as fel:\n    print("Hittade inte:", fel)' },
  ],
  super: (c) => [
    `Var används super() på ${L(c.line)}?`,
    'super() fungerar bara inuti en metod i en klass som ärver från en annan klass.',
    { text: 'Anropa basklassens __init__:', example: 'class Djur:\n    def __init__(self, namn):\n        self.namn = namn\n\nclass Hund(Djur):\n    def __init__(self, namn):\n        super().__init__(namn)\n        self.ljud = "voff"\n\nprint(Hund("Rex").namn)' },
  ],
};

const CS = {
  'missing-semicolon': (c) => [
    `Titta på slutet av ${L(c.line)}. Vilket tecken avslutar en sats i C#?`,
    'I C# slutar varje sats med semikolon (;). Rader som startar ett block, som if (...) eller for (...), har i stället { }.',
    { text: 'Satser med semikolon:', example: 'int steg = 1;\nConsole.WriteLine(steg);' },
  ],
  braces: (c) => [
    `Räkna klamrarna { och } fram till ${L(c.line)}. Har varje { en }?`,
    'Varje block som öppnas med { måste stängas med }. Indragning gör det lättare att se vad som hör ihop.',
    { text: 'Ett komplett block:', example: 'int x = 3;\nif (x > 2)\n{\n    Console.WriteLine("stort");\n}' },
  ],
  parens: (c) => [
    `Räkna parenteserna på ${L(c.line)}. Har varje ( en matchande )?`,
    'Villkor i if och while skrivs inom parenteser, och metodanrop stängs med ).',
    { text: 'Parenteser i par:', example: 'int x = 5;\nif (x > 3)\n{\n    Console.WriteLine(Math.Max(x, 10));\n}' },
  ],
  'unclosed-string': (c) => [
    `Räkna citattecknen på ${L(c.line)}. Har texten både ett start- och ett slutcitattecken?`,
    'Text (string) skrivs mellan dubbla citattecken: "så här".',
    { text: 'En komplett text:', example: 'Console.WriteLine("Hej, kodare!");' },
  ],
  'smart-quotes': (c) => [
    `Citattecknen på ${L(c.line)} ser lite annorlunda ut. Har de kopierats från ett dokument?`,
    'C# förstår bara raka citattecken ". Skriv om dem med tangentbordet.',
    { text: 'Raka citattecken:', example: 'Console.WriteLine("Hej");' },
  ],
  'char-literal': (c) => [
    `Står det text mellan enkla citattecken på ${L(c.line)}?`,
    "I C# är 'a' ett enda tecken (char). Text med flera tecken skrivs med dubbla citattecken.",
    { text: 'Tecken och text:', example: "char bokstav = 'A';\nstring ord = \"Apa\";\nConsole.WriteLine(ord + bokstav);" },
  ],
  name: (c) => [
    `Vilket namn klagar felet på? Leta efter var det deklareras${c.line ? ` före ${L(c.line)}` : ''}.`,
    'I C# måste en variabel deklareras med en typ innan den används, och namnet måste stavas likadant – stora och små bokstäver räknas.',
    { text: 'Deklarera först, använd sedan:', example: 'int poäng = 10;\nConsole.WriteLine(poäng);' },
  ],
  'member-case': (c) => [
    `Jämför stavningen på ${L(c.line)} med exemplen i lektionen. Stämmer stora och små bokstäver?`,
    'C# skiljer på stora och små bokstäver. Det heter Console.WriteLine, inte Console.Writeline.',
    { text: 'Rätt stavning:', example: 'Console.WriteLine("Hej");\nConsole.WriteLine("hej".ToUpper());' },
  ],
  'string-to-num': (c) => [
    `Vilken typ har variabeln på ${L(c.line)}, och vilken typ har värdet du ger den?`,
    'Ett tal skrivs utan citattecken. "5" är text, 5 är ett heltal. Text kan göras om med int.Parse("5").',
    { text: 'Tal och text:', example: 'int antal = 5;\nint frånText = int.Parse("7");\nConsole.WriteLine(antal + frånText);' },
  ],
  'double-to-int': (c) => [
    `Kan värdet på ${L(c.line)} få decimaler? Vilken typ har variabeln det sparas i?`,
    'En int kan inte ha decimaler. Använd double för decimaltal, eller skriv (int) framför om du verkligen vill kapa decimalerna.',
    { text: 'Välj typ efter värdet:', example: 'double snitt = 7 / 2.0;\nint heltal = (int)snitt;\nConsole.WriteLine(snitt + " " + heltal);' },
  ],
  'num-to-string': (c) => [
    `Vilken typ har värdet som sparas på ${L(c.line)}?`,
    'En string kan bara få text. Gör om tal till text med .ToString(), eller sätt citattecken runt texten.',
    { text: 'Tal blir text:', example: 'int tal = 5;\nstring text = tal.ToString();\nConsole.WriteLine(text);' },
  ],
  'type-convert': (c) => [
    `Vilka typer möts på ${L(c.line)}?`,
    'Varje variabel i C# har en fast typ. Värdet du sparar måste passa den typen.',
    { text: 'Typer som passar:', example: 'int heltal = 3;\ndouble decimaltal = 2.5;\nstring text = "hej";\nbool klar = true;' },
  ],
  'assign-in-condition': (c) => [
    `Titta på villkoret på ${L(c.line)}. Hur många likhetstecken står där?`,
    '= ger en variabel ett värde. == jämför två värden och blir true eller false.',
    { text: 'Jämför med ==:', example: 'int svar = 3;\nif (svar == 3)\n{\n    Console.WriteLine("Rätt");\n}' },
  ],
  'cond-type': (c) => [
    `Vad blir villkoret på ${L(c.line)} – true/false eller ett tal?`,
    'Ett villkor måste bli bool. Jämför värdet med något, till exempel x > 0.',
    { text: 'Ett villkor som blir bool:', example: 'int x = 4;\nif (x > 0)\n{\n    Console.WriteLine("positivt");\n}' },
  ],
  'op-type': (c) => [
    `Vilka typer används med operatorn på ${L(c.line)}?`,
    'Räknesätt fungerar på tal, && och || på bool. Text jämförs med ==, inte med < och >.',
    { text: 'Rätt operator för rätt typ:', example: 'int a = 3, b = 4;\nbool båda = a > 0 && b > 0;\nConsole.WriteLine(båda);' },
  ],
  unassigned: (c) => [
    `Vilket värde har variabeln innan ${L(c.line)}?`,
    'C# kräver att en variabel får ett värde innan den läses. Ge den ett startvärde när du deklarerar den.',
    { text: 'Startvärde direkt:', example: 'int summa = 0;\nsumma += 5;\nConsole.WriteLine(summa);' },
  ],
  'duplicate-var': (c) => [
    `Har variabeln på ${L(c.line)} redan deklarerats tidigare?`,
    'En variabel deklareras en gång med typ. Därefter ändras den utan typ: x = 2;',
    { text: 'Deklarera en gång:', example: 'int x = 1;\nx = 2;\nConsole.WriteLine(x);' },
  ],
  'missing-return': (c) => [
    'Följ metoden för olika värden. Når varje väg en return-sats?',
    'En metod med returtyp (till exempel int) måste returnera ett värde oavsett vilken gren som körs. Lägg till ett return efter if-satserna.',
    { text: 'Return på alla vägar:', example: 'static int Tecken(int x)\n{\n    if (x < 0)\n    {\n        return -1;\n    }\n    return 1;\n}\n\nConsole.WriteLine(Tecken(-5));' },
  ],
  'zero-div': (c) => [
    `Vilket värde har nämnaren på ${L(c.line)}? Kan den bli 0?`,
    'Heltal kan inte delas med noll. Kontrollera nämnaren med if innan du delar.',
    { text: 'Skydda divisionen:', example: 'int antal = 0;\nif (antal != 0)\n{\n    Console.WriteLine(10 / antal);\n}\nelse\n{\n    Console.WriteLine("Inget att dela med");\n}' },
  ],
  'index-range': (c) => [
    `Hur många element finns, och vilket index läses på ${L(c.line)}?`,
    'Index börjar på 0. Sista elementet har index Length - 1 (eller Count - 1 för en List). Loopar använder därför i < Length.',
    { text: 'Säker loop över en array:', example: 'int[] tal = {4, 8, 15};\nfor (int i = 0; i < tal.Length; i++)\n{\n    Console.WriteLine(tal[i]);\n}' },
  ],
  'length-count': () => [
    'Är det en array eller en List du arbetar med?',
    'Arrayer har Length. Listor (List<T>) har Count.',
    { text: 'Length och Count:', example: 'int[] a = {1, 2};\nList<int> b = new List<int> {1, 2, 3};\nConsole.WriteLine(a.Length + " " + b.Count);' },
  ],
  'unknown-type': (c) => [
    `Kontrollera första ordet på ${L(c.line)}. Är det en typ som C# känner till?`,
    'Vanliga typer skrivs med små bokstäver: int, double, string, bool, char. Två ord i rad utan något mellan betyder deklaration.',
    { text: 'Deklarationer:', example: 'string namn = "Ada";\nint ålder = 36;' },
  ],
  'not-statement': (c) => [
    `Vad ska hända med värdet på ${L(c.line)}?`,
    'Ett uttryck som x + 1 gör ingenting ensamt. Spara det i en variabel eller skriv ut det.',
    { text: 'Använd värdet:', example: 'int x = 1;\nx = x + 1;\nConsole.WriteLine(x + 1);' },
  ],
  'empty-if': (c) => [
    `Står det ett semikolon direkt efter if (...) på ${L(c.line)}?`,
    'Ett semikolon efter if (...) gör if-satsen tom. Blocket nedanför körs då alltid.',
    { text: 'if utan semikolon:', example: 'int x = 5;\nif (x > 3)\n{\n    Console.WriteLine("stort");\n}' },
  ],
  linq: () => [
    'Hur skulle du räkna ut värdet för hand, ett element i taget?',
    'Kodstigs motor har inte LINQ. Använd en loop och en variabel som samlar upp resultatet.',
    { text: 'Summa med loop:', example: 'int[] tal = {2, 4, 6};\nint summa = 0;\nforeach (int t in tal)\n{\n    summa += t;\n}\nConsole.WriteLine(summa);' },
  ],
  'array-add': () => [
    'Behöver samlingen kunna växa?',
    'En array har fast storlek. En List<T> kan växa med Add.',
    { text: 'En lista som växer:', example: 'List<int> tal = new List<int>();\ntal.Add(3);\nConsole.WriteLine(tal.Count);' },
  ],
  input: () => [
    'Vilket värde vill du att programmet ska arbeta med?',
    'Kodlabbet kan inte läsa in från tangentbordet. Skriv värdet direkt i en variabel och ändra det mellan körningarna.',
    { text: 'Ett värde direkt i koden:', example: 'string namn = "Kim"; // byt och kör igen\nConsole.WriteLine("Hej " + namn);' },
  ],
  'arg-count': (c) => [
    `Jämför anropet på ${L(c.line)} med metodens parametrar.`,
    'Antalet argument måste matcha parametrarna, och varje argument måste ha rätt typ.',
    { text: 'Två parametrar, två argument:', example: 'static int Summa(int a, int b)\n{\n    return a + b;\n}\n\nConsole.WriteLine(Summa(2, 3));' },
  ],
  'missing-function': () => [
    'Har metoden exakt det namn som uppgiften ber om?',
    'Uppgiften testar en metod med ett bestämt namn. Kontrollera stavningen, inklusive stor begynnelsebokstav.',
    { text: 'En metod som returnerar:', example: 'static int Dubbla(int x)\n{\n    return x * 2;\n}\n\nConsole.WriteLine(Dubbla(4));' },
  ],
  'nested-method': () => [
    'Var i koden står metoden?',
    'Metoder skrivs utanför andra block, till exempel längst ner i filen.',
    { text: 'Metod längst ner:', example: 'Console.WriteLine(Dubbla(3));\n\nstatic int Dubbla(int x)\n{\n    return x * 2;\n}' },
  ],
  'infinite-loop': PY['infinite-loop'],
};
CS['infinite-loop'] = () => [
  'Följ loopens villkor. Vilken rad ändrar värdet som villkoret testar?',
  'En loop slutar först när villkoret blir false. Se till att räknaren ändras i varje varv, till exempel i++.',
  { text: 'En loop som slutar:', example: 'int i = 0;\nwhile (i < 3)\n{\n    Console.WriteLine(i);\n    i++;\n}' },
];

const GENERIC = (lang) => (c) => [
  `Läs felmeddelandet och titta på ${L(c.line)}. Vad förväntade sig ${lang === 'csharp' ? 'C#' : 'Python'} att hitta där?`,
  'Gör koden mindre: kommentera bort halva programmet och kör igen. Då ser du vilken del som orsakar felet.',
  { text: 'Börja från något som fungerar och bygg på:', example: lang === 'csharp' ? 'Console.WriteLine("steg 1 fungerar");' : 'print("steg 1 fungerar")' },
];

function successHints(lang, code) {
  const hasLoop = lang === 'csharp' ? /\b(for|foreach|while)\b/.test(code) : /\b(for|while)\b/.test(code);
  const hasVar = lang === 'csharp' ? /\b(int|double|string|bool|var)\s+\w+\s*=/.test(code) : /^\s*\w+\s*=/m.test(code);
  const p = lang === 'csharp' ? 'Console.WriteLine' : 'print';
  return [
    hasLoop ? 'Koden fungerar. Kan du förutse vad loopen skriver ut i andra varvet innan du kör igen?' : 'Koden fungerar. Ändra ett enda värde och gissa vad som händer innan du kör igen.',
    hasVar ? `Följ en variabel genom programmet. Lägg till en extra ${p}() som visar dess värde på vägen.` : 'Prova att spara ett värde i en variabel och använda den på två ställen.',
    {
      text: 'Ett sätt att följa värden:',
      example: lang === 'csharp'
        ? 'int summa = 0;\nfor (int i = 1; i <= 3; i++)\n{\n    summa += i;\n    Console.WriteLine($"i={i}, summa={summa}");\n}'
        : 'summa = 0\nfor i in range(1, 4):\n    summa += i\n    print(f"i={i}, summa={summa}")',
    },
  ];
}

function webHints(code) {
  const css = styleText(code);
  const openStyle = (code.match(/<style\b/gi) || []).length;
  const closeStyle = (code.match(/<\/style>/gi) || []).length;
  if (openStyle > closeStyle) {
    return { key: 'style-unclosed', steps: [
      'Hitta <style>. Var slutar CSS-delen?',
      'Ett <style>-block måste avslutas med </style>, annars tolkas resten av sidan som CSS.',
      { text: 'Ett komplett style-block:', example: '<style>\n  h1 { color: purple; }\n</style>\n<h1>Hej</h1>' },
    ] };
  }
  const bal = cssBalance(css);
  if (bal !== 0) {
    return { key: 'css-braces', steps: [
      'Räkna klamrarna i din CSS. Har varje { en }?',
      'Varje regel skrivs väljare { egenskap: värde; }. En saknad } gör att nästa regel inte fungerar.',
      { text: 'Två hela regler:', example: '<style>\n  h1 { color: purple; }\n  p { margin: 8px; }\n</style>' },
    ] };
  }
  const missingSemi = /:[^;{}]+\n\s*[a-z-]+\s*:/i.test(css);
  if (missingSemi) {
    return { key: 'css-semicolon', steps: [
      'Titta på slutet av varje rad i dina CSS-regler. Vilket tecken skiljer egenskaperna åt?',
      'Varje deklaration avslutas med semikolon. Utan det läses två rader som en.',
      { text: 'Semikolon efter varje egenskap:', example: '.kort {\n  padding: 16px;\n  border-radius: 8px;\n}' },
    ] };
  }
  const tags = ['h1', 'h2', 'p', 'div', 'section', 'ul', 'li', 'a', 'button', 'main', 'header', 'footer', 'nav', 'article', 'form', 'label'];
  const html = code.replace(/<style[\s\S]*?<\/style>/gi, '');
  for (const t of tags) {
    const o = (html.match(new RegExp(`<${t}[\\s>]`, 'gi')) || []).length;
    const c = (html.match(new RegExp(`</${t}>`, 'gi')) || []).length;
    if (o > c) {
      return { key: 'tag-unclosed', steps: [
        `Leta efter <${t}>. Har varje sådan tagg en avslutning?`,
        `De flesta element har en starttagg och en sluttagg: <${t}> ... </${t}>.`,
        { text: 'Start och slut:', example: `<${t}>Innehåll</${t}>` },
      ] };
    }
  }
  return { key: 'web-ok', steps: [
    'Förhandsvisningen fungerar. Vilken del av sidan vill du ändra först?',
    'Ändra en CSS-egenskap i taget, till exempel color eller padding, så ser du exakt vad den gör.',
    { text: 'Prova en liten ändring:', example: '<style>\n  h1 { color: #6b4fbb; letter-spacing: 1px; }\n</style>\n<h1>Min sida</h1>' },
  ] };
}

export function getHints(lang, code, result) {
  if (lang === 'web') return webHints(code);
  if (!result) {
    return { key: 'not-run', steps: [
      'Kör koden först, så kan tipsen utgå från vad som faktiskt händer.',
      'Kodlabbet visar utskrift eller fel efter varje körning.',
      { text: 'Ett första program:', example: lang === 'csharp' ? 'Console.WriteLine("Hej!");' : 'print("Hej!")' },
    ] };
  }
  if (!result.error) return { key: 'ok', steps: successHints(lang, code) };
  const table = lang === 'csharp' ? CS : PY;
  const key = result.error.hint;
  const make = table[key] || GENERIC(lang);
  const steps = make({ line: result.error.line, code, message: result.error.message });
  return { key: `${key}:${result.error.line ?? ''}`, steps };
}
