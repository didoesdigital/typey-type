import React, { useEffect, useState } from "react";
import Intro from "../components/Intro";
import { ReactComponent as AussieRobot } from "../../../images/AussieRobot.svg";
import Chatbot from "react-chatbot-kit";
import "./styles.scss";
import makeConfig, { botName } from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import type { LookupDictWithNamespacedDictsAndConfig } from "types";

const gameName = "KHAERT";
const introText =
  "Meet Shazza, the Aussie steno bot who loves to have a yarn. You can ask her how to write steno phrases and she'll do her best to look it up.";

type Props = {
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
};

export default function Game({ globalLookupDictionary }: Props) {
  const [config, setConfig] = useState(makeConfig());

  useEffect(() => {
    // @ts-expect-error FIXME: needs proper types
    const newConfig = makeConfig(globalLookupDictionary);
    setConfig(newConfig);
  }, [globalLookupDictionary]);

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
                  <AussieRobot
                    id="aussie-robot-KHAERT"
                    role="img"
                    aria-labelledby="aussie-robot-title"
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
            <div className="ml3">
              <p className="ml4">Try:</p>
              <ul className="ml4">
                <li>“What is steno?”</li>
                <li>“Look up accomplishment”</li>
                <li>“How do I press Tab?”</li>
                <li>“Where can I learn steno?”</li>
              </ul>
            </div>
            <div className="flex flex-wrap pt3 pb1 ml4">
              <p className="ml3">
                Note: Shazza is still in development and has a lot to learn!
                Please share feedback on what she should learn next.
              </p>
            </div>
          </div>
          <div className="mt1 mw-336 flex-grow">
            <div className="flex flex-wrap flex-grow py3">
              <Chatbot
                // @ts-expect-error TS(2322) FIXME: Type '{ initialMessages: { loading: boolean; widge... Remove this comment to see the full error message
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
                headerText={`Convo with ${botName}`}
                placeholderText="Write here, hit enter (R-R)"
              />
            </div>
            <p>
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
