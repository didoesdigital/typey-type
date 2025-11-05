import { isPeak } from "./utils";

import type { Attempt } from "types";

function strokeAccuracy(
  currentPhraseAttempts: Attempt[],
  targetStrokeCount: number,
  unmatchedActual: string,
  batchUpdate?: boolean | undefined
): {
  strokeAccuracy: boolean;
  attempts: Attempt[];
} {
  const strokeAccuracy = true;
  const attempts = [];

  for (let i = 0; i < currentPhraseAttempts.length - 1; i++) {
    let isAPeak = false;
    if (
      currentPhraseAttempts[i - 1] !== undefined &&
      currentPhraseAttempts[i + 1] !== undefined
    ) {
      if (
        isPeak(
          currentPhraseAttempts[i].text.length,
          currentPhraseAttempts[i - 1].text.length,
          currentPhraseAttempts[i + 1].text.length
        )
      ) {
        isAPeak = true;
        // console.log("IS A PEAK");
      } else if (
        currentPhraseAttempts[i].text.length ===
          currentPhraseAttempts[i - 1].text.length ||
        currentPhraseAttempts[i].text.length ===
          currentPhraseAttempts[i + 1].text.length
      ) {
        isAPeak = true;
        // console.log("IS A PEAK");
      }
    } else if (currentPhraseAttempts[i + 1] !== undefined) {
      if (
        currentPhraseAttempts[i].text.length >
        currentPhraseAttempts[i + 1].text.length
      ) {
        isAPeak = true;
        // console.log("IS A PEAK");
      } else if (
        currentPhraseAttempts[i].text.length ===
        currentPhraseAttempts[i + 1].text.length
      ) {
        isAPeak = true;
        // console.log("IS A PEAK");
      }
    } else if (currentPhraseAttempts[i - 1] !== undefined) {
      if (
        currentPhraseAttempts[i].text.length >
        currentPhraseAttempts[i - 1].text.length
      ) {
        isAPeak = true;
        // console.log("IS A PEAK");
      } else if (
        currentPhraseAttempts[i].text.length ===
        currentPhraseAttempts[i - 1].text.length
      ) {
        isAPeak = true;
        // console.log("IS A PEAK");
      }
    }

    if (isAPeak) {
      attempts.push(currentPhraseAttempts[i]);
    }
  }

  if (attempts.length >= targetStrokeCount) {
    // console.log("More attempts than expected strokes");
    return { strokeAccuracy: false, attempts: attempts };
  }

  if (!batchUpdate) {
    // If it's the final stroke, fail any unmatched characters immediately
    // (unless you're undoing a stroke and typed text is getting shorter)
    const nextAttempt = attempts.length + 1;
    const isFinalStroke = nextAttempt >= targetStrokeCount;
    const hasUnmatchedChars = unmatchedActual.length > 0;
    const failedSingleStrokeBrief =
      currentPhraseAttempts.length === 1 && targetStrokeCount === 1;
    const isTypedTextLongerThanPrevious =
      currentPhraseAttempts.length > 1 &&
      currentPhraseAttempts[currentPhraseAttempts.length - 1].text.length >
        currentPhraseAttempts[currentPhraseAttempts.length - 2].text.length;
    if (
      isFinalStroke &&
      hasUnmatchedChars &&
      (failedSingleStrokeBrief || isTypedTextLongerThanPrevious)
    ) {
      attempts.push(currentPhraseAttempts[currentPhraseAttempts.length - 1]);
      return { strokeAccuracy: false, attempts: attempts };
    }
  }

  return { strokeAccuracy: strokeAccuracy, attempts: attempts };
}

export { strokeAccuracy };
