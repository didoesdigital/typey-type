import affixRexes from "./affixRegexes";

import type { Translation } from "../../types";

const isAffix = (translation: Translation) => {
  return (
    translation.match(affixRexes.suffixRegex) ||
    translation.match(affixRexes.prefixRegex)
  );
};

export default isAffix;
