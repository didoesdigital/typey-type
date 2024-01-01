import React, { Component } from 'react';
import "react-tippy/dist/tippy.css";
import PARAMS from './utils/params.js';
import { isLessonTextValid } from './utils/utils';
import { getLessonIndexData } from './utils/lessonIndexData';
import { getRecommendedNextLesson } from './utils/recommendations';
import { getFlashcardsNextLesson } from './utils/flashcardsRecommendations';
import {
  createWordListFromMetWords,
  parseCustomMaterial,
  parseWordList,
  setupLessonProgress,
  loadPersonalPreferences,
  matchSplitText,
  parseLesson,
  repetitionsRemaining,
  shouldShowStroke,
  strokeAccuracy,
  getTargetStrokeCount,
  updateCapitalisationStrokesInNextItem,
  writePersonalPreferences
} from './utils/typey-type';
import { fetchDictionaryIndex, getLesson } from './utils/getData';
import describePunctuation, { punctuationDescriptions } from "./utils/describePunctuation";
import {
  generateListOfWordsAndStrokes
} from './utils/transformingDictionaries/transformingDictionaries';
import queryString from 'query-string';
import GoogleAnalytics from "react-ga4";
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
  changeShowScoresWhileTyping,
  changeShowStrokesAs,
  changeShowStrokesAsList,
  changeShowStrokesOnMisstroke,
  changeSortOrderUserSetting,
  changeSpacePlacementUserSetting,
  changeStenoLayout,
  changeUserSetting,
  changeVoiceUserSetting,
  chooseStudy,
  handleBeatsPerMinute,
  handleDiagramSize,
  handleLimitWordsChange,
  handleRepetitionsChange,
  handleStartFromWordChange,
  handleUpcomingWordsLayout,
  updatePreset,
} from './pages/lessons/components/UserSettings/updateUserSetting';
import {
  changeShowStrokesInLesson,
  updateRevisionMaterial,
} from './pages/lessons/components/UserSettings/updateLessonSetting';
import {
  changeWriterInput,
  toggleExperiment,
} from './pages/lessons/components/UserSettings/updateGlobalUserSetting';
import {
  changeFlashcardCourseLevel,
  changeFullscreen,
} from './pages/lessons/components/UserSettings/updateFlashcardSetting';
import AppRoutes from './AppRoutes';
import applyQueryParamsToUserSettings from './pages/lessons/components/UserSettings/applyQueryParamsToUserSettings';

