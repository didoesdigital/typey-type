import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import DogPicture from "./DogPicture.jsx";
import { ReactComponent as ThinkingRobot } from "../../../images/ThinkingRobot.svg";

export const botName = "Shazza";

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: { backgroundColor: "#1F74D1" },
    chatButton: { backgroundColor: "#067551" },
  },
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
  widgets: [
    {
      widgetName: "dogPicture",
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ],
};

export default config;
