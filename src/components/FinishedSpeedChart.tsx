import React, { useCallback, useEffect, useState } from "react";
import GoogleAnalytics from "react-ga4";
import { bisector, max, min } from "d3-array";
import { format } from "d3-format";
import { scaleLinear } from "d3-scale";
import { pointer } from "d3-selection";
import { curveMonotoneX } from "d3-shape";
import { useChartDimensions } from "./Chart/utils";
import { durationFormatter } from "../utils/formatters";
import TypeyTypeIcon from "./Icons/icon-images/TypeyTypeIcon.svg";
import Icon from "./Icons/Icon";
import ErrorBoundary from "./ErrorBoundary";
import Axis from "./Chart/Axis";
import Baseline from "./Chart/Baseline";
import Chart from "./Chart/Chart";
import Circles from "./Chart/Circles";
import HighlightCircle from "./Chart/HighlightCircle";
import Line from "./Chart/Line";
import Popover from "./Chart/Popover";
import Rule from "./Chart/Rule";

const highlightCircleRadius = 8;
const tickSize = 4;

// @ts-expect-error TS(7006) FIXME: Parameter 'datum' implicitly has an 'any' type.
const claps = (datum, htmlOutput = false) => {
  if (htmlOutput) {
    return datum.markedCorrect && !datum.attemptPeak ? (
      <span
        style={{
          backgroundColor: "transparent",
          borderBottom: "2px solid transparent",
        }}
        role="img"
        aria-label=" correct"
      >
        &nbsp;👏
      </span>
    ) : null;
  } else {
    return datum.markedCorrect && !datum.attemptPeak ? ", correct!" : "";
  }
};

