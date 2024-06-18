import React, { useEffect, useRef } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CustomJSONLesson from "./components/CustomJSONLesson";
import CustomLessonIntro from "./components/CustomLessonIntro";
import CustomShareLessons from "./components/CustomShareLessons";
import CustomWordListLesson from "./components/CustomWordListLesson";
import Subheader from "../../../components/Subheader";

import type { CustomLessonMaterialValidationState } from "./components/CustomLessonIntro";
import { useAppMethods } from "../../../states/legacy/AppMethodsContext";

type Props = {
  customLessonMaterial: any;
  customLessonMaterialValidationState: CustomLessonMaterialValidationState;
  customLessonMaterialValidationMessages: string[];
  globalLookupDictionary: any;
  globalLookupDictionaryLoaded: boolean;
};

const CustomLessonSetup = ({
  customLessonMaterial,
  customLessonMaterialValidationMessages,
  customLessonMaterialValidationState,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
}: Props) => {
  const {
    createCustomLesson,
    appFetchAndSetupGlobalDict,
  } = useAppMethods()
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  useEffect(() => {
    if (
      globalLookupDictionary &&
      globalLookupDictionary.size < 2 &&
      !globalLookupDictionaryLoaded
    ) {
      appFetchAndSetupGlobalDict(false, null).catch((error) => {
        console.error(error);
        // this.showDictionaryErrorNotification();
      });
    }
  }, [
    appFetchAndSetupGlobalDict,
    globalLookupDictionary,
    globalLookupDictionaryLoaded,
  ]);

  const match = useRouteMatch({
    path: "/lessons",
    strict: true,
    sensitive: true,
  });
  const url = match?.url ?? "";

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2
              ref={mainHeading}
              tabIndex={-1}
              id="typey-type-for-stenographers-custom-lesson-setup"
            >
              Create a custom lesson
            </h2>
          </header>
        </div>
        <div className="flex flex-wrap mxn2">
          <Link
            to={`${url}/custom/generator`.replace(/\/{2,}/g, "/")}
            className="link-button link-button-ghost table-cell mr1"
            style={{ lineHeight: 2 }}
            id="ga--lesson-index--create-a-custom-lesson"
          >
            Generate a lesson
          </Link>
        </div>
      </Subheader>

      <div className="bg-info dark:bg-coolgrey-1100 landing-page-section">
        <CustomLessonIntro
          createCustomLesson={createCustomLesson}
          customLessonMaterial={customLessonMaterial}
          customLessonMaterialValidationState={
            customLessonMaterialValidationState
          }
          customLessonMaterialValidationMessages={
            customLessonMaterialValidationMessages
          }
        />
      </div>

      <div className="bg-white dark:bg-coolgrey-1000 landing-page-section">
        <CustomWordListLesson globalLookupDictionary={globalLookupDictionary} />
      </div>

      <div className="bg-info dark:bg-coolgrey-1100 landing-page-section">
        <CustomJSONLesson />
      </div>

      <div className="bg-white dark:bg-coolgrey-1000 landing-page-section">
        <div className="p3 mx-auto mw-1024">
          <h3 className="text-center">Generate a lesson</h3>
          <p className="text-center">
            You can also generate a lesson according to rules using the lesson
            generator:
          </p>
          <div className="text-center">
            <Link
              to={`${url}/custom/generator`.replace(/\/{2,}/g, "/")}
              className="link-button dib mt3"
              style={{ lineHeight: 2 }}
              id="ga--lesson-index--create-a-custom-lesson"
            >
              Generate a lesson
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-info dark:bg-coolgrey-1100 landing-page-section">
        <CustomShareLessons />
      </div>
    </main>
  );
};

export default CustomLessonSetup;
