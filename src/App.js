import React, { Component } from 'react';
import Finished from './Finished';
import Typing from './Typing';
import matchSplitText from './typey-type';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      sourceMaterial: [''],
      currentPhraseID: 0,
      typedText: ``,
      startTime: null,
      timer: null,
      numberOfMatchedWords: 0,
      numberOfMatchedChars: 0
    };
  }

  componentDidMount() {
    this.getLesson().then((lessonText) => {
      var phrases = lessonText.split("\n");
      this.setState({ sourceMaterial: phrases });
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
    const typedText = event.target.value;

    if (this.state.startTime == null) {
      this.state.startTime = new Date();
      this.startTimer();
    }

    var numberOfMatchedChars = this.calculateMatchedChars(this.state.sourceMaterial[this.state.currentPhraseID], typedText);

    this.setState({
      numberOfMatchedChars: numberOfMatchedChars,
      numberOfMatchedWords: numberOfMatchedChars / this.charsPerWord,
      typedText: typedText
    });
  }

  isFinished() {
    return (this.state.currentPhraseID == this.state.sourceMaterial.length);
  }

  calculateMatchedChars(currentPhrase, typedText) {
    let [matched, unmatched] = matchSplitText(currentPhrase, typedText);
    if (unmatched.length == 0) {
      this.setState({
        currentPhraseID: this.state.currentPhraseID + 1
      });
      this.stopTimer();
    }
    return matched.length;
  }

  render() {
    if (this.isFinished()) {
      return (
        <Finished currentPhrase={this.state.sourceMaterial[this.state.currentPhraseID]} typedText={this.state.typedText} />
      );
    } else {
      return (
        <Typing updateMarkup={this.updateMarkup.bind(this)} currentPhrase={this.state.sourceMaterial[this.state.currentPhraseID]} typedText={this.state.typedText} timer={this.state.timer} numberOfMatchedWords={this.state.numberOfMatchedWords}/>
      );
    }
  }
}

export default App;
