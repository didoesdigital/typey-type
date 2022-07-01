import React from "react";
import { Link } from "react-router-dom";

type FinishedZeroAndEmptyStateProps = {
  startFromWordSetting: number;
  startFromWordOneClickHandler: () => void;
  suggestedNextUrl: string;
};

const FinishedZeroAndEmptyState = ({
  startFromWordSetting,
  startFromWordOneClickHandler,
  suggestedNextUrl,
}: FinishedZeroAndEmptyStateProps) => {
  return (
    <div className="dc">
      <div className="text-center mt10 mx-auto">
        <span id="js-no-words-to-write" tabIndex={-1}>
          There are no words to write.
        </span>
        {startFromWordSetting > 1 ? (
          <div className="text-center">
            <button
              className="button mt3 dib"
              onClick={startFromWordOneClickHandler}
            >
              Start from word 1
            </button>
          </div>
        ) : (
          <div className="text-center">
            {/* eslint-disable-next-line jsx-a11y/no-access-key */}
            <Link
              aria-label="Next lesson"
              accessKey={"o"}
              to={suggestedNextUrl}
              className="button mt3 dib"
              style={{ lineHeight: 2 }}
              role="button"
            >
              Next less<u>o</u>n
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinishedZeroAndEmptyState;
