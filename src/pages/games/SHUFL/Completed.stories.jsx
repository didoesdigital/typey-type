import React from "react";
import Completed from "./Completed";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "SHUFL game/Completed",
  component: Completed,
};

const Template = (args) => {
  return (
    <div className="p3">
      <Completed {...args} />
    </div>
  );
};

export const SHUFLGameCompleted = Template.bind({});
