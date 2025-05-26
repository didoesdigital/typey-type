import misstrokesJSON from "../../../json/misstrokes.json";
import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../../constant/latestTypeyTypeFullDictName";
import AFFIXES from "../../affixes/affixes";
import getAffixMisstrokesFromMisstrokes from "../../affixes/getAffixMisstrokesFromMisstrokes";
import getAffixesFromLookupDict from "../../affixes/getAffixesFromLookupDict";
import createGlobalLookupDictionary from "../createGlobalLookupDictionary";
import { testAffixes } from "../transformingDictionaries.fixtures";
import penaliseSlashesWithoutPrefixesOrSuffixes from "./penaliseSlashesWithoutPrefixesOrSuffixes";

import type {
  PersonalDictionaryNameAndContents,
  StenoDictionary,
} from "../../../types";

const misstrokes = misstrokesJSON as StenoDictionary;

describe("penaliseSlashesWithoutPrefixesOrSuffixes", () => {
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

  it("returns penalty of 2 for multi-stroke outlines without affix strokes", () => {
    const outline = "TKPWUT/*EPB/PWERG";
    const translation = "Gutenberg";
    expect(
      penaliseSlashesWithoutPrefixesOrSuffixes(
        outline,
        translation,
        AFFIXES.getSharedAffixes()
      )
    ).toEqual(2);
  });

  // NOTE: one day, we might add an extra penalty to suffixes used as prefixes e.g. "O*R": "{^or}"
  it("returns penalty greater than zero multi-stroke outline without prefix strokes at the start or suffix strokes at the end", () => {
    const outline = "O*R/TK*EFRBZ";
    const translation = "hors d'oeuvres";
    const penalty = penaliseSlashesWithoutPrefixesOrSuffixes(
      outline,
      translation,
      AFFIXES.getSharedAffixes()
    );

    expect(penalty).toBeGreaterThan(0);
  });

  it("returns no penalty for multi-stroke outlines with prefix strokes", () => {
    const outline = "EUPB/TKAOUFD";
    const translation = "induced";
    expect(
      penaliseSlashesWithoutPrefixesOrSuffixes(
        outline,
        translation,
        AFFIXES.getSharedAffixes()
      )
    ).toEqual(0);
  });

  it("returns no penalty for multi-stroke outlines with suffix strokes", () => {
    const outline = "SWEUFT/HREU";
    const translation = "swiftly";
    const penalty = penaliseSlashesWithoutPrefixesOrSuffixes(
      outline,
      translation,
      AFFIXES.getSharedAffixes()
    );

    expect(penalty).toEqual(0);
  });

  it("returns no penalty for single-stroke outlines", () => {
    const outline = "TEFT";
    const translation = "test";
    expect(
      penaliseSlashesWithoutPrefixesOrSuffixes(
        outline,
        translation,
        AFFIXES.getSharedAffixes()
      )
    ).toEqual(0);
  });
});
