import React from "react";
import LessonOverview from "./LessonOverview";

export default {
  title: "Pages/LessonOverview",
  component: LessonOverview,
};

const lessonIndex = [
  {
    title: "Test lesson",
    subtitle: "",
    category: "Fundamentals",
    subcategory: "",
    path: "/lessons/fundamentals/test/",
    overview: "/fundamentals/introduction/lesson-overview.html",
  },
];

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return (
    <LessonOverview
      lessonIndex={lessonIndex}
      lessonMetadata={lessonIndex[0]}
      lessonPath={"/lessons/fundamentals/test/"}
      lessonTxtPath={"/lessons/fundamentals/introduction/lesson.txt"}
      lessonTitle={"Test"}
      {...args}
    />
  );
};

export const LessonsOverviewStory = Template.bind({});
