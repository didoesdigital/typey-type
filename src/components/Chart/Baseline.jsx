import React from 'react'

// @ts-expect-error TS(7031) FIXME: Binding element 'scaleRange' implicitly has an 'an... Remove this comment to see the full error message
const Baseline = ({ scaleRange, tickSize }) => (
  <path
    d={`M ${scaleRange[0]} ${tickSize} v ${-tickSize} H ${scaleRange[1]} v ${tickSize}`}
    fill="none"
    stroke={"#A8A8A8"}
    role="presentation"
  />
)

export default Baseline
