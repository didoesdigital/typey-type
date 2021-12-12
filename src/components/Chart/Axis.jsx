import React, { useMemo } from "react";
import { format } from "d3-format";

const AxisHorizontal = ({ dimensions, scale, ...props }) => {
  const numberOfTicks = props.numberOfTicks || dimensions.boundedWidth / 80;
  const formatter = props.formatTick || format(",")

  // const ticks = scale.ticks(numberOfTicks);
  const ticks = useMemo(() => {
    return scale.ticks(numberOfTicks).map((value) => ({
      value,
      xOffset: scale(value),
    }));
  }, [scale, numberOfTicks]);

  return (
    <g transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>
      {ticks.map(({ value, xOffset }, i) => {
        return (
          <g key={value} transform={`translate(${xOffset}, 0)`}>
            <line
              y2={4}
              style={{
                stroke: "#868091",
              }}
            />

            <text
              key={value}
              style={{
                textAnchor: "middle",
                transform: "translateY(24px)"
              }}
            >
              {formatter(value)}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const axisComponentsByDimension = {
  x: AxisHorizontal,
  // y: AxisVertical,
}

const Axis = ({ dimension, dimensions, ...props }) => {
  const AxisByDimension = axisComponentsByDimension[dimension]
  if (!AxisByDimension) return null

  return (
    <AxisByDimension
      dimensions={dimensions}
      {...props}
    />
  )
}

export default Axis;
