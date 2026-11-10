// Skapad av scripts/content-manifest.mjs. Ändra inte för hand, kör npm run content.
export default [
 {
  "id": "csharp",
  "name": "C#",
  "lang": "csharp",
  "chapters": [
   {
    "id": "cs1",
    "title": "De första byggstenarna",
    "lessons": [
     {
      "id": "cs-hello",
      "title": "Din första kodrad",
      "tier": 1,
      "requires": [],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-int",
      "title": "Heltal och variabler",
      "tier": 1,
      "requires": [
       "cs-hello"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-math",
      "title": "Räkna med kod",
      "tier": 1,
      "requires": [
       "cs-int"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-string",
      "title": "Text och sammanfogning",
      "tier": 1,
      "requires": [
       "cs-math"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-bool",
      "title": "Sant eller falskt",
      "tier": 1,
      "requires": [
       "cs-string"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "cs2",
    "title": "Få koden att tänka",
    "lessons": [
     {
      "id": "cs-if",
      "title": "Om något är sant: if",
      "tier": 1,
      "requires": [
       "cs-bool"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-else",
      "title": "else och else if",
      "tier": 1,
      "requires": [
       "cs-if"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-while",
      "title": "Upprepa med while",
      "tier": 1,
      "requires": [
       "cs-else"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-for",
      "title": "Räkna med for",
      "tier": 1,
      "requires": [
       "cs-while"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "cs3",
    "title": "Bygg vidare",
    "lessons": [
     {
      "id": "cs-double",
      "title": "Decimaltal och typer",
      "tier": 1,
      "requires": [
       "cs-for"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-array",
      "title": "Arrayer",
      "tier": 1,
      "requires": [
       "cs-double"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-foreach",
      "title": "Gå igenom en array",
      "tier": 2,
      "requires": [
       "cs-array"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-strmethods",
      "title": "Arbeta med text",
      "tier": 2,
      "requires": [
       "cs-foreach"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "cs4",
    "title": "Logik i flera steg",
    "lessons": [
     {
      "id": "cs-andor",
      "title": "Sammansatta villkor",
      "tier": 2,
      "requires": [
       "cs-strmethods"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-bounds",
      "title": "Gränsvärden",
      "tier": 2,
      "requires": [
       "cs-andor"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "cs-accum",
      "title": "Ackumulatorer: summa, antal och största",
      "tier": 4,
      "requires": [
       "cs-bounds"
      ],
      "exerciseCount": 9,
      "reviewable": true
     },
     {
      "id": "cs-index",
      "title": "Index och sökning",
      "tier": 4,
      "requires": [
       "cs-accum"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "cs5",
    "title": "Funktioner & samlingar",
    "lessons": [
     {
      "id": "cs-methods",
      "title": "Egna metoder",
      "tier": 3,
      "requires": [
       "cs-index"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-params",
      "title": "Parametrar",
      "tier": 3,
      "requires": [
       "cs-methods"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-return",
      "title": "Returvärden",
      "tier": 3,
      "requires": [
       "cs-params"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-list",
      "title": "List<T> tillsammans med metoder",
      "tier": 3,
      "requires": [
       "cs-return"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "cs6",
    "title": "Tillämpning & miniprojekt",
    "lessons": [
     {
      "id": "cs-validate",
      "title": "Validera indata",
      "tier": 4,
      "requires": [
       "cs-list"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "cs-split",
      "title": "Dela upp en lösning",
      "tier": 4,
      "requires": [
       "cs-validate"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-budget",
      "title": "Miniprojekt: en robust budget",
      "tier": 5,
      "requires": [
       "cs-split"
      ],
      "exerciseCount": 6,
      "reviewable": false
     },
     {
      "id": "cs-scores",
      "title": "Miniprojekt: poängsammanställning",
      "tier": 5,
      "requires": [
       "cs-budget"
      ],
      "exerciseCount": 6,
      "reviewable": false
     }
    ]
   },
   {
    "id": "cs7",
    "title": "Fel och undantag",
    "lessons": [
     {
      "id": "cs-errors",
      "title": "Läsa felmeddelanden",
      "tier": 3,
      "requires": [
       "cs-scores"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "cs-try",
      "title": "Fånga fel med try och catch",
      "tier": 3,
      "requires": [
       "cs-errors"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-throw",
      "title": "Kasta egna undantag",
      "tier": 4,
      "requires": [
       "cs-try"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-tryparse",
      "title": "TryParse och finally",
      "tier": 4,
      "requires": [
       "cs-throw"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "cs8",
    "title": "Klasser och objekt",
    "lessons": [
     {
      "id": "cs-class",
      "title": "Din första klass",
      "tier": 3,
      "requires": [
       "cs-tryparse"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-ctor",
      "title": "Konstruktorer",
      "tier": 3,
      "requires": [
       "cs-class"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-props",
      "title": "Egenskaper och inkapsling",
      "tier": 4,
      "requires": [
       "cs-ctor"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "cs-objmethods",
      "title": "Metoder och ToString",
      "tier": 4,
      "requires": [
       "cs-props"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "cs-bank",
      "title": "Miniprojekt: bankkonto",
      "tier": 5,
      "requires": [
       "cs-objmethods"
      ],
      "exerciseCount": 3,
      "reviewable": false
     }
    ]
   },
   {
    "id": "cs9",
    "title": "Arv och interface",
    "lessons": [
     {
      "id": "cs-inherit",
      "title": "Arv",
      "tier": 4,
      "requires": [
       "cs-bank"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-virtual",
      "title": "Virtuella metoder",
      "tier": 4,
      "requires": [
       "cs-inherit"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-abstract",
      "title": "Abstrakta klasser",
      "tier": 4,
      "requires": [
       "cs-virtual"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "cs-interface",
      "title": "Interface",
      "tier": 4,
      "requires": [
       "cs-abstract"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "cs10",
    "title": "Dictionary och LINQ",
    "lessons": [
     {
      "id": "cs-dict",
      "title": "Dictionary",
      "tier": 3,
      "requires": [
       "cs-interface"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-lambda",
      "title": "Lambdas",
      "tier": 4,
      "requires": [
       "cs-dict"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-linq",
      "title": "LINQ: filtrera och omvandla",
      "tier": 4,
      "requires": [
       "cs-lambda"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-linq-sort",
      "title": "LINQ: sortera och räkna",
      "tier": 4,
      "requires": [
       "cs-linq"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "cs11",
    "title": "Algoritmer",
    "lessons": [
     {
      "id": "cs-switch",
      "title": "switch och tillståndsmaskiner",
      "tier": 4,
      "requires": [
       "cs-linq-sort"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "cs-search",
      "title": "Sökning: linjär och binär",
      "tier": 4,
      "requires": [
       "cs-switch"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-recursion",
      "title": "Rekursion",
      "tier": 4,
      "requires": [
       "cs-search"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "cs-sorting",
      "title": "Sorteringsalgoritmer",
      "tier": 4,
      "requires": [
       "cs-recursion"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "cs12",
    "title": "Slutprojekt i C#",
    "lessons": [
     {
      "id": "cs-library",
      "title": "Slutprojekt: bibliotekssystem",
      "tier": 5,
      "requires": [
       "cs-sorting"
      ],
      "exerciseCount": 4,
      "reviewable": false
     },
     {
      "id": "cs-shop",
      "title": "Slutprojekt: kundvagn",
      "tier": 5,
      "requires": [
       "cs-library"
      ],
      "exerciseCount": 4,
      "reviewable": false
     },
     {
      "id": "cs-grades",
      "title": "Slutprojekt: betygsrapport",
      "tier": 5,
      "requires": [
       "cs-shop"
      ],
      "exerciseCount": 4,
      "reviewable": false
     }
    ]
   },
   {
    "id": "cs13",
    "title": "Program som pratar med dig",
    "lessons": [
     {
      "id": "cs-readline",
      "title": "Fråga användaren med ReadLine",
      "tier": 2,
      "requires": [
       "cs-grades"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "cs-parse-input",
      "title": "Gör om svaret till ett tal",
      "tier": 3,
      "requires": [
       "cs-readline"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "cs-random",
      "title": "Slump med Random",
      "tier": 3,
      "requires": [
       "cs-parse-input"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "cs-menu-loop",
      "title": "Menyer med while (true)",
      "tier": 4,
      "requires": [
       "cs-random"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "cs-real-project",
      "title": "Ett riktigt .NET-projekt",
      "tier": 2,
      "requires": [
       "cs-menu-loop"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "cs-io-project",
      "title": "Miniprojekt: gissa talet och budget",
      "tier": 5,
      "requires": [
       "cs-real-project"
      ],
      "exerciseCount": 4,
      "reviewable": false
     }
    ]
   },
   {
    "id": "cs-px",
    "title": "Pixelvärlden",
    "standalone": true,
    "pixel": true,
    "lessons": [
     {
      "id": "cs-px-kommandon",
      "title": "Hjälten följer dina rader",
      "tier": 1,
      "pixel": true,
      "level": {
       "map": [
        "#######",
        "#S...G#",
        "#######"
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "cs-px-funktioner",
      "title": "Egna metoder",
      "tier": 2,
      "pixel": true,
      "level": {
       "map": [
        "####",
        "#S.#",
        "#.##",
        "#G##",
        "####"
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [
       "cs-px-kommandon"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "cs-px-loopar",
      "title": "Gör om med en loop",
      "tier": 2,
      "pixel": true,
      "level": {
       "map": [
        "###########",
        "#S.......G#",
        "###########"
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [
       "cs-px-funktioner"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "cs-px-villkor",
      "title": "Titta innan du går",
      "tier": 3,
      "pixel": true,
      "level": {
       "map": [
        "#########",
        "#S.g..g.G#",
        "#########"
       ],
       "worlds": [
        [
         "#########",
         "#Sg..g..G#",
         "#########"
        ],
        [
         "#########",
         "#S...gg.G#",
         "#########"
        ]
       ],
       "goals": [
        "goal",
        "items"
       ]
      },
      "requires": [
       "cs-px-loopar"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "cs-px-while",
      "title": "Gå tills du är framme",
      "tier": 3,
      "pixel": true,
      "level": {
       "map": [
        "######",
        "#S..G#",
        "######"
       ],
       "worlds": [
        [
         "#########",
         "#S......G#",
         "#########"
        ],
        [
         "####",
         "#SG#",
         "####"
        ]
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [
       "cs-px-villkor"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "cs-px-variabler",
      "title": "Räkna med variabler",
      "tier": 3,
      "pixel": true,
      "level": {
       "map": [
        "#########",
        "#Sggggg.#",
        "#########"
       ],
       "goals": [
        "items",
        {
         "say": "Jag har 5"
        }
       ]
      },
      "requires": [
       "cs-px-while"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "cs-px-listor",
      "title": "Listor: vägar och ryggsäckar",
      "tier": 3,
      "pixel": true,
      "level": {
       "map": [
        "######",
        "#S.###",
        "##..##",
        "###.G#",
        "######"
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [
       "cs-px-variabler"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "cs-px-pixelkonst",
      "title": "Loopar i loopar: pixelkonst",
      "tier": 4,
      "pixel": true,
      "level": null,
      "requires": [
       "cs-px-listor"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "cs-px-turtle",
      "title": "Rita figurer med turtle",
      "tier": 4,
      "pixel": true,
      "level": null,
      "requires": [
       "cs-px-pixelkonst"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "cs-px-projekt",
      "title": "Slutprojekt i Pixelvärlden",
      "tier": 5,
      "pixel": true,
      "level": {
       "map": [
        "#########",
        "#S..#...#",
        "###.#.#.#",
        "#...#.#.#",
        "#.###.#.#",
        "#.....#G#",
        "#########"
       ],
       "worlds": [
        [
         "#######",
         "#S....#",
         "#####.#",
         "#.....#",
         "#.#####",
         "#....G#",
         "#######"
        ]
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [
       "cs-px-turtle"
      ],
      "exerciseCount": 3,
      "reviewable": false
     }
    ]
   }
  ]
 },
 {
  "id": "python",
  "name": "Python",
  "lang": "python",
  "chapters": [
   {
    "id": "py1",
    "title": "Börja med grunderna",
    "lessons": [
     {
      "id": "py-print",
      "title": "Din första kodrad",
      "tier": 1,
      "requires": [],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-var",
      "title": "Variabler",
      "tier": 1,
      "requires": [
       "py-print"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-math",
      "title": "Räkna med Python",
      "tier": 1,
      "requires": [
       "py-var"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-text",
      "title": "Text och f-strängar",
      "tier": 1,
      "requires": [
       "py-math"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "py2",
    "title": "Beslut & upprepning",
    "lessons": [
     {
      "id": "py-bool",
      "title": "Sant, falskt och jämförelser",
      "tier": 1,
      "requires": [
       "py-text"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "py-if",
      "title": "if, elif och else",
      "tier": 1,
      "requires": [
       "py-bool"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-while",
      "title": "while-loopar",
      "tier": 1,
      "requires": [
       "py-if"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-for",
      "title": "for och range",
      "tier": 1,
      "requires": [
       "py-while"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "py3",
    "title": "Små byggprojekt",
    "lessons": [
     {
      "id": "py-list",
      "title": "Listor",
      "tier": 1,
      "requires": [
       "py-for"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-listloop",
      "title": "Loopa över listor",
      "tier": 2,
      "requires": [
       "py-list"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-strmeth",
      "title": "Textmetoder",
      "tier": 2,
      "requires": [
       "py-listloop"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "py-convert",
      "title": "Omvandla typer",
      "tier": 2,
      "requires": [
       "py-strmeth"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "py4",
    "title": "Logik i flera steg",
    "lessons": [
     {
      "id": "py-logic",
      "title": "Boolesk logik: and, or, not",
      "tier": 2,
      "requires": [
       "py-convert"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-accum",
      "title": "Räkna, summera och hitta största",
      "tier": 4,
      "requires": [
       "py-logic"
      ],
      "exerciseCount": 9,
      "reviewable": true
     },
     {
      "id": "py-index",
      "title": "Index och sökning",
      "tier": 4,
      "requires": [
       "py-accum"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "py-filter",
      "title": "Filtrera listor",
      "tier": 4,
      "requires": [
       "py-index"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "py5",
    "title": "Funktioner & samlingar",
    "lessons": [
     {
      "id": "py-def",
      "title": "Egna funktioner",
      "tier": 3,
      "requires": [
       "py-filter"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-params",
      "title": "Parametrar",
      "tier": 3,
      "requires": [
       "py-def"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-return",
      "title": "return",
      "tier": 3,
      "requires": [
       "py-params"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-dict",
      "title": "Ordböcker och funktioner tillsammans",
      "tier": 3,
      "requires": [
       "py-return"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "py6",
    "title": "Tillämpning & miniprojekt",
    "lessons": [
     {
      "id": "py-validate",
      "title": "Validera och testa gränsfall",
      "tier": 4,
      "requires": [
       "py-dict"
      ],
      "exerciseCount": 9,
      "reviewable": true
     },
     {
      "id": "py-budget",
      "title": "Miniprojekt: en robust budget",
      "tier": 5,
      "requires": [
       "py-validate"
      ],
      "exerciseCount": 6,
      "reviewable": false
     },
     {
      "id": "py-scores",
      "title": "Miniprojekt: poängsammanställning",
      "tier": 5,
      "requires": [
       "py-budget"
      ],
      "exerciseCount": 6,
      "reviewable": false
     }
    ]
   },
   {
    "id": "py7",
    "title": "Fel och undantag",
    "lessons": [
     {
      "id": "py-errors",
      "title": "Läsa felmeddelanden",
      "tier": 3,
      "requires": [
       "py-scores"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-try",
      "title": "Fånga fel med try och except",
      "tier": 3,
      "requires": [
       "py-errors"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-raise",
      "title": "Kasta egna fel med raise",
      "tier": 4,
      "requires": [
       "py-try"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "py-finally",
      "title": "else, finally och flera fel",
      "tier": 4,
      "requires": [
       "py-raise"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "py8",
    "title": "Klasser och objekt",
    "lessons": [
     {
      "id": "py-class",
      "title": "Din första klass",
      "tier": 3,
      "requires": [
       "py-finally"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "py-methods",
      "title": "Metoder",
      "tier": 3,
      "requires": [
       "py-class"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "py-str",
      "title": "Snygga objekt och klassvariabler",
      "tier": 4,
      "requires": [
       "py-methods"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "py-inherit",
      "title": "Arv",
      "tier": 4,
      "requires": [
       "py-str"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "py-bank",
      "title": "Miniprojekt: bankkonto",
      "tier": 5,
      "requires": [
       "py-inherit"
      ],
      "exerciseCount": 3,
      "reviewable": false
     }
    ]
   },
   {
    "id": "py9",
    "title": "Smartare samlingar",
    "lessons": [
     {
      "id": "py-listcomp",
      "title": "Listbyggare",
      "tier": 3,
      "requires": [
       "py-bank"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-sets",
      "title": "Mängder",
      "tier": 3,
      "requires": [
       "py-listcomp"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-sortkey",
      "title": "Sortera med key och lambda",
      "tier": 4,
      "requires": [
       "py-sets"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "py-nested",
      "title": "Data i flera nivåer",
      "tier": 4,
      "requires": [
       "py-sortkey"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "py10",
    "title": "Algoritmer",
    "lessons": [
     {
      "id": "py-count",
      "title": "Räkna och hitta mönster",
      "tier": 4,
      "requires": [
       "py-nested"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-bsearch",
      "title": "Binärsökning",
      "tier": 4,
      "requires": [
       "py-count"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-recursion",
      "title": "Rekursion",
      "tier": 4,
      "requires": [
       "py-bsearch"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-sorting",
      "title": "Skriv en egen sortering",
      "tier": 4,
      "requires": [
       "py-recursion"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "py11",
    "title": "Slutprojekt i Python",
    "lessons": [
     {
      "id": "py-textstats",
      "title": "Projekt: textanalys",
      "tier": 5,
      "requires": [
       "py-sorting"
      ],
      "exerciseCount": 3,
      "reviewable": false
     },
     {
      "id": "py-inventory",
      "title": "Projekt: lagersystem",
      "tier": 5,
      "requires": [
       "py-textstats"
      ],
      "exerciseCount": 3,
      "reviewable": false
     },
     {
      "id": "py-todo",
      "title": "Projekt: att göra-lista med klasser",
      "tier": 5,
      "requires": [
       "py-inventory"
      ],
      "exerciseCount": 3,
      "reviewable": false
     }
    ]
   },
   {
    "id": "py12",
    "title": "Program som pratar med dig",
    "lessons": [
     {
      "id": "py-input",
      "title": "Fråga användaren med input()",
      "tier": 2,
      "requires": [
       "py-todo"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "py-input-numbers",
      "title": "Tal från användaren",
      "tier": 3,
      "requires": [
       "py-input"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "py-random",
      "title": "Slumpen i random",
      "tier": 2,
      "requires": [
       "py-input-numbers"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "py-modules",
      "title": "Moduler och import",
      "tier": 2,
      "requires": [
       "py-random"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "py-menu-loop",
      "title": "Menyer som snurrar",
      "tier": 4,
      "requires": [
       "py-modules"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "py-io-project",
      "title": "Miniprojekt: gissa talet och en budget",
      "tier": 5,
      "requires": [
       "py-menu-loop"
      ],
      "exerciseCount": 4,
      "reviewable": false
     }
    ]
   },
   {
    "id": "py-px",
    "title": "Pixelvärlden",
    "standalone": true,
    "pixel": true,
    "lessons": [
     {
      "id": "py-px-kommandon",
      "title": "Hjälten följer dina rader",
      "tier": 1,
      "pixel": true,
      "level": {
       "map": [
        "#######",
        "#S...G#",
        "#######"
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "py-px-funktioner",
      "title": "Egna funktioner",
      "tier": 2,
      "pixel": true,
      "level": {
       "map": [
        "####",
        "#S.#",
        "#.##",
        "#G##",
        "####"
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [
       "py-px-kommandon"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "py-px-loopar",
      "title": "Gör om med en loop",
      "tier": 2,
      "pixel": true,
      "level": {
       "map": [
        "###########",
        "#S.......G#",
        "###########"
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [
       "py-px-funktioner"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "py-px-villkor",
      "title": "Titta innan du går",
      "tier": 3,
      "pixel": true,
      "level": {
       "map": [
        "#########",
        "#S.g..g.G#",
        "#########"
       ],
       "worlds": [
        [
         "#########",
         "#Sg..g..G#",
         "#########"
        ],
        [
         "#########",
         "#S...gg.G#",
         "#########"
        ]
       ],
       "goals": [
        "goal",
        "items"
       ]
      },
      "requires": [
       "py-px-loopar"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "py-px-while",
      "title": "Gå tills du är framme",
      "tier": 3,
      "pixel": true,
      "level": {
       "map": [
        "######",
        "#S..G#",
        "######"
       ],
       "worlds": [
        [
         "#########",
         "#S......G#",
         "#########"
        ],
        [
         "####",
         "#SG#",
         "####"
        ]
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [
       "py-px-villkor"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "py-px-variabler",
      "title": "Räkna med variabler",
      "tier": 3,
      "pixel": true,
      "level": {
       "map": [
        "#########",
        "#Sggggg.#",
        "#########"
       ],
       "goals": [
        "items",
        {
         "say": "Jag har 5"
        }
       ]
      },
      "requires": [
       "py-px-while"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "py-px-listor",
      "title": "Listor: vägar och ryggsäckar",
      "tier": 3,
      "pixel": true,
      "level": {
       "map": [
        "######",
        "#S.###",
        "##..##",
        "###.G#",
        "######"
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [
       "py-px-variabler"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "py-px-pixelkonst",
      "title": "Loopar i loopar: pixelkonst",
      "tier": 4,
      "pixel": true,
      "level": null,
      "requires": [
       "py-px-listor"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "py-px-turtle",
      "title": "Rita figurer med turtle",
      "tier": 4,
      "pixel": true,
      "level": null,
      "requires": [
       "py-px-pixelkonst"
      ],
      "exerciseCount": 5,
      "reviewable": true
     },
     {
      "id": "py-px-projekt",
      "title": "Slutprojekt i Pixelvärlden",
      "tier": 5,
      "pixel": true,
      "level": {
       "map": [
        "#########",
        "#S..#...#",
        "###.#.#.#",
        "#...#.#.#",
        "#.###.#.#",
        "#.....#G#",
        "#########"
       ],
       "worlds": [
        [
         "#######",
         "#S....#",
         "#####.#",
         "#.....#",
         "#.#####",
         "#....G#",
         "#######"
        ]
       ],
       "goals": [
        "goal"
       ]
      },
      "requires": [
       "py-px-turtle"
      ],
      "exerciseCount": 3,
      "reviewable": false
     }
    ]
   }
  ]
 },
 {
  "id": "web",
  "name": "HTML/CSS",
  "lang": "web",
  "chapters": [
   {
    "id": "web1",
    "title": "Ge sidan innehåll",
    "lessons": [
     {
      "id": "web-headings",
      "title": "Rubriker och stycken",
      "tier": 1,
      "requires": [],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-links",
      "title": "Länkar",
      "tier": 1,
      "requires": [
       "web-headings"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-lists",
      "title": "Listor",
      "tier": 1,
      "requires": [
       "web-links"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-images",
      "title": "Bilder och alt-text",
      "tier": 1,
      "requires": [
       "web-lists"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "web2",
    "title": "Gör sidan till din",
    "lessons": [
     {
      "id": "web-css",
      "title": "Din första CSS",
      "tier": 1,
      "requires": [
       "web-images"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-colors",
      "title": "Färger",
      "tier": 1,
      "requires": [
       "web-css"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-classes",
      "title": "Klasser",
      "tier": 1,
      "requires": [
       "web-colors"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-spacing",
      "title": "Avstånd: margin och padding",
      "tier": 1,
      "requires": [
       "web-classes"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "web3",
    "title": "Bygg en liten profil",
    "lessons": [
     {
      "id": "web-fonts",
      "title": "Typsnitt och textstorlek",
      "tier": 1,
      "requires": [
       "web-spacing"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-borders",
      "title": "Kanter och rundade hörn",
      "tier": 1,
      "requires": [
       "web-fonts"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-box",
      "title": "Boxmodellen",
      "tier": 2,
      "requires": [
       "web-borders"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-profile",
      "title": "Ett profilkort",
      "tier": 2,
      "requires": [
       "web-box"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "web4",
    "title": "Layout som håller",
    "lessons": [
     {
      "id": "web-flex",
      "title": "Flexbox",
      "tier": 2,
      "requires": [
       "web-profile"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-grid",
      "title": "Grid",
      "tier": 4,
      "requires": [
       "web-flex"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "web-responsive",
      "title": "Responsiv design med media queries",
      "tier": 4,
      "requires": [
       "web-grid"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "web-overflow",
      "title": "Felsök för breda layouter",
      "tier": 4,
      "requires": [
       "web-responsive"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "web5",
    "title": "Struktur & användbarhet",
    "lessons": [
     {
      "id": "web-semantic",
      "title": "Semantisk HTML",
      "tier": 3,
      "requires": [
       "web-overflow"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-forms",
      "title": "Formulär och etiketter",
      "tier": 3,
      "requires": [
       "web-semantic"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-focus",
      "title": "Tangentbordsfokus",
      "tier": 3,
      "requires": [
       "web-forms"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-cascade",
      "title": "CSS-kaskaden och specificitet",
      "tier": 3,
      "requires": [
       "web-focus"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "web6",
    "title": "Komponenter & miniprojekt",
    "lessons": [
     {
      "id": "web-components",
      "title": "Återanvändbara komponenter",
      "tier": 4,
      "requires": [
       "web-cascade"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "web-cards",
      "title": "Miniprojekt: responsiva produktkort",
      "tier": 5,
      "requires": [
       "web-components"
      ],
      "exerciseCount": 6,
      "reviewable": false
     },
     {
      "id": "web-form-project",
      "title": "Miniprojekt: ett användbart formulär",
      "tier": 5,
      "requires": [
       "web-cards"
      ],
      "exerciseCount": 6,
      "reviewable": false
     }
    ]
   },
   {
    "id": "web7",
    "title": "Avancerad layout",
    "lessons": [
     {
      "id": "web-flex-adv",
      "title": "Flexbox på djupet",
      "tier": 4,
      "requires": [
       "web-form-project"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-grid-areas",
      "title": "Grid med områden",
      "tier": 4,
      "requires": [
       "web-flex-adv"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-position",
      "title": "Positionering",
      "tier": 4,
      "requires": [
       "web-grid-areas"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-units",
      "title": "Enheter och flytande storlekar",
      "tier": 4,
      "requires": [
       "web-position"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "web8",
    "title": "Formulär och tillgänglighet",
    "lessons": [
     {
      "id": "web-inputs",
      "title": "Inmatningsfält och validering",
      "tier": 3,
      "requires": [
       "web-units"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "web-choices",
      "title": "Val i formulär",
      "tier": 3,
      "requires": [
       "web-inputs"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "web-a11y",
      "title": "Tillgänglighet på riktigt",
      "tier": 4,
      "requires": [
       "web-choices"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "web-tables",
      "title": "Tabeller",
      "tier": 3,
      "requires": [
       "web-a11y"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "web9",
    "title": "Modern CSS",
    "lessons": [
     {
      "id": "web-variables",
      "title": "CSS-variabler och teman",
      "tier": 4,
      "requires": [
       "web-tables"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "web-transitions",
      "title": "Övergångar och animationer",
      "tier": 4,
      "requires": [
       "web-variables"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "web-selectors",
      "title": "Avancerade väljare",
      "tier": 4,
      "requires": [
       "web-transitions"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "web-darkmode",
      "title": "Mörkt läge och användarens inställningar",
      "tier": 4,
      "requires": [
       "web-selectors"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "web10",
    "title": "Slutprojekt i HTML och CSS",
    "lessons": [
     {
      "id": "web-landing",
      "title": "Slutprojekt: landningssida",
      "tier": 5,
      "requires": [
       "web-darkmode"
      ],
      "exerciseCount": 4,
      "reviewable": false
     },
     {
      "id": "web-portfolio",
      "title": "Slutprojekt: portfolio",
      "tier": 5,
      "requires": [
       "web-landing"
      ],
      "exerciseCount": 4,
      "reviewable": false
     },
     {
      "id": "web-signup",
      "title": "Slutprojekt: registreringsformulär",
      "tier": 5,
      "requires": [
       "web-portfolio"
      ],
      "exerciseCount": 4,
      "reviewable": false
     }
    ]
   },
   {
    "id": "web11",
    "title": "Lite JavaScript",
    "lessons": [
     {
      "id": "web-js-script",
      "title": "Ditt första skript",
      "tier": 2,
      "requires": [
       "web-signup"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "web-js-click",
      "title": "Knappar och klick",
      "tier": 2,
      "requires": [
       "web-js-script"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "web-js-input",
      "title": "Läsa från fält",
      "tier": 3,
      "requires": [
       "web-js-click"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "web-js-style",
      "title": "Ändra utseende med klasser",
      "tier": 3,
      "requires": [
       "web-js-input"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "web-js-list",
      "title": "Listor från arrayer",
      "tier": 3,
      "requires": [
       "web-js-style"
      ],
      "exerciseCount": 6,
      "reviewable": true
     },
     {
      "id": "web-js-project",
      "title": "Miniprojekt: lista och tärning",
      "tier": 5,
      "requires": [
       "web-js-list"
      ],
      "exerciseCount": 4,
      "reviewable": false
     }
    ]
   }
  ]
 },
 {
  "id": "git",
  "name": "Git och terminalen",
  "lang": "text",
  "chapters": [
   {
    "id": "git1",
    "title": "Terminalen",
    "lessons": [
     {
      "id": "git-terminal",
      "title": "Vad är en terminal?",
      "tier": 1,
      "requires": [],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "git-cd",
      "title": "Mappar och sökvägar",
      "tier": 2,
      "requires": [
       "git-terminal"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "git-mkdir",
      "title": "Skapa mappar och filer",
      "tier": 2,
      "requires": [
       "git-cd"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "git-run",
      "title": "Köra program och läsa fel",
      "tier": 2,
      "requires": [
       "git-mkdir"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "git-terminal-practice",
      "title": "Övning: från tom mapp till körande program",
      "tier": 4,
      "requires": [
       "git-run"
      ],
      "exerciseCount": 7,
      "reviewable": true
     }
    ]
   },
   {
    "id": "git2",
    "title": "Git på din dator",
    "lessons": [
     {
      "id": "git-why",
      "title": "Varför versionshantering?",
      "tier": 2,
      "requires": [
       "git-terminal-practice"
      ],
      "exerciseCount": 7,
      "reviewable": true
     },
     {
      "id": "git-commit",
      "title": "git add och git commit",
      "tier": 2,
      "requires": [
       "git-why"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "git-log",
      "title": "Historiken: git log och git diff",
      "tier": 2,
      "requires": [
       "git-commit"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "git-ignore",
      "title": ".gitignore och att ångra",
      "tier": 3,
      "requires": [
       "git-log"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "git-mini",
      "title": "Miniprojekt: ett projekt under Git",
      "tier": 5,
      "requires": [
       "git-ignore"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   },
   {
    "id": "git3",
    "title": "Grenar och GitHub",
    "lessons": [
     {
      "id": "git-branch",
      "title": "Grenar",
      "tier": 2,
      "requires": [
       "git-mini"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "git-merge",
      "title": "Slå ihop grenar och lösa konflikter",
      "tier": 3,
      "requires": [
       "git-branch"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "git-github",
      "title": "GitHub: clone, push och pull",
      "tier": 3,
      "requires": [
       "git-merge"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "git-pr",
      "title": "Pull requests och goda vanor",
      "tier": 3,
      "requires": [
       "git-github"
      ],
      "exerciseCount": 8,
      "reviewable": true
     },
     {
      "id": "git-mini2",
      "title": "Miniprojekt: jobba som ett team",
      "tier": 5,
      "requires": [
       "git-pr"
      ],
      "exerciseCount": 6,
      "reviewable": true
     }
    ]
   }
  ]
 }
];
