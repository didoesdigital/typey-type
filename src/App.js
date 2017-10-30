import React, { Component } from 'react';
import { randomise } from './utils';
import Finished from './Finished';
import Header from './Header';
import Typing from './Typing';
import {matchSplitText, parseLesson} from './typey-type';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      value: '',
      path: '',
      currentPhraseID: 0,
      actualText: ``,
      startTime: null,
      timer: null,
      totalNumberOfMatchedWords: 0,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0,
      disableUserSettings: false,
      userSettings: {
        showStrokes: true,
        randomise: false,
        repetitions: 1,
        caseInsensitive: true
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
        "title": "Top 1,000 English words",
        "subtitle": "",
        "category": "Collections",
        "subcategory": "",
        "path": "/lessons/collections/google-1000-english/lesson.txt"
      }]
    };
  }

  componentDidMount() {
    this.getLesson().then((lessonText) => {
      let lesson = parseLesson(lessonText);
      this.setState({
        lesson: lesson,
        currentPhraseID: 0
      }, () => {
        this.setupLesson();
      });
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
  }

  getLesson(lessonFile = '/lesson-one.txt') {
    return fetch(lessonFile, {
      method: "GET",
      credentials: "same-origin"
    }).then((response) => {
      return response.text();
    }, function(error) {
      console.log(error);
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

    if (this.state.userSettings.randomise) {
      newLesson.presentedMaterial = randomise(newLesson.presentedMaterial);
    }

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
        lesson: lesson,
        currentPhraseID: 0,
        actualText: ``,
        startTime: null,
        timer: null,
        totalNumberOfMatchedWords: 0,
        numberOfMatchedChars: 0,
        totalNumberOfMatchedChars: 0
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
    let [matchedChars, unmatchedChars] =
      matchSplitText(this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase, actualText, this.state.lesson.settings, this.state.userSettings);

    matchedChars = matchedChars.replace(new RegExp(this.state.lesson.settings.ignoredChars,'g'), '');

    let [numberOfMatchedChars, numberOfUnmatchedChars] = [matchedChars, unmatchedChars].map(text => text.length);

    var newState = {
      numberOfMatchedChars: numberOfMatchedChars,
      totalNumberOfMatchedWords: (this.state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
      actualText: actualText
    };

    if (numberOfUnmatchedChars === 0) {
      newState.totalNumberOfMatchedChars = this.state.totalNumberOfMatchedChars + numberOfMatchedChars;
      newState.actualText = '';
      newState.currentPhraseID = this.state.currentPhraseID + 1;
    }

    this.setState(newState, () => {
      if (this.isFinished()) {
        this.stopTimer();
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
            value={this.state.value}
          />
          <div className="main">
            <Finished
              actualText={this.state.actualText}
              getLesson={this.handleLesson.bind(this)}
              settings={this.state.lesson.settings}
              userSettings={this.state.userSettings}
              changeUserSetting={this.changeUserSetting.bind(this)}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
              totalWordCount={this.state.lesson.presentedMaterial.length}
              disableUserSettings={this.state.disableUserSettings}
              />
          </div>
        </div>
      );
    } else {
      return (
        <div className="app">
          <label htmlFor="lessons-autocomplete" className="visually-hidden">Search for a lesson</label>
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
            value={this.state.value}
          />
          <div>
            <Typing
              actualText={this.state.actualText}
              changeUserSetting={this.changeUserSetting.bind(this)}
              currentPhrase={this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase}
              currentStroke={this.state.lesson.presentedMaterial[this.state.currentPhraseID].stroke}
              getLesson={this.handleLesson.bind(this)}
              settings={this.state.lesson.settings}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
              totalWordCount={this.state.lesson.presentedMaterial.length}
              updateMarkup={this.updateMarkup.bind(this)}
              userSettings={this.state.userSettings}
              disableUserSettings={this.state.disableUserSettings}
              />
          </div>
        </div>
      );
    }
  }
}

export default App;
