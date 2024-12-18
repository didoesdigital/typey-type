import misstrokes from "../../json/misstrokes.json";

import type {
  StenoDictionary,
  StrokeAndDictionaryAndNamespace,
  StrokeDictNamespaceAndMisstrokeStatus,
} from "types";

const misstrokesJSON = misstrokes as StenoDictionary;

const addMisstrokeStatus = (
  listOfStrokesAndDicts: StrokeAndDictionaryAndNamespace[],
  modifiedWordOrPhrase: string
): StrokeDictNamespaceAndMisstrokeStatus[] => {
  return listOfStrokesAndDicts.map((row) => {
    const misstrokeStatus =
      !!misstrokesJSON[row[0]] &&
      modifiedWordOrPhrase === misstrokesJSON[row[0]];

    const result: StrokeDictNamespaceAndMisstrokeStatus = [
      ...row,
      misstrokeStatus,
    ];

    return result;
  });
};

export default addMisstrokeStatus;
