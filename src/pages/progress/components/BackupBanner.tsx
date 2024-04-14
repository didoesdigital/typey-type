import React, { useState } from "react";
import BackupModal from "./BackupModal";

const BANNER_REAPPEAR_INTERVAL = 1000 * 60 * 60 * 24 * 7; // 1 week

type Props = {
  dismissedTime: number | null;
  dismiss: () => void;
}
const BackupBanner: React.FC<Props> = ({ dismissedTime, dismiss }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  if (dismissedTime !== null && Date.now() < dismissedTime + BANNER_REAPPEAR_INTERVAL) return null;
  return (
    <>
      <div
        className="notification notification--global  w-100 flex wrap justify-between pa1 p1 p3 pa3 mb3 items-center bg-danger dark:text-coolgrey-900">
        <div className="notification__message">
          <p className="mb0">
            <strong>Back up your progress regularly:</strong> Your progress data is saved in your browser. You’ll lose
            your progress if you clear your browsing data (history, cookies, and cache). <button
            className="de-emphasized-button" onClick={() => setModalOpen(true)}>Learn more</button>.
          </p>
        </div>
        <button className="de-emphasized-button flex items-center justify-center p1" aria-label="Dismiss notification"
                onClick={dismiss}>
          <span className="icon" style={{
            display: "inline-block",
            mask: "url('/typey-type/static/media/ClosingCross.e18cfc9be01581b8127611e43f8ea303.svg') center center / contain no-repeat",
            width: "1em",
            height: "1em"
          }}></span>
        </button>
      </div>
      <BackupModal isOpen={isModalOpen} handleCloseModal={() => setModalOpen(false)} />
    </>
  );
};

export default BackupBanner;
