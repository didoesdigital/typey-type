import React from "react";
import { Link } from "react-router-dom";
import Checkmark from "../../../components/Icons/icon-images/Checkmark.svg";
import TriangleRight from "../../../components/Icons/icon-images/TriangleRight.svg";
import Icon from "../../../components/Icons/Icon";
import Tooltip from "../../../components/Tooltip";
import slugifyTitle from "../../../utils/slugifyTitle";

import type { LessonIndexEntry, LessonsProgressIndex } from "../../../types";

type Props = {
  lessonIndex: LessonIndexEntry[];
  lessonsProgress: LessonsProgressIndex;
};

const LessonsProgress = ({ lessonIndex, lessonsProgress }: Props) => {
  function progressIconClasses(color: string) {
    return (
      `text-${color}-600 ` +
      "progress-circle " +
      "relative " +
      "svg-baseline " +
      "svg-icon-wrapper"
    );
  }

  function unstarted(id: string) {
    return (
      <div className="dib">
        <div
          data-tooltip-id={id}
          data-tooltip-content={"Unstarted"}
          tabIndex={0}
          className={progressIconClasses("violet")}
        />
        <Tooltip id={id} />
      </div>
    );
  }

  function inProgress(id: string) {
    return (
      <div className="dib">
        <div
          data-tooltip-id={id}
          data-tooltip-content={"In progress"}
          tabIndex={0}
          className={progressIconClasses("violet")}
        >
          <Icon
            iconSVGImport={TriangleRight}
            width="1em"
            height="1em"
            style={{ transform: "translateX(0.025em) scale(0.6)" }}
          />
        </div>
        <Tooltip id={id} />
      </div>
    );
  }

  function lessonComplete(id: string) {
    return (
      <div className="dib">
        <div
          data-tooltip-id={id}
          data-tooltip-content={"100 words done or lesson complete"}
          tabIndex={0}
          className={progressIconClasses("green")}
        >
          <Icon
            iconSVGImport={Checkmark}
            width="1em"
            height="1em"
            style={{ transform: "scale(0.6)" }}
          />
        </div>
        <Tooltip id={id} />
      </div>
    );
  }

  const linkList = lessonIndex.map((lesson) => {
    let htmlIdForLesson = slugifyTitle(
      lesson.path.slice(1).replace("/lesson.txt", "")
    );
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
        lessonCompletion = lessonComplete(htmlIdForLesson);
      } else if (numberOfWordsSeenOrMemorised > 0) {
        lessonCompletion = inProgress(htmlIdForLesson);
      } else {
        lessonCompletion = unstarted(htmlIdForLesson);
      }
    } else {
      lessonCompletion = unstarted(htmlIdForLesson);
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
