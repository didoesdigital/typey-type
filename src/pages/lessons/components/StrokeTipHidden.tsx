import React from "react";

type Props = {
  isMultiline: boolean;
  showStrokesInLesson: boolean;
  changeShowStrokesInLesson: () => void;
  targetStrokeCount: number;
};

const StrokeTipHidden = ({
  isMultiline,
  showStrokesInLesson,
  changeShowStrokesInLesson,
  targetStrokeCount,
}: Props) => (
  <div
    className={`stroke-tip${
      isMultiline ? " flex justify-center min-h-88" : ""
    }`}
  >
    <label className="mb0 text-small color-interactive stroke-tip__label">
      <input
        className="checkbox-input mr1 visually-hidden"
        type="checkbox"
        name="showStrokesInLesson"
        id="showStrokesInLesson"
        checked={showStrokesInLesson}
        onChange={changeShowStrokesInLesson}
      />
      {`${targetStrokeCount} stroke${targetStrokeCount === 1 ? "" : "s"}`}{" "}
      (hint?)
    </label>
  </div>
);

export default StrokeTipHidden;
