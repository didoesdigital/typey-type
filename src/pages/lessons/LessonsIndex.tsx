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
                to={`${match.url}/custom?study=discover&newWords=1&seenWords=1&retainedWords=1&sortOrder=sortOff&startFromWord=1`.replace(
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
              to={`${match.url}/custom/setup`.replace(/\/{2,}/g, "/")}
              className="link-button dib button button--secondary table-cell mr2"
              style={{ lineHeight: 2 }}
              id="ga--lesson-index--create-a-custom-lesson"
            >
              Create a custom lesson
            </Link>
          </div>
        </div>
      </div>
      <div className="p3 mx-auto mw-1024">
        <h3>Typey&nbsp;Type lessons</h3>
        <LessonList lessonIndex={lessonIndex} url={match.url} />
        <div className="mw-584">
          <h3 className="mt3 pt6">Community lessons</h3>
          <p>
            The Typey&nbsp;Type community lessons cover topics like spacing,
            capitalisation, quotations, and using{" "}
            <span className="steno-stroke steno-stroke--subtle px05">
              SPWER
            </span>{" "}
            for “inter-” and “enter-” words. To help Typey&nbsp;Type grow even
            faster, add your custom lessons to the{" "}
            <GoogleAnalytics.OutboundLink
              eventLabel="community's lessons"
              to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              community’s{" "}
              <span className="nowrap">
                lessons
                {/* @ts-ignore */}
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
              </span>
            </GoogleAnalytics.OutboundLink>
            .
          </p>
        </div>
      </div>
    </main>
  );
};

export default LessonsIndex;
