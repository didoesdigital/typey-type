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

  let progressSummaryAndLinks = (
    <p>
      You’ve successfully typed {yourWordCount} words without hints or
      misstrokes.
    </p>
  );

  if (yourSeenWordCount === 1 && yourMemorisedWordCount === 0) {
    progressSummaryAndLinks = (
      <p>
        You’ve successfully typed {yourWordCount} word without misstrokes.{" "}
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
        You’ve successfully typed {yourWordCount} words without misstrokes.{" "}
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
        You’ve successfully typed {yourWordCount} words without misstrokes.{" "}
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
        You’ve successfully typed {yourWordCount} word without misstrokes.{" "}
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
        You’ve successfully typed {yourWordCount} words without misstrokes.{" "}
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
        You’ve successfully typed {yourWordCount} words without misstrokes.
        You’re {progressPercent}% of the way to 10,000 words.{" "}
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
        You’ve successfully typed {yourWordCount} words without misstrokes.
        You’re {progressPercent}% of the way to 10,000 words.{" "}
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
        You’ve successfully typed {yourWordCount} words without misstrokes.
        You’re {progressPercent}% of the way to 10,000 words.{" "}
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
