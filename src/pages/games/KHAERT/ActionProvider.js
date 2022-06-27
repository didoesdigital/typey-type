import { shuffle } from "d3-array";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleHello() {
    const reply = shuffle(["G'day", "Hello", "Hi"]).slice(0, 1);
    const botMessage = this.createChatBotMessage(reply);
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

  handleHowToKeyboard(userMessage) {
    const reply = userMessage.includes("tab")
      ? "You might be able to press Tab by writing TA*B"
      : userMessage.includes("delete")
      ? "You might be able to delete a character by writing PW*FP"
      : userMessage.includes("undo")
      ? 'You might be able to undo a word by writing * or add a brief for "{#control(z)}" or "{#command(z)}"'
      : userMessage.includes("escape")
      ? "You might be able to press Escape by writing TPEFBG"
      : "You might be able to press Enter/Return by writing R-R";
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handlePhraseLookup(userMessage) {
    const strippedUserMessage = userMessage
      .replaceAll(/[^A-Za-z0-9!#? ]/g, "")
      .replace(/brief/i, "")
      .replace(/stroke/i, "")
      .trim();
    const botMessage = this.createChatBotMessage(
      `You might be able to write “${strippedUserMessage}” like this:`,
      {
        widget: "phraseLookup",
      }
    );

    this.setState((prevState) => ({
      ...prevState,
      phraseToLookup: strippedUserMessage,
      messages: [...prevState.messages, botMessage],
    }));
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
    const reply = shuffle([
      "😕 What can I say?",
      "😕 Not sure what to say to that",
      "😕 I'm still learning, maybe send some feedback about this",
    ]).slice(0, 1);
    const botMessage = this.createChatBotMessage(reply);
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
