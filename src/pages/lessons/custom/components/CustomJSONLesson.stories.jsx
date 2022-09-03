import React from "react";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import CustomJSONLesson from "./CustomJSONLesson";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/Custom/CustomJSONLesson",
  component: CustomJSONLesson,
};

const Template = (args) => (
  <div className="p3">
    <CustomJSONLesson {...args} />
  </div>
);

export const CustomJSONLessonEmptyState = Template.bind({});
CustomJSONLessonEmptyState.storyName = "Empty state";
CustomJSONLessonEmptyState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(canvas.getByTestId('custom-lesson-formatted-pre')).not.toHaveClass('quote')
};

export const CustomJSONLessonFilled = Template.bind({});
CustomJSONLessonFilled.storyName = "Dictionary filled";
CustomJSONLessonFilled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  userEvent.type(
    await within(canvasElement).getByLabelText(
      "Paste a JSON dictionary here to create a custom lesson:"
    ),
    '{{"TEFT": "test"}'
  );

  await expect(canvas.getByTestId('custom-lesson-formatted-pre')).toHaveClass('quote')
  await expect(canvas.getByTestId('custom-lesson-formatted-code')).toHaveTextContent(/^test/)
  await expect(canvas.getByTestId('custom-lesson-formatted-code')).toHaveTextContent(/TEFT$/)
};
