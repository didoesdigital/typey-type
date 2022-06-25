import React from "react";
import Intro from "../components/Intro";
import { ReactComponent as ThinkingRobot } from "../../../images/ThinkingRobot.svg";
import Chatbot from "react-chatbot-kit";
import "./styles.scss";
import config, { botName } from "./config.js";
import MessageParser from "./MessageParser.js";
import ActionProvider from "./ActionProvider.js";

const gameName = "KHAERT";
const introText =
  "Meet Shazza, the Aussie steno bot who loves to have a yarn. Say hi (HEU).";

export default function Game() {
  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320 w-100">
        <div className="flex flex-wrap justify-between">
          <div className="mw-584">
            <h3 id="typey-type-SHUFL-game" className="text-center mb3">
              {gameName}
            </h3>
            <div className="flex flex-wrap pb1">
              <Intro
                introText={introText}
                robot={
                  <ThinkingRobot
                    id="thinking-robot-KHAERT"
                    role="img"
                    aria-labelledby="thinking-robot-title"
                  />
                }
              />
              <p className="ml4">
                <a
                  href="https://forms.gle/UigaX3vTFCzN5fzx8"
                  className="mt0 ml3"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="ga--KHAERT--give-feedback"
                >
                  Give feedback on the bot
                </a>
              </p>
            </div>
          </div>
          <div className="mt1 mw-336 flex-grow">
            <div className="flex flex-wrap flex-grow py3">
              <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
                headerText={`Convo with ${botName}`}
                placeholderText="Write here and hit return (R-R)"
              />
            </div>
            <p className="">
              <a
                href="https://forms.gle/UigaX3vTFCzN5fzx8"
                className="mt0"
                target="_blank"
                rel="noopener noreferrer"
                id="ga--KHAERT--give-feedback"
              >
                Give feedback on the bot
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
