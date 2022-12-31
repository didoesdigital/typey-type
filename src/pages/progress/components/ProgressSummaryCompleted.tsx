import React, { useRef } from "react";
import { Link } from "react-router-dom";

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
  const celebrateButton = useRef<HTMLButtonElement>(null);

  return yourMemorisedWordCount >= 10000 ? (
    <React.Fragment>
      <p>
        Woohoo! You rock! What a magnificent effort to memorise 10,000 words.
        You are an expert stenographer now! You’ve successfully typed{" "}
        {yourWordCount} words without misstrokes. It’s time to{" "}
        <button
          className="button-that-looks-like-a-link"
          ref={celebrateButton}
          id="celebrate-button"
          onClick={restartConfetti}
          onKeyDown={restartConfetti}
        >
          celebrate!
        </button>
      </p>
      <p>
        <Link to="/lessons/progress/">Practice&nbsp;your words</Link>.{" "}
        <Link to="/lessons/progress/memorised/">
          Drill&nbsp;{yourMemorisedWordCount} memorised words
        </Link>
        .
      </p>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <p>
        Woohoo! You rock! You’ve successfully typed {yourWordCount} words
        without misstrokes. You are an accomplished stenographer now! You’ve
        completed 100% of 10,000 words. It’s time to{" "}
        <button
          className="button-that-looks-like-a-link"
          ref={celebrateButton}
          id="celebrate-button"
          onClick={restartConfetti}
          onKeyDown={restartConfetti}
        >
          celebrate!
        </button>
      </p>
      <p>
        <Link to="/lessons/progress/">Practice&nbsp;your words</Link>.{" "}
        <Link to="/lessons/progress/memorised/">
          Drill&nbsp;{yourMemorisedWordCount} memorised words
        </Link>
        .{" "}
        <Link to="/lessons/progress/seen/">
          Revise&nbsp;{yourSeenWordCount} seen words
        </Link>
        .
      </p>
    </React.Fragment>
  );
};

export default ProgressSummaryCompleted;
