// import AFFIXES from "../../consts/affixes.json";
import { AffixList } from "../../../../../utils/affixList";

const endsWithSuffix = (outline: string, translation: string) => {
  const AFFIXES = AffixList.getSharedInstance();

  return AFFIXES.suffixes.some(
    ([suffixOutline, suffixText]) =>
      outline.endsWith(suffixOutline) && translation.endsWith(suffixText)
  );
};

export default endsWithSuffix;
