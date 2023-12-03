import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import GoogleAnalytics from "react-ga4";
import queryString from "query-string";
import DocumentTitle from "react-document-title";
import ErrorBoundary from "../../components/ErrorBoundary";
import LessonNotFound from "./LessonNotFound";
import LessonOverview from "./LessonOverview";
import LessonSubheader from "./components/LessonSubheader";
import Finished from "./components/Finished";
import Flashcards from "./flashcards/Flashcards";
import { loadPersonalPreferences } from "../../utils/typey-type";
import getLessonMetadata from "./utilities/getLessonMetadata";
import MainLessonView from "./MainLessonView";

const isCustom = (pathname) =>
  pathname === "/lessons/custom" || pathname === "/lessons/custom/setup";

const isFinished = (lesson, currentPhraseID) =>
  currentPhraseID === lesson?.presentedMaterial?.length || 0;

const isFlashcards = (pathname) =>
  pathname.startsWith("/lessons/") && pathname.endsWith("/flashcards");

const isOverview = (pathname) =>
  pathname.startsWith("/lessons/") && pathname.endsWith("/overview");

const Lesson = (props) => {
  // const mainHeading = useRef<HTMLHeadingElement>(null);
  const mainHeading = useRef(null);
  useEffect(() => {
    if (mainHeading) {
      // @ts-ignore
      mainHeading.current?.focus();
    }
  }, []);

  const [hideOtherSettings, setHideOtherSettings] = useState(false);

  useEffect(() => {
    // If cookies are disabled, attempting to access localStorage will cause an error.
    // The disabled cookie error will be handled in ErrorBoundary.
    // Wrapping this in a try/catch or removing the conditional would fail silently.
    // By checking here, we let people use the rest of the app but not lessons.
    if (window.localStorage) {
      if (
        props.location.pathname.startsWith("/lessons/progress/") &&
        !props.location.pathname.includes("/lessons/progress/seen/") &&
        !props.location.pathname.includes("/lessons/progress/memorised/")
      ) {
        let loadedPersonalPreferences = loadPersonalPreferences();
        let newSeenOrMemorised = [false, true, true];
        props.setUpProgressRevisionLesson(
          loadedPersonalPreferences[0],
          loadedPersonalPreferences[1],
          newSeenOrMemorised
        );
      } else if (
        props.location.pathname.startsWith("/lessons/progress/seen/")
      ) {
        let loadedPersonalPreferences = loadPersonalPreferences();
        let newSeenOrMemorised = [false, true, false];
        props.setUpProgressRevisionLesson(
          loadedPersonalPreferences[0],
          loadedPersonalPreferences[1],
          newSeenOrMemorised
        );
      } else if (
        props.location.pathname.startsWith("/lessons/progress/memorised/")
      ) {
        let loadedPersonalPreferences = loadPersonalPreferences();
        let newSeenOrMemorised = [false, false, true];
        props.setUpProgressRevisionLesson(
          loadedPersonalPreferences[0],
          loadedPersonalPreferences[1],
          newSeenOrMemorised
        );
      } else if (
        props.location.pathname.startsWith("/lessons/custom") &&
        !props.location.pathname.startsWith("/lessons/custom/setup")
      ) {
        props.startCustomLesson();
      } else if (isOverview(props.location.pathname)) {
        // do nothing
      } else if (isFlashcards(props.location.pathname)) {
        // do nothing
      } else if (
        props.lesson.path !== props.location.pathname + "lesson.txt" &&
        props.location.pathname.startsWith("/lessons")
      ) {
        props.handleLesson(
          process.env.PUBLIC_URL + props.location.pathname + "lesson.txt"
        );
      }

      const parsedParams = queryString.parse(props.location.search);
      let hasSettingsParams = false;

      if (
        Object.keys(parsedParams).some((param) => {
          return props.userSettings.hasOwnProperty(param);
        })
      ) {
        hasSettingsParams = true;
      }

      if (hasSettingsParams) {
        props.setupLesson();
        hasSettingsParams = false;
      }
    }

    if (mainHeading?.current) {
      mainHeading?.current.focus();
    }
  }, []);

  const hasNonZeroTotalWordCount = props.totalWordCount === 0;
  const hasNonEmptyCurrentPhrase = props.currentPhrase === "";

  useEffect(() => {
    if (
      props.location.pathname.startsWith("/lessons/custom") &&
      !props.location.pathname.startsWith("/lessons/custom/setup") &&
      props.lesson.title !== "Custom"
    ) {
      props.startCustomLesson();
    } else if (isOverview(props.location.pathname)) {
      // do nothing
    } else if (isFlashcards(props.location.pathname)) {
      // do nothing
    } else if (
      // prevProps.match.url !== props.match.url &&
      props.location.pathname.startsWith("/lessons")
    ) {
      props.handleLesson(
        process.env.PUBLIC_URL + props.location.pathname + "lesson.txt"
      );
    }
  }, [props.location.pathname, props.lesson.title]);

  useEffect(() => {
    if (
      props.location.pathname.startsWith("/lessons/custom") &&
      // (prevProps.totalWordCount === 0 || prevProps.currentPhrase === "") &&
      (props.totalWordCount > 0 || props.currentPhrase.length > 0)
    ) {
      const yourTypedText = document.getElementById("your-typed-text");
      if (yourTypedText) {
        yourTypedText.focus();
      }
    }
  }, [props.match.url, hasNonEmptyCurrentPhrase, hasNonZeroTotalWordCount]);

  useEffect(() => {
    return () => {
      props.stopLesson();
    };
  }, []);

  function toggleHideOtherSettings() {
    let toggledHideOtherSettings = !hideOtherSettings;
    setHideOtherSettings(toggledHideOtherSettings);

    GoogleAnalytics.event({
      category: "UserSettings",
      action: "Toggle hide other settings",
      label: toggledHideOtherSettings.toString(),
    });
  }

  function stopAndCustomiseLesson() {
    props.stopLesson();
    props.customiseLesson();
  }

  if (props.lessonNotFound) {
    return <LessonNotFound lessonIndex={props.lessonIndex} />;
  }

  const lessonSubTitle =
    props.lesson?.subtitle?.length > 0 ? `: ${props.lessonSubTitle}` : "";

  const createNewCustomLesson = isCustom(props.location.pathname) ? (
    <Link
      to="/lessons/custom/setup"
      onClick={props.stopLesson}
      className="link-button link-button-ghost table-cell mr1"
      role="button"
    >
      Edit custom lesson
    </Link>
  ) : (
    <Link
      to="/lessons/custom/setup"
      onClick={stopAndCustomiseLesson.bind(this)}
      className="link-button link-button-ghost table-cell mr1"
      role="button"
    >
      Customise lesson
    </Link>
  );

  const metadata = getLessonMetadata(props.lessonIndex, props.lesson.path);
  const overviewLink = metadata?.overview ? (
    <Link
      to={props.location.pathname + "overview"}
      className="link-button link-button-ghost table-cell"
    >
      Overview
    </Link>
  ) : undefined;

  let propsLesson = props.lesson;
  if (
    (Object.keys(propsLesson).length === 0 &&
      propsLesson.constructor === Object) ||
    !propsLesson
  ) {
    propsLesson = {
      sourceMaterial: [{ phrase: "The", stroke: "-T" }],
      presentedMaterial: [{ phrase: "The", stroke: "-T" }],
      // possibly missing `newPresentedMaterial`?
      settings: { ignoredChars: "" },
      title: "Steno",
      subtitle: "",
      path: "",
    };
  }

  if (props.lesson) {
    if (
      isFinished(props.lesson, props.currentPhraseID) &&
      !isOverview(props.location.pathname) &&
      !isFlashcards(props.location.pathname)
    ) {
      return (
        <DocumentTitle title={"Typey Type | Lesson: " + props.lesson.title}>
          <main id="main">
            <LessonSubheader
              createNewCustomLesson={createNewCustomLesson}
              handleStopLesson={props.handleStopLesson}
              lessonSubTitle={lessonSubTitle}
              lessonTitle={props.lessonTitle}
              overviewLink={overviewLink}
              path={props.lesson?.path}
              restartLesson={props.restartLesson}
              ref={mainHeading}
            />
            <Finished
              actualText={props.actualText}
              changeSortOrderUserSetting={props.changeSortOrderUserSetting}
              changeSpacePlacementUserSetting={
                props.changeSpacePlacementUserSetting
              }
              changeShowScoresWhileTyping={props.changeShowScoresWhileTyping}
              changeShowStrokesAs={props.changeShowStrokesAs}
              changeShowStrokesAsList={props.changeShowStrokesAsList}
              changeShowStrokesOnMisstroke={props.changeShowStrokesOnMisstroke}
              changeStenoLayout={props.changeStenoLayout}
              changeUserSetting={props.changeUserSetting}
              changeVoiceUserSetting={props.changeVoiceUserSetting}
              chooseStudy={props.chooseStudy}
              currentLessonStrokes={props.currentLessonStrokes}
              disableUserSettings={props.disableUserSettings}
              globalUserSettings={props.globalUserSettings}
              handleBeatsPerMinute={props.handleBeatsPerMinute}
              handleDiagramSize={props.handleDiagramSize}
              handleLimitWordsChange={props.handleLimitWordsChange}
              handleStartFromWordChange={props.handleStartFromWordChange}
              handleRepetitionsChange={props.handleRepetitionsChange}
              handleUpcomingWordsLayout={props.handleUpcomingWordsLayout}
              hideOtherSettings={hideOtherSettings}
              recommendationHistory={props.recommendationHistory}
              metadata={metadata}
              lesson={props.lesson}
              lessonLength={propsLesson.presentedMaterial.length}
              lessonTitle={props.lessonTitle}
              metWords={props.metWords}
              path={props.lesson?.path}
              restartLesson={props.restartLesson}
              reviseLesson={props.reviseLesson}
              settings={props.lesson.settings}
              startFromWordOne={props.startFromWordOne}
              startTime={props.startTime}
              timer={props.timer}
              toggleHideOtherSettings={toggleHideOtherSettings.bind(this)}
              topSpeedPersonalBest={props.topSpeedPersonalBest}
              revisionMaterial={props.revisionMaterial}
              revisionMode={props.revisionMode}
              updatePreset={props.updatePreset}
              updateRecommendationHistory={props.updateRecommendationHistory}
              updateRevisionMaterial={props.updateRevisionMaterial}
              updateTopSpeedPersonalBest={props.updateTopSpeedPersonalBest}
              totalNumberOfMatchedWords={props.totalNumberOfMatchedWords}
              totalNumberOfNewWordsMet={props.totalNumberOfNewWordsMet}
              totalNumberOfLowExposuresSeen={
                props.totalNumberOfLowExposuresSeen
              }
              totalNumberOfRetainedWords={props.totalNumberOfRetainedWords}
              totalNumberOfMistypedWords={props.totalNumberOfMistypedWords}
              totalNumberOfHintedWords={props.totalNumberOfHintedWords}
              totalWordCount={propsLesson.presentedMaterial.length}
              userSettings={props.userSettings}
            />
          </main>
        </DocumentTitle>
      );
    } else {
      return (
        <Switch>
          <Route
            path={`/lessons/:category/:subcategory?/:lessonPath/overview`}
            render={(routeProps) => (
              <div>
                <ErrorBoundary>
                  <DocumentTitle title={"Typey Type | Lesson overview"}>
                    <LessonOverview
                      lessonMetadata={metadata}
                      lessonPath={props.location.pathname.replace(
                        "overview",
                        ""
                      )}
                      lessonTxtPath={props.location.pathname.replace(
                        "overview",
                        "lesson.txt"
                      )}
                      lessonTitle={props.lesson.title}
                      {...routeProps}
                      {...props}
                    />
                  </DocumentTitle>
                </ErrorBoundary>
              </div>
            )}
          />
          <Route
            path={`/lessons/:category/:subcategory?/:lessonPath/flashcards`}
            render={() => (
              <div>
                <DocumentTitle title={"Typey Type | Flashcards"}>
                  <Flashcards
                    fetchAndSetupGlobalDict={props.fetchAndSetupGlobalDict}
                    flashcardsMetWords={props.flashcardsMetWords}
                    flashcardsProgress={props.flashcardsProgress}
                    globalLookupDictionary={props.globalLookupDictionary}
                    globalLookupDictionaryLoaded={
                      props.globalLookupDictionaryLoaded
                    }
                    globalUserSettings={props.globalUserSettings}
                    personalDictionaries={props.personalDictionaries}
                    updateFlashcardsMetWords={props.updateFlashcardsMetWords.bind(
                      this
                    )}
                    updateFlashcardsProgress={props.updateFlashcardsProgress.bind(
                      this
                    )}
                    updateGlobalLookupDictionary={
                      props.updateGlobalLookupDictionary
                    }
                    updatePersonalDictionaries={
                      props.updatePersonalDictionaries
                    }
                    userSettings={props.userSettings}
                    fullscreen={props.fullscreen}
                    changeFullscreen={props.changeFullscreen.bind(this)}
                    lessonpath={
                      process.env.PUBLIC_URL +
                      props.location.pathname.replace(/flashcards/, "") +
                      "lesson.txt"
                    }
                    locationpathname={props.location.pathname}
                  />
                </DocumentTitle>
              </div>
            )}
          />
          <Route
            exact={true}
            path={`${props.match.url}`}
            render={() => (
              <MainLessonView
                createNewCustomLesson={createNewCustomLesson}
                lessonSubTitle={lessonSubTitle}
                overviewLink={overviewLink}
                propsLesson={propsLesson}
                actualText={props.actualText}
                changeShowScoresWhileTyping={props.changeShowScoresWhileTyping}
                changeShowStrokesAs={props.changeShowStrokesAs}
                changeShowStrokesAsList={props.changeShowStrokesAsList}
                changeShowStrokesInLesson={props.changeShowStrokesInLesson}
                changeShowStrokesOnMisstroke={
                  props.changeShowStrokesOnMisstroke
                }
                changeSortOrderUserSetting={props.changeSortOrderUserSetting}
                changeSpacePlacementUserSetting={
                  props.changeSpacePlacementUserSetting
                }
                changeStenoLayout={props.changeStenoLayout}
                changeUserSetting={props.changeUserSetting}
                changeVoiceUserSetting={props.changeVoiceUserSetting}
                chooseStudy={props.chooseStudy}
                completedPhrases={props.completedPhrases}
                currentLessonStrokes={props.currentLessonStrokes}
                currentPhrase={props.currentPhrase}
                currentPhraseID={props.currentPhraseID}
                currentStroke={props.currentStroke}
                disableUserSettings={props.disableUserSettings}
                globalLookupDictionary={props.globalLookupDictionary}
                globalLookupDictionaryLoaded={
                  props.globalLookupDictionaryLoaded
                }
                handleBeatsPerMinute={props.handleBeatsPerMinute}
                handleDiagramSize={props.handleDiagramSize}
                handleLimitWordsChange={props.handleLimitWordsChange}
                handleRepetitionsChange={props.handleRepetitionsChange}
                handleStartFromWordChange={props.handleStartFromWordChange}
                handleStopLesson={props.handleStopLesson}
                handleUpcomingWordsLayout={props.handleUpcomingWordsLayout}
                lesson={props.lesson}
                lessonLength={props.lessonLength}
                lessonTitle={props.lessonTitle}
                previousCompletedPhraseAsTyped={
                  props.previousCompletedPhraseAsTyped
                }
                recentLessonHistory={props.recentLessonHistory}
                repetitionsRemaining={props.repetitionsRemaining}
                restartLesson={props.restartLesson}
                revisionMode={props.revisionMode}
                sayCurrentPhraseAgain={props.sayCurrentPhraseAgain}
                settings={props.settings}
                showStrokesInLesson={props.showStrokesInLesson}
                targetStrokeCount={props.targetStrokeCount}
                timer={props.timer}
                totalNumberOfHintedWords={props.totalNumberOfHintedWords}
                totalNumberOfLowExposuresSeen={
                  props.totalNumberOfLowExposuresSeen
                }
                totalNumberOfMatchedWords={props.totalNumberOfMatchedWords}
                totalNumberOfMistypedWords={props.totalNumberOfMistypedWords}
                totalNumberOfNewWordsMet={props.totalNumberOfNewWordsMet}
                totalNumberOfRetainedWords={props.totalNumberOfRetainedWords}
                totalWordCount={props.totalWordCount}
                upcomingPhrases={props.upcomingPhrases}
                updatePreset={props.updatePreset}
                updateMarkup={props.updateMarkup.bind(this)}
                userSettings={props.userSettings}
                hideOtherSettings={hideOtherSettings}
                toggleHideOtherSettings={toggleHideOtherSettings.bind(this)}
              />
            )}
          />
        </Switch>
      );
    }
  } else {
    return (
      <div>
        <h2 ref={mainHeading} tabIndex={-1}>
          That lesson is missing.
        </h2>
      </div>
    );
  }
};

export default Lesson;
