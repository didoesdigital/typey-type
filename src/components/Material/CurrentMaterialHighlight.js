import React, { useLayoutEffect, useState } from "react";
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

  useLayoutEffect(() => {
    const currentMaterialHighlight = document.querySelector(
      "#js-current-material-highlight"
    );
    const currentMaterialPhrase = document.querySelector(
      `#js-entire-material-text #presented-material-phrase-${currentPhraseID}`
    );
    if (currentMaterialHighlight && currentMaterialPhrase) {
      window.setTimeout(function () {
        setX(currentMaterialPhrase.offsetLeft);
        setY(currentMaterialPhrase.offsetTop);
      }, 0);
    }
  }, [currentPhraseID]);

  return (
    <div
      id="js-current-material-highlight"
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
