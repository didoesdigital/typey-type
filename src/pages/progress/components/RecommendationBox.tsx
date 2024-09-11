import React, { useEffect, useRef, useState } from "react";
import GoogleAnalytics from "react-ga4";
import OutboundLink from "../../../components/OutboundLink";
import RecommendationDescription from "./RecommendationDescription";
import { Link, Redirect } from "react-router-dom";
import { useAnnouncerApi } from "../../../components/Announcer/useAnnouncer";

import type { FullRecommendationsStudyType, MetWords } from "../../../types";
import { useAtom, useSetAtom } from "jotai";
import { revisionModeState } from "../../../states/lessonState";
import { useLessonIndex } from "../../../states/lessonIndexState";
import { getRecommendedNextLesson } from "../../../utils/recommendations";
import { useRecommendedCourses } from "../../../states/recommendedCoursesState";
import {
  recommendationHistoryState,
  recommendedNextLessonState,
} from "../../../states/recommendationsState";
import RecommendationBoxFallback from "./RecommendationBoxFallback";

/**
 * Examples:
 * "https://play.typeracer.com/?universe=steno"
 * "/lessons/stories/proverbs/proverbs-starting-with-p/?recommended=true&study=practice&showStrokes=0&hideStrokesOnLastRepetition=1&newWords=1&seenWords=1&retainedWords=1&repetitions=1&limitNumberOfWords=0&sortOrder=sortOff"
 */
type RecommendationLink = string;

export type RecommendedNextLesson = {
  /** Example: 15 */
  limitNumberOfWords: number | null;
  /** Example: 3 */
  repetitions: number | null;
  studyType: FullRecommendationsStudyType;
  /** Example: "One-syllable words with simple keys" */
  lessonTitle?: string; // FIXME: may not exist?
  link: RecommendationLink;
  /** Examples: "Proverbs starting with P" | "Play Type Racer" */
  linkTitle: string;
  /** Examples: "Practice Proverbs starting with P" | "Discover" */
  linkText?: string; // FIXME: may not be used?
};

export type RecommendationHistory = {
  currentStep: FullRecommendationsStudyType | null;
};

type Props = {
  lessonsProgress: any;
  yourMemorisedWordCount: number;
  yourSeenWordCount: number;
  metWords: MetWords;
};

