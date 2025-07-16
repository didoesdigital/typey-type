import React, { useMemo } from "react";
import { format } from "d3-format";

const formatter = format(",");

// An ok default value: numberOfTicks = dimensions.boundedWidth / 80
const AxisHorizontal = ({
  // @ts-expect-error TS(7031) FIXME: Binding element 'dimensions' implicitly has an 'an... Remove this comment to see the full error message
  dimensions,
  // @ts-expect-error TS(7031) FIXME: Binding element 'scale' implicitly has an 'any' ty... Remove this comment to see the full error message
  scale,
  // @ts-expect-error TS(7031) FIXME: Binding element 'gridLines' implicitly has an 'any... Remove this comment to see the full error message
  gridLines,
  // @ts-expect-error TS(7031) FIXME: Binding element 'numberOfTicks' implicitly has an ... Remove this comment to see the full error message
  numberOfTicks,
  ...props
}) => {
  const ticks = useMemo(() => {
    // @ts-expect-error TS(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    return scale.ticks(numberOfTicks).map((value) => ({
      value,
      xOffset: scale(value),
    }));
  }, [scale, numberOfTicks]);

  return (
    <g transform={`translate(0, ${dimensions.boundedHeight})`} role="presentation" {...props}>
      {/* @ts-expect-error TS(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message */}
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
  // @ts-expect-error TS(7031) FIXME: Binding element 'dimensions' implicitly has an 'an... Remove this comment to see the full error message
  dimensions,
  // @ts-expect-error TS(7031) FIXME: Binding element 'scale' implicitly has an 'any' ty... Remove this comment to see the full error message
  scale,
  // @ts-expect-error TS(7031) FIXME: Binding element 'gridLines' implicitly has an 'any... Remove this comment to see the full error message
  gridLines,
  // @ts-expect-error TS(7031) FIXME: Binding element 'numberOfTicks' implicitly has an ... Remove this comment to see the full error message
  numberOfTicks,
  ...props
}) => {
  const [x1, x2] = gridLines === true ? [-dimensions.boundedWidth, 0] : [0, 4];

  const ticks = useMemo(() => {
    // @ts-expect-error TS(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    return scale.ticks(numberOfTicks).map((value) => ({
      value,
      yOffset: scale(value),
    }));
  }, [scale, numberOfTicks]);

  return (
    <g transform={`translate(${dimensions.boundedWidth}, 0)`} role="presentation" {...props}>
      {/* @ts-expect-error TS(7031) FIXME: Binding element 'value' implicitly has an 'any' ty... Remove this comment to see the full error message */}
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

// @ts-expect-error TS(7031) FIXME: Binding element 'dimension' implicitly has an 'any... Remove this comment to see the full error message
const Axis = ({ dimension, dimensions, ...props }) => {
  // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const AxisByDimension = axisComponentsByDimension[dimension];
  if (!AxisByDimension) return null;

  return <AxisByDimension dimensions={dimensions} {...props} />;
};

export default Axis;
