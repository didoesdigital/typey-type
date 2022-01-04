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
  colorAccessor,
  backgroundColorAccessor,
  ...props
}) => {
  const datum = data[dataIndex];
  const translateX = xAccessorScaled(datum) + dimensions.marginLeft;
  const leftEdge = translateX - halfPopoverMaxWidth < 0;
  const rightEdge = translateX + halfPopoverMaxWidth > dimensions.width;
  const translateY = Math.max(
    yAccessorScaled(datum) + dimensions.marginTop - highlightCircleRadius,
    -highlightCircleRadius // prevents positioning higher than the chart
  );

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

  const claps = datum.markedCorrect && !datum.attemptPeak && (
    <span
      style={{
        backgroundColor: "transparent",
        borderBottom: "2px solid transparent",
      }}
    >
      &nbsp;👏
    </span>
  );

  return (
    <div style={popoverStyles}>
      <p className="mw-240 mb0 mt1 flex">
        <span className="current-phrase-material truncate px05">
          {datum.material}
        </span>
        {claps}
      </p>
      <p className="mw-240 mb0 flex">
        <span
          className="truncate px05 bg-info"
          style={{
            backgroundColor: backgroundColorAccessor(datum),
            borderBottom: `2px solid ${colorAccessor(datum)}`,
          }}
        >
          {datum.typedText}
        </span>
        {claps}
      </p>
      <p className="mb0">{format(",d")(yAccessor(datum))} WPM</p>
    </div>
  );
};

export default Popover;
