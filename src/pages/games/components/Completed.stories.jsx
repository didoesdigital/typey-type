import React from "react";
import Completed from "./Completed";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Games/Completed",
  component: Completed,
};

const Template = (args) => {
  return (
    <div className="p3">
      <Completed gameName="SHUFL" dispatch={undefined} {...args} />
    </div>
  );
};

export const GameCompleted = Template.bind({});
GameCompleted.parameters = {
  chromatic: { delay: 3001 },
};
