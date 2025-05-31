import React, { Component } from 'react';
import { isLessonTextValid } from 'utils/utils';
import {
  createWordListFromMetWords,
  parseCustomMaterial,
  parseWordList,
  loadPersonalPreferences,
  matchSplitText,
  parseLesson,
  repetitionsRemaining,
  shouldShowStroke,
  strokeAccuracy,
  getTargetStrokeCount,
  getTargetObservableStrokeCount,
  updateCapitalisationStrokesInNextItem,
  writePersonalPreferences
} from './utils/typey-type';
import { getLesson } from './utils/getData';
import {
  generateListOfWordsAndStrokes
} from './utils/transformingDictionaries/transformingDictionaries';
import fallbackLesson from './constant/fallbackLesson';
import fetchAndSetupGlobalDict from './utils/app/fetchAndSetupGlobalDict';
import calculateMemorisedWordCount from './utils/calculateMemorisedWordCount';
import calculateSeenWordCount from './utils/calculateSeenWordCount';
import increaseMetWords from './utils/increaseMetWords';
import filterByFamiliarity from './utils/lessons/filterByFamiliarity';
import replaceSmartTypographyInPresentedMaterial from './utils/lessons/replaceSmartTypographyInPresentedMaterial';
import sortLesson from './utils/lessons/sortLesson';
import Zipper from './utils/zipper';
import generateCustomLesson from './pages/lessons/custom/generator/utilities/generateCustomLesson';
import customiseLesson from './pages/lessons/utilities/customiseLesson';
import setCustomLessonContent from './pages/lessons/utilities/setCustomLessonContent';
import updateMultipleMetWords from './pages/games/KPOES/updateMultipleMetWords';
import {
  changeShowStrokesInLesson,
  updateRevisionMaterial,
} from './pages/lessons/components/UserSettings/updateLessonSetting';
import AppRoutes from './AppRoutes';
import removeIgnoredCharsFromSplitText from './utils/app/removeIgnoredCharsFromSplitText';
import AppMethodsContext from "./states/legacy/AppMethodsContext";
import { synth, synthesizeSpeech } from "./utils/speechSynthesis";

class App extends Component {
  // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    // When updating default state for anything stored in local storage,
    // add the same default to load/set personal preferences code and test.
    let metWordsFromStorage = loadPersonalPreferences()[0];
    let startingMetWordsToday = loadPersonalPreferences()[0];
    this.appFetchAndSetupGlobalDict = fetchAndSetupGlobalDict.bind(this);

