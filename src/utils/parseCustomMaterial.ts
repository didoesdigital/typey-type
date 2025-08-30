import Zipper from "utils/zipper";

import type { CustomLesson } from "types";

type ValidationState = "unvalidated" | "fail" | "success";

/** e.g. ["Your material needs at least 1 word"] */
type ValidationMessages = string[];

export function parseCustomMaterial(
  lessonTextAndStrokes: string
): [CustomLesson, ValidationState, ValidationMessages] {
  let validationState: ValidationState = "unvalidated";
  let validationMessages: ValidationMessages = [];

  let emptyCustomLesson = {
    sourceMaterial: [],
    presentedMaterial: [{ phrase: "", stroke: "" }],
    settings: { ignoredChars: "" },
    title: "Custom",
    subtitle: "",
    newPresentedMaterial: new Zipper([{ phrase: "", stroke: "" }]),
    path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
  };
  if (lessonTextAndStrokes.length === 0) {
    validationState = "fail";
    validationMessages.push("Your material needs at least 1 word");
    return [emptyCustomLesson, validationState, validationMessages];
  }

  if (!lessonTextAndStrokes.includes("	")) {
    validationState = "fail";
    validationMessages.push("Your material needs at least 1 “Tab” character");
    return [emptyCustomLesson, validationState, validationMessages];
  }

  let lessonTitle = "Custom";
  let lessonSubtitle = "";

  let lines = lessonTextAndStrokes.split("\n");
  lines = lines.filter((phrase) => phrase !== "");
  lines = lines.filter((phrase) => phrase.includes("	"));
  lines = lines.filter((phrase) => !phrase.startsWith("	"));
  if (lines.length === 0) {
    validationState = "fail";
    validationMessages.push(
      "Your material needs at least 1 word and 1 “Tab” character"
    );
    return [emptyCustomLesson, validationState, validationMessages];
  }

  let sourceMaterial = [];
  let settings = { ignoredChars: "" };

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let phraseAndStroke = line.split("	");
    let phrase = phraseAndStroke[0];
    let stroke = phraseAndStroke[1];
    sourceMaterial.push({ phrase: phrase, stroke: stroke });
  }

  validationState = "success";

  return [
    {
      sourceMaterial: sourceMaterial,
      presentedMaterial: sourceMaterial,
      settings: settings,
      title: lessonTitle,
      subtitle: lessonSubtitle,
      newPresentedMaterial: new Zipper(sourceMaterial),
      path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
    },
    validationState,
    validationMessages,
  ];
}
