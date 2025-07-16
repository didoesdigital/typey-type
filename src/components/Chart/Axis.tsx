import React, { useMemo } from "react";
import { format } from "d3-format";
import type { ScaleLinear } from "d3-scale";

const formatter = format(",");

type Dimensions = {
  boundedWidth: string;
  boundedHeight: string;
};

type AxisSharedProps = {
  dimensions: Dimensions;
  scale: ScaleLinear<any, any>;
  gridLines: boolean;
  numberOfTicks: number;
};

type AxisHorizontalProps = AxisSharedProps;

type AxisVerticalProps = AxisSharedProps;

// An ok default value: numberOfTicks = dimensions.boundedWidth / 80
const AxisHorizontal = ({
  dimensions,
  scale,
  gridLines,
  numberOfTicks,
  ...props
}: AxisHorizontalProps) => {
  const ticks = useMemo(() => {
    return scale.ticks(numberOfTicks).map((value) => ({
      value,
      xOffset: scale(value),
    }));
  }, [scale, numberOfTicks]);

  return (
    <g
      transform={`translate(0, ${dimensions.boundedHeight})`}
      role="presentation"
      {...props}
    >
      {ticks.map(({ value, xOffset }) => {
        return (
          <g
            key={value}
            transform={`translate(${xOffset}, 0)`}
            role="presentation"
          >
            <line
              y2={4}
              role="presentation"
              style={{
                pointerEvents: "none",
                stroke: "#E3E3E3",
              }}
            />

            <text
              key={value}
              aria-hidden="true"
              role="presentation"
              style={{
                textAnchor: "middle",
                transform: "translateY(24px)",
                userSelect: "none",
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

// An ok default value: numberOfTicks = dimensions.boundedHeight / 80
const AxisVertical = ({
  dimensions,
  scale,
  gridLines,
  numberOfTicks,
  ...props
}: AxisVerticalProps) => {
  const [x1, x2] = gridLines === true ? [-dimensions.boundedWidth, 0] : [0, 4];

  const ticks = useMemo(() => {
    return scale.ticks(numberOfTicks).map((value) => ({
      value,
      yOffset: scale(value),
    }));
  }, [scale, numberOfTicks]);

  return (
    <g
      transform={`translate(${dimensions.boundedWidth}, 0)`}
      role="presentation"
      {...props}
    >
      {ticks.map(({ value, yOffset }, i) => {
        return (
          <g
            key={value}
            transform={`translate(0, ${yOffset})`}
            role="presentation"
          >
            <line
              x1={x1}
              x2={x2}
              role="presentation"
              style={{
                pointerEvents: "none",
                stroke: "#E3E3E3",
              }}
            />

            <text
              key={value}
              aria-hidden="true"
              role="presentation"
              style={{
                textAnchor: "start",
                transform: "translateX(8px)",
                userSelect: "none",
              }}
              dy="0.32em"
            >
              {`${formatter(value)}${i === ticks.length - 1 ? " WPM" : ""}`}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
};

type AxisProps = {
  dimension: "x" | "y";
  dimensions: Dimensions;
} & AxisSharedProps;

const Axis = ({ dimension, dimensions, ...props }: AxisProps) => {
  const AxisByDimension = axisComponentsByDimension[dimension];
  if (!AxisByDimension) return null;

  return <AxisByDimension dimensions={dimensions} {...props} />;
};

export default Axis;
