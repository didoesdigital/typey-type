import React from "react";
import Lookup from "./Lookup";
import userSettings from "../../stories/fixtures/userSettings";
import { within, userEvent } from "@storybook/test";
import { expect } from "@storybook/test";
import AppMethodsContext from "../../states/legacy/AppMethodsContext";
import appMethods from "../../stories/fixtures/appMethods";
import { useHydrateAtoms } from "jotai/utils";
import { userSettingsState } from "../../states/userSettingsState";

const meta = {
  title: "Pages/Lookup",
  component: Lookup,
};
export default meta;

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
  useHydrateAtoms([[userSettingsState, userSettings]]);
  return (
    <AppMethodsContext.Provider value={appMethods}>
      <Lookup
        globalLookupDictionary={globalLookupDictionary}
        globalLookupDictionaryLoaded={true}
        userSettings={userSettings}
        personalDictionaries={{ dictionariesNamesAndContents: null }}
        stenohintsonthefly={true}
        {...args}
      />
    </AppMethodsContext.Provider>
  );
};

export const LookupStory = Template.bind({});

export const LookupMissingWordStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'play' does not exist on type '(args: any... Remove this comment to see the full error message
LookupMissingWordStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(
    await within(canvasElement).getByLabelText("Enter words to look up"),
    "a phrase that is not in any dictionary",
  );

  await canvas.findByText("No results found");
  await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
    "No results found",
  );
};

export const LookupSearchStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'play' does not exist on type '(args: any... Remove this comment to see the full error message
LookupSearchStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(
    await within(canvasElement).getByLabelText("Enter words to look up"),
    "huh",
  );

  await expect(
    canvas.getByTestId("lookup-page-contents"),
  ).not.toHaveTextContent("No results found");

  await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
    "Typey Type",
  );
};

export const LookupPersonalDictionariesStory = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'play' does not exist on type '(args: any... Remove this comment to see the full error message
LookupPersonalDictionariesStory.play = async ({ canvasElement }) => {
  const canvas = await within(canvasElement);

  const inputElement = canvas.getByLabelText("Enter words to look up");
  await userEvent.type(inputElement, "!");

  // await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
  //   "text shown in dictionary"
  // );

  // await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
  //   "typey-type.json"
  // );
  // await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
  //   "punctuation-di.json"
  // );
  // await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
  //   "typey-type-full.json"
  // );
};
