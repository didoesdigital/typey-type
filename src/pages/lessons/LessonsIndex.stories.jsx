import React, { Suspense } from "react";
import LessonsIndex from "./LessonsIndex";
import Zipper from "../../utils/zipper";
import AppMethodsContext from "../../states/legacy/AppMethodsContext";
import appMethods from "../../stories/fixtures/appMethods";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Pages/LessonsIndex",
  component: LessonsIndex,
};

const lessonIndex = [
  {
    title: "Test lesson",
    subtitle: "",
    category: "Fundamentals",
    subcategory: "",
    path: "/lessons/fundamentals/test/",
  },
];

const sourceMaterial = [
  {
    phrase: "test",
    stroke: "TEFT",
  },
];

const customLesson = {
  sourceMaterial: sourceMaterial,
  presentedMaterial: [
    {
      phrase: "test",
      stroke: "TEFT",
    },
  ],
  settings: {
    ignoredChars: "",
  },
  title: "Test lesson",
  subtitle: "",
  newPresentedMaterial: new Zipper(sourceMaterial),
  path: "/lessons/fundamentals/test/",
};

const Template = (args) => {
  return (
    <Component {...args} />
  );
};

// Suspense doesn't work in Template which is not a component
const Component = (args) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppMethodsContext.Provider value={appMethods}>
        <LessonsIndex
          lessonIndex={lessonIndex}
          customLesson={customLesson}
          {...args}
        />
      </AppMethodsContext.Provider>
    </Suspense>
  );
};

export const LessonsIndexStory = Template.bind({});
