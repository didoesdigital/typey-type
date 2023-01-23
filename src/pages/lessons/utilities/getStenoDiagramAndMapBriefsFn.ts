import AmericanStenoDiagram from "../../../StenoLayout/AmericanStenoDiagram";
import NoNumberBarInnerThumbNumbersStenoDiagram from "../../../StenoLayout/NoNumberBarInnerThumbNumbersStenoDiagram";
import NoNumberBarOuterThumbNumbersStenoDiagram from "../../../StenoLayout/NoNumberBarOuterThumbNumbersStenoDiagram";
import BrazilianPortugueseStenoDiagram from "../../../StenoLayout/BrazilianPortugueseStenoDiagram";
import DanishStenoDiagram from "../../../StenoLayout/DanishStenoDiagram";
import ItalianMichelaStenoDiagram from "../../../StenoLayout/ItalianMichelaStenoDiagram";
import JapaneseStenoDiagram from "../../../StenoLayout/JapaneseStenoDiagram";
import KoreanModernCStenoDiagram from "../../../StenoLayout/KoreanModernCStenoDiagram";
import PalantypeDiagram from "../../../StenoLayout/PalantypeDiagram";

import mapBriefToAmericanStenoKeys from "../../../utils/stenoLayouts/mapBriefToAmericanStenoKeys";
import mapBriefToNoNumberBarInnerThumbNumbersStenoKeys from "../../../utils/stenoLayouts/mapBriefToNoNumberBarInnerThumbNumbersStenoKeys";
import mapBriefToNoNumberBarOuterThumbNumbersStenoKeys from "../../../utils/stenoLayouts/mapBriefToNoNumberBarOuterThumbNumbersStenoKeys";
import mapBriefToBrazilianPortugueseStenoKeys from "../../../utils/stenoLayouts/mapBriefToBrazilianPortugueseStenoKeys";
import mapBriefToDanishStenoKeys from "../../../utils/stenoLayouts/mapBriefToDanishStenoKeys";
import mapBriefToItalianMichelaStenoKeys from "../../../utils/stenoLayouts/mapBriefToItalianMichelaStenoKeys";
import mapBriefToJapaneseStenoKeys from "../../../utils/stenoLayouts/mapBriefToJapaneseStenoKeys";
import mapBriefToKoreanModernCStenoKeys from "../../../utils/stenoLayouts/mapBriefToKoreanModernCStenoKeys";
import mapBriefToPalantypeKeys from "../../../utils/stenoLayouts/mapBriefToPalantypeKeys";

import type { StenoLayout } from "../../../types";

const getStenoDiagramAndMapBriefsFn = (stenoLayout: StenoLayout) => {
  switch (stenoLayout) {
    case "stenoLayoutAmericanSteno":
      return [AmericanStenoDiagram, mapBriefToAmericanStenoKeys];
    case "stenoLayoutNoNumberBarInnerThumbNumbers":
      return [
        NoNumberBarInnerThumbNumbersStenoDiagram,
        mapBriefToNoNumberBarInnerThumbNumbersStenoKeys,
      ];
    case "stenoLayoutNoNumberBarOuterThumbNumbers":
      return [
        NoNumberBarOuterThumbNumbersStenoDiagram,
        mapBriefToNoNumberBarOuterThumbNumbersStenoKeys,
      ];
    case "stenoLayoutBrazilianPortugueseSteno":
      return [
        BrazilianPortugueseStenoDiagram,
        mapBriefToBrazilianPortugueseStenoKeys,
      ];
    case "stenoLayoutDanishSteno":
      return [DanishStenoDiagram, mapBriefToDanishStenoKeys];
    case "stenoLayoutItalianMichelaSteno":
      return [ItalianMichelaStenoDiagram, mapBriefToItalianMichelaStenoKeys];
    case "stenoLayoutJapaneseSteno":
      return [JapaneseStenoDiagram, mapBriefToJapaneseStenoKeys];
    case "stenoLayoutKoreanModernCSteno":
      return [KoreanModernCStenoDiagram, mapBriefToKoreanModernCStenoKeys];
    case "stenoLayoutPalantype":
      return [PalantypeDiagram, mapBriefToPalantypeKeys];
    default:
      return [AmericanStenoDiagram, mapBriefToAmericanStenoKeys];
  }
};

export default getStenoDiagramAndMapBriefsFn;
