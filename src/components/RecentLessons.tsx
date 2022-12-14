import React, { useEffect, useState } from "react";
import PARAMS from "../utils/params.js";
import { Link } from "react-router-dom";
import type { LessonIndexEntry, Study } from "../types";

type RecentLessonIndex = Pick<LessonIndexEntry, "path" | "title">;

type Props = {
  recentLessonHistory: any;
  lessonIndex: RecentLessonIndex[];
};

const RecentLessons = ({ recentLessonHistory, lessonIndex }: Props) => {
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
      .filter((recentLesson: any) =>
        lessonIndex.find(
          (lesson) =>
            recentLesson.path.includes("/lessons/progress") ||
            lesson.path ===
              recentLesson.path.replace("/lessons", "") + "lesson.txt"
        )
      )
      .map((recentLesson: any) => {
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

        let studyType: Study = "practice";
        // NOTE: does not check if studyType is legit
        if (recentLesson && recentLesson.studyType) {
          studyType = recentLesson.studyType;
        }

        const studyTypeKey: keyof typeof PARAMS = `${studyType}Params`;

        return lesson ? (
          <li className="unstyled-list-item mb1" key={lesson.path}>
            <Link
              to={
                "/lessons" +
                lesson.path
                  .replace(/lesson\.txt$/, "")
                  .replace(/\/{2,}/g, "/") +
                "?recent=1&" +
                PARAMS[studyTypeKey]
              }
              id={"ga--recent-lessons--" + lesson.path.replace(/[/.]/g, "-")}
            >
              {lesson.title}
            </Link>
          </li>
        ) : undefined;
      })
      .filter(Boolean) // guard against undefined result from find
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
