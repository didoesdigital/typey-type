import React from "react";
import Completed from "./Completed";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/Completed",
  component: Completed,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return (
    <div className="p3">
      <Completed gameName="SHUFL" dispatch={undefined} {...args} />
    </div>
  );
};

export const GameCompleted = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'parameters' does not exist on type '(arg... Remove this comment to see the full error message
GameCompleted.parameters = {
  chromatic: { delay: 3001 },
};
