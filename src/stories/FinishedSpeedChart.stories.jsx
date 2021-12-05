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

export const LongLesson = Template.bind({});
LongLesson.args = {
  data: practiceProverb,
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

