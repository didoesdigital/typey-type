import React from "react";
import ProgressLessonLinks from "./ProgressLessonLinks";

type CompletedProps = {
  restartConfetti: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  yourWordCount: number;
  yourMemorisedWordCount: number;
  yourSeenWordCount: number;
};

const ProgressSummaryCompleted = ({
  restartConfetti,
  yourWordCount,
  yourMemorisedWordCount,
  yourSeenWordCount,
}: CompletedProps) => {
  return (
    <>
      <p>
        {yourMemorisedWordCount >= 10000 ? (
          <>
            Woohoo! You rock! What a magnificent effort to memorise 10,000
            words. You are an expert stenographer now! You’ve successfully typed{" "}
            {yourWordCount} words without misstrokes. It’s time to{" "}
          </>
        ) : (
          <>
            Woohoo! You rock! You’ve successfully typed {yourWordCount} words
            without misstrokes. You are an accomplished stenographer now! You’ve
            completed 100% of 10,000 words. It’s time to{" "}
          </>
        )}
        <button
          className="button-that-looks-like-a-link"
          id="celebrate-button"
          onClick={restartConfetti}
          onKeyDown={restartConfetti}
        >
          celebrate!
        </button>
      </p>
      <p>
        <ProgressLessonLinks
          yourWordCount={yourWordCount}
          yourSeenWordCount={yourSeenWordCount}
          yourMemorisedWordCount={yourMemorisedWordCount}
        />
      </p>
    </>
  );
};

export default ProgressSummaryCompleted;
