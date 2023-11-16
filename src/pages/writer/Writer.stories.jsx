import React from "react";
import Writer from "./Writer";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/Writer",
  component: Writer,
};

const Template = (args) => {
  return (
    <Writer
      changeStenoLayout={() => {
        console.log("Change steno layout");
      }}
      changeWriterInput={() => {
        console.log("Change writer input");
      }}
      setAnnouncementMessage={() => console.log("announce")}
      globalUserSettings={{}}
      userSettings={{ stenoLayout: "stenoLayoutAmericanSteno" }}
      {...args}
    />
  );
};

export const WriterStory = Template.bind({});
