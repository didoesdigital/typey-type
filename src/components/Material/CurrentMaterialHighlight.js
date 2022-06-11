import React, { useEffect, useState } from "react";
import { matchSplitText } from "./../../utils/typey-type";

export default function CurrentMaterialHighlight({
  actualText,
  currentPhrase,
  settings,
  userSettings,
  currentPhraseID,
}) {
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

      document.querySelector("#js-material-panel").scrollTo({
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
      className="dib absolute"
      style={{
        backgroundColor: "#fff",
        transform: `translate(${x}px, ${y}px)`,
        width: width,
        zIndex: 1,
      }}
    >
      <strong className="fw7 pre" tabIndex="0">
        <span className="matched steno-material">{matched}</span>
        <span className="steno-material">{unmatched}</span>
      </strong>
    </div>
  );
}
