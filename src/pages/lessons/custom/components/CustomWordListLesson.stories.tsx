import React from "react";

import { within, userEvent } from "@storybook/test";
import { expect } from "@storybook/test";

import CustomWordListLesson from "./CustomWordListLesson";

export default {
  title: "Lessons/Custom/CustomWordListLesson",
  component: CustomWordListLesson,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <CustomWordListLesson
      globalLookupDictionary={
        new Map([
          ["hello", [["H-L", "typey:typey-type.json"]]],
          ["world", [["WORLD", "typey:typey-type.json"]]],
        ])
      }
      {...args}
    />
  </div>
);

export const CustomWordListLessonEmptyState = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
CustomWordListLessonEmptyState.storyName = "Empty state";
// @ts-expect-error TS(2339) FIXME: Property 'play' does not exist on type '(args: any... Remove this comment to see the full error message
CustomWordListLessonEmptyState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByTestId("custom-lesson-formatted-pre"),
  ).not.toHaveClass("quote");
};

export const CustomWordListLessonFilled = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
CustomWordListLessonFilled.storyName = "Dictionary filled";
// @ts-expect-error TS(2339) FIXME: Property 'play' does not exist on type '(args: any... Remove this comment to see the full error message
CustomWordListLessonFilled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(
    within(canvasElement).getByLabelText(
      "Paste a word list without strokes here to create a custom lesson (using Plover theory by default):",
    ),
    `hello
world`,
  );

  await expect(canvas.getByTestId("custom-lesson-formatted-pre")).toHaveClass(
    "quote",
  );
  await expect(
    canvas.getByTestId("custom-lesson-formatted-code"),
  ).toHaveTextContent(/WORLD/);
  await expect(
    canvas.getByTestId("custom-lesson-formatted-code"),
  ).toHaveTextContent(/H-L/);
};
