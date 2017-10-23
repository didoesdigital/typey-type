import React, { Component } from 'react';
import Finished from 'components/Finished';
import Header from 'components/Header';
import Typing from 'components/Typing';
import {matchSplitText, parseLesson} from 'utils/typey-type';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      currentPhraseID: 0,
      actualText: ``,
      startTime: null,
      timer: null,
      totalNumberOfMatchedWords: 0,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0,
      userSettings: {
        showStrokes: true
      },
      random: (window.location.hash === "#random") ? true : false,
      repeat: (window.location.hash === "#repeat") ? true : false,
      lesson: {sourceMaterial: [{phrase: '', stroke: ''}], settings: { caseSensitive: true, requireSpaces: false, noticeSpaces: false, ignoredChars: '', spacePlacement: 'Before Output'}, title: 'Loading…', subtitle: 'Loading…' }
    };
  }

  componentDidMount() {
    this.getLesson().then((lessonText) => {
      var lesson = parseLesson(lessonText);
      if (this.state.repeat === true) {
        lesson.sourceMaterial = lesson.sourceMaterial.concat(lesson.sourceMaterial).concat(lesson.sourceMaterial);
      }
      if (this.state.random === true) {
        lesson.sourceMaterial = this.randomize(lesson.sourceMaterial);
      }
      this.setState({ lesson: lesson });
      this.setState({ currentPhraseID: 0 });
    });
  }

  randomize(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  getLesson(lessonFile = '/lesson.txt') {
    return fetch(lessonFile, {
      method: "GET",
      credentials: "same-origin"
    }).then((response) => {
      return response.text();
    }, function(error) {
      console.log(error);
      return error.message;
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

  changeUserSettings(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    newState.showStrokes = value;

    this.setState({userSettings: newState});
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
        timer: 0
      });
      this.startTimer();
    }

    let [numberOfMatchedChars, numberOfUnmatchedChars] =
      matchSplitText(this.state.lesson.sourceMaterial[this.state.currentPhraseID].phrase, actualText, this.state.lesson.settings)
      .map(text => text.length);

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
    return (this.state.currentPhraseID === this.state.lesson.sourceMaterial.length);
  }

  render() {
    if (this.isFinished()) {
      return (
        <div className="app">
          <Header
            lessonSubTitle={this.state.lesson.subtitle}
            lessonTitle={this.state.lesson.title}
            getLesson={this.handleLesson.bind(this)}
            settings={this.state.lesson.settings}
          />
          <div className="main">
            <Finished
              actualText={this.state.actualText}
              getLesson={this.handleLesson.bind(this)}
              settings={this.state.lesson.settings}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
              />
          </div>
        </div>
      );
    } else {
      return (
        <div className="app">
          <Header
            getLesson={this.handleLesson.bind(this)}
            lessonSubTitle={this.state.lesson.subtitle}
            lessonTitle={this.state.lesson.title}
            settings={this.state.lesson.settings}
          />
          <div>
            <Typing
              actualText={this.state.actualText}
              changeUserSettings={this.changeUserSettings.bind(this)}
              currentPhrase={this.state.lesson.sourceMaterial[this.state.currentPhraseID].phrase}
              currentStroke={this.state.lesson.sourceMaterial[this.state.currentPhraseID].stroke}
              getLesson={this.handleLesson.bind(this)}
              settings={this.state.lesson.settings}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
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
