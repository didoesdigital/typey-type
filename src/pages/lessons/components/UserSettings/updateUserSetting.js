import GoogleAnalytics from "react-ga4";
import { writePersonalPreferences } from "../../../../utils/typey-type";

export function changeShowScoresWhileTyping(event) {
  let newState = Object.assign({}, this.state.userSettings);

  newState["showScoresWhileTyping"] = !newState["showScoresWhileTyping"];

  GoogleAnalytics.event({
    category: "UserSettings",
    action: "Change show scores while typing",
    label: newState["showScoresWhileTyping"].toString(),
  });

  this.setState({ userSettings: newState }, () => {
    writePersonalPreferences("userSettings", this.state.userSettings);
  });
  return newState["showScoresWhileTyping"];
}

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
    if (!(name === "caseSensitive")) {
      this.setupLesson();
    }
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
    if (!(name === "caseSensitive")) {
      this.setupLesson();
    }
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
