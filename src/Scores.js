import React, { Component } from 'react';
import './App.css';

class Scores extends Component {
  calculateScores(timer, totalNumberOfMatchedWords) {
    let wordsPerMinute;
    if (this.props.timer > 0) {
      wordsPerMinute = Math.round(totalNumberOfMatchedWords/(timer/60/1000));
    } else {
      wordsPerMinute = 0;
    }
    let result = `
      <table class="timer-table text-small">
        <tbody>
          <tr>
            <th><abbr title="words per minute">WPM:</abbr></th>
            <td class="text-right">${wordsPerMinute}</td>
          </tr>
          <tr>
            <th>Time (seconds):</th>
            <td class="text-right">${Math.round(timer/1000)}</td>
          </tr>
          <tr>
            <th>New words:</th>
            <td class="text-right">${this.props.totalNumberOfNewWordsMet}</td>
          </tr>
          <tr>
            <th>Seen words:</th>
            <td class="text-right">${this.props.totalNumberOfLowExposures}</td>
          </tr>
          <tr>
            <th>Retained words:</th>
            <td class="text-right">${this.props.totalNumberOfFamiliarWords}</td>
          </tr>
          <tr>
            <th>Mistyped words:</th>
            <td class="text-right">${this.props.totalNumberOfMistypedWords}</td>
          </tr>
          <tr>
            <th>Hinted words:</th>
            <td class="text-right">${this.props.totalNumberOfHintedWords}</td>
          </tr>
          <tr>
            <th class="hide">Word count:</th>
            <td class="text-right hide">~${Math.round(totalNumberOfMatchedWords)}</td>
          </tr>
        </tbody>
      </table>
    `
    return {__html: result};
  }

  render() {
    if (this.props.timer !== null) {
      return (
        <div>
          <h6 className="mb1">Scores</h6>
          <div className="timer" dangerouslySetInnerHTML={this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords)} />
        </div>
      );
    } else {
      return (
        <div>
          <h6 className="mb1">Scores</h6>
          <table className="timer-table text-small">
            <tbody>
              <tr>
                <th><abbr title="words per minute">WPM:</abbr></th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>Time (seconds):</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>New words:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>Seen words:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>Retained words:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>Mistyped words:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>Hinted words:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th className="hide">Word count:</th>
                <td className="right-right hide">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

  }
}

export default Scores;
