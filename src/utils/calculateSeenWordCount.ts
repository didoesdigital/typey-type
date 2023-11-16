import type { MetWords } from "../types";

function calculateSeenWordCount(metWords: MetWords) {
  const yourSeenWordCount =
    Math.round(
      Object.values(metWords).filter(
        (timesSeen) => timesSeen > 0 && timesSeen < 30
      ).length
    ) || 0;
  return yourSeenWordCount;
}

export default calculateSeenWordCount;
