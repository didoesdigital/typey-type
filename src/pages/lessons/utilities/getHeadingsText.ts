const wpmCommentary = [
  [5000, "Faster than you can think…"],
  [1500, "Faster than a speed reader!"],
  [300, "Faster than you can read!"],
  [250, "As fast as an auctioneer!"],
  [225, "Faster than a pro stenographer!"],
  [160, "Faster than a stenographer!"],
  [150, "Faster than you can talk!"],
  [100, "Faster than a stenotype student!"],
  [80, "Faster than a pro typist!"],
  [60, "Faster than a good QWERTY typist!"],
  [40, "Faster than your average typist!"],
  [27, "Faster than hunt and peck typists"],
  [22, "Faster than Morse code"],
  [20, "Faster than handwriting"],
];

const getHeadingsText = (
  wpm: number,
  lessonTitle: string,
  newTopSpeedToday: boolean,
  newTopSpeedPersonalBest: boolean
) => {
  let headingText = "Finished: " + lessonTitle;
  if (newTopSpeedToday && newTopSpeedPersonalBest && wpm > 3) {
    headingText = "New personal best!";
  } else if (newTopSpeedToday && !newTopSpeedPersonalBest && wpm > 3) {
    headingText = "New top speed for today!";
  }

  let subHeadingText = (wpmCommentary.find(([speed]) => wpm > speed) || [
    -1,
    "Try this lesson again",
  ])[1];
  if (newTopSpeedToday && newTopSpeedPersonalBest && wpm > 3) {
    subHeadingText = lessonTitle;
  } else if (newTopSpeedToday && !newTopSpeedPersonalBest && wpm > 3) {
    subHeadingText = lessonTitle;
  }

  return [headingText, subHeadingText];
};

export default getHeadingsText;
