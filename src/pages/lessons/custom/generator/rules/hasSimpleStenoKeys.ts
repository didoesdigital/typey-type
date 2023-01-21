// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasSimpleStenoKeys = (outline: string, _translation: string) =>
  !outline.match(
    /(TK|PW|HR|TP|TKPW|SR|BG|TPH|PB|PH|PL|SKWR|KWR|PB|PL|PBLG|TH|KH|FP|SH|RB|PBG|APL|FRPB|FRB|LG|GS|BGS|KR|KW|FRP|EGT)/
  );

export default hasSimpleStenoKeys;
