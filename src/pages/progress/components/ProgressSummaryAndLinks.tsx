import React from "react";
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

const ProgressSummaryAndLinks = ({
  metWords,
  restartConfetti,
  yourSeenWordCount,
  yourMemorisedWordCount,
}: Props) => {
  const progressPercent =
    Math.round((Object.keys(metWords).length / 10000) * 100) || 0;
  const yourWordCount = Object.keys(metWords).length || 0;

  if (yourWordCount >= 10000) {
    return (
      <ProgressSummaryCompleted
        restartConfetti={restartConfetti}
        yourWordCount={yourWordCount}
        yourMemorisedWordCount={yourMemorisedWordCount}
        yourSeenWordCount={yourSeenWordCount}
      />
    );
  }

  const IntroSentence = () => (
    <>{`You’ve successfully typed ${yourWordCount} ${
      yourWordCount === 1 ? "word" : "words"
    } without misstrokes. `}</>
  );

  type MaybeProgressPercentSentenceProps = {
    yourSeenWordCount: number;
  };

  const MaybeProgressPercentSentence = ({
    yourSeenWordCount,
  }: MaybeProgressPercentSentenceProps) =>
    yourSeenWordCount > 1 ? (
      <>{`You’re ${progressPercent}% of the way to 10,000 words. `}</>
    ) : null;

  let progressSummaryAndLinks = (
    <p>
      <IntroSentence />
    </p>
  );

  if (yourSeenWordCount === 1 && yourMemorisedWordCount === 0) {
    progressSummaryAndLinks = (
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
  }
  if (yourSeenWordCount === 1 && yourMemorisedWordCount === 1) {
    progressSummaryAndLinks = (
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
  }
  if (yourSeenWordCount === 1 && yourMemorisedWordCount > 1) {
    // skipped, only pluralisation differs in links
    progressSummaryAndLinks = (
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
  }
  if (yourSeenWordCount === 0 && yourMemorisedWordCount === 1) {
    progressSummaryAndLinks = (
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
  }
  if (yourSeenWordCount === 0 && yourMemorisedWordCount > 1) {
    // skipped, only pluralisation differs in links
    progressSummaryAndLinks = (
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
  }
  if (yourSeenWordCount > 1 && yourMemorisedWordCount === 0) {
    progressSummaryAndLinks = (
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
  }
  if (yourSeenWordCount > 1 && yourMemorisedWordCount === 1) {
    progressSummaryAndLinks = (
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
  }
  if (yourSeenWordCount > 1 && yourMemorisedWordCount > 1) {
    progressSummaryAndLinks = (
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
  }

  return progressSummaryAndLinks;
};

export default ProgressSummaryAndLinks;
