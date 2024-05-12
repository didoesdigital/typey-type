import React, { ComponentProps } from "react";
import UserSettings from "./UserSettings";
import userSettingsFixture from "../../../../stories/fixtures/userSettings";

const meta = {
  title: "Pages/UserSettings",
  component: UserSettings,
};
export default meta;

const defaultArgs: ComponentProps<typeof UserSettings> = {
  changeSortOrderUserSetting: () => undefined,
  changeSpacePlacementUserSetting: () => undefined,
  changeStenoLayout: () => undefined,
  changeShowScoresWhileTyping: () => undefined,
  changeShowStrokesAs: () => undefined,
  changeShowStrokesAsList: () => undefined,
  changeShowStrokesOnMisstroke: () => undefined,
  changeUserSetting: () => undefined,
  changeVoiceUserSetting: () => undefined,
  disableUserSettings: false,
  handleDiagramSize: () => undefined,
  handleBeatsPerMinute: () => undefined,
  handleLimitWordsChange: () => undefined,
  handleStartFromWordChange: () => undefined,
  handleRepetitionsChange: () => undefined,
  handleUpcomingWordsLayout: () => undefined,
  maxStartFromWord: 100,
  revisionMode: false,
  totalWordCount: 50,
  userSettings: userSettingsFixture,
};

const Template = (args: ComponentProps<typeof UserSettings>) => {
  return (
    <div
      id="lesson-page"
      className="flex-wrap-md flex mx-auto mw-1920"
      style={{ justifyContent: "flex-end" }}
    >
      <UserSettings {...args} />
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
