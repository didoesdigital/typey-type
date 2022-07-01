import React from "react";
import { IconRestart } from "../../components/Icon";
import FinishedNextLessonButton from "./FinishedNextLessonButton";

type FinishedActionButtonsProps = {
  restartPath: string;
  restartLesson: () => void;
  suggestedNextUrl: string;
};

const FinishedActionButtons = ({
  restartPath,
  restartLesson,
  suggestedNextUrl,
}: FinishedActionButtonsProps) => (
  <p className="mb12">
    {/* eslint-disable-next-line jsx-a11y/no-access-key */}
    <a
      aria-label="Restart lesson"
      accessKey={"s"}
      href={restartPath}
      onClick={restartLesson}
      className="mr3"
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
