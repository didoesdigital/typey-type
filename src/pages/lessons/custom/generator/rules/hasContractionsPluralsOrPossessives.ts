const hasContractionsPluralsOrPossessives = (
  _outline: string,
  translation: string
) =>
  !!(
    (translation.match(/[']/) && !translation.match(/[A-Z]+/)) ||
    (translation.match(/[']/) && translation.match(/I'/))
  );

export default hasContractionsPluralsOrPossessives;
