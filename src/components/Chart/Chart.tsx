import React, { createContext, useContext } from "react";

// @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 0.
const ChartContext = createContext();

export const useDimensionsContext = () => useContext(ChartContext);

type Props = {
  dimensions: any;
  onMouseMove: undefined | React.MouseEventHandler<SVGRectElement>;
  onTouchMove: undefined | React.TouchEventHandler<SVGRectElement>;
  onMouseOut: undefined | React.MouseEventHandler<SVGRectElement>;
  onTouchEnd: undefined | React.TouchEventHandler<SVGRectElement>;
  accessibleTitle: string;
  children: React.ReactNode;
};

const Chart = ({
  dimensions,
  onMouseMove = undefined,
  onTouchMove = undefined,
  onMouseOut = undefined,
  onTouchEnd = undefined,
  accessibleTitle,
  children,
}: Props) => (
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
