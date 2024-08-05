import AmericanStenoDiagram from "../../../StenoLayout/AmericanStenoDiagram";
import NoNumberBarInnerThumbNumbersStenoDiagram from "../../../StenoLayout/NoNumberBarInnerThumbNumbersStenoDiagram";
import NoNumberBarOuterThumbNumbersStenoDiagram from "../../../StenoLayout/NoNumberBarOuterThumbNumbersStenoDiagram";
import BrazilianPortugueseStenoDiagram from "../../../StenoLayout/BrazilianPortugueseStenoDiagram";
import YaweiChineseStenoDiagram from "../../../StenoLayout/YaweiChineseStenoDiagram";
import DanishStenoDiagram from "../../../StenoLayout/DanishStenoDiagram";
import ItalianMichelaStenoDiagram from "../../../StenoLayout/ItalianMichelaStenoDiagram";
import JapaneseStenoDiagram from "../../../StenoLayout/JapaneseStenoDiagram";
import KoreanModernCStenoDiagram from "../../../StenoLayout/KoreanModernCStenoDiagram";
import PalantypeDiagram from "../../../StenoLayout/PalantypeDiagram";

import type { StenoLayout } from "../../../types";

const getStenoDiagram = (stenoLayout: StenoLayout) => {
  switch (stenoLayout) {
    case "stenoLayoutAmericanSteno":
      return AmericanStenoDiagram;
    case "stenoLayoutNoNumberBarInnerThumbNumbers":
      return NoNumberBarInnerThumbNumbersStenoDiagram;
    case "stenoLayoutNoNumberBarOuterThumbNumbers":
      return NoNumberBarOuterThumbNumbersStenoDiagram;
    case "stenoLayoutBrazilianPortugueseSteno":
      return BrazilianPortugueseStenoDiagram;
    case "stenoLayoutYaweiChineseSteno":
      return YaweiChineseStenoDiagram;
    case "stenoLayoutDanishSteno":
      return DanishStenoDiagram;
    case "stenoLayoutItalianMichelaSteno":
      return ItalianMichelaStenoDiagram;
    case "stenoLayoutJapaneseSteno":
      return JapaneseStenoDiagram;
    case "stenoLayoutKoreanModernCSteno":
      return KoreanModernCStenoDiagram;
    case "stenoLayoutPalantype":
      return PalantypeDiagram;
    default:
      return AmericanStenoDiagram;
  }
};

export default getStenoDiagram;
