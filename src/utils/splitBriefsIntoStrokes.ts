import type { Outline } from "../types";

const splitBriefsIntoStrokes = (currentStroke: Outline) =>
  currentStroke.split(/[/ ]/);

export default splitBriefsIntoStrokes;
