import React from "react";
import { Route, Switch } from "react-router-dom";
import Lesson from "./Lesson";
import userSettings from "../../stories/fixtures/userSettings";
import Zipper from "../../utils/zipper";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Lessons/Lesson",
  component: Lesson,
  id: "lesson", // permalink
};

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
  path: "/lessons/test/",
};
const lesson = {
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
  path: "/lessons/test/",
};

const globalLookupDictionary = new Map([
  ["huh", [["H*U", "typey:typey-type.json"]]],
  ["gonna", [["TKPW*G", "typey:typey-type.json"]]],
]);

const lessonIndex = [
  {
    title: "Test lesson",
    subtitle: "",
    category: "Fundamentals",
    subcategory: "",
    path: "/lessons/test/",
  },
];

const handleLesson = (path) => undefined;
const stopLesson = () => undefined;

const Template = (args) => {
  return (
    <div className="p3">
      TODO make the Lesson story work
      <Switch>
        <Route
          render={(props) => (
            <div>
              <Lesson
                customLesson={customLesson}
                fetchAndSetupGlobalDict={() => Promise.resolve(true)}
                globalLookupDictionary={globalLookupDictionary}
                globalLookupDictionaryLoaded={true}
                personalDictionaries={{}}
                updateFlashcardsMetWords={() => undefined}
                handleLesson={handleLesson}
                lesson={lesson}
                lessonIndex={lessonIndex}
                stopLesson={stopLesson}
                setAnnouncementMessage={() => console.log("announce")}
                userSettings={userSettings}
                {...props}
                {...args}
              />
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export const LessonStory = Template.bind({});
LessonStory.storyName = "Lesson";
