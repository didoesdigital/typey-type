import React, { Component } from 'react';
import Material from './Material';
import TypedText from './TypedText';
import Scores from './Scores';
// import matchSplitText from './typey-type';
import './App.css';

class Typing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Typey type</h1>
        </div>
        <div className="main">
          <div className="">
            <Material currentPhrase={this.props.currentPhrase} typedText={this.props.typedText} />
            <TypedText currentPhrase={this.props.currentPhrase} typedText={this.props.typedText} />
            <p className="input-text">
              <textarea className="input-textarea" rows="1"
                onChange={this.props.updateMarkup}
                value={this.props.typedText}
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
