import React from "react";
import { within, userEvent } from "@storybook/test";
import { expect } from "@storybook/test";

import CustomLessonGenerator from "./CustomLessonGenerator";
import AppMethodsContext from "../../../states/legacy/AppMethodsContext";
import appMethods from "../../../stories/fixtures/appMethods";

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
      ["SKHRAPL", "typey:typey-type-full.json"],
      ["TP-BG", "typey:typey-type-full.json"],
      ["STKPWHR-FPLT", "typey:typey-type-full.json"],
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

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
CustomLessonGeneratorHelp.storyName = "Show generator help";
// @ts-expect-error TS(2339) FIXME: Property 'play' does not exist on type '(args: any... Remove this comment to see the full error message
CustomLessonGeneratorHelp.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const submitButton = canvas.getByRole("button", { name: "Show help" });
  await userEvent.click(submitButton);

  const textElement = canvas.getByText(/To use the lesson generator/i);
  await expect(textElement).toBeVisible();
};
