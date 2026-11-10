// Kapitlet Pixelvärlden, sist i Python och C#. Samma banor och övningar i båda
// språken: varje övning skrivs en gång med en liten kodbyggare (kit) som ger rätt
// syntax. Upplägget följer PRIMM: förutsäg, kör, undersök, ändra och skapa själv.
// Kapitlet är fristående och kräver inte kapitlen före det.

const pas = (s) => (s === '___' ? s : s.split('_').map((w) => w[0].toUpperCase() + w.slice(1)).join(''));
const ind = (s) => s.split('\n').map((l) => (l ? `    ${l}` : l)).join('\n');

function kit(lang) {
  const py = lang === 'python';
  const K = {
    py,
    // Kommando på egen rad, och samma anrop som uttryck (för if och while).
    c: (name, arg = '') => (py ? `hjalte.${name}(${arg})` : `Hjalte.${pas(name)}(${arg});`),
    q: (name, arg = '') => (py ? `hjalte.${name}(${arg})` : `Hjalte.${pas(name)}(${arg})`),
    dir: (d) => (py ? `"${d}"` : `Dir.${pas(d)}`),
    not: (e) => (py ? `not ${e}` : `!${e}`),
    str: (s) => `"${s}"`,
    say: (text) => (py ? `hjalte.say("${text}")` : `Hjalte.Say("${text}");`),
    sayf: (text) => (py ? `hjalte.say(f"${text}")` : `Hjalte.Say($"${text}");`),
    sayv: (v) => (py ? `hjalte.say(${v})` : `Hjalte.Say(${v});`),
    loop: (n, body, v = 'i') => (py ? `for ${v} in range(${n}):\n${ind(body)}` : `for (int ${v} = 0; ${v} < ${n}; ${v}++)\n{\n${ind(body)}\n}`),
    whileDo: (cond, body) => (py ? `while ${cond}:\n${ind(body)}` : `while (${cond})\n{\n${ind(body)}\n}`),
    ifDo: (cond, body, other) => (py
      ? `if ${cond}:\n${ind(body)}${other ? `\nelse:\n${ind(other)}` : ''}`
      : `if (${cond})\n{\n${ind(body)}\n}${other ? `\nelse\n{\n${ind(other)}\n}` : ''}`),
    elifDo: (cond, body) => (py ? `elif ${cond}:\n${ind(body)}` : `else if (${cond})\n{\n${ind(body)}\n}`),
    def: (name, body) => (py ? `def ${name}():\n${ind(body)}` : `static void ${pas(name)}()\n{\n${ind(body)}\n}`),
    call: (name) => (py ? `${name}()` : `${pas(name)}();`),
    fn: (name) => (py ? name : pas(name)),
    comment: (t) => (py ? `# ${t}` : `// ${t}`),
    int: (v, e) => (py ? `${v} = ${e}` : `int ${v} = ${e};`),
    set: (v, e) => (py ? `${v} = ${e}` : `${v} = ${e};`),
    inc: (v) => (py ? `${v} += 1` : `${v}++;`),
    eq: (a, b) => `${a} == ${b}`,
    list: (v, items) => (py ? `${v} = [${items.map((x) => `"${x}"`).join(', ')}]` : `string[] ${v} = { ${items.map((x) => `"${x}"`).join(', ')} };`),
    each: (v, coll, body) => (py ? `for ${v} in ${coll}:\n${ind(body)}` : `foreach (string ${v} in ${coll})\n{\n${ind(body)}\n}`),
    len: (coll) => (py ? `len(${coll})` : `${coll}.Length`),
    items: () => (py ? 'hjalte.items' : 'Hjalte.Items'),
    itemsLen: () => (py ? 'len(hjalte.items)' : 'Hjalte.Items.Count'),
    hx: () => (py ? 'hjalte.x' : 'Hjalte.X'),
    // Pixelkonst
    grid: (w, h, v = 'grid') => (py ? `${v} = Canvas(${w}, ${h})` : `var ${v} = new PixelGrid(${w}, ${h});`),
    color: (c) => (py ? `"${c}"` : `Color.${pas(c)}`),
    px: (x, y, c, v = 'grid') => (py ? `${v}.set_pixel(${x}, ${y}, "${c}")` : `${v}.SetPixel(${x}, ${y}, Color.${pas(c)});`),
    pxe: (x, y, ce, v = 'grid') => (py ? `${v}.set_pixel(${x}, ${y}, ${ce})` : `${v}.SetPixel(${x}, ${y}, ${ce});`),
    fill: (c, v = 'grid') => (py ? `${v}.fill("${c}")` : `${v}.Fill(Color.${pas(c)});`),
    rows: (v, rows) => (py ? `${v} = [\n${rows.map((r) => `    "${r}",`).join('\n')}\n]` : `string[] ${v} =\n{\n${rows.map((r) => `    "${r}",`).join('\n')}\n};`),
    draw: (rowsVar, v = 'grid') => (py ? `${v}.draw(${rowsVar})` : `${v}.Draw(${rowsVar});`),
    // Turtle
    turtle: (v = 't') => (py ? `import turtle\n\n${v} = turtle.Turtle()` : `var ${v} = new Turtle();`),
    t: (name, arg = '', v = 't') => (py ? `${v}.${name}(${arg})` : `${v}.${({ penup: 'PenUp', pendown: 'PenDown' })[name] || pas(name)}(${arg});`),
    tcolor: (c, v = 't') => (py ? `${v}.color("${c}")` : `${v}.PenColor = Color.${pas(c)};`),
    tspeed: (s, v = 't') => (py ? `${v}.speed(${s})` : `${v}.Speed = ${s};`),
    L: (...ls) => ls.filter((l) => l !== null && l !== undefined).join('\n'),
    // Spel: update och draw. I Python behöver variabler som ändras en global-rad.
    num: (v, e) => (py ? `${v} = ${e}` : `double ${v} = ${e};`),
    flag: (v, e) => (py ? `${v} = ${e ? 'True' : 'False'}` : `bool ${v} = ${e ? 'true' : 'false'};`),
    truth: (e) => (py ? (e ? 'True' : 'False') : (e ? 'true' : 'false')),
    addTo: (v, e) => (py ? `${v} += ${e}` : `${v} += ${e};`),
    subFrom: (v, e) => (py ? `${v} -= ${e}` : `${v} -= ${e};`),
    and: (a, b) => (py ? `${a} and ${b}` : `${a} && ${b}`),
    update: (globals, body) => (py ? `def update():\n${ind(k2(globals) + body)}` : `void Update()\n{\n${ind(body)}\n}`),
    drawFn: (body) => (py ? `def draw():\n${ind(body)}` : `void Draw()\n{\n${ind(body)}\n}`),
    sfill: (c) => (py ? `screen.fill("${c}")` : `Screen.Fill(Color.${pas(c)});`),
    ssprite: (name, x, y) => (py ? `screen.sprite("${name}", ${x}, ${y})` : `Screen.Sprite("${name}", ${x}, ${y});`),
    stext: (t, x, y) => (py ? `screen.text(f"${t}", ${x}, ${y})` : `Screen.Text($"${t}", ${x}, ${y});`),
    key: (name) => (py ? `keyboard.${name}` : `Keyboard.IsDown("${pas(name)}")`),
    ov: (a, b, c, d) => (py ? `overlaps(${a}, ${b}, ${c}, ${d})` : `Game.Overlaps(${a}, ${b}, ${c}, ${d})`),
    ret: () => (py ? 'return' : 'return;'),
  };
  // global-raden i Python: bara om något ska ändras.
  function k2(globals) { return py && globals ? `global ${globals}\n` : ''; }
  return K;
}
const R = (re, msg) => ({ re, msg });

