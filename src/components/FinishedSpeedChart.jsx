import React from "react";
import { curveMonotoneX } from "d3-shape";
import { extent } from "d3-array";
import { scaleTime, scaleLinear } from "d3-scale";
import { useChartDimensions } from "./Chart/utils"
import Chart from "./Chart/Chart"
import Line from "./Chart/Line"

export default function FinishedSpeedChart({ data, ...props }) {
  const [ref, dimensions] = useChartDimensions({
    marginTop: 10,
    marginRight: 30,
    marginBottom: 20,
    marginLeft: 15,
  })

  const xAccessor = d => d.elapsedTime;
  const yAccessor = d => d.wordsPerMinute;
  const xScale = data === null ? null : scaleTime()
    .domain(extent(data.marks, xAccessor))
    .range([0, dimensions.boundedWidth])

  const yScale = data === null ? null : scaleLinear()
    .domain(extent(data.marks, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const y0AccessorScaled = data === null ? null : yScale(yScale.domain()[0])

  return (
    <div className="mt3 mb1" style={{ height: '240px' }} ref={ref}>
      <Chart dimensions={dimensions}>
        {data === null ? null :
          <>
            <Line type='line' data={data.marks} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} y0Accessor={y0AccessorScaled} interpolation={curveMonotoneX} />
            <Line type='area' data={data.marks} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} y0Accessor={y0AccessorScaled} interpolation={curveMonotoneX} />
          </>
        }
      </Chart>
    </div>
  );
}