    this.state = {
      currentPhraseAttempts: [],
      currentPhraseID: 0,
      currentLessonStrokes: [],
      customLessonMaterial: ``,
      customLessonMaterialValidationMessages: [],
      customLessonMaterialValidationState: 'unvalidated',
      customLesson: fallbackLesson,
      actualText: ``,
      globalLookupDictionary: new Map(),
      globalLookupDictionaryLoaded: false,
      lessonNotFound: false,
      lessonsProgress: {
      },
      isGlobalLookupDictionaryLoaded: false,
      personalDictionaries: {
        dictionariesNamesAndContents: null,
      },
      previousCompletedPhraseAsTyped: '',
      repetitionsRemaining: 1,
      startTime: null,
      showStrokesInLesson: false,
      targetStrokeCount: 1,
      timer: 0,
      totalNumberOfMatchedWords: 0,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0,
      totalNumberOfNewWordsMet: 0,
      totalNumberOfLowExposuresSeen: 0,
      totalNumberOfRetainedWords: 0,
      totalNumberOfMistypedWords: 0,
      totalNumberOfHintedWords: 0,
      disableUserSettings: false,
      metWords: metWordsFromStorage,
      lesson: fallbackLesson,
      revisionMaterial: [
      ],
      startingMetWordsToday: startingMetWordsToday,
      // @ts-expect-error TS(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
      yourSeenWordCount: calculateSeenWordCount(metWordsFromStorage),
      // @ts-expect-error TS(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
      yourMemorisedWordCount: calculateMemorisedWordCount(metWordsFromStorage),
      focusTriggerInt: 0
    };
  }

  componentDidMount() {
    this.setPersonalPreferences();
  }

  /**
   * calls setupLesson() if when the user settings change - 
   * this should probably be moved inside the Lesson component
   * when and if the lesson state is moved into the Lesson component
   */
  // @ts-expect-error TS(7006) FIXME: Parameter 'prevProps' implicitly has an 'any' type... Remove this comment to see the full error message
  componentDidUpdate(prevProps) {
    const curUserSettings = this.props.userSettings;
    const prevUserSettings = prevProps.userSettings;
    if (
      curUserSettings.sortOrder !== prevUserSettings.sortOrder ||
      curUserSettings.spacePlacement !== prevUserSettings.spacePlacement ||
      curUserSettings.stenoLayout !== prevUserSettings.stenoLayout ||
      curUserSettings.study !== prevUserSettings.study ||
      curUserSettings.limitNumberOfWords !== prevUserSettings.limitNumberOfWords ||
      curUserSettings.repetitions !== prevUserSettings.repetitions ||
      curUserSettings.startFromWord !== prevUserSettings.startFromWord ||
      curUserSettings.upcomingWordsLayout !== prevUserSettings.upcomingWordsLayout ||
      curUserSettings.newWords !== prevUserSettings.newWords ||
      curUserSettings.seenWords !== prevUserSettings.seenWords ||
      curUserSettings.retainedWords !== prevUserSettings.retainedWords ||
      curUserSettings.simpleTypography !== prevUserSettings.simpleTypography
    ) {
      this.setupLesson();
    }
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
  shouldUpdateLessonsProgress(state) {
    return state.lesson.path && !state.lesson.path.endsWith("/lessons/custom");
  }

  /* anything that needs to be done when stopping the lesson, excluding the state update */
  // @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
  applyStopLessonSideEffects(state) {
    this.stopTimer();
    synth?.cancel();
    writePersonalPreferences('metWords', state.metWords);
    if (this.shouldUpdateLessonsProgress(state)) {
      writePersonalPreferences('lessonsProgress', state.lessonsProgress);
    }
  }

  stopLesson() {
    const newState = this.getFutureStateToStopLesson(this.state);
    this.applyStopLessonSideEffects(newState);
    this.setState(newState);
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'prevState' implicitly has an 'any' type... Remove this comment to see the full error message
  getFutureStateToStopLesson(prevState) {
    // @ts-expect-error TS(7006) FIXME: Parameter 'copy' implicitly has an 'any' type.
    const currentLessonStrokes = prevState.currentLessonStrokes.map(copy => ({...copy}));
    for (let i = 0; i < currentLessonStrokes.length; i++) {
      if (currentLessonStrokes[i].accuracy === true) {
        currentLessonStrokes[i].checked = false;
      }
    }

    const newState = {
      ...prevState,
      actualText: '',
      currentLessonStrokes: currentLessonStrokes,
      currentPhraseID: this.state.lesson.presentedMaterial.length,
      previousCompletedPhraseAsTyped: '',
      currentPhraseAttempts: [],
      disableUserSettings: false,
      numberOfMatchedChars: 0,
      // revisionMode: false,
      totalNumberOfMatchedChars: 0,
      yourSeenWordCount: calculateSeenWordCount(prevState.metWords),
      yourMemorisedWordCount: calculateMemorisedWordCount(prevState.metWords)
    };

    if (this.shouldUpdateLessonsProgress(newState)) {
      let lessonsProgress = this.getUpdatedLessonsProgress({lessonPath: prevState.lesson.path,
                                                            lesson: prevState.lesson,
                                                            userSettings: this.props.userSettings,
                                                            prevLessonsProgress: prevState.lessonsProgress,
                                                            metWords: prevState.metWords});
      newState.lessonsProgress = lessonsProgress;
    }

    return newState;
  }

  startTimer() {
    this.intervalID = window.setInterval(this.updateWPM.bind(this), 1000);
  }

  stopTimer() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  updateWPM() {
    this.setState({
      // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
      timer: new Date().getTime() - this.state.startTime
    });
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'newMetWord' implicitly has an 'any' typ... Remove this comment to see the full error message
  updateMetWords(newMetWord) {
    const newMetWordsState = Object.assign({}, this.state.metWords);
    const phraseText =
      this.props.userSettings.spacePlacement === "spaceBeforeOutput"
        ? " " + newMetWord
        : this.props.userSettings.spacePlacement === "spaceAfterOutput"
        ? newMetWord + " "
        : newMetWord;
    const meetingsCount = newMetWordsState[phraseText] || 0;
    newMetWordsState[phraseText] = meetingsCount + 1;
    this.setState({ metWords: newMetWordsState });
    writePersonalPreferences("metWords", newMetWordsState);
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'source' implicitly has an 'any' type.
  setPersonalPreferences(source) {
    let metWordsFromStateOrArg = this.state.metWords;
    let lessonsProgressState = this.state.lessonsProgress;
    if (source && source !== '') {
      try {
        let parsedSource = JSON.parse(source);
        if (parsedSource && typeof parsedSource === "object") {
          metWordsFromStateOrArg = parsedSource;
        }
      }
      catch (error) { }
    }
    else {
      [metWordsFromStateOrArg, lessonsProgressState] = loadPersonalPreferences();
    }

    // @ts-expect-error TS(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
    let calculatedYourSeenWordCount = calculateSeenWordCount(this.state.metWords);
    // @ts-expect-error TS(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
    let calculatedYourMemorisedWordCount = calculateMemorisedWordCount(this.state.metWords);

    // these two writePersonalPreferences calls were in a callback of setState - so 
    // these may need to be moved to useEffect later, for example, when
    // this component is converted to a functional component
    // care should be taken to not over-fire these updates
    writePersonalPreferences('lessonsProgress', lessonsProgressState);
    writePersonalPreferences('metWords', metWordsFromStateOrArg);
    this.setupLesson({
      lessonsProgress: lessonsProgressState,
      metWords: metWordsFromStateOrArg,
      yourSeenWordCount: calculatedYourSeenWordCount,
      yourMemorisedWordCount: calculatedYourMemorisedWordCount,
    });
  }

  // @ts-expect-error TS(7031) FIXME: Binding element 'lessonPath' implicitly has an 'an... Remove this comment to see the full error message
  getUpdatedLessonsProgress({lessonPath, lesson, userSettings, prevLessonsProgress, metWords}) {
    const lessonsProgress = {...prevLessonsProgress};
    // This is actually UNIQUE numberOfWordsSeen.
    // It seems low value to update localStorage data to rename it only for readability.
    // More FIXMEs below
    // FIXME
    let numberOfWordsSeen = 0;

    // See comment above
    // FIXME
    if (lessonsProgress[lessonPath]?.numberOfWordsSeen) {
      numberOfWordsSeen = lessonsProgress[lessonPath].numberOfWordsSeen;
    }

    // @ts-expect-error TS(7006) FIXME: Parameter 'copy' implicitly has an 'any' type.
    let material = lesson?.sourceMaterial ? lesson.sourceMaterial.map(copy => ({...copy})) : [{phrase: "the", stroke: "-T"}];
    if (userSettings.simpleTypography) {
      material = replaceSmartTypographyInPresentedMaterial.call(this, material, userSettings);
    }

    let len = material.length;
    let seenAccumulator = 0;
    let memorisedAccumulator = 0;

    let normalisedMetWords = {};
    Object.keys(metWords).forEach(function(key) {
      // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (normalisedMetWords[key.trim()]) {
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        normalisedMetWords[key.trim()] = metWords[key] + normalisedMetWords[key.trim()];
      }
      else {
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        normalisedMetWords[key.trim()] = metWords[key];
      }
    });

    // NOTE: this calculation is more forgiving than lesson material filter by
    // familiarity so when space before output is set and {"roused": 1} appears
    // in metWords, " roused" will show in the lesson as a "new word" but
    // already be counted as seen on the progress page.
    let alreadyChecked = [];
    let wordsLeftToDiscover = [];
    for (let i = 0; i < len; ++i) {
      let sourceMaterialPhrase = material[i].phrase;
      sourceMaterialPhrase = sourceMaterialPhrase.trim();

      // have you seen this word?
      // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (normalisedMetWords[sourceMaterialPhrase] && normalisedMetWords[sourceMaterialPhrase] > 0) {

        // console.log(sourceMaterialPhrase);
        // have you seen this word and seen it in this lesson already?
        if (!(alreadyChecked.indexOf(sourceMaterialPhrase) > -1)) {
          alreadyChecked.push(sourceMaterialPhrase);
          // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (normalisedMetWords[sourceMaterialPhrase] < 30) {
            seenAccumulator = seenAccumulator + 1;
            // console.log("Seen: " + sourceMaterialPhrase);
          }
          // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (normalisedMetWords[sourceMaterialPhrase] > 29) {
            memorisedAccumulator = memorisedAccumulator + 1;
            // console.log("Memorised: " + sourceMaterialPhrase);
          }
        }
      }
      else {
        wordsLeftToDiscover.push(sourceMaterialPhrase);
      }
    }

    let uniqueLowerCasedWordsLeftToDiscover = [...new Set(wordsLeftToDiscover)];

    let numberOfWordsToDiscover = 0;
    if (uniqueLowerCasedWordsLeftToDiscover && uniqueLowerCasedWordsLeftToDiscover.length > 0) {
      numberOfWordsToDiscover = uniqueLowerCasedWordsLeftToDiscover.length;
    }

    // See comment above
    // FIXME
    numberOfWordsSeen = seenAccumulator;
    lessonsProgress[lessonPath] = {
      numberOfWordsMemorised: memorisedAccumulator,
      numberOfWordsSeen: numberOfWordsSeen,
      numberOfWordsToDiscover: numberOfWordsToDiscover
    }
    return lessonsProgress;
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'providedMetWords' implicitly has an 'an... Remove this comment to see the full error message
  updateStartingMetWordsAndCounts(providedMetWords) {
    this.setState({
      startingMetWordsToday: providedMetWords,
      yourSeenWordCount: calculateSeenWordCount(providedMetWords),
      yourMemorisedWordCount: calculateMemorisedWordCount(providedMetWords)
    });
  }

  // set user settings
  // @ts-expect-error TS(7006) FIXME: Parameter 'metWordsFromStorage' implicitly has an ... Remove this comment to see the full error message
  setUpProgressRevisionLesson(metWordsFromStorage, newSeenOrMemorised) {
    let lesson = {};
    // let stenoLayout = "stenoLayoutAmericanSteno";
    // if (this.props.userSettings) { stenoLayout = this.props.userSettings.stenoLayout; }

    this.appFetchAndSetupGlobalDict(null).then(() => {
      // grab metWords, trim spaces, and sort by times seen
      let myWords = createWordListFromMetWords(metWordsFromStorage).join("\n");
      // parseWordList appears to remove empty lines and other garbage, we might not need it here
      let result = parseWordList(myWords);
        // perhaps we can replace these with result = createWordListFromMetWords?
        // let myWords = createWordListFromMetWords(metWords).join("\n");
        // let result = parseWordList(myWords);
      if (result && result.length > 0) {
        // look up strokes for each word
        let lessonWordsAndStrokes = generateListOfWordsAndStrokes(result, this.state.globalLookupDictionary);
        if (lessonWordsAndStrokes && lessonWordsAndStrokes.length > 0) {
          // @ts-expect-error TS(2339) FIXME: Property 'sourceMaterial' does not exist on type '... Remove this comment to see the full error message
          lesson.sourceMaterial = lessonWordsAndStrokes;
          // @ts-expect-error TS(2339) FIXME: Property 'presentedMaterial' does not exist on typ... Remove this comment to see the full error message
          lesson.presentedMaterial = lessonWordsAndStrokes;
          // @ts-expect-error TS(2339) FIXME: Property 'newPresentedMaterial' does not exist on ... Remove this comment to see the full error message
          lesson.newPresentedMaterial = new Zipper(lessonWordsAndStrokes);
          // @ts-expect-error TS(2339) FIXME: Property 'settings' does not exist on type '{}'.
          lesson.settings = {
            ignoredChars: '',
            customMessage: ''
          };
          // @ts-expect-error TS(2339) FIXME: Property 'path' does not exist on type '{}'.
          lesson.path = process.env.PUBLIC_URL + '/lessons/progress/seen/'
          // @ts-expect-error TS(2339) FIXME: Property 'title' does not exist on type '{}'.
          lesson.title = 'Your revision words'
          // @ts-expect-error TS(2339) FIXME: Property 'path' does not exist on type '{}'.
          if (newSeenOrMemorised[2]) { lesson.path = process.env.PUBLIC_URL + '/lessons/progress/memorised/'; }
          // @ts-expect-error TS(2339) FIXME: Property 'title' does not exist on type '{}'.
          if (newSeenOrMemorised[2]) { lesson.title = 'Your memorised words'; }
          // @ts-expect-error TS(2339) FIXME: Property 'title' does not exist on type '{}'.
          if (newSeenOrMemorised[1] && newSeenOrMemorised[2]) { lesson.title = 'Your words'; }
          // @ts-expect-error TS(2339) FIXME: Property 'path' does not exist on type '{}'.
          if (newSeenOrMemorised[1] && newSeenOrMemorised[2]) { lesson.path = process.env.PUBLIC_URL + '/lessons/progress/'; }
          // @ts-expect-error TS(2339) FIXME: Property 'subtitle' does not exist on type '{}'.
          lesson.subtitle = ''
        }
      }
      else {
        lesson = fallbackLesson
      }
      this.setupLesson({
        currentPhraseID: 0,
        lesson: lesson,
        focusTriggerInt: this.state.focusTriggerInt + 1
      });
    })
    .catch(error => {
      console.error(error);
      // this.showDictionaryErrorNotification();
    });
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'lessonProps' implicitly has an 'any' ty... Remove this comment to see the full error message
  setupLesson(lessonProps) {
    const newState = {...this.state, ...lessonProps};
    const revisionMode = lessonProps?.revisionMode ?? this.props.revisionMode;
    const revisionMaterial = newState.revisionMaterial;
    const userSettings = this.props.userSettings;
    const lessonPath = newState.lesson.path;
    let newLesson = Object.assign({}, newState.lesson);
    const prevLessonsProgress = newState.lessonsProgress;

    const limitNumberOfWords = userSettings.limitNumberOfWords;
    const startFromWord = userSettings.startFromWord;
    const simpleTypography = userSettings.simpleTypography;
    const reps = userSettings.repetitions;

    // If there's no lesson data, use fallback lesson:
    if ((typeof newLesson === 'object' && Object.entries(newLesson).length === 0 && newLesson.constructor === Object) || newLesson === null ) {
      newLesson = fallbackLesson;
    }

    // Copy source or revision material to presented material:
    if (revisionMode) {
      // @ts-expect-error TS(7006) FIXME: Parameter 'line' implicitly has an 'any' type.
      newLesson.presentedMaterial = revisionMaterial.map(line => ({...line}));
    }
    else {
      // @ts-expect-error TS(7006) FIXME: Parameter 'line' implicitly has an 'any' type.
      newLesson.presentedMaterial = newLesson.sourceMaterial.map(line => ({...line}));
    }

    // Stop existing lesson timer:
    this.stopTimer();

    // Replace smart typography in presented material:
    if (simpleTypography) {
      newLesson.presentedMaterial = replaceSmartTypographyInPresentedMaterial.call(this, newLesson.presentedMaterial, userSettings);
    }

    // Filter lesson by familiarity:
    newLesson.presentedMaterial = filterByFamiliarity.call(this, newLesson.presentedMaterial, newState.metWords, userSettings, revisionMode);

    // Sort lesson:
    newLesson.presentedMaterial = sortLesson.call(this, newLesson.presentedMaterial, newState.metWords, userSettings);

    // Apply range (start from & limit) to lesson:
    if (revisionMode && limitNumberOfWords > 0) {
      newLesson.presentedMaterial = newLesson.presentedMaterial.slice(0, limitNumberOfWords);
    }
    else if (revisionMode) {
      // Don't do anything to limit material if it's a revision lesson without limitNumberOfWords set
      // newLesson.presentedMaterial = newLesson.presentedMaterial.slice(0);
    }
    else if (startFromWord > 0 && limitNumberOfWords > 0) {
      let startFrom = startFromWord - 1;
      newLesson.presentedMaterial = newLesson.presentedMaterial.slice(startFrom, startFrom + limitNumberOfWords);
    }
    else if (startFromWord > 0) {
      let startFrom = startFromWord - 1;
      newLesson.presentedMaterial = newLesson.presentedMaterial.slice(startFrom);
    }
    else if (limitNumberOfWords > 0) {
      newLesson.presentedMaterial = newLesson.presentedMaterial.slice(0, limitNumberOfWords);
    }

    // Repeat words in lesson:
    let repeatedLesson = newLesson.presentedMaterial;
    if (reps > 0) {
      for (let i = 1; i < reps && i < 30; i++) {
        repeatedLesson = repeatedLesson.concat(newLesson.presentedMaterial);
      }
    }
    newLesson.presentedMaterial = repeatedLesson;

    // Zipper the lesson:
    newLesson.newPresentedMaterial = new Zipper(repeatedLesson);

    // Get target stroke count:
    const target = getTargetStrokeCount(newLesson.presentedMaterial[0] || { phrase: '', stroke: 'TK-LS' });

    // Update lesson progress:
    if (lessonPath && !lessonPath.endsWith("/lessons/custom") && !lessonPath.endsWith("/lessons/custom/setup")) {
      const lessonsProgress = this.getUpdatedLessonsProgress({lessonPath,
                                                              lesson: newLesson,
                                                              userSettings,
                                                              prevLessonsProgress,
                                                              metWords: newState.metWords
                                                            });
      newState.lessonsProgress = lessonsProgress;
      writePersonalPreferences('lessonsProgress', lessonsProgress);
    }

    // Reset lesson state for starting lesson:
    newState.actualText = ``;
    newState.currentPhraseAttempts = [];
    newState.currentLessonStrokes = [];
    newState.disableUserSettings = false;
    newState.numberOfMatchedChars = 0;
    newState.previousCompletedPhraseAsTyped = '';
    newState.repetitionsRemaining = reps;
    newState.startTime = null;
    newState.showStrokesInLesson = false;
    newState.timer = 0;
    newState.targetStrokeCount = target;
    newState.totalNumberOfMatchedChars = 0;
    newState.totalNumberOfMatchedWords = 0;
    newState.totalNumberOfNewWordsMet = 0;
    newState.totalNumberOfLowExposuresSeen = 0;
    newState.totalNumberOfRetainedWords = 0;
    newState.totalNumberOfMistypedWords = 0;
    newState.totalNumberOfHintedWords = 0;
    newState.lesson = newLesson;
    newState.currentPhraseID = 0;
    this.setState(newState);
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'path' implicitly has an 'any' type.
  handleLesson(path) {
    getLesson(path).then((lessonText) => {
      if (isLessonTextValid(lessonText)) {
        this.setState({lessonNotFound: false});
        let lesson = parseLesson(lessonText, path);
        if (
          this.props.globalUserSettings.experiments && !!this.props.globalUserSettings.experiments.stenohintsonthefly &&
          !path.includes("phrasing") &&
          !path.includes("prefixes") &&
          !path.includes("suffixes") &&
          !path.includes("steno-party-tricks") &&
          !path.includes("collections/tech")
        ) {

          this.appFetchAndSetupGlobalDict(null).then(() => {
            let lessonWordsAndStrokes = generateListOfWordsAndStrokes(lesson['sourceMaterial'].map(i => i.phrase), this.state.globalLookupDictionary);
              lesson.sourceMaterial = lessonWordsAndStrokes;
              lesson.presentedMaterial = lessonWordsAndStrokes;
              lesson.newPresentedMaterial = new Zipper(lessonWordsAndStrokes);

            this.setupLesson({
              lesson: lesson,
              currentPhraseID: 0,
              focusTriggerInt: this.state.focusTriggerInt + 1
            });
          });
        }
        else if (this.props.userSettings.showStrokesAsList) {
          const shouldUsePersonalDictionaries = this.state.personalDictionaries
            && Object.entries(this.state.personalDictionaries).length > 0
            && !!this.state.personalDictionaries.dictionariesNamesAndContents;

          this.appFetchAndSetupGlobalDict(
            // @ts-expect-error TS(2345) FIXME: Argument of type '{ dictionariesNamesAndContents: ... Remove this comment to see the full error message
            shouldUsePersonalDictionaries ? this.state.personalDictionaries : null
          )
            .then(() => {
              this.setupLesson({
                lesson: lesson,
                currentPhraseID: 0,
                focusTriggerInt: this.state.focusTriggerInt + 1
              });
            }).catch((error) =>
              console.error("failed to fetch and setup global dictionary", error)
            );
        }
        else {
          this.setupLesson({
            lesson: lesson,
            currentPhraseID: 0,
            focusTriggerInt: this.state.focusTriggerInt + 1
          });
        }
      } else {
        this.setState({lessonNotFound: true});
      }
    }).catch((e) => {
      console.log('Unable to load lesson', e)
    });
  }

  startCustomLesson() {
    let lesson = Object.assign({}, this.state.customLesson);
    lesson.title = 'Custom'
    this.setupLesson({
      currentPhraseID: 0,
      lesson: lesson
    });
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  createCustomLesson(event) {
    if (event && event.target) {
      let providedText = event.target.value || '';
      let [lesson, validationState, validationMessages] = parseCustomMaterial(providedText);
      let customLesson = Object.assign({}, this.state.customLesson);
      // @ts-expect-error TS(2339) FIXME: Property 'length' does not exist on type 'string |... Remove this comment to see the full error message
      if (validationMessages && validationMessages.length < 1) { customLesson = lesson; }
      this.setupLesson({
        lesson,
        currentPhraseID: 0,
        customLesson,
        customLessonMaterial: providedText,
        customLessonMaterialValidationState: validationState,
        customLessonMaterialValidationMessages: validationMessages
      });
    }
    else { // for navigating straight to custom lesson page without setup
    // TODO: is this the place where I should set a default empty custom lesson?
      let lesson = Object.assign({}, this.state.customLesson);
      lesson.title = 'Custom'
      this.setupLesson({
        customLesson: lesson,
        lesson,
        currentPhraseID: 0
      });
    }
    return event;
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  reviseLesson(event, newRevisionMaterial) {
    event.preventDefault();
    this.stopLesson();
    this.setupLesson({
      revisionMaterial: newRevisionMaterial,
      focusTriggerInt: this.state.focusTriggerInt + 1,
      revisionMode: true,
    });
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  restartLesson(event) {
    event.preventDefault();
    this.stopLesson();
    this.setupLesson({
      focusTriggerInt: this.state.focusTriggerInt + 1,
      revisionMode: false
    });
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'personalDictionaries' implicitly has an... Remove this comment to see the full error message
  updatePersonalDictionaries(personalDictionaries) {
    this.setState({personalDictionaries: personalDictionaries});
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'combinedLookupDictionary' implicitly ha... Remove this comment to see the full error message
  updateGlobalLookupDictionary(combinedLookupDictionary) {
    this.setState({globalLookupDictionary: combinedLookupDictionary});
  }


  markupBuffer = [];
  updateBufferTimer = null;

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  updateMarkup(event) {
    let actualText = event.target.value;
    // TODO: once we're happy that this will be the permanent new default behaviour, remove all the `batchUpdate`-specific branching code and tests:
    // const batchUpdate = document.cookie.indexOf("batchUpdate=1")>=0;
    const batchUpdate = true;
    if(!batchUpdate) {
      this.processBuffer(actualText);
      return;
    }
    // Immediately update the text in the input field
    this.setState({ actualText });
    this.markupBuffer.push({text: actualText, time: Date.now()});

    if (this.updateBufferTimer) {
      clearTimeout(this.updateBufferTimer);
    }
    // @ts-expect-error TS(2322) FIXME: Type 'Timeout' is not assignable to type 'null'.
    this.updateBufferTimer = setTimeout(() => {
      const buffer = this.markupBuffer;
      this.markupBuffer = [];
      this.processBuffer(null, buffer);
    }, this.bufferIntervalMillis());
  }

  bufferIntervalMillis() {
    return 16; // 60 fps
  }

  /*
   * Given the buffer of inputs, determines the new state, collects the side effects,
   * then applies the side effects and updates the state.
   *
   * @actualText param is not used - probably should be removed
   */
  // @ts-expect-error TS(7006) FIXME: Parameter 'actualText' implicitly has an 'any' typ... Remove this comment to see the full error message
  processBuffer(actualText, buffer) {
    const stateCopy = {...this.state};
    const [newState, sideEffects] = this.getNewStateAndSideEffectsForBuffer(actualText,
                                                                            buffer,
                                                                            stateCopy,
                                                                            []);
    // @ts-expect-error TS(7006) FIXME: Parameter 'effect' implicitly has an 'any' type.
    sideEffects.forEach(effect => effect());
    this.setState(newState);
  }

  /*
   * Takes the buffer of inputs and returns the new state and the side effects
   * corresponding to the strokes in the buffer.
   * The side effects are actions, such as starting/stopping the timer,
   * uttering the phrases, etc.
   * This function may be executed recursively, until all the strokes in the buffer
   * are processed.
   */
  // @ts-expect-error TS(7023) FIXME: 'getNewStateAndSideEffectsForBuffer' implicitly ha... Remove this comment to see the full error message
  getNewStateAndSideEffectsForBuffer(actualText, buffer, state, sideEffects) {
    let time = Date.now();
    if (buffer) {
      const latest = buffer[buffer.length - 1];
      actualText = latest.text;
      time = latest.time;
    }

    // Start timer on first key stroke
    if (state.startTime === null) {
      state.startTime = new Date();
      state.timer = 0;
      state.disableUserSettings = true;
      sideEffects.push(() => this.startTimer());
    }

    // This informs word count, WPM, moving onto next phrase, ending lesson
    // eslint-disable-next-line
    let [matchedChars, unmatchedChars, matchedActual, unmatchedActual] =
      matchSplitText(state.lesson.presentedMaterial[state.currentPhraseID].phrase,
                     actualText,
                     state.lesson.settings,
                     this.props.userSettings);

    if (state.lesson.settings.ignoredChars) {
      matchedChars = removeIgnoredCharsFromSplitText(matchedChars, state.lesson.settings.ignoredChars);
      unmatchedChars = removeIgnoredCharsFromSplitText(unmatchedChars, state.lesson.settings.ignoredChars);
    }

    const [numberOfMatchedChars, numberOfUnmatchedChars] = [matchedChars, unmatchedChars].map(text => text.length);

    // @ts-ignore this should be ok when currentPhraseAttempts is typed correctly instead of never[]
    // @ts-expect-error TS(7006) FIXME: Parameter 'copy' implicitly has an 'any' type.
    const currentPhraseAttempts = state.currentPhraseAttempts.map(copy => ({...copy}));

    if (buffer) {
      // Assuming a single buffer contains inputs from one stroke, peaks are always at the end of buffer. (i.e. steno can either keep typing or backspace first and then keep typing) Since currentPhraseAttempts is only used to calculate attempts and its logic is to use peaks or the last strokes, it's safe to push elements that lacks `numberOfMatchedWordsSoFar` and `hintWasShown` into `currentPhraseAttempts`.
      currentPhraseAttempts.push(...buffer.slice(0, -1));
    }
    currentPhraseAttempts.push({
      text: actualText,
      time: time,
      numberOfMatchedWordsSoFar: (state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
      hintWasShown: shouldShowStroke(state.showStrokesInLesson,
                                     this.props.userSettings.showStrokes,
                                     state.repetitionsRemaining,
                                     this.props.userSettings.hideStrokesOnLastRepetition)
    });

    state = {
      ...state,
      currentPhraseAttempts: currentPhraseAttempts,
      numberOfMatchedChars: numberOfMatchedChars,
      totalNumberOfMatchedWords: (state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
      actualText: actualText,
    };
    // NOTE: here is where attempts are defined before being pushed with completed phrases
    const phraseMisstrokes = strokeAccuracy(
      buffer ? currentPhraseAttempts : state.currentPhraseAttempts,
      buffer ? getTargetObservableStrokeCount(state.lesson.presentedMaterial[state.currentPhraseID]) : state.targetStrokeCount,
      unmatchedActual,
      !!buffer
    );
    const accurateStroke = phraseMisstrokes.strokeAccuracy; // false
    const attempts = phraseMisstrokes.attempts; // [" sign", " ss"]

    if (!accurateStroke && !state.showStrokesInLesson && this.props.userSettings.showStrokesOnMisstroke) {
      state.showStrokesInLesson = true;
    }

    let proceedToNextWord;
    if (buffer) {
      // e.g. unmatchedActual is "es" if "Frenches" is typed for "French"
      // In case of spaceAfterOutput, unmatchedChars is not empty and don't care here.
      // In case of spaceExact, proceed without checking next actual chars.
      const excessLookFine = this.props.userSettings.spacePlacement === "spaceAfterOutput" || this.props.userSettings.spacePlacement === "spaceExact" || unmatchedActual.length === 0 || unmatchedActual[0] === " ";
      proceedToNextWord = numberOfUnmatchedChars === 0 && excessLookFine;
    } else {
      proceedToNextWord = numberOfUnmatchedChars === 0;
    }
    if (proceedToNextWord) {
      state.currentPhraseAttempts = []; // reset for next word

      const strokeHintShown = shouldShowStroke(state.showStrokesInLesson,
                                               this.props.userSettings.showStrokes,
                                               state.repetitionsRemaining,
                                               this.props.userSettings.hideStrokesOnLastRepetition);

      // NOTE: here is where completed phrases are pushed
      state.currentLessonStrokes.push({
        numberOfMatchedWordsSoFar: (state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
        word: state.lesson.presentedMaterial[state.currentPhraseID].phrase,
        typedText: actualText,
        attempts: attempts,
        hintWasShown: strokeHintShown,
        stroke: state.lesson.presentedMaterial[state.currentPhraseID].stroke,
        checked: true,
        accuracy: accurateStroke,
        time: time
      });
      // can these newState assignments be moved down below the scores assignments?

      if (strokeHintShown) { state.totalNumberOfHintedWords = state.totalNumberOfHintedWords + 1; }

      if (!accurateStroke) { state.totalNumberOfMistypedWords = state.totalNumberOfMistypedWords + 1; }

      if (!strokeHintShown && accurateStroke) {
        // Use the original text when recording to preserve case and spacing
        const phraseText = this.props.userSettings.spacePlacement === 'spaceBeforeOutput'
          ? ' ' + state.lesson.presentedMaterial[state.currentPhraseID].phrase
          : this.props.userSettings.spacePlacement === 'spaceAfterOutput'
          ? state.lesson.presentedMaterial[state.currentPhraseID].phrase + ' '
          : state.lesson.presentedMaterial[state.currentPhraseID].phrase;

        const meetingsCount = state.metWords[phraseText] || 0;
        Object.assign(state, increaseMetWords(meetingsCount,
                                              state.totalNumberOfNewWordsMet,
                                              state.totalNumberOfLowExposuresSeen,
                                              state.totalNumberOfRetainedWords));
        state.metWords[phraseText] = meetingsCount + 1;
      }

      if (this.props.userSettings.speakMaterial) {
        const remaining = state.lesson.newPresentedMaterial.getRemaining();
        if (remaining && remaining.length > 0 && remaining[0].hasOwnProperty('phrase')) {
          const phrase = remaining[0].phrase;
          sideEffects.push(() => this.say(phrase));
        }
      }

      const nextPhraseID = state.currentPhraseID + 1;
      let nextItem = state.lesson.presentedMaterial[nextPhraseID];

      if (!!nextItem && state.lesson?.presentedMaterial?.[state.currentPhraseID]?.phrase) {
        const lastWord = state.lesson.presentedMaterial[state.currentPhraseID].phrase;
        nextItem = updateCapitalisationStrokesInNextItem(nextItem, lastWord);
      }

      state.targetStrokeCount = getTargetStrokeCount(nextItem || { phrase: '', stroke: 'TK-LS' });
      state.lesson.newPresentedMaterial.visitNext();

      state.repetitionsRemaining = repetitionsRemaining(this.props.userSettings,
                                                        state.lesson.presentedMaterial,
                                                        state.currentPhraseID + 1);
      state.totalNumberOfMatchedChars = state.totalNumberOfMatchedChars + numberOfMatchedChars;
      state.previousCompletedPhraseAsTyped = actualText;
      state.actualText = buffer ? unmatchedActual : '';
      state.showStrokesInLesson = false;
      state.currentPhraseID = nextPhraseID;

      state.yourSeenWordCount = calculateSeenWordCount(state.metWords);
      state.yourMemorisedWordCount = calculateMemorisedWordCount(state.metWords);
    }

    if (this.isFinished(state)) {
      const newState = this.getFutureStateToStopLesson(state);
      sideEffects.push(() => this.applyStopLessonSideEffects({...newState}));
      return [newState, sideEffects];
    } else if (buffer && proceedToNextWord && unmatchedActual.length > 0) {
      // Repetitively apply buffer with already accepted phrases excluded
      const newBuffer = buffer
        // @ts-expect-error TS(7006) FIXME: Parameter 'stroke' implicitly has an 'any' type.
        .filter(stroke => stroke.text.length > matchedActual.length && stroke.text.startsWith(matchedActual))
        // @ts-expect-error TS(7006) FIXME: Parameter 'stroke' implicitly has an 'any' type.
        .map(stroke => ({ text: stroke.text.slice(matchedActual.length), time: stroke.time }));
      return this.getNewStateAndSideEffectsForBuffer(null, newBuffer, state, sideEffects);
    }
    return [state, sideEffects];
  }

  say(utteranceText: string) {
    synthesizeSpeech(utteranceText, {
      voiceURI: this.props.userSettings.voiceURI,
      voiceName: this.props.userSettings.voiceName,
      stenoLayout: this.props.userSettings?.stenoLayout,
      timeElapsedMillis: this.state.timer,
      totalNumberOfMatchedWords: this.state.totalNumberOfMatchedWords,
    });
  }

  sayCurrentPhraseAgain() {
    if (this.props.userSettings.speakMaterial) {
      let currentPhrase = this.state.lesson.presentedMaterial[this.state.currentPhraseID];
      if (currentPhrase && currentPhrase.hasOwnProperty('phrase')) {
        this.say(currentPhrase.phrase);
      }
    }
  }

  // @ts-expect-error TS(7006) FIXME: Parameter 'currentState' implicitly has an 'any' t... Remove this comment to see the full error message
  isFinished(currentState) {
    const presentedMaterialLength = currentState.lesson?.presentedMaterial?.length || 0;
    return currentState.currentPhraseID === presentedMaterialLength;
  }

  presentCompletedMaterial() {
    // @ts-expect-error TS(2532) FIXME: Object is possibly 'undefined'.
    return this.state.lesson.newPresentedMaterial ? this.state.lesson.newPresentedMaterial.getCompleted().map(item => item.phrase) : [];
  }

  presentUpcomingMaterial() {
    return this.state.lesson.newPresentedMaterial ? this.state.lesson.newPresentedMaterial.getRemaining().slice().map(item => item.phrase) : [];
  }

  render() {
    let completedMaterial = this.presentCompletedMaterial();
    let upcomingMaterial = this.presentUpcomingMaterial();

    let stateLesson = this.state.lesson;
    if ((Object.keys(stateLesson).length === 0 && stateLesson.constructor === Object) || !stateLesson) {
      stateLesson = {
        sourceMaterial: [ {phrase: 'The', stroke: '-T'} ],
        presentedMaterial: [ {phrase: 'The', stroke: '-T'}, ],
        settings: { ignoredChars: '' },
        title: 'Steno', subtitle: '',
        newPresentedMaterial: new Zipper([{phrase: '', stroke: ''}]),
        path: ''
      };
    }

    let presentedMaterialCurrentItem = (stateLesson.presentedMaterial && stateLesson.presentedMaterial[this.state.currentPhraseID]) ? stateLesson.presentedMaterial[this.state.currentPhraseID] : { phrase: '', stroke: '' };
    return (
      <div id="js-app" className="app">
        <div className="flex flex-column justify-between min-vh-100">
          <AppMethodsContext.Provider value={
            {
              appFetchAndSetupGlobalDict: this.appFetchAndSetupGlobalDict,
              setCustomLessonContent: setCustomLessonContent.bind(this),
              customiseLesson: customiseLesson.bind(this),
              generateCustomLesson: generateCustomLesson.bind(this),
              updateMultipleMetWords: updateMultipleMetWords.bind(this),
              changeShowStrokesInLesson: changeShowStrokesInLesson.bind(this),
              createCustomLesson: this.createCustomLesson.bind(this),
              handleLesson: this.handleLesson.bind(this),
              restartLesson: this.restartLesson.bind(this),
              reviseLesson: this.reviseLesson.bind(this),
              sayCurrentPhraseAgain: this.sayCurrentPhraseAgain.bind(this),
              setPersonalPreferences: this.setPersonalPreferences.bind(this),
              setUpProgressRevisionLesson: this.setUpProgressRevisionLesson.bind(this),
              setupLesson: this.setupLesson.bind(this),
              startCustomLesson: this.startCustomLesson.bind(this),
              stopLesson: this.stopLesson.bind(this),
              updateGlobalLookupDictionary: this.updateGlobalLookupDictionary.bind(this),
              updateMarkup: this.updateMarkup.bind(this),
              updateMetWords: this.updateMetWords.bind(this),
              updatePersonalDictionaries: this.updatePersonalDictionaries.bind(this),
              updateRevisionMaterial: updateRevisionMaterial.bind(this),
              updateStartingMetWordsAndCounts: this.updateStartingMetWordsAndCounts.bind(this),
            }
          }>
            <AppRoutes
              appProps={{
                location: this.props.location,
                completedMaterial,
                presentedMaterialCurrentItem,
                stateLesson,
                upcomingMaterial
              }}
              // @ts-expect-error TS(2322) FIXME: Type '{ currentPhraseAttempts: never[]; currentPhr... Remove this comment to see the full error message
              appState={this.state}
            />
          </AppMethodsContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;
