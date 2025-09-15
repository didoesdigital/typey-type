import React, { useMemo } from "react";
import { format } from "d3-format";
import { ScaleLinear, ScaleTime } from "d3-scale";

const formatter = format(",");

type Dimensions = {
  boundedWidth: number;
  boundedHeight: number;
};

type AxisSharedProps = {
  dimensions: Dimensions;
  scale: ScaleLinear<any, any> | ScaleTime<any, any>;
  gridLines: boolean;
  numberOfTicks: number;
  tickFormat?: (value: any, index: number, ticks: any[]) => string;
  label?: string;
  labelColor?: string;
};

type AxisHorizontalProps = AxisSharedProps;

type AxisVerticalProps = AxisSharedProps & {
  position?: "left" | "right";
};

// An ok default value: numberOfTicks = dimensions.boundedWidth / 80
const AxisHorizontal = ({
  dimensions,
  scale,
  gridLines,
  numberOfTicks,
  tickFormat,
  label,
  labelColor,
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
      {ticks.map(({ value, xOffset }, i) => {
        return (
          <g
            key={value.toString()}
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
              key={value.toString()}
              aria-hidden="true"
              role="presentation"
              style={{
                textAnchor: "middle",
                transform: "translateY(24px)",
                userSelect: "none",
              }}
            >
              {tickFormat ? tickFormat(value, i, ticks) : formatter(value)}
            </text>
          </g>
        );
      })}
      {label && (
        <text
          style={{
            textAnchor: "middle",
            transform: `translate(${dimensions.boundedWidth / 2}px, 40px)`,
            fill: labelColor,
          }}
        >
          {label}
        </text>
      )}
    </g>
  );
};

// An ok default value: numberOfTicks = dimensions.boundedHeight / 80
const AxisVertical = ({
  dimensions,
  scale,
  gridLines,
  numberOfTicks,
  position = "right",
  tickFormat,
  label,
  labelColor,
  ...props
}: AxisVerticalProps) => {
  const [x1, x2] =
    gridLines === true
      ? position === "right"
        ? [-dimensions.boundedWidth, 0]
        : [dimensions.boundedWidth, 0]
      : position === "right"
        ? [0, 4]
        : [0, -4];

  const ticks = useMemo(() => {
    return scale.ticks(numberOfTicks).map((value) => ({
      value,
      yOffset: scale(value),
    }));
  }, [scale, numberOfTicks]);

  const transform =
    position === "right"
      ? `translate(${dimensions.boundedWidth}, 0)`
      : `translate(0, 0)`;
  const textAnchor = position === "right" ? "start" : "end";
  const textTransform =
    position === "right" ? "translateX(8px)" : "translateX(-8px)";

  return (
    <g transform={transform} role="presentation" {...props}>
      {ticks.map(({ value, yOffset }, i) => {
        return (
          <g
            key={value.toString()}
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
              key={value.toString()}
              aria-hidden="true"
              role="presentation"
              style={{
                textAnchor,
                transform: textTransform,
                userSelect: "none",
              }}
              dy="0.32em"
            >
              {tickFormat ? tickFormat(value, i, ticks) : formatter(value)}
            </text>
          </g>
        );
      })}
      {label && (
        <text
          style={{
            textAnchor: "middle",
            transform: `translate(${position === "right" ? "45px" : "-45px"}, ${
              dimensions.boundedHeight / 2
            }px) rotate(-90deg)`,
            fill: labelColor,
          }}
        >
          {label}
        </text>
      )}
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
} & AxisSharedProps & {
    position?: "left" | "right";
  };

const Axis = ({ dimension, dimensions, ...props }: AxisProps) => {
  const AxisByDimension = axisComponentsByDimension[dimension];
  if (!AxisByDimension) return null;

  return <AxisByDimension dimensions={dimensions} {...props} />;
};

export default Axis;
