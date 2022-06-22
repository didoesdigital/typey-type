import React from "react";
import { humanDurationFormatter } from "../utils/formatters";

const Warning = ({ duration }) => {
  if (duration >= 60) {
    return (
      <span role="img" aria-label="Danger: ">
        {" "}
        🚨🚨🚨{" "}
      </span>
    );
  } else if (duration >= 45) {
    return (
      <span role="img" aria-label="Danger: ">
        {" "}
        🚨{" "}
      </span>
    );
  } else if (duration >= 30) {
    return (
      <span role="img" aria-label="Warning: ">
        {" "}
        ⚠️{" "}
      </span>
    );
  } else {
    return null;
  }
};

const LessonLengthPreview = ({ totalWords, speed, lessonStarted }) => (
  <div
    className={`text-center absolute left-0 right-0 b6 transition-opacity ${
      lessonStarted ? "o-0" : "o-100"
    }`}
  >
    <p className="absolute left-0 right-0 de-emphasized text-shadow-outline">
      <Warning duration={totalWords / speed} />
      {totalWords} word{totalWords === 1 ? "" : "s"} at {speed}&nbsp;WPM:{" "}
      {humanDurationFormatter(totalWords / speed)}
      <Warning duration={totalWords / speed} />
    </p>
  </div>
);

export default LessonLengthPreview;
