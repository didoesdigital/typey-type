import { createListOfStrokes, lookupListOfStrokesAndDicts } from './StrokesForWords';

describe('create list of strokes', () => {
  it('list of strokes and which dictionary they came from', () => {
    let phrase = 'baz';
    let dictionaryOfWordsStrokesAndSourceDictionary = new Map( Object.entries({ "baz": [ ["PWAZ", "user:personal.json"], ["PWAZ", "user:code.json"] ] }));
    let listOfStrokesAndDicts = [ ["PWAZ", "personal.json", "user"], ["PWAZ", "code.json", "user"] ];

    expect(createListOfStrokes(phrase, dictionaryOfWordsStrokesAndSourceDictionary)).toEqual(listOfStrokesAndDicts);
  });
});

describe('lookup list of strokes and dicts with punctuation with carry capitalisation', () => {
  let globalLookupDictionary = new Map(Object.entries(
    {
      "ago": [
        ["AG", "typey:typey-type.json"]
      ],
      "{~|\"^}": [
        ["KW-GS", "typey:typey-type.json"]
      ],
      "{^~|\"}": [
        ["KR-GS", "typey:typey-type.json"]
      ]
    }));

  it('shows list of strokes and dictionary for word without whitespace', () => {
    let phrase = 'ago';
    let listOfStrokesAndDicts = [ ["AG", "typey-type.json", "typey"] ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for word with preceding whitespace', () => {
    let phrase = ' ago';
    let listOfStrokesAndDicts = [ ["AG", "typey-type.json", "typey"] ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for closing quote without whitespace', () => {
    let phrase = '"';
    let listOfStrokesAndDicts = [ ["KW-GS", "typey-type.json", "typey"] ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for closing quote with trailing whitespace', () => {
    let phrase = '" ';
    let listOfStrokesAndDicts = [ ["KR-GS", "typey-type.json", "typey"] ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });
});

describe('lookup list of strokes and dicts with fingerspelling and single-letter words', () => {
  let globalLookupDictionary = new Map(Object.entries(
    {
      "{a^}": [
        ["AEU", "user:personal.json"],
        ["A", "typey:typey-type.json"]
      ],
      "a": [
        ["A", "user:personal.json"],
        ["AEU", "typey:typey-type.json"]
      ],
      "{>}{&a}": [
        ["A*", "user:personal.json"],
        ["A*", "typey:typey-type.json"]
      ],
      "{&A}": [
        ["A*P", "user:personal.json"],
        ["A*P", "typey:typey-type.json"]
      ],
      "{>}{&x}": [
        ["BGS", "user:personal.json"],
        ["KP-FPLT", "user:personal.json"],
        ["KP*", "typey:typey-type.json"]
      ],
      "{&X}": [
        ["*BGS", "user:personal.json"],
        ["KP*FPLT", "user:personal.json"],
        ["XP*P", "typey:typey-type.json"]
      ],
      "I": [
        ["EU", "user:personal.json"],
        ["EU", "typey:typey-type.json"]
      ],
      "{>}{&i}": [
        ["EUFPLT", "user:personal.json"],
        ["EUP", "typey:typey-type.json"]
      ],
      "{&I}": [
        ["*EUFPLT", "user:personal.json"],
        ["*EUP", "typey:typey-type.json"]
      ],
      "{>}{&z}": [
        ["SKPWR-FPLT", "user:personal.json"],
        ["SKPWR*", "typey:typey-type.json"]
      ],
      "{&Z}": [
        ["SKPWR*FPLT", "user:personal.json"],
        ["SKPWR*P", "typey:typey-type.json"]
      ],
    }
  ));

  it('shows list of strokes and dictionary for fingerspelled letter “a” without whitespace', () => {
    let phrase = 'a';
    let listOfStrokesAndDicts = [
      ["A*", "personal.json", "user"],
      ["A*", "typey-type.json", "typey"]
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for word “ a” with whitespace', () => {
    let phrase = ' a';
    let listOfStrokesAndDicts = [
      ["A", "personal.json", "user"],
      ["AEU", "typey-type.json", "typey"]
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for word “a ” with trailing whitespace', () => {
    let phrase = 'a ';
    let listOfStrokesAndDicts = [
      ["A", "personal.json", "user"],
      ["AEU", "typey-type.json", "typey"]
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for fingerspelled letter “A” without whitespace', () => {
    let phrase = 'A';
    let listOfStrokesAndDicts = [
      ["A*P", "personal.json", "user"],
      ["A*P", "typey-type.json", "typey"]
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for word “ A” with whitespace', () => {
    let phrase = ' A';
    let listOfStrokesAndDicts = [];
    // TODO: make this possible:
    // let listOfStrokesAndDicts = [
    //   ["KPA/A", "personal.json", "user"],
    //   ["KPA/AEU", "typey-type.json", "typey"]
    // ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for fingerspelled letter “i” without whitespace', () => {
    let phrase = 'i';
    let listOfStrokesAndDicts = [
      ["EUFPLT", "personal.json", "user"],
      ["EUP", "typey-type.json", "typey"]
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for word “ i” with whitespace', () => {
    let phrase = ' i';
    let listOfStrokesAndDicts = [];
    // TODO: make this possible:
    // let listOfStrokesAndDicts = [
    //   ["*EU", "personal.json", "user"],
    //   ["*EU", "typey-type.json", "typey"]
    // ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for fingerspelled letter “I” without whitespace', () => {
    let phrase = 'I';
    let listOfStrokesAndDicts = [
      ["*EUFPLT", "personal.json", "user"],
      ["*EUP", "typey-type.json", "typey"]
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for word “ I” with whitespace', () => {
    let phrase = ' I';
    let listOfStrokesAndDicts = [
      ["EU", "personal.json", "user"],
      ["EU", "typey-type.json", "typey"]
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for fingerspelled letter “x” without whitespace', () => {
    let phrase = 'x';
    let listOfStrokesAndDicts = [
      ["BGS", "personal.json", "user"],
      ["KP-FPLT", "personal.json", "user"],
      ["KP*", "typey-type.json", "typey"]
    ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for word “ x” with whitespace', () => {
    let phrase = ' x';
    let listOfStrokesAndDicts = [];
    // TODO: make this possible:
    // let listOfStrokesAndDicts = [
    //   [KP-FPLT", "personal.json", "user"],
    //   [KP", "typey-type.json", "typey"]
    // ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });
});
