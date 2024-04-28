import React, { useEffect, useState } from "react";
import { matchSplitText } from "./../../utils/typey-type";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";

type Props = {
  actualText: any;
  currentPhrase: string;
  settings: any;
  currentPhraseID: number;
};

export default function CurrentMaterialHighlight({
  actualText,
  currentPhrase,
  settings,
  currentPhraseID,
}: Props) {
  const userSettings = useAtomValue(userSettingsState);
  const [matched, unmatched] = matchSplitText(
    currentPhrase,
    actualText,
    settings,
    userSettings
  );

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState("auto");

  useEffect(() => {
    const currentPhraseHighlight = document.querySelector(
      "#js-current-phrase-highlight"
    );
    const entireMaterial = document.querySelector("#js-entire-material-text");
    const firstMaterialPhrase = document.querySelector(
      `#js-entire-material-text #presented-material-phrase-0`
    );
    const currentMaterialPhrase = document.querySelector(
      `#js-entire-material-text #presented-material-phrase-${currentPhraseID}`
    );

    if (
      currentPhraseHighlight &&
      entireMaterial &&
      currentMaterialPhrase &&
      firstMaterialPhrase
    ) {
      setX(
        currentMaterialPhrase.getBoundingClientRect().left -
          entireMaterial.getBoundingClientRect().left
      );

      const newY =
        currentMaterialPhrase.getBoundingClientRect().top -
        firstMaterialPhrase.getBoundingClientRect().top;
      setY(newY);

      document.querySelector("#js-material-panel")?.scrollTo({
        left: 0,
        top: newY,
        behavior: "smooth",
      });
    }
  }, [currentPhraseID]);

  useEffect(() => {
    const currentPhraseHighlight = document.querySelector(
      "#js-current-phrase-highlight"
    );
    const currentMaterialPhrase = document.querySelector(
      `#js-entire-material-text #presented-material-phrase-${currentPhraseID}`
    );

    if (currentPhraseHighlight && currentMaterialPhrase) {
      if (
        currentPhraseHighlight.getBoundingClientRect().width >
        currentMaterialPhrase.getBoundingClientRect().width
      ) {
        setWidth(`${currentMaterialPhrase.getBoundingClientRect().width}px`);
      } else {
        setWidth("auto");
      }
    }
  }, [currentPhraseID, currentPhrase]);

  return (
    <div
      id="js-current-phrase-highlight"
      className={`current-phrase-highlight-background dib absolute bg-white dark:bg-coolgrey-1000${
        userSettings.blurMaterial ? " blur-words" : ""
      }`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: width,
        zIndex: 1,
      }}
    >
      <strong
        className="fw7 whitespace-pre"
        tabIndex={0}
        aria-label="Current word feedback"
        role="note"
      >
        <span
          className="matched steno-material"
          aria-label="Matched letters"
          role="note"
        >
          {matched}
        </span>
        <span
          className="steno-material"
          aria-label="Unmatched letters"
          role="note"
        >
          {unmatched}
        </span>
      </strong>
    </div>
  );
}
