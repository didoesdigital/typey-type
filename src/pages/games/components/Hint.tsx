import React from "react";
import GoogleAnalytics from "react-ga4";
import type { SingleStroke } from "types";

const handleHintClick = (
  event: React.KeyboardEvent | React.MouseEvent,
  setShowHint: (showHint: boolean) => void,
  gameName: string
) => {
  event.preventDefault();

  const yourInput = document.getElementById(`${gameName}-input`);
  if (yourInput) {
    yourInput.focus();
  }

  setShowHint(true);

  GoogleAnalytics.event({
    category: gameName,
    action: "Click",
    label: "Hint",
  });
};

type Props = {
  currentStroke: SingleStroke;
  setShowHint: (showHint: boolean) => void;
  showHint: boolean;
  gameName: string;
};

export default function Hint({
  currentStroke,
  setShowHint,
  showHint,
  gameName,
}: Props) {
  return (
    <>
      {!showHint && (
        <p className="mt3 text-center">
          <a
            href="#hint"
            className="dib"
            onClick={(event) => handleHintClick(event, setShowHint, gameName)}
            onKeyPress={(event) =>
              handleHintClick(event, setShowHint, gameName)
            }
          >
            Hint?
          </a>
        </p>
      )}
      <div
        className={`flex justify-center${showHint ? " mt3" : ""}`}
        id="hint"
        tabIndex={-1}
      >
        <pre
          className={`overflow-auto mw-408 my05 text-small flex${
            showHint ? "" : " hide"
          }`}
          aria-hidden={!showHint}
        >
          <span
            className="steno-stroke pa05 text-small"
            role="note"
            aria-label={[...currentStroke].join(" ").replace("-", "dash")}
          >
            {currentStroke}
          </span>
        </pre>
      </div>
    </>
  );
}
