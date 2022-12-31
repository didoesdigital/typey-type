import React from "react";
import ProgressSummaryAndLinks from "./ProgressSummaryAndLinks";
import metWordsNovice from "../../../fixtures/metWordsNovice.json";
import metWords10000WordsSeen10000Memorised from "../../../fixtures/metWords10000WordsSeen10000Memorised.json";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Progress/SummaryAndLinks",
  component: ProgressSummaryAndLinks,
  id: "progress-summary", // permalink
  decorators: [
    (Story) => (
      <div className="p3 mx-auto mw-1024">
        <Story />
      </div>
    ),
  ],
};

const restartConfetti = () => console.log("Restart confetti");

const Template = (args) => <ProgressSummaryAndLinks {...args} />;

export const ProgressSummaryAndLinksStory = Template.bind({});
ProgressSummaryAndLinksStory.storyName = "Summary and links";
ProgressSummaryAndLinksStory.args = {
  metWords: metWordsNovice,
  restartConfetti: restartConfetti,
  yourMemorisedWordCount: 1,
  yourSeenWordCount: 1,
};

export const CompletedProgressSummaryAndLinksStory = (args) => (
  <ProgressSummaryAndLinks
    {...args}
    metWords={metWords10000WordsSeen10000Memorised}
  />
);
CompletedProgressSummaryAndLinksStory.storyName = "Completed progress summary";
CompletedProgressSummaryAndLinksStory.args = {
  restartConfetti: restartConfetti,
  yourMemorisedWordCount: 10000,
  yourSeenWordCount: 10000,
};
