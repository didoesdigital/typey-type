import React from "react";
import { Link } from "react-router-dom";

type FinishedNextLessonButtonProps = {
  suggestedNextUrl: string;
};

const FinishedNextLessonButton = ({
  suggestedNextUrl,
}: FinishedNextLessonButtonProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-access-key
    <Link
      aria-label="Next lesson"
      accessKey={"o"}
      id="next-lesson-button"
      to={suggestedNextUrl}
      className="link-button dib"
      style={{ lineHeight: 2 }}
      role="button"
    >
      Next less<u style={{ textDecorationLine: "underline" }}>o</u>n
    </Link>
  );
};

export default FinishedNextLessonButton;
