import Metronome from "./Metronome";
import userSettings from "../../../stories/fixtures/userSettings";

export default {
  title: "Lessons/Metronome",
  component: Metronome,
  id: "metronome", // permalink
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return <Metronome userSettings={userSettings} {...args} />;
};

export const MetronomeStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
MetronomeStory.storyName = "Metronome";
