import fetchResource from "./fetchResource";

import type { StenoDictionary } from "types";

const fallbackDictionary: StenoDictionary = {
  "-T": "The",
  "PROEUS": "process",
  "-F": "of",
  "WREUG": "writing",
  "SHORT/HA*PBD": "shorthand",
  "S": "is",
  "KAULD": "called",
  "STEPB/TKPWRAEF TP-PL": "stenography.",
  "T-S": "It's",
  "TAOEUPD": "typed",
  "WA*EU": "with a",
  "STEPB/TAOEUP": "stenotype",
  "OR": "or",
  "TPAPB/SEU": "fancy",
  "KAOEBD TP-PL": "keyboard.",
  "KU": "You can",
  "TREUB KW-BG": "transcribe,",
  "KAPGS KW-BG": "caption,",
  "TKEUBG/TAEUT KW-BG": "dictate,",
  "KOED KW-BG": "code,",
  "KHAT KW-BG": "chat,",
  "WREU": "write",
  "PROES": "prose",
  "AT": "at",
  "OEFR": "over",
  "#T-Z": "200",
  "WORDZ": "words",
  "PER": "per",
  "PHEUPB TP-PL": "minute.",
  "TAOEUP/KWREU TAOEUP": "Typey type",
  "AOUFS": "uses",
  "SPAEUFD": "spaced",
  "REP/TEUGS/-S": "repetitions",
  "SKP": "and",
  "HUPBS": "hundreds",
  "HROEFPBS": "lessons",
  "TO": "to",
  "HEP": "help",
  "U": "you",
  "PHAFRT": "master",
  "TAOEUPG": "typing",
  "W": "with",
};

function fetchDictionaries(urls: string[]): Promise<StenoDictionary[]> {
  const promises = urls.map((url) => fetchResource<StenoDictionary>(url));
  const result = Promise.all(promises).catch((error) => {
    console.error("Error fetching dictionaries:", error);
    return [fallbackDictionary];
  });

  return result;
}

export default fetchDictionaries;
