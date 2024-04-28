import GoogleAnalytics from "react-ga4";
import PARAMS from "../../../../utils/params";
import { writePersonalPreferences } from "../../../../utils/typey-type";
import { useAtom } from "jotai";
import { showScoresWhileTypingState } from "../../../../states/userSettingsState";

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

// TODO: continue like above in this file
export function changeShowStrokesAs(event) {
  let newState = Object.assign({}, this.state.userSettings);

  const name = "showStrokesAsDiagrams";
  const value = event.target.value;

  if (value === "strokesAsText") {
    newState[name] = false;
  } else {
    newState[name] = true;
  }

  this.setState({ userSettings: newState }, () => {
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

  let labelString = value;
  if (!value) {
    labelString = "BAD_INPUT";
  }

  GoogleAnalytics.event({
    category: "UserSettings",
    action: "Change show strokes as",
    label: labelString,
  });

  return value;
}

export function changeShowStrokesAsList(event) {
  let newState = Object.assign({}, this.state.userSettings);

  const name = "showStrokesAsList";
  const value = event.target.checked;

  if (value) {
    newState[name] = true;

    this.appFetchAndSetupGlobalDict(true, null).catch((error) =>
      console.error(error)
    );
  } else {
    newState[name] = false;
  }

  this.setState({ userSettings: newState }, () => {
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

  let labelString = value;
  if (!value) {
    labelString = "BAD_INPUT";
  }

  GoogleAnalytics.event({
    category: "UserSettings",
    action: "Change show strokes as list",
    label: labelString,
  });

  return value;
}

export function changeShowStrokesOnMisstroke(event) {
  let newState = Object.assign({}, this.state.userSettings);

  const name = "showStrokesOnMisstroke";
  const value = event.target.value;

  newState[name] = !newState[name];

  this.setState({ userSettings: newState }, () => {
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

  let labelString = value;
  if (!value) {
    labelString = "BAD_INPUT";
  } else {
    labelString = value.toString();
  }

  GoogleAnalytics.event({
    category: "UserSettings",
    action: "Change show strokes on misstroke",
    label: labelString,
  });

  return value;
}

export function changeSortOrderUserSetting(event) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  const name = "sortOrder";
  const value = event.target.value;

  newState[name] = value;

  this.setState({ userSettings: newState }, () => {
    this.setupLesson();
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

  let labelString = value;
  if (!value) {
    labelString = "BAD_INPUT";
  }

  GoogleAnalytics.event({
    category: "UserSettings",
    action: "Change sort order",
    label: labelString,
  });

  return value;
}

export function changeSpacePlacementUserSetting(event) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  const name = "spacePlacement";
  const value = event.target.value;

  newState[name] = value;

  this.setState({ userSettings: newState }, () => {
    this.setupLesson();
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

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

export function changeStenoLayout(event) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  const name = event.target.name;
  const value = event.target.value;

  newState["stenoLayout"] = value;

  this.setState({ userSettings: newState }, () => {
    this.setupLesson();
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

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

export function changeUserSetting(event) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  const target = event.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  const name = target.name;

  newState[name] = value;

  if (!newState.speakMaterial && synth) {
    synth.cancel();
  }

  this.setState({ userSettings: newState }, () => {
    if (!(name === "caseSensitive")) {
      this.setupLesson();
    }
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

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

/**
 * @param {string} voiceName
 * @param {string} voiceURI
 */
export function changeVoiceUserSetting(voiceName, voiceURI) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  newState["voiceName"] = voiceName;
  newState["voiceURI"] = voiceURI;

  this.setState({ userSettings: newState }, () => {
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

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

export function chooseStudy(event) {
  let currentState = this.state.userSettings;
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
        this.state.userSettings.studyPresets[0].repetitions ||
        PARAMS.discover.repetitions;
      newState.limitNumberOfWords =
        this.state.userSettings.studyPresets[0].limitNumberOfWords ||
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
        this.state.userSettings.studyPresets[1].repetitions ||
        PARAMS.revise.repetitions;
      newState.limitNumberOfWords =
        this.state.userSettings.studyPresets[1].limitNumberOfWords ||
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
        this.state.userSettings.studyPresets[2].repetitions ||
        PARAMS.drill.repetitions;
      newState.limitNumberOfWords =
        this.state.userSettings.studyPresets[2].limitNumberOfWords ||
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
        this.state.userSettings.studyPresets[3].repetitions ||
        PARAMS.practice.repetitions;
      newState.limitNumberOfWords =
        this.state.userSettings.studyPresets[3].limitNumberOfWords ||
        PARAMS.practice.limitNumberOfWords;
      newState.sortOrder = PARAMS.practice.sortOrder;
      break;
    default:
      break;
  }

  this.setState({ userSettings: newState }, () => {
    this.setupLesson();
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

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

export function handleBeatsPerMinute(event) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  const name = "beatsPerMinute";
  const value = event;

  newState[name] = value;

  this.setState({ userSettings: newState }, () => {
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

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

export function handleDiagramSize(event) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  const name = "diagramSize";
  let value = typeof event === "number" ? +event.toFixed(1) : 1.0;
  if (value > 2) {
    value = 2.0;
  }
  if (value < 1) {
    value = 1.0;
  }

  newState[name] = value;

  this.setState({ userSettings: newState }, () => {
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

  const labelString = !!value ? `${value}` : "BAD_INPUT";

  GoogleAnalytics.event({
    category: "UserSettings",
    action: "Change diagram size",
    label: labelString,
  });

  return value;
}

export function handleLimitWordsChange(event) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  const name = "limitNumberOfWords";
  const value = event;

  newState[name] = value;

  this.setState({ userSettings: newState }, () => {
    this.setupLesson();
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

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

export function handleRepetitionsChange(event) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  const name = "repetitions";
  const value = event;

  newState[name] = value;

  this.setState({ userSettings: newState }, () => {
    this.setupLesson();
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

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

export function handleStartFromWordChange(event) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  const name = "startFromWord";
  const value = event;

  newState[name] = value;

  this.setState({ userSettings: newState }, () => {
    this.setupLesson();
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

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

export function handleUpcomingWordsLayout(event) {
  let currentState = this.state.userSettings;
  let newState = Object.assign({}, currentState);

  const name = event.target.name;
  const value = event.target.value;

  newState[name] = value;

  this.setState({ userSettings: newState }, () => {
    this.setupLesson();
    writePersonalPreferences("userSettings", this.state.userSettings);
  });

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

/**
 *
 * @param {"discover" | "revise" | "drill" | "practice"} studyType should have type Study
 */
export function updatePreset(studyType) {
  const newUserSettings = Object.assign({}, this.state.userSettings);
  const presetSettings = {
    limitNumberOfWords: this.state.userSettings.limitNumberOfWords,
    repetitions: this.state.userSettings.repetitions,
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

  this.setState({ userSettings: newUserSettings });
}

export function toggleHideOtherSettings(this_) {
  let currentState = this_.state.userSettings;
  let newState = Object.assign({}, currentState);

  const name = "hideOtherSettings";
  const value = !currentState[name];

  newState[name] = value;

  this_.setState({ userSettings: newState }, () => {
    this_.setupLesson();
    writePersonalPreferences("userSettings", this_.state.userSettings);
  });

  let labelString = value;
  if (!value) {
    labelString = "BAD_INPUT";
  }

  GoogleAnalytics.event({
    category: "UserSettings",
    action: "Toggle hide other settings",
    label: labelString,
  });

  return value;
}
