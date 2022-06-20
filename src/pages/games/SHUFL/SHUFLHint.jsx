import React from "react";

export default function SHUFLHint({ currentStroke, setShowHint, showHint }) {
  return (
    <>
      {!showHint && (
        <p className="mt3 text-center">
          <a href="#hint" className="dib" onClick={() => setShowHint(true)}>
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
