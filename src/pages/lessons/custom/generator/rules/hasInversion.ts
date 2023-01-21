const hasInversion = (outline: string, translation: string) =>
  !!(outline.match(/FL/) && translation.match(/(lf|lv)/)) ||
  !!(outline.match(/PL/) && translation.match(/lp/)) ||
  !!(outline.match(/FR/) && translation.match(/rs/)) ||
  !!(outline.match(/FR/) && translation.match(/rf/)) ||
  !!(outline.match(/STK/) && translation.match(/(dis|des)/)) ||
  !!(outline.match(/GD/) && translation.match(/ding/)) ||
  !!(
    outline.match(/WE/) &&
    translation.match(/ew/) &&
    !translation.match(/we/)
  ) ||
  !!(outline.match(/RL/) && translation.match(/ler/)) ||
  !!(
    outline.match(/TD/) &&
    translation.match(/d.*t/) &&
    !translation.match(/d.*d/)
  ) ||
  !!(
    outline.match(/LT/) &&
    translation.match(/t.*l/) &&
    !translation.match(/l.*l/) &&
    !translation.match(/t.*t/)
  ) ||
  !!(
    outline.match(/LT/) &&
    translation.match(/t.?ly$/) &&
    !translation.match(/alt.*l/)
  );

export default hasInversion;
