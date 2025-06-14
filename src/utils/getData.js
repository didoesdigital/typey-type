function getLesson(lessonFile) {
  return fetch(lessonFile, {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.text();
  });
}

/**
 * @returns DictionaryIndexEntry[]
 */
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
          "title": "Full Dictionary",
          "subtitle": "",
          "category": "Typey Type",
          "subcategory": "",
          "path": "/dictionaries/typey-type/typey-type-full.json",
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

export { fetchDictionaryIndex, getLesson };
