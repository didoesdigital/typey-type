import React, { Component } from 'react';
import './App.css';
import {
  Link
} from 'react-router-dom';

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
            <th><abbr title="words per minute">WPM</abbr>:</th>
            <td class="text-right">${wordsPerMinute}</td>
          </tr>
          <tr>
            <th>Time (seconds):</th>
            <td class="text-right">${Math.round(timer/1000)}</td>
          </tr>
        </tbody>
      </table>

      <h6 class="mt1 mb1 de-emphasized text-uppercase subsection-header">Words typed</h6>
      <table class="timer-table text-small">
        <tbody>
          <tr>
            <th>New:</th>
            <td class="text-right">${this.props.totalNumberOfNewWordsMet}</td>
          </tr>
          <tr>
            <th>Seen before:</th>
            <td class="text-right">${this.props.totalNumberOfLowExposuresSeen}</td>
          </tr>
          <tr>
            <th>From memory:</th>
            <td class="text-right">${this.props.totalNumberOfRetainedWords}</td>
          </tr>
          <tr>
            <th>Misstroked:</th>
            <td class="text-right">${this.props.totalNumberOfMistypedWords}</td>
          </tr>
          <tr>
            <th>Hinted:</th>
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
          <h5 className="mb1">Scores</h5>
          <div className="timer" dangerouslySetInnerHTML={this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords)} />
          <div><Link to="/progress" className="text-small">View your progress</Link></div>
        </div>
      );
    } else {
      return (
        <div>
          <h5 className="mb1">Scores</h5>
          <table className="timer-table text-small">
            <tbody>
              <tr>
                <th><abbr title="words per minute">WPM</abbr>:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>Time (seconds):</th>
                <td className="text-right">0</td>
              </tr>
            </tbody>
          </table>

          <h6 className="mt1 mb1 de-emphasized text-uppercase subsection-header">Words typed</h6>
          <table className="timer-table text-small">
            <tbody>
              <tr>
                <th>New:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>Seen before:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>From memory:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>Misstroked:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th>Hinted:</th>
                <td className="text-right">0</td>
              </tr>
              <tr>
                <th className="hide">Word count:</th>
                <td className="right-right hide">0</td>
              </tr>
            </tbody>
          </table>
          <div><Link to="/progress" className="text-small">View your progress</Link></div>
        </div>
      );
    }

  }
}

export default Scores;