// @ts-expect-error TS(7031) FIXME: Binding element 'data' implicitly has an 'any' typ... Remove this comment to see the full error message
export default function FinishedSpeedChart({ data }) {
  const [highlightedDatum, setHighlightedDatum] = useState(null);
  const [ref, dimensions] = useChartDimensions({
    marginTop: 24,
    marginRight: 96,
    marginBottom: 36,
    marginLeft: 8,
  });

  useEffect(() => {
    GoogleAnalytics.event({
      category: "CompletedLessonWithChart",
      action: "CompletedLessonWithChart",
      label: "CompletedLessonWithChart",
    });
  }, []);

  const xAccessor = useCallback((d) => d.elapsedTime, []);
  const yAccessor = useCallback((d) => d.wordsPerMinute, []);
  // @ts-expect-error TS(7006) FIXME: Parameter '_' implicitly has an 'any' type.
  const keyAccessor = (_, i) => i;
  // @ts-expect-error TS(7006) FIXME: Parameter 'd' implicitly has an 'any' type.
  const nominalAccessor = (d) => d.material;

  const minimumStrokes = 4;
  // @ts-expect-error TS(7006) FIXME: Parameter 'd' implicitly has an 'any' type.
  const colorAccessor = (d) => {
    if ("materialIndex" in d && d.materialIndex < minimumStrokes) {
      return "#868091";
    }

    if (d.attemptPeak) {
      return d.markedCorrect ? "#CD840E" : "#E17547";
    } else {
      return d.markedCorrect ? "#9880C2" : "#E26F99";
    }
  };
  // @ts-expect-error TS(7006) FIXME: Parameter 'd' implicitly has an 'any' type.
  const backgroundColorAccessor = (d) => {
    if (d.attemptPeak) {
      return d.markedCorrect ? "#FCF5E9" : "#FAEFEA";
    } else {
      return d.markedCorrect ? "#F1EEF6" : "#FAEBF0";
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const xScale = useCallback(
    // @ts-expect-error TS(2345) FIXME: Argument of type 'ScaleLinear<number, number, neve... Remove this comment to see the full error message
    data === null
      ? null
      : scaleLinear()
          .domain([
            // @ts-expect-error TS(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
            Math.floor(min(data.dataPoints, xAccessor) / 1000) * 1000,
            // @ts-expect-error TS(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
            Math.ceil(max(data.dataPoints, xAccessor) / 1000) * 1000,
          ])
          .range([0, dimensions.boundedWidth]),
    [data.dataPoints, xAccessor, dimensions]
  );

  const maxY = max(data.dataPoints, yAccessor);
  // @ts-expect-error TS(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
  const maxYPlusBuffer = maxY * 1.2;
  // @ts-expect-error TS(7006) FIXME: Parameter 'maxYPlusBuffer' implicitly has an 'any'... Remove this comment to see the full error message
  const yScaleDomainMax = (maxYPlusBuffer) => {
    if (maxYPlusBuffer < 60) return 60;
    if (maxYPlusBuffer < 100) return 100;
    if (maxYPlusBuffer < 200) return 200;
    if (maxYPlusBuffer < 300) return 300;
    return 400;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const yScale = useCallback(
    // @ts-expect-error TS(2345) FIXME: Argument of type 'ScaleLinear<number, number, neve... Remove this comment to see the full error message
    data === null
      ? null
      : scaleLinear()
          .domain([0, yScaleDomainMax(maxYPlusBuffer)])
          .range([dimensions.boundedHeight, 0])
          .nice(),
    [dimensions, maxYPlusBuffer]
  );

  const xAccessorScaled = useCallback(
    (d) => xScale(xAccessor(d)),
    [xAccessor, xScale]
  );
  const yAccessorScaled = useCallback(
    (d) => yScale(yAccessor(d)),
    [yAccessor, yScale]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const y0AccessorScaled = useCallback(
    // @ts-expect-error TS(2339) FIXME: Property 'domain' does not exist on type '(...args... Remove this comment to see the full error message
    data === null ? null : yScale(yScale.domain()[0]),
    [data, yScale]
  );

  const circleDiameter = 8;
  const crowdedDataPoints =
    data.dataPoints.length * circleDiameter > dimensions.boundedWidth;

  const bisect = bisector((d) => xAccessor(d));

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  const onMove = (event) => {
    try {
      const pointerX = pointer(event)?.[0] || 0 - dimensions.marginLeft;
      // @ts-expect-error TS(2339) FIXME: Property 'invert' does not exist on type '(...args... Remove this comment to see the full error message
      const pointerXValue = xScale.invert(pointerX);
      const nearestXIndex = bisect.center(data.dataPoints, pointerXValue);
      const datum = data.dataPoints[nearestXIndex];
      setHighlightedDatum(datum);
    } catch (error) {
      console.error(error);
    }
  };

  const onOut = () => {
    setHighlightedDatum(null);
  };

  // @ts-expect-error TS(7006) FIXME: Parameter '_' implicitly has an 'any' type.
  const onCircleFocus = (_, d) => {
    d ? setHighlightedDatum(d) : setHighlightedDatum(null);
  };

  // @ts-expect-error TS(7006) FIXME: Parameter 'd' implicitly has an 'any' type.
  const accessibleLabel = (d) => {
    const wpmText = `${format(",d")(yAccessor(d))} WPM`;
    const hinted = `${d.hintWasShown ? " (hinted). " : ""}`;
    if (d.markedCorrect) {
      return `${d.material}: ${wpmText}${claps(d)}${hinted}`;
    } else {
      if (d.material === d.typedText) {
        return `${d.material}: ${wpmText}${claps(d)}. ${hinted}`;
      } else {
        return `${d.material}: ${wpmText}${claps(d)}; you typed: ${
          d.typedText
        }. ${hinted}`;
      }
    }
  };

  return (
    <div className="mt3 mb1 relative" style={{ height: "240px" }} ref={ref}>
      <div
        className="chart-logo-lockup absolute bg-white mb0 pointer-none"
        // style={{ top: dimensions.marginTop}}
      >
        <p className="flex items-end pr1 mb0">
          <Icon
            iconSVGImport={TypeyTypeIcon}
            color="currentColor"
            width="1.25em"
            height="1.25em"
            className="icon mr1"
            style={{ transform: "translateY(-0.333333em)" }}
          />
          <span className="heading-link__logo-text" aria-hidden={true}>
            Typey&nbsp;Type
          </span>
        </p>
      </div>
      {highlightedDatum === null ? null : (
        <ErrorBoundary relative={true} vanish={true}>
          <Popover
            dimensions={dimensions}
            translateX={
              xAccessorScaled(highlightedDatum) + dimensions.marginLeft
            }
            translateY={Math.max(
              yAccessorScaled(highlightedDatum) +
                dimensions.marginTop -
                highlightCircleRadius,
              -highlightCircleRadius // prevents positioning higher than the chart
            )}
          >
            <p className="mw-240 mb0 mt1 flex">
              <span className="current-phrase-material truncate px05">
                {nominalAccessor(highlightedDatum)}
              </span>
              {claps(highlightedDatum, true)}
            </p>
            <p className="mw-240 mb1 flex">
              <span
                className="truncate px05 bg-info"
                style={{
                  backgroundColor: backgroundColorAccessor(highlightedDatum),
                  borderBottom: `2px solid ${colorAccessor(highlightedDatum)}`,
                }}
              >
                {/* @ts-expect-error TS(2339) FIXME: Property 'typedText' does not exist on type 'never... Remove this comment to see the full error message */}
                {highlightedDatum.typedText.replace(/^ $/, " ")}
              </span>
              {claps(highlightedDatum, true)}
            </p>
            <p className="mb0">
              {"materialIndex" in highlightedDatum &&
              // @ts-expect-error TS(2339) FIXME: Property 'materialIndex' does not exist on type 'n... Remove this comment to see the full error message
              highlightedDatum.materialIndex < minimumStrokes
                ? "~"
                : ""}
              {format(",d")(yAccessor(highlightedDatum))} WPM
              {/* @ts-expect-error TS(2339) FIXME: Property 'hintWasShown' does not exist on type 'ne... Remove this comment to see the full error message */}
              {highlightedDatum.hintWasShown ? (
                <span aria-label="(hinted)" role="img">
                  &nbsp;ℹ️
                </span>
              ) : null}
            </p>
          </Popover>
        </ErrorBoundary>
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
            {yScale === null ? null : (
              <Axis
                dimension={"y"}
                dimensions={dimensions}
                // @ts-expect-error
                scale={yScale}
                numberOfTicks={4}
                gridLines={true}
              />
            )}
            <g
              role="presentation"
              transform={`translate(0, ${dimensions.boundedHeight})`}
            >
              {/* @ts-expect-error TS(2339) FIXME: Property 'range' does not exist on type '(...args:... Remove this comment to see the full error message */}
              <Baseline scaleRange={xScale.range()} tickSize={tickSize} />
            </g>
            <Line
              type="line"
              // @ts-expect-error TS(7006) FIXME: Parameter 'd' implicitly has an 'any' type.
              data={data.dataPoints.filter((d) => !d.attemptPeak)}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              y0Accessor={y0AccessorScaled}
              interpolation={curveMonotoneX}
              colorAccessor={"#9880C2"}
            />
            <Line
              type="area"
              // @ts-expect-error TS(7006) FIXME: Parameter 'd' implicitly has an 'any' type.
              data={data.dataPoints.filter((d) => !d.attemptPeak)}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              y0Accessor={y0AccessorScaled}
              interpolation={curveMonotoneX}
              colorAccessor={"rgba(60%, 50%, 76%, 0.2)"}
            />
            <Line
              type="line"
              data={data.dataPoints.filter(
                // @ts-expect-error TS(7006) FIXME: Parameter 'd' implicitly has an 'any' type.
                (d) =>
                  !d.attemptPeak &&
                  "materialIndex" in d &&
                  d.materialIndex < minimumStrokes
              )}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              y0Accessor={y0AccessorScaled}
              interpolation={curveMonotoneX}
              colorAccessor={"#868091"}
            />
            {crowdedDataPoints ? (
              data.dataPoints
                .filter(
                  // @ts-expect-error TS(7006) FIXME: Parameter 'd' implicitly has an 'any' type.
                  (d) =>
                    !d.attemptPeak &&
                    !(
                      "materialIndex" in d && d.materialIndex < minimumStrokes
                    ) &&
                    !d.markedCorrect
                )
                // @ts-expect-error TS(7006) FIXME: Parameter 'd' implicitly has an 'any' type.
                .map((d) => (
                  <Rule
                    key={d.materialIndex}
                    x1={xAccessorScaled(d)}
                    y1={yAccessorScaled(d) - 8}
                    x2={xAccessorScaled(d)}
                    y2={yAccessorScaled(d) + 8}
                    stroke={colorAccessor(d)} //"#E8686A"
                  />
                ))
            ) : (
              <Circles
                data={data.dataPoints}
                accessibleLabel={accessibleLabel}
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
              <tspan role="img" aria-label="Start time">
                ⏱
              </tspan>{" "}
              {/* @ts-expect-error TS(2339) FIXME: Property 'domain' does not exist on type '(...args... Remove this comment to see the full error message */}
              {durationFormatter(xScale.domain()[0])}
            </text>
            <text
              textAnchor="end"
              // @ts-expect-error TS(2339) FIXME: Property 'range' does not exist on type '(...args:... Remove this comment to see the full error message
              transform={`translate(${xScale.range()[1]}, ${
                dimensions.boundedHeight
              })`}
              dy="1.5em"
            >
              {/* @ts-expect-error TS(2339) FIXME: Property 'domain' does not exist on type '(...args... Remove this comment to see the full error message */}
              {durationFormatter(xScale.domain()[1])}{" "}
              <tspan role="img" aria-label="Finished time">
                ⏱
              </tspan>
            </text>
          </>
        )}
      </Chart>
    </div>
  );
}
