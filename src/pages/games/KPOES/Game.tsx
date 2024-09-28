import React from "react";
import Intro from "../components/Intro";
import Prompt from "./Prompt";
import WriteYourWords from "./WriteYourWords";
import { ReactComponent as ComposingRobot } from "../../../images/ComposingRobot.svg";
import StrokesForWords from "../../../components/StrokesForWords";
import updateMultipleMetWords from "./updateMultipleMetWords";
import "./styles.scss";

import type {
  FetchAndSetupGlobalDict,
  ImportedPersonalDictionaries,
  LookupDictWithNamespacedDictsAndConfig,
  MetWords,
} from "../../../types";

type Props = {
  fetchAndSetupGlobalDict: FetchAndSetupGlobalDict;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  metWords: MetWords;
  personalDictionaries?: ImportedPersonalDictionaries;
  userSettings: any;
  updateMultipleMetWords: typeof updateMultipleMetWords;
};

const gameName = "KPOES";
const introText =
  "Write what's in your head. This is a creative space for you to compose new text at your leisure. It may test your vocabulary and help you spot gaps in it. You could make a habit of writing a target number of words each day.";

export default function Game({
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  metWords,
  personalDictionaries,
  userSettings,
  updateMultipleMetWords,
}: Props) {
  return (
    <div>
      <div className="p3 mx-auto mw-1024">
        <div className="flex flex-wrap justify-between">
          <div className="mx-auto mw-1024 min-width-320 w-100">
            <h3 id="typey-type-KPOES-game" className="text-center mb3">
              {gameName} game
            </h3>
            <Intro
              introText={introText}
              robot={
                <ComposingRobot
                  id="composing-robot-KPOES"
                  role="img"
                  aria-labelledby="composing-robot-title"
                />
              }
            />
            <Prompt />
            <WriteYourWords
              metWords={metWords}
              updateMultipleMetWords={updateMultipleMetWords}
              userSettings={userSettings}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto min-width-320 w-100 landing-page-section bg-slat dark:bg-coolgrey-1100 px3">
        <div className="pt6 mw-584 mx-auto text-center">
          <StrokesForWords
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            personalDictionaries={personalDictionaries}
            userSettings={userSettings}
          />
        </div>
        <p className="text-center mt10 text-small">
          Got a suggestion?{" "}
          <a
            href="https://forms.gle/kkSZZJFrY4USohgq6"
            className="mt0"
            target="_blank"
            rel="noopener noreferrer"
            id="ga--KPOES--give-feedback"
          >
            Give feedback (form opens in new tab)
          </a>
        </p>
      </div>
    </div>
  );
}
