import React from "react";
import CustomLessonGenerator from "./CustomLessonGenerator";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/CustomLessonGenerator",
  component: CustomLessonGenerator,
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
const sourceMaterial = [
  {
    phrase: ".",
    stroke: "TP-PL",
  },
  {
    phrase: "and the",
    stroke: "SKP-T",
  },
];

const Template = (args) => {
  return (
    <CustomLessonGenerator
      createCustomLesson={() => console.log("create custom lesson")}
      customLesson={{
        sourceMaterial,
        presentedMaterial: sourceMaterial,
        settings: { ignoredChars: "" },
        title: "Test",
        subtitle: "",
        newPresentedMaterial: sourceMaterial,
        path: "/lessons/fundamentals/test/",
      }}
      customLessonMaterial={""}
      customLessonMaterialValidationMessages={[]}
      customLessonMaterialValidationState={"success"}
      fetchAndSetupGlobalDict={() => Promise.resolve(true)}
      generateCustomLesson={() => console.log("generate custom lesson")}
      globalLookupDictionary={globalLookupDictionary}
      personalDictionaries={{ dictionariesNamesAndContents: null }}
      {...args}
    />
  );
};

export const CustomLessonGeneratorStory = Template.bind({});
