import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useHydrateAtoms } from "jotai/utils";
import { userSettingsState } from "../../states/userSettingsState";
import MainLessonView from "./MainLessonView";
import userSettings from "../../stories/fixtures/userSettings";
import Zipper from "../../utils/zipper";
import { Lesson, LookupDictWithNamespacedDictsAndConfig } from "../../types";
import AppMethodsContext from "../../states/legacy/AppMethodsContext";
import appMethods from "../../stories/fixtures/appMethods";

// eslint-disable-next-line import/no-anonymous-default-export
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
  // @ts-expect-error
  newPresentedMaterial: new Zipper(sourceMaterial),
  path: "/lessons/fundamentals/test/",
};

// @ts-expect-error
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
  useHydrateAtoms([[userSettingsState, userSettings]])
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <Switch>
        <Route>
          <div>
            <MainLessonView
              createNewCustomLesson={createNewCustomLesson}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={true}
              lesson={lesson}
              lessonLength={1}
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
              handleStopLesson={() => undefined}
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
          </div>
        </Route>
      </Switch>
    </AppMethodsContext.Provider>
  );
};

export const MainLessonViewStory = Template.bind({});
// @ts-expect-error
MainLessonViewStory.storyName = "Main lesson view";
