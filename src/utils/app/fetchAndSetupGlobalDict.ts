import SOURCE_NAMESPACES from "../../constant/sourceNamespaces";
import getTypeyTypeDict, {
  allTypeyTypeDictNames,
} from "../getData/getTypeyTypeDicts";
import createGlobalLookupDictionary from "../transformingDictionaries/createGlobalLookupDictionary";
import getAffixesFromLookupDict from "utils/affixes/getAffixesFromLookupDict";
import misstrokesJSON from "../../json/misstrokes.json";
import AFFIXES from "utils/affixes/affixes";
import getAffixMisstrokesFromMisstrokes from "utils/affixes/getAffixMisstrokesFromMisstrokes";
import { loadPersonalDictionariesFromLocalStorage } from "../typey-type";

import type {
  PersonalDictionaryNameAndContents,
  ImportedPersonalDictionaries,
  StenoDictionary,
} from "../../types";

const misstrokes = misstrokesJSON as StenoDictionary;
const affixMisstrokes = getAffixMisstrokesFromMisstrokes(misstrokes);

// @ts-expect-error TS(7034) FIXME: Variable 'loadingPromise' implicitly has type 'any... Remove this comment to see the full error message
let loadingPromise = null;
let isGlobalDictionaryUpToDate = null;

/**
 *
 * @param importedPersonalDictionaries recently imported personal dictionaries (on dictionary management page) OR personal dictionaries passed down from props or null.
 * @returns a loading promise
 */
function fetchAndSetupGlobalDict(
  importedPersonalDictionaries: ImportedPersonalDictionaries | null
): Promise<any> {
  const personalDictionaries: PersonalDictionaryNameAndContents[] =
    importedPersonalDictionaries?.dictionariesNamesAndContents ??
    loadPersonalDictionariesFromLocalStorage() ??
    [];

  const localConfig = personalDictionaries.map(
    (d) => `${SOURCE_NAMESPACES.get("user")}:${d[0]}`
  );

  // TODO: this will all need to change when we change how Typey Type is included or excluded in
  // personal dictionary usage…
  const localConfigPlusTypeyType = localConfig.slice(0);
  localConfigPlusTypeyType.unshift(
    ...allTypeyTypeDictNames.map(
      (typeyDict) => `${SOURCE_NAMESPACES.get("typey")}:${typeyDict}`
    )
  );
  const previouslyAppliedConfig =
    // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.state.globalLookupDictionary["configuration"];
  const globalLookupDictionaryMatchesConfig =
    // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.state.globalLookupDictionary &&
    // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    !!this.state.globalLookupDictionary["configuration"] &&
    JSON.stringify(previouslyAppliedConfig) ===
      JSON.stringify(localConfigPlusTypeyType);

  if (
    // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
    this.state.globalLookupDictionary &&
    globalLookupDictionaryMatchesConfig
  ) {
    isGlobalDictionaryUpToDate = true;
  } else {
    isGlobalDictionaryUpToDate = false;
  }

  // @ts-expect-error TS(7005) FIXME: Variable 'loadingPromise' implicitly has an 'any' ... Remove this comment to see the full error message
  if (loadingPromise && isGlobalDictionaryUpToDate) {
    return loadingPromise;
  } else {
    loadingPromise = Promise.all([getTypeyTypeDict()]).then((data) => {
      const [typeyDictionaries] = data;

      // let t0 = performance.now();
      const sortedAndCombinedLookupDictionary = createGlobalLookupDictionary(
        personalDictionaries,
        typeyDictionaries
      );
      // let t1 = performance.now();
      // console.log("Call to createGlobalLookupDictionary took " + (Number.parseFloat((t1 - t0) / 1000).toPrecision(3)) + " seconds.");

      const newAffixes = getAffixesFromLookupDict(
        sortedAndCombinedLookupDictionary,
        affixMisstrokes
      );
      const affixesLoadFunction = () => {
        return newAffixes;
      };
      // NOTE: Because this code won't run until after the dictionaries have been
      // fetched, it will always come after the first call to try and use the
      // affixes e.g. on https://didoesdigital.com/typey-type/lookup?q=strangled
      // it will first show results that assume the affixes object is empty. So
      // long as another render comes after this setLoadFunction() call, the
      // results will be updated to use the actual affixes.
      AFFIXES.setLoadFunction(affixesLoadFunction);
      AFFIXES.setSharedAffixes(newAffixes);

      // For debugging:
      // window.lookupDict = sortedAndCombinedLookupDictionary;
      isGlobalDictionaryUpToDate = true;
      // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
      this.updateGlobalLookupDictionary(sortedAndCombinedLookupDictionary);
      // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
      this.setState({ globalLookupDictionaryLoaded: true });
    });

    return loadingPromise;
  }
}

export default fetchAndSetupGlobalDict;
