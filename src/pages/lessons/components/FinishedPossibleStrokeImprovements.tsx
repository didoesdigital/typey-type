import React from "react";
import { useAtomValue } from "jotai";
import { spacePlacementState } from "../../../states/userSettingsState";

type FinishedPossibleStrokeImprovementsProps = {
  currentLessonStrokes: any;
  globalUserSettings: any;
  metWords: any;
  updateRevisionMaterial: any;
};

const getWordWithSpacing = (
  wordWithoutSpacing: string,
  spacePlacement: string
) =>
  spacePlacement === "spaceBeforeOutput"
    ? " " + wordWithoutSpacing
    : spacePlacement === "spaceAfterOutput"
    ? wordWithoutSpacing + " "
    : wordWithoutSpacing;

const FinishedPossibleStrokeImprovements = ({
  currentLessonStrokes,
  globalUserSettings,
  metWords,
  updateRevisionMaterial,
}: FinishedPossibleStrokeImprovementsProps) => {
  const spacePlacement = useAtomValue(spacePlacementState);
  return currentLessonStrokes.length > 0
    ? currentLessonStrokes.map((phrase: any, i: number) => {
        let strokeAttemptsPresentation;
        let strokeAttempts = phrase.attempts.map(
          ({ text }: { text: string }, j: any) => {
            return (
              <li key={j} className="whitespace-nowrap di ml1">
                <span className="bg-warning px1 dark:text-coolgrey-900">{text}</span>
              </li>
            );
          }
        );
        if (phrase.attempts.length > 0) {
          // We use a "punctuation space" before "You wrote" to separate it from previous phrase.
          // Test this by copying and pasting the material phrase and misstrokes text e.g. "stop You wrote: staph"
          strokeAttemptsPresentation = (
            <span>
              <p className="visually-hidden di">
                <span className="visually-hidden">&#8200;You wrote: </span>
              </p>
              <ol className="unstyled-list mb0 di">{strokeAttempts}</ol>
            </span>
          );
        } else {
          strokeAttemptsPresentation = [];
        }

        const showTimesSeen =
          globalUserSettings?.experiments &&
          !!globalUserSettings.experiments.timesSeen;
        const timesSeen =
          metWords[
            getWordWithSpacing(phrase.word, spacePlacement)
          ];

        return (
          <li
            key={i}
            className="unstyled-list-item bg-slat dark:bg-coolgrey-1100 p1 mb1 overflow-scroll"
          >
            <label className="checkbox-label mt0 mb1">
              <input
                className="checkbox-input mr1"
                type="checkbox"
                name={i + "-checkbox"}
                id={i + "-checkbox"}
                checked={currentLessonStrokes[i].checked}
                onChange={updateRevisionMaterial}
              />
              <span className="matched steno-material px1 whitespace-nowrap">
                {phrase.word}
              </span>
              {showTimesSeen && timesSeen && (
                <>
                  <span className="visually-hidden">. Times seen: </span>
                  <span className="whitespace-nowrap px1">{timesSeen}</span>
                </>
              )}
            </label>
            {strokeAttemptsPresentation}
            <p className="pl3 mb0">
              <span className="visually-hidden text-small">Hint: </span>
              <span className="steno-stroke steno-stroke--subtle text-small px1 py05">
                {phrase.stroke.split("").map((item: any, i: any) => (
                  <kbd
                    className="steno-stroke steno-stroke--subtle text-small"
                    key={i}
                  >
                    {item}
                  </kbd>
                ))}
              </span>
            </p>
          </li>
        );
      })
    : null;
};

export default FinishedPossibleStrokeImprovements;
