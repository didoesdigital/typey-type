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
  gridLines: boolean;
  numberOfTicks: number;
  tickFormat?: (value: any, index: number, ticks: any[]) => string;
  label?: string;
  labelColor?: string;
  gridLineStrokeDasharray?: string;
  gridLineStrokeDashoffset?: number;
  tickLabelRotation?: string;
};

type AxisHorizontalProps = AxisSharedProps & {
  scale: ScaleTime<any, any>;
  tickValues?: Date[];
};

type AxisVerticalProps = AxisSharedProps & {
  scale: ScaleLinear<any, any>;
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
  gridLineStrokeDasharray,
  gridLineStrokeDashoffset,
  tickLabelRotation,
  tickValues,
  ...props
}: AxisHorizontalProps) => {
  const ticks = useMemo(() => {
    const rawTicks = tickValues || scale.ticks(numberOfTicks);
    const uniqueTicksMap = new Map();
    rawTicks.forEach(value => {
      const key = value instanceof Date ? value.toDateString() : (value as any).toString();
      if (!uniqueTicksMap.has(key)) {
        uniqueTicksMap.set(key, value);
      } else if (value instanceof Date && uniqueTicksMap.get(key).getTime() !== value.getTime()) {
        // Handle cases where toDateString() is the same but time is different
        uniqueTicksMap.set(key, value);
      }
    });
    return Array.from(uniqueTicksMap.values()).map((value) => ({
      value,
      xOffset: scale(value),
    }));
  }, [scale, numberOfTicks, tickValues]);

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
                stroke: gridLines ? labelColor : "#E3E3E3",
                strokeDasharray: gridLineStrokeDasharray,
                strokeDashoffset: gridLineStrokeDashoffset,
              }}
            />

            <text
              key={value.toString()}
              aria-hidden="true"
              role="presentation"
              style={{
                textAnchor: tickLabelRotation ? "end" : "middle",
                transform: tickLabelRotation ? "translateY(24px) rotate(-45deg)" : "translateY(24px)",
                userSelect: "none",
                fill: labelColor,
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
  gridLineStrokeDasharray,
  gridLineStrokeDashoffset,
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
    const rawTicks = scale.ticks(numberOfTicks);
    const uniqueTicks = Array.from(new Set(rawTicks)).map(Number);
    return uniqueTicks.map((value) => ({
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
                stroke: gridLines ? labelColor : "#E3E3E3",
                strokeDasharray: gridLineStrokeDasharray,
                strokeDashoffset: gridLineStrokeDashoffset,
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
                fill: labelColor,
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
    scale: ScaleLinear<any, any> | ScaleTime<any, any>;
    position?: "left" | "right";
    tickValues?: any[];
  };

const Axis = ({ dimension, dimensions, scale, ...props }: AxisProps) => {
  if (dimension === "x") {
    return <AxisHorizontal dimensions={dimensions} scale={scale as ScaleTime<any, any>} {...props} />;
  } else if (dimension === "y") {
    return <AxisVertical dimensions={dimensions} scale={scale as ScaleLinear<any, any>} {...props} />;
  }
  return null;
};

export default Axis;
