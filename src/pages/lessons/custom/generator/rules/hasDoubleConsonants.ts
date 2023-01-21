const hasDoubleConsonants = (_outline: string, translation: string) =>
  !!(
    translation.match(/([bcdfghjklmnpqrstvwxyz])\1/) &&
    !translation.match(/([bcdfghjklmnpqrstvwxyz])\1\1/)
  );

export default hasDoubleConsonants;
