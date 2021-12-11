import React from 'react';

import FinishedSpeedChart from '../components/FinishedSpeedChart';
import practiceProverb from './fixtures/practiceProverb.json';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Speed chart',
  component: FinishedSpeedChart,
};

const Template = (args) => <FinishedSpeedChart {...args} />;

export const ShortLesson = Template.bind({});
ShortLesson.args = {
  data: practiceProverb,
  type: 'area'
};
ShortLesson.storyName = "Short lesson"



const generateData = (numberOfWords) => {
  let generatedData = {
    averageWPM: 120,
    "marks": []
  }

  let marks = [];

  for (let i = 1; i < numberOfWords + 1; i++) {
    let elapsedTime = (i * 1000) + (Math.random() * 1000); // [1200, 2900, 3100]
    let wordsPerMinute = i / (elapsedTime / 1000 / 60);
    let typedText = i % 2 === 0 ? "five." : "chars";
    let material =  i % 2 === 0 ? "five." : "chars";
    let markedCorrect = true;
    let hint = "TPAOEUF/TP-PL";
    marks.push({
      elapsedTime: elapsedTime,
      wordsPerMinute: wordsPerMinute,
      material: material,
      markedCorrect: markedCorrect,
      hint: hint,
    })
  }

  generatedData.marks = marks;

  return generatedData;
}

export const LongLesson = (args) => (
  <div className="mt10 p3">
    <FinishedSpeedChart data={generateData(args.numberOfWords)} {...args} />
  </div>
);
LongLesson.args = {
  numberOfWords: 1000,
};
LongLesson.storyName = "Long lesson"



export const WPM5 = Template.bind({});
WPM5.args = {
  data: practiceProverb,
};
WPM5.storyName = "5 WPM lesson"

export const WPM21 = Template.bind({});
WPM21.args = {
  data: practiceProverb,
};
WPM21.storyName = "21 WPM lesson"

export const WPM23 = Template.bind({});
WPM23.args = {
  data: practiceProverb,
};
WPM23.storyName = "23 WPM lesson"

export const WPM28 = Template.bind({});
WPM28.args = {
  data: practiceProverb,
};
WPM28.storyName = "28 WPM lesson"

export const WPM41 = Template.bind({});
WPM41.args = {
  data: practiceProverb,
};
WPM41.storyName = "41 WPM lesson"

export const WPM61 = Template.bind({});
WPM61.args = {
  data: practiceProverb,
};
WPM61.storyName = "61 WPM lesson"

export const WPM151 = Template.bind({});
WPM151.args = {
  data: practiceProverb,
};
WPM151.storyName = "151 WPM lesson"

export const WPM226 = Template.bind({});
WPM226.args = {
  data: practiceProverb,
};
WPM226.storyName = "226 WPM lesson"

