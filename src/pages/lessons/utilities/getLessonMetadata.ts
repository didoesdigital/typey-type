const getLessonMetadata = (lessonIndex: any[], path: string) =>
  lessonIndex.find(
    (metadataEntry: any) =>
      import.meta.env.VITE_PUBLIC_URL + "/lessons" + metadataEntry.path === path
  );

export default getLessonMetadata;
