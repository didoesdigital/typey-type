import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import DogPicture from "./DogPicture";
import PhraseLookup from "./PhraseLookup";
import ExternalLink from "./ExternalLink";
import AussieRobotAvatar from "../../../images/AussieRobotAvatar.svg?react";
import Stenographer from "../../../images/Stenographer.svg?react";

export const botName = "Shazza";

const defaultEmptyDict = new Map([]);

const makeConfig = (globalLookupDictionary = undefined) => ({
  initialMessages: [
    // @ts-expect-error TS(2554) FIXME: Expected 2 arguments, but got 1.
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
    // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    botAvatar: (props) => (
      <div className="mw-48">
        <AussieRobotAvatar
          role="img"
          aria-labelledby="shazza-robot-title"
          {...props}
        />
      </div>
    ),
    // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
    userAvatar: (props) => (
      <div className="mw-40 min-w-40 react-chatbot-kit-user-avatar-container">
        <Stenographer
          role="img"
          aria-labelledby="stenographer-title"
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
    linkText: "",
    linkUrl: "",
    responseType: undefined,
  },
  widgets: [
    {
      widgetName: "dogPicture",
      // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
      widgetFunc: (props) => <DogPicture {...props} />,
    },
    {
      widgetName: "externalLink",
      // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
      widgetFunc: (props) => <ExternalLink {...props} />,
      mapStateToProps: ["linkText", "linkUrl"],
    },
    {
      widgetName: "phraseLookup",
      // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
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
