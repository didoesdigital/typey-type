import React, { Component } from 'react';
import { isLessonTextValid } from './utils/utils';
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
import describePunctuation, { punctuationDescriptions } from "./utils/describePunctuation";
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
      isPloverDictionaryLoaded: false,
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
      yourSeenWordCount: calculateSeenWordCount(metWordsFromStorage),
      yourMemorisedWordCount: calculateMemorisedWordCount(metWordsFromStorage)
    };
  }

  componentDidMount() {
    this.setPersonalPreferences();
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

    writePersonalPreferences('metWords', this.state.metWords);

    if (this.state.lesson.path && !this.state.lesson.path.endsWith("/lessons/custom")) {
      let lessonsProgress = this.updateLessonsProgress(this.state.lesson.path, this.state.lesson, this.props.userSettings, this.state.lessonsProgress);
      writePersonalPreferences('lessonsProgress', lessonsProgress);
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

    let calculatedYourSeenWordCount = calculateSeenWordCount(this.state.metWords);
    let calculatedYourMemorisedWordCount = calculateMemorisedWordCount(this.state.metWords);

    this.setState({
      lessonsProgress: lessonsProgressState,
      metWords: metWordsFromStateOrArg,
      yourSeenWordCount: calculatedYourSeenWordCount,
      yourMemorisedWordCount: calculatedYourMemorisedWordCount,
    }, () => {
      writePersonalPreferences('lessonsProgress', this.state.lessonsProgress);
      writePersonalPreferences('metWords', this.state.metWords);
      this.setupLesson();
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

  updateStartingMetWordsAndCounts(providedMetWords) {
    this.setState({
      startingMetWordsToday: providedMetWords,
      yourSeenWordCount: calculateSeenWordCount(providedMetWords),
      yourMemorisedWordCount: calculateMemorisedWordCount(providedMetWords)
    });
  }

  // set user settings
  setUpProgressRevisionLesson(metWordsFromStorage, userSettings, newSeenOrMemorised) {
    let lesson = {};
    // let stenoLayout = "stenoLayoutAmericanSteno";
    // if (this.props.userSettings) { stenoLayout = this.props.userSettings.stenoLayout; }

    const loadPlover = userSettings.showStrokesAsList ? true : false;

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
    const revisionMode = this.props.revisionMode;
    const revisionMaterial = this.state.revisionMaterial;
    const userSettings = this.props.userSettings;
    const lessonPath = this.state.lesson.path;
    let newLesson = Object.assign({}, this.state.lesson);
    const prevLessonsProgress = this.state.lessonsProgress;

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
    newLesson.presentedMaterial = filterByFamiliarity.call(this, newLesson.presentedMaterial, this.state.metWords, userSettings, revisionMode);

    // Sort lesson:
    newLesson.presentedMaterial = sortLesson.call(this, newLesson.presentedMaterial, this.state.metWords, userSettings);

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
      const lessonsProgress = this.updateLessonsProgress(lessonPath, newLesson, userSettings, prevLessonsProgress);
      writePersonalPreferences('lessonsProgress', lessonsProgress);
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
      showStrokesInLesson: false,
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
  }

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

          const loadPlover = this.props.userSettings.showStrokesAsList ? true : false;

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
        else if (this.props.userSettings.showStrokesAsList) {
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

  reviseLesson(event, newRevisionMaterial) {
    event.preventDefault();
    this.setState({
      revisionMaterial: newRevisionMaterial,
    }, () => {
      this.stopLesson();
      this.setupLesson();
    });
    this.restartLesson(event);
  }

  restartLesson(event) {
    event.preventDefault();
    this.setState({
      currentPhraseID: 0,
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


  markupBuffer = [];
  updateBufferTimer = null;

  updateMarkup(event) {
    let actualText = event.target.value;
    // TODO: once we're happy that this will be the permanent new default behaviour, remove all the `batchUpdate`-specific branching code and tests:
    // const batchUpdate = document.cookie.indexOf("batchUpdate=1")>=0;
    const batchUpdate = true;
    if(!batchUpdate) {
      this.updateBufferSingle(actualText);
      return;
    }
    // Immediately update the text in the input field
    this.setState({ actualText });
    this.markupBuffer.push({text: actualText, time: Date.now()});

    if (this.updateBufferTimer) {
      clearTimeout(this.updateBufferTimer);
    }
    this.updateBufferTimer = setTimeout(() => {
      const buffer = this.markupBuffer;
      this.markupBuffer = [];
      this.updateBufferSingle(null, buffer);
    }, this.bufferIntervalMillis());
  }

  bufferIntervalMillis() {
    return 16; // 60 fps
  }

  updateBufferSingle(actualText, buffer) {
    let time = Date.now();
    if (buffer) {
      const latest = buffer[buffer.length - 1];
      actualText = latest.text;
      time = latest.time;
    }
    // Start timer on first key stroke
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
    let [matchedChars, unmatchedChars, matchedActual, unmatchedActual] =
      matchSplitText(this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase, actualText, this.state.lesson.settings, this.props.userSettings);

    if (this.state.lesson.settings.ignoredChars) {
      matchedChars = removeIgnoredCharsFromSplitText(matchedChars, this.state.lesson.settings.ignoredChars);
      unmatchedChars = removeIgnoredCharsFromSplitText(unmatchedChars, this.state.lesson.settings.ignoredChars);
    }

    const [numberOfMatchedChars, numberOfUnmatchedChars] = [matchedChars, unmatchedChars].map(text => text.length);

    // @ts-ignore this should be ok when currentPhraseAttempts is typed correctly instead of never[]
    const currentPhraseAttempts = this.state.currentPhraseAttempts.map(copy => ({...copy}));

    if (buffer) {
      // Assuming a single buffer contains inputs from one stroke, peaks are always at the end of buffer. (i.e. steno can either keep typing or backspace first and then keep typing) Since currentPhraseAttempts is only used to calculate attempts and its logic is to use peaks or the last strokes, it's safe to push elements that lacks `numberOfMatchedWordsSoFar` and `hintWasShown` into `currentPhraseAttempts`.
      currentPhraseAttempts.push(...buffer.slice(0, -1));
    }
    currentPhraseAttempts.push({
      text: actualText,
      time: time,
      numberOfMatchedWordsSoFar: (this.state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
      hintWasShown: shouldShowStroke(this.state.showStrokesInLesson, this.props.userSettings.showStrokes, this.state.repetitionsRemaining, this.props.userSettings.hideStrokesOnLastRepetition)
    });

    const newState = {
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
    };
    // NOTE: here is where attempts are defined before being pushed with completed phrases
    const phraseMisstrokes = strokeAccuracy(
      buffer ? currentPhraseAttempts : this.state.currentPhraseAttempts,
      buffer ? getTargetObservableStrokeCount(this.state.lesson.presentedMaterial[this.state.currentPhraseID]) : this.state.targetStrokeCount,
      unmatchedActual,
      !!buffer
    );
    const accurateStroke = phraseMisstrokes.strokeAccuracy; // false
    const attempts = phraseMisstrokes.attempts; // [" sign", " ss"]

    if (!accurateStroke && !this.state.showStrokesInLesson && this.props.userSettings.showStrokesOnMisstroke) {
      this.setState({showStrokesInLesson: true});
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
      newState.currentPhraseAttempts = []; // reset for next word
      newState.currentLessonStrokes = this.state.currentLessonStrokes; // [{word: "cat", attempts: ["cut"], stroke: "KAT"}, {word: "sciences", attempts ["sign", "ss"], stroke: "SAOEUPB/EPBC/-S"]

      const strokeHintShown = shouldShowStroke(this.state.showStrokesInLesson, this.props.userSettings.showStrokes, this.state.repetitionsRemaining, this.props.userSettings.hideStrokesOnLastRepetition);

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
        time: time
      });
      // can these newState assignments be moved down below the scores assignments?

      if (strokeHintShown) { newState.totalNumberOfHintedWords = this.state.totalNumberOfHintedWords + 1; }

      if (!accurateStroke) { newState.totalNumberOfMistypedWords = this.state.totalNumberOfMistypedWords + 1; }

      if (!strokeHintShown && accurateStroke) {
        // Use the original text when recording to preserve case and spacing
        const phraseText = this.props.userSettings.spacePlacement === 'spaceBeforeOutput'
          ? ' ' + this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase
          : this.props.userSettings.spacePlacement === 'spaceAfterOutput'
          ? this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase + ' '
          : this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase;

        const meetingsCount = newState.metWords[phraseText] || 0;
        Object.assign(newState, increaseMetWords(meetingsCount, this.state.totalNumberOfNewWordsMet, this.state.totalNumberOfLowExposuresSeen, this.state.totalNumberOfRetainedWords));
        newState.metWords[phraseText] = meetingsCount + 1;
      }

      if (this.props.userSettings.speakMaterial) {
        const remaining = this.state.lesson.newPresentedMaterial.getRemaining();
        if (remaining && remaining.length > 0 && remaining[0].hasOwnProperty('phrase')) {
          this.say(remaining[0].phrase);
        }
      }

      const nextPhraseID = this.state.currentPhraseID + 1;
      let nextItem = this.state.lesson.presentedMaterial[nextPhraseID];

      if (!!nextItem && this.state.lesson?.presentedMaterial?.[this.state.currentPhraseID]?.phrase) {
        const lastWord = this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase;
        nextItem = updateCapitalisationStrokesInNextItem(nextItem, lastWord);
      }

      newState.targetStrokeCount = getTargetStrokeCount(nextItem || { phrase: '', stroke: 'TK-LS' });
      this.state.lesson.newPresentedMaterial.visitNext();

      newState.repetitionsRemaining = repetitionsRemaining(this.props.userSettings, this.state.lesson.presentedMaterial, this.state.currentPhraseID + 1);
      newState.totalNumberOfMatchedChars = this.state.totalNumberOfMatchedChars + numberOfMatchedChars;
      newState.previousCompletedPhraseAsTyped = actualText;
      newState.actualText = buffer ? unmatchedActual : '';
      newState.showStrokesInLesson = false;
      newState.currentPhraseID = nextPhraseID;

      newState.yourSeenWordCount = calculateSeenWordCount(this.state.metWords);
      newState.yourMemorisedWordCount = calculateMemorisedWordCount(this.state.metWords);
    }

    this.setState(newState, () => {
      if (this.isFinished()) {
        this.stopLesson();
      } else if (buffer && proceedToNextWord && unmatchedActual.length > 0) {
        // Repetitively apply buffer with already accepted phrases excluded
        const newBuffer = buffer
          .filter(stroke => stroke.text.length > matchedActual.length && stroke.text.startsWith(matchedActual))
          .map(stroke => ({ text: stroke.text.slice(matchedActual.length), time: stroke.time }));
        this.updateBufferSingle(null, newBuffer);
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

        const preferredVoiceURI = this.props.userSettings.voiceURI;
        const preferredVoiceName = this.props.userSettings.voiceName;
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
          if (lang && (lang === "de" || lang.startsWith("de-")) && this.props.userSettings?.stenoLayout === "stenoLayoutPalantype") {
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
    if (this.props.userSettings.speakMaterial) {
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

    let stenohintsonthefly = this.props.globalUserSettings?.experiments && !!this.props.globalUserSettings?.experiments?.stenohintsonthefly;

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
              handleStopLesson: this.handleStopLesson.bind(this),
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
                stenohintsonthefly,
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
