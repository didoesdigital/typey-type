import React, { useCallback, useState } from "react";
import { max, min, bisector } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import { curveMonotoneX } from "d3-shape";
import { pointer } from "d3-selection";
import { useChartDimensions } from "../../../components/Chart/utils";
import Chart from "../../../components/Chart/Chart";
import Axis from "../../../components/Chart/Axis";
import Line from "../../../components/Chart/Line";
// Removed Popover and HighlightCircle imports
import type { LessonHistory, LessonResult } from "../../../types";

const aggregateDailyData = (data: LessonHistory): LessonHistory => {
  if (!data) return [];
  const aggregated: { [key: string]: LessonResult } = {};

  data.forEach((d) => {
    const day = d.timestamp.split("T")[0];
    if (!aggregated[day]) {
      aggregated[day] = { ...d };
    } else {
      if (d.wpm > aggregated[day].wpm) {
        aggregated[day].wpm = d.wpm;
      }
      if (d.accuracy > aggregated[day].accuracy) {
        aggregated[day].accuracy = d.accuracy;
      }
    }
  });

  return Object.values(aggregated);
};

// Removed highlightCircleRadius constant

interface ProgressGraphProps {
  lessonHistory: LessonHistory;
}

const ProgressGraph: React.FC<ProgressGraphProps> = ({ lessonHistory: rawHistory }) => {
  const [highlightedDatum, setHighlightedDatum] = useState<LessonResult | null>(
    null,
  );
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 50, // Increased marginBottom
    marginLeft: 60,
    marginRight: 60,
  });

  const lessonHistory = aggregateDailyData(rawHistory);

  const xAccessor = useCallback((d: LessonResult) => new Date(d.timestamp), []);
  const yAccessorWpm = useCallback((d: LessonResult) => d.wpm, []);
  const yAccessorAccuracy = useCallback((d: LessonResult) => d.accuracy, []);

  const xScale = scaleTime()
    .domain([
      min(lessonHistory, xAccessor) || new Date(),
      max(lessonHistory, xAccessor) || new Date(),
    ])
    .range([0, dimensions.boundedWidth]);

  const yScaleWpm = scaleLinear()
    .domain([
      min(lessonHistory, yAccessorWpm) || 0,
      max(lessonHistory, yAccessorWpm) || 0,
    ])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const yScaleAccuracy = scaleLinear()
    .domain([0, 100])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const xAccessorScaled = useCallback(
    (d: LessonResult) => xScale(xAccessor(d)),
    [xAccessor, xScale],
  );
  const yAccessorWpmScaled = useCallback(
    (d: LessonResult) => yScaleWpm(yAccessorWpm(d)),
    [yAccessorWpm, yScaleWpm],
  );
  const yAccessorAccuracyScaled = useCallback(
    (d: LessonResult) => yScaleAccuracy(yAccessorAccuracy(d)),
    [yAccessorAccuracy, yScaleAccuracy],
  );
  const y0AccessorWpm = useCallback(() => yScaleWpm(0), [yScaleWpm]);
  const y0AccessorAccuracy = useCallback(
    () => yScaleAccuracy(0),
    [yScaleAccuracy],
  );

  const xTickFormat = timeFormat("%d %b %Y");
  const yTickFormat = format(".0f");

  const bisect = bisector<LessonResult, Date>((d) => new Date(d.timestamp));

  const onMove = (event: any) => {
    const pointerX = pointer(event)[0] - dimensions.marginLeft;
    const date = xScale.invert(pointerX);
    const index = bisect.center(lessonHistory, date);
    setHighlightedDatum(lessonHistory[index]);
  };

  const onOut = () => {
    setHighlightedDatum(null);
  };

  return (
    <div ref={ref} style={{ height: "300px" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "10px",
          visibility: highlightedDatum ? "visible" : "hidden",
          height: "20px", // Fixed height to prevent shifting
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px", // Spacing between elements
        }}
      >
        <div>
          {highlightedDatum ? xTickFormat(xAccessor(highlightedDatum)) : ""}
        </div>
        <div style={{ color: "#9880C2" }}>WPM: {highlightedDatum?.wpm}</div>
        <div style={{ color: "#E17547" }}>Accuracy: {highlightedDatum?.accuracy}%</div>
      </div>
      <Chart
        dimensions={dimensions}
        onMouseMove={onMove}
        onTouchMove={onMove}
        onMouseOut={onOut}
        onTouchEnd={onOut}
        accessibleTitle="Progress Graph"
      >
        <Axis
          dimension="x"
          dimensions={dimensions}
          scale={xScale}
          gridLines={true}
          numberOfTicks={Math.min(lessonHistory.length, 4)}
          tickFormat={xTickFormat}
        />
        <Axis
          dimension="y"
          dimensions={dimensions}
          scale={yScaleWpm}
          gridLines={true}
          numberOfTicks={4}
          position="left"
          label="Words Per Minute"
          labelColor="#9880C2"
          tickFormat={yTickFormat}
        />
        <Axis
          dimension="y"
          dimensions={dimensions}
          scale={yScaleAccuracy}
          gridLines={false}
          numberOfTicks={4}
          position="right"
          label="Accuracy"
          labelColor="#E17547"
          tickFormat={yTickFormat}
        />
        <Line
          type="line"
          data={lessonHistory}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorWpmScaled}
          y0Accessor={y0AccessorWpm}
          interpolation={curveMonotoneX}
          colorAccessor="#9880C2"
        />
        <Line
          type="line"
          data={lessonHistory}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorAccuracyScaled}
          y0Accessor={y0AccessorAccuracy}
          interpolation={curveMonotoneX}
          colorAccessor="#E17547"
        />
      </Chart>
    </div>
  );
};

export default ProgressGraph;