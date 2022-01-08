import React, { createContext, useContext } from "react";

const ChartContext = createContext();

export const useDimensionsContext = () => useContext(ChartContext);

const Chart = ({
  dimensions,
  onMouseMove = null,
  onTouchMove = null,
  onMouseOut = null,
  onTouchEnd = null,
  accessibleTitle,
  children,
}) => (
  <ChartContext.Provider value={dimensions}>
    <>
      <h3 className="visually-hidden" id="chart-title">
        {accessibleTitle}
      </h3>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        aria-labelledby="chart-title"
      >
        <g
          transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
          role="presentation"
        >
          {children}
        </g>
        <rect
          x={0}
          y={0}
          width={dimensions.width}
          height={dimensions.height}
          fill="transparent"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onMouseOut={onMouseOut}
          onTouchEnd={onTouchEnd}
          role="presentation"
        />
      </svg>
    </>
  </ChartContext.Provider>
);

export default Chart;
