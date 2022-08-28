import React from "react";
import SingleLineMaterialComponent from "./SingleLineMaterial";
import userSettings from "../../stories/fixtures/userSettings.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Material/SingleLineMaterial",
  component: SingleLineMaterialComponent,
};

const Template = (args) => (
  <div className="p3 mw-40">
    <SingleLineMaterialComponent {...args} />
  </div>
);

export const SingleLineMaterial = Template.bind({});
SingleLineMaterial.args = {
  actualText: "how ",
  completedPhrases: ["how about"],
  currentPhrase: "how can",
  settings: {
    ignoredChars: "",
  },
  upcomingPhrases: ["how could"],
  userSettings: userSettings,
};
