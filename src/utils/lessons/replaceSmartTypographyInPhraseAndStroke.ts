import type { Outline, PresentedMaterialItem } from "../../types";

function replaceSmartTypographyInPhraseAndStroke(
  presentedMaterialItem: PresentedMaterialItem,
  smartTypographyRegex: RegExp,
  dumbTypographyChar: string,
  smartTypographyStrokesRegex: RegExp,
  dumbTypographyStroke: Outline
) {
  if (presentedMaterialItem.phrase.match(smartTypographyRegex)) {
    presentedMaterialItem.phrase = presentedMaterialItem.phrase.replace(
      smartTypographyRegex,
      dumbTypographyChar
    );
    presentedMaterialItem.stroke = presentedMaterialItem.stroke
      .split(" ")
      .map((stroke) => {
        return stroke.replace(
          smartTypographyStrokesRegex,
          dumbTypographyStroke
        );
      })
      .join(" ");

    // by keeping this inside this function and only after matching on unusual hyphens or dashes, we don't replace people's preferred hyphen stroke for normal hyphens
    if (
      presentedMaterialItem.phrase === "-" &&
      presentedMaterialItem.stroke === "XXX"
    ) {
      presentedMaterialItem.stroke = "H-PB";
    }
  }
}

export default replaceSmartTypographyInPhraseAndStroke;
