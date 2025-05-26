import AFFIXES from "../../../../../utils/affixes/affixes";

const startsWithPrefix = (outline: string, translation: string) =>
  AFFIXES.getSharedAffixes().prefixes.some(
    ([prefixOutline, prefixText]) =>
      outline.startsWith(prefixOutline) && translation.startsWith(prefixText)
  );

export default startsWithPrefix;
