import { atomWithStorage } from "jotai/utils";
import type { RecentLessonHistory } from "../pages/progress/components/RecentLessons";

export type RecentLessons = {
  history: RecentLessonHistory;
};

const defaultRecentLessons: RecentLessons = { history: [] };

export const recentLessonHistoryState = atomWithStorage(
  "recentLessons",
  defaultRecentLessons
);
