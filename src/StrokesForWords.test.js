import { createListOfStrokes } from './StrokesForWords';

describe('create list of strokes', () => {
  it('list of strokes and which dictionary they came from', () => {
    let phrase = 'baz';
    let dictionaryOfWordsStrokesAndSourceDictionary = {
      "baz": [
        ["PWAZ", "personal.json"],
        ["PWAZ", "code.json"]
      ]
    };
    let listOfStrokesAndDicts = [
      ["PWAZ", "personal.json"],
      ["PWAZ", "code.json"]
    ];

    expect(createListOfStrokes(phrase, dictionaryOfWordsStrokesAndSourceDictionary)).toEqual(listOfStrokesAndDicts);
  });
});
