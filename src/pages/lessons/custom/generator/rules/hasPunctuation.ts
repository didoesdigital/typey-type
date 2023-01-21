// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
const hasPunctuation = (_outline: string, translation: string) =>
  !!(
    translation.match(/[\p{P}]+/u) ||
    translation.match(/[\p{S}]+/u) ||
    translation.match(/\{&[\p{P}]+\}/u)
  );

export default hasPunctuation;
