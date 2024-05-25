import React, { useState } from "react";
import BackupModal from "./BackupModal";
import ClosingCross from "../../../components/Icons/icon-images/ClosingCross.svg";
import Icon from "../../../components/Icons/Icon";
import { useAtomValue } from "jotai";
import { backupBannerDismissedTime } from "../../../states/globalUserSettingsState";
import { useDismissBackupBanner } from "../../lessons/components/UserSettings/updateGlobalUserSetting";

const BANNER_REAPPEAR_INTERVAL = 1000 * 60 * 60 * 24 * 7; // 1 week

const BackupBanner: React.FC = () => {
  const dismissedTime = useAtomValue(backupBannerDismissedTime);
  const dismiss = useDismissBackupBanner();
  const [isModalOpen, setModalOpen] = useState(false);
  if (
    dismissedTime !== null &&
    Date.now() < dismissedTime + BANNER_REAPPEAR_INTERVAL
  )
    return null;
  return (
    <>
      <div className="notification notification--global  w-100 flex wrap justify-between pa1 p1 p3 pa3 mb3 items-center bg-danger dark:text-coolgrey-900">
        <div className="notification__message">
          <p className="mb0">
            <strong>Back up your progress regularly:</strong> Your progress data
            is saved in your browser. You’ll lose your progress if you clear
            your browsing data (history, cookies, and cache).{" "}
            <button
              className="de-emphasized-button"
              onClick={() => setModalOpen(true)}
            >
              Learn more
            </button>
            .
          </p>
        </div>
        <button
          className="de-emphasized-button flex items-center justify-center p1"
          aria-label="Dismiss notification"
          onClick={dismiss}
        >
          <Icon iconSVGImport={ClosingCross} width="1em" height="1em" />
        </button>
      </div>
      <BackupModal
        isOpen={isModalOpen}
        handleCloseModal={() => setModalOpen(false)}
      />
    </>
  );
};

export default BackupBanner;
