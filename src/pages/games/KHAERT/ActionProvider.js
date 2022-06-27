import { shuffle } from "d3-array";

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

  handleGoodbye() {
    const reply = shuffle([
      "Goodbye",
      "Farewell",
      "Take care",
      "Stay safe",
    ]).slice(0, 1);
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handlePhraseLookup(userMessage) {
    const strippedUserMessage = userMessage
      .replaceAll(/[^A-Za-z0-9!#? ]/g, "")
      .replace("brief", "")
      .replace("stroke", "")
      .trim();
    const botMessage = this.createChatBotMessage(
      `You might be able to write “${strippedUserMessage}” like this:`,
      {
        widget: "phraseLookup",
      }
    );
    this.setState((state) => ({
      ...state,
      phraseToLookup: strippedUserMessage,
    }));
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
    const botMessage = this.createChatBotMessage(
      "Not sure what to say to that"
    );
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
