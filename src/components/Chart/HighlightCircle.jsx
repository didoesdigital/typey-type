import React from "react";

const HighlightCircle = ({ data, dataIndex, xAccessor, yAccessor, colorAccessor, ...props }) => {
  const datum = data[dataIndex];
  const styles = (d) => {
    return colorAccessor(d)
      ? {
          fill: "#9880C2",
          opacity: 0.5,
        }
      : {
          fill: "#E26F99",
          opacity: 0.5,
        };
  };

  return (
    <circle
      {...props}
      aria-hidden={true}
      cx={xAccessor(datum)}
      cy={yAccessor(datum)}
      r={8}
      style={styles(datum)}
    />
  );
};

export default HighlightCircle;
