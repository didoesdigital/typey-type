import React from "react";

import { expect, within, userEvent } from "@storybook/test";

import CustomWordListLesson from "./CustomWordListLesson";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CustomWordListLesson> = {
  title: "Lessons/Custom/CustomWordListLesson",
  component: CustomWordListLesson,
  decorators: [
    (Story) => (
      <div className="p3">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CustomWordListLesson>;

export const CustomWordListLessonEmptyState: Story = {
  name: "Empty state",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByTestId("custom-lesson-formatted-pre")
    ).not.toHaveClass("quote");
  },
};

export const CustomWordListLessonFilled: Story = {
  name: "Dictionary filled",
  args: {
    globalLookupDictionary: new Map([
      ["hello", [["H-L", "typey:typey-type.json"]]],
      ["world", [["WORLD", "typey:typey-type.json"]]],
    ]),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const wordListInput = canvas.getByLabelText(
      "Paste a word list without strokes here to create a custom lesson (using Plover theory by default):"
    );

    await userEvent.type(
      wordListInput,
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
  },
};
