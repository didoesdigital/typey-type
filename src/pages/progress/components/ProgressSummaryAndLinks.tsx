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

type LessonLinkProps = {
  yourWordCount: number;
  yourMemorisedWordCount: number;
  yourSeenWordCount: number;
};

const getPracticeAllLink = (seen: number, memorised: number) =>
  seen > 1 && memorised > 0 ? (
    <>
      <Link to="/lessons/progress/">Practice&nbsp;your words</Link>.{" "}
    </>
  ) : null;

const getDrillMemorisedLink = (memorised: number) =>
  memorised > 0 ? (
    <>
      <Link to="/lessons/progress/memorised/">
        Drill&nbsp;{memorised} memorised word
      </Link>
      .{" "}
    </>
  ) : null;

const getReviseSeenLink = (seen: number) =>
  seen > 0 ? (
    <>
      <Link to="/lessons/progress/seen/">Revise&nbsp;{seen} seen words</Link>.{" "}
    </>
  ) : null;

const getDiscoverNewLink = (yourWordCount: number) =>
  yourWordCount < 10000 ? (
    <>
      <Link
        to={
          "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
          PARAMS.discoverParams
        }
      >
        Discover new words
      </Link>
      .
    </>
  ) : null;

const ProgressLessonLinks = ({
  yourWordCount,
  yourSeenWordCount,
  yourMemorisedWordCount,
}: LessonLinkProps) => {
  return (
    <>
      {[
        <React.Fragment key="practice-all">
          {getPracticeAllLink(yourSeenWordCount, yourMemorisedWordCount)}
        </React.Fragment>,
        <React.Fragment key="drill-memorised">
          {getDrillMemorisedLink(yourMemorisedWordCount)}
        </React.Fragment>,
        <React.Fragment key="revise-seen">
          {getReviseSeenLink(yourSeenWordCount)}
        </React.Fragment>,
        <React.Fragment key="discover-new">
          {getDiscoverNewLink(yourWordCount)}
        </React.Fragment>,
      ]}
    </>
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
