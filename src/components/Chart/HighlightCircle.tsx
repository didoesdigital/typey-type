type Props = {
  datum: any;
  xAccessor: (d: any) => number;
  yAccessor: (d: any) => number;
  colorAccessor: (d: any) => string;
};

const HighlightCircle = ({
  datum,
  xAccessor,
  yAccessor,
  colorAccessor,
  ...props
}: Props) => {
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
