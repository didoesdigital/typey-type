const hasNumbers = (_outline: string, translation: string) =>
  !!translation.match(/[0-9]/);

export default hasNumbers;
