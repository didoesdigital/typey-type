import fetchResource from "utils/getData/fetchResource";

let latestPloverDict = null;

function fetchLatestPloverDict() {
  return fetchResource(process.env.PUBLIC_URL + '/dictionaries/plover/main-3-jun-2018.json').then((json) => {
    return json;
  }).catch(function(e) {
    return {};
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
function DEPRECATED_fetchResource(resource = process.env.PUBLIC_URL + '/dictionaries/typey-type/typey-type.json') {
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
  DEPRECATED_fetchResource, // for custom lesson setup and more
  getLesson,
  getLatestPloverDict,
};
