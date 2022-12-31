import React from "react";
import PARAMS from "../../../utils/params.js";
import { Link } from "react-router-dom";
import ProgressSummaryCompleted from "./ProgressSummaryCompleted";

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
