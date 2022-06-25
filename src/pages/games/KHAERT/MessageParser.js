class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    let foundSomething = false;
    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.handleHello();
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
