import React from "react";

type Props = {
  x1: string | number;
  y1: string | number;
  x2: string | number;
  y2: string | number;
  stroke: string;
  strokeDasharray?: string;
};

const Rule = ({ x1, y1, x2, y2, stroke, strokeDasharray }: Props) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    fill="none"
    stroke={stroke}
    strokeDasharray={strokeDasharray}
    role="presentation"
  />
);

export default Rule;
