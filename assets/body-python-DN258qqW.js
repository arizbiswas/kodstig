import{v as e}from"./index-BYtOnYW3.js";import{t}from"./pixel-chapter-CjDjKOXA.js";var n=(e,t)=>({re:e,msg:t}),r=[{id:`py7`,title:`Fel och undantag`,lessons:[{id:`py-errors`,title:`Läsa felmeddelanden`,tier:3,text:`När något går fel stoppar Python och visar ett felmeddelande. Det består av tre delar: feltypen, radnumret och en förklaring.

De vanligaste feltyperna är ValueError (rätt typ men konstigt innehåll), TypeError (fel typ, som text + tal), KeyError (nyckeln saknas i ordboken), IndexError (positionen finns inte i listan), ZeroDivisionError (delat med noll) och NameError (namnet finns inte).

Riktiga utvecklare läser felmeddelanden hela tiden. Feltypen säger nästan alltid vad du ska leta efter.`,example:`tal = [10, 20, 30]
print(tal[2])
# tal[3] skulle ge IndexError, för listan har bara index 0, 1 och 2`,exercises:[{type:`choice`,prompt:'Vilket fel ger `int("tolv")`?',options:[`ValueError`,`TypeError`,`NameError`],answer:0,explain:`Värdet är text, vilket int() tar emot, men innehållet går inte att tolka som ett heltal. Det är ett ValueError.`,why:{1:`TypeError betyder fel typ, till exempel "a" + 1. Här är typen rätt, det är innehållet som är fel.`,2:`NameError gäller namn som inte finns. Både int och texten finns.`}},{type:`choice`,prompt:'Koden `priser = {"äpple": 5}` följs av `priser["banan"]`. Vilket fel blir det?',options:[`IndexError`,`KeyError`,`ValueError`],answer:1,explain:`Nyckeln "banan" finns inte i ordboken, så Python ger KeyError.`,why:{0:`IndexError gäller positioner i listor. Ordböcker använder nycklar.`,2:`ValueError gäller konstigt innehåll i ett värde, inte en saknad nyckel.`}},{type:`choice`,prompt:'Vilket fel ger `"Ålder: " + 12`?',options:[`TypeError`,`ValueError`,`SyntaxError`],answer:0,explain:`Text och heltal kan inte läggas ihop med +. Det är fel typ, alltså TypeError.`,why:{1:`Båda värdena är fina var för sig. Problemet är att typerna inte passar ihop.`,2:`Raden är korrekt skriven Python. Felet uppstår först när den körs.`}},{type:`debug`,prompt:"Funktionen kraschar med IndexError. Fixa `sista(lista)` så att den returnerar sista elementet, eller None om listan är tom.",starter:`def sista(lista):
    return lista[len(lista)]
`,tests:[{fn:`sista`,args:[[1,2,3]],expect:3},{fn:`sista`,args:[[`a`]],expect:`a`,edge:`ett element`},{fn:`sista`,args:[[]],expect:null,edge:`tom lista`}],solution:`def sista(lista):
    if len(lista) == 0:
        return None
    return lista[-1]`,explain:`Sista index är len(lista) - 1, eller kortare -1. En tom lista har inget sista element, så den måste hanteras först.`,hint:`Använd lista[-1] och kontrollera först om listan är tom.`},{type:`debug`,prompt:`Funktionen ska returnera texten "Du har X poäng" men kraschar med TypeError. Fixa den.`,starter:`def poängtext(poäng):
    return "Du har " + poäng + " poäng"
`,tests:[{fn:`poängtext`,args:[5],expect:`Du har 5 poäng`},{fn:`poängtext`,args:[0],expect:`Du har 0 poäng`,edge:`noll poäng`}],solution:`def poängtext(poäng):
    return "Du har " + str(poäng) + " poäng"`,explain:`str() gör om talet till text så att det kan sättas ihop med annan text. En f-sträng fungerar också.`,hint:`Gör om poäng till text med str(), eller använd en f-sträng.`}]},{id:`py-try`,title:`Fånga fel med try och except`,tier:3,text:`Med try och except kan programmet hantera ett fel i stället för att krascha. Python kör koden i try. Om ett fel av rätt typ uppstår hoppar den direkt till except.

Ange alltid vilken feltyp du förväntar dig, till exempel except ValueError. Då syns andra, oväntade fel fortfarande, och det är just dem du vill hitta.`,example:`# 1. Text som inte är ett tal
text = "tolv"
# 2. Försök göra om den
try:
    tal = int(text)
    print("Talet är", tal)
# 3. Ta hand om felet
except ValueError:
    print("Det där var inget heltal.")`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`svar = ""
try:
    svar += "A"
    x = 1 / 0
    svar += "B"
except ZeroDivisionError:
    svar += "C"
print(svar)`,options:[`AC`,`ABC`,`C`],answer:0,out:!0,explain:`A hinner läggas till. Sedan blir det fel, och Python hoppar direkt till except och lägger till C.`,why:{1:`När felet uppstår hoppar Python direkt till except. Raden efter felet körs aldrig.`,2:`Koden före felet hinner köras, så A kommer med.`}},{type:`fill`,prompt:`Fyll i ordet som fångar felet.`,code:`try:
    tal = int("abc")
___ ValueError:
    print("Inte ett tal")`,answers:[[`except`]],output:`Inte ett tal`,explain:`except ValueError: fångar felet som int("abc") ger.`},{type:`code`,prompt:"Skriv `till_tal(text)` som returnerar int(text), eller 0 om texten inte går att göra om. Använd try och except.",starter:`def till_tal(text):
    pass
`,tests:[{fn:`till_tal`,args:[`42`],expect:42},{fn:`till_tal`,args:[`-7`],expect:-7,edge:`negativt tal`},{fn:`till_tal`,args:[`hej`],expect:0,edge:`inte ett tal`},{fn:`till_tal`,args:[``],expect:0,edge:`tom text`}],require:[n(`\\btry\\s*:`,`Använd try.`),n(`except\\s+ValueError`,`Fånga felet med except ValueError.`)],solution:`def till_tal(text):
    try:
        return int(text)
    except ValueError:
        return 0`,explain:`Om int() lyckas returneras talet direkt. Annars tar except över och returnerar 0.`,hint:`Lägg return int(text) i try och return 0 i except ValueError.`},{type:`code`,prompt:'Skriv `dela(a, b)` som returnerar a / b, men texten "Kan inte dela med noll" om b är 0. Använd try och except ZeroDivisionError.',starter:`def dela(a, b):
    pass
`,tests:[{fn:`dela`,args:[10,2],expect:5},{fn:`dela`,args:[1,0],expect:`Kan inte dela med noll`,edge:`b är 0`},{fn:`dela`,args:[0,5],expect:0,edge:`a är 0`}],require:[n(`except\\s+ZeroDivisionError`,`Fånga felet med except ZeroDivisionError.`)],solution:`def dela(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Kan inte dela med noll"`,explain:`Det är bara när b är 0 som divisionen ger fel. Då returneras texten i stället.`,hint:`return a / b i try och texten i except.`},{type:`code`,prompt:"Skriv `hämta(priser, vara)` som returnerar priset från ordboken, eller -1 om varan saknas. Lös det med try och except KeyError, utan get().",starter:`def hämta(priser, vara):
    pass
`,tests:[{fn:`hämta`,args:[{äpple:5},`äpple`],expect:5},{fn:`hämta`,args:[{äpple:5},`banan`],expect:-1,edge:`varan saknas`},{fn:`hämta`,args:[{},`x`],expect:-1,edge:`tom ordbok`}],require:[n(`except\\s+KeyError`,`Fånga felet med except KeyError.`)],forbid:[n(`\\.get\\s*\\(`,`Lös det med try och except den här gången, utan get().`)],solution:`def hämta(priser, vara):
    try:
        return priser[vara]
    except KeyError:
        return -1`,explain:`priser[vara] ger KeyError när nyckeln saknas, och det fångas.`,hint:`return priser[vara] i try, return -1 i except KeyError.`},{type:`code`,prompt:"Skriv `summera_texter(lista)` som summerar alla texter i listan som går att göra om till heltal och hoppar över resten.",starter:`def summera_texter(lista):
    pass
`,tests:[{fn:`summera_texter`,args:[[`3`,`x`,`4`]],expect:7},{fn:`summera_texter`,args:[[]],expect:0,edge:`tom lista`},{fn:`summera_texter`,args:[[`a`,`b`]],expect:0,edge:`inga tal alls`},{fn:`summera_texter`,args:[[`-1`,`1`,`10`]],expect:10,edge:`negativt tal`}],require:[n(`\\btry\\s*:`,`Använd try inne i loopen.`)],solution:`def summera_texter(lista):
    summa = 0
    for t in lista:
        try:
            summa += int(t)
        except ValueError:
            pass
    return summa`,explain:`try ligger inne i loopen. Då hoppar ett dåligt värde bara över sig självt, och loopen fortsätter med nästa.`,hint:`Loopa över listan och lägg try och except runt summa += int(t).`}]},{id:`py-raise`,title:`Kasta egna fel med raise`,tier:4,text:`Dina egna funktioner kan också signalera fel. Med raise ValueError("förklaring") stoppar funktionen och skickar felet vidare till den som anropade den.

Det är ofta bättre än att returnera ett konstigt värde som -1. Ett returvärde kan man glömma att kontrollera, men ett fel går inte att missa. Den som anropar bestämmer sedan själv hur felet ska hanteras med try och except.`,example:`# 1. Kasta fel vid negativ ålder
def sätt_ålder(ålder):
    if ålder < 0:
        raise ValueError("Åldern kan inte vara negativ")
    return ålder

# 2. Fånga felet
try:
    sätt_ålder(-3)
except ValueError as fel:
    print("Fel:", fel)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`def kolla(x):
    if x > 10:
        raise ValueError("för stort")
    return x

try:
    print(kolla(50))
except ValueError as e:
    print("Fel:", e)`,options:[`Fel: för stort`,`50`,`ValueError`],answer:0,out:!0,explain:`raise stoppar funktionen. Felet fångas av except, och e innehåller texten "för stort".`,why:{1:`raise stoppar funktionen innan return hinner köras.`,2:`Felet fångas av except, så programmet skriver ut sitt eget meddelande i stället för att krascha.`}},{type:`fill`,prompt:`Fyll i ordet som kastar ett fel.`,code:`def uttag(saldo, belopp):
    if belopp > saldo:
        ___ ValueError("Täckning saknas")
    return saldo - belopp

print(uttag(100, 30))`,answers:[[`raise`]],output:`70`,explain:`raise ValueError(...) kastar felet. Här är beloppet mindre än saldot, så funktionen returnerar 70.`},{type:`code`,prompt:'Skriv `kontrollera_pin(pin)` som kastar `ValueError("PIN måste vara 4 siffror")` om pin inte är exakt fyra siffror, och annars returnerar True. Programmet längst ner testar den.',starter:`def kontrollera_pin(pin):
    pass

for försök in ["1234", "12", "abcd"]:
    try:
        kontrollera_pin(försök)
        print(försök, "ok")
    except ValueError as e:
        print(försök, e)
`,output:`1234 ok
12 PIN måste vara 4 siffror
abcd PIN måste vara 4 siffror`,require:[n(`raise\\s+ValueError`,`Kasta felet med raise ValueError(...).`)],solution:`def kontrollera_pin(pin):
    if len(pin) != 4 or not pin.isdigit():
        raise ValueError("PIN måste vara 4 siffror")
    return True

for försök in ["1234", "12", "abcd"]:
    try:
        kontrollera_pin(försök)
        print(försök, "ok")
    except ValueError as e:
        print(försök, e)`,explain:`Funktionen kastar felet, och loopen längst ner fångar det och skriver ut meddelandet.`,hint:`if len(pin) != 4 or not pin.isdigit(): raise ValueError("...")`},{type:`code`,prompt:'Skriv `snitt(tal)` som returnerar medelvärdet av listan. Om listan är tom ska den kasta `ValueError("Inga värden")`.',starter:`def snitt(tal):
    pass

try:
    snitt([])
except ValueError as e:
    print(e)
`,output:`Inga värden`,tests:[{fn:`snitt`,args:[[2,4]],expect:3},{fn:`snitt`,args:[[5]],expect:5,edge:`ett värde`},{fn:`snitt`,args:[[1,2]],expect:1.5,edge:`decimalsvar`}],require:[n(`raise\\s+ValueError`,`Kasta felet med raise ValueError("Inga värden").`)],solution:`def snitt(tal):
    if len(tal) == 0:
        raise ValueError("Inga värden")
    return sum(tal) / len(tal)

try:
    snitt([])
except ValueError as e:
    print(e)`,explain:`Utan kontrollen skulle sum([]) / len([]) bli division med noll. Ditt eget fel förklarar mycket bättre vad som är fel.`,hint:`Kontrollera len(tal) == 0 först och kasta felet.`},{type:`debug`,prompt:'Funktionen returnerar -1 vid fel, och anroparen glömmer att kontrollera det. Ändra så att den i stället kastar `ValueError("Negativt antal")`.',starter:`def pris_totalt(styckpris, antal):
    if antal < 0:
        return -1
    return styckpris * antal

try:
    print(pris_totalt(20, 3))
    print(pris_totalt(20, -2))
except ValueError as e:
    print("Fel:", e)
`,output:`60
Fel: Negativt antal`,require:[n(`raise\\s+ValueError`,`Använd raise ValueError("Negativt antal").`)],solution:`def pris_totalt(styckpris, antal):
    if antal < 0:
        raise ValueError("Negativt antal")
    return styckpris * antal

try:
    print(pris_totalt(20, 3))
    print(pris_totalt(20, -2))
except ValueError as e:
    print("Fel:", e)`,explain:`Nu kan ingen råka räkna vidare med -1. Felet måste hanteras.`,hint:`Byt return -1 mot raise ValueError("Negativt antal").`}]},{id:`py-finally`,title:`else, finally och flera fel`,tier:4,text:`En try kan ha flera except, en för varje feltyp. Du kan också fånga flera typer på en gång med en tupel: except (ValueError, TypeError):

else körs bara om inget fel uppstod. finally körs alltid, oavsett vad som hände. Där lägger man sådant som måste göras ändå, som att räkna försök eller stänga en fil.`,example:`# 1. Försök, fånga och avsluta
def läs(text):
    try:
        tal = int(text)
    except ValueError:
        print("Inte ett tal:", text)
    else:
        print("Läste", tal)
    finally:
        print("Klar med", text)

# 2. Testa med tal och text
läs("5")
läs("x")`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`logg = ""
try:
    logg += "1"
except ValueError:
    logg += "2"
else:
    logg += "3"
finally:
    logg += "4"
print(logg)`,options:[`134`,`14`,`1234`],answer:0,out:!0,explain:`Inget fel uppstod, så except hoppas över, else körs och finally körs alltid.`,why:{1:`else körs när inget fel uppstod, och här uppstod inget fel.`,2:`except körs bara när ett fel av rätt typ uppstår.`}},{type:`choice`,prompt:`När körs koden i finally?`,options:[`Bara när ett fel uppstod`,`Alltid, oavsett om det blev fel eller inte`,`Bara när inget fel uppstod`],answer:1,explain:`finally körs alltid, även när funktionen gör return inne i try.`,why:{0:`Det är except som körs vid fel.`,2:`Det är else som körs bara när inget fel uppstod.`}},{type:`code`,prompt:'Skriv `slå_upp(lista, index_text)` som gör om index_text till ett heltal och returnerar elementet på den platsen. Returnera "Inte ett tal" vid ValueError och "Finns inte" vid IndexError.',starter:`def slå_upp(lista, index_text):
    pass
`,tests:[{fn:`slå_upp`,args:[[`a`,`b`,`c`],`1`],expect:`b`},{fn:`slå_upp`,args:[[`a`],`x`],expect:`Inte ett tal`,edge:`inte ett tal`},{fn:`slå_upp`,args:[[`a`],`5`],expect:`Finns inte`,edge:`för stort index`},{fn:`slå_upp`,args:[[`a`,`b`],`-1`],expect:`b`,edge:`negativt index räknas bakifrån`}],require:[n(`except\\s+ValueError`,`Fånga ValueError i ett eget except.`),n(`except\\s+IndexError`,`Fånga IndexError i ett eget except.`)],solution:`def slå_upp(lista, index_text):
    try:
        return lista[int(index_text)]
    except ValueError:
        return "Inte ett tal"
    except IndexError:
        return "Finns inte"`,explain:`Varje except tar hand om sin egen sorts fel, så användaren får ett tydligt svar.`,hint:`En try med två except efter varandra.`},{type:`code`,prompt:"Skriv `säker_kvot(a, b)` som returnerar a // b. Fånga både ZeroDivisionError och TypeError i samma except med en tupel, och returnera None då.",starter:`def säker_kvot(a, b):
    pass
`,tests:[{fn:`säker_kvot`,args:[7,2],expect:3},{fn:`säker_kvot`,args:[1,0],expect:null,edge:`dela med noll`},{fn:`säker_kvot`,args:[`7`,2],expect:null,edge:`text i stället för tal`}],require:[n(`except\\s*\\(`,`Fånga båda feltyperna i samma except med en tupel: except (A, B):`)],solution:`def säker_kvot(a, b):
    try:
        return a // b
    except (ZeroDivisionError, TypeError):
        return None`,explain:`En tupel i except fångar flera feltyper på en gång när de ska hanteras likadant.`,hint:`except (ZeroDivisionError, TypeError):`},{type:`code`,prompt:"Räknaren `försök` ska öka varje gång läs() anropas, även när det blir fel. Lägg till ett finally som gör det.",starter:`försök = 0

def läs(text):
    global försök
    try:
        return int(text)
    except ValueError:
        return None

for t in ["4", "x", "7"]:
    läs(t)
print("Försök:", försök)
`,output:`Försök: 3`,require:[n(`\\bfinally\\s*:`,`Öka räknaren i ett finally.`)],solution:`försök = 0

def läs(text):
    global försök
    try:
        return int(text)
    except ValueError:
        return None
    finally:
        försök += 1

for t in ["4", "x", "7"]:
    läs(t)
print("Försök:", försök)`,explain:`finally körs även när try eller except gör return, så räknaren ökar varje gång.`,hint:`Lägg finally: försök += 1 sist i try-blocket.`}]}]},{id:`py8`,title:`Klasser och objekt`,lessons:[{id:`py-class`,title:`Din första klass`,tier:3,text:`En klass är en ritning. Ett objekt är en sak som byggs efter ritningen. Klassen Hund beskriver vad alla hundar har, och varje hund du skapar är ett eget objekt.

Metoden __init__ körs när ett objekt skapas. Där sparar du objektets egna värden, attributen, med self.namn = namn. Ordet self betyder ”just det här objektet”.`,example:`# 1. Beskriv en hund
class Hund:
    def __init__(self, namn, ålder):
        self.namn = namn
        self.ålder = ålder

# 2. Skapa en hund
milo = Hund("Milo", 3)
# 3. Läs attributen
print(milo.namn, milo.ålder)`,exercises:[{type:`choice`,prompt:"Vad är `self` i en metod?",options:[`Objektet som metoden anropas på`,`Klassens namn`,`En global variabel`],answer:0,explain:`När du skriver milo.namn inne i en metod är self samma sak som milo.`,why:{1:`Klassen är ritningen. self är det enskilda objektet som byggts efter den.`,2:`self är en vanlig parameter som Python fyller i åt dig, inte en global variabel.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`class Punkt:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Punkt(3, 4)
p.x = 10
print(p.x + p.y)`,options:[`14`,`7`,`10`],answer:0,out:!0,explain:`p.x ändras till 10, och 10 + 4 blir 14.`,why:{1:`p.x ändrades till 10 innan utskriften.`,2:`p.y är fortfarande 4 och läggs till.`}},{type:`fill`,prompt:`Fyll i namnet på metoden som körs när ett objekt skapas.`,code:`class Bok:
    def ___(self, titel):
        self.titel = titel

b = Bok("Mio min Mio")
print(b.titel)`,answers:[[`__init__`]],output:`Mio min Mio`,explain:`__init__ har två understreck på varje sida.`},{type:`code`,prompt:"Skriv klassen `Elev` med attributen `namn` och `klass`. Programmet längst ner ska då skriva ut båda.",starter:`class Elev:
    pass

elev = Elev("Sara", "7B")
print(elev.namn, "går i", elev.klass)
`,output:`Sara går i 7B`,require:[n(`def\\s+__init__\\s*\\(\\s*self`,`Skriv en __init__ med self som första parameter.`)],solution:`class Elev:
    def __init__(self, namn, klass):
        self.namn = namn
        self.klass = klass

elev = Elev("Sara", "7B")
print(elev.namn, "går i", elev.klass)`,explain:`__init__ tar emot värdena och sparar dem som attribut på self.`,hint:`def __init__(self, namn, klass): och sedan self.namn = namn.`},{type:`code`,prompt:"Korgen innehåller tre Vara-objekt. Räkna ut totalpriset med en loop och skriv ut `Totalt: X kr`.",starter:`class Vara:
    def __init__(self, namn, pris):
        self.namn = namn
        self.pris = pris

korg = [Vara("Mjölk", 15), Vara("Bröd", 30), Vara("Ost", 55)]
# Räkna ut totalen med en loop här
`,output:`Totalt: 100 kr`,require:[n(`\\bfor\\b`,`Använd en for-loop över korgen.`),n(`\\.pris`,`Läs priset med v.pris.`)],forbid:[n(`Totalt:\\s*100`,`Räkna fram summan i stället för att skriva 100.`)],solution:`class Vara:
    def __init__(self, namn, pris):
        self.namn = namn
        self.pris = pris

korg = [Vara("Mjölk", 15), Vara("Bröd", 30), Vara("Ost", 55)]
summa = 0
for v in korg:
    summa += v.pris
print(f"Totalt: {summa} kr")`,explain:`Objekt kan ligga i listor precis som tal. v.pris läser attributet på varje vara.`,hint:`summa = 0, loopa for v in korg: och lägg till v.pris.`}]},{id:`py-methods`,title:`Metoder`,tier:3,text:`En metod är en funktion som hör till en klass. Den första parametern är alltid self, så att metoden kan läsa och ändra objektets attribut.

Metoder gör att data och det man gör med datan hålls ihop. Ett konto vet sitt eget saldo och vet själv hur man sätter in pengar.`,example:`# 1. Klass med startvärde
class Räknare:
    def __init__(self):
        self.värde = 0

    # 2. Metod som ökar värdet
    def öka(self):
        self.värde += 1

# 3. Skapa och använd räknaren
r = Räknare()
r.öka()
r.öka()
print(r.värde)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`class Lampa:
    def __init__(self):
        self.på = False

    def växla(self):
        self.på = not self.på

l = Lampa()
l.växla()
l.växla()
l.växla()
print(l.på)`,options:[`True`,`False`,`None`],answer:0,out:!0,explain:`Tre växlingar från False: True, False, True.`,why:{1:`Räkna växlingarna: False blir True, sedan False, sedan True igen.`,2:`på har alltid ett sanningsvärde, aldrig None.`}},{type:`choice`,prompt:"Varför blir det fel när man kör `obj.hälsa()` om metoden är skriven `def hälsa():` inuti klassen?",options:[`Metoden saknar parametern self`,`Metoder får inte heta hälsa`,`Man måste alltid skriva Klass.hälsa()`],answer:0,explain:`Python skickar alltid med objektet som första argument. Utan self finns det ingen plats för det.`,why:{1:`Metoder får heta nästan vad som helst.`,2:`obj.hälsa() är det vanliga sättet att anropa en metod.`}},{type:`code`,prompt:"Gör klart klassen Spelare. `ta_skada(mängd)` minskar hp men aldrig under 0. `lever()` returnerar True om hp är större än 0.",starter:`class Spelare:
    def __init__(self, namn):
        self.namn = namn
        self.hp = 100

    def ta_skada(self, mängd):
        pass

    def lever(self):
        pass

s = Spelare("Ada")
s.ta_skada(30)
print(s.hp, s.lever())
s.ta_skada(500)
print(s.hp, s.lever())
`,output:`70 True
0 False`,solution:`class Spelare:
    def __init__(self, namn):
        self.namn = namn
        self.hp = 100

    def ta_skada(self, mängd):
        self.hp -= mängd
        if self.hp < 0:
            self.hp = 0

    def lever(self):
        return self.hp > 0

s = Spelare("Ada")
s.ta_skada(30)
print(s.hp, s.lever())
s.ta_skada(500)
print(s.hp, s.lever())`,explain:`Metoden skyddar objektet så att hp aldrig kan bli negativt, hur stor skadan än är.`,hint:`Minska self.hp och sätt den till 0 om den blev negativ.`},{type:`code`,prompt:"Gör klart Kundvagn. `lägg_till(namn, pris)` sparar varan i listan `varor`, och `totalt()` returnerar summan av priserna.",starter:`class Kundvagn:
    def __init__(self):
        self.varor = []

    def lägg_till(self, namn, pris):
        pass

    def totalt(self):
        pass

k = Kundvagn()
k.lägg_till("Penna", 12)
k.lägg_till("Block", 35)
print(len(k.varor), k.totalt())
`,output:`2 47`,solution:`class Kundvagn:
    def __init__(self):
        self.varor = []

    def lägg_till(self, namn, pris):
        self.varor.append((namn, pris))

    def totalt(self):
        summa = 0
        for namn, pris in self.varor:
            summa += pris
        return summa

k = Kundvagn()
k.lägg_till("Penna", 12)
k.lägg_till("Block", 35)
print(len(k.varor), k.totalt())`,explain:`Varje vara sparas som ett par (namn, pris). totalt() går igenom paren och summerar priserna.`,hint:`self.varor.append((namn, pris)) och en loop i totalt().`},{type:`debug`,prompt:`Metoden ändrar en vanlig variabel i stället för objektets saldo. Fixa den så att programmet skriver 75.`,starter:`class Konto:
    def __init__(self):
        self.saldo = 0

    def sätt_in(self, belopp):
        saldo = self.saldo + belopp

k = Konto()
k.sätt_in(50)
k.sätt_in(25)
print(k.saldo)
`,output:`75`,solution:`class Konto:
    def __init__(self):
        self.saldo = 0

    def sätt_in(self, belopp):
        self.saldo = self.saldo + belopp

k = Konto()
k.sätt_in(50)
k.sätt_in(25)
print(k.saldo)`,explain:`Utan self. skapas en ny variabel som försvinner när metoden är klar. self.saldo är objektets eget värde.`,hint:`Det saknas self. framför saldo på vänster sida.`}]},{id:`py-str`,title:`Snygga objekt och klassvariabler`,tier:4,text:`Om du skriver ut ett objekt visar Python något i stil med <Kort object>. Med metoden __str__ bestämmer du själv vad print ska visa.

En klassvariabel skrivs direkt i klassen, utanför metoderna. Den delas av alla objekt i klassen, så den passar för sådant som ett löpnummer eller hur många objekt som har skapats.`,example:`# 1. Klass med attribut
class Kort:
    def __init__(self, färg, värde):
        self.färg = färg
        self.värde = värde

    # 2. Bestäm hur kortet visas
    def __str__(self):
        return f"{self.värde} i {self.färg}"

# 3. Skriv ut ett kort
print(Kort("hjärter", 7))`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`class Temp:
    def __init__(self, c):
        self.c = c

    def __str__(self):
        return f"{self.c} grader"

print(Temp(21))`,options:[`21 grader`,`<Temp object>`,`21`],answer:0,out:!0,explain:`print använder __str__ för att få fram texten.`,why:{1:`Så skulle det se ut utan __str__. Här finns en, och den används.`,2:`__str__ lägger till ordet grader efter talet.`}},{type:`code`,prompt:'Ge klassen Tid en `__str__` som visar tiden som "HH:MM", alltid med två siffror per del.',starter:`class Tid:
    def __init__(self, tim, minut):
        self.tim = tim
        self.minut = minut

print(Tid(9, 5))
print(Tid(14, 30))
`,output:`09:05
14:30`,require:[n(`def\\s+__str__\\s*\\(\\s*self\\s*\\)`,`Skriv metoden def __str__(self):`)],solution:`class Tid:
    def __init__(self, tim, minut):
        self.tim = tim
        self.minut = minut

    def __str__(self):
        return str(self.tim).zfill(2) + ":" + str(self.minut).zfill(2)

print(Tid(9, 5))
print(Tid(14, 30))`,explain:`zfill(2) fyller på med nollor framifrån tills texten är två tecken lång.`,hint:`str(self.tim).zfill(2) ger "09".`},{type:`choice`,prompt:`Vad skrivs ut?`,code:`class Elev:
    antal = 0

    def __init__(self, namn):
        self.namn = namn
        Elev.antal += 1

Elev("A")
Elev("B")
Elev("C")
print(Elev.antal)`,options:[`3`,`1`,`0`],answer:0,out:!0,explain:`antal är en klassvariabel som delas av alla elever. Den ökar en gång per nytt objekt.`,why:{1:`Variabeln hör till klassen, inte till varje objekt, så den nollställs inte.`,2:`Varje Elev(...) kör __init__, som ökar antal.`}},{type:`code`,prompt:`Varje ny biljett ska få ett eget nummer: 1, 2, 3 och så vidare. Använd en klassvariabel.`,starter:`class Biljett:
    def __init__(self, namn):
        self.namn = namn
        self.nummer = 0

for n in ["Ada", "Bo", "Cy"]:
    b = Biljett(n)
    print(b.nummer, b.namn)
`,output:`1 Ada
2 Bo
3 Cy`,require:[n(`Biljett\\.[\\wåäö]+\\s*(\\+=|=)`,`Ändra klassvariabeln via Biljett.namn_på_variabeln.`)],solution:`class Biljett:
    nästa = 1

    def __init__(self, namn):
        self.namn = namn
        self.nummer = Biljett.nästa
        Biljett.nästa += 1

for n in ["Ada", "Bo", "Cy"]:
    b = Biljett(n)
    print(b.nummer, b.namn)`,explain:`Klassvariabeln kommer ihåg nästa lediga nummer mellan objekten.`,hint:`Lägg nästa = 1 i klassen. Ge self.nummer värdet och öka sedan Biljett.nästa.`},{type:`code`,prompt:'Gör klart Bråk. `__str__` ska visa "täljare/nämnare", och `förkorta()` ska returnera ett nytt, maximalt förkortat Bråk.',starter:`class Bråk:
    def __init__(self, t, n):
        self.t = t
        self.n = n

    def __str__(self):
        pass

    def förkorta(self):
        pass

print(Bråk(6, 8).förkorta())
print(Bråk(5, 7).förkorta())
print(Bråk(10, 5).förkorta())
`,output:`3/4
5/7
2/1`,solution:`class Bråk:
    def __init__(self, t, n):
        self.t = t
        self.n = n

    def __str__(self):
        return f"{self.t}/{self.n}"

    def förkorta(self):
        a, b = self.t, self.n
        while b != 0:
            a, b = b, a % b
        return Bråk(self.t // a, self.n // a)

print(Bråk(6, 8).förkorta())
print(Bråk(5, 7).förkorta())
print(Bråk(10, 5).förkorta())`,explain:`Största gemensamma delaren hittas med Euklides algoritm: byt a, b mot b, a % b tills b är 0. Dela sedan båda delarna med den.`,hint:`Euklides: while b != 0: a, b = b, a % b. Då är a den största gemensamma delaren.`}]},{id:`py-inherit`,title:`Arv`,tier:4,text:`En klass kan ärva från en annan: class Katt(Djur). Katten får då alla metoder som Djur har, och kan själv lägga till nya eller skriva över gamla.

När barnklassen har en egen __init__ anropar man förälderns med super().__init__(...). Då slipper man skriva samma kod två gånger.`,example:`# 1. Basklassen
class Djur:
    def __init__(self, namn):
        self.namn = namn

    def låt(self):
        return "..."

# 2. Underklass som ändrar låt
class Katt(Djur):
    def låt(self):
        return "Mjau"

# 3. Skapa en katt
k = Katt("Måns")
print(k.namn, "säger", k.låt())`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`class A:
    def hej(self):
        return "A"

class B(A):
    pass

print(B().hej())`,options:[`A`,`B`,`Ett felmeddelande`],answer:0,out:!0,explain:`B har ingen egen hej, så metoden ärvs från A.`,why:{1:`B skriver inte över hej, så det är A:s version som körs.`,2:`B ärver alla metoder från A, så hej finns.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`class Fordon:
    def hjul(self):
        return 4

class Cykel(Fordon):
    def hjul(self):
        return 2

print(Cykel().hjul() + Fordon().hjul())`,options:[`6`,`8`,`4`],answer:0,out:!0,explain:`Cykel skriver över hjul och ger 2. Fordon ger fortfarande 4.`,why:{1:`Cykel har en egen hjul som returnerar 2.`,2:`Båda anropen räknas: 2 + 4.`}},{type:`fill`,prompt:`Fyll i så att Hund använder förälderns __init__.`,code:`class Djur:
    def __init__(self, namn):
        self.namn = namn

class Hund(Djur):
    def __init__(self, namn, ras):
        ___().__init__(namn)
        self.ras = ras

h = Hund("Milo", "tax")
print(h.namn, h.ras)`,answers:[[`super`]],output:`Milo tax`,explain:`super() pekar på föräldraklassen, så Djur sparar namnet.`},{type:`code`,prompt:"Skriv klasserna `Cirkel(radie)` och `Kvadrat(sida)` som ärver från Form och har en egen `area()`. Använd 3.14 som pi.",starter:`class Form:
    def area(self):
        return 0

# Skriv Cirkel och Kvadrat här

former = [Cirkel(1), Kvadrat(3), Cirkel(2)]
for f in former:
    print(f.area())
`,output:`3.14
9
12.56`,require:[n(`class\\s+Cirkel\\s*\\(\\s*Form\\s*\\)`,`Cirkel ska ärva från Form.`),n(`class\\s+Kvadrat\\s*\\(\\s*Form\\s*\\)`,`Kvadrat ska ärva från Form.`)],solution:`class Form:
    def area(self):
        return 0

class Cirkel(Form):
    def __init__(self, radie):
        self.radie = radie

    def area(self):
        return 3.14 * self.radie * self.radie

class Kvadrat(Form):
    def __init__(self, sida):
        self.sida = sida

    def area(self):
        return self.sida * self.sida

former = [Cirkel(1), Kvadrat(3), Cirkel(2)]
for f in former:
    print(f.area())`,explain:`Loopen anropar area() utan att bry sig om vilken form det är. Varje klass vet själv hur den räknar. Det kallas polymorfism.`,hint:`class Cirkel(Form): med en __init__ som sparar radien och en egen area().`},{type:`code`,prompt:'Chef ärver från Anställd men har också en bonus. Gör så att `Chef("Bo", 40000, 50000)` fungerar och att chefens `årslön()` blir lön * 12 + bonus. Använd super() på båda ställena.',starter:`class Anställd:
    def __init__(self, namn, lön):
        self.namn = namn
        self.lön = lön

    def årslön(self):
        return self.lön * 12

class Chef(Anställd):
    pass

personal = [Anställd("Ada", 30000), Chef("Bo", 40000, 50000)]
for p in personal:
    print(p.namn, p.årslön())
`,output:`Ada 360000
Bo 530000`,require:[n(`super\\s*\\(\\s*\\)\\s*\\.\\s*__init__`,`Använd super().__init__(namn, lön).`),n(`super\\s*\\(\\s*\\)\\s*\\.\\s*årslön`,`Använd super().årslön() i chefens årslön.`)],solution:`class Anställd:
    def __init__(self, namn, lön):
        self.namn = namn
        self.lön = lön

    def årslön(self):
        return self.lön * 12

class Chef(Anställd):
    def __init__(self, namn, lön, bonus):
        super().__init__(namn, lön)
        self.bonus = bonus

    def årslön(self):
        return super().årslön() + self.bonus

personal = [Anställd("Ada", 30000), Chef("Bo", 40000, 50000)]
for p in personal:
    print(p.namn, p.årslön())`,explain:`Chefen återanvänder förälderns kod och lägger bara till det som skiljer.`,hint:`I Chef: __init__(self, namn, lön, bonus) som anropar super().__init__(namn, lön), och årslön som returnerar super().årslön() + self.bonus.`}]},{id:`py-bank`,title:`Miniprojekt: bankkonto`,tier:5,text:`Nu bygger du ett litet banksystem. Du kombinerar klasser, metoder, egna fel med raise och felhantering med try.

Ta en del i taget. Varje del bygger vidare på den förra.`,example:`# 1. Konto med ägare och saldo
class Konto:
    def __init__(self, ägare):
        self.ägare = ägare
        self.saldo = 0

# 2. Skapa ett konto
k = Konto("Ada")
# 3. Visa ägare och saldo
print(k.ägare, k.saldo)`,exercises:[{type:`code`,prompt:'Del 1: Gör klart `sätt_in(belopp)`. Den ska öka saldot, men kasta `ValueError("Beloppet måste vara positivt")` om beloppet är 0 eller mindre.',starter:`class Konto:
    def __init__(self, ägare):
        self.ägare = ägare
        self.saldo = 0

    def sätt_in(self, belopp):
        pass

k = Konto("Ada")
k.sätt_in(100)
try:
    k.sätt_in(-5)
except ValueError as e:
    print("Fel:", e)
print(k.saldo)
`,output:`Fel: Beloppet måste vara positivt
100`,require:[n(`raise\\s+ValueError`,`Kasta felet med raise ValueError(...).`)],solution:`class Konto:
    def __init__(self, ägare):
        self.ägare = ägare
        self.saldo = 0

    def sätt_in(self, belopp):
        if belopp <= 0:
            raise ValueError("Beloppet måste vara positivt")
        self.saldo += belopp

k = Konto("Ada")
k.sätt_in(100)
try:
    k.sätt_in(-5)
except ValueError as e:
    print("Fel:", e)
print(k.saldo)`,explain:`Kontrollen kommer före ändringen, så ett felaktigt belopp rör aldrig saldot.`,hint:`Kontrollera belopp <= 0 och kasta felet innan du ändrar saldot.`},{type:`code`,prompt:'Del 2: Gör klart `ta_ut(belopp)`. Belopp på 0 eller mindre ger `ValueError("Beloppet måste vara positivt")`, och ett belopp större än saldot ger `ValueError("Täckning saknas")`. Lyckade uttag sparas i historiken som "-30".',starter:`class Konto:
    def __init__(self, ägare):
        self.ägare = ägare
        self.saldo = 0
        self.historik = []

    def sätt_in(self, belopp):
        if belopp <= 0:
            raise ValueError("Beloppet måste vara positivt")
        self.saldo += belopp
        self.historik.append(f"+{belopp}")

    def ta_ut(self, belopp):
        pass

k = Konto("Ada")
k.sätt_in(100)
k.ta_ut(30)
for b in [500, 0]:
    try:
        k.ta_ut(b)
    except ValueError as e:
        print("Fel:", e)
print(k.saldo, k.historik)
`,output:`Fel: Täckning saknas
Fel: Beloppet måste vara positivt
70 ['+100', '-30']`,solution:`class Konto:
    def __init__(self, ägare):
        self.ägare = ägare
        self.saldo = 0
        self.historik = []

    def sätt_in(self, belopp):
        if belopp <= 0:
            raise ValueError("Beloppet måste vara positivt")
        self.saldo += belopp
        self.historik.append(f"+{belopp}")

    def ta_ut(self, belopp):
        if belopp <= 0:
            raise ValueError("Beloppet måste vara positivt")
        if belopp > self.saldo:
            raise ValueError("Täckning saknas")
        self.saldo -= belopp
        self.historik.append(f"-{belopp}")

k = Konto("Ada")
k.sätt_in(100)
k.ta_ut(30)
for b in [500, 0]:
    try:
        k.ta_ut(b)
    except ValueError as e:
        print("Fel:", e)
print(k.saldo, k.historik)`,explain:`Två kontroller först, sedan ändringen. Misslyckade uttag hamnar aldrig i historiken.`,hint:`Två if med raise, sedan minska saldot och append(f"-{belopp}").`},{type:`code`,prompt:'Del 3: Ge Konto en `__str__` som visar "Ada: 60 kr". Skriv sedan funktionen `överför(från, till, belopp)`. Om uttaget misslyckas ska den skriva ut "Överföringen stoppades: " följt av felet, och inget saldo ska ändras.',starter:`class Konto:
    def __init__(self, ägare):
        self.ägare = ägare
        self.saldo = 0

    def sätt_in(self, belopp):
        if belopp <= 0:
            raise ValueError("Beloppet måste vara positivt")
        self.saldo += belopp

    def ta_ut(self, belopp):
        if belopp <= 0:
            raise ValueError("Beloppet måste vara positivt")
        if belopp > self.saldo:
            raise ValueError("Täckning saknas")
        self.saldo -= belopp

def överför(från, till, belopp):
    pass

a = Konto("Ada")
b = Konto("Bo")
a.sätt_in(100)
överför(a, b, 40)
överför(a, b, 500)
print(a)
print(b)
`,output:`Överföringen stoppades: Täckning saknas
Ada: 60 kr
Bo: 40 kr`,require:[n(`def\\s+__str__`,`Ge Konto en __str__.`),n(`\\btry\\s*:`,`Använd try i överför.`)],solution:`class Konto:
    def __init__(self, ägare):
        self.ägare = ägare
        self.saldo = 0

    def sätt_in(self, belopp):
        if belopp <= 0:
            raise ValueError("Beloppet måste vara positivt")
        self.saldo += belopp

    def ta_ut(self, belopp):
        if belopp <= 0:
            raise ValueError("Beloppet måste vara positivt")
        if belopp > self.saldo:
            raise ValueError("Täckning saknas")
        self.saldo -= belopp

    def __str__(self):
        return f"{self.ägare}: {self.saldo} kr"

def överför(från, till, belopp):
    try:
        från.ta_ut(belopp)
        till.sätt_in(belopp)
    except ValueError as e:
        print("Överföringen stoppades:", e)

a = Konto("Ada")
b = Konto("Bo")
a.sätt_in(100)
överför(a, b, 40)
överför(a, b, 500)
print(a)
print(b)`,explain:`Uttaget görs först. Misslyckas det hoppar Python till except innan insättningen, så inga pengar försvinner eller skapas.`,hint:`Lägg från.ta_ut(belopp) och till.sätt_in(belopp) i try och skriv ut felet i except.`}]}]},{id:`py9`,title:`Smartare samlingar`,lessons:[{id:`py-listcomp`,title:`Listbyggare`,tier:3,text:`En listbyggare (list comprehension) skapar en ny lista på en enda rad: [uttryck for x in lista]. Lägg till if på slutet för att bara ta med vissa värden.

Det är samma sak som en for-loop med append, bara kortare. Riktiga Python-utvecklare använder det hela tiden.`,example:`# 1. Startlistan
tal = [1, 2, 3, 4, 5]
# 2. Bygg nya listor
kvadrater = [x * x for x in tal]
jämna = [x for x in tal if x % 2 == 0]
# 3. Skriv ut dem
print(kvadrater)
print(jämna)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`print([x * 10 for x in range(3)])`,options:[`[0, 10, 20]`,`[10, 20, 30]`,`[0, 1, 2]`],answer:0,out:!0,explain:`range(3) ger 0, 1 och 2, och varje tal gångras med 10.`,why:{1:`range(3) börjar på 0, inte på 1.`,2:`Uttrycket x * 10 används, inte bara x.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`ord = ["sol", "is", "regn", "å"]
print([o for o in ord if len(o) > 2])`,options:[`['sol', 'regn']`,`['is', 'å']`,`['sol', 'is', 'regn']`],answer:0,out:!0,explain:`Bara ord med fler än två bokstäver tas med.`,why:{1:`Det är de korta orden. Villkoret behåller de långa.`,2:`"is" har bara två bokstäver, och 2 > 2 är falskt.`}},{type:`fill`,prompt:`Fyll i så att varje pris får 25 procent moms.`,code:`priser = [100, 250, 80]
med_moms = [p * 1.25 ___ p in priser]
print(med_moms)`,answers:[[`for`]],output:`[125.0, 312.5, 100.0]`,explain:`Listbyggaren har formen [uttryck for namn in lista].`},{type:`code`,prompt:"Skriv `versaler(ord)` som returnerar en ny lista där varje ord är skrivet med stora bokstäver. Använd en listbyggare.",starter:`def versaler(ord):
    pass
`,tests:[{fn:`versaler`,args:[[`hej`,`du`]],expect:[`HEJ`,`DU`]},{fn:`versaler`,args:[[]],expect:[],edge:`tom lista`}],require:[n(`\\[[^\\]]*\\bfor\\b`,`Använd en listbyggare: [... for ... in ...].`)],solution:`def versaler(ord):
    return [o.upper() for o in ord]`,explain:`Uttrycket o.upper() körs för varje ord.`,hint:`return [o.upper() for o in ord]`},{type:`code`,prompt:"Skriv `positiva_dubblade(tal)` som returnerar alla positiva tal gånger två. Använd en listbyggare med if.",starter:`def positiva_dubblade(tal):
    pass
`,tests:[{fn:`positiva_dubblade`,args:[[3,-1,0,5]],expect:[6,10]},{fn:`positiva_dubblade`,args:[[-2]],expect:[],edge:`inga positiva`},{fn:`positiva_dubblade`,args:[[]],expect:[],edge:`tom lista`}],require:[n(`\\[[^\\]]*\\bfor\\b[^\\]]*\\bif\\b`,`Använd en listbyggare med if på slutet.`)],solution:`def positiva_dubblade(tal):
    return [x * 2 for x in tal if x > 0]`,explain:`if filtrerar först, sedan räknas uttrycket ut för de tal som är kvar. 0 räknas inte som positivt.`,hint:`[x * 2 for x in tal if x > 0]`},{type:`code`,prompt:'Skriv `tabell(n)` som returnerar multiplikationstabellen för n som en lista med texter "n x i = svar", där i går från 1 till 5.',starter:`def tabell(n):
    pass
`,tests:[{fn:`tabell`,args:[3],expect:[`3 x 1 = 3`,`3 x 2 = 6`,`3 x 3 = 9`,`3 x 4 = 12`,`3 x 5 = 15`]},{fn:`tabell`,args:[0],expect:[`0 x 1 = 0`,`0 x 2 = 0`,`0 x 3 = 0`,`0 x 4 = 0`,`0 x 5 = 0`],edge:`n är 0`}],require:[n(`\\[[^\\]]*\\bfor\\b`,`Använd en listbyggare.`)],solution:`def tabell(n):
    return [f"{n} x {i} = {n * i}" for i in range(1, 6)]`,explain:`En f-sträng som uttryck och range(1, 6) som källa.`,hint:`[f"{n} x {i} = {n * i}" for i in range(1, 6)]`}]},{id:`py-sets`,title:`Mängder`,tier:3,text:`En mängd (set) är en samling där varje värde bara kan finnas en gång. set([1, 1, 2]) blir {1, 2}. Att kolla om något finns i en mängd med in går mycket snabbt, även när den är stor.

Med | får du allt som finns i någon av två mängder, med & det som finns i båda och med - det som finns i den första men inte i den andra. Mängder har ingen bestämd ordning, så använd sorted() när ordningen spelar roll.`,example:`# 1. Skapa två mängder
a = {"Ada", "Bo", "Cy"}
b = {"Bo", "Dan"}
# 2. Namn som finns i båda
print(sorted(a & b))
# 3. Alla namn
print(sorted(a | b))
# 4. Namn bara i a
print(sorted(a - b))`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`print(len(set([1, 2, 2, 3, 3, 3])))`,options:[`3`,`6`,`1`],answer:0,out:!0,explain:`Dubbletterna försvinner. Kvar blir 1, 2 och 3.`,why:{1:`En mängd sparar varje värde bara en gång.`,2:`Det finns tre olika värden, inte ett.`}},{type:`choice`,prompt:`Vilken operator ger det som finns i båda mängderna?`,options:[`&`,`|`,`-`],answer:0,explain:`& kallas snitt: bara det som finns i båda.`,why:{1:`| är union: allt som finns i någon av mängderna.`,2:`- är skillnad: det som finns i den första men inte i den andra.`}},{type:`code`,prompt:"Skriv `unika(lista)` som returnerar hur många olika värden listan har.",starter:`def unika(lista):
    pass
`,tests:[{fn:`unika`,args:[[1,1,2]],expect:2},{fn:`unika`,args:[[]],expect:0,edge:`tom lista`},{fn:`unika`,args:[[`a`,`A`]],expect:2,edge:`stora och små bokstäver skiljs åt`}],require:[n(`set\\s*\\(`,`Använd set().`)],solution:`def unika(lista):
    return len(set(lista))`,explain:`set() tar bort dubbletterna och len() räknar det som är kvar.`,hint:`len(set(lista))`},{type:`code`,prompt:"Skriv `gemensamma(a, b)` som returnerar en sorterad lista med värdena som finns i båda listorna, utan dubbletter.",starter:`def gemensamma(a, b):
    pass
`,tests:[{fn:`gemensamma`,args:[[1,2,3,3],[3,1,9]],expect:[1,3]},{fn:`gemensamma`,args:[[1],[2]],expect:[],edge:`inget gemensamt`},{fn:`gemensamma`,args:[[],[1]],expect:[],edge:`tom lista`}],solution:`def gemensamma(a, b):
    return sorted(set(a) & set(b))`,explain:`Gör om båda listorna till mängder, ta snittet och sortera.`,hint:`sorted(set(a) & set(b))`},{type:`code`,prompt:"Skriv `har_dubblett(lista)` som returnerar True om något värde förekommer mer än en gång.",starter:`def har_dubblett(lista):
    pass
`,tests:[{fn:`har_dubblett`,args:[[1,2,3]],expect:!1},{fn:`har_dubblett`,args:[[1,2,1]],expect:!0},{fn:`har_dubblett`,args:[[]],expect:!1,edge:`tom lista`}],solution:`def har_dubblett(lista):
    return len(set(lista)) != len(lista)`,explain:`Om mängden blev kortare än listan måste något ha förekommit två gånger.`,hint:`Jämför len(set(lista)) med len(lista).`},{type:`code`,prompt:"Skriv `saknade(alla, närvarande)` som returnerar en sorterad lista med namnen i alla som inte finns i närvarande.",starter:`def saknade(alla, närvarande):
    pass
`,tests:[{fn:`saknade`,args:[[`Ada`,`Bo`,`Cy`,`Dan`],[`Cy`,`Ada`]],expect:[`Bo`,`Dan`]},{fn:`saknade`,args:[[`Ada`],[`Ada`,`Eva`]],expect:[],edge:`alla är där, plus en gäst`},{fn:`saknade`,args:[[],[]],expect:[],edge:`tomma listor`}],solution:`def saknade(alla, närvarande):
    return sorted(set(alla) - set(närvarande))`,explain:`Skillnaden - ger det som finns i alla men inte i närvarande. Gästen Eva påverkar inte svaret.`,hint:`sorted(set(alla) - set(närvarande))`}]},{id:`py-sortkey`,title:`Sortera med key och lambda`,tier:4,text:`sorted() kan sortera efter vad du vill med parametern key. key är en funktion som säger vad som ska jämföras för varje värde. sorted(ord, key=len) sorterar ord efter längd.

lambda är ett sätt att skriva en liten funktion direkt på plats: lambda p: p[1] betyder ”ta element 1”. För att sortera på flera saker kan key returnera en tupel, till exempel (-poäng, namn) för högst poäng först och sedan bokstavsordning.`,example:`# 1. Ordlistan
ord = ["banan", "äpple", "fikon", "kiwi"]
# 2. Sortera efter längd
print(sorted(ord, key=len))
# 3. Sortera efter sista bokstaven
print(sorted(ord, key=lambda o: o[-1]))`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`print(sorted([3, -5, 1], key=abs))`,options:[`[1, 3, -5]`,`[-5, 1, 3]`,`[3, 1, -5]`],answer:0,out:!0,explain:`abs ger avståndet till noll: 3, 5 och 1. Talen sorteras efter det, men det är de ursprungliga talen som skrivs ut.`,why:{1:`Så skulle en vanlig sortering se ut. Här jämförs abs() av talen.`,2:`Listan sorteras, den skrivs inte ut baklänges.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`print(sorted(["bb", "a", "ccc"], key=len, reverse=True))`,options:[`['ccc', 'bb', 'a']`,`['a', 'bb', 'ccc']`,`['bb', 'a', 'ccc']`],answer:0,out:!0,explain:`Sortering efter längd, och reverse=True ger längst först.`,why:{1:`reverse=True vänder ordningen, så det längsta kommer först.`,2:`Det är den ursprungliga ordningen, osorterad.`}},{type:`code`,prompt:"Skriv `efter_pris(varor)` där varor är en lista med par [namn, pris]. Returnera listan sorterad efter pris, billigast först.",starter:`def efter_pris(varor):
    pass
`,tests:[{fn:`efter_pris`,args:[[[`Ost`,55],[`Mjölk`,15],[`Bröd`,30]]],expect:[[`Mjölk`,15],[`Bröd`,30],[`Ost`,55]]},{fn:`efter_pris`,args:[[]],expect:[],edge:`tom lista`}],require:[n(`key\\s*=`,`Använd key= i sorted().`)],solution:`def efter_pris(varor):
    return sorted(varor, key=lambda v: v[1])`,explain:`lambda v: v[1] plockar ut priset ur varje par.`,hint:`sorted(varor, key=lambda v: v[1])`},{type:`code`,prompt:'Skriv `längsta_ord(text)` som returnerar det längsta ordet i texten. Vid lika längd vinner det första. En tom text ger "".',starter:`def längsta_ord(text):
    pass
`,tests:[{fn:`längsta_ord`,args:[`jag gillar python`],expect:`gillar`},{fn:`längsta_ord`,args:[`ett två tre`],expect:`ett`,edge:`lika långa: första vinner`},{fn:`längsta_ord`,args:[``],expect:``,edge:`tom text`}],solution:`def längsta_ord(text):
    ord = text.split()
    if len(ord) == 0:
        return ""
    return max(ord, key=len)`,explain:`max med key=len jämför längderna och behåller det första vid lika.`,hint:`Dela upp texten med split() och använd max(..., key=len).`},{type:`code`,prompt:"Skriv `ranka(elever)` där elever är en lista med par [namn, poäng]. Returnera bara namnen, sorterade med högst poäng först och vid lika poäng i bokstavsordning.",starter:`def ranka(elever):
    pass
`,tests:[{fn:`ranka`,args:[[[`Bo`,7],[`Ada`,9],[`Cy`,7]]],expect:[`Ada`,`Bo`,`Cy`]},{fn:`ranka`,args:[[[`Eva`,1],[`Dan`,1]]],expect:[`Dan`,`Eva`],edge:`lika poäng: bokstavsordning`},{fn:`ranka`,args:[[]],expect:[],edge:`tom lista`}],require:[n(`key\\s*=`,`Använd key= i sorted().`)],solution:`def ranka(elever):
    ordning = sorted(elever, key=lambda e: (-e[1], e[0]))
    return [namn for namn, poäng in ordning]`,explain:`Tupeln (-poäng, namn) jämförs först på poäng (minustecknet ger högst först) och sedan på namn.`,hint:`key=lambda e: (-e[1], e[0]) och sedan en listbyggare för namnen.`}]},{id:`py-nested`,title:`Data i flera nivåer`,tier:4,text:`Riktig data är ofta nästlad: en lista med ordböcker, där varje ordbok i sin tur innehåller listor. Så ser data ut när den kommer från en webbtjänst (JSON).

Läs den steg för steg, utifrån och in: data["lag"][1]["namn"] betyder ”i ordboken data, ta listan lag, ta element 1 och läs dess namn”.`,example:`# 1. Lista med ordböcker
elever = [
    {"namn": "Ada", "poäng": [8, 9]},
    {"namn": "Bo", "poäng": [6, 7]},
]
# 2. Skriv ut varje elevs summa
for e in elever:
    print(e["namn"], sum(e["poäng"]))`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`data = {"lag": [{"namn": "Ada"}, {"namn": "Bo"}]}
print(data["lag"][1]["namn"])`,options:[`Bo`,`Ada`,`lag`],answer:0,out:!0,explain:`data["lag"] är listan, [1] är andra ordboken och ["namn"] är Bo.`,why:{1:`Index 1 är det andra elementet, eftersom listor börjar på 0.`,2:`"lag" är nyckeln, inte värdet som läses ut.`}},{type:`code`,prompt:'Skriv `vuxna(personer)` som tar en lista med ordböcker med nycklarna "namn" och "ålder", och returnerar namnen på alla som är 18 eller äldre.',starter:`def vuxna(personer):
    pass
`,tests:[{fn:`vuxna`,args:[[{namn:`Ada`,ålder:30},{namn:`Bo`,ålder:12},{namn:`Cy`,ålder:18}]],expect:[`Ada`,`Cy`]},{fn:`vuxna`,args:[[]],expect:[],edge:`tom lista`}],solution:`def vuxna(personer):
    return [p["namn"] for p in personer if p["ålder"] >= 18]`,explain:`Varje p är en ordbok. Villkoret läser ålder och uttrycket läser namn. Exakt 18 räknas.`,hint:`[p["namn"] for p in personer if p["ålder"] >= 18]`},{type:`code`,prompt:'Skriv `gruppera(personer)` som tar en lista med ordböcker med "namn" och "stad", och returnerar en ordbok från stad till en lista med namn i den ordning de kom.',starter:`def gruppera(personer):
    pass
`,tests:[{fn:`gruppera`,args:[[{namn:`Ada`,stad:`Umeå`},{namn:`Bo`,stad:`Lund`},{namn:`Cy`,stad:`Umeå`}]],expect:{Umeå:[`Ada`,`Cy`],Lund:[`Bo`]}},{fn:`gruppera`,args:[[]],expect:{},edge:`tom lista`}],solution:`def gruppera(personer):
    grupper = {}
    for p in personer:
        stad = p["stad"]
        if stad not in grupper:
            grupper[stad] = []
        grupper[stad].append(p["namn"])
    return grupper`,explain:`Skapa en tom lista första gången en stad dyker upp, och lägg sedan till namnen.`,hint:`Om staden inte finns i ordboken, sätt grupper[stad] = []. Gör sedan append.`},{type:`code`,prompt:'Skriv `snitt_per_elev(elever)` som tar en lista med ordböcker med "namn" och "poäng" (en lista), och returnerar en ordbok från namn till medelvärdet av poängen. En elev utan poäng får 0.',starter:`def snitt_per_elev(elever):
    pass
`,tests:[{fn:`snitt_per_elev`,args:[[{namn:`Ada`,poäng:[8,9]},{namn:`Bo`,poäng:[6]}]],expect:{Ada:8.5,Bo:6}},{fn:`snitt_per_elev`,args:[[{namn:`Cy`,poäng:[]}]],expect:{Cy:0},edge:`inga poäng`}],solution:`def snitt_per_elev(elever):
    svar = {}
    for e in elever:
        p = e["poäng"]
        if len(p) == 0:
            svar[e["namn"]] = 0
        else:
            svar[e["namn"]] = sum(p) / len(p)
    return svar`,explain:`Utan kontrollen skulle en elev utan poäng ge division med noll.`,hint:`Loopa, kolla om listan är tom och räkna annars sum / len.`},{type:`code`,prompt:'Skriv `lagervärde(lager)` där lager är en ordbok från vara till en ordbok med "antal" och "pris". Returnera det totala värdet, alltså summan av antal * pris.',starter:`def lagervärde(lager):
    pass
`,tests:[{fn:`lagervärde`,args:[{penna:{antal:10,pris:5},block:{antal:2,pris:30}}],expect:110},{fn:`lagervärde`,args:[{}],expect:0,edge:`tomt lager`},{fn:`lagervärde`,args:[{sudd:{antal:0,pris:8}}],expect:0,edge:`slut i lager`}],solution:`def lagervärde(lager):
    total = 0
    for vara, info in lager.items():
        total += info["antal"] * info["pris"]
    return total`,explain:`items() ger både nyckeln och den inre ordboken.`,hint:`for vara, info in lager.items(): total += info["antal"] * info["pris"]`}]}]},{id:`py10`,title:`Algoritmer`,lessons:[{id:`py-count`,title:`Räkna och hitta mönster`,tier:4,text:`Väldigt många problem handlar om att räkna saker: vilket ord är vanligast, finns det dubbletter, består två ord av samma bokstäver?

Nyckeln är nästan alltid en ordbok där det du räknar är nyckeln och antalet är värdet. Mönstret räkna[x] = räkna.get(x, 0) + 1 kommer du att använda hela livet.`,example:`# 1. Tom ordbok
räkna = {}
# 2. Räkna varje färg
for färg in ["röd", "blå", "röd"]:
    räkna[färg] = räkna.get(färg, 0) + 1
# 3. Visa resultatet
print(räkna)`,exercises:[{type:`choice`,prompt:`Hur räknar man enklast hur många gånger varje ord förekommer i en text?`,options:[`En ordbok med ordet som nyckel och antalet som värde`,`En egen variabel för varje ord`,`Sortera orden och gissa`],answer:0,explain:`En ordbok växer automatiskt med nya ord, hur många olika ord texten än har.`,why:{1:`Du vet inte i förväg vilka ord texten innehåller.`,2:`Sortering kan hjälpa, men räkna behöver du ändå göra.`}},{type:`code`,prompt:"Skriv `bokstäver(text)` som returnerar en ordbok med hur många gånger varje tecken förekommer. Hoppa över mellanslag och räkna stora och små bokstäver som samma.",starter:`def bokstäver(text):
    pass
`,tests:[{fn:`bokstäver`,args:[`Ada`],expect:{a:2,d:1}},{fn:`bokstäver`,args:[`a b A`],expect:{a:2,b:1},edge:`mellanslag och stor bokstav`},{fn:`bokstäver`,args:[``],expect:{},edge:`tom text`}],solution:`def bokstäver(text):
    räkna = {}
    for t in text.lower():
        if t != " ":
            räkna[t] = räkna.get(t, 0) + 1
    return räkna`,explain:`lower() först gör att A och a räknas som samma tecken.`,hint:`Loopa över text.lower(), hoppa över " " och använd get(t, 0) + 1.`},{type:`code`,prompt:"Skriv `vanligaste(ord)` som returnerar ordet som förekommer flest gånger i listan. Vid lika vinner det som dök upp först. En tom lista ger None.",starter:`def vanligaste(ord):
    pass
`,tests:[{fn:`vanligaste`,args:[[`a`,`b`,`b`,`c`]],expect:`b`},{fn:`vanligaste`,args:[[`x`,`y`,`y`,`x`]],expect:`x`,edge:`lika: första vinner`},{fn:`vanligaste`,args:[[]],expect:null,edge:`tom lista`}],solution:`def vanligaste(ord):
    räkna = {}
    for o in ord:
        räkna[o] = räkna.get(o, 0) + 1
    bäst = None
    for o in ord:
        if bäst is None or räkna[o] > räkna[bäst]:
            bäst = o
    return bäst`,explain:`Först räknas allt. Sedan går man igenom orden i ursprunglig ordning och byter bara ledare vid strikt fler förekomster.`,hint:`Räkna med en ordbok och leta sedan upp det största antalet i ursprunglig ordning.`},{type:`code`,prompt:"Skriv `är_anagram(a, b)` som returnerar True om de två orden består av exakt samma bokstäver, lika många av varje. Stora och små bokstäver räknas som samma.",starter:`def är_anagram(a, b):
    pass
`,tests:[{fn:`är_anagram`,args:[`listen`,`silent`],expect:!0},{fn:`är_anagram`,args:[`Ekot`,`toke`],expect:!0,edge:`stor bokstav`},{fn:`är_anagram`,args:[`ab`,`abb`],expect:!1,edge:`olika antal`},{fn:`är_anagram`,args:[``,``],expect:!0,edge:`tomma ord`}],solution:`def är_anagram(a, b):
    return sorted(a.lower()) == sorted(b.lower())`,explain:`Två anagram blir likadana när bokstäverna sorteras. Att räkna med ordböcker fungerar också.`,hint:`Jämför sorted(a.lower()) med sorted(b.lower()).`},{type:`code`,prompt:"Skriv `första_unika(text)` som returnerar index för det första tecknet som bara förekommer en gång i texten, eller -1 om det inte finns något.",starter:`def första_unika(text):
    pass
`,tests:[{fn:`första_unika`,args:[`aabbc`],expect:4},{fn:`första_unika`,args:[`loveleetcode`],expect:2},{fn:`första_unika`,args:[`aabb`],expect:-1,edge:`inget unikt tecken`},{fn:`första_unika`,args:[``],expect:-1,edge:`tom text`}],solution:`def första_unika(text):
    räkna = {}
    for t in text:
        räkna[t] = räkna.get(t, 0) + 1
    for i in range(len(text)):
        if räkna[text[i]] == 1:
            return i
    return -1`,explain:`Två varv: först räkna, sedan leta. Det är mycket snabbare än att räkna om för varje tecken.`,hint:`Räkna alla tecken i en ordbok, loopa sedan med index och returnera första med antal 1.`}]},{id:`py-bsearch`,title:`Binärsökning`,tier:4,text:`Att leta igenom en lista ett element i taget kallas linjär sökning. I en lista med en miljon tal kan det ta en miljon jämförelser.

Om listan är sorterad finns ett smartare sätt: titta i mitten. Är målet mindre letar du vidare i vänstra halvan, annars i högra. Varje steg halverar sökområdet, så en miljon tal kräver bara cirka 20 jämförelser. Det kallas binärsökning och är en klassisk algoritm.`,example:`# 1. Sorterad lista och gränser
lista = [2, 4, 7, 10, 15, 21]
lo = 0
hi = len(lista) - 1
mål = 15
# 2. Titta i mitten
while lo <= hi:
    mitt = (lo + hi) // 2
    print("Tittar på index", mitt)
    if lista[mitt] == mål:
        print("Hittad!")
        break
    # 3. Flytta en gräns
    elif lista[mitt] < mål:
        lo = mitt + 1
    else:
        hi = mitt - 1`,exercises:[{type:`choice`,prompt:`Ungefär hur många jämförelser behöver binärsökning i en sorterad lista med 1 000 000 tal?`,options:[`Cirka 20`,`Cirka 1 000`,`Cirka 500 000`],answer:0,explain:`Varje jämförelse halverar sökområdet, och 2 upphöjt till 20 är ungefär en miljon.`,why:{1:`Det är för mycket. Halvering går snabbare än så.`,2:`Det är vad linjär sökning behöver i snitt.`}},{type:`choice`,prompt:`Vad krävs för att binärsökning ska fungera?`,options:[`Listan måste vara sorterad`,`Listan får inte innehålla negativa tal`,`Listan måste ha ett jämnt antal element`],answer:0,explain:`Bara i en sorterad lista vet man att målet ligger till vänster om mitten när det är mindre.`,why:{1:`Negativa tal går bra att jämföra.`,2:`Heltalsdivisionen // tar hand om både jämnt och udda antal.`}},{type:`code`,prompt:"Skriv `binärsök(lista, mål)` som returnerar index för mål i den sorterade listan, eller -1 om det inte finns. Använd en while-loop som halverar sökområdet.",starter:`def binärsök(lista, mål):
    pass
`,tests:[{fn:`binärsök`,args:[[1,3,5,7,9,11],7],expect:3},{fn:`binärsök`,args:[[1,3,5],1],expect:0,edge:`första elementet`},{fn:`binärsök`,args:[[1,3,5],5],expect:2,edge:`sista elementet`},{fn:`binärsök`,args:[[1,3,5],4],expect:-1,edge:`saknas`},{fn:`binärsök`,args:[[],1],expect:-1,edge:`tom lista`}],require:[n(`\\bwhile\\b`,`Använd en while-loop.`),n(`//\\s*2`,`Räkna ut mitten med // 2.`)],forbid:[n(`\\.index\\s*\\(`,`Skriv sökningen själv, utan index().`),n(`\\bfor\\b`,`Använd while och halvering i stället för en for-loop.`)],solution:`def binärsök(lista, mål):
    lo = 0
    hi = len(lista) - 1
    while lo <= hi:
        mitt = (lo + hi) // 2
        if lista[mitt] == mål:
            return mitt
        elif lista[mitt] < mål:
            lo = mitt + 1
        else:
            hi = mitt - 1
    return -1`,explain:`lo och hi är gränserna för området som återstår. När lo passerar hi är området tomt.`,hint:`lo = 0, hi = len(lista) - 1, while lo <= hi: räkna mitten och flytta en av gränserna.`},{type:`code`,prompt:"Skriv `insättningsplats(lista, tal)` som returnerar det första index där tal kan stoppas in så att listan förblir sorterad. Använd binärsökning.",starter:`def insättningsplats(lista, tal):
    pass
`,tests:[{fn:`insättningsplats`,args:[[1,3,5],4],expect:2},{fn:`insättningsplats`,args:[[1,3,5],0],expect:0,edge:`först`},{fn:`insättningsplats`,args:[[1,3,5],9],expect:3,edge:`sist`},{fn:`insättningsplats`,args:[[1,3,3,5],3],expect:1,edge:`lika värden: första platsen`},{fn:`insättningsplats`,args:[[],7],expect:0,edge:`tom lista`}],require:[n(`\\bwhile\\b`,`Använd en while-loop.`)],forbid:[n(`\\bfor\\b`,`Använd binärsökning i stället för en for-loop.`)],solution:`def insättningsplats(lista, tal):
    lo = 0
    hi = len(lista)
    while lo < hi:
        mitt = (lo + hi) // 2
        if lista[mitt] < tal:
            lo = mitt + 1
        else:
            hi = mitt
    return lo`,explain:`Här är hi en plats efter det sista elementet, och loopen slutar när lo och hi möts. Den varianten är vanlig när man letar efter en plats i stället för ett värde.`,hint:`Låt hi = len(lista) och kör while lo < hi. Om lista[mitt] < tal flyttas lo, annars blir hi = mitt.`},{type:`code`,prompt:"Skriv `antal_gissningar(hemligt)` som spelar ”gissa talet” mellan 1 och 100 med binärsökning och returnerar hur många gissningar som behövdes. Gissa alltid (lo + hi) // 2.",starter:`def antal_gissningar(hemligt):
    pass
`,tests:[{fn:`antal_gissningar`,args:[50],expect:1},{fn:`antal_gissningar`,args:[25],expect:2},{fn:`antal_gissningar`,args:[100],expect:7,edge:`högsta talet`},{fn:`antal_gissningar`,args:[1],expect:6,edge:`lägsta talet`}],solution:`def antal_gissningar(hemligt):
    lo = 1
    hi = 100
    gissningar = 0
    while True:
        gissning = (lo + hi) // 2
        gissningar += 1
        if gissning == hemligt:
            return gissningar
        if gissning < hemligt:
            lo = gissning + 1
        else:
            hi = gissning - 1`,explain:`Inget tal mellan 1 och 100 kräver mer än 7 gissningar, eftersom 2 upphöjt till 7 är 128.`,hint:`Samma som binärsökning, men räkna varje gissning.`}]},{id:`py-recursion`,title:`Rekursion`,tier:4,text:`En rekursiv funktion anropar sig själv med ett mindre problem. Den behöver alltid ett basfall, ett läge där den slutar anropa sig själv och bara returnerar ett svar.

Utan basfall fortsätter den för evigt, och Python stoppar med RecursionError. Rekursion passar extra bra för saker som är nästlade, som listor i listor eller mappar i mappar.`,example:`def nedräkning(n):
    # 1. Basfall: stoppa vid 0
    if n == 0:
        print("Start!")
        return
    # 2. Skriv ut och anropa igen
    print(n)
    nedräkning(n - 1)

# 3. Starta nedräkningen
nedräkning(3)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`def f(n):
    if n == 0:
        return 0
    return n + f(n - 1)

print(f(4))`,options:[`10`,`4`,`0`],answer:0,out:!0,explain:`f(4) = 4 + 3 + 2 + 1 + 0 = 10.`,why:{1:`Funktionen lägger ihop alla tal ner till 0, den returnerar inte bara n.`,2:`0 är bara basfallet. Resten av anropen lägger till sina tal.`}},{type:`choice`,prompt:`Vad händer om en rekursiv funktion saknar basfall?`,options:[`Den anropar sig själv tills Python stoppar med RecursionError`,`Den returnerar None direkt`,`Den körs exakt en gång`],answer:0,explain:`Varje anrop startar ett nytt anrop, och till slut tar minnet för anropen slut.`,why:{1:`Funktionen kommer aldrig fram till något return utan basfall.`,2:`Varje anrop gör ett nytt anrop, så det tar aldrig slut av sig självt.`}},{type:`code`,prompt:"Skriv `fakultet(n)` rekursivt. n! = n * (n - 1)!, och 0! = 1.",starter:`def fakultet(n):
    pass
`,tests:[{fn:`fakultet`,args:[5],expect:120},{fn:`fakultet`,args:[1],expect:1},{fn:`fakultet`,args:[0],expect:1,edge:`basfallet 0`}],require:[n(`fakultet\\s*\\(\\s*n\\s*-\\s*1\\s*\\)`,`Anropa fakultet(n - 1) inne i funktionen.`)],forbid:[n(`\\b(for|while)\\b`,`Lös det med rekursion, utan loopar.`)],solution:`def fakultet(n):
    if n == 0:
        return 1
    return n * fakultet(n - 1)`,explain:`Basfallet 0 stoppar rekursionen. Alla andra fall bygger på ett mindre fall.`,hint:`if n == 0: return 1, annars return n * fakultet(n - 1).`},{type:`code`,prompt:"Skriv `siffersumma(n)` rekursivt. Den ska summera siffrorna i ett heltal som inte är negativt, utan loopar och utan att göra om talet till text.",starter:`def siffersumma(n):
    pass
`,tests:[{fn:`siffersumma`,args:[1234],expect:10},{fn:`siffersumma`,args:[7],expect:7,edge:`en siffra`},{fn:`siffersumma`,args:[0],expect:0,edge:`noll`}],require:[n(`siffersumma\\s*\\(\\s*n\\s*//\\s*10\\s*\\)`,`Anropa siffersumma(n // 10).`)],forbid:[n(`\\b(for|while)\\b`,`Lös det med rekursion, utan loopar.`),n(`\\bstr\\s*\\(`,`Räkna med // och %, utan str().`)],solution:`def siffersumma(n):
    if n < 10:
        return n
    return n % 10 + siffersumma(n // 10)`,explain:`n % 10 är sista siffran och n // 10 är talet utan sista siffran.`,hint:`Basfall: n < 10. Annars sista siffran plus siffersumman av resten.`},{type:`code`,prompt:"Skriv `platta_ut(lista)` som gör om en nästlad lista, med listor i listor i hur många nivåer som helst, till en platt lista.",starter:`def platta_ut(lista):
    pass
`,tests:[{fn:`platta_ut`,args:[[1,[2,[3,4]],5]],expect:[1,2,3,4,5]},{fn:`platta_ut`,args:[[]],expect:[],edge:`tom lista`},{fn:`platta_ut`,args:[[[[]]]],expect:[],edge:`bara tomma listor`},{fn:`platta_ut`,args:[[[1],[[2]],[[[3]]]]],expect:[1,2,3],edge:`djup nästling`}],require:[n(`platta_ut\\s*\\([^)]*\\)[\\s\\S]*platta_ut\\s*\\(`,`Anropa platta_ut inne i sig själv.`)],solution:`def platta_ut(lista):
    svar = []
    for x in lista:
        if isinstance(x, list):
            svar += platta_ut(x)
        else:
            svar.append(x)
    return svar`,explain:`När ett element själv är en lista löser funktionen samma problem en nivå längre in. Därför klarar den hur djup nästling som helst.`,hint:`Loopa. Om isinstance(x, list), lägg till platta_ut(x), annars append(x).`},{type:`code`,prompt:"Skriv `potens(bas, exp)` rekursivt, där exp är ett heltal som inte är negativt. Använd varken ** eller pow.",starter:`def potens(bas, exp):
    pass
`,tests:[{fn:`potens`,args:[2,10],expect:1024},{fn:`potens`,args:[5,0],expect:1,edge:`exponent 0`},{fn:`potens`,args:[-3,3],expect:-27,edge:`negativ bas`}],forbid:[n(`\\*\\*|pow\\s*\\(`,`Lös det utan ** och pow().`),n(`\\b(for|while)\\b`,`Lös det med rekursion, utan loopar.`)],solution:`def potens(bas, exp):
    if exp == 0:
        return 1
    return bas * potens(bas, exp - 1)`,explain:`Allt upphöjt till 0 är 1. Det blir basfallet.`,hint:`if exp == 0: return 1, annars bas * potens(bas, exp - 1).`}]},{id:`py-sorting`,title:`Skriv en egen sortering`,tier:4,text:`I riktig kod använder man sorted(). Men att skriva en sortering själv är en klassisk övning som tränar loopar, index och byten, och det kommer ofta upp på arbetsintervjuer.

Urvalssortering går till så här: hitta det minsta värdet och byt plats på det och första platsen. Hitta sedan det minsta av resten och byt med andra platsen, och så vidare. I Python byter man plats på två värden med a, b = b, a.`,example:`# 1. Osorterad lista
lista = [5, 2, 8]
# 2. Byt plats på två element
lista[0], lista[1] = lista[1], lista[0]
# 3. Skriv ut listan
print(lista)`,exercises:[{type:`choice`,prompt:`Varför använder man nästan alltid sorted() i riktig kod?`,options:[`Den är snabb, vältestad och redan färdig`,`Egna sorteringar är förbjudna i Python`,`sorted() kan bara sortera tal`],answer:0,explain:`Inbyggda verktyg är testade av miljontals användare. Egna sorteringar skriver man för att förstå hur det fungerar.`,why:{1:`Det är tillåtet, bara sällan en bra idé i ett riktigt projekt.`,2:`sorted() sorterar text, tupler och mycket mer.`}},{type:`code`,prompt:"Skriv `minsta_index(lista, start)` som returnerar index för det minsta värdet från position start och framåt. Vid lika vinner det första.",starter:`def minsta_index(lista, start):
    pass
`,tests:[{fn:`minsta_index`,args:[[4,1,3,0],0],expect:3},{fn:`minsta_index`,args:[[4,1,3,0,9],4],expect:4,edge:`start på sista platsen`},{fn:`minsta_index`,args:[[5,2,7,2],1],expect:1,edge:`lika: första vinner`}],forbid:[n(`\\bmin\\s*\\(`,`Skriv sökningen själv, utan min().`),n(`\\.index\\s*\\(`,`Skriv sökningen själv, utan index().`)],solution:`def minsta_index(lista, start):
    bäst = start
    for i in range(start + 1, len(lista)):
        if lista[i] < lista[bäst]:
            bäst = i
    return bäst`,explain:`Precis som att hitta största värdet, men med < och en startposition.`,hint:`Börja med bäst = start och loopa från start + 1.`},{type:`code`,prompt:"Skriv `urvalssortera(lista)` som sorterar listan med urvalssortering och returnerar den. Använd inte sort() eller sorted().",starter:`def urvalssortera(lista):
    pass
`,tests:[{fn:`urvalssortera`,args:[[5,2,8,1]],expect:[1,2,5,8]},{fn:`urvalssortera`,args:[[3,3,1]],expect:[1,3,3],edge:`dubbletter`},{fn:`urvalssortera`,args:[[]],expect:[],edge:`tom lista`},{fn:`urvalssortera`,args:[[-1,-5]],expect:[-5,-1],edge:`negativa tal`}],forbid:[n(`\\bsort(ed)?\\s*\\(`,`Skriv sorteringen själv, utan sort() och sorted().`)],solution:`def urvalssortera(lista):
    for i in range(len(lista)):
        m = i
        for j in range(i + 1, len(lista)):
            if lista[j] < lista[m]:
                m = j
        lista[i], lista[m] = lista[m], lista[i]
    return lista`,explain:`Den yttre loopen väljer plats. Den inre letar upp det minsta av resten. Två nästlade loopar betyder ungefär n * n jämförelser.`,hint:`För varje i: hitta minsta index från i, byt sedan lista[i] och lista[m].`},{type:`code`,prompt:"Skriv `slå_ihop(a, b)` som tar två sorterade listor och returnerar en ny sorterad lista med alla värden. Använd inte sort() eller sorted(), utan gå igenom båda listorna samtidigt.",starter:`def slå_ihop(a, b):
    pass
`,tests:[{fn:`slå_ihop`,args:[[1,4,9],[2,3,10]],expect:[1,2,3,4,9,10]},{fn:`slå_ihop`,args:[[],[1,2]],expect:[1,2],edge:`en tom lista`},{fn:`slå_ihop`,args:[[1,1],[1]],expect:[1,1,1],edge:`lika värden`},{fn:`slå_ihop`,args:[[],[]],expect:[],edge:`två tomma listor`}],forbid:[n(`\\bsort(ed)?\\s*\\(`,`Lös det utan sort() och sorted().`)],solution:`def slå_ihop(a, b):
    i = 0
    j = 0
    svar = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            svar.append(a[i])
            i += 1
        else:
            svar.append(b[j])
            j += 1
    return svar + a[i:] + b[j:]`,explain:`Två pekare, en i varje lista. Ta alltid det minsta av de två, och lägg till resten på slutet. Det här är hjärtat i sorteringsalgoritmen mergesort.`,hint:`Använd i och j som index, och en while-loop så länge båda har kvar element.`},{type:`code`,prompt:"Skriv `antal_byten(lista)` som sorterar en kopia av listan med bubbelsortering och returnerar hur många platsbyten som behövdes. Bubbelsortering jämför grannar och byter dem om de står i fel ordning, tills inga byten behövs.",starter:`def antal_byten(lista):
    pass
`,tests:[{fn:`antal_byten`,args:[[3,2,1]],expect:3},{fn:`antal_byten`,args:[[1,2,3]],expect:0,edge:`redan sorterad`},{fn:`antal_byten`,args:[[2,1,3]],expect:1},{fn:`antal_byten`,args:[[]],expect:0,edge:`tom lista`}],forbid:[n(`\\bsort(ed)?\\s*\\(`,`Skriv bubbelsorteringen själv.`)],solution:`def antal_byten(lista):
    l = list(lista)
    byten = 0
    bytt = True
    while bytt:
        bytt = False
        for i in range(len(l) - 1):
            if l[i] > l[i + 1]:
                l[i], l[i + 1] = l[i + 1], l[i]
                byten += 1
                bytt = True
    return byten`,explain:`list(lista) gör en kopia så att originalet inte ändras. Loopen fortsätter tills ett helt varv går utan byten.`,hint:`En while-loop som kör så länge något byttes, med en for-loop över grannarna inuti.`}]}]},{id:`py11`,title:`Slutprojekt i Python`,lessons:[{id:`py-textstats`,title:`Projekt: textanalys`,tier:5,text:`Du bygger ett litet verktyg som analyserar text, ungefär som ordräknaren i ett ordbehandlingsprogram.

Du kombinerar textmetoder, ordböcker, sortering med key och listbyggare. Varje del bygger på den förra.`,example:`text = "Hej hej, världen!"
print(text.lower().split())`,exercises:[{type:`code`,prompt:"Del 1: Skriv `ord_lista(text)` som returnerar orden i texten med små bokstäver och utan tecknen . , ! och ? i början eller slutet. Tomma ord ska inte komma med.",starter:`def ord_lista(text):
    pass
`,tests:[{fn:`ord_lista`,args:[`Hej hej, världen!`],expect:[`hej`,`hej`,`världen`]},{fn:`ord_lista`,args:[`Vad? Nej.`],expect:[`vad`,`nej`]},{fn:`ord_lista`,args:[`  !  `],expect:[],edge:`bara tecken`},{fn:`ord_lista`,args:[``],expect:[],edge:`tom text`}],solution:`def ord_lista(text):
    svar = []
    for o in text.lower().split():
        rent = o.strip(".,!?")
        if rent != "":
            svar.append(rent)
    return svar`,explain:`strip(".,!?") tar bort de tecknen från båda ändarna av ordet.`,hint:`split(), sedan strip(".,!?") på varje ord och hoppa över tomma.`},{type:`code`,prompt:"Del 2: Skriv `topp_ord(text, n)` som returnerar de n vanligaste orden som par [ord, antal], med flest först och vid lika antal i bokstavsordning. Använd ord_lista från del 1.",starter:`def ord_lista(text):
    svar = []
    for o in text.lower().split():
        rent = o.strip(".,!?")
        if rent != "":
            svar.append(rent)
    return svar

def topp_ord(text, n):
    pass
`,tests:[{fn:`topp_ord`,args:[`a b b c c c`,2],expect:[[`c`,3],[`b`,2]]},{fn:`topp_ord`,args:[`Ja nej, JA! nej`,5],expect:[[`ja`,2],[`nej`,2]],edge:`lika antal, och n större än antal ord`},{fn:`topp_ord`,args:[``,3],expect:[],edge:`tom text`}],require:[n(`def\\s+topp_ord[\\s\\S]*ord_lista\\s*\\(`,`Använd ord_lista() i topp_ord.`)],solution:`def ord_lista(text):
    svar = []
    for o in text.lower().split():
        rent = o.strip(".,!?")
        if rent != "":
            svar.append(rent)
    return svar

def topp_ord(text, n):
    räkna = {}
    for o in ord_lista(text):
        räkna[o] = räkna.get(o, 0) + 1
    par = sorted(räkna.items(), key=lambda p: (-p[1], p[0]))
    return [[o, a] for o, a in par[:n]]`,explain:`Räkna, sortera med key och klipp ut de n första med [:n].`,hint:`Räkna med en ordbok, sortera items() med key=lambda p: (-p[1], p[0]) och ta [:n].`},{type:`code`,prompt:'Del 3: Skriv `sammanfattning(text)` som returnerar en ordbok med "ord" (antal ord), "unika" (antal olika ord) och "längsta" (längsta ordet, det första vid lika, eller "" för tom text).',starter:`def ord_lista(text):
    svar = []
    for o in text.lower().split():
        rent = o.strip(".,!?")
        if rent != "":
            svar.append(rent)
    return svar

def sammanfattning(text):
    pass
`,tests:[{fn:`sammanfattning`,args:[`Hej hej, fina världen!`],expect:{ord:4,unika:3,längsta:`världen`}},{fn:`sammanfattning`,args:[`ab cd`],expect:{ord:2,unika:2,längsta:`ab`},edge:`lika långa`},{fn:`sammanfattning`,args:[``],expect:{ord:0,unika:0,längsta:``},edge:`tom text`}],solution:`def ord_lista(text):
    svar = []
    for o in text.lower().split():
        rent = o.strip(".,!?")
        if rent != "":
            svar.append(rent)
    return svar

def sammanfattning(text):
    ord = ord_lista(text)
    längsta = max(ord, key=len) if ord else ""
    return {"ord": len(ord), "unika": len(set(ord)), "längsta": längsta}`,explain:`set() räknar unika ord, och max med key=len hittar det längsta.`,hint:`Hämta orden med ord_lista, använd len, set och max(..., key=len).`}]},{id:`py-inventory`,title:`Projekt: lagersystem`,tier:5,text:`Du bygger kärnan i ett lagersystem för en liten butik. Det ska klara felaktiga beställningar utan att lagret hamnar i ett konstigt läge.

Du kombinerar ordböcker, egna fel med raise, try och except, och sortering med key.`,example:`# 1. Lagret som ordbok
lager = {"penna": 10, "block": 3}
# 2. Minska antalet pennor
lager["penna"] -= 2
# 3. Visa lagret
print(lager)`,exercises:[{type:`code`,prompt:'Del 1: Skriv `ändra(lager, vara, ändring)` som ändrar antalet för varan och returnerar det nya antalet. Okända varor börjar på 0. Om antalet skulle bli negativt ska den kasta `ValueError("Inte tillräckligt med VARA")` utan att ändra lagret.',starter:`def ändra(lager, vara, ändring):
    pass

lager = {"penna": 5}
try:
    ändra(lager, "penna", -9)
except ValueError as e:
    print(e)
print(lager)
`,output:`Inte tillräckligt med penna
{'penna': 5}`,tests:[{fn:`ändra`,args:[{penna:5},`penna`,-2],expect:3},{fn:`ändra`,args:[{},`sudd`,4],expect:4,edge:`ny vara`},{fn:`ändra`,args:[{penna:5},`penna`,-5],expect:0,edge:`exakt slut`}],require:[n(`raise\\s+ValueError`,`Kasta felet med raise ValueError(...).`)],solution:`def ändra(lager, vara, ändring):
    nytt = lager.get(vara, 0) + ändring
    if nytt < 0:
        raise ValueError(f"Inte tillräckligt med {vara}")
    lager[vara] = nytt
    return nytt

lager = {"penna": 5}
try:
    ändra(lager, "penna", -9)
except ValueError as e:
    print(e)
print(lager)`,explain:`Räkna ut det nya värdet först och kontrollera det innan du sparar. Då rörs lagret aldrig vid fel.`,hint:`nytt = lager.get(vara, 0) + ändring. Kasta felet om nytt < 0, spara annars.`},{type:`code`,prompt:"Del 2: Skriv `behandla(lager, order)` där order är en lista med par [vara, ändring]. Försök med varje rad med ändra() från del 1. Returnera en lista med de varor vars rad misslyckades, och fortsätt med nästa rad när något går fel.",starter:`def ändra(lager, vara, ändring):
    nytt = lager.get(vara, 0) + ändring
    if nytt < 0:
        raise ValueError(f"Inte tillräckligt med {vara}")
    lager[vara] = nytt
    return nytt

def behandla(lager, order):
    pass
`,tests:[{fn:`behandla`,args:[{penna:5,block:1},[[`penna`,-2],[`block`,-3],[`sudd`,4]]],expect:[`block`]},{fn:`behandla`,args:[{},[[`x`,-1],[`y`,-1]]],expect:[`x`,`y`],edge:`allt misslyckas`},{fn:`behandla`,args:[{a:1},[]],expect:[],edge:`tom order`}],require:[n(`\\btry\\s*:`,`Använd try runt varje rad.`),n(`def\\s+behandla[\\s\\S]*ändra\\s*\\(`,`Använd ändra() från del 1.`)],solution:`def ändra(lager, vara, ändring):
    nytt = lager.get(vara, 0) + ändring
    if nytt < 0:
        raise ValueError(f"Inte tillräckligt med {vara}")
    lager[vara] = nytt
    return nytt

def behandla(lager, order):
    misslyckade = []
    for vara, ändring in order:
        try:
            ändra(lager, vara, ändring)
        except ValueError:
            misslyckade.append(vara)
    return misslyckade`,explain:`try inne i loopen gör att en dålig rad inte stoppar resten av ordern.`,hint:`Loopa över order, anropa ändra i try och lägg till varan i listan i except.`},{type:`code`,prompt:"Del 3: Skriv `beställ(lager, minimum)` som returnerar en lista med varor som har färre än minimum i lager. Sortera med lägst antal först och vid lika antal i bokstavsordning.",starter:`def beställ(lager, minimum):
    pass
`,tests:[{fn:`beställ`,args:[{penna:2,block:0,sudd:9,lim:2},3],expect:[`block`,`lim`,`penna`]},{fn:`beställ`,args:[{a:5},5],expect:[],edge:`exakt minimum räcker`},{fn:`beställ`,args:[{},3],expect:[],edge:`tomt lager`}],require:[n(`key\\s*=`,`Sortera med key=.`)],solution:`def beställ(lager, minimum):
    låga = [(antal, vara) for vara, antal in lager.items() if antal < minimum]
    låga = sorted(låga, key=lambda p: (p[0], p[1]))
    return [vara for antal, vara in låga]`,explain:`Filtrera med en listbyggare, sortera på (antal, namn) och plocka ut namnen.`,hint:`Bygg par (antal, vara) för de varor som är under minimum och sortera dem med key.`}]},{id:`py-todo`,title:`Projekt: att göra-lista med klasser`,tier:5,text:`I det sista projektet bygger du en att göra-lista med två klasser som samarbetar. Den här typen av kod finns i riktiga appar.

Du använder allt från de senaste kapitlen: klasser, __str__, egna fel, try och except, listbyggare och sortering med key.`,example:`# 1. Uppgift med titel och status
class Uppgift:
    def __init__(self, titel):
        self.titel = titel
        self.klar = False

# 2. Skapa en uppgift
u = Uppgift("Plugga")
# 3. Visa titel och status
print(u.titel, u.klar)`,exercises:[{type:`code`,prompt:'Del 1: Gör klart klassen Uppgift. En tom titel ger `ValueError("Titeln får inte vara tom")` och en prioritet som inte är 1, 2 eller 3 ger `ValueError("Prioritet måste vara 1, 2 eller 3")`. `__str__` ska visa "[ ] titel (P2)", och "[x]" när uppgiften är klar.',starter:`class Uppgift:
    def __init__(self, titel, prioritet):
        self.titel = titel
        self.prioritet = prioritet
        self.klar = False

    def __str__(self):
        pass

u = Uppgift("Plugga", 2)
print(u)
u.klar = True
print(u)
for titel, p in [("", 1), ("Städa", 5)]:
    try:
        Uppgift(titel, p)
    except ValueError as e:
        print(e)
`,output:`[ ] Plugga (P2)
[x] Plugga (P2)
Titeln får inte vara tom
Prioritet måste vara 1, 2 eller 3`,require:[n(`raise\\s+ValueError`,`Kasta felen med raise ValueError(...).`)],solution:`class Uppgift:
    def __init__(self, titel, prioritet):
        if titel.strip() == "":
            raise ValueError("Titeln får inte vara tom")
        if prioritet not in [1, 2, 3]:
            raise ValueError("Prioritet måste vara 1, 2 eller 3")
        self.titel = titel
        self.prioritet = prioritet
        self.klar = False

    def __str__(self):
        ruta = "[x]" if self.klar else "[ ]"
        return f"{ruta} {self.titel} (P{self.prioritet})"

u = Uppgift("Plugga", 2)
print(u)
u.klar = True
print(u)
for titel, p in [("", 1), ("Städa", 5)]:
    try:
        Uppgift(titel, p)
    except ValueError as e:
        print(e)`,explain:`Kontrollerna i __init__ gör att det aldrig kan finnas en ogiltig uppgift i programmet.`,hint:`Två if med raise överst i __init__. I __str__ väljer du "[x]" eller "[ ]".`},{type:`code`,prompt:'Del 2: Gör klart klassen Lista. `lägg_till(titel, prioritet)` skapar en Uppgift, `klarmarkera(titel)` markerar den som klar eller kastar `ValueError("Hittar inte: TITEL")`, och `kvar()` returnerar antalet uppgifter som inte är klara.',starter:`class Uppgift:
    def __init__(self, titel, prioritet):
        if titel.strip() == "":
            raise ValueError("Titeln får inte vara tom")
        if prioritet not in [1, 2, 3]:
            raise ValueError("Prioritet måste vara 1, 2 eller 3")
        self.titel = titel
        self.prioritet = prioritet
        self.klar = False

    def __str__(self):
        ruta = "[x]" if self.klar else "[ ]"
        return f"{ruta} {self.titel} (P{self.prioritet})"

class Lista:
    def __init__(self):
        self.uppgifter = []

    def lägg_till(self, titel, prioritet):
        pass

    def klarmarkera(self, titel):
        pass

    def kvar(self):
        pass

l = Lista()
l.lägg_till("Plugga", 1)
l.lägg_till("Diska", 3)
l.lägg_till("Träna", 2)
l.klarmarkera("Diska")
try:
    l.klarmarkera("Sova")
except ValueError as e:
    print(e)
print("Kvar:", l.kvar())
`,output:`Hittar inte: Sova
Kvar: 2`,solution:`class Uppgift:
    def __init__(self, titel, prioritet):
        if titel.strip() == "":
            raise ValueError("Titeln får inte vara tom")
        if prioritet not in [1, 2, 3]:
            raise ValueError("Prioritet måste vara 1, 2 eller 3")
        self.titel = titel
        self.prioritet = prioritet
        self.klar = False

    def __str__(self):
        ruta = "[x]" if self.klar else "[ ]"
        return f"{ruta} {self.titel} (P{self.prioritet})"

class Lista:
    def __init__(self):
        self.uppgifter = []

    def lägg_till(self, titel, prioritet):
        self.uppgifter.append(Uppgift(titel, prioritet))

    def klarmarkera(self, titel):
        for u in self.uppgifter:
            if u.titel == titel:
                u.klar = True
                return
        raise ValueError(f"Hittar inte: {titel}")

    def kvar(self):
        return len([u for u in self.uppgifter if not u.klar])

l = Lista()
l.lägg_till("Plugga", 1)
l.lägg_till("Diska", 3)
l.lägg_till("Träna", 2)
l.klarmarkera("Diska")
try:
    l.klarmarkera("Sova")
except ValueError as e:
    print(e)
print("Kvar:", l.kvar())`,explain:`Lista använder Uppgift i stället för att upprepa dess regler. Det är så större program byggs: små delar som samarbetar.`,hint:`lägg_till gör append(Uppgift(...)). klarmarkera loopar och kastar felet om loopen tar slut utan träff.`},{type:`code`,prompt:"Del 3: Ge Lista metoden `visa()` som returnerar en lista med texterna för alla uppgifter. Ej klara uppgifter kommer först, sedan efter prioritet (1 först) och sist i bokstavsordning efter titel.",starter:`class Uppgift:
    def __init__(self, titel, prioritet):
        self.titel = titel
        self.prioritet = prioritet
        self.klar = False

    def __str__(self):
        ruta = "[x]" if self.klar else "[ ]"
        return f"{ruta} {self.titel} (P{self.prioritet})"

class Lista:
    def __init__(self):
        self.uppgifter = []

    def lägg_till(self, titel, prioritet):
        self.uppgifter.append(Uppgift(titel, prioritet))

    def visa(self):
        pass

l = Lista()
for titel, p in [("Träna", 2), ("Diska", 3), ("Plugga", 1), ("Baka", 2)]:
    l.lägg_till(titel, p)
l.uppgifter[2].klar = True
for rad in l.visa():
    print(rad)
`,output:`[ ] Baka (P2)
[ ] Träna (P2)
[ ] Diska (P3)
[x] Plugga (P1)`,require:[n(`key\\s*=`,`Sortera med key=.`)],solution:`class Uppgift:
    def __init__(self, titel, prioritet):
        self.titel = titel
        self.prioritet = prioritet
        self.klar = False

    def __str__(self):
        ruta = "[x]" if self.klar else "[ ]"
        return f"{ruta} {self.titel} (P{self.prioritet})"

class Lista:
    def __init__(self):
        self.uppgifter = []

    def lägg_till(self, titel, prioritet):
        self.uppgifter.append(Uppgift(titel, prioritet))

    def visa(self):
        ordning = sorted(self.uppgifter, key=lambda u: (u.klar, u.prioritet, u.titel))
        return [str(u) for u in ordning]

l = Lista()
for titel, p in [("Träna", 2), ("Diska", 3), ("Plugga", 1), ("Baka", 2)]:
    l.lägg_till(titel, p)
l.uppgifter[2].klar = True
for rad in l.visa():
    print(rad)`,explain:`False sorteras före True, så ej klara hamnar först. Tupeln i key sköter alla tre reglerna på en gång.`,hint:`key=lambda u: (u.klar, u.prioritet, u.titel), och str(u) för texterna.`}]}]}],i=(e,t)=>({re:e,msg:t}),a=e=>e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),o=[];for(let e=1;e<=6;e++)for(let t=1;t<=6;t++)o.push(`Du slog ${e} och ${t}, summa ${e+t}`);var s=[];for(let e of[[`Ali`,`Maja`,`Kim`],[`Ali`,`Kim`,`Maja`],[`Maja`,`Ali`,`Kim`],[`Maja`,`Kim`,`Ali`],[`Kim`,`Ali`,`Maja`],[`Kim`,`Maja`,`Ali`]])s.push(e.map((e,t)=>`Tur ${t+1}: ${e}`).join(`
`));var c=[];for(let e=1;e<=10;e++)for(let t=e+1;t<=10;t++)for(let n=t+1;n<=10;n++)c.push(a(`Dragning: [${e}, ${t}, ${n}]`));var l=(e,t)=>{let n=[];for(let r=1;r<=100;r++)n.push(`${a(e)}(?:${a(t)}){${r-1}}${a(`Gissa: Rätt på ${r} försök!`)}`);return n.join(`|`)},u=[`abc`,...Array.from({length:100},(e,t)=>String(t+1))].join(`
`),d=Array.from({length:100},(e,t)=>String(100-t)).join(`
`),f=[{id:`py12`,title:`Program som pratar med dig`,lessons:[{id:`py-input`,title:`Fråga användaren med input()`,tier:2,text:'Hittills har dina program gjort exakt samma sak varje gång de körs. Med `input()` kan programmet fråga den som använder det och få ett nytt svar varje gång. Det är skillnaden mellan en uträkning och ett verktyg som andra kan använda.\n\n`namn = input("Vad heter du? ")` skriver ut frågan, väntar på svaret och returnerar det. Spara alltid svaret i en variabel, annars försvinner det. Avsluta frågan med ett mellanslag så att svaret inte hamnar tätt intill frågan.\n\nVarje `input()` läser **en rad**. Två frågor betyder två rader indata. Svaret är alltid **text**, även om någon skriver 12. Det tar vi hand om i nästa lektion.\n\n**Skillnad mot din dator:** på en riktig dator skriver du svaret efter frågan och trycker Enter. I Kodstig står svaren redan i uppgiften eller i rutan Indata, och svaret syns inte i utskriften. Därför hamnar frågan och nästa utskrift på samma rad, till exempel `Namn? Hej Ali`.',example:`# 1. Fråga efter namn och spara svaret
namn = input("Vad heter du? ")
# 2. Fråga efter favoritmat
mat = input("Favoritmat? ")
# 3. Använd svaren i en f-sträng
print(f"Hej {namn}! {mat} låter gott.")`,exampleInput:`Ali
Tacos`,exercises:[{type:`choice`,prompt:"Indatan är `Sam`. Vad skrivs ut i Kodstig?",code:`namn = input("Namn? ")
print("Hej", namn)`,input:`Sam`,options:[`Hej Sam`,`Namn? Hej Sam`,`Namn? Sam Hej Sam`],answer:1,out:!0,explain:`input() skriver ut frågan "Namn? " utan radbyte. Svaret Sam syns inte, så nästa print hamnar direkt efter frågan.`,why:{0:`Frågan i input() skrivs också ut, så "Namn? " kommer först.`,2:`Svaret som läses in syns inte i utskriften i Kodstig. Bara frågan och det du skriver med print kommer med.`}},{type:`order`,prompt:`Ordna raderna så att programmet först frågar efter namn, sedan efter stad, och till sist skriver vem som bor var.`,input:`Sam
Lund`,lines:[`namn = input("Namn? ")`,`stad = input("Stad? ")`,`print(namn, "bor i", stad)`],output:`Namn? Stad? Sam bor i Lund`,distractors:[{line:`print(namn, "bor i", "stad")`,why:`Inom citattecken blir det texten stad, inte variabeln stad.`}],explain:`Frågorna ställs i den ordning de står, och första raden indata går till första input(). Utskriften måste komma sist, när båda svaren finns.`,hint:`Namnet frågas först. Båda svaren måste finnas innan de skrivs ut.`},{type:`fill`,prompt:`Fyll i funktionen som frågar användaren.`,code:`djur = ___("Favoritdjur? ")
print("Du gillar", djur)`,input:`katt`,answers:[[`input`]],output:`Favoritdjur? Du gillar katt`,explain:`input() skriver ut frågan och returnerar svaret, som sparas i djur.`,hint:`Funktionen heter samma sak som engelskans ord för indata.`},{type:`fill`,prompt:`Användaren skriver JA med stora bokstäver. Fyll i metoden så att programmet ändå förstår svaret.`,code:`svar = input("Ja eller nej? ").___()
if svar == "ja":
    print("Toppen!")`,input:`JA`,answers:[[`lower`]],output:`Ja eller nej? Toppen!`,explain:`lower() gör om svaret till små bokstäver direkt. Då spelar det ingen roll om någon skriver JA, Ja eller ja.`,hint:`Vilken textmetod gör alla bokstäver små?`},{type:`code`,prompt:"Skriv ett program som frågar `Vad heter du? ` och sedan skriver `Hej NAMN, välkommen!` med namnet som användaren skrev.",starter:`# Fråga efter namnet och hälsa
`,runs:[{input:`Ali`,output:`Vad heter du? Hej Ali, välkommen!`},{input:`Maja`,output:`Vad heter du? Hej Maja, välkommen!`}],require:[i(`input\\s*\\(`,`Läs namnet med input().`)],solution:`namn = input("Vad heter du? ")
print(f"Hej {namn}, välkommen!")`,explain:`Svaret sparas i namn och används i en f-sträng. Eftersom programmet körs med olika namn måste det verkligen använda svaret.`,hint:`namn = input("Vad heter du? ") och sedan print med en f-sträng.`},{type:`debug`,prompt:"Utskriften blir `Namn?HejAli` men ska bli `Namn? Hej Ali`. Fixa programmet.",starter:`namn = input("Namn?")
print("Hej" + namn)
`,runs:[{input:`Ali`,output:`Namn? Hej Ali`},{input:`Kim`,output:`Namn? Hej Kim`}],solution:`namn = input("Namn? ")
print("Hej", namn)`,explain:`Frågan behöver ett mellanslag sist. Med kommatecken i print sätts ett mellanslag mellan delarna automatiskt.`,hint:`Två mellanslag saknas: ett i slutet av frågan och ett mellan Hej och namnet.`},{type:`code`,prompt:"Folk skriver ofta svar med extra mellanslag och konstiga stora bokstäver. Fråga `Vilken färg? ` och skriv `Du valde FÄRG.` där färgen har små bokstäver och inga mellanslag runt sig.",starter:`färg = input("Vilken färg? ")
print(f"Du valde {färg}.")
`,runs:[{input:`  RÖD `,output:`Vilken färg? Du valde röd.`},{input:`Blå`,output:`Vilken färg? Du valde blå.`},{input:`grön`,output:`Vilken färg? Du valde grön.`}],solution:`färg = input("Vilken färg? ").strip().lower()
print(f"Du valde {färg}.")`,explain:`strip() tar bort mellanslagen i kanterna och lower() gör bokstäverna små. Att städa svaret direkt efter input() är en vana riktiga program har.`,hint:`Lägg till .strip().lower() efter input(...).`},{type:`code`,prompt:"Fråga `Förnamn? ` och `Efternamn? ` och skriv ut initialerna som `Initialer: A.B.` med stora bokstäver, oavsett hur användaren skrev.",starter:`förnamn = input("Förnamn? ")
efternamn = input("Efternamn? ")
`,runs:[{input:`ali
berg`,output:`Förnamn? Efternamn? Initialer: A.B.`},{input:`Maja
Ek`,output:`Förnamn? Efternamn? Initialer: M.E.`}],solution:`förnamn = input("Förnamn? ")
efternamn = input("Efternamn? ")
print(f"Initialer: {förnamn[0].upper()}.{efternamn[0].upper()}.")`,explain:`namn[0] ger första bokstaven och upper() gör den stor. Två input() betyder två rader indata.`,hint:`Använd förnamn[0].upper() och efternamn[0].upper() i en f-sträng.`}]},{id:`py-input-numbers`,title:`Tal från användaren`,tier:3,text:'Svaret från `input()` är alltid text. Skriver användaren 5 och 3 blir `a + b` texten `"53"`, inte 8. För att räkna måste du göra om svaret: `int(input("Antal? "))` för heltal och `float(input("Pris? "))` för decimaltal.\n\nMen användare skriver fel hela tiden. Skriver någon "fem" ger `int()` ett **ValueError** och programmet kraschar. Ett bra program frågar i stället igen. Mönstret ser ut så här: en `while True:`-loop som snurrar för evigt, en `try` runt omvandlingen och `break` direkt efter. `break` avbryter loopen på en gång. Eftersom `break` står efter `int()` nås den bara om omvandlingen lyckades. Gick det fel hoppar Python till `except`, skriver en vänlig förklaring och loopen frågar igen.\n\nTänk också på att `float("2,5")` ger ValueError. Python vill ha punkt som decimaltecken, men i Sverige skriver vi ofta komma. `replace(",", ".")` löser det.\n\nPå en riktig dator fungerar det precis likadant.',example:`# 1. Fråga tills svaret är ett heltal
while True:
    try:
        ålder = int(input("Hur gammal är du? "))
        break
    except ValueError:
        print("Skriv åldern med siffror, till exempel 12.")
# 2. Nu vet vi att ålder är ett tal
print(f"Om tio år är du {ålder + 10}.")`,exampleInput:`tolv
12`,exercises:[{type:`choice`,prompt:"Indatan är `5` och `3`. Vad skrivs ut?",code:`a = input("Tal? ")
b = input("Tal? ")
print(a + b)`,input:`5
3`,options:[`Tal? Tal? 8`,`Tal? Tal? 5 3`,`Tal? Tal? 53`],answer:2,out:!0,explain:`Båda svaren är text. Text plus text sätts ihop, så "5" + "3" blir "53".`,why:{0:`Det hade blivit 8 om svaren gjorts om med int() först. Nu är de text.`,1:`Plus sätter ihop text utan mellanslag. Det är print med kommatecken som lägger till mellanslag.`}},{type:`order`,prompt:`Ordna raderna så att programmet frågar efter antal tills svaret är ett heltal och sedan skriver ut det.`,input:`två
2`,lines:[`while True:`,`    try:`,`        antal = int(input("Antal? "))`,`        break`,`    except ValueError:`,`        print("Bara siffror!")`,`print("Du valde", antal)`],output:`Antal? Bara siffror!
Antal? Du valde 2`,distractors:[{line:`    except TypeError:`,why:`int("två") ger ValueError, inte TypeError. Fångar du fel feltyp kraschar programmet ändå.`}],explain:`break står efter int() i try, så loopen avbryts bara när omvandlingen lyckas. Vid fel skriver except ut en förklaring och loopen frågar igen.`,hint:`try ligger inne i loopen. break ska komma direkt efter raden som kan gå fel.`},{type:`fill`,prompt:`Fyll i omvandlingen så att priset kan ha decimaler.`,code:`pris = ___(input("Pris? "))
print(pris * 2)`,input:`2.5`,answers:[[`float`]],output:`Pris? 5.0`,explain:`float() gör om texten "2.5" till decimaltalet 2.5. int() hade gett ValueError här.`,hint:`Decimaltal heter float i Python.`},{type:`choice`,prompt:'Användaren skriver `2,5`. Vad händer med `float(input("Pris? "))`?',options:[`Det blir ValueError`,`Det blir 2.5`,`Det blir 25.0`],answer:0,explain:`Python använder punkt som decimaltecken. "2,5" går inte att tolka som ett tal, så det blir ValueError. Byt komma mot punkt med replace(",", ".") först.`,why:{1:`Python förstår inte svenskt decimalkomma. Bara "2.5" med punkt blir 2.5.`,2:`Python hoppar inte över kommat. Det tolkar inte texten alls och ger ett fel.`}},{type:`debug`,prompt:"Programmet ska skriva `Summan är X` men skriver ihop talen som text. Fixa det.",starter:`a = input("Första talet? ")
b = input("Andra talet? ")
print("Summan är", a + b)
`,runs:[{input:`5
3`,output:`Första talet? Andra talet? Summan är 8`},{input:`-2
2`,output:`Första talet? Andra talet? Summan är 0`}],solution:`a = int(input("Första talet? "))
b = int(input("Andra talet? "))
print("Summan är", a + b)`,explain:`Med int() runt input() blir svaren tal, och då räknar plus i stället för att sätta ihop text.`,hint:`Gör om båda svaren med int().`},{type:`code`,prompt:"Fråga `Hur många minuter? ` tills svaret är ett heltal. Vid fel skrivs `Skriv ett heltal.` Skriv till sist `Det är X timmar och Y minuter.`",starter:`minuter = int(input("Hur många minuter? "))
`,runs:[{input:`abc
135`,output:`Hur många minuter? Skriv ett heltal.
Hur många minuter? Det är 2 timmar och 15 minuter.`},{input:`45`,output:`Hur många minuter? Det är 0 timmar och 45 minuter.`},{input:`x
1,5
60`,output:`Hur många minuter? Skriv ett heltal.
Hur många minuter? Skriv ett heltal.
Hur många minuter? Det är 1 timmar och 0 minuter.`}],require:[i(`while\\s+True\\s*:`,`Fråga igen med en while True-loop.`),i(`except\\s+ValueError`,`Fånga felet med except ValueError.`)],solution:`while True:
    try:
        minuter = int(input("Hur många minuter? "))
        break
    except ValueError:
        print("Skriv ett heltal.")
print(f"Det är {minuter // 60} timmar och {minuter % 60} minuter.")`,explain:`Loopen släpper inte förbi förrän svaret är ett heltal. Sedan ger // hela timmar och % resten.`,hint:`Använd mönstret while True, try, int(input(...)), break och except ValueError. Räkna sedan med // 60 och % 60.`},{type:`code`,prompt:"Fråga `Pris i kronor? ` och skriv `Med moms: X kr` där X är priset gånger 1.25, avrundat till två decimaler med `round(x, 2)`. Svaret kan ha decimalkomma, så byt komma mot punkt innan du gör om det.",starter:`pris = float(input("Pris i kronor? "))
print("Med moms:", round(pris * 1.25, 2), "kr")
`,runs:[{input:`100`,output:`Pris i kronor? Med moms: 125.0 kr`},{input:`9,99`,output:`Pris i kronor? Med moms: 12.49 kr`},{input:`0.8`,output:`Pris i kronor? Med moms: 1.0 kr`}],require:[i(`replace\\s*\\(`,`Byt komma mot punkt med replace().`)],solution:`text = input("Pris i kronor? ")
pris = float(text.replace(",", "."))
print("Med moms:", round(pris * 1.25, 2), "kr")`,explain:`replace(",", ".") gör "9,99" till "9.99" så att float() förstår det. round(x, 2) avrundar till två decimaler.`,hint:`Spara svaret som text, gör replace(",", ".") och sedan float().`},{type:`code`,prompt:"Fråga `Ålder? ` tills svaret är ett heltal mellan 0 och 120. Är det inget heltal skrivs `Skriv ett heltal.` Är talet utanför gränserna skrivs `Mellan 0 och 120, tack.` Skriv till sist `Du är X år.`",starter:`ålder = int(input("Ålder? "))
print(f"Du är {ålder} år.")
`,runs:[{input:`hej
-5
30`,output:`Ålder? Skriv ett heltal.
Ålder? Mellan 0 och 120, tack.
Ålder? Du är 30 år.`},{input:`121
120`,output:`Ålder? Mellan 0 och 120, tack.
Ålder? Du är 120 år.`},{input:`0`,output:`Ålder? Du är 0 år.`}],require:[i(`while\\s+True\\s*:`,`Fråga igen med en while True-loop.`),i(`except\\s+ValueError`,`Fånga felet med except ValueError.`)],solution:`while True:
    try:
        ålder = int(input("Ålder? "))
    except ValueError:
        print("Skriv ett heltal.")
    else:
        if 0 <= ålder <= 120:
            break
        print("Mellan 0 och 120, tack.")
print(f"Du är {ålder} år.")`,explain:`Två kontroller: först att det är ett tal, sedan att talet är rimligt. Loopen släpper bara igenom svar som klarar båda. Gränserna 0 och 120 räknas som giltiga.`,hint:`Lägg en if efter omvandlingen: break om talet är inom gränserna, annars skriv meddelandet.`}]},{id:`py-random`,title:`Slumpen i random`,tier:2,text:"Spel och verktyg behöver ofta slump: en tärning, en lottdragning, frågor i ny ordning. Python har det inbyggt i modulen `random`, som du hämtar med `import random` överst i programmet.\n\n`random.randint(1, 6)` ger ett heltal från 1 till och med 6. Observera att båda gränserna är med, till skillnad från `range`. `random.choice(lista)` väljer ett element. `random.shuffle(lista)` blandar själva listan och returnerar `None`. `random.sample(lista, 3)` returnerar en ny lista med 3 olika element.\n\nDatorns slump är egentligen en uträkning som startar från ett **frö** (seed). Det räcker gott för spel. I Kodstig blir talen inte samma som i riktig Python, och när din kod rättas körs den många gånger med olika frön. Ett hårdkodat svar går alltså inte igenom.\n\nTips: lägg det som inte är slump i en egen funktion. Den kan du testa, eftersom den alltid ger samma svar för samma indata.",example:`# 1. Hämta slumpmodulen
import random
# 2. Slå en tärning
slag = random.randint(1, 6)
print("Du slog", slag)
# 3. Dra en vinnare
namn = ["Ali", "Maja", "Kim"]
print("Vinnare:", random.choice(namn))
# 4. Blanda listan
random.shuffle(namn)
print(namn)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`import random
lista = [3, 1, 2]
random.shuffle(lista)
print(sorted(lista))`,options:[`[3, 1, 2]`,`Det går inte att veta`,`[1, 2, 3]`],answer:2,out:!0,explain:`shuffle blandar listan, men sorted sorterar den igen. Hur blandningen än blev skrivs [1, 2, 3] ut.`,why:{0:`shuffle har blandat om listan, och sorted lägger den i ordning från minst till störst.`,1:`Blandningen är slumpad, men sorted gör att resultatet alltid blir detsamma.`}},{type:`order`,prompt:`Ordna raderna så att programmet lottar två olika spelare och kontrollerar att de verkligen är två och olika.`,lines:[`import random`,`lag = ["Ali", "Maja", "Kim", "Sam"]`,`lottade = random.sample(lag, 2)`,`print(len(lottade))`,`print(lottade[0] != lottade[1])`],alt:[[`lag = ["Ali", "Maja", "Kim", "Sam"]`,`import random`,`lottade = random.sample(lag, 2)`,`print(len(lottade))`,`print(lottade[0] != lottade[1])`]],output:`2
True`,distractors:[{line:`lottade = random.choice(lag, 2)`,why:`choice väljer bara ett element. För flera olika element används sample.`}],explain:`sample ger alltid olika element, så de två lottade kan aldrig vara samma person. Modulen och listan måste finnas innan sample anropas.`,hint:`Importera och skapa listan först. Längden skrivs ut före jämförelsen.`},{type:`fill`,prompt:`Fyll i funktionen som väljer en färg ur listan.`,code:`import random
färger = ["röd", "grön", "blå"]
val = random.___(färger)
print(val in färger)`,answers:[[`choice`]],output:`True`,explain:`random.choice väljer ett slumpat element ur listan, så valet finns alltid i listan.`,hint:`Engelskans ord för val.`},{type:`choice`,prompt:"Vilka tal kan `random.randint(1, 6)` ge?",options:[`1 till 5`,`1 till 6`,`0 till 6`],answer:1,explain:`randint tar med båda gränserna, så både 1 och 6 kan komma. Precis som en vanlig tärning.`,why:{0:`Det är range(1, 6) som slutar före 6. randint tar med den övre gränsen.`,2:`Den lägre gränsen är 1, så 0 kan aldrig komma.`}},{type:`code`,prompt:"Slå två tärningar och skriv `Du slog X och Y, summa Z`.",starter:`import random
`,runs:[{outputRe:o.join(`|`),repeat:20,expectText:`Du slog X och Y, summa Z, där X och Y är 1 till 6 och Z är deras summa`}],require:[i(`random\\.randint\\s*\\(`,`Slå tärningarna med random.randint().`)],solution:`import random
a = random.randint(1, 6)
b = random.randint(1, 6)
print(f"Du slog {a} och {b}, summa {a + b}")`,explain:`Varje tärning är ett eget anrop till randint. Spara dem i variabler så att du kan använda samma värden i summan.`,hint:`Två variabler med random.randint(1, 6) och en f-sträng.`},{type:`code`,prompt:"Skriv `beskriv(slag)` som returnerar `Sexa! Slå igen.` om slaget är 6 och annars `Du slog X`. Funktionen innehåller ingen slump, så den går att testa. Programmet under använder den med en riktig tärning.",starter:`import random

def beskriv(slag):
    pass

print(beskriv(random.randint(1, 6)))
`,tests:[{fn:`beskriv`,args:[6],expect:`Sexa! Slå igen.`},{fn:`beskriv`,args:[3],expect:`Du slog 3`},{fn:`beskriv`,args:[1],expect:`Du slog 1`,edge:`lägsta slaget`}],solution:`import random

def beskriv(slag):
    if slag == 6:
        return "Sexa! Slå igen."
    return f"Du slog {slag}"

print(beskriv(random.randint(1, 6)))`,explain:`Slumpen ligger utanför funktionen och logiken inne i den. Då kan beskriv testas med vilket slag som helst, och slumpen behöver inte testas alls.`,hint:`En if för 6, annars returneras en f-sträng.`},{type:`code`,prompt:"Lotta turordningen. Blanda listan `spelare` med shuffle och skriv sedan `Tur 1: NAMN`, `Tur 2: NAMN` och så vidare, en rad per spelare.",starter:`import random
spelare = ["Ali", "Maja", "Kim"]
`,runs:[{outputRe:s.join(`|`),repeat:20,expectText:`Tur 1, Tur 2 och Tur 3 med alla tre spelare, var och en en gång`}],require:[i(`random\\.shuffle\\s*\\(`,`Blanda listan med random.shuffle().`)],solution:`import random
spelare = ["Ali", "Maja", "Kim"]
random.shuffle(spelare)
for i in range(len(spelare)):
    print(f"Tur {i + 1}: {spelare[i]}")`,explain:`shuffle blandar listan på plats. Sedan går loopen igenom den och numrerar från 1.`,hint:`random.shuffle(spelare) och sedan en for-loop med range(len(spelare)).`},{type:`code`,prompt:"Dra tre olika lottnummer från 1 till 10. Använd `random.sample` med `range(1, 11)`, sortera dem och skriv `Dragning: [a, b, c]`.",starter:`import random
`,runs:[{outputRe:c.join(`|`),repeat:20,expectText:`Dragning: följt av en sorterad lista med tre olika tal från 1 till 10`}],require:[i(`random\\.sample\\s*\\(`,`Dra numren med random.sample().`)],solution:`import random
nummer = random.sample(range(1, 11), 3)
print("Dragning:", sorted(nummer))`,explain:`sample ger tre olika tal, så samma nummer kan aldrig dras två gånger. sorted gör listan lätt att läsa.`,hint:`random.sample(range(1, 11), 3) och sedan sorted().`}]},{id:`py-modules`,title:`Moduler och import`,tier:2,text:"En **modul** är en fil med färdig kod som någon annan har skrivit och testat. I stället för att uppfinna allt själv lånar du. Du har redan använt `random`. Modulen `math` har matematik som `sqrt` (roten ur), `floor` (avrunda nedåt), `ceil` (avrunda uppåt) och talet `pi`.\n\nDet finns tre sätt att importera:\n\n`import math` hämtar hela modulen. Du skriver `math.sqrt(16)`, och det syns tydligt var funktionen kommer ifrån.\n\n`from math import sqrt` hämtar bara `sqrt`, som du sedan använder utan prefix: `sqrt(16)`. Men nu finns inget namn `math`.\n\n`import math as m` ger modulen ett kortare namn: `m.sqrt(16)`.\n\nSkriv importerna överst, så ser den som läser koden direkt vad programmet behöver.\n\n**Skillnad mot din dator:** i Kodstig finns bara `random` och `math`. En riktig Python har hundratals moduler inbyggda, till exempel för datum, filer och internet. Med verktyget **pip** kan du dessutom installera tusentals till på din egen dator, till exempel `pip install pygame` för att göra spel.",example:`# 1. Hela modulen, används med math. framför
import math
print(math.sqrt(25))
# 2. Bara en funktion, används utan prefix
from math import ceil
print(ceil(7 / 3))
# 3. Ett kortare namn på modulen
import math as m
print(round(m.pi, 2))`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`from math import floor, ceil
print(floor(2.5), ceil(2.1))`,options:[`3 3`,`2 2`,`2 3`],answer:2,out:!0,explain:`floor avrundar alltid nedåt, så 2.5 blir 2. ceil avrundar alltid uppåt, så 2.1 blir 3.`,why:{0:`floor avrundar nedåt, inte till närmaste. 2.5 blir 2.`,1:`ceil avrundar uppåt så fort det finns decimaler. 2.1 blir 3.`}},{type:`order`,prompt:`Ordna raderna så att programmet räknar ut arean av en cirkel med radien 3 och skriver den med en decimal.`,lines:[`import math`,`radie = 3`,`area = math.pi * radie ** 2`,`print(round(area, 1))`],alt:[[`radie = 3`,`import math`,`area = math.pi * radie ** 2`,`print(round(area, 1))`]],output:`28.3`,distractors:[{line:`area = pi * radie ** 2`,why:`Med import math måste du skriva math.pi. Bara pi fungerar efter from math import pi.`}],explain:`Både modulen och radien måste finnas innan arean räknas ut. round(area, 1) avrundar till en decimal.`,hint:`Importen och radien först, sedan uträkningen och sist utskriften.`},{type:`fill`,prompt:`Fyll i ordet som ger modulen ett kortare namn.`,code:`import math ___ m
print(m.floor(3.9))`,answers:[[`as`]],output:`3`,explain:`import math as m gör att modulen heter m i resten av programmet.`,hint:`Ett kort engelskt ord som betyder som.`},{type:`choice`,prompt:`Vad händer?`,code:`from math import sqrt
print(math.sqrt(9))`,options:[`NameError`,`Det skrivs ut 3.0`,`ModuleNotFoundError`],answer:0,explain:`from math import sqrt hämtar bara sqrt. Namnet math finns inte, så math.sqrt ger NameError. Skriv sqrt(9) i stället.`,why:{1:`Det hade fungerat med import math, eller med bara sqrt(9).`,2:`Modulen finns och importen lyckas. Det är namnet math som saknas efteråt.`}},{type:`choice`,prompt:`Du vill göra spel med modulen pygame på din egen dator. Hur får du den?`,options:[`Den går inte att få, Python har bara random och math`,`Du installerar den med pip, till exempel pip install pygame`,`Du skriver import pygame i Kodstig`],answer:1,explain:`pip är Pythons verktyg för att installera moduler som andra har delat. Efter installationen fungerar import pygame på din dator.`,why:{0:`Det är bara i Kodstig som utbudet är begränsat. Riktig Python har massor av moduler.`,2:`Kodstig har bara random och math, så det blir ModuleNotFoundError här.`}},{type:`code`,prompt:"Skriv `hypotenusa(a, b)` som returnerar längden på den långa sidan i en rätvinklig triangel, alltså roten ur a² + b². Använd sqrt från math.",starter:`def hypotenusa(a, b):
    pass
`,tests:[{fn:`hypotenusa`,args:[3,4],expect:5},{fn:`hypotenusa`,args:[5,12],expect:13},{fn:`hypotenusa`,args:[0,0],expect:0,edge:`båda sidorna är 0`}],require:[i(`sqrt\\s*\\(`,`Använd sqrt från math.`)],solution:`import math

def hypotenusa(a, b):
    return math.sqrt(a ** 2 + b ** 2)`,explain:`Pythagoras sats: c är roten ur a² + b². math.sqrt räknar ut roten.`,hint:`import math överst och return math.sqrt(a ** 2 + b ** 2).`},{type:`code`,prompt:"En klass ska åka buss. Skriv `antal_bussar(personer, platser)` som returnerar hur många bussar som behövs. Hämta ceil med `from math import ceil`.",starter:`def antal_bussar(personer, platser):
    return personer // platser
`,tests:[{fn:`antal_bussar`,args:[100,40],expect:3},{fn:`antal_bussar`,args:[80,40],expect:2,edge:`bussarna blir precis fulla`},{fn:`antal_bussar`,args:[1,50],expect:1,edge:`bara en person`},{fn:`antal_bussar`,args:[0,40],expect:0,edge:`inga personer`}],require:[i(`from\\s+math\\s+import\\s+[^\\n]*\\bceil\\b`,`Hämta ceil med from math import ceil.`)],solution:`from math import ceil

def antal_bussar(personer, platser):
    return ceil(personer / platser)`,explain:`100 / 40 är 2.5, och en halv buss går inte att boka. ceil avrundar uppåt till 3. Heltalsdivision med // hade lämnat 20 personer kvar på skolgården.`,hint:`Dela med / och avrunda uppåt med ceil().`},{type:`debug`,prompt:`Programmet kraschar med NameError. Rätta det utan att ändra importraden.`,starter:`import math as m
print(math.floor(7.8))
`,output:`7`,require:[i(`import\\s+math\\s+as\\s+m\\b`,`Behåll raden import math as m.`)],solution:`import math as m
print(m.floor(7.8))`,explain:`Efter import math as m heter modulen m. Namnet math finns inte i programmet.`,hint:`Vad heter modulen efter as?`}]},{id:`py-menu-loop`,title:`Menyer som snurrar`,tier:4,text:"Många program är i grunden en loop: visa en meny, läs ett val, gör det, och börja om. Det gäller allt från en bankomat till inställningarna i ett spel.\n\nDu bygger det med `while True:`, som snurrar tills något säger stopp. Valet läses med `input()` och styrs med `if` och `elif`. Ett av valen gör `break` och avslutar programmet. En `else` sist tar hand om val som inte finns, så att ett felskrivet svar inte gör något konstigt.\n\nTvå vanor gör menyprogram lätta att läsa. Lägg data som ska sparas mellan varven, som en lista eller ordbok, **före** loopen. Annars börjar den om från tom varje varv. Och lägg det som varje val gör i en egen funktion, så att själva loopen blir kort.\n\n**Skillnad mot din dator:** på en riktig dator väntar programmet på dig mellan varven. I Kodstig står alla svar i indatan från början. Tar den slut innan programmet har gjort `break` blir det ett EOFError, så se till att det finns ett sätt att avsluta.",example:`# 1. Listan skapas före loopen så att den sparas
varor = []
# 2. Snurra tills användaren väljer att sluta
while True:
    val = input("1 = lägg till, 2 = visa, 3 = sluta: ")
    # 3. Gör det användaren valde
    if val == "1":
        varor.append(input("Vara? "))
    elif val == "2":
        print("Lista:", ", ".join(varor))
    elif val == "3":
        print("Hej då!")
        break
    else:
        print("Okänt val.")`,exampleInput:`1
mjölk
1
bröd
2
3`,exercises:[{type:`choice`,prompt:"Indatan är `4`, `5`, `klar` och `10`. Vad skrivs ut?",code:`summa = 0
while True:
    s = input()
    if s == "klar":
        break
    summa += int(s)
print(summa)`,input:`4
5
klar
10`,options:[`9`,`19`,`0`],answer:0,out:!0,explain:`4 och 5 läggs till. När klar kommer avbryter break loopen, så 10 läses aldrig.`,why:{1:`Loopen slutar vid klar. Raden 10 efter det läses aldrig.`,2:`De två första talen hinner läggas till innan klar kommer.`}},{type:`order`,prompt:`Ordna raderna så att programmet skriver ut varje val tills användaren skriver q, och sedan skriver Slut.`,input:`a
b
q`,lines:[`while True:`,`    val = input("Val? ")`,`    if val == "q":`,`        break`,`    print("Du valde", val)`,`print("Slut")`],output:`Val? Du valde a
Val? Du valde b
Val? Slut`,distractors:[{line:`    if val = "q":`,why:`Ett likhetstecken sparar ett värde. För att jämföra används ==.`}],explain:`Valet läses först i varje varv. Är det q avbryts loopen innan något skrivs ut, annars skrivs valet ut och loopen börjar om.`,hint:`Läs valet först i loopen. Kontrollen för q ska komma före utskriften.`},{type:`fill`,prompt:`Fyll i luckorna så att loopen snurrar tills användaren svarar nej.`,code:`while ___:
    svar = input("Fortsätta? ")
    if svar == "nej":
        ___
    print("Kör igen")
print("Klart")`,input:`ja
nej`,answers:[[`True`],[`break`]],output:`Fortsätta? Kör igen
Fortsätta? Klart`,explain:`while True snurrar för evigt, och break är det enda som tar programmet ut ur loopen.`,hint:`Villkoret är alltid sant. Ordet som avbryter en loop är engelska för bryt.`},{type:`debug`,prompt:`Poängräknaren tar aldrig slut och kraschar när indatan är slut. Rätta den så att q avslutar loopen och poängen skrivs ut.`,starter:`poäng = 0
while True:
    val = input("+ eller q? ")
    if val == "+":
        poäng += 1
    elif val == "q":
        print("Slut")
print("Poäng:", poäng)
`,runs:[{input:`+
+
q`,output:`+ eller q? + eller q? + eller q? Slut
Poäng: 2`},{input:`q`,output:`+ eller q? Slut
Poäng: 0`}],solution:`poäng = 0
while True:
    val = input("+ eller q? ")
    if val == "+":
        poäng += 1
    elif val == "q":
        print("Slut")
        break
print("Poäng:", poäng)`,explain:`Utan break finns ingen väg ut ur while True. Programmet frågar tills indatan tar slut.`,hint:`En rad saknas direkt efter print("Slut").`},{type:`code`,prompt:"Bygg en ordlista. Fråga `Svenskt ord? ` om och om igen. Skriv ut den engelska översättningen om ordet finns i `glosor`, annars `Finns inte i ordlistan.` Svaret `q` avslutar med `Hej då!`",starter:`glosor = {"hund": "dog", "katt": "cat", "häst": "horse"}
`,runs:[{input:`hund
fisk
katt
q`,output:`Svenskt ord? dog
Svenskt ord? Finns inte i ordlistan.
Svenskt ord? cat
Svenskt ord? Hej då!`},{input:`q`,output:`Svenskt ord? Hej då!`}],require:[i(`while\\s+True\\s*:`,`Använd en while True-loop.`),i(`\\bbreak\\b`,`Avsluta loopen med break.`)],solution:`glosor = {"hund": "dog", "katt": "cat", "häst": "horse"}
while True:
    svenska = input("Svenskt ord? ")
    if svenska == "q":
        print("Hej då!")
        break
    elif svenska in glosor:
        print(glosor[svenska])
    else:
        print("Finns inte i ordlistan.")`,explain:`Kontrollera q först, sedan om ordet finns med in. Ordboken skapas före loopen och används i varje varv.`,hint:`while True, input, och sedan if för q, elif svenska in glosor och else.`},{type:`code`,prompt:"Bygg en bankomat med saldot 100. Fråga `Kommando? `. `saldo` skriver `Saldo: X`. `ta ut` frågar `Belopp? ` och drar av beloppet, eller skriver `Inte tillräckligt.` om det inte räcker. `sluta` avslutar loopen. Allt annat ger `Okänt kommando.`",starter:`saldo = 100
`,runs:[{input:`saldo
ta ut
30
saldo
sluta`,output:`Kommando? Saldo: 100
Kommando? Belopp? Kommando? Saldo: 70
Kommando? `},{input:`ta ut
150
hej
ta ut
100
saldo
sluta`,output:`Kommando? Belopp? Inte tillräckligt.
Kommando? Okänt kommando.
Kommando? Belopp? Kommando? Saldo: 0
Kommando? `}],require:[i(`while\\s+True\\s*:`,`Använd en while True-loop.`)],solution:`saldo = 100
while True:
    kommando = input("Kommando? ")
    if kommando == "saldo":
        print("Saldo:", saldo)
    elif kommando == "ta ut":
        belopp = int(input("Belopp? "))
        if belopp <= saldo:
            saldo -= belopp
        else:
            print("Inte tillräckligt.")
    elif kommando == "sluta":
        break
    else:
        print("Okänt kommando.")`,explain:`saldo skapas före loopen och ändras i den, så uttaget syns nästa gång du frågar efter saldot. Att ta ut precis hela saldot är tillåtet.`,hint:`En if och elif per kommando. ta ut gör en egen input() för beloppet och jämför med saldo.`},{type:`code`,prompt:"Läs in provpoäng med frågan `Poäng? ` tills användaren skriver `klar`. Svar som inte är heltal ger `Bara heltal.` och räknas inte. Skriv till sist `Antal: N, snitt: X` med snittet avrundat till en decimal, eller `Inga poäng.` om inget giltigt tal kom in. Räkna ut snittet i en egen funktion `snitt(lista)`.",starter:`def snitt(lista):
    pass

poäng = []
`,runs:[{input:`10
7
klar`,output:`Poäng? Poäng? Poäng? Antal: 2, snitt: 8.5`},{input:`5
tio
6
6
klar`,output:`Poäng? Poäng? Bara heltal.
Poäng? Poäng? Poäng? Antal: 3, snitt: 5.7`},{input:`klar`,output:`Poäng? Inga poäng.`}],require:[i(`def\\s+snitt\\s*\\(`,`Räkna ut snittet i funktionen snitt(lista).`),i(`except\\s+ValueError`,`Fånga felaktiga svar med except ValueError.`)],solution:`def snitt(lista):
    return round(sum(lista) / len(lista), 1)

poäng = []
while True:
    svar = input("Poäng? ")
    if svar == "klar":
        break
    try:
        poäng.append(int(svar))
    except ValueError:
        print("Bara heltal.")
if len(poäng) == 0:
    print("Inga poäng.")
else:
    print(f"Antal: {len(poäng)}, snitt: {snitt(poäng)}")`,explain:`Kolla klar innan du försöker göra om svaret till ett tal. try fångar resten av de felaktiga svaren. En tom lista måste hanteras för sig, annars blir det division med noll.`,hint:`Läs svaret, break vid klar, annars append(int(svar)) i try. Kolla om listan är tom efter loopen.`}]},{id:`py-io-project`,title:`Miniprojekt: gissa talet och en budget`,tier:5,text:`Nu bygger du två riktiga program som pratar med användaren: ett spel och ett vardagsverktyg.

Först kommer **gissa talet**. Datorn tänker på ett tal från 1 till 100 och du får ledtrådar tills du gissar rätt. Du börjar med logiken i en funktion som går att testa, och bygger sedan spelet runt den med slump, indata, try och en räknare.

Sedan bygger du en **hushållsbudget**. Den håller koll på inkomster och utgifter per kategori, till exempel mat och nöje, och visar vad som är kvar. Även här skriver du först funktionerna och sist menyn som använder dem.

Det är så riktiga program byggs: små delar som går att testa var för sig, och ett tunt lager som pratar med användaren. När allt fungerar i Kodstig kan du köra samma kod på din egen dator och spela på riktigt.`,example:`# 1. Ett hemligt tal, från 1 till 5 i exemplet så att det går fort
import random
hemligt = random.randint(1, 5)
# 2. Räkna försöken
försök = 0
while True:
    gissning = int(input("Gissa: "))
    försök += 1
    # 3. Avbryt vid rätt gissning
    if gissning == hemligt:
        print("Rätt på", försök, "försök!")
        break`,exampleInput:`1
2
3
4
5`,exercises:[{type:`code`,prompt:"Del 1: Skriv `ledtråd(gissning, hemligt)` som returnerar `För lågt`, `För högt` eller `Rätt!`.",starter:`def ledtråd(gissning, hemligt):
    pass
`,tests:[{fn:`ledtråd`,args:[10,50],expect:`För lågt`},{fn:`ledtråd`,args:[80,50],expect:`För högt`},{fn:`ledtråd`,args:[50,50],expect:`Rätt!`,edge:`rätt gissning`},{fn:`ledtråd`,args:[49,50],expect:`För lågt`,edge:`precis under`}],solution:`def ledtråd(gissning, hemligt):
    if gissning < hemligt:
        return "För lågt"
    elif gissning > hemligt:
        return "För högt"
    return "Rätt!"`,explain:`Funktionen har ingen slump och ingen input, så den går att testa med exakta värden. Spelet i del 2 litar på den.`,hint:`if för mindre än, elif för större än, och annars Rätt!.`},{type:`code`,prompt:"Del 2: Bygg spelet. Slumpa ett hemligt tal från 1 till 100. Fråga `Gissa: ` tills gissningen är rätt. Ett svar som inte är ett heltal ger `Skriv ett heltal.` och räknas inte som försök. En fel gissning skriver ut ledtråden. Vid rätt gissning skrivs `Rätt på N försök!` och spelet slutar.",starter:`import random

def ledtråd(gissning, hemligt):
    if gissning < hemligt:
        return "För lågt"
    elif gissning > hemligt:
        return "För högt"
    return "Rätt!"

hemligt = random.randint(1, 100)
`,runs:[{input:u,outputRe:l(`Gissa: Skriv ett heltal.
`,`Gissa: För lågt
`),repeat:10,expectText:`Skriv ett heltal. för abc, sedan För lågt tills rätt tal, och sist Rätt på N försök! där N är antalet riktiga gissningar`},{input:d,outputRe:l(``,`Gissa: För högt
`),repeat:10,expectText:`För högt tills rätt tal, och sist Rätt på N försök!`}],require:[i(`random\\.randint\\s*\\(\\s*1\\s*,\\s*100\\s*\\)`,`Slumpa talet med random.randint(1, 100).`),i(`except\\s+ValueError`,`Fånga svar som inte är tal med except ValueError.`),i(`ledtråd\\s*\\(\\s*\\w`,`Använd ledtråd() från del 1.`)],solution:`import random

def ledtråd(gissning, hemligt):
    if gissning < hemligt:
        return "För lågt"
    elif gissning > hemligt:
        return "För högt"
    return "Rätt!"

hemligt = random.randint(1, 100)
försök = 0
while True:
    try:
        gissning = int(input("Gissa: "))
    except ValueError:
        print("Skriv ett heltal.")
    else:
        försök += 1
        if gissning == hemligt:
            print(f"Rätt på {försök} försök!")
            break
        print(ledtråd(gissning, hemligt))`,explain:`Programmet testas med gissningarna 1, 2, 3 och uppåt, och 100, 99 och nedåt, med många olika hemliga tal. Bara ett spel som verkligen räknar försöken och slutar vid rätt tal klarar alla körningar. Räknaren ökas efter omvandlingen, så felaktiga svar räknas inte.`,hint:`försök = 0 före loopen. I loopen: try med int(input("Gissa: ")), except ValueError, och i else öka försök och jämför med hemligt.`},{type:`code`,prompt:"Del 3: Skriv budgetens funktioner. `lägg_till(utgifter, kategori, belopp)` lägger till beloppet på kategorin i ordboken (nya kategorier börjar på 0) och returnerar kategorins nya summa. `rapport(inkomst, utgifter)` returnerar en lista med rader: en rad `kategori: summa` per kategori med störst summa först och vid lika i bokstavsordning, och sist raden `Kvar: X`.",starter:`def lägg_till(utgifter, kategori, belopp):
    pass

def rapport(inkomst, utgifter):
    pass
`,tests:[{fn:`lägg_till`,args:[{mat:300},`mat`,150],expect:450},{fn:`lägg_till`,args:[{},`nöje`,99],expect:99,edge:`ny kategori`},{fn:`rapport`,args:[1e3,{mat:450,nöje:200,buss:200}],expect:[`mat: 450`,`buss: 200`,`nöje: 200`,`Kvar: 150`]},{fn:`rapport`,args:[500,{}],expect:[`Kvar: 500`],edge:`inga utgifter`},{fn:`rapport`,args:[100,{mat:250}],expect:[`mat: 250`,`Kvar: -150`],edge:`mer utgifter än inkomst`}],require:[i(`key\\s*=`,`Sortera med key=.`)],solution:`def lägg_till(utgifter, kategori, belopp):
    utgifter[kategori] = utgifter.get(kategori, 0) + belopp
    return utgifter[kategori]

def rapport(inkomst, utgifter):
    par = sorted(utgifter.items(), key=lambda p: (-p[1], p[0]))
    rader = [f"{k}: {s}" for k, s in par]
    kvar = inkomst - sum(utgifter.values())
    rader.append(f"Kvar: {kvar}")
    return rader`,explain:`get(kategori, 0) gör att nya kategorier börjar på noll. Med -p[1] i key hamnar största summan först, och p[0] avgör vid lika. Ett negativt Kvar visar att budgeten inte går ihop.`,hint:`Använd utgifter.get(kategori, 0). Sortera items() med key=lambda p: (-p[1], p[0]) och räkna kvar med sum(utgifter.values()).`},{type:`code`,prompt:"Del 4: Bygg menyn. Fråga `Val (in/ut/visa/sluta)? `. `in` frågar `Belopp? ` och lägger till på inkomsten. `ut` frågar `Kategori? ` och `Belopp? ` och använder lägg_till. Ett belopp som inte är ett heltal ger `Ogiltigt belopp.` och ingenting ändras. `visa` skriver ut raderna från rapport, en per rad. `sluta` avslutar. Allt annat ger `Okänt val.`",starter:`def lägg_till(utgifter, kategori, belopp):
    utgifter[kategori] = utgifter.get(kategori, 0) + belopp
    return utgifter[kategori]

def rapport(inkomst, utgifter):
    par = sorted(utgifter.items(), key=lambda p: (-p[1], p[0]))
    rader = [f"{k}: {s}" for k, s in par]
    kvar = inkomst - sum(utgifter.values())
    rader.append(f"Kvar: {kvar}")
    return rader

inkomst = 0
utgifter = {}
`,runs:[{input:`in
1000
ut
mat
300
ut
nöje
200
ut
mat
150
visa
sluta`,output:`Val (in/ut/visa/sluta)? Belopp? Val (in/ut/visa/sluta)? Kategori? Belopp? Val (in/ut/visa/sluta)? Kategori? Belopp? Val (in/ut/visa/sluta)? Kategori? Belopp? Val (in/ut/visa/sluta)? mat: 450
nöje: 200
Kvar: 350
Val (in/ut/visa/sluta)? `},{input:`in
tusen
ut
buss
50
hjälp
visa
sluta`,output:`Val (in/ut/visa/sluta)? Belopp? Ogiltigt belopp.
Val (in/ut/visa/sluta)? Kategori? Belopp? Val (in/ut/visa/sluta)? Okänt val.
Val (in/ut/visa/sluta)? buss: 50
Kvar: -50
Val (in/ut/visa/sluta)? `},{input:`visa
sluta`,output:`Val (in/ut/visa/sluta)? Kvar: 0
Val (in/ut/visa/sluta)? `}],require:[i(`while\\s+True\\s*:`,`Använd en while True-loop.`),i(`except\\s+ValueError`,`Fånga ogiltiga belopp med except ValueError.`),i(`lägg_till\\s*\\(\\s*utgifter`,`Använd lägg_till() för utgifterna.`),i(`rapport\\s*\\(\\s*inkomst`,`Använd rapport() för att visa budgeten.`)],solution:`def lägg_till(utgifter, kategori, belopp):
    utgifter[kategori] = utgifter.get(kategori, 0) + belopp
    return utgifter[kategori]

def rapport(inkomst, utgifter):
    par = sorted(utgifter.items(), key=lambda p: (-p[1], p[0]))
    rader = [f"{k}: {s}" for k, s in par]
    kvar = inkomst - sum(utgifter.values())
    rader.append(f"Kvar: {kvar}")
    return rader

inkomst = 0
utgifter = {}
while True:
    val = input("Val (in/ut/visa/sluta)? ")
    if val == "in":
        try:
            inkomst += int(input("Belopp? "))
        except ValueError:
            print("Ogiltigt belopp.")
    elif val == "ut":
        kategori = input("Kategori? ")
        try:
            lägg_till(utgifter, kategori, int(input("Belopp? ")))
        except ValueError:
            print("Ogiltigt belopp.")
    elif val == "visa":
        for rad in rapport(inkomst, utgifter):
            print(rad)
    elif val == "sluta":
        break
    else:
        print("Okänt val.")`,explain:`Menyn gör nästan ingen egen logik. Den läser svar, fångar felaktiga belopp och lämnar resten till funktionerna från del 3. Därför är den lätt att ändra, till exempel om du vill lägga till ett val för att ta bort en kategori.`,hint:`En while True med if och elif för varje val. Lägg try runt int(input("Belopp? ")) i både in och ut.`}]}]}],p=(e,t)=>({re:e,msg:t}),m={id:`python`,name:`Python`,lang:`python`,chapters:[{id:`py1`,title:`Börja med grunderna`,lessons:[{id:`py-print`,title:`Din första kodrad`,tier:1,text:`Ett program är instruktioner som datorn följer uppifrån och ner.

\`print()\` skriver ut det du ger den. Text skrivs mellan citattecken, och tal kan skrivas direkt.`,example:`# 1. Skriv ut text
print("Hej, kodare!")
# 2. Skriv ut ett tal
print(42)
# 3. Skriv ut flera värden
print("Två", "ord")`,exercises:[{type:`choice`,prompt:`Vad skriver programmet ut?`,code:`print("Kodstig")`,options:[`Kodstig`,`"Kodstig"`,`print`],answer:0,out:!0,explain:`Citattecknen visar var texten börjar och slutar. De skrivs inte ut.`,why:{1:`Citattecknen visar bara Python var texten börjar och slutar. De är inte en del av själva texten.`,2:`print är namnet på funktionen som gör utskriften. Det som skrivs ut är det som står inom parentesen.`}},{type:`fill`,prompt:`Fyll i det som saknas så att programmet skriver ut Hej!`,code:`___("Hej!")`,answers:[[`print`]],output:`Hej!`,explain:`print skrivs med små bokstäver.`,hint:`Funktionen som skriver ut heter print.`},{type:`choice`,prompt:`Vad skrivs ut?`,code:`print("A", "B", "C")`,options:[`ABC`,`A B C`,`A, B, C`],answer:1,out:!0,explain:`När print får flera värden skrivs de ut med ett mellanslag emellan.`,why:{0:`print klistrar inte ihop värdena tätt. När den får flera värden lägger den något emellan dem.`,2:`Kommatecknen skiljer bara värdena åt i koden. De skrivs inte ut.`}},{type:`code`,prompt:"Skriv ett program som skriver ut `Jag heter Milo` och `Jag gillar bambu` på varsin rad.",starter:`# Skriv din kod här
`,output:`Jag heter Milo
Jag gillar bambu`,solution:`print("Jag heter Milo")
print("Jag gillar bambu")`,explain:`Varje print ger en egen rad, i samma ordning som i koden.`,hint:`Använd två print-rader.`}]},{id:`py-var`,title:`Variabler`,tier:1,text:"En **variabel** är ett namn som pekar på ett värde. `steg = 1` betyder: låt namnet `steg` stå för värdet 1.\n\nDu kan ge variabeln ett nytt värde när som helst. Det senaste värdet gäller.",example:`# 1. Skapa variabeln
steg = 1
print(steg)
# 2. Öka och skriv ut igen
steg = steg + 1
print(steg)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`poäng = 3
poäng = 7
print(poäng)`,options:[`3`,`7`,`10`],answer:1,out:!0,explain:`Variabeln får först 3 och sedan 7. Det senaste värdet gäller.`,why:{0:`En variabel minns inte sitt gamla värde när den får ett nytt. Tänk på vilket värde som sattes sist.`,2:`Ett nytt värde läggs inte ihop med det gamla. Det ersätter det gamla.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`steg = 1
print(steg + 2)`,options:[`steg + 2`,`12`,`3`],answer:2,out:!0,explain:`steg står för 1, och 1 + 2 är 3.`,why:{0:`Utan citattecken är steg + 2 ingen text. Python räknar ut uttrycket i stället.`,1:`steg är ett tal, inte text. Då sätter + inte ihop siffror utan räknar ihop dem.`}},{type:`fill`,prompt:`Ge variabeln namn värdet "Ada" så att programmet skriver ut Ada.`,code:`namn ___ "Ada"
print(namn)`,answers:[[`=`]],output:`Ada`,explain:`Ett likhetstecken ger variabeln ett värde.`},{type:`code`,prompt:"Skapa variabeln `ålder` med värdet 12 och skriv ut den. Öka den sedan med 1 (med hjälp av variabeln själv) och skriv ut den igen.",starter:``,output:`12
13`,solution:`ålder = 12
print(ålder)
ålder = ålder + 1
print(ålder)`,require:[p(`ålder\\s*(=\\s*ålder\\s*\\+\\s*1|\\+=\\s*1)`,`Öka variabeln med ålder = ålder + 1 eller ålder += 1.`)],explain:`ålder = ålder + 1 läses: ta det gamla värdet, lägg till 1 och spara resultatet.`,hint:`Skriv ålder = ålder + 1 mellan utskrifterna.`}]},{id:`py-math`,title:`Räkna med Python`,tier:1,text:"Python räknar med `+`, `-`, `*` och `/`. Vanlig division ger alltid ett decimaltal: `6 / 2` blir `3.0`.\n\n`//` ger heltalsdivision och `%` ger resten. `**` betyder upphöjt till.",example:`# 1. Plus och vanlig division
print(7 + 2)
print(7 / 2)
# 2. Heltalsdivision och rest
print(7 // 2)
print(7 % 2)
# 3. Upphöjt till
print(2 ** 3)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`print(2 + 3 * 4)`,options:[`20`,`14`,`24`],answer:1,out:!0,explain:`Multiplikation räknas före addition: 3 * 4 = 12, sedan 2 + 12.`,why:{0:`Python räknar inte bara från vänster till höger. Multiplikation går före addition, precis som i matten.`,2:`Mellan 2 och resten står ett plustecken, inte ett gångertecken. Räkna ut 3 * 4 först.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`print(9 / 3)`,options:[`3`,`3.0`,`3.3`],answer:1,out:!0,explain:`Vanlig division med / ger alltid ett decimaltal i Python.`,why:{0:`Även när divisionen går jämnt ut ger / ett decimaltal i Python. Heltal får du med //.`,2:`9 delat med 3 går jämnt ut, så det finns inga decimaler att visa. Frågan är vilken typ svaret får.`}},{type:`fill`,prompt:`Använd operatorn för heltalsdivision så att svaret blir 3.`,code:`print(10 ___ 3)`,answers:[[`//`]],output:`3`,explain:`// delar och kastar bort decimalerna.`,hint:`Heltalsdivision skrivs med två snedstreck.`},{type:`code`,prompt:`En pizza har 8 bitar och ni är 3 personer. Skriv ut hur många hela bitar var och en får, och sedan hur många bitar som blir över.`,starter:`bitar = 8
personer = 3
`,output:`2
2`,solution:`bitar = 8
personer = 3
print(bitar // personer)
print(bitar % personer)`,require:[p(`bitar\\s*//\\s*personer`,`Räkna ut svaret med variablerna, till exempel bitar // personer.`)],explain:`// ger hela bitar och % det som blir över.`,hint:`Använd // och %.`}]},{id:`py-text`,title:`Text och f-strängar`,tier:1,text:"Text kallas `str` i Python. Du kan sätta ihop text med `+`, men bara text med text.\n\nEn **f-sträng** gör det enklare: sätt `f` före citattecknet och skriv variabler inom `{ }`. Då blandas text och tal utan problem.",example:`# 1. Spara namn och år
namn = "Ada"
år = 1815
# 2. Sätt ihop med +
print("Hej " + namn)
# 3. Använd en f-sträng
print(f"{namn} föddes {år}.")`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`djur = "panda"
print("En " + djur + "!")`,options:[`En panda!`,`En djur!`,`En+panda+!`],answer:0,out:!0,explain:`Variabeln ersätts av sitt värde och + sätter ihop texterna.`,why:{1:`djur står utanför citattecknen, så det är en variabel. Python använder variabelns värde, inte dess namn.`,2:`Plustecknen står utanför citattecknen och sätter ihop texterna. De skrivs inte ut själva.`}},{type:`choice`,prompt:'Vad händer när `print("Ålder: " + 12)` körs?',options:[`Ålder: 12 skrivs ut`,`Ett TypeError, eftersom text och tal inte kan läggas ihop med +`,`Ålder: skrivs ut`],answer:1,explain:`Python vägrar gissa. Använd str(12) eller en f-sträng.`,why:{0:`Python gör inte om talet till text av sig själv. Text och tal går inte att lägga ihop med +.`,2:`Python hoppar inte över det som inte passar. Hela uttrycket måste gå att räkna ut innan något skrivs ut.`}},{type:`fill`,prompt:`Gör raden till en f-sträng så att den skriver ut Hej Mo.`,code:`namn = "Mo"
print(___"Hej {namn}")`,answers:[[`f`]],output:`Hej Mo`,explain:`f före citattecknet gör att {namn} byts ut mot variabelns värde.`},{type:`code`,prompt:'Skapa `stad = "Malmö"` och `grader = 18`. Skriv ut exakt: `I Malmö är det 18 grader.`',starter:``,output:`I Malmö är det 18 grader.`,solution:`stad = "Malmö"
grader = 18
print(f"I {stad} är det {grader} grader.")`,require:[p(`\\{stad\\}|\\+\\s*stad|stad\\s*,`,`Använd variabeln stad i utskriften.`),p(`\\{grader\\}|str\\(grader\\)|grader\\s*,`,`Använd variabeln grader i utskriften.`)],explain:`f-strängen visar tydligt hur den färdiga meningen kommer att se ut.`,hint:`print(f"I {stad} är det {grader} grader.")`}]}]},{id:`py2`,title:`Beslut & upprepning`,lessons:[{id:`py-bool`,title:`Sant, falskt och jämförelser`,tier:1,text:"Ett **booleskt värde** är antingen `True` eller `False` (med stor bokstav i Python).\n\nJämförelser ger booleska värden: `>`, `<`, `>=`, `<=`, `==` (lika med) och `!=` (inte lika med).",example:`# 1. Spara åldern
ålder = 15
# 2. Jämför tal
print(ålder >= 13)
print(ålder == 20)
# 3. Jämför text
print("kod" != "Kod")`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`x = 5
print(x > 3)`,options:[`True`,`False`,`5`],answer:0,out:!0,explain:`5 är större än 3.`,why:{1:`Läs > som "är större än". Stämmer det att 5 är större än 3?`,2:`En jämförelse ger inte tillbaka talet. Den svarar alltid True eller False.`}},{type:`choice`,prompt:`Vilken rad jämför om svar är 42?`,options:[`svar = 42`,`svar == 42`,`svar := 42`],answer:1,explain:`== jämför, = ger ett värde.`,why:{0:`Ett enkelt likhetstecken ger variabeln ett värde. Det jämför ingenting.`,2:`:= sparar också ett värde, fast inne i ett uttryck. För att jämföra behövs ett annat tecken.`}},{type:`fill`,prompt:`Fyll i operatorn så att programmet skriver ut True när lösenordet INTE är "1234".`,code:`lösen = "panda"
print(lösen ___ "1234")`,answers:[[`!=`]],output:`True`,explain:`!= betyder ”inte lika med”.`}]},{id:`py-if`,title:`if, elif och else`,tier:1,text:"`if` kör ett block bara när villkoret är sant. Raden slutar med kolon `:` och blocket dras in med fyra mellanslag.\n\n`elif` testar ett nytt villkor och `else` tar hand om resten. Python kör bara det **första** blocket som stämmer.",example:`# 1. Spara poängen
poäng = 72
# 2. Välj meddelande efter poäng
if poäng >= 90:
    print("Toppen")
elif poäng >= 50:
    print("Godkänt")
else:
    print("Försök igen")`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`poäng = 4
if poäng > 5:
    print("Bra!")
print("Slut")`,options:[`Bra!
Slut`,`Slut`,`Bra!`],answer:1,out:!0,explain:`Villkoret är falskt, så det indragna blocket hoppas över. Den sista raden är inte indragen och körs alltid.`,why:{0:`4 är inte större än 5, så villkoret är falskt och den indragna raden hoppas över.`,2:`print("Slut") är inte indragen och hör därför inte till if. Den körs alltid.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`ålder = 70
if ålder >= 18:
    print("vuxen")
elif ålder >= 65:
    print("pensionär")`,options:[`vuxen`,`pensionär`,`vuxen
pensionär`],answer:0,out:!0,explain:`Första sanna villkoret vinner. Ordningen spelar roll!`,why:{1:`Python testar villkoren uppifrån. Det första som stämmer vinner, även om ett senare också stämmer.`,2:`Ett elif körs bara om allt ovanför var falskt. Högst en gren i en if-kedja körs.`}},{type:`debug`,prompt:"Programmet ska skriva ut `Grattis!` när poäng är 10, men går inte att köra. Rätta felet.",starter:`poäng = 10
if poäng == 10
    print("Grattis!")`,output:`Grattis!`,solution:`poäng = 10
if poäng == 10:
    print("Grattis!")`,explain:`Rader som startar ett block avslutas med kolon.`,hint:`Titta på slutet av if-raden.`},{type:`code`,prompt:"För `temp = 8`: skriv ut `Kallt` under 10, `Lagom` från 10 till och med 22, annars `Varmt`. Använd if, elif och else.",starter:`temp = 8
`,output:`Kallt`,solution:`temp = 8
if temp < 10:
    print("Kallt")
elif temp <= 22:
    print("Lagom")
else:
    print("Varmt")`,require:[p(`\\belif\\b`,`Använd elif för det mellersta fallet.`),p(`\\belse\\s*:`,`Avsluta med else.`)],explain:`När temp < 10 redan är hanterat behöver elif bara den övre gränsen.`,hint:`Testa temp < 10, sedan temp <= 22, och resten med else.`}]},{id:`py-while`,title:`while-loopar`,tier:1,text:"En `while`-loop upprepar sitt block så länge villkoret är sant.\n\nNågot i blocket måste ändra villkoret, annars slutar loopen aldrig. `i += 1` ökar `i` med 1.",example:`# 1. Sätt startvärdet
i = 1
# 2. Upprepa så länge i <= 3
while i <= 3:
    print(i)
    # 3. Öka räknaren
    i += 1`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`n = 3
while n > 0:
    print(n)
    n -= 1`,options:[`3
2
1`,`3
2
1
0`,`1
2
3`],answer:0,out:!0,explain:`När n blir 0 är n > 0 falskt och loopen slutar.`,why:{1:`När n blir 0 är n > 0 falskt, så loopen slutar innan 0 hinner skrivas ut.`,2:`n börjar på 3 och minskar varje varv. Utskriften följer n, så den går nedåt.`}},{type:`choice`,prompt:`Hur många gånger skrivs Hej ut?`,code:`i = 0
while i < 4:
    print("Hej")
    i += 2`,options:[`4`,`2`,`3`],answer:1,explain:`i blir 0, 2, sedan 4. Två varv.`,why:{0:`i ökar med 2 varje varv, inte med 1. Följ värdet på i från 0 och uppåt.`,2:`När i blir 4 är i < 4 falskt. Räkna hur många värden i hinner få som är under 4.`}},{type:`debug`,prompt:`Loopen ska skriva ut 1 till 3 men tar aldrig slut. Rätta den.`,starter:`i = 1
while i <= 3:
    print(i)`,output:`1
2
3`,solution:`i = 1
while i <= 3:
    print(i)
    i += 1`,explain:`Utan i += 1 förblir i lika med 1 för alltid.`,hint:`Vilken rad borde ändra i?`},{type:`code`,prompt:`Använd en while-loop för att skriva ut 10, 20, 30, 40 och 50 på varsin rad.`,starter:``,output:`10
20
30
40
50`,solution:`tal = 10
while tal <= 50:
    print(tal)
    tal += 10`,require:[p(`\\bwhile\\b`,`Uppgiften övar while.`)],explain:`Variabeln växer med 10 tills villkoret inte längre gäller.`,hint:`Börja på 10 och öka med tal += 10.`}]},{id:`py-for`,title:`for och range`,tier:1,text:"`for` går igenom en följd av värden. `range(5)` ger talen 0, 1, 2, 3, 4 – alltså fem tal, men inte 5.\n\n`range(1, 4)` ger 1, 2, 3. Ett tredje värde anger steget: `range(0, 10, 2)` ger 0, 2, 4, 6, 8.",example:`# 1. Räkna varv från 0
for i in range(3):
    print(f"Varv {i}")
# 2. Räkna nedåt i steg
for tal in range(10, 0, -5):
    print(tal)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`for i in range(1, 5):
    print(i, end="")`,options:[`1234`,`12345`,`01234`],answer:0,out:!0,explain:`range(1, 5) slutar före 5. end="" gör att allt hamnar på samma rad.`,why:{1:`range stannar före slutvärdet. range(1, 5) tar inte med 5.`,2:`När range får ett startvärde börjar den där, inte på 0.`}},{type:`fill`,prompt:`Fyll i så att loopen skriver ut 0, 1, 2, 3, 4.`,code:`for i in range(___):
    print(i)`,answers:[[`5`,`0, 5`,`0,5`]],output:`0
1
2
3
4`,explain:`range(5) ger fem tal, från 0 till 4.`},{type:`choice`,prompt:"Vilka tal ger `range(0, 10, 3)`?",options:[`0, 3, 6, 9`,`0, 3, 6`,`3, 6, 9`],answer:0,explain:`Start 0, steg 3, och 9 är fortfarande mindre än 10.`,why:{1:`Slutvärdet 10 räknas inte med, men 9 är mindre än 10. Kommer 9 med då?`,2:`Startvärdet räknas alltid med. range börjar på sitt första tal.`}},{type:`code`,prompt:"Skriv ut 3-gångertabellen: `3 x 1 = 3` till och med `3 x 5 = 15`. Använd en for-loop.",starter:``,output:`3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15`,solution:`for i in range(1, 6):
    print(f"3 x {i} = {3 * i}")`,require:[p(`\\bfor\\b`,`Använd en for-loop.`)],explain:`En f-sträng kan innehålla uträkningar: {3 * i}.`,hint:`for i in range(1, 6): och sedan print(f"3 x {i} = {3 * i}").`}]}]},{id:`py3`,title:`Små byggprojekt`,lessons:[{id:`py-list`,title:`Listor`,tier:1,text:'En **lista** håller flera värden i ordning: `frukter = ["äpple", "päron", "kiwi"]`.\n\nVärdena nås med **index** som börjar på 0. `frukter[-1]` är det sista. `len(frukter)` ger antalet, och `append` lägger till sist.',example:`# 1. Skapa listan
frukter = ["äpple", "päron", "kiwi"]
# 2. Hämta första och sista
print(frukter[0])
print(frukter[-1])
# 3. Lägg till och räkna
frukter.append("mango")
print(len(frukter))`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`tal = [10, 20, 30]
print(tal[1])`,options:[`10`,`20`,`30`],answer:1,out:!0,explain:`Index börjar på 0.`,why:{0:`10 ligger på index 0. Index räknas från 0, så index 1 är nästa plats.`,2:`30 ligger på index 2. Index räknas från 0, så index 1 är den andra platsen.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`tal = [4, 8, 15]
print(tal[-1])`,options:[`4`,`15`,`Ett fel`],answer:1,out:!0,explain:`-1 räknar bakifrån, så det är sista elementet.`,why:{0:`4 ligger först, på index 0. Ett minus betyder att Python räknar bakifrån.`,2:`Negativa index är tillåtna i Python. De räknar från slutet av listan.`}},{type:`fill`,prompt:`Lägg till "kiwi" sist i listan.`,code:`frukt = ["äpple"]
frukt.___("kiwi")
print(frukt)`,answers:[[`append`]],output:`['äpple', 'kiwi']`,explain:`append lägger till ett element sist.`},{type:`code`,prompt:"Skapa listan `dagar` med talen 1 till 7. Ändra första elementet till 0 och skriv ut första och sista elementet på varsin rad.",starter:``,output:`0
7`,solution:`dagar = [1, 2, 3, 4, 5, 6, 7]
dagar[0] = 0
print(dagar[0])
print(dagar[-1])`,require:[p(`dagar\\s*\\[\\s*0\\s*\\]\\s*=`,`Ändra första elementet med dagar[0] = 0.`)],explain:`Ett element ändras genom att tilldela till dess index.`,hint:`dagar[0] = 0 och dagar[-1] för det sista.`}]},{id:`py-listloop`,title:`Loopa över listor`,tier:2,text:`\`for tal in lista:\` ger dig varje element i tur och ordning.

En variabel som samlar ett resultat, till exempel en summa eller ett antal, skapas **före** loopen och används efter den.`,example:`# 1. Lista och startsumma
tal = [3, 5, 2]
summa = 0
# 2. Lägg ihop varje tal
for t in tal:
    summa += t
# 3. Skriv ut summan
print(summa)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`ord = ["kod", "stig"]
for o in ord:
    print(o, end="")`,options:[`kodstig`,`kod stig`,`o o`],answer:0,out:!0,explain:`o får varje element i tur och ordning.`,why:{1:`end="" byter ut radbrytningen mot ingenting, så det blir inget mellanslag mellan orden.`,2:`o är loopvariabeln och står utan citattecken. Den får värdet på varje element i tur och ordning.`}},{type:`fill`,prompt:`Fyll i nyckelordet mellan variabeln och listan.`,code:`for t ___ [1, 2, 3]:
    print(t * 10)`,answers:[[`in`]],output:`10
20
30`,explain:`for t in lista läses ”för varje t i listan”.`},{type:`debug`,prompt:`Summan ska bli 12 men programmet skriver fel. Rätta det.`,starter:`tal = [2, 4, 6]
for t in tal:
    summa = 0
    summa += t
    print(summa)`,output:`12`,solution:`tal = [2, 4, 6]
summa = 0
for t in tal:
    summa += t
print(summa)`,explain:`summa måste skapas före loopen, och skrivas ut efter den.`,hint:`Var skapas summa, och vilken indragning har print?`},{type:`code`,prompt:"Räkna hur många tal i `[3, 12, 7, 20, 15]` som är större än 10 och skriv ut antalet.",starter:`tal = [3, 12, 7, 20, 15]
`,output:`3`,solution:`tal = [3, 12, 7, 20, 15]
antal = 0
for t in tal:
    if t > 10:
        antal += 1
print(antal)`,require:[p(`\\bfor\\b`,`Gå igenom listan med en for-loop.`)],forbid:[p(`print\\s*\\(\\s*3\\s*\\)`,`Räkna fram svaret i stället för att skriva 3.`)],explain:`En räknare som ökar inne i ett if kombinerar loop och villkor.`,hint:`Skapa antal = 0 före loopen och öka när t > 10.`}]},{id:`py-strmeth`,title:`Textmetoder`,tier:2,text:'Text har inbyggda metoder: `upper()`, `lower()`, `strip()` (tar bort mellanslag i kanterna) och `replace(gammal, ny)`.\n\n`split()` delar upp text i en lista, och `"-".join(lista)` sätter ihop en lista till text. Text kan indexeras och delas: `"kodstig"[0:3]` är `"kod"`.',example:`# 1. Ta bort mellanslag
ord = "  Kodstig "
rent = ord.strip()
# 2. Stora bokstäver och längd
print(rent.upper())
print(len(rent))
# 3. Dela och sätt ihop
print("a b c".split())
print("-".join(["a", "b"]))`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`s = "Panda"
print(s.lower() + str(len(s)))`,options:[`panda5`,`PANDA5`,`panda 5`],answer:0,out:!0,explain:`lower ger "panda" och len är 5.`,why:{1:`lower() gör om till små bokstäver. Det är upper() som gör stora.`,2:`+ sätter ihop text precis som den är. Det läggs inte till något mellanslag.`}},{type:`fill`,prompt:`Ta bort mellanslagen runt texten.`,code:`text = "  hej  "
print(text.___())`,answers:[[`strip`]],output:`hej`,explain:`strip() tar bort blanksteg i början och slutet.`},{type:`code`,prompt:'Skriv `stor_först(namn)` som returnerar namnet med stor första bokstav och resten små. `stor_först("mILO")` ska ge `"Milo"`. Tom text ska ge tom text.',starter:`def stor_först(namn):
    pass
`,tests:[{fn:`stor_först`,args:[`milo`],expect:`Milo`},{fn:`stor_först`,args:[`mILO`],expect:`Milo`},{fn:`stor_först`,args:[``],expect:``,edge:`tom text`}],solution:`def stor_först(namn):
    if namn == "":
        return ""
    return namn[0].upper() + namn[1:].lower()`,explain:`namn[0] är första tecknet och namn[1:] resten. Kontrollen av tom text skyddar mot IndexError.`,hint:`Använd namn[0].upper() + namn[1:].lower(), och hantera "" först.`}]},{id:`py-convert`,title:`Omvandla typer`,tier:2,text:'Värden har **typer**: `int` (heltal), `float` (decimaltal), `str` (text) och `bool`.\n\nDu kan omvandla: `int("42")` blir talet 42, `str(42)` blir texten `"42"` och `float("2.5")` blir 2.5. Text som inte ser ut som ett tal ger ett `ValueError`.',example:`# 1. Gör om text till tal
text = "42"
tal = int(text)
# 2. Räkna med talet
print(tal + 1)
# 3. Gör om till text igen
print("Svar: " + str(tal))
# 4. Decimaltal från text
print(float("2.5") * 2)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`print("5" + "3")`,options:[`8`,`53`,`Ett fel`],answer:1,out:!0,explain:`Två texter sätts ihop. Det är inte addition.`,why:{0:`Citattecknen gör "5" och "3" till text. + räknar inte ihop text, det sätter ihop den.`,2:`Text plus text är tillåtet. Det är text plus tal som ger fel.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`print(int("5") + 3)`,options:[`8`,`53`,`Ett fel`],answer:0,out:!0,explain:`int("5") är talet 5, och 5 + 3 är 8.`,why:{1:`int() gör om texten till ett tal. Därefter räknar + ihop i stället för att sätta ihop.`,2:`Efter int("5") finns ingen text kvar, bara två tal. Tal plus tal går bra.`}},{type:`fill`,prompt:`Gör om talet till text så att raden fungerar.`,code:`antal = 3
print("Antal: " + ___(antal))`,answers:[[`str`]],output:`Antal: 3`,explain:`str() gör om ett värde till text.`},{type:`debug`,prompt:`Programmet ska skriva ut summan 15 men lägger ihop texter. Rätta det.`,starter:`a = "7"
b = "8"
print(a + b)`,output:`15`,solution:`a = "7"
b = "8"
print(int(a) + int(b))`,explain:`Text måste omvandlas till tal innan Python kan räkna med den.`,hint:`Gör om båda till int innan +.`}]}]},{id:`py4`,title:`Logik i flera steg`,lessons:[{id:`py-logic`,title:`Boolesk logik: and, or, not`,tier:2,text:"`and` kräver att båda delarna är sanna. `or` räcker med en. `not` vänder på ett värde.\n\nNär du blandar `and` och `or`, skriv parenteser så att det blir tydligt vad som hör ihop.",example:`# 1. Spara fakta
ålder = 15
har_biljett = True
# 2. Kräv båda villkoren
if ålder >= 13 and har_biljett:
    print("Välkommen in")
# 3. Vänd på ett värde
helg = False
if not helg:
    print("Vardag")`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`x = 7
print(x > 5 and x < 10)`,options:[`True`,`False`],answer:0,out:!0,explain:`Båda delarna stämmer.`,why:{1:`and kräver att båda delarna stämmer. Testa varje del för sig med x = 7.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`print(not (3 > 2 or 1 > 2))`,options:[`True`,`False`],answer:1,out:!0,explain:`Parentesen blir True, och not vänder det till False.`,why:{0:`Räkna ut parentesen först. or blir True om minst en del stämmer, och not vänder sedan på svaret.`}},{type:`fill`,prompt:`Fyll i så att Rabatt skrivs ut om kunden är under 18 ELLER över 65.`,code:`ålder = 70
if ålder < 18 ___ ålder > 65:
    print("Rabatt")`,answers:[[`or`]],output:`Rabatt`,explain:`or ger True om minst ett villkor stämmer.`},{type:`code`,prompt:"Skriv `kan_åka(längd, vuxen_med)` som returnerar True om längden är minst 120, eller om längden är minst 100 och en vuxen är med.",starter:`def kan_åka(längd, vuxen_med):
    pass
`,tests:[{fn:`kan_åka`,args:[130,!1],expect:!0},{fn:`kan_åka`,args:[110,!0],expect:!0},{fn:`kan_åka`,args:[110,!1],expect:!1},{fn:`kan_åka`,args:[120,!1],expect:!0,edge:`exakt 120`},{fn:`kan_åka`,args:[99,!0],expect:!1,edge:`under 100 hjälper inte vuxen`}],solution:`def kan_åka(längd, vuxen_med):
    return längd >= 120 or (längd >= 100 and vuxen_med)`,explain:`Jämförelsen blir själv True eller False och kan returneras direkt.`,hint:`return längd >= 120 or (längd >= 100 and vuxen_med)`}]},{id:`py-accum`,title:`Räkna, summera och hitta största`,tier:4,text:`En **ackumulator** samlar något medan en loop går: en summa, ett antal eller det största värdet hittills.

Startvärdet spelar roll. Summa börjar på 0. Största värdet börjar bäst på **första elementet** – annars blir det fel när alla tal är negativa.`,example:`# 1. Data och startvärde
temp = [-3, -8, -1, -5]
högst = temp[0]
# 2. Jämför varje tal
for t in temp:
    if t > högst:
        högst = t
# 3. Skriv ut det största
print(högst)`,exercises:[{type:`choice`,prompt:"Varför startar `högst` på `temp[0]` i stället för på 0?",options:[`Det går snabbare`,`Om alla tal är negativa skulle 0 felaktigt bli största värdet`,`Python kräver det`],answer:1,explain:`Ett riktigt element som start gör lösningen korrekt för alla tal.`,why:{0:`Hastigheten blir densamma. Det handlar om vilket startvärde som ger rätt svar.`,2:`Python tillåter vilket startvärde som helst. Fundera på vad som händer om listan bara har negativa tal.`}},{type:`code`,prompt:"Skriv `summa(tal)` som returnerar summan av listan, utan att använda den inbyggda `sum`.",starter:`def summa(tal):
    pass
`,tests:[{fn:`summa`,args:[[1,2,3]],expect:6},{fn:`summa`,args:[[10,-4]],expect:6},{fn:`summa`,args:[[]],expect:0,edge:`tom lista`}],forbid:[p(`\\bsum\\s*\\(`,`Lös det med en loop den här gången, utan sum().`)],solution:`def summa(tal):
    total = 0
    for t in tal:
        total += t
    return total`,explain:`Startvärdet 0 gör att även en tom lista fungerar.`,hint:`total = 0 före loopen, return total efter.`},{type:`code`,prompt:"Skriv `störst(tal)` som returnerar det största talet utan att använda `max`. Listan har minst ett element.",starter:`def störst(tal):
    pass
`,tests:[{fn:`störst`,args:[[3,9,2]],expect:9},{fn:`störst`,args:[[7]],expect:7},{fn:`störst`,args:[[-5,-2,-9]],expect:-2,edge:`bara negativa tal`}],forbid:[p(`\\bmax\\s*\\(`,`Lös det med en loop, utan max().`)],solution:`def störst(tal):
    bäst = tal[0]
    for t in tal:
        if t > bäst:
            bäst = t
    return bäst`,explain:`Start på tal[0] fungerar för negativa tal.`,hint:`Börja med bäst = tal[0].`},{type:`code`,prompt:"Skriv `snitt(tal)` som returnerar medelvärdet. En tom lista ska ge 0 i stället för att krascha.",starter:`def snitt(tal):
    pass
`,tests:[{fn:`snitt`,args:[[2,4]],expect:3},{fn:`snitt`,args:[[1,2]],expect:1.5},{fn:`snitt`,args:[[]],expect:0,edge:`tom lista`}],solution:`def snitt(tal):
    if len(tal) == 0:
        return 0
    total = 0
    for t in tal:
        total += t
    return total / len(tal)`,explain:`Kontrollen av tom lista skyddar mot division med noll.`,hint:`Returnera 0 om len(tal) == 0, annars summa / len(tal).`}]},{id:`py-index`,title:`Index och sökning`,tier:4,text:"Ibland behövs **positionen**. `range(len(lista))` ger alla index, och `enumerate(lista)` ger både index och värde.\n\nEn vanlig konvention är att returnera `-1` när något inte hittas.",example:`# 1. Skapa listan
namn = ["Ada", "Linus", "Grace"]
# 2. Gå igenom alla index
for i in range(len(namn)):
    if namn[i] == "Linus":
        print(f"Hittade på index {i}")`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`t = [5, 6, 7]
for i in range(len(t) - 1, -1, -1):
    print(t[i], end="")`,options:[`567`,`765`,`76`],answer:1,out:!0,explain:`Loopen går från sista index ner till 0.`,why:{0:`Steget -1 gör att range räknar baklänges, från sista index ner mot 0.`,2:`range stannar före -1, så index 0 kommer med. Det första elementet skrivs alltså också ut.`}},{type:`code`,prompt:"Skriv `hitta_index(tal, mål)` som returnerar index för första förekomsten av mål, eller -1. Använd inte `.index()`.",starter:`def hitta_index(tal, mål):
    pass
`,tests:[{fn:`hitta_index`,args:[[4,8,15],8],expect:1},{fn:`hitta_index`,args:[[4,8,4],4],expect:0,edge:`första förekomsten`},{fn:`hitta_index`,args:[[1,2],9],expect:-1,edge:`saknas`},{fn:`hitta_index`,args:[[],1],expect:-1}],forbid:[p(`\\.index\\s*\\(`,`Skriv sökningen själv med en loop.`)],solution:`def hitta_index(tal, mål):
    for i in range(len(tal)):
        if tal[i] == mål:
            return i
    return -1`,explain:`return i avslutar vid första träffen. -1 returneras bara om loopen tar slut.`,hint:`Loopa över range(len(tal)) och returnera i vid träff.`},{type:`code`,prompt:"Skriv `antal_ökningar(tal)` som räknar hur många gånger ett tal är större än talet före det.",starter:`def antal_ökningar(tal):
    pass
`,tests:[{fn:`antal_ökningar`,args:[[1,3,2,5]],expect:2},{fn:`antal_ökningar`,args:[[5,4,3]],expect:0},{fn:`antal_ökningar`,args:[[7]],expect:0,edge:`ett element`},{fn:`antal_ökningar`,args:[[]],expect:0,edge:`tom lista`}],solution:`def antal_ökningar(tal):
    antal = 0
    for i in range(1, len(tal)):
        if tal[i] > tal[i - 1]:
            antal += 1
    return antal`,explain:`Att starta på index 1 gör att det alltid finns ett tal före.`,hint:`range(1, len(tal)) och jämför tal[i] med tal[i - 1].`},{type:`code`,prompt:"Skriv `sista_index(tal, mål)` som returnerar index för den **sista** förekomsten av mål, eller -1.",starter:`def sista_index(tal, mål):
    pass
`,tests:[{fn:`sista_index`,args:[[4,8,4],4],expect:2},{fn:`sista_index`,args:[[1,2],9],expect:-1},{fn:`sista_index`,args:[[7],7],expect:0}],solution:`def sista_index(tal, mål):
    svar = -1
    for i in range(len(tal)):
        if tal[i] == mål:
            svar = i
    return svar`,explain:`Genom att spara varje träff blir den sista kvar när loopen är klar.`,hint:`Spara i varje gång du hittar mål, och returnera efter loopen.`}]},{id:`py-filter`,title:`Filtrera listor`,tier:4,text:`Att **filtrera** betyder att bygga en ny lista med bara de element som uppfyller ett villkor.

Mönstret är: skapa en tom lista, loopa, och \`append\` det som passar. Originallistan lämnas orörd.`,example:`# 1. Lista och tom resultatlista
tal = [5, 12, 8, 20]
stora = []
# 2. Spara talen över 10
for t in tal:
    if t > 10:
        stora.append(t)
# 3. Skriv ut resultatet
print(stora)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`ord = ["sol", "", "mån", ""]
kvar = []
for o in ord:
    if o:
        kvar.append(o)
print(len(kvar))`,options:[`4`,`2`,`0`],answer:1,out:!0,explain:`Tom text räknas som falsk, så bara "sol" och "mån" läggs till.`,why:{0:`En tom text räknas som falsk i ett villkor, så tomma ord läggs inte till i kvar.`,2:`Texter med innehåll räknas som sanna. "sol" och "mån" klarar alltså villkoret.`}},{type:`code`,prompt:"Skriv `bara_jämna(tal)` som returnerar en ny lista med de jämna talen i samma ordning.",starter:`def bara_jämna(tal):
    pass
`,tests:[{fn:`bara_jämna`,args:[[1,2,3,4]],expect:[2,4]},{fn:`bara_jämna`,args:[[1,3]],expect:[],edge:`inga jämna`},{fn:`bara_jämna`,args:[[0,-2]],expect:[0,-2],edge:`0 och negativa tal`}],solution:`def bara_jämna(tal):
    resultat = []
    for t in tal:
        if t % 2 == 0:
            resultat.append(t)
    return resultat`,explain:`En ny lista gör att originalet lämnas orört.`,hint:`Tom lista, loop, append när t % 2 == 0.`},{type:`code`,prompt:"Skriv `korta_ord(ord, max_längd)` som returnerar orden med högst max_längd tecken, med mellanslag i kanterna borttagna och utan tomma ord.",starter:`def korta_ord(ord, max_längd):
    pass
`,tests:[{fn:`korta_ord`,args:[[`sol`,`bambu`,` kod `],3],expect:[`sol`,`kod`],edge:`mellanslag i kanterna`},{fn:`korta_ord`,args:[[`  `,`ja`],5],expect:[`ja`],edge:`tomma ord ska bort`},{fn:`korta_ord`,args:[[],3],expect:[]}],solution:`def korta_ord(ord, max_längd):
    resultat = []
    for o in ord:
        rent = o.strip()
        if rent != "" and len(rent) <= max_längd:
            resultat.append(rent)
    return resultat`,explain:`Att rensa först och sedan kontrollera gör att samma regel gäller alla ord.`,hint:`strip() varje ord, kontrollera att det inte är tomt och att len <= max_längd.`}]}]},{id:`py5`,title:`Funktioner & samlingar`,lessons:[{id:`py-def`,title:`Egna funktioner`,tier:3,text:"En **funktion** är ett namngivet block som du kan anropa många gånger. Den skapas med `def namn():` och ett indraget block.\n\nFunktionen körs först när den anropas: `namn()`.",example:`# 1. Definiera funktionen
def hälsa():
    print("Hej från en funktion!")

# 2. Anropa den två gånger
hälsa()
hälsa()`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`def b():
    print("B")

print("A")
b()
print("C")`,options:[`A
B
C`,`B
A
C`,`A
C
B`],answer:0,out:!0,explain:`def skapar bara funktionen. Den körs när b() anropas.`,why:{1:`def kör inte funktionen, den bara skapar den. B skrivs ut först när b() anropas.`,2:`Ett anrop kör funktionen direkt där det står, innan programmet går vidare till nästa rad.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`def visa():
    print("Hej")

print("Start")`,options:[`Start`,`Hej
Start`,`Start
Hej`],answer:0,out:!0,explain:`Funktionen anropas aldrig, så Hej skrivs inte ut.`,why:{1:`Koden i en funktion körs bara när funktionen anropas. Att definiera den räcker inte.`,2:`visa() anropas aldrig i programmet, så Hej skrivs aldrig ut.`}},{type:`fill`,prompt:`Skapa funktionen rita med rätt nyckelord.`,code:`___ rita():
    print("***")

rita()`,answers:[[`def`]],output:`***`,explain:`def står för define, definiera.`},{type:`code`,prompt:"Skriv funktionen `linje()` som skriver ut `----------` (tio bindestreck). Använd den för att skriva ut en linje, sedan `Meny`, sedan en linje till.",starter:``,output:`----------
Meny
----------`,solution:`def linje():
    print("----------")

linje()
print("Meny")
linje()`,require:[p(`def\\s+linje\\s*\\(\\s*\\)\\s*:`,`Skapa funktionen med def linje():`),p(`linje\\s*\\(\\s*\\)[\\s\\S]*linje\\s*\\(\\s*\\)[\\s\\S]*linje\\s*\\(\\s*\\)`,`Anropa linje() två gånger.`)],explain:`Nu ändrar du linjen på ett enda ställe.`,hint:`Anropa linje() före och efter print("Meny").`}]},{id:`py-params`,title:`Parametrar`,tier:3,text:"En **parameter** gör funktionen flexibel. `def hälsa(namn):` tar emot ett värde varje gång den anropas.\n\nVärdet du skickar in kallas **argument**. En parameter kan ha ett standardvärde: `def rad(längd=5):`.",example:`# 1. Funktion med parameter
def hälsa(namn):
    print(f"Hej {namn}!")

# 2. Parameter med standardvärde
def rad(längd=5):
    print("*" * längd)

# 3. Anropa funktionerna
hälsa("Ada")
rad()
rad(2)`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`def visa(antal, tecken):
    print(tecken * antal)

visa(3, "x")`,options:[`xxx`,`3x`,`x3`],answer:0,out:!0,explain:`Text gånger tal upprepar texten.`,why:{1:`Argumenten fördelas i ordning: antal får 3 och tecken får "x". * mellan text och tal sätter inte ihop dem.`,2:`* mellan en text och ett tal upprepar texten. Talet i sig skrivs inte ut.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`def pris(belopp, rabatt=0):
    print(belopp - rabatt)

pris(100)
pris(100, 20)`,options:[`100
80`,`80
80`,`Ett fel`],answer:0,out:!0,explain:`Utan andra argument används standardvärdet 0.`,why:{1:`Standardvärdet rabatt=0 används när inget annat skickas med. Första anropet får alltså ingen rabatt.`,2:`rabatt har ett standardvärde, så det argumentet får utelämnas i anropet.`}},{type:`debug`,prompt:"Anropet stämmer inte med funktionen. Rätta anropet så att det skrivs ut `Ada är 36 år`.",starter:`def presentera(namn, ålder):
    print(f"{namn} är {ålder} år")

presentera(36, "Ada")`,output:`Ada är 36 år`,solution:`def presentera(namn, ålder):
    print(f"{namn} är {ålder} år")

presentera("Ada", 36)`,explain:`Argumenten matchas mot parametrarna i ordning.`,hint:`Jämför ordningen i anropet och i def-raden.`},{type:`code`,prompt:"Skriv `nedräkning(från)` som skriver ut talen från `från` ner till 1 och sedan `Lyft!`. Anropa den med 3.",starter:``,output:`3
2
1
Lyft!`,solution:`def nedräkning(från):
    for i in range(från, 0, -1):
        print(i)
    print("Lyft!")

nedräkning(3)`,require:[p(`def\\s+nedräkning\\s*\\(\\s*[\\wåäö]+\\s*\\)`,`Skapa funktionen def nedräkning(från):`)],explain:`Parametern styr var loopen börjar.`,hint:`range(från, 0, -1) räknar nedåt.`}]},{id:`py-return`,title:`return`,tier:3,text:"`return` skickar tillbaka ett värde från funktionen. Värdet kan sparas, skrivas ut eller räknas vidare med.\n\nEn funktion utan `return` lämnar tillbaka `None`. `return` avslutar också funktionen direkt.",example:`# 1. Funktion som returnerar
def dubbla(x):
    return x * 2

# 2. Spara och skriv ut svaret
svar = dubbla(21)
print(svar)
# 3. Använd svaret igen
print(dubbla(svar))`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`def kvadrat(x):
    return x * x

print(kvadrat(kvadrat(2)))`,options:[`4`,`8`,`16`],answer:2,out:!0,explain:`kvadrat(2) = 4 och kvadrat(4) = 16.`,why:{0:`Det inre anropet ger 4, men det svaret skickas sedan in i kvadrat en gång till.`,1:`Kvadrat betyder ett tal gånger sig självt, inte gånger 2. Räkna det yttre anropet med 4.`}},{type:`choice`,prompt:`Vad skrivs ut?`,code:`def dubbla(x):
    print(x * 2)

svar = dubbla(3)
print(svar)`,options:[`6
6`,`6
None`,`None`],answer:1,out:!0,explain:`Funktionen skriver ut 6 men returnerar ingenting, alltså None.`,why:{0:`print visar värdet men lämnar inte tillbaka det. Utan return får svar värdet None.`,2:`print inne i funktionen körs när dubbla(3) anropas, så något skrivs ut innan svar skrivs ut.`}},{type:`code`,prompt:"Skriv `moms(pris)` som returnerar 25 % av priset.",starter:`def moms(pris):
    pass
`,tests:[{fn:`moms`,args:[100],expect:25},{fn:`moms`,args:[10],expect:2.5},{fn:`moms`,args:[0],expect:0}],solution:`def moms(pris):
    return pris * 0.25`,explain:`Funktionen returnerar värdet så att det kan användas i andra uträkningar.`,hint:`return pris * 0.25`},{type:`code`,prompt:"Skriv `är_jämnt(tal)` som returnerar True för jämna tal och annars False.",starter:`def är_jämnt(tal):
    pass
`,tests:[{fn:`är_jämnt`,args:[4],expect:!0},{fn:`är_jämnt`,args:[7],expect:!1},{fn:`är_jämnt`,args:[0],expect:!0,edge:`0 är jämnt`},{fn:`är_jämnt`,args:[-2],expect:!0,edge:`negativa tal`}],solution:`def är_jämnt(tal):
    return tal % 2 == 0`,explain:`Jämförelsen är redan True eller False.`,hint:`return tal % 2 == 0`}]},{id:`py-dict`,title:`Ordböcker och funktioner tillsammans`,tier:3,text:'En **ordbok** (`dict`) kopplar nycklar till värden: `pris = {"kaffe": 30, "bulle": 25}`. Du läser med `pris["kaffe"]`.\n\n`.get(nyckel, standard)` ger ett standardvärde om nyckeln saknas, och `for namn, värde in pris.items():` går igenom alla par.',example:`# 1. Skapa ordboken
pris = {"kaffe": 30, "bulle": 25}
# 2. Läs värden
print(pris["kaffe"])
print(pris.get("te", 0))
# 3. Lägg till en vara
pris["te"] = 20
# 4. Gå igenom alla par
for vara, kr in pris.items():
    print(f"{vara}: {kr} kr")`,exercises:[{type:`choice`,prompt:`Vad skrivs ut?`,code:`lager = {"äpple": 3}
lager["äpple"] += 2
print(lager.get("päron", 0) + lager["äpple"])`,options:[`5`,`3`,`Ett fel`],answer:0,out:!0,explain:`äpple blir 5 och päron saknas, så get ger 0.`,why:{1:`lager["äpple"] += 2 ändrar värdet i ordboken, så det är inte längre 3.`,2:`get ger inget fel för en nyckel som saknas. Den ger standardvärdet i stället.`}},{type:`fill`,prompt:`Läs priset för "te" men få 0 om det saknas.`,code:`pris = {"kaffe": 30}
print(pris.___("te", 0))`,answers:[[`get`]],output:`0`,explain:`get tar ett standardvärde som andra argument.`},{type:`code`,prompt:"Skriv `räkna_ord(ord)` som returnerar en ordbok med hur många gånger varje ord förekommer.",starter:`def räkna_ord(ord):
    pass
`,tests:[{fn:`räkna_ord`,args:[[`sol`,`mån`,`sol`]],expect:{sol:2,mån:1}},{fn:`räkna_ord`,args:[[]],expect:{},edge:`tom lista`}],solution:`def räkna_ord(ord):
    antal = {}
    for o in ord:
        antal[o] = antal.get(o, 0) + 1
    return antal`,explain:`get(o, 0) gör att första förekomsten börjar på 0.`,hint:`antal[o] = antal.get(o, 0) + 1 inne i loopen.`}]}]},{id:`py6`,title:`Tillämpning & miniprojekt`,lessons:[{id:`py-validate`,title:`Validera och testa gränsfall`,tier:4,text:`Riktiga program får konstiga värden. **Validering** betyder att kontrollera värdet innan du använder det.

Testa alltid **gränsfallen**: tom text, tom lista, noll, negativa tal och värdet exakt på gränsen. Hantera de ogiltiga fallen först med tidiga \`return\`.`,example:`# 1. Funktion som kollar namnet
def hälsning(namn):
    if namn.strip() == "":
        return "Skriv ditt namn först."
    return f"Hej {namn.strip()}!"

# 2. Testa med två namn
print(hälsning("  "))
print(hälsning(" Ada "))`,exercises:[{type:`choice`,prompt:`Funktionen ska godkänna åldrar från 13 till och med 19. Vilka värden avslöjar bäst ett gränsfel?`,options:[`15 och 16`,`12, 13, 19 och 20`,`1 och 100`],answer:1,explain:`Värdena precis på och utanför gränserna visar om > och >= har blandats ihop.`,why:{0:`15 och 16 ligger mitt i intervallet. Gränsfel syns precis vid gränserna.`,2:`1 och 100 ligger långt från gränserna. Ett fel som < i stället för <= märks bara nära 13 och 19.`}},{type:`code`,prompt:"Skriv `giltig_pin(pin)` som returnerar True bara om pin är exakt 4 tecken och alla är siffror.",starter:`def giltig_pin(pin):
    pass
`,tests:[{fn:`giltig_pin`,args:[`1234`],expect:!0},{fn:`giltig_pin`,args:[`123`],expect:!1,edge:`för kort`},{fn:`giltig_pin`,args:[`12a4`],expect:!1,edge:`en bokstav`},{fn:`giltig_pin`,args:[``],expect:!1,edge:`tom text`}],solution:`def giltig_pin(pin):
    return len(pin) == 4 and pin.isdigit()`,explain:`and gör att båda kraven måste vara uppfyllda.`,hint:`Kombinera len(pin) == 4 med pin.isdigit().`},{type:`code`,prompt:"Skriv `säkert_tal(text)` som returnerar talet om texten är ett heltal mellan 1 och 10 (mellanslag runt om är okej), annars -1.",starter:`def säkert_tal(text):
    pass
`,tests:[{fn:`säkert_tal`,args:[`7`],expect:7},{fn:`säkert_tal`,args:[` 3 `],expect:3,edge:`mellanslag runt om`},{fn:`säkert_tal`,args:[`11`],expect:-1,edge:`över 10`},{fn:`säkert_tal`,args:[`0`],expect:-1,edge:`under 1`},{fn:`säkert_tal`,args:[`tre`],expect:-1,edge:`inte ett tal`},{fn:`säkert_tal`,args:[``],expect:-1,edge:`tom text`}],solution:`def säkert_tal(text):
    t = text.strip()
    if not t.isdigit():
        return -1
    tal = int(t)
    if tal < 1 or tal > 10:
        return -1
    return tal`,explain:`isdigit() före int() gör att ”tre” inte kraschar programmet.`,hint:`strip, kontrollera isdigit, gör om med int och kontrollera intervallet.`},{type:`debug`,prompt:`Funktionen ska ge pris per person men kraschar när personer är 0. Låt den returnera 0 då.`,starter:`def per_person(total, personer):
    return total / personer
`,tests:[{fn:`per_person`,args:[300,3],expect:100},{fn:`per_person`,args:[300,0],expect:0,edge:`0 personer`}],solution:`def per_person(total, personer):
    if personer <= 0:
        return 0
    return total / personer`,explain:`Ett tidigt return skyddar divisionen.`,hint:`Kontrollera personer innan du delar.`}]},{id:`py-budget`,title:`Miniprojekt: en robust budget`,tier:5,text:`Nu bygger du en liten budgetkalkylator i Python. Den ska tåla konstiga värden och ge tydliga svar.

Du kombinerar listor, loopar, villkor, validering och funktioner som anropar varandra. Ta en del i taget.`,example:`# 1. Spara utgifter och inkomst
utgifter = [4500, 1200, 800]
inkomst = 7000
# 2. Räkna ut det som blir kvar
print(f"Kvar: {inkomst - sum(utgifter)} kr")`,exercises:[{type:`code`,prompt:"Del 1: Skriv `totalt(utgifter)` som summerar utgifterna men hoppar över negativa värden.",starter:`def totalt(utgifter):
    pass
`,tests:[{fn:`totalt`,args:[[4500,1200,800]],expect:6500},{fn:`totalt`,args:[[100,-50,200]],expect:300,edge:`negativa värden ska ignoreras`},{fn:`totalt`,args:[[]],expect:0}],solution:`def totalt(utgifter):
    summa = 0
    for u in utgifter:
        if u > 0:
            summa += u
    return summa`,explain:`Validering inne i loopen gör att ett felaktigt värde inte förstör summan.`,hint:`Lägg bara till u när u > 0.`},{type:`code`,prompt:'Del 2: Skriv `status(inkomst, utgifter)` som returnerar `"Plus X kr"`, `"Minus X kr"` (X utan minustecken) eller `"Precis noll"`. Negativ inkomst ger `"Ogiltig inkomst"`. Använd totalt från del 1.',starter:`def totalt(utgifter):
    summa = 0
    for u in utgifter:
        if u > 0:
            summa += u
    return summa

def status(inkomst, utgifter):
    pass
`,tests:[{fn:`status`,args:[7e3,[4500,1200]],expect:`Plus 1300 kr`},{fn:`status`,args:[1e3,[1500]],expect:`Minus 500 kr`,edge:`utan minustecken`},{fn:`status`,args:[500,[500]],expect:`Precis noll`},{fn:`status`,args:[-1,[10]],expect:`Ogiltig inkomst`,edge:`negativ inkomst`}],require:[p(`def\\s+status[\\s\\S]*totalt\\s*\\(`,`Använd totalt() inne i status.`)],solution:`def totalt(utgifter):
    summa = 0
    for u in utgifter:
        if u > 0:
            summa += u
    return summa

def status(inkomst, utgifter):
    if inkomst < 0:
        return "Ogiltig inkomst"
    kvar = inkomst - totalt(utgifter)
    if kvar > 0:
        return f"Plus {kvar} kr"
    if kvar < 0:
        return f"Minus {-kvar} kr"
    return "Precis noll"`,explain:`Ogiltiga värden först, sedan tre enkla fall.`,hint:`Kontrollera inkomsten, räkna kvar och välj text med if.`},{type:`code`,prompt:"Del 3: Skriv `månader_till_mål(spar_per_månad, mål)` som returnerar antal hela månader tills målet nås. Mål på 0 eller mindre är redan nått (0). Om spar_per_månad är 0 eller mindre, returnera -1.",starter:`def månader_till_mål(spar_per_månad, mål):
    pass
`,tests:[{fn:`månader_till_mål`,args:[500,2e3],expect:4},{fn:`månader_till_mål`,args:[500,2100],expect:5,edge:`påbörjad månad räknas som hel`},{fn:`månader_till_mål`,args:[0,100],expect:-1,edge:`inget sparande`},{fn:`månader_till_mål`,args:[100,0],expect:0,edge:`målet redan nått`}],solution:`def månader_till_mål(spar_per_månad, mål):
    if mål <= 0:
        return 0
    if spar_per_månad <= 0:
        return -1
    sparat = 0
    månader = 0
    while sparat < mål:
        sparat += spar_per_månad
        månader += 1
    return månader`,explain:`Kontrollerna först gör att while-loopen aldrig kan fastna.`,hint:`Hantera specialfallen och använd sedan en while-loop.`}]},{id:`py-scores`,title:`Miniprojekt: poängsammanställning`,tier:5,text:`I sista miniprojektet sammanställer du tävlingspoäng. Du kombinerar listor, ordböcker, sökning, gränsfall och funktioner.

Tänk på tomma listor och lika poäng. Det är de fallen som gör lösningen robust.`,example:`# 1. Två listor i samma ordning
namn = ["Ada", "Linus"]
poäng = [12, 9]
# 2. Gå igenom dem parvis
for n, p in zip(namn, poäng):
    print(f"{n}: {p}")`,exercises:[{type:`code`,prompt:"Del 1: Skriv `bästa_index(poäng)` som returnerar index för högsta poängen. Vid lika vinner den första. Tom lista ger -1.",starter:`def bästa_index(poäng):
    pass
`,tests:[{fn:`bästa_index`,args:[[3,9,5]],expect:1},{fn:`bästa_index`,args:[[7,2,7]],expect:0,edge:`lika: första vinner`},{fn:`bästa_index`,args:[[]],expect:-1,edge:`tom lista`},{fn:`bästa_index`,args:[[-4,-1]],expect:1,edge:`negativa poäng`}],solution:`def bästa_index(poäng):
    if len(poäng) == 0:
        return -1
    bäst = 0
    for i in range(1, len(poäng)):
        if poäng[i] > poäng[bäst]:
            bäst = i
    return bäst`,explain:`Med > byts ledaren bara när någon har strikt fler poäng.`,hint:`Spara index för bästa hittills.`},{type:`code`,prompt:"Del 2: Skriv `sammanställ(resultat)` där resultat är en lista med par `[namn, poäng]`, och samma namn kan förekomma flera gånger. Returnera en ordbok med totalpoäng per namn. Poäng under 0 räknas som 0.",starter:`def sammanställ(resultat):
    pass
`,tests:[{fn:`sammanställ`,args:[[[`Ada`,5],[`Linus`,3],[`Ada`,4]]],expect:{Ada:9,Linus:3}},{fn:`sammanställ`,args:[[[`Mo`,-2],[`Mo`,6]]],expect:{Mo:6},edge:`negativa poäng räknas som 0`},{fn:`sammanställ`,args:[[]],expect:{}}],solution:`def sammanställ(resultat):
    total = {}
    for namn, p in resultat:
        if p < 0:
            p = 0
        total[namn] = total.get(namn, 0) + p
    return total`,explain:`get(namn, 0) gör att nya namn börjar på 0.`,hint:`Loopa med for namn, p in resultat: och lägg till i ordboken med get.`},{type:`code`,prompt:'Del 3: Skriv `topplista(total)` som tar en ordbok med totalpoäng och returnerar en lista med texter `"NAMN: X"`, sorterad med högst poäng först. Vid lika poäng sorteras namnen i bokstavsordning.',starter:`def topplista(total):
    pass
`,tests:[{fn:`topplista`,args:[{Ada:9,Linus:3,Mo:6}],expect:[`Ada: 9`,`Mo: 6`,`Linus: 3`]},{fn:`topplista`,args:[{Bo:5,Al:5}],expect:[`Al: 5`,`Bo: 5`],edge:`lika poäng: bokstavsordning`},{fn:`topplista`,args:[{}],expect:[]}],solution:`def topplista(total):
    par = []
    for namn, p in total.items():
        par.append((-p, namn))
    par.sort()
    return [f"{namn}: {-minus}" for minus, namn in par]`,explain:`Genom att sortera på (-poäng, namn) hamnar högst poäng först, och lika poäng sorteras på namn.`,hint:`Bygg par (-poäng, namn), sortera listan och skapa texterna.`}]}]},...r,...f,t(`python`)]},h=(e,t)=>({re:e,msg:t}),g={"py-print":[{type:`code`,prompt:`Skriv ett program som ritar den här rutan med tre print-rader:

\`\`\`
+-----+
| Hej |
+-----+
\`\`\``,starter:`# Rita rutan här
`,output:`+-----+
| Hej |
+-----+`,solution:`print("+-----+")
print("| Hej |")
print("+-----+")`,explain:`Allt mellan citattecknen skrivs ut exakt, även mellanslag och tecken som + och |.`,hint:`Tre print-rader, en för varje rad i rutan. Räkna bindestrecken noga.`},{type:`debug`,prompt:"Programmet ska skriva ut `Hej` och sedan `Då`, men det innehåller två fel. Hitta och rätta båda.",starter:`print("Hej)
Print("Då")`,output:`Hej
Då`,solution:`print("Hej")
print("Då")`,explain:`Text måste ha citattecken både före och efter, och print skrivs alltid med liten bokstav.`,hint:`Titta på citattecknen på första raden och på första bokstaven på andra raden.`}],"py-var":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`x = 2
y = x
x = x + 3
print(x, y)`,options:[`5 2`,`5 5`,`2 5`],answer:0,out:!0,explain:`y = x kopierar värdet 2 till y. När x sedan ändras påverkas inte y.`,why:{1:`y fick värdet 2 när raden y = x kördes. Den följer inte med när x ändras senare.`,2:`x ökades med 3 och blev 5, och x skrivs ut först.`}},{type:`code`,prompt:"Byt plats på värdena i `a` och `b` så att programmet skriver ut 9 och sedan 5. Använd en tredje variabel som tillfällig förvaring, och skriv inte talen 9 eller 5 igen.",starter:`a = 5
b = 9
# Byt plats på värdena här

print(a)
print(b)`,output:`9
5`,solution:`a = 5
b = 9
temp = a
a = b
b = temp
print(a)
print(b)`,forbid:[h(`\\b(a\\s*=\\s*9|b\\s*=\\s*5)\\b`,`Byt med variablerna, utan att skriva in talen igen.`),h(`print\\s*\\(\\s*\\d`,`Skriv ut variablerna, inte talen.`)],explain:`Om du skriver a = b direkt försvinner det gamla värdet i a. Därför sparas det först i temp.`,hint:`temp = a, sedan a = b, sedan b = temp.`}],"py-math":[{type:`code`,prompt:"En film är `7384` sekunder lång. Skriv ut hur många hela timmar, minuter och sekunder det är, på varsin rad (alltså 2, 3 och 4). En timme är 3600 sekunder.",starter:`sekunder = 7384
`,output:`2
3
4`,solution:`sekunder = 7384
print(sekunder // 3600)
print(sekunder % 3600 // 60)
print(sekunder % 60)`,require:[h(`sekunder\\s*//`,`Räkna ut svaret från variabeln sekunder.`),h(`%`,`Du behöver resten med %.`)],forbid:[h(`print\\s*\\(\\s*\\d+\\s*\\)`,`Räkna fram svaren i stället för att skriva in dem.`)],explain:`// 3600 ger hela timmar. % 3600 ger det som blir kvar, och // 60 av det ger minuter. % 60 ger de sista sekunderna.`,hint:`Timmar: sekunder // 3600. Minuter: sekunder % 3600 // 60. Sekunder: sekunder % 60.`},{type:`debug`,prompt:`Programmet ska skriva ut medelvärdet av a och b, alltså 6.0, men det blir 8.0. Rätta uträkningen.`,starter:`a = 4
b = 8
print(a + b / 2)`,output:`6.0`,solution:`a = 4
b = 8
print((a + b) / 2)`,forbid:[h(`6`,`Räkna fram svaret med a och b.`)],explain:`Division räknas före addition, så b / 2 räknades först. Parenteser gör att summan räknas ut innan den delas.`,hint:`Sätt parenteser runt a + b.`}],"py-text":[{type:`code`,prompt:'Ada Lovelace föddes 1815. Skapa `namn = "Ada"`, `född = 1815` och `nu = 2025`. Skriv ut exakt: `Ada skulle fylla 210 år i år.` Låt Python räkna ut åldern.',starter:``,output:`Ada skulle fylla 210 år i år.`,solution:`namn = "Ada"
född = 1815
nu = 2025
ålder = nu - född
print(f"{namn} skulle fylla {ålder} år i år.")`,forbid:[h(`210`,`Låt Python räkna ut 210 med nu - född.`)],require:[h(`nu\\s*-\\s*född`,`Räkna ut åldern med nu - född.`)],explain:`Du kan räkna ut värdet i en egen variabel först, eller direkt inne i f-strängen med {nu - född}.`,hint:`ålder = nu - född, och sedan print(f"{namn} skulle fylla {ålder} år i år.").`},{type:`debug`,prompt:"Programmet ska skriva ut `Poäng: 12 av 20` men kraschar med TypeError. Rätta det.",starter:`poäng = 12
maxpoäng = 20
print("Poäng: " + poäng + " av " + maxpoäng)`,output:`Poäng: 12 av 20`,solution:`poäng = 12
maxpoäng = 20
print(f"Poäng: {poäng} av {maxpoäng}")`,forbid:[h(`12 av|av 20`,`Använd variablerna i stället för att skriva in talen.`)],explain:`Text och tal kan inte sättas ihop med +. En f-sträng blandar dem utan problem.`,hint:`Gör om raden till en f-sträng med {poäng} och {maxpoäng}.`}],"py-bool":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`print(7 // 2 == 3.5)`,options:[`True`,`False`,`3.5`],answer:1,out:!0,explain:`7 // 2 är heltalsdivision och blir 3. 3 är inte lika med 3.5, så svaret blir False.`,why:{0:`// kastar bort decimalerna. 7 / 2 hade blivit 3.5, men 7 // 2 blir 3.`,2:`== jämför två värden och ger alltid True eller False, aldrig ett tal.`}},{type:`code`,prompt:"För `tal = 7`: skriv ut på varsin rad om tal är större än 5, om tal är jämnt, och om tal är skilt från 7. Svaren ska bli `True`, `False` och `False`. Låt jämförelserna räkna fram dem.",starter:`tal = 7
`,output:`True
False
False`,solution:`tal = 7
print(tal > 5)
print(tal % 2 == 0)
print(tal != 7)`,require:[h(`%\\s*2\\s*==\\s*0`,`Ett jämnt tal har resten 0 när det delas med 2: tal % 2 == 0.`),h(`!=`,`Använd != för ”skilt från”.`)],forbid:[h(`print\\s*\\(\\s*(True|False)\\s*\\)`,`Skriv jämförelser, inte True eller False direkt.`)],explain:`Ett tal är jämnt när resten vid division med 2 är 0. Jämförelsen blir själv True eller False.`,hint:`print(tal > 5), print(tal % 2 == 0) och print(tal != 7).`}],"py-if":[{type:`debug`,prompt:"Programmet ska skriva ut `Toppen` för 95 poäng men skriver ut `Godkänt`. Rätta ordningen så att 90 eller mer ger Toppen, 50 eller mer ger Godkänt, och annars Försök igen.",starter:`poäng = 95
if poäng >= 50:
    print("Godkänt")
elif poäng >= 90:
    print("Toppen")
else:
    print("Försök igen")`,output:`Toppen`,solution:`poäng = 95
if poäng >= 90:
    print("Toppen")
elif poäng >= 50:
    print("Godkänt")
else:
    print("Försök igen")`,require:[h(`\\belif\\b`,`Behåll elif.`),h(`\\belse\\s*:`,`Behåll else.`)],explain:`95 >= 50 är sant, så det första blocket vann. Testa det strängaste villkoret först.`,hint:`Byt plats på villkoren så att >= 90 kommer först.`},{type:`code`,prompt:"Biljettpriset beror på åldern: under 7 år kostar `0 kr`, 7 till och med 17 kostar `50 kr`, 18 till och med 64 kostar `100 kr` och 65 eller mer kostar `60 kr`. Skriv if, elif och else som skriver ut rätt pris för `ålder = 65`.",starter:`ålder = 65
`,output:`60 kr`,solution:`ålder = 65
if ålder < 7:
    print("0 kr")
elif ålder <= 17:
    print("50 kr")
elif ålder <= 64:
    print("100 kr")
else:
    print("60 kr")`,require:[h(`\\belif\\b[\\s\\S]*\\belif\\b`,`Du behöver två elif för de mellersta åldrarna.`),h(`\\belse\\s*:`,`Avsluta med else.`),h(`"0 kr"`,`Alla fyra priser ska finnas med.`),h(`"50 kr"`,`Alla fyra priser ska finnas med.`),h(`"100 kr"`,`Alla fyra priser ska finnas med.`)],explain:`65 är exakt på gränsen. Eftersom 64 är sista åldern för 100 kr hamnar 65 i else.`,hint:`Testa ålder < 7, sedan ålder <= 17, sedan ålder <= 64, och resten med else.`}],"py-while":[{type:`code`,prompt:`Använd en while-loop för att räkna ut summan av alla heltal från 1 till och med 100 och skriv ut den.`,starter:``,output:`5050`,solution:`i = 1
summa = 0
while i <= 100:
    summa += i
    i += 1
print(summa)`,require:[h(`\\bwhile\\b`,`Uppgiften övar while.`)],forbid:[h(`5050`,`Låt loopen räkna fram svaret.`)],explain:`En variabel räknar upp och en annan samlar summan. Summan skrivs ut efter loopen, en gång.`,hint:`Skapa i = 1 och summa = 0. I loopen: summa += i och i += 1.`},{type:`code`,prompt:`Börja med talet 1 och dubbla det tills det är minst 1000. Skriv ut hur många gånger du behövde dubbla.`,starter:``,output:`10`,solution:`tal = 1
gånger = 0
while tal < 1000:
    tal = tal * 2
    gånger += 1
print(gånger)`,require:[h(`\\bwhile\\b`,`Använd en while-loop.`)],forbid:[h(`print\\s*\\(\\s*10\\s*\\)`,`Räkna fram svaret med loopen.`)],explain:`Här vet du inte i förväg hur många varv det blir. Då passar while, med en räknare som ökar varje varv.`,hint:`Två variabler: tal = 1 och gånger = 0. Loopa medan tal < 1000.`}],"py-for":[{type:`code`,prompt:"Skriv ut talen 1 till 15 på varsin rad, men skriv `Fizz` för tal delbara med 3, `Buzz` för tal delbara med 5 och `FizzBuzz` för tal delbara med både 3 och 5.",starter:``,output:`1
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
FizzBuzz`,solution:`for i in range(1, 16):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,require:[h(`\\bfor\\b`,`Använd en for-loop.`),h(`%`,`Använd % för att se om ett tal är delbart.`)],explain:`Ett tal delbart med både 3 och 5 är delbart med 15. Det fallet måste testas först, annars vinner Fizz.`,hint:`Testa i % 15 == 0 först, sedan i % 3 och i % 5.`},{type:`code`,prompt:`Räkna ut 1 * 2 * 3 * 4 * 5 * 6 med en for-loop och skriv ut svaret.`,starter:``,output:`720`,solution:`produkt = 1
for i in range(1, 7):
    produkt = produkt * i
print(produkt)`,require:[h(`\\bfor\\b`,`Använd en for-loop.`)],forbid:[h(`720`,`Låt loopen räkna fram svaret.`),h(`\\*\\s*2\\s*\\*\\s*3`,`Låt loopen göra multiplikationerna.`)],explain:`En produkt måste börja på 1. Om den börjar på 0 blir allt 0.`,hint:`produkt = 1 före loopen och produkt = produkt * i inne i den. range(1, 7) ger 1 till 6.`}],"py-list":[{type:`code`,prompt:"Byt plats på första och sista elementet i listan och skriv ut hela listan. Det ska bli `[42, 8, 15, 16, 23, 4]`. Använd index, och skriv inte om listan för hand.",starter:`tal = [4, 8, 15, 16, 23, 42]
`,output:`[42, 8, 15, 16, 23, 4]`,solution:`tal = [4, 8, 15, 16, 23, 42]
temp = tal[0]
tal[0] = tal[-1]
tal[-1] = temp
print(tal)`,require:[h(`tal\\s*\\[\\s*0\\s*\\]\\s*=`,`Ändra första elementet med tal[0] = ...`)],forbid:[h(`\\[\\s*42\\s*,`,`Byt plats med index i stället för att skriva listan igen.`)],explain:`Samma knep som när två variabler byter värden: spara det ena i en tillfällig variabel först.`,hint:`temp = tal[0], tal[0] = tal[-1], tal[-1] = temp.`},{type:`code`,prompt:"Skriv ut elementet i mitten av listan med hjälp av `len` och `//`. Lägg sedan till 8 sist och skriv ut elementet på index `len(tal) // 2` igen. Svaren ska bli 2 och 7.",starter:`tal = [5, 9, 2, 7, 1]
`,output:`2
7`,solution:`tal = [5, 9, 2, 7, 1]
print(tal[len(tal) // 2])
tal.append(8)
print(tal[len(tal) // 2])`,require:[h(`len\\s*\\(\\s*tal\\s*\\)\\s*//\\s*2`,`Räkna ut index med len(tal) // 2.`),h(`\\.append\\s*\\(\\s*8\\s*\\)`,`Lägg till 8 med append.`)],forbid:[h(`tal\\s*\\[\\s*\\d\\s*\\]`,`Räkna ut index med len i stället för att skriva in ett tal.`)],explain:`Fem element ger index 5 // 2 = 2. Efter append finns sex element och index 6 // 2 = 3.`,hint:`print(tal[len(tal) // 2]) både före och efter append.`}],"py-listloop":[{type:`code`,prompt:"Bygg en ny lista `dubbla` där varje tal från `tal` är dubbelt så stort, och skriv ut den. Det ska bli `[2, 8, 12, 0]`.",starter:`tal = [1, 4, 6, 0]
`,output:`[2, 8, 12, 0]`,solution:`tal = [1, 4, 6, 0]
dubbla = []
for t in tal:
    dubbla.append(t * 2)
print(dubbla)`,require:[h(`\\bfor\\b`,`Gå igenom listan med en for-loop.`),h(`\\.append\\s*\\(`,`Lägg till varje nytt tal med append.`)],forbid:[h(`\\[\\s*2\\s*,\\s*8`,`Bygg listan med loopen i stället för att skriva den.`)],explain:`Den nya listan skapas tom före loopen och fylls på ett varv i taget.`,hint:`dubbla = [] före loopen och dubbla.append(t * 2) inne i den.`},{type:`code`,prompt:`Gå igenom listan en gång. Skriv först ut summan av de udda talen, sedan hur många jämna tal det finns. Svaren ska bli 15 och 2.`,starter:`tal = [3, 8, 5, 10, 7]
`,output:`15
2`,solution:`tal = [3, 8, 5, 10, 7]
summa_udda = 0
antal_jämna = 0
for t in tal:
    if t % 2 == 0:
        antal_jämna += 1
    else:
        summa_udda += t
print(summa_udda)
print(antal_jämna)`,require:[h(`\\bfor\\b`,`Gå igenom listan med en for-loop.`)],forbid:[h(`print\\s*\\(\\s*\\d+\\s*\\)`,`Räkna fram svaren i stället för att skriva in dem.`)],explain:`Två ackumulatorer kan uppdateras i samma loop. if och else väljer vilken av dem som ändras.`,hint:`Skapa två variabler före loopen. Använd t % 2 == 0 för att se om talet är jämnt.`}],"py-strmeth":[{type:`code`,prompt:'Skriv `initialer(namn)` som returnerar initialerna med stor bokstav och en punkt efter varje. `initialer("ada lovelace")` ska ge `"A.L."`. Extra mellanslag ska inte störa.',starter:`def initialer(namn):
    pass
`,tests:[{fn:`initialer`,args:[`ada lovelace`],expect:`A.L.`},{fn:`initialer`,args:[`  grace   hopper `],expect:`G.H.`,edge:`extra mellanslag`},{fn:`initialer`,args:[`milo`],expect:`M.`,edge:`bara ett namn`},{fn:`initialer`,args:[``],expect:``,edge:`tom text`}],solution:`def initialer(namn):
    svar = ""
    for del_namn in namn.split():
        svar += del_namn[0].upper() + "."
    return svar`,explain:`split() utan argument delar på alla mellanslag och hoppar över tomma bitar. Tom text ger en tom lista, så loopen körs aldrig.`,hint:`Loopa över namn.split() och lägg till del[0].upper() + "." i en text som börjar tom.`},{type:`code`,prompt:'Skriv `slug(rubrik)` som gör en rubrik till en webbadress-del: små bokstäver och ord ihopsatta med bindestreck. `slug("  Min Första Kod ")` ska ge `"min-första-kod"`.',starter:`def slug(rubrik):
    pass
`,tests:[{fn:`slug`,args:[`Min Första Kod`],expect:`min-första-kod`},{fn:`slug`,args:[`  Hej   Kodstig  `],expect:`hej-kodstig`,edge:`flera mellanslag`},{fn:`slug`,args:[`PANDA`],expect:`panda`,edge:`ett ord`},{fn:`slug`,args:[``],expect:``,edge:`tom text`}],solution:`def slug(rubrik):
    return "-".join(rubrik.lower().split())`,explain:`split() tar bort alla mellanslag och join sätter ihop orden med bindestreck. Metoder kan kedjas: rubrik.lower().split().`,hint:`Gör om till små bokstäver, dela med split() och sätt ihop med "-".join(...).`}],"py-convert":[{type:`code`,prompt:'Skriv `summera_text(text)` som tar en text med heltal åtskilda av mellanslag och returnerar summan. `summera_text("3 4 5")` ska ge 12.',starter:`def summera_text(text):
    pass
`,tests:[{fn:`summera_text`,args:[`3 4 5`],expect:12},{fn:`summera_text`,args:[`  10  `],expect:10,edge:`ett tal med mellanslag`},{fn:`summera_text`,args:[`7 -2`],expect:5,edge:`negativt tal`},{fn:`summera_text`,args:[``],expect:0,edge:`tom text`}],solution:`def summera_text(text):
    summa = 0
    for bit in text.split():
        summa += int(bit)
    return summa`,explain:`split() ger en lista med texter. Varje bit måste göras om med int() innan den kan adderas.`,hint:`Loopa över text.split() och lägg till int(bit) i en summa.`},{type:`code`,prompt:"Skriv `antal_siffror(tal)` som returnerar hur många siffror ett heltal har. Minustecknet räknas inte som en siffra.",starter:`def antal_siffror(tal):
    pass
`,tests:[{fn:`antal_siffror`,args:[2025],expect:4},{fn:`antal_siffror`,args:[7],expect:1},{fn:`antal_siffror`,args:[0],expect:1,edge:`noll`},{fn:`antal_siffror`,args:[-305],expect:3,edge:`negativt tal`}],solution:`def antal_siffror(tal):
    text = str(tal)
    return len(text.replace("-", ""))`,explain:`Genom att göra om talet till text kan du räkna tecknen med len. replace tar bort minustecknet först.`,hint:`str(tal) ger text. Ta bort "-" med replace och använd len.`}],"py-logic":[{type:`code`,prompt:"Skriv `skottår(år)` som returnerar True för skottår. Ett år är skottår om det är delbart med 4 men inte med 100, eller om det är delbart med 400.",starter:`def skottår(år):
    pass
`,tests:[{fn:`skottår`,args:[2024],expect:!0},{fn:`skottår`,args:[2023],expect:!1},{fn:`skottår`,args:[1900],expect:!1,edge:`delbart med 100`},{fn:`skottår`,args:[2e3],expect:!0,edge:`delbart med 400`}],solution:`def skottår(år):
    return (år % 4 == 0 and år % 100 != 0) or år % 400 == 0`,require:[h(`\\band\\b|\\bor\\b`,`Kombinera villkoren med and och or.`)],explain:`Parenteserna visar att ”delbart med 4 men inte med 100” hör ihop, och or lägger till undantaget för 400.`,hint:`(år % 4 == 0 and år % 100 != 0) or år % 400 == 0`},{type:`code`,prompt:"Skriv `starkt_lösen(lösen)` som returnerar True om lösenordet har minst 8 tecken, minst en stor bokstav och minst en liten bokstav. Tips: om `lösen != lösen.lower()` finns det en stor bokstav.",starter:`def starkt_lösen(lösen):
    pass
`,tests:[{fn:`starkt_lösen`,args:[`Panda123`],expect:!0},{fn:`starkt_lösen`,args:[`panda123`],expect:!1,edge:`ingen stor bokstav`},{fn:`starkt_lösen`,args:[`PANDA123`],expect:!1,edge:`ingen liten bokstav`},{fn:`starkt_lösen`,args:[`Pan1`],expect:!1,edge:`för kort`},{fn:`starkt_lösen`,args:[`Abcdefgh`],expect:!0,edge:`exakt 8 tecken`}],solution:`def starkt_lösen(lösen):
    har_stor = lösen != lösen.lower()
    har_liten = lösen != lösen.upper()
    return len(lösen) >= 8 and har_stor and har_liten`,explain:`Om texten ändras av lower() måste den ha innehållit en stor bokstav. På samma sätt visar upper() om det finns en liten.`,hint:`Spara har_stor och har_liten i variabler och kombinera med and.`}],"py-accum":[{type:`code`,prompt:"Skriv `längsta_ord(ord)` som returnerar det längsta ordet. Vid lika längd vinner det första. Tom lista ger tom text.",starter:`def längsta_ord(ord):
    pass
`,tests:[{fn:`längsta_ord`,args:[[`sol`,`bambu`,`kod`]],expect:`bambu`},{fn:`längsta_ord`,args:[[`katt`,`hund`,`gris`]],expect:`katt`,edge:`lika långa: första vinner`},{fn:`längsta_ord`,args:[[]],expect:``,edge:`tom lista`}],forbid:[h(`\\bmax\\s*\\(`,`Lös det med en loop, utan max().`)],solution:`def längsta_ord(ord):
    bäst = ""
    for o in ord:
        if len(o) > len(bäst):
            bäst = o
    return bäst`,explain:`Tom text har längden 0, så den fungerar som start. Med > byts ordet bara när ett strikt längre dyker upp.`,hint:`Börja med bäst = "" och jämför len(o) med len(bäst).`},{type:`code`,prompt:"Skriv `minst_och_störst(tal)` som returnerar en lista `[minst, störst]` utan att använda `min` eller `max`. Tom lista ger `[]`.",starter:`def minst_och_störst(tal):
    pass
`,tests:[{fn:`minst_och_störst`,args:[[4,9,1,7]],expect:[1,9]},{fn:`minst_och_störst`,args:[[5]],expect:[5,5],edge:`ett element`},{fn:`minst_och_störst`,args:[[-3,-8,-1]],expect:[-8,-1],edge:`bara negativa tal`},{fn:`minst_och_störst`,args:[[]],expect:[],edge:`tom lista`}],forbid:[h(`\\b(min|max)\\s*\\(`,`Lös det med en loop, utan min() och max().`)],solution:`def minst_och_störst(tal):
    if len(tal) == 0:
        return []
    minst = tal[0]
    störst = tal[0]
    for t in tal:
        if t < minst:
            minst = t
        if t > störst:
            störst = t
    return [minst, störst]`,explain:`Båda ackumulatorerna startar på första elementet. Två separata if gör att ett tal kan uppdatera båda.`,hint:`Hantera tom lista först. Starta minst och störst på tal[0].`},{type:`code`,prompt:"Skriv `över_snitt(tal)` som returnerar hur många tal som är strikt större än medelvärdet. Tom lista ger 0.",starter:`def över_snitt(tal):
    pass
`,tests:[{fn:`över_snitt`,args:[[1,2,3,4]],expect:2},{fn:`över_snitt`,args:[[5,5,5]],expect:0,edge:`alla lika`},{fn:`över_snitt`,args:[[10,0,0,0]],expect:1},{fn:`över_snitt`,args:[[]],expect:0,edge:`tom lista`}],solution:`def över_snitt(tal):
    if len(tal) == 0:
        return 0
    summa = 0
    for t in tal:
        summa += t
    snitt = summa / len(tal)
    antal = 0
    for t in tal:
        if t > snitt:
            antal += 1
    return antal`,explain:`Medelvärdet måste vara klart innan du kan jämföra mot det. Därför behövs två loopar efter varandra.`,hint:`Första loopen räknar summan. Räkna ut snittet. Andra loopen räknar tal > snitt.`}],"py-index":[{type:`code`,prompt:"Skriv `alla_index(tal, mål)` som returnerar en lista med alla index där mål finns.",starter:`def alla_index(tal, mål):
    pass
`,tests:[{fn:`alla_index`,args:[[4,8,4,2,4],4],expect:[0,2,4]},{fn:`alla_index`,args:[[1,2],9],expect:[],edge:`saknas`},{fn:`alla_index`,args:[[],1],expect:[],edge:`tom lista`}],solution:`def alla_index(tal, mål):
    svar = []
    for i in range(len(tal)):
        if tal[i] == mål:
            svar.append(i)
    return svar`,explain:`Här ska loopen inte avbrytas vid första träffen. Varje index sparas i en lista.`,hint:`Skapa en tom lista och append i varje gång tal[i] == mål.`},{type:`code`,prompt:"Skriv `är_sorterad(tal)` som returnerar True om varje tal är minst lika stort som talet före. En tom lista och en lista med ett element räknas som sorterade.",starter:`def är_sorterad(tal):
    pass
`,tests:[{fn:`är_sorterad`,args:[[1,3,5]],expect:!0},{fn:`är_sorterad`,args:[[1,4,2]],expect:!1},{fn:`är_sorterad`,args:[[2,2,3]],expect:!0,edge:`lika tal i rad`},{fn:`är_sorterad`,args:[[7]],expect:!0,edge:`ett element`},{fn:`är_sorterad`,args:[[]],expect:!0,edge:`tom lista`},{fn:`är_sorterad`,args:[[1,2,3,0]],expect:!1,edge:`felet sist`}],forbid:[h(`\\bsort`,`Jämför grannarna med en loop i stället.`)],solution:`def är_sorterad(tal):
    for i in range(1, len(tal)):
        if tal[i] < tal[i - 1]:
            return False
    return True`,explain:`Ett enda par i fel ordning räcker för att svara False direkt. Först när alla par är kontrollerade kan du svara True.`,hint:`Loopa från index 1 och returnera False om tal[i] < tal[i - 1].`},{type:`code`,prompt:"Skriv `största_ökning(tal)` som returnerar den största ökningen mellan två tal som står bredvid varandra. Om det inte finns någon ökning alls, returnera 0.",starter:`def största_ökning(tal):
    pass
`,tests:[{fn:`största_ökning`,args:[[1,4,2,9]],expect:7},{fn:`största_ökning`,args:[[10,12,11,14]],expect:3},{fn:`största_ökning`,args:[[9,5,1]],expect:0,edge:`bara minskningar`},{fn:`största_ökning`,args:[[3]],expect:0,edge:`ett element`},{fn:`största_ökning`,args:[[]],expect:0,edge:`tom lista`}],solution:`def största_ökning(tal):
    bäst = 0
    for i in range(1, len(tal)):
        ökning = tal[i] - tal[i - 1]
        if ökning > bäst:
            bäst = ökning
    return bäst`,explain:`Här kombineras två mönster: jämföra med talet före, och spara det största hittills. Starten 0 ger rätt svar när inget ökar.`,hint:`Räkna ökning = tal[i] - tal[i - 1] och spara den om den är större än bäst.`}],"py-filter":[{type:`code`,prompt:"Skriv `utan(tal, bort)` som returnerar en ny lista utan några förekomster av talet bort. Använd inte `remove`.",starter:`def utan(tal, bort):
    pass
`,tests:[{fn:`utan`,args:[[1,2,1,3],1],expect:[2,3]},{fn:`utan`,args:[[5,5],5],expect:[],edge:`allt försvinner`},{fn:`utan`,args:[[1,2],9],expect:[1,2],edge:`inget att ta bort`},{fn:`utan`,args:[[],1],expect:[]}],forbid:[h(`\\.remove\\s*\\(`,`Bygg en ny lista med en loop i stället för remove.`)],solution:`def utan(tal, bort):
    resultat = []
    for t in tal:
        if t != bort:
            resultat.append(t)
    return resultat`,explain:`Att bygga en ny lista med det som ska vara kvar är enklare och säkrare än att ta bort ur originalet.`,hint:`append t bara när t != bort.`},{type:`code`,prompt:"Skriv `dela_upp(tal)` som returnerar en lista med två listor: först de jämna talen, sedan de udda, båda i ursprunglig ordning.",starter:`def dela_upp(tal):
    pass
`,tests:[{fn:`dela_upp`,args:[[1,2,3,4,5]],expect:[[2,4],[1,3,5]]},{fn:`dela_upp`,args:[[0,-3]],expect:[[0],[-3]],edge:`0 och negativa tal`},{fn:`dela_upp`,args:[[]],expect:[[],[]],edge:`tom lista`}],solution:`def dela_upp(tal):
    jämna = []
    udda = []
    for t in tal:
        if t % 2 == 0:
            jämna.append(t)
        else:
            udda.append(t)
    return [jämna, udda]`,explain:`Med if och else hamnar varje tal i exakt en av listorna, så ingenting försvinner.`,hint:`Två tomma listor före loopen, och returnera [jämna, udda].`},{type:`code`,prompt:"Skriv `rensa_namn(namn)` som tar en lista med namn och returnerar en ny lista där tomma namn är borttagna, mellanslag i kanterna är borta och varje namn har stor första bokstav och resten små.",starter:`def rensa_namn(namn):
    pass
`,tests:[{fn:`rensa_namn`,args:[[` ada`,`LINUS `,`grace`]],expect:[`Ada`,`Linus`,`Grace`]},{fn:`rensa_namn`,args:[[``,`   `,`mo`]],expect:[`Mo`],edge:`tomma namn ska bort`},{fn:`rensa_namn`,args:[[`a`]],expect:[`A`],edge:`en bokstav`},{fn:`rensa_namn`,args:[[]],expect:[]}],solution:`def rensa_namn(namn):
    resultat = []
    for n in namn:
        rent = n.strip()
        if rent != "":
            resultat.append(rent[0].upper() + rent[1:].lower())
    return resultat`,explain:`Rensa först, kontrollera sedan att något finns kvar, och först därefter kan rent[0] läsas utan IndexError.`,hint:`strip(), hoppa över tom text, och bygg namnet med rent[0].upper() + rent[1:].lower().`}],"py-def":[{type:`code`,prompt:"Skriv två funktioner. `linje()` skriver ut `==========` (tio likhetstecken). `rubrik()` anropar linje, skriver ut `Kodstig` och anropar linje igen. Anropa sedan rubrik två gånger.",starter:``,output:`==========
Kodstig
==========
==========
Kodstig
==========`,solution:`def linje():
    print("==========")

def rubrik():
    linje()
    print("Kodstig")
    linje()

rubrik()
rubrik()`,require:[h(`def\\s+linje\\s*\\(\\s*\\)\\s*:`,`Skapa funktionen med def linje():`),h(`def\\s+rubrik\\s*\\(\\s*\\)\\s*:`,`Skapa funktionen med def rubrik():`),h(`def\\s+rubrik\\s*\\(\\s*\\)\\s*:\\s*\\n\\s+linje\\s*\\(`,`rubrik() ska börja med att anropa linje().`)],forbid:[h(`"==========[\\s\\S]*"==========`,`Skriv likhetstecknen på ett enda ställe, i linje().`)],explain:`En funktion kan anropa en annan. Nu skrivs linjen på ett ställe men används fyra gånger.`,hint:`I rubrik(): linje(), print("Kodstig"), linje(). Avsluta med två anrop av rubrik().`},{type:`debug`,prompt:"Programmet kraschar med NameError. Rätta det så att det skriver ut `Hej!` två gånger, och behåll funktionen.",starter:`hälsa()

def hälsa():
    print("Hej!")

hälsa()`,output:`Hej!
Hej!`,solution:`def hälsa():
    print("Hej!")

hälsa()
hälsa()`,require:[h(`def\\s+hälsa`,`Behåll funktionen hälsa.`)],forbid:[h(`print\\s*\\(\\s*"Hej!"\\s*\\)[\\s\\S]*print\\s*\\(\\s*"Hej!"`,`Anropa funktionen två gånger i stället för att skriva print två gånger.`)],explain:`Python läser uppifrån och ner. Funktionen måste vara skapad med def innan den kan anropas.`,hint:`Flytta det första anropet så att det ligger efter def-blocket.`}],"py-params":[{type:`code`,prompt:'Skriv `ruta(bredd, höjd, tecken="#")` som skriver ut en rektangel med höjd rader, där varje rad är tecken upprepat bredd gånger. Anropa `ruta(4, 2)` och sedan `ruta(3, 1, "*")`.',starter:``,output:`####
####
***`,solution:`def ruta(bredd, höjd, tecken="#"):
    for i in range(höjd):
        print(tecken * bredd)

ruta(4, 2)
ruta(3, 1, "*")`,require:[h(`def\\s+ruta\\s*\\([^)]*tecken\\s*=\\s*"`,`Ge tecken standardvärdet "#".`),h(`ruta\\s*\\(\\s*4\\s*,\\s*2\\s*\\)`,`Anropa ruta(4, 2).`)],explain:`Parametrarna styr både loopen och vad som skrivs ut. Standardvärdet används när du inte skickar med något tecken.`,hint:`En for-loop med range(höjd) och print(tecken * bredd) inuti.`},{type:`code`,prompt:'Skriv `kvittorad(vara, pris, antal=1)` som skriver ut till exempel `2 x bulle = 50 kr`. Anropa den med `("kaffe", 30)` och sedan `("bulle", 25, 2)`.',starter:``,output:`1 x kaffe = 30 kr
2 x bulle = 50 kr`,solution:`def kvittorad(vara, pris, antal=1):
    print(f"{antal} x {vara} = {pris * antal} kr")

kvittorad("kaffe", 30)
kvittorad("bulle", 25, 2)`,require:[h(`def\\s+kvittorad\\s*\\([^)]*antal\\s*=\\s*1`,`Ge antal standardvärdet 1.`)],forbid:[h(`50 kr`,`Låt funktionen räkna ut totalen.`)],explain:`Standardvärdet antal=1 gör det enkla fallet kort att skriva, men går fortfarande att ändra.`,hint:`print(f"{antal} x {vara} = {pris * antal} kr")`}],"py-return":[{type:`code`,prompt:"Skriv `störst_av_tre(a, b, c)` som returnerar det största av tre tal, utan att använda `max`.",starter:`def störst_av_tre(a, b, c):
    pass
`,tests:[{fn:`störst_av_tre`,args:[1,5,3],expect:5},{fn:`störst_av_tre`,args:[9,2,4],expect:9},{fn:`störst_av_tre`,args:[1,2,8],expect:8},{fn:`störst_av_tre`,args:[4,4,1],expect:4,edge:`två lika`},{fn:`störst_av_tre`,args:[-5,-2,-9],expect:-2,edge:`negativa tal`}],forbid:[h(`\\bmax\\s*\\(`,`Lös det med if och return, utan max().`)],solution:`def störst_av_tre(a, b, c):
    if a >= b and a >= c:
        return a
    if b >= c:
        return b
    return c`,explain:`return avslutar funktionen direkt. När a inte är störst behöver du bara jämföra b och c.`,hint:`Returnera a om a >= b och a >= c. Annars jämför b med c.`},{type:`code`,prompt:'Skriv `betyg(poäng)` som returnerar `"A"` för 90 eller mer, `"C"` för 60 eller mer, `"E"` för 40 eller mer och annars `"F"`. Poäng under 0 eller över 100 ger `"Ogiltigt"`.',starter:`def betyg(poäng):
    pass
`,tests:[{fn:`betyg`,args:[95],expect:`A`},{fn:`betyg`,args:[90],expect:`A`,edge:`exakt 90`},{fn:`betyg`,args:[89],expect:`C`},{fn:`betyg`,args:[40],expect:`E`,edge:`exakt 40`},{fn:`betyg`,args:[0],expect:`F`,edge:`noll`},{fn:`betyg`,args:[-1],expect:`Ogiltigt`,edge:`under 0`},{fn:`betyg`,args:[101],expect:`Ogiltigt`,edge:`över 100`}],solution:`def betyg(poäng):
    if poäng < 0 or poäng > 100:
        return "Ogiltigt"
    if poäng >= 90:
        return "A"
    if poäng >= 60:
        return "C"
    if poäng >= 40:
        return "E"
    return "F"`,explain:`De ogiltiga värdena hanteras först. Eftersom return avslutar funktionen behövs inget elif efter.`,hint:`Börja med poäng < 0 or poäng > 100, och testa sedan från högsta gränsen och nedåt.`}],"py-dict":[{type:`code`,prompt:"Skriv `kvitto_total(korg, pris)` där korg är en lista med varor och pris en ordbok. Returnera totalpriset. Varor som saknas i pris kostar 0.",starter:`def kvitto_total(korg, pris):
    pass
`,tests:[{fn:`kvitto_total`,args:[[`kaffe`,`bulle`,`kaffe`],{kaffe:30,bulle:25}],expect:85},{fn:`kvitto_total`,args:[[`te`,`bulle`],{bulle:25}],expect:25,edge:`okänd vara`},{fn:`kvitto_total`,args:[[],{kaffe:30}],expect:0,edge:`tom korg`}],solution:`def kvitto_total(korg, pris):
    total = 0
    for vara in korg:
        total += pris.get(vara, 0)
    return total`,explain:`get(vara, 0) gör att en okänd vara inte kraschar programmet med KeyError.`,hint:`Loopa över korg och lägg till pris.get(vara, 0).`},{type:`code`,prompt:"Skriv `dyraste(pris)` som returnerar namnet på den dyraste varan i ordboken. Vid lika pris vinner den som kommer först. En tom ordbok ger tom text.",starter:`def dyraste(pris):
    pass
`,tests:[{fn:`dyraste`,args:[{kaffe:30,bulle:25,tårta:45}],expect:`tårta`},{fn:`dyraste`,args:[{te:20,saft:20}],expect:`te`,edge:`lika pris: första vinner`},{fn:`dyraste`,args:[{kaka:-5}],expect:`kaka`,edge:`negativt pris`},{fn:`dyraste`,args:[{}],expect:``,edge:`tom ordbok`}],forbid:[h(`\\bmax\\s*\\(`,`Lös det med en loop, utan max().`)],solution:`def dyraste(pris):
    bäst = ""
    for vara, kr in pris.items():
        if bäst == "" or kr > pris[bäst]:
            bäst = vara
    return bäst`,explain:`Den första varan tas alltid, sedan byts den bara mot en strikt dyrare. Då fungerar även negativa priser.`,hint:`Loopa med items(). Byt bäst om bäst är tom eller om kr > pris[bäst].`}],"py-validate":[{type:`debug`,prompt:`Funktionen ska godkänna åldrar från 13 till och med 19, men gränserna är fel. Rätta den.`,starter:`def tonåring(ålder):
    return ålder > 13 and ålder < 19
`,tests:[{fn:`tonåring`,args:[15],expect:!0},{fn:`tonåring`,args:[13],expect:!0,edge:`exakt 13`},{fn:`tonåring`,args:[19],expect:!0,edge:`exakt 19`},{fn:`tonåring`,args:[12],expect:!1},{fn:`tonåring`,args:[20],expect:!1}],solution:`def tonåring(ålder):
    return ålder >= 13 and ålder <= 19`,explain:`”Till och med” betyder att gränsvärdet ska räknas med, alltså >= och <=.`,hint:`Byt > mot >= och < mot <=.`},{type:`code`,prompt:"Skriv `rensa_tal(texter)` som tar en lista med texter och returnerar en lista med heltal för de texter som är giltiga positiva heltal (mellanslag runt om är okej). Allt annat hoppas över.",starter:`def rensa_tal(texter):
    pass
`,tests:[{fn:`rensa_tal`,args:[[`4`,` 12 `,`tre`,`7`]],expect:[4,12,7]},{fn:`rensa_tal`,args:[[``,`  `,`-5`]],expect:[],edge:`tomt och negativt`},{fn:`rensa_tal`,args:[[`2.5`,`0`]],expect:[0],edge:`decimaltal hoppas över`},{fn:`rensa_tal`,args:[[]],expect:[]}],solution:`def rensa_tal(texter):
    resultat = []
    for t in texter:
        rent = t.strip()
        if rent.isdigit():
            resultat.append(int(rent))
    return resultat`,explain:`isdigit() är False för tom text, minustecken och punkt. Därför kan int() bara anropas på säkra värden.`,hint:`strip, kontrollera isdigit, och append int(rent).`},{type:`code`,prompt:"Skriv `giltig_tid(text)` som returnerar True om texten är en tid i formatet `HH:MM`, med timmar 00 till 23 och minuter 00 till 59.",starter:`def giltig_tid(text):
    pass
`,tests:[{fn:`giltig_tid`,args:[`08:30`],expect:!0},{fn:`giltig_tid`,args:[`23:59`],expect:!0,edge:`högsta tillåtna`},{fn:`giltig_tid`,args:[`00:00`],expect:!0,edge:`midnatt`},{fn:`giltig_tid`,args:[`24:00`],expect:!1,edge:`timme 24`},{fn:`giltig_tid`,args:[`12:60`],expect:!1,edge:`minut 60`},{fn:`giltig_tid`,args:[`8:30`],expect:!1,edge:`för kort`},{fn:`giltig_tid`,args:[`ab:cd`],expect:!1,edge:`bokstäver`},{fn:`giltig_tid`,args:[`1230`],expect:!1,edge:`kolon saknas`},{fn:`giltig_tid`,args:[``],expect:!1,edge:`tom text`}],solution:`def giltig_tid(text):
    if len(text) != 5 or text[2] != ":":
        return False
    timme = text[0:2]
    minut = text[3:5]
    if not timme.isdigit() or not minut.isdigit():
        return False
    return int(timme) <= 23 and int(minut) <= 59`,explain:`Kontrollerna kommer i en säker ordning: först längden så att text[2] finns, sedan siffrorna så att int() inte kraschar, sist gränserna.`,hint:`Kontrollera len(text) == 5 och text[2] == ":". Dela med text[0:2] och text[3:5], kontrollera isdigit och sedan gränserna.`}],"py-budget":[{type:`code`,prompt:"Del 4: Skriv `per_kategori(poster)` där poster är en lista med par `[kategori, belopp]`. Returnera en ordbok med summan per kategori. Belopp som är 0 eller negativa hoppas över helt.",starter:`def per_kategori(poster):
    pass
`,tests:[{fn:`per_kategori`,args:[[[`mat`,300],[`nöje`,150],[`mat`,200]]],expect:{mat:500,nöje:150}},{fn:`per_kategori`,args:[[[`mat`,-50],[`hyra`,4e3],[`nöje`,0]]],expect:{hyra:4e3},edge:`negativa och noll hoppas över`},{fn:`per_kategori`,args:[[]],expect:{}}],solution:`def per_kategori(poster):
    summa = {}
    for post in poster:
        kategori = post[0]
        belopp = post[1]
        if belopp > 0:
            summa[kategori] = summa.get(kategori, 0) + belopp
    return summa`,explain:`Valideringen sker innan ordboken ändras. Därför får en kategori med bara ogiltiga belopp ingen nyckel alls.`,hint:`Läs post[0] och post[1]. Använd get(kategori, 0) bara när belopp > 0.`},{type:`code`,prompt:'Del 5: Skriv `största_post(summa)` som tar en ordbok med summa per kategori och returnerar texten `"Mest: KATEGORI (X kr)"`. Vid lika vinner den första. Tom ordbok ger `"Inga utgifter"`.',starter:`def största_post(summa):
    pass
`,tests:[{fn:`största_post`,args:[{mat:500,hyra:4e3,nöje:150}],expect:`Mest: hyra (4000 kr)`},{fn:`största_post`,args:[{mat:300,buss:300}],expect:`Mest: mat (300 kr)`,edge:`lika: första vinner`},{fn:`största_post`,args:[{}],expect:`Inga utgifter`,edge:`tom ordbok`}],forbid:[h(`\\bmax\\s*\\(`,`Lös det med en loop, utan max().`)],solution:`def största_post(summa):
    bäst = ""
    for kategori, kr in summa.items():
        if bäst == "" or kr > summa[bäst]:
            bäst = kategori
    if bäst == "":
        return "Inga utgifter"
    return f"Mest: {bäst} ({summa[bäst]} kr)"`,explain:`Loopen hittar nyckeln, och f-strängen bygger svaret av både nyckeln och dess värde.`,hint:`Spara bästa kategorin i en loop över items(), och hantera tom ordbok innan du bygger texten.`},{type:`code`,prompt:"Del 6: Skriv `procent_kvar(inkomst, utgifter)` som returnerar hur många hela procent av inkomsten som blir kvar. Negativa utgifter ignoreras. Om inkomsten är 0 eller mindre, eller om utgifterna är större än inkomsten, returnera 0.",starter:`def procent_kvar(inkomst, utgifter):
    pass
`,tests:[{fn:`procent_kvar`,args:[7e3,[4500,1200]],expect:18},{fn:`procent_kvar`,args:[1e3,[250,-100]],expect:75,edge:`negativa utgifter ignoreras`},{fn:`procent_kvar`,args:[1e3,[]],expect:100,edge:`inga utgifter`},{fn:`procent_kvar`,args:[500,[800]],expect:0,edge:`mer utgifter än inkomst`},{fn:`procent_kvar`,args:[0,[10]],expect:0,edge:`ingen inkomst`}],solution:`def procent_kvar(inkomst, utgifter):
    if inkomst <= 0:
        return 0
    summa = 0
    for u in utgifter:
        if u > 0:
            summa += u
    kvar = inkomst - summa
    if kvar < 0:
        return 0
    return kvar * 100 // inkomst`,explain:`Kontrollen av inkomsten skyddar mot division med noll. Genom att multiplicera med 100 före // blir svaret hela procent.`,hint:`Hantera inkomst <= 0 först, summera positiva utgifter, och räkna kvar * 100 // inkomst.`}],"py-scores":[{type:`code`,prompt:"Del 4: Skriv `vinnare(namn, poäng)` som returnerar en lista med namnen på alla som har högsta poängen, i ursprunglig ordning. Tomma listor ger `[]`.",starter:`def vinnare(namn, poäng):
    pass
`,tests:[{fn:`vinnare`,args:[[`Ada`,`Linus`,`Mo`],[7,9,4]],expect:[`Linus`]},{fn:`vinnare`,args:[[`Ada`,`Linus`,`Mo`],[9,3,9]],expect:[`Ada`,`Mo`],edge:`delad seger`},{fn:`vinnare`,args:[[`Bo`],[-2]],expect:[`Bo`],edge:`negativ poäng`},{fn:`vinnare`,args:[[],[]],expect:[],edge:`tomma listor`}],solution:`def vinnare(namn, poäng):
    if len(poäng) == 0:
        return []
    högst = poäng[0]
    for p in poäng:
        if p > högst:
            högst = p
    svar = []
    for n, p in zip(namn, poäng):
        if p == högst:
            svar.append(n)
    return svar`,explain:`Först behöver du veta vad högsta poängen är. Sedan filtrerar en andra loop fram alla som har den.`,hint:`Hitta högsta poängen i en loop, och samla namnen med zip i en andra loop.`},{type:`code`,prompt:"Del 5: Skriv `placeringar(poäng)` som returnerar varje deltagares placering. Placeringen är 1 plus antalet som har strikt fler poäng, så lika poäng ger samma placering. `[10, 30, 20, 30]` ger `[4, 1, 3, 1]`.",starter:`def placeringar(poäng):
    pass
`,tests:[{fn:`placeringar`,args:[[10,30,20]],expect:[3,1,2]},{fn:`placeringar`,args:[[10,30,20,30]],expect:[4,1,3,1],edge:`delad förstaplats`},{fn:`placeringar`,args:[[5,5,5]],expect:[1,1,1],edge:`alla lika`},{fn:`placeringar`,args:[[]],expect:[],edge:`tom lista`}],solution:`def placeringar(poäng):
    svar = []
    for p in poäng:
        placering = 1
        for annan in poäng:
            if annan > p:
                placering += 1
        svar.append(placering)
    return svar`,explain:`En loop inuti en loop jämför varje deltagare med alla andra. Strikt > gör att lika poäng inte trycker ner varandra.`,hint:`För varje p: börja på 1 och öka för varje annan poäng som är större än p.`},{type:`code`,prompt:"Del 6: Skriv `efter_ledaren(total)` som tar en ordbok med totalpoäng och returnerar en ny ordbok med hur många poäng varje deltagare ligger efter ledaren. Ledaren får 0.",starter:`def efter_ledaren(total):
    pass
`,tests:[{fn:`efter_ledaren`,args:[{Ada:9,Linus:3,Mo:6}],expect:{Ada:0,Linus:6,Mo:3}},{fn:`efter_ledaren`,args:[{Bo:5,Al:5}],expect:{Bo:0,Al:0},edge:`delad ledning`},{fn:`efter_ledaren`,args:[{Mo:-4,Bo:-1}],expect:{Mo:3,Bo:0},edge:`negativa poäng`},{fn:`efter_ledaren`,args:[{}],expect:{},edge:`tom ordbok`}],solution:`def efter_ledaren(total):
    högst = None
    for namn, p in total.items():
        if högst == None or p > högst:
            högst = p
    svar = {}
    for namn, p in total.items():
        svar[namn] = högst - p
    return svar`,explain:`Ledarens poäng måste vara känd innan skillnaderna kan räknas ut, så det blir två loopar. None som start fungerar även när alla har negativa poäng.`,hint:`Hitta högsta poängen i en första loop. Bygg sedan en ny ordbok med högst - p för varje namn.`}]},_=e(m,g,{"py-print":[{type:`order`,prompt:`Ordna raderna så att menyn skrivs ut med rubriken först och alternativen i nummerordning.`,lines:[`print("Meny")`,`print("1. Spela")`,`print("2. Inställningar")`,`print("3. Avsluta")`],output:`Meny
1. Spela
2. Inställningar
3. Avsluta`,distractors:[{line:`print(Meny)`,why:`Text måste stå inom citattecken, annars letar Python efter en variabel som heter Meny.`}],explain:`Programmet körs uppifrån och ner, så raderna skrivs ut i samma ordning som de står.`,hint:`Rubriken kommer först, sedan alternativen 1, 2 och 3.`}],"py-var":[{type:`order`,prompt:`Ordna raderna så att programmet skriver ut mynten vid start, efter en bonus på 5 och efter ett köp för 3.`,lines:[`mynt = 10`,`print("Start", mynt)`,`mynt = mynt + 5`,`print("Efter bonus", mynt)`,`mynt = mynt - 3`,`print("Efter köp", mynt)`],output:`Start 10
Efter bonus 15
Efter köp 12`,explain:`Variabeln måste skapas innan den används, och varje utskrift visar det värde som gäller just då.`,hint:`Skapa mynt först. Varje ändring ska stå före den utskrift som ska visa den.`}],"py-math":[{type:`order`,prompt:`Ordna raderna så att programmet räknar ut hur många godisbitar varje barn får och hur många som blir över.`,lines:[`barn = 5`,`godis = barn * 3 + 2`,`print(godis // barn)`,`print(godis % barn)`],output:`3
2`,distractors:[{line:`print(godis / barn)`,why:`/ ger ett decimaltal, 3.4. Hela bitar får du med //.`}],explain:`godis räknas ut med hjälp av barn, så barn måste finnas först. // ger hela bitar och % det som blir över.`,hint:`Vilken variabel behövs för att räkna ut den andra?`}],"py-text":[{type:`order`,prompt:`Ordna raderna så att programmet först visar spelarens poäng och sedan poängen efter en bonus på 30.`,lines:[`spelare = "Mira"`,`poäng = 120`,`print(f"{spelare} har {poäng} poäng.")`,`poäng = poäng + 30`,`print(f"Nu har {spelare} {poäng} poäng.")`],alt:[[`poäng = 120`,`spelare = "Mira"`,`print(f"{spelare} har {poäng} poäng.")`,`poäng = poäng + 30`,`print(f"Nu har {spelare} {poäng} poäng.")`]],output:`Mira har 120 poäng.
Nu har Mira 150 poäng.`,distractors:[{line:`print("Poäng: " + poäng)`,why:`Text och tal går inte att sätta ihop med +. Det ger ett TypeError.`}],explain:`Variablerna skapas först. f-strängen byter ut {poäng} mot det värde poäng har när raden körs.`,hint:`Bonusen ska läggas till mellan de två utskrifterna.`}],"py-bool":[{type:`order`,prompt:`Ordna raderna så att programmet först visar att gissningen är fel och sedan att den nya gissningen är rätt.`,lines:[`lösen = "kod123"`,`gissning = "Kod123"`,`print("Rätt?", gissning == lösen)`,`gissning = "kod123"`,`print("Nu rätt?", gissning == lösen)`],alt:[[`gissning = "Kod123"`,`lösen = "kod123"`,`print("Rätt?", gissning == lösen)`,`gissning = "kod123"`,`print("Nu rätt?", gissning == lösen)`]],output:`Rätt? False
Nu rätt? True`,explain:`Den första gissningen har stort K, så == ger False. Efter den nya gissningen är texterna lika och == ger True.`,hint:`Stor och liten bokstav räknas som olika. Vilken gissning ska jämföras först?`}],"py-if":[{type:`order`,prompt:`Ordna raderna så att programmet väljer kläder efter temperaturen och sedan alltid önskar en bra dag.`,lines:[`temp = 15`,`if temp > 25:`,`    print("Badväder")`,`elif temp > 10:`,`    print("Jackväder")`,`else:`,`    print("Mössväder")`,`print("Ha en bra dag!")`],output:`Jackväder
Ha en bra dag!`,distractors:[{line:`if temp > 25`,why:`En rad som startar ett block måste sluta med kolon.`}],explain:`if kommer först, sedan elif och sist else. Den sista raden är inte indragen och körs alltid.`,hint:`Varje villkorsrad följs av sin indragna print-rad.`}],"py-while":[{type:`order`,prompt:`Ordna raderna så att programmet räknar ner liven från 3 och sedan skriver Game over.`,lines:[`liv = 3`,`while liv > 0:`,`    print("Liv kvar:", liv)`,`    liv -= 1`,`print("Game over")`],output:`Liv kvar: 3
Liv kvar: 2
Liv kvar: 1
Game over`,distractors:[{line:`    liv += 1`,why:`Om liv ökar blir liv > 0 aldrig falskt, och loopen tar aldrig slut.`}],explain:`Utskriften sker före minskningen, så 3 hinner visas. Game over står utanför loopen och körs när den är klar.`,hint:`Skriv ut först och minska sedan, inne i loopen.`}],"py-for":[{type:`order`,prompt:`Ordna raderna så att programmet skriver en rubrik, räknar ner från 5 till 1 och sedan skriver Kör!`,lines:[`print("Nedräkning:")`,`for i in range(5, 0, -1):`,`    print(i)`,`print("Kör!")`],output:`Nedräkning:
5
4
3
2
1
Kör!`,distractors:[{line:`for i in range(5, 0):`,why:`Utan steget -1 räknar range uppåt, och från 5 upp till 0 finns inga tal alls.`}],explain:`range(5, 0, -1) ger 5, 4, 3, 2, 1. Bara den indragna raden upprepas.`,hint:`Rubriken före loopen, Kör! efter.`}],"py-list":[{type:`order`,prompt:`Ordna raderna så att programmet visar sista namnet, lägger till Cy och sedan visar det nya sista namnet och antalet.`,lines:[`lag = ["Ada", "Bo"]`,`print("Sist:", lag[-1])`,`lag.append("Cy")`,`print("Nu sist:", lag[-1])`,`print("Antal:", len(lag))`],output:`Sist: Bo
Nu sist: Cy
Antal: 3`,explain:`append lägger Cy sist, så lag[-1] ger Bo före och Cy efter. len räknar tre namn.`,hint:`append måste ske mellan de två utskrifterna av sista namnet.`}],"py-listloop":[{type:`order`,prompt:`Ordna raderna så att programmet visar summan efter varje vara och till sist totalen.`,lines:[`priser = [20, 35, 15]`,`summa = 0`,`for p in priser:`,`    summa += p`,`    print("Hittills:", summa)`,`print("Totalt:", summa)`],alt:[[`summa = 0`,`priser = [20, 35, 15]`,`for p in priser:`,`    summa += p`,`    print("Hittills:", summa)`,`print("Totalt:", summa)`]],output:`Hittills: 20
Hittills: 55
Hittills: 70
Totalt: 70`,distractors:[{line:`    summa = 0`,why:`Om summan nollställs inne i loopen glöms allt tidigare bort varje varv. Den ska skapas före loopen.`}],explain:`Summan skapas före loopen, växer i loopen och skrivs ut en sista gång efter loopen.`,hint:`Lägg till priset innan du skriver ut "Hittills".`}],"py-strmeth":[{type:`order`,prompt:`Ordna raderna så att programmet tar bort mellanslagen i kanterna, delar upp texten i ord och sätter ihop dem med bindestreck i versaler.`,lines:[`text = "  hej på dig  "`,`rent = text.strip()`,`ord = rent.split()`,`print(ord)`,`print("-".join(ord).upper())`],output:`['hej', 'på', 'dig']
HEJ-PÅ-DIG`,explain:`Varje steg bygger på det förra: först strip, sedan split, och till sist join och upper.`,hint:`Följ texten: rensa, dela, skriv ut listan, sätt ihop.`}],"py-convert":[{type:`order`,prompt:`Ordna raderna så att programmet gör om texten till ett tal, dubblar det och sedan visar halva värdet som decimaltal.`,lines:[`text = "15"`,`tal = int(text)`,`dubbel = tal * 2`,`print("Dubbelt: " + str(dubbel))`,`print(float(text) / 2)`],output:`Dubbelt: 30
7.5`,distractors:[{line:`dubbel = text * 2`,why:`text är fortfarande en sträng. "15" * 2 blir "1515", inte 30.`}],explain:`int gör om texten till ett tal som går att räkna med. str gör om talet till text så att det kan sättas ihop med +.`,hint:`Omvandla först, räkna sedan, och gör om till text när du skriver ut.`}],"py-logic":[{type:`order`,prompt:`Ordna raderna så att programmet säger att du ska ta med jacka och sedan att paraply inte behövs.`,lines:[`regn = False`,`blåst = True`,`if regn or blåst:`,`    print("Ta med jacka")`,`else:`,`    print("T-shirt räcker")`,`if not regn:`,`    print("Paraply behövs inte")`],alt:[[`blåst = True`,`regn = False`,`if regn or blåst:`,`    print("Ta med jacka")`,`else:`,`    print("T-shirt räcker")`,`if not regn:`,`    print("Paraply behövs inte")`]],output:`Ta med jacka
Paraply behövs inte`,distractors:[{line:`if regn and blåst:`,why:`and kräver att båda är sanna. Det regnar inte, så då skulle det bli T-shirt i stället.`}],explain:`or räcker med att ett av villkoren är sant, och not vänder False till True.`,hint:`else hör ihop med den första if-satsen.`}],"py-accum":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`tal = [-4, -2, -7]
störst = 0
for t in tal:
    if t > störst:
        störst = t
print(störst)`,options:[`-2`,`0`,`-7`],answer:1,out:!0,why:{0:`-2 är störst i listan, men startvärdet 0 är ännu större. Inget tal i listan är större än 0, så störst ändras aldrig.`,2:`-7 är det minsta talet. Loopen letar efter tal som är större än det hittills största.`},explain:`Startvärdet 0 är större än alla tal i listan, så störst ändras aldrig. Därför ska störst börja på tal[0].`},{type:`order`,prompt:`Ordna raderna så att programmet hittar den snabbaste (lägsta) tiden i listan.`,lines:[`tider = [42, 38, 45, 36, 40]`,`bäst = tider[0]`,`for t in tider:`,`    if t < bäst:`,`        bäst = t`,`print("Snabbaste tid:", bäst)`],output:`Snabbaste tid: 36`,distractors:[{line:`bäst = 0`,why:`Ingen tid är lägre än 0, så bäst skulle aldrig ändras. Börja med första elementet.`}],explain:`bäst börjar på första tiden och byts ut varje gång loopen hittar en lägre. Utskriften sker efter loopen.`,hint:`Startvärdet ska komma från listan själv.`}],"py-index":[{type:`order`,prompt:`Ordna raderna så att programmet skriver ut på vilket index blå finns och sedan att sökningen är klar.`,lines:[`färger = ["röd", "grön", "blå", "gul"]`,`for i, f in enumerate(färger):`,`    if f == "blå":`,`        print("Hittade blå på index", i)`,`print("Sökningen är klar")`],output:`Hittade blå på index 2
Sökningen är klar`,distractors:[{line:`for i, f in färger:`,why:`Listan ger bara värdena. För att få både index och värde behövs enumerate.`}],explain:`enumerate ger både index och värde. Index börjar på 0, så blå ligger på index 2.`,hint:`Loopen först, sedan villkoret, sedan utskriften inne i villkoret.`}],"py-filter":[{type:`order`,prompt:`Ordna raderna så att programmet bygger en ny lista med bara plusgraderna och sedan visar att originallistan är orörd.`,lines:[`temp = [12, -3, 5, -1, 8]`,`plus = []`,`for t in temp:`,`    if t > 0:`,`        plus.append(t)`,`print(plus)`,`print(temp)`],alt:[[`plus = []`,`temp = [12, -3, 5, -1, 8]`,`for t in temp:`,`    if t > 0:`,`        plus.append(t)`,`print(plus)`,`print(temp)`]],output:`[12, 5, 8]
[12, -3, 5, -1, 8]`,distractors:[{line:`    plus = []`,why:`Inne i loopen töms resultatlistan varje varv. Den ska skapas före loopen.`}],explain:`Den tomma listan skapas före loopen. append körs bara när villkoret stämmer, och temp ändras aldrig.`,hint:`Den nya listan skrivs ut före originalet.`}],"py-def":[{type:`order`,prompt:`Ordna raderna så att publiken jublar, sedan görs ett mål och sedan jublar publiken igen.`,lines:[`def jubel():`,`    print("Heja!")`,`    print("Heja heja!")`,`jubel()`,`print("Mål!")`,`jubel()`],output:`Heja!
Heja heja!
Mål!
Heja!
Heja heja!`,distractors:[{line:`def jubel()`,why:`Raden som startar funktionen måste sluta med kolon.`}],explain:`Funktionen definieras först. Den körs varje gång den anropas med jubel().`,hint:`def och dess indragna rader kommer först, anropen efter.`}],"py-params":[{type:`order`,prompt:`Ordna raderna så att programmet skriver ut en biljett för Ada på rad 5 och en för Bo på standardraden.`,lines:[`def biljett(namn, rad=1):`,`    print(f"Biljett för {namn}")`,`    print(f"Rad {rad}")`,`biljett("Ada", 5)`,`biljett("Bo")`],output:`Biljett för Ada
Rad 5
Biljett för Bo
Rad 1`,distractors:[{line:`def biljett(rad=1, namn):`,why:`Parametrar med standardvärde måste stå sist. Annars blir det SyntaxError.`}],explain:`Ada skickar med 5, så rad blir 5. Bo skickar bara namnet, så rad får standardvärdet 1.`,hint:`Funktionen först, sedan Adas anrop.`}],"py-return":[{type:`order`,prompt:`Ordna raderna så att funktionen ger 20 kr rabatt på varor över 100 kr och returnerar priset oförändrat annars.`,lines:[`def rabatt(pris):`,`    if pris > 100:`,`        return pris - 20`,`    return pris`,`print(rabatt(150))`,`print(rabatt(80))`],output:`130
80`,explain:`return avslutar funktionen direkt. Den sista return-raden nås bara när villkoret var falskt.`,hint:`Den mest indragna raden hör till if-satsen.`}],"py-dict":[{type:`order`,prompt:`Ordna raderna så att Cy läggs till, Ada får Cys poäng ovanpå sina egna, alla skrivs ut och Dan visas som 0.`,lines:[`poäng = {"Ada": 3, "Bo": 5}`,`poäng["Cy"] = 4`,`poäng["Ada"] = poäng["Ada"] + poäng["Cy"]`,`for namn, p in poäng.items():`,`    print(f"{namn}: {p}")`,`print(poäng.get("Dan", 0))`],output:`Ada: 7
Bo: 5
Cy: 4
0`,distractors:[{line:`print(poäng["Dan"])`,why:`Dan finns inte i ordboken, så poäng["Dan"] ger KeyError. get ger ett standardvärde i stället.`}],explain:`Cy måste finnas innan Adas poäng kan räknas ut. get("Dan", 0) ger 0 när nyckeln saknas.`,hint:`Vilken nyckel behövs innan Ada kan få fler poäng?`}],"py-validate":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`def betyg(poäng):
    if poäng < 0 or poäng > 100:
        return "ogiltigt"
    if poäng >= 50:
        return "godkänt"
    return "underkänt"

print(betyg(50))
print(betyg(-1))`,options:[`godkänt
underkänt`,`underkänt
ogiltigt`,`godkänt
ogiltigt`],answer:2,out:!0,why:{0:`-1 fångas redan av den första kontrollen, så funktionen returnerar ogiltigt innan den hinner jämföra med 50.`,1:`>= betyder större än eller lika med. 50 ligger exakt på gränsen och räknas som godkänt.`},explain:`50 är exakt på gränsen och >= tar med det. -1 stoppas av den tidiga kontrollen och ger ogiltigt.`},{type:`order`,prompt:`Ordna raderna så att funktionen delar notan, men svarar "Ogiltigt antal" när antalet personer är 0 eller mindre.`,lines:[`def per_person(total, personer):`,`    if personer <= 0:`,`        return "Ogiltigt antal"`,`    return total / personer`,`print(per_person(300, 4))`,`print(per_person(300, 0))`],output:`75.0
Ogiltigt antal`,distractors:[{line:`    if personer < 0:`,why:`0 personer är också ogiltigt. Med < 0 slinker gränsfallet 0 igenom och ger ZeroDivisionError.`}],explain:`Det ogiltiga fallet hanteras först med en tidig return. Då når divisionen bara giltiga värden.`,hint:`Kontrollen ska stå före divisionen i funktionen.`}],"py-errors":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`a = "3"
b = 4
print(a + str(b))
print(int(a) + b)`,options:[`34
7`,`7
7`,`TypeError`],answer:0,out:!0,why:{1:`str(b) gör om 4 till texten "4". Då sätter + ihop två texter i stället för att räkna.`,2:`Båda raderna gör om ett värde så att typerna passar ihop, så det blir inget TypeError.`},explain:`Text + text sätts ihop till 34. int(a) gör om texten till ett tal, och 3 + 4 blir 7.`},{type:`order`,prompt:`Ordna raderna så att programmet räknar med åldern utan att krascha med TypeError.`,lines:[`svar = "15"`,`ålder = int(svar)`,`nästa = ålder + 1`,`print("Nästa år blir du " + str(nästa))`,`print("Om tio år: " + str(ålder + 10))`],output:`Nästa år blir du 16
Om tio år: 25`,distractors:[{line:`nästa = svar + 1`,why:`svar är text. Text + tal ger TypeError, så gör om den med int först.`},{line:`print("Nästa år blir du " + nästa)`,why:`nästa är ett tal. Text + tal ger TypeError, så gör om det med str.`}],explain:`Texten görs om till ett tal innan den räknas med, och talet görs om till text innan det sätts ihop med annan text.`,hint:`int före uträkningen, str i utskriften.`}],"py-try":[{type:`order`,prompt:`Ordna raderna så att programmet försöker göra om svaret till ett tal, ger ett vänligt meddelande när det inte går och sedan tackar.`,lines:[`svar = "tolv"`,`try:`,`    tal = int(svar)`,`    print("Du skrev", tal)`,`except ValueError:`,`    print("Skriv siffror, inte bokstäver")`,`print("Tack!")`],output:`Skriv siffror, inte bokstäver
Tack!`,distractors:[{line:`except TypeError:`,why:`int("tolv") ger ValueError, inte TypeError. Då fångas felet inte.`}],explain:`int(svar) ger ValueError, så Python hoppar direkt till except. Raden efter try-blocket körs ändå.`,hint:`try-blocket först, sedan except med sitt meddelande.`}],"py-raise":[{type:`order`,prompt:`Ordna raderna så att volym 7 godkänns, men volym 15 kastar ett fel som fångas och skrivs ut.`,lines:[`def sätt_volym(v):`,`    if v < 0 or v > 10:`,`        raise ValueError("Volymen ska vara 0 till 10")`,`    return v`,`try:`,`    print("Volym:", sätt_volym(7))`,`    print("Volym:", sätt_volym(15))`,`except ValueError as fel:`,`    print("Fel:", fel)`],output:`Volym: 7
Fel: Volymen ska vara 0 till 10`,distractors:[{line:`        return ValueError("Volymen ska vara 0 till 10")`,why:`return skickar bara tillbaka felet som ett vanligt värde. raise behövs för att kasta det.`}],explain:`raise stoppar funktionen och skickar felet till anroparen. except fångar det, och fel innehåller texten.`,hint:`Det giltiga anropet ska köras före det ogiltiga.`}],"py-finally":[{type:`order`,prompt:`Ordna raderna så att else bara körs när divisionen lyckas och finally körs varje gång.`,lines:[`def dela(a, b):`,`    try:`,`        svar = a // b`,`    except ZeroDivisionError:`,`        print("Kan inte dela med noll")`,`    else:`,`        print("Svar:", svar)`,`    finally:`,`        print("Försök klart")`,`dela(10, 2)`,`dela(5, 0)`],output:`Svar: 5
Försök klart
Kan inte dela med noll
Försök klart`,explain:`Ordningen är alltid try, except, else, finally. else körs bara utan fel, finally körs oavsett.`,hint:`Delarna kommer i ordningen try, except, else, finally.`}],"py-class":[{type:`order`,prompt:`Ordna raderna så att klassen Spelare skapas och en spelare med namn och nivå skrivs ut.`,lines:[`class Spelare:`,`    def __init__(self, namn, nivå):`,`        self.namn = namn`,`        self.nivå = nivå`,`p = Spelare("Zelda", 4)`,`print(p.namn, "är på nivå", p.nivå)`],alt:[[`class Spelare:`,`    def __init__(self, namn, nivå):`,`        self.nivå = nivå`,`        self.namn = namn`,`p = Spelare("Zelda", 4)`,`print(p.namn, "är på nivå", p.nivå)`]],output:`Zelda är på nivå 4`,distractors:[{line:`    def __init__(namn, nivå):`,why:`Första parametern i en metod ska alltid vara self.`}],explain:`Klassen måste finnas innan ett objekt skapas. __init__ sparar attributen med self.`,hint:`Klassen och dess __init__ först, sedan objektet.`}],"py-methods":[{type:`order`,prompt:`Ordna raderna så att kassan visar 25 efter första varan och 65 efter den andra.`,lines:[`class Kassa:`,`    def __init__(self):`,`        self.summa = 0`,`    def lägg_till(self, pris):`,`        self.summa += pris`,`k = Kassa()`,`k.lägg_till(25)`,`print(k.summa)`,`k.lägg_till(40)`,`print(k.summa)`],output:`25
65`,distractors:[{line:`        summa += pris`,why:`Utan self. ändras inte objektets attribut. Python letar efter en lokal variabel som inte finns.`}],explain:`Metoden ändrar self.summa, så objektet minns summan mellan anropen.`,hint:`Båda metoderna hör till klassen. Varje utskrift kommer efter sitt köp.`}],"py-str":[{type:`order`,prompt:`Ordna raderna så att varje biljett får nästa lediga nummer och skrivs ut snyggt.`,lines:[`class Biljett:`,`    nästa_nr = 1`,`    def __init__(self, film):`,`        self.film = film`,`        self.nr = Biljett.nästa_nr`,`        Biljett.nästa_nr += 1`,`    def __str__(self):`,`        return f"Biljett {self.nr}: {self.film}"`,`a = Biljett("Dune")`,`b = Biljett("Up")`,`print(a)`,`print(b)`],alt:[[`class Biljett:`,`    nästa_nr = 1`,`    def __init__(self, film):`,`        self.nr = Biljett.nästa_nr`,`        self.film = film`,`        Biljett.nästa_nr += 1`,`    def __str__(self):`,`        return f"Biljett {self.nr}: {self.film}"`,`a = Biljett("Dune")`,`b = Biljett("Up")`,`print(a)`,`print(b)`],[`class Biljett:`,`    nästa_nr = 1`,`    def __init__(self, film):`,`        self.film = film`,`        self.nr = Biljett.nästa_nr`,`        Biljett.nästa_nr += 1`,`    def __str__(self):`,`        return f"Biljett {self.nr}: {self.film}"`,`a = Biljett("Dune")`,`print(a)`,`b = Biljett("Up")`,`print(b)`],[`class Biljett:`,`    nästa_nr = 1`,`    def __init__(self, film):`,`        self.nr = Biljett.nästa_nr`,`        self.film = film`,`        Biljett.nästa_nr += 1`,`    def __str__(self):`,`        return f"Biljett {self.nr}: {self.film}"`,`a = Biljett("Dune")`,`print(a)`,`b = Biljett("Up")`,`print(b)`]],output:`Biljett 1: Dune
Biljett 2: Up`,explain:`Klassvariabeln delas av alla biljetter. Varje ny biljett tar numret och ökar det sedan, och __str__ bestämmer vad print visar.`,hint:`Numret ska hämtas innan klassvariabeln ökas.`}],"py-inherit":[{type:`order`,prompt:`Ordna raderna så att Cykel ärver namnet från Fordon och själv lägger till antal växlar.`,lines:[`class Fordon:`,`    def __init__(self, namn):`,`        self.namn = namn`,`class Cykel(Fordon):`,`    def __init__(self, namn, växlar):`,`        super().__init__(namn)`,`        self.växlar = växlar`,`c = Cykel("Racer", 21)`,`print(c.namn, "har", c.växlar, "växlar")`],alt:[[`class Fordon:`,`    def __init__(self, namn):`,`        self.namn = namn`,`class Cykel(Fordon):`,`    def __init__(self, namn, växlar):`,`        self.växlar = växlar`,`        super().__init__(namn)`,`c = Cykel("Racer", 21)`,`print(c.namn, "har", c.växlar, "växlar")`]],output:`Racer har 21 växlar`,distractors:[{line:`class Cykel:`,why:`Utan (Fordon) ärver Cykel ingenting, och super().__init__ har ingen förälder att anropa.`}],explain:`Basklassen kommer först. Cykel anropar förälderns __init__ med super() och sparar sedan sitt eget attribut.`,hint:`Föräldern måste finnas innan barnklassen kan ärva från den.`}],"py-listcomp":[{type:`order`,prompt:`Ordna raderna så att programmet plockar ut priserna över 200 och sedan halverar just dem.`,lines:[`priser = [100, 250, 80, 400]`,`dyra = [p for p in priser if p > 200]`,`rea = [p // 2 for p in dyra]`,`print(dyra)`,`print(rea)`],alt:[[`priser = [100, 250, 80, 400]`,`dyra = [p for p in priser if p > 200]`,`print(dyra)`,`rea = [p // 2 for p in dyra]`,`print(rea)`]],output:`[250, 400]
[125, 200]`,distractors:[{line:`dyra = [for p in priser if p > 200]`,why:`En listbyggare börjar med uttrycket som ska hamna i listan, här p.`}],explain:`rea byggs av dyra, så dyra måste finnas först. if i slutet filtrerar, uttrycket i början bestämmer värdet.`,hint:`Vilken lista behövs för att bygga den andra?`}],"py-sets":[{type:`order`,prompt:`Ordna raderna så att programmet räknar unika rätter i omröstningen, listar dem och kollar om pizza finns med.`,lines:[`svar = ["pizza", "tacos", "pizza", "sushi", "tacos"]`,`unika = set(svar)`,`print(len(unika))`,`print(sorted(unika))`,`print("pizza" in unika)`],output:`3
['pizza', 'sushi', 'tacos']
True`,distractors:[{line:`unika = svar`,why:`Det ger bara ett nytt namn på samma lista, dubbletterna är kvar. set tar bort dem.`}],explain:`set tar bort dubbletterna. sorted ger en bestämd ordning eftersom mängder inte har någon egen.`,hint:`Antalet först, sedan listan, sist kontrollen med in.`}],"py-sortkey":[{type:`order`,prompt:`Ordna raderna så att tabellen sorteras med flest poäng först och lika poäng i bokstavsordning.`,lines:[`lag = [("Ugglor", 12), ("Vargar", 15), ("Björnar", 12)]`,`tabell = sorted(lag, key=lambda l: (-l[1], l[0]))`,`for namn, p in tabell:`,`    print(namn, p)`,`print("Vinnare:", tabell[0][0])`],output:`Vargar 15
Björnar 12
Ugglor 12
Vinnare: Vargar`,distractors:[{line:`tabell = sorted(lag, key=lambda l: l[1])`,why:`Då hamnar lägst poäng först, och lika poäng sorteras inte efter namn.`}],explain:`-l[1] ger högst poäng först, och l[0] avgör när poängen är lika.`,hint:`Sortera först, skriv ut tabellen, och visa vinnaren sist.`}],"py-nested":[{type:`order`,prompt:`Ordna raderna så att programmet summerar målen för varje spelare och sedan visar Bos första mål.`,lines:[`lag = [{"namn": "Ada", "mål": [1, 0, 2]}, {"namn": "Bo", "mål": [0, 3]}]`,`for spelare in lag:`,`    totalt = 0`,`    for m in spelare["mål"]:`,`        totalt += m`,`    print(spelare["namn"], totalt)`,`print("Bos första match:", lag[1]["mål"][0])`],output:`Ada 3
Bo 3
Bos första match: 0`,explain:`Den yttre loopen går över spelarna och den inre över målen. totalt nollställs för varje ny spelare.`,hint:`totalt ska nollställas en gång per spelare, inte per mål.`}],"py-count":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`röster = ["A", "B", "A", "C", "A", "B"]
räkna = {}
for r in röster:
    räkna[r] = räkna.get(r, 0) + 1
print(räkna["A"], räkna["B"], len(räkna))`,options:[`3 2 6`,`2 1 3`,`3 2 3`],answer:2,out:!0,why:{0:`len(räkna) räknar nycklarna i ordboken, inte rösterna. Det finns tre olika kandidater.`,1:`get(r, 0) ger 0 första gången, och + 1 gör det till 1. Varje röst räknas alltså med.`},explain:`A fick 3 röster och B 2. Ordboken har tre nycklar: A, B och C.`},{type:`order`,prompt:`Ordna raderna så att programmet räknar hur många gånger varje bokstav finns i ordet.`,lines:[`ord = "banan"`,`räkna = {}`,`for b in ord:`,`    räkna[b] = räkna.get(b, 0) + 1`,`print(räkna)`,`print("Antal n:", räkna["n"])`],alt:[[`räkna = {}`,`ord = "banan"`,`for b in ord:`,`    räkna[b] = räkna.get(b, 0) + 1`,`print(räkna)`,`print("Antal n:", räkna["n"])`]],output:`{'b': 1, 'a': 2, 'n': 2}
Antal n: 2`,distractors:[{line:`    räkna[b] = räkna[b] + 1`,why:`Första gången finns bokstaven inte i ordboken, så räkna[b] ger KeyError. get(b, 0) löser det.`}],explain:`Ordboken skapas tom före loopen. get ger 0 för nya bokstäver, så varje bokstav räknas från början.`,hint:`Skriv ut hela ordboken före det enskilda antalet.`}],"py-bsearch":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`lista = [1, 3, 5, 7, 9, 11, 13]
lo = 0
hi = len(lista) - 1
steg = 0
while lo <= hi:
    steg += 1
    mitt = (lo + hi) // 2
    if lista[mitt] == 11:
        break
    elif lista[mitt] < 11:
        lo = mitt + 1
    else:
        hi = mitt - 1
print(steg)`,options:[`6`,`2`,`3`],answer:1,out:!0,why:{0:`6 steg skulle det ta att leta från början, ett element i taget. Binärsökning börjar i mitten.`,2:`Efter första steget är lo 4 och hi 6. Mitten blir (4 + 6) // 2 = 5, och där ligger 11 redan.`},explain:`Först tittar sökningen på index 3 (talet 7). 7 är mindre än 11, så lo blir 4. Nästa mitt är index 5, där 11 finns.`},{type:`order`,prompt:`Ordna raderna så att binärsökningen letar efter 25 och skriver ut varje tal den tittar på.`,lines:[`lista = [3, 8, 12, 19, 25, 31]`,`lo = 0`,`hi = len(lista) - 1`,`while lo <= hi:`,`    mitt = (lo + hi) // 2`,`    print("Tittar på", lista[mitt])`,`    if lista[mitt] == 25:`,`        break`,`    elif lista[mitt] < 25:`,`        lo = mitt + 1`,`    else:`,`        hi = mitt - 1`],alt:[[`lo = 0`,`lista = [3, 8, 12, 19, 25, 31]`,`hi = len(lista) - 1`,`while lo <= hi:`,`    mitt = (lo + hi) // 2`,`    print("Tittar på", lista[mitt])`,`    if lista[mitt] == 25:`,`        break`,`    elif lista[mitt] < 25:`,`        lo = mitt + 1`,`    else:`,`        hi = mitt - 1`],[`lista = [3, 8, 12, 19, 25, 31]`,`hi = len(lista) - 1`,`lo = 0`,`while lo <= hi:`,`    mitt = (lo + hi) // 2`,`    print("Tittar på", lista[mitt])`,`    if lista[mitt] == 25:`,`        break`,`    elif lista[mitt] < 25:`,`        lo = mitt + 1`,`    else:`,`        hi = mitt - 1`]],output:`Tittar på 12
Tittar på 25`,distractors:[{line:`while lo < hi:`,why:`När lo och hi är lika finns det fortfarande ett element kvar att titta på. Villkoret ska vara lo <= hi.`}],explain:`Mitten räknas ut först i varje varv. Är talet för litet flyttas lo upp, annars flyttas hi ner.`,hint:`Räkna ut mitt innan du använder den.`}],"py-recursion":[{type:`order`,prompt:`Ordna raderna så att funktionen går ner i trappan steg för steg, når botten och sedan går upp igen.`,lines:[`def trappa(n):`,`    if n == 0:`,`        print("Botten!")`,`        return`,`    print("Steg", n)`,`    trappa(n - 1)`,`    print("Upp", n)`,`trappa(2)`],output:`Steg 2
Steg 1
Botten!
Upp 1
Upp 2`,distractors:[{line:`    trappa(n)`,why:`Utan n - 1 blir problemet aldrig mindre, basfallet nås aldrig och det blir RecursionError.`}],explain:`Basfallet står först. Raden efter det rekursiva anropet körs först när anropet är klart, därför kommer Upp i omvänd ordning.`,hint:`Basfallet först. Vad ska skrivas ut före anropet och vad efter?`}],"py-sorting":[{type:`choice`,prompt:`Vad skrivs ut?`,code:`lista = [6, 2, 9, 1]
minst = 0
for j in range(1, len(lista)):
    if lista[j] < lista[minst]:
        minst = j
lista[0], lista[minst] = lista[minst], lista[0]
print(lista)`,options:[`[1, 2, 9, 6]`,`[1, 2, 6, 9]`,`[1, 6, 2, 9]`],answer:0,out:!0,why:{1:`Koden gör bara ett enda byte. 9 och 6 står kvar där de var, bortsett från att 6 flyttats.`,2:`Bytet flyttar inte resten av listan. Bara 6 och 1 byter plats med varandra.`},explain:`Loopen hittar att 1 är minst, på index 3. Sedan byter 6 och 1 plats, och resten står kvar.`},{type:`order`,prompt:`Ordna raderna så att urvalssorteringen sorterar listan från minst till störst.`,lines:[`tal = [7, 3, 9, 1]`,`for i in range(len(tal)):`,`    minst = i`,`    for j in range(i + 1, len(tal)):`,`        if tal[j] < tal[minst]:`,`            minst = j`,`    tal[i], tal[minst] = tal[minst], tal[i]`,`print(tal)`],output:`[1, 3, 7, 9]`,distractors:[{line:`    minst = 0`,why:`Sökningen ska börja på plats i. Början av listan är redan sorterad och ska inte röras igen.`}],explain:`För varje plats i letar den inre loopen upp det minsta av resten, och sedan byts det in på plats i.`,hint:`Bytet sker efter den inre loopen men inne i den yttre.`}]});export{_ as default};