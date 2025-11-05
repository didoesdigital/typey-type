import createListOfStrokes from "./createListOfStrokes";
import type { LookupDictWithNamespacedDictsAndConfig } from "../types";

describe("create list of strokes", () => {
  it("list of strokes and which dictionary they came from", () => {
    const phrase = "baz";
    // Note: the type should start as LookupDictWithNamespacedDicts and finish with config
    // @ts-expect-error TS(2322) FIXME: Type 'Map<string, [string, string][]>' is not assi... Remove this comment to see the full error message
    const dictionaryOfWordsStrokesAndSourceDictionary: LookupDictWithNamespacedDictsAndConfig =
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

    const listOfStrokesAndDicts = [
      ["PWAZ", "personal.json", "user"],
      ["PWAZ", "code.json", "user"],
    ];

    expect(
      createListOfStrokes(phrase, dictionaryOfWordsStrokesAndSourceDictionary)
    ).toEqual(listOfStrokesAndDicts);
  });
});
