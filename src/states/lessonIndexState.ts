import { atomWithLazy, unwrap } from "jotai/utils";
import { useAtomValue } from "jotai";
import { LessonIndexEntry } from "../types";

const lessonIndexFallback: LessonIndexEntry[] = [{
  "title": "Steno",
  "subtitle": "",
  "category": "Drills",
  "subcategory": "",
  "path": process.env.PUBLIC_URL + "/drills/steno/lesson.txt",
  overview: "",
  suggestedNext: "",
  wordCount: 0,
}];

function fetchLessonIndex() {
  return fetch(process.env.PUBLIC_URL + '/lessons/lessonIndex.json', {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return(json);
  }).catch(() => {
    return lessonIndexFallback;
  });
}

const _lessonIndexState = atomWithLazy<Promise<LessonIndexEntry[]>>(fetchLessonIndex);

/**
 * This suspends while loading
 */
export const useLessonIndex = () => {
  return useAtomValue(_lessonIndexState);
}

/**
 * This always returns some value. fallback while loading
 */
export const useLessonIndexWithFallback = () => {
  // fallback while loading
  return useAtomValue(unwrap(_lessonIndexState)) ?? lessonIndexFallback;
}