const RecommendationBox = ({
  lessonsProgress,
  yourSeenWordCount,
  yourMemorisedWordCount,
  metWords,
}: Props) => {
  const [toRecommendedNextLesson, setToRecommendedNextLesson] = useState(false);
  const lessonIndex = useLessonIndex();
  const recommendedCourses = useRecommendedCourses();
  const setRevisionMode = useSetAtom(revisionModeState);
  const { updateMessage } = useAnnouncerApi();
  const firstRecommendationBoxRender = useRef(true);
  const [recommendationHistory, setRecommendationHistory] = useAtom(
    recommendationHistoryState
  );
  const [recommendedNextLesson, setRecommendedNextLesson] = useAtom(
    recommendedNextLessonState
  );

  useEffect(() => {
    try {
      if (recommendationHistory?.["currentStep"] === null) {
        setRevisionMode(false);
        updateRecommendationHistory(recommendationHistory);
      }
    } catch (e: any) {
      console.error(e);
    }
    // TODO: review this:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // }, [recommendationHistory, setRevisionMode, updateRecommendationHistory]);

  useEffect(() => {
    if (firstRecommendationBoxRender.current) {
      firstRecommendationBoxRender.current = false;
    } else {
      setRevisionMode(false);
      updateRecommendationHistory(recommendationHistory);
    }
    // TODO: revisit this after reducing parent component re-renders and converting class component to function component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toRecommendedNextLesson]);

  function updateRecommendationHistory(
    prevRecommendationHistory: RecommendationHistory
  ) {
    let newRecommendationHistory = Object.assign({}, prevRecommendationHistory);

    if (
      typeof newRecommendationHistory["currentStep"] === "undefined" ||
      newRecommendationHistory["currentStep"] === null
    ) {
      newRecommendationHistory["currentStep"] = "break";
    }

    switch (newRecommendationHistory["currentStep"]) {
      case null:
        newRecommendationHistory["currentStep"] = "drill";
        break;
      case "practice":
        newRecommendationHistory["currentStep"] = "drill";
        break;
      case "drill":
        newRecommendationHistory["currentStep"] = "revise";
        break;
      case "revise":
        newRecommendationHistory["currentStep"] = "discover";
        break;
      case "discover":
        newRecommendationHistory["currentStep"] = "wildcard";
        break;
      case "wildcard":
        newRecommendationHistory["currentStep"] = "break";
        break;
      case "break":
        newRecommendationHistory["currentStep"] = "practice";
        break;
      default:
        newRecommendationHistory["currentStep"] = "practice";
        break;
    }

    const nextRecommendedLesson = getRecommendedNextLesson(
      recommendedCourses,
      lessonsProgress,
      newRecommendationHistory,
      yourSeenWordCount,
      yourMemorisedWordCount,
      lessonIndex,
      metWords
    );

    const typedNextRecommendedLesson =
      nextRecommendedLesson as RecommendedNextLesson;
    setRecommendationHistory(newRecommendationHistory);
    setRecommendedNextLesson(typedNextRecommendedLesson);

    // For new Typey Type students, there may be no valid practice/drill/revision recommendations so it may recommend "Discover" 4 times in a row. If the recommendation is the same as the previous recommendation, update the recommendation history again to skip ahead:
    let prevRecommendedLesson = recommendedNextLesson;
    if (
      prevRecommendedLesson.linkText === nextRecommendedLesson.linkText &&
      nextRecommendedLesson.studyType !== "error" &&
      nextRecommendedLesson.studyType !== "break"
    ) {
      updateRecommendationHistory(newRecommendationHistory);
    }
  }

  const recommendAnotherLesson = () => {
    GoogleAnalytics.event({
      category: "Recommendations",
      action: "Skip recommended",
      label: recommendedNextLesson?.link || "BAD_INPUT",
    });

    const element = document.getElementById("js-skip-button");
    if (element) {
      element.focus();
    }

    // Note: This is a hacky hack. It would be better to clean up the mess of
    // code handling recommendations and either have the code that gets the
    // recommendation call the announcer with the new recommendation (but not
    // when other actions fetch recommendations) or somehow get the *new*
    // recommendation from state/props/refs and announce it here instead of
    // relying on sketchy timeouts and querying the DOM.
    setTimeout(() => {
      const toAnnounce = document.getElementById(
        "js-next-recommended-link-text"
      );
      if (toAnnounce && toAnnounce.textContent !== "Loading…") {
        updateMessage(`Recommended: ${toAnnounce.textContent ?? ""}`);
      }
    }, 100);

    setRevisionMode(false);
    updateRecommendationHistory(recommendationHistory);
  };

  function startRecommendedStep(e: any) {
    GoogleAnalytics.event({
      category: "Recommendations",
      action: "Start recommended step",
      label: recommendedNextLesson.link || "BAD_INPUT",
    });

    if (recommendedNextLesson.link?.startsWith("http")) {
      setRevisionMode(false);
      // lets external link open in a new tab
      updateRecommendationHistory(recommendationHistory);
    } else {
      setToRecommendedNextLesson(true);
      // does not navigate using link but instead allows Router Redirect
      e.preventDefault();
    }
  }

  let recommendedNextLessonBox;
  let recommendedNextLessonHeading;
  let recommendedLink;
  let recommendedLinkTitle;
  let metadataStats;
  let studyType;
  let recommendedNextLessonCallToActionButton;
  let recommendedNextLessonHeadingClassNames =
    "mt0 pb1 bb b--brand-primary-tint mb3";

  if (!!recommendedNextLesson) {
    metadataStats = (
      <React.Fragment>
        {recommendedNextLesson.limitNumberOfWords}{" "}
        {recommendedNextLesson.limitNumberOfWords === 1 ? "word" : "words"} |{" "}
        {recommendedNextLesson.repetitions} repetitions
      </React.Fragment>
    );

    studyType = recommendedNextLesson.studyType;
    if (studyType === "error") {
      metadataStats = <React.Fragment>No recommendation.</React.Fragment>;
    } else if (studyType === "wildcard") {
      metadataStats = <React.Fragment>External link.</React.Fragment>;
    } else if (studyType === "game") {
      metadataStats = (
        <React.Fragment>
          Solve puzzles to exercise your steno knowledge
        </React.Fragment>
      );
    } else if (studyType === "compete") {
      metadataStats = (
        <React.Fragment>
          Increase your speed while racing against others
        </React.Fragment>
      );
    } else if (studyType === "break") {
      metadataStats = (
        <React.Fragment>
          Take 5&nbsp;minutes or come&nbsp;back in 4+&nbsp;hours.
        </React.Fragment>
      );
    } else if (recommendedNextLesson.repetitions === 1) {
      metadataStats = (
        <React.Fragment>
          {recommendedNextLesson.limitNumberOfWords}{" "}
          {recommendedNextLesson.limitNumberOfWords === 1 ? "word" : "words"} |{" "}
          {recommendedNextLesson.repetitions} repetition
        </React.Fragment>
      );
    }

    if (
      recommendedNextLesson?.lessonTitle &&
      recommendedNextLesson.lessonTitle.length < 10
    ) {
      metadataStats = (
        <React.Fragment>
          {recommendedNextLesson.limitNumberOfWords}{" "}
          {recommendedNextLesson.limitNumberOfWords === 1 ? "word" : "words"}{" "}
          <br /> {recommendedNextLesson.repetitions} repetitions
        </React.Fragment>
      );
      if (recommendedNextLesson.repetitions === 1) {
        metadataStats = (
          <React.Fragment>
            {recommendedNextLesson.limitNumberOfWords}{" "}
            {recommendedNextLesson.limitNumberOfWords === 1 ? "word" : "words"}{" "}
            <br /> {recommendedNextLesson.repetitions} repetition
          </React.Fragment>
        );
      }
    }

    switch (recommendedNextLesson.studyType) {
      case "error":
        recommendedNextLessonCallToActionButton = "Practice";
        recommendedNextLessonHeading = (
          <h3 className={recommendedNextLessonHeadingClassNames}>
            Recommended: error
          </h3>
        );
        break;
      case "practice":
        recommendedNextLessonCallToActionButton = "Practice";
        recommendedNextLessonHeading = (
          <h3 className={recommendedNextLessonHeadingClassNames}>
            Recommended: practice
          </h3>
        );
        break;
      case "drill":
        recommendedNextLessonCallToActionButton = "Drill";
        recommendedNextLessonHeading = (
          <h3 className={recommendedNextLessonHeadingClassNames}>
            Recommended: drill
          </h3>
        );
        break;
      case "revise":
        recommendedNextLessonCallToActionButton = "Revise";
        recommendedNextLessonHeading = (
          <h3 className={recommendedNextLessonHeadingClassNames}>
            Recommended: revise
          </h3>
        );
        break;
      case "discover":
        recommendedNextLessonCallToActionButton = "Discover";
        recommendedNextLessonHeading = (
          <h3 className={recommendedNextLessonHeadingClassNames}>
            Recommended: discover
          </h3>
        );
        break;
      case "break":
        recommendedNextLessonCallToActionButton = "Take a break";
        recommendedNextLessonHeading = (
          <h3 className={recommendedNextLessonHeadingClassNames}>
            Recommended: break
          </h3>
        );
        break;
      case "game":
        recommendedNextLessonCallToActionButton = "Play";
        recommendedNextLessonHeading = (
          <h3 className={recommendedNextLessonHeadingClassNames}>
            Recommended: game
          </h3>
        );
        break;
      case "compete":
        recommendedNextLessonCallToActionButton = "Compete";
        recommendedNextLessonHeading = (
          <h3 className={recommendedNextLessonHeadingClassNames}>
            Recommended: compete
          </h3>
        );
        break;
      default:
        recommendedNextLessonCallToActionButton = "Start now";
        recommendedNextLessonHeading = (
          <h3 className={recommendedNextLessonHeadingClassNames}>
            Recommended: practice
          </h3>
        );
        break;
    }

    if (recommendedNextLesson.link.startsWith("http")) {
      recommendedLink = (
        <OutboundLink
          eventLabel={recommendedNextLessonCallToActionButton}
          aria-label={
            recommendedNextLessonCallToActionButton +
            " (external link opens in new tab)"
          }
          to={recommendedNextLesson.link}
          onClick={startRecommendedStep}
          className="link-button dib"
          style={{ lineHeight: 2 }}
        >
          {recommendedNextLessonCallToActionButton} (opens in new tab)
        </OutboundLink>
      );
    } else {
      recommendedLink = (
        <Link
          onClick={startRecommendedStep}
          to={recommendedNextLesson.link}
          className="link-button dib"
          style={{ lineHeight: 2 }}
        >
          {recommendedNextLessonCallToActionButton}
        </Link>
      );
    }

    if (studyType === "error") {
      recommendedLinkTitle = "Unable to load recommendation";
      recommendedLink = (
        <a href="." className="link-button dib" style={{ lineHeight: 2 }}>
          Refresh
        </a>
      );
    } else {
      recommendedLinkTitle = recommendedNextLesson.linkTitle;
    }

    recommendedNextLessonBox = (
      <React.Fragment>
        <div className="panel bg-white dark:bg-coolgrey-1000 min-h-424 p5 mb3">
          {recommendedNextLessonHeading}
          <p className="mb0 mt4">
            <strong>{recommendedLinkTitle}</strong>
          </p>
          <p className="de-emphasized">{metadataStats}</p>
          <RecommendationDescription
            studyType={recommendedNextLesson.studyType}
          />
          <div className="flex flex-wrap gap-4">
            <div>{recommendedLink}</div>
            <button
              onClick={recommendAnotherLesson}
              id="js-skip-button"
              className="button button--secondary pl3 pr3"
            >
              Skip
            </button>
          </div>
          <div className="hide" id="js-next-recommended-link-text">
            {recommendedNextLesson.linkText}
          </div>
        </div>
        <div className="flex flex-wrap content-start-ns">
          <div className="flex flex-wrap"></div>
        </div>
      </React.Fragment>
    );
  } else {
    recommendedNextLessonBox = <RecommendationBoxFallback />;
  }

  if (toRecommendedNextLesson === true) {
    return <Redirect push to={recommendedNextLesson.link} />;
  }

  return <React.Fragment>{recommendedNextLessonBox}</React.Fragment>;
};

export default RecommendationBox;
