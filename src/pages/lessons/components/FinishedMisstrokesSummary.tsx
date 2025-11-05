import React from "react";
import FinishedPossibleStrokeImprovements from "./FinishedPossibleStrokeImprovements";
import type {
  CurrentLessonStrokes,
  MetWords,
  RevisionMaterial,
  SourceMaterial,
  SourceMaterialItem,
} from "../../../types";
import { useSetAtom } from "jotai";
import { revisionModeState } from "../../../states/lessonState";

type FinishedMisstrokesSummaryProps = {
  currentLessonStrokes: CurrentLessonStrokes[];
  metWords: MetWords;
  path: string;
  reviseLesson: (
    event: React.MouseEvent<HTMLAnchorElement>,
    revisionMaterial: RevisionMaterial
  ) => void;
  showMisstrokesSummary: boolean;
  sourceMaterial: SourceMaterial;
  updateRevisionMaterial: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => boolean;
};

const FinishedMisstrokesSummary = ({
  currentLessonStrokes,
  metWords,
  path,
  reviseLesson,
  showMisstrokesSummary,
  sourceMaterial,
  updateRevisionMaterial,
}: FinishedMisstrokesSummaryProps) => {
  const setRevisionMode = useSetAtom(revisionModeState);
  const handleReviseClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    let revisionMode = true;
    const newRevisionMaterial: SourceMaterialItem[] = [];
    for (let i = 0; i < currentLessonStrokes.length; i++) {
      if (currentLessonStrokes[i].checked === true) {
        const materialItem: SourceMaterialItem = {
          phrase: currentLessonStrokes[i].word,
          stroke: currentLessonStrokes[i].stroke,
        };
        newRevisionMaterial.push(materialItem);
      }
    }
    if (newRevisionMaterial.length === 0) {
      newRevisionMaterial.push(...sourceMaterial);
      revisionMode = false;
    }
    setRevisionMode(revisionMode);
    reviseLesson(e, newRevisionMaterial);
  };

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
            onClick={handleReviseClick}
            role="button"
          >
            <u style={{ textDecorationStyle: "double" }}>R</u>evise these words
          </a>
        </p>
        <FinishedPossibleStrokeImprovements
          currentLessonStrokes={currentLessonStrokes}
          metWords={metWords}
          updateRevisionMaterial={updateRevisionMaterial}
        />
      </div>
      <p>
        <a
          href={path.replace(/lesson.txt$/, "")}
          onClick={handleReviseClick}
          role="button"
        >
          Revise these words
        </a>
      </p>
    </div>
  ) : null;
};

export default FinishedMisstrokesSummary;
