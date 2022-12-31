import React, { useRef } from "react";
import PARAMS from "../../../utils/params.js";
import { Link } from "react-router-dom";

type Props = {
  yourWordCount: number;
  yourMemorisedWordCount: number;
  yourSeenWordCount: number;
};

const ProgressSummaryAndLinks = ({
  yourSeenWordCount,
  yourMemorisedWordCount,
  yourWordCount,
}: Props) => {
  const celebrateButton = useRef<HTMLButtonElement>(null);
  const progressPercent = 5;

  let progressSummaryAndLinks = (
    <p>
      You’ve successfully typed {yourWordCount} words without hints or
      misstrokes.
    </p>
  );

  if (yourWordCount >= 10000) {
    if (yourMemorisedWordCount >= 10000) {
      progressSummaryAndLinks = (
        <React.Fragment>
          <p>
            Woohoo! You rock! What a magnificent effort to memorise 10,000
            words. You are an expert stenographer now! You’ve successfully typed{" "}
            {yourWordCount} words without misstrokes. It’s time to{" "}
            <button
              className="button-that-looks-like-a-link"
              ref={celebrateButton}
              id="celebrate-button"
              onClick={() => console.log("TODO: CONFETTI")}
              onKeyDown={() => console.log("TODO: CONFETTI")}
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
      );
    } else {
      progressSummaryAndLinks = (
        <React.Fragment>
          <p>
            Woohoo! You rock! You’ve successfully typed {yourWordCount} words
            without misstrokes. You are an accomplished stenographer now! You’ve
            completed 100% of 10,000 words. It’s time to{" "}
            <button
              className="button-that-looks-like-a-link"
              ref={celebrateButton}
              id="celebrate-button"
              onClick={() => console.log("TODO: CONFETTI")}
              onKeyDown={() => console.log("TODO: CONFETTI")}
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
    }
  } else {
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
  }

  return progressSummaryAndLinks;
};

export default ProgressSummaryAndLinks;
