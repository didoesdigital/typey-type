import {
  type LocalStoragePersonalDictionariesV0,
  type LocalStoragePersonalDictionariesV1,
  // writePersonalPreferences,
  migratePersonalDictionariesV0ToV1,
  // migratePersonalDictionariesV1ToV2,
  runAllPersonalDictionariesMigrations,
} from "./typey-type";
import { updateCapitalisationStrokesInNextItem } from "./updateCapitalisationStrokesInNextItem";

// describe('writePersonalPreferences', () => {
//   describe('without localStorage', () => {
//     it('should log error', () => {
//       let metWords = { "hi": 0, "hey": 1 };
//       let userSettings = {
//         caseSensitive: true,
//         retainedWords: true,
//         limitNumberOfWords: 0,
//         startFromWord: 1,
//         newWords: true,
//         repetitions: 1,
//         showStrokes: true,
//         hideStrokesOnLastRepetition: false,
//         spacePlacement: 'spaceBeforeOutput',
//         sortOrder: 'sortRandom',
//         seenWords: true,
//         study: discover
//       };
//     });
//   });
// });

describe("update capitalisation strokes in next item", () => {
  describe("where previous word ends in a letter", () => {
    const lastWord = "cat";

    // ` cat "A`
    describe("where next item has quotes", () => {
      const nextItem = { phrase: '"A', stroke: "KW-GS KPA/AEU" };
      it("removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke", () => {
        expect(
          updateCapitalisationStrokesInNextItem(nextItem, lastWord)
        ).toEqual({
          phrase: '"A',
          stroke: "KW-GS KPA*/AEU",
        });
      });
    });
  });

  // ` cat. "A`
  describe("where previous word ends in full stop", () => {
    const lastWord = "cat.";

    describe("where next item has quotes", () => {
      const nextItem = { phrase: '"A', stroke: "KW-GS KPA/AEU" };
      it("removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke", () => {
        expect(
          updateCapitalisationStrokesInNextItem(nextItem, lastWord)
        ).toEqual({
          phrase: '"A',
          stroke: "KW-GS AEU",
        });
      });
    });
  });

  // ` request. When`
  describe("where previous word ends in full stop", () => {
    const lastWord = "request.";

    describe("where next item has quotes", () => {
      const nextItem = { phrase: "When", stroke: "KPA/WHEPB" };
      it("removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke", () => {
        expect(
          updateCapitalisationStrokesInNextItem(nextItem, lastWord)
        ).toEqual({
          phrase: "When",
          stroke: "WHEPB",
        });
      });
    });
  });

  // ` cat… "A`
  describe("where previous word ends in an ellipsis", () => {
    const lastWord = "cat…";

    describe("where next item has quotes", () => {
      const nextItem = { phrase: '"A', stroke: "KW-GS KPA/AEU" };
      it("removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke", () => {
        expect(
          updateCapitalisationStrokesInNextItem(nextItem, lastWord)
        ).toEqual({
          phrase: '"A',
          stroke: "KW-GS AEU",
        });
      });
    });
  });

  // ` everything." "Be`
  describe("where previous word ends in an ellipsis", () => {
    const lastWord = 'everything."';

    describe("where next item has quotes", () => {
      const nextItem = { phrase: '"Be', stroke: "KW-GS KPA/-B" };
      it("removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke", () => {
        expect(
          updateCapitalisationStrokesInNextItem(nextItem, lastWord)
        ).toEqual({
          phrase: '"Be',
          stroke: "KW-GS -B",
        });
      });
    });
  });

  // ` "Be everything."`
  describe("where previous word ends in an ellipsis", () => {
    const lastWord = '"Be';

    describe("where next item has quotes", () => {
      const nextItem = { phrase: 'everything."', stroke: "EFG TP-PL KR-GS" };
      it("removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke", () => {
        expect(
          updateCapitalisationStrokesInNextItem(nextItem, lastWord)
        ).toEqual({
          phrase: 'everything."',
          stroke: "EFG TP-PL KR-GS",
        });
      });
    });
  });

  // ` said: "Be`
  describe("where previous word ends in a colon", () => {
    const lastWord = "said:";

    describe("where next item has quotes", () => {
      const nextItem = { phrase: '"Be', stroke: "KR-GS KPA/-B" };
      it("removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke", () => {
        expect(
          updateCapitalisationStrokesInNextItem(nextItem, lastWord)
        ).toEqual({
          phrase: '"Be',
          stroke: "KR-GS KPA*/-B",
        });
      });
    });
  });

  // ` cat… "A`
  describe("where previous word ends in an ellipsis", () => {
    const lastWord = "cat…";

    describe("where next item has quotes", () => {
      const nextItem = { phrase: '"A', stroke: "KW-GS KPA/AEU" };
      it("removes redundant capitalisation strokes when following terminating punctuation that probably uses a carry capitalisation stroke", () => {
        expect(
          updateCapitalisationStrokesInNextItem(nextItem, lastWord)
        ).toEqual({
          phrase: '"A',
          stroke: "KW-GS AEU",
        });
      });
    });
  });
});

