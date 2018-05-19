import React, { Component } from 'react';
import './App.css';
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import {
  Link
} from 'react-router-dom';

class Scores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCount: 0,
      wordsPerMinute: 0,
      timeInSeconds: 0
    }
  }

  componentDidMount() {
    this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.timer !== null) {
      if (prevProps.timer < this.props.timer) {
        this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords);
      }
    }
  }

  calculateScores(timer, totalNumberOfMatchedWords) {
    let wordsPerMinute;
    if (this.props.timer > 0) {
      wordsPerMinute = Math.round(totalNumberOfMatchedWords/(timer/60/1000));
    } else {
      wordsPerMinute = 0;
    }
    let timeInSeconds = Math.round(timer/1000);
    let wordCount = Math.round(totalNumberOfMatchedWords);
    this.setState({
      wordCount: wordCount,
      wordsPerMinute: wordsPerMinute,
      timeInSeconds: timeInSeconds
    });
  }

  render() {
    if (this.props.timer !== null) {
      return (
        <div>
          <h5 className="mb1">Scores</h5>
          <div className="timer">
            <table className="timer-table text-small">
              <tbody>
                <tr>
                  <th>
                    <Tooltip
                      animation="shift"
                      arrow="true"
                      className="abbr"
                      duration="200"
                      tabIndex="0"
                      tag="abbr"
                      theme="didoesdigital"
                      title="words per minute"
                      trigger="mouseenter focus click"
                      onShow={this.props.setAnnouncementMessage}
                    >WPM</Tooltip>:</th>
                  <td className="text-right">{this.state.wordsPerMinute}</td>
                </tr>
                <tr>
                  <th>Time (seconds):</th>
                  <td className="text-right">{this.state.timeInSeconds}</td>
                </tr>
              </tbody>
            </table>

            <h6 className="mt1 mb1 de-emphasized text-uppercase subsection-header">Words typed</h6>
            <table className="timer-table text-small">
              <tbody>
                <tr>
                  <th>New:</th>
                  <td className="text-right">{this.props.totalNumberOfNewWordsMet}</td>
                </tr>
                <tr>
                  <th>Seen before:</th>
                  <td className="text-right">{this.props.totalNumberOfLowExposuresSeen}</td>
                </tr>
                <tr>
                  <th>From memory:</th>
                  <td className="text-right">{this.props.totalNumberOfRetainedWords}</td>
                </tr>
                <tr>
                  <th>Misstroked:</th>
                  <td className="text-right">{this.props.totalNumberOfMistypedWords}</td>
                </tr>
                <tr>
                  <th>Hinted:</th>
                  <td className="text-right">{this.props.totalNumberOfHintedWords}</td>
                </tr>
                <tr>
                  <th className="hide">Word count:</th>
                  <td className="text-right hide">~{this.state.wordCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div><Link to="/progress" className="text-small" id="ga--scores--view-your-progress">View your progress</Link></div>
        </div>
      );
    } else {
      return (
        <div>
          <h5 className="mb1">Scores</h5>
          <table className="timer-table text-small">
            <tbody>
              <tr>
                <th>
                  <Tooltip
                    animation="shift"
                    arrow="true"
                    className="abbr"
                    duration="200"
                    tabIndex="0"
                    tag="abbr"
                    theme="didoesdigital"
                    title="words per minute"
                    trigger="mouseenter focus click"
                    onShow={this.props.setAnnouncementMessage}
                  >WPM</Tooltip>:</th>
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
          <div><Link to="/progress" className="text-small" id="ga--scores--empty--view-your-progress">View your progress</Link></div>
        </div>
      );
    }

  }
}

export default Scores;
