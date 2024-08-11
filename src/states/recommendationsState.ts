import { atom } from "jotai";
import PARAMS from "../utils/params";
import {
  RecommendationHistory,
  RecommendedNextLesson,
} from "../pages/progress/components/RecommendationBox";

const defaultRecommendedNextLesson: RecommendedNextLesson = {
  studyType: "practice",
  limitNumberOfWords: 50,
  repetitions: 1,
  linkTitle: "Top 10000 Project Gutenberg words",
  linkText: "Practice 150 words from Top 10000 Project Gutenberg words",
  link:
    process.env.PUBLIC_URL +
    "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
    PARAMS.practiceParams,
};

export const recommendedNextLessonState = atom(defaultRecommendedNextLesson);

const defaultRecommendationHistory: RecommendationHistory = {
  currentStep: null,
};

export const recommendationHistoryState = atom(defaultRecommendationHistory);
