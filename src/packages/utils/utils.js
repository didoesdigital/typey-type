function matchLessonToTerm(state, value) {
  return (
    state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
    state.code.toLowerCase().indexOf(value.toLowerCase()) !== -1
  )
}

function sortLessons(a, b, value) {
  const aLower = a.name.toLowerCase()
  const bLower = b.name.toLowerCase()
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
    getLessons().filter(state => matchLessonToTerm(state, value)) :
    getLessons()
  )
}

function getLessons() {
  return [
    { code: '1a', name: 'lesson-one' },
    { code: '2b', name: 'lesson-two' },
    { code: '3c', name: 'lesson-three' }
  ]
}
export {getLessons,fakeRequest,matchLessonToTerm,sortLessons}
