// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasOneSpace = (_outline: string, translation: string) =>
  !!translation.match(/^[^ ]+ [^ ]+$/);

export default hasOneSpace;
