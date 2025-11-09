import { expect, within, userEvent } from "@storybook/test";

import CustomWordListLesson from "./CustomWordListLesson";

import type { Meta, StoryObj } from "@storybook/react";
import type {
  DictionaryConfig,
  LookupDictWithNamespacedDicts,
  LookupDictWithNamespacedDictsAndConfig,
} from "types";

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

const dict: LookupDictWithNamespacedDicts = new Map([
  ["hello", [["H-L", "typey:typey-type.json"]]],
  ["world", [["WORLD", "typey:typey-type.json"]]],
]);
const config: DictionaryConfig = {
  configuration: [],
};
dict.configuration = config.configuration;

const globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig =
  dict as LookupDictWithNamespacedDictsAndConfig;

export const CustomWordListLessonFilled: Story = {
  name: "Dictionary filled",
  args: {
    globalLookupDictionary,
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
