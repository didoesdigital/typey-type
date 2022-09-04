import * as Utils from "../../../utils/utils";

type MaterialItem = { phrase: string; stroke: string };
type Material = MaterialItem[];

const getStrokeForCurrentSlideContent = (
  word: string,
  sourceMaterial: Material
) => {
  let stroke = "XXX";
  let i = 0;
  let length = sourceMaterial.length;

  for (; i < length; i++) {
    if (sourceMaterial[i].phrase === word) {
      stroke = sourceMaterial[i].stroke;
    }
  }
  return stroke;
};

const getWordForCurrentStrokeSlideIndex = (
  flashcards: any,
  slideIndex: any
) => {
  let word = "";
  let flashcardsIndex = 0;
  // assumes stroke slides are always odd
  if (slideIndex > flashcards.length * 2) {
    word = "";
  } else if (slideIndex % 2 === 1) {
    flashcardsIndex = (slideIndex - 1) / 2;
    word = flashcards[flashcardsIndex].phrase;
  }
  return word;
};

// console.log("Considering: '"+flashcardsMetWords[item.phrase].phrase + "' against threshold: "+threshold+" where rung is: "+flashcardsMetWords[item.phrase].rung);
// console.log("Pushing: '"+flashcardsMetWords[item.phrase].phrase+"'");
const chooseFlashcardsToShow = (
  sourceMaterial: Material,
  flashcardsMetWords: any,
  numberOfFlashcardsToShow: number,
  threshold: number,
  randomise = false
) => {
  let presentedMaterial = sourceMaterial.slice(0, 100); // estimated comfortable rendering/animation limit
  let flashcardItemsToShow: Material = [];

  if (randomise) {
    presentedMaterial = Utils.randomise(presentedMaterial);
  }

  presentedMaterial.forEach((item) => {
    if (flashcardsMetWords[item.phrase]) {
      if (flashcardsMetWords[item.phrase].rung <= threshold) {
        flashcardItemsToShow.push(item);
      }
    } else {
      // If you've never seen this word in flashcards before, add it and set its rung to 0
      flashcardsMetWords[item.phrase] = {
        phrase: item.phrase,
        stroke: item.stroke,
        rung: 0,
      };
      // If you've never seen it, show the flashcard
      flashcardItemsToShow.push(item);
      // flashcardsMetWords = this.props.updateFlashcardsMetWords(item.phrase, "skip", item.stroke, 0);
    }
  });
  if (threshold < 2) {
    numberOfFlashcardsToShow = 15;
  }
  flashcardItemsToShow = flashcardItemsToShow.slice(
    0,
    numberOfFlashcardsToShow
  );
  return flashcardItemsToShow;
};

// timeAgoInMinutes = 40
const getFlashcardsRungThreshold = (
  timeAgoInMinutes: number,
  baseUnitInMinutes: number,
  multiplier: number
) => {
  let rungThreshold = 0;
  let i = baseUnitInMinutes * Math.pow(multiplier, rungThreshold); // i = 30
  while (i < timeAgoInMinutes) {
    // 30 < 40 === true; 60 < 40 === false;
    rungThreshold = rungThreshold + 1; // rungThreshold = 1
    i = baseUnitInMinutes * Math.pow(multiplier, rungThreshold); // i = 60
  }
  // console.log("Threshold: "+rungThreshold+ " because baseUnitInMinutes was: "+ baseUnitInMinutes+" and multiplier was: "+multiplier+" and i: "+i+" and of course timeAgoInMinutes was: "+timeAgoInMinutes);
  return rungThreshold;
};

const getCurrentSlideContentAndType = (
  flashcards: any,
  flashcardsCarouselCurrentSlide: any
) => {
  let currentSlideContent = ["", ""];
  let currentSlide = flashcardsCarouselCurrentSlide;
  let flashcardsIndex = 0;
  // assumes stroke slides are always odd
  if (currentSlide > flashcards.length * 2) {
    currentSlideContent = ["Finished…", "finished"]; // this case would be a bug
  } else if (currentSlide % 2 === 1) {
    flashcardsIndex = (currentSlide - 1) / 2;
    currentSlideContent[0] = flashcards[flashcardsIndex].stroke;
    currentSlideContent[1] = "stroke";
    // assumes word and Finished! slides are always even
  } else if (currentSlide % 2 === 0) {
    flashcardsIndex = currentSlide / 2;
    if (flashcardsIndex === flashcards.length) {
      currentSlideContent[0] = "Finished!";
      currentSlideContent[1] = "finished";
    } else {
      currentSlideContent[0] = flashcards[flashcardsIndex].phrase;
      currentSlideContent[1] = "phrase";
    }
  }
  return currentSlideContent;
};

export {
  chooseFlashcardsToShow,
  getCurrentSlideContentAndType,
  getFlashcardsRungThreshold,
  getStrokeForCurrentSlideContent,
  getWordForCurrentStrokeSlideIndex,
};
