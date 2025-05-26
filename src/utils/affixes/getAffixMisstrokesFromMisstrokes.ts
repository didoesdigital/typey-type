import isAffix from "./isAffix";

import type { StenoDictionary } from "../../types";

const getAffixMisstrokesFromMisstrokes = (misstrokes: StenoDictionary) => {
  return Object.fromEntries(
    Object.entries(misstrokes).filter(([_outline, translation]) =>
      isAffix(translation)
    )
  );
};

export default getAffixMisstrokesFromMisstrokes;
