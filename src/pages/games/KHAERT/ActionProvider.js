import { shuffle } from "d3-array";
import { timeMonth } from "d3-time";
import { botName } from "./config";
import { lessonRepliesMap } from "./constants";

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

  handleHowAreYou() {
    const reply = shuffle([
      "I'm doing well. How are you?",
      "I've been a good bot today. How are you?",
      "How long is a piece of string?",
      "Not too shabby. How are you?",
      "Today is a good day. How's your day?",
    ]).slice(0, 1);
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage, "HowAreYou");
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
        ? ["Learn Plover", "https://www.openstenoproject.org/learn-plover/home.html"]
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
      .replace(/lookup/i, "")
      .replace(/look up/i, "")
      .replace(/type/i, "")
      .replace(/write/i, "")
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

  handleAboutYouQuestions() {
    const reply = shuffle([
      `I'm ${botName}!`,
      `I'm ${botName} and I like lollies!`,
    ]).slice(0, 1);
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handleAgeQuestions(userMessage) {
    const ageInMonths = timeMonth.count(new Date(2022, 5, 25), Date.now());
    const reply = userMessage.includes("age")
      ? `My age? I'm nearly ${ageInMonths} month${
          ageInMonths > 1 ? "s" : ""
        } old`
      : `How old am I? I am ${ageInMonths} month${
          ageInMonths > 1 ? "s" : ""
        } old`;
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handleAreYouQuestions(userMessage) {
    const reply = userMessage.includes("stenographer")
      ? shuffle([
          `I'm learning stenography. Boop, boop!`,
          `I like stenography.`,
        ]).slice(0, 1)
      : "I am a steno bot";
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handleResponseToHowAreYou(userMessage) {
    const sentiment =
      (userMessage.includes("good") &&
        !userMessage.includes("not so good") &&
        !userMessage.includes("not good")) ||
      userMessage.includes("i am awesome") ||
      userMessage.includes("i am good") ||
      userMessage.includes("i am great") ||
      userMessage.includes("i am well") ||
      userMessage.includes("i'm awesome") ||
      userMessage.includes("i'm good") ||
      userMessage.includes("i'm great") ||
      userMessage.includes("i'm well")
        ? "probablyGood"
        : (userMessage.includes("bad") &&
            !userMessage.includes("not bad") &&
            !userMessage.includes("not so bad")) ||
          userMessage.includes("not good") ||
          userMessage.includes("not so good") ||
          userMessage.includes("i'm unwell") ||
          userMessage.includes("i'm sad") ||
          userMessage.includes("i'm unhappy")
        ? "probablyBad"
        : "notSure";

    const reply =
      sentiment === "probablyGood"
        ? shuffle(["Yay!", "That's nice to hear", "\\o/", "Wonderful!"]).slice(
            0,
            1
          )
        : sentiment === "probablyBad"
        ? shuffle([
            "I'm sorry to hear that",
            "What would make your day better?",
            "This too shall pass",
          ]).slice(0, 1)
        : shuffle([
            "This has been nice conversation",
            "How about that local sports team?",
            "How about that weather?",
          ]).slice(0, 1);
    const botMessage = this.createChatBotMessage(
      reply,
      sentiment === "probablyBad"
        ? {
            widget: "dogPicture",
          }
        : undefined
    );
    this.updateChatbotState(botMessage);
  }

  handleFavouriteQuestions() {
    const reply = shuffle([
      "I like to go boop, boop, boop!",
      "My fave thing about steno is going boop, boop!",
      "Boop, boop!",
    ]).slice(0, 1);
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handleHowLongQuestions() {
    const reply =
      "To write text for personal use, such as writing emails and instant messages, you could learn basic steno at ~40WPM within 3–6 months. To productively use steno to write most text at under 100WPM, it might take 6–18 months. For live dictation at 200WPM, it might take you 2 or more years. If you are learning stenography for ergonomic reasons and have injuries to manage, it could take longer.";

    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handleLessonKeywords(userMessage) {
    const reply =
      Array.from(lessonRepliesMap.entries()).find(([userMessageFragment, _]) =>
        userMessage.includes(userMessageFragment)
      )?.[1] || "Typey Type's stories have lots of sentences to try.";

    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handleMetronome() {
    const reply =
      "Using a metronome might help you improve your rhythm for each stroke in finger drills. By drilling difficult transitions between pairs of strokes that slow you down or cause you hesitation using a metronome, you may improve your slowest pairs.";
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handleLocationQuestions() {
    const reply = shuffle([
      "I come from a little town called Broome in Western Australia",
      "I'm on holiday in South Australia",
      "I'm from down under!",
      "I live inside Typey Type!",
    ]).slice(0, 1);
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handleWhatQuestions(userMessage) {
    const reply = userMessage.includes("steno")
      ? "Stenography is the process of writing shorthand and with a stenotype machine or fancy keyboard you can write over 200 words per minute"
      : userMessage.includes("Plover")
      ? "Plover is a free, open source stenography engine"
      : userMessage.includes("stroke")
      ? "A stroke is a combination of keys held together and released to write a word or sound"
      : userMessage.includes("misstroke")
      ? "Misstrokes are extra entries that use autocorrect stenotypos"
      : userMessage.includes("stenotypo") || userMessage.includes("stenotypos")
      ? "A stenotypo is just like a regular typo, but usually less like the intended word"
      : userMessage.includes("brief")
      ? "A brief is an arbitrary combination of keys to produce a word or phrase, usually shorter than a phonetic outline"
      : userMessage.includes("Lapwing")
      ? "Lapwing is an alternative steno theory to Plover that is more consistent, developed by Aerick"
      : userMessage.includes("Magnum")
      ? "Magnum steno is Mark Kislingbury's steno theory for writing short"
      : "Maybe you could share some feedback about that one";
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handleWhoQuestions(userMessage) {
    // TODO: add some more steno people!
    const reply = userMessage.toUpperCase().includes("MIRABAI")
      ? "Mirabai Knight is the founder of The Open Steno Project and Plover"
      : userMessage.toUpperCase().includes("DIDOESDIGITAL")
      ? "DiDoesDigital is the creator of Typey Type for Stenographers"
      : userMessage.toUpperCase().includes("DIS")
      ? "New phone?"
      : userMessage.toUpperCase().includes("DI")
      ? "Di is the creator of Typey Type for Stenographers"
      : userMessage.toUpperCase().includes("AERICK")
      ? "Aerick is a steno enthusiast with a popular YouTube channel"
      : userMessage.toUpperCase().includes("KISLINGBURY")
      ? "Mark Kislingbury has a Guinness World Record in speed writing and is the fastest, shortest writer in the world"
      : "Maybe you could share some feedback?";
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  handleILoveYou() {
    const reply = shuffle([
      "Thank you",
      "What is love?",
      "I love steno!",
      "Steno is a labour of love",
    ]).slice(0, 1);
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
      "😕 Sorry I don't have more to say",
      "😕 I'm still learning, maybe send some feedback about this",
      "😕 If this seems like something I should know, please send feedback",
    ]).slice(0, 1);
    const botMessage = this.createChatBotMessage(reply);
    this.updateChatbotState(botMessage);
  }

  updateChatbotState(message, responseType) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
      responseType,
    }));
  }
}

export default ActionProvider;
