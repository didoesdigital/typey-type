import type { PresentedMaterialItem } from "types";

/**
 * Real target count, used for display etc.
 */
export function getTargetStrokeCount(
  currentMaterial: PresentedMaterialItem
): number {
  return currentMaterial.stroke.split(/[/ ]/).length || 1;
}
