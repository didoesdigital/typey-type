import React, { Component } from 'react';
import Material from './Material';
import TypedText from './TypedText';
import Scores from './Scores';
import './App.css';

class Typing extends Component {
  render() {
    var customMessage;
    if (this.props.settings.customMessage) {
      customMessage = <h4>{this.props.settings.customMessage}</h4>;
    } else {
      customMessage = '';
    }
    return (
      <div className="app">
        <div className="app-header">
          <h1>Typey type</h1>
          <h2>{this.props.lessonTitle}</h2>
          <h3>{this.props.lessonSubTitle}</h3>
          {customMessage}
          <nav>
            <ul>
              <li><a href="/lesson.txt" onClick={this.props.getLesson}>Lesson one</a></li>
              <li><a href="/lesson-two.txt" onClick={this.props.getLesson}>Lesson two</a></li>
            </ul>
          </nav>
        </div>
        <div className="main">
          <div className="">
            <Material currentPhrase={this.props.currentPhrase} actualText={this.props.actualText} settings={this.props.settings} />
            <TypedText currentPhrase={this.props.currentPhrase} actualText={this.props.actualText} settings={this.props.settings} />
            <p className="input-text">
              <textarea className="input-textarea" rows="1"
                onChange={this.props.updateMarkup}
                value={this.props.actualText}
                >
              </textarea>
            </p>
            <Scores timer={this.props.timer} totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}/>
          </div>
        </div>
      </div>
    )
  }

}

export default Typing;
