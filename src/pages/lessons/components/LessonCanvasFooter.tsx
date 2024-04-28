import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Metronome from "./Metronome";
import { Tooltip } from "react-tippy";
import type { Study } from "../../../types";
import useAnnounceTooltip from "../../../components/Announcer/useAnnounceTooltip";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../../states/userSettingsState";

type LessonCanvasFooterProps = {
  chooseStudy: () => void;
  disableUserSettings: boolean;
  toggleHideOtherSettings: () => void;
  updatePreset: (studyType: Study) => void;
};

const LessonCanvasFooter = ({
  chooseStudy,
  disableUserSettings,
  toggleHideOtherSettings,
  updatePreset,
}: LessonCanvasFooterProps) => {
  const userSettings = useAtomValue(userSettingsState);
  const [showModal, setShowModal] = useState(false);
  const announceTooltip = useAnnounceTooltip();

  const studyBlurb =
    userSettings.study === "practice"
      ? "The “Practice” study type lets you mimic real usage as closely as possible by showing new, seen, and memorised words."
      : userSettings.study === "drill"
      ? "The “Drill” study type helps you build up your muscle memory and test your skills by showing you words you’ve memorised."
      : userSettings.study === "revise"
      ? "The “Revise” study type helps you revise recently learned outlines by showing only words you’ve seen."
      : "The “Discover” study type lets you discover new outlines by showing only a limited number of new words while revealing their strokes.";

  useEffect(() => {
    ReactModal.setAppElement("#js-app");
  }, []);

  function handleOpenStudyPresetsModal(event: any) {
    event.preventDefault();
    setShowModal(true);
  }

  function handleCloseStudyPresetsModal(event: any) {
    event.preventDefault();
    setShowModal(false);
  }

  function savePreset() {
    updatePreset(userSettings.study);
    setShowModal(false);
  }

  return (
    <div className="flex flex-wrap mx-auto mw-1440 justify-between text-small">
      <Metronome />
      <div className="flex flex-wrap content-center">
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
            onShow={announceTooltip}
          >
            <legend className="flex mr3">Study type:</legend>
          </Tooltip>
          <div className="flex mb1">
            <div className="flex flex-wrap justify-between">
              <p className="block relative mr3 mb0">
                <label className="radio-label mb0">
                  <input
                    className="radio-input mr1"
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
                    onShow={announceTooltip}
                  >
                    Discover
                  </Tooltip>
                </label>
                <button
                  className="de-emphasized-button text-small"
                  style={{
                    "marginLeft": "22px",
                    "display":
                      userSettings.study === "discover" ? "block" : "none",
                  }}
                  onClick={handleOpenStudyPresetsModal}
                  disabled={disableUserSettings}
                >
                  Save…
                </button>
              </p>
              <p className="block relative mr3 mb0">
                <label className="radio-label mb0">
                  <input
                    className="radio-input mr1"
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
                    onShow={announceTooltip}
                  >
                    Revise
                  </Tooltip>
                </label>
                <button
                  className="de-emphasized-button text-small"
                  style={{
                    "marginLeft": "22px",
                    "display":
                      userSettings.study === "revise" ? "block" : "none",
                  }}
                  onClick={handleOpenStudyPresetsModal}
                  disabled={disableUserSettings}
                >
                  Save…
                </button>
              </p>
            </div>
            <div className="flex flex-wrap justify-between">
              <p className="block relative mr3 mb0">
                <label className="radio-label mb0">
                  <input
                    className="radio-input mr1"
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
                    onShow={announceTooltip}
                  >
                    Drill
                  </Tooltip>
                </label>
                <button
                  className="de-emphasized-button text-small"
                  style={{
                    "marginLeft": "22px",
                    "display":
                      userSettings.study === "drill" ? "block" : "none",
                  }}
                  onClick={handleOpenStudyPresetsModal}
                  disabled={disableUserSettings}
                >
                  Save…
                </button>
              </p>
              <p className="block relative mr3 mb0">
                <label className="radio-label mb0">
                  <input
                    className="radio-input mr1"
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
                    onShow={announceTooltip}
                  >
                    Practice
                  </Tooltip>
                </label>
                <button
                  className="de-emphasized-button text-small"
                  style={{
                    "marginLeft": "22px",
                    "display":
                      userSettings.study === "practice" ? "block" : "none",
                  }}
                  onClick={handleOpenStudyPresetsModal}
                  disabled={disableUserSettings}
                >
                  Save…
                </button>
              </p>
            </div>
          </div>
        </fieldset>
        <ReactModal
          isOpen={showModal}
          aria={{
            labelledby: "aria-study-presets-modal-heading",
            describedby: "aria-study-presets-modal-description",
          }}
          ariaHideApp={true}
          closeTimeoutMS={300}
          role="dialog"
          onRequestClose={handleCloseStudyPresetsModal}
          className={{
            "base": "modal",
            "afterOpen": "modal--after-open",
            "beforeClose": "modal--before-close",
          }}
          overlayClassName={{
            "base": "modal__overlay",
            "afterOpen": "modal__overlay--after-open",
            "beforeClose": "modal__overlay--before-close",
          }}
        >
          <div className="fr">
            <button
              className="de-emphasized-button hide-md"
              onClick={handleCloseStudyPresetsModal}
            >
              Close
            </button>
          </div>
          <h3 id="aria-study-presets-modal-heading">
            {getPrettyStudy(userSettings.study)} study type preset
          </h3>
          <div id="aria-study-presets-modal-description">
            <p>
              {studyBlurb} Selecting this study type preset will update the
              settings accordingly.
            </p>
            <p>
              You can save your current word count and repetitions settings so
              that the next time you select “
              {getPrettyStudy(userSettings.study)}”, Typey&nbsp;Type will
              remember to use them:
            </p>
            <ul>
              <li>
                Limit number of words:{" "}
                {userSettings.limitNumberOfWords || "0 (show all)"}
              </li>
              <li>Repetitions: {userSettings.repetitions}</li>
            </ul>
            <button
              className="button button--secondary"
              onClick={() => savePreset()}
            >
              Save {getPrettyStudy(userSettings.study)} preset
            </button>
          </div>
          <div className="text-right">
            <button className="button" onClick={handleCloseStudyPresetsModal}>
              Cancel
            </button>
          </div>
        </ReactModal>
      </div>
      <p>
        <button
          className={`button button--secondary mb0 text-center${
            userSettings.hideOtherSettings ? " collapsed" : ""
          }`}
          onClick={toggleHideOtherSettings}
          onKeyPress={toggleHideOtherSettings}
          aria-expanded={!userSettings.hideOtherSettings}
          aria-controls="collapsible-settings"
        >
          {userSettings.hideOtherSettings ? "Show settings" : "Hide settings"}
        </button>
      </p>
    </div>
  );
};

function getPrettyStudy(studyType: Study) {
  switch (studyType) {
    case "discover":
      return "Discover";

    case "revise":
      return "Revise";

    case "drill":
      return "Drill";

    case "practice":
      return "Practice";

    default:
      return studyType;
  }
}

export default LessonCanvasFooter;
