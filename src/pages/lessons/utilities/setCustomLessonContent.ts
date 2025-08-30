import Zipper from "../../../utils/zipper";

import type { CustomLesson, MaterialItem } from "../../../types";

function setCustomLessonContent(material: MaterialItem[]) {
  const customisedLesson: CustomLesson = {
    sourceMaterial: material.slice(),
    presentedMaterial: material.slice(),
    settings: { ignoredChars: "" },
    title: "Custom", // "Start custom lesson" overrides this anyway
    subtitle: "",
    newPresentedMaterial: new Zipper(material.slice()),
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

export default setCustomLessonContent;
