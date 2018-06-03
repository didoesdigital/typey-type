import React, { Component } from 'react';
import { randomise } from './utils';
import {
  parseCustomMaterial,
  fetchLessonIndex,
  setupLessonProgress,
  getLesson,
  loadPersonalPreferences,
  matchSplitText,
  parseLesson,
  repetitionsRemaining,
  shouldShowStroke,
  strokeAccuracy,
  targetStrokeCount,
  writePersonalPreferences
} from './typey-type';
import {
  Route,
  Switch
} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import Announcements from './Announcements';
import Lessons from './Lessons';
import Home from './Home';
import Header from './Header';
import Support from './Support';
import Contribute from './Contribute';
import Progress from './Progress';
import Flashcards from './Flashcards';
import PageNotFound from './PageNotFound';
import Footer from './Footer';
import Zipper from './zipper';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      announcementMessage: null,
      value: '',
      currentPhraseAttempts: [],
      currentPhraseID: 0,
      currentLessonStrokes: [],
      actualText: ``,
      flashcardsMetWords: {
        "the": {
          phrase: "the",
          stroke: "-T",
          rung: 0,
        },
      },
      lessonsProgress: {
      },
      flashcardsProgress: {
      },
      fullscreen: false,
      hideOtherSettings: true,
      nextLessonPath: '',
      repetitionsRemaining: 1,
      startTime: null,
      showStrokesInLesson: false,
      timer: null,
      totalNumberOfMatchedWords: 0,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0,
      totalNumberOfNewWordsMet: 0,
      totalNumberOfLowExposuresSeen: 0,
      totalNumberOfRetainedWords: 0,
      totalNumberOfMistypedWords: 0,
      totalNumberOfHintedWords: 0,
      disableUserSettings: false,
      metWords: {
        '.': 0
      },
      revisionMode: false,
      userSettings: {
        caseSensitive: false,
        retainedWords: true,
        limitNumberOfWords: 45,
        newWords: true,
        repetitions: 3,
        showStrokes: true,
        hideStrokesOnLastRepetition: true,
        spacePlacement: 'spaceOff',
        sortOrder: 'sortOff',
        seenWords: true,
        study: 'discover'
      },
      lesson: {
        sourceMaterial: [
          {phrase: 'The', stroke: '-T'},
          {phrase: 'process', stroke: 'PROEUS'},
          {phrase: 'of', stroke: '-F'},
          {phrase: 'writing', stroke: 'WREUG'},
          {phrase: 'shorthand', stroke: 'SHORT/HA*PBD'},
          {phrase: 'is', stroke: 'S'},
          {phrase: 'called', stroke: 'KAULD'},
          {phrase: 'stenography.', stroke: 'STEPB/TKPWRAEF TP-PL'},
          {phrase: 'It\'s', stroke: 'T-S'},
          {phrase: 'typed', stroke: 'TAOEUPD'},
          {phrase: 'with a', stroke: 'WA*EU'},
          {phrase: 'stenotype', stroke: 'STEPB/TAOEUP'},
          {phrase: 'or', stroke: 'OR'},
          {phrase: 'fancy', stroke: 'TPAPB/SEU'},
          {phrase: 'keyboard.', stroke: 'KAOEBD TP-PL'},
          {phrase: 'You can', stroke: 'KU'},
          {phrase: 'transcribe,', stroke: 'TREUB KW-BG'},
          {phrase: 'caption,', stroke: 'KAPGS KW-BG'},
          {phrase: 'dictate,', stroke: 'TKEUBG/TAEUT KW-BG'},
          {phrase: 'code,', stroke: 'KOED KW-BG'},
          {phrase: 'chat,', stroke: 'KHAT KW-BG'},
          {phrase: 'or', stroke: 'OR'},
          {phrase: 'write', stroke: 'WREU'},
          {phrase: 'prose', stroke: 'PROES'},
          {phrase: 'at', stroke: 'AT'},
          {phrase: 'over', stroke: 'OEFR'},
          {phrase: '200', stroke: '#T-Z'},
          {phrase: 'words', stroke: 'WORDZ'},
          {phrase: 'per', stroke: 'PER'},
          {phrase: 'minute.', stroke: 'PHEUPB TP-PL'},
          {phrase: 'Typey type', stroke: 'TAOEUP/KWREU TAOEUP'},
          {phrase: 'uses', stroke: 'AOUFS'},
          {phrase: 'spaced', stroke: 'SPAEUFD'},
          {phrase: 'repetitions', stroke: 'REP/TEUGS/-S'},
          {phrase: 'and', stroke: 'SKP'},
          {phrase: 'hundreds', stroke: 'HUPBS'},
          {phrase: 'of', stroke: '-F'},
          {phrase: 'lessons', stroke: 'HROEFPBS'},
          {phrase: 'to', stroke: 'TO'},
          {phrase: 'help', stroke: 'HEP'},
          {phrase: 'you', stroke: 'U'},
          {phrase: 'master', stroke: 'PHAFRT'},
          {phrase: 'typing', stroke: 'TAOEUPG'},
          {phrase: 'with', stroke: 'W'},
          {phrase: 'stenography.', stroke: 'STEPB/TKPWRAEF TP-PL'}
        ],
        presentedMaterial: [
          {phrase: 'The', stroke: '-T'},
          {phrase: 'process', stroke: 'PROEUS'},
          {phrase: 'of', stroke: '-F'},
          {phrase: 'writing', stroke: 'WREUG'},
          {phrase: 'shorthand', stroke: 'SHORT/HA*PBD'},
          {phrase: 'is', stroke: 'S'},
          {phrase: 'called', stroke: 'KAULD'},
          {phrase: 'stenography.', stroke: 'STEPB/TKPWRAEF TP-PL'},
          {phrase: 'It\'s', stroke: 'T-S'},
          {phrase: 'typed', stroke: 'TAOEUPD'},
          {phrase: 'with a', stroke: 'WA*EU'},
          {phrase: 'stenotype', stroke: 'STEPB/TAOEUP'},
          {phrase: 'or', stroke: 'OR'},
          {phrase: 'fancy', stroke: 'TPAPB/SEU'},
          {phrase: 'keyboard.', stroke: 'KAOEBD TP-PL'},
          {phrase: 'You can', stroke: 'KU'},
          {phrase: 'transcribe,', stroke: 'TREUB KW-BG'},
          {phrase: 'caption,', stroke: 'KAPGS KW-BG'},
          {phrase: 'dictate,', stroke: 'TKEUBG/TAEUT KW-BG'},
          {phrase: 'code,', stroke: 'KOED KW-BG'},
          {phrase: 'chat,', stroke: 'KHAT KW-BG'},
          {phrase: 'or', stroke: 'OR'},
          {phrase: 'write', stroke: 'WREU'},
          {phrase: 'prose', stroke: 'PROES'},
          {phrase: 'at', stroke: 'AT'},
          {phrase: 'over', stroke: 'OEFR'},
          {phrase: '200', stroke: '#T-Z'},
          {phrase: 'words', stroke: 'WORDZ'},
          {phrase: 'per', stroke: 'PER'},
          {phrase: 'minute.', stroke: 'PHEUPB TP-PL'},
          {phrase: 'Typey type', stroke: 'TAOEUP/KWREU TAOEUP'},
          {phrase: 'uses', stroke: 'AOUFS'},
          {phrase: 'spaced', stroke: 'SPAEUFD'},
          {phrase: 'repetitions', stroke: 'REP/TEUGS/-S'},
          {phrase: 'and', stroke: 'SKP'},
          {phrase: 'hundreds', stroke: 'HUPBS'},
          {phrase: 'of', stroke: '-F'},
          {phrase: 'lessons', stroke: 'HROEFPBS'},
          {phrase: 'to', stroke: 'TO'},
          {phrase: 'help', stroke: 'HEP'},
          {phrase: 'you', stroke: 'U'},
          {phrase: 'master', stroke: 'PHAFRT'},
          {phrase: 'typing', stroke: 'TAOEUPG'},
          {phrase: 'with', stroke: 'W'},
          {phrase: 'stenography.', stroke: 'STEPB/TKPWRAEF TP-PL'}
        ],
        settings: {
          ignoredChars: ''
        },
        title: 'Steno', subtitle: '',
        newPresentedMaterial: new Zipper([{phrase: '', stroke: ''}]),
        path: ''
      },
      lessonIndex: [{
        "title": "Steno",
        "subtitle": "",
        "category": "Drills",
        "subcategory": "",
        "path": process.env.PUBLIC_URL + "/drills/steno/lesson.txt"
      }],
      revisionMaterial: [
      ]
    };
  }

  componentDidMount() {
    this.setPersonalPreferences();
    fetchLessonIndex().then((json) => {
      this.setState({ lessonIndex: json }, () => {
        setupLessonProgress(json);
      })
    });
  }

  handleStopLesson(event) {
    event.preventDefault();
    this.stopLesson();
  }

  stopLesson() {
    this.stopTimer();
    writePersonalPreferences('userSettings', this.state.userSettings);
    writePersonalPreferences('metWords', this.state.metWords);
    writePersonalPreferences('flashcardsMetWords', this.state.flashcardsMetWords);
    writePersonalPreferences('flashcardsProgress', this.state.flashcardsProgress);

    if (this.state.lesson.path && !this.state.lesson.path.endsWith("/lessons/custom")) {
      let lessonsProgress = this.updateLessonsProgress(this.state.lesson.path);
      writePersonalPreferences('lessonsProgress', lessonsProgress);
    }

    let currentLessonStrokes = this.state.currentLessonStrokes;
    for (let i = 0; i < currentLessonStrokes.length; i++) {
      if (currentLessonStrokes[i].accuracy === true) {
        currentLessonStrokes[i].checked = false;
      }
    }

    this.setState({
      actualText: '',
      currentPhraseID: this.state.lesson.presentedMaterial.length,
      currentPhraseAttempts: [],
      disableUserSettings: false,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0
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

  setPersonalPreferences(source) {
    let metWords = this.state.metWords;
    let flashcardsMetWords = this.state.flashcardsMetWords;
    let flashcardsProgress = this.state.flashcardsProgress;
    let lessonsProgress = this.state.lessonsProgress;
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
      [metWords, userSettings, flashcardsMetWords, flashcardsProgress, lessonsProgress] = loadPersonalPreferences();
    }
    this.setState({
      flashcardsMetWords: flashcardsMetWords,
      flashcardsProgress: flashcardsProgress,
      lessonsProgress: lessonsProgress,
      metWords: metWords,
      userSettings: userSettings
    }, () => {
      writePersonalPreferences('flashcardsMetWords', this.state.flashcardsMetWords);
      writePersonalPreferences('flashcardsProgress', this.state.flashcardsProgress);
      writePersonalPreferences('lessonsProgress', this.state.lessonsProgress);
      writePersonalPreferences('metWords', this.state.metWords);
      writePersonalPreferences('userSettings', this.state.userSettings);
      this.setupLesson();
    });
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
    return value;
  }

  changeShowStrokesInLesson(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({showStrokesInLesson: value});
    const element = document.getElementById('your-typed-text');
    if (element) { element.focus(); }
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
    let numberOfWordsSeen = 0;

    if (lessonsProgress[lessonpath] && lessonsProgress[lessonpath].numberOfWordsSeen) {
      numberOfWordsSeen = lessonsProgress[lessonpath].numberOfWordsSeen;
    }

    let metWords = this.state.metWords;
    let sourceMaterial = this.state.lesson.sourceMaterial;
    let len = sourceMaterial.length;
    let accumulator = 0;

    let normalisedMetWords = {};
    Object.keys(metWords).forEach(function(key,index) {
      normalisedMetWords[key.trim().toLowerCase()] = metWords[key];
    });
    for (let i = 0; i < len; ++i) {
      let sourceMaterialPhrase = sourceMaterial[i].phrase;
      sourceMaterialPhrase = sourceMaterialPhrase.trim();
      sourceMaterialPhrase = sourceMaterialPhrase.toLowerCase();
      if (normalisedMetWords[sourceMaterialPhrase] && normalisedMetWords[sourceMaterialPhrase] > 1) {
        accumulator = accumulator + 1;
      }
    }
    numberOfWordsSeen = accumulator;

    lessonsProgress[lessonpath] = {
      numberOfWordsSeen: numberOfWordsSeen
    }

    this.setState({
      lessonsProgress: lessonsProgress,
    }, () => {
      writePersonalPreferences('lessonsProgress', this.state.lessonsProgress);
    });
    return lessonsProgress;
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

  changeUserSetting(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
      writePersonalPreferences('userSettings', this.state.userSettings);
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
    return value;
  }

  chooseStudy(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = 'study'
    const value = event.target.value;

    newState[name] = value;

    switch (value) {
      case "discover":
        newState.showStrokes = true;
        newState.hideStrokesOnLastRepetition = true;
        newState.newWords = true;
        newState.seenWords = false;
        newState.retainedWords = false;
        newState.repetitions = 5;
        newState.limitNumberOfWords = 15;
        newState.sortOrder = 'sortOff';
        break;
      case "revise":
        newState.showStrokes = false;
        newState.hideStrokesOnLastRepetition = true;
        newState.newWords = false;
        newState.seenWords = true;
        newState.retainedWords = false;
        newState.repetitions = 3;
        newState.limitNumberOfWords = 50;
        newState.sortOrder = 'sortNew';
        break;
      case "drill":
        newState.showStrokes = false;
        newState.hideStrokesOnLastRepetition = true;
        newState.newWords = false;
        newState.seenWords = true;
        newState.retainedWords = true;
        newState.repetitions = 3;
        newState.limitNumberOfWords = 100;
        newState.sortOrder = 'sortRandom';
        break;
      case "practice":
        newState.showStrokes = false;
        newState.hideStrokesOnLastRepetition = true;
        newState.newWords = true;
        newState.seenWords = true;
        newState.retainedWords = true;
        newState.repetitions = 1;
        newState.limitNumberOfWords = 0;
        newState.sortOrder = 'sortOff';
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
    return value;
  }

  setupLesson() {
    if (this.state.lesson.path && !this.state.lesson.path.endsWith("/lessons/custom")) {
      let lessonsProgress = this.updateLessonsProgress(this.state.lesson.path);
      writePersonalPreferences('lessonsProgress', lessonsProgress);
    }

    let newLesson = Object.assign({}, this.state.lesson);
    newLesson.presentedMaterial = newLesson.sourceMaterial.map(line => ({...line}));
    if (this.state.revisionMode) {
      newLesson.presentedMaterial = this.state.revisionMaterial.map(line => ({...line}));
    }

    this.stopTimer();

    newLesson.presentedMaterial = sortLesson.call(this, newLesson.presentedMaterial);
    newLesson.presentedMaterial = filterByFamiliarity.call(this, newLesson.presentedMaterial, this.state.metWords, this.state.userSettings);

    if (this.state.userSettings.limitNumberOfWords > 0) {
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

    this.setState({
      actualText: ``,
      currentPhraseAttempts: [],
      currentLessonStrokes: [],
      disableUserSettings: false,
      numberOfMatchedChars: 0,
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
    });
  }

  handleLesson(path) {
    getLesson(path).then((lessonText) => {
      let lesson = parseLesson(lessonText, path);
      this.setState({
        announcementMessage: 'Navigated to: ' + lesson.title,
        lesson: lesson,
        currentPhraseID: 0
      }, () => {
        this.setupLesson();
      });
    });
  }

  setCustomLesson() {
    let lesson = {
      sourceMaterial: [],
      presentedMaterial: [{phrase: 'The', stroke: '-T'}],
      settings: { ignoredChars: '' },
      title: 'Custom',
      subtitle: '',
      newPresentedMaterial: new Zipper([{phrase: 'The', stroke: '-T'}]),
      path: process.env.PUBLIC_URL + '/lessons/custom'
    }
    this.setState({
      announcementMessage: 'Navigated to: ' + lesson.title,
      lesson: lesson,
      currentPhraseID: 0
    }, () => {
      this.setupLesson();
    });
  }

  createCustomLesson(event) {
    if (event && event.target && event.target.value && event.target.value.length > 0) {
      let lesson = parseCustomMaterial(event.target.value);
      this.setState({
        announcementMessage: 'Navigated to: ' + this.state.lesson.title,
        lesson: lesson,
        currentPhraseID: 0
      }, () => {
        this.setupLesson();
      });
    }
    return event;
  }

  toggleHideOtherSettings() {
    let newState = !this.state.hideOtherSettings;
    this.setState({
      hideOtherSettings: newState
    });
  }

  setAnnouncementMessage(app, content) {
    let newAnnouncementMessage = "";
    if (content) {
      // TODO: if we want to make this function generic for other announcement content, here is the
      // start of a handler for that:
      // if (typeof content === "string") {
      //   newAnnouncementMessage = content;
      // } else if (typeof content === "object") {
        newAnnouncementMessage = content.querySelector('.tippy-tooltip-content').innerText;
      // }
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
    });
    const element = document.getElementById('your-typed-text');
    if (element) { element.focus(); }
  }

  updateMarkup(event) {
    const actualText = event.target.value;

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

    let currentPhraseAttempts = this.state.currentPhraseAttempts;
    currentPhraseAttempts.push(actualText);
    // console.log(this.state.currentPhraseAttempts);

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

    // let testStrokeAccuracy = strokeAccuracy(this.state.currentPhraseAttempts, this.state.targetStrokeCount);
    // console.log(testStrokeAccuracy.strokeAccuracy);
    // console.log(testStrokeAccuracy.attempts);

    if (numberOfUnmatchedChars === 0) {
      let phraseMisstrokes = strokeAccuracy(this.state.currentPhraseAttempts, this.state.targetStrokeCount);
      let accurateStroke = phraseMisstrokes.strokeAccuracy; // false
      let attempts = phraseMisstrokes.attempts; // [" sign", " ss"]
      newState.currentPhraseAttempts = []; // reset for next word
      newState.currentLessonStrokes = this.state.currentLessonStrokes; // [{word: "cat", attempts: ["cut"], stroke: "KAT"}, {word: "sciences", attempts ["sign", "ss"], stroke: "SAOEUPB/EPBC/-S"]
        newState.currentLessonStrokes.push({
          word: this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase,
          attempts: attempts,
          stroke: this.state.lesson.presentedMaterial[this.state.currentPhraseID].stroke,
          checked: true,
          accuracy: accurateStroke
        });
      // can these newState assignments be moved down below the scores assignments?

      if (shouldShowStroke(this.state.showStrokesInLesson, this.state.userSettings.showStrokes, this.state.repetitionsRemaining, this.state.userSettings.hideStrokesOnLastRepetition)) {
        newState.totalNumberOfHintedWords = this.state.totalNumberOfHintedWords + 1;
      }
      else if (!accurateStroke) {
        newState.totalNumberOfMistypedWords = this.state.totalNumberOfMistypedWords + 1;
      }
      else {
        const meetingsCount = newState.metWords[actualText] || 0;
        Object.assign(newState, increaseMetWords.call(this, meetingsCount));
        newState.metWords[actualText] = meetingsCount + 1;
      }

      let nextPhraseID = this.state.currentPhraseID + 1;
      let target = targetStrokeCount(this.state.lesson.presentedMaterial[nextPhraseID] || { phrase: '', stroke: 'TK-LS' });
      newState.targetStrokeCount = target;
      this.state.lesson.newPresentedMaterial.visitNext();

      newState.repetitionsRemaining = repetitionsRemaining(this.state.userSettings, this.state.lesson.presentedMaterial, this.state.currentPhraseID + 1);
      newState.totalNumberOfMatchedChars = this.state.totalNumberOfMatchedChars + numberOfMatchedChars;
      newState.actualText = '';
      newState.showStrokesInLesson = false;
      newState.currentPhraseID = nextPhraseID;

    }

    this.setState(newState, () => {
      if (this.isFinished()) {
        this.stopLesson();
      }
    });
  }

  studyType(userSettings) {
    if (
      userSettings.showStrokes === true &&
      userSettings.newWords === true &&
      userSettings.seenWords === false &&
      userSettings.retainedWords === false &&
      userSettings.repetitions === 3 &&
      userSettings.limitNumberOfWords === 15 &&
      userSettings.sortOrder === 'sortOff'
    ) { return 'discover'; }

    return 'custom';
  }

  isFinished() {
    return (this.state.currentPhraseID === this.state.lesson.presentedMaterial.length);
  }

  presentCompletedMaterial() {
    return this.state.lesson.newPresentedMaterial.getCompleted().map(item => item.phrase).join(" ");
  }
  presentUpcomingMaterial() {
    return this.state.lesson.newPresentedMaterial.getRemaining().slice(0,19).map(item => item.phrase).join(" ");
  }

  render() {
    let completedMaterial = this.presentCompletedMaterial();
    let upcomingMaterial = this.presentUpcomingMaterial();
    let header = <Header
      fullscreen={this.state.fullscreen}
      restartLesson={this.restartLesson.bind(this)}
      items={this.state.lessonIndex}
      lessonSubTitle={this.state.lesson.subtitle}
      lessonTitle={this.state.lesson.title}
      nextLessonPath={this.state.nextLessonPath}
      onChange={(ev, value) => {
      this.setState({
      value: ev.target.value
      })}}
      onSelect={(value, item) => this.setState({
      value: value,
      nextLessonPath: item.path
      })}
      path={this.state.lesson.path}
      settings={this.state.lesson.settings}
      handleStopLesson={this.handleStopLesson.bind(this)}
      value={this.state.value}
    />

    if (true) {
      let presentedMaterialCurrentItem = this.state.lesson.presentedMaterial[this.state.currentPhraseID] || { phrase: '', stroke: '' };
      let app = this;
      return (
        <div className="app">
          <Announcements message={this.state.announcementMessage} />
          <div>
            <Switch>
              <Route exact={true} path="/" render={(props) =>
                <div>
                  {header}
                  <DocumentTitle title='Typey type for stenographers'>
                    <Home
                      setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                      {...props}
                    />
                  </DocumentTitle>
                </div>
                }
              />
              <Route path="/support" render={ () =>
                <div>
                  {header}
                  <DocumentTitle title={'Typey type | About'}>
                    <Support
                      setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                    />
                  </DocumentTitle>
                </div>
                }
              />
              <Route path="/contribute" render={ () =>
                <div>
                  {header}
                  <DocumentTitle title={'Typey type | Contribute'}>
                    <Contribute />
                  </DocumentTitle>
                </div>
                }
              />
              <Route path="/progress" render={ () =>
                <div>
                  {header}
                  <DocumentTitle title={'Typey type | Progress'}>
                    <Progress
                      setPersonalPreferences={this.setPersonalPreferences.bind(this)}
                      metWords={this.state.metWords}
                      flashcardsMetWords={this.state.flashcardsMetWords}
                      flashcardsProgress={this.state.flashcardsProgress}
                      lessonsProgress={this.state.lessonsProgress}
                      lessonIndex={this.state.lessonIndex}
                    />
                  </DocumentTitle>
                </div>
                }
              />
              <Route path="/flashcards" render={ () =>
                <div>
                  {header}
                  <DocumentTitle title={'Typey type | Flashcards'}>
                    <Flashcards
                      locationpathname={this.props.location.pathname}
                      flashcardsMetWords={this.state.flashcardsMetWords}
                      flashcardsProgress={this.state.flashcardsProgress}
                      fullscreen={this.state.fullscreen}
                      lessonpath="flashcards"
                      updateFlashcardsMetWords={this.updateFlashcardsMetWords.bind(this)}
                      updateFlashcardsProgress={this.updateFlashcardsProgress.bind(this)}
                      changeFullscreen={this.changeFullscreen.bind(this)}
                    />
                  </DocumentTitle>
                </div>
                }
              />
              <Route path="/lessons" render={ (props) =>
                <div>
                  {header}
                  <DocumentTitle title={'Typey type | Lessons'}>
                    <Lessons
                      updateFlashcardsMetWords={this.updateFlashcardsMetWords.bind(this)}
                      updateFlashcardsProgress={this.updateFlashcardsProgress.bind(this)}
                      flashcardsMetWords={this.state.flashcardsMetWords}
                      flashcardsProgress={this.state.flashcardsProgress}
                      lessonsProgress={this.state.lessonsProgress}
                      fullscreen={this.state.fullscreen}
                      changeFullscreen={this.changeFullscreen.bind(this)}
                      restartLesson={this.restartLesson.bind(this)}
                      reviseLesson={this.reviseLesson.bind(this)}
                      items={this.state.lessonIndex}
                      lessonSubTitle={this.state.lesson.subtitle}
                      lessonTitle={this.state.lesson.title}
                      nextLessonPath={this.state.nextLessonPath}
                      onChange={(ev, value) => {
                      this.setState({
                      value: ev.target.value
                      })}}
                      onSelect={(value, item) => this.setState({
                      value: value,
                      nextLessonPath: item.path
                      })}
                      path={this.state.lesson.path}
                      handleStopLesson={this.handleStopLesson.bind(this)}
                      value={this.state.value}
                      lessonIndex={this.state.lessonIndex}
                      lesson={this.state.lesson}
                      handleLesson={this.handleLesson.bind(this)}
                      actualText={this.state.actualText}
                      changeShowStrokesInLesson={this.changeShowStrokesInLesson.bind(this)}
                      changeSortOrderUserSetting={this.changeSortOrderUserSetting.bind(this)}
                      changeSpacePlacementUserSetting={this.changeSpacePlacementUserSetting.bind(this)}
                      changeUserSetting={this.changeUserSetting.bind(this)}
                      chooseStudy={this.chooseStudy.bind(this)}
                      completedPhrases={completedMaterial}
                      createCustomLesson={this.createCustomLesson.bind(this)}
                      currentLessonStrokes={this.state.currentLessonStrokes}
                      currentPhraseID={this.state.currentPhraseID}
                      currentPhrase={presentedMaterialCurrentItem.phrase}
                      currentStroke={presentedMaterialCurrentItem.stroke}
                      disableUserSettings={this.state.disableUserSettings}
                      handleLimitWordsChange={this.handleLimitWordsChange.bind(this)}
                      handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
                      hideOtherSettings={this.state.hideOtherSettings}
                      repetitionsRemaining={this.state.repetitionsRemaining}
                      revisionMaterial={this.state.revisionMaterial}
                      updateRevisionMaterial={this.updateRevisionMaterial.bind(this)}
                      setAnnouncementMessage={function () { app.setAnnouncementMessage(app, this) }}
                      setCustomLesson={this.setCustomLesson.bind(this)}
                      settings={this.state.lesson.settings}
                      showStrokesInLesson={this.state.showStrokesInLesson}
                      targetStrokeCount={this.state.targetStrokeCount}
                      timer={this.state.timer}
                      toggleHideOtherSettings={this.toggleHideOtherSettings.bind(this)}
                      charsPerWord={this.charsPerWord}
                      totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
                      totalNumberOfNewWordsMet={this.state.totalNumberOfNewWordsMet}
                      totalNumberOfLowExposuresSeen={this.state.totalNumberOfLowExposuresSeen}
                      totalNumberOfRetainedWords={this.state.totalNumberOfRetainedWords}
                      totalNumberOfMistypedWords={this.state.totalNumberOfMistypedWords}
                      totalNumberOfHintedWords={this.state.totalNumberOfHintedWords}
                      totalWordCount={this.state.lesson.presentedMaterial.length}
                      upcomingPhrases={upcomingMaterial}
                      updateMarkup={this.updateMarkup.bind(this)}
                      userSettings={this.state.userSettings}
                      {...props}
                    />
                  </DocumentTitle>
                </div>
                }
              />
              <Route render={ () =>
                <div>
                  <DocumentTitle title={'Typey type | Page not found'}>
                    <PageNotFound />
                  </DocumentTitle>
                </div>
                }
              />
            </Switch>
          </div>
          <Footer
            fullscreen={this.state.fullscreen}
          />
        </div>
      );
    }
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

function sortLesson(presentedMaterial, met = this.state.metWords, userSettings = this.state.userSettings) {
  if (userSettings.sortOrder === 'sortRandom') {
    return randomise(presentedMaterial);
  }
  else if ((userSettings.sortOrder === 'sortNew') || (userSettings.sortOrder === 'sortOld')) {

    presentedMaterial.sort(function(a, b) {
      if (!met[a.phrase]) {
        return 0;
      }
      if (!met[b.phrase]) {
        return 0;
      }
      return met[b.phrase] - met[a.phrase];
    });

    if (userSettings.sortOrder === 'sortNew') {
      presentedMaterial = presentedMaterial.reverse();
    }
  }
  return presentedMaterial;
}

function filterByFamiliarity(presentedMaterial, met = this.state.metWords, userSettings = this.state.userSettings) {

  var newWords = userSettings.newWords,
    seenWords = userSettings.seenWords,
    retainedWords = userSettings.retainedWords,
    spacePlacement = userSettings.spacePlacement;

  var testNewWords = function(phrase) {
    if (!(phrase in met)) {
      return true;
    } else {
      return (met[phrase] < 1);
    }
  }
  var testSeenWords = function(phrase) {
    if (!(phrase in met)) {
      return false;
    } else {
      return ((met[phrase] > 0) && (met[phrase] < 30));
    }
  }
  var testRetainedWords = function(phrase) {
    if (!(phrase in met)) {
      return false;
    } else {
      return (met[phrase] > 29);
    }
  }

  var tests = [];
  if (retainedWords) {
    tests.push(testRetainedWords);
  }
  if (seenWords) {
    tests.push(testSeenWords);
  }
  if (newWords) {
    tests.push(testNewWords);
  }

  var filterFunction = function (phrase) {
    if (spacePlacement === 'spaceBeforeOutput') {
      phrase = ' '+phrase;
    } else if (spacePlacement === 'spaceAfterOutput') {
      phrase = phrase+' ';
    }
    for (var i = 0; i < tests.length; i++) {
      if (tests[i](phrase)) {
        return true;
      };
    }
    return false;
  }

  return presentedMaterial.filter(item => filterFunction(item.phrase) );
}

export default App;
export {increaseMetWords, filterByFamiliarity, sortLesson};
