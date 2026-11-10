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
];

export const sandboxById = (id) => SANDBOX.find((s) => s.id === id) || SANDBOX[0];
