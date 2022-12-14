import React, { useEffect, useState } from "react";
import PARAMS from "../utils/params.js";
import { Link } from "react-router-dom";

const RecentLessons = ({ recentLessonHistory, lessonIndex }) => {
  const [hasRecentLessons, setHasRecentLessons] = useState(false);

  useEffect(() => {
    if (
      recentLessonHistory &&
      recentLessonHistory.length > 0 &&
      recentLessonHistory[0] &&
      recentLessonHistory[0].path
    ) {
      setHasRecentLessons(true);
    }
  }, [recentLessonHistory]);

  let recentLessons = null;

  if (hasRecentLessons) {
    const linkList = recentLessonHistory
      .filter((recentLesson) =>
        lessonIndex.find(
          (lesson) =>
            recentLesson.path.includes("/lessons/progress") ||
            lesson.path ===
              recentLesson.path.replace("/lessons", "") + "lesson.txt"
        )
      )
      .map((recentLesson) => {
        let lesson = lessonIndex.find(
          (lesson) =>
            lesson.path ===
            recentLesson.path.replace("/lessons", "") + "lesson.txt"
        );

        if (recentLesson.path.includes("/lessons/progress")) {
          let path = recentLesson.path.replace("/lessons", "");
          let title = "Your words";
          if (path.includes("memorised")) {
            title = "Your memorised words";
          }
          if (path.includes("seen")) {
            title = "Your revision words";
          }

          lesson = {
            path: path,
            title: title,
          };
        }

        let studyType = "practice";
        // NOTE: does not check if studyType is legit
        if (recentLesson && recentLesson.studyType) {
          studyType = recentLesson.studyType;
        }

        return (
          <li className="unstyled-list-item mb1" key={lesson.path}>
            <Link
              to={
                "/lessons" +
                lesson.path
                  .replace(/lesson\.txt$/, "")
                  .replace(/\/{2,}/g, "/") +
                "?recent=1&" +
                PARAMS[studyType + "Params"]
              }
              id={"ga--recent-lessons--" + lesson.path.replace(/[/.]/g, "-")}
            >
              {lesson.title}
            </Link>
          </li>
        );
      })
      .reverse();

    recentLessons = (
      <React.Fragment>
        <h3>Recent lessons</h3>
        <ul className="unstyled-list">{linkList}</ul>
      </React.Fragment>
    );
  }

  return hasRecentLessons ? recentLessons : null;
};

export default RecentLessons;
