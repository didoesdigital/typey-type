import React, { Component } from 'react';
import Material from './Material';
import TypedText from './TypedText';
import Timer from './Timer';
import matchSplitText from './typey-type';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      sourceMaterial: '',
      typedText: ``,
      startTime: null,
      timer: null,
      numberOfMatchedWords: 0,
      numberOfMatchedChars: 0
    };
  }

  componentDidMount() {
    this.getLesson().then((lessonText) => {
      this.setState({ sourceMaterial: lessonText });
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

    var numberOfMatchedChars = this.calculateMatchedChars(this.state.sourceMaterial, typedText);

    this.setState({
      numberOfMatchedChars: numberOfMatchedChars,
      numberOfMatchedWords: numberOfMatchedChars / this.charsPerWord,
      typedText: typedText
    });
  }

  calculateMatchedChars(material, typedText) {
    let [matched, unmatched] = matchSplitText(material, typedText);
    if (unmatched.length == 1) {
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
            <Material sourceMaterial={this.state.sourceMaterial} typedText={this.state.typedText} />
            <TypedText sourceMaterial={this.state.sourceMaterial} typedText={this.state.typedText} />
            <p className="input-text">
              <textarea className="input-textarea" rows="1"
                onChange={this.updateMarkup.bind(this)}
                value={this.state.typedText}
                >
              </textarea>
            </p>
            <Timer timer={this.state.timer} numberOfMatchedWords={this.state.numberOfMatchedWords}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
