import React from "react";
import Metronome from "./Metronome";
import { Tooltip } from "react-tippy";

type LessonCanvasFooterProps = {
  chooseStudy: () => void;
  disableUserSettings: boolean;
  hideOtherSettings: boolean;
  setAnnouncementMessage: () => void;
  toggleHideOtherSettings: () => void;
  userSettings: any;
};

const LessonCanvasFooter = ({
  chooseStudy,
  disableUserSettings,
  hideOtherSettings,
  setAnnouncementMessage,
  toggleHideOtherSettings,
  userSettings,
}: LessonCanvasFooterProps) => {
  return (
    <div className="flex flex-wrap mx-auto mw-1440 justify-between text-small">
      <Metronome
        setAnnouncementMessage={setAnnouncementMessage}
        userSettings={userSettings}
      />
      <div className="flex flex-wrap">
        <fieldset className="dc hide-sm">
          {/* @ts-ignore */}
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
            onShow={setAnnouncementMessage}
          >
            <legend className="flex mr3">Study type:</legend>
          </Tooltip>
          <div className="flex mb1">
            <div className="flex flex-wrap justify-between">
              <p className="block relative mr3 mb0">
                <label className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name="study"
                    id="discover"
                    value="discover"
                    disabled={disableUserSettings}
                    checked={userSettings.study === "discover"}
                    onChange={chooseStudy}
                  />
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    Discover
                  </Tooltip>
                </label>
              </p>
              <p className="block relative mr3 mb0">
                <label className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name="study"
                    id="revise"
                    value="revise"
                    disabled={disableUserSettings}
                    checked={userSettings.study === "revise"}
                    onChange={chooseStudy}
                  />
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    Revise
                  </Tooltip>
                </label>
              </p>
            </div>
            <div className="flex flex-wrap justify-between">
              <p className="block relative mr3 mb0">
                <label className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name="study"
                    id="drill"
                    value="drill"
                    disabled={disableUserSettings}
                    checked={userSettings.study === "drill"}
                    onChange={chooseStudy}
                  />
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    Drill
                  </Tooltip>
                </label>
              </p>
              <p className="block relative mr3 mb0">
                <label className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    name="study"
                    id="practice"
                    value="practice"
                    disabled={disableUserSettings}
                    checked={userSettings.study === "practice"}
                    onChange={chooseStudy}
                  />
                  {/* @ts-ignore */}
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
                    onShow={setAnnouncementMessage}
                  >
                    Practice
                  </Tooltip>
                </label>
              </p>
            </div>
          </div>
        </fieldset>
      </div>
      <p>
        <button
          className={`button button--secondary mb0 text-center${
            hideOtherSettings ? " collapsed" : ""
          }`}
          onClick={toggleHideOtherSettings}
          onKeyPress={toggleHideOtherSettings}
          aria-expanded={!hideOtherSettings}
          aria-controls="collapsible-settings"
        >
          {hideOtherSettings ? "Show settings" : "Hide settings"}
        </button>
      </p>
    </div>
  );
};

export default LessonCanvasFooter;
