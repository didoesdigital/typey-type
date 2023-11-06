import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

type Props = {
  disabled: boolean;
};

const SpeakWordsHelp = ({ disabled }: Props) => {
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ReactModal.setAppElement("#js-app");
  }, []);

  function handleOpenModal(event: any) {
    event.preventDefault();
    setHasSpeechSupport("speechSynthesis" in window);
    setShowModal(true);
  }

  function handleCloseModal(event: any) {
    event.preventDefault();
    setShowModal(false);
  }

  return (
    <>
      {" "}
      (
      <button
        className="de-emphasized-button text-small"
        onClick={handleOpenModal}
        aria-label="Help with speak words setting"
        disabled={disabled}
      >
        help
      </button>
      <ReactModal
        isOpen={showModal}
        aria={{
          labelledby: "aria-modal-heading",
          describedby: "aria-modal-description",
        }}
        ariaHideApp={true}
        closeTimeoutMS={300}
        role="dialog"
        onRequestClose={handleCloseModal}
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
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
        <h3 id="aria-modal-heading">Speak words setting</h3>
        <div id="aria-modal-description">
          <p>
            Typey Type’s setting to “speak words” will speak words aloud when
            you have the sound turned on. It’s great with story lessons and real
            sentences where the context can help you distinguish homophones.
          </p>
          <p>
            This setting uses fancy browser technology called the “Web Speech
            API”.
          </p>
          <p
            className={
              hasSpeechSupport
                ? "quote mt1 mb3 bg-slat dark:bg-coolgrey-900"
                : "quote mt1 mb3 bg-danger dark:text-coolgrey-900"
            }
          >
            Web Speech is {hasSpeechSupport ? " available" : " unavailable"} on
            your system.
          </p>
          {hasSpeechSupport ? (
            <p>
              If you have working sound but hear no words, your system might be
              missing a language pack or “voice”.
            </p>
          ) : (
            <p>
              <span className="bg-warning">
                You may need to update your browser or check that your device
                has a speech engine and language pack.
              </span>
            </p>
          )}
          <p>For Windows, you can download a “language pack” from Microsoft.</p>
          <p>
            For Linux systems, you may need to install a speech engine with
            voices, such as <code>speech-dispatcher</code> and{" "}
            <code>espeak-ng</code>.
          </p>
          <p>
            Double-click the “Say word” button or type ⇧Enter (e.g.{" "}
            <code>{`"STP*R": "{#Shift_L(Return)}",`}</code>) from the text area
            to hear the word again and keep focus on the text area.
          </p>
        </div>
        <div className="text-right">
          <button className="button" onClick={handleCloseModal}>
            OK
          </button>
        </div>
      </ReactModal>
      )
    </>
  );
};

export default SpeakWordsHelp;
