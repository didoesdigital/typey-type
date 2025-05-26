import misstrokesJSON from "../../../json/misstrokes.json";
import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../../constant/latestTypeyTypeFullDictName";
import AFFIXES from "../../affixes/affixes";
import getAffixMisstrokesFromMisstrokes from "../../affixes/getAffixMisstrokesFromMisstrokes";
import getAffixesFromLookupDict from "../../affixes/getAffixesFromLookupDict";
import createGlobalLookupDictionary from "../createGlobalLookupDictionary";
import { testAffixes } from "../transformingDictionaries.fixtures";
import hasSuffix from "./hasSuffix";

import type {
  PersonalDictionaryNameAndContents,
  StenoDictionary,
} from "../../../types";

const misstrokes = misstrokesJSON as StenoDictionary;

describe("hasSuffix", () => {
  beforeAll(() => {
    AFFIXES.setLoadFunction(() => {
      return testAffixes;
    });
  });

  beforeEach(() => {
    const emptyPersonalDictionaries: PersonalDictionaryNameAndContents[] = [];
    const customGlobalLookupDictionary = createGlobalLookupDictionary(
      emptyPersonalDictionaries,
      [
        [
          {
            "*EPB": "{^en}",
            "*PLT": "{^ment}",
            "A": "{a^}",
            "EUPB": "{in^}",
            "HREU": "{^ly}",
          },
          LATEST_TYPEY_TYPE_FULL_DICT_NAME,
        ],
      ]
    );

    const customAffixMisstrokes = getAffixMisstrokesFromMisstrokes(misstrokes);
    const customTestAffixes = getAffixesFromLookupDict(
      customGlobalLookupDictionary,
      customAffixMisstrokes
    );

    AFFIXES.setSharedAffixes(customTestAffixes);
  });

  afterEach(() => {
    AFFIXES.setSharedAffixes({ prefixes: [], suffixes: [] });
  });

  it("returns true for outline with suffix", () => {
    const outline = "SWEUFT/HREU";
    const translation = "swiftly";

    expect(
      hasSuffix(outline, translation, AFFIXES.getSharedAffixes().suffixes)
    ).toEqual(true);
  });

  it("returns false for outline that does not end with a suffix", () => {
    const outline = "TKPWUT/*EPB/PWERG";
    const translation = "Gutenberg";
    expect(
      hasSuffix(outline, translation, AFFIXES.getSharedAffixes().suffixes)
    ).toEqual(false);
  });

  it("returns false for single-stroke outlines", () => {
    const outline = "TEFT";
    const translation = "test";
    expect(
      hasSuffix(outline, translation, AFFIXES.getSharedAffixes().suffixes)
    ).toEqual(false);
  });
});
