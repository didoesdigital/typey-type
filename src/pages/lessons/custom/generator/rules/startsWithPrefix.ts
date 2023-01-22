// import AFFIXES from "../../consts/affixes.json";
import { AffixList } from "../../../../../utils/affixList";

const startsWithPrefix = (outline: string, translation: string) => {
  const AFFIXES = AffixList.getSharedInstance();

  return AFFIXES.prefixes.some(
    ([prefixOutline, prefixText]) =>
      outline.startsWith(prefixOutline) && translation.startsWith(prefixText)
  );
};

export default startsWithPrefix;
