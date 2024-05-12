import React from "react";
import CustomLessonSetup from "./CustomLessonSetup";
import AppMethodsContext from "../../../states/legacy/AppMethodsContext";
import appMethods from "../../../stories/fixtures/appMethods";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/CustomLessonSetup",
  component: CustomLessonSetup,
};

const globalLookupDictionary = new Map([
  ["huh", [["H*U", "typey:typey-type.json"]]],
  ["gonna", [["TKPW*G", "typey:typey-type.json"]]],
  [
    "{!}",
    [
      ["KPHR", "user:punctuation-di.json"],
      ["SKHRAPL", "typey:typey-type.json"],
      ["TP-BG", "plover:plover-main-3-jun-2018.json"],
      ["STKPWHR-FPLT", "plover:plover-main-3-jun-2018.json"],
    ],
  ],
]);

const Template = (args) => {
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <CustomLessonSetup
        customLessonMaterial={""}
        customLessonMaterialValidationMessages={[]}
        customLessonMaterialValidationState={"success"}
        globalLookupDictionary={globalLookupDictionary}
        globalLookupDictionaryLoaded={true}
        personalDictionaries={{ dictionariesNamesAndContents: null }}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};

export const CustomLessonSetupStory = Template.bind({});
