import React from "react";

const Legend = () => {
  return (
    <div className="mt3">
      <details>
        <summary className="de-emphasized">Highlights</summary>
        <div className="flex flex-column">
          <p className="mb0 de-emphasized">
            New words written for the first time have a{" "}
            <span style={{ "borderBottom": "2px solid var(--magenta-700)" }}>
              violet underline.
            </span>
          </p>
          <p className="mb0 de-emphasized">
            Newly memorised words written for the 30th time have a{" "}
            <span style={{ "borderBottom": "2px solid var(--violet-600)" }}>
              magenta underline.
            </span>
          </p>
        </div>
      </details>
    </div>
  );
};

export default Legend;
