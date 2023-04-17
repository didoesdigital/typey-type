const FINGERSPELLING_KEYS = [
  "A*",
  "A*P",
  "PW*",
  "PW*P",
  "KR*",
  "KR*P",
  "TK*",
  "TK*P",
  "*EU",
  "*EUP",
  "*E",
  "*EP",
  "TP*",
  "TP*P",
  "TKPW*",
  "TKPW*P",
  "H*",
  "H*P",
  "SKWR*",
  "SKWR*P",
  "K*",
  "K*P",
  "HR*",
  "HR*P",
  "PH*",
  "PH*P",
  "TPH*",
  "TPH*P",
  "O*",
  "O*P",
  "P*",
  "P*P",
  "KW*",
  "KW*P",
  "R*",
  "R*P",
  "S*",
  "S*P",
  "T*",
  "T*P",
  "*U",
  "*UP",
  "SR*",
  "SR*P",
  "W*",
  "W*P",
  "KP*",
  "KP*P",
  "KWR*",
  "KWR*P",
  "STKPW*",
  "STKPW*P",
];

const FINGERSPELLED_PUNCTUATION = [
  "A*E",
  "AE",
  "H-F",
  "H-PB",
  "KR-GS",
  "KW-GS",
  "SKHRAPL",
  "TP-PL",
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isFingerspelled = (outline: string, _translation: string) =>
  outline
    .split("/")
    .every(
      (stroke) =>
        FINGERSPELLING_KEYS.includes(stroke) ||
        FINGERSPELLED_PUNCTUATION.includes(stroke)
    );

export default isFingerspelled;
