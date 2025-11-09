import SingleLineMaterialComponent from "./SingleLineMaterial";
import userSettings from "../../stories/fixtures/userSettings";

export default {
  title: "Material/SingleLineMaterial",
  component: SingleLineMaterialComponent,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3 mw-40">
    <SingleLineMaterialComponent {...args} />
  </div>
);

export const SingleLineMaterial = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
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
