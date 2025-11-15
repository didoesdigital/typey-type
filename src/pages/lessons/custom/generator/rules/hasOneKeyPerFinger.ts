const twoKeyPerFingerCombinations = [
  "TK",
  "PW",
  "HR",
  "AO",
  "EU",
  "FR",
  "PB",
  "LG",
  "TS",
  "DZ",
  "TD",
  "SZ",
  "/",
  "*", // should probably be "*F", "*R"
];

const hasOneKeyPerFinger = (outline: string, _translation: string) =>
  !twoKeyPerFingerCombinations.some((twoKeyCombo) =>
    outline.includes(twoKeyCombo)
  );
export default hasOneKeyPerFinger;
