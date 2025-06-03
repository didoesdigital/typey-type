import Zipper from './zipper';

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

export {
  loadPersonalDictionariesFromLocalStorage,
  migratePersonalDictionariesV0ToV1,
  // migratePersonalDictionariesV1ToV2,
  parseCustomMaterial,
  runAllPersonalDictionariesMigrations,
  writePersonalPreferences
};
