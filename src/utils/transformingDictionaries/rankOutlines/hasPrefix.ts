import type { AffixItem } from "../../../types";

const hasPrefix = (
  outline: string,
  translation: string,
  prefixes: AffixItem[]
) =>
  prefixes.some(
    ([prefixOutline, prefixTranslation]) =>
      outline.startsWith(prefixOutline) &&
      translation.startsWith(prefixTranslation)
  );

export default hasPrefix;
