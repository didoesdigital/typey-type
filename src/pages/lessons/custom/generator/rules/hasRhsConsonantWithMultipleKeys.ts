const hasRhsConsonantWithMultipleKeys = (
  outline: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _translation: string
) =>
  !!(outline.match(/.+(BG|PB|PL|PBLG)/) && !outline.match(/\*/)) ||
  !!(
    outline.match(/.+(\*T|\*PL|\*LG|\*PBG)/) &&
    !outline.match(/\*[SKWHRAOEUFBGDZ]/)
  );

export default hasRhsConsonantWithMultipleKeys;
