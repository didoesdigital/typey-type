import GoogleAnalytics from "react-ga4";
import { writePersonalPreferences } from "../../../../utils/typey-type";

export function changeFlashcardCourseLevel(event) {
  const value = event.target.value;
  let globalUserSettings = Object.assign({}, this.state.globalUserSettings);
  globalUserSettings["flashcardsCourseLevel"] = value;

  this.setState({ globalUserSettings: globalUserSettings }, () => {
    this.updateFlashcardsRecommendation();
    writePersonalPreferences("globalUserSettings", globalUserSettings);
  });

  let labelString = value;
  if (!value) {
    labelString = "BAD_INPUT";
  }

  GoogleAnalytics.event({
    category: "Flashcards",
    action: "Change course level",
    label: labelString,
  });

  return value;
}

export function changeFullscreen(event) {
  const target = event.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  this.setState({ fullscreen: value });
  return value;
}
