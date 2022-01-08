import React from "react";

const popoverMaxWidth = 240;
const halfPopoverMaxWidth = popoverMaxWidth / 2;
const highlightCircleRadius = 8;

const Popover = ({
  datum,
  dimensions,
  xAccessor,
  yAccessor,
  xAccessorScaled,
  yAccessorScaled,
  colorAccessor,
  backgroundColorAccessor,
  children,
  ...props
}) => {
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

  return (
    <div style={popoverStyles} aria-hidden={true}>
      {children}
    </div>
  );
};

export default Popover;
