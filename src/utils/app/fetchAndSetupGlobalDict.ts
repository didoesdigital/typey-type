import LATEST_PLOVER_DICT_NAME from "../../constant/latestPloverDictName";
import SOURCE_NAMESPACES from "../../constant/sourceNamespaces";
import { getLatestPloverDict, getTypeyTypeDict } from "../getData";
import createAGlobalLookupDictionary from "../transformingDictionaries/createAGlobalLookupDictionary";
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
 * @param withPlover whether or not to fetch the Plover dictionary file. We don't need to load that extra 4.2MB for new users on first use in lessons until they turn on "Show other stroke hints". We don't need multiple outlines for entries in games like SHUFL.
 * @param importedPersonalDictionaries recently imported personal dictionaries (on dictionary management page) OR personal dictionaries passed down from props or null.
 * @returns a loading promise
 */
function fetchAndSetupGlobalDict(
  withPlover: boolean,
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
    `${SOURCE_NAMESPACES.get("typey")}:typey-type.json`
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

  let localConfigPlusTypeyTypeAndPlover = localConfigPlusTypeyType.slice(0);
  localConfigPlusTypeyTypeAndPlover.push(
    `${SOURCE_NAMESPACES.get("plover")}:${LATEST_PLOVER_DICT_NAME}`
  ); // reminder: .push() returns length of array, not result const
  const globalLookupDictionaryMatchesConfigWithPlover =
    // @ts-ignore TODO
    this.state.globalLookupDictionary &&
    // @ts-ignore TODO
    !!this.state.globalLookupDictionary["configuration"] &&
    JSON.stringify(previouslyAppliedConfig) ===
      JSON.stringify(localConfigPlusTypeyTypeAndPlover);

  // @ts-ignore TODO
  let isPloverDictionaryLoaded = this.state.isPloverDictionaryLoaded;
  if (
    withPlover &&
    // @ts-ignore TODO
    this.state.globalLookupDictionary &&
    isPloverDictionaryLoaded &&
    globalLookupDictionaryMatchesConfigWithPlover
  ) {
    isGlobalDictionaryUpToDate = true;
  } else if (withPlover) {
    isGlobalDictionaryUpToDate = false;
  } else if (
    !withPlover &&
    // @ts-ignore TODO
    this.state.globalLookupDictionary &&
    (globalLookupDictionaryMatchesConfig ||
      globalLookupDictionaryMatchesConfigWithPlover)
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
    loadingPromise = Promise.all([
      getTypeyTypeDict(),
      withPlover ? getLatestPloverDict() : {},
    ]).then((data) => {
      let [typeyDict, latestPloverDict] = data;
      // let t0 = performance.now();
      // if (this.state.globalUserSettings && this.state.globalUserSettings.showMisstrokesInLookup) {
      //   dictAndMisstrokes[1] = {};
      // }

      let sortedAndCombinedLookupDictionary = createAGlobalLookupDictionary(
        personalDictionaries,
        typeyDict,
        withPlover ? latestPloverDict : null
      );
      // let t1 = performance.now();
      // console.log("Call to createAGlobalLookupDictionary took " + (Number.parseFloat((t1 - t0) / 1000).toPrecision(3)) + " seconds.");

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

    if (!isPloverDictionaryLoaded && withPlover) {
      // @ts-ignore TODO
      this.setState({ isPloverDictionaryLoaded: true });
    }
    return loadingPromise;
  }
}

export default fetchAndSetupGlobalDict;
