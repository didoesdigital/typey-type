import React from "react";

type Props = {
  id: string;
  filled: boolean;
  children: string;
};

const CustomLessonFormattedCode = ({ id, filled, children }: Props) => {
  return (
    <pre
      id={id}
      className={`${
        filled ? "quote " : ""
      }h-168 overflow-scroll mw-384 mt1 mb3`}
    >
      <code>{children}</code>
    </pre>
  );
};

export default CustomLessonFormattedCode;
