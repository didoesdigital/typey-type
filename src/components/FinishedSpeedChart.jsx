import React, { useState } from "react";
import { bisector, max, min } from "d3-array";
import { scaleLinear } from "d3-scale";
import { pointer } from "d3-selection";
import { curveMonotoneX } from "d3-shape";
import { useChartDimensions } from "./Chart/utils";
import { durationFormatter } from "./../utils/formatters";
import Axis from "./Chart/Axis";
import Chart from "./Chart/Chart";
import Circles from "./Chart/Circles";
import HighlightCircle from "./Chart/HighlightCircle";
import Line from "./Chart/Line";
import Popover from "./Chart/Popover";

export default function FinishedSpeedChart({ data }) {
  const [highlightedDatum, setHighlightedDatum] = useState(null);
  const [ref, dimensions] = useChartDimensions({
    marginTop: 24,
    marginRight: 96,
    marginBottom: 36,
    marginLeft: 8,
  })

  const xAccessor = d => d.elapsedTime;
  const yAccessor = d => d.wordsPerMinute;
  const keyAccessor = (d, i) => i;
  const colorAccessor = d => {
    if (d.attemptPeak) {
      return d.markedCorrect ? "#CD840E" : "#E17547";
    }
    else {
      return d.markedCorrect ? "#9880C2" : "#E26F99";
    }
  }
  const backgroundColorAccessor = d => {
    if (d.attemptPeak) {
      return d.markedCorrect ? "#FCF5E9" : "#FAEFEA";
    }
    else {
      return d.markedCorrect ? "#F1EEF6" : "#FAEBF0";
    }
  }

  const xScale = data === null ? null : scaleLinear()
    .domain([
      Math.floor(min(data.marks, xAccessor) / 1000) * 1000,
      Math.ceil(max(data.marks, xAccessor) / 1000) * 1000
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
    setHighlightedDatum(nearestXIndex)
  }

  const onOut = () => {
    setHighlightedDatum(null)
  }

  return (
    <div className="mt3 mb1 relative" style={{ height: '240px' }} ref={ref}>
      {highlightedDatum === null ? null :
      <Popover
        dataIndex={highlightedDatum}
        dimensions={dimensions}
        data={data.marks}
        xAccessor={xAccessor}
        yAccessor={yAccessor}
        xAccessorScaled={xAccessorScaled}
        yAccessorScaled={yAccessorScaled}
        colorAccessor={colorAccessor}
        backgroundColorAccessor={backgroundColorAccessor}
      />}
      <Chart dimensions={dimensions} onMouseMove={onMove} onTouchMove={onMove} onMouseOut={onOut} onTouchEnd={onOut}>
        {data === null ? null :
          <>
            <Axis
              dimension={"y"}
              dimensions={dimensions}
              scale={yScale}
              numberOfTicks={4}
              gridLines={true}
            />
            <Line type='line' data={data.marks.filter(d => !d.attemptPeak)} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} y0Accessor={y0AccessorScaled} interpolation={curveMonotoneX} />
            <Line type='area' data={data.marks.filter(d => !d.attemptPeak)} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} y0Accessor={y0AccessorScaled} interpolation={curveMonotoneX} />
            <Circles data={data.marks} keyAccessor={keyAccessor} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} colorAccessor={colorAccessor} />
            {highlightedDatum === null ? null :
            <HighlightCircle data={data.marks} dataIndex={highlightedDatum} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} colorAccessor={colorAccessor} />
            }
            <text
              textAnchor="start"
              transform={`translate(0, ${dimensions.boundedHeight})`}
              dy="1.5em"
            >
              ⏱ {durationFormatter(xScale.domain()[0])}
            </text>
            <text
              textAnchor="end"
              transform={`translate(${xScale.range()[1]}, ${dimensions.boundedHeight})`}
              dy="1.5em"
            >
              {durationFormatter(xScale.domain()[1])} ⏱
            </text>
          </>
        }
      </Chart>
    </div>
  );
}
