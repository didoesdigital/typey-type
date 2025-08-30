import fetchDictionaries from "./fetchDictionaries";
import standardDictionarySet from "constant/standardDictionarySet";

import type { ReadDictionariesData, ReadDictionaryData } from "types";

let allDicts: null | ReadDictionariesData = null;

export const allTypeyTypeDictNames = standardDictionarySet;
const typeyDictionariesSubDir = "dictionaries/didoesdigital";

const allTypeyTypeDictURLs = allTypeyTypeDictNames.map(
  (filename) =>
    `${import.meta.env.VITE_PUBLIC_URL}/${typeyDictionariesSubDir}/${filename}`
);

function getTypeyTypeDicts() {
  let dict;

  if (allDicts === null) {
    dict = fetchDictionaries(allTypeyTypeDictURLs).then((data) => {
      const zippedData = data.map((dict, i) => {
        const result: ReadDictionaryData = [dict, allTypeyTypeDictNames[i]];
        return result;
      });

      allDicts = zippedData;
      return zippedData;
    });
  } else {
    dict = Promise.resolve(allDicts);
  }

  return dict;
}

export default getTypeyTypeDicts;
