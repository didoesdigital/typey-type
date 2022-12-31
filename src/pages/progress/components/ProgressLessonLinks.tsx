import React from "react";
import PARAMS from "../../../utils/params.js";
import { Link } from "react-router-dom";

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

export default ProgressLessonLinks;
