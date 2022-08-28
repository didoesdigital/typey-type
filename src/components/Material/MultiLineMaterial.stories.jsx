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
