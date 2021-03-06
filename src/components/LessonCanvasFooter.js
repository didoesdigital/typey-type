import React, { Component } from 'react';
import Metronome from './Metronome';
import { Tooltip } from 'react-tippy';

class LessonCanvasFooter extends Component {
  render() {
    let toggleClasses;
    if (this.props.hideOtherSettings) {
      toggleClasses = "button button--secondary mb0 text-center subsection-header-toggle collapsed";
    } else {
      toggleClasses = "button button--secondary mb0 text-center subsection-header-toggle";
    }

    return (
      <div className="flex flex-wrap mx-auto mw-1440 justify-between text-small">
        <Metronome
          userSettings={this.props.userSettings}
        />
        <div className="flex flex-wrap">
          <fieldset className="dc hide-sm">
            <Tooltip
              title="Study types are recommended presets for settings you can change"
              className="mw-240"
              animation="shift"
              arrow="true"
              duration="200"
              position="bottom"
              tabIndex="0"
              tag="p"
              theme="didoesdigital didoesdigital-sm"
              trigger="mouseenter focus click"
              onShow={this.props.setAnnouncementMessage}
            >
              <legend className="flex mr3">Study type:</legend>
            </Tooltip>
            <div className="flex mb1">
              <div className="flex flex-wrap justify-between">
                <p className="radio-group mr3 mb0">
                  <label className="radio-label">
                    <input
                      className="radio-input"
                      type="radio"
                      name="study"
                      id="discover"
                      value="discover"
                      disabled={this.props.disableUserSettings}
                      checked={this.props.userSettings.study==="discover"}
                      onChange={this.props.chooseStudy}
                    />
                    <Tooltip
                      title="Discover 5–15 new words with their briefs shown, concentrating on accuracy"
                      className="mw-240"
                      animation="shift"
                      arrow="true"
                      duration="200"
                      position="bottom"
                      tabIndex="0"
                      tag="span"
                      theme="didoesdigital didoesdigital-sm"
                      trigger="mouseenter focus click"
                      onShow={this.props.setAnnouncementMessage}
                    >
                      Discover
                    </Tooltip>
                  </label>
                </p>
                <p className="radio-group mr3 mb0">
                  <label className="radio-label">
                    <input
                      className="radio-input"
                      type="radio"
                      name="study"
                      id="revise"
                      value="revise"
                      disabled={this.props.disableUserSettings}
                      checked={this.props.userSettings.study==="revise"}
                      onChange={this.props.chooseStudy}
                    />
                    <Tooltip
                      title="Revise 50 briefs, recalling the briefs before revealing their strokes and avoiding fingerspelling"
                      className="mw-240"
                      animation="shift"
                      arrow="true"
                      duration="200"
                      position="bottom"
                      tabIndex="0"
                      tag="span"
                      theme="didoesdigital didoesdigital-sm"
                      trigger="mouseenter focus click"
                      onShow={this.props.setAnnouncementMessage}
                    >
                      Revise
                    </Tooltip>
                  </label>
                </p>
              </div>
              <div className="flex flex-wrap justify-between">
                <p className="radio-group mr3 mb0">
                  <label className="radio-label">
                    <input
                      className="radio-input"
                      type="radio"
                      name="study"
                      id="drill"
                      value="drill"
                      disabled={this.props.disableUserSettings}
                      checked={this.props.userSettings.study==="drill"}
                      onChange={this.props.chooseStudy}
                    />
                    <Tooltip
                      title="Drill common words to build your muscle memory, writing as fast as you can"
                      className="mw-240"
                      animation="shift"
                      arrow="true"
                      duration="200"
                      position="bottom"
                      tabIndex="0"
                      tag="span"
                      theme="didoesdigital didoesdigital-sm"
                      trigger="mouseenter focus click"
                      onShow={this.props.setAnnouncementMessage}
                    >
                      Drill
                    </Tooltip>
                  </label>
                </p>
                <p className="radio-group mr3 mb0">
                  <label className="radio-label">
                    <input
                      className="radio-input"
                      type="radio"
                      name="study"
                      id="practice"
                      value="practice"
                      disabled={this.props.disableUserSettings}
                      checked={this.props.userSettings.study==="practice"}
                      onChange={this.props.chooseStudy}
                    />
                    <Tooltip
                      title="Practice longer text in order, mimicking real usage as closely as possible"
                      className="mw-240"
                      animation="shift"
                      arrow="true"
                      duration="200"
                      position="bottom"
                      tabIndex="0"
                      tag="span"
                      theme="didoesdigital didoesdigital-sm"
                      trigger="mouseenter focus click"
                      onShow={this.props.setAnnouncementMessage}
                    >
                      Practice
                    </Tooltip>
                  </label>
                </p>
              </div>
            </div>
          </fieldset>
        </div>
          <p><button className={toggleClasses} onClick={this.props.toggleHideOtherSettings} onKeyPress={this.props.toggleHideOtherSettings} aria-expanded={!this.props.hideOtherSettings} aria-controls="collapsible-settings">{this.props.hideOtherSettings ? "Show settings" : "Hide settings"}</button></p>
      </div>
    )
  }
}

export default LessonCanvasFooter;