/** @type {SpeechSynthesis | null} */
let synth = null;
try {
  synth = window.speechSynthesis;
}
catch (e) {
  console.log("This device doesn't support speechSynthesis", e);
}
/** @type {SpeechSynthesisVoice[]} */
let voices = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    // When updating default state for anything stored in local storage,
    // add the same default to load/set personal preferences code and test.
    let metWordsFromStorage = loadPersonalPreferences()[0];
    let startingMetWordsToday = loadPersonalPreferences()[0];
    let recentLessons = loadPersonalPreferences()[6];
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
      dictionaryIndex: [{
        "title": "Dictionary",
        "author": "Typey Type",
        "category": "Typey Type",
        "tagline": "Typey Type’s dictionary is a version of the Plover dictionary with misstrokes removed for the top 10,000 words.",
        "subcategory": "",
        "link": "/support#typey-type-dictionary",
        "path": "/dictionaries/typey-type/typey-type.json"
      }],
      flashcardsMetWords: {
        "the": {
          phrase: "the",
          stroke: "-T",
          rung: 0,
        },
      },
      globalLookupDictionary: new Map(),
      globalLookupDictionaryLoaded: false,
      lessonNotFound: false,
      lessonsProgress: {
      },
      flashcardsProgress: {
      },
      flashcardsNextLesson: {
        lastSeen: Date.now(), // Saturday, May 18, 2019 12:00:55 PM GMT+10:00
        linkTitle: "Loading…",
        linkText: "Study",
        link: process.env.PUBLIC_URL + "/lessons/drills/prefixes/flashcards"// + "?recommended=true&" + PARAMS.practiceParams
      },
      flashcardsCourseIndex: 0,
      fullscreen: false,
      globalUserSettings: {
        experiments: {},
        flashcardsCourseLevel: "noviceCourse", // see types.ts noviceCourse || beginnerCourse || competentCourse || proficientCourse || expertCourse
        writerInput: "qwerty", // qwerty || raw
        showMisstrokesInLookup: false
      },
      isPloverDictionaryLoaded: false,
      isGlobalLookupDictionaryLoaded: false,
      lookupTerm: '',
      recommendationHistory: { currentStep: null },
      personalDictionaries: {
        dictionariesNamesAndContents: null,
      },
      previousCompletedPhraseAsTyped: '',
      repetitionsRemaining: 1,
      startTime: null,
      showStrokesInLesson: false,
      targetStrokeCount: 1,
      timer: 0,
      topSpeedPersonalBest: 0,
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
      revisionMode: false,
      oldWordsGoalUnveiled: false,
      newWordsGoalUnveiled: false,
      userGoals: {
        newWords: 15,
        oldWords: 50
      },
      userSettings: {
        beatsPerMinute: 10,
        blurMaterial: false,
        caseSensitive: false,
        diagramSize: 1.0,
        simpleTypography: true,
        punctuationDescriptions: false,
        retainedWords: true,
        limitNumberOfWords: 45,
        newWords: true,
        repetitions: 3,
        showScoresWhileTyping: true,
        showStrokes: true,
        showStrokesAsDiagrams: true,
        showStrokesAsList: true,
        showStrokesOnMisstroke: true,
        hideStrokesOnLastRepetition: true,
        spacePlacement: 'spaceOff',
        speakMaterial: false,
        textInputAccessibility: true,
        sortOrder: 'sortOff',
        seenWords: true,
        startFromWord: 1,
        study: 'discover',
        stenoLayout: 'stenoLayoutAmericanSteno', // 'stenoLayoutAmericanSteno' || 'stenoLayoutNoNumberBarInnerThumbNumber' || 'stenoLayoutNoNumberBarOuterThumbNumbers' || 'stenoLayoutPalantype' || 'stenoLayoutBrazilianPortugueseSteno' || 'stenoLayoutDanishSteno' || 'stenoLayoutItalianMichelaSteno' || 'stenoLayoutJapanese' || 'stenoLayoutKoreanModernC' || 'stenoLayoutKoreanModernS'
        upcomingWordsLayout: 'singleLine',
        studyPresets: [
          { limitNumberOfWords: 15, repetitions: 5, },
          { limitNumberOfWords: 50, repetitions: 3, },
          { limitNumberOfWords: 100, repetitions: 3, },
          { limitNumberOfWords: 0, repetitions: 1, },
        ],
        voiceName: '',
        voiceURI: '',
      },
      lesson: fallbackLesson,
      lessonIndex: [{
        "title": "Steno",
        "subtitle": "",
        "category": "Drills",
        "subcategory": "",
        "path": process.env.PUBLIC_URL + "/drills/steno/lesson.txt"
      }],
      recentLessons: recentLessons,
      recommendedNextLesson: {
        studyType: "practice",
        limitNumberOfWords: 50,
        repetitions: 1,
        linkTitle: "Top 10000 Project Gutenberg words",
        linkText: "Practice 150 words from Top 10000 Project Gutenberg words",
        link: process.env.PUBLIC_URL + "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" + PARAMS.practiceParams
      },
      revisionMaterial: [
      ],
      startingMetWordsToday: startingMetWordsToday,
      yourSeenWordCount: calculateSeenWordCount(metWordsFromStorage),
      yourMemorisedWordCount: calculateMemorisedWordCount(metWordsFromStorage)
    };
  }

  componentDidMount() {
    this.setPersonalPreferences();

    getLessonIndexData().then((json) => {
      this.setState({ lessonIndex: json }, () => {
        setupLessonProgress(json);
      });
    });
  }

  handleStopLesson(event) {
    event.preventDefault();
    this.stopLesson();
  }

  stopLesson() {
    this.stopTimer();

    if (synth) {
      synth.cancel();
    }

    writePersonalPreferences('userSettings', this.state.userSettings);
    writePersonalPreferences('metWords', this.state.metWords);
    writePersonalPreferences('flashcardsMetWords', this.state.flashcardsMetWords);
    writePersonalPreferences('flashcardsProgress', this.state.flashcardsProgress);

    if (this.state.lesson.path && !this.state.lesson.path.endsWith("/lessons/custom")) {
      let lessonsProgress = this.updateLessonsProgress(this.state.lesson.path, this.state.lesson, this.state.userSettings, this.state.lessonsProgress);
      let recentLessons = this.updateRecentLessons(this.state.lesson.path, this.state.userSettings.study, this.state.recentLessons);
      writePersonalPreferences('lessonsProgress', lessonsProgress);
      writePersonalPreferences('recentLessons', recentLessons);
    }

    const currentLessonStrokes = this.state.currentLessonStrokes.map(copy => ({...copy}));
    for (let i = 0; i < currentLessonStrokes.length; i++) {
      if (currentLessonStrokes[i].accuracy === true) {
        currentLessonStrokes[i].checked = false;
      }
    }

    this.setState({
      actualText: '',
      currentLessonStrokes: currentLessonStrokes,
      currentPhraseID: this.state.lesson.presentedMaterial.length,
      previousCompletedPhraseAsTyped: '',
      currentPhraseAttempts: [],
      disableUserSettings: false,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0,
      yourSeenWordCount: calculateSeenWordCount(this.state.metWords),
      yourMemorisedWordCount: calculateMemorisedWordCount(this.state.metWords)
    });
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
      timer: new Date().getTime() - this.state.startTime
    });
  }

  updateMetWords(newMetWord) {
    const newMetWordsState = Object.assign({}, this.state.metWords);
    const phraseText =
      this.state.userSettings.spacePlacement === "spaceBeforeOutput"
        ? " " + newMetWord
        : this.state.userSettings.spacePlacement === "spaceAfterOutput"
        ? newMetWord + " "
        : newMetWord;
    const meetingsCount = newMetWordsState[phraseText] || 0;
    newMetWordsState[phraseText] = meetingsCount + 1;
    this.setState({ metWords: newMetWordsState });
    writePersonalPreferences("metWords", newMetWordsState);
  }

  setPersonalPreferences(source) {
    let metWordsFromStateOrArg = this.state.metWords;
    let flashcardsMetWordsState = this.state.flashcardsMetWords;
    let flashcardsProgressState = this.state.flashcardsProgress;
    let globalUserSettingsState = this.state.globalUserSettings;
    let lessonsProgressState = this.state.lessonsProgress;
    let recentLessonsState = this.state.recentLessons;
    let topSpeedPersonalBestState = this.state.topSpeedPersonalBest;
    let userGoalsState = this.state.userGoals;
    let userSettingsState = this.state.userSettings;
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
      [metWordsFromStateOrArg, userSettingsState, flashcardsMetWordsState, flashcardsProgressState, globalUserSettingsState, lessonsProgressState, recentLessonsState, topSpeedPersonalBestState, userGoalsState] = loadPersonalPreferences();
    }

    let calculatedYourSeenWordCount = calculateSeenWordCount(this.state.metWords);
    let calculatedYourMemorisedWordCount = calculateMemorisedWordCount(this.state.metWords);

    this.setState({
      flashcardsMetWords: flashcardsMetWordsState,
      flashcardsProgress: flashcardsProgressState,
      globalUserSettings: globalUserSettingsState,
      lessonsProgress: lessonsProgressState,
      recentLessons: recentLessonsState,
      topSpeedPersonalBest: topSpeedPersonalBestState,
      metWords: metWordsFromStateOrArg,
      userSettings: userSettingsState,
      userGoals: userGoalsState,
      yourSeenWordCount: calculatedYourSeenWordCount,
      yourMemorisedWordCount: calculatedYourMemorisedWordCount,
    }, () => {
      writePersonalPreferences('flashcardsMetWords', this.state.flashcardsMetWords);
      writePersonalPreferences('flashcardsProgress', this.state.flashcardsProgress);
      writePersonalPreferences('globalUserSettings', this.state.globalUserSettings);
      writePersonalPreferences('lessonsProgress', this.state.lessonsProgress);
      writePersonalPreferences('recentLessons', this.state.recentLessons);
      writePersonalPreferences('topSpeedPersonalBest', this.state.topSpeedPersonalBest);
      writePersonalPreferences('metWords', this.state.metWords);
      writePersonalPreferences('userSettings', this.state.userSettings);
      writePersonalPreferences('userGoals', this.state.userGoals);
      this.setupLesson();
    });

    return [metWordsFromStateOrArg, userSettingsState, flashcardsMetWordsState, flashcardsProgressState, globalUserSettingsState, lessonsProgressState, recentLessonsState, topSpeedPersonalBestState['wpm'], userGoalsState];
  }

  startFromWordOne() {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = "startFromWord"
    const value = 1;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
      writePersonalPreferences('userSettings', this.state.userSettings);

      // A hack for returning focus somewhere sensible
      // https://stackoverflow.com/questions/1096436/document-getelementbyidid-focus-is-not-working-for-firefox-or-chrome
      // https://stackoverflow.com/questions/33955650/what-is-settimeout-doing-when-set-to-0-milliseconds/33955673
      window.setTimeout(function ()
      {
        let yourTypedText = document.getElementById('your-typed-text')
        let noWordsToWrite = document.getElementById('js-no-words-to-write');
        if (yourTypedText) {
          yourTypedText.focus();
        }
        else if (noWordsToWrite) {
          noWordsToWrite.focus(); // Note: not an interactive element
        }
      }, 0);

    });

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Start from word 1',
      label: 'true'
    });
  }

  updateLessonsProgress(lessonpath, lesson, userSettings, prevlessonsProgress) {
    const metWords = this.state.metWords;
    const lessonsProgress = Object.assign({}, prevlessonsProgress);

    // This is actually UNIQUE numberOfWordsSeen.
    // It seems low value to update localStorage data to rename it only for readability.
    // More FIXMEs below
    // FIXME
    let numberOfWordsSeen = 0;

    // See comment above
    // FIXME
    if (lessonsProgress[lessonpath] && lessonsProgress[lessonpath].numberOfWordsSeen) {
      numberOfWordsSeen = lessonsProgress[lessonpath].numberOfWordsSeen;
    }

    let material = lesson?.sourceMaterial ? lesson.sourceMaterial.map(copy => ({...copy})) : [{phrase: "the", stroke: "-T"}];
    if (userSettings.simpleTypography) {
      material = replaceSmartTypographyInPresentedMaterial.call(this, material, userSettings);
    }

    let len = material.length;
    let seenAccumulator = 0;
    let memorisedAccumulator = 0;

    let normalisedMetWords = {};
    Object.keys(metWords).forEach(function(key) {
      if (normalisedMetWords[key.trim()]) {
        normalisedMetWords[key.trim()] = metWords[key] + normalisedMetWords[key.trim()];
      }
      else {
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
      if (normalisedMetWords[sourceMaterialPhrase] && normalisedMetWords[sourceMaterialPhrase] > 0) {

        // console.log(sourceMaterialPhrase);
        // have you seen this word and seen it in this lesson already?
        if (!(alreadyChecked.indexOf(sourceMaterialPhrase) > -1)) {
          alreadyChecked.push(sourceMaterialPhrase);
          if (normalisedMetWords[sourceMaterialPhrase] < 30) {
            seenAccumulator = seenAccumulator + 1;
            // console.log("Seen: " + sourceMaterialPhrase);
          }
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
    lessonsProgress[lessonpath] = {
      numberOfWordsMemorised: memorisedAccumulator,
      numberOfWordsSeen: numberOfWordsSeen,
      numberOfWordsToDiscover: numberOfWordsToDiscover
    }

    this.setState({
      lessonsProgress: lessonsProgress,
    }, () => {
      writePersonalPreferences('lessonsProgress', lessonsProgress);
    });
    return lessonsProgress;
  }

  updateRecentLessons(recentLessonPath, studyType, prevRecentLessons) {
    let trimmedRecentLessonPath = recentLessonPath.replace(process.env.PUBLIC_URL,'').replace('lesson.txt','');
    const recentLessons = Object.assign({}, prevRecentLessons);

    if (!trimmedRecentLessonPath.includes("/lessons/custom") && recentLessons.history) {
      let existingLessonIndex = recentLessons.history.findIndex(historyRecentLesson => historyRecentLesson.path === trimmedRecentLessonPath);
      if (existingLessonIndex >= 0) {
        recentLessons.history.splice(existingLessonIndex, 1);
      }
      else {
        if (recentLessons.history.length >=10) { recentLessons.history.shift(); }
      }

      recentLessons.history.push({
        path: trimmedRecentLessonPath,
        studyType: studyType
      });
    }

    this.setState({
      recentLessons: recentLessons,
    }, () => {
      writePersonalPreferences('recentLessons', recentLessons);
    });
    return recentLessons;
  }

  updateFlashcardsProgress(lessonpath) {
    let flashcardsProgress = Object.assign({}, this.state.flashcardsProgress);

    flashcardsProgress[lessonpath] = {
      lastSeen: Date.now()
    }
    this.setState({
      flashcardsProgress: flashcardsProgress,
    }, () => {
      writePersonalPreferences('flashcardsProgress', this.state.flashcardsProgress);
    });
    return flashcardsProgress;
  }

  updateFlashcardsMetWords(word, feedback, stroke, rung = 0) {
    let localStroke = stroke || "XXX";
    let flashcardsMetWords = Object.assign({}, this.state.flashcardsMetWords);
    if (flashcardsMetWords[word]) {
      if (flashcardsMetWords[word].rung) {
        rung = flashcardsMetWords[word].rung;
      }
    }

    if (feedback === "easy") {
      rung = rung + 1;
      // debugger
    } else if (feedback === "hard") {
      rung = rung - 1;
      // debugger
      if (rung < 0 ) { rung = 0;}
    }

    flashcardsMetWords[word] = {
      phrase: word,
      stroke: localStroke,
      rung: rung
    }

    // debugger

    this.setState({
      flashcardsMetWords: flashcardsMetWords,
    }, () => {
      writePersonalPreferences('flashcardsMetWords', flashcardsMetWords);
    });
    // debugger
    return flashcardsMetWords;
  }

  updateStartingMetWordsAndCounts(providedMetWords) {
    this.setState({
      startingMetWordsToday: providedMetWords,
      yourSeenWordCount: calculateSeenWordCount(providedMetWords),
      yourMemorisedWordCount: calculateMemorisedWordCount(providedMetWords)
    });
  }

  updateTopSpeedPersonalBest(wpm) {
    this.setState({topSpeedPersonalBest: wpm});
    writePersonalPreferences('topSpeedPersonalBest', wpm);
  }

  updateUserGoals(userGoals) {
    this.setState({userGoals: userGoals});
    writePersonalPreferences('userGoals', userGoals);
  }

  updateUserGoalsUnveiled(oldWordsGoalUnveiled, newWordsGoalUnveiled) {
    this.setState({
      oldWordsGoalUnveiled: oldWordsGoalUnveiled,
      newWordsGoalUnveiled: newWordsGoalUnveiled
    });
  }

  setUpProgressRevisionLesson(metWordsFromStorage, userSettings, newSeenOrMemorised) {
    let newUserSettings = Object.assign({}, userSettings);
    newUserSettings.newWords = newSeenOrMemorised[0];
    newUserSettings.seenWords = newSeenOrMemorised[1];
    newUserSettings.retainedWords = newSeenOrMemorised[2];

    // eslint-disable-next-line no-unused-vars
    const [_, revisePreset, drillPreset, practicePreset] =
      userSettings?.studyPresets ?? [
        { limitNumberOfWords: 5, repetitions: 5 },
        { limitNumberOfWords: 50, repetitions: 3 },
        { limitNumberOfWords: 100, repetitions: 3 },
        { limitNumberOfWords: 300, repetitions: 1 },
      ];

    if (newSeenOrMemorised[1] && !newSeenOrMemorised[2]) {
      newUserSettings.study = 'revise';
      newUserSettings.sortOrder = PARAMS.revise.sortOrder;
      newUserSettings.limitNumberOfWords = revisePreset.limitNumberOfWords;
      newUserSettings.repetitions = revisePreset.repetitions;
      newUserSettings.showStrokes = PARAMS.revise.showStrokes;
    }
    else if (newSeenOrMemorised[2] && !newSeenOrMemorised[1]) {
      newUserSettings.study = 'drill';
      newUserSettings.sortOrder = PARAMS.drill.sortOrder;
      newUserSettings.limitNumberOfWords = drillPreset.limitNumberOfWords;
      newUserSettings.repetitions = drillPreset.repetitions;
      newUserSettings.showStrokes = PARAMS.drill.showStrokes;
    } else {
      newUserSettings.study = 'practice';
      newUserSettings.sortOrder = PARAMS.practice.sortOrder;
      newUserSettings.limitNumberOfWords = practicePreset.limitNumberOfWords;
      newUserSettings.repetitions = practicePreset.repetitions;
      newUserSettings.showStrokes = PARAMS.practice.showStrokes;
    }

    let lesson = {};
    // let stenoLayout = "stenoLayoutAmericanSteno";
    // if (this.state.userSettings) { stenoLayout = this.state.userSettings.stenoLayout; }

    const loadPlover = this.state.userSettings.showStrokesAsList ? true : false;

    this.appFetchAndSetupGlobalDict(loadPlover, null).then(() => {
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
          lesson.newPresentedMaterial = new Zipper([lessonWordsAndStrokes]);
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
      else {
        lesson = fallbackLesson
      }
      this.setState({
        currentPhraseID: 0,
        lesson: lesson,
        userSettings: newUserSettings
      }, () => {
        this.setupLesson();

        if (this.mainHeading) {
          this.mainHeading.focus();
        } else {
          const yourTypedText = document.getElementById('your-typed-text');
          if (yourTypedText) {
            yourTypedText.focus();
            // this.sayCurrentPhraseAgain(); // this is called too soon in progress revision lessons so it announces dummy text instead of actual material
          }
        }
      });
    })
    .catch(error => {
      console.error(error);
      // this.showDictionaryErrorNotification();
    });
  }

  setupLesson() {
    const revisionMode = this.state.revisionMode;
    const revisionMaterial = this.state.revisionMaterial;
    const search = this.props.location.search;
    const userSettings = this.state.userSettings;
    const lessonPath = this.state.lesson.path;
    let newLesson = Object.assign({}, this.state.lesson);
    const prevRecentLessons = this.state.recentLessons;
    const prevLessonsProgress = this.state.lessonsProgress;

    // Copy userSettings before mutating:
    const newSettings = Object.assign({}, userSettings);
    const limitNumberOfWords = newSettings.limitNumberOfWords;
    const startFromWord = newSettings.startFromWord;
    const simpleTypography = newSettings.simpleTypography;
    const reps = newSettings.repetitions;
    const study = newSettings.study

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

    // Get URL search query parameters:
    const parsedParams = queryString.parse(search);
    
    // Get lookupTerm from URL:
    const lookupTerm = parsedParams['q'];

    // Update newSettings using URL search query parameters:
    applyQueryParamsToUserSettings(newSettings, parsedParams);

    this.setState({
      lookupTerm: lookupTerm,
      userSettings: newSettings
    }, () => {
      // Write updated user settings to local storage:
      writePersonalPreferences('userSettings', newSettings);

      // Clean up URL, remove parameters:
      const newHistory = Object.assign({}, this.props.location)
      newHistory.search = "";
      // Note: this affects StrokesForWords lookup ?q= behaviour:
      this.props.history.replace(newHistory);

      // Replace smart typography in presented material:
      if (simpleTypography) {
        newLesson.presentedMaterial = replaceSmartTypographyInPresentedMaterial.call(this, newLesson.presentedMaterial, newSettings);
      }

      // Filter lesson by familiarity:
      newLesson.presentedMaterial = filterByFamiliarity.call(this, newLesson.presentedMaterial, this.state.metWords, newSettings, revisionMode);

      // Sort lesson:
      newLesson.presentedMaterial = sortLesson.call(this, newLesson.presentedMaterial, this.state.metWords, newSettings);

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

      // Update lesson progress and recent lesson history:
      if (lessonPath && !lessonPath.endsWith("/lessons/custom") && !lessonPath.endsWith("/lessons/custom/setup")) {
        const lessonsProgress = this.updateLessonsProgress(lessonPath, newLesson, newSettings, prevLessonsProgress);
        const recentLessons = this.updateRecentLessons(lessonPath, study, prevRecentLessons);
        writePersonalPreferences('lessonsProgress', lessonsProgress);
        writePersonalPreferences('recentLessons', recentLessons);
      }

      // Reset lesson state for starting lesson:
      this.setState({
        actualText: ``,
        currentPhraseAttempts: [],
        currentLessonStrokes: [],
        disableUserSettings: false,
        numberOfMatchedChars: 0,
        previousCompletedPhraseAsTyped: '',
        repetitionsRemaining: reps,
        startTime: null,
        timer: 0,
        targetStrokeCount: target,
        totalNumberOfMatchedChars: 0,
        totalNumberOfMatchedWords: 0,
        totalNumberOfNewWordsMet: 0,
        totalNumberOfLowExposuresSeen: 0,
        totalNumberOfRetainedWords: 0,
        totalNumberOfMistypedWords: 0,
        totalNumberOfHintedWords: 0,
        lesson: newLesson,
        currentPhraseID: 0,
      });
    });
  }

  handleLesson(path) {
    getLesson(path).then((lessonText) => {
      if (isLessonTextValid(lessonText)) {
        this.setState({lessonNotFound: false});
        let lesson = parseLesson(lessonText, path);
        if (
          this.state.globalUserSettings && this.state.globalUserSettings.experiments && !!this.state.globalUserSettings.experiments.stenohintsonthefly &&
          !path.includes("phrasing") &&
          !path.includes("prefixes") &&
          !path.includes("suffixes") &&
          !path.includes("steno-party-tricks") &&
          !path.includes("collections/tech")
        ) {

          const loadPlover = this.state.userSettings.showStrokesAsList ? true : false;

          this.appFetchAndSetupGlobalDict(loadPlover, null).then(() => {
            let lessonWordsAndStrokes = generateListOfWordsAndStrokes(lesson['sourceMaterial'].map(i => i.phrase), this.state.globalLookupDictionary);
              lesson.sourceMaterial = lessonWordsAndStrokes;
              lesson.presentedMaterial = lessonWordsAndStrokes;
              lesson.newPresentedMaterial = new Zipper([lessonWordsAndStrokes]);

            this.setState({
              lesson: lesson,
              currentPhraseID: 0
            }, () => {
              this.setupLesson();

              if (this.mainHeading) {
                this.mainHeading.focus();
              } else {
                const yourTypedText = document.getElementById('your-typed-text');
                if (yourTypedText) {
                  yourTypedText.focus();
                  // this.sayCurrentPhraseAgain(); // this is called too soon, when setupLesson() hasn't finished updating material
                }
              }
            });
          });
        }
        else if (this.state.userSettings.showStrokesAsList) {
          const shouldUsePersonalDictionaries = this.state.personalDictionaries
            && Object.entries(this.state.personalDictionaries).length > 0
            && !!this.state.personalDictionaries.dictionariesNamesAndContents;

          this.appFetchAndSetupGlobalDict(
            true,
            shouldUsePersonalDictionaries ? this.state.personalDictionaries : null
          )
            .then(() => {
              this.setState(
                {
                  lesson: lesson,
                  currentPhraseID: 0,
                },
                () => {
                  this.setupLesson();

                  if (this.mainHeading) {
                    this.mainHeading.focus();
                  } else {
                    const yourTypedText = document.getElementById("your-typed-text");
                    if (yourTypedText) {
                      yourTypedText.focus();
                    }
                  }
                }
              );
            })
            .catch((error) =>
              console.error("failed to fetch and setup global dictionary", error)
            );
        }
        else {
          this.setState({
            lesson: lesson,
            currentPhraseID: 0
          }, () => {
            this.setupLesson();

            if (this.mainHeading) {
              this.mainHeading.focus();
            } else {
              const yourTypedText = document.getElementById('your-typed-text');
              if (yourTypedText) {
                yourTypedText.focus();
              }
            }
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
    this.setState({
      currentPhraseID: 0,
      lesson: lesson
    }, () => {
      this.setupLesson();
    });
  }

  createCustomLesson(event) {
    if (event && event.target) {
      let providedText = event.target.value || '';
      let [lesson, validationState, validationMessages] = parseCustomMaterial(providedText);
      let customLesson = Object.assign({}, this.state.customLesson);
      if (validationMessages && validationMessages.length < 1) { customLesson = lesson; }
      this.setState({
        lesson: lesson,
        currentPhraseID: 0,
        customLesson: customLesson,
        customLessonMaterial: providedText,
        customLessonMaterialValidationState: validationState,
        customLessonMaterialValidationMessages: validationMessages
      }, () => {
        this.setupLesson();
      });
    }
    else { // for navigating straight to custom lesson page without setup
      // debugger;
    // TODO: is this the place where I should set a default empty custom lesson?
      let lesson = Object.assign({}, this.state.customLesson);
      lesson.title = 'Custom'
      this.setState({
        customLesson: lesson,
        lesson: lesson,
        currentPhraseID: 0
      }, () => {
        this.setupLesson();
      });
    }
    return event;
  }

  reviseLesson(event) {
    event.preventDefault();
    let currentLessonStrokes = this.state.currentLessonStrokes;
    let revisionMode = true;
    let newRevisionMaterial = [];
    for (let i = 0; i < currentLessonStrokes.length; i++) {
      if (currentLessonStrokes[i].checked === true) {
        newRevisionMaterial.push({ phrase: currentLessonStrokes[i].word, stroke: currentLessonStrokes[i].stroke });
      }
    }
    if (newRevisionMaterial.length === 0 ) {
      newRevisionMaterial.push(this.state.lesson.sourceMaterial);
      revisionMode = false;
    }
    this.setState({
      revisionMaterial: newRevisionMaterial,
      revisionMode: revisionMode
    }, () => {
      this.stopLesson();
      this.setupLesson();
    });
    this.restartLesson(event, revisionMode);
  }

  restartLesson(event, revise = false) {
    event.preventDefault();
    let revisionMode = revise;
    this.setState({
      currentPhraseID: 0,
      revisionMode: revisionMode
    }, () => {
      this.stopLesson();
      this.setupLesson();

      // A hack for returning focus to your-typed-text
      // https://stackoverflow.com/questions/1096436/document-getelementbyidid-focus-is-not-working-for-firefox-or-chrome
      // https://stackoverflow.com/questions/33955650/what-is-settimeout-doing-when-set-to-0-milliseconds/33955673
      window.setTimeout(function ()
      {
        const yourTypedText = document.getElementById('your-typed-text');
        if (yourTypedText) {
          yourTypedText.focus();
        }
      }, 0);
      // Possible alternative approach:
      // function focusAndSpeak() {
      //   const yourTypedText = document.getElementById('your-typed-text');
      //   if (yourTypedText) {
      //     yourTypedText.focus();
      //     // this.sayCurrentPhraseAgain();
      //   }
      // }
      // window.setTimeout(focusAndSpeak.bind(this), 0);
    });
  }

  updatePersonalDictionaries(personalDictionaries) {
    this.setState({personalDictionaries: personalDictionaries});
  }

  updateGlobalLookupDictionary(combinedLookupDictionary) {
    this.setState({globalLookupDictionary: combinedLookupDictionary});
  }

  updateRecommendationHistory(prevRecommendationHistory, lessonIndex = this.state.lessonIndex) {
    let newRecommendationHistory = Object.assign({}, prevRecommendationHistory);

    if ((typeof newRecommendationHistory['currentStep'] === 'undefined') || (newRecommendationHistory['currentStep'] === null)) {
      newRecommendationHistory['currentStep'] = 'break';
    }

    switch (newRecommendationHistory['currentStep']) {
      case "null":
        newRecommendationHistory['currentStep'] = 'drill';
        break;
      case "practice":
        newRecommendationHistory['currentStep'] = 'drill';
        break;
      case "drill":
        newRecommendationHistory['currentStep'] = 'revise';
        break;
      case "revise":
        newRecommendationHistory['currentStep'] = 'discover';
        break;
      case "discover":
        newRecommendationHistory['currentStep'] = 'wildcard';
        break;
      case "wildcard":
        newRecommendationHistory['currentStep'] = 'break';
        break;
      case "break":
        newRecommendationHistory['currentStep'] = 'practice';
        break;
      default:
        newRecommendationHistory['currentStep'] = 'practice';
        break;
    }

    getRecommendedNextLesson(this.state.lessonsProgress, newRecommendationHistory, this.state.yourSeenWordCount, this.state.yourMemorisedWordCount, lessonIndex, this.state.metWords)
      .then((nextRecommendedLesson) => {
        let prevRecommendedLesson = this.state.recommendedNextLesson;
        this.setState({
          revisionMode: false,
          recommendationHistory: newRecommendationHistory,
          recommendedNextLesson: nextRecommendedLesson
        }, () => {
          if (prevRecommendedLesson.linkText === nextRecommendedLesson.linkText && nextRecommendedLesson.studyType !== 'error' && nextRecommendedLesson.studyType !== 'break') {
            this.updateRecommendationHistory(newRecommendationHistory, lessonIndex);
          }
        });
      })
      .catch( error => {
        console.log(error);
        this.setState({
          revisionMode: false,
          recommendationHistory: newRecommendationHistory,
          recommendedNextLesson: {
            studyType: "error",
            limitNumberOfWords: 50,
            repetitions: 1,
            linkTitle: "Top 10000 Project Gutenberg words",
            linkText: "Practice 150 words from Top 10000 Project Gutenberg words",
            link: process.env.PUBLIC_URL + "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" + PARAMS.practiceParams
          }
        });
      });
  }

  updateFlashcardsRecommendation() {
    getFlashcardsNextLesson(this.state.flashcardsProgress, this.state.globalUserSettings.flashcardsCourseLevel, this.state.flashcardsCourseIndex)
      .then((nextFlashcardsLessonAndCourseIndex) => {
        let [nextFlashcardsLesson, currentFlashcardsCourseIndex] = nextFlashcardsLessonAndCourseIndex;

        this.setState({
          flashcardsCourseIndex: currentFlashcardsCourseIndex,
          flashcardsNextLesson: nextFlashcardsLesson
        });
      })
      .catch( error => {
        console.log(error);
        this.setState({
          flashcardsNextLesson: {
            lastSeen: Date.now(), // Saturday, May 18, 2019 12:00:55 PM GMT+10:00
            linkTitle: "Error",
            linkText: "Error",
            link: process.env.PUBLIC_URL + "/lessons/drills/prefixes/flashcards"// + "?recommended=true&" + PARAMS.practiceParams
          }
        });
      });
  }

  updateMarkup(event) {
    let actualText = event.target.value;

    if (this.state.startTime === null) {
      this.setState({
        startTime: new Date(),
        timer: 0,
        disableUserSettings: true
      });
      this.startTimer();
    }

    // This informs word count, WPM, moving onto next phrase, ending lesson
    // eslint-disable-next-line
    let [matchedChars, unmatchedChars, _, unmatchedActual] =
      matchSplitText(this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase, actualText, this.state.lesson.settings, this.state.userSettings);

    matchedChars = matchedChars.replace(new RegExp(this.state.lesson.settings.ignoredChars,'g'), '');

    let [numberOfMatchedChars, numberOfUnmatchedChars] = [matchedChars, unmatchedChars].map(text => text.length);

    // @ts-ignore this should be ok when currentPhraseAttempts is typed correctly instead of never[]
    const currentPhraseAttempts = this.state.currentPhraseAttempts.map(copy => ({...copy}));

    currentPhraseAttempts.push({
      text: actualText,
      time: Date.now(),
      numberOfMatchedWordsSoFar: (this.state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
      hintWasShown: shouldShowStroke(this.state.showStrokesInLesson, this.state.userSettings.showStrokes, this.state.repetitionsRemaining, this.state.userSettings.hideStrokesOnLastRepetition)
    });

    var newState = {
      currentPhraseAttempts: currentPhraseAttempts,
      numberOfMatchedChars: numberOfMatchedChars,
      totalNumberOfMatchedWords: (this.state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
      totalNumberOfNewWordsMet: this.state.totalNumberOfNewWordsMet,
      totalNumberOfLowExposuresSeen: this.state.totalNumberOfLowExposuresSeen,
      totalNumberOfRetainedWords: this.state.totalNumberOfRetainedWords,
      totalNumberOfMistypedWords: this.state.totalNumberOfMistypedWords,
      totalNumberOfHintedWords: this.state.totalNumberOfHintedWords,
      actualText: actualText,
      metWords: this.state.metWords,
      userSettings: this.state.userSettings
    };

    // NOTE: here is where attempts are defined before being pushed with completed phrases
    let phraseMisstrokes = strokeAccuracy(this.state.currentPhraseAttempts, this.state.targetStrokeCount, unmatchedActual);
    let accurateStroke = phraseMisstrokes.strokeAccuracy; // false
    let attempts = phraseMisstrokes.attempts; // [" sign", " ss"]

    if (!accurateStroke && !this.state.showStrokesInLesson && this.state.userSettings.showStrokesOnMisstroke) {
      this.setState({showStrokesInLesson: true});
    }

    if (numberOfUnmatchedChars === 0) {
      newState.currentPhraseAttempts = []; // reset for next word
      newState.currentLessonStrokes = this.state.currentLessonStrokes; // [{word: "cat", attempts: ["cut"], stroke: "KAT"}, {word: "sciences", attempts ["sign", "ss"], stroke: "SAOEUPB/EPBC/-S"]

      let strokeHintShown = shouldShowStroke(this.state.showStrokesInLesson, this.state.userSettings.showStrokes, this.state.repetitionsRemaining, this.state.userSettings.hideStrokesOnLastRepetition);

      // NOTE: here is where completed phrases are pushed
      newState.currentLessonStrokes.push({
        numberOfMatchedWordsSoFar: (this.state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
        word: this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase,
        typedText: actualText,
        attempts: attempts,
        hintWasShown: strokeHintShown,
        stroke: this.state.lesson.presentedMaterial[this.state.currentPhraseID].stroke,
        checked: true,
        accuracy: accurateStroke,
        time: Date.now()
      });
      // can these newState assignments be moved down below the scores assignments?

      if (strokeHintShown) { newState.totalNumberOfHintedWords = this.state.totalNumberOfHintedWords + 1; }

      if (!accurateStroke) { newState.totalNumberOfMistypedWords = this.state.totalNumberOfMistypedWords + 1; }

      if (!strokeHintShown && accurateStroke) {
        // Use the original text when recording to preserve case and spacing
        let phraseText = this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase;

        if (this.state.userSettings.spacePlacement === 'spaceBeforeOutput') {
          phraseText = ' ' + this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase;
        }
        else if (this.state.userSettings.spacePlacement === 'spaceAfterOutput') {
          phraseText = this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase + ' ';
        }

        const meetingsCount = newState.metWords[phraseText] || 0;
        Object.assign(newState, increaseMetWords(meetingsCount, this.state.totalNumberOfNewWordsMet, this.state.totalNumberOfLowExposuresSeen, this.state.totalNumberOfRetainedWords));
        newState.metWords[phraseText] = meetingsCount + 1;
      }

      if (this.state.userSettings.speakMaterial) {
        let remaining = this.state.lesson.newPresentedMaterial.getRemaining();
        if (remaining && remaining.length > 0 && remaining[0].hasOwnProperty('phrase')) {
          this.say(remaining[0].phrase);
        }
      }

      let nextPhraseID = this.state.currentPhraseID + 1;
      let nextItem = this.state.lesson.presentedMaterial[nextPhraseID];

      if (!!nextItem && this.state.lesson.presentedMaterial && this.state.lesson.presentedMaterial[this.state.currentPhraseID] && this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase) {
        let lastWord = this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase;
        nextItem = updateCapitalisationStrokesInNextItem(nextItem, lastWord);
      }

      let target = getTargetStrokeCount(nextItem || { phrase: '', stroke: 'TK-LS' });
      newState.targetStrokeCount = target;
      this.state.lesson.newPresentedMaterial.visitNext();

      newState.repetitionsRemaining = repetitionsRemaining(this.state.userSettings, this.state.lesson.presentedMaterial, this.state.currentPhraseID + 1);
      newState.totalNumberOfMatchedChars = this.state.totalNumberOfMatchedChars + numberOfMatchedChars;
      newState.previousCompletedPhraseAsTyped = actualText;
      newState.actualText = '';
      newState.showStrokesInLesson = false;
      newState.currentPhraseID = nextPhraseID;

      newState.yourSeenWordCount = calculateSeenWordCount(this.state.metWords);
      newState.yourMemorisedWordCount = calculateMemorisedWordCount(this.state.metWords);
    }

    this.setState(newState, () => {
      if (this.isFinished()) {
        this.stopLesson();
      }
    });
  }

  /** @param { string } utteranceText */
  say(utteranceText) {
    try {
      if (synth && synth.speaking) {
        synth.cancel();
      }

      utteranceText = utteranceText.replaceAll("—", "em dash");
      if (utteranceText in punctuationDescriptions) {
        utteranceText = describePunctuation(utteranceText);
      }

      if (window.SpeechSynthesisUtterance) {
        if (!voices || !voices.length) {
          voices = synth?.getVoices() ?? [];
        }

        let utterThis = new SpeechSynthesisUtterance(utteranceText);
        // Debugging:
        // utterThis.onerror = function (event) {
        //   console.warn(`${event.error}: ${this.text}`);
        // };

        const preferredVoiceURI = this.state.userSettings.voiceURI;
        const preferredVoiceName = this.state.userSettings.voiceName;
        const voiceInVoices =
          voices.find((voice) => voice.voiceURI === preferredVoiceURI) ??
          voices.find((voice) => voice.name === preferredVoiceName);

        if (voiceInVoices) {
          utterThis.lang = voiceInVoices.lang;
          utterThis.voice = voiceInVoices;
        }

        // No lang?
        if (!utterThis.lang) {
          utterThis.lang = "en";

          const lang = navigator.language;
          if (lang && (lang === "de" || lang.startsWith("de-")) && this.state.userSettings?.stenoLayout === "stenoLayoutPalantype") {
            utterThis.lang = lang;
          }
        }

        // TODO: scale the rate in proportion to:
        // A) words per minute and
        // B) length of word as a proxy for the time it takes to say a long word
        // Note: this likely has floating point math rounding errors.
        const wordsPerMinute =
          this.state.timer > 0
            ? this.state.totalNumberOfMatchedWords /
              (this.state.timer / 60 / 1000)
            : 0;
        wordsPerMinute > 100 ? (utterThis.rate = 2) : (utterThis.rate = 1);

        // @ts-ignore 'chrome' isn't on Window because it is browser specific and that's why we are using it to check for chromium browsers
        const isChromium = !!window.chrome;
        const timeoutDelay = isChromium ? 50 : 0;
        setTimeout(function () {
          synth?.speak(utterThis);
        }, timeoutDelay);
      }
    } catch (e) {
      console.warn("Unable to speak material", e);
    }
  }

  sayCurrentPhraseAgain() {
    if (this.state.userSettings.speakMaterial) {
      let currentPhrase = this.state.lesson.presentedMaterial[this.state.currentPhraseID];
      if (currentPhrase && currentPhrase.hasOwnProperty('phrase')) {
        this.say(currentPhrase.phrase);
      }
    }
  }

  isFinished() {
    let presentedMaterialLength = (this.state.lesson && this.state.lesson.presentedMaterial) ? this.state.lesson.presentedMaterial.length : 0;
    return (this.state.currentPhraseID === presentedMaterialLength);
  }

  presentCompletedMaterial() {
    return this.state.lesson.newPresentedMaterial ? this.state.lesson.newPresentedMaterial.getCompleted().map(item => item.phrase) : [];
  }

  presentUpcomingMaterial() {
    return this.state.lesson.newPresentedMaterial ? this.state.lesson.newPresentedMaterial.getRemaining().slice().map(item => item.phrase) : [];
  }

  setDictionaryIndex() {
    fetchDictionaryIndex().then((json) => {
      this.setState({ dictionaryIndex: json })
    });
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

    let stenohintsonthefly = this.state.globalUserSettings && this.state.globalUserSettings.experiments && !!this.state.globalUserSettings.experiments.stenohintsonthefly;

    let presentedMaterialCurrentItem = (stateLesson.presentedMaterial && stateLesson.presentedMaterial[this.state.currentPhraseID]) ? stateLesson.presentedMaterial[this.state.currentPhraseID] : { phrase: '', stroke: '' };
    return (
      <div id="js-app" className="app">
        <div className="flex flex-column justify-between min-vh-100">
          <AppRoutes
            appProps={{
              location: this.props.location,
              completedMaterial,
              presentedMaterialCurrentItem,
              stateLesson,
              stenohintsonthefly,
              upcomingMaterial
            }}
            appMethods={{
              appFetchAndSetupGlobalDict: this.appFetchAndSetupGlobalDict,
              setCustomLessonContent: setCustomLessonContent.bind(this),
              customiseLesson: customiseLesson.bind(this),
              generateCustomLesson: generateCustomLesson.bind(this),
              updateMultipleMetWords: updateMultipleMetWords.bind(this),
              changeFlashcardCourseLevel: changeFlashcardCourseLevel.bind(this),
              changeFullscreen: changeFullscreen.bind(this),
              changeShowScoresWhileTyping: changeShowScoresWhileTyping.bind(this),
              changeShowStrokesAs: changeShowStrokesAs.bind(this),
              changeShowStrokesAsList: changeShowStrokesAsList.bind(this),
              changeShowStrokesInLesson: changeShowStrokesInLesson.bind(this),
              changeShowStrokesOnMisstroke: changeShowStrokesOnMisstroke.bind(this),
              changeSortOrderUserSetting: changeSortOrderUserSetting.bind(this),
              changeSpacePlacementUserSetting: changeSpacePlacementUserSetting.bind(this),
              changeStenoLayout: changeStenoLayout.bind(this),
              changeUserSetting: changeUserSetting.bind(this),
              changeVoiceUserSetting: changeVoiceUserSetting.bind(this),
              changeWriterInput: changeWriterInput.bind(this),
              chooseStudy: chooseStudy.bind(this),
              createCustomLesson: this.createCustomLesson.bind(this),
              handleBeatsPerMinute: handleBeatsPerMinute.bind(this),
              handleDiagramSize: handleDiagramSize.bind(this),
              handleLesson: this.handleLesson.bind(this),
              handleLimitWordsChange: handleLimitWordsChange.bind(this),
              handleRepetitionsChange: handleRepetitionsChange.bind(this),
              handleStartFromWordChange: handleStartFromWordChange.bind(this),
              handleStopLesson: this.handleStopLesson.bind(this),
              handleUpcomingWordsLayout: handleUpcomingWordsLayout.bind(this),
              restartLesson: this.restartLesson.bind(this),
              reviseLesson: this.reviseLesson.bind(this),
              sayCurrentPhraseAgain: this.sayCurrentPhraseAgain.bind(this),
              setDictionaryIndex: this.setDictionaryIndex.bind(this),
              setPersonalPreferences: this.setPersonalPreferences.bind(this),
              setUpProgressRevisionLesson: this.setUpProgressRevisionLesson.bind(this),
              setupLesson: this.setupLesson.bind(this),
              startCustomLesson: this.startCustomLesson.bind(this),
              startFromWordOne: this.startFromWordOne.bind(this),
              stopLesson: this.stopLesson.bind(this),
              toggleExperiment: toggleExperiment.bind(this),
              updateFlashcardsMetWords: this.updateFlashcardsMetWords.bind(this),
              updateFlashcardsProgress: this.updateFlashcardsProgress.bind(this),
              updateFlashcardsRecommendation: this.updateFlashcardsRecommendation.bind(this),
              updateGlobalLookupDictionary: this.updateGlobalLookupDictionary.bind(this),
              updateMarkup: this.updateMarkup.bind(this),
              updateMetWords: this.updateMetWords.bind(this),
              updatePersonalDictionaries: this.updatePersonalDictionaries.bind(this),
              updatePreset: updatePreset.bind(this),
              updateRecommendationHistory: this.updateRecommendationHistory.bind(this),
              updateRevisionMaterial: updateRevisionMaterial.bind(this),
              updateStartingMetWordsAndCounts: this.updateStartingMetWordsAndCounts.bind(this),
              updateTopSpeedPersonalBest: this.updateTopSpeedPersonalBest.bind(this),
              updateUserGoals: this.updateUserGoals.bind(this),
              updateUserGoalsUnveiled: this.updateUserGoalsUnveiled.bind(this),
            }}
            appState={this.state}
          />
        </div>
      </div>
    );
  }
}

export default App;
