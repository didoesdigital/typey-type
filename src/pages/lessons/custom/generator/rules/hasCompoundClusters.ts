const hasCompoundClusters = (outline: string, translation: string) =>
  !(translation === "img") &&
  !(translation === "programme") &&
  !!(
    (outline.match(/\*.*PBG/) && translation.match(/nk/)) ||
    outline.match(/.+FRB/) ||
    outline.match(/.+FRPB/) ||
    (outline.match(/.+\*.*LG/) && translation.includes("lk")) ||
    (outline.match(/.+LG/) &&
      (translation.includes("lch") || translation.includes("lge"))) ||
    (outline.match(/.+GS/) &&
      (translation.match(/ion[s]?$/) ||
        translation.match(/ean[s]?$/) ||
        translation.match(/ian[s]?$/)) &&
      !translation.match(/cs$/) &&
      !translation.match(/x$/)) ||
    (outline.match(/.+BGS/) &&
      translation.match(/ction[s]?$/) &&
      translation.match(/[^g]/) &&
      !translation.match(/cs$/) &&
      !translation.match(/x$/)) ||
    (outline.match(/.+\*.*PL/) && translation.match(/mp/))
  );

export default hasCompoundClusters;
