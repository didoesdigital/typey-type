import React, { Component } from 'react';
import { isLessonTextValid } from 'utils/utils';
import {
  writePersonalPreferences
} from './utils/typey-type';
import { parseCustomMaterial } from './utils/parseCustomMaterial';
import { parseLesson } from './utils/parseLesson';
import { updateCapitalisationStrokesInNextItem } from './utils/updateCapitalisationStrokesInNextItem';
import { repetitionsRemaining } from './utils/repetitionsRemaining';
import { shouldShowStroke } from './utils/shouldShowStroke';
import { getTargetObservableStrokeCount } from './utils/getTargetObservableStrokeCount';
import { getTargetStrokeCount } from './utils/getTargetStrokeCount';
import { parseWordList } from './utils/parseWordList';
import { matchSplitText } from "./utils/matchSplitText";
import { createWordListFromMetWords } from "./utils/createWordListFromMetWords";
import { strokeAccuracy } from './utils/strokeAccuracy';
import { loadPersonalPreferences } from 'utils/storage';
import fetchLesson from './utils/fetchLesson';
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
import AppRoutes, { type AppProps } from './AppRoutes';
import removeIgnoredCharsFromSplitText from './utils/app/removeIgnoredCharsFromSplitText';
import AppMethodsContext from "./states/legacy/AppMethodsContext";
import { synth, synthesizeSpeech } from "./utils/speechSynthesis";

import type {
  DictionaryConfig,
  GlobalUserSettings,
  ImportedPersonalDictionaries,
  Lesson,
  LessonPathWithBasenameAndFilename,
  LookupDictWithNamespacedDicts,
  LookupDictWithNamespacedDictsAndConfig,
  MetWords,
  RevisionMaterial,
  RevisionMode,
  SpacedTypedWord,
  UserSettings,
} from 'types';

import type {
  AppState,
  GetNewStateAndSideEffectsForBufferReturn,
  OverrunBuffer,
  SideEffectsForBuffer
} from 'App.types';

import type { LessonProps } from 'pages/lessons/types';
import type { LessonsRoutingProps } from 'pages/lessons/Lessons';

type Props = AppProps & {
  userSettings: UserSettings;
  revisionMode: RevisionMode;
  globalUserSettings: GlobalUserSettings;
};

class App extends Component<Props, AppState> {
  private charsPerWord: number;
  private appFetchAndSetupGlobalDict: typeof fetchAndSetupGlobalDict;
  private intervalID: number | null;

