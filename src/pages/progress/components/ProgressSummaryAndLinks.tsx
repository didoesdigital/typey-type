import React, { useRef } from "react";
import PARAMS from "../../../utils/params.js";
import { Link } from "react-router-dom";

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
        <Link to="/lessons/progress/seen/">
          Revise&nbsp;{yourSeenWordCount} seen word
        </Link>
        .{" "}
        <Link
          to={
            "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
            PARAMS.discoverParams
          }
        >
          Discover new words
        </Link>
        .
      </p>
    );
  }
  if (yourSeenWordCount === 1 && yourMemorisedWordCount === 1) {
    progressSummaryAndLinks = (
      <p>
        You’ve successfully typed {yourWordCount} words without misstrokes.{" "}
        <Link to="/lessons/progress/memorised/">
          Drill&nbsp;{yourMemorisedWordCount} memorised word
        </Link>
        .{" "}
        <Link to="/lessons/progress/seen/">
          Revise&nbsp;{yourSeenWordCount} seen word
        </Link>
        .{" "}
        <Link
          to={
            "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
            PARAMS.discoverParams
          }
        >
          Discover new words
        </Link>
        .
      </p>
    );
  }
  if (yourSeenWordCount === 1 && yourMemorisedWordCount > 1) {
    progressSummaryAndLinks = (
      <p>
        You’ve successfully typed {yourWordCount} words without misstrokes.{" "}
        <Link to="/lessons/progress/memorised/">
          Drill&nbsp;{yourMemorisedWordCount} memorised words
        </Link>
        .{" "}
        <Link to="/lessons/progress/seen/">
          Revise&nbsp;{yourSeenWordCount} seen word
        </Link>
        .{" "}
        <Link
          to={
            "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
            PARAMS.discoverParams
          }
        >
          Discover new words
        </Link>
        .
      </p>
    );
  }
  if (yourSeenWordCount === 0 && yourMemorisedWordCount === 1) {
    progressSummaryAndLinks = (
      <p>
        You’ve successfully typed {yourWordCount} word without misstrokes.{" "}
        <Link to="/lessons/progress/memorised/">
          Drill&nbsp;{yourMemorisedWordCount} memorised word
        </Link>
        .{" "}
        <Link
          to={
            "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
            PARAMS.discoverParams
          }
        >
          Discover new words
        </Link>
        .
      </p>
    );
  }
  if (yourSeenWordCount === 0 && yourMemorisedWordCount > 1) {
    progressSummaryAndLinks = (
      <p>
        You’ve successfully typed {yourWordCount} words without misstrokes.{" "}
        <Link to="/lessons/progress/memorised/">
          Drill&nbsp;{yourMemorisedWordCount} memorised words
        </Link>
        .{" "}
        <Link
          to={
            "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
            PARAMS.discoverParams
          }
        >
          Discover new words
        </Link>
        .
      </p>
    );
  }
  if (yourSeenWordCount > 1 && yourMemorisedWordCount === 0) {
    progressSummaryAndLinks = (
      <p>
        You’ve successfully typed {yourWordCount} words without misstrokes.
        You’re {progressPercent}% of the way to 10,000 words.{" "}
        <Link to="/lessons/progress/seen/">
          Revise&nbsp;{yourSeenWordCount} seen words
        </Link>
        .{" "}
        <Link
          to={
            "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
            PARAMS.discoverParams
          }
        >
          Discover new words
        </Link>
        .
      </p>
    );
  }
  if (yourSeenWordCount > 1 && yourMemorisedWordCount === 1) {
    progressSummaryAndLinks = (
      <p>
        You’ve successfully typed {yourWordCount} words without misstrokes.
        You’re {progressPercent}% of the way to 10,000 words.{" "}
        <Link to="/lessons/progress/">Practice&nbsp;your words</Link>.{" "}
        <Link to="/lessons/progress/memorised/">
          Drill&nbsp;{yourMemorisedWordCount} memorised word
        </Link>
        .{" "}
        <Link to="/lessons/progress/seen/">
          Revise&nbsp;{yourSeenWordCount} seen words
        </Link>
        .{" "}
        <Link
          to={
            "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
            PARAMS.discoverParams
          }
        >
          Discover new words
        </Link>
        .
      </p>
    );
  }
  if (yourSeenWordCount > 1 && yourMemorisedWordCount > 1) {
    progressSummaryAndLinks = (
      <p>
        You’ve successfully typed {yourWordCount} words without misstrokes.
        You’re {progressPercent}% of the way to 10,000 words.{" "}
        <Link to="/lessons/progress/">Practice&nbsp;your words</Link>.{" "}
        <Link to="/lessons/progress/memorised/">
          Drill&nbsp;{yourMemorisedWordCount} memorised words
        </Link>
        .{" "}
        <Link to="/lessons/progress/seen/">
          Revise&nbsp;{yourSeenWordCount} seen words
        </Link>
        .{" "}
        <Link
          to={
            "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
            PARAMS.discoverParams
          }
        >
          Discover new words
        </Link>
        .
      </p>
    );
  }

  return progressSummaryAndLinks;
};

export default ProgressSummaryAndLinks;
