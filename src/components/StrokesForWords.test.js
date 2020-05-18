import { createListOfStrokes, lookupListOfStrokesAndDicts } from './StrokesForWords';

describe('create list of strokes', () => {
  it('list of strokes and which dictionary they came from', () => {
    let phrase = 'baz';
    let dictionaryOfWordsStrokesAndSourceDictionary = new Map( Object.entries({ "baz": [ ["PWAZ", "personal.json"], ["PWAZ", "code.json"] ] }));
    let listOfStrokesAndDicts = [ ["PWAZ", "personal.json"], ["PWAZ", "code.json"] ];

    expect(createListOfStrokes(phrase, dictionaryOfWordsStrokesAndSourceDictionary)).toEqual(listOfStrokesAndDicts);
  });
});

describe('lookup list of strokes and dicts', () => {
  let globalLookupDictionary = new Map(Object.entries(
    {
      "ago": [
        ["AG", "typey-type.json"]
      ],
      "{~|\"^}": [
        ["KW-GS", "typey-type.json"]
      ],
      "{^~|\"}": [
        ["KR-GS", "typey-type.json"]
      ]
    }));

  it('shows list of strokes and dictionary for word without whitespace', () => {
    let phrase = 'ago';
    let listOfStrokesAndDicts = [ ["AG", "typey-type.json"] ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for word with preceding whitespace', () => {
    let phrase = ' ago';
    let listOfStrokesAndDicts = [ ["AG", "typey-type.json"] ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for closing quote without whitespace', () => {
    let phrase = '"';
    let listOfStrokesAndDicts = [ ["KW-GS", "typey-type.json"] ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });

  it('shows list of strokes and dictionary for closing quote with trailing whitespace', () => {
    let phrase = '" ';
    let listOfStrokesAndDicts = [ ["KR-GS", "typey-type.json"] ];

    expect(lookupListOfStrokesAndDicts(phrase, globalLookupDictionary)).toEqual(listOfStrokesAndDicts);
  });
});
