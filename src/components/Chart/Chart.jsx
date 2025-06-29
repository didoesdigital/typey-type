import React, { createContext, useContext } from "react";

// @ts-expect-error TS(2554) FIXME: Expected 1 arguments, but got 0.
const ChartContext = createContext();

export const useDimensionsContext = () => useContext(ChartContext);

const Chart = ({
  // @ts-expect-error TS(7031) FIXME: Binding element 'dimensions' implicitly has an 'an... Remove this comment to see the full error message
  dimensions,
  onMouseMove = null,
  onTouchMove = null,
  onMouseOut = null,
  onTouchEnd = null,
  // @ts-expect-error TS(7031) FIXME: Binding element 'accessibleTitle' implicitly has a... Remove this comment to see the full error message
  accessibleTitle,
  // @ts-expect-error TS(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
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
          // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type 'MouseEventH... Remove this comment to see the full error message
          onMouseMove={onMouseMove}
          // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type 'TouchEventH... Remove this comment to see the full error message
          onTouchMove={onTouchMove}
          // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type 'MouseEventH... Remove this comment to see the full error message
          onMouseOut={onMouseOut}
          // @ts-expect-error TS(2322) FIXME: Type 'null' is not assignable to type 'TouchEventH... Remove this comment to see the full error message
          onTouchEnd={onTouchEnd}
          role="presentation"
        />
      </svg>
    </>
  </ChartContext.Provider>
);

export default Chart;
