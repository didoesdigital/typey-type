import React from "react";
import PARAMS, { createParamString } from "../../../utils/params.js";
import { Link } from "react-router-dom";

import type { UserSettings } from "../../../types";

type LessonLinkProps = {
  userSettings: UserSettings;
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
        Drill&nbsp;{memorised} memorised word{memorised === 1 ? "" : "s"}
      </Link>
      .{" "}
    </>
  ) : null;

const getReviseSeenLink = (seen: number) =>
  seen > 0 ? (
    <>
      <Link to="/lessons/progress/seen/">
        Revise&nbsp;{seen} seen word{seen === 1 ? "" : "s"}
      </Link>
      .{" "}
    </>
  ) : null;

const getDiscoverNewLink = (
  yourWordCount: number,
  userSettings: UserSettings
) => {
  const defaultDiscoverParams = PARAMS.discover;
  const userDiscoverParams = userSettings.studyPresets?.[0] ?? {
    limitNumberOfWords: 5,
    repetitions: 3,
  };
  const combinedDiscoverParams = {
    ...defaultDiscoverParams,
    ...userDiscoverParams,
  };
  const discoverParamsString = createParamString(combinedDiscoverParams);

  return yourWordCount < 10000 && yourWordCount > 0 ? (
    <>
      <Link
        to={
          "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
          discoverParamsString
        }
      >
        Discover new words
      </Link>
      .
    </>
  ) : null;
};

const ProgressLessonLinks = ({
  userSettings,
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
          {getDiscoverNewLink(yourWordCount, userSettings)}
        </React.Fragment>,
      ]}
    </>
  );
};

export default ProgressLessonLinks;
