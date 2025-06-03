import Zipper from "utils/zipper";

import type { LessonPathWithBasenameAndFilename, LessonSettings } from "types";

const SETTINGS_NAME_MAP = {
  ignore_characters: "ignoredChars",
  warning_message: "customMessage",
  locales: "locales",
} as const;

export function parseLesson(
  lessonText: string,
  path: LessonPathWithBasenameAndFilename
) {
  let lines = lessonText.split("\n");
  let lessonTitle = lines[0];
  let lessonSubtitle = lines[1];
  let sourceMaterial = [];
  let settings: LessonSettings & { locales?: string } = { ignoredChars: "" };

  for (let i = 2; i < lines.length; i++) {
    let line = lines[i];
    let firstChar = line.charAt(0);

    // If it starts with a single quote, it's lesson material:
    if (firstChar === "'") {
      let phraseAndStroke = line.split("': ");
      let phrase = phraseAndStroke[0].substring(1, phraseAndStroke[0].length);
      let stroke = phraseAndStroke[1];
      sourceMaterial.push({ phrase: phrase, stroke: stroke });
    }
    // If it doesn't start with a single quote and does include equals, it's a setting:
    else if (line.indexOf("=") !== -1) {
      // Example: `warning_message=Hint: use exact spacing setting`
      // Example: `warning_message=Hint: use exact spacing setting and don’t type ^`
      // Example: `warning_message=Hint: use TK-LS between strokes`
      // Example: `ignore_characters='^'`
      const [settingName, settingValue] = line.split("=");
      if (settingName in SETTINGS_NAME_MAP) {
        const mappedSettingName =
          SETTINGS_NAME_MAP[settingName as keyof typeof SETTINGS_NAME_MAP];
        settings[mappedSettingName] =
          settingName === "ignore_characters"
            ? settingValue.replace(/'/g, "")
            : settingValue;
      }
    }
  }

  return {
    sourceMaterial: sourceMaterial,
    presentedMaterial: sourceMaterial,
    settings: settings,
    title: lessonTitle,
    subtitle: lessonSubtitle,
    newPresentedMaterial: new Zipper(sourceMaterial),
    path: path,
  };
}
