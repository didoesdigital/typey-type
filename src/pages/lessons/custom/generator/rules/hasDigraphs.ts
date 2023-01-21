const hasDigraphs = (outline: string, translation: string) =>
  !(outline.match(/.*PBLG.*/) && translation.includes("ge")) &&
  !!(
    (outline.match(/TH.+/) && translation.match(/th/)) ||
    (outline.match(/(KH|SH).+/) &&
      translation.match(/(ch|sh)/) &&
      !translation.match(/cl/)) ||
    (outline.match(/.+(FP|RB|PBG)/) &&
      translation.match(/(ch|sh|ng)/) &&
      !translation.match(/cl/))
  );

export default hasDigraphs;
