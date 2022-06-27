import { greetings, goodbyes } from "./constants.js";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    let foundSomething = false;
    if (greetings.includes(lowerCaseMessage.replaceAll(/[^\w\s]/g, ""))) {
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
      lowerCaseMessage.includes("stroke")
    ) {
      this.actionProvider.handlePhraseLookup(message);
      foundSomething = true;
    }

    if (goodbyes.includes(lowerCaseMessage)) {
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
