const hasLongTranslations = (_outline: string, translation: string) =>
  translation.length > 16;

export default hasLongTranslations;
