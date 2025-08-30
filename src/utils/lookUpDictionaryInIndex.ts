import type { DictionaryIndexEntry } from "types";

/**
 * A path to a dictionary, including:
 *
 * - basename, i.e. `typey-type/`
 * - dictionaries folder, i.e. `dictionaries/`
 * - author, e.g. `typey-type/`, `didoesdigital/`
 * - title, e.g. `typey-type-full/`, `tabbing/`
 *
 * e.g. "/typey-type/dictionaries/typey-type/typey-type-full/"
 * e.g. `/typey-type/dictionaries/didoesdigital/tabbing/`
 */
type DictPathWithBasenameAndWithoutFilename = string;

function lookUpDictionaryInIndex(
  path: DictPathWithBasenameAndWithoutFilename,
  dictionaryIndex: DictionaryIndexEntry[] = []
) {
  let dictionaryMetadata = dictionaryIndex.find(
    (metadataEntry) =>
      import.meta.env.VITE_PUBLIC_URL + metadataEntry.path ===
      path.replace(/\/$/, ".json")
  );

  if (typeof dictionaryMetadata === "undefined") {
    dictionaryMetadata = {
      author: "Typey Type",
      title: "Missing dictionary details",
      subtitle: "",
      category: "Typey Type",
      subcategory: "",
      tagline: "Loading dictionary details…",
      link: "/typey-type/support#typey-type-dictionary",
      path: "/dictionaries/typey-type/top-10.json",
    };
  }

  return dictionaryMetadata;
}

export { lookUpDictionaryInIndex };
