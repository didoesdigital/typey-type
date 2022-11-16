import replaceSmartTypographyInPhraseAndStroke from "./replaceSmartTypographyInPhraseAndStroke";
import type { PresentedMaterial, UserSettings } from "../../types";

function replaceSmartTypographyInPresentedMaterial(
  presentedMaterial: PresentedMaterial,
  userSettings: Pick<UserSettings, "simpleTypography">
) {
  if (userSettings.simpleTypography) {
    let presentedMaterialLength = presentedMaterial.length;
    for (let i = 0; i < presentedMaterialLength; i++) {

      // dashes: em dash, en dash, non-breaking hyphen, mongolian soft hyphen, double hyphen
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[—–‑᠆⹀]/g, "-", /^(EPL\/TKA\*RB|TPH-RB|PH-RB)$/, 'H-PB');

      // curly single quote
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[‘’]/g, "'", /^(TP-P|TP-L)$/, 'AE');

      // ellipsis
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[…]/g, "...", /^SKWR-RBGSZ$/, 'HR-PS');

      // grave used as left single quote
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[`]/g, "'", /^(TR\*RL|TR-RL|KH-FG|KH\*FG)$/, 'A*E');

      // curly left double quote
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[“]/g, '"', /^KW-GS$/, 'KW-GS');

      // curly right double quote
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[”]/g, '"', /^KR-GS$/, 'KR-GS');

      // æ
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[æ]/g, 'ae', /^XXX$/, 'A*/*E');

      // Æ
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[Æ]/g, 'Ae', /^XXX$/, 'A*P/*E');

      // ë
      replaceSmartTypographyInPhraseAndStroke(presentedMaterial[i], /[ë]/g, 'e', /^XXX$/, '*E');
    }
  }
  return presentedMaterial;
}

export default replaceSmartTypographyInPresentedMaterial;
