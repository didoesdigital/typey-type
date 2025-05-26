import misstrokesJSON from "../../json/misstrokes.json";
import LATEST_TYPEY_TYPE_FULL_DICT_NAME from "../../constant/latestTypeyTypeFullDictName";
import AFFIXES from "../affixes/affixes";
import getAffixMisstrokesFromMisstrokes from "../affixes/getAffixMisstrokesFromMisstrokes";
import getAffixesFromLookupDict from "../affixes/getAffixesFromLookupDict";
import createGlobalLookupDictionary from "./createGlobalLookupDictionary";
import getRankedOutlineFromLookupEntry from "./getRankedOutlineFromLookupEntry";
import { testAffixes } from "./transformingDictionaries.fixtures";

import type {
  PersonalDictionaryNameAndContents,
  StenoDictionary,
  StrokeAndNamespacedDict,
} from "../../types";

const misstrokes = misstrokesJSON as StenoDictionary;

describe("getRankedOutlineFromLookupEntry", () => {
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
            "KAUPB": "{con^}",
            "EPBT": "{^ent}",
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

  it("splits the dict names into namespaces and returns the ranked outline with provided affixList", () => {
    const lookupEntry: StrokeAndNamespacedDict[] = [
      ["KOPB/S*EUS/TEPBT", "typey:typey-type.json"],
      ["KAUPB/SEUS/TEPBT", "typey:typey-type.json"],
      ["KOPB/SEUS/TEPBT", "typey:typey-type.json"],
      ["KOPB/S*EUS/EPBT", "typey:typey-type.json"],
      ["KAO/*EPBT", "typey:typey-type.json"],
      ["KAOEPBT", "typey:typey-type.json"],
      ["KAOPBT", "typey:typey-type.json"],
    ];
    const translation = "warmly";

    expect(
      getRankedOutlineFromLookupEntry(
        lookupEntry,
        translation,
        AFFIXES.getSharedAffixes()
      )
    ).toEqual("KAOPBT");
  });

  it("splits the dict names into namespaces and returns the ranked outline without an affixList", () => {
    const lookupEntry: StrokeAndNamespacedDict[] = [
      ["KOPB/S*EUS/TEPBT", "typey:typey-type.json"],
      ["KAUPB/SEUS/TEPBT", "typey:typey-type.json"],
      ["KOPB/SEUS/TEPBT", "typey:typey-type.json"],
      ["KOPB/S*EUS/EPBT", "typey:typey-type.json"],
      ["KAO/*EPBT", "typey:typey-type.json"],
      ["KAOEPBT", "typey:typey-type.json"],
      ["KAOPBT", "typey:typey-type.json"],
    ];
    const translation = "warmly";

    expect(getRankedOutlineFromLookupEntry(lookupEntry, translation)).toEqual(
      "KAOPBT"
    );
  });
});
