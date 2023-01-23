import type { Outline, SingleStroke } from "../types";

const splitBriefsIntoStrokes = (currentStroke: Outline): SingleStroke[] =>
  currentStroke.split(/[/ ]/);

export default splitBriefsIntoStrokes;
