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

  useEffect(() => {
    const currentPhraseHighlight = document.querySelector(
      "#js-current-phrase-highlight"
    );
    const entireMaterial = document.querySelector("#js-entire-material-text");
    const currentMaterialPhrase = document.querySelector(
      `#js-entire-material-text #presented-material-phrase-${currentPhraseID}`
    );

    if (currentPhraseHighlight && entireMaterial && currentMaterialPhrase) {
      setX(
        currentMaterialPhrase.getBoundingClientRect().left -
          entireMaterial.getBoundingClientRect().left
      );
      const newY =
        currentMaterialPhrase.getBoundingClientRect().top -
        entireMaterial.getBoundingClientRect().top;
      setY(newY);

      document.querySelector("#js-material-panel").scrollTo({
        left: 0,
        top: newY,
        behavior: "smooth",
      });
    }
  }, [currentPhraseID]);

  return (
    <div
      id="js-current-phrase-highlight"
      className="dib absolute"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      <strong className="fw7 pre" tabIndex="0">
        <span className="matched steno-material">{matched}</span>
        <span className="steno-material">{unmatched}</span>
      </strong>
    </div>
  );
}
