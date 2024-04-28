import React from "react";
import FinishedPossibleStrokeImprovements from "./FinishedPossibleStrokeImprovements";

type FinishedMisstrokesSummaryProps = {
  currentLessonStrokes: any;
  globalUserSettings: any;
  metWords: any;
  path: string;
  reviseLesson: () => void;
  showMisstrokesSummary: boolean;
  updateRevisionMaterial: any;
};

const FinishedMisstrokesSummary = ({
  currentLessonStrokes,
  globalUserSettings,
  metWords,
  path,
  reviseLesson,
  showMisstrokesSummary,
  updateRevisionMaterial,
}: FinishedMisstrokesSummaryProps) => {
  return showMisstrokesSummary ? (
    <div className="misstrokes-summary">
      <div>
        <h4 className="mt3 whitespace-nowrap">Possible stroke improvements</h4>
        <p>
          {/* eslint-disable-next-line jsx-a11y/no-access-key */}
          <a
            aria-label="Revise these words"
            accessKey={"r"}
            href={path.replace(/lesson.txt$/, "")}
            onClick={reviseLesson}
            role="button"
          >
            <u style={{ textDecorationStyle: "double" }}>R</u>evise these words
          </a>
        </p>
        <ol className="mb0 unstyled-list">
          <FinishedPossibleStrokeImprovements
            currentLessonStrokes={currentLessonStrokes}
            globalUserSettings={globalUserSettings}
            metWords={metWords}
            updateRevisionMaterial={updateRevisionMaterial}
          />
        </ol>
      </div>
      <p>
        <a
          href={path.replace(/lesson.txt$/, "")}
          onClick={reviseLesson}
          role="button"
        >
          Revise these words
        </a>
      </p>
    </div>
  ) : null;
};

export default FinishedMisstrokesSummary;
