import React, { Component } from 'react';
import Material from './Material';
import TypedText from './TypedText';
import Scores from './Scores';
import matchSplitText from './typey-type';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      sourceMaterial: [],
      currentPhrase: '',
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
      this.setState({ currentPhrase: phrases[0] });
    });
  }

  getLesson() {
    return fetch('/test.txt', {
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

    var numberOfMatchedChars = this.calculateMatchedChars(this.state.currentPhrase, typedText);

    this.setState({
      numberOfMatchedChars: numberOfMatchedChars,
      numberOfMatchedWords: numberOfMatchedChars / this.charsPerWord,
      typedText: typedText
    });
  }

  calculateMatchedChars(currentPhrase, typedText) {
    let [matched, unmatched] = matchSplitText(currentPhrase, typedText);
    if (unmatched.length == 0) {
      this.stopTimer();
    }
    return matched.length;
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Typey type</h1>
        </div>
        <div className="main">
          <div className="">
            <Material currentPhrase={this.state.currentPhrase} typedText={this.state.typedText} />
            <TypedText currentPhrase={this.state.currentPhrase} typedText={this.state.typedText} />
            <p className="input-text">
              <textarea className="input-textarea" rows="1"
                onChange={this.updateMarkup.bind(this)}
                value={this.state.typedText}
                >
              </textarea>
            </p>
            <Scores timer={this.state.timer} numberOfMatchedWords={this.state.numberOfMatchedWords}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
