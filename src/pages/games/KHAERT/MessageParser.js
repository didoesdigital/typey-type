class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.handleHello();
    }

    if (lowerCaseMessage.includes("dog")) {
      this.actionProvider.handleDog();
    }
  }
}

export default MessageParser;
