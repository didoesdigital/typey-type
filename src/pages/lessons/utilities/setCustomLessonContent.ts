import Zipper from "../../../utils/zipper";

import type { CustomLesson, MaterialItem } from "../../../types";

function setCustomLessonContent(material: MaterialItem[]) {
  const customisedLesson: CustomLesson = {
    sourceMaterial: material.slice(),
    presentedMaterial: material.slice(),
    settings: { ignoredChars: "" },
    title: "Custom", // "Start custom lesson" overrides this anyway
    subtitle: "",
    // @ts-ignore FIXME: might be a Zipper typing issue
    newPresentedMaterial: new Zipper(material.slice()),
    path: process.env.PUBLIC_URL + "/lessons/custom",
  };

  const validationState = "success";

  const newCustomLessonMaterial = customisedLesson.presentedMaterial
    .map((materialItem) => `${materialItem.phrase}	${materialItem.stroke}`)
    .join("\n");

  // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation.
  this.setState({
    lesson: customisedLesson,
    currentPhraseID: 0,
    customLesson: customisedLesson,
    customLessonMaterial: newCustomLessonMaterial,
    customLessonMaterialValidationState: validationState,
  });
}

export default setCustomLessonContent;
