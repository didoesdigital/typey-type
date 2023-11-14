import React, { Component } from "react";
import { Tooltip } from "react-tippy";

class Scores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCount: 0,
      wordsPerMinute: 0,
      timeInSeconds: 0,
    };
  }

  componentDidMount() {
    this.calculateScores(
      this.props.timer,
      this.props.totalNumberOfMatchedWords
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.timer !== null) {
      if (prevProps.timer < this.props.timer) {
        this.calculateScores(
          this.props.timer,
          this.props.totalNumberOfMatchedWords
        );
      }
    }
  }

  calculateScores(timer, totalNumberOfMatchedWords) {
    let wordsPerMinute;
    if (this.props.timer > 0) {
      wordsPerMinute = Math.round(
        totalNumberOfMatchedWords / (timer / 60 / 1000)
      );
    } else {
      wordsPerMinute = 0;
    }
    let timeInSeconds = Math.round(timer / 1000);
    let wordCount = Math.round(totalNumberOfMatchedWords);
    this.setState({
      wordCount: wordCount,
      wordsPerMinute: wordsPerMinute,
      timeInSeconds: timeInSeconds,
    });
  }

  render() {
    return (
      <div>
        <h3 className="mb1 visually-hidden">Scores</h3>
        <div className="timer flex flex-wrap justify-around">
          <div className="stat">
            <div className="stat__number stat__number--min-w text-center">
              {this.state.wordsPerMinute}
            </div>
            <div className="stat__label text-center">
              {/* @ts-ignore */}
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
              >
                WPM
              </Tooltip>
            </div>
          </div>
          <div className="stat">
            <div className="stat__number stat__number--min-w text-center">
              {this.state.timeInSeconds}
            </div>
            <div className="stat__label text-center">Time (seconds)</div>
          </div>

          <h4 className="visually-hidden">Words typed</h4>
          <div className="stat">
            <div className="stat__number stat__number--min-w text-center">
              {this.props.totalNumberOfNewWordsMet}
            </div>
            <div className="stat__label text-center">New</div>
          </div>
          <div className="stat">
            <div className="stat__number stat__number--min-w text-center">
              {this.props.totalNumberOfLowExposuresSeen}
            </div>
            <div className="stat__label text-center">Seen before</div>
          </div>
          <div className="stat">
            <div className="stat__number stat__number--min-w text-center">
              {this.props.totalNumberOfRetainedWords}
            </div>
            <div className="stat__label text-center">From memory</div>
          </div>
          <div className="stat">
            <div className="stat__number stat__number--min-w text-center">
              {this.props.totalNumberOfMistypedWords}
            </div>
            <div className="stat__label text-center">Misstroked</div>
          </div>
          <div className="stat">
            <div className="stat__number stat__number--min-w text-center">
              {this.props.totalNumberOfHintedWords}
            </div>
            <div className="stat__label text-center">Hinted</div>
          </div>
          <div className="stat visually-hidden">
            <div className="stat__number stat__number--min-w text-center hide">
              ~{this.state.wordCount}
            </div>
            <div className="stat__label hide">Word count</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Scores;
