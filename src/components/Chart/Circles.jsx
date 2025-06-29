import React from "react";

const Circles = ({
  // @ts-expect-error TS(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
  data,
  // @ts-expect-error TS(7031) FIXME: Binding element 'accessibleLabel' implicitly has a... Remove this comment to see the full error message
  accessibleLabel,
  // @ts-expect-error TS(7031) FIXME: Binding element 'keyAccessor' implicitly has an 'a... Remove this comment to see the full error message
  keyAccessor,
  // @ts-expect-error TS(7031) FIXME: Binding element 'xAccessor' implicitly has an 'any... Remove this comment to see the full error message
  xAccessor,
  // @ts-expect-error TS(7031) FIXME: Binding element 'yAccessor' implicitly has an 'any... Remove this comment to see the full error message
  yAccessor,
  // @ts-expect-error TS(7031) FIXME: Binding element 'colorAccessor' implicitly has an ... Remove this comment to see the full error message
  colorAccessor,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onFocus' implicitly has an 'any' ... Remove this comment to see the full error message
  onFocus,
  // @ts-expect-error TS(7031) FIXME: Binding element 'onBlur' implicitly has an 'any' t... Remove this comment to see the full error message
  onBlur,
  ...props
}) => {
  return (
    <g tabIndex={0} role="list" aria-label="Measurement points">
      {/* @ts-expect-error TS(7006) FIXME: Parameter 'd' implicitly has an 'any' type. */}
      {data?.map((d, i) => (
        <circle
          {...props}
          aria-label={accessibleLabel(d)}
          key={keyAccessor(d, i)}
          cx={xAccessor(d)}
          cy={yAccessor(d)}
          r={4}
          role="listitem"
          style={{
            fill: colorAccessor(d),
          }}
          tabIndex={0}
          onFocus={(e) => onFocus(e, d)}
          onBlur={onBlur}
        />
      ))}
    </g>
  );
};

export default Circles;
