const hasOneSpace = (_outline: string, translation: string) =>
  !!translation.match(/^[^ ]+ [^ ]+$/);

export default hasOneSpace;
