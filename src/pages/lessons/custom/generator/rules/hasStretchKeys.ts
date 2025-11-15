const hasStretchKeys = (outline: string, _translation: string) =>
  !!outline.match(/[DZ]/);

export default hasStretchKeys;
