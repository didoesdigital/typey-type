import React from "react";
import { IconCheckmark, IconTriangleRight } from "../../../components/Icon";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";

import type { LessonIndexEntry, LessonsProgressIndex } from "../../../types";

type Props = {
  lessonIndex: LessonIndexEntry[];
  lessonsProgress: LessonsProgressIndex;
  setAnnouncementMessage: () => void;
};

type ProgressTooltipProps = {
  title: string;
  onShow: () => void;
  children: JSX.Element | JSX.Element[];
};

const ProgressTooltip = ({ title, onShow, children }: ProgressTooltipProps) => {
  return (
    // @ts-ignore
    <Tooltip
      title={title}
      className=""
      animation="shift"
      arrow="true"
      duration="200"
      tabIndex={0}
      tag="span"
      theme="didoesdigital didoesdigital-sm"
      trigger="mouseenter focus click"
      onShow={onShow}
    >
      {children}
    </Tooltip>
  );
};

const LessonsProgress = ({
  lessonIndex,
  lessonsProgress,
  setAnnouncementMessage,
}: Props) => {
  function progressIconClasses(color: string) {
    return (
      `text-${color}-600 ` +
      "progress-circle " +
      "svg-baseline " +
      "svg-icon-wrapper"
    );
  }

  function unstarted() {
    return (
      <ProgressTooltip title="Unstarted" onShow={setAnnouncementMessage}>
        <div aria-hidden="true" className={progressIconClasses("violet")} />
        <span className="visually-hidden">Unstarted</span>
      </ProgressTooltip>
    );
  }

  function inProgress() {
    return (
      <ProgressTooltip title="In progress" onShow={setAnnouncementMessage}>
        <IconTriangleRight
          ariaHidden="true"
          role="presentation"
          className={progressIconClasses("violet")}
          iconTitle=""
        />
        <span className="visually-hidden">In progress</span>
      </ProgressTooltip>
    );
  }

  function lessonComplete() {
    return (
      <ProgressTooltip
        title="100 words done or lesson complete"
        onShow={setAnnouncementMessage}
      >
        <IconCheckmark
          ariaHidden="true"
          role="presentation"
          className={progressIconClasses("green")}
          iconWidth="16"
          iconHeight="16"
          iconTitle=""
        />
        <span className="visually-hidden">
          100 words done or lesson complete
        </span>
      </ProgressTooltip>
    );
  }

  const linkList = lessonIndex.map((lesson) => {
    let lessonsubtitle = "";
    let wordCountDenominator = 0;
    let numberOfWordsSeenOrMemorised = 0;
    let lessonCompletion;
    if (lesson.subtitle && lesson.subtitle.length > 0) {
      lessonsubtitle = ": " + lesson.subtitle;
    }
    if (lesson.wordCount && lesson.wordCount > 0) {
      wordCountDenominator = lesson.wordCount;
    }
    if (
      lessonsProgress &&
      lessonsProgress[process.env.PUBLIC_URL + "/lessons" + lesson.path]
    ) {
      let toDiscover =
        lessonsProgress[process.env.PUBLIC_URL + "/lessons" + lesson.path]
          ?.numberOfWordsToDiscover || 0;
      let seen =
        lessonsProgress[process.env.PUBLIC_URL + "/lessons" + lesson.path]
          ?.numberOfWordsSeen || 0;
      let memorised =
        lessonsProgress[process.env.PUBLIC_URL + "/lessons" + lesson.path]
          ?.numberOfWordsMemorised || 0;
      numberOfWordsSeenOrMemorised = seen + memorised;
      wordCountDenominator = seen + memorised + toDiscover;
      if (
        numberOfWordsSeenOrMemorised >= wordCountDenominator ||
        numberOfWordsSeenOrMemorised > 100
      ) {
        if (numberOfWordsSeenOrMemorised >= wordCountDenominator) {
          numberOfWordsSeenOrMemorised = wordCountDenominator;
        }
        lessonCompletion = lessonComplete();
      } else if (numberOfWordsSeenOrMemorised > 0) {
        lessonCompletion = inProgress();
      } else {
        lessonCompletion = unstarted();
      }
    } else {
      lessonCompletion = unstarted();
    }
    if (
      lesson.category === "Fundamentals" ||
      (lesson.category === "Drills" && lesson.title.startsWith("Top 100")) ||
      (lesson.category === "Drills" && lesson.title.startsWith("Top 200"))
    ) {
      return (
        <li className="unstyled-list-item mb1" key={lesson.path}>
          {lessonCompletion}{" "}
          <Link
            to={`/lessons${lesson.path}`
              .replace(/lesson\.txt$/, "")
              .replace(/\/{2,}/g, "/")}
            id={
              "ga--lesson-index-" +
              lesson.path.replace(/\/lesson\.txt/g, "").replace(/[/.]/g, "-")
            }
          >
            {lesson.title}
            {lessonsubtitle}
          </Link>{" "}
          ·{" "}
          <small>
            {numberOfWordsSeenOrMemorised} of {wordCountDenominator}
          </small>
        </li>
      );
    } else {
      return "";
    }
  });

  return <>{linkList}</>;
};

export default LessonsProgress;
