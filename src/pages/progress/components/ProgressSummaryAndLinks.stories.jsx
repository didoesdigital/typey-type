import React from "react";
import ProgressSummaryAndLinks from "./ProgressSummaryAndLinks";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Progress/SummaryAndLinks",
  component: ProgressSummaryAndLinks,
  id: "progress-summary", // permalink
};

const Template = (args) => {
  return (
    <div className="p3 mx-auto mw-1024">
      <ProgressSummaryAndLinks
        {...args}
        progressPercent={3}
        restartConfetti={() => {
          console.log("Restart confetti");
        }}
      />
    </div>
  );
};

export const ProgressSummaryAndLinksStory = Template.bind({});
ProgressSummaryAndLinksStory.storyName = "Summary and links";
ProgressSummaryAndLinksStory.args = {
  yourMemorisedWordCount: 1,
  yourSeenWordCount: 1,
  yourWordCount: 2,
};
