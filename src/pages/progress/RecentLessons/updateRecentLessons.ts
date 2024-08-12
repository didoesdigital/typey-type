import type {
  LessonPathWithBasenameAndFilename,
  LessonPathWithoutBasenameOrFilename,
  Study,
} from "../../../types";
import type { RecentLessonHistory } from "../components/RecentLessons";

type TrimBasenameAndFilename = (
  lessonPath: LessonPathWithBasenameAndFilename
) => LessonPathWithoutBasenameOrFilename;

export const trimBasenameAndFilename: TrimBasenameAndFilename = (
  lessonPath
) => {
  return lessonPath
    .replace(process.env.PUBLIC_URL, "")
    .replace("lesson.txt", "");
};

function updateRecentLessons(
  recentLessonPath: LessonPathWithBasenameAndFilename,
  studyType: Study,
  prevRecentLessons: { history: RecentLessonHistory }
) {
  let trimmedRecentLessonPath = trimBasenameAndFilename(recentLessonPath);
  const recentLessons = Object.assign({}, prevRecentLessons);

  if (
    !trimmedRecentLessonPath.includes("/lessons/custom") &&
    recentLessons.history
  ) {
    let existingLessonIndex = recentLessons.history.findIndex(
      (historyRecentLesson) =>
        historyRecentLesson.path === trimmedRecentLessonPath
    );
    if (existingLessonIndex >= 0) {
      // If we saw this lesson in the last 10 lessons but not most recently, remove it from the history before adding it again at the end:
      recentLessons.history.splice(existingLessonIndex, 1);
    } else {
      if (recentLessons.history.length >= 10) {
        recentLessons.history.shift();
      }
    }

    recentLessons.history.push({
      path: trimmedRecentLessonPath,
      studyType: studyType,
    });
  }

  return recentLessons;
}

export default updateRecentLessons;
