import LATEST_TYPEY_TYPE_DICT_NAME from "constant/latestTypeyTypeDictName";
import fetchDictionaries from "./fetchDictionaries";

import type { ReadDictionariesData, ReadDictionaryData } from "types";

let allDicts: null | ReadDictionariesData = null;

const allTypeyTypeDictNames = [LATEST_TYPEY_TYPE_DICT_NAME];
const typeyDictionariesSubDir = "dictionaries/typey-type";

const allTypeyTypeDictURLs = allTypeyTypeDictNames.map(
  (filename) =>
    `${process.env.PUBLIC_URL}/${typeyDictionariesSubDir}/${filename}`
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
