import React from "react";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import CustomJSONLesson from "./CustomJSONLesson";

const meta = {
  title: "Lessons/Custom/CustomJSONLesson",
  component: CustomJSONLesson,
};

export default meta;

const Template = (args) => (
  <div className="p3">
    <CustomJSONLesson {...args} />
  </div>
);

export const CustomJSONLessonEmptyState = Template.bind({});
CustomJSONLessonEmptyState.storyName = "Empty state";
CustomJSONLessonEmptyState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByTestId("custom-lesson-formatted-pre")
  ).not.toHaveClass("quote");
};

export const CustomJSONLessonFilled = Template.bind({});
CustomJSONLessonFilled.storyName = "Dictionary filled";
CustomJSONLessonFilled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(
    canvas.getByLabelText(
      "Paste a JSON dictionary here to create a custom lesson:"
    ),
    '{{"TEFT": "test"}'
  );

  await expect(canvas.getByTestId("custom-lesson-formatted-pre")).toHaveClass(
    "quote"
  );
  await expect(
    canvas.getByTestId("custom-lesson-formatted-code")
  ).toHaveTextContent(/^test/);
  await expect(
    canvas.getByTestId("custom-lesson-formatted-code")
  ).toHaveTextContent(/TEFT$/);
};
