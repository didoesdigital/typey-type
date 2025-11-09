import { useEffect, useRef } from "react";
import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import GoogleAnalytics from "react-ga4";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../states/userSettingsState";
import type {
  ActualTypedText,
  CurrentLessonStrokes,
  PresentedMaterial,
} from "../types";

type Props = {
  actualText: ActualTypedText;
  completedPhrases: PresentedMaterial;
  currentPhraseID: number;
  currentLessonStrokes: CurrentLessonStrokes[];
  currentPhrase: string;
  previousCompletedPhraseAsTyped: string;
  sayCurrentPhraseAgain: () => void;
  updateMarkup: React.ChangeEventHandler<HTMLTextAreaElement>;
  focusTriggerInt: number;
};

const TypedText = (props: Props) => {
  const userSettings = useAtomValue(userSettingsState);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    return () => {
      const synth = window.speechSynthesis;
      if (synth && synth.speaking) {
        synth.cancel();
      }
    };
  }, []);

  const focusTriggerInt = props.focusTriggerInt;
  useEffect(() => {
    inputRef.current?.focus();
  }, [focusTriggerInt]);

  function speak() {
    props.sayCurrentPhraseAgain();

    GoogleAnalytics.event({
      category: "SpeakMaterial",
      action: "Single click Say word button",
      label: "", // If not a custom lesson, it could be handy to specify props.currentPhrase here
    });
  }

  // Double click in Safari will start to say the word on first click then…
  // interrupt it to say it again on double click
  function onDoubleClickSpeakAndFocus() {
    props.sayCurrentPhraseAgain();
    // This makes it hard for screen readers to hear the word:
    inputRef.current?.focus();

    GoogleAnalytics.event({
      category: "SpeakMaterial",
      action: "Double click Say word button",
      label: "", // If not a custom lesson, it could be handy to specify props.currentPhrase here
    });
  }

  function keyPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event && event.charCode && event.charCode === 13) {
      // Enter key
      event.preventDefault();
      // sayCurrentPhraseAgain on ⇧+Enter:
      if (event.shiftKey) {
        speak();
        GoogleAnalytics.event({
          category: "SpeakMaterial",
          action: "Shift Enter",
          label:
            userSettings && userSettings.speakMaterial
              ? "Speak material on"
              : "Speak material off",
        });
      } else {
        // TODO: this could be a good trigger to reveal stroke hints
      }
    }
  }

  const isMultiline = userSettings.upcomingWordsLayout === "multiline";
  const previousCompletedPhraseAsTypedKey = props.completedPhrases
    ? props.completedPhrases.length
    : 0;
  const strokes = props.currentLessonStrokes;
  const previousCompletedPhraseAccuracy =
    strokes && strokes.length > 0 ? strokes[strokes.length - 1].accuracy : true;
  const hideEchoesFromScreenReaders = !userSettings.textInputAccessibility;

  let sayCurrentPhraseButton = null;
  if (userSettings && userSettings.speakMaterial) {
    sayCurrentPhraseButton = (
      <button
        className="link-button button--secondary say-word-button mb-4"
        onClick={speak.bind(this)}
        onDoubleClick={onDoubleClickSpeakAndFocus.bind(this)}
      >
        Say word
      </button>
    );
  }

  return (
    <div className={isMultiline ? "mx-auto mw-844" : ""}>
      <div className="typed-text-container relative">
        <label className="visually-hidden mb1" htmlFor="your-typed-text">
          {hideEchoesFromScreenReaders && props.currentPhraseID > 0
            ? `${props.currentPhrase}`
            : `Write ${props.currentPhrase}`}
        </label>
        {sayCurrentPhraseButton}
        <p className="input-text mx-auto">
          <samp className="pointer-none absolute absolute--fill w-100">
            <TransitionGroup
              className={`dib${isMultiline ? " flex justify-center" : ""}`}
              component={"span"}
              key={previousCompletedPhraseAsTypedKey}
            >
              <CSSTransition timeout={5000} classNames="dissolve" appear={true}>
                <kbd
                  className={`successfully-typed-text typed-text-input-positioning whitespace-pre relative${
                    isMultiline ? " text-center" : " text-left"
                  }`}
                  style={{
                    color: previousCompletedPhraseAccuracy
                      ? "#23512C"
                      : "#953159",
                  }}
                  aria-hidden="true"
                >
                  {props.previousCompletedPhraseAsTyped}
                </kbd>
              </CSSTransition>
            </TransitionGroup>
          </samp>
          <span>
            <textarea
              data-1p-ignore
              data-bwignore
              data-lpignore="true"
              data-form-type="other"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className={`input-textarea typed-text-input-positioning typed-text-input-textarea overflow-hidden${
                isMultiline ? " text-center" : ""
              }`}
              id="your-typed-text"
              key={
                hideEchoesFromScreenReaders
                  ? `remount-${props.currentPhraseID}`
                  : "stableKey"
              }
              ref={inputRef}
              data-testid="your-typed-text"
              aria-describedby={
                userSettings.punctuationDescriptions
                  ? "punctuation-description"
                  : undefined
              }
              onChange={props.updateMarkup}
              onKeyPress={keyPress.bind(this)}
              rows={1}
              spellCheck={false}
              value={props.actualText}
              wrap="off"
            ></textarea>
          </span>
        </p>
      </div>
    </div>
  );
};

export default TypedText;
