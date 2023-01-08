import React from "react";
import CustomLessonSetup from "./CustomLessonSetup";

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
    <CustomLessonSetup
      createCustomLesson={() => console.log("create custom lesson")}
      customLessonMaterial={""}
      customLessonMaterialValidationMessages={[]}
      customLessonMaterialValidationState={"success"}
      fetchAndSetupGlobalDict={() => Promise.resolve(true)}
      globalLookupDictionary={globalLookupDictionary}
      globalLookupDictionaryLoaded={true}
      personalDictionaries={{ dictionariesNamesAndContents: null }}
      setAnnouncementMessage={() => console.log("announce")}
      {...args}
    />
  );
};

export const CustomLessonSetupStory = Template.bind({});
