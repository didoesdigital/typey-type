import React from "react";
import PARAMS from "../utils/params.js";
import { Link } from "react-router-dom";
import type {
  LessonIndexEntry,
  LessonPathWithoutBasenameAndWithFilename,
  Study,
} from "../types";

type RecentLessonIndex = Pick<LessonIndexEntry, "path" | "title">;

type RecentLessonHistoryItem = {
  path: LessonPathWithoutBasenameAndWithFilename;
  studyType: Study;
};

type Props = {
  recentLessonHistory: RecentLessonHistoryItem[];
  lessonIndex: RecentLessonIndex[];
};

const RecentLessons = ({ recentLessonHistory, lessonIndex }: Props) => {
  const hasRecentLessons =
    recentLessonHistory &&
    recentLessonHistory.length > 0 &&
    recentLessonHistory[0] &&
    recentLessonHistory[0].path;

  const linkList = hasRecentLessons
    ? recentLessonHistory
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
            const path = recentLesson.path.replace("/lessons", "");
            const title = path.includes("memorised")
              ? "Your memorised words"
              : path.includes("seen")
              ? "Your revision words"
              : "Your words";

            lesson = {
              path,
              title,
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
        .reverse()
    : undefined;

  const recentLessons = hasRecentLessons ? (
    <React.Fragment>
      <h3>Recent lessons</h3>
      <ul className="unstyled-list">{linkList}</ul>
    </React.Fragment>
  ) : undefined;

  return recentLessons;
};

export default RecentLessons;
