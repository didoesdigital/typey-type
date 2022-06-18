export const getRightAnswers = (material, pickedWord) =>
  material.reduce((prevArr, currentWord) => {
    return [...currentWord.trim()].sort().join("") ===
      [...pickedWord.trim()].sort().join("")
      ? [currentWord.trim(), ...prevArr]
      : prevArr;
  }, []);
