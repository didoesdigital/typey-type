import React from "react";
import FinishedNextLessonButton from "./FinishedNextLessonButton";
import { useAtomValue } from "jotai";
import {
  newWordsState,
  seenWordsState,
  startFromWordSettingState,
} from "../../../states/userSettingsState";

import {
  useSetNewWords,
  useSetSeenWords,
  useStartFromWordOne,
} from "./UserSettings/updateUserSetting";

type FinishedZeroAndEmptyStateProps = {
  suggestedNextUrl: string;
};

const FinishedZeroAndEmptyState = ({
  suggestedNextUrl,
}: FinishedZeroAndEmptyStateProps) => {
  const newWords = useAtomValue(newWordsState);
  const seenWords = useAtomValue(seenWordsState);
  const startFromWordSetting = useAtomValue(startFromWordSettingState);
  const startFromWordOne = useStartFromWordOne();
  const setNewWords = useSetNewWords();
  const setSeenWords = useSetSeenWords();

  const StartFromWordOneButton = () => (
    <div className="text-center">
      <button className="button mt3 dib" onClick={startFromWordOne}>
        Start from word 1
      </button>
    </div>
  );

  const addNewWords = () => {
    setNewWords(true);
  };

  const addSeenWords = () => {
    setSeenWords(true);
  };

  const DiscoverOrReviseButton = () =>
    !newWords ? (
      <button className="button button--secondary" onClick={addNewWords}>
        Add new words
      </button>
    ) : !seenWords ? (
      <button className="button button--secondary" onClick={addSeenWords}>
        Add seen words
      </button>
    ) : null;

  return (
    <div className="dc">
      <div className="text-center mt10 mx-auto">
        <span id="js-no-words-to-write" tabIndex={-1}>
          There are no words to write.
        </span>
        {startFromWordSetting > 1 ? (
          <StartFromWordOneButton />
        ) : (
          <div className="text-center mt3 flex flex-wrap justify-center items-center gap-4">
            <DiscoverOrReviseButton />
            <FinishedNextLessonButton suggestedNextUrl={suggestedNextUrl} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinishedZeroAndEmptyState;
