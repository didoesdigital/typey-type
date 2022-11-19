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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/Speed chart",
  component: FinishedSpeedChart,
};

const generateData = (numberOfWords) => {
  let generatedData = {
    averageWPM: 120,
    dataPoints: [],
  };

  let dataPoints = [];

  for (let i = 1; i < numberOfWords + 1; i++) {
    let elapsedTime = i * 1000 + Math.random() * 1000; // [1200, 2900, 3100]
    let wordsPerMinute = i / (elapsedTime / 1000 / 60);
    let typedText = i % 2 === 0 ? "five." : "chars";
    let material = i % 2 === 0 ? "five." : "chars";
    let markedCorrect = true;
    let hint = "TPAOEUF/TP-PL";
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

  generatedData.dataPoints = dataPoints;

  return generatedData;
};

const Template = (args) => (
  <div className="mt10 p3">
    <FinishedSpeedChart {...args} />
  </div>
);

export const ShortLesson = Template.bind({});
ShortLesson.args = {
  data: practiceProverb,
};
ShortLesson.storyName = "Short lesson";

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
TestPhrases.args = {
  data: customTestPhrases,
};
TestPhrases.storyName = "Test phrases";

export const WPM2 = Template.bind({});
WPM2.args = {
  data: shortAndSlow,
};
WPM2.storyName = "2 WPM lesson";

export const WPM3 = Template.bind({});
WPM3.args = {
  data: discoverInversion,
};
WPM3.storyName = "3 WPM lesson";

export const WPM4 = Template.bind({});
WPM4.args = {
  data: discoverInversionTwice,
};
WPM4.storyName = "4 WPM lesson";

export const WPM5 = Template.bind({});
WPM5.args = {
  data: discoverIntroduction,
};
WPM5.storyName = "5 WPM lesson";

export const WPM21 = Template.bind({});
WPM21.args = {
  data: practiceProverbZ,
};
WPM21.storyName = "21 WPM lesson";

export const WPM23 = Template.bind({});
WPM23.args = {
  data: practiceProverb,
};
WPM23.storyName = "23 WPM lesson (TODO)";

export const WPM28 = Template.bind({});
WPM28.args = {
  data: practiceProverb,
};
WPM28.storyName = "28 WPM lesson (TODO)";

export const WPM41 = Template.bind({});
WPM41.args = {
  data: practiceProverb,
};
WPM41.storyName = "41 WPM lesson (TODO)";

export const WPM58 = Template.bind({});
WPM58.args = {
  data: topProjectGutenbergWords,
};
WPM58.storyName = "58 WPM lesson";

export const WPM60 = Template.bind({});
WPM60.args = {
  data: catHavoc,
};
WPM60.storyName = "60 WPM lesson (cat havoc)";

export const WPM61 = Template.bind({});
WPM61.args = {
  data: practiceProverb,
};
WPM61.storyName = "61 WPM lesson";

export const WPM111 = Template.bind({});
let WPM111Data = Object.assign({}, practiceProverb);
WPM111Data.dataPoints = WPM111Data.dataPoints.map(
  ({ wordsPerMinute, ...datumProps }, i) => ({
    ...datumProps,
    wordsPerMinute: i !== 0 ? wordsPerMinute + 30 : wordsPerMinute,
  })
);
WPM111.args = {
  data: WPM111Data,
};
WPM111.storyName = "111 WPM lesson (FIXME)";

export const WPM151 = Template.bind({});
let WPM151Data = Object.assign({}, practiceProverb);
WPM151Data.dataPoints = WPM151Data.dataPoints.map(
  ({ wordsPerMinute, ...datumProps }, i) => ({
    ...datumProps,
    wordsPerMinute: i !== 0 ? wordsPerMinute + 120 : wordsPerMinute,
  })
);
WPM151.args = {
  data: WPM151Data,
};
WPM151.storyName = "151 WPM lesson (FIXME)";

export const WPM226 = Template.bind({});
let WPM226Data = Object.assign({}, practiceProverb);
WPM226Data.dataPoints = WPM226Data.dataPoints.map(
  ({ wordsPerMinute, ...datumProps }, i) => ({
    ...datumProps,
    wordsPerMinute: i !== 0 ? wordsPerMinute + 160 : wordsPerMinute,
  })
);
WPM226.args = {
  data: WPM226Data,
};
WPM226.storyName = "226 WPM lesson (FIXME)";

export const WPM320 = Template.bind({});
let WPM320Data = Object.assign({}, practiceProverb);
WPM320Data.dataPoints = WPM320Data.dataPoints.map(
  ({ wordsPerMinute, ...datumProps }, i) => ({
    ...datumProps,
    wordsPerMinute: i !== 0 ? wordsPerMinute + 260 : wordsPerMinute,
  })
);
WPM320.args = {
  data: WPM320Data,
};
WPM320.storyName = "320 WPM lesson (FIXME)";
