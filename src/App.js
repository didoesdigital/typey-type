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
      path: 'lessons/test-lesson.txt',
      currentPhraseID: 0,
      currentPhraseMeetingSuccess: 1,
      actualText: ``,
      startTime: null,
      timer: null,
      totalNumberOfMatchedWords: 0,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0,
      disableUserSettings: false,
      metWords: {'the': 1},
      userSettings: {
        caseInsensitive: true,
        familiarWords: false,
        newWords: true,
        randomise: false,
        repetitions: 1,
        showStrokes: true,
        unfamiliarWords: true
      },
      lesson: {
        sourceMaterial: [{phrase: '', stroke: ''}],
        presentedMaterial: [{phrase: '', stroke: ''}],
        settings: {
          caseInsensitive: true,
          requireSpaces: false,
          noticeSpaces: false,
          ignoredChars: '',
          spacePlacement: 'Before Output'
        },
        title: 'Loading…', subtitle: 'Loading…'
      },
      lessonIndex: [{
        "title": "Top 1000 English words",
        "subtitle": "",
        "category": "Collections",
        "subcategory": "",
        "path": "/lessons/drills/google-1000-english/lesson.txt"
      }]
    };
  }

  componentDidMount() {
    fetch('met-words.json', {
      method: "GET",
      credentials: "same-origin"
    }).then((response) => {
      return response.json()
    }).then(json => {
      this.setState({ metWords: json });
    }).catch(function(e) {
      console.log('Unable to load met words', e)
    });

    fetch('/lessons/lessonIndex.json', {
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

  stopLesson(event) {
    this.getLesson(event.target.href).then((lessonText) => {
      this.setState({currentPhraseID: this.state.lesson.presentedMaterial.length}, () => {
        this.stopTimer();
      });
    });
    event.preventDefault();
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
      totalNumberOfMatchedWords: 0
    });

    if (this.state.userSettings.randomise) {
      newLesson.presentedMaterial = randomise(newLesson.presentedMaterial);
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

    let reps = this.state.userSettings.repetitions;
    if (reps > 0) {
      for (let i = 1; i < reps && i < 30; i++) {
        newLesson.presentedMaterial = newLesson.presentedMaterial.concat(newLesson.sourceMaterial);
      }
    }

    this.setState({ lesson: newLesson });
    this.setState({ currentPhraseID: 0 });
  }

  handleLesson(event) {
    this.getLesson(event.target.href).then((lessonText) => {
      var lesson = parseLesson(lessonText);
      this.stopTimer();
      this.setState({
        actualText: ``,
        currentPhraseID: 0,
        disableUserSettings: false,
        lesson: lesson,
        numberOfMatchedChars: 0,
        startTime: null,
        timer: null,
        totalNumberOfMatchedChars: 0,
        totalNumberOfMatchedWords: 0
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
      } else {
        newState.metWords[actualText] = this.state.currentPhraseMeetingSuccess;
      }
      if (!this.state.userSettings.showStrokes) {
        newState.currentPhraseMeetingSuccess = 1;
      }
    }

    this.setState(newState, () => {
      if (this.isFinished()) {
        this.stopTimer();
        this.setState({disableUserSettings: false});
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
            getLesson={this.handleLesson.bind(this)}
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
            stopLesson={this.stopLesson.bind(this)}
            value={this.state.value}
          />
          <div className="main">
            <Finished
              actualText={this.state.actualText}
              changeUserSetting={this.changeUserSetting.bind(this)}
              disableUserSettings={this.state.disableUserSettings}
              getLesson={this.handleLesson.bind(this)}
              handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
              settings={this.state.lesson.settings}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
              totalWordCount={this.state.lesson.presentedMaterial.length}
              userSettings={this.state.userSettings}
              />
          </div>
        </div>
      );
    } else {
      return (
        <div className="app">
          <Header
            getLesson={this.handleLesson.bind(this)}
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
            stopLesson={this.stopLesson.bind(this)}
            value={this.state.value}
          />
          <div>
            <Typing
              actualText={this.state.actualText}
              changeUserSetting={this.changeUserSetting.bind(this)}
              currentPhrase={this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase}
              currentStroke={this.state.lesson.presentedMaterial[this.state.currentPhraseID].stroke}
              disableUserSettings={this.state.disableUserSettings}
              getLesson={this.handleLesson.bind(this)}
              handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
              settings={this.state.lesson.settings}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
              totalWordCount={this.state.lesson.presentedMaterial.length}
              updateMarkup={this.updateMarkup.bind(this)}
              userSettings={this.state.userSettings}
              />
          </div>
        </div>
      );
    }
  }
}

export default App;
