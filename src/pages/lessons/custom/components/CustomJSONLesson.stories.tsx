import React from "react";

import { expect, within, userEvent } from "@storybook/test";

import CustomJSONLesson from "./CustomJSONLesson";

const meta = {
  title: "Lessons/Custom/CustomJSONLesson",
  component: CustomJSONLesson,
};

export default meta;

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <CustomJSONLesson {...args} />
  </div>
);

export const CustomJSONLessonEmptyState = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
CustomJSONLessonEmptyState.storyName = "Empty state";
// @ts-expect-error TS(2339) FIXME: Property 'play' does not exist on type '(args: any... Remove this comment to see the full error message
CustomJSONLessonEmptyState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByTestId("custom-lesson-formatted-pre")
  ).not.toHaveClass("quote");
};

export const CustomJSONLessonFilled = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
CustomJSONLessonFilled.storyName = "Dictionary filled";
// @ts-expect-error TS(2339) FIXME: Property 'play' does not exist on type '(args: any... Remove this comment to see the full error message
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
