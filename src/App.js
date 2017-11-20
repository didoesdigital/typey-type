import React, { Component } from 'react';
import { randomise } from './utils';
import { matchSplitText, parseLesson } from './typey-type';
import Finished from './Finished';
import Header from './Header';
import Typing from './Typing';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      value: '',
      path: './lessons/drills/google-1000-english/lesson.txt',
      currentPhraseID: 0,
      currentPhraseMeetingSuccess: 1,
      actualText: ``,
      startTime: null,
      timer: null,
      totalNumberOfMatchedWords: 0,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0,
      totalNumberOfNewWordsMet: 0,
      totalNumberOfLowExposures: 0,
      totalNumberOfFamiliarWords: 0,
      totalNumberOfMisstrokes: 0,
      disableUserSettings: false,
      metWords: {'the': 1},
      userSettings: {
        caseInsensitive: true,
        familiarWords: false,
        limitNumberOfWords: 0,
        newWords: true,
        repetitions: 1,
        showStrokes: false,
        spacePlacement: 'spaceBeforeOutput',
        sortOrder: 'off',
        unfamiliarWords: true
      },
      lesson: {
        sourceMaterial: [{phrase: '', stroke: ''}],
        presentedMaterial: [{phrase: '', stroke: ''}],
        settings: {
          ignoredChars: ''
        },
        title: 'Loading…', subtitle: 'Loading…'
      },
      lessonIndex: [{
        "title": "Top 1000 English words",
        "subtitle": "",
        "category": "Collections",
        "subcategory": "",
        "path": "./lessons/drills/google-1000-english/lesson.txt"
      }]
    };
  }

  loadPersonalPreferences() {
    if (window.localStorage) {
      let metWords = {};
      let userSettings = {
        caseInsensitive: true,
        familiarWords: false,
        limitNumberOfWords: 0,
        newWords: true,
        repetitions: 1,
        showStrokes: false,
        spacePlacement: 'spaceBeforeOutput',
        sortOrder: 'sortOff',
        unfamiliarWords: true
      };
      if (window.localStorage.getItem('metWords')) {
        metWords = JSON.parse(window.localStorage.getItem('metWords'));
      }
      if (window.localStorage.getItem('userSettings')) {
        userSettings = Object.assign(userSettings, JSON.parse(window.localStorage.getItem('userSettings')));
      }
      return [metWords, userSettings];
    }
  }

  writePersonalPreferences() {
    let userSettingsJSON = JSON.stringify(this.state.userSettings);
    let metWordsJSON = JSON.stringify(this.state.metWords);
    if (window.localStorage) {
      window.localStorage.setItem('userSettings', userSettingsJSON);
      window.localStorage.setItem('metWords', metWordsJSON);
    } else {
      console.log('Unable to write to local storage. Changes to User Settings and Met Words will be lost.');
    }
  }

  componentDidMount() {
    let [metWords, userSettings] = this.loadPersonalPreferences();
    this.setState({
      metWords: metWords,
      userSettings: userSettings
    });

    fetch('./lessons/lessonIndex.json', {
      method: "GET",
      credentials: "same-origin"
    }).then((response) => {
      return response.json()
    }).then(json => {
      this.setState({ lessonIndex: json });
    }).catch(function(e) {
      console.log('Unable to load lesson index', e)
    });

    this.getLesson().then((lessonText) => {
      let lesson = parseLesson(lessonText);
      this.setState({
        lesson: lesson,
        currentPhraseID: 0
      }, () => {
        this.setupLesson();
      });
    });
  }

  getLesson(lessonFile = this.state.path) {
    return fetch(lessonFile, {
      method: "GET",
      credentials: "same-origin"
    }).then((response) => {
      return response.text();
    }, function(error) {
      console.log(error);
    });
  }

  handleStopLesson(event) {
    this.stopLesson();
    event.preventDefault();
  }

  stopLesson() {
    this.stopTimer();
    this.writePersonalPreferences();
    this.setState({
      actualText: ``,
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
    clearInterval(this.intervalID);
  }

  updateWPM() {
    this.setState({
      timer: new Date() - this.state.startTime
    });
  }

  handleLimitWordsChange(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = "limitNumberOfWords"
    const value = event;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseInsensitive')) {
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
      if (!(name === 'caseInsensitive')) {
        this.setupLesson();
      }
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

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseInsensitive')) {
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
      if (!(name === 'caseInsensitive')) {
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
      if (!(name === 'caseInsensitive')) {
        this.setupLesson();
      }
    });
    return value;
  }

  setupLesson() {
    let currentLesson = this.state.lesson;
    let newLesson = Object.assign({}, currentLesson);
    newLesson.presentedMaterial = newLesson.sourceMaterial.map(line => ({...line}));

    this.setState({
      currentPhraseMeetingSuccess: this.state.userSettings.showStrokes ? 0 : 1,
      numberOfMatchedChars: 0,
      startTime: null,
      timer: null,
      totalNumberOfMatchedChars: 0,
      totalNumberOfMatchedWords: 0,
      totalNumberOfNewWordsMet: 0,
      totalNumberOfLowExposures: 0,
      totalNumberOfFamiliarWords: 0,
      totalNumberOfMisstrokes: 0
    });

    if (this.state.userSettings.sortOrder === 'sortRandom') {
      newLesson.presentedMaterial = randomise(newLesson.presentedMaterial);
    } else if ((this.state.userSettings.sortOrder === 'sortNew') || (this.state.userSettings.sortOrder === 'sortOld')) {

      var metWords = this.state.metWords;
      newLesson.presentedMaterial = newLesson.presentedMaterial.sort(function(a, b) {
        return metWords[a.phrase] - metWords[b.phrase];
      });
      if (this.state.userSettings.sortOrder === 'sortOld') {
        newLesson.presentedMaterial.reverse();
      }
    }

    var met = this.state.metWords;

    var newWords = this.state.userSettings.newWords,
      unfamiliarWords = this.state.userSettings.unfamiliarWords,
      familiarWords = this.state.userSettings.familiarWords;

    var testNewWords = function(phrase) {
      if (!(phrase in met)) {
        return true;
      } else {
        return (met[phrase] < 1);
      }
    }
    var testUnfamiliarWords = function(phrase) {
      if (!(phrase in met)) {
        return false;
      } else {
        return ((met[phrase] > 0) && (met[phrase] < 30));
      }
    }
    var testFamiliarWords = function(phrase) {
      if (!(phrase in met)) {
        return false;
      } else {
        return (met[phrase] > 29);
      }
    }

    var tests = [];
    if (familiarWords) {
      tests.push(testFamiliarWords);
    }
    if (unfamiliarWords) {
      tests.push(testUnfamiliarWords);
    }
    if (newWords) {
      tests.push(testNewWords);
    }

    var filterFunction = function (phrase) {
      for (var i = 0; i < tests.length; i++) {
        if (tests[i](phrase)) {
          return true;
        };
      }
      return false;
    }

    newLesson.presentedMaterial = newLesson.presentedMaterial.filter(item => filterFunction(item.phrase) );

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

    this.setState({ lesson: newLesson });
    this.setState({ currentPhraseID: 0 });
  }

  handleLesson(event) {
    this.getLesson(event.target.href).then((lessonText) => {
      var lesson = parseLesson(lessonText);
      this.setState({lesson: lesson}, () => {
        this.stopLesson();
        this.setupLesson();
      });
    });
    event.preventDefault();
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
    let [matchedChars, unmatchedChars, matchedActual, unmatchedActual] =
      matchSplitText(this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase, actualText, this.state.lesson.settings, this.state.userSettings);

    matchedChars = matchedChars.replace(new RegExp(this.state.lesson.settings.ignoredChars,'g'), '');

    let [numberOfMatchedChars, numberOfUnmatchedChars] = [matchedChars, unmatchedChars].map(text => text.length);

    var newState = {
      numberOfMatchedChars: numberOfMatchedChars,
      totalNumberOfMatchedWords: (this.state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
      totalNumberOfNewWordsMet: this.state.totalNumberOfNewWordsMet,
      totalNumberOfLowExposures: this.state.totalNumberOfLowExposures,
      totalNumberOfFamiliarWords: this.state.totalNumberOfFamiliarWords,
      totalNumberOfMisstrokes: this.state.totalNumberOfMisstrokes,
      actualText: actualText,
      metWords: this.state.metWords
    };

    if (unmatchedActual.length > 0) {
      newState.currentPhraseMeetingSuccess = 0;
    }

    if (numberOfUnmatchedChars === 0) {
      newState.totalNumberOfMatchedChars = this.state.totalNumberOfMatchedChars + numberOfMatchedChars;
      newState.actualText = '';
      newState.currentPhraseID = this.state.currentPhraseID + 1;
      if (actualText in newState.metWords) {
        newState.metWords[actualText] += this.state.currentPhraseMeetingSuccess;
        if (newState.metWords[actualText] > 29) {
          newState.totalNumberOfFamiliarWords = this.state.totalNumberOfFamiliarWords + this.state.currentPhraseMeetingSuccess;
        } else {
          newState.totalNumberOfLowExposures = this.state.totalNumberOfLowExposures + this.state.currentPhraseMeetingSuccess;
        }
      } else {
        newState.metWords[actualText] = this.state.currentPhraseMeetingSuccess;
        newState.totalNumberOfNewWordsMet = this.state.totalNumberOfNewWordsMet + this.state.currentPhraseMeetingSuccess;
      }
      if (this.state.currentPhraseMeetingSuccess === 0) {
        newState.totalNumberOfMisstrokes = this.state.totalNumberOfMisstrokes + 1;
      }
      if (!this.state.userSettings.showStrokes) {
        newState.currentPhraseMeetingSuccess = 1;
      }
    }

    this.setState(newState, () => {
      if (this.isFinished()) {
        this.stopLesson();
      }
    });
  }

  isFinished() {
    return (this.state.currentPhraseID === this.state.lesson.presentedMaterial.length);
  }

  render() {
    if (this.isFinished()) {
      return (
        <div className="app">
          <Header
            handleGetLesson={this.handleLesson.bind(this)}
            items={this.state.lessonIndex}
            lessonSubTitle={this.state.lesson.subtitle}
            lessonTitle={this.state.lesson.title}
            onChange={(ev, value) => {
            this.setState({
              value: ev.target.value
            })}}
            onSelect={(value, item) => this.setState({
              value: value,
              path: item.path
            })}
            path={this.state.path}
            settings={this.state.lesson.settings}
            handleStopLesson={this.handleStopLesson.bind(this)}
            value={this.state.value}
          />
          <div className="main">
            <Finished
              actualText={this.state.actualText}
              changeSortOrderUserSetting={this.changeSortOrderUserSetting.bind(this)}
              changeSpacePlacementUserSetting={this.changeSpacePlacementUserSetting.bind(this)}
              changeUserSetting={this.changeUserSetting.bind(this)}
              disableUserSettings={this.state.disableUserSettings}
              handleGetLesson={this.handleLesson.bind(this)}
              handleLimitWordsChange={this.handleLimitWordsChange.bind(this)}
              handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
              settings={this.state.lesson.settings}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
              totalNumberOfNewWordsMet={this.state.totalNumberOfNewWordsMet}
              totalNumberOfLowExposures={this.state.totalNumberOfLowExposures}
              totalNumberOfFamiliarWords={this.state.totalNumberOfFamiliarWords}
              totalNumberOfMisstrokes={this.state.totalNumberOfMisstrokes}
              totalWordCount={this.state.lesson.presentedMaterial.length}
              userSettings={this.state.userSettings}
              />
          </div>
          <footer>
            <p className="text-center mb1 mt1"><small>Learn more about <a href="https://didoesdigital.com/plover/">stenography and Plover</a>.</small></p>
            <p className="text-center mb1 mt1"><small>Email: <a href="mailto:didoesdigital+steno@gmail.com" className="link-missing-full-stop">DiDoesDigital+Steno@gmail.com</a></small></p>
            <p className="text-center mb1 mt1"><small>Made with <span aria-label="love" role="img">❤️</span> by <a href="https://twitter.com/didoesdigital">@DiDoesDigital</a>.</small></p>
          </footer>
        </div>
      );
    } else {
      return (
        <div className="app">
          <Header
            handleGetLesson={this.handleLesson.bind(this)}
            items={this.state.lessonIndex}
            lessonSubTitle={this.state.lesson.subtitle}
            lessonTitle={this.state.lesson.title}
            onChange={(ev, value) => {
            this.setState({
              value: ev.target.value
            })}}
            onSelect={(value, item) => this.setState({
              value: value,
              path: item.path
            })}
            path={this.state.path}
            settings={this.state.lesson.settings}
            handleStopLesson={this.handleStopLesson.bind(this)}
            value={this.state.value}
          />
          <div>
            <Typing
              actualText={this.state.actualText}
              changeSortOrderUserSetting={this.changeSortOrderUserSetting.bind(this)}
              changeSpacePlacementUserSetting={this.changeSpacePlacementUserSetting.bind(this)}
              changeUserSetting={this.changeUserSetting.bind(this)}
              currentPhrase={this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase}
              currentStroke={this.state.lesson.presentedMaterial[this.state.currentPhraseID].stroke}
              disableUserSettings={this.state.disableUserSettings}
              handleGetLesson={this.handleLesson.bind(this)}
              handleLimitWordsChange={this.handleLimitWordsChange.bind(this)}
              handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
              settings={this.state.lesson.settings}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
              totalNumberOfNewWordsMet={this.state.totalNumberOfNewWordsMet}
              totalNumberOfLowExposures={this.state.totalNumberOfLowExposures}
              totalNumberOfFamiliarWords={this.state.totalNumberOfFamiliarWords}
              totalNumberOfMisstrokes={this.state.totalNumberOfMisstrokes}
              totalWordCount={this.state.lesson.presentedMaterial.length}
              updateMarkup={this.updateMarkup.bind(this)}
              userSettings={this.state.userSettings}
              />
          </div>
          <footer>
            <p className="text-center mb1 mt1"><small>Learn more about <a href="https://didoesdigital.com/plover/">stenography and Plover</a>.</small></p>
            <p className="text-center mb1 mt1"><small>Email: <a href="mailto:didoesdigital+steno@gmail.com" className="link-missing-full-stop">DiDoesDigital+Steno@gmail.com</a></small></p>
            <p className="text-center mb1 mt1"><small>Made with <span aria-label="love" role="img">❤️</span> by <a href="https://twitter.com/didoesdigital">@DiDoesDigital</a>.</small></p>
          </footer>
        </div>
      );
    }
  }
}

export default App;
