import {
  ageQuestions,
  areYouQuestions,
  goodbyes,
  favouriteQuestions,
  greetings,
  howQuestions,
  howAreYouQuestions,
  howLongQuestions,
  whoAreYouQuestions,
  keyboardFunctions,
  learningKeywords,
  lessonKeywords,
  locationQuestions,
  lookupKeywords,
  nameQuestions,
  whatQuestions,
  whoQuestions,
} from "./constants.js";
import { escapeRegExp } from "../../../utils/utils";

const messageMatchesAKeyword = (message, keywords) => {
  return keywords.some((keyword) => {
    const regexp = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "g");
    const result = regexp.test(message);
    return result;
  });
};

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    let foundSomething = false;

    if (this.state.responseType && this.state.responseType === "HowAreYou") {
      this.actionProvider.handleResponseToHowAreYou(lowerCaseMessage);
      foundSomething = true;
    }

    if (messageMatchesAKeyword(lowerCaseMessage, greetings)) {
      this.actionProvider.handleHello();
      foundSomething = true;
    }

    if (messageMatchesAKeyword(lowerCaseMessage, howAreYouQuestions)) {
      this.actionProvider.handleHowAreYou(lowerCaseMessage);
      foundSomething = true;
    }

    if (messageMatchesAKeyword(lowerCaseMessage, howLongQuestions)) {
      this.actionProvider.handleHowLongQuestions(lowerCaseMessage);
      foundSomething = true;
    }

    if (messageMatchesAKeyword(lowerCaseMessage, lessonKeywords)) {
      this.actionProvider.handleLessonKeywords(lowerCaseMessage);
      foundSomething = true;
    }

    if (messageMatchesAKeyword(lowerCaseMessage, ["metronome"])) {
      this.actionProvider.handleMetronome(lowerCaseMessage);
      foundSomething = true;
    }

    if (
      messageMatchesAKeyword(lowerCaseMessage, howQuestions) &&
      messageMatchesAKeyword(lowerCaseMessage, keyboardFunctions)
    ) {
      this.actionProvider.handleHowToKeyboard(lowerCaseMessage);
      foundSomething = true;
    }

    if (messageMatchesAKeyword(lowerCaseMessage, learningKeywords)) {
      this.actionProvider.handleLearningQuestions(lowerCaseMessage);
      foundSomething = true;
    }

    if (messageMatchesAKeyword(lowerCaseMessage, lookupKeywords)) {
      this.actionProvider.handlePhraseLookup(message);
      foundSomething = true;
    }

    if (messageMatchesAKeyword(lowerCaseMessage, whatQuestions)) {
      this.actionProvider.handleWhatQuestions(message);
      foundSomething = true;
    }

    if (messageMatchesAKeyword(lowerCaseMessage, goodbyes)) {
      this.actionProvider.handleGoodbye();
      foundSomething = true;
    }

    if (
      messageMatchesAKeyword(lowerCaseMessage, ageQuestions) &&
      lowerCaseMessage.includes("?")
    ) {
      this.actionProvider.handleAgeQuestions(message);
      foundSomething = true;
    }

    if (messageMatchesAKeyword(lowerCaseMessage, ["i love you"])) {
      this.actionProvider.handleILoveYou(message);
      foundSomething = true;
    }

    if (
      messageMatchesAKeyword(lowerCaseMessage, areYouQuestions) &&
      lowerCaseMessage.includes("?")
    ) {
      this.actionProvider.handleAreYouQuestions(message);
      foundSomething = true;
    }

    if (
      messageMatchesAKeyword(lowerCaseMessage, locationQuestions) &&
      lowerCaseMessage.includes("?")
    ) {
      this.actionProvider.handleLocationQuestions(message);
      foundSomething = true;
    }

    if (
      messageMatchesAKeyword(lowerCaseMessage, whoAreYouQuestions) ||
      (messageMatchesAKeyword(lowerCaseMessage, nameQuestions) &&
        lowerCaseMessage.includes("?"))
    ) {
      this.actionProvider.handleAboutYouQuestions(message);
      foundSomething = true;
    } else if (messageMatchesAKeyword(lowerCaseMessage, whoQuestions)) {
      this.actionProvider.handleWhoQuestions(message);
      foundSomething = true;
    }

    if (
      messageMatchesAKeyword(lowerCaseMessage, favouriteQuestions) &&
      lowerCaseMessage.includes("?")
    ) {
      this.actionProvider.handleFavouriteQuestions(message);
      foundSomething = true;
    }

    if (lowerCaseMessage.includes("dog")) {
      this.actionProvider.handleDog();
      foundSomething = true;
    }

    if (!foundSomething) {
      this.actionProvider.handleUnknownText();
    }
  }
}

export default MessageParser;
