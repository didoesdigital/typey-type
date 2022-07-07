import {
  ageQuestions,
  greetings,
  goodbyes,
  howQuestions,
  keyboardFunctions,
  learningKeywords,
  lookupKeywords,
  whatQuestions,
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
    if (messageMatchesAKeyword(lowerCaseMessage, greetings)) {
      this.actionProvider.handleHello();
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

    if (messageMatchesAKeyword(lowerCaseMessage, ageQuestions)) {
      this.actionProvider.handleAgeQuestions(message);
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
