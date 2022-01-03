import React from "react";

const Circles = ({ data, keyAccessor, xAccessor, yAccessor, colorAccessor, ...props }) => {
  return (
    <g>
      {data.map((d, i) => (
        <circle
          {...props}
          key={keyAccessor(d, i)}
          cx={xAccessor(d)}
          cy={yAccessor(d)}
          r={4}
          style={{
            fill: colorAccessor(d)
          }}
        />
      ))}
    </g>
  );
};

export default Circles;
