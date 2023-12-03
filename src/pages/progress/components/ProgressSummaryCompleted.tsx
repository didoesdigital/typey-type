import React, { useEffect } from "react";
import GoogleAnalytics from "react-ga4";
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

type IntroProps = {
  yourWordCount: number;
};

const IntroToCelebrate10000Memorised = ({ yourWordCount }: IntroProps) => {
  useEffect(() => {
    GoogleAnalytics.event({
      category: "MemorisedTypeyType10000",
      action: "MemorisedTypeyType10000",
      label: "MemorisedTypeyType10000",
    });
  }, []);

  return (
    <>
      Woohoo! You rock! What a magnificent effort to memorise 10,000 words. You
      are an expert stenographer now! You’ve successfully typed{" "}
      {format(",")(yourWordCount)} words. It’s time to{" "}
    </>
  );
};

const IntroToCelebrate10000Typed = ({ yourWordCount }: IntroProps) => {
  useEffect(() => {
    GoogleAnalytics.event({
      category: "CompletedTypeyType10000",
      action: "CompletedTypeyType10000",
      label: "CompletedTypeyType10000",
    });
  }, []);

  return (
    <>
      Woohoo! You rock! You’ve successfully typed {format(",")(yourWordCount)}{" "}
      words. You are an accomplished stenographer now! You’ve completed 100% of
      10,000 words. It’s time to{" "}
    </>
  );
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
          <IntroToCelebrate10000Memorised yourWordCount={yourWordCount} />
        ) : (
          <IntroToCelebrate10000Typed yourWordCount={yourWordCount} />
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
