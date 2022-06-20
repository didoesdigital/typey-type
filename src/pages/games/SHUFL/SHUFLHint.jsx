import React from "react";
import GoogleAnalytics from "react-ga";

const handleHintClick = (event, setShowHint) => {
  event.preventDefault();

  const yourSHUFLinput = document.getElementById("SHUFL-input");
  if (yourSHUFLinput) {
    yourSHUFLinput.focus();
  }

  setShowHint(true);

  GoogleAnalytics.event({
    category: "SHUFL",
    action: "Click",
    label: "Hint",
  });
};

export default function SHUFLHint({ currentStroke, setShowHint, showHint }) {
  return (
    <>
      {!showHint && (
        <p className="mt3 text-center">
          <a
            href="#hint"
            className="dib"
            onClick={(event) => handleHintClick(event, setShowHint)}
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
          className={`overflow-auto mw-408 text-small flex${
            showHint ? "" : " hide"
          }`}
          aria-hidden={!showHint}
        >
          <span
            className="steno-stroke pa05 text-small"
            role="note"
            aria-label={[...currentStroke].join(" ").replace("-", "dash")}
          >
            {[...currentStroke].map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </span>
        </pre>
      </div>
    </>
  );
}
