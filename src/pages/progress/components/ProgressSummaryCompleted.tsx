import React from "react";
import ProgressLessonLinks from "./ProgressLessonLinks";
import { format } from "d3-format";

import type { UserSettings } from "../../../types";

type CompletedProps = {
  restartConfetti: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  userSettings: UserSettings;
  yourWordCount: number;
  yourMemorisedWordCount: number;
  yourSeenWordCount: number;
};

const ProgressSummaryCompleted = ({
  restartConfetti,
  userSettings,
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
            {format(",")(yourWordCount)} words. It’s time to{" "}
          </>
        ) : (
          <>
            Woohoo! You rock! You’ve successfully typed{" "}
            {format(",")(yourWordCount)} words. You are an accomplished
            stenographer now! You’ve completed 100% of 10,000 words. It’s time
            to{" "}
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
          userSettings={userSettings}
          yourWordCount={yourWordCount}
          yourSeenWordCount={yourSeenWordCount}
          yourMemorisedWordCount={yourMemorisedWordCount}
        />
      </p>
    </>
  );
};

export default ProgressSummaryCompleted;
