import React, { Component } from 'react';
import Material from './Material';
import TypedText from './TypedText';
import Scores from './Scores';
import './App.css';

class Typing extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Typey type</h1>
          <h2>{this.props.lessonTitle}</h2>
          <h3>{this.props.lessonSubTitle}</h3>
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
