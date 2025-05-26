import AFFIXES from "../../../../../utils/affixes/affixes";

const endsWithSuffix = (outline: string, translation: string) =>
  AFFIXES.getSharedAffixes().suffixes.some(
    ([suffixOutline, suffixText]) =>
      outline.endsWith(suffixOutline) && translation.endsWith(suffixText)
  );

export default endsWithSuffix;
