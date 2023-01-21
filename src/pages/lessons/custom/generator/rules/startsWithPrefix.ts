// import AFFIXES from "../../consts/affixes.json";
import { AffixList } from "../../../../../utils/affixList";

const AFFIXES = AffixList.getSharedInstance();

const startsWithPrefix = (outline: string, translation: string) =>
  AFFIXES.prefixes.some(
    ([prefixOutline, prefixText]) =>
      outline.startsWith(prefixOutline) && translation.startsWith(prefixText)
  );

export default startsWithPrefix;
