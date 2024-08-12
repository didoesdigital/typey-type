import React from "react";
import RecommendationDescription from "./RecommendationDescription";

const RecommendationBoxFallback = () => {
  return (
    <React.Fragment>
      <div className="panel bg-white dark:bg-coolgrey-1000 min-h-424 p5 mb3">
        <h3 className="mt0 pb1 bb b--brand-primary-tint mb3">Recommended…</h3>
        <p className="mb0 mt4">
          <strong>Loading…</strong>
        </p>
        <p className="de-emphasized">…</p>
        <RecommendationDescription studyType={"discover"} />
        <div className="flex flex-wrap">
          <div>
            <button
              disabled
              className="mr2 link-button dib"
              style={{ lineHeight: 2 }}
            >
              Loading…
            </button>
          </div>
          <button
            disabled
            id="js-skip-button"
            className="button button--secondary pl3 pr3"
          >
            Skip
          </button>
        </div>
        <div className="hide" id="js-next-recommended-link-text">
          &nbsp;
        </div>
      </div>
      <div className="flex flex-wrap content-start-ns">
        <div className="flex flex-wrap"></div>
      </div>
    </React.Fragment>
  );
};

export default RecommendationBoxFallback;
