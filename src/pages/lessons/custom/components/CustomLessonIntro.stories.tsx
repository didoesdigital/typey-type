import { expect, within, userEvent } from "@storybook/test";

import CustomLessonIntro from "./CustomLessonIntro";

export default {
  title: "Lessons/Custom/CustomLessonIntro",
  component: CustomLessonIntro,
};

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => (
  <div className="p3">
    <CustomLessonIntro {...args} />
  </div>
);

export const CustomLessonIntroEmptyState = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
CustomLessonIntroEmptyState.storyName = "Empty state";

export const CustomLessonIntroFilled = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
CustomLessonIntroFilled.storyName = "Lesson filled";
// @ts-expect-error TS(2339) FIXME: Property 'play' does not exist on type '(args: any... Remove this comment to see the full error message
CustomLessonIntroFilled.play = async ({ canvasElement }) => {
  userEvent.type(
    await within(canvasElement).getByLabelText("Enter your material here:"),
    "test	TEFT",
  );
};

export const CustomLessonIntroError = Template.bind({});
// @ts-expect-error TS(2339) FIXME: Property 'args' does not exist on type '(args: any... Remove this comment to see the full error message
CustomLessonIntroError.args = {
  customLessonMaterialValidationMessages: [
    "Your material needs at least 1 “Tab” character",
  ],
  customLessonMaterialValidationState: "fail",
};
// @ts-expect-error TS(2339) FIXME: Property 'storyName' does not exist on type '(args... Remove this comment to see the full error message
CustomLessonIntroError.storyName = "Error state";
// @ts-expect-error TS(2339) FIXME: Property 'play' does not exist on type '(args: any... Remove this comment to see the full error message
CustomLessonIntroError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  userEvent.type(
    await within(canvasElement).getByLabelText("Enter your material here:"),
    "test",
  );

  await expect(
    canvas.getByText("Your material needs at least 1 “Tab” character"),
  ).toBeInTheDocument();
};
