import React from "react";
import Writer from "./Writer";
import AppMethodsContext from "../../states/legacy/AppMethodsContext";
import appMethods from "../../stories/fixtures/appMethods";

export default {
  title: "Pages/Writer",
  component: Writer,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <Writer
        userSettings={{ stenoLayout: "stenoLayoutAmericanSteno" }}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};

export const WriterStory = Template.bind({});
