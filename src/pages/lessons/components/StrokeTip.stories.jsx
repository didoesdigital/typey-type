import React from "react";
import StrokeTip from "./StrokeTip";
import userSettings from "../../../stories/fixtures/userSettings";
import globalLookupDictionaryMinimalJSON from "../../../stories/fixtures/globalLookupDictionaryMinimal.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/StrokeTip",
  component: StrokeTip,
  id: "stroke-tip", // permalink
};

const globalLookupDictionaryMinimal = new Map(
  // @ts-ignore
  globalLookupDictionaryMinimalJSON
);

const Template = (args) => {
  return (
    <StrokeTip
      changeShowStrokesInLesson={() => undefined}
      currentPhrase={"test"}
      currentStroke={"TEFT"}
      globalLookupDictionary={globalLookupDictionaryMinimal}
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
  currentPhrase: "alone",
  currentStroke: "A/PHOEPB",
  globalLookupDictionary: globalLookupDictionaryMinimal,
  showStrokesInLesson: true,
  targetStrokeCount: 1,
  userSettings: userSettings,
  repetitionsRemaining: 1,
};

export const StrokeTipPalantypeStory = Template.bind({});
StrokeTipPalantypeStory.storyName = "Stroke tip diagram Palantype";
StrokeTipPalantypeStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentPhrase: "alone",
  currentStroke: "SCPTH+MFRNLYOEAU-I^NLCMFRPT+SH",
  globalLookupDictionary: globalLookupDictionaryMinimal,
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
  currentPhrase: "alone",
  currentStroke: "A/PHOEPB",
  globalLookupDictionary: globalLookupDictionaryMinimal,
  showStrokesInLesson: true,
  targetStrokeCount: 2,
  userSettings: { ...userSettings, showStrokesAsDiagrams: false },
  repetitionsRemaining: 1,
};

export const StrokeTipHiddenStory = Template.bind({});
StrokeTipHiddenStory.storyName = "Stroke tip hidden";
StrokeTipHiddenStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentPhrase: "alone",
  currentStroke: "A/PHOEPB",
  globalLookupDictionary: globalLookupDictionaryMinimal,
  showStrokesInLesson: false,
  targetStrokeCount: 2,
  userSettings: { ...userSettings, showStrokesAsDiagrams: false },
  repetitionsRemaining: 1,
};
