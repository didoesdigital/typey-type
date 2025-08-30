import Zipper from "../../../utils/zipper";

import type { CustomLesson } from "../../../types";

function customiseLesson() {
  // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
  const existingLesson = this.state.lesson;

  const customisedLesson: CustomLesson = {
    sourceMaterial: existingLesson.sourceMaterial.slice(),
    presentedMaterial: existingLesson.presentedMaterial.slice(),
    settings: { ignoredChars: "" },
    title: "Custom", // "Start custom lesson" overrides this anyway
    subtitle: "",
    newPresentedMaterial: new Zipper(existingLesson.sourceMaterial.slice()),
    path: import.meta.env.VITE_PUBLIC_URL + "/lessons/custom",
  };

  const validationState = "success";

  const newCustomLessonMaterial = customisedLesson.presentedMaterial
    .map((materialItem) => `${materialItem.phrase}	${materialItem.stroke}`)
    .join("\n");

  // @ts-expect-error TS(2683) FIXME: 'this' implicitly has type 'any' because it does n... Remove this comment to see the full error message
  this.setState({
    lesson: customisedLesson,
    currentPhraseID: 0,
    customLesson: customisedLesson,
    customLessonMaterial: newCustomLessonMaterial,
    customLessonMaterialValidationState: validationState,
  });
}

export default customiseLesson;
