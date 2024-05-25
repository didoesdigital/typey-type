import { atomWithLazy } from "jotai/utils";
import { fetchDictionaryIndex } from "../utils/getData";
import { StenoDictionary } from "../types";

export const dictionaryIndexState = atomWithLazy<Promise<StenoDictionary[]>>(fetchDictionaryIndex);
