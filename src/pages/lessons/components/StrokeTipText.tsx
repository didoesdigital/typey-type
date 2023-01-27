import React from "react";
import type { Outline, StenoLayout } from "../../../types";

type Props = {
  isMultiline: boolean;
  currentStroke: Outline;
  stenoLayout: StenoLayout;
};

const StrokeTipText = ({ isMultiline, currentStroke, stenoLayout }: Props) => {
  const layoutTypeStyle =
    stenoLayout === "stenoLayoutKoreanModernCSteno"
      ? " heavy-type-face--korean"
      : stenoLayout === "stenoLayoutJapaneseSteno"
      ? " type-face--japanese"
      : "";

  return (
    <div className={"db" + layoutTypeStyle}>
      <pre
        className={`overflow-auto mw-408 my05 text-small${
          isMultiline ? " flex" : ""
        }`}
      >
        <span
          className="steno-stroke pa05 text-small"
          role="note"
          aria-label={[...currentStroke].join(" ").replace("-", "dash")}
        >
          {[...currentStroke].map((item, i) => (
            <React.Fragment key={i}>{item}</React.Fragment>
          ))}
        </span>
      </pre>
    </div>
  );
};

export default StrokeTipText;
