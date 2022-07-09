import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GoogleAnalytics from "react-ga";
import { IconExternal } from "../../components/Icon";
import LessonList from "./LessonList";
import { Tooltip } from "react-tippy";

type LessonsIndexProps = {
  customLesson: any;
  lessonIndex: any;
  match: any;
  setAnnouncementMessage: any;
  stopLesson: any;
};

const LessonsIndex = ({
  customLesson,
  lessonIndex,
  match,
  setAnnouncementMessage,
  stopLesson,
}: LessonsIndexProps) => {
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  return (
    <main id="main">
      <div className="subheader">
        <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
          <div className="flex mr1 self-center">
            <header className="flex items-center min-h-40">
              <h2 ref={mainHeading} tabIndex={-1}>
                Lessons
              </h2>
            </header>
          </div>
        </div>
      </div>
      <div className="p3 mx-auto mw-1024">
        <div className="flex flex-wrap justify-between">
          <div className="mw-584 flex-grow">
            <h3>Typey&nbsp;Type lessons</h3>
            <LessonList lessonIndex={lessonIndex} url={match.url} />
          </div>
          <div className="mt1 mw-336 flex-grow">
            <h3 className="mt3">Custom lessons</h3>
            <p>
              To help Typey&nbsp;Type grow even faster, add your custom lessons
              to the{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="community's lessons"
                to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                community’s lessons
                {/* @ts-ignore theme and trigger wrong: https://github.com/tvkhoa/react-tippy/blob/c6e6169e3f2cabe05f1bfbd7e0dea1ddef4debe8/index.d.ts */}
                <Tooltip
                  title="Opens in a new tab"
                  animation="shift"
                  arrow="true"
                  className=""
                  duration="200"
                  tabIndex="0"
                  tag="span"
                  theme="didoesdigital"
                  trigger="mouseenter focus click"
                  onShow={setAnnouncementMessage}
                >
                  <IconExternal
                    ariaHidden="true"
                    role="presentation"
                    iconWidth="24"
                    iconHeight="24"
                    className="ml1 svg-icon-wrapper svg-baseline"
                    iconTitle=""
                  />
                </Tooltip>
              </GoogleAnalytics.OutboundLink>
              .
            </p>
            <p>
              The community lessons include extra topics like spacing,
              capitalisation, quotations, and using{" "}
              <span className="steno-stroke steno-stroke--subtle px05">
                SPWER
              </span>{" "}
              for “inter-”/“enter-” words.
            </p>
            <p>
              <Link
                to={`${match.url}/custom/setup`.replace(/\/{2,}/g, "/")}
                className="link-button dib"
                style={{ lineHeight: 2 }}
                id="ga--lesson-index--create-a-custom-lesson"
              >
                Create a custom lesson
              </Link>
              {customLesson.title !== "Steno" ? (
                <Link
                  to={`${match.url}/custom?study=discover&newWords=1&seenWords=1&retainedWords=1&sortOrder=sortOff&startFromWord=1`.replace(
                    /\/{2,}/g,
                    "/"
                  )}
                  onClick={stopLesson}
                  className="dib ml2"
                >
                  Start custom lesson
                </Link>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
// There are also <Link to="/support#palantype">palantype</Link> lessons available.

export default LessonsIndex;
