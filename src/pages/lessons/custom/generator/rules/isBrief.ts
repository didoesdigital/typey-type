const isBrief = (outline: string, translation: string) =>
  (outline === "HEP" && translation === "help") ||
  (outline === "HEPS" && translation === "helps") ||
  (outline === "SURG" && translation === "surgeon") ||
  (outline === "SUBT" && translation === "subject") ||
  (outline === "PROBS" && translation === "problems") ||
  (outline === "SESZ" && translation === "access") ||
  (outline === "SEPS" && translation === "accepts") ||
  (outline === "SKUS" && translation === "discuss") ||
  (outline === "TRAF" && translation === "transfer") ||
  (outline === "PROEUR" && translation === "prior") ||
  (outline === "TAOULT" && translation === "actually") ||
  (outline === "PHAEB" && translation === "maybe") ||
  !!outline.match(/^[STKPWHR]{1,2}[-AOEU]+[^FRPBLGTSDZ]$/) ||
  !!outline.match(/^[^STKPWHR][-AOEU]+[FRPBLGTSDZ]{1,2}$/) ||
  !!outline.match(/^[AOEU]$/) ||
  !!outline.match(/^[STKPWHR]{1,7}-[FRPBLGTSDZ]{1,9}$/);

export default isBrief;
