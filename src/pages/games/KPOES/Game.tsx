import React from "react";
import Intro from "../components/Intro";
import Prompt from "./Prompt";
import WriteYourWords from "./WriteYourWords";
import { ReactComponent as ThinkingRobot } from "../../../images/ThinkingRobot.svg";
import StrokesForWords from "../../../components/StrokesForWords";
import "./styles.scss";

import type {
  LookupDictWithNamespacedDicts,
  MetWords,
  PersonalDictionaryNameAndContents,
} from "../../../types";

type Props = {
  fetchAndSetupGlobalDict: (
    withPlover: boolean,
    importedPersonalDictionaries?: any
  ) => Promise<any>;
  globalLookupDictionary: LookupDictWithNamespacedDicts;
  globalLookupDictionaryLoaded: boolean;
  metWords: MetWords;
  personalDictionaries: PersonalDictionaryNameAndContents[];
  // startingMetWordsToday: MetWords;
  // updateMetWords: any;
  globalUserSettings: any;
  userSettings: any;
  updateMultipleMetWords: (newMetWords: string[]) => void;
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
  // startingMetWordsToday,
  // updateMetWords,
  globalUserSettings,
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
                <ThinkingRobot
                  id="thinking-robot-KPOES"
                  role="img"
                  aria-labelledby="thinking-robot-title"
                />
              }
            />
            <Prompt />
            <WriteYourWords
              metWords={metWords}
              updateMultipleMetWords={updateMultipleMetWords}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto min-width-320 w-100 landing-page-section bg-slat dark:bg-coolgrey-1100 ">
        <div className="pt6 mw-584 mx-auto text-center">
          <StrokesForWords
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            globalUserSettings={globalUserSettings}
            personalDictionaries={personalDictionaries}
            userSettings={userSettings}
          />
        </div>
        <p className="text-center mt10 text-small">
          Got a suggestion?{" "}
          <a
            href="https://forms.gle/P1tMjotG2w17CyyNA"
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
