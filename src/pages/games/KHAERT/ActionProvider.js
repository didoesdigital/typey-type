class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleHello() {
    const botMessage = this.createChatBotMessage("Hello. Nice to meet you.");
    this.updateChatbotState(botMessage);
  }
  handleDog() {
    const botMessage = this.createChatBotMessage(
      "Here's a nice dog picture for you!",
      {
        widget: "dogPicture",
      }
    );

    this.updateChatbotState(botMessage);
  }
  handleUnknownText() {
    const botMessage = this.createChatBotMessage("Not sure what to say to that");
    this.updateChatbotState(botMessage);
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
