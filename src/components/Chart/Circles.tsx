import React from "react";

type Props = {
  data: any[];
  accessibleLabel: (d: any) => string;
  keyAccessor: (d: any, i: number) => string;
  xAccessor: (d: any) => number;
  yAccessor: (d: any) => number;
  colorAccessor: (d: any) => string;
  onFocus: (e: any, d: any) => void;
  onBlur: React.FocusEventHandler<SVGCircleElement>;
};

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
}: Props) => {
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
