import { ComponentPropsWithoutRef } from "react";
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
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: Pro... Remove this comment to see the full error message
UserSettingsStory.args = { ...defaultArgs };

export const UserSettingsDisabled = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: Pro... Remove this comment to see the full error message
UserSettingsDisabled.args = {
  ...defaultArgs,
  disableUserSettings: true,
};
