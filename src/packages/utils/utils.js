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
      path: "/lessons/stories/aesops-fables/belling-the-cat/lesson.txt"
    },
    {
      title: "Single-stroke-briefs",
      subtitle: "",
      category: "Collections",
      subcategory: "",
      path: "/lessons/single-stroke-briefs/lesson.txt"
    },
    {
      title: "Common words",
      subtitle: "",
      category: "Collections",
      subcategory: "",
      path: "/lessons/common-words/lesson.txt"
    },
    {
      title: "Top 1,000 English words",
      subtitle: "",
      category: "Collections",
      subcategory: "",
      path: "/lessons/1000/lesson.txt"
    },
    {
      title: "UX",
      subtitle: "",
      category: "Domain specific",
      subcategory: "",
      path: "/lessons/ux/lesson.txt"
    },
    {
      title: "Lesson 1 Exercise 1",
      subtitle: "One-syllable words",
      category: "Fundamentals",
      subcategory: "",
      path: "/lessons/fundamentals/lesson-1-exercise-1/lesson.txt"
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
export {getLessons,fakeRequest,matchLessonToTerm,sortLessons}
