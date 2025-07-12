import React from "react";
import Game from "./Game";

export default {
  title: "Games/KAOES game",
  component: Game,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <Game {...args} />
  </div>
);

export const KAOESGameStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
KAOESGameStory.args = {
  inputForKAOES: "raw",
  changeInputForKAOES: () => {
    console.log("change input for KAOES game");
  },
};
