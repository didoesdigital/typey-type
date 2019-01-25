let data = null;

function fetchLessonIndex() {
  return fetch(process.env.PUBLIC_URL + '/lessons/lessonIndex.json', {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return(json);
  });
}

function getLessonIndex() {
  let lessonIndex = [];
  if (data === null) {
    lessonIndex = fetchLessonIndex();
  } else {
    lessonIndex = Promise.resolve(data);
  }

  return lessonIndex;
};

function getLessonIndexData() {
  return getLessonIndex()
  .then(lessonIndex => {
    return lessonIndex;
  });
}

export {
  getLessonIndexData
};
