import React, { useEffect, useRef } from "react";
import CustomJSONLesson from "./CustomJSONLesson";
import CustomLessonIntro from "./CustomLessonIntro";
import CustomShareLessons from "./CustomShareLessons";
import CustomWordListLesson from "./CustomWordListLesson";

type Props = {
  createCustomLesson: () => void;
  customLessonMaterial: any;
  customLessonMaterialValidationMessages: any;
  customLessonMaterialValidationState: any;
  fetchAndSetupGlobalDict: (
    withPlover: boolean,
    importedPersonalDictionaries?: any
  ) => Promise<any>;
  globalLookupDictionary: any;
  globalLookupDictionaryLoaded: boolean;
  personalDictionaries: any;
  setAnnouncementMessage: () => void;
};

const CustomLessonSetup = ({
  createCustomLesson,
  customLessonMaterial,
  customLessonMaterialValidationMessages,
  customLessonMaterialValidationState,
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  personalDictionaries,
  setAnnouncementMessage,
}: Props) => {
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
      const shouldUsePersonalDictionaries =
        personalDictionaries &&
        Object.entries(personalDictionaries).length > 0 &&
        !!personalDictionaries.dictionariesNamesAndContents;

      fetchAndSetupGlobalDict(
        false,
        shouldUsePersonalDictionaries ? personalDictionaries : null
      ).catch((error) => {
        console.error(error);
        // this.showDictionaryErrorNotification();
      });
    }
  }, [
    fetchAndSetupGlobalDict,
    globalLookupDictionary,
    globalLookupDictionaryLoaded,
    personalDictionaries,
  ]);

  return (
    <main id="main">
      <div className="subheader">
        <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
          <div className="flex mr1 self-center">
            <header className="flex items-center min-h-40">
              <h2
                ref={mainHeading}
                tabIndex={-1}
                id="about-typey-type-for-stenographers"
              >
                Create a custom lesson
              </h2>
            </header>
          </div>
        </div>
      </div>

      <div className="bg-info landing-page-section">
        <CustomLessonIntro
          createCustomLesson={createCustomLesson}
          customLessonMaterial={customLessonMaterial}
          customLessonMaterialValidationState={
            customLessonMaterialValidationState
          }
          customLessonMaterialValidationMessages={
            customLessonMaterialValidationMessages
          }
          setAnnouncementMessage={setAnnouncementMessage}
        />
      </div>

      <div className="bg-white landing-page-section">
        <CustomWordListLesson globalLookupDictionary={globalLookupDictionary} />
      </div>

      <div className="bg-info landing-page-section">
        <CustomJSONLesson />
      </div>

      <div className="bg-white landing-page-section">
        <CustomShareLessons setAnnouncementMessage={setAnnouncementMessage} />
      </div>
    </main>
  );
};

export default CustomLessonSetup;
