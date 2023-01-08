import React from "react";
import Lookup from "./Lookup";
import userSettings from "../../stories/fixtures/userSettings";
import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/Lookup",
  component: Lookup,
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

const Template = (args) => (
  <Lookup
    fetchAndSetupGlobalDict={() => Promise.resolve(true)}
    globalLookupDictionary={globalLookupDictionary}
    globalLookupDictionaryLoaded={true}
    setAnnouncementMessage={() => console.log("announce")}
    lookupTerm={undefined}
    userSettings={userSettings}
    globalUserSettings={{}}
    personalDictionaries={{ dictionariesNamesAndContents: null }}
    updateGlobalLookupDictionary={() => undefined}
    updatePersonalDictionaries={() => undefined}
    stenohintsonthefly={true}
    {...args}
  />
);

export const LookupStory = Template.bind({});

export const LookupFromURLStory = Template.bind({});
LookupFromURLStory.args = {
  lookupTerm: "a phrase that is not in any dictionary",
};
LookupFromURLStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
    "No results found"
  );
};

export const LookupSearchStory = Template.bind({});
LookupSearchStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  userEvent.type(
    await within(canvasElement).getByLabelText("Enter words to look up"),
    "huh"
  );

  await expect(
    canvas.getByTestId("lookup-page-contents")
  ).not.toHaveTextContent("No results found");

  await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
    "typey-type.json"
  );
};

export const LookupPersonalDictionariesStory = Template.bind({});
LookupPersonalDictionariesStory.args = {
  lookupTerm: "!",
};
LookupPersonalDictionariesStory.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
    "text shown in dictionary"
  );

  await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
    "typey-type.json"
  );
  await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
    "punctuation-di.json"
  );
  await expect(canvas.getByTestId("lookup-page-contents")).toHaveTextContent(
    "plover-main-3-jun-2018.json"
  );
};
