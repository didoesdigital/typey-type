import React, { Component } from 'react';
import PARAMS from './utils/params.js';
import { LATEST_PLOVER_DICT_NAME, SOURCE_NAMESPACES } from './constant/index.js';
import { randomise, isLessonTextValid } from './utils/utils';
import { getLessonIndexData } from './utils/lessonIndexData';
import { getRecommendedNextLesson } from './utils/recommendations';
import { getFlashcardsNextLesson } from './utils/flashcardsRecommendations';
import {
  createWordListFromMetWords,
  parseCustomMaterial,
  parseWordList,
  setupLessonProgress,
  loadPersonalPreferences,
  loadPersonalDictionariesFromLocalStorage,
  matchSplitText,
  parseLesson,
  repetitionsRemaining,
  shouldShowStroke,
  strokeAccuracy,
  targetStrokeCount,
  updateCapitalisationStrokesInNextItem,
  writePersonalPreferences
} from './utils/typey-type';
import {
  getLatestPloverDict,
  getLesson
} from './utils/getData';
import { fetchDictionaryIndex } from './utils/getData';
import { getTypeyTypeDict } from './utils/getData';
import {
  generateListOfWordsAndStrokes
} from './utils/transformingDictionaries/transformingDictionaries';
import createAGlobalLookupDictionary from "./utils/transformingDictionaries/createAGlobalLookupDictionary";
import { AffixList } from './utils/affixList';
import {
  Route,
  Switch
} from 'react-router-dom';
import queryString from 'query-string';
import DocumentTitle from 'react-document-title';
import GoogleAnalytics from 'react-ga';
import Loadable from 'react-loadable';
import PageLoading from './components/PageLoading';
import Announcements from './components/Announcements';
import ErrorBoundary from './components/ErrorBoundary'
import Lessons from './pages/lessons/Lessons';
import Header from './components/Header';
import Footer from './components/Footer';
import fallbackLesson from './constant/fallbackLesson';
import calculateMemorisedWordCount from './utils/calculateMemorisedWordCount';
import calculateSeenWordCount from './utils/calculateSeenWordCount';
import isElement from './utils/isElement';
import isNormalInteger from './utils/isNormalInteger';
import filterByFamiliarity from './utils/lessons/filterByFamiliarity';
import Zipper from './utils/zipper';

const AsyncBreak = Loadable({
  loader: () => import("./components/Break"),
  loading: PageLoading,
  delay: 300
});

const AsyncContribute = Loadable({
  loader: () => import("./components/Contribute"),
  loading: PageLoading,
  delay: 300
});

const AsyncPageNotFound = Loadable({
  loader: () => import("./components/PageNotFound"),
  loading: PageLoading,
  delay: 300
});

const AsyncProgress = Loadable({
  loader: () => import("./components/Progress"),
  loading: PageLoading,
  delay: 300
});

const AsyncWriter = Loadable({
  loader: () => import("./components/Writer"),
  loading: PageLoading,
  delay: 300
});

const AsyncFlashcards = Loadable({
  loader: () => import("./pages/lessons/flashcards/Flashcards"),
  loading: PageLoading,
  delay: 300
});

const AsyncHome = Loadable({
  loader: () => import("./components/Home"),
  loading: PageLoading,
  delay: 300
});

const AsyncSupport = Loadable({
  loader: () => import("./components/Support"),
  loading: PageLoading,
  delay: 300
});

const AsyncLookup = Loadable({
  loader: () => import("./components/Lookup"),
  loading: PageLoading,
  delay: 300
});

const AsyncDictionaries = Loadable({
  loader: () => import("./components/Dictionaries"),
  loading: PageLoading,
  delay: 300
});

const AsyncGames = Loadable({
  loader: () => import("./pages/games/Games"),
  loading: PageLoading,
  delay: 300
});

// Test PageLoadingPastDelay at Dictionaries route:
// import PageLoadingPastDelay from './components/PageLoadingPastDelay';
// const AsyncDictionaries = Loadable({
//   loader: () => import('./components/PageLoadingPastDelay'), // oh no!
//   loading: PageLoading,
// });

// Test PageLoadingFailed at Dictionaries route:
// import PageLoadingFailed from './components/PageLoadingFailed';
// const AsyncDictionaries = Loadable({
//   loader: () => import('./components/PageLoadingFailed'), // oh no!
//   loading: PageLoading,
// });

