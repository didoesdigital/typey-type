import React from "react";

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
