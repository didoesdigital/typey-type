import { lookUpDictionaryInIndex } from "./lookUpDictionaryInIndex";
import { parseCustomMaterial } from "./parseCustomMaterial";
import Zipper from "./zipper";

import type { DictionaryIndexEntry } from "types";

describe("lookUpDictionaryInIndex", () => {
  let dictionaryIndex: DictionaryIndexEntry[] = [
    {
      "author": "Typey Type",
      "title": "Dictionary",
      "subtitle": "",
      "category": "Typey Type",
      "subcategory": "",
      "tagline":
        "Typey Type’s dictionary is a version of the Plover dictionary with misstrokes removed for the top 10,000 words.",
      "link": "/typey-type/support#typey-type-dictionary",
      "path": "/dictionaries/typey-type/typey-type.json",
    },
    {
      "author": "Plover",
      "title": "Main Aug 16, 2017",
      "subtitle": "",
      "category": "Plover",
      "subcategory": "",
      "tagline": "Plover’s main dictionary from 16 August 2017",
      "link":
        "https://github.com/openstenoproject/plover/blob/5ae5bb98a6776daf5e3aee75cc5b24720e872c7c/plover/assets/main.json",
      "path": "/dictionaries/plover/main-16-aug-2017.json",
    },
    {
      "author": "Di Does Digital",
      "title": "Navigation",
      "subtitle": "",
      "category": "Di Does Digital",
      "subcategory": "",
      "tagline":
        "Di Does Digital’s Mac navigation dictionary lets you switch tabs, windows, and apps, as well as navigate and edit text efficiently. You can move your cursor by letter, word, or line, select while doing so, and also backspace or forward delete by character, word, or line.",
      "link":
        "https://github.com/dimonster/plover-dictionaries#navigation-dictionary",
      "path": "/dictionaries/didoesdigital/navigation.json",
    },
    // NOTE: Typey Type used to include lesson-specific dictionaries in the Dictionary index as downloadable static JSON files, but now they are generated on demand on lesson pages
    // {
    //   "author": "Typey Type",
    //   "title": "One-syllable words with simple keys",
    //   "subtitle": "",
    //   "category": "Fundamentals",
    //   "subcategory": "",
    //   "path":
    //     "/lessons/fundamentals/one-syllable-words-with-simple-keys/one-syllable-words-with-simple-keys.json",
    // },
  ];

  describe("is in index", () => {
    it("should return dictionary metadata", () => {
      let path = import.meta.env.VITE_PUBLIC_URL + "/dictionaries/plover/main-16-aug-2017/";
      expect(lookUpDictionaryInIndex(path, dictionaryIndex)).toEqual({
        author: "Plover",
        title: "Main Aug 16, 2017",
        subtitle: "",
        category: "Plover",
        subcategory: "",
        tagline: "Plover’s main dictionary from 16 August 2017",
        link: "https://github.com/openstenoproject/plover/blob/5ae5bb98a6776daf5e3aee75cc5b24720e872c7c/plover/assets/main.json",
        path: "/dictionaries/plover/main-16-aug-2017.json",
      });
    });
  });

  describe("is not in index", () => {
    it("should return dummy metadata", () => {
      let path = import.meta.env.VITE_PUBLIC_URL + "/dictionaries/bad-path/bad-dict/";
      expect(lookUpDictionaryInIndex(path, dictionaryIndex)).toEqual({
        author: "Typey Type",
        title: "Missing dictionary details",
        subtitle: "",
        category: "Typey Type",
        subcategory: "",
        tagline: "Loading dictionary details…",
        link: "/typey-type/support#typey-type-dictionary",
        path: "/dictionaries/typey-type/top-10.json",
      });
    });
  });

  describe("has a line with no tabs", () => {
    it("should return a lesson without that line", () => {
      let customMaterial = `testWithSpace TEFT
testWithTab	TEFT
`;
      expect(parseCustomMaterial(customMaterial)).toEqual([
        {
          sourceMaterial: [{ phrase: "testWithTab", stroke: "TEFT" }],
          presentedMaterial: [{ phrase: "testWithTab", stroke: "TEFT" }],
          settings: { ignoredChars: "" },
          title: "Custom",
          subtitle: "",
          newPresentedMaterial: new Zipper([
            { phrase: "testWithTab", stroke: "TEFT" },
          ]),
          path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
        },
        "success",
        [],
      ]);
    });
  });

  describe("has a line with multiple tabs", () => {
    it("should return a lesson with the first stroke provided", () => {
      let customMaterial = `testWithTab	TEFT	TEFTD`;
      expect(parseCustomMaterial(customMaterial)).toEqual([
        {
          sourceMaterial: [{ phrase: "testWithTab", stroke: "TEFT" }],
          presentedMaterial: [{ phrase: "testWithTab", stroke: "TEFT" }],
          settings: { ignoredChars: "" },
          title: "Custom",
          subtitle: "",
          newPresentedMaterial: new Zipper([
            { phrase: "testWithTab", stroke: "TEFT" },
          ]),
          path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
        },
        "success",
        [],
      ]);
    });
  });
});
