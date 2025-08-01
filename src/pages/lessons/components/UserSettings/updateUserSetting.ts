import GoogleAnalytics from "react-ga4";
import PARAMS from "../../../../utils/params";
import { useAtom, useSetAtom } from "jotai";
import {
  beatsPerMinuteState,
  diagramSizeState,
  hideOtherSettingsState,
  limitNumberOfWordsState,
  repetitionsState,
  showScoresWhileTypingState,
  showStrokesAsDiagramsState,
  showStrokesAsListState,
  showStrokesOnMisstrokeState,
  sortOrderState,
  spacePlacementState,
  startFromWordSettingState,
  stenoLayoutState,
  upcomingWordsLayoutState,
  userSettingsState,
} from "../../../../states/userSettingsState";
import { useAppMethods } from "../../../../states/legacy/AppMethodsContext";

import type { Study, UserSettings } from "types";
import type { LessonCanvasFooterProps } from "pages/lessons/components/LessonCanvasFooter";

let synth: SpeechSynthesis | null = null;
try {
  synth = window.speechSynthesis;
} catch (e) {
  console.log("This device doesn't support speechSynthesis", e);
}

export function useChangeShowScoresWhileTyping() {
  const [state, setState] = useAtom(showScoresWhileTypingState);
  return () => {
    const newState = !state;

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change show scores while typing",
      label: newState.toString(),
    });
    setState(newState);
  };
}

export function useChangeShowStrokesAs() {
  const setState = useSetAtom(showStrokesAsDiagramsState);

  const onChangeShowStrokesAs: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value;
    setState(value !== "strokesAsText");

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change show strokes as",
      label: labelString,
    });
  };

  return onChangeShowStrokesAs;
}

export function useChangeShowStrokesAsList() {
  const setState = useSetAtom(showStrokesAsListState);
  const { appFetchAndSetupGlobalDict } = useAppMethods();

  const onChangeShowStrokesAsList: React.ChangeEventHandler<
    HTMLInputElement
  > = (event) => {
    const value = event.target.checked;
    setState(value);

    let labelString = value.toString();
    if (value) {
      appFetchAndSetupGlobalDict(null).catch((error) => {
        console.error(error);
      });
    } else {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change show strokes as list",
      label: labelString,
    });
  };

  return onChangeShowStrokesAsList;
}

export function useChangeShowStrokesOnMisstroke() {
  const [state, setState] = useAtom(showStrokesOnMisstrokeState);
  return () => {
    const value = !state;
    setState(value);

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change show strokes on misstroke",
      label: value.toString(),
    });
  };
}

export function useChangeSortOrderUserSetting() {
  const setState = useSetAtom(sortOrderState);

  const onChangeSortOrderUserSetting: React.ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    const value = event.target.value;
    setState(value);

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change sort order",
      label: labelString,
    });
  };

  return onChangeSortOrderUserSetting;
}

export function useChangeSpacePlacementUserSetting() {
  const setState = useSetAtom(spacePlacementState);

  const onChangeSpacePlacementUserSetting: React.ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    const value = event.target.value;
    setState(value);

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change spacePlacement",
      label: labelString,
    });

    return value;
  };

  return onChangeSpacePlacementUserSetting;
}

export function useChangeStenoLayout() {
  const setState = useSetAtom(stenoLayoutState);

  const onChangeStenoLayout: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setState(value);

    let labelString = value;
    let actionString = "Change steno layout";
    if (name === "writerStenoLayout") {
      actionString = "Change writer steno layout";
    }
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: actionString,
      label: labelString,
    });

    return value;
  };

  return onChangeStenoLayout;
}

type CheckboxSetting = keyof Pick<
  UserSettings,
  | "blurMaterial"
  | "caseSensitive"
  | "hideStrokesOnLastRepetition"
  | "newWords"
  | "punctuationDescriptions"
  | "retainedWords"
  | "seenWords"
  | "showStrokes"
  | "simpleTypography"
  | "speakMaterial"
  | "textInputAccessibility"
>;
const validCheckboxSettings: CheckboxSetting[] = [
  "blurMaterial",
  "caseSensitive",
  "hideStrokesOnLastRepetition",
  "newWords",
  "punctuationDescriptions",
  "retainedWords",
  "seenWords",
  "showStrokes",
  "simpleTypography",
  "speakMaterial",
  "textInputAccessibility",
];
export function useChangeUserSetting() {
  const [currentState, setState] = useAtom(userSettingsState);

  const onChangeUserSetting: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    let newState = Object.assign({}, currentState);

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    if (
      typeof value === "boolean" &&
      validCheckboxSettings.includes(name as CheckboxSetting)
    ) {
      const settingName = name as CheckboxSetting;
      newState[settingName] = value;
    }

    if (!newState.speakMaterial && synth) {
      synth.cancel();
    }

    setState(newState);

    const labelString = !!value ? `${value}` : "BAD_INPUT";

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change " + name,
      label: labelString,
    });

    return value;
  };

  return onChangeUserSetting;
}

