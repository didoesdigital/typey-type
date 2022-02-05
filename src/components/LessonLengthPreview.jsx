import React from "react";
import { humanDurationFormatter } from "../utils/formatters";

export default function LessonLengthPreview({ totalWords, speed, lessonStarted }) {
  return (
    <div className={`text-center absolute left-0 right-0 b6 transition-opacity ${lessonStarted ? 'o-0' : 'o-100'}`}>
      <p className="absolute left-0 right-0 de-emphasized">
        {totalWords} word{totalWords === 1 ? "" : "s"} at {speed}&nbsp;WPM:{" "}
        {humanDurationFormatter(totalWords / speed)}
      </p>
    </div>
  );
}
