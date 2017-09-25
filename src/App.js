import React, { Component } from 'react';
import Material from './Material';
import TypedText from './TypedText';
import Timer from './Timer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.sourceMaterial = `List of words`;
    this.charsPerWord = 5;
    this.state = {material: `
List of words
`,
      typedText: ``,
      startTime: null,
      timer: null,
      numberOfMatchedWords: 0,
      numberOfMatchedChars: 0
    };
  }

  startTimer() {
    let intervalID = window.setInterval(this.updateWPM.bind(this), 1000);
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

    this.state.numberOfMatchedChars = this.calculateMatchedChars(this.state.material, this.state.typedText);
    this.state.numberOfMatchedWords = this.state.numberOfMatchedChars / this.charsPerWord;

    this.setState({
      typedText: typedText,
      material: this.markUpMaterial(this.sourceMaterial, typedText)
    });
  }

  calculateMatchedChars(material, typedText) {
    let materialChars = material.split('');
    let typedTextChars = typedText.split('');
    let i = 0;
    for (; i < typedTextChars.length; i++) {
      if (typedTextChars[i] != materialChars[i]) {
        break;
      }
    };
    let matchedMaterial = materialChars.slice(0,i).join('');
    return matchedMaterial.length;
  }

  markUpMaterial(material, typedText) {
    return material+typedText;
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Typey type</h1>
        </div>
        <div className="main">
          <div className="">
            <Material sourceMaterial={this.sourceMaterial} typedText={this.state.typedText} />
            <TypedText sourceMaterial={this.sourceMaterial} typedText={this.state.typedText} />
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
