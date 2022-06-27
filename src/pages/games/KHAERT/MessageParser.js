import { greetings, goodbyes } from "./constants.js";
import { escapeRegExp } from "../../../utils/utils.js";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    let foundSomething = false;
    if (
      greetings.some((greeting) => {
        const regexp = new RegExp(`\\b${escapeRegExp(greeting)}\\b`, "g");
        const result = regexp.test(lowerCaseMessage);
        return result;
      })
    ) {
      this.actionProvider.handleHello();
      foundSomething = true;
    }

    if (
      (lowerCaseMessage.includes("how do i") ||
        lowerCaseMessage.includes("how do you") ||
        lowerCaseMessage.includes("how can i") ||
        lowerCaseMessage.includes("how to")) &&
      (lowerCaseMessage.includes("tab") ||
        lowerCaseMessage.includes("backspace") ||
        lowerCaseMessage.includes("delete") ||
        lowerCaseMessage.includes("undo") ||
        lowerCaseMessage.includes("escape") ||
        lowerCaseMessage.includes("enter") ||
        lowerCaseMessage.includes("return"))
    ) {
      this.actionProvider.handleHowToKeyboard(lowerCaseMessage);
      foundSomething = true;
    }

    if (
      lowerCaseMessage.includes("brief") ||
      lowerCaseMessage.includes("write") ||
      lowerCaseMessage.includes("type") ||
      lowerCaseMessage.includes("stroke")
    ) {
      this.actionProvider.handlePhraseLookup(message);
      foundSomething = true;
    }

    if (
      goodbyes.some((goodbye) => {
        const regexp = new RegExp(`\\b${escapeRegExp(goodbye)}\\b`, "g");
        const result = regexp.test(lowerCaseMessage);
        return result;
      })
    ) {
      this.actionProvider.handleGoodbye();
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
