import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import Subheader from "../../../components/Subheader";
import type { PrettyLessonTitle } from "types";

type LessonSubheaderProps = {
  createNewCustomLesson: JSX.Element | undefined;
  stopLesson: () => void;
  lessonSubTitle: string;
  lessonTitle: PrettyLessonTitle;
  overviewLink: JSX.Element | undefined;
  path: string;
  restartLesson: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const LessonSubheader = forwardRef(
  (
    {
      createNewCustomLesson,
      stopLesson,
      lessonSubTitle,
      lessonTitle,
      overviewLink,
      path,
      restartLesson,
    }: LessonSubheaderProps,
    ref: any
  ) => {
    return (
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <a
              href={path}
              onClick={restartLesson}
              className="heading-link table-cell mr2"
              role="button"
            >
              <h2
                ref={ref}
                tabIndex={-1}
              >{`${lessonTitle}${lessonSubTitle}`}</h2>
            </a>
          </header>
        </div>
        <div className="flex flex-wrap mxn2">
          {createNewCustomLesson ? createNewCustomLesson : undefined}
          {overviewLink ? overviewLink : undefined}
          {path && !path.includes("custom") && !path.includes("progress") ? (
            <Link
              to={path
                .replace("lesson.txt", "flashcards")
                .replace("/typey-type", "")}
              className="link-button link-button-ghost table-cell mr1"
            >
              Flashcards
            </Link>
          ) : null}
          <a
            href={path.replace(/lesson\.txt$/, "")}
            onClick={restartLesson}
            className="button button--secondary table-cell mr2"
            style={{ lineHeight: 2 }}
            role="button"
          >
            Restart
          </a>
          <a
            href={path}
            onClick={(evt) => {
              evt.preventDefault();
              stopLesson();
            }}
            className="button button--secondary table-cell mr2"
            style={{ lineHeight: 2 }}
            role="button"
          >
            Stop
          </a>
        </div>
      </Subheader>
    );
  }
);

export default LessonSubheader;
