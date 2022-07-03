const getLessonMetadata = (lessonIndex: any[], path: string) =>
  lessonIndex.find(
    (metadataEntry: any) =>
      process.env.PUBLIC_URL + "/lessons" + metadataEntry.path === path
  );

export default getLessonMetadata;
