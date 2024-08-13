import { RecentLessons } from "../../../states/recentLessonHistoryState";
import { LessonPathWithBasenameAndFilename } from "../../../types";
import getChangesToRecentLessons from "./getChangesToRecentLessons";

const basename = process.env.PUBLIC_URL;

const scenarioCustomLesson: TestTableRow = {
  description: "should ignore custom lesson and return null",
  recentLessonPath: `${basename}/lessons/custom/`,
  prevRecentLessons: { history: [] },
  expected: null,
};

const scenarioIsFirstLesson: TestTableRow = {
  description: "should add current lesson to recentLessons with empty history",
  recentLessonPath: `${basename}/lessons/fundamentals/one/lesson.txt`,
  prevRecentLessons: { history: [] },
  expected: {
    history: [{ path: "/lessons/fundamentals/one/", studyType: "discover" }],
  },
};

const scenarioIsMostRecentLessonAndStudyTypeIsUnchanged: TestTableRow = {
  description:
    "should ignore current lesson if it's already most recent in recentLessons and studyType is the same, and return null",
  recentLessonPath: `${basename}/lessons/fundamentals/two/lesson.txt`,
  prevRecentLessons: {
    history: [
      { path: "/lessons/fundamentals/one/", studyType: "discover" },
      { path: "/lessons/fundamentals/two/", studyType: "discover" },
    ],
  },
  expected: null,
};

const scenarioIsMostRecentLessonAndStudyTypeChanged: TestTableRow = {
  description:
    "should update current lesson if it's already most recent in recentLessons but studyType is the same",
  recentLessonPath: `${basename}/lessons/fundamentals/two/lesson.txt`,
  prevRecentLessons: {
    history: [
      { path: "/lessons/fundamentals/one/", studyType: "practice" },
      { path: "/lessons/fundamentals/two/", studyType: "practice" },
    ],
  },
  expected: {
    history: [
      { path: "/lessons/fundamentals/one/", studyType: "practice" },
      { path: "/lessons/fundamentals/two/", studyType: "discover" },
    ],
  },
};

const scenarioStudyTypeChanged: TestTableRow = {
  description:
    "should update current lesson and reorder if it's in recentLessons and studyType changed",
  recentLessonPath: `${basename}/lessons/fundamentals/two/lesson.txt`,
  prevRecentLessons: {
    history: [
      { path: "/lessons/fundamentals/two/", studyType: "practice" },
      { path: "/lessons/fundamentals/one/", studyType: "discover" },
    ],
  },
  expected: {
    history: [
      { path: "/lessons/fundamentals/one/", studyType: "discover" },
      { path: "/lessons/fundamentals/two/", studyType: "discover" },
    ],
  },
};

const scenarioOneExistingDifferentItem: TestTableRow = {
  description:
    "should add current lesson to recentLessons with one other recent lesson",
  recentLessonPath: `${basename}/lessons/progress/seen/`,
  prevRecentLessons: {
    history: [{ path: "/lessons/fundamentals/one/", studyType: "discover" }],
  },
  expected: {
    history: [
      { path: "/lessons/fundamentals/one/", studyType: "discover" },
      { path: "/lessons/progress/seen/", studyType: "discover" },
    ],
  },
};

const scenarioRecentAndSameStudyTypeButNotMostRecent: TestTableRow = {
  description:
    "should reorder current lesson in recentLessons to be most recent",
  recentLessonPath: `${basename}/lessons/fundamentals/two/lesson.txt`,
  prevRecentLessons: {
    history: [
      { path: "/lessons/fundamentals/two/", studyType: "discover" },
      { path: "/lessons/fundamentals/one/", studyType: "discover" },
    ],
  },
  expected: {
    history: [
      { path: "/lessons/fundamentals/one/", studyType: "discover" },
      { path: "/lessons/fundamentals/two/", studyType: "discover" },
    ],
  },
};

const scenarioTenExistingItems: TestTableRow = {
  description:
    "should add current lesson to recentLessons with ten recent lessons and remove oldest lesson",
  recentLessonPath: `${basename}/lessons/progress/`,
  prevRecentLessons: {
    history: [
      { path: "/lessons/fundamentals/one/", studyType: "discover" },
      { path: "/lessons/fundamentals/two/", studyType: "discover" },
      { path: "/lessons/fundamentals/three/", studyType: "discover" },
      { path: "/lessons/fundamentals/four/", studyType: "discover" },
      { path: "/lessons/fundamentals/five/", studyType: "discover" },
      { path: "/lessons/fundamentals/six/", studyType: "discover" },
      { path: "/lessons/fundamentals/seven/", studyType: "discover" },
      { path: "/lessons/fundamentals/eight/", studyType: "discover" },
      { path: "/lessons/fundamentals/nine/", studyType: "discover" },
      { path: "/lessons/fundamentals/ten/", studyType: "discover" },
    ],
  },
  expected: {
    history: [
      { path: "/lessons/fundamentals/two/", studyType: "discover" },
      { path: "/lessons/fundamentals/three/", studyType: "discover" },
      { path: "/lessons/fundamentals/four/", studyType: "discover" },
      { path: "/lessons/fundamentals/five/", studyType: "discover" },
      { path: "/lessons/fundamentals/six/", studyType: "discover" },
      { path: "/lessons/fundamentals/seven/", studyType: "discover" },
      { path: "/lessons/fundamentals/eight/", studyType: "discover" },
      { path: "/lessons/fundamentals/nine/", studyType: "discover" },
      { path: "/lessons/fundamentals/ten/", studyType: "discover" },
      { path: "/lessons/progress/", studyType: "discover" },
    ],
  },
};

const studyType = "discover";

type TestTableRow = {
  description: string;
  recentLessonPath: LessonPathWithBasenameAndFilename;
  prevRecentLessons: RecentLessons;
  expected: RecentLessons | null;
};

const table: TestTableRow[] = [
  scenarioCustomLesson,
  scenarioIsFirstLesson,
  scenarioIsMostRecentLessonAndStudyTypeIsUnchanged,
  scenarioIsMostRecentLessonAndStudyTypeChanged,
  scenarioRecentAndSameStudyTypeButNotMostRecent,
  scenarioStudyTypeChanged,
  scenarioOneExistingDifferentItem,
  scenarioTenExistingItems,
];

describe("getChangesToRecentLessons", () => {
  test.each(table)(
    "$description",
    ({ recentLessonPath, prevRecentLessons, expected }) => {
      expect(
        getChangesToRecentLessons(
          recentLessonPath,
          studyType,
          prevRecentLessons
        )
      ).toStrictEqual(expected);
    }
  );
});
