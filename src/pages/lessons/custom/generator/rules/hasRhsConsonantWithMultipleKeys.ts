const hasRhsConsonantWithMultipleKeys = (
  outline: string,
  _translation: string
) =>
  !!(outline.match(/.+(BG|PB|PL|PBLG)/) && !outline.match(/\*/)) ||
  !!(
    outline.match(/.+(\*T|\*PL|\*LG|\*PBG)/) &&
    !outline.match(/\*[SKWHRAOEUFBGDZ]/)
  );

export default hasRhsConsonantWithMultipleKeys;
