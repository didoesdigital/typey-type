import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
import Material from './Material';
import TypedText from './TypedText';
import Scores from './Scores';
import UserSettings from './UserSettings';
import './App.css';

class Lesson extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const lesson = this.props.lessonIndex.find(lesson => '/lessons'+lesson.path === this.props.match.url+'lesson.txt');
    let lessonData;

    if(lesson) {
      this.props.handleLesson('/lessons'+lesson.path);
      let lessonsubtitle = '';
      if (lesson.subtitle.length > 0) {
        lessonsubtitle = ': '+lesson.subtitle;
      }

      lessonData = <div>
        <h3>{lesson.title}{lessonsubtitle}</h3>
        <p>{lesson.category}</p>
        <p>{lesson.subcategory}</p>
      </div>;
    } else {
      lessonData = <h2>That lesson is missing.</h2>;
    }
  }

  render() {
    let strokeTip;
    let customMessage;
    if (this.props.settings.customMessage) {
      customMessage = <h3 className="custom-message">{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = <span style={{paddingTop: '24px' }}>&nbsp;</span>
    }
    if (this.props.userSettings.showStrokes || this.props.showStrokesInLesson) {
      strokeTip = <div className="stroke-tip"><span className="visually-hidden">Hint: </span><pre><span className="steno-stroke"><abbr>{this.props.currentStroke}</abbr></span></pre></div>;
    } else {
      strokeTip =
        <div className="stroke-tip">
          <label className="mb0">
            <input
              className="checkbox-input hide"
              type="checkbox"
              name="showStrokesInLesson"
              id="showStrokesInLesson"
              checked={this.props.showStrokesInLesson}
              onChange={this.props.changeShowStrokesInLesson}
              />
            Show stroke?
          </label>
        </div>;
    }
    return (
      <div>
        {customMessage}
        <div className="content">
          <UserSettings
            changeUserSetting={this.props.changeUserSetting}
            changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
            changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
            disableUserSettings={this.props.disableUserSettings}
            handleLimitWordsChange={this.props.handleLimitWordsChange}
            handleRepetitionsChange={this.props.handleRepetitionsChange}
            totalWordCount={this.props.totalWordCount}
            userSettings={this.props.userSettings}
          />
          <div className="lesson-canvas">
            <div className="mx-auto text-center">
              <Material
                actualText={this.props.actualText}
                currentPhrase={this.props.currentPhrase}
                currentStroke={this.props.currentStroke}
                settings={this.props.settings}
                userSettings={this.props.userSettings}
              />
              <TypedText
                actualText={this.props.actualText}
                currentPhrase={this.props.currentPhrase}
                settings={this.props.settings}
                updateMarkup={this.props.updateMarkup.bind(this)}
                userSettings={this.props.userSettings}
              />
              <div role="status" aria-live="assertive">
                {strokeTip}
              </div>
            </div>
          </div>
          <div className="scores">
            <Scores
              timer={this.props.timer}
              totalNumberOfMatchedWords={this.props.totalNumberOfMatchedWords}
              totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
              totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
              totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
              totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
              totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Lesson;
