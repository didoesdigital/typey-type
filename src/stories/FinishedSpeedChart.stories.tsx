import React from "react";
import FinishedSpeedChart from "../components/FinishedSpeedChart";
import catHavoc from "./fixtures/catHavoc.json";
import customTestPhrases from "./fixtures/customTestPhrases.json";
import shortAndSlow from "./fixtures/shortAndSlow.json";
import discoverInversion from "./fixtures/discoverInversion.json";
import discoverInversionTwice from "./fixtures/discoverInversionTwice.json";
import discoverIntroduction from "./fixtures/discoverIntroduction.json";
import practiceProverb from "./fixtures/practiceProverb.json";
import practiceProverbZ from "./fixtures/practiceProverbZ.json";
import topProjectGutenbergWords from "./fixtures/topProjectGutenbergWords.json";

/* NOTE:
 * To make more fixtures, add a console.log for the transformedData
 * output of transformLessonDataToChartData and type out a lesson.
 */

export default {
  title: "Lessons/Speed chart",
  component: FinishedSpeedChart,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'numberOfWords' implicitly has an 'any' ... Remove this comment to see the full error message
const generateData = (numberOfWords) => {
  const generatedData = {
    averageWPM: 120,
    dataPoints: [],
  };

  const dataPoints = [];

  for (let i = 1; i < numberOfWords + 1; i++) {
    const elapsedTime = i * 1000 + Math.random() * 1000; // [1200, 2900, 3100]
    const wordsPerMinute = i / (elapsedTime / 1000 / 60);
    const typedText = i % 2 === 0 ? "five." : "chars";
    const material = i % 2 === 0 ? "five." : "chars";
    const markedCorrect = true;
    const hint = "TPAOEUF/TP-PL";
    dataPoints.push({
      attemptPeak: false,
      elapsedTime: elapsedTime,
      wordsPerMinute: wordsPerMinute,
      typedText: typedText,
      material: material,
      markedCorrect: markedCorrect,
      hint: hint,
    });
  }

  // @ts-expect-error TS(2322) FIXME: Type '{ attemptPeak: boolean; elapsedTime: number;... Remove this comment to see the full error message
  generatedData.dataPoints = dataPoints;

  return generatedData;
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="mt10 p3">
    <FinishedSpeedChart {...args} />
  </div>
);

export const ShortLesson = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
ShortLesson.args = {
  data: practiceProverb,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
ShortLesson.storyName = "Short lesson";

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
export const LongLesson = (args) => (
  <div className="mt10 p3">
    <FinishedSpeedChart data={generateData(args.numberOfWords)} {...args} />
  </div>
);
LongLesson.args = {
  numberOfWords: 1000,
};
LongLesson.storyName = "Long lesson";
LongLesson.parameters = {
  chromatic: { disableSnapshot: true },
};

export const TestPhrases = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
TestPhrases.args = {
  data: customTestPhrases,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
TestPhrases.storyName = "Test phrases";

export const WPM2 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM2.args = {
  data: shortAndSlow,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM2.storyName = "2 WPM lesson";

export const WPM3 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM3.args = {
  data: discoverInversion,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM3.storyName = "3 WPM lesson";

export const WPM4 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM4.args = {
  data: discoverInversionTwice,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM4.storyName = "4 WPM lesson";

export const WPM5 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM5.args = {
  data: discoverIntroduction,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM5.storyName = "5 WPM lesson";

export const WPM21 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM21.args = {
  data: practiceProverbZ,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM21.storyName = "21 WPM lesson";

export const WPM23 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM23.args = {
  data: practiceProverb,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM23.storyName = "23 WPM lesson (TODO)";

export const WPM28 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM28.args = {
  data: practiceProverb,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM28.storyName = "28 WPM lesson (TODO)";

export const WPM41 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM41.args = {
  data: practiceProverb,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM41.storyName = "41 WPM lesson (TODO)";

export const WPM58 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM58.args = {
  data: topProjectGutenbergWords,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM58.storyName = "58 WPM lesson";

export const WPM60 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM60.args = {
  data: catHavoc,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM60.storyName = "60 WPM lesson (cat havoc)";

export const WPM61 = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM61.args = {
  data: practiceProverb,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM61.storyName = "61 WPM lesson";

export const WPM111 = Template.bind({});
const WPM111Data = Object.assign({}, practiceProverb);
WPM111Data.dataPoints = WPM111Data.dataPoints.map(
  ({ wordsPerMinute, ...datumProps }, i) => ({
    ...datumProps,
    wordsPerMinute: i !== 0 ? wordsPerMinute + 30 : wordsPerMinute,
  }),
);
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM111.args = {
  data: WPM111Data,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM111.storyName = "111 WPM lesson (FIXME)";

export const WPM151 = Template.bind({});
const WPM151Data = Object.assign({}, practiceProverb);
WPM151Data.dataPoints = WPM151Data.dataPoints.map(
  ({ wordsPerMinute, ...datumProps }, i) => ({
    ...datumProps,
    wordsPerMinute: i !== 0 ? wordsPerMinute + 120 : wordsPerMinute,
  }),
);
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM151.args = {
  data: WPM151Data,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM151.storyName = "151 WPM lesson (FIXME)";

export const WPM226 = Template.bind({});
const WPM226Data = Object.assign({}, practiceProverb);
WPM226Data.dataPoints = WPM226Data.dataPoints.map(
  ({ wordsPerMinute, ...datumProps }, i) => ({
    ...datumProps,
    wordsPerMinute: i !== 0 ? wordsPerMinute + 160 : wordsPerMinute,
  }),
);
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM226.args = {
  data: WPM226Data,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM226.storyName = "226 WPM lesson (FIXME)";

export const WPM320 = Template.bind({});
const WPM320Data = Object.assign({}, practiceProverb);
WPM320Data.dataPoints = WPM320Data.dataPoints.map(
  ({ wordsPerMinute, ...datumProps }, i) => ({
    ...datumProps,
    wordsPerMinute: i !== 0 ? wordsPerMinute + 260 : wordsPerMinute,
  }),
);
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
WPM320.args = {
  data: WPM320Data,
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
WPM320.storyName = "320 WPM lesson (FIXME)";
