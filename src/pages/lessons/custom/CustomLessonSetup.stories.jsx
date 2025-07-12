import React from "react";
import CustomLessonSetup from "./CustomLessonSetup";
import AppMethodsContext from "../../../states/legacy/AppMethodsContext";
import appMethods from "../../../stories/fixtures/appMethods";

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
      ["TP-BG", "typey:typey-type-full.json"],
      ["STKPWHR-FPLT", "typey:typey-type-full.json"],
    ],
  ],
]);

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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
