import AFFIXES from "../../../../../utils/affixes/affixes";
import startsWithPrefix from "./startsWithPrefix";
import type { AffixObject } from "../../../../../types";

describe("startsWithPrefix", () => {
  beforeAll(() => {
    AFFIXES.setLoadFunction(() => {
      const affixObject: AffixObject = {
        prefixes: [
          ["A/", "a"],
          ["EUPBD", "ind"],
          ["HOEUP", "hypo"],
          // Alternate outlines are not included in affixes lists:
          // "HO*EUP": "{hypo^}",
          // "HAO*EUP": "{hypo^}",
          // "HAOEUP/O*": "{hypo^}",
          // "HAOEUP/OE": "{hypo^}",
          // "HAOEUP/KWRO": "{hypo^}",
          // "HAOEUP/SKWRO": "{hypo^}",
        ],
        suffixes: [
          ["/-D", "ed"],
          ["/-G", "ing"],
        ],
      };
      return affixObject;
    });
  });

  it("returns true for entries that start with a prefix outline that matches the start of the translation", async () => {
    expect(startsWithPrefix("A/HROEPB", "alone")).toEqual(true);
  });

  it("returns false for entries that start with a prefix outline that do not match the start of the translation", async () => {
    expect(startsWithPrefix("EUPBD/KWRAPB", "Indian")).toEqual(false);
  });

  it("returns false for entries that start with prefix outline but lack a slash", async () => {
    expect(startsWithPrefix("AF", "after")).toEqual(false);
  });

  it("returns false for entries with no slashes", async () => {
    expect(startsWithPrefix("TEFT", "teft")).toEqual(false);
  });

  it("returns false for outline starting with a down-ranked prefix outline when there is a better prefix outline included in the affixes prefix list", async () => {
    expect(startsWithPrefix("HO*EUP/KHORPBD/KWRA", "hypochondria")).toEqual(
      false
    );
  });

  it("returns true for outline starting with a up-ranked prefix outline", async () => {
    expect(startsWithPrefix("HOEUP/KHORPBD/KWRA", "hypochondria")).toEqual(
      true
    );
  });
});
