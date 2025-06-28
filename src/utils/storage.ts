import type { LessonsProgressIndex, MetWords } from "types";

function loadPersonalPreferences(): [MetWords, LessonsProgressIndex] {
  let metWords = {};
  let lessonsProgress = {};
  try {
    if (window.localStorage) {
      if (window.localStorage.getItem("metWords")) {
        // @ts-expect-error TS(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
        metWords = JSON.parse(window.localStorage.getItem("metWords"));
      }
      if (window.localStorage.getItem("lessonsProgress")) {
        lessonsProgress = Object.assign(
          lessonsProgress,
          // @ts-expect-error TS(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
          JSON.parse(window.localStorage.getItem("lessonsProgress"))
        );
      }
      return [metWords, lessonsProgress];
    }
  } catch (error) {
    console.log("Unable to read local storage.", error);
  }
  return [metWords, lessonsProgress];
}

export { loadPersonalPreferences };