export function useChangeVoiceUserSetting(): (
  voiceName: string,
  voiceURI: string
) => void {
  const [currentState, setState] = useAtom(userSettingsState);
  return (voiceName, voiceURI) => {
    let newState = Object.assign({}, currentState);

    newState["voiceName"] = voiceName;
    newState["voiceURI"] = voiceURI;

    setState(newState);

    // Let's not bother with tracking voice name. URI is enough.
    let labelString = voiceURI;
    if (!voiceURI) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change voice",
      label: labelString,
    });
  };
}

export function useChooseStudy() {
  const [currentState, setState] = useAtom(userSettingsState);
  const onChooseStudy: LessonCanvasFooterProps["chooseStudy"] = (event) => {
    let newState = Object.assign({}, currentState);

    const value = event.target.value;

    switch (value) {
      case "discover":
        newState.study = "discover";
        newState.showStrokes = PARAMS.discover.showStrokes;
        newState.hideStrokesOnLastRepetition =
          PARAMS.discover.hideStrokesOnLastRepetition;
        newState.newWords = PARAMS.discover.newWords;
        newState.seenWords = PARAMS.discover.seenWords;
        newState.retainedWords = PARAMS.discover.retainedWords;
        newState.repetitions =
          currentState.studyPresets?.[0]?.repetitions ||
          PARAMS.discover.repetitions;
        newState.limitNumberOfWords =
          currentState.studyPresets?.[0]?.limitNumberOfWords ??
          PARAMS.discover.limitNumberOfWords;
        newState.sortOrder = PARAMS.discover.sortOrder;
        break;
      case "revise":
        newState.study = "revise";
        newState.showStrokes = PARAMS.revise.showStrokes;
        newState.hideStrokesOnLastRepetition =
          PARAMS.revise.hideStrokesOnLastRepetition;
        newState.newWords = PARAMS.revise.newWords;
        newState.seenWords = PARAMS.revise.seenWords;
        newState.retainedWords = PARAMS.revise.retainedWords;
        newState.repetitions =
          currentState.studyPresets?.[1]?.repetitions ||
          PARAMS.revise.repetitions;
        newState.limitNumberOfWords =
          currentState.studyPresets?.[1]?.limitNumberOfWords ??
          PARAMS.revise.limitNumberOfWords;
        newState.sortOrder = PARAMS.revise.sortOrder;
        break;
      case "drill":
        newState.study = "drill";
        newState.showStrokes = PARAMS.drill.showStrokes;
        newState.hideStrokesOnLastRepetition =
          PARAMS.drill.hideStrokesOnLastRepetition;
        newState.newWords = PARAMS.drill.newWords;
        newState.seenWords = PARAMS.drill.seenWords;
        newState.retainedWords = PARAMS.drill.retainedWords;
        newState.repetitions =
          currentState.studyPresets?.[2]?.repetitions ||
          PARAMS.drill.repetitions;
        newState.limitNumberOfWords =
          currentState.studyPresets?.[2]?.limitNumberOfWords ??
          PARAMS.drill.limitNumberOfWords;
        newState.sortOrder = PARAMS.drill.sortOrder;
        break;
      case "practice":
        newState.study = "practice";
        newState.showStrokes = PARAMS.practice.showStrokes;
        newState.hideStrokesOnLastRepetition =
          PARAMS.practice.hideStrokesOnLastRepetition;
        newState.newWords = PARAMS.practice.newWords;
        newState.seenWords = PARAMS.practice.seenWords;
        newState.retainedWords = PARAMS.practice.retainedWords;
        newState.repetitions =
          currentState.studyPresets?.[3]?.repetitions ||
          PARAMS.practice.repetitions;
        newState.limitNumberOfWords =
          currentState.studyPresets?.[3]?.limitNumberOfWords ??
          PARAMS.practice.limitNumberOfWords;
        newState.sortOrder = PARAMS.practice.sortOrder;
        break;
      default:
        break;
    }

    setState(newState);

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Choose Study Type",
      label: labelString,
    });

    return value;
  };

  return onChooseStudy;
}

