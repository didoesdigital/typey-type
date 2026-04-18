import TypedText from "./TypedText";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TypedText> = {
  title: "Components/TypedText",
  component: TypedText,
};

export default meta;

type Story = StoryObj<typeof TypedText>;

export const TypedTextStory: Story = {
  args: {
    actualText: " flail",
    completedPhrases: [],
    currentLessonStrokes: [],
    currentPhrase: " flailing",
    currentPhraseID: 0,
    focusTriggerInt: 2,
    previousCompletedPhraseAsTyped: "",
    sayCurrentPhraseAgain: () => {
      // no-op
    },
    updateMarkup: (e) => {
      console.log(e);
    },
  },
};
