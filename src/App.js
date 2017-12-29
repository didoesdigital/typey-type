import React, { Component } from 'react';
import { randomise } from './utils';
import {
  fetchLessonIndex,
  getLesson,
  loadPersonalPreferences,
  matchSplitText,
  parseLesson,
  repetitionsRemaining,
  shouldShowStroke,
  writePersonalPreferences
} from './typey-type';
import {
  Route,
  Switch
} from 'react-router-dom';
import Lessons from './Lessons';
import Home from './Home';
import Header from './Header';
import Support from './Support';
import Progress from './Progress';
import PageNotFound from './PageNotFound';
import Footer from './Footer';
import Zipper from './zipper';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      value: '',
      currentPhraseID: 0,
      currentPhraseMeetingSuccess: 1,
      actualText: ``,
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
      userSettings: {
        caseSensitive: true,
        retainedWords: true,
        limitNumberOfWords: 45,
        newWords: true,
        repetitions: 1,
        showStrokes: true,
        hideStrokesOnLastRepetition: true,
        spacePlacement: 'spaceBeforeOutput',
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
          {phrase: 'transcribe,', stroke: 'TREUB'},
          {phrase: 'caption,', stroke: 'KAPGS'},
          {phrase: 'dictate,', stroke: 'TKEUBG/TAEUT'},
          {phrase: 'code,', stroke: 'KOED'},
          {phrase: 'chat,', stroke: 'KHAT'},
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
          {phrase: 'transcribe,', stroke: 'TREUB'},
          {phrase: 'caption,', stroke: 'KAPGS'},
          {phrase: 'dictate,', stroke: 'TKEUBG/TAEUT'},
          {phrase: 'code,', stroke: 'KOED'},
          {phrase: 'chat,', stroke: 'KHAT'},
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
      }]
    };
  }

  componentDidMount() {
    this.setPersonalPreferences();
    fetchLessonIndex().then((json) => this.setState({ lessonIndex: json }));
  }

  handleStopLesson(event) {
    event.preventDefault();
    this.stopLesson();
  }

  stopLesson() {
    this.stopTimer();
    writePersonalPreferences(this.state.userSettings, this.state.metWords);
    this.setState({
      actualText: '',
      currentPhraseID: this.state.lesson.presentedMaterial.length,
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
    let metWords = this.state.metWords, userSettings = this.state.userSettings;
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
      [metWords, userSettings] = loadPersonalPreferences();
    }
    this.setState({
      metWords: metWords,
      userSettings: userSettings
    }, () => {
      writePersonalPreferences(this.state.userSettings, this.state.metWords);
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
        newState.repetitions = 3;
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
        newState.repetitions = 1;
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
    });
    return value;
  }

  setupLesson() {
    let currentLesson = this.state.lesson;
    let newLesson = Object.assign({}, currentLesson);
    newLesson.presentedMaterial = newLesson.sourceMaterial.map(line => ({...line}));

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

    let meetingSuccess = 1;
    if (shouldShowStroke(this.state.showStrokesInLesson, this.state.userSettings.showStrokes, this.state.repetitionsRemaining, this.state.userSettings.hideStrokesOnLastRepetition)) {
      meetingSuccess = 0;
    }

    this.setState({
      actualText: ``,
      currentPhraseMeetingSuccess: meetingSuccess,
      disableUserSettings: false,
      numberOfMatchedChars: 0,
      repetitionsRemaining: reps,
      startTime: null,
      timer: null,
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
        lesson: lesson,
        currentPhraseID: 0
      }, () => {
        this.setupLesson();
      });
    });
  }

  toggleHideOtherSettings() {
    let newState = !this.state.hideOtherSettings;
    this.setState({
      hideOtherSettings: newState
    });
  }

  restartLesson(event) {
    event.preventDefault();
    this.setState({
      currentPhraseID: 0
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

    var newState = {
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

    if (unmatchedActual.length > 0) {
      newState.currentPhraseMeetingSuccess = 0;
    }

    if (numberOfUnmatchedChars === 0) {
      newState.totalNumberOfMatchedChars = this.state.totalNumberOfMatchedChars + numberOfMatchedChars;
      newState.actualText = '';
      newState.showStrokesInLesson = false;
      newState.repetitionsRemaining = this.state.userSettings.repetitions;
      newState.currentPhraseID = this.state.currentPhraseID + 1;

      if (shouldShowStroke(this.state.showStrokesInLesson, this.state.userSettings.showStrokes, this.state.repetitionsRemaining, this.state.userSettings.hideStrokesOnLastRepetition)) {
        newState.totalNumberOfHintedWords = this.state.totalNumberOfHintedWords + 1;
      }
      else if (this.state.currentPhraseMeetingSuccess === 0) {
        newState.totalNumberOfMistypedWords = this.state.totalNumberOfMistypedWords + 1;
      }
      else if (this.state.currentPhraseMeetingSuccess === 1) {
        const meetingsCount = newState.metWords[actualText] || 0;
        Object.assign(newState, increaseMetWords.call(this, meetingsCount));
        newState.metWords[actualText] = this.state.currentPhraseMeetingSuccess + meetingsCount;
      }
      newState.currentPhraseMeetingSuccess = 1;
      this.state.lesson.newPresentedMaterial.visitNext();

      newState.repetitionsRemaining = repetitionsRemaining(this.state.userSettings, this.state.lesson.presentedMaterial, this.state.currentPhraseID + 1);

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
      let presentedMaterialCurrentItem = this.state.lesson.presentedMaterial[this.state.currentPhraseID] || {};
      return (
        <div className="app">
          <div>
            <Switch>
              <Route exact={true} path="/" render={(props) =>
                <div>
                  {header}
                  <Home 
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
                    currentPhraseID={this.state.currentPhraseID}
                    currentPhrase={presentedMaterialCurrentItem.phrase}
                    currentStroke={presentedMaterialCurrentItem.stroke}
                    disableUserSettings={this.state.disableUserSettings}
                    handleLimitWordsChange={this.handleLimitWordsChange.bind(this)}
                    handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
                    hideOtherSettings={this.state.hideOtherSettings}
                    repetitionsRemaining={this.state.repetitionsRemaining}
                    settings={this.state.lesson.settings}
                    showStrokesInLesson={this.state.showStrokesInLesson}
                    timer={this.state.timer}
                    toggleHideOtherSettings={this.toggleHideOtherSettings.bind(this)}
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
                </div>
                }
              />
              <Route path="/support" render={ () =>
                <div>
                  {header}
                  <Support />
                </div>
                }
              />
              <Route path="/progress" render={ () =>
                <div>
                  {header}
                  <Progress
                    setPersonalPreferences={this.setPersonalPreferences.bind(this)}
                    metWords={this.state.metWords}
                  />
                </div>
                }
              />
              <Route path="/lessons" render={ (props) =>
                <div>
                  {header}
                  <Lessons
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
                    currentPhraseID={this.state.currentPhraseID}
                    currentPhrase={presentedMaterialCurrentItem.phrase}
                    currentStroke={presentedMaterialCurrentItem.stroke}
                    disableUserSettings={this.state.disableUserSettings}
                    handleLimitWordsChange={this.handleLimitWordsChange.bind(this)}
                    handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
                    hideOtherSettings={this.state.hideOtherSettings}
                    repetitionsRemaining={this.state.repetitionsRemaining}
                    settings={this.state.lesson.settings}
                    showStrokesInLesson={this.state.showStrokesInLesson}
                    timer={this.state.timer}
                    toggleHideOtherSettings={this.toggleHideOtherSettings.bind(this)}
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
                </div>
                }
              />
              <Route render={ () =>
                <div>
                  <PageNotFound />
                </div>
                }
              />
            </Switch>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

function increaseMetWords(meetingsCount) {
  let newState = {};

  if (meetingsCount === 0) {
    newState.totalNumberOfNewWordsMet = this.state.totalNumberOfNewWordsMet + this.state.currentPhraseMeetingSuccess;
  }
  else if (meetingsCount >= 1 && meetingsCount <= 29) {
    newState.totalNumberOfLowExposuresSeen = this.state.totalNumberOfLowExposuresSeen + this.state.currentPhraseMeetingSuccess;
  }
  else if (meetingsCount >= 30) {
    newState.totalNumberOfRetainedWords = this.state.totalNumberOfRetainedWords + this.state.currentPhraseMeetingSuccess;
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
