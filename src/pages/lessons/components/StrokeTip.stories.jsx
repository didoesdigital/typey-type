import React from "react";
import { useHydrateAtoms } from "jotai/utils";
import StrokeTip from "./StrokeTip";
import userSettings from "../../../stories/fixtures/userSettings";
import { userSettingsState } from "../../../states/userSettingsState";
import globalLookupDictionaryMinimalJSON from "../../../stories/fixtures/globalLookupDictionaryMinimal.json";
import AppMethodsContext from "../../../states/legacy/AppMethodsContext";
import appMethods from "../../../stories/fixtures/appMethods";

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

export const StrokeTipListStory = (args) => {
  const userSettingsForStrokeTipListStory = {
    ...userSettings,
    showStrokesAsList: true,
  };
  useHydrateAtoms([[userSettingsState, userSettingsForStrokeTipListStory]]);
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <StrokeTip
        changeShowStrokesInLesson={() => undefined}
        currentPhrase="quadruplicate"
        currentStroke="KWAD/RUP/KAT"
        globalLookupDictionary={globalLookupDictionaryMinimal}
        globalLookupDictionaryLoaded={true}
        showStrokesInLesson={true}
        targetStrokeCount={2}
        repetitionsRemaining={1}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};
StrokeTipListStory.storyName = "Stroke tip list, lots of briefs";
StrokeTipListStory.args = {
  globalLookupDictionary: new Map([
    ["{^cate}", [["KAEUT", "typey:typey-type.json"]]],
    [
      "quadruplicate",
      [
        ["KWAD/RUP/KAT", "typey:typey-type.json"],
        ["KWA/TKRAOU/PHREU/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWA/TKRAOU/PHREU/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWA/TKRAOUP/HREU/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWA/TKRAOUP/HREU/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWA/TKRAOUP/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWA/TKRAOUP/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWA/TKRUP/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWA/TKRUP/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAD/RAOU/PHREU/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAD/RAOU/PHREU/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAD/RAOUD/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAD/RAOUP/HREU/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAD/RAOUP/HREU/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAD/RAOUP/HREUBGT", "plover:plover-main-3-jun-2018.json"],
        ["KWAD/RAOUP/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAD/RAOUP/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAD/RUP/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAD/RUP/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAU/TKRAOU/PHREU/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAU/TKRAOU/PHREU/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAU/TKRAOUP/HREU/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAU/TKRAOUP/HREU/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAU/TKRAOUP/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAU/TKRAOUP/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAU/TKRUP/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAU/TKRUP/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAUD/RAOU/PHREU/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAUD/RAOU/PHREU/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAUD/RAOUP/HREU/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAUD/RAOUP/HREU/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAUD/RAOUP/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAUD/RAOUP/KAT", "plover:plover-main-3-jun-2018.json"],
        ["KWAUD/RUP/KAEUT", "plover:plover-main-3-jun-2018.json"],
        ["KWAUD/RUP/KAT", "plover:plover-main-3-jun-2018.json"],
      ],
    ],
  ]),
};

export const StrokeTipListNoBriefsStory = (args) => {
  const userSettingsForStrokeTipListNoBriefsStory = {
    ...userSettings,
    showStrokesAsList: true,
  };
  useHydrateAtoms([
    [userSettingsState, userSettingsForStrokeTipListNoBriefsStory],
  ]);
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <StrokeTip
        changeShowStrokesInLesson={() => undefined}
        currentPhrase={"test"}
        currentStroke={"TEFT"}
        globalLookupDictionary={globalLookupDictionaryMinimal}
        globalLookupDictionaryLoaded={true}
        showStrokesInLesson={false}
        targetStrokeCount={1}
        repetitionsRemaining={1}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};
StrokeTipListNoBriefsStory.storyName = "Stroke tip list, no briefs";
StrokeTipListNoBriefsStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentPhrase: "alone",
  currentStroke: "A/PHOEPB",
  globalLookupDictionary: globalLookupDictionaryMinimal,
  globalLookupDictionaryLoaded: true,
  showStrokesInLesson: true,
  targetStrokeCount: 2,
  repetitionsRemaining: 1,
};

