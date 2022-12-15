import type { UserSettings } from "../../../types";

const formatSpacePlacementValue = (userSettings: UserSettings) => {
  if (!userSettings?.spacePlacement) {
    return "not set";
  }

  switch (userSettings.spacePlacement) {
    case "spaceBeforeOutput":
      return "Space before output";
    case "spaceAfterOutput":
      return "Space after output";
    case "spaceOff":
      return "Ignore spaces";
    case "spaceExact":
      return "Exact spacing";

    default:
      return "not set";
  }
};

export default formatSpacePlacementValue;
