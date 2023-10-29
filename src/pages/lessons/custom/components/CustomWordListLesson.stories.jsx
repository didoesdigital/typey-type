import React from "react";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import CustomWordListLesson from "./CustomWordListLesson";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/Custom/CustomWordListLesson",
  component: CustomWordListLesson,
};

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
CustomWordListLessonEmptyState.storyName = "Empty state";
CustomWordListLessonEmptyState.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await expect(
    canvas.getByTestId("custom-lesson-formatted-pre")
  ).not.toHaveClass("quote");
};

export const CustomWordListLessonFilled = Template.bind({});
CustomWordListLessonFilled.storyName = "Dictionary filled";
CustomWordListLessonFilled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(
    within(canvasElement).getByLabelText(
      "Paste a word list without strokes here to create a custom lesson (using Plover theory by default):"
    ),
    `hello
world`
  );

  await expect(canvas.getByTestId("custom-lesson-formatted-pre")).toHaveClass(
    "quote"
  );
  await expect(
    canvas.getByTestId("custom-lesson-formatted-code")
  ).toHaveTextContent(/WORLD/);
  await expect(
    canvas.getByTestId("custom-lesson-formatted-code")
  ).toHaveTextContent(/H-L/);
};
