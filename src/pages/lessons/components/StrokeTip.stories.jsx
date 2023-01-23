import React from "react";
import StrokeTip from "./StrokeTip";
import userSettings from "../../../stories/fixtures/userSettings";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/StrokeTip",
  component: StrokeTip,
  id: "metronome", // permalink
};

const Template = (args) => {
  return (
    <StrokeTip
      changeShowStrokesInLesson={() => undefined}
      currentStroke={"TEFT"}
      showStrokesInLesson={false}
      targetStrokeCount={1}
      userSettings={userSettings}
      repetitionsRemaining={1}
      {...args}
    />
  );
};

export const StrokeTipDiagramStory = Template.bind({});
StrokeTipDiagramStory.storyName = "Stroke tip diagram";
StrokeTipDiagramStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentStroke: "A/PHOEPB",
  showStrokesInLesson: true,
  targetStrokeCount: 1,
  userSettings: userSettings,
  repetitionsRemaining: 1,
};

export const StrokeTipPalantypeStory = Template.bind({});
StrokeTipPalantypeStory.storyName = "Stroke tip diagram Palantype";
StrokeTipPalantypeStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentStroke: "SCPTH+MFRNLYOEAU-I^NLCMFRPT+SH",
  showStrokesInLesson: true,
  targetStrokeCount: 1,
  userSettings: {
    ...userSettings,
    stenoLayout: "stenoLayoutPalantype",
    diagramSize: 2,
  },
  repetitionsRemaining: 1,
};

export const StrokeTipTextStory = Template.bind({});
StrokeTipTextStory.storyName = "Stroke tip text";
StrokeTipTextStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentStroke: "A/PHOEPB",
  showStrokesInLesson: true,
  targetStrokeCount: 2,
  userSettings: { ...userSettings, showStrokesAsDiagrams: false },
  repetitionsRemaining: 1,
};

export const StrokeTipHiddenStory = Template.bind({});
StrokeTipHiddenStory.storyName = "Stroke tip hidden";
StrokeTipHiddenStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentStroke: "A/PHOEPB",
  showStrokesInLesson: false,
  targetStrokeCount: 2,
  userSettings: { ...userSettings, showStrokesAsDiagrams: false },
  repetitionsRemaining: 1,
};
