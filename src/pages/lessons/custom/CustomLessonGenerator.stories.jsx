import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import CustomLessonGenerator from "./CustomLessonGenerator";
import AppMethodsContext from "../../../states/legacy/AppMethodsContext";
import appMethods from "../../../stories/fixtures/appMethods";

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
    <AppMethodsContext.Provider value={appMethods}>
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
        globalLookupDictionary={globalLookupDictionary}
        personalDictionaries={{ dictionariesNamesAndContents: null }}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};

export const CustomLessonGeneratorStory = Template.bind({});

export const CustomLessonGeneratorHelp = Template.bind({});
CustomLessonGeneratorHelp.storyName = "Show generator help";
CustomLessonGeneratorHelp.play = async ({ canvasElement }) => {
  const canvas = await within(canvasElement);

  const submitButton = canvas.getByRole("button", { name: "Show help" });
  await userEvent.click(submitButton);

  const textElement = canvas.getByText(/To use the lesson generator/i);
  await expect(textElement).toBeVisible();
};
