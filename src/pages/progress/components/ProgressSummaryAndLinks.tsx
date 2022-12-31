import React, { useMemo } from "react";
import ProgressSummaryCompleted from "./ProgressSummaryCompleted";
import ProgressLessonLinks from "./ProgressLessonLinks";

import type { MetWords } from "../../../types";

type Props = {
  metWords: MetWords;
  restartConfetti: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  yourMemorisedWordCount: number;
  yourSeenWordCount: number;
};

type MaybeProgressPercentSentenceProps = {
  yourSeenWordCount: number;
};

const ProgressSummaryAndLinks = ({
  metWords,
  restartConfetti,
  yourSeenWordCount,
  yourMemorisedWordCount,
}: Props) => {
  const yourWordCount = useMemo(
    () => Object.keys(metWords).length || 0,
    [metWords]
  );

  const progressPercent = useMemo(
    () => Math.round((yourWordCount / 10000) * 100) || 0,
    [yourWordCount]
  );

  const IntroSentence = () => (
    <>{`You’ve successfully typed ${yourWordCount} ${
      yourWordCount === 1 ? "word" : "words"
    } without misstrokes. `}</>
  );

  const MaybeProgressPercentSentence = ({
    yourSeenWordCount,
  }: MaybeProgressPercentSentenceProps) =>
    yourSeenWordCount > 1 ? (
      <>{`You’re ${progressPercent}% of the way to 10,000 words. `}</>
    ) : null;

  return yourWordCount >= 10000 ? (
    <ProgressSummaryCompleted
      restartConfetti={restartConfetti}
      yourWordCount={yourWordCount}
      yourMemorisedWordCount={yourMemorisedWordCount}
      yourSeenWordCount={yourSeenWordCount}
    />
  ) : (
    <p>
      <IntroSentence />
      <MaybeProgressPercentSentence yourSeenWordCount={yourSeenWordCount} />
      <ProgressLessonLinks
        yourWordCount={yourWordCount}
        yourSeenWordCount={yourSeenWordCount}
        yourMemorisedWordCount={yourMemorisedWordCount}
      />
    </p>
  );
};

export default ProgressSummaryAndLinks;