// ---------- Banorna ----------
const M = {
  first: { map: ['#######', '#S...G#', '#######'], goals: ['goal'] },
  open: { map: ['#######', '#.....#', '#S....#', '#.....#', '#######'], goals: [] },
  gem3: { map: ['######', '#S.gG#', '######'], goals: ['goal', 'items'] },
  corner: { map: ['#####', '#S..#', '###.#', '###G#', '#####'], goals: ['goal'] },
  zigzag: { map: ['######', '#S...#', '####.#', '#G...#', '######'], goals: ['goal'] },
  gemFill: { map: ['#####', '#Sg.#', '#####'], goals: ['items'] },
  upOpen: { map: ['#####', '#...#', '#S..#', '#...#', '#####'], goals: [] },
  turnDown: { map: ['####', '#S.#', '#.##', '#G##', '####'], goals: ['goal'] },
  around: { map: ['######', '#S..##', '###.##', '###.G#', '######'], goals: ['goal'], allowed: ['move', 'turn_left'] },
  back: { map: ['#####', '#G.S#', '#####'], dir: 'right', goals: ['goal'] },
  uturn: { map: ['#######', '#S...##', '####.##', '#G...##', '#######'], goals: ['goal'], allowed: ['move', 'turn_left'] },
  long: { map: ['###########', '#S.......G#', '###########'], goals: ['goal'] },
  stairs: { map: ['######', '#S#..#', '#..#.#', '##..##', '###.G#', '######'], goals: ['goal'] },
  stairs2: { map: ['#######', '#S#####', '#..####', '##..###', '###..##', '####.G#', '#######'], goals: ['goal'] },
  gemRow: { map: ['#########', '#Sgggggg#', '#########'], goals: ['items'] },
  wallUp: { map: ['#####', '#####', '#S..#', '#####'], goals: [] },
  randomGems: { map: ['#########', '#S.g..g.G#', '#########'], worlds: [['#########', '#Sg..g..G#', '#########'], ['#########', '#S...gg.G#', '#########']], goals: ['goal', 'items'] },
  maybeGem: { map: ['#####', '#Sg.#', '#####'], worlds: [['#####', '#S..#', '#####']], goals: [] },
  pickAll: { map: ['########', '#S.g.g.#', '########'], worlds: [['########', '#Sg.g..#', '########']], goals: ['items'] },
  toGoal: { map: ['########', '#S....G#', '########'], goals: ['goal'] },
  lengths: { map: ['######', '#S..G#', '######'], worlds: [['#########', '#S......G#', '#########'], ['####', '#SG#', '####']], goals: ['goal'] },
  wallSay: { map: ['#######', '#S....#', '#######'], worlds: [['####', '#S.#', '####']], goals: [{ wall: 'right' }, { say: 'Vägg!' }] },
  path: { map: ['#######', '#S.####', '##..###', '###...#', '#####G#', '#######'], worlds: [['#######', '#S...##', '####.##', '####..#', '#####G#', '#######']], goals: ['goal'] },
  count5: { map: ['#########', '#Sggggg.#', '#########'], goals: ['items', { say: 'Jag har 5' }] },
  walk3: { map: ['#######', '#S...G#', '#######'], goals: ['goal'] },
  doubles: { map: ['#########', '#S.....G#', '#########'], goals: ['goal', { say: '6 steg' }] },
  listPath: { map: ['######', '#S.###', '##..##', '###.G#', '######'], goals: ['goal'] },
  bag: { map: ['#######', '#Sgkg.#', '#######'], goals: [] },
  maze: {
    map: ['#########', '#S..#...#', '###.#.#.#', '#...#.#.#', '#.###.#.#', '#.....#G#', '#########'],
    worlds: [['#######', '#S....#', '#####.#', '#.....#', '#.#####', '#....G#', '#######']],
    goals: ['goal'],
  },
  keyDoor: { map: ['########', '#S.k.DG#', '########'], goals: ['goal'] },
};

// Spelövningar rättas genom att spelet körs utan skärm i ett antal bildrutor.
const sim = (label, frames, keys, expect) => ({ label, frames, keys, expect });
const hold = (key, from = 0, to = 1000) => ({ key, from, to });

