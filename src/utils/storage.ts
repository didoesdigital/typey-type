function loadPersonalPreferences() {
  let metWords = {};
  let lessonsProgress = {};
  try {
    if (window.localStorage) {
      if (window.localStorage.getItem("metWords")) {
        // @ts-ignore
        metWords = JSON.parse(window.localStorage.getItem("metWords"));
      }
      if (window.localStorage.getItem("lessonsProgress")) {
        lessonsProgress = Object.assign(
          lessonsProgress,
          // @ts-ignore
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
