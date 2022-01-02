import React from "react";
import { format } from "d3-format";

const popoverMaxWidth = 240;
const halfPopoverMaxWidth = popoverMaxWidth / 2;
const highlightCircleRadius = 8;

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
  const datum = data[dataIndex]
  const translateX = xAccessorScaled(datum) + dimensions.marginLeft;
  const leftEdge = translateX - (halfPopoverMaxWidth) < 0;
  const rightEdge = translateX + (halfPopoverMaxWidth) > dimensions.width;
  const translateY = yAccessorScaled(datum) + dimensions.marginTop - highlightCircleRadius; // Math.max(dimensions.marginTop - 4, 0);

  const popoverStyles = {
    backgroundColor: "#fff",
    border: "2px solid #E2E0E5",
    borderRadius: "4px",
    padding: "8px 16px",
    pointerEvents: "none",
    position: "absolute",
    textAlign: "center",
    transition: "transform 0.1s ease-in-out 0s",
    transform: `translate(
      calc(${leftEdge ? "0%" : rightEdge ? "-100%" : "-50%"} + ${translateX}px),
      calc(-100% + ${translateY}px)
    )`,
  };

  /* NOTE: useful debugging logs */
  // console.log(`${xAccessor(data[dataIndex])} milliseconds`);
  // console.log(`${format(",d")(xAccessor(data[dataIndex]) / 1000)} seconds`);

  const materialStyles = `truncate mw-240 mb1 steno-material db px05 ${
    datum.markedCorrect ? "matched" : "bg-warning"
  }`;

  const typedTextStyles = `truncate mw-240 mb0 steno-material db px05 bg-info`;

  return (
    <div style={popoverStyles}>
      <p className={materialStyles}>{datum.material}</p>
      <p className={typedTextStyles}>{datum.typedText}</p>
      <p className="mb0">{format(",d")(yAccessor(datum))} WPM</p>
    </div>
  );
};

export default Popover;
