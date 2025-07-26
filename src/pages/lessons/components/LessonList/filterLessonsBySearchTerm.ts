import type { LessonIndexEntry } from "types";

export default function filterLessons(
  searchTerm: string,
  lessonIndex: LessonIndexEntry[]
) {
  const cleanedSearchTerm = searchTerm
    .trim()
    .toLowerCase()
    .replaceAll(/[^ A-Za-z0-9’',*:-]/g, ""); // all characters that don't appear in lesson titles

  if (cleanedSearchTerm.length === 0) return lessonIndex;

  let filteredLessons = lessonIndex.filter((lesson) => {
    const cleanedLessonTitle = lesson.title.toLowerCase();
    const searchSnippets = cleanedSearchTerm.split(" ");
    const titleMatches = searchSnippets.reduce(
      (trueSoFar, searchSnippet) =>
        trueSoFar && cleanedLessonTitle.includes(searchSnippet),
      true
    );
    return titleMatches;
  });

  if (filteredLessons.length === 0) {
    filteredLessons = lessonIndex.filter((lesson) => {
      const searchSnippets = cleanedSearchTerm.split(" ");
      const categoryMatches = searchSnippets.reduce(
        (trueSoFar, searchSnippet) =>
          trueSoFar &&
          (lesson.category.toLowerCase().includes(searchSnippet) ||
            lesson.subcategory.toLowerCase().includes(searchSnippet)),
        true
      );
      return categoryMatches;
    });
  }

  return filteredLessons;
}
