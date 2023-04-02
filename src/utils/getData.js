let dictTypeyType = null;
let latestPloverDict = null;

function fetchLatestPloverDict() {
  return fetchResource(process.env.PUBLIC_URL + '/dictionaries/plover/main-3-jun-2018.json').then((json) => {
    return json;
  }).catch(function(e) {
    return {};
  });
}

function fetchDictTypeyType() {
  return fetchResource(process.env.PUBLIC_URL + '/dictionaries/typey-type/typey-type.json').then((json) => {
    return json;
  }).catch(function(e) {
    return {
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
  });
}

function getLatestPloverDict() {
  let dict;

  if (latestPloverDict === null) {
    dict = fetchLatestPloverDict().then(data => {
      latestPloverDict = data;
      return data;
    });
  }
  else {
    dict = Promise.resolve(latestPloverDict);
  }

  return dict;
}

function getTypeyTypeDict() {
  let dict;

  if (dictTypeyType === null) {
    dict = fetchDictTypeyType().then(data => {
      dictTypeyType = data;
      return data;
    });
  }
  else {
    dict = Promise.resolve(dictTypeyType);
  }

  return dict;
}

function getLesson(lessonFile) {
  return fetch(lessonFile, {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.text();
  });
}

function fetchDictionaryIndex() {
  return fetch(process.env.PUBLIC_URL + '/dictionaries/dictionaryIndex.json', {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return(json);
  }).catch(function(e) {
    console.log('Unable to load dictionary index', e)
    return(
      [
        {
          "author": "Typey Type",
          "title": "Dictionary",
          "subtitle": "",
          "category": "Typey Type",
          "subcategory": "",
          "path": "/dictionaries/typey-type/typey-type.json",
          "link": "/support#typey-type-dictionary",
          "tagline": "Typey Type’s dictionary follows the Plover dictionary with misstrokes removed from the top 10,000 words."
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
        }
      ]
    );
  });
}

// for custom lesson setup
function fetchResource(resource = process.env.PUBLIC_URL + '/dictionaries/typey-type/typey-type.json') {
  return fetch(resource, {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return(json);
  });
}

export {
  fetchDictionaryIndex,
  fetchResource, // for custom lesson setup and more
  getLesson,
  getLatestPloverDict,
  getTypeyTypeDict
};
