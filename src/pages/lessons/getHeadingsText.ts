const getHeadingsText = (
  wpm: number,
  lessonTitle: string,
  newTopSpeedToday: boolean,
  newTopSpeedPersonalBest: boolean
) => {
  let subHeadingText = "";
  if (wpm > 5000) {
    subHeadingText = "Faster than you can think…";
  } else if (wpm > 1500) {
    subHeadingText = "Faster than a speed reader!";
  } else if (wpm > 300) {
    subHeadingText = "Faster than you can read!";
  } else if (wpm > 250) {
    subHeadingText = "As fast as an auctioneer!";
  } else if (wpm > 225) {
    subHeadingText = "Faster than a pro stenographer!";
  } else if (wpm > 160) {
    subHeadingText = "Faster than a stenographer!";
  } else if (wpm > 150) {
    subHeadingText = "Faster than you can talk!";
  } else if (wpm > 100) {
    subHeadingText = "Faster than a stenotype student!";
  } else if (wpm > 80) {
    subHeadingText = "Faster than a pro typist!";
  } else if (wpm > 60) {
    subHeadingText = "Faster than a good QWERTY typist!";
  } else if (wpm > 40) {
    subHeadingText = "Faster than your average typist!";
  } else if (wpm > 27) {
    subHeadingText = "Faster than hunt and peck typists";
  } else if (wpm > 22) {
    subHeadingText = "Faster than Morse code";
  } else if (wpm > 20) {
    subHeadingText = "Faster than handwriting";
  } else {
    subHeadingText = "Try this lesson again";
  }

  let headingText = "Finished: " + lessonTitle;

  if (newTopSpeedToday && newTopSpeedPersonalBest && wpm > 3) {
    headingText = "New personal best!";
  } else if (newTopSpeedToday && !newTopSpeedPersonalBest && wpm > 3) {
    headingText = "New top speed for today!";
  }

  if (newTopSpeedToday && newTopSpeedPersonalBest && wpm > 3) {
    subHeadingText = lessonTitle;
  } else if (newTopSpeedToday && !newTopSpeedPersonalBest && wpm > 3) {
    subHeadingText = lessonTitle;
  }
  return [headingText, subHeadingText];
};

export default getHeadingsText;
