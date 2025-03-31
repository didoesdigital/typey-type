import rankOutlines from "./rankOutlines";
import createGlobalLookupDictionary from "../createGlobalLookupDictionary";
import { AffixList } from "../../affixList";
import {
  testTypeyTypeDict,
  testTypeyTypeExtras,
  personalDictionaries,
} from "../transformingDictionaries.fixtures";
import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../../constant/latestTypeyTypeFullDictName";

import type {
  AffixObject,
  StrokeAndDictionaryAndNamespace,
} from "../../../types";

const testTypeyTypeFull = { ...testTypeyTypeDict, ...testTypeyTypeExtras };

const globalLookupDictionary = createGlobalLookupDictionary(
  personalDictionaries,
  [[testTypeyTypeFull, LATEST_TYPEY_TYPE_FULL_DICT_NAME]]
);

let sharedAffixes = AffixList.getSharedInstance();

describe("rankOutlines", () => {
  beforeEach(() => {
    AffixList.setSharedInstance(new AffixList(globalLookupDictionary));
    sharedAffixes = AffixList.getSharedInstance();
  });

  afterEach(() => {
    AffixList.setSharedInstance({ prefixes: [], suffixes: [] });
  });

  describe("sorts the many outlines for quadruplicate", () => {
    it("returns sorted lconst misstrokesJSON = {};ist of outlines", () => {
      const misstrokesJSON = {};
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["KWAD/RUP/KAT", "typey-type.json", "typey"],
          ["KWA/TKRAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOU/PHREU/KAT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOUP/HREU/KAT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOUP/KAT", "typey-type-full.json", "typey"],
          ["KWA/TKRUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWA/TKRUP/KAT", "typey-type-full.json", "typey"],
          ["KWAD/RAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAD/RAOU/PHREU/KAT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUD/KAT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUP/HREU/KAT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUP/HREUBGT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUP/KAT", "typey-type-full.json", "typey"],
          ["KWAD/RUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAD/RUP/KAT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOU/PHREU/KAT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOUP/HREU/KAT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOUP/KAT", "typey-type-full.json", "typey"],
          ["KWAU/TKRUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAU/TKRUP/KAT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOU/PHREU/KAT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOUP/HREU/KAT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOUP/KAT", "typey-type-full.json", "typey"],
          ["KWAUD/RUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAUD/RUP/KAT", "typey-type-full.json", "typey"],
        ];
      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "quadruplicate",
          sharedAffixes
        )
      ).toEqual(
        // As we presently keep original order of a and b when penalties match but one uses a
        // suffix outline and the other is slightly shorter, we get a ragged result:
        [
          ["KWAD/RUP/KAT", "typey-type.json", "typey"],
          ["KWAD/RUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAD/RUP/KAT", "typey-type-full.json", "typey"],
          ["KWA/TKRUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWA/TKRUP/KAT", "typey-type-full.json", "typey"],
          ["KWAUD/RUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAUD/RUP/KAT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUD/KAT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUP/KAT", "typey-type-full.json", "typey"],
          ["KWAU/TKRUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAU/TKRUP/KAT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOUP/KAT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOUP/KAT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOUP/KAEUT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOUP/KAT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUP/HREUBGT", "typey-type-full.json", "typey"],
          ["KWAD/RAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAD/RAOU/PHREU/KAT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAD/RAOUP/HREU/KAT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOU/PHREU/KAT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWA/TKRAOUP/HREU/KAT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOU/PHREU/KAT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAUD/RAOUP/HREU/KAT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOU/PHREU/KAT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
          ["KWAU/TKRAOUP/HREU/KAT", "typey-type-full.json", "typey"],
        ]
        // If we sorted aesthetically by length in that scenario, we'd get this:
        // [
        //   ["KWAD/RUP/KAT", "typey-type.json", "typey"],
        //   ["KWAD/RUP/KAT", "typey-type-full.json", "typey"],
        //   ["KWA/TKRUP/KAT", "typey-type-full.json", "typey"],
        //   ["KWAUD/RUP/KAT", "typey-type-full.json", "typey"],
        //   ["KWAD/RAOUD/KAT", "typey-type-full.json", "typey"],
        //   ["KWAD/RAOUP/KAT", "typey-type-full.json", "typey"],
        //   ["KWAD/RUP/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAU/TKRUP/KAT", "typey-type-full.json", "typey"],
        //   ["KWA/TKRAOUP/KAT", "typey-type-full.json", "typey"],
        //   ["KWA/TKRUP/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAUD/RAOUP/KAT", "typey-type-full.json", "typey"],
        //   ["KWAUD/RUP/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAD/RAOUP/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAU/TKRAOUP/KAT", "typey-type-full.json", "typey"],
        //   ["KWAU/TKRUP/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWA/TKRAOUP/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAUD/RAOUP/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAD/RAOUP/HREUBGT", "typey-type-full.json", "typey"],
        //   ["KWAU/TKRAOUP/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAD/RAOU/PHREU/KAT", "typey-type-full.json", "typey"],
        //   ["KWAD/RAOUP/HREU/KAT", "typey-type-full.json", "typey"],
        //   ["KWA/TKRAOU/PHREU/KAT", "typey-type-full.json", "typey"],
        //   ["KWA/TKRAOUP/HREU/KAT", "typey-type-full.json", "typey"],
        //   ["KWAUD/RAOU/PHREU/KAT", "typey-type-full.json", "typey"],
        //   ["KWAUD/RAOUP/HREU/KAT", "typey-type-full.json", "typey"],
        //   ["KWAD/RAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAD/RAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAU/TKRAOU/PHREU/KAT", "typey-type-full.json", "typey"],
        //   ["KWAU/TKRAOUP/HREU/KAT", "typey-type-full.json", "typey"],
        //   ["KWA/TKRAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWA/TKRAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAUD/RAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAUD/RAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAU/TKRAOU/PHREU/KAEUT", "typey-type-full.json", "typey"],
        //   ["KWAU/TKRAOUP/HREU/KAEUT", "typey-type-full.json", "typey"],
        // ]
      );
    });
  });

  describe("divide signs", () => {
    it("returns shorter divide sign brief for ÷", () => {
      const strokesAndSourceDicts: [string, string, string][] = [
        ["TKWAO*EUD", "symbols-briefs.json", "typey"],
        ["TKW-D", "dict.json", "typey"],
      ];
      const misstrokesJSON = {};
      const translation = "÷";
      const affixes = { suffixes: [], prefixes: [] };

      expect(
        rankOutlines(
          strokesAndSourceDicts,
          misstrokesJSON,
          translation,
          affixes
        )
      ).toEqual([
        ["TKW-D", "dict.json", "typey"],
        ["TKWAO*EUD", "symbols-briefs.json", "typey"],
      ]);
    });

    it("returns shorter divide sign brief for unicode escape sequence", () => {
      const strokesAndSourceDicts: [string, string, string][] = [
        ["TKWAO*EUD", "symbols-briefs.json", "user"],
        ["TKW-D", "symbols.json", "user"],
      ];
      const misstrokesJSON = {};
      const translation = "\u00f7";
      const affixes = { suffixes: [], prefixes: [] };

      expect(
        rankOutlines(
          strokesAndSourceDicts,
          misstrokesJSON,
          translation,
          affixes
        )
      ).toEqual([
        ["TKW-D", "symbols.json", "user"],
        ["TKWAO*EUD", "symbols-briefs.json", "user"],
      ]);
    });
  });

  it("returns A user entry before B non-user entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO", "typey-type.json", "typey"],
      ["O", "typey-type.json", "user"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["O", "typey-type.json", "user"],
      ["TO", "typey-type.json", "typey"],
    ]);
  });

  it("returns B user entry before A non-user entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["O", "typey-type.json", "user"],
      ["TO", "typey-type.json", "typey"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["O", "typey-type.json", "user"],
      ["TO", "typey-type.json", "typey"],
    ]);
  });

  it("returns A plover entry after B non-plover entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO", "typey-type-full.json", "typey"],
      ["O", "typey-type.json", "user"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["O", "typey-type.json", "user"],
      ["TO", "typey-type-full.json", "typey"],
    ]);
  });

  it("returns B plover entry after A non-plover entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO", "typey-type.json", "user"],
      ["O", "typey-type-full.json", "typey"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "typey-type.json", "user"],
      ["O", "typey-type-full.json", "typey"],
    ]);
  });

  it("returns A Gutenberg dict entry before B", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO", "top-10000-project-gutenberg-words.json", "user"],
      ["O", "typey-type.json", "user"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "top-10000-project-gutenberg-words.json", "user"],
      ["O", "typey-type.json", "user"],
    ]);
  });

  it("returns B Gutenberg dict entry before A", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["O", "typey-type.json", "user"],
      ["TO", "top-10000-project-gutenberg-words.json", "user"],
    ];
    const misstrokesJSON = {};
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "top-10000-project-gutenberg-words.json", "user"],
      ["O", "typey-type.json", "user"],
    ]);
  });

  it("returns A misstroke entry after B non-misstroke entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["O", "typey-type-full.json", "typey"],
      ["TO", "typey-type-full.json", "typey"],
    ];
    const misstrokesJSON = { O: "to" };
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "typey-type-full.json", "typey"],
      ["O", "typey-type-full.json", "typey"],
    ]);
  });

  it("returns B misstroke entry after A non-misstroke entry", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO", "typey-type-full.json", "typey"],
      ["O", "typey-type-full.json", "typey"],
    ];
    const misstrokesJSON = { O: "to" };
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "typey-type-full.json", "typey"],
      ["O", "typey-type-full.json", "typey"],
    ]);
  });

  it("returns a ranked list of strokes and their source dictionary names", () => {
    const strokesAndSourceDicts: [string, string, string][] = [
      ["TO/TK-LS", "typey-type.json", "typey"],
      ["TO", "typey-type.json", "typey"],
    ];
    const misstrokesJSON = { TEF: "test", O: "to" };
    const translation = "to";
    const affixes = { suffixes: [], prefixes: [] };

    expect(
      rankOutlines(strokesAndSourceDicts, misstrokesJSON, translation, affixes)
    ).toEqual([
      ["TO", "typey-type.json", "typey"],
      ["TO/TK-LS", "typey-type.json", "typey"],
    ]);
  });

  // The tests that follow from here were moved over from transformingDictionaries.test.ts:

  describe("with duplicate outlines across dictionaries", () => {
    it('returns sorted list of outlines for "GitHub", preserving dictionary order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["TKPWEUT/HUB", "code.json", "typey"],
          ["TKPWEUT/HUB", "typey-type.json", "typey"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "GitHub",
          sharedAffixes
        )
      ).toEqual([
        ["TKPWEUT/HUB", "code.json", "typey"],
        ["TKPWEUT/HUB", "typey-type.json", "typey"],
      ]);
    });
  });

  describe("with duplicate outlines across dictionaries", () => {
    it('returns unsorted list of outlines for "GitHub", preserving dictionary order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["TKPWEUT/HUB", "typey-type.json", "typey"],
          ["TKPWEUT/HUB", "code.json", "typey"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "GitHub",
          sharedAffixes
        )
      ).toEqual([
        ["TKPWEUT/HUB", "typey-type.json", "typey"],
        ["TKPWEUT/HUB", "code.json", "typey"],
      ]);
    });
  });

  describe("with different outlines across dictionaries", () => {
    it("returns shortest stroke", () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["TKPWEUT/HUB", "typey-type.json", "typey"],
          ["TKWEUT/HUB", "code.json", "typey"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "GitHub",
          sharedAffixes
        )
      ).toEqual([
        ["TKWEUT/HUB", "code.json", "typey"],
        ["TKPWEUT/HUB", "typey-type.json", "typey"],
      ]);
    });
  });

  describe("with different outlines across dictionaries", () => {
    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, already in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["KPER/SAOEUZ/-Z", "plover.json", "plover"],
          ["KPERZ/-S", "briefs.json", "typey"],
          ["KPERZ/-T", "briefs.json", "typey"],
          ["KPERZ/-Z", "briefs.json", "typey"],
          ["ERBGS/SAOEUSZ", "plover.json", "plover"],
          ["KPERSZ", "typey-type.json", "typey"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "exercises",
          sharedAffixes
        )
      ).toEqual([
        ["KPERSZ", "typey-type.json", "typey"],
        ["KPERZ/-S", "briefs.json", "typey"],
        ["KPERZ/-T", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["ERBGS/SAOEUSZ", "plover.json", "plover"],
        ["KPER/SAOEUZ/-Z", "plover.json", "plover"],
      ]);
    });

    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, not in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["KPER/SAOEUZ/-Z", "plover.json", "plover"],
          ["KPERZ/-Z", "briefs.json", "typey"],
          ["KPERZ/-S", "briefs.json", "typey"],
          ["KPERZ/-T", "briefs.json", "typey"],
          ["ERBGS/SAOEUSZ", "plover.json", "plover"],
          ["KPERSZ", "typey-type.json", "typey"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "exercises",
          sharedAffixes
        )
      ).toEqual([
        ["KPERSZ", "typey-type.json", "typey"],
        ["KPERZ/-S", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-T", "briefs.json", "typey"],
        ["ERBGS/SAOEUSZ", "plover.json", "plover"],
        ["KPER/SAOEUZ/-Z", "plover.json", "plover"],
      ]);
    });

    // Note: this test will fail with node v10
    it('returns sorted list of outlines for "exercises", prioritising S endings over Z, not in order, with more than 10 elements', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["KPER/SAOEUZ/-Z", "plover.json", "plover"],
          ["KPERZ/-Z", "briefs.json", "typey"],
          ["KPERZ/-Z", "briefs.json", "typey"],
          ["KPERZ/-Z", "briefs.json", "typey"],
          ["KPERZ/-Z", "briefs.json", "typey"],
          ["KPERZ/-Z", "briefs.json", "typey"],
          ["KPERZ/-Z", "briefs.json", "typey"],
          ["KPERZ/-S", "briefs.json", "typey"],
          ["KPERZ/-T", "briefs.json", "typey"],
          ["ERBGS/SAOEUSZ", "plover.json", "plover"],
          ["KPERSZ", "typey-type.json", "typey"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "exercises",
          sharedAffixes
        )
      ).toEqual([
        ["KPERSZ", "typey-type.json", "typey"],
        ["KPERZ/-S", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-Z", "briefs.json", "typey"],
        ["KPERZ/-T", "briefs.json", "typey"],
        ["ERBGS/SAOEUSZ", "plover.json", "plover"],
        ["KPER/SAOEUZ/-Z", "plover.json", "plover"],
      ]);
    });

    it('returns sorted list of outlines for "slept", prioritising T endings over D, already in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["TEFT/SHREPT", "plover.json", "plover"],
          ["TEFT/SHREPD", "plover.json", "plover"],
          ["TEFT/SHREPT", "plover.json", "plover"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "slept",
          sharedAffixes
        )
      ).toEqual([
        ["TEFT/SHREPT", "plover.json", "plover"],
        ["TEFT/SHREPT", "plover.json", "plover"],
        ["TEFT/SHREPD", "plover.json", "plover"],
      ]);
    });

    it('returns sorted list of outlines for "intermediate", prioritising T endings over D, not in order', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["EUPBT/PHAOED", "plover.json", "plover"],
          ["EUPBT/PHAOET", "plover.json", "plover"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "intermediate",
          sharedAffixes
        )
      ).toEqual([
        ["EUPBT/PHAOET", "plover.json", "plover"],
        ["EUPBT/PHAOED", "plover.json", "plover"],
      ]);
    });

    it('returns sorted list of outlines for "credit card", prioritising T endings over D, except when the word ends in "d"', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["KRED/EUT/KART", "plover.json", "plover"],
          ["KRED/EUT/KARD", "plover.json", "plover"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "credit card",
          sharedAffixes
        )
      ).toEqual([
        ["KRED/EUT/KARD", "plover.json", "plover"],
        ["KRED/EUT/KART", "plover.json", "plover"],
      ]);
    });
  });

  describe("with different outlines including misstrokes across dictionaries", () => {
    // TODO: consider how another namespace might fit in here instead of Plover, before Typey Type
    xit('returns sorted list of outlines for "and", prioritising user, typey, plover namespaces, and by length', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["-PBD", "plover.json", "plover"],
          ["SP", "plover.json", "plover"],
          ["SKP", "plover.json", "plover"],
          ["APBD", "plover.json", "plover"],
          ["APBD", "dict.json", "typey"],
          ["SKP", "dict.json", "typey"],
          ["SKP", "dict.json", "user"],
          ["SK", "briefs.json", "user"],
        ];
      const misstrokesJSON = {
        "-PBD": "and",
        "-PBDZ": "and",
        "57BD": "and",
        "A/APBD": "and",
        "ABD": "and",
        "APBD/-DZ": "and",
        "APBDZ": "and",
        "APBGD": "and",
        "APBLD": "and",
        "APBLDZ": "and",
        "APBTD": "and",
        "APD": "and",
        "SKP*": "and",
        "SKPH": "and",
        "SKPW": "and",
        "STK": "and",
        "STKP": "and",
      };

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "and",
          sharedAffixes
        )
      ).toEqual([
        // This is the order when prioritising phrasing brief starters:
        // ["SKP", "dict.json", "user"],
        // ["SK", "briefs.json", "user"],
        // ["SKP", "dict.json", "typey"],
        // ["APBD", "dict.json", "typey"],
        // ["SKP", "plover.json", "plover"],
        // ["SP", "plover.json", "plover"],
        // ["APBD", "plover.json", "plover"],
        // ["-PBD", "plover.json", "plover"],
        // This is the order when NOT prioritising phrasing brief starters:
        ["SK", "briefs.json", "user"],
        ["SKP", "dict.json", "user"],
        ["SKP", "dict.json", "typey"],
        ["APBD", "dict.json", "typey"],
        ["SP", "plover.json", "plover"],
        ["SKP", "plover.json", "plover"],
        ["APBD", "plover.json", "plover"],
        ["-PBD", "plover.json", "plover"],
      ]);
    });
  });

  describe("with different outlines including misstrokes across dictionaries", () => {
    // TODO: consider how another namespace might fit in here instead of Plover, before Typey Type
    xit('returns sorted list of outlines for "cite", prioritising user, typey, plover namespaces, and good strokes over misstrokes of equal length', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["SKRAO*EUT", "plover.json", "plover"],
          ["KRAOEUR", "plover.json", "plover"],
          ["KRAOEUT", "plover.json", "plover"],
          ["SKRAO*EUT", "dict.json", "typey"],
          ["KRAOEUR", "dict.json", "typey"],
          ["KRAOEUT", "dict.json", "typey"],
          ["SAO*EUT", "briefs.json", "user"],
          ["SKRAOEUT", "briefs.json", "user"],
        ];
      const misstrokesJSON = {
        "KRAOEUR": "cite",
      };

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "cite",
          sharedAffixes
        )
      ).toEqual([
        ["SAO*EUT", "briefs.json", "user"],
        ["SKRAOEUT", "briefs.json", "user"],
        ["KRAOEUT", "dict.json", "typey"],
        ["SKRAO*EUT", "dict.json", "typey"],
        ["KRAOEUR", "dict.json", "typey"],
        ["KRAOEUT", "plover.json", "plover"],
        ["SKRAO*EUT", "plover.json", "plover"],
        ["KRAOEUR", "plover.json", "plover"],

        // if S… entries were in misstrokes.json
        // ["SAO*EUT", "briefs.json", "user"],
        // ["SKRAOEUT", "briefs.json", "user"],
        // ["KRAOEUT", "dict.json", "typey"],
        // ["SKRAO*EUT", "dict.json", "typey"],
        // ["KRAOEUR", "dict.json", "typey"],
        // ["KRAOEUT", "plover.json", "plover"],
        // ["KRAOEUR", "plover.json", "plover"],
        // ["SKRAO*EUT", "plover.json", "plover"],
      ]);
    });
  });

  describe("with different outlines including misstrokes across dictionaries", () => {
    it('returns sorted list of outlines for "quiz", prioritising good strokes over misstrokes that are shorter', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["KWUZ", "plover.json", "plover"],
          ["KWEUZ", "plover.json", "plover"],
        ];
      const misstrokesJSON = {
        "KWUZ": "quiz",
      };

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "quiz",
          sharedAffixes
        )
      ).toEqual([
        ["KWEUZ", "plover.json", "plover"],
        ["KWUZ", "plover.json", "plover"],
      ]);
    });
  });

  describe("with different outlines including misstrokes across dictionaries", () => {
    // TODO: consider how another namespace might fit in here instead of Plover, before Typey Type
    xit('returns sorted list of outlines for "he", prioritising user, typey, plover namespaces, and good strokes over misstrokes that are shorter', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["E", "magnum.json", "user"],
          ["HE", "plover.json", "plover"],
          ["E", "plover.json", "plover"],
          ["HE", "dict.json", "typey"],
        ];
      const misstrokesJSON = {
        "E": "he",
      };

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "he",
          sharedAffixes
        )
      ).toEqual([
        ["E", "magnum.json", "user"],
        ["HE", "dict.json", "typey"],
        ["HE", "plover.json", "plover"],
        ["E", "plover.json", "plover"],
      ]);
    });
  });

  // T-FPB: plover.json
  // TEFL: plover.json

  describe("with outlines with and without dashes", () => {
    it('returns sorted list of outlines for "test", including dashes', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["T-FPB", "plover.json", "plover"],
          ["TEFL", "plover.json", "plover"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "test",
          sharedAffixes
        )
      ).toEqual([
        ["TEFL", "plover.json", "plover"],
        ["T-FPB", "plover.json", "plover"],
      ]);
    });
  });

  describe("with outlines with and without stars", () => {
    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["T*EFT", "user.json", "user"],
          ["TAEFT", "user.json", "user"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "test",
          sharedAffixes
        )
      ).toEqual([
        ["TAEFT", "user.json", "user"],
        ["T*EFT", "user.json", "user"],
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["T*EFT/T*EFT", "user.json", "user"],
          ["TAEFT/TAEFTS", "user.json", "user"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "test",
          sharedAffixes
        )
      ).toEqual([
        ["TAEFT/TAEFTS", "user.json", "user"],
        ["T*EFT/T*EFT", "user.json", "user"],
      ]);
    });

    it('returns sorted list of outlines for "test", penalising stars', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["T*EFT/T*EFT", "user.json", "user"],
          ["TAEFTS/TAEFTS", "user.json", "user"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "test",
          sharedAffixes
        )
      ).toEqual([
        ["T*EFT/T*EFT", "user.json", "user"],
        ["TAEFTS/TAEFTS", "user.json", "user"],
      ]);
    });
  });

  describe("with outlines with and without slashes", () => {
    it('returns sorted list of outlines for "grasshopper", penalising slashes', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["TKPWHRFRPBLG", "user.json", "user"],
          ["TKPWHR*FRPBLG", "user.json", "user"],
          ["TKPWRASZ/HOP", "user.json", "user"],
          ["TKPWRASZ/HOP/ER", "user.json", "user"],
          ["TKPWRASZ/HORP", "user.json", "user"],
          ["TKPWRASZ/HOP/*ER", "user.json", "user"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "grasshopper",
          sharedAffixes
        )
      ).toEqual([
        ["TKPWHRFRPBLG", "user.json", "user"],
        ["TKPWHR*FRPBLG", "user.json", "user"],
        ["TKPWRASZ/HOP", "user.json", "user"],
        ["TKPWRASZ/HORP", "user.json", "user"],
        ["TKPWRASZ/HOP/ER", "user.json", "user"],
        ["TKPWRASZ/HOP/*ER", "user.json", "user"],
      ]);
    });
  });

  describe("with prefix and suffix strokes", () => {
    it('returns sorted list of outlines for "upstarted", penalising briefs without affix strokes, for default dicts', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["UP/START/-D", "plover.json", "plover"],
          ["UP/STARTD", "plover.json", "plover"],
          ["AUP/START/*D", "plover.json", "plover"],
          ["AUP/START/-D", "plover.json", "plover"],
          ["AUP/STARTD", "plover.json", "plover"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "upstarted",
          sharedAffixes
        )
      ).toEqual([
        ["AUP/STARTD", "plover.json", "plover"],
        ["UP/STARTD", "plover.json", "plover"],
        ["UP/START/-D", "plover.json", "plover"],
        ["AUP/START/-D", "plover.json", "plover"],
        ["AUP/START/*D", "plover.json", "plover"],
      ]);
    });

    it('returns sorted list of outlines for "upstarted", penalising briefs without personal affix stroke, with personal dicts', () => {
      let sharedAffixes: AffixObject = {
        suffixes: [],
        prefixes: [
          ["UP/", "up"], // from user dictionary… AffixList chooses the first affix in first inserted dictionary
        ],
      };

      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["UP/START/-D", "user.json", "user"],
          ["UP/STARTD", "user.json", "user"],
          ["AUP/START/-D", "user.json", "user"],
          ["AUP/START/*D", "typey.json", "typey"],
          ["AUP/START/-D", "typey.json", "typey"],
          ["AUP/STARTD", "typey.json", "typey"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "upstarted",
          sharedAffixes
        )
      ).toEqual([
        ["UP/STARTD", "user.json", "user"],
        ["UP/START/-D", "user.json", "user"],
        ["AUP/START/-D", "user.json", "user"],
        ["AUP/STARTD", "typey.json", "typey"],
        ["AUP/START/-D", "typey.json", "typey"],
        ["AUP/START/*D", "typey.json", "typey"],
      ]);
    });
  });

  describe("with gutenberg entries", () => {
    it('returns sorted list of outlines for "get" where the gutenberg entry comes first', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          // ["TKWET", "misstrokes.json"],
          // ["TPWET", "misstrokes.json"],
          // ["TKPWHET", "misstrokes.json"],
          // ["TKPWETD", "misstrokes.json"],
          ["TKPWET", "top-10000-project-gutenberg-words.json", "typey"],
          ["TKPW-T", "typey-type.json", "typey"],
          // ["TKPWELT", "misstrokes.json"],
          // ["TKPET", "misstrokes.json"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "upstarted",
          sharedAffixes
        )
      ).toEqual([
        ["TKPWET", "top-10000-project-gutenberg-words.json", "typey"],
        ["TKPW-T", "typey-type.json", "typey"],
        // ["TKWET", "misstrokes.json"],
        // ["TPWET", "misstrokes.json"],
        // ["TKPET", "misstrokes.json"],
        // ["TKPWETD", "misstrokes.json"],
        // ["TKPWHET", "misstrokes.json"],
        // ["TKPWELT", "misstrokes.json"],
      ]);
    });
  });

  describe("briefs starting with it, prioritising T over EUT", () => {
    it('returns outlines starting with T* ranked first for "it" contractions', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["EUTD", "plover.json", "plover"],
          ["T*D", "plover.json", "plover"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "it'd",
          sharedAffixes
        )
      ).toEqual([
        // This is the order when prioritising phrasing brief starters:
        // ["T*D", "plover.json", "plover"],
        // ["EUTD", "plover.json", "plover"],
        // This is the order when NOT prioritising phrasing brief starters:
        ["EUTD", "plover.json", "plover"],
        ["T*D", "plover.json", "plover"],
      ]);
    });

    it('returns outlines starting with T- ranked first for "it" phrasing briefs', () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["TWAS", "plover.json", "plover"],
          ["TWUS", "plover.json", "plover"],
          ["TWUZ", "plover.json", "plover"],
          ["T/WAB", "plover.json", "plover"],
          ["T-FS", "plover.json", "plover"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "it was",
          sharedAffixes
        )
      ).toEqual([
        // This is the order when prioritising phrasing brief starters:
        // ["T-FS", "plover.json", "plover"],
        // ["TWAS", "plover.json", "plover"],
        // ["TWUS", "plover.json", "plover"],
        // ["TWUZ", "plover.json", "plover"],
        // ["T/WAB", "plover.json", "plover"],
        // This is the order when NOT prioritising phrasing brief starters:
        ["TWAS", "plover.json", "plover"],
        ["TWUS", "plover.json", "plover"],
        ["TWUZ", "plover.json", "plover"],
        ["T-FS", "plover.json", "plover"],
        ["T/WAB", "plover.json", "plover"],
      ]);
    });
  });

  describe("complex case with stars, slashes, suffixes, misused suffixes, and outlines ending in S and Z", () => {
    it("returns a sensible order with HOR/TKEFRBZ first", () => {
      let arrayOfStrokesAndTheirSourceDictNames: StrokeAndDictionaryAndNamespace[] =
        [
          ["HOR/TKEFRBZ", "condensed-strokes.json", "typey"],
          ["HOR/TKEFRB/-S", "dict.json", "typey"],
          ["O*R/TK*EFRBS", "dict.json", "typey"],
          ["O*R/TK*EFRBZ", "dict.json", "typey"],
          ["O*R/TK*EFRS", "dict.json", "typey"],
          ["O*R/TK*EFRZ", "dict.json", "typey"],
          ["O*R/TKEFRBS", "dict.json", "typey"],
          ["O*R/TKEFRBZ", "dict.json", "typey"],
          ["O*R/TKER/*FS", "dict.json", "typey"],
          ["OR/TK*EFRS", "dict.json", "typey"],
          ["OR/TK*EFRZ", "dict.json", "typey"],
          ["OR/TKER/*FS", "dict.json", "typey"],
        ];
      const misstrokesJSON = {};

      expect(
        rankOutlines(
          arrayOfStrokesAndTheirSourceDictNames,
          misstrokesJSON,
          "hors d'oeuvres",
          sharedAffixes
        )
      ).toEqual([
        ["HOR/TKEFRBZ", "condensed-strokes.json", "typey"],
        ["OR/TK*EFRS", "dict.json", "typey"],
        ["OR/TK*EFRZ", "dict.json", "typey"],
        ["O*R/TKEFRBS", "dict.json", "typey"],
        ["O*R/TKEFRBZ", "dict.json", "typey"],
        ["HOR/TKEFRB/-S", "dict.json", "typey"],
        ["O*R/TK*EFRS", "dict.json", "typey"],
        ["O*R/TK*EFRZ", "dict.json", "typey"],
        ["O*R/TK*EFRBS", "dict.json", "typey"],
        ["O*R/TK*EFRBZ", "dict.json", "typey"],
        ["OR/TKER/*FS", "dict.json", "typey"],
        ["O*R/TKER/*FS", "dict.json", "typey"],
      ]);
    });
  });

  // describe('with different outlines across dictionaries', () => {
  //   it('returns sorted list of outlines for "upholstery", showing user dictionaries before typey-type.json', () => {
  //     let arrayOfStrokesAndTheirSourceDictNames = [
  //       ["AUP/HO*ELS/REU", "personal.json"],
  //       ["AUP/HO*LS/REU", "personal.json"],
  //       ["AUP/HOEFLT/*ER/KWREU", "personal.json"],
  //       ["AUP/HOEFLT/REU", "personal.json"],
  //       ["AUP/HOEL/STREU", "personal.json"],
  //       ["AUP/HOELT/REU", "personal.json"],
  //       ["AUP/HOFLT/REU", "personal.json"],
  //       ["AUP/HOL/STREU", "personal.json"],
  //       ["UP/HOLS/TREU", "dict.json"],
  //       ["UP/HOL/STREU", "dict.json"],
  //       ["UP/HOFLT/REU", "dict.json"],
  //       ["UP/HOELT/REU", "dict.json"],
  //       ["UP/HOELS/TREU", "dict.json"],
  //       ["UP/HOEL/STREU", "dict.json"],
  //       ["UP/HOEFLT/REU", "dict.json"],
  //       ["UP/HOEFLT/*ER/KWREU", "dict.json"],
  //       ["UP/HO*LS/REU", "dict.json"],
  //       ["UP/HO*ELS/REU", "dict.json"],
  //       ["AUP/HOFLT/REU", "dict.json"],
  //       ["AUP/HOELS/TREU", "condensed-strokes.json"],
  //     ]
  //     const misstrokesJSON = {};

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "upholstery", sharedAffixes)).toEqual([
  //       ["AUP/HOELT/REU", "personal.json"],
  //       ["AUP/HOFLT/REU", "personal.json"],
  //       ["AUP/HOL/STREU", "personal.json"],
  //       ["AUP/HOEFLT/REU", "personal.json"],
  //       ["AUP/HOEL/STREU", "personal.json"],
  //       ["AUP/HO*LS/REU", "personal.json"],
  //       ["AUP/HO*ELS/REU", "personal.json"],
  //       ["AUP/HOEFLT/*ER/KWREU", "personal.json"],
  //       ["AUP/HOELS/TREU", "typey-type.json"],
  //       ["AUP/HOFLT/REU", "dict.json"],
  //       ["UP/HOL/STREU", "dict.json"],
  //       ["UP/HOLS/TREU", "dict.json"],
  //       ["UP/HOELT/REU", "dict.json"],
  //       ["UP/HOFLT/REU", "dict.json"],
  //       ["UP/HOEFLT/REU", "dict.json"],
  //       ["UP/HOEL/STREU", "dict.json"],
  //       ["UP/HOELS/TREU", "dict.json"],
  //       ["UP/HO*LS/REU", "dict.json"],
  //       ["UP/HO*ELS/REU", "dict.json"],
  //       ["UP/HOEFLT/*ER/KWREU", "dict.json"],
  //     ]);
  //   });
  // });

  // describe('with different outlines across dictionaries', () => {
  //   it('returns sorted list of outlines for "satisfaction", showing user dictionaries before typey-type.json', () => {
  //     let arrayOfStrokesAndTheirSourceDictNames = [
  //       ["SAEFBGS", "dict.json"],
  //       ["SA*EF", "user.json"],
  //       ["SEF/SAEBGS", "dict.json"],
  //       ["STPA*BGS", "dict.json"],
  //       ["SAEBGS", "dict.json"],
  //       ["SAEBGS", "typey-type.json"],
  //     ];
  //     const misstrokesJSON = {};

  //     expect(rankOutlines(arrayOfStrokesAndTheirSourceDictNames, misstrokesJSON, "upholstery", sharedAffixes)).toEqual([
  //       ["SA*EF", "user.json"],
  //       ["SAEBGS", "typey-type.json"],
  //       ["SAEBGS", "dict.json"],
  //       ["SAEFBGS", "dict.json"],
  //       ["STPA*BGS", "dict.json"],
  //       ["SEF/SAEBGS", "dict.json"]
  //     ]);
  //   });
  // });
});
