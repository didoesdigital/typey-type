import React from "react";

const RecommendationBoxFallback = () => {
  return (
    <div className="panel bg-white dark:bg-coolgrey-1000 min-h-424 p5 mb3">
      <h3 className="mt0 pb1 bb b--brand-primary-tint mb3">Recommended…</h3>
      <p className="mb0 mt4">
        <strong>Loading…</strong>
      </p>
    </div>
  );
};

export default RecommendationBoxFallback;
