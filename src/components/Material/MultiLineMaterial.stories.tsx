import MultiLineMaterialComponent from "./MultiLineMaterial";
import userSettings from "../../stories/fixtures/userSettings";

export default {
  title: "Material/MultiLineMaterial",
  component: MultiLineMaterialComponent,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <MultiLineMaterialComponent {...args} />
  </div>
);

export const MultiLineMaterial = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
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
// @ts-expect-error TS(2339) FIXME: Property 'parameters' does not exist on type '(arg... Remove this comment to see the full error message
MultiLineMaterial.parameters = {
  chromatic: { delay: 300, diffThreshold: 0.78 },
  // If the delay ☝️ doesn't work, try tweaking the diffThreshold:
  // Chromatic’s default threshold is .063, which balances high visual accuracy with low false
  // positives (for example, from artifacts like anti-aliasing).
  // 0 is the most accurate. 1 is the least accurate.
  // https://6262c53f521620003ac2ff49-ukmsdlppcb.chromatic.com/?path=/story/stories-diff-threshold-check--test-yours-out
  // chromatic: { diffThreshold: 0.78 },
};