export const StrokeTipDiagramStory = (args) => {
  useHydrateAtoms([[userSettingsState, userSettings]]);
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <StrokeTip
        changeShowStrokesInLesson={() => undefined}
        currentPhrase={"test"}
        currentStroke={"TEFT"}
        globalLookupDictionary={globalLookupDictionaryMinimal}
        globalLookupDictionaryLoaded={true}
        showStrokesInLesson={false}
        targetStrokeCount={1}
        repetitionsRemaining={1}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};
StrokeTipDiagramStory.storyName = "Stroke tip diagram";
StrokeTipDiagramStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentPhrase: "alone",
  currentStroke: "A/PHOEPB",
  globalLookupDictionary: globalLookupDictionaryMinimal,
  globalLookupDictionaryLoaded: true,
  showStrokesInLesson: true,
  targetStrokeCount: 1,
  repetitionsRemaining: 1,
};

export const StrokeTipPalantypeStory = (args) => {
  const userSettingsForStrokeTipPalantypeStory = {
    ...userSettings,
    stenoLayout: "stenoLayoutPalantype",
    diagramSize: 2,
  };
  // @ts-ignore TODO: add UserSettings type to user settings object
  useHydrateAtoms([
    [userSettingsState, userSettingsForStrokeTipPalantypeStory],
  ]);
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <StrokeTip
        changeShowStrokesInLesson={() => undefined}
        currentPhrase={"test"}
        currentStroke={"TEFT"}
        globalLookupDictionary={globalLookupDictionaryMinimal}
        globalLookupDictionaryLoaded={true}
        showStrokesInLesson={false}
        targetStrokeCount={1}
        repetitionsRemaining={1}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};
StrokeTipPalantypeStory.storyName = "Stroke tip diagram Palantype";
StrokeTipPalantypeStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentPhrase: "alone",
  currentStroke: "SCPTH+MFRNLYOEAU-I^NLCMFRPT+SH",
  globalLookupDictionary: globalLookupDictionaryMinimal,
  globalLookupDictionaryLoaded: true,
  showStrokesInLesson: true,
  targetStrokeCount: 1,
  userSettings: {},
  repetitionsRemaining: 1,
};

export const StrokeTipTextStory = (args) => {
  const userSettingsForStrokeTipTextStory = {
    ...userSettings,
    showStrokesAsDiagrams: false,
  };
  useHydrateAtoms([[userSettingsState, userSettingsForStrokeTipTextStory]]);
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <StrokeTip
        changeShowStrokesInLesson={() => undefined}
        currentPhrase={"test"}
        currentStroke={"TEFT"}
        globalLookupDictionary={globalLookupDictionaryMinimal}
        globalLookupDictionaryLoaded={true}
        showStrokesInLesson={false}
        targetStrokeCount={1}
        repetitionsRemaining={1}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};
StrokeTipTextStory.storyName = "Stroke tip text";
StrokeTipTextStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentPhrase: "alone",
  currentStroke: "A/PHOEPB",
  globalLookupDictionary: globalLookupDictionaryMinimal,
  globalLookupDictionaryLoaded: true,
  showStrokesInLesson: true,
  targetStrokeCount: 2,
  repetitionsRemaining: 1,
};

export const StrokeTipHiddenStory = (args) => {
  const userSettingsForStrokeTipHiddenStory = {
    ...userSettings,
    showStrokesAsDiagrams: false,
  };
  useHydrateAtoms([[userSettingsState, userSettingsForStrokeTipHiddenStory]]);
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <StrokeTip
        changeShowStrokesInLesson={() => undefined}
        currentPhrase={"test"}
        currentStroke={"TEFT"}
        globalLookupDictionary={globalLookupDictionaryMinimal}
        globalLookupDictionaryLoaded={true}
        showStrokesInLesson={false}
        targetStrokeCount={1}
        repetitionsRemaining={1}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};
StrokeTipHiddenStory.storyName = "Stroke tip hidden";
StrokeTipHiddenStory.args = {
  changeShowStrokesInLesson: () => undefined,
  currentPhrase: "alone",
  currentStroke: "A/PHOEPB",
  globalLookupDictionary: globalLookupDictionaryMinimal,
  globalLookupDictionaryLoaded: true,
  showStrokesInLesson: false,
  targetStrokeCount: 2,
  repetitionsRemaining: 1,
};
