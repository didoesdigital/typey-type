const isUppercase = (_outline: string, translation: string) =>
  !!translation.match(/^[A-Z]+$/);

export default isUppercase;
