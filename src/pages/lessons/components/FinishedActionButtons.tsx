import React from "react";
import { IconRestart } from "../../../components/Icon";
import FinishedNextLessonButton from "./FinishedNextLessonButton";

type FinishedActionButtonsProps = {
  numericAccuracy: number;
  restartPath: string;
  restartLesson: () => void;
  suggestedNextUrl: string;
};

const passClasses = "mr3 px2 py1 br-4 b--solid bw-1 b--transparent";
const failClasses =
  "mr3 px2 py1 br-4 b--solid bw-1 b--brand-primary bg-warning no-underline";

const FinishedActionButtons = ({
  numericAccuracy,
  restartPath,
  restartLesson,
  suggestedNextUrl,
}: FinishedActionButtonsProps) => (
  <p className="mb12">
    {/* eslint-disable-next-line jsx-a11y/no-access-key */}
    <a
      aria-label="Restart lesson"
      accessKey={"s"}
      href={restartPath.replace(/lesson.txt$/, "")}
      onClick={restartLesson}
      className={numericAccuracy >= 90 ? passClasses : failClasses}
      role="button"
    >
      <IconRestart
        ariaHidden="true"
        role="presentation"
        iconFill="#596091"
        className="mr1 svg-icon-wrapper svg-baseline"
      />
      Re<u style={{ textDecorationStyle: "double" }}>s</u>tart lesson
    </a>
    <FinishedNextLessonButton suggestedNextUrl={suggestedNextUrl} />
  </p>
);

export default FinishedActionButtons;
