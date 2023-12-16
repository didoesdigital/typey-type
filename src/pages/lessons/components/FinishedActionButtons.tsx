import React from "react";
import RestartIcon from "../../../components/Icons/icon-images/Restart.svg";
import Icon from "../../../components/Icons/Icon";
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
      <Icon
        iconSVGImport={RestartIcon}
        width="1em"
        height="1em"
        className="icon mr1"
        color={"currentColor"}
        style={{ transform: "translateY(0.125em)" }}
      />
      Re<u style={{ textDecorationStyle: "double" }}>s</u>tart lesson
    </a>
    <FinishedNextLessonButton suggestedNextUrl={suggestedNextUrl} />
  </p>
);

export default FinishedActionButtons;
