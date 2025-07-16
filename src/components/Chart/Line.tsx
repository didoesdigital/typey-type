import React, { CSSProperties } from "react";
import { area, type CurveFactory, line } from "d3-shape";

type LineProps = {
  type: "line" | "area";
  data: any[];
  xAccessor: (d: any) => number;
  yAccessor: (d: any) => number;
  y0Accessor: (d: any) => number;
  colorAccessor: string;
  interpolation: CurveFactory;
};

const Line = ({
  type,
  data,
  xAccessor,
  yAccessor,
  y0Accessor,
  colorAccessor = "#9880C2",
  interpolation,
  ...props
}: LineProps) => {
  const lineGenerator =
    type === "line"
      ? line().x(xAccessor).y(yAccessor).curve(interpolation)
      : area()
          .x(xAccessor)
          .y(yAccessor)
          .y0(y0Accessor)
          .y1(yAccessor)
          .curve(interpolation);

  const styles: CSSProperties =
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
      d={lineGenerator(data) ?? undefined}
      role="presentation"
    />
  );
};

export default Line;
