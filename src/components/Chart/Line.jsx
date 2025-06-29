import React from "react";
import { area, line } from "d3-shape";

const Line = ({
  // @ts-expect-error TS(7031) FIXME: Binding element 'type' implicitly has an 'any' typ... Remove this comment to see the full error message
  type,
  // @ts-expect-error TS(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
  data,
  // @ts-expect-error TS(7031) FIXME: Binding element 'xAccessor' implicitly has an 'any... Remove this comment to see the full error message
  xAccessor,
  // @ts-expect-error TS(7031) FIXME: Binding element 'yAccessor' implicitly has an 'any... Remove this comment to see the full error message
  yAccessor,
  // @ts-expect-error TS(7031) FIXME: Binding element 'y0Accessor' implicitly has an 'an... Remove this comment to see the full error message
  y0Accessor,
  colorAccessor = "#9880C2",
  // @ts-expect-error TS(7031) FIXME: Binding element 'interpolation' implicitly has an ... Remove this comment to see the full error message
  interpolation,
  ...props
}) => {
  const lineGenerator =
    type === "line"
      ? line().x(xAccessor).y(yAccessor).curve(interpolation)
      : area()
          .x(xAccessor)
          .y(yAccessor)
          .y0(y0Accessor)
          .y1(yAccessor)
          .curve(interpolation);

  const styles =
    type === "area"
      ? {
          fill: colorAccessor,
          strokeWidth: 0,
        }
      : {
          fill: "none",
          stroke: colorAccessor,
          strokeWidth: "3px",
          strokeLinecap: "round",
        };

  return (
    <path
      {...props}
      // @ts-expect-error TS(2322) FIXME: Type '{ fill: string; strokeWidth: number; stroke?... Remove this comment to see the full error message
      style={styles}
      // @ts-expect-error TS(2322) FIXME: Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      d={lineGenerator(data)}
      role="presentation"
    />
  );
};

export default Line;
