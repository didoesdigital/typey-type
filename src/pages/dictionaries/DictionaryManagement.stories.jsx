import React from "react";
import DictionaryManagement from "./DictionaryManagement";

export default {
  title: "Pages/DictionaryManagement",
  component: DictionaryManagement,
};

const globalLookupDictionary = new Map([
  ["huh", [["H*U", "typey:typey-type.json"]]],
  ["gonna", [["TKPW*G", "typey:typey-type.json"]]],
  [
    "{!}",
    [
      ["KPHR", "user:punctuation-di.json"],
      ["SKHRAPL", "typey:typey-type.json"],
    ],
  ],
]);

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return (
    <DictionaryManagement
      fetchAndSetupGlobalDict={() => Promise.resolve(true)}
      globalLookupDictionary={globalLookupDictionary}
      personalDictionaries={{ dictionariesNamesAndContents: null }}
      updatePersonalDictionaries={() => undefined}
      toggleExperiment={() => console.log("toggle experiment")}
      match={{
        isExact: true,
        params: {},
        path: "/dictionaries",
        url: "/dictionaries/",
      }}
      {...args}
    />
  );
};

export const DictionaryManagementStory = Template.bind({});
