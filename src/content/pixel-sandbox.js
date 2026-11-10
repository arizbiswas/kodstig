// Banor att leka fritt med i Kodlabbets Pixelvärlden. Lektionernas banor ligger i kapitlen.
export const SANDBOX = [
  {
    id: 'angen', name: 'Ängen', text: 'Gå till flaggan och plocka upp ädelstenen på vägen.',
    level: { map: ['##########', '#S..g...G#', '##########'], goals: ['goal', 'items'] },
    python: '# Gå till flaggan. Plocka upp ädelstenen på vägen.\nhjalte.move_right()\nhjalte.move_right()\nhjalte.move_right()\nhjalte.pick()\nhjalte.say("En ädelsten!")\n',
    csharp: '// Gå till flaggan. Plocka upp ädelstenen på vägen.\nHjalte.MoveRight();\nHjalte.MoveRight();\nHjalte.MoveRight();\nHjalte.Pick();\nHjalte.Say("En ädelsten!");\n',
  },
  {
    id: 'nyckeln', name: 'Nyckeln och dörren', text: 'Hämta nyckeln, öppna dörren och gå till flaggan.',
    level: { map: ['#########', '#S.....##', '#.###k..#', '#.#####D#', '#~~~~~#G#', '#########'], goals: ['goal'] },
    python: '# Hämta nyckeln, öppna dörren och gå till flaggan.\nfor i in range(4):\n    hjalte.move_right()\nhjalte.move_down()\nhjalte.pick()\n',
    csharp: '// Hämta nyckeln, öppna dörren och gå till flaggan.\nfor (int i = 0; i < 4; i++)\n{\n    Hjalte.MoveRight();\n}\nHjalte.MoveDown();\nHjalte.Pick();\n',
  },
  {
    id: 'jakten', name: 'Ädelstensjakten', text: 'Samla alla ädelstenar. Kartan ändrar sig, så använd sensorerna i stället för att räkna rutor.',
    level: {
      map: ['##########', '#S.g..g.G#', '##########'],
      worlds: [['########', '#Sg.g.G#', '########'], ['###########', '#S...g.g.G#', '###########']],
      goals: ['goal', 'items'],
    },
    python: '# Samla alla ädelstenar. Kartan kan vara olika lång!\nwhile not hjalte.at_goal():\n    hjalte.move_right()\n',
    csharp: '// Samla alla ädelstenar. Kartan kan vara olika lång!\nwhile (!Hjalte.AtGoal())\n{\n    Hjalte.MoveRight();\n}\n',
  },
  {
    id: 'labyrinten', name: 'Labyrinten', text: 'Hitta vägen till flaggan.',
    level: { map: ['#########', '#S..#...#', '###.#.#.#', '#...#.#.#', '#.###.#.#', '#.....#G#', '#########'], goals: ['goal'] },
    python: '# Hitta vägen till flaggan.\nhjalte.move_right()\nhjalte.move_right()\n',
    csharp: '// Hitta vägen till flaggan.\nHjalte.MoveRight();\nHjalte.MoveRight();\n',
  },
  {
    id: 'pixelkonst', name: 'Pixelkonst', text: 'Rita en egen bild i ett rutnät. Varje bokstav i draw() är en färg.',
    level: null,
    python: '# Rita en bild. Bokstäverna är färger: r röd, y gul, k svart, w vit, g grön, b blå.\ngrid = Canvas(8, 8)\ngrid.draw([\n    "..yyyy..",\n    ".yyyyyy.",\n    "yykyykyy",\n    "yyyyyyyy",\n    "ykyyyyky",\n    "yykkkkyy",\n    ".yyyyyy.",\n    "..yyyy..",\n])\n',
    csharp: '// Rita en bild. Bokstäverna är färger: r röd, y gul, k svart, w vit, g grön, b blå.\nvar g = new PixelGrid(8, 8);\nstring[] bild =\n{\n    "..yyyy..",\n    ".yyyyyy.",\n    "yykyykyy",\n    "yyyyyyyy",\n    "ykyyyyky",\n    "yykkkkyy",\n    ".yyyyyy.",\n    "..yyyy..",\n};\ng.Draw(bild);\n',
  },
  {
    id: 'turtle', name: 'Rita med turtle', text: 'Styr en sköldpadda som ritar. Den börjar i mitten och tittar åt höger.',
    level: null,
    python: 'import turtle\n\nt = turtle.Turtle()\nt.color("blue")\nfor i in range(5):\n    t.forward(120)\n    t.right(360 / 5)\n',
    csharp: 'var t = new Turtle();\nt.PenColor = Color.Blue;\nfor (int i = 0; i < 5; i++)\n{\n    t.Forward(120);\n    t.Right(360 / 5);\n}\n',
  },
  {
    id: 'spel-samla', name: 'Spel: Samla ädelstenar', text: 'Ett litet spel. Styr hjälten med piltangenterna och samla ädelstenar. Klicka på spelytan först.', game: true, level: null,
    python: `import random

x = 9
y = 7
gem_x = 3
gem_y = 3
poang = 0

def update():
    global x, y, gem_x, gem_y, poang
    if keyboard.left and x > 0:
        x -= 0.25
    if keyboard.right and x < 19:
        x += 0.25
    if keyboard.up and y > 0:
        y -= 0.25
    if keyboard.down and y < 14:
        y += 0.25
    if overlaps(x, y, gem_x, gem_y):
        poang += 1
        gem_x = random.randint(0, 19)
        gem_y = random.randint(1, 14)

def draw():
    screen.fill("green")
    screen.sprite("gem", gem_x, gem_y)
    screen.sprite("hero", x, y)
    screen.text(f"Poäng: {poang}", 0.5, 0.3, "white")
`,
    csharp: `var slump = new Random();
double x = 9;
double y = 7;
int gemX = 3;
int gemY = 3;
int poang = 0;

void Update()
{
    if (Keyboard.IsDown("Left") && x > 0) x -= 0.25;
    if (Keyboard.IsDown("Right") && x < 19) x += 0.25;
    if (Keyboard.IsDown("Up") && y > 0) y -= 0.25;
    if (Keyboard.IsDown("Down") && y < 14) y += 0.25;
    if (Game.Overlaps(x, y, gemX, gemY))
    {
        poang++;
        gemX = slump.Next(0, 20);
        gemY = slump.Next(1, 15);
    }
}

void Draw()
{
    Screen.Fill(Color.Green);
    Screen.Sprite("gem", gemX, gemY);
    Screen.Sprite("hero", x, y);
    Screen.Text($"Poäng: {poang}", 0.5, 0.3, Color.White);
}
`,
  },
  {
    id: 'spel-undvik', name: 'Spel: Undvik stenarna', text: 'Stenar faller från himlen. Flytta hjälten åt sidan med piltangenterna. Hur länge klarar du dig?', game: true, level: null,
    python: `import random

x = 9
sten_x = random.randint(0, 19)
sten_y = 0
tid = 0
slut = False

def update(dt):
    global x, sten_x, sten_y, tid, slut
    if slut:
        return
    tid += dt
    if keyboard.left and x > 0:
        x -= 0.3
    if keyboard.right and x < 19:
        x += 0.3
    sten_y += 0.2 + tid / 60
    if sten_y > 14:
        sten_y = 0
        sten_x = random.randint(0, 19)
    if overlaps(x, 13, sten_x, sten_y):
        slut = True

def draw():
    screen.fill("sky")
    screen.rect(0, 14, 20, 1, "brown")
    screen.sprite("wall", sten_x, sten_y)
    screen.sprite("hero", x, 13)
    screen.text(f"Tid: {round(tid)} s", 0.5, 0.3)
    if slut:
        screen.text("Aj! Tryck Kör för att börja om.", 3, 6, "red")
`,
    csharp: `var slump = new Random();
double x = 9;
int stenX = slump.Next(0, 20);
double stenY = 0;
double tid = 0;
bool slut = false;

void Update(double dt)
{
    if (slut) return;
    tid += dt;
    if (Keyboard.IsDown("Left") && x > 0) x -= 0.3;
    if (Keyboard.IsDown("Right") && x < 19) x += 0.3;
    stenY += 0.2 + tid / 60;
    if (stenY > 14)
    {
        stenY = 0;
        stenX = slump.Next(0, 20);
    }
    if (Game.Overlaps(x, 13, stenX, stenY)) slut = true;
}

void Draw()
{
    Screen.Fill(Color.Sky);
    Screen.Rect(0, 14, 20, 1, Color.Brown);
    Screen.Sprite("wall", stenX, stenY);
    Screen.Sprite("hero", x, 13);
    Screen.Text($"Tid: {Math.Round(tid)} s", 0.5, 0.3);
    if (slut) Screen.Text("Aj! Tryck Kör för att börja om.", 3, 6, Color.Red);
}
`,
  },
];

export const sandboxById = (id) => SANDBOX.find((s) => s.id === id) || SANDBOX[0];
