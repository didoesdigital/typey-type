import React from "react";
import ProgressSummaryAndLinks from "./ProgressSummaryAndLinks";
import metWordsNovice from "../../../fixtures/metWordsNovice.json";
import metWords10000WordsSeen10000Memorised from "../../../fixtures/metWords10000WordsSeen10000Memorised.json";
import userSettings from "../../../stories/fixtures/userSettings";

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
  userSettings: userSettings,
  restartConfetti: restartConfetti,
  yourMemorisedWordCount: 0,
  yourSeenWordCount: 128,
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
  userSettings: userSettings,
  yourMemorisedWordCount: 10000,
  yourSeenWordCount: 10000,
};
