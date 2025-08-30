import type { DictionaryIndexEntry } from "types";

async function fetchDictionaryIndex(): Promise<DictionaryIndexEntry[]> {
  try {
    const response = await fetch(
      import.meta.env.VITE_PUBLIC_URL + "/dictionaries/dictionaryIndex.json",
      {
        method: "GET",
        credentials: "same-origin",
      }
    );
    const json = (await response.json()) as Promise<DictionaryIndexEntry[]>;
    return json;
  } catch (error) {
    console.error("Unable to load dictionary index", error);
    return [
      {
        "author": "Typey Type",
        "title": "Full Dictionary",
        "subtitle": "",
        "category": "Typey Type",
        "subcategory": "",
        "path": "/dictionaries/typey-type/typey-type-full.json",
        "link": "/support#typey-type-dictionary",
        "tagline":
          "Typey Type’s dictionary follows the Plover dictionary with misstrokes removed from the top 10,000 words.",
      },
      {
        "author": "Typey Type",
        "title": "Steno",
        "subtitle": "",
        "category": "Drills",
        "subcategory": "",
        "path": "/dictionaries/lessons/drills/steno/steno/",
        "link": "/support#typey-type-dictionary",
        "tagline": "You found the magic steno lesson!",
      },
    ];
  }
}

export default fetchDictionaryIndex;
