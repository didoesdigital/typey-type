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
