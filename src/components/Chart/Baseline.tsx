type Props = {
  scaleRange: [number, number];
  tickSize: number;
}

const Baseline = ({ scaleRange, tickSize }: Props) => (
  <path
    d={`M ${scaleRange[0]} ${tickSize} v ${-tickSize} H ${scaleRange[1]} v ${tickSize}`}
    fill="none"
    stroke={"#A8A8A8"}
    role="presentation"
  />
)

export default Baseline
