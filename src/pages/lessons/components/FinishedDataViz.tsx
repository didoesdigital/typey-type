import React from "react";
import DisplayMetric from "../../../components/DisplayMetric";
import ErrorBoundary from "../../../components/ErrorBoundary";
import ComponentLoading from "../../../components/ComponentLoading";
import Loadable from "react-loadable";

type ChartData = {
  averageWPM: number;
  version: number;
  dataPoints?: any[];
} | null;

type FinishedDataVizProps = {
  wpm: number;
  numericAccuracy: number;
  chartData: ChartData;
  totalNumberOfNewWordsMet: number;
  totalNumberOfLowExposuresSeen: number;
  totalNumberOfRetainedWords: number;
  totalNumberOfHintedWords: number;
  totalNumberOfMistypedWords: number;
  wordsTyped: number;
};

type FinishedHeroDataProps = {
  speed: number;
  accuracy: number;
};

type SecondaryDisplayMetricsProps = {
  newWords: number;
  seen: number;
  memorised: number;
  hinted: number;
  misstrokes: number;
  wordsTyped: number;
};

const AsyncFinishedSpeedChart = Loadable({
  loader: () => import("../../../components/FinishedSpeedChart"),
  loading: ComponentLoading,
  delay: 300,
});

const FinishedHeroData = ({ speed, accuracy }: FinishedHeroDataProps) => {
  return (
    <div className="flex flex-wrap justify-between justify-center mx-auto mb3">
      <DisplayMetric
        size={"L"}
        value={speed}
        valueSuffix={undefined}
        label={"Words per minute"}
        tooltipMessage={"Assuming a word is 5 characters"}
      />
      <DisplayMetric
        size={"L"}
        value={accuracy}
        valueSuffix={"%"}
        label={"Accuracy"}
        tooltipMessage={
          "Assuming accurate words are typed within stroke count targets"
        }
      />
    </div>
  );
};

const SecondaryDisplayMetrics = ({
  newWords,
  seen,
  memorised,
  hinted,
  misstrokes,
  wordsTyped,
}: SecondaryDisplayMetricsProps) => {
  return (
    <div className="flex flex-wrap justify-between justify-center mx-auto mb3">
      <DisplayMetric
        size={"M"}
        value={newWords}
        valueSuffix={undefined}
        label={"New"}
        tooltipMessage={"Words you’ve now typed correctly without a hint"}
      />
      <DisplayMetric
        size={"M"}
        value={seen}
        valueSuffix={undefined}
        label={"Seen"}
        tooltipMessage={"Words you’ve seen before"}
      />
      <DisplayMetric
        size={"M"}
        value={memorised}
        valueSuffix={undefined}
        label={"From memory"}
        tooltipMessage={"Words you’ve now typed 30 times or more"}
      />
      <DisplayMetric
        size={"M"}
        value={hinted}
        valueSuffix={undefined}
        label={"Hinted"}
        tooltipMessage={"Words you typed with the hint shown"}
      />
      <DisplayMetric
        size={"M"}
        value={misstrokes}
        valueSuffix={undefined}
        label={"Misstrokes"}
        tooltipMessage={
          "Words you mistyped or took more strokes than the target number"
        }
      />
      <DisplayMetric
        size={"M"}
        value={wordsTyped}
        valueSuffix={undefined}
        label={"Typed"}
        tooltipMessage={"Each Typey Type word or phrase typed"}
      />
    </div>
  );
};

const skipToNextLessonLinkButton = (): void => {
  const link = document.querySelector<HTMLAnchorElement>("#next-lesson-button");
  if (link) {
    link.focus();
  }
};

const FinishedDataViz = ({
  wpm,
  numericAccuracy,
  chartData,
  totalNumberOfNewWordsMet,
  totalNumberOfLowExposuresSeen,
  totalNumberOfRetainedWords,
  totalNumberOfHintedWords,
  totalNumberOfMistypedWords,
  wordsTyped,
}: FinishedDataVizProps) => {
  const shouldShowChart =
    (chartData?.dataPoints?.length || 0) > 1 &&
    (chartData?.dataPoints?.length || 0) < 10000;

  return (
    <>
      <ErrorBoundary relative={true} vanish={true}>
        <FinishedHeroData speed={wpm} accuracy={numericAccuracy} />
      </ErrorBoundary>
      <ErrorBoundary relative={true} vanish={true}>
        <a
          href="#next-lesson-button"
          onClick={skipToNextLessonLinkButton}
          className="visually-hidden skip-to-link skip-to-link--relative"
          id="ga--finished--skip-chart"
        >
          Skip chart
        </a>
        {shouldShowChart && <AsyncFinishedSpeedChart data={chartData} />}
        <SecondaryDisplayMetrics
          newWords={totalNumberOfNewWordsMet}
          seen={totalNumberOfLowExposuresSeen}
          memorised={totalNumberOfRetainedWords}
          hinted={totalNumberOfHintedWords}
          misstrokes={totalNumberOfMistypedWords}
          wordsTyped={wordsTyped}
        />
        {shouldShowChart && (
          <details>
            <summary className="de-emphasized">Chart notes</summary>
            <div aria-hidden="true">
              <p className="text-left de-emphasized mb0">
                <span
                  style={{
                    backgroundColor: "transparent",
                    borderBottom: "2px solid transparent",
                  }}
                  role="img"
                  aria-label=" correct"
                >
                  👏
                </span>{" "}
                means you typed the phrase within the target number of strokes
              </p>
              <p className="text-left de-emphasized mb1">
                <span aria-label="(hinted)" role="img">
                  ℹ️
                </span>{" "}
                means the hint was shown
              </p>
            </div>
            <p className="text-left de-emphasized" id="chart-notes">
              Note: The first 4 words are averaged to reduce the impact of early
              instabilities. Typey&nbsp;Type starts recording the instant you
              start typing, so instead of recording the first word at infinity
              words per minute, it’s set to&nbsp;zero.{" "}
            </p>
          </details>
        )}
      </ErrorBoundary>
    </>
  );
};

export default FinishedDataViz;
