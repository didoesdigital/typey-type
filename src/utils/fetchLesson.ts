import type { LessonPathWithBasenameAndFilename, LessonText } from "types";

async function fetchLesson(
  lessonFile: LessonPathWithBasenameAndFilename
): Promise<LessonText> {
  try {
    const response = await fetch(lessonFile, {
      method: "GET",
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error(`HTTP status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch lesson ${lessonFile}`, error);
    return "";
  }
}

export default fetchLesson;
