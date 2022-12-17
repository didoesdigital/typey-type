import React, { useMemo } from "react";
import formatSpacePlacementValue from "../utils/formatSpacePlacementValue";
import makeDownloadHref from "../utils/makeDownloadHref";
import formatProgressFileDownloadName from "../utils/formatProgressFileDownloadName";
import type { MetWords, UserSettings } from "../../../types";

type Props = {
  downloadReformattedProgress: () => void;
  reformattedProgress: MetWords;
  userSettings: UserSettings;
};

const ReformatProgress = ({
  downloadReformattedProgress,
  reformattedProgress,
  userSettings,
}: Props) => {
  const downloadReformattedProgressHref = useMemo(
    () => makeDownloadHref(reformattedProgress),
    [reformattedProgress]
  );

  return (
    <p className="bg-slat pl1 pr1">
      If you’ve changed your spacing settings, you can download a reformatted
      “progress file” to match your new setting. After downloading it, if you're
      happy it looks good you can load it back into Typey Type. Then visit each
      lesson to update lesson progress. Your current spacing setting is:{" "}
      {formatSpacePlacementValue(userSettings)}.{" "}
      <a
        href={downloadReformattedProgressHref}
        download={formatProgressFileDownloadName(
          "typey-type-reformatted-progress-"
        )}
        onClick={downloadReformattedProgress}
      >
        Download reformatted progress file
      </a>
    </p>
  );
};

export default ReformatProgress;
