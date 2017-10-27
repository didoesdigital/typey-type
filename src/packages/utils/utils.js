function matchLessonToTerm(lesson, value) {
  return (
    lesson.title.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    lesson.subtitle.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}

function sortLessons(a, b, value) {
  const aLower = a.title.toLowerCase()
  const bLower = b.title.toLowerCase()
  const valueLower = value.toLowerCase()
  const queryPosA = aLower.indexOf(valueLower)
  const queryPosB = bLower.indexOf(valueLower)
  if (queryPosA !== queryPosB) {
    return queryPosA - queryPosB
  }
  return aLower < bLower ? -1 : 1
}

function fakeRequest(value, cb) {
  return setTimeout(cb, 500, value ?
    getLessons().filter(lesson => matchLessonToTerm(lesson, value)) :
    getLessons()
  )
}

function getLessons() {
  return [
    {
      title: "Belling the Cat",
      subtitle: "",
      category: "Stories",
      subcategory: "Aesop's Fables",
      path: "/lessons/stories/fables/belling-the-cat/lesson.txt"
    },
    {
      title: "Single-stroke-briefs",
      subtitle: "",
      category: "Collections",
      subcategory: "",
      path: "/lessons/collections/single-stroke-briefs/lesson.txt"
    },
    {
      title: "Common words",
      subtitle: "",
      category: "Collections",
      subcategory: "",
      path: "/lessons/collections/common-words/lesson.txt"
    },
    {
      title: "Top 1,000 English words",
      subtitle: "",
      category: "Collections",
      subcategory: "",
      path: "/lessons/collections/google-1000-english/lesson.txt"
    },
    {
      title: "UX",
      subtitle: "",
      category: "Domain specific",
      subcategory: "",
      path: "/lessons/domains/ux/lesson.txt"
    },
    {
      title: "Lesson 1 Exercise 1",
      subtitle: "One-syllable words",
      category: "Fundamentals",
      subcategory: "",
      path: "/lessons/fundamentals/one-syllable-words/lesson.txt"
    },
    {
      title: "FR",
      subtitle: "-fer",
      category: "Drills",
      subcategory: "",
      path: "/lessons/drills/fr/lesson.txt"
    }
  ]
}

function randomise(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export {getLessons,fakeRequest,matchLessonToTerm,sortLessons,randomise}
