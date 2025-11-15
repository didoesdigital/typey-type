const isMultiStroke = (outline: string, _translation: string) =>
  !!outline.match(/\//) && !(outline === "TKR-BT/-G");

export default isMultiStroke;
