import { LessonIndexEntry } from "types";

const getLessonMetadata = (lessonIndex: any[], path: string) =>
  lessonIndex.find(
    (metadataEntry: LessonIndexEntry) =>
      import.meta.env.VITE_PUBLIC_URL + "/lessons" + metadataEntry.path ===
      path,
  );

export default getLessonMetadata;
