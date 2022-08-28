import React from "react";
import CurrentMaterialHighlightComponent from "./CurrentMaterialHighlight";
import userSettings from "../../stories/fixtures/userSettings.js";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Material/CurrentMaterialHighlight",
  component: CurrentMaterialHighlightComponent,
};

const Template = (args) => (
  <div className="p3">
    <CurrentMaterialHighlightComponent {...args} />
  </div>
);

export const CurrentMaterialHighlight = Template.bind({});
CurrentMaterialHighlight.args = {
  actualText: "how ",
  currentPhrase: "how can",
  settings: {
    ignoredChars: "",
  },
  userSettings: userSettings,
  currentPhraseID: 0,
};
