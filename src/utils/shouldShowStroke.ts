import type { UserSettings } from "types";

export function shouldShowStroke(
  showStrokesInLesson: boolean,
  showStrokes: UserSettings["showStrokes"],
  repetitionsRemaining: number,
  hideStrokesOnLastRepetition: UserSettings["hideStrokesOnLastRepetition"]
) {
  if (showStrokesInLesson) {
    // console.log("You clicked the hint linked");
    return true;
  } else if (showStrokes && repetitionsRemaining > 1) {
    // console.log("show strokes and more than 1 rep left");
    return true;
  } else if (
    showStrokes &&
    repetitionsRemaining <= 1 &&
    !hideStrokesOnLastRepetition
  ) {
    // console.log("show strokes and <=1 rep and not hide briefs on lest rep");
    return true;
  }
  // console.log("show stroke");
  return false;
}
