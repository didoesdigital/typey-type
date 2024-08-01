import GoogleAnalytics from "react-ga4";
import PARAMS from "../../../../utils/params";
import { useAtom, useSetAtom } from "jotai";
import {
  beatsPerMinuteState, diagramSizeState, hideOtherSettingsState, limitNumberOfWordsState, repetitionsState,
  showScoresWhileTypingState,
  showStrokesAsDiagramsState,
  showStrokesAsListState,
  showStrokesOnMisstrokeState,
  sortOrderState,
  spacePlacementState, startFromWordSettingState,
  stenoLayoutState, upcomingWordsLayoutState,
  userSettingsState
} from "../../../../states/userSettingsState";
import { useAppMethods } from "../../../../states/legacy/AppMethodsContext";

/** @type {SpeechSynthesis | null} */
let synth = null;
try {
  synth = window.speechSynthesis;
} catch (e) {
  console.log("This device doesn't support speechSynthesis", e);
}

export function useChangeShowScoresWhileTyping() {
  const [state, setState] = useAtom(showScoresWhileTypingState);
  return (event) => {
    const newState = !state;

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change show scores while typing",
      label: newState.toString()
    });
    setState(newState);
  };
}

export function useChangeShowStrokesAs() {
  const setState = useSetAtom(showStrokesAsDiagramsState);

  return (event) => {
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
  }
}

export function useChangeShowStrokesAsList() {
  const setState = useSetAtom(showStrokesAsListState);
  const {appFetchAndSetupGlobalDict} = useAppMethods()

  return (event) => {
    const value = event.target.checked;
    setState(value);

    let labelString = value;
    if (value) {
      appFetchAndSetupGlobalDict(true, null).catch(error => {
        console.error(error)
      })
    } else {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change show strokes as list",
      label: labelString,
    });
  }
}

export function useChangeShowStrokesOnMisstroke() {
  const [state, setState] = useAtom(showStrokesOnMisstrokeState);
  return (event) => {
    const value = !state;
    setState(value);

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change show strokes on misstroke",
      label: value.toString(),
    });
  }
}

export function useChangeSortOrderUserSetting() {
  const setState = useSetAtom(sortOrderState);
  return (event) => {
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
  }
}

export function useChangeSpacePlacementUserSetting() {
  const setState = useSetAtom(spacePlacementState);
  return (event) => {
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
  }
}

export function useChangeStenoLayout() {
  const setState = useSetAtom(stenoLayoutState);

  return (event) => {
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
  }
}

export function useChangeUserSetting() {
  const [currentState, setState] = useAtom(userSettingsState)
  return (event) => {
    let newState = Object.assign({}, currentState);

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    newState[name] = value;

    if (!newState.speakMaterial && synth) {
      synth.cancel();
    }

    setState(newState);

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    } else {
      labelString.toString();
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change " + name,
      label: labelString,
    });

    return value;
  }
}

/**
 * @return {(voiceName: string, voiceURI: string) => void}
 */
export function useChangeVoiceUserSetting() {
  const [currentState, setState]= useAtom(userSettingsState)
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
  }
}

export function useChooseStudy() {
  const [currentState, setState] = useAtom(userSettingsState)
  return (event) => {
    let newState = Object.assign({}, currentState);

    const name = "study";
    const value = event.target.value;

    newState[name] = value;

    switch (value) {
      case "discover":
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
  }
}

export function useHandleBeatsPerMinute() {
  const setState = useSetAtom(beatsPerMinuteState)

  return (event) => {
    const value = event;

    setState(value);

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change beats per minute",
      label: labelString,
    });

    return value;
  }
}

export function useHandleDiagramSize() {
  const setState = useSetAtom(diagramSizeState);

  return (event) => {
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
  }
}

export function useHandleLimitWordsChange() {
  const setState = useSetAtom(limitNumberOfWordsState)

  return (event) => {
    const value = event;

    setState(value);

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change limit word count",
      label: labelString,
    });

    return value;
  }
}

export function useHandleRepetitionsChange() {
  const setState = useSetAtom(repetitionsState);

  return (event) => {
    const value = event;

    setState(value);

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change repetitions",
      label: labelString,
    });

    return value;
  }
}

export function useHandleStartFromWordChange() {
  const setState = useSetAtom(startFromWordSettingState);

  return (event) => {
    const value = event;

    setState(value);

    let labelString = value;
    if (!value) {
      labelString = "BAD_INPUT";
    }

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Change start from word",
      label: labelString,
    });

    return value;
  }
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

  return (event) => {
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
  }
}

/**
 *
 * @return {(studyType: "discover" | "revise" | "drill" | "practice") => void} studyType should have type Study
 */
export function useUpdatePreset() {
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
  }
}

export function useToggleHideOtherSettings() {
  const [state, setState] = useAtom(hideOtherSettingsState)

  return () => {
    const value = !state

    setState(value);

    let labelString = value.toString();

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Toggle hide other settings",
      label: labelString,
    });

    return value;
  }
}
