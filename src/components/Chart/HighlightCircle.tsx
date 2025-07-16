import React from "react";

const HighlightCircle = ({
  // @ts-expect-error TS(7031) FIXME: Binding element 'datum' implicitly has an 'any' ty... Remove this comment to see the full error message
  datum,
  // @ts-expect-error TS(7031) FIXME: Binding element 'xAccessor' implicitly has an 'any... Remove this comment to see the full error message
  xAccessor,
  // @ts-expect-error TS(7031) FIXME: Binding element 'yAccessor' implicitly has an 'any... Remove this comment to see the full error message
  yAccessor,
  // @ts-expect-error TS(7031) FIXME: Binding element 'colorAccessor' implicitly has an ... Remove this comment to see the full error message
  colorAccessor,
  ...props
}) => {
  return (
    <circle
      {...props}
      role="presentation"
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
