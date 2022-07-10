import React, { useEffect, useRef } from "react";
import GoogleAnalytics from "react-ga";
import * as Sentry from "@sentry/browser";
import DocumentTitle from "react-document-title";
import { Link } from "react-router-dom";

type LessonNotFoundProps = {
  location: any;
  lessonIndex: any;
  path: any;
  restartLesson: any;
};

const LessonNotFound = ({
  location,
  lessonIndex,
  path,
  restartLesson,
}: LessonNotFoundProps) => {
  const mainHeading = useRef<HTMLHeadingElement>(null);
  const surveyLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let labelString = "That lesson not found";
    if (location && location.pathname) {
      labelString = location.pathname;
    }

    GoogleAnalytics.event({
      category: "Lesson not found",
      action: "Visited",
      label: labelString,
    });

    Sentry.captureException("Lesson not found");

    mainHeading.current?.focus();
  }, [location]);

  const prefillSurveyLink = () => {
    // fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=lesson&entry.1202724812&entry.936119214";
    let googleFormURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=";
    let param = "&entry.1202724812&entry.936119214";
    let prefillLesson = location.pathname;
    const newHref = googleFormURL + encodeURIComponent(prefillLesson) + param;
    if (surveyLink.current) {
      surveyLink.current.href = newHref;
    }
    return newHref;
  };

  let possibleBetterPath = "";
  let attemptedPathLessonTxt = "";
  let possibleBetterLessonTitle = "";
  if (location && location.pathname) {
    attemptedPathLessonTxt = location.pathname + "/lesson.txt";

    if (lessonIndex && lessonIndex.length > 0) {
      let length = lessonIndex.length;
      for (let i = 0; i < length; i++) {
        let tmpBetterPath = "/lessons" + lessonIndex[i].path;
        if (attemptedPathLessonTxt === tmpBetterPath) {
          possibleBetterPath = tmpBetterPath.replace("lesson.txt", "");
          possibleBetterLessonTitle = lessonIndex[i].title;
        }
      }
    }
  }

  return (
    <DocumentTitle title={"Typey Type | Missing Lesson"}>
      <main id="main">
        <div className="subheader">
          <div className="flex flex-wrap items-baseline mx-auto mw-1920 justify-between px3 py2">
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <a
                  href={path}
                  onClick={restartLesson}
                  className="heading-link table-cell mr2"
                  role="button"
                >
                  <h2 ref={mainHeading} tabIndex={-1}>
                    Lesson not found
                  </h2>
                </a>
              </header>
            </div>
          </div>
        </div>
        <div className="mx-auto mw-1024 py2 px3">
          <div className="mw-568">
            <p className="mt3">
              That lesson couldn’t be found. Try one of these instead:
            </p>
            <ul>
              <li>
                <Link to="/lessons">All lessons</Link>
              </li>
              <li>
                <Link to="/lessons/drills/top-100-words/">
                  Top 100 words lesson
                </Link>
              </li>
              {possibleBetterPath.length > 0 && (
                <li>
                  <Link to={possibleBetterPath}>
                    {possibleBetterLessonTitle} lesson
                  </Link>
                </li>
              )}
            </ul>
            <p>
              Or{" "}
              <a
                href={prefillSurveyLink()}
                className=""
                target="_blank"
                rel="noopener noreferrer"
                ref={surveyLink}
                onClick={prefillSurveyLink}
                id="ga--lesson--give-feedback"
              >
                let me know (form opens in a new tab)
              </a>
            </p>
          </div>
        </div>
      </main>
    </DocumentTitle>
  );
};

export default LessonNotFound;
