import React from "react";
import CustomLessonSetup from "./CustomLessonSetup";
import AppMethodsContext from "../../../states/legacy/AppMethodsContext";
import appMethods from "../../../stories/fixtures/appMethods";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CustomLessonSetup> = {
  title: "Pages/CustomLessonSetup",
  component: CustomLessonSetup,
  decorators: [
    (Story) => (
      <AppMethodsContext.Provider value={appMethods}>
        <Story />
      </AppMethodsContext.Provider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof CustomLessonSetup>;

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

export const CustomLessonSetupStory: Story = {
  args: {
    customLessonMaterial: "",
    customLessonMaterialValidationMessages: [],
    customLessonMaterialValidationState: "success",
    globalLookupDictionary: globalLookupDictionary,
    globalLookupDictionaryLoaded: true,
  },
};
