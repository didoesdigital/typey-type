import React, { useState } from "react";
import { utcFormat } from "d3-time-format";
import prompts from "./prompts";

type ComposePrompt =
  | "creative-short-story"
  | "steno-motivations"
  | "journalling"
  | "open-ended";

type ComposePrompts = {
  [key: string]: ComposePrompt;
};

const defaultComposePrompt = "creative-short-story";

const composePrompts: ComposePrompts = {
  "creative-short-story": "creative-short-story",
  "steno-motivations": "steno-motivations",
  "journalling": "journalling",
  "open-ended": "open-ended",
};

const dayOfYear = +utcFormat("%j")(new Date());
const promptIndex = Math.min(Math.max(dayOfYear - 1, 0), 366);

const getPrompt = (composePrompt: ComposePrompt) => {
  switch (composePrompt) {
    case "creative-short-story":
      return (
        prompts[composePrompt][promptIndex] ?? "Write a creative short story"
      );

    case "steno-motivations":
      return (
        prompts[composePrompt][promptIndex] ??
        "Write about your steno motivations"
      );

    case "journalling":
      return (
        prompts[composePrompt][promptIndex] ??
        "Write about your thoughts and feelings"
      );

    case "open-ended":
      return prompts[composePrompt][promptIndex] ?? "Write anything you like";

    default:
      return "Write anything";
  }
};

const Prompt = () => {
  const [composePrompt, setComposePrompt] =
    useState<ComposePrompt>(defaultComposePrompt);

  const changePromptHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const newPrompt: ComposePrompt =
      composePrompts[event.target.value] ?? defaultComposePrompt;
    setComposePrompt(newPrompt);
  };

  return (
    <>
      <div className="flex">
        <fieldset>
          <div className="flex flex-wrap items-center">
            <legend className="mr3">
              <p className="fw-bold text-center mb0">Today's prompt:</p>
            </legend>
            <div className="flex flex-wrap">
              <div className="mr3">
                <label htmlFor="creative-short-story">
                  <input
                    onChange={changePromptHandler}
                    type="radio"
                    name="compose-prompt"
                    id="creative-short-story"
                    value="creative-short-story"
                    defaultChecked
                  />{" "}
                  Creative short story
                </label>
              </div>
              <div className="mr3">
                <label htmlFor="steno-motivations">
                  <input
                    onChange={changePromptHandler}
                    type="radio"
                    name="compose-prompt"
                    id="steno-motivations"
                    value="steno-motivations"
                  />{" "}
                  Steno motivation
                </label>
              </div>
              <div className="mr3">
                <label htmlFor="journalling">
                  <input
                    onChange={changePromptHandler}
                    type="radio"
                    name="compose-prompt"
                    id="journalling"
                    value="journalling"
                  />{" "}
                  Journalling
                </label>
              </div>
              <div className="mr3">
                <label htmlFor="open-ended">
                  <input
                    onChange={changePromptHandler}
                    type="radio"
                    name="compose-prompt"
                    id="open-ended"
                    value="open-ended"
                  />{" "}
                  Open-ended
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <p
        data-chromatic="ignore"
        className="mt3 b--solid bw-2 b--brand-primary-tint bg-coolgrey-300 dark:bg-coolgrey-900 text-center pr3"
      >
        “{getPrompt(composePrompt)}”
      </p>
    </>
  );
};

export default Prompt;
