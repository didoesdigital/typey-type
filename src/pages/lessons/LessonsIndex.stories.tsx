import { Suspense } from "react";
import LessonsIndex from "./LessonsIndex";
import Zipper from "../../utils/zipper";
import AppMethodsContext from "../../states/legacy/AppMethodsContext";
import appMethods from "../../stories/fixtures/appMethods";

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

// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
const Template = (args) => {
  return <Component {...args} />;
};

// Suspense doesn't work in Template which is not a component
// @ts-expect-error TS(7006) FIXME: Parameter 'args' implicitly has an 'any' type.
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
