import React from "react";
import MultiLineMaterialComponent from "./MultiLineMaterial";
import userSettings from "../../stories/fixtures/userSettings.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Material/MultiLineMaterial",
  component: MultiLineMaterialComponent,
};

const Template = (args) => (
  <div className="p3">
    <MultiLineMaterialComponent {...args} />
  </div>
);

export const MultiLineMaterial = Template.bind({});
MultiLineMaterial.args = {
  actualText: "how ",
  currentPhrase: "how can",
  presentedMaterial: [
    { phrase: "how about", stroke: "HOUB" },
    { phrase: "how can", stroke: "HOUBG" },
    { phrase: "how could", stroke: "HOUBGD" },
  ],
  settings: {
    ignoredChars: "",
  },
  userSettings: userSettings,
  currentPhraseID: 1,
};
MultiLineMaterial.parameters = {
  chromatic: { delay: 300, diffThreshold: 0.78 },
  // If the delay ☝️ doesn't work, try tweaking the diffThreshold:
  // Chromatic’s default threshold is .063, which balances high visual accuracy with low false
  // positives (for example, from artifacts like anti-aliasing).
  // 0 is the most accurate. 1 is the least accurate.
  // https://6262c53f521620003ac2ff49-ukmsdlppcb.chromatic.com/?path=/story/stories-diff-threshold-check--test-yours-out
  // chromatic: { diffThreshold: 0.78 },
};
