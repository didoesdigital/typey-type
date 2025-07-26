import React from "react";
import { Link } from "react-router-dom";

import type { LessonIndexEntry } from "types";

type InnerLessonListProps = {
  lessonIndex: LessonIndexEntry[];
};

const WordCount = ({ lesson }: { lesson: LessonIndexEntry }) => (
  <>{lesson.wordCount > 0 && ` · ${lesson.wordCount} words`}</>
);

const LessonLink = ({ lesson }: { lesson: LessonIndexEntry }) => (
  <Link
    to={`../${lesson.path}`.replace(/lesson\.txt$/, "").replace(/\/{2,}/g, "/")}
    id={
      "ga--lesson-index-" +
      lesson.path.replace(/\/lesson\.txt/g, "").replace(/[/.]/g, "-")
    }
  >
    {lesson.title}
    {lesson.subtitle?.length > 0 && `: ${lesson.subtitle}`}
  </Link>
);

export const InnerLessonList = ({ lessonIndex }: InnerLessonListProps) => (
  <ul className="unstyled-list">
    {lessonIndex.map((lesson) => (
      <li className="unstyled-list-item mb1" key={lesson.path}>
        <LessonLink lesson={lesson} />
        <WordCount lesson={lesson} />
      </li>
    ))}
  </ul>
);
