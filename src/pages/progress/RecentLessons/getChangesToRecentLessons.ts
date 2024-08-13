import { RecentLessons } from "../../../states/recentLessonHistoryState";
import type {
  LessonPathWithBasenameAndFilename,
  LessonPathWithoutBasenameOrFilename,
  Study,
} from "../../../types";

type TrimBasenameAndFilename = (
  lessonPath: LessonPathWithBasenameAndFilename
) => LessonPathWithoutBasenameOrFilename;

const trimBasenameAndFilename: TrimBasenameAndFilename = (lessonPath) => {
  return lessonPath
    .replace(process.env.PUBLIC_URL, "")
    .replace("lesson.txt", "");
};

const getChangesToRecentLessons = (
  recentLessonPath: LessonPathWithBasenameAndFilename,
  studyType: Study,
  prevRecentLessons: RecentLessons
): RecentLessons | null => {
  const trimmedRecentLessonPath = trimBasenameAndFilename(recentLessonPath);
  if (trimmedRecentLessonPath?.includes("/lessons/custom")) {
    return null;
  }

  // If there's no lesson history, then this is the first lesson, so create a new RecentLessons and return it:
  const isFirstLesson = !(
    prevRecentLessons.history && prevRecentLessons.history.length > 0
  );
  if (isFirstLesson) {
    const newRecentLessons = {
      history: [
        {
          path: trimmedRecentLessonPath,
          studyType,
        },
      ],
    };
    return newRecentLessons;
  }

  // If this lesson is already the most recent in RecentLessons and it has the same studyType, then we have nothing to do, so return null;
  const mostRecentLesson =
    prevRecentLessons.history[prevRecentLessons.history.length - 1];
  const isAlreadyMostRecentLesson =
    mostRecentLesson.path === trimmedRecentLessonPath;
  if (isAlreadyMostRecentLesson && mostRecentLesson.studyType === studyType) {
    return null;
  }

  // If this lesson is already in RecentLessons, then update the order of history (and studyType) and return the changed RecentLessons:
  const indexOfExistingRecentLesson = prevRecentLessons.history?.findIndex(
    (historyRecentLesson) =>
      historyRecentLesson.path === trimmedRecentLessonPath
  );
  const isAlreadyARecentLesson = indexOfExistingRecentLesson >= 0;
  if (isAlreadyARecentLesson) {
    const changedRecentLessons: RecentLessons = {
      history: [...prevRecentLessons.history],
    };
    changedRecentLessons.history.splice(indexOfExistingRecentLesson, 1);
    changedRecentLessons.history.push({
      path: trimmedRecentLessonPath,
      studyType: studyType,
    });
    return changedRecentLessons;
  }

  // If history is full, then remove the oldest lesson from history, add this lesson, and return the changed RecentLessons:
  const isHistoryFull = prevRecentLessons.history?.length >= 10;
  if (isHistoryFull) {
    const changedRecentLessons: RecentLessons = {
      history: [...prevRecentLessons.history],
    };
    changedRecentLessons.history.shift();
    changedRecentLessons.history.push({
      path: trimmedRecentLessonPath,
      studyType: studyType,
    });
    return changedRecentLessons;
  }

  // If this lesson is not in RecentLessons and history is not full, then add this lesson to history and return the changed RecentLessons:
  const changedRecentLessons: RecentLessons = {
    history: [...prevRecentLessons.history],
  };
  changedRecentLessons.history.push({
    path: trimmedRecentLessonPath,
    studyType: studyType,
  });
  return changedRecentLessons;
};

export default getChangesToRecentLessons;
