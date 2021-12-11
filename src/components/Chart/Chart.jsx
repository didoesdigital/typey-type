import React, { createContext, useContext } from "react";

const ChartContext = createContext();

export const useDimensionsContext = () => useContext(ChartContext);

const Chart = ({
  dimensions,
  onMouseMove = null,
  onTouchMove = null,
  children,
}) => (
  <ChartContext.Provider value={dimensions}>
    <svg width={dimensions.width} height={dimensions.height}>
      <g
        transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}
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
      />
    </svg>
  </ChartContext.Provider>
);

export default Chart;
