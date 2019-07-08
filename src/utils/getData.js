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
        "title": "Typey Type",
        "category": "Typey Type",
        "subcategory": "",
        "path": process.env.PUBLIC_URL + "/typey-type/typey-type.json"
      },
      {
        "title": "Steno",
        "category": "Drills",
        "subcategory": "",
        "path": process.env.PUBLIC_URL + "/drills/steno/steno.json"
      }]
    );
  });
}

// for custom lesson setup
function fetchResource(resource = process.env.PUBLIC_URL + '/dictionaries/dict.json') {
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
  getLesson
};
