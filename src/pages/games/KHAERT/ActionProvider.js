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

  handleLearningQuestions(userMessage) {
    const [linkText, linkUrl] =
      userMessage.includes("learn") || userMessage.includes("theory")
        ? ["Learn Plover", "https://sites.google.com/site/learnplover/home"]
        : userMessage.includes("practice") || userMessage.includes("drill")
        ? ["Stenojig", "https://joshuagrams.github.io/steno-jig/"]
        : ["Plover Discord", "https://discord.gg/0lQde43a6dGmAMp2"];
    const botMessage = this.createChatBotMessage(`One of my faves is:`, {
      widget: "externalLink",
    });

    this.setState((prevState) => ({
      ...prevState,
      linkText,
      linkUrl,
      messages: [...prevState.messages, botMessage],
    }));
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

  handleWhatQuestions(userMessage) {
    const reply = userMessage.includes("steno")
      ? "Stenography is the process of writing shorthand and with a stenotype machine or fancy keyboard you can write over 200 words per minute"
      : userMessage.includes("stroke")
      ? "A stroke is a combination of keys held together and released to write a word or sound"
      : userMessage.includes("misstroke")
      ? "Misstrokes are extra entries that use autocorrect stenotypos"
      : userMessage.includes("stenotypo") || userMessage.includes("stenotypos")
      ? "A stenotypo is just like a regular typo, but usually less like the intended word"
      : userMessage.includes("brief")
      ? "A brief is an arbitrary combination of keys to produce a word or phrase, usually shorter than a phonetic outline"
      : userMessage.includes("outline")
      ? "An outline is the collection of keys and strokes to produce a word or phrase"
      : "Maybe you could share some feedback about that one";
    const botMessage = this.createChatBotMessage(reply);
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
