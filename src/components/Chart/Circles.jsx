import React from "react";

const Circles = ({ data, keyAccessor, xAccessor, yAccessor, colorAccessor, ...props }) => {
  const styles = (d) => {
    return colorAccessor(d)
      ? {
          fill: "#9880C2",
        }
      : {
          fill: "#E26F99",
        };
  };

  return (
    <g>
      {data.map((d, i) => (
        <circle
          {...props}
          key={keyAccessor(d, i)}
          cx={xAccessor(d)}
          cy={yAccessor(d)}
          r={4}
          style={styles(d)}
        />
      ))}
    </g>
  );
};

export default Circles;
