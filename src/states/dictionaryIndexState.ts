import { atomWithLazy } from "jotai/utils";
import { fetchDictionaryIndex } from "../utils/getData";
import { DictionaryIndexEntry } from "../types";

export const dictionaryIndexState = atomWithLazy<Promise<DictionaryIndexEntry[]>>(fetchDictionaryIndex);
