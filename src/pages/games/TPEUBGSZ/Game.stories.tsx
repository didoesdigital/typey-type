import Game from "./Game";

export default {
  title: "Games/TPEUBGSZ game",
  component: Game,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <Game startingMetWordsToday={{ "the": 2, "of": 1 }} {...args} />
  </div>
);

export const TPEUBGSZGameStory = Template.bind({});
