import React, { useState } from "react";
import { bisector, max, min } from "d3-array";
import { format } from "d3-format";
import { scaleLinear } from "d3-scale";
import { pointer } from "d3-selection";
import { curveMonotoneX } from "d3-shape";
import { useChartDimensions } from "./Chart/utils";
import { durationFormatter } from "./../utils/formatters";
import { IconTypeyType } from "./Icon";
import Axis from "./Chart/Axis";
import Chart from "./Chart/Chart";
import Circles from "./Chart/Circles";
import HighlightCircle from "./Chart/HighlightCircle";
import Line from "./Chart/Line";
import Popover from "./Chart/Popover";

const tickSize = 4;

export default function FinishedSpeedChart({ data }) {
  const [highlightedDatum, setHighlightedDatum] = useState(null);
  const [ref, dimensions] = useChartDimensions({
    marginTop: 24,
    marginRight: 96,
    marginBottom: 36,
    marginLeft: 8,
  });

  const xAccessor = (d) => d.elapsedTime;
  const yAccessor = (d) => d.wordsPerMinute;
  const keyAccessor = (d, i) => i;
  const nominalAccessor = (d) => d.material;
  const colorAccessor = (d) => {
    if (d.attemptPeak) {
      return d.markedCorrect ? "#CD840E" : "#E17547";
    } else {
      return d.markedCorrect ? "#9880C2" : "#E26F99";
    }
  };
  const backgroundColorAccessor = (d) => {
    if (d.attemptPeak) {
      return d.markedCorrect ? "#FCF5E9" : "#FAEFEA";
    } else {
      return d.markedCorrect ? "#F1EEF6" : "#FAEBF0";
    }
  };

  const xScale =
    data === null
      ? null
      : scaleLinear()
          .domain([
            Math.floor(min(data.dataPoints, xAccessor) / 1000) * 1000,
            Math.ceil(max(data.dataPoints, xAccessor) / 1000) * 1000,
          ])
          .range([0, dimensions.boundedWidth]);

  const maxY = max(data.dataPoints, yAccessor);
  const maxYPlusBuffer = maxY * 1.2;
  const yScaleDomainMax = (maxYPlusBuffer) => {
    if (maxYPlusBuffer < 60) return 60;
    if (maxYPlusBuffer < 100) return 100;
    if (maxYPlusBuffer < 300) return 300;
    return 400;
  };

  const yScale =
    data === null
      ? null
      : scaleLinear()
          .domain([0, yScaleDomainMax(maxYPlusBuffer)])
          .range([dimensions.boundedHeight, 0])
          .nice();

  const xAccessorScaled = (d) => xScale(xAccessor(d));
  const yAccessorScaled = (d) => yScale(yAccessor(d));
  const y0AccessorScaled = data === null ? null : yScale(yScale.domain()[0]);

  const circleDiameter = 8;
  const crowdedDataPoints =
    data.dataPoints.length * circleDiameter > dimensions.boundedWidth;

  const bisect = bisector((d) => xAccessor(d));

  const onMove = (event) => {
    const pointerX = pointer(event)[0] - dimensions.marginLeft;
    const pointerXValue = xScale.invert(pointerX);
    const nearestXIndex = bisect.center(data.dataPoints, pointerXValue);
    const datum = data.dataPoints[nearestXIndex];
    setHighlightedDatum(datum);
  };

  const onOut = () => {
    setHighlightedDatum(null);
  };

  const onCircleFocus = (_, d) => {
    d ? setHighlightedDatum(d) : setHighlightedDatum(null)
  }

  return (
    <div className="mt3 mb1 relative" style={{ height: "240px" }} ref={ref}>
      <div
        className="chart-logo-lockup pointer-none"
        // style={{ top: dimensions.marginTop}}
      >
        <p className="flex items-end pr1 mb0">
          <IconTypeyType
            role="presentation"
            iconWidth="64"
            iconHeight="34"
            className="mr1 svg-icon-wrapper svg-icon-wrapper--typey-type-logo svg-baseline"
          />
          <span className="heading-link__logo-text" aria-hidden={true}>
            Typey&nbsp;Type
          </span>
        </p>
      </div>
      {highlightedDatum === null ? null : (
        <Popover
          datum={highlightedDatum}
          dimensions={dimensions}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
          xAccessorScaled={xAccessorScaled}
          yAccessorScaled={yAccessorScaled}
          colorAccessor={colorAccessor}
          backgroundColorAccessor={backgroundColorAccessor}
        />
      )}
      <Chart
        dimensions={dimensions}
        onMouseMove={onMove}
        onTouchMove={onMove}
        onMouseOut={onOut}
        onTouchEnd={onOut}
        accessibleTitle="Line chart of your typing speed over time"
      >
        {data === null ? null : (
          <>
            <Axis
              dimension={"y"}
              dimensions={dimensions}
              scale={yScale}
              numberOfTicks={4}
              gridLines={true}
            />
            <path
              d={[
                "M",
                xScale.range()[0],
                dimensions.boundedHeight + tickSize,
                "v",
                -tickSize,
                "H",
                xScale.range()[1],
                "v",
                tickSize,
              ].join(" ")}
              fill="none"
              stroke={"#A8A8A8"}
            />
            <Line
              type="line"
              data={data.dataPoints.filter((d) => !d.attemptPeak)}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              y0Accessor={y0AccessorScaled}
              interpolation={curveMonotoneX}
            />
            <Line
              type="area"
              data={data.dataPoints.filter((d) => !d.attemptPeak)}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              y0Accessor={y0AccessorScaled}
              interpolation={curveMonotoneX}
            />
            {crowdedDataPoints ? null : (
              <Circles
                data={data.dataPoints}
                accessibleLabel={(d) =>
                  `${nominalAccessor(d)}: ${format(",d")(yAccessor(d))} WPM`
                }
                keyAccessor={keyAccessor}
                xAccessor={xAccessorScaled}
                yAccessor={yAccessorScaled}
                colorAccessor={colorAccessor}
                onFocus={onCircleFocus}
                onBlur={onOut}
              />
            )}
            {highlightedDatum === null ? null : (
              <HighlightCircle
                datum={highlightedDatum}
                xAccessor={xAccessorScaled}
                yAccessor={yAccessorScaled}
                colorAccessor={colorAccessor}
              />
            )}
            <text
              textAnchor="start"
              transform={`translate(0, ${dimensions.boundedHeight})`}
              dy="1.5em"
            >
              ⏱ {durationFormatter(xScale.domain()[0])}
            </text>
            <text
              textAnchor="end"
              transform={`translate(${xScale.range()[1]}, ${
                dimensions.boundedHeight
              })`}
              dy="1.5em"
            >
              {durationFormatter(xScale.domain()[1])} ⏱
            </text>
          </>
        )}
      </Chart>
    </div>
  );
}
