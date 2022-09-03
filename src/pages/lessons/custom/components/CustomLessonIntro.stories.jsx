import React from "react";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import CustomLessonIntro from "./CustomLessonIntro";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/Custom/CustomLessonIntro",
  component: CustomLessonIntro,
};

const Template = (args) => (
  <div className="p3">
    <CustomLessonIntro {...args} />
  </div>
);

export const CustomLessonIntroEmptyState = Template.bind({});
CustomLessonIntroEmptyState.storyName = "Empty state";

export const CustomLessonIntroFilled = Template.bind({});
CustomLessonIntroFilled.storyName = "Lesson filled";
CustomLessonIntroFilled.play = async ({ canvasElement }) => {
  userEvent.type(
    await within(canvasElement).getByLabelText(
      "Enter your material here:"
    ),
    'test	TEFT'
  );
};

export const CustomLessonIntroError = Template.bind({});
CustomLessonIntroError.args = {
  customLessonMaterialValidationMessages: [ "Your material needs at least 1 “Tab” character" ],
  customLessonMaterialValidationState: "fail"
}
CustomLessonIntroError.storyName = "Error state";
CustomLessonIntroError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  userEvent.type(
    await within(canvasElement).getByLabelText(
      "Enter your material here:"
    ),
    'test'
  );

  await expect(
    canvas.getByText(
      'Your material needs at least 1 “Tab” character'
    )
  ).toBeInTheDocument();
};
