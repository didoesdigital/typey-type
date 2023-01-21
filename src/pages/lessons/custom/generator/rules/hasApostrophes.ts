const hasApostrophes = (_outline: string, translation: string) =>
  !!translation.match(/[']/);

export default hasApostrophes;
