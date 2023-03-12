import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import MainLessonView from "./MainLessonView";
import userSettings from "../../stories/fixtures/userSettings";
import Zipper from "../../utils/zipper";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/Main lesson view",
  component: MainLessonView,
  id: "main-lesson-view", // permalink
};

let userGoals = {
  newWords: 5,
  oldWords: 15,
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

const customLesson = {
  sourceMaterial: sourceMaterial,
  presentedMaterial: [
    {
      phrase: "test",
      stroke: "TEFT",
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
const lesson = {
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

const globalLookupDictionary = new Map([
  ["huh", [["H*U", "typey:typey-type.json"]]],
  ["gonna", [["TKPW*G", "typey:typey-type.json"]]],
]);

const lessonIndex = [
  {
    title: "Test lesson",
    subtitle: "",
    category: "Fundamentals",
    subcategory: "",
    path: "/lessons/fundamentals/test/",
  },
];

const handleLesson = (path) => undefined;
const stopLesson = () => undefined;

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

const Template = (args) => {
  return (
    <Switch>
      <Route
        render={() => (
          <div>
            <MainLessonView
              createNewCustomLesson={createNewCustomLesson}
              customLesson={customLesson}
              fetchAndSetupGlobalDict={() => Promise.resolve(true)}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={true}
              updateFlashcardsMetWords={() => undefined}
              handleLesson={handleLesson}
              lesson={lesson}
              lessonIndex={lessonIndex}
              stopLesson={stopLesson}
              setAnnouncementMessage={() => console.log("announce")}
              userSettings={userSettings}
              updateFlashcardsProgress={() => undefined}
              changeFullscreen={() => undefined}
              flashcardsMetWords={{}}
              customLessonMaterial={[]}
              customLessonMaterialValidationState={[]}
              customLessonMaterialValidationMessages={[]}
              flashcardsProgress={{}}
              globalUserSettings={{}}
              personalDictionaries={{ dictionariesNamesAndContents: null }}
              lessonsProgress={{}}
              lessonNotFound={false}
              location={{ pathname: "/lesson" }}
              fullscreen={false}
              lessonSubTitle={""}
              lessonTitle={"Test lesson"}
              path={"/lessons/fundamentals/test/"}
              actualText={""}
              currentLessonStrokes={[]}
              currentPhraseID={0}
              disableUserSettings={false}
              metWords={{}}
              previousCompletedPhraseAsTyped={[]}
              recommendationHistory={[]}
              repetitionsRemaining={1}
              revisionMaterial={[]}
              revisionMode={false}
              startTime={0}
              settings={{ ignoredChars: "" }}
              showStrokesInLesson={false}
              targetStrokeCount={1}
              timer={1}
              topSpeedPersonalBest={40}
              updateUserGoals={userGoals}
              totalNumberOfMatchedWords={0}
              totalNumberOfNewWordsMet={0}
              totalNumberOfLowExposuresSeen={0}
              totalNumberOfRetainedWords={0}
              totalNumberOfMistypedWords={0}
              totalNumberOfHintedWords={0}
              updateGlobalLookupDictionary={() => undefined}
              updatePersonalDictionaries={() => undefined}
              restartLesson={() => undefined}
              reviseLesson={() => undefined}
              handleStopLesson={() => undefined}
              changeShowStrokesInLesson={() => undefined}
              changeShowStrokesOnMisstroke={() => undefined}
              changeSortOrderUserSetting={() => undefined}
              changeSpacePlacementUserSetting={() => undefined}
              changeStenoLayout={() => undefined}
              changeShowScoresWhileTyping={() => undefined}
              changeShowStrokesAs={() => undefined}
              changeUserSetting={() => undefined}
              chooseStudy={() => undefined}
              completedPhrases={[]}
              createCustomLesson={() => undefined}
              propsLesson={lesson}
              currentPhrase={presentedMaterialCurrentItem.phrase}
              currentStroke={presentedMaterialCurrentItem.stroke}
              handleBeatsPerMinute={() => undefined}
              handleDiagramSize={() => undefined}
              handleLimitWordsChange={() => undefined}
              handleStartFromWordChange={() => undefined}
              handleRepetitionsChange={() => undefined}
              handleUpcomingWordsLayout={() => undefined}
              updateRevisionMaterial={() => undefined}
              sayCurrentPhraseAgain={() => undefined}
              setAnnouncementMessageString={() => undefined}
              startFromWordOne={() => undefined}
              stenoHintsOnTheFly={true}
              startCustomLesson={() => undefined}
              setUpProgressRevisionLesson={() => undefined}
              setupLesson={() => undefined}
              charsPerWord={() => undefined}
              totalWordCount={1}
              upcomingPhrases={["and the"]}
              updateRecommendationHistory={() => undefined}
              updateMarkup={() => undefined}
              updateTopSpeedPersonalBest={() => undefined}
              {...args}
            />
          </div>
        )}
      />
    </Switch>
  );
};

export const MainLessonViewStory = Template.bind({});
MainLessonViewStory.storyName = "Main lesson view";
