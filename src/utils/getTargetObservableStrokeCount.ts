import { getTargetStrokeCount } from "utils/getTargetStrokeCount";

import type { PresentedMaterialItem } from "types";

/**
 * Target count, used for calculating misstrokes
 */
export function getTargetObservableStrokeCount(
  currentMaterial: PresentedMaterialItem
): number {
  const nonObservableStrokes = ["KPA", "KPA*", "TK-LS"];
  const nonObservableStrokeCount = currentMaterial.stroke
    .split(/[/ ]/)
    .filter((stroke) => nonObservableStrokes.includes(stroke)).length;
  return getTargetStrokeCount(currentMaterial) - nonObservableStrokeCount;
}
