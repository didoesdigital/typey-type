import Zipper from "utils/zipper";

import type {
  LessonPathWithBasenameAndFilename,
  LessonSettings,
  LessonText,
} from "types";

const SETTINGS_NAME_MAP = {
  ignore_characters: "ignoredChars",
  warning_message: "customMessage",
  locales: "locales",
} as const;

export function parseLesson(
  lessonText: LessonText,
  path: LessonPathWithBasenameAndFilename
) {
  const lines = lessonText.split("\n");
  const lessonTitle = lines[0];
  const lessonSubtitle = lines[1];
  const sourceMaterial = [];
  const settings: LessonSettings & { locales?: string } = { ignoredChars: "" };

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const firstChar = line.charAt(0);

    // If it starts with a single quote, it's lesson material:
    if (firstChar === "'") {
      const phraseAndStroke = line.split("': ");
      const phrase = phraseAndStroke[0].substring(1, phraseAndStroke[0].length);
      const stroke = phraseAndStroke[1];
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
