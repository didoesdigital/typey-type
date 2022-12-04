import React from "react";
import { Route, Switch } from "react-router-dom";
import Lesson from "./Lesson";
import userSettings from "../../stories/fixtures/userSettings";
import Zipper from "../../utils/zipper";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/Lesson",
  component: Lesson,
  id: "lesson", // permalink
};

let userGoals = {
  newWords: 5,
  oldWords: 15,
};
const presentedMaterialCurrentItem = {
  phrase: "test",
  stroke: "TEFT",
};

const sourceMaterial = [
  {
    phrase: "test",
    stroke: "TEFT",
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

const Template = (args) => {
  return (
    <div className="p3">
      TODO make the Lesson story work
      <Switch>
        <Route
          render={(props) => (
            <div>
              <Lesson
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
                upcomingPhrases={[]}
                updateRecommendationHistory={() => undefined}
                updateMarkup={() => undefined}
                updateTopSpeedPersonalBest={() => undefined}
                {...props}
                {...args}
              />
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export const LessonStory = Template.bind({});
LessonStory.storyName = "Lesson";
