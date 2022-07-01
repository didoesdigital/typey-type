import React from "react";

type FinishedMisstrokesSummaryProps = {
  path: string;
  reviseLesson: () => void;
  listOfPossibleStrokeImprovements: any;
  showMisstrokesSummary: boolean;
};

const FinishedMisstrokesSummary = ({
  path,
  reviseLesson,
  listOfPossibleStrokeImprovements,
  showMisstrokesSummary,
}: FinishedMisstrokesSummaryProps) => {
  return showMisstrokesSummary ? (
    <div className="misstrokes-summary">
      <div>
        <h4 className="mt3 nowrap">Possible stroke improvements</h4>
        <p>
          {/* eslint-disable-next-line jsx-a11y/no-access-key */}
          <a
            aria-label="Revise these words"
            accessKey={"r"}
            href={path}
            onClick={reviseLesson}
            role="button"
          >
            <u style={{ textDecorationStyle: "double" }}>R</u>evise these words
          </a>
        </p>
        <ol className="mb0 unstyled-list">
          {listOfPossibleStrokeImprovements}
        </ol>
      </div>
      <p>
        <a href={path} onClick={reviseLesson} role="button">
          Revise these words
        </a>
      </p>
    </div>
  ) : null;
};

export default FinishedMisstrokesSummary;
