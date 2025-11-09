import Game from "./Game";

export default {
  title: "Games/KHAERT game",
  component: Game,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <Game {...args} />
  </div>
);

export const KHAERTStory = Template.bind({});
