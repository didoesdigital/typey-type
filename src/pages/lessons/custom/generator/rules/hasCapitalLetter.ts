const hasCapitalLetter = (_outline: string, translation: string) =>
  !!translation.match(/[A-Z]+/);

export default hasCapitalLetter;
