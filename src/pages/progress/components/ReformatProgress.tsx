import React, { useCallback, useMemo, useState } from "react";
import GoogleAnalytics from "react-ga4";
import formatSpacePlacementValue from "../utils/formatSpacePlacementValue";
import makeDownloadHref from "../../../utils/makeDownloadHref";
import trimAndSumUniqMetWords from "../../../utils/trimAndSumUniqMetWords";
import formatProgressFileDownloadName from "../utils/formatProgressFileDownloadName";
import type { MetWords, UserSettings } from "../../../types";

type Props = {
  metWords: MetWords;
  userSettings: UserSettings;
};

const ReformatProgress = ({ metWords, userSettings }: Props) => {
  const [reformattedProgress, setReformattedProgress] = useState({});

  const downloadReformattedProgressHref = useMemo(
    () => makeDownloadHref(reformattedProgress),
    [reformattedProgress]
  );

  const downloadReformattedProgress = useCallback(() => {
    const spacePlacement = userSettings.spacePlacement;
    let reformattedProgress = trimAndSumUniqMetWords(metWords);

    if (spacePlacement === "spaceBeforeOutput") {
      reformattedProgress = Object.fromEntries(
        Object.entries(reformattedProgress).map(([word, count]) => [
          " " + word,
          count,
        ])
      );
    } else if (spacePlacement === "spaceAfterOutput") {
      reformattedProgress = Object.fromEntries(
        Object.entries(reformattedProgress).map(([word, count]) => [
          word + " ",
          count,
        ])
      );
    }

    setReformattedProgress(reformattedProgress);

    GoogleAnalytics.event({
      category: "Downloads",
      action: "Click",
      label: "typey-type-reformatted-progress.json",
    });
  }, [metWords, userSettings.spacePlacement]);

  return (
    <p className="bg-coolgrey-300 dark:bg-coolgrey-1000 pl1 pr1">
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
