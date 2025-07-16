import React from "react";

const popoverMaxWidth = 240;
const halfPopoverMaxWidth = popoverMaxWidth / 2;

const Popover = ({
  // @ts-expect-error TS(7031) FIXME: Binding element 'dimensions' implicitly has an 'an... Remove this comment to see the full error message
  dimensions,
  // @ts-expect-error TS(7031) FIXME: Binding element 'translateX' implicitly has an 'an... Remove this comment to see the full error message
  translateX,
  // @ts-expect-error TS(7031) FIXME: Binding element 'translateY' implicitly has an 'an... Remove this comment to see the full error message
  translateY,
  // @ts-expect-error TS(7031) FIXME: Binding element 'children' implicitly has an 'any'... Remove this comment to see the full error message
  children,
  ...props
}) => {
  const leftEdge = translateX - halfPopoverMaxWidth < 0;
  const rightEdge = translateX + halfPopoverMaxWidth > dimensions.width;

  const popoverStyles = {
    backgroundColor: "#fff",
    border: "2px solid #E2E0E5",
    borderRadius: "4px",
    color: 'var(--coolgrey-1000)',
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
    // @ts-expect-error TS(2322) FIXME: Type '{ backgroundColor: string; border: string; b... Remove this comment to see the full error message
    <div style={popoverStyles} aria-hidden={true}>
      {children}
    </div>
  );
};

export default Popover;
