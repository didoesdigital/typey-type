import GoogleAnalytics from "react-ga4";
import { writePersonalPreferences } from "../../../../utils/typey-type";

// changeWriterInput(event: SyntheticInputEvent<HTMLInputElement>) {
export function changeWriterInput(event) {
  let globalUserSettings = Object.assign({}, this.state.globalUserSettings);
  let name = "BAD_INPUT";

  if (event && event.target && event.target.name) {
    globalUserSettings["writerInput"] = event.target.name;
    name = event.target.name;
  }

  this.setState({ globalUserSettings: globalUserSettings }, () => {
    writePersonalPreferences("globalUserSettings", globalUserSettings);
  });

  let labelString = name;
  if (!name) {
    labelString = "BAD_INPUT";
  }

  GoogleAnalytics.event({
    category: "Global user settings",
    action: "Change writer input",
    label: labelString,
  });
}

export function toggleExperiment(event) {
  let newState = Object.assign({}, this.state.globalUserSettings);

  const target = event.target;
  const value = target.checked;
  const name = target.name;

  newState.experiments[name] = value;

  this.setState({ globalUserSettings: newState }, () => {
    writePersonalPreferences(
      "globalUserSettings",
      this.state.globalUserSettings
    );
  });

  let labelString = value;
  if (value === undefined) {
    labelString = "BAD_INPUT";
  } else {
    labelString.toString();
  }

  GoogleAnalytics.event({
    category: "Global user settings",
    action: "Change " + name,
    label: labelString,
  });

  return value;
}