  constructor(props: Props) {
    super(props);
    this.charsPerWord = 5;
    this.intervalID = null;
    // When updating default state for anything stored in local storage,
    // add the same default to load/set personal preferences code and test.
    let metWordsFromStorage = loadPersonalPreferences()[0];
    let startingMetWordsToday = loadPersonalPreferences()[0];
    this.appFetchAndSetupGlobalDict = fetchAndSetupGlobalDict.bind(this);
    
    const emptyGlobalLookupDict: LookupDictWithNamespacedDicts = new Map();
    let config: DictionaryConfig = {
      configuration: [],
    };
    emptyGlobalLookupDict.configuration = config.configuration;

    let initGlobalLookupDictionary: LookupDictWithNamespacedDictsAndConfig =
      emptyGlobalLookupDict as LookupDictWithNamespacedDictsAndConfig;

    this.state = {
      currentPhraseAttempts: [],
      currentPhraseID: 0,
      currentLessonStrokes: [],
      customLessonMaterial: ``,
      customLessonMaterialValidationMessages: [],
      customLessonMaterialValidationState: 'unvalidated',
      customLesson: fallbackLesson,
      actualText: ``,
      globalLookupDictionary: initGlobalLookupDictionary,
      globalLookupDictionaryLoaded: false,
      lessonNotFound: false,
      lessonsProgress: {
      },
      isGlobalLookupDictionaryLoaded: false,
      // NOTE: personalDictionaries should be undefined at initialization
      // because the student has not yet imported any dictionaries in this
      // session. If we want to use dictionaries from previous sessions from
      // local storage, they'll be used directly in globalLookupDictionary and
      // not here on personalDictionaries.
      // personalDictionaries: { dictionariesNamesAndContents: [] },
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
      yourSeenWordCount: calculateSeenWordCount(metWordsFromStorage),
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
  componentDidUpdate(prevProps: Props) {
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

  shouldUpdateLessonsProgress(lesson: Lesson) {
    return lesson.path && !lesson.path.endsWith("/lessons/custom");
  }

  /* anything that needs to be done when stopping the lesson, excluding the state update */
  // @ts-expect-error TS(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
  applyStopLessonSideEffects(state) {
    this.stopTimer();
    synth?.cancel();
    writePersonalPreferences('metWords', state.metWords);
    if (this.shouldUpdateLessonsProgress(state.lesson)) {
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

    if (this.shouldUpdateLessonsProgress(newState.lesson)) {
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
      timer: new Date().getTime() - (this.state.startTime ?? 0)
    });
  }

  updateMetWords(newMetWord: SpacedTypedWord) {
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

  /**
   *
   * @param source - MetWords as stringified JSON
   */
  setPersonalPreferences(source?: string) {
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

    let calculatedYourSeenWordCount = calculateSeenWordCount(this.state.metWords);
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

  updateStartingMetWordsAndCounts(providedMetWords: MetWords) {
    this.setState({
      startingMetWordsToday: providedMetWords,
      yourSeenWordCount: calculateSeenWordCount(providedMetWords),
      yourMemorisedWordCount: calculateMemorisedWordCount(providedMetWords)
    });
  }

  // set user settings
  setUpProgressRevisionLesson(
    metWordsFromStorage: MetWords,
    newSeenOrMemorised: readonly [boolean, boolean, boolean]
  ) {
    let lesson = fallbackLesson;
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
          lesson.sourceMaterial = lessonWordsAndStrokes;
          lesson.presentedMaterial = lessonWordsAndStrokes;
          lesson.newPresentedMaterial = new Zipper(lessonWordsAndStrokes);
          lesson.settings = {
            ignoredChars: '',
            customMessage: ''
          };
          lesson.path = process.env.PUBLIC_URL + '/lessons/progress/seen/'
          lesson.title = 'Your revision words'
          if (newSeenOrMemorised[2]) { lesson.path = process.env.PUBLIC_URL + '/lessons/progress/memorised/'; }
          if (newSeenOrMemorised[2]) { lesson.title = 'Your memorised words'; }
          if (newSeenOrMemorised[1] && newSeenOrMemorised[2]) { lesson.title = 'Your words'; }
          if (newSeenOrMemorised[1] && newSeenOrMemorised[2]) { lesson.path = process.env.PUBLIC_URL + '/lessons/progress/'; }
          lesson.subtitle = ''
        }
      }

      this.setupLesson({
        currentPhraseID: 0,
        lesson,
        focusTriggerInt: this.state.focusTriggerInt + 1
      });
    })
    .catch(error => {
      console.error(error);
      // this.showDictionaryErrorNotification();
    });
  }

  setupLesson(
    lessonProps?: (Partial<LessonProps> | Partial<LessonsRoutingProps>) &
      Partial<Pick<Props, "revisionMode">> &
      Partial<AppState>
  ) {
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
      newLesson.presentedMaterial = revisionMaterial.map(line => ({...line}));
    }
    else {
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

  handleLesson(path: LessonPathWithBasenameAndFilename) {
    fetchLesson(path).then((lessonText) => {
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
            shouldUsePersonalDictionaries ? (this.state.personalDictionaries ?? null) : null
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

  createCustomLesson(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (event && event.target) {
      let providedText = event.target.value || '';
      let [lesson, validationState, validationMessages] = parseCustomMaterial(providedText);
      let customLesson = Object.assign({}, this.state.customLesson);
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

  reviseLesson(event: React.MouseEvent<HTMLAnchorElement>, newRevisionMaterial: RevisionMaterial) {
    event.preventDefault();
    this.stopLesson();
    this.setupLesson({
      revisionMaterial: newRevisionMaterial,
      focusTriggerInt: this.state.focusTriggerInt + 1,
      revisionMode: true,
    });
  }

  restartLesson(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    this.stopLesson();
    this.setupLesson({
      focusTriggerInt: this.state.focusTriggerInt + 1,
      revisionMode: false
    });
  }

  updatePersonalDictionaries(personalDictionaries: ImportedPersonalDictionaries) {
    this.setState({personalDictionaries: personalDictionaries});
  }

  updateGlobalLookupDictionary(combinedLookupDictionary: LookupDictWithNamespacedDictsAndConfig) {
    this.setState({globalLookupDictionary: combinedLookupDictionary});
  }

  markupBuffer = [];
  updateBufferTimer = null;

  updateMarkup(event: React.ChangeEvent<HTMLTextAreaElement>) {
    let actualText = event.target.value;
    // TODO: once we're happy that this will be the permanent new default behaviour, remove all the `batchUpdate`-specific branching code and tests:
    // const batchUpdate = document.cookie.indexOf("batchUpdate=1")>=0;
    const batchUpdate = true;
    if(!batchUpdate) {
      // @ts-expect-error TS(2554) FIXME: Expected 2 arguments, but got 1.
      this.processBuffer(actualText);
      return;
    }
    // Immediately update the text in the input field
    this.setState({ actualText });
    // @ts-expect-error TS(2322) FIXME: Type 'any' is not assignable to type 'never'.
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
  getNewStateAndSideEffectsForBuffer(
    // NOTE: refactoring should be done to remove the actualText param from processBuffer() so we can fix it here, but this is an iterative step towards more types:
    actualText: string | null | any,
    buffer: OverrunBuffer,
    state: AppState,
    sideEffects: SideEffectsForBuffer
  ): GetNewStateAndSideEffectsForBufferReturn {
    let time = Date.now();
    if (buffer) {
      const latest = buffer[buffer.length - 1];
      actualText = latest.text;
      time = latest.time;
    }

    // Start timer on first key stroke
    if (state.startTime === null) {
      state.startTime = Date.now();
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

      let screenReaderEchoes = this.props.userSettings.textInputAccessibility
      if (!screenReaderEchoes) {
        state.focusTriggerInt = state.focusTriggerInt + 1;
      }
    }

    if (this.isFinished(state.lesson, state.currentPhraseID)) {
      const newState = this.getFutureStateToStopLesson(state);
      sideEffects.push(() => this.applyStopLessonSideEffects({...newState}));
      return [newState, sideEffects];
    } else if (buffer && proceedToNextWord && unmatchedActual.length > 0) {
      // Repetitively apply buffer with already accepted phrases excluded
      const newBuffer = buffer
        .filter(stroke => stroke.text.length > matchedActual.length && stroke.text.startsWith(matchedActual))
        .map(stroke => ({ text: stroke.text.slice(matchedActual.length), time: stroke.time }));
      // @ts-expect-error TS(2345) FIXME: Argument of type '{ text: string; time: number; }[... Remove this comment to see the full error message
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

  isFinished(lesson: Lesson, currentPhraseID: number) {
    const presentedMaterialLength = lesson?.presentedMaterial?.length || 0;
    return currentPhraseID === presentedMaterialLength;
  }

  presentCompletedMaterial() {
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
              appState={this.state}
            />
          </AppMethodsContext.Provider>
        </div>
      </div>
    );
  }
}

export default App;
