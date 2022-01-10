import React from "react";
import { area, line } from "d3-shape";

const Line = ({
  type,
  data,
  xAccessor,
  yAccessor,
  y0Accessor,
  colorAccessor = "#9880C2",
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
      style={styles}
      d={lineGenerator(data)}
      role="presentation"
    />
  );
};

export default Line;
