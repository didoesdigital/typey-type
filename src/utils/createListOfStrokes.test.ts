import createListOfStrokes from "./createListOfStrokes";
import type { LookupDictWithNamespacedDictsAndConfig } from "../types";

describe("create list of strokes", () => {
  it("list of strokes and which dictionary they came from", () => {
    let phrase = "baz";
    // @ts-ignore should start as LookupDictWithNamespacedDicts and finish with config
    let dictionaryOfWordsStrokesAndSourceDictionary: LookupDictWithNamespacedDictsAndConfig =
      new Map(
        Object.entries({
          "baz": [
            ["PWAZ", "user:personal.json"],
            ["PWAZ", "user:code.json"],
          ],
        })
      );

    dictionaryOfWordsStrokesAndSourceDictionary.configuration = [
      "typey:typey-type.json",
      "user:nouns.json",
      "user:personal.json",
    ];

    let listOfStrokesAndDicts = [
      ["PWAZ", "personal.json", "user"],
      ["PWAZ", "code.json", "user"],
    ];

    expect(
      createListOfStrokes(phrase, dictionaryOfWordsStrokesAndSourceDictionary)
    ).toEqual(listOfStrokesAndDicts);
  });
});
