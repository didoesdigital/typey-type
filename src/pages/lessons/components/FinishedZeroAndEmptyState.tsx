import React from "react";
import FinishedNextLessonButton from "./FinishedNextLessonButton";
import { useAtomValue } from "jotai";
import { startFromWordSettingState } from "../../../states/userSettingsState";

import { useStartFromWordOne } from "./UserSettings/updateUserSetting";

type FinishedZeroAndEmptyStateProps = {
  suggestedNextUrl: string;
};

const FinishedZeroAndEmptyState = ({
  suggestedNextUrl,
}: FinishedZeroAndEmptyStateProps) => {
  const startFromWordSetting = useAtomValue(startFromWordSettingState);
  const startFromWordOne = useStartFromWordOne();
  return (
    <div className="dc">
      <div className="text-center mt10 mx-auto">
        <span id="js-no-words-to-write" tabIndex={-1}>
          There are no words to write.
        </span>
        {startFromWordSetting > 1 ? (
          <div className="text-center">
            <button className="button mt3 dib" onClick={startFromWordOne}>
              Start from word 1
            </button>
          </div>
        ) : (
          <div className="text-center mt3">
            <FinishedNextLessonButton suggestedNextUrl={suggestedNextUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinishedZeroAndEmptyState;
