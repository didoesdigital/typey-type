const hasShortTranslations = (_outline: string, translation: string) =>
  translation.length < 6;

export default hasShortTranslations;
