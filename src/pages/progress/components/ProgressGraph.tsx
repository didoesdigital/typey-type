import React, { useCallback, useState } from "react";
import { max, min, bisector } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import { curveLinear } from "d3-shape";
import { pointer } from "d3-selection";
import { useChartDimensions } from "../../../components/Chart/utils";
import Chart from "../../../components/Chart/Chart";
import Axis from "../../../components/Chart/Axis";
import Line from "../../../components/Chart/Line";
import Rule from "../../../components/Chart/Rule";
import type { LessonHistory, LessonResult } from "../../../types";

type LessonResultWithCumulative = LessonResult & {
  cumulativeWords: number;
};

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
      aggregated[day].words = (aggregated[day].words || 0) + (d.words || 0);
    }
  });

  return Object.values(aggregated);
};

const calculateCumulativeWords = (
  data: LessonHistory,
): LessonResultWithCumulative[] => {
  let cumulativeWords = 0;
  return data.map((d) => {
    cumulativeWords += d.words || 0;
    return { ...d, cumulativeWords };
  });
};

// Removed highlightCircleRadius constant

interface ProgressGraphProps {
  lessonHistory: LessonHistory;
}

const ProgressGraph: React.FC<ProgressGraphProps> = ({
  lessonHistory: rawHistory,
}) => {
  const [highlightedDatum, setHighlightedDatum] =
    useState<LessonResultWithCumulative | null>(null);
  const [ref, dimensions] = useChartDimensions({
    marginBottom: 110, // Increased marginBottom for rotated labels
    marginLeft: 80,
    marginRight: 80,
  });

  const lessonHistory = calculateCumulativeWords(
    aggregateDailyData(rawHistory),
  );

  const xAccessor = useCallback((d: LessonResult) => new Date(d.timestamp), []);
  const yAccessorWpm = useCallback((d: LessonResult) => d.wpm, []);
  const yAccessorAccuracy = useCallback((d: LessonResult) => d.accuracy, []);
  const yAccessorCumulativeWords = useCallback(
    (d: LessonResultWithCumulative) => d.cumulativeWords,
    [],
  );

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
    .domain([min(lessonHistory, yAccessorAccuracy) || 0, 100])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const yScaleCumulativeWords = scaleLinear()
    .domain([
      min(lessonHistory, yAccessorCumulativeWords) || 0,
      max(lessonHistory, yAccessorCumulativeWords) || 0,
    ])
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
  const yAccessorCumulativeWordsScaled = useCallback(
    (d: LessonResultWithCumulative) =>
      yScaleCumulativeWords(yAccessorCumulativeWords(d)),
    [yAccessorCumulativeWords, yScaleCumulativeWords],
  );
  const y0Accessor = useCallback(
    () => dimensions.boundedHeight,
    [dimensions.boundedHeight],
  );

  const xTickFormat = timeFormat("%Y-%m-%d");
  const xTickValues = lessonHistory.map(xAccessor);
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
    <div ref={ref} style={{ height: "500px" }}>
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
        <div style={{ color: "#47A8E1" }}>Words: {highlightedDatum?.words}</div>
        <div style={{ color: "#47A8E1" }}>
          ({highlightedDatum?.cumulativeWords})
        </div>
        <div style={{ color: "#9880C2" }}>WPM: {highlightedDatum?.wpm}</div>
        <div style={{ color: "#E17547" }}>
          Accuracy: {highlightedDatum?.accuracy}%
        </div>
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
          gridLines={false}
          numberOfTicks={Math.min(lessonHistory.length, 4)}
          tickFormat={xTickFormat}
          gridLineStrokeDasharray="5 5 5"
          gridLineStrokeDashoffset={0}
          tickLabelRotation="-45deg"
          tickValues={xTickValues}
        />
        <Axis
          dimension="y"
          dimensions={dimensions}
          scale={yScaleWpm}
          gridLines={false}
          numberOfTicks={4}
          position="right"
          label="Words Per Minute"
          labelColor="#9880C2"
          tickFormat={yTickFormat}
        />
        <Axis
          dimension="y"
          dimensions={dimensions}
          scale={yScaleCumulativeWords}
          gridLines={false}
          numberOfTicks={4}
          position="left"
          label="Total Correct Words"
          labelColor="#47A8E1"
          tickFormat={yTickFormat}
        />
        {[80, 85, 90, 95, 100].map((value) => (
          <g key={value}>
            {" "}
            {/* Group the line and text together */}
            <Rule
              x1={28}
              y1={yScaleAccuracy(value)}
              x2={dimensions.boundedWidth}
              y2={yScaleAccuracy(value)}
              stroke="#E17547"
              strokeDasharray="3 5"
            />
            <text
              x={0} // Position to the left of the chart
              y={yScaleAccuracy(value)}
              dy="0.32em" // Vertically align the text
              style={{
                fill: "#E17547", // Same color as the line
                fontSize: "10px",
                textAnchor: "start", // Align text to the end (right) so it's on the line
              }}
            >
              {value}%
            </text>
          </g>
        ))}
        <Line
          type="line"
          data={lessonHistory}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorCumulativeWordsScaled}
          y0Accessor={y0Accessor}
          interpolation={curveLinear}
          colorAccessor="#47A8E1"
        />
        <Line
          type="line"
          data={lessonHistory}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorWpmScaled}
          y0Accessor={y0Accessor}
          interpolation={curveLinear}
          colorAccessor="#9880C2"
        />
        <Line
          type="line"
          data={lessonHistory}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorAccuracyScaled}
          y0Accessor={y0Accessor}
          interpolation={curveLinear}
          colorAccessor="#E17547"
        />
        {highlightedDatum && (
          <Rule
            x1={xAccessorScaled(highlightedDatum)}
            y1={0}
            x2={xAccessorScaled(highlightedDatum)}
            y2={dimensions.boundedHeight}
            stroke="#cccccc"
            strokeDasharray="3 5"
          />
        )}
      </Chart>
    </div>
  );
};

export default ProgressGraph;
