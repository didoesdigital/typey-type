import type { AffixItem } from "../../../types";

const hasSuffix = (
  outline: string,
  translation: string,
  suffixes: AffixItem[]
) =>
  suffixes.some(
    ([suffixOutline, suffixTranslation]) =>
      outline.endsWith(suffixOutline) && translation.endsWith(suffixTranslation)
  );

export default hasSuffix;
