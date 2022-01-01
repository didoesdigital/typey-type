import React from "react";
import { format } from "d3-format";

const Popover = ({
  dataIndex,
  data,
  dimensions,
  xAccessor,
  yAccessor,
  xAccessorScaled,
  yAccessorScaled,
  ...props
}) => {
  const translateX = xAccessorScaled(data[dataIndex]) + dimensions.marginLeft;
  const translateY = yAccessorScaled(data[dataIndex]) + dimensions.marginTop - 2; // Math.max(dimensions.marginTop - 4, 0);

  const popoverStyles = {
    backgroundColor: "#fff",
    border: "2px solid #E2E0E5",
    borderRadius: "4px",
    padding: "8px 16px",
    pointerEvents: "none",
    position: "absolute",
    transition: "transform 0.1s ease-in-out 0s",
    transform: `translate(
      calc( -50% + ${translateX}px),
      calc(-100% + ${translateY}px)
    )`,
  };

  /* NOTE: useful debugging logs */
  // console.log(`${xAccessor(data[dataIndex])} milliseconds`);
  // console.log(`${format(",d")(xAccessor(data[dataIndex]) / 1000)} seconds`);

  const materialStyles = `truncate mw-240 mb0 steno-material dib px05 ${
    data[dataIndex].markedCorrect ? "matched" : "bg-warning"
  }`;

  return (
    <div style={popoverStyles}>
      <p className={materialStyles}>{data[dataIndex].material}</p>
      <p className="mb0">{format(",d")(yAccessor(data[dataIndex]))} WPM</p>
    </div>
  );
};

export default Popover;
