export type StenoDictionary = {
  [outline: string]: string;
};

export type AffixItem = [string, string];

export type AffixObject = {
  prefixes: AffixItem[];
  suffixes: AffixItem[];
};

