import React from "react";
import { IconRestart } from "../../components/Icon";
import { Link } from "react-router-dom";

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
    {/* eslint-disable-next-line jsx-a11y/no-access-key */}
    <Link
      aria-label="Next lesson"
      accessKey={"o"}
      id="next-lesson-button"
      to={suggestedNextUrl}
      className="link-button dib negative-outline-offset"
      style={{ lineHeight: 2 }}
      role="button"
    >
      Next less<u style={{ textDecorationLine: "underline" }}>o</u>n
    </Link>
  </p>
);

export default FinishedActionButtons;
