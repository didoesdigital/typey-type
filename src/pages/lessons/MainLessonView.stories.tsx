import React from "react";
import { Link } from "react-router-dom";
import { useHydrateAtoms } from "jotai/utils";
import { userSettingsState } from "../../states/userSettingsState";
import MainLessonView from "./MainLessonView";
import userSettings from "../../stories/fixtures/userSettings";
import Zipper from "../../utils/zipper";
import { Lesson, LookupDictWithNamespacedDictsAndConfig } from "../../types";
import AppMethodsContext from "../../states/legacy/AppMethodsContext";
import appMethods from "../../stories/fixtures/appMethods";

export default {
  title: "Lessons/Main lesson view",
  component: MainLessonView,
  id: "main-lesson-view", // permalink
};
const presentedMaterialCurrentItem = {
  phrase: ".",
  stroke: "TP-PL",
};

const sourceMaterial = [
  {
    phrase: ".",
    stroke: "TP-PL",
  },
  {
    phrase: "and the",
    stroke: "SKP-T",
  },
];

const lesson: Lesson = {
  sourceMaterial: sourceMaterial,
  presentedMaterial: [
    {
      phrase: ".",
      stroke: "TP-PL",
    },
    {
      phrase: "and the",
      stroke: "SKP-T",
    },
  ],
  settings: {
    ignoredChars: "",
  },
  title: "Test lesson",
  subtitle: "",
  newPresentedMaterial: new Zipper(sourceMaterial),
  path: "/lessons/fundamentals/test/",
};

// @ts-expect-error TS(2322) FIXME: Type 'Map<string, [string, string][]>' is not assi... Remove this comment to see the full error message
const globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig = new Map([
  ["huh", [["H*U", "typey:typey-type.json"]]],
  ["gonna", [["TKPW*G", "typey:typey-type.json"]]],
]);

const createNewCustomLesson = (
  <Link
    to="/lessons/custom/setup"
    onClick={() => console.log("Stop lesson and edit custom lesson")}
    className="link-button link-button-ghost table-cell mr1"
    role="button"
  >
    Edit custom lesson
  </Link>
);

const Template = (args: any) => {
  useHydrateAtoms([[userSettingsState, userSettings]]);
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <MainLessonView
        createNewCustomLesson={createNewCustomLesson}
        globalLookupDictionary={globalLookupDictionary}
        globalLookupDictionaryLoaded={true}
        lesson={lesson}
        lessonSubTitle={""}
        lessonTitle={"Test lesson"}
        actualText={""}
        currentLessonStrokes={[]}
        currentPhraseID={0}
        disableUserSettings={false}
        previousCompletedPhraseAsTyped={""}
        repetitionsRemaining={1}
        revisionMode={false}
        settings={{ ignoredChars: "" }}
        showStrokesInLesson={false}
        targetStrokeCount={1}
        timer={1}
        totalNumberOfMatchedWords={0}
        totalNumberOfNewWordsMet={0}
        totalNumberOfLowExposuresSeen={0}
        totalNumberOfRetainedWords={0}
        totalNumberOfMistypedWords={0}
        totalNumberOfHintedWords={0}
        restartLesson={() => undefined}
        stopLesson={() => undefined}
        changeShowStrokesAsList={() => undefined}
        changeShowStrokesInLesson={() => undefined}
        changeShowStrokesOnMisstroke={() => undefined}
        changeSortOrderUserSetting={() => undefined}
        changeStenoLayout={() => undefined}
        changeShowScoresWhileTyping={() => undefined}
        changeShowStrokesAs={() => undefined}
        changeUserSetting={() => undefined}
        changeVoiceUserSetting={() => undefined}
        chooseStudy={() => undefined}
        completedPhrases={[]}
        propsLesson={lesson}
        currentPhrase={presentedMaterialCurrentItem.phrase}
        currentStroke={presentedMaterialCurrentItem.stroke}
        handleBeatsPerMinute={() => undefined}
        handleDiagramSize={() => undefined}
        handleLimitWordsChange={() => undefined}
        handleStartFromWordChange={() => undefined}
        handleRepetitionsChange={() => undefined}
        handleUpcomingWordsLayout={() => undefined}
        toggleHideOtherSettings={() => undefined}
        sayCurrentPhraseAgain={() => undefined}
        totalWordCount={1}
        upcomingPhrases={["and the"]}
        updatePreset={() => undefined}
        updateMarkup={() => undefined}
        overviewLink={undefined}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};

export const MainLessonViewStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
MainLessonViewStory.storyName = "Main lesson view";
