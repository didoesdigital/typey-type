import React from "react";

// @ts-expect-error TS(7031) FIXME: Binding element 'x1' implicitly has an 'any' type.
const Rule = ({ x1, y1, x2, y2, stroke }) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    fill="none"
    stroke={stroke}
    role="presentation"
  />
);

export default Rule;
