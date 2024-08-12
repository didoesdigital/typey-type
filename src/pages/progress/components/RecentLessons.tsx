import React from "react";
import PARAMS from "../../../utils/params.js";
import { Link } from "react-router-dom";
import type {
  LessonIndexEntry,
  LessonPathWithoutBasenameOrFilename,
  Study,
} from "../../../types";
import { recentLessonHistoryState } from "../../../states/recentLessonHistoryState";
import { useAtomValue } from "jotai";

type RecentLessonIndex = Pick<LessonIndexEntry, "path" | "title">;

/** The most *recent* lesson is the *last* history item in the array */
export type RecentLessonHistory = RecentLessonHistoryItem[];

export type RecentLessonHistoryItem = {
  path: LessonPathWithoutBasenameOrFilename;
  studyType: Study;
};

type Props = {
  lessonIndex: RecentLessonIndex[];
};

const RecentLessons = ({ lessonIndex }: Props) => {
  const recentLessonHistory = useAtomValue(recentLessonHistoryState)?.history;

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
  ) : null;

  return recentLessons;
};

export default RecentLessons;
