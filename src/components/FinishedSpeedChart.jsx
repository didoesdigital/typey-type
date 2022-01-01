import React, { useState } from "react";
import { bisector, max } from "d3-array";
import { format } from "d3-format";
import { timeParse, timeFormat } from "d3-time-format";
import { timeSecond } from "d3-time";
import { scaleLinear } from "d3-scale";
import { pointer } from "d3-selection";
import { curveMonotoneX } from "d3-shape";
import { useChartDimensions } from "./Chart/utils"
import Axis from "./Chart/Axis"
import Chart from "./Chart/Chart"
import Line from "./Chart/Line"
import Popover from "./Chart/Popover"

export default function FinishedSpeedChart({ data }) {
  const [popoverState, setPopoverState] = useState(null);
  const [ref, dimensions] = useChartDimensions({
    marginTop: 24,
    marginRight: 96,
    marginBottom: 36,
    marginLeft: 4,
  })

  const xAccessor = d => d.elapsedTime;
  const yAccessor = d => d.wordsPerMinute;
  const xScale = data === null ? null : scaleLinear()
    .domain([
      0,
      max(data.marks, xAccessor)
    ]
    )
    .range([0, dimensions.boundedWidth])

  const yScale = data === null ? null : scaleLinear()
    .domain([0, Math.max(10, max(data.marks, yAccessor) * 1.2)])
    .range([dimensions.boundedHeight, 0])
    .nice()

  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const y0AccessorScaled = data === null ? null : yScale(yScale.domain()[0])

  const bisect = bisector((d) => xAccessor(d))

  const onMove = (event) => {
    const pointerX = pointer(event)[0] - dimensions.marginLeft
    const pointerXValue = xScale.invert(pointerX)
    const nearestXIndex = bisect.center(data.marks, pointerXValue)
    setPopoverState(nearestXIndex)
  }

  return (
    <div className="mt3 mb1 relative" style={{ height: '240px' }} ref={ref}>
      {popoverState === null ? null :
      <Popover
        dataIndex={popoverState}
        dimensions={dimensions}
        data={data.marks}
        xAccessor={xAccessor}
        yAccessor={yAccessor}
        xAccessorScaled={xAccessorScaled}
        yAccessorScaled={yAccessorScaled}
      />}
      <Chart dimensions={dimensions} onMouseMove={onMove} onTouchMove={onMove}>
        {data === null ? null :
          <>
            <Axis
              dimension={"y"}
              dimensions={dimensions}
              scale={yScale}
              numberOfTicks={4}
              gridLines={true}
            />
            <Line type='line' data={data.marks} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} y0Accessor={y0AccessorScaled} interpolation={curveMonotoneX} />
            <Line type='area' data={data.marks} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} y0Accessor={y0AccessorScaled} interpolation={curveMonotoneX} />
            <text
              textAnchor="start"
              transform={`translate(0, ${dimensions.boundedHeight})`}
              dy="1.5em"
            >
              {format(',.2f')(timeFormat('%S')(timeParse('%Q')(xScale.domain()[0])))}
            </text>
            <text
              textAnchor="end"
              transform={`translate(${xAccessorScaled(data.marks[data.marks.length - 1])}, ${dimensions.boundedHeight})`}
              dy="1.5em"
            >
              {timeFormat("%s")(timeSecond((xAccessor(data.marks[data.marks.length - 1]))))} ⏱
            </text>
          </>
        }
      </Chart>
    </div>
  );
}
