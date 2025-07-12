import React from "react";
import ProgressSummaryAndLinks from "./ProgressSummaryAndLinks";
import metWordsNovice from "../../../fixtures/metWordsNovice.json";
import metWords10000WordsSeen10000Memorised from "../../../fixtures/metWords10000WordsSeen10000Memorised.json";
import userSettings from "../../../stories/fixtures/userSettings";

export default {
  title: "Progress/SummaryAndLinks",
  component: ProgressSummaryAndLinks,
  id: "progress-summary", // permalink
  decorators: [
    // @ts-expect-error TS(7006) FIXME: Parameter 'Story' implicitly has an 'any' type.
    (Story) => (
      <div className="p3 mx-auto mw-1024">
        <Story />
      </div>
    ),
  ],
};

const restartConfetti = () => console.log("Restart confetti");

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => <ProgressSummaryAndLinks {...args} />;

export const ProgressSummaryAndLinksStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
ProgressSummaryAndLinksStory.storyName = "Summary and links";
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
ProgressSummaryAndLinksStory.args = {
  metWords: metWordsNovice,
  userSettings: userSettings,
  restartConfetti: restartConfetti,
  yourMemorisedWordCount: 0,
  yourSeenWordCount: 128,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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
