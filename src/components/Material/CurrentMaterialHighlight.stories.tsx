import CurrentMaterialHighlightComponent from "./CurrentMaterialHighlight";
import userSettings from "../../stories/fixtures/userSettings";

export default {
  title: "Material/CurrentMaterialHighlight",
  component: CurrentMaterialHighlightComponent,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <CurrentMaterialHighlightComponent {...args} />
  </div>
);

export const CurrentMaterialHighlight = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
CurrentMaterialHighlight.args = {
  actualText: "how ",
  currentPhrase: "how can",
  settings: {
    ignoredChars: "",
  },
  userSettings: userSettings,
  currentPhraseID: 0,
};
