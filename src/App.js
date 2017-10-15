import React, { Component } from 'react';
import Finished from './Finished';
import Typing from './Typing';
import {matchSplitText, parseLesson} from './typey-type';
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
      spacePlacement: 'Before Output',
      lesson: {sourceMaterial: [''], settings: { caseSensitive: true, requireSpaces: false, noticeSpaces: false, ignoredChars: ''}, title: 'Loading…', subtitle: 'Loading…' }
    };
  }

  componentDidMount() {
    this.getLesson().then((lessonText) => {
      var lesson = parseLesson(lessonText);
      this.setState({ lesson: lesson });
      this.setState({ currentPhraseID: 0 });
    });
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
      matchSplitText(this.state.lesson.sourceMaterial[this.state.currentPhraseID], actualText, this.state.lesson.settings)
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
        <Finished
          lessonSubTitle={this.state.lesson.subtitle}
          lessonTitle={this.state.lesson.title}
          currentPhrase={this.state.lesson.sourceMaterial[this.state.currentPhraseID]}
          actualText={this.state.actualText}
          timer={this.state.timer}
          totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
          settings={this.state.lesson.settings}
          getLesson={this.handleLesson.bind(this)}
          />
      );
    } else {
      return (
        <Typing
          lessonSubTitle={this.state.lesson.subtitle}
          lessonTitle={this.state.lesson.title}
          updateMarkup={this.updateMarkup.bind(this)}
          currentPhrase={this.state.lesson.sourceMaterial[this.state.currentPhraseID]}
          actualText={this.state.actualText}
          timer={this.state.timer}
          totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
          settings={this.state.lesson.settings}
          getLesson={this.handleLesson.bind(this)}
          />
      );
    }
  }
}

export default App;
