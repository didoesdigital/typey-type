import { atomWithLazy } from "jotai/utils";
import fetchDictionaryIndex from "../utils/fetchDictionaryIndex";
import type { DictionaryIndexEntry } from "../types";

export const dictionaryIndexState =
  atomWithLazy<Promise<DictionaryIndexEntry[]>>(fetchDictionaryIndex);
