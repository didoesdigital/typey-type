import React, { useCallback, useEffect, useRef, useState } from "react";
import DocumentTitle from "react-document-title";
import { Link } from "react-router-dom";
import { getLessonIndexData } from "../../utils/lessonIndexData";
import getLessonMetadata from "./utilities/getLessonMetadata";

const getLessonOverview = async (lessonFile: any) => {
  const response = await fetch(lessonFile, {
    method: "GET",
    credentials: "same-origin",
  });
  return await response.text();
};

type LessonOverviewProps = {
  lessonMetadata?: any;
  lessonPath: string;
  lessonTitle?: string;
  lessonTxtPath: string;
};

const LessonOverview = ({
  lessonMetadata,
  lessonPath,
  lessonTitle,
  lessonTxtPath,
}: LessonOverviewProps) => {
  const mainHeading = useRef<HTMLHeadingElement>(null);
  const [title, setTitle] = useState(lessonTitle || "Steno");
  const [content, setContent] = useState(`
<div class="mx-auto mw100 pt24 pb24 de-emphasized text-center">
  <p>Loading…</p>
</div>`);
  const [error, setError] = useState(false);

  const updateLessonOverviewContent = useCallback((metadata) => {
    if (metadata?.title) {
      setTitle(metadata.title);
    }

    if (metadata?.overview) {
      getLessonOverview(process.env.PUBLIC_URL + "/lessons" + metadata.overview)
        .then((text) => {
          setContent(text);
          setError(
            text.toLowerCase().startsWith("<!doctype html>") ? true : false
          );
        })
        .catch((e) => {
          setError(true);
          console.error(e);
        });
    } else {
      setError(true);
    }
  }, []);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  useEffect(() => {
    if (lessonMetadata && lessonMetadata.title && lessonMetadata.overview) {
      updateLessonOverviewContent(lessonMetadata);
    } else {
      getLessonIndexData()
        .then((lessonIndex: any) => {
          const metadata = getLessonMetadata(
            lessonIndex,
            process.env.PUBLIC_URL + lessonTxtPath
          );
          updateLessonOverviewContent(metadata);
        })
        .catch((e: unknown) => {
          setError(true);
          console.error(e);
        });
    }
  }, [lessonMetadata, lessonTxtPath, updateLessonOverviewContent]);

  const showLessonOverview = () => {
    return { __html: content };
  };

  return (
    <DocumentTitle title={"Typey Type | Lesson: " + title + " overview"}>
      <main id="main">
        <div className="subheader">
          <div className="flex flex-wrap items-baseline mx-auto mw-1920 justify-between px3 py2">
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2 className="table-cell mr2" ref={mainHeading} tabIndex={-1}>
                  {title} overview
                </h2>
              </header>
            </div>
            <div className="flex mxn2">
              <Link
                to={lessonPath}
                className="link-button link-button-ghost table-cell mr1"
                role="button"
              >
                Back to lesson
              </Link>
            </div>
          </div>
        </div>
        <div>
          {error ? (
            <div className="mx-auto mw-1024 p3">
              <div role="article" className="mw-1024 mb3 mt3">
                <div className="mx-auto mw100 mt3 mb3 text-center">
                  That overview couldn’t be found.{" "}
                  <Link to={lessonPath}>Back to lesson</Link>.
                </div>
              </div>
            </div>
          ) : (
            <div
              className="type-face--sans-serif"
              dangerouslySetInnerHTML={showLessonOverview()}
            />
          )}
        </div>
      </main>
    </DocumentTitle>
  );
};

export default LessonOverview;
