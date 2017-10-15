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
      lesson: {sourceMaterial: [''], settings: {}, title: 'Loading…', subtitle: 'Loading…' }
    };
  }

  componentDidMount() {
    this.getLesson().then((lessonText) => {
      var lesson = parseLesson(lessonText);
      this.setState({ lesson: lesson });
      this.setState({ currentPhraseID: 0 });
    });
  }

  getLesson() {
    return fetch('/lesson.txt', {
      method: "GET",
      credentials: "same-origin"
    }).then(function(response) {
      response.status     //=> number 100–599
      response.statusText //=> String
      response.headers    //=> Headers
      response.url        //=> String

      return response.text()
    }, function(error) {
      error.message //=> String
    })

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

  updateMarkup(event) {
    const actualText = event.target.value;

    if (this.state.startTime == null) {
      this.setState({
        startTime: new Date(),
        timer: 0
      });
      this.startTimer();
    }

    let [numberOfMatchedChars, numberOfUnmatchedChars] =
      matchSplitText(this.state.lesson.sourceMaterial[this.state.currentPhraseID], actualText)
      .map(text => text.length);

    var newState = {
      numberOfMatchedChars: numberOfMatchedChars,
      totalNumberOfMatchedWords: (this.state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
      actualText: actualText
    };

    if (numberOfUnmatchedChars == 0) {
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
    return (this.state.currentPhraseID == this.state.lesson.sourceMaterial.length);
  }

  render() {
    if (this.isFinished()) {
      return (
        <Finished lessonSubTitle={this.state.lesson.subtitle} lessonTitle={this.state.lesson.title} currentPhrase={this.state.lesson.sourceMaterial[this.state.currentPhraseID]} actualText={this.state.actualText} timer={this.state.timer} totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords} />
      );
    } else {
      return (
        <Typing lessonSubTitle={this.state.lesson.subtitle} lessonTitle={this.state.lesson.title} updateMarkup={this.updateMarkup.bind(this)} currentPhrase={this.state.lesson.sourceMaterial[this.state.currentPhraseID]} actualText={this.state.actualText} timer={this.state.timer} totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}/>
      );
    }
  }
}

export default App;
