import React from "react";

const Circles = ({
  data,
  accessibleLabel,
  keyAccessor,
  xAccessor,
  yAccessor,
  colorAccessor,
  onFocus,
  onBlur,
  ...props
}) => {
  return (
    <g tabIndex={0} role="list" aria-label="Measurement points">
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
