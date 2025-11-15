const hasLhsConsonantWithMultipleKeys = (
  outline: string,
  _translation: string
) =>
  !!(
    (outline.match(/(TK|PW|HR|TP|TKPW|SR|TPH|PH|SKWR|KWR).+/) &&
      !outline.match(/\*/)) ||
    (outline.match(/([^AOEU]S\*|KR\*|KW\*|KP\*|STKPW\*).+/) &&
      !outline.match(/[TKHAOEUFRBLGSDZ]\*/))
  );

export default hasLhsConsonantWithMultipleKeys;
