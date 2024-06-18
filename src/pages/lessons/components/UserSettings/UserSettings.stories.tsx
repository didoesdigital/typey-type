import React, { ComponentPropsWithoutRef } from "react";
import UserSettings from "./UserSettings";
import userSettingsFixture from "../../../../stories/fixtures/userSettings";
import AppMethodsContext from "../../../../states/legacy/AppMethodsContext";
import appMethods from "../../../../stories/fixtures/appMethods";
import { useHydrateAtoms } from "jotai/utils";
import { userSettingsState } from "../../../../states/userSettingsState";

const meta = {
  title: "Pages/UserSettings",
  component: UserSettings,
};
export default meta;

const defaultArgs: ComponentPropsWithoutRef<typeof UserSettings> = {
  disableUserSettings: false,
  maxStartFromWord: 100,
  revisionMode: false,
  totalWordCount: 50,
};

const Template = (args: ComponentPropsWithoutRef<typeof UserSettings>) => {
  useHydrateAtoms([[userSettingsState, userSettingsFixture]]);
  return (
    <div
      id="lesson-page"
      className="flex-wrap-md flex mx-auto mw-1920"
      style={{ justifyContent: "flex-end" }}
    >
      <AppMethodsContext.Provider value={appMethods}>
        <UserSettings {...args} />
      </AppMethodsContext.Provider>
    </div>
  );
};

export const UserSettingsStory = Template.bind({});
// @ts-expect-error
UserSettingsStory.args = { ...defaultArgs };

export const UserSettingsDisabled = Template.bind({});
// @ts-expect-error
UserSettingsDisabled.args = {
  ...defaultArgs,
  disableUserSettings: true,
};
