import React, { useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import OutboundLink from "../../components/OutboundLink";
import LessonList from "./components/LessonList";
import Subheader from "../../components/Subheader";
import { useAppMethods } from "../../states/legacy/AppMethodsContext";

type LessonsIndexProps = {
  customLesson: any;
};

const LessonsIndex = ({ customLesson }: LessonsIndexProps) => {
  const { stopLesson } = useAppMethods();
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  const match = useRouteMatch({
    path: "/lessons",
    strict: true,
    sensitive: true,
  });
  const url = match?.url ?? "";

  return (
    <main id="main">
      <Subheader>
        <div className="flex flex-wrap mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1}>
              Lessons
            </h2>
          </header>
        </div>
        <div className="flex flex-wrap mxn2">
          {customLesson.title !== "Steno" ? (
            <Link
              to={`${url}/custom?study=discover&newWords=1&seenWords=1&retainedWords=1&startFromWord=1`.replace(
                /\/{2,}/g,
                "/"
              )}
              onClick={stopLesson}
              className="dib ml1 link-button link-button-ghost table-cell mr1"
            >
              Start custom lesson
            </Link>
          ) : null}
          <Link
            to={`${url}/custom/setup`.replace(/\/{2,}/g, "/")}
            className="link-button button button--secondary table-cell mr2 ml1"
            style={{ lineHeight: 2 }}
            id="ga--lesson-index--create-a-custom-lesson"
          >
            Create a custom lesson
          </Link>
        </div>
      </Subheader>
      <div className="p3 mx-auto mw-1024">
        <h3>Typey&nbsp;Type lessons</h3>
        <LessonList url={url} />
        <div className="mw-584">
          <h3 className="mt3 pt6">Community lessons</h3>
          <p className="text-balance">
            The Typey&nbsp;Type community lessons cover topics like spacing,
            capitalisation, quotations, and using{" "}
            <span className="steno-stroke steno-stroke--subtle px05">
              SPWER
            </span>{" "}
            for “inter-” and “enter-” words. To help Typey&nbsp;Type grow even
            faster, add your custom lessons to the{" "}
            <OutboundLink
              eventLabel="community's lessons"
              to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
              newTabAndIUnderstandTheAccessibilityImplications={true}
            >
              community’s lessons (opens in new tab)
            </OutboundLink>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

export default LessonsIndex;
