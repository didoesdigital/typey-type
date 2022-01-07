import React from "react";

const Circles = ({
  data,
  accessibleLabel,
  keyAccessor,
  xAccessor,
  yAccessor,
  colorAccessor,
  ...props
}) => {
  return (
    <g tabIndex={0} role="list">
      {data.map((d, i) => (
        <circle
          {...props}
          aria-label={accessibleLabel(d)}
          key={keyAccessor(d, i)}
          cx={xAccessor(d)}
          cy={yAccessor(d)}
          r={4}
          role="list-item"
          style={{
            fill: colorAccessor(d),
          }}
          tabIndex={0}
        />
      ))}
    </g>
  );
};

export default Circles;
