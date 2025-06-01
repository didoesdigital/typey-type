import Stroke from "./stroke";
import * as stroke from "./stroke";

function mapQWERTYKeysToStenoStroke(
  qwertyString: string,
  _stenoLayout = "stenoLayoutAmericanSteno"
) {
  const QWERTY_TO_AMERICAN_WARD_STONE_IRELAND_STENO_MAP: {
    [key: string]: number;
  } = {
    "1": stroke.HASH,
    "2": stroke.HASH,
    "3": stroke.HASH,
    "4": stroke.HASH,
    "5": stroke.HASH,
    "6": stroke.HASH,
    "7": stroke.HASH,
    "8": stroke.HASH,
    "9": stroke.HASH,
    "0": stroke.HASH,
    "q": stroke.S,
    "a": stroke.S,
    "w": stroke.T,
    "s": stroke.K,
    "e": stroke.P,
    "d": stroke.W,
    "r": stroke.H,
    "f": stroke.R,
    "c": stroke.A,
    "v": stroke.O,
    "t": stroke.STAR,
    "g": stroke.STAR,
    "y": stroke.STAR,
    "h": stroke.STAR,
    "n": stroke.E,
    "m": stroke.U,
    "u": stroke.F,
    "j": stroke.RR,
    "i": stroke.RP,
    "k": stroke.B,
    "o": stroke.L,
    "l": stroke.G,
    "p": stroke.RT,
    ";": stroke.RS,
    "[": stroke.D,
    "'": stroke.Z,
  };

  let stenoStroke = new Stroke();
  let splitQWERTY = [...qwertyString];
  for (let i = 0; i < splitQWERTY.length; i++) {
    let character = qwertyString[i];
    if (QWERTY_TO_AMERICAN_WARD_STONE_IRELAND_STENO_MAP[character]) {
      stenoStroke = stenoStroke.set(
        QWERTY_TO_AMERICAN_WARD_STONE_IRELAND_STENO_MAP[character]
      );
    }
  }

  return stenoStroke;
}

export { mapQWERTYKeysToStenoStroke };
