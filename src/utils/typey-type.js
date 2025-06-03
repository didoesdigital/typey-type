import Zipper from './zipper';

const SETTINGS_NAME_MAP = {
  ignore_characters: 'ignoredChars',
  warning_message: 'customMessage',
  locales: 'locales'
}

/**
 * @param {string} lessonTextAndStrokes
 * @return {[import('types').CustomLesson, any, any[]]}
 */
function parseCustomMaterial(lessonTextAndStrokes) {
  let validationState = 'unvalidated';
  /**
   * @type {any[]}
   */
  let validationMessages = [];

  let emptyCustomLesson = {
    sourceMaterial: [],
    presentedMaterial: [{phrase: '', stroke: ''}],
    settings: { ignoredChars: '' },
    title: 'Custom',
    subtitle: '',
    newPresentedMaterial: new Zipper([{phrase: '', stroke: ''}]),
    path: process.env.PUBLIC_URL + '/lessons/custom'
  }
  if (lessonTextAndStrokes.length === 0) {
    validationState = 'fail';
    validationMessages.push('Your material needs at least 1 word');
    return [emptyCustomLesson, validationState, validationMessages];
  }

  if (!lessonTextAndStrokes.includes("	")) {
    validationState = 'fail';
    validationMessages.push('Your material needs at least 1 “Tab” character');
    return [emptyCustomLesson, validationState, validationMessages];
  }

  let lessonTitle = 'Custom';
  let lessonSubtitle = '';

  let lines = lessonTextAndStrokes.split("\n");
  lines = lines.filter(phrase => phrase !== '');
  lines = lines.filter(phrase => phrase.includes("	"));
  lines = lines.filter(phrase => !phrase.startsWith("	"));
  if (lines.length === 0) {
    validationState = 'fail';
    validationMessages.push('Your material needs at least 1 word and 1 “Tab” character');
    return [emptyCustomLesson, validationState, validationMessages];
  }

  let sourceMaterial = [];
  let settings = {ignoredChars: ''};

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let phraseAndStroke = line.split("	");
    let phrase = phraseAndStroke[0];
    let stroke = phraseAndStroke[1];
    sourceMaterial.push( {phrase: phrase, stroke: stroke} );
  }

  validationState = 'success';

  return [{
    sourceMaterial: sourceMaterial,
    presentedMaterial: sourceMaterial,
    settings: settings,
    title: lessonTitle,
    subtitle: lessonSubtitle,
    newPresentedMaterial: new Zipper(sourceMaterial),
    path: process.env.PUBLIC_URL + '/lessons/custom'
  },
    validationState,
    validationMessages
  ]
}