describe("migratePersonalDictionariesV", () => {
  const startingV0Dictionaries: LocalStoragePersonalDictionariesV0 = [
    ["personal.json", { "TAO*EUPT": "Typey Type" }],
  ];
  const startingV1Dictionaries: LocalStoragePersonalDictionariesV1 = {
    "v": "1",
    "dicts": [["personal.json", { "TAO*EUPT": "Typey Type" }]],
  };
  const migratedV1Dictionaries = Object.assign({}, startingV1Dictionaries);

  describe("runAllPersonalDictionariesMigrations", () => {
    const dirtyFlag = false;

    describe("where local storage had v0 format", () => {
      it("returns true dirty flag", () => {
        expect(
          runAllPersonalDictionariesMigrations(
            startingV0Dictionaries,
            dirtyFlag
          )
        ).toEqual([migratedV1Dictionaries, true, null]);
      });
    });

    describe("where local storage had v1 format", () => {
      it("returns false dirty flag", () => {
        expect(
          runAllPersonalDictionariesMigrations(
            startingV1Dictionaries,
            dirtyFlag
          )
        ).toEqual([migratedV1Dictionaries, false, null]);
      });
    });
  });

  describe("v0 to v1", () => {
    const dirtyFlag = false;

    describe("where local storage had v0 format", () => {
      it("returns dictionary migrated to v1 and true dirty flag", () => {
        expect(
          migratePersonalDictionariesV0ToV1(startingV0Dictionaries, dirtyFlag)
        ).toEqual([migratedV1Dictionaries, true]);
      });
    });

    describe("where local storage had v1 format", () => {
      it("returns same v1 dictionary and false dirty flag", () => {
        expect(
          migratePersonalDictionariesV0ToV1(startingV1Dictionaries, dirtyFlag)
        ).toEqual([migratedV1Dictionaries, false]);
      });
    });
  });
});

// describe('migratePersonalDictionariesV', () => {
//   let startingV0Dictionaries = [["personal.json",{"TAO*EUPT": "Typey Type"}]];
//   let startingV1Dictionaries = {"v":"1","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"}]]};
//   let startingV2Dictionaries = {"v":"2","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"},{isMisstrokes: false}]]};
//   let migratedV1Dictionaries = Object.assign({}, startingV1Dictionaries);
//   let migratedV2DictionariesWithExistingV2Info = {"v":"2","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"},{isMisstrokes: false}]]};
//   let migratedV2DictionariesWithEmptyV2Info = {"v":"2","dicts":[["personal.json",{"TAO*EUPT": "Typey Type"},{}]]};

//   describe('runAllPersonalDictionariesMigrations', () => {
//     let dirtyFlag = false;

//     describe('where local storage had v0 format', () => {
//       it('returns true dirty flag', () => {
//         expect(runAllPersonalDictionariesMigrations(startingV0Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithEmptyV2Info,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v1 format', () => {
//       it('returns true dirty flag', () => {
//         expect(runAllPersonalDictionariesMigrations(startingV1Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithEmptyV2Info,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v2 format', () => {
//       it('returns false dirty flag', () => {
//         expect(runAllPersonalDictionariesMigrations(startingV2Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithExistingV2Info,
//           false
//         ])
//       });
//     });
//   });

//   describe('v0 to v1', () => {
//     let dirtyFlag = false;

//     describe('where local storage had v0 format', () => {
//       it('returns dictionary migrated to v1 and dirty flag', () => {
//         expect(migratePersonalDictionariesV0ToV1(startingV0Dictionaries, dirtyFlag)).toEqual([
//           migratedV1Dictionaries,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v1 format', () => {
//       it('returns existing v1 dictionary and false dirty flag', () => {
//         expect(migratePersonalDictionariesV0ToV1(startingV1Dictionaries, dirtyFlag)).toEqual([
//           migratedV1Dictionaries,
//           false
//         ])
//       });
//     });

//     describe('where local storage had v2 format', () => {
//       it('returns existing v2 dictionary and false dirty flag', () => {
//         expect(migratePersonalDictionariesV1ToV2(startingV2Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithExistingV2Info,
//           false
//         ])
//       });
//     });
//   });

//   describe('v1 to v2', () => {
//     describe('where local storage had v1 format', () => {
//       let dirtyFlag = false;
//       it('returns dictionary migrated to v2 and true dirty flag', () => {
//         expect(migratePersonalDictionariesV1ToV2(startingV1Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithEmptyV2Info,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v0 format and has just been migrated to v1', () => {
//       let dirtyFlag = true;
//       it('returns dictionary migrated to v2 and true dirty flag', () => {
//         expect(migratePersonalDictionariesV1ToV2(startingV1Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithEmptyV2Info,
//           true
//         ])
//       });
//     });

//     describe('where local storage had v2 format', () => {
//       let dirtyFlag = false;
//       it('returns existing v2 dictionary and false dirty flag', () => {
//         expect(migratePersonalDictionariesV1ToV2(startingV2Dictionaries, dirtyFlag)).toEqual([
//           migratedV2DictionariesWithExistingV2Info,
//           false
//         ])
//       });
//     });
//   });
// });