let globalDictionaryLoading = false;
let loadingPromise = null;
let isGlobalDictionaryUpToDate = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    // When updating default state for anything stored in local storage,
    // add the same default to load/set personal preferences code and test.
    let metWords = loadPersonalPreferences()[0];
    let startingMetWordsToday = loadPersonalPreferences()[0];
    let recentLessons = loadPersonalPreferences()[6];

    this.state = {
      announcementMessage: null,
      currentPhraseAttempts: [],
      currentPhraseID: 0,
      currentLessonStrokes: [],
      customLessonMaterial: ``,
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
        flashcardsCourseLevel: "noviceCourse", // noviceCourse || beginnerCourse || competentCourse || proficientCourse || expertCourse
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
      timer: null,
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
      metWords: metWords,
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
        retainedWords: true,
        limitNumberOfWords: 45,
        newWords: true,
        repetitions: 3,
        showScoresWhileTyping: true,
        showStrokes: true,
        showStrokesAsDiagrams: true,
        showStrokesOnMisstroke: true,
        hideStrokesOnLastRepetition: true,
        spacePlacement: 'spaceOff',
        speakMaterial: false,
        textInputAccessibility: true,
        sortOrder: 'sortOff',
        seenWords: true,
        startFromWord: 1,
        study: 'discover',
        stenoLayout: 'stenoLayoutAmericanSteno', // 'stenoLayoutAmericanSteno' || 'stenoLayoutPalantype' || 'stenoLayoutBrazilianPortugueseSteno' || 'stenoLayoutDanishSteno' || 'stenoLayoutItalianMichelaSteno' || 'stenoLayoutJapanese' || 'stenoLayoutKoreanModernC' || 'stenoLayoutKoreanModernS'
        upcomingWordsLayout: 'singleLine'
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
      yourSeenWordCount: calculateSeenWordCount(metWords),
      yourMemorisedWordCount: calculateMemorisedWordCount(metWords)
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

  // The withPlover flag here is just about whether or not to fetch the Plover dictionary file.
  fetchAndSetupGlobalDict(withPlover, importedPersonalDictionaries) {
    let personalDictionaries = null;
    if (importedPersonalDictionaries && importedPersonalDictionaries.dictionariesNamesAndContents) {
      personalDictionaries = importedPersonalDictionaries.dictionariesNamesAndContents;
    }
    if (personalDictionaries === null) {
      personalDictionaries = loadPersonalDictionariesFromLocalStorage();
    }
    if (personalDictionaries === null) {
      personalDictionaries = [];
    }

    const localConfig = personalDictionaries.map(d => `${SOURCE_NAMESPACES.get('user')}:${d[0]}`);

    // TODO: this will all need to change when we change how Typey Type is included or excluded in
    // personal dictionary usage…
    let localConfigPlusTypeyType = localConfig.slice(0);
    localConfigPlusTypeyType.unshift(`${SOURCE_NAMESPACES.get('typey')}:typey-type.json`);
    const previouslyAppliedConfig = this.state.globalLookupDictionary['configuration'];
    const globalLookupDictionaryMatchesConfig =
      this.state.globalLookupDictionary &&
      !!this.state.globalLookupDictionary['configuration'] &&
      JSON.stringify(previouslyAppliedConfig) ===
      JSON.stringify(localConfigPlusTypeyType);

    let localConfigPlusTypeyTypeAndPlover = localConfigPlusTypeyType.slice(0);
    localConfigPlusTypeyTypeAndPlover.push(`${SOURCE_NAMESPACES.get('plover')}:${LATEST_PLOVER_DICT_NAME}`); // reminder: .push() returns length of array, not result const
    const globalLookupDictionaryMatchesConfigWithPlover =
      this.state.globalLookupDictionary &&
      !!this.state.globalLookupDictionary['configuration'] &&
      JSON.stringify(previouslyAppliedConfig) ===
      JSON.stringify(localConfigPlusTypeyTypeAndPlover);

    let isPloverDictionaryLoaded = this.state.isPloverDictionaryLoaded;
    if (withPlover && this.state.globalLookupDictionary && isPloverDictionaryLoaded && globalLookupDictionaryMatchesConfigWithPlover) {
      isGlobalDictionaryUpToDate = true;
    }
    else if (withPlover) {
      isGlobalDictionaryUpToDate = false;
    }
    else if (!withPlover && this.state.globalLookupDictionary && (globalLookupDictionaryMatchesConfig || globalLookupDictionaryMatchesConfigWithPlover)) {
      isGlobalDictionaryUpToDate = true;
    }
    else {
      isGlobalDictionaryUpToDate = false;
    }

    if (loadingPromise && isGlobalDictionaryUpToDate) {
      return loadingPromise;
    }
    else {
      globalDictionaryLoading = true;
      loadingPromise = Promise.all([getTypeyTypeDict(), withPlover ? getLatestPloverDict() : {}]).then(data => {
        let [typeyDict, latestPloverDict] = data;
        // let t0 = performance.now();
        // if (this.state.globalUserSettings && this.state.globalUserSettings.showMisstrokesInLookup) {
        //   dictAndMisstrokes[1] = {};
        // }

        let sortedAndCombinedLookupDictionary = createAGlobalLookupDictionary(personalDictionaries, typeyDict, withPlover ? latestPloverDict : null);
        // let t1 = performance.now();
        // console.log("Call to createAGlobalLookupDictionary took " + (Number.parseFloat((t1 - t0) / 1000).toPrecision(3)) + " seconds.");

        // For debugging:
        // window.lookupDict = sortedAndCombinedLookupDictionary;
        isGlobalDictionaryUpToDate = true;
        this.updateGlobalLookupDictionary(sortedAndCombinedLookupDictionary);
        this.setState({ globalLookupDictionaryLoaded: true });
        const affixList = new AffixList(sortedAndCombinedLookupDictionary);
        AffixList.setSharedInstance(affixList);
      });

      if (!isPloverDictionaryLoaded && withPlover) {
        this.setState({isPloverDictionaryLoaded: true });
      }
      return loadingPromise;
    }
  };

  setGlobalDictionaryLoaded(done) {
    if (!globalDictionaryLoading) {
      globalDictionaryLoading = done;
    }
    this.setState({ globalLookupDictionaryLoaded: done });
  }

  handleStopLesson(event) {
    event.preventDefault();
    this.stopLesson();
  }

  stopLesson() {
    this.stopTimer();

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    writePersonalPreferences('userSettings', this.state.userSettings);
    writePersonalPreferences('metWords', this.state.metWords);
    writePersonalPreferences('flashcardsMetWords', this.state.flashcardsMetWords);
    writePersonalPreferences('flashcardsProgress', this.state.flashcardsProgress);

    if (this.state.lesson.path && !this.state.lesson.path.endsWith("/lessons/custom")) {
      let lessonsProgress = this.updateLessonsProgress(this.state.lesson.path);
      let recentLessons = this.updateRecentLessons(this.state.lesson.path, this.state.userSettings.study);
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
    }, () => {
      this.stopTimer();
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
      timer: new Date() - this.state.startTime
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
    let metWords = this.state.metWords;
    let flashcardsMetWords = this.state.flashcardsMetWords;
    let flashcardsProgress = this.state.flashcardsProgress;
    let globalUserSettings = this.state.globalUserSettings;
    let lessonsProgress = this.state.lessonsProgress;
    let recentLessons = this.state.recentLessons;
    let topSpeedPersonalBest = this.state.topSpeedPersonalBest;
    let userGoals = this.state.userGoals;
    let userSettings = this.state.userSettings;
    if (source && source !== '') {
      try {
        let parsedSource = JSON.parse(source);
        if (parsedSource && typeof parsedSource === "object") {
          metWords = parsedSource;
        }
      }
      catch (error) { }
    }
    else {
      [metWords, userSettings, flashcardsMetWords, flashcardsProgress, globalUserSettings, lessonsProgress, recentLessons, topSpeedPersonalBest, userGoals] = loadPersonalPreferences();
    }

    let yourSeenWordCount = calculateSeenWordCount(this.state.metWords);
    let yourMemorisedWordCount = calculateMemorisedWordCount(this.state.metWords);

    this.setState({
      flashcardsMetWords: flashcardsMetWords,
      flashcardsProgress: flashcardsProgress,
      globalUserSettings: globalUserSettings,
      lessonsProgress: lessonsProgress,
      recentLessons: recentLessons,
      topSpeedPersonalBest: topSpeedPersonalBest,
      metWords: metWords,
      userSettings: userSettings,
      userGoals: userGoals,
      yourSeenWordCount: yourSeenWordCount,
      yourMemorisedWordCount: yourMemorisedWordCount,
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

    return [metWords, userSettings, flashcardsMetWords, flashcardsProgress, globalUserSettings, lessonsProgress, recentLessons, topSpeedPersonalBest['wpm'], userGoals];
  }

  handleDiagramSize(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = "diagramSize"
    let value = typeof event === 'number' ? event.toFixed(1) : 1.0;
    if (value > 2) { value = 2.0; }
    if (value < 1) { value = 1.0; }

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change diagram size',
      label: labelString
    });

    return value;
  }

  handleBeatsPerMinute(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = "beatsPerMinute"
    const value = event;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change beats per minute',
      label: labelString
    });

    return value;
  }

  handleLimitWordsChange(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = "limitNumberOfWords"
    const value = event;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change limit word count',
      label: labelString
    });

    return value;
  }

  startFromWordOne() {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = "startFromWord"
    const value = 1;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson('There are no words to write.');
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

  handleStartFromWordChange(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = "startFromWord"
    const value = event;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change start from word',
      label: labelString
    });

    return value;
  }

  handleRepetitionsChange(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = "repetitions"
    const value = event;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change repetitions',
      label: labelString
    });

    return value;
  }

  handleUpcomingWordsLayout(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = event.target.name;
    const value = event.target.value;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      this.setupLesson();
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change upcoming words layout',
      label: labelString
    });

    return value;
  }

  changeShowStrokesInLesson(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({showStrokesInLesson: value});
    const yourTypedText = document.getElementById('your-typed-text');
    if (yourTypedText) {
      yourTypedText.focus();
    }

    if (this.props.location.pathname.includes('custom')) {
      GoogleAnalytics.event({
        category: 'Stroke hint',
        action: 'Reveal',
        label: 'CUSTOM_LESSON'
      });
    }
    else {
      let labelShowStrokesInLesson = 'true';
      try {
        labelShowStrokesInLesson = this.state.lesson.newPresentedMaterial.current.phrase + ": " + this.state.lesson.newPresentedMaterial.current.stroke;
      } catch { }

      GoogleAnalytics.event({
        category: 'Stroke hint',
        action: 'Reveal',
        label: labelShowStrokesInLesson
      });
    }

    return value;
  }

  changeShowStrokesOnMisstroke(event) {
    let newState = Object.assign({}, this.state.userSettings);

    const name = 'showStrokesOnMisstroke'
    const value = event.target.value;

    newState[name] = !newState[name];

    this.setState({userSettings: newState}, () => {
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; } else { labelString = value.toString(); }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change show strokes on misstroke',
      label: labelString
    });

    return value;
  }

  changeFullscreen(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({fullscreen: value});
    return value;
  }

  updateLessonsProgress(lessonpath) {
    let lessonsProgress = Object.assign({}, this.state.lessonsProgress);

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

    let material = this.state.lesson?.sourceMaterial ? this.state.lesson.sourceMaterial.map(copy => ({...copy})) : [{phrase: "the", stroke: "-T"}];
    if (this.state.userSettings.simpleTypography) {
      material = replaceSmartTypographyInPresentedMaterial.call(this, material);
    }

    let metWords = this.state.metWords;
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
      writePersonalPreferences('lessonsProgress', this.state.lessonsProgress);
    });
    return lessonsProgress;
  }

  updateRecentLessons(recentLessonPath, studyType) {
    let trimmedRecentLessonPath = recentLessonPath.replace(process.env.PUBLIC_URL,'').replace('lesson.txt','');
    let recentLessons = Object.assign({}, this.state.recentLessons);

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
      writePersonalPreferences('recentLessons', this.state.recentLessons);
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

  updateStartingMetWordsAndCounts(metWords) {
    this.setState({
      startingMetWordsToday: metWords,
      yourSeenWordCount: calculateSeenWordCount(metWords),
      yourMemorisedWordCount: calculateMemorisedWordCount(metWords)
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

  setUpProgressRevisionLesson(metWords, userSettings, newSeenOrMemorised) {
    let newUserSettings = Object.assign({}, userSettings);
    newUserSettings.newWords = newSeenOrMemorised[0];
    newUserSettings.seenWords = newSeenOrMemorised[1];
    newUserSettings.retainedWords = newSeenOrMemorised[2];

    // FIXME: These settings should all be using params set in params.js
    if (newSeenOrMemorised[1] && !newSeenOrMemorised[2]) {
      newUserSettings.study = 'revise';
      newUserSettings.sortOrder = 'sortNew';
      newUserSettings.limitNumberOfWords = 50;
      newUserSettings.repetitions = 3;
      newUserSettings.showStrokes = false;
    }
    else if (newSeenOrMemorised[2] && !newSeenOrMemorised[1]) {
      newUserSettings.study = 'drill';
      newUserSettings.sortOrder = 'sortRandom';
      newUserSettings.limitNumberOfWords = 100;
      newUserSettings.repetitions = 3;
      newUserSettings.showStrokes = false;
    } else {
      newUserSettings.study = 'practice';
      newUserSettings.sortOrder = 'sortOff';
      newUserSettings.limitNumberOfWords = PARAMS.practice.limitNumberOfWords;
      newUserSettings.repetitions = 1;
      newUserSettings.showStrokes = false;
    }

    let lesson = {};
    // let stenoLayout = "stenoLayoutAmericanSteno";
    // if (this.state.userSettings) { stenoLayout = this.state.userSettings.stenoLayout; }

    const shouldUsePersonalDictionaries = this.state.personalDictionaries
      && Object.entries(this.state.personalDictionaries).length > 0
      && !!this.state.personalDictionaries.dictionariesNamesAndContents;

    this.fetchAndSetupGlobalDict(false, shouldUsePersonalDictionaries ? this.props.personalDictionaries : null).then(() => {
      // grab metWords, trim spaces, and sort by times seen
      let myWords = createWordListFromMetWords(metWords).join("\n");
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
      this.setState({
        announcementMessage: 'Navigated to: Your revision words',
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

  updateRevisionMaterial(event) {
    let newCurrentLessonStrokes = this.state.currentLessonStrokes.map(stroke => ({...stroke}));
    const target = event.target;
    const checked = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name.replace(/-checkbox/,'');
    const index = name;

    newCurrentLessonStrokes[index].checked = checked;

    this.setState({currentLessonStrokes: newCurrentLessonStrokes});
    return checked;
  }

  toggleExperiment(event) {
    let newState = Object.assign({}, this.state.globalUserSettings);

    const target = event.target;
    const value = target.checked;
    const name = target.name;

    newState.experiments[name] = value;

    this.setState({globalUserSettings: newState}, () => {
      writePersonalPreferences('globalUserSettings', this.state.globalUserSettings);
    });

    let labelString = value;
    if (value === undefined) { labelString = "BAD_INPUT"; } else { labelString.toString(); }

    GoogleAnalytics.event({
      category: 'Global user settings',
      action: 'Change ' + name,
      label: labelString
    });

    return value;
  }

  changeUserSetting(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    newState[name] = value;

    if (!newState.speakMaterial && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; } else { labelString.toString(); }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change ' + name,
      label: labelString
    });

    return value;
  }

  changeSortOrderUserSetting(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = 'sortOrder'
    const value = event.target.value;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change sort order',
      label: labelString
    });

    return value;
  }

  changeShowStrokesAs(event) {
    let newState = Object.assign({}, this.state.userSettings);

    const name = 'showStrokesAsDiagrams'
    const value = event.target.value;

    if (value === 'strokesAsText') {
      newState[name] = false;
    } else {
      newState[name] = true;
    }

    this.setState({userSettings: newState}, () => {
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change show strokes as',
      label: labelString
    });

    return value;
  }

  changeShowScoresWhileTyping(event) {
    let newState = Object.assign({}, this.state.userSettings);

    newState['showScoresWhileTyping'] = !newState['showScoresWhileTyping'];

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change show scores while typing',
      label: newState['showScoresWhileTyping'].toString()
    });

    this.setState({userSettings: newState}, () => {
      writePersonalPreferences('userSettings', this.state.userSettings);
    });
    return newState['showScoresWhileTyping'];
  }

  chooseStudy(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = 'study'
    const value = event.target.value;

    newState[name] = value;

    switch (value) {
      case "discover":
        newState.showStrokes = PARAMS.discover.showStrokes;
        newState.hideStrokesOnLastRepetition = PARAMS.discover.hideStrokesOnLastRepetition;
        newState.newWords = PARAMS.discover.newWords;
        newState.seenWords = PARAMS.discover.seenWords;
        newState.retainedWords = PARAMS.discover.retainedWords;
        newState.repetitions = PARAMS.discover.repetitions;
        newState.limitNumberOfWords = PARAMS.discover.limitNumberOfWords;
        newState.sortOrder = PARAMS.discover.sortOrder;
        break;
      case "revise":
        newState.showStrokes = PARAMS.revise.showStrokes;
        newState.hideStrokesOnLastRepetition = PARAMS.revise.hideStrokesOnLastRepetition;
        newState.newWords = PARAMS.revise.newWords;
        newState.seenWords = PARAMS.revise.seenWords;
        newState.retainedWords = PARAMS.revise.retainedWords;
        newState.repetitions = PARAMS.revise.repetitions;
        newState.limitNumberOfWords = PARAMS.revise.limitNumberOfWords;
        newState.sortOrder = PARAMS.revise.sortOrder;
        break;
      case "drill":
        newState.showStrokes = PARAMS.drill.showStrokes;
        newState.hideStrokesOnLastRepetition = PARAMS.drill.hideStrokesOnLastRepetition;
        newState.newWords = PARAMS.drill.newWords;
        newState.seenWords = PARAMS.drill.seenWords;
        newState.retainedWords = PARAMS.drill.retainedWords;
        newState.repetitions = PARAMS.drill.repetitions;
        newState.limitNumberOfWords = PARAMS.drill.limitNumberOfWords;
        newState.sortOrder = PARAMS.drill.sortOrder;
        break;
      case "practice":
        newState.showStrokes = PARAMS.practice.showStrokes;
        newState.hideStrokesOnLastRepetition = PARAMS.practice.hideStrokesOnLastRepetition;
        newState.newWords = PARAMS.practice.newWords;
        newState.seenWords = PARAMS.practice.seenWords;
        newState.retainedWords = PARAMS.practice.retainedWords;
        newState.repetitions = PARAMS.practice.repetitions;
        newState.limitNumberOfWords = PARAMS.practice.limitNumberOfWords;
        newState.sortOrder = PARAMS.practice.sortOrder;
        break;
      default:
        break;
    }

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Choose Study Type',
      label: labelString
    });

    return value;
  }

  changeSpacePlacementUserSetting(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = 'spacePlacement'
    const value = event.target.value;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: 'Change spacePlacement',
      label: labelString
    });

    return value;
  }

  changeFlashcardCourseLevel(event) {
    const value = event.target.value;
    let globalUserSettings = Object.assign({}, this.state.globalUserSettings);
    globalUserSettings['flashcardsCourseLevel'] = value;

    this.setState({globalUserSettings: globalUserSettings}, () => {
      this.updateFlashcardsRecommendation();
      writePersonalPreferences('globalUserSettings', globalUserSettings);
    });

    let labelString = value;
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'Flashcards',
      action: 'Change course level',
      label: labelString
    });

    return value;
  }

  // changeWriterInput(event: SyntheticInputEvent<HTMLInputElement>) {
  changeWriterInput(event) {
    let globalUserSettings = Object.assign({}, this.state.globalUserSettings);
    let name = 'BAD_INPUT';

    if (event && event.target && event.target.name) {
      globalUserSettings['writerInput'] = event.target.name;
      name = event.target.name;
    }

    this.setState({globalUserSettings: globalUserSettings}, () => {
      writePersonalPreferences('globalUserSettings', globalUserSettings);
    });

    let labelString = name;
    if (!name) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'Global user settings',
      action: 'Change writer input',
      label: labelString
    });
  }

  changeStenoLayout(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = event.target.name;
    const value = event.target.value;

    newState['stenoLayout'] = value;

    this.setState({userSettings: newState}, () => {
      this.setupLesson();
      writePersonalPreferences('userSettings', this.state.userSettings);
    });

    let labelString = value;
    let actionString = 'Change steno layout';
    if (name === 'writerStenoLayout') { actionString = 'Change writer steno layout'; }
    if (!value) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: 'UserSettings',
      action: actionString,
      label: labelString
    });

    return value;
  }

  setupLesson(optionalAnnouncementMessage) {
    let newLesson = Object.assign({}, this.state.lesson);

    if ((typeof newLesson === 'object' && Object.entries(newLesson).length === 0 && newLesson.constructor === Object) || newLesson === null ) {
      newLesson = fallbackLesson;
    }

    newLesson.presentedMaterial = newLesson.sourceMaterial.map(line => ({...line}));
    if (this.state.revisionMode) {
      newLesson.presentedMaterial = this.state.revisionMaterial.map(line => ({...line}));
    }

    this.stopTimer();

    const parsedParams = queryString.parse(this.props.location.search);

    let newSettings = Object.assign({}, this.state.userSettings);
    let lookupTerm = parsedParams['q'];

    for (const [param, paramVal] of Object.entries(parsedParams)) {
      if (param in this.state.userSettings) {
        const booleanParams = [
          'blurMaterial',
          'caseSensitive',
          'simpleTypography',
          'retainedWords',
          'newWords',
          'showScoresWhileTyping',
          'showStrokes',
          'showStrokesAsDiagrams',
          'hideStrokesOnLastRepetition',
          'speakMaterial',
          'textInputAccessibility',
          'seenWords'
        ];

        if (booleanParams.includes(param)) {
          if (paramVal === "1") { newSettings[param] = true; }
          if (paramVal === "0") { newSettings[param] = false; }
        }

        const spacePlacementValidValues = [
          'spaceOff',
          'spaceBeforeOutput',
          'spaceAfterOutput',
          'spaceExact'
        ];

        if (param === 'spacePlacement' && spacePlacementValidValues.includes(paramVal)) {
          newSettings[param] = paramVal;
        }

        const sortOrderValidValues = [
          'sortOff',
          'sortNew',
          'sortOld',
          'sortRandom',
          'sortLongest',
          'sortShortest'
        ];

        if (param === 'sortOrder' && sortOrderValidValues.includes(paramVal)) {
          newSettings[param] = paramVal;
        }

        const studyValidValues = [
          'discover',
          'revise',
          'drill',
          'practice'
        ];

        if (param === 'study' && studyValidValues.includes(paramVal)) {
          newSettings[param] = paramVal;
        }

        const stenoLayoutValidValues = [
          'stenoLayoutAmericanSteno',
          'stenoLayoutPalantype',
          'stenoLayoutBrazilianPortugueseSteno',
          'stenoLayoutDanishSteno',
          'stenoLayoutItalianMichelaSteno',
          'stenoLayoutItalianMelaniSteno',
          'stenoLayoutJapanese',
          'stenoLayoutKoreanModernC',
          'stenoLayoutKoreanModernS'
        ];

        if (param === 'stenoLayout' && stenoLayoutValidValues.includes(paramVal)) {
          newSettings[param] = paramVal;
        }

        if ((param === 'repetitions' || param === 'limitNumberOfWords' || param === 'startFromWord') && isNormalInteger(paramVal)) {
          let paramValNumber = Number(paramVal);
          newSettings[param] = paramValNumber;
        }
      }
    }

    this.setState({
      lookupTerm: lookupTerm,
      userSettings: newSettings
    }, () => {
      writePersonalPreferences('userSettings', this.state.userSettings);

      let newHistory = Object.assign({}, this.props.location)
      newHistory.search = "";
      this.props.history.replace(newHistory);

      if (this.state.userSettings.simpleTypography) {
        newLesson.presentedMaterial = replaceSmartTypographyInPresentedMaterial.call(this, newLesson.presentedMaterial);
      }

      newLesson.presentedMaterial = filterByFamiliarity.call(this, newLesson.presentedMaterial, this.state.metWords, this.state.userSettings, this.state.revisionMode);

      newLesson.presentedMaterial = sortLesson.call(this, newLesson.presentedMaterial, this.state.metWords, this.state.userSettings);

      if (this.state.revisionMode && this.state.userSettings.limitNumberOfWords > 0) {
        newLesson.presentedMaterial = newLesson.presentedMaterial.slice(0, this.state.userSettings.limitNumberOfWords);
      }
      else if (this.state.revisionMode) {
        // Don't do anything to limit material if it's a revision lesson without limitNumberOfWords set
        // newLesson.presentedMaterial = newLesson.presentedMaterial.slice(0);
      }
      else if (this.state.userSettings.startFromWord > 0 && this.state.userSettings.limitNumberOfWords > 0) {
        let startFrom = this.state.userSettings.startFromWord - 1;
        newLesson.presentedMaterial = newLesson.presentedMaterial.slice(startFrom, startFrom + this.state.userSettings.limitNumberOfWords);
      }
      else if (this.state.userSettings.startFromWord > 0) {
        let startFrom = this.state.userSettings.startFromWord - 1;
        newLesson.presentedMaterial = newLesson.presentedMaterial.slice(startFrom);
      }
      else if (this.state.userSettings.limitNumberOfWords > 0) {
        newLesson.presentedMaterial = newLesson.presentedMaterial.slice(0, this.state.userSettings.limitNumberOfWords);
      }

      let reps = this.state.userSettings.repetitions;
      let repeatedLesson = newLesson.presentedMaterial;
      if (reps > 0) {
        for (let i = 1; i < reps && i < 30; i++) {
          repeatedLesson = repeatedLesson.concat(newLesson.presentedMaterial);
        }
      }
      newLesson.presentedMaterial = repeatedLesson;
      newLesson.newPresentedMaterial = new Zipper(repeatedLesson);

      let target = targetStrokeCount(newLesson.presentedMaterial[0] || { phrase: '', stroke: 'TK-LS' });

      let announcementMessage = 'Navigated to: ' + newLesson.title;
      if (optionalAnnouncementMessage) {
        announcementMessage = optionalAnnouncementMessage;
      }

      this.setState({
        actualText: ``,
        announcementMessage: announcementMessage,
        currentPhraseAttempts: [],
        currentLessonStrokes: [],
        disableUserSettings: false,
        numberOfMatchedChars: 0,
        previousCompletedPhraseAsTyped: '',
        repetitionsRemaining: reps,
        startTime: null,
        timer: null,
        targetStrokeCount: target,
        totalNumberOfMatchedChars: 0,
        totalNumberOfMatchedWords: 0,
        totalNumberOfNewWordsMet: 0,
        totalNumberOfLowExposuresSeen: 0,
        totalNumberOfRetainedWords: 0,
        totalNumberOfMistypedWords: 0,
        totalNumberOfHintedWords: 0,
        lesson: newLesson,
        currentPhraseID: 0
      }, () => {
        if (this.state.lesson.path && !this.state.lesson.path.endsWith("/lessons/custom") && !this.state.lesson.path.endsWith("/lessons/custom/setup")) {
          let lessonsProgress = this.updateLessonsProgress(this.state.lesson.path);
          let recentLessons = this.updateRecentLessons(this.state.lesson.path, this.state.userSettings.study);
          writePersonalPreferences('lessonsProgress', lessonsProgress);
          writePersonalPreferences('recentLessons', recentLessons);
        }
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

          const shouldUsePersonalDictionaries = this.state.personalDictionaries
            && Object.entries(this.state.personalDictionaries).length > 0
            && !!this.state.personalDictionaries.dictionariesNamesAndContents;

          this.fetchAndSetupGlobalDict(false, shouldUsePersonalDictionaries ? this.state.personalDictionaries : null).then(() => {
            let lessonWordsAndStrokes = generateListOfWordsAndStrokes(lesson['sourceMaterial'].map(i => i.phrase), this.state.globalLookupDictionary);
              lesson.sourceMaterial = lessonWordsAndStrokes;
              lesson.presentedMaterial = lessonWordsAndStrokes;
              lesson.newPresentedMaterial = new Zipper([lessonWordsAndStrokes]);

            this.setState({
              announcementMessage: 'Navigated to: ' + lesson.title,
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
        else {
          this.setState({
            announcementMessage: 'Navigated to: ' + lesson.title,
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
      announcementMessage: 'Navigated to: Custom',
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

  setAnnouncementMessage(app, content) {
    let newAnnouncementMessage = "";
    if (content) {
      if (typeof content === "string") {
        newAnnouncementMessage = content;
      // TODO: if we want to make this function generic for other announcement objects, here is the
      // start of a handler for that:
      } else if (typeof content === "object") {
        if (isElement(content)) {
          newAnnouncementMessage = content.querySelector('.tippy-tooltip-content').innerText;
        }
      }
      // newAnnouncementMessage = content.querySelector('.tippy-tooltip-content').innerText;
    }
    app.setState({announcementMessage: newAnnouncementMessage});

    // TODO: figure out how to re-announce things if the announcement hasn't
    // changed content but you've encountered a new instance of the same
    // content that should be announced
    // if (this.state.announcementMessage === newAnnouncementMessage) {
    //   app.setState({
    //     announcementSubsequentMessage: newAnnouncementMessage,
    //     announcementMessage: "",
    //   });
    // } else {
    //   app.setState({
    //     announcementMessage: newAnnouncementMessage,
    //     announcementSubsequentMessage: "",
    //   });
    // }
  }

  setAnnouncementMessageString(string) {
    this.setState({announcementMessage: string});
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
        this.setAnnouncementMessageString(nextRecommendedLesson.linkText);
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

        this.setAnnouncementMessageString(nextFlashcardsLesson.linkTitle);
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

    let currentPhraseAttempts = this.state.currentPhraseAttempts.map(copy => ({...copy}));

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
        Object.assign(newState, increaseMetWords.call(this, meetingsCount));
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

      let target = targetStrokeCount(nextItem || { phrase: '', stroke: 'TK-LS' });
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

  say(utterance) {
    let synth = window.speechSynthesis;
    utterance = utterance.replaceAll("—", "em dash");
    if (utterance === ",") { utterance = "comma"; }
    else if (utterance === ":") { utterance = "colon"; }
    else if (utterance === ".") { utterance = "full stop"; }
    else if (utterance === ")") { utterance = "closing bracket"; }
    else if (utterance === "!") { utterance = "exclamation mark"; }
    if (window.SpeechSynthesisUtterance) {
      let utterThis = new SpeechSynthesisUtterance(utterance);

      let lang = navigator.language || navigator.userLanguage;
      if (lang && (lang === "de" || lang.startsWith("de-")) && this.state.userSettings && this.state.userSettings.stenoLayout === "stenoLayoutPalantype") {
        try {
          utterThis.lang = lang;
        } catch (e) {
          console.log('Unable to set language to speak material', e);
        }
      }

      // No lang?
      // if (!utterThis.lang) {
      //   utterThis.lang = "en-US";
      // }

      // No voice?
      // if (!utterThis.voice) {
      //   let voices = synth.getVoices();
      //   if (voices && voices.length > 0) {
      //     utterThis.voice = voices[0];
      //   }
      // }

      // Debugging:
      // utterThis.onend = function (event) {
      //   console.log('SpeechSynthesisUtterance.onend called because utterance has finished being spoken and end event fired');
      // }
      // utterThis.onerror = function (event) {
      //   console.error('SpeechSynthesisUtterance.onerror called because utterance was prevented from being successfully spoken and error event fired');
      // }

      if (synth.speaking) {
        synth.cancel();
      }

      // TODO: scale the rate in proportion to:
      // A) words per minute and
      // B) length of word as a proxy for the time it takes to say a long word
      // Note: this likely has floating point math rounding errors.
      let wordsPerMinute = this.state.timer > 0 ? this.state.totalNumberOfMatchedWords/(this.state.timer/60/1000) : 0;
      wordsPerMinute > 100 ? utterThis.rate = 2 : utterThis.rate = 1;

      synth.speak(utterThis);
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
    let header = <Header
      fullscreen={this.state.fullscreen}
      restartLesson={this.restartLesson.bind(this)}
      lessonSubTitle={this.state.lesson.subtitle}
      lessonTitle={this.state.lesson.title}
      path={this.state.lesson.path}
      settings={this.state.lesson.settings}
      handleStopLesson={this.handleStopLesson.bind(this)}
    />

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
    let app = this;
      return (
        <div id="js-app" className="app">
          <Announcements message={this.state.announcementMessage} />
          <div className="flex flex-column justify-between min-vh-100">
            <div>
              <Switch>
                <Route exact={true} path="/" render={(props) =>
                  <div>
                    {header}
                    <DocumentTitle title='Typey Type for Stenographers'>
                      <AsyncHome
                        setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                        setAnnouncementMessageString={this.setAnnouncementMessageString.bind(this)}
                        {...props}
                      />
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route path="/support" render={ () =>
                  <div>
                    {header}
                    <DocumentTitle title={'Typey Type | About'}>
                      <ErrorBoundary>
                        <AsyncSupport
                          setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                          setAnnouncementMessageString={this.setAnnouncementMessageString.bind(this)}
                        />
                      </ErrorBoundary>
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route path="/writer" render={ (props) =>
                  <div>
                    {header}
                    <DocumentTitle title={'Typey Type | Writer'}>
                      <ErrorBoundary>
                        <AsyncWriter
                          changeStenoLayout={this.changeStenoLayout.bind(this)}
                          changeWriterInput={this.changeWriterInput.bind(this)}
                          setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                          setAnnouncementMessageString={this.setAnnouncementMessageString.bind(this)}
                          stenoHintsOnTheFly={stenohintsonthefly}
                          globalUserSettings={this.state.globalUserSettings}
                          userSettings={this.state.userSettings}
                          {...props}
                        />
                      </ErrorBoundary>
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route path="/games" render={ (props) =>
                  <div>
                    {header}
                    <DocumentTitle title={'Typey Type | Games'}>
                      <ErrorBoundary>
                        <AsyncGames
                          fetchAndSetupGlobalDict={this.fetchAndSetupGlobalDict.bind(this)}
                          globalLookupDictionary={this.state.globalLookupDictionary}
                          globalLookupDictionaryLoaded={this.state.globalLookupDictionaryLoaded}
                          startingMetWordsToday={this.state.startingMetWordsToday}
                          personalDictionaries={this.state.personalDictionaries}
                          updateMetWords={this.updateMetWords.bind(this)}
                          {...props}
                        />
                      </ErrorBoundary>
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route path="/break" render={ (props) =>
                  <div>
                    {header}
                    <DocumentTitle title={'Typey Type | Take a break'}>
                      <ErrorBoundary>
                        <AsyncBreak
                          setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                          setAnnouncementMessageString={this.setAnnouncementMessageString.bind(this)}
                          {...props}
                        />
                      </ErrorBoundary>
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route path="/contribute" render={ () =>
                  <div>
                    {header}
                    <DocumentTitle title={'Typey Type | Contribute'}>
                      <ErrorBoundary>
                        <AsyncContribute
                          setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                          setAnnouncementMessageString={this.setAnnouncementMessageString.bind(this)}
                        />
                      </ErrorBoundary>
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route path="/progress" render={ () =>
                  <div>
                    {header}
                    <DocumentTitle title={'Typey Type | Progress'}>
                      <ErrorBoundary>
                        <AsyncProgress
                          calculateSeenWordCount={calculateSeenWordCount.bind(this)}
                          calculateMemorisedWordCount={calculateMemorisedWordCount.bind(this)}
                          changeFlashcardCourseLevel={this.changeFlashcardCourseLevel.bind(this)}
                          setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                          setAnnouncementMessageString={this.setAnnouncementMessageString.bind(this)}
                          setPersonalPreferences={this.setPersonalPreferences.bind(this)}
                          metWords={this.state.metWords}
                          flashcardsMetWords={this.state.flashcardsMetWords}
                          flashcardsProgress={this.state.flashcardsProgress}
                          flashcardsNextLesson={this.state.flashcardsNextLesson}
                          globalUserSettings={this.state.globalUserSettings}
                          recommendationHistory={this.state.recommendationHistory}
                          recommendedNextLesson={this.state.recommendedNextLesson}
                          lessonsProgress={this.state.lessonsProgress}
                          lessonIndex={this.state.lessonIndex}
                          recentLessonHistory={this.state.recentLessons.history}
                          startingMetWordsToday={this.state.startingMetWordsToday}
                          updateFlashcardsRecommendation={this.updateFlashcardsRecommendation.bind(this)}
                          updateRecommendationHistory={this.updateRecommendationHistory.bind(this)}
                          updateStartingMetWordsAndCounts={this.updateStartingMetWordsAndCounts.bind(this)}
                          updateUserGoals={this.updateUserGoals.bind(this)}
                          updateUserGoalsUnveiled={this.updateUserGoalsUnveiled.bind(this)}
                          userGoals={this.state.userGoals}
                          userSettings={this.state.userSettings}
                          oldWordsGoalUnveiled={this.state.oldWordsGoalUnveiled}
                          newWordsGoalUnveiled={this.state.newWordsGoalUnveiled}
                          yourSeenWordCount={this.state.yourSeenWordCount}
                          yourMemorisedWordCount={this.state.yourMemorisedWordCount}
                        />
                      </ErrorBoundary>
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route path="/flashcards" render={ () =>
                  <div>
                    {header}
                    <DocumentTitle title={'Typey Type | Flashcards'}>
                      <AsyncFlashcards
                        changeFullscreen={this.changeFullscreen.bind(this)}
                        fetchAndSetupGlobalDict={this.fetchAndSetupGlobalDict.bind(this)}
                        flashcardsMetWords={this.state.flashcardsMetWords}
                        flashcardsProgress={this.state.flashcardsProgress}
                        fullscreen={this.state.fullscreen}
                        globalLookupDictionary={this.state.globalLookupDictionary}
                        globalLookupDictionaryLoaded={this.state.globalLookupDictionaryLoaded}
                        globalUserSettings={this.state.globalUserSettings}
                        lessonpath="flashcards"
                        locationpathname={this.props.location.pathname}
                        personalDictionaries={this.state.personalDictionaries}
                        stenoHintsOnTheFly={stenohintsonthefly}
                        updateFlashcardsMetWords={this.updateFlashcardsMetWords.bind(this)}
                        updateFlashcardsProgress={this.updateFlashcardsProgress.bind(this)}
                        updateGlobalLookupDictionary={this.updateGlobalLookupDictionary.bind(this)}
                        updatePersonalDictionaries={this.updatePersonalDictionaries.bind(this)}
                        userSettings={this.state.userSettings}
                      />
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route path="/lookup" render={ (props) =>
                  <div>
                    {header}
                    <DocumentTitle title={'Typey Type | Lookup'}>
                      <ErrorBoundary>
                        <AsyncLookup
                          setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                          setAnnouncementMessageString={this.setAnnouncementMessageString.bind(this)}
                          fetchAndSetupGlobalDict={this.fetchAndSetupGlobalDict.bind(this)}
                          globalLookupDictionary={this.state.globalLookupDictionary}
                          globalLookupDictionaryLoaded={this.state.globalLookupDictionaryLoaded}
                          globalUserSettings={this.state.globalUserSettings}
                          lookupTerm={this.state.lookupTerm}
                          personalDictionaries={this.state.personalDictionaries}
                          stenoHintsOnTheFly={stenohintsonthefly}
                          updateGlobalLookupDictionary={this.updateGlobalLookupDictionary.bind(this)}
                          updatePersonalDictionaries={this.updatePersonalDictionaries.bind(this)}
                          userSettings={this.state.userSettings}
                          {...props}
                        />
                      </ErrorBoundary>
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route path="/dictionaries" render={ (props) =>
                  <div>
                    {header}
                    <DocumentTitle title={'Typey Type | Dictionaries'}>
                      <ErrorBoundary>
                        <AsyncDictionaries
                          setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                          setAnnouncementMessageString={this.setAnnouncementMessageString.bind(this)}
                          setDictionaryIndex={this.setDictionaryIndex.bind(this)}
                          setGlobalDictionaryLoaded={this.setGlobalDictionaryLoaded.bind(this)}
                          fetchAndSetupGlobalDict={this.fetchAndSetupGlobalDict.bind(this)}
                          globalLookupDictionary={this.state.globalLookupDictionary}
                          globalLookupDictionaryLoaded={this.state.globalLookupDictionaryLoaded}
                          globalUserSettings={this.state.globalUserSettings}
                          personalDictionaries={this.state.personalDictionaries}
                          stenoHintsOnTheFly={stenohintsonthefly}
                          toggleExperiment={this.toggleExperiment.bind(this)}
                          updateGlobalLookupDictionary={this.updateGlobalLookupDictionary.bind(this)}
                          updatePersonalDictionaries={this.updatePersonalDictionaries.bind(this)}
                          userSettings={this.state.userSettings}
                          dictionaryIndex={this.state.dictionaryIndex}
                          {...props}
                        />
                      </ErrorBoundary>
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route path="/lessons" render={ (props) =>
                  <div>
                    {header}
                    <DocumentTitle title={'Typey Type | Lessons'}>
                      <ErrorBoundary>
                        <Lessons
                          customLesson={this.state.customLesson}
                          customLessonMaterial={this.state.customLessonMaterial}
                          customLessonMaterialValidationState={this.state.customLessonMaterialValidationState}
                          customLessonMaterialValidationMessages={this.state.customLessonMaterialValidationMessages}
                          updateFlashcardsMetWords={this.updateFlashcardsMetWords.bind(this)}
                          updateFlashcardsProgress={this.updateFlashcardsProgress.bind(this)}
                          flashcardsMetWords={this.state.flashcardsMetWords}
                          flashcardsProgress={this.state.flashcardsProgress}
                          fetchAndSetupGlobalDict={this.fetchAndSetupGlobalDict.bind(this)}
                          globalLookupDictionary={this.state.globalLookupDictionary}
                          globalLookupDictionaryLoaded={this.state.globalLookupDictionaryLoaded}
                          globalUserSettings={this.state.globalUserSettings}
                          personalDictionaries={this.state.personalDictionaries}
                          updateGlobalLookupDictionary={this.updateGlobalLookupDictionary.bind(this)}
                          updatePersonalDictionaries={this.updatePersonalDictionaries.bind(this)}
                          lessonsProgress={this.state.lessonsProgress}
                          lessonNotFound={this.state.lessonNotFound}
                          fullscreen={this.state.fullscreen}
                          changeFullscreen={this.changeFullscreen.bind(this)}
                          restartLesson={this.restartLesson.bind(this)}
                          reviseLesson={this.reviseLesson.bind(this)}
                          lessonSubTitle={this.state.lesson.subtitle}
                          lessonTitle={this.state.lesson.title}
                          path={this.state.lesson.path}
                          handleStopLesson={this.handleStopLesson.bind(this)}
                          lessonIndex={this.state.lessonIndex}
                          lesson={this.state.lesson}
                          handleLesson={this.handleLesson.bind(this)}
                          actualText={this.state.actualText}
                          changeShowStrokesInLesson={this.changeShowStrokesInLesson.bind(this)}
                          changeShowStrokesOnMisstroke={this.changeShowStrokesOnMisstroke.bind(this)}
                          changeSortOrderUserSetting={this.changeSortOrderUserSetting.bind(this)}
                          changeSpacePlacementUserSetting={this.changeSpacePlacementUserSetting.bind(this)}
                          changeStenoLayout={this.changeStenoLayout.bind(this)}
                          changeShowScoresWhileTyping={this.changeShowScoresWhileTyping.bind(this)}
                          changeShowStrokesAs={this.changeShowStrokesAs.bind(this)}
                          changeUserSetting={this.changeUserSetting.bind(this)}
                          chooseStudy={this.chooseStudy.bind(this)}
                          completedPhrases={completedMaterial}
                          createCustomLesson={this.createCustomLesson.bind(this)}
                          currentLessonStrokes={this.state.currentLessonStrokes}
                          currentPhraseID={this.state.currentPhraseID}
                          currentPhrase={presentedMaterialCurrentItem.phrase}
                          currentStroke={presentedMaterialCurrentItem.stroke}
                          disableUserSettings={this.state.disableUserSettings}
                          handleBeatsPerMinute={this.handleBeatsPerMinute.bind(this)}
                          handleDiagramSize={this.handleDiagramSize.bind(this)}
                          handleLimitWordsChange={this.handleLimitWordsChange.bind(this)}
                          handleStartFromWordChange={this.handleStartFromWordChange.bind(this)}
                          handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
                          handleUpcomingWordsLayout={this.handleUpcomingWordsLayout.bind(this)}
                          metWords={this.state.metWords}
                          previousCompletedPhraseAsTyped={this.state.previousCompletedPhraseAsTyped}
                          recommendationHistory={this.state.recommendationHistory}
                          repetitionsRemaining={this.state.repetitionsRemaining}
                          revisionMaterial={this.state.revisionMaterial}
                          revisionMode={this.state.revisionMode}
                          updateRevisionMaterial={this.updateRevisionMaterial.bind(this)}
                          sayCurrentPhraseAgain={this.sayCurrentPhraseAgain.bind(this)}
                          setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                          setAnnouncementMessageString={this.setAnnouncementMessageString.bind(this)}
                          startFromWordOne={this.startFromWordOne.bind(this)}
                          startTime={this.state.startTime}
                          stenoHintsOnTheFly={stenohintsonthefly}
                          stopLesson={this.stopLesson.bind(this)}
                          startCustomLesson={this.startCustomLesson.bind(this)}
                          setUpProgressRevisionLesson={this.setUpProgressRevisionLesson.bind(this)}
                          setupLesson={this.setupLesson.bind(this)}
                          settings={this.state.lesson.settings}
                          showStrokesInLesson={this.state.showStrokesInLesson}
                          targetStrokeCount={this.state.targetStrokeCount}
                          timer={this.state.timer}
                          topSpeedPersonalBest={this.state.topSpeedPersonalBest}
                          updateUserGoals={this.state.updateUserGoals}
                          charsPerWord={this.charsPerWord}
                          totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
                          totalNumberOfNewWordsMet={this.state.totalNumberOfNewWordsMet}
                          totalNumberOfLowExposuresSeen={this.state.totalNumberOfLowExposuresSeen}
                          totalNumberOfRetainedWords={this.state.totalNumberOfRetainedWords}
                          totalNumberOfMistypedWords={this.state.totalNumberOfMistypedWords}
                          totalNumberOfHintedWords={this.state.totalNumberOfHintedWords}
                          totalWordCount={stateLesson.presentedMaterial.length}
                          upcomingPhrases={upcomingMaterial}
                          updateRecommendationHistory={this.updateRecommendationHistory.bind(this)}
                          updateMarkup={this.updateMarkup.bind(this)}
                          updateTopSpeedPersonalBest={this.updateTopSpeedPersonalBest.bind(this)}
                          userSettings={this.state.userSettings}
                          {...props}
                        />
                      </ErrorBoundary>
                    </DocumentTitle>
                  </div>
                  }
                />
                <Route render={ (props) =>
                  <div>
                    <DocumentTitle title={'Typey Type | Page not found'}>
                      <AsyncPageNotFound
                        setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                      />
                    </DocumentTitle>
                  </div>
                  }
                />
              </Switch>
            </div>
            <Footer
              fullscreen={this.state.fullscreen}
              setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
            />
          </div>
        </div>
      );
  }
}

function increaseMetWords(meetingsCount) {
  let newState = {};

  if (meetingsCount === 0) {
    // console.log("meetingsCount = 0;");
    newState.totalNumberOfNewWordsMet = this.state.totalNumberOfNewWordsMet + 1;
  }
  else if (meetingsCount >= 1 && meetingsCount <= 29) {
    // console.log("meetingsCount 1–29;");
    newState.totalNumberOfLowExposuresSeen = this.state.totalNumberOfLowExposuresSeen + 1;
  }
  else if (meetingsCount >= 30) {
    // console.log("meetingsCount&gt;30;");
    newState.totalNumberOfRetainedWords = this.state.totalNumberOfRetainedWords + 1;
  }
  return newState;
}

function replaceSmartTypographyInPresentedMaterial(presentedMaterial, userSettings = this.state.userSettings) {
  if (userSettings.simpleTypography) {
    let presentedMaterialLength = presentedMaterial.length;
    for (let i = 0; i < presentedMaterialLength; i++) {

      // dashes: em dash, en dash, non-breaking hyphen, mongolian soft hyphen, double hyphen
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[—–‑᠆⹀]/g, "-", /^(EPL\/TKA\*RB|TPH-RB|PH-RB)$/, 'H-PB');

      // curly single quote
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[‘’]/g, "'", /^(TP-P|TP-L)$/, 'AE');

      // ellipsis
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[…]/g, "...", /^SKWR-RBGSZ$/, 'HR-PS');

      // grave used as left single quote
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[`]/g, "'", /^(TR\*RL|TR-RL|KH-FG|KH\*FG)$/, 'A*E');

      // curly left double quote
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[“]/g, '"', /^KW-GS$/, 'KW-GS');

      // curly right double quote
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[”]/g, '"', /^KR-GS$/, 'KR-GS');

      // æ
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[æ]/g, 'ae', /^XXX$/, 'A*/*E');

      // Æ
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[Æ]/g, 'Ae', /^XXX$/, 'A*P/*E');

      // ë
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[ë]/g, 'e', /^XXX$/, '*E');
    }
  }
  return presentedMaterial;
}

function replaceSmartTypographyInPhraseAndStroke(presentedMaterialItem, smartTypographyRegex, dumbTypographyChar, smartTypographyStrokesRegex, dumbTypographyStroke) {
  if (presentedMaterialItem.phrase.match(smartTypographyRegex)) {
    presentedMaterialItem.phrase = presentedMaterialItem.phrase.replace(smartTypographyRegex, dumbTypographyChar);
    presentedMaterialItem.stroke = presentedMaterialItem.stroke.split(' ').map(stroke => {
      return stroke.replace(smartTypographyStrokesRegex, dumbTypographyStroke);
    }).join(' ');

    // by keeping this inside this function and only after matching on unusual hyphens or dashes, we don't replace people's preferred hyphen stroke for normal hyphens
    if (presentedMaterialItem.phrase === '-' && presentedMaterialItem.stroke === 'XXX') { presentedMaterialItem.stroke = 'H-PB'; }
  }
}

function sortLesson(presentedMaterial, met, userSettings) {
  if (userSettings.sortOrder === 'sortRandom') {
    return randomise(presentedMaterial);
  }
  else if ((userSettings.sortOrder === 'sortNew') || (userSettings.sortOrder === 'sortOld')) {

    let spaceBefore = "";
    let spaceAfter = "";
    if (userSettings && userSettings.spacePlacement && userSettings.spacePlacement === "spaceBeforeOutput" ) { spaceBefore = " "; }
    if (userSettings && userSettings.spacePlacement && userSettings.spacePlacement === "spaceAfterOutput" ) { spaceAfter = " "; }

    presentedMaterial.sort(function(a, b) {
      let seenA = met[spaceBefore + a.phrase + spaceAfter] || 0;
      let seenB = met[spaceBefore + b.phrase + spaceAfter] || 0;
      return userSettings.sortOrder === 'sortNew' ? seenA - seenB : seenB - seenA;
    });
  }
  else if (userSettings.sortOrder === 'sortShortest') {
    presentedMaterial.sort((a, b) => {
      const aLength = [...a.phrase].length;
      const bLength = [...b.phrase].length;
      return aLength < bLength ? -1 : aLength > bLength ? 1 : 0;
    });
  }
  else if (userSettings.sortOrder === 'sortLongest') {
    presentedMaterial.sort((a, b) => {
      const aLength = [...a.phrase].length;
      const bLength = [...b.phrase].length;
      return bLength < aLength ? -1 : bLength > aLength ? 1 : 0;
    });
  }
  return presentedMaterial;
}

export default App;
export {increaseMetWords, sortLesson, replaceSmartTypographyInPresentedMaterial};
