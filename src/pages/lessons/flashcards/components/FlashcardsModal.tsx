import React, { useEffect, useState } from "react";
import OutboundLink from "../../../../components/OutboundLink";
import ReactModal from "react-modal";

type Props = {
  fullscreen: boolean;
};

const FlashcardsModal = ({ fullscreen }: Props) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    ReactModal.setAppElement("#js-app");
  }, []);

  const handleOpenModal = (event: any) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = (event: any) => {
    event.preventDefault();
    setShowModal(false);
  };

  return (
    <p className={`hide-in-fullscreen${fullscreen ? " fullscreen" : ""}`}>
      <button className="button button--secondary" onClick={handleOpenModal}>
        About flashcards
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
          base: "modal",
          afterOpen: "modal--after-open",
          beforeClose: "modal--before-close",
        }}
        overlayClassName={{
          base: "modal__overlay",
          afterOpen: "modal__overlay--after-open",
          beforeClose: "modal__overlay--before-close",
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
        <h3 id="aria-modal-heading">Flashcards</h3>
        <div id="aria-modal-description">
          <p>
            Flashcards are designed for mobile devices so you can memorise steno
            briefs on the go. When you’re unable to recall a brief, tap “Hard”
            to say it was hard to remember. When you can recall a brief without
            hesitation, tap “Easy”. While studying flashcards, imagine which
            fingers and the shape of the outline you’d use to stroke a word.
          </p>
          <p>
            If it’s been a while since you’ve studied, the “threshold” will be
            set quite high. You’ll see flashcards you’ve studied that are below
            the threshold. That is, if the threshold is 12, you’ll see
            flashcards for words you’ve marked “Easy” less than 12 times. If
            you’ve marked a word as “Easy” 15 times, it won’t shown again until
            more time has passed.
          </p>
          <p>
            Thanks to Jim Ladd, you can also use the Anki app to memorise
            briefs. He built flashcard decks for the Top 2000 Words from Project
            Gutenberg using Typey&nbsp;Type steno diagrams:
          </p>
          <ul>
            <li>
              <OutboundLink
                eventLabel="Anki"
                newTabAndIUnderstandTheAccessibilityImplications={true}
                to="https://apps.ankiweb.net/"
              >
                Anki (opens in new tab)
              </OutboundLink>
            </li>
            <li>
              <OutboundLink
                eventLabel="flashcard decks for the Top 2000 Words"
                newTabAndIUnderstandTheAccessibilityImplications={true}
                to="https://github.com/jladdjr/anki-decks/tree/master/Plover%20-%20Project%20Gutenberg%20Top%2010k%20Words"
              >
                Flashcard decks for the Top 2000 Words (opens in new tab)
              </OutboundLink>
            </li>
          </ul>
        </div>
        <div className="text-right">
          <button className="button" onClick={handleCloseModal}>
            OK
          </button>
        </div>
      </ReactModal>
    </p>
  );
};

export default FlashcardsModal;
