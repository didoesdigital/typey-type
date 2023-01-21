// import AFFIXES from "../../consts/affixes.json";
import { AffixList } from "../../../../../utils/affixList";

const AFFIXES = AffixList.getSharedInstance();

const endsWithSuffix = (outline: string, translation: string) =>
  AFFIXES.suffixes.some(
    ([suffixOutline, suffixText]) =>
      outline.endsWith(suffixOutline) && translation.endsWith(suffixText)
  );

export default endsWithSuffix;
