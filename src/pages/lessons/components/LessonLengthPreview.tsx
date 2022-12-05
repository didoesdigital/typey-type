import React from "react";
import { humanDurationFormatter } from "../../../utils/formatters";

const Warning = ({ duration }: { duration: number }) => (
  <span role="img" aria-label=" Warning ">
    {" "}
    {duration >= 60
      ? "🚨🚨🚨"
      : duration >= 45
      ? "🚨"
      : duration >= 30
      ? "⚠️"
      : ""}{" "}
  </span>
);

type LessonLengthPreviewProps = {
  lessonStarted: boolean;
  speed: number;
  totalWords: number;
};

const LessonLengthPreview = ({
  totalWords,
  speed,
  lessonStarted,
}: LessonLengthPreviewProps) => {
  const duration = totalWords / speed;
  return (
    <div
      className={`text-center absolute left-0 right-0 b6 transition-opacity ${
        lessonStarted ? "o-0" : "o-100"
      }`}
    >
      <p
        className={`absolute left-0 right-0 text-shadow-outline${
          duration > 30 ? "" : " de-emphasized"
        }`}
      >
        <Warning duration={duration} />
        {totalWords} word{totalWords === 1 ? "" : "s"} at {speed}&nbsp;WPM:{" "}
        {humanDurationFormatter(duration)}
        <Warning duration={duration} />
      </p>
    </div>
  );
};

export default LessonLengthPreview;