export function useHandleBeatsPerMinute() {
  const setState = useSetAtom(beatsPerMinuteState);

  const onHandleBeatsPerMinute: ((value: number) => void) | undefined = (
    value
  ) => {
    if (!isNaN(value)) {
      setState(value);
    }

    const labelString = !!value ? `${value}` : "BAD_INPUT";

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change beats per minute",
      label: labelString,
    });

    return value;
  };

  return onHandleBeatsPerMinute;
}

export function useHandleDiagramSize() {
  const setState = useSetAtom(diagramSizeState);

  const onHandleDiagramSize: ((value: number) => void) | undefined = (
    event
  ) => {
    let value = typeof event === "number" ? +event.toFixed(1) : 1.0;
    if (value > 2) {
      value = 2.0;
    }
    if (value < 1) {
      value = 1.0;
    }

    setState(value);

    const labelString = !!value ? `${value}` : "BAD_INPUT";

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change diagram size",
      label: labelString,
    });

    return value;
  };

  return onHandleDiagramSize;
}

export function useHandleLimitWordsChange() {
  const setState = useSetAtom(limitNumberOfWordsState);

  const onHandleLimitWordsChange: ((value: number) => void) | undefined = (
    event
  ) => {
    const value = event;

    setState(value);

    const labelString = !!value ? `${value}` : "BAD_INPUT";

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change limit word count",
      label: labelString,
    });

    return value;
  };

  return onHandleLimitWordsChange;
}

export function useHandleRepetitionsChange() {
  const setState = useSetAtom(repetitionsState);

  const onHandleRepetitionsChange: ((value: number) => void) | undefined = (
    event
  ) => {
    const value = event;

    setState(value);

    const labelString = !!value ? `${value}` : "BAD_INPUT";

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change repetitions",
      label: labelString,
    });

    return value;
  };

  return onHandleRepetitionsChange;
}

export function useHandleStartFromWordChange() {
  const setState = useSetAtom(startFromWordSettingState);

  const onHandleStartFromWordChange: ((value: number) => void) | undefined = (
    event
  ) => {
    const value = event;

    setState(value);

    const labelString = !!value ? `${value}` : "BAD_INPUT";

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change start from word",
      label: labelString,
    });

    return value;
  };

  return onHandleStartFromWordChange;
}

export function useStartFromWordOne() {
  const setState = useSetAtom(startFromWordSettingState);
  return () => {
    setState(1);

    // A hack for returning focus somewhere sensible
    // https://stackoverflow.com/questions/1096436/document-getelementbyidid-focus-is-not-working-for-firefox-or-chrome
    // https://stackoverflow.com/questions/33955650/what-is-settimeout-doing-when-set-to-0-milliseconds/33955673
    window.setTimeout(function () {
      let yourTypedText = document.getElementById("your-typed-text");
      let noWordsToWrite = document.getElementById("js-no-words-to-write");
      if (yourTypedText) {
        yourTypedText.focus();
      } else if (noWordsToWrite) {
        noWordsToWrite.focus(); // Note: not an interactive element
      }
    }, 0);

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Start from word 1",
      label: "true",
    });
  };
}

export function useHandleUpcomingWordsLayout() {
  const setState = useSetAtom(upcomingWordsLayoutState);

  const onHandleUpcomingWordsLayout: React.ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    const value = event.target.value;

    setState(value);

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change upcoming words layout",
      label: labelString,
    });

    return value;
  };

  return onHandleUpcomingWordsLayout;
}

export function useUpdatePreset(): (studyType: Study) => void {
  const [currentState, setState] = useAtom(userSettingsState);

  return (studyType) => {
    const newUserSettings = Object.assign({}, currentState);
    const presetSettings = {
      limitNumberOfWords: currentState.limitNumberOfWords,
      repetitions: currentState.repetitions,
    };

    switch (studyType) {
      case "discover":
        newUserSettings.studyPresets[0] = presetSettings;
        break;

      case "revise":
        newUserSettings.studyPresets[1] = presetSettings;
        break;

      case "drill":
        newUserSettings.studyPresets[2] = presetSettings;
        break;

      case "practice":
        newUserSettings.studyPresets[3] = presetSettings;
        break;

      default:
        break;
    }

    setState(newUserSettings);
  };
}

export function useToggleHideOtherSettings() {
  const [state, setState] = useAtom(hideOtherSettingsState);

  return () => {
    const value = !state;

    setState(value);

    let labelString = value.toString();

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Toggle hide other settings",
      label: labelString,
    });

    return value;
  };
}
