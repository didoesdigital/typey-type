import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import DogPicture from "./DogPicture.jsx";
import PhraseLookup from "./PhraseLookup.jsx";
import { ReactComponent as ThinkingRobot } from "../../../images/ThinkingRobot.svg";

export const botName = "Shazza";

const defaultEmptyDict = new Map([]);

const makeConfig = (globalLookupDictionary = undefined) => ({
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName} and I love talking about steno`),
    createChatBotMessage(
      `I'm a newly built bot so I don't have much to say yet`,
      { delay: 300 }
    ),
    createChatBotMessage(
      `Send Di a message if you have ideas for useful things to teach me`,
      { delay: 600 }
    ),
  ],
  botName: botName,
  customComponents: {
    botAvatar: (props) => (
      <div className="mw-48">
        <ThinkingRobot
          role="img"
          aria-labelledby="thinking-robot-title"
          {...props}
        />
      </div>
    ),
  },
  customStyles: {
    botMessageBox: { backgroundColor: "#1F74D1" },
    chatButton: { backgroundColor: "#067551" },
  },
  state: {
    phraseToLookup: "",
  },
  widgets: [
    {
      widgetName: "dogPicture",
      widgetFunc: (props) => <DogPicture {...props} />,
    },
    {
      widgetName: "phraseLookup",
      widgetFunc: (props) => (
        <PhraseLookup
          {...props}
          globalLookupDictionary={globalLookupDictionary || defaultEmptyDict}
        />
      ),
      mapStateToProps: ["phraseToLookup"],
    },
  ],
});

export default makeConfig;
