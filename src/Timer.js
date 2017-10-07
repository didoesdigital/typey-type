import React, { Component } from 'react';
import './App.css';

class Timer extends Component {
  constructor(props) {
    super(props);
  }

  calculateWordsPerMinute(timer, numberOfMatchedWords) {
    let wordsPerMinute = Math.round(numberOfMatchedWords/(timer/60/1000));
    let result = `
      <p>Timer:</p>
      <p>${Math.round(timer/1000)} seconds</p>

      <p>Number of matched words:</p>
      <p>~${Math.ceil(numberOfMatchedWords)} words</p>

      <p><abbr title="words per minute">WPM</abbr>:</p>
      <p>${wordsPerMinute}</p>
    `
    return {__html: result};
  }

  render() {
    if (this.props.timer) {
      return (
        <div className="">
          <div className="timer" dangerouslySetInnerHTML={this.calculateWordsPerMinute(this.props.timer, this.props.numberOfMatchedWords)} />
        </div>
      );
    } else {
      return (
        <div className="">
          <p>Timer:</p>
          <p>&nbsp;</p>

          <p>Number of matched words:</p>
          <p>&nbsp;</p>

          <p><abbr title="words per minute">WPM</abbr>:</p>
          <p>&nbsp;</p>
        </div>
      );
    }

  }
}

export default Timer;
