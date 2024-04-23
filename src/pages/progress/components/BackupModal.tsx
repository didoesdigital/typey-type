import React, { useEffect } from "react";
import ReactModal from "react-modal";

type Props = {
  isOpen: boolean;
  handleCloseModal: () => void;
};
const BackupModal: React.FC<Props> = ({ isOpen, handleCloseModal }) => {
  useEffect(() => {
    ReactModal.setAppElement("#js-app");
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
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
      <h3 id="aria-modal-heading">Back up your progress</h3>
      <p>
        Typey Type saves your typing progress in your browser’s local storage.{" "}
        <span className="bg-danger dark:text-coolgrey-900">
          You’ll lose your progress if you clear your browsing data (history,
          cookies, and cache).
        </span>{" "}
        If you share this device with other people or use Typey Type across
        several devices and browsers, you should save your progress elsewhere.
      </p>
      <h3>Save progress</h3>
      <p>You can:</p>
      <ul>
        <li>
          Copy your progress to your clipboard and save it in a text file
          somewhere safe, or
        </li>
        <li>
          Hit “Download progress file” to save your progress as a JSON file.
        </li>
      </ul>
      <h3>Load progress</h3>
      <p>
        When you return, hit “Load progress” and enter your progress to load it
        back into Typey Type. You can also clear your progress by loading in
        empty curly braces, <code>{"{}"}</code>
      </p>
      <div className="text-right">
        <button className="button" onClick={handleCloseModal}>
          OK
        </button>
      </div>
    </ReactModal>
  );
};

export default BackupModal;