function parseLesson(lessonText, path) {
  let lines = lessonText.split("\n");
  let lessonTitle = lines[0];
  let lessonSubtitle = lines[1];
  let sourceMaterial = [];
  let settings = {ignoredChars: ''};

  for (let i = 2; i < lines.length; i++) {
    let line = lines[i];
    let firstChar = line.charAt(0);

    // If it starts with a single quote, it's lesson material:
    if (firstChar === "'") {
      let phraseAndStroke = line.split("': ");
      let phrase = phraseAndStroke[0].substring(1, phraseAndStroke[0].length);
      let stroke = phraseAndStroke[1];
      sourceMaterial.push( {phrase: phrase, stroke: stroke} );
    }
    // If it doesn't start with a single quote and does include equals, it's a setting:
    else if (line.indexOf("=") !== -1) {
      // Example: `warning_message=Hint: use exact spacing setting`
      // Example: `warning_message=Hint: use exact spacing setting and don’t type ^`
      // Example: `warning_message=Hint: use TK-LS between strokes`
      // Example: `ignore_characters='^'`
      const [settingName, settingValue] = line.split("=");
      if (settingName in SETTINGS_NAME_MAP) {
        settings[SETTINGS_NAME_MAP[settingName]] =
          settingName === "ignore_characters" ? settingValue.replace(/'/g, "") : settingValue;
      }
    }
  }

  return {
    sourceMaterial: sourceMaterial,
    presentedMaterial: sourceMaterial,
    settings: settings,
    title: lessonTitle,
    subtitle: lessonSubtitle,
    newPresentedMaterial: new Zipper(sourceMaterial),
    path: path
  }
}

const migratePersonalDictionariesV0ToV1 = function (personalDictionaries, dirtyFlag) {
  if (!personalDictionaries.v) {
    personalDictionaries = {v:'1',dicts:personalDictionaries};
    dirtyFlag = true;
  }

  return [personalDictionaries, dirtyFlag];
}

// const migratePersonalDictionariesV1ToV2 = function (personalDictionaries, dirtyFlag) {
//   if (personalDictionaries.v && personalDictionaries.v === '1') {
//     let opts = {};
//     let dictsWithMetadata = personalDictionaries.dicts.map(dict => [dict[0],dict[1],opts]);
//     personalDictionaries = {v:'2',dicts:dictsWithMetadata};
//     dirtyFlag = true;
//   }

//   return [personalDictionaries, dirtyFlag];
// }

const runAllPersonalDictionariesMigrations = function (personalDictionaries, dirtyFlag) {
  let error = null;
  try {
    [personalDictionaries, dirtyFlag] = migratePersonalDictionariesV0ToV1(personalDictionaries, dirtyFlag);
    // [personalDictionaries, dirtyFlag] = migratePersonalDictionariesV1ToV2(personalDictionaries, dirtyFlag);
  }
  catch (exception) {
    personalDictionaries = null;
    dirtyFlag = false;
    error = "Personal dictionaries found in local storage are either missing a version number or are not in valid version 0 format for migrating to version 1.";
  }
  return [personalDictionaries, dirtyFlag, error];
}

function migratePersonalDictionariesV(personalDictionaries) {
  let dirtyFlag = false;
  let error = null;

  [personalDictionaries, dirtyFlag, error] = runAllPersonalDictionariesMigrations(personalDictionaries, dirtyFlag, error);

  if (personalDictionaries !== null && dirtyFlag && error === null) {
    writePersonalPreferences('personalDictionaries', personalDictionaries);
  }

  return [personalDictionaries, error];
}

function loadPersonalDictionariesFromLocalStorage() {
  try {
    if (window.localStorage) {
      let versionedDictionaries = null;
      if (window.localStorage.getItem('personalDictionaries')) {
        versionedDictionaries = JSON.parse(window.localStorage.getItem('personalDictionaries'));
      }
      if (versionedDictionaries === null) {
        return null;
      }

      let errorMessage = null;
      [versionedDictionaries, errorMessage] = migratePersonalDictionariesV(versionedDictionaries);
      if (errorMessage) {
        console.error(errorMessage);
        return null;
      }

      let areDictsSomewhatValid = versionedDictionaries !== null && versionedDictionaries.v && versionedDictionaries.v === '1' && versionedDictionaries.dicts && versionedDictionaries.dicts[0] && versionedDictionaries.dicts[0][1];
      if (areDictsSomewhatValid) {
        return versionedDictionaries['dicts'];
      }
      else {
        console.error("Dictionaries found in local storage are not valid. ");
        return null;
      }
    }
  }
  catch(error) {
    console.error('Unable to read local storage. ', error);
  }
  return null;
}

function writePersonalPreferences(itemToStore, JSONToStore) {
  const localStorageErrorMessage = "Local storage is unavailable. Changes to personal preferences and progress will be lost.";
  try {
    if (!window.localStorage) {
      console.warn('Unable to write to local storage. Progress data will be lost.');
      return {
        name: "NoLocalStorage",
        message: localStorageErrorMessage,
      }
    }
  }
  catch(error) {
    console.warn(localStorageErrorMessage);
    console.error(error);
    return {
      name: "NoLocalStorage",
      message: localStorageErrorMessage,
    }
  }

  let stringToStore = JSON.stringify(JSONToStore);

  try {
    window.localStorage.setItem(itemToStore, stringToStore);
  }
  catch(error) {
    try {
      window.localStorage.removeItem('typey-KPOES-words');
      window.localStorage.removeItem('personalDictionaries');
      // TODO: instead of logging here, we could handle the returned error result everywhere that this is called
      console.log('Unable to write to local storage. It may be full. Any personal dictionaries imported have been removed.', error);
      return {
        name: "AddToStorageFailed",
        message: "Unable to set item in local storage. It may be full. Any personal dictionaries imported have been removed.",
        error: error
      }
    }
    catch {
      // TODO: instead of logging here, we could handle the returned error result everywhere that this is called
      console.log('Unable to set or remove items from local storage. Changes to User Settings and Met Words will be lost.', error);
      return {
        name: "WriteToStorageFailed",
        message: "Unable to set or remove items from local storage. Changes to User Settings and Met Words will be lost.",
        error: error
      }
    }
  }
}

function repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID) {
  let lessonLength = presentedMaterial.length;
  if (currentPhraseID > lessonLength) { return 0; }
  let reps = userSettings.repetitions;
  let wordsPerRep = lessonLength/ userSettings.repetitions;
  let wordsRemaining = lessonLength - currentPhraseID;
  return reps - Math.floor(((lessonLength - wordsRemaining)/wordsPerRep));
}

function updateCapitalisationStrokesInNextItem(nextItem, lastWord) {
  if (nextItem.stroke.startsWith("KPA/") || nextItem.stroke.startsWith("HRO*ER/") || nextItem.stroke.startsWith("*URP/")) {
    if (lastWord.endsWith(".") || lastWord.endsWith("!") || lastWord.endsWith("?") || lastWord.endsWith("…") || lastWord.endsWith('!"') || lastWord.endsWith('?"') || lastWord.endsWith('."')) {
      nextItem["stroke"] = nextItem["stroke"].replace(/^(KPA\/|\*URP\/|HRO\*ER\/)/,'');
    }
  }

  if (nextItem.stroke.startsWith("KW-GS KPA") || nextItem.stroke.startsWith("KR-GS KPA")) {
    if (lastWord.endsWith(".") || lastWord.endsWith("!") || lastWord.endsWith("?") || lastWord.endsWith("…") || lastWord.endsWith('!"') || lastWord.endsWith('?"') || lastWord.endsWith('."')) {
      nextItem["stroke"] = nextItem["stroke"].replace(/^(KR-GS KPA\/)/,'KR-GS ');
      nextItem["stroke"] = nextItem["stroke"].replace(/^(KW-GS KPA\/)/,'KW-GS ');
    }

    if (lastWord.match(/[A-Za-z]$/) || lastWord.endsWith(":")) {
      nextItem["stroke"] = nextItem["stroke"].replace(/^(KR-GS KPA\/)/,'KR-GS KPA*/');
      nextItem["stroke"] = nextItem["stroke"].replace(/^(KW-GS KPA\/)/,'KW-GS KPA*/');
    }
  }

  return nextItem;
}

export {
  loadPersonalDictionariesFromLocalStorage,
  migratePersonalDictionariesV0ToV1,
  // migratePersonalDictionariesV1ToV2,
  parseCustomMaterial,
  parseLesson,
  repetitionsRemaining,
  runAllPersonalDictionariesMigrations,
  updateCapitalisationStrokesInNextItem,
  writePersonalPreferences
};
