import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Metronome from "./Metronome";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../../states/userSettingsState";
import type { Study } from "../../../types";

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
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  const [showStudyTypeModal, setShowStudyTypeModal] = useState(false);

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

  function handleOpenStudyTypeModal(event: any) {
    event.preventDefault();
    setShowStudyTypeModal(true);
  }

  function handleCloseStudyTypeModal(event: any) {
    event.preventDefault();
    setShowStudyTypeModal(false);
  }

  function handleOpenStudyPresetsModal(event: any) {
    event.preventDefault();
    setShowPresetsModal(true);
  }

  function handleCloseStudyPresetsModal(event: any) {
    event.preventDefault();
    setShowPresetsModal(false);
  }

  function savePreset() {
    updatePreset(userSettings.study);
    setShowPresetsModal(false);
  }

  return (
    <div className="flex flex-wrap mx-auto mw-1440 justify-between text-small">
      <Metronome />
      <div className="flex flex-wrap content-center">
        <fieldset className="dc hide-sm">
          <p>
            <legend className="flex mr3">
              <button
                className="de-emphasized-button text-small"
                onClick={handleOpenStudyTypeModal}
                style={{ height: "fit-content", lineHeight: 2 }}
              >
                Study type:
              </button>
            </legend>
          </p>
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
                  Discover
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
                  Revise
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
                  Drill
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
                  Practice
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
          isOpen={showStudyTypeModal}
          aria={{
            labelledby: "aria-study-type-modal-heading",
            describedby: "aria-study-type-modal-description",
          }}
          ariaHideApp={true}
          closeTimeoutMS={300}
          role="dialog"
          onRequestClose={handleCloseStudyTypeModal}
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
              onClick={handleCloseStudyTypeModal}
            >
              Close
            </button>
          </div>
          <h3 id="aria-study-type-modal-heading">Study types</h3>
          <div id="aria-study-type-modal-description">
            <p>
              Study types are recommended presets for settings you can change:
            </p>
            <ul>
              <li>
                <strong>Discover</strong> 5–15 new words with their briefs
                shown, concentrating on accuracy.
              </li>
              <li>
                <strong>Revise</strong> 50 briefs, recalling the briefs before
                revealing their strokes and avoiding fingerspelling.
              </li>
              <li>
                <strong>Drill</strong> common words to build your muscle memory,
                writing as fast as you can.
              </li>
              <li>
                <strong>Practice</strong> longer text in order, mimicking real
                usage as closely as possible.
              </li>
            </ul>
          </div>
          <div className="text-right">
            <button className="button" onClick={handleCloseStudyTypeModal}>
              OK
            </button>
          </div>
        </ReactModal>
        <ReactModal
          isOpen={showPresetsModal}
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
