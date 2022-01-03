import React from "react";

const HighlightCircle = ({
  data,
  dataIndex,
  xAccessor,
  yAccessor,
  colorAccessor,
  ...props
}) => {
  const datum = data[dataIndex];

  return (
    <circle
      {...props}
      aria-hidden={true}
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
