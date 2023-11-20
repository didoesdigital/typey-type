import React from "react";
import Metronome from "./Metronome";
import userSettings from "../../../stories/fixtures/userSettings";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/Metronome",
  component: Metronome,
  id: "metronome", // permalink
};

const Template = (args) => {
  return <Metronome userSettings={userSettings} {...args} />;
};

export const MetronomeStory = Template.bind({});
MetronomeStory.storyName = "Metronome";
