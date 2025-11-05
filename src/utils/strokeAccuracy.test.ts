import { strokeAccuracy } from "./strokeAccuracy";

describe("stroke accuracy for current phrase", () => {
  describe("should return false for real failed meetings", () => {
    it('you wrote cut instead of cat and Plover backtracked to " c"', () => {
      const currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " c", time: 2 },
        { text: " cu", time: 3 },
        { text: " cut", time: 4 },
        { text: " cu", time: 5 },
        { text: " c", time: 6 },
        { text: " ca", time: 7 },
        { text: " cat", time: 8 },
      ];
      const targetStrokeCount = 1;
      const unmatchedActual = "";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({
        strokeAccuracy: false,
        attempts: [{ text: " cut", time: 4 }],
      });
    });

    it('you wrote cut instead of cat and Plover backtracked to " "', () => {
      const currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " c", time: 2 },
        { text: " cu", time: 3 },
        { text: " cut", time: 4 },
        { text: " cu", time: 5 },
        { text: " c", time: 6 },
        { text: " ", time: 7 },
        { text: " c", time: 8 },
        { text: " ca", time: 9 },
        { text: " cat", time: 10 },
      ];
      const targetStrokeCount = 1;
      const unmatchedActual = "";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({
        strokeAccuracy: false,
        attempts: [{ text: " cut", time: 4 }],
      });
    });

    it('you wrote cut instead of cat and Plover backtracked to ""', () => {
      const currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " c", time: 2 },
        { text: " cu", time: 3 },
        { text: " cut", time: 4 },
        { text: " cu", time: 5 },
        { text: " c", time: 6 },
        { text: " ", time: 7 },
        { text: "", time: 8 },
        { text: " ", time: 9 },
        { text: " c", time: 10 },
        { text: " ca", time: 11 },
        { text: " cat", time: 12 },
      ];
      const targetStrokeCount = 1;
      const unmatchedActual = "";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({
        strokeAccuracy: false,
        attempts: [{ text: " cut", time: 4 }],
      });
    });

    it("you wrote sign, ss, and ss for sciences", () => {
      const currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " s", time: 2 },
        { text: " si", time: 3 },
        { text: " sig", time: 4 },
        { text: " sign", time: 5 },
        { text: " sig", time: 6 },
        { text: " si", time: 7 },
        { text: " s", time: 8 },
        { text: " ss", time: 9 },
        { text: " s", time: 10 },
        { text: " ss", time: 11 },
        { text: " s", time: 12 },
        { text: " sc", time: 13 },
        { text: " sci", time: 14 },
        { text: " scie", time: 15 },
        { text: " scien", time: 16 },
        { text: " scienc", time: 17 },
        { text: " science", time: 18 },
        { text: " sciences", time: 19 },
      ];
      const targetStrokeCount = 3;
      const unmatchedActual = "";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({
        strokeAccuracy: false,
        attempts: [
          { text: " sign", time: 5 },
          { text: " ss", time: 9 },
          { text: " ss", time: 11 },
        ],
      });
    });

    it('you wrote "verticax", "verticaw" for vertical', () => {
      const currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " v", time: 2 },
        { text: " ve", time: 3 },
        { text: " ver", time: 4 },
        { text: " vert", time: 5 },
        { text: " verti", time: 6 },
        { text: " vertic", time: 7 },
        { text: " vertica", time: 8 },
        { text: " verticax", time: 9 },
        { text: " verticaw", time: 10 },
        { text: " vertical", time: 11 },
      ];
      const targetStrokeCount = 2;
      const unmatchedActual = "";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({
        strokeAccuracy: false,
        attempts: [
          { text: " verticax", time: 9 },
          { text: " verticaw", time: 10 },
        ],
      });
    });

    it("you wrote were instead of we're", () => {
      const currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " w", time: 2 },
        { text: " we", time: 3 },
        { text: " wer", time: 4 },
        // " wer",
        // " were",
        // " wer",
        // " we",
        // " w",
        // " ",
        // " w",
        // " we",
        // " we'",
        // " we'r",
        // " we're"
      ];
      const targetStrokeCount = 1;
      const unmatchedActual = "r";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({
        strokeAccuracy: false,
        attempts: [{ text: " wer", time: 4 }],
      });
    });

    it("you wrote x when trying to write courageous in 1 stroke, giving you a misstroke AND recording x in attempts for feedback", () => {
      const currentPhraseAttempts = [{ text: "x", time: 1 }];
      const targetStrokeCount = 1;
      const unmatchedActual = "x";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({ strokeAccuracy: false, attempts: [{ text: "x", time: 1 }] });
    });

    it("you wrote cor when trying to write courageous in 1 stroke", () => {
      const currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " c", time: 2 },
        { text: " co", time: 3 },
        { text: " cor", time: 4 },
        // " cor",
        // " co",
        // " c",
        // " ",
        // " c",
        // " co",
        // " cou",
        // " cour",
        // " coura",
        // " courag",
        // " courage",
        // " courageo",
        // " courageou",
        // " courageous"
      ];
      const targetStrokeCount = 1;
      const unmatchedActual = "r";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({
        strokeAccuracy: false,
        attempts: [{ text: " cor", time: 4 }],
      });
    });

    //     it("you wrote we're instead of were", () => {
    //       let currentPhraseAttempts = [" ", " w", " we", " we'", " we'r", " we're", " we'r", " we'", " we", " w", " ", " w", " we", " wer", " were"];
    //       let targetStrokeCount = 1;
    //       expect(strokeAccuracy(currentPhraseAttempts, targetStrokeCount)).toEqual(false);
    //     });
    it("should detect attempts with overrun", () => {
      const currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " y", time: 2 },
        { text: " yo", time: 3 },
        { text: " you", time: 4 },
        { text: " your", time: 5 },
        { text: " yours", time: 6 },
        { text: " your", time: 7 },
        { text: " you", time: 8 },
      ];
      const targetStrokeCount = 1;
      const unmatchedActual = "";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({
        strokeAccuracy: false,
        attempts: [{ text: " yours", time: 6 }],
      });
    });
  });

  describe("should return true for real successful meetings", () => {
    it("you wrote sign and sciences for sciences with 3 stroke target", () => {
      const currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " s", time: 2 },
        { text: " si", time: 3 },
        { text: " sig", time: 4 },
        { text: " sign", time: 5 },
        { text: " sig", time: 6 },
        { text: " si", time: 7 },
        { text: " s", time: 8 },
        { text: " sc", time: 9 },
        { text: " sci", time: 10 },
        { text: " scie", time: 11 },
        { text: " scien", time: 12 },
        { text: " scienc", time: 13 },
        { text: " science", time: 14 },
        { text: " sciences", time: 15 },
      ];
      const targetStrokeCount = 3;
      const unmatchedActual = "";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({
        strokeAccuracy: true,
        attempts: [{ text: " sign", time: 5 }],
      });
    });

    it("you wrote sigh then sig when trying to write silent in 2 strokes", () => {
      const currentPhraseAttempts = [
        { text: " ", time: 1 },
        { text: " s", time: 2 },
        { text: " si", time: 3 },
        { text: " sig", time: 4 },
        { text: " sigh", time: 5 },
        { text: " sig", time: 5 },
      ];
      const targetStrokeCount = 2;
      const unmatchedActual = "g";
      expect(
        strokeAccuracy(
          // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
          currentPhraseAttempts,
          targetStrokeCount,
          unmatchedActual
        )
      ).toEqual({
        strokeAccuracy: true,
        attempts: [{ text: " sigh", time: 5 }],
      });
    });
  });
});
