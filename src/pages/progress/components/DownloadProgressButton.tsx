import React from "react";
import GoogleAnalytics from "react-ga4";
import formatProgressFileDownloadName from "../utils/formatProgressFileDownloadName";
import makeDownloadHref from "../../../utils/makeDownloadHref";
import type { LessonHistory, MetWords } from "../../../types";

type Props = {
  metWords: MetWords;
  lessonHistory: LessonHistory;
};

const DownloadProgressButton = ({ metWords, lessonHistory }: Props) => {
  const downloadProgress = () => {
    GoogleAnalytics.event({
      category: "Downloads",
      action: "Click",
      label: "typey-type-progress.json",
    });
  };

  const progressData = {
    metWords,
    lessonHistory,
  };

  return (
    <a
      href={makeDownloadHref(progressData)}
      download={formatProgressFileDownloadName("typey-type-progress-")}
      onClick={downloadProgress}
      className="link-button link-button-ghost table-cell mr1"
    >
      Download progress file
    </a>
  );
};

export default DownloadProgressButton;
