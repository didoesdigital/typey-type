import React from "react";
import GoogleAnalytics from "react-ga4";

// @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
const handleHintClick = (event, setShowHint, gameName) => {
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

export default function Hint({
  // @ts-expect-error TS(7031) FIXME: Binding element 'currentStroke' implicitly has an ... Remove this comment to see the full error message
  currentStroke,
  // @ts-expect-error TS(7031) FIXME: Binding element 'setShowHint' implicitly has an 'a... Remove this comment to see the full error message
  setShowHint,
  // @ts-expect-error TS(7031) FIXME: Binding element 'showHint' implicitly has an 'any'... Remove this comment to see the full error message
  showHint,
  // @ts-expect-error TS(7031) FIXME: Binding element 'gameName' implicitly has an 'any'... Remove this comment to see the full error message
  gameName,
}) {
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
