import { AffixObject } from "../../types";

export type LoadFunction = () => AffixObject;

let maybeAffixes: AffixObject | null = null;

/**
 * This will return the affixes object however it might be made. In the Node
 * CLI it can read from a file on disk. In the web app, it can use a
 * pre-calculated variable, which may be updated each time personal
 * dictionaries are imported. Both the CLI and web app can generate the
 * affixes object using `getAffixesFromLookupDict()`.
 */
let loadFunction: LoadFunction = () => {
  throw new Error("There's no affix load function to load the affixes.");
  // const defaultAffixes: AffixObject = { prefixes: [], suffixes: [] };
  // return defaultAffixes;
};

/**
 * This sets the load function to be called by `getSharedAffixes()`. In the
 * Node CLI, it will only ever be set once to say how to read the affixes from
 * disk. In the web app, it may be reset each time personal dictionaries are
 * imported to use a new affixes variable value.
 *
 * @param newLoadFunction - a new load function for affixes
 */
function setLoadFunction(newLoadFunction: LoadFunction) {
  loadFunction = newLoadFunction;
}

/**
 * This will get the affixes object if it's been loaded already or it will load
 * the affixes and return the newly loaded affix object.
 *
 * @remarks When build-lesson is called to build the "Multi-syllable words with
 * suffixes" lesson, when it tests the first entry in the word-first lookup
 * dictionary of Typey Type's entries to see if it ends with a suffix, it will
 * synchronously read the affixes.json file created after the dictionary was
 * built. For processing the remaining entries to build this lesson, it will
 * read the existing affixes variable value.
 *
 * @returns AffixObject
 */
function getSharedAffixes(): AffixObject {
  // Every time endsWithSuffix or similar is called, return the existing list:
  if (maybeAffixes) return maybeAffixes;

  // On first call of a CLI command that uses affixes, there'll be no affixes,
  // so call the load function to load affixes. On initialisation of the web
  // app, there'll be no affixes, so call the load function to load affixes:
  maybeAffixes = loadFunction();
  return maybeAffixes;
}

/**
 * This resets the affixes for use by getSharedAffixes if affixes has already
 * been set and the load function is unreachable.
 *
 * @param newAffixes - a new AffixObject to assign to affixes
 */
function setSharedAffixes(newAffixes: AffixObject) {
  maybeAffixes = newAffixes;
}

const AFFIXES = {
  getSharedAffixes,
  setLoadFunction,
  setSharedAffixes,
};

export default AFFIXES;
