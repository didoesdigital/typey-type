import mapBriefToAmericanStenoKeys from "../../../utils/stenoLayouts/mapBriefToAmericanStenoKeys";
import mapBriefToNoNumberBarInnerThumbNumbersStenoKeys from "../../../utils/stenoLayouts/mapBriefToNoNumberBarInnerThumbNumbersStenoKeys";
import mapBriefToNoNumberBarOuterThumbNumbersStenoKeys from "../../../utils/stenoLayouts/mapBriefToNoNumberBarOuterThumbNumbersStenoKeys";
import mapBriefToBrazilianPortugueseStenoKeys from "../../../utils/stenoLayouts/mapBriefToBrazilianPortugueseStenoKeys";
import mapBriefToYaweiChineseStenoKeys from "../../../utils/stenoLayouts/mapBriefToYaweiChineseStenoKeys";
import mapBriefToDanishStenoKeys from "../../../utils/stenoLayouts/mapBriefToDanishStenoKeys";
import mapBriefToItalianMichelaStenoKeys from "../../../utils/stenoLayouts/mapBriefToItalianMichelaStenoKeys";
import mapBriefToJapaneseStenoKeys from "../../../utils/stenoLayouts/mapBriefToJapaneseStenoKeys";
import mapBriefToKoreanModernCStenoKeys from "../../../utils/stenoLayouts/mapBriefToKoreanModernCStenoKeys";
import mapBriefToPalantypeKeys from "../../../utils/stenoLayouts/mapBriefToPalantypeKeys";

import type { StenoLayout } from "../../../types";

const getMapsBriefsFn = (stenoLayout: StenoLayout) => {
  switch (stenoLayout) {
    case "stenoLayoutAmericanSteno":
      return mapBriefToAmericanStenoKeys;
    case "stenoLayoutNoNumberBarInnerThumbNumbers":
      return mapBriefToNoNumberBarInnerThumbNumbersStenoKeys;
    case "stenoLayoutNoNumberBarOuterThumbNumbers":
      return mapBriefToNoNumberBarOuterThumbNumbersStenoKeys;
    case "stenoLayoutBrazilianPortugueseSteno":
      return mapBriefToBrazilianPortugueseStenoKeys;
    case "stenoLayoutYaweiChineseSteno":
      return mapBriefToYaweiChineseStenoKeys;
    case "stenoLayoutDanishSteno":
      return mapBriefToDanishStenoKeys;
    case "stenoLayoutItalianMichelaSteno":
      return mapBriefToItalianMichelaStenoKeys;
    case "stenoLayoutJapaneseSteno":
      return mapBriefToJapaneseStenoKeys;
    case "stenoLayoutKoreanModernCSteno":
      return mapBriefToKoreanModernCStenoKeys;
    case "stenoLayoutPalantype":
      return mapBriefToPalantypeKeys;
    default:
      return mapBriefToAmericanStenoKeys;
  }
};

export default getMapsBriefsFn;