function lessons(lang) {
  const k = kit(lang);
  const p = lang === 'python' ? 'py' : 'cs';
  const id = (n) => `${p}-px-${n}`;
  const F = k.py ? 'funktion' : 'metod';
  const Fs = k.py ? 'funktioner' : 'metoder';
  const right = k.c('move_right'), down = k.c('move_down'), left = k.c('move_left'), up = k.c('move_up');

  return [
    // 1. Kommandon i följd
    {
      id: id('kommandon'), title: 'Hjälten följer dina rader', tier: 1, pixel: true, level: M.first,
      text: `I Pixelvärlden skriver du riktig ${k.py ? 'Python' : 'C#'} som styr en hjälte på en karta. Hjälten gör exakt det du skriver, en rad i taget, uppifrån och ner.\n\nKartan är ett rutnät. **x** är kolumnen och växer åt höger, **y** är raden och växer nedåt. Rutan längst upp till vänster är (0, 0).\n\n\`${right}\` flyttar hjälten en ruta åt höger. På samma sätt finns \`${left}\`, \`${up}\` och \`${down}\`. Pilen bredvid hjälten visar åt vilket håll den tittar. När du kör lyses raden som körs upp.`,
      example: k.L(k.comment('Fyra steg åt höger till flaggan'), right, right, right, right),
      exercises: [
        { type: 'choice', level: M.open, prompt: 'Hjälten står på (1, 2). Var står den när koden har körts?', code: k.L(right, right, left),
          options: ['(2, 2)', '(3, 2)', '(1, 2)'], answer: 0,
          explain: 'Två steg åt höger ger x = 3, och ett steg åt vänster tillbaka ger x = 2. y ändras inte.',
          why: { 1: 'Glöm inte sista raden. Den flyttar hjälten ett steg tillbaka åt vänster.', 2: 'Hjälten går två steg höger men bara ett tillbaka, så den hamnar inte där den började.' } },
        { type: 'order', level: M.gem3, prompt: 'Ordna raderna så att hjälten plockar upp ädelstenen och sedan står på flaggan.',
          lines: [right, right, k.c('pick'), right],
          distractors: [{ line: left, why: 'Hjälten behöver aldrig gå åt vänster här. Ädelstenen och flaggan ligger till höger.' }],
          explain: 'Hjälten måste stå på ädelstenen när den plockar upp den, så pick kommer efter två steg.', hint: 'Ädelstenen ligger två rutor till höger om starten.' },
        { type: 'world', level: M.corner, prompt: 'Få hjälten till flaggan. Den måste gå runt hörnet.', starter: k.L(k.comment('Gå till flaggan'), right), solution: k.L(right, right, down, down),
          explain: 'Två steg åt höger och två steg nedåt. Varje rad är ett steg.', hint: `Räkna rutorna: först åt höger till hörnet, sedan ${k.py ? 'move_down()' : 'MoveDown()'}.` },
        { type: 'world', debug: true, level: M.zigzag, prompt: 'Den här koden ska föra hjälten till flaggan, men en rad är fel. Kör den, se var det går snett och rätta den.',
          starter: k.L(right, right, right, down, down, right, right, right), solution: k.L(right, right, right, down, down, left, left, left),
          explain: 'Efter hörnet ligger flaggan åt vänster, inte åt höger.', hint: 'Kör steg för steg och titta åt vilket håll flaggan ligger efter att hjälten gått ner.' },
        { type: 'fill', level: M.gemFill, prompt: 'Fyll i kommandot som plockar upp ädelstenen.', code: k.L(right, k.c('___')), answers: [[k.fn('pick')]],
          explain: `${k.py ? 'pick()' : 'Pick()'} plockar upp saken på rutan där hjälten står.`, hint: 'Kommandot heter pick på engelska, som i plocka.' },
      ],
    },
    // 2. Egna funktioner
    {
      id: id('funktioner'), title: `Egna ${Fs}`, tier: 2, pixel: true, level: M.turnDown,
      text: `Hjälten kan också gå framåt med \`${k.c('move')}\` och vända sig med \`${k.c('turn_left')}\`. Framåt betyder åt det håll pilen pekar.\n\nDet finns ingen sväng åt höger. Men tre vänstersvängar blir en högersväng! Du kan ge flera rader ett eget namn med en ${F}:\n\n${k.py ? '`def turn_right():` och raderna under, indragna.' : '`static void TurnRight()` och raderna inom { }.'}\n\nSedan räcker det att skriva \`${k.call('turn_right')}\`. En ${F} gör koden kortare och lättare att läsa.`,
      example: k.L(k.def('turn_right', k.L(k.c('turn_left'), k.c('turn_left'), k.c('turn_left'))), '', k.call('turn_right'), k.c('move', '2')),
      exercises: [
        { type: 'choice', level: M.upOpen, prompt: 'Hjälten står på (1, 2) och tittar åt höger. Var står den efter koden?', code: k.L(k.c('turn_left'), k.c('move')),
          options: ['(1, 1)', '(2, 2)', '(1, 3)'], answer: 0,
          explain: 'En vänstersväng från höger gör att hjälten tittar uppåt. Ett steg upp minskar y med 1.',
          why: { 1: 'Hjälten vände sig innan den gick, så den går inte åt höger längre.', 2: 'Vänster från höger är uppåt, och uppåt minskar y. (1, 3) vore ett steg nedåt.' } },
        { type: 'fill', level: M.turnDown, prompt: `Ge ${F}en ett namn och anropa den, så att hjälten svänger höger och går ner till flaggan.`,
          code: k.L(k.def('___', k.L(k.c('turn_left'), k.c('turn_left'), k.c('turn_left'))), '', k.call('___'), k.c('move', '2')),
          answers: [[k.fn('turn_right')], [k.fn('turn_right')]],
          explain: `Namnet i ${k.py ? 'def' : 'static void'} och namnet i anropet måste vara exakt likadana.`, hint: `${F[0].toUpperCase() + F.slice(1)}en heter ${k.fn('turn_right')}.` },
        { type: 'world', level: M.around, prompt: `Hjälten kan bara gå framåt och svänga vänster här. Skriv en ${F} ${k.fn('turn_right')} och använd den för att nå flaggan.`,
          starter: k.L(k.def('turn_right', k.c('turn_left')), '', k.c('move', '2')),
          solution: k.L(k.def('turn_right', k.L(k.c('turn_left'), k.c('turn_left'), k.c('turn_left'))), '', k.c('move', '2'), k.call('turn_right'), k.c('move', '2'), k.c('turn_left'), k.c('move')),
          require: [R(k.py ? 'def\\s+turn_right' : 'static\\s+void\\s+TurnRight', `Skriv en ${F} som heter ${k.fn('turn_right')}.`)],
          explain: 'Framåt två, höger, framåt två, vänster och ett sista steg.', hint: 'Tre vänstersvängar blir en högersväng. Kör steg för steg och titta på pilen.' },
        { type: 'order', level: M.back, prompt: `Hjälten tittar åt höger men flaggan ligger till vänster. Ordna raderna: en ${F} som vänder hjälten, och sedan två steg.`,
          lines: k.py
            ? ['def turn_around():', '    hjalte.turn_left()', '    hjalte.turn_left()', 'turn_around()', 'hjalte.move(2)']
            : ['static void TurnAround()', '{', '    Hjalte.TurnLeft();', '    Hjalte.TurnLeft();', '}', 'TurnAround();', 'Hjalte.Move(2);'],
          alt: k.py ? [] : [['TurnAround();', 'Hjalte.Move(2);', 'static void TurnAround()', '{', '    Hjalte.TurnLeft();', '    Hjalte.TurnLeft();', '}']],
          explain: 'Två vänstersvängar vänder hjälten helt om. Sedan går den två steg framåt, åt vänster.', hint: `Börja med att skriva ${F}en, sedan anropet.` },
        { type: 'world', debug: true, level: M.uturn, prompt: `${F[0].toUpperCase() + F.slice(1)}en ska svänga höger, men den svänger fel. Rätta den.`,
          starter: k.L(k.def('turn_right', k.L(k.c('turn_left'), k.c('turn_left'))), '', k.c('move', '3'), k.call('turn_right'), k.c('move', '2'), k.call('turn_right'), k.c('move', '3')),
          solution: k.L(k.def('turn_right', k.L(k.c('turn_left'), k.c('turn_left'), k.c('turn_left'))), '', k.c('move', '3'), k.call('turn_right'), k.c('move', '2'), k.call('turn_right'), k.c('move', '3')),
          explain: 'Två vänstersvängar vänder hjälten helt om. Det behövs tre för en högersväng.', hint: `Räkna vänstersvängarna i ${F}en. Hur många blir en högersväng?` },
      ],
    },
    // 3. for-loopar
    {
      id: id('loopar'), title: 'Gör om med en loop', tier: 2, pixel: true, level: M.long,
      text: `Att skriva samma rad åtta gånger är jobbigt. En **loop** gör om raderna åt dig.\n\n${k.py ? '`for i in range(8):` kör de indragna raderna under den 8 gånger.' : '`for (int i = 0; i < 8; i++)` kör raderna inom { } 8 gånger.'}\n\nKoden blir kortare, och vill du gå längre ändrar du bara ett tal.`,
      example: k.loop(8, right),
      exercises: [
        { type: 'choice', level: M.open, prompt: 'Hjälten står på (1, 2). Var står den efter koden?', code: k.L(k.loop(3, right), down),
          options: ['(4, 3)', '(2, 3)', '(4, 2)'], answer: 0,
          explain: 'Loopen går tre steg åt höger, till x = 4. Raden efter loopen körs en gång och tar hjälten ner till y = 3.',
          why: { 1: 'Raden i loopen körs tre gånger, inte en gång.', 2: `${down.replace(/;$/, '')} står efter loopen och körs också, en gång.` } },
        { type: 'world', level: M.long, par: 2, prompt: 'Gå till flaggan med en loop. Extrastjärna om koden är högst två rader.',
          starter: k.L(right, right), solution: k.loop(8, right),
          require: [R(k.py ? '\\bfor\\b' : '\\bfor\\s*\\(', 'Använd en for-loop i stället för att skriva samma rad många gånger.')],
          explain: 'En loop med ett steg i taget, åtta gånger.', hint: 'Räkna rutorna till flaggan och sätt det talet i loopen.' },
        { type: 'world', level: M.stairs, prompt: 'Gå nerför trappan till flaggan. Varje trappsteg är ett steg ner och ett steg åt höger.',
          starter: k.loop(2, k.L(down, right)), solution: k.loop(3, k.L(down, right)),
          require: [R(k.py ? '\\bfor\\b' : '\\bfor\\s*\\(', 'Använd en loop för trappstegen.')],
          explain: 'Trappan har tre steg, och varje varv i loopen tar ett trappsteg.', hint: 'Kör steg för steg och räkna trappstegen. Hur många varv behövs?' },
        { type: 'fill', level: M.gemRow, prompt: 'Hjälten ska plocka upp alla sex ädelstenarna. Fyll i hur många varv loopen ska gå.',
          code: k.loop('___', k.L(right, k.c('pick'))), answers: [['6']],
          explain: 'Sex ädelstenar på rad, och varje varv tar ett steg och plockar en.', hint: 'Räkna ädelstenarna.' },
        { type: 'order', level: M.stairs2, prompt: 'Ordna raderna så att hjälten tar sig ner för den långa trappan.',
          lines: k.py ? ['for i in range(4):', '    hjalte.move_down()', '    hjalte.move_right()'] : ['for (int i = 0; i < 4; i++)', '{', '    Hjalte.MoveDown();', '    Hjalte.MoveRight();', '}'],
          distractors: [{ line: k.py ? '    hjalte.move_up()' : '    Hjalte.MoveUp();', why: 'Trappan går nedåt, så hjälten behöver aldrig gå uppåt.' }],
          explain: 'Ner först och sedan höger, fyra gånger.', hint: 'Titta på kartan: det första steget från starten är nedåt.' },
      ],
    },
    // 4. if med sensorer
    {
      id: id('villkor'), title: 'Titta innan du går', tier: 3, pixel: true, level: M.randomGems,
      text: `Hjälten kan svara på frågor om världen:\n\n- \`${k.q('on_item')}\` är ${k.py ? 'True' : 'true'} om det ligger något på rutan.\n- \`${k.q('can_move', k.dir('up'))}\` är ${k.py ? 'True' : 'true'} om vägen uppåt är fri.\n- \`${k.q('at_goal')}\` är ${k.py ? 'True' : 'true'} om hjälten står på flaggan.\n\nMed **if** gör hjälten något bara när svaret är ja. Banorna här kan se olika ut varje gång koden körs, så du kan inte räkna rutor. Låt hjälten titta i stället.`,
      example: k.loop(7, k.L(right, k.ifDo(k.q('on_item'), k.c('pick')))),
      exercises: [
        { type: 'choice', level: M.wallUp, prompt: 'Det är en vägg ovanför hjälten. Vad gör hjälten?', code: k.ifDo(k.q('can_move', k.dir('up')), up, right),
          options: ['Går ett steg åt höger', 'Går ett steg uppåt', 'Studsar mot väggen'], answer: 0,
          explain: `Vägen uppåt är inte fri, så villkoret är falskt och raden under ${k.py ? 'else' : 'else'} körs.`,
          why: { 1: 'Vägen uppåt är stängd av en vägg, så villkoret är falskt.', 2: 'Hjälten kollar först, så den försöker aldrig gå in i väggen.' } },
        { type: 'world', level: M.randomGems, prompt: 'Ädelstenarna ligger på olika ställen varje gång. Gå till flaggan och plocka upp alla.',
          starter: k.loop(7, right), solution: k.loop(7, k.L(right, k.ifDo(k.q('on_item'), k.c('pick')))),
          explain: 'Hjälten kollar varje ruta och plockar bara när det finns något där.', hint: `Lägg en if med ${k.q('on_item')} i loopen.` },
        { type: 'fill', level: M.maybeGem, prompt: 'Ibland ligger det en ädelsten på rutan, ibland inte. Fyll i frågan så att hjälten bara plockar när det finns något.',
          code: k.L(right, k.ifDo(k.q('___'), k.c('pick'))), answers: [[k.fn('on_item')]],
          explain: `${k.q('on_item')} svarar ja eller nej, och pick körs bara vid ja.`, hint: 'Frågan heter on item på engelska: står hjälten på en sak?' },
        { type: 'world', debug: true, level: M.pickAll, prompt: 'Koden försöker plocka på varje ruta och stoppas av ett fel. Rätta den.',
          starter: k.loop(5, k.L(right, k.c('pick'))), solution: k.loop(5, k.L(right, k.ifDo(k.q('on_item'), k.c('pick')))),
          explain: 'Det går inte att plocka upp något från en tom ruta. Fråga först.', hint: 'Läs felmeddelandet. Vad finns på rutan där hjälten försökte plocka?' },
        { type: 'order', level: M.maybeGem, prompt: 'Ordna raderna: gå ett steg, och plocka bara om det finns något.',
          lines: k.py ? ['hjalte.move_right()', 'if hjalte.on_item():', '    hjalte.pick()'] : ['Hjalte.MoveRight();', 'if (Hjalte.OnItem())', '{', '    Hjalte.Pick();', '}'],
          distractors: [{ line: k.py ? 'if hjalte.at_goal():' : 'if (Hjalte.AtGoal())', why: 'Det finns ingen flagga här. Frågan som behövs är om hjälten står på en sak.' }],
          explain: 'Först flytta, sedan fråga, sedan plocka.', hint: 'Hjälten behöver stå på rutan innan den kan fråga om den.' },
      ],
    },
    // 5. while tills målet
    {
      id: id('while'), title: 'Gå tills du är framme', tier: 3, pixel: true, level: M.lengths,
      text: `En for-loop går ett bestämt antal varv. Men om du inte vet hur långt det är? Då passar **while**: den fortsätter så länge villkoret är sant.\n\n${k.py ? '`while not hjalte.at_goal():`' : '`while (!Hjalte.AtGoal())`'} betyder "så länge hjälten inte står på flaggan". ${k.py ? 'not' : '!'} vänder svaret.\n\nSe upp: om villkoret aldrig blir falskt slutar loopen aldrig. Kodstig stoppar programmet efter en stund.`,
      example: k.whileDo(k.not(k.q('at_goal')), right),
      exercises: [
        { type: 'choice', level: M.toGoal, prompt: 'Hur många gånger körs raden i loopen?', code: k.whileDo(k.not(k.q('at_goal')), right),
          options: ['5', '6', 'Den slutar aldrig'], answer: 0,
          explain: 'Flaggan ligger fem rutor till höger. Efter femte steget är villkoret falskt och loopen slutar.',
          why: { 1: 'Villkoret kollas innan varje varv. När hjälten står på flaggan blir det inget sjätte varv.', 2: 'Hjälten kommer fram till slut, och då blir villkoret falskt.' } },
        { type: 'world', level: M.lengths, prompt: 'Vägen är olika lång varje gång. Gå till flaggan.',
          starter: k.loop(3, right), solution: k.whileDo(k.not(k.q('at_goal')), right),
          require: [R(k.py ? '\\bwhile\\b' : '\\bwhile\\s*\\(', 'Använd while, så att koden fungerar oavsett hur lång vägen är.')],
          explain: 'while kollar efter varje steg om hjälten är framme.', hint: `Använd ${k.py ? 'while not hjalte.at_goal():' : 'while (!Hjalte.AtGoal())'}.` },
        { type: 'world', level: M.wallSay, prompt: 'Gå åt höger tills det tar stopp, och säg sedan "Vägg!".',
          starter: k.say('Vägg!'), solution: k.L(k.whileDo(k.q('can_move', k.dir('right')), right), k.say('Vägg!')),
          explain: 'Loopen går så länge vägen är fri. Raden efter loopen körs när det tar stopp.', hint: `Villkoret är ${k.q('can_move', k.dir('right'))}.` },
        { type: 'fill', level: M.lengths, prompt: 'Fyll i frågan så att hjälten går tills den står på flaggan.',
          code: k.whileDo(k.not(k.q('___')), right), answers: [[k.fn('at_goal')]],
          explain: 'at goal: står hjälten vid målet?', hint: 'Frågan heter at goal på engelska.' },
        { type: 'world', level: M.path, prompt: 'Följ stigen till flaggan. Gå åt höger när det går, annars nedåt. Stigen ser olika ut varje gång.',
          starter: k.whileDo(k.not(k.q('at_goal')), right),
          solution: k.whileDo(k.not(k.q('at_goal')), k.ifDo(k.q('can_move', k.dir('right')), right, down)),
          explain: 'En if inuti while väljer väg i varje steg.', hint: `Lägg en if med ${k.q('can_move', k.dir('right'))} inuti loopen, och gå nedåt i else.` },
      ],
    },
    // 6. Variabler och räknare
    {
      id: id('variabler'), title: 'Räkna med variabler', tier: 3, pixel: true, level: M.count5,
      text: `En **variabel** är en låda med ett namn som kommer ihåg ett värde. \`${k.int('antal', '0')}\` skapar lådan antal med värdet 0.\n\n\`${k.inc('antal')}\` ökar värdet med 1. Det är en **räknare**. Hjälten kan säga värdet med ${k.py ? 'en f-sträng: `hjalte.say(f"Jag har {antal}")`' : 'stränginterpolering: `Hjalte.Say($"Jag har {antal}");`'}.`,
      example: k.L(k.int('antal', '0'), k.loop(6, k.L(right, k.ifDo(k.q('on_item'), k.L(k.c('pick'), k.inc('antal'))))), k.sayf('Jag har {antal}')),
      exercises: [
        { type: 'choice', level: M.open, prompt: 'Vad säger hjälten?', code: k.L(k.int('steg', '0'), k.loop(3, k.L(right, k.inc('steg'))), k.sayv('steg')),
          options: ['3', '0', '1'], answer: 0,
          explain: 'Loopen går tre varv och ökar steg med 1 varje gång.',
          why: { 1: 'steg börjar på 0, men ökar i varje varv.', 2: 'Raden som ökar steg ligger inuti loopen och körs tre gånger.' } },
        { type: 'world', level: M.count5, prompt: 'Plocka upp alla ädelstenar, räkna dem och säg "Jag har 5" med hjälp av en variabel.',
          starter: k.L(k.int('antal', '0'), k.loop(6, k.L(right, k.ifDo(k.q('on_item'), k.c('pick'))))),
          solution: k.L(k.int('antal', '0'), k.loop(6, k.L(right, k.ifDo(k.q('on_item'), k.L(k.c('pick'), k.inc('antal'))))), k.sayf('Jag har {antal}')),
          require: [R(k.py ? '\\bantal\\s*(\\+=|=\\s*antal\\s*\\+)' : '\\bantal\\s*(\\+\\+|\\+=)', 'Öka variabeln antal varje gång hjälten plockar upp något.')],
          explain: 'Räknaren ökar bara när hjälten verkligen plockar något.', hint: `Lägg ${k.inc('antal')} direkt efter pick, och låt hjälten säga antalet sist.` },
        { type: 'fill', level: M.open, prompt: 'Fyll i så att antal ökar med 1.', code: k.L(k.int('antal', '0'), k.py ? 'antal ___ 1' : 'antal ___ 1;', k.sayv('antal')),
          answers: k.py ? [['+=']] : [['+=']], explain: '+= 1 lägger till 1 till det värde som redan finns.', hint: 'Plus och likhetstecken tillsammans.' },
        { type: 'world', level: M.walk3, prompt: 'Spara antalet steg i en variabel och använd den för att gå till flaggan.',
          starter: k.L(k.int('steg', '1'), k.c('move', 'steg')), solution: k.L(k.int('steg', '4'), k.c('move', 'steg')),
          require: [R('\\bsteg\\b', 'Använd variabeln steg.')],
          explain: 'move() kan ta ett tal, och talet kan ligga i en variabel.', hint: 'Hur många rutor är det till flaggan?' },
        { type: 'order', level: M.doubles, prompt: 'Ordna raderna: hjälten går ett allt längre stycke för varje varv, 1, 2 och sedan 3 steg, och säger sedan hur långt den har gått.',
          lines: k.py
            ? ['totalt = 0', 'for i in range(1, 4):', '    hjalte.move(i)', '    totalt += i', 'hjalte.say(f"{totalt} steg")']
            : ['int totalt = 0;', 'for (int i = 1; i < 4; i++)', '{', '    Hjalte.Move(i);', '    totalt += i;', '}', 'Hjalte.Say($"{totalt} steg");'],
          alt: k.py ? [['totalt = 0', 'for i in range(1, 4):', '    totalt += i', '    hjalte.move(i)', 'hjalte.say(f"{totalt} steg")']] : [['int totalt = 0;', 'for (int i = 1; i < 4; i++)', '{', '    totalt += i;', '    Hjalte.Move(i);', '}', 'Hjalte.Say($"{totalt} steg");']],
          explain: 'totalt skapas före loopen och växer i varje varv: 1 + 2 + 3 = 6.', hint: 'Variabeln måste finnas innan loopen kan öka den.' },
      ],
    },
    // 7. Listor
    {
      id: id('listor'), title: 'Listor: vägar och ryggsäckar', tier: 3, pixel: true, level: M.listPath,
      text: `En **lista** håller många värden i ordning. ${k.py ? '`vag = ["right", "down"]`' : '`string[] vag = { "right", "down" };`'} är en väg som en lista med riktningar.\n\nMed ${k.py ? '`for d in vag:`' : '`foreach (string d in vag)`'} går loopen igenom listan, ett värde i taget.\n\nHjältens ryggsäck är också en lista: \`${k.items()}\` innehåller allt den har plockat upp.`,
      example: k.L(k.list('vag', ['right', 'down', 'right', 'down', 'right']), k.each('d', 'vag', k.L(k.ifDo(k.eq('d', '"right"'), right), k.ifDo(k.eq('d', '"down"'), down)))),
      exercises: [
        { type: 'choice', level: M.bag, prompt: 'Hjälten går fyra steg och plockar allt på vägen. Vad säger den?', code: k.L(k.loop(4, k.L(right, k.ifDo(k.q('on_item'), k.c('pick')))), k.sayv(k.itemsLen())),
          options: ['3', '4', '0'], answer: 0,
          explain: 'Det ligger tre saker på vägen: två ädelstenar och en nyckel. Fjärde rutan är tom.',
          why: { 1: 'Hjälten går fyra steg, men det ligger bara saker på tre av rutorna.', 2: 'Ryggsäcken fylls varje gång hjälten plockar upp något.' } },
        { type: 'world', level: M.listPath, prompt: 'Vägen finns i listan. Gå igenom listan och flytta hjälten i varje riktning.',
          starter: k.L(k.list('vag', ['right', 'down', 'right', 'down', 'right']), k.each('d', 'vag', k.ifDo(k.eq('d', '"right"'), right))),
          solution: k.L(k.list('vag', ['right', 'down', 'right', 'down', 'right']), k.each('d', 'vag', k.L(k.ifDo(k.eq('d', '"right"'), right), k.ifDo(k.eq('d', '"down"'), down)))),
          explain: 'Loopen går igenom listan, och en if för varje riktning bestämmer steget.', hint: 'Lägg till en if för "down" också.' },
        { type: 'world', draw: true, prompt: 'Rita hjärtat. Varje sträng i listan är en rad i bilden, och r betyder röd.',
          starter: k.L(k.grid(7, 6), k.rows('rader', ['.rr.rr.', 'rrrrrrr', 'rrrrrrr', '.rrrrr.', '..rrr..', '...r...'].map((r, i) => (i < 2 ? r : '.......'))), k.draw('rader')),
          solution: k.L(k.grid(7, 6), k.rows('rader', ['.rr.rr.', 'rrrrrrr', 'rrrrrrr', '.rrrrr.', '..rrr..', '...r...']), k.draw('rader')),
          explain: 'draw målar varje bokstav i rätt ruta. Punkt betyder tom ruta.', hint: 'Titta på den bleka målbilden och skriv en sträng per rad.' },
        { type: 'fill', level: M.listPath, prompt: 'Fyll i namnet på listan som loopen ska gå igenom.',
          code: k.L(k.list('vag', ['right', 'down', 'right', 'down', 'right']), k.each('d', '___', k.L(k.ifDo(k.eq('d', '"right"'), right), k.ifDo(k.eq('d', '"down"'), down)))),
          answers: [['vag']], explain: 'Loopen går igenom listan vag.', hint: 'Listan skapas på första raden.' },
        { type: 'order', prompt: 'Ordna raderna så att rutnätet får en blå rad överst och en gul rad under.', pixel: true,
          lines: k.py ? ['grid = Canvas(4, 2)', 'rader = ["bbbb", "yyyy"]', 'grid.draw(rader)'] : ['var grid = new PixelGrid(4, 2);', 'string[] rader = { "bbbb", "yyyy" };', 'grid.Draw(rader);'],
          explain: 'Först rutnätet och listan, sist draw som målar.', hint: 'Det går inte att måla innan rutnätet finns.' },
      ],
    },
    // 8. Nästlade loopar och pixelkonst
    {
      id: id('pixelkonst'), title: 'Loopar i loopar: pixelkonst', tier: 4, pixel: true, level: null,
      text: `Ett rutnät har rader och kolumner. Med en **loop i en loop** når du varje ruta: den yttre loopen går igenom raderna (y), och den inre går igenom rutorna på raden (x).\n\n\`${k.px('x', 'y', 'blue')}\` målar en ruta. Med ett villkor, som \`(x + y) % 2 == 0\`, kan du välja vilka rutor som målas. % ger resten vid division.`,
      example: k.L(k.grid(6, 6), k.loop(6, k.loop(6, k.ifDo('(x + y) % 2 == 0', k.px('x', 'y', 'blue')), 'x'), 'y')),
      exercises: [
        { type: 'choice', pixel: true, prompt: 'Hur många rutor blir gröna?', code: k.L(k.grid(5, 5), k.loop(3, k.loop(4, k.px('x', 'y', 'green'), 'x'), 'y')),
          options: ['12', '7', '25'], answer: 0,
          explain: 'Den yttre loopen går 3 varv och den inre 4 varv per yttre varv: 3 · 4 = 12.',
          why: { 1: 'Den inre loopen körs helt i varje varv av den yttre. Talen multipliceras, de adderas inte.', 2: 'Loopen går bara 3 rader och 4 kolumner, inte hela rutnätet.' } },
        { type: 'world', draw: true, prompt: 'Rita ett schackmönster i 8 × 8 rutor: svart där (x + y) % 2 är 0, vitt annars.',
          starter: k.L(k.grid(8, 8), k.loop(8, k.loop(8, k.px('x', 'y', 'black'), 'x'), 'y')),
          solution: k.L(k.grid(8, 8), k.loop(8, k.loop(8, k.ifDo('(x + y) % 2 == 0', k.px('x', 'y', 'black'), k.px('x', 'y', 'white')), 'x'), 'y')),
          require: [R(k.py ? 'for[\\s\\S]*for' : 'for\\s*\\([\\s\\S]*for\\s*\\(', 'Använd en loop i en loop, en för y och en för x.')],
          explain: 'Villkoret växlar mellan svart och vitt för varje steg i x och y.', hint: 'Lägg en if med (x + y) % 2 == 0 i den inre loopen.' },
        { type: 'world', draw: true, prompt: 'Rita en blå ram runt ett 8 × 8 rutnät. Bara kanterna ska vara blå.',
          starter: k.L(k.grid(8, 8), k.loop(8, k.loop(8, k.px('x', 'y', 'blue'), 'x'), 'y')),
          solution: k.L(k.grid(8, 8), k.loop(8, k.loop(8, k.ifDo(k.py ? 'x == 0 or y == 0 or x == 7 or y == 7' : 'x == 0 || y == 0 || x == 7 || y == 7', k.px('x', 'y', 'blue')), 'x'), 'y')),
          explain: 'En ruta ligger på kanten om x eller y är 0 eller 7.', hint: `Använd ${k.py ? 'or' : '||'} för att kolla alla fyra kanterna.` },
        { type: 'fill', pixel: true, prompt: 'Fyll i så att den yttre loopen går igenom alla 6 rader.',
          code: k.L(k.grid(6, 6), k.loop('___', k.loop(6, k.px('x', 'y', 'yellow'), 'x'), 'y')), answers: [['6']],
          explain: 'Rutnätet har 6 rader, så y ska gå från 0 till 5.', hint: 'Rutnätet är 6 högt.' },
        { type: 'world', draw: true, prompt: 'Rita en diagonal: rutan (i, i) ska vara röd för alla i från 0 till 7. Det räcker med en loop.',
          starter: k.L(k.grid(8, 8), k.px(0, 0, 'red')),
          solution: k.L(k.grid(8, 8), k.loop(8, k.px('i', 'i', 'red'))),
          explain: 'På en diagonal är x och y lika, så samma variabel räcker.', hint: `Använd i både som x och som y: ${k.px('i', 'i', 'red')}.` },
      ],
    },
    // 9. Turtle-figurer
    {
      id: id('turtle'), title: 'Rita figurer med turtle', tier: 4, pixel: true, level: null,
      text: `${k.py ? 'Modulen **turtle** finns i riktig Python.' : 'I Pixelvärlden finns en **Turtle** i C#.'} En sköldpadda ritar ett streck där den går. Den börjar i mitten, (0, 0), och tittar åt höger. Här växer y **uppåt**.\n\n\`${k.t('forward', '100')}\` går 100 steg framåt och \`${k.t('left', '90')}\` vrider 90 grader åt vänster.\n\nFör en figur med n hörn vrider sköldpaddan totalt ett helt varv, 360 grader. Varje hörn blir alltså **360 / n** grader. Gissa inte vinkeln, räkna ut den!`,
      example: k.L(k.turtle(), k.tcolor('blue'), k.loop(4, k.L(k.t('forward', '100'), k.t('left', '90')))),
      exercises: [
        { type: 'choice', pixel: true, prompt: 'Vilken figur ritar koden?', code: k.L(k.turtle(), k.loop(3, k.L(k.t('forward', '100'), k.t('left', '120')))),
          options: ['En triangel', 'En kvadrat', 'En sexhörning'], answer: 0,
          explain: 'Tre sidor och 3 · 120 = 360 grader: en triangel.',
          why: { 1: 'En kvadrat har fyra sidor och 90 graders hörn.', 2: 'En sexhörning har sex sidor och vrider 60 grader i varje hörn.' } },
        { type: 'world', draw: true, prompt: 'Rita en kvadrat med sidan 120, som den bleka målbilden.',
          starter: k.L(k.turtle(), k.t('forward', '120'), k.t('left', '90')), solution: k.L(k.turtle(), k.loop(4, k.L(k.t('forward', '120'), k.t('left', '90')))),
          explain: 'Fyra sidor och fyra hörn på 90 grader.', hint: 'Gör om forward och left fyra gånger med en loop.' },
        { type: 'world', draw: true, prompt: 'Rita en femhörning med sidan 100. Räkna ut vinkeln i stället för att gissa.',
          starter: k.L(k.turtle(), k.loop(5, k.L(k.t('forward', '100'), k.t('left', '70')))), solution: k.L(k.turtle(), k.loop(5, k.L(k.t('forward', '100'), k.t('left', '360 / 5')))),
          explain: '360 / 5 = 72 grader i varje hörn.', hint: 'Ett helt varv är 360 grader, fördelat på fem hörn.' },
        { type: 'world', draw: true, debug: true, prompt: 'Sexhörningen blir fel. Rätta vinkeln.',
          starter: k.L(k.turtle(), k.loop(6, k.L(k.t('forward', '80'), k.t('left', '120')))), solution: k.L(k.turtle(), k.loop(6, k.L(k.t('forward', '80'), k.t('left', '60')))),
          explain: '120 grader är den inre vinkeln. Sköldpaddan ska vrida den yttre: 360 / 6 = 60.', hint: 'Vad blir 360 / 6?' },
        { type: 'world', draw: true, prompt: 'Rita två streck med ett mellanrum: 50 steg, lyft pennan 30 steg, och 50 steg till.',
          starter: k.L(k.turtle(), k.t('forward', '50'), k.t('forward', '30'), k.t('forward', '50')),
          solution: k.L(k.turtle(), k.t('forward', '50'), k.t('penup'), k.t('forward', '30'), k.t('pendown'), k.t('forward', '50')),
          explain: `${k.t('penup').replace(/;$/, '')} lyfter pennan så att sköldpaddan flyttar sig utan att rita.`, hint: `Använd ${k.t('penup').replace(/;$/, '')} och ${k.t('pendown').replace(/;$/, '')}.` },
      ],
    },
    // 10. Slutprojekt
    {
      id: id('projekt'), title: 'Slutprojekt i Pixelvärlden', tier: 5, pixel: true, level: M.maze,
      text: `Nu kan du kommandon, ${Fs}, loopar, villkor, variabler och listor. Dags att använda allt!\n\n1. Ta dig igenom labyrinten med en regel i stället för en färdig väg. Labyrinten ser olika ut varje gång.\n2. Rita en egen pixelbild.\n3. Rita ett mönster med turtle.\n\nTips för labyrinten: håll högerhanden mot väggen. Kan hjälten svänga höger, gör det. Annars rakt fram om det går, annars vänster.`,
      example: k.L(k.grid(8, 8), k.rows('bild', ['..yyyy..', '.yyyyyy.', 'yykyykyy', 'yyyyyyyy', 'ykyyyyky', 'yykkkkyy', '.yyyyyy.', '..yyyy..']), k.draw('bild')),
      exercises: [
        { type: 'world', level: M.maze, prompt: 'Ta dig till flaggan i labyrinten. Den ser olika ut varje gång, så koden måste välja väg själv.',
          starter: k.L(k.comment('Tips: håll högerhanden mot väggen'), k.whileDo(k.not(k.q('at_goal')), right)),
          solution: k.py
            ? 'riktningar = ["right", "down", "left", "up"]\n\ndef gå(r):\n    if r == "right":\n        hjalte.move_right()\n    elif r == "down":\n        hjalte.move_down()\n    elif r == "left":\n        hjalte.move_left()\n    else:\n        hjalte.move_up()\n\nd = 0\nwhile not hjalte.at_goal():\n    höger = (d + 1) % 4\n    if hjalte.can_move(riktningar[höger]):\n        d = höger\n    elif not hjalte.can_move(riktningar[d]):\n        d = (d + 3) % 4\n        continue\n    gå(riktningar[d])'
            : 'string[] riktningar = { "right", "down", "left", "up" };\nint d = 0;\nwhile (!Hjalte.AtGoal())\n{\n    int höger = (d + 1) % 4;\n    if (Hjalte.CanMove(riktningar[höger]))\n    {\n        d = höger;\n    }\n    else if (!Hjalte.CanMove(riktningar[d]))\n    {\n        d = (d + 3) % 4;\n        continue;\n    }\n    Gå(riktningar[d]);\n}\n\nstatic void Gå(string r)\n{\n    if (r == "right") Hjalte.MoveRight();\n    else if (r == "down") Hjalte.MoveDown();\n    else if (r == "left") Hjalte.MoveLeft();\n    else Hjalte.MoveUp();\n}',
          require: [R(k.py ? '\\bwhile\\b' : '\\bwhile\\s*\\(', 'Använd while så att hjälten fortsätter tills den är framme.')],
          explain: 'Högerhandsregeln hittar alltid ut ur en labyrint utan öar.', hint: 'Spara riktningen i en variabel. I varje steg: prova höger om riktningen, sedan rakt fram, sedan vänster.' },
        { type: 'world', pixel: true, check: { canvas: { minColors: 3, minPixels: 30 } }, prompt: 'Rita en egen pixelbild i ett 16 × 16 rutnät, med minst 3 färger och minst 30 målade rutor. Det finns inget facit, rita vad du vill!',
          starter: k.L(k.grid(16, 16), k.px(0, 0, 'red')),
          solution: k.L(k.grid(16, 16), k.fill('sky'), k.loop(16, k.L(k.px('x', 14, 'green'), k.px('x', 15, 'brown')), 'x'), k.loop(3, k.px('7', '11 + i', 'brown'))),
          explain: 'Snyggt! Dela gärna bilden med en länk från Pixelvärlden i Kodlabbet.', hint: 'Börja med fill för bakgrunden och måla sedan resten med loopar och set_pixel.' },
        { type: 'world', pixel: true, check: { turtle: { minLines: 12, minColors: 2 } }, prompt: 'Rita ett eget mönster med turtle: minst 12 streck och minst 2 färger. Prova en figur som vrids lite i varje varv.',
          starter: k.L(k.turtle(), k.t('forward', '100')),
          solution: k.L(k.turtle(), k.tspeed(0), k.loop(12, k.L(k.ifDo('i % 2 == 0', k.tcolor('blue'), k.tcolor('orange')), k.loop(4, k.L(k.t('forward', '80'), k.t('left', '90')), 'j'), k.t('left', '30')))),
          explain: 'Mönster blir till när en figur upprepas och vrids lite varje gång.', hint: 'Lägg en kvadrat i en loop och vrid 30 grader efter varje kvadrat.' },
      ],
    },
    // 11. Bildrutor
    {
      id: id('bildrutor'), title: 'Spel: bildrutor som ett blädderblock', tier: 3, pixel: true, game: true, level: null,
      text: `Ett spel är som ett blädderblock. Varje sida är en bild, och när du bläddrar snabbt ser det ut som att något rör sig.\n\nI Pixelvärlden skriver du två ${Fs}:\n\n- \`${k.py ? 'def update():' : 'void Update()'}\` ändrar lite i läget, till exempel flyttar hjälten en bit.\n- \`${k.py ? 'def draw():' : 'void Draw()'}\` ritar hela bilden.\n\nKodstig anropar dem ungefär 30 gånger per sekund åt dig, så du behöver **ingen egen while-loop**. Skärmen är 20 × 15 rutor.${k.py ? '\n\nI Python behöver update() raden `global x` för att få ändra variabeln x som finns utanför funktionen.' : '\n\nSkriv Update och Draw utan static, så att de kan använda variablerna högst upp i programmet.'}`,
      example: k.L(k.num('x', '0'), '', k.update('x', k.addTo('x', '0.1')), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('hero', 'x', '7')))),
      exercises: [
        { type: 'choice', game: true, prompt: 'x börjar på 2. Spelet har ritat den första bilden och sedan gått fyra bildrutor till. Vilket x ritar draw() nu?',
          code: k.L(k.num('x', '2'), '', k.update('x', k.addTo('x', '0.5')), '', k.drawFn(k.ssprite('hero', 'x', '7'))),
          options: ['4', '2.5', '6'], answer: 0,
          explain: 'Varje bildruta kör update() en gång: 2 + 4 · 0.5 = 4.',
          why: { 1: 'update() körs i varje bildruta, inte bara en gång.', 2: 'x ökar med 0.5 per bildruta, inte med 1.' } },
        { type: 'game', prompt: 'Få ädelstenen att glida åt höger över skärmen. Ändra update() så att gem_x ökar lite i varje bildruta.',
          starter: k.L(k.num('gem_x', '0'), '', k.update(null, k.py ? 'pass' : ''), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('gem', 'gem_x', '5')))).replace('void Update()\n{\n    \n}', 'void Update()\n{\n}'),
          solution: k.L(k.num('gem_x', '0'), '', k.update('gem_x', k.addTo('gem_x', '0.2')), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('gem', 'gem_x', '5')))),
          sims: [sim('Efter 30 bildrutor', 30, [], [{ var: 'gem_x', op: '>', value: 3, text: 'ädelstenen har glidit åt höger' }])],
          explain: 'En liten ökning i varje bildruta blir en mjuk rörelse.', hint: `Lägg ${k.addTo('gem_x', '0.2')} i update()${k.py ? ', och glöm inte global gem_x' : ''}.` },
        { type: 'fill', game: true, prompt: 'Fyll i så att x ökar med 0.1 i varje bildruta.', code: k.L(k.num('x', '0'), '', k.update('x', k.py ? 'x ___ 0.1' : 'x ___ 0.1;'), '', k.drawFn(k.ssprite('hero', 'x', '7'))),
          answers: [['+=']], explain: '+= lägger till värdet till det som redan finns.', hint: 'Plus och likhetstecken.' },
        { type: 'game', debug: true, prompt: 'Hjälten ska gå åt höger, men går åt fel håll och försvinner. Rätta buggen.',
          starter: k.L(k.num('x', '5'), '', k.update('x', k.subFrom('x', '0.2')), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('hero', 'x', '7')))),
          solution: k.L(k.num('x', '5'), '', k.update('x', k.addTo('x', '0.2')), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('hero', 'x', '7')))),
          sims: [sim('Efter 20 bildrutor', 20, [], [{ var: 'x', op: '>', value: 5, text: 'hjälten har gått åt höger' }])],
          explain: 'Åt höger betyder att x blir större.', hint: 'Ska x bli större eller mindre när hjälten går åt höger?' },
      ],
    },
    // 12. Tangenter
    {
      id: id('tangenter'), title: 'Spel: styr med tangenterna', tier: 3, pixel: true, game: true, level: null,
      text: `\`${k.key('right')}\` är ${k.py ? 'True' : 'true'} så länge högerpilen hålls nere. Kolla tangenterna i update() och flytta hjälten.\n\nTangenterna fungerar bara när spelytan har fokus. Klicka på den, så får den en tydlig ram. På en telefon finns pilknappar under spelytan.\n\nFör att hjälten inte ska gå ut från skärmen kan du kolla kanten också: x ska vara mellan 0 och 19.`,
      example: k.L(k.num('x', '9'), '', k.update('x', k.L(k.ifDo(k.key('left'), k.subFrom('x', '0.25')), k.ifDo(k.key('right'), k.addTo('x', '0.25')))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('hero', 'x', '7')))),
      exercises: [
        { type: 'choice', game: true, prompt: 'Vad händer när ingen tangent hålls nere?', code: k.update('x', k.ifDo(k.key('right'), k.addTo('x', '0.25'))),
          options: ['Hjälten står still', 'Hjälten går åt höger', 'Spelet stannar'], answer: 0,
          explain: 'Villkoret är falskt, så x ändras inte. draw() ritar hjälten på samma ställe varje bildruta.',
          why: { 1: 'Hjälten går bara åt höger medan högerpilen hålls nere.', 2: 'update() och draw() fortsätter att anropas även när inget händer.' } },
        { type: 'game', prompt: 'Hjälten kan gå åt vänster och höger. Lägg till upp och ner också, med variabeln y.',
          starter: k.L(k.num('x', '9'), k.num('y', '7'), '', k.update('x', k.L(k.ifDo(k.key('left'), k.subFrom('x', '0.25')), k.ifDo(k.key('right'), k.addTo('x', '0.25')))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('hero', 'x', 'y')))),
          solution: k.L(k.num('x', '9'), k.num('y', '7'), '', k.update('x, y', k.L(k.ifDo(k.key('left'), k.subFrom('x', '0.25')), k.ifDo(k.key('right'), k.addTo('x', '0.25')), k.ifDo(k.key('up'), k.subFrom('y', '0.25')), k.ifDo(k.key('down'), k.addTo('y', '0.25')))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('hero', 'x', 'y')))),
          sims: [sim('Uppåtpilen i 12 bildrutor', 12, [hold('up')], [{ var: 'y', op: '<', value: 6, text: 'y har blivit mindre' }]), sim('Neråtpilen i 12 bildrutor', 12, [hold('down')], [{ var: 'y', op: '>', value: 8, text: 'y har blivit större' }])],
          explain: 'Upp gör y mindre och ner gör y större, eftersom y växer nedåt på skärmen.', hint: `Gör som för x, men med ${k.key('up')}, ${k.key('down')} och y.${k.py ? ' Lägg till y i global-raden.' : ''}` },
        { type: 'game', prompt: 'Hjälten kan gå ut från skärmen åt vänster. Se till att x aldrig blir mindre än 0.',
          starter: k.L(k.num('x', '3'), '', k.update('x', k.ifDo(k.key('left'), k.subFrom('x', '0.25'))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('hero', 'x', '7')))),
          solution: k.L(k.num('x', '3'), '', k.update('x', k.ifDo(k.and(k.key('left'), 'x > 0'), k.subFrom('x', '0.25'))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('hero', 'x', '7')))),
          sims: [sim('Vänsterpilen i 60 bildrutor', 60, [hold('left')], [{ var: 'x', op: '>=', value: 0, text: 'x är 0 eller mer' }, { var: 'x', op: '<', value: 1, text: 'hjälten har gått ända fram till kanten' }])],
          explain: 'Hjälten går bara om den inte redan står vid kanten.', hint: `Lägg till ${k.py ? 'and x > 0' : '&& x > 0'} i villkoret.` },
        { type: 'fill', game: true, prompt: 'Fyll i tangenten så att hjälten går åt vänster.', code: k.L(k.num('x', '9'), '', k.update('x', k.ifDo(k.key('___'), k.subFrom('x', '0.25'))), '', k.drawFn(k.ssprite('hero', 'x', '7'))).replace('"___"', '"___"').replace('IsDown("___")', 'IsDown("___")'),
          answers: [[k.py ? 'left' : 'Left']], explain: 'Vänsterpilen heter left.', hint: 'Vänster på engelska.' },
      ],
    },
    // 13. Krockar
    {
      id: id('krockar'), title: 'Spel: krockar och poäng', tier: 4, pixel: true, game: true, level: null,
      text: `\`${k.ov('x', 'y', 'gem_x', 'gem_y')}\` är ${k.py ? 'True' : 'true'} när hjälten och ädelstenen överlappar, alltså är mindre än en ruta från varandra åt båda hållen.\n\nNär de krockar kan du öka en poängräknare. Men se upp: om ädelstenen ligger kvar krockar de igen i nästa bildruta, och då ökar poängen 30 gånger i sekunden! Flytta ädelstenen när den har plockats.`,
      example: k.L(k.num('x', '2'), k.num('gem_x', '8'), k.int('poang', '0'), '', k.update('x, gem_x, poang', k.L(k.ifDo(k.key('right'), k.addTo('x', '0.25')), k.ifDo(k.ov('x', '7', 'gem_x', '7'), k.L(k.inc('poang'), k.set('gem_x', '18')))) ), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('gem', 'gem_x', '7'), k.ssprite('hero', 'x', '7'), k.stext('Poäng: {poang}', '0.5', '0.3')))),
      exercises: [
        { type: 'choice', game: true, prompt: `Vad blir ${k.ov('3', '4', '3.5', '4.2')}?`, code: k.ov('3', '4', '3.5', '4.2'),
          options: [k.truth(true), k.truth(false)], answer: 0,
          explain: 'Skillnaden är 0.5 åt sidan och 0.2 uppåt. Båda är mindre än 1, så de överlappar.',
          why: { 1: 'Två saker överlappar när de är mindre än en ruta från varandra åt båda hållen. Här är det 0.5 och 0.2.' } },
        { type: 'game', prompt: 'Ge en poäng när hjälten når ädelstenen, och flytta sedan ädelstenen till gem_x = 0 så att poängen bara ökar en gång.',
          starter: k.L(k.num('x', '2'), k.num('gem_x', '6'), k.int('poang', '0'), '', k.update('x, gem_x, poang', k.ifDo(k.key('right'), k.addTo('x', '0.25'))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('gem', 'gem_x', '7'), k.ssprite('hero', 'x', '7')))),
          solution: k.L(k.num('x', '2'), k.num('gem_x', '6'), k.int('poang', '0'), '', k.update('x, gem_x, poang', k.L(k.ifDo(k.key('right'), k.addTo('x', '0.25')), k.ifDo(k.ov('x', '7', 'gem_x', '7'), k.L(k.inc('poang'), k.set('gem_x', '0'))))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('gem', 'gem_x', '7'), k.ssprite('hero', 'x', '7')))),
          sims: [sim('Högerpilen i 40 bildrutor', 40, [hold('right')], [{ var: 'poang', op: '==', value: 1, text: 'poängen är exakt 1' }])],
          explain: 'Krocken ger en poäng, och när ädelstenen flyttas krockar de inte igen.', hint: `Använd ${k.ov('x', '7', 'gem_x', '7')} i en if. Öka poang och sätt gem_x till 0 i samma if.` },
        { type: 'game', debug: true, prompt: 'Poängen rusar iväg när hjälten står på ädelstenen. Rätta buggen så att varje ädelsten bara ger en poäng.',
          starter: k.L(k.num('x', '6'), k.num('gem_x', '6'), k.int('poang', '0'), '', k.update('gem_x, poang', k.ifDo(k.ov('x', '7', 'gem_x', '7'), k.inc('poang'))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('gem', 'gem_x', '7'), k.ssprite('hero', 'x', '7')))),
          solution: k.L(k.num('x', '6'), k.num('gem_x', '6'), k.int('poang', '0'), '', k.update('gem_x, poang', k.ifDo(k.ov('x', '7', 'gem_x', '7'), k.L(k.inc('poang'), k.set('gem_x', '15')))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('gem', 'gem_x', '7'), k.ssprite('hero', 'x', '7')))),
          sims: [sim('Hjälten står stilla i 30 bildrutor', 30, [], [{ var: 'poang', op: '==', value: 1, text: 'poängen är exakt 1' }])],
          explain: 'Ädelstenen flyttas bort efter krocken, så den räknas bara en gång.', hint: 'Flytta ädelstenen någon annanstans direkt efter att poängen ökat.' },
        { type: 'fill', game: true, prompt: 'Fyll i så att poängen ökar när hjälten och myntet krockar.', code: k.L(k.num('x', '4'), k.num('coin_x', '4'), k.int('poang', '0'), '', k.update('coin_x, poang', k.ifDo(k.py ? '___(x, 7, coin_x, 7)' : 'Game.___(x, 7, coin_x, 7)', k.L(k.inc('poang'), k.set('coin_x', '15')))), '', k.drawFn(k.ssprite('coin', 'coin_x', '7'))),
          answers: [[k.py ? 'overlaps' : 'Overlaps']], explain: 'overlaps svarar om två saker ligger på samma ställe.', hint: 'Funktionen heter overlaps på engelska: överlappar.' },
      ],
    },
    // 14. Ditt första spel
    {
      id: id('spel'), title: 'Spel: ditt första spel', tier: 5, pixel: true, game: true, level: null,
      text: `Nu bygger du ett helt spel: en sten faller från himlen, och hjälten ska undvika den. Spelet tar slut om stenen träffar.\n\n1. Låt stenen falla: öka sten_y i update().\n2. Styr hjälten åt sidan med piltangenterna.\n3. Om stenen och hjälten krockar sätts slut till ${k.truth(true)}. När slut är ${k.truth(true)} ska ingenting röra sig längre.\n\nSedan är det fritt fram: gör ett eget spel med det du kan!`,
      example: k.L(k.num('sten_y', '0'), '', k.update('sten_y', k.addTo('sten_y', '0.2')), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('wall', '10', 'sten_y')))),
      exercises: [
        { type: 'game', prompt: 'Stenen faller rakt mot hjälten på x = 10. Sätt slut till sant när de krockar, och låt ingenting röra sig när spelet är slut.',
          starter: k.L(k.num('x', '10'), k.num('sten_y', '0'), k.flag('slut', false), '', k.update('x, sten_y, slut', k.L(k.ifDo(k.key('left'), k.subFrom('x', '0.3')), k.ifDo(k.key('right'), k.addTo('x', '0.3')), k.addTo('sten_y', '0.2'))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('wall', '10', 'sten_y'), k.ssprite('hero', 'x', '13')))),
          solution: k.L(k.num('x', '10'), k.num('sten_y', '0'), k.flag('slut', false), '', k.update('x, sten_y, slut', k.L(k.ifDo('slut', k.ret()), k.ifDo(k.key('left'), k.subFrom('x', '0.3')), k.ifDo(k.key('right'), k.addTo('x', '0.3')), k.addTo('sten_y', '0.2'), k.ifDo(k.ov('x', '13', '10', 'sten_y'), k.set('slut', k.truth(true))))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('wall', '10', 'sten_y'), k.ssprite('hero', 'x', '13')))),
          sims: [
            sim('Hjälten står still', 90, [], [{ var: 'slut', op: '==', value: true, text: 'stenen träffar och spelet tar slut' }, { var: 'sten_y', op: '<', value: 13.5, text: 'stenen stannar när spelet är slut' }]),
            sim('Hjälten går åt vänster', 90, [hold('left')], [{ var: 'slut', op: '==', value: false, text: 'stenen missar' }]),
          ],
          explain: 'Spelet kollar krocken i varje bildruta, och när slut är sant gör update() ingenting mer.', hint: `Lägg till ${k.py ? 'if slut: return' : 'if (slut) return;'} först i update(), och en if med ${k.ov('x', '13', '10', 'sten_y')} sist.` },
        { type: 'game', prompt: 'Gör ett eget spel! Det enda kravet är att något på skärmen ändras när man håller nere en piltangent. Prova med Spela när du är klar.',
          starter: k.L(k.num('x', '9'), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('hero', 'x', '7')))),
          solution: k.L(k.num('x', '9'), '', k.update('x', k.ifDo(k.key('right'), k.addTo('x', '0.25'))), '', k.drawFn(k.L(k.sfill('sky'), k.ssprite('hero', 'x', '7')))),
          sims: [{ label: 'Spelet reagerar på piltangenterna', frames: 20, keys: [hold('right'), hold('left', 0, 0), hold('up', 0, 0)], reacts: true, expect: [] }],
          explain: 'Ditt första egna spel! Dela det gärna med en länk från Pixelvärlden i Kodlabbet.', hint: `Skriv en ${k.py ? 'update()' : 'Update()'} som ändrar x när högerpilen hålls nere.` },
      ],
    },
  ];
}

/** Kapitlet för ett spår: lang är 'python' eller 'csharp'. */
export function pixelChapter(lang) {
  return { id: lang === 'python' ? 'py-px' : 'cs-px', title: 'Pixelvärlden', standalone: true, pixel: true, lessons: lessons(lang) };
}
