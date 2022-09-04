type Material = [{ phrase: string; stroke: string }];

const getStrokeForCurrentSlideContent = (
  word: string,
  sourceMaterial: Material
) => {
  let stroke = "XXX";
  let i = 0;
  let length = sourceMaterial.length;

  for (; i < length; i++) {
    if (sourceMaterial[i].phrase === word) {
      stroke = sourceMaterial[i].stroke;
    }
  }
  return stroke;
};

export { getStrokeForCurrentSlideContent };
