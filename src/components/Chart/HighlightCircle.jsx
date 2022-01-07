import React from "react";

const HighlightCircle = ({
  datum,
  xAccessor,
  yAccessor,
  colorAccessor,
  ...props
}) => {
  return (
    <circle
      {...props}
      role="presentation"
      cx={xAccessor(datum)}
      cy={yAccessor(datum)}
      r={8}
      style={{
        fill: colorAccessor(datum),
        opacity: 0.5,
      }}
    />
  );
};

export default HighlightCircle;
