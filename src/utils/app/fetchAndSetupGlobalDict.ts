import SOURCE_NAMESPACES from "../../constant/sourceNamespaces";
import getTypeyTypeDict, {
  allTypeyTypeDictNames,
} from "../getData/getTypeyTypeDicts";
import { createGlobalLookupDictionary } from "../transformingDictionaries/createAGlobalLookupDictionary";
import { AffixList } from "../affixList";
import { loadPersonalDictionariesFromLocalStorage } from "../typey-type";

import type {
  PersonalDictionaryNameAndContents,
  ImportedPersonalDictionaries,
} from "../../types";

// @ts-ignore TODO
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
  let localConfigPlusTypeyType = localConfig.slice(0);
  localConfigPlusTypeyType.unshift(
    ...allTypeyTypeDictNames.map(
      (typeyDict) => `${SOURCE_NAMESPACES.get("typey")}:${typeyDict}`
    )
  );
  const previouslyAppliedConfig =
    // @ts-ignore TODO
    this.state.globalLookupDictionary["configuration"];
  const globalLookupDictionaryMatchesConfig =
    // @ts-ignore TODO
    this.state.globalLookupDictionary &&
    // @ts-ignore TODO
    !!this.state.globalLookupDictionary["configuration"] &&
    JSON.stringify(previouslyAppliedConfig) ===
      JSON.stringify(localConfigPlusTypeyType);

  if (
    // @ts-ignore TODO
    this.state.globalLookupDictionary &&
    globalLookupDictionaryMatchesConfig
  ) {
    isGlobalDictionaryUpToDate = true;
  } else {
    isGlobalDictionaryUpToDate = false;
  }

  // @ts-ignore TODO
  if (loadingPromise && isGlobalDictionaryUpToDate) {
    // @ts-ignore TODO
    return loadingPromise;
  } else {
    loadingPromise = Promise.all([getTypeyTypeDict()]).then((data) => {
      let [typeyDictionaries] = data;

      // let t0 = performance.now();
      // if (this.state.globalUserSettings && this.state.globalUserSettings.showMisstrokesInLookup) {
      //   dictAndMisstrokes[1] = {};
      // }

      let sortedAndCombinedLookupDictionary = createGlobalLookupDictionary(
        personalDictionaries,
        typeyDictionaries
      );
      // let t1 = performance.now();
      // console.log("Call to createGlobalLookupDictionary took " + (Number.parseFloat((t1 - t0) / 1000).toPrecision(3)) + " seconds.");

      // For debugging:
      // window.lookupDict = sortedAndCombinedLookupDictionary;
      isGlobalDictionaryUpToDate = true;
      // @ts-ignore TODO
      this.updateGlobalLookupDictionary(sortedAndCombinedLookupDictionary);
      // @ts-ignore TODO
      this.setState({ globalLookupDictionaryLoaded: true });
      const affixList = new AffixList(sortedAndCombinedLookupDictionary);
      AffixList.setSharedInstance(affixList);
    });

    return loadingPromise;
  }
}

export default fetchAndSetupGlobalDict;
