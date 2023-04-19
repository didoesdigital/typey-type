import React, { useCallback, useMemo, useState } from "react";
import GoogleAnalytics from "react-ga4";
import makeDownloadHref from "../../../utils/makeDownloadHref";

import type { Lesson, StenoDictionary } from "../../../types";

type Props = {
  lesson: Lesson;
  lessonTitle: string;
  locationPathname: string;
};

// fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=lesson&entry.1202724812&entry.936119214";
const googleFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=";
const googleFormParam = "&entry.1202724812&entry.936119214";

const initialLessonDict: StenoDictionary = {};

const LessonFinePrintFooter = ({
  lesson,
  lessonTitle,
  locationPathname,
}: Props) => {
  const [lessonHintsAsDict, setLessonHintsAsDict] = useState({});

  const downloadLessonAsDictHref = useMemo(
    () => makeDownloadHref(lessonHintsAsDict),
    [lessonHintsAsDict]
  );

  const downloadLessonAsDict = useCallback(() => {
    const lessonHintsAsDict = lesson.sourceMaterial.reduce((prev, curr) => {
      const dict = Object.assign({}, prev);
      dict[curr["stroke"]] = curr["phrase"];
      return dict;
    }, initialLessonDict);

    setLessonHintsAsDict(lessonHintsAsDict);

    GoogleAnalytics.event({
      category: "Downloads",
      action: "Click",
      label: `Dictionary: ${lessonTitle}`,
    });
  }, [lessonTitle, lesson.sourceMaterial]);
  return (
    <div>
      <p className="text-center">
        <a
          href={
            googleFormURL +
            encodeURIComponent(locationPathname) +
            googleFormParam
          }
          className="text-small mt0"
          target="_blank"
          rel="noopener noreferrer"
          id="ga--lesson--give-feedback"
        >
          Give feedback on this lesson (form opens in a new tab)
        </a>
      </p>
      <p className="text-center">
        {!!lesson.path && (
          <a
            className="text-small mt0"
            href={downloadLessonAsDictHref}
            download={`${lesson.path
              .replace("/typey-type/lessons/", "")
              .replace("/lesson.txt", "")
              .replaceAll("/", "--")}-dictionary.json`}
            onClick={downloadLessonAsDict}
          >
            Download lesson hints as dictionary
          </a>
        )}
      </p>
    </div>
  );
};

export default LessonFinePrintFooter;
