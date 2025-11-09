import { useHydrateAtoms } from "jotai/utils";
import StrokeTip from "./StrokeTip";
import userSettings from "../../../stories/fixtures/userSettings";
import { userSettingsState } from "../../../states/userSettingsState";
import globalLookupDictionaryMinimalJSON from "../../../stories/fixtures/globalLookupDictionaryMinimal.json";
import AppMethodsContext from "../../../states/legacy/AppMethodsContext";
import appMethods from "../../../stories/fixtures/appMethods";

export default {
  title: "Lessons/StrokeTip",
  component: StrokeTip,
  id: "stroke-tip", // permalink
};

const globalLookupDictionaryMinimal = new Map(
  // @ts-expect-error TS(2769) FIXME: No overload matches this call.
  globalLookupDictionaryMinimalJSON,
);

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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
        ["KWA/TKRAOU/PHREU/KAEUT", "typey:typey-type-full.json"],
        ["KWA/TKRAOU/PHREU/KAT", "typey:typey-type-full.json"],
        ["KWA/TKRAOUP/HREU/KAEUT", "typey:typey-type-full.json"],
        ["KWA/TKRAOUP/HREU/KAT", "typey:typey-type-full.json"],
        ["KWA/TKRAOUP/KAEUT", "typey:typey-type-full.json"],
        ["KWA/TKRAOUP/KAT", "typey:typey-type-full.json"],
        ["KWA/TKRUP/KAEUT", "typey:typey-type-full.json"],
        ["KWA/TKRUP/KAT", "typey:typey-type-full.json"],
        ["KWAD/RAOU/PHREU/KAEUT", "typey:typey-type-full.json"],
        ["KWAD/RAOU/PHREU/KAT", "typey:typey-type-full.json"],
        ["KWAD/RAOUD/KAT", "typey:typey-type-full.json"],
        ["KWAD/RAOUP/HREU/KAEUT", "typey:typey-type-full.json"],
        ["KWAD/RAOUP/HREU/KAT", "typey:typey-type-full.json"],
        ["KWAD/RAOUP/HREUBGT", "typey:typey-type-full.json"],
        ["KWAD/RAOUP/KAEUT", "typey:typey-type-full.json"],
        ["KWAD/RAOUP/KAT", "typey:typey-type-full.json"],
        ["KWAD/RUP/KAEUT", "typey:typey-type-full.json"],
        ["KWAD/RUP/KAT", "typey:typey-type-full.json"],
        ["KWAU/TKRAOU/PHREU/KAEUT", "typey:typey-type-full.json"],
        ["KWAU/TKRAOU/PHREU/KAT", "typey:typey-type-full.json"],
        ["KWAU/TKRAOUP/HREU/KAEUT", "typey:typey-type-full.json"],
        ["KWAU/TKRAOUP/HREU/KAT", "typey:typey-type-full.json"],
        ["KWAU/TKRAOUP/KAEUT", "typey:typey-type-full.json"],
        ["KWAU/TKRAOUP/KAT", "typey:typey-type-full.json"],
        ["KWAU/TKRUP/KAEUT", "typey:typey-type-full.json"],
        ["KWAU/TKRUP/KAT", "typey:typey-type-full.json"],
        ["KWAUD/RAOU/PHREU/KAEUT", "typey:typey-type-full.json"],
        ["KWAUD/RAOU/PHREU/KAT", "typey:typey-type-full.json"],
        ["KWAUD/RAOUP/HREU/KAEUT", "typey:typey-type-full.json"],
        ["KWAUD/RAOUP/HREU/KAT", "typey:typey-type-full.json"],
        ["KWAUD/RAOUP/KAEUT", "typey:typey-type-full.json"],
        ["KWAUD/RAOUP/KAT", "typey:typey-type-full.json"],
        ["KWAUD/RUP/KAEUT", "typey:typey-type-full.json"],
        ["KWAUD/RUP/KAT", "typey:typey-type-full.json"],
      ],
    ],
  ]),
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
export const StrokeTipPalantypeStory = (args) => {
  const userSettingsForStrokeTipPalantypeStory = {
    ...userSettings,
    stenoLayout: "stenoLayoutPalantype",
    diagramSize: 2,
  };
  // @ts-expect-error TS(2769) FIXME: No overload matches this call.
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

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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
