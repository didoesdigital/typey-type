import Stroke from "./stroke";
import strokeBits from "./strokeBits";

function mapQWERTYKeysToStenoStroke(
  qwertyString: string,
  _stenoLayout = "stenoLayoutAmericanSteno"
) {
  const QWERTY_TO_AMERICAN_WARD_STONE_IRELAND_STENO_MAP: {
    [key: string]: number;
  } = {
    "1": strokeBits.HASH,
    "2": strokeBits.HASH,
    "3": strokeBits.HASH,
    "4": strokeBits.HASH,
    "5": strokeBits.HASH,
    "6": strokeBits.HASH,
    "7": strokeBits.HASH,
    "8": strokeBits.HASH,
    "9": strokeBits.HASH,
    "0": strokeBits.HASH,
    "q": strokeBits.S,
    "a": strokeBits.S,
    "w": strokeBits.T,
    "s": strokeBits.K,
    "e": strokeBits.P,
    "d": strokeBits.W,
    "r": strokeBits.H,
    "f": strokeBits.R,
    "c": strokeBits.A,
    "v": strokeBits.O,
    "t": strokeBits.STAR,
    "g": strokeBits.STAR,
    "y": strokeBits.STAR,
    "h": strokeBits.STAR,
    "n": strokeBits.E,
    "m": strokeBits.U,
    "u": strokeBits.F,
    "j": strokeBits.RR,
    "i": strokeBits.RP,
    "k": strokeBits.B,
    "o": strokeBits.L,
    "l": strokeBits.G,
    "p": strokeBits.RT,
    ";": strokeBits.RS,
    "[": strokeBits.D,
    "'": strokeBits.Z,
  };

  let stenoStroke = new Stroke();
  const splitQWERTY = [...qwertyString];
  for (let i = 0; i < splitQWERTY.length; i++) {
    const character = qwertyString[i];
    if (QWERTY_TO_AMERICAN_WARD_STONE_IRELAND_STENO_MAP[character]) {
      stenoStroke = stenoStroke.set(
        QWERTY_TO_AMERICAN_WARD_STONE_IRELAND_STENO_MAP[character]
      );
    }
  }

  return stenoStroke;
}

export { mapQWERTYKeysToStenoStroke };
