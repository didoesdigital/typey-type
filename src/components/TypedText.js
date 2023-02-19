import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import GoogleAnalytics from "react-ga";

class TypedText extends Component {
  componentWillUnmount() {
    let synth = window.speechSynthesis;
    if (synth && synth.speaking) {
      synth.cancel();
    }
  }

  speak() {
    this.props.sayCurrentPhraseAgain();

    GoogleAnalytics.event({
      category: "SpeakMaterial",
      action: "Single click Say word button",
      label: "", // If not a custom lesson, it could be handy to specify this.props.currentPhrase here
    });
  }

  // Double click in Safari will start to say the word on first click then…
  // interrupt it to say it again on double click
  onDoubleClickSpeakAndFocus() {
    this.props.sayCurrentPhraseAgain();
    // This makes it hard for screen readers to hear the word:
    const yourTypedText = document.getElementById("your-typed-text");
    if (yourTypedText) {
      yourTypedText.focus();
    }

    GoogleAnalytics.event({
      category: "SpeakMaterial",
      action: "Double click Say word button",
      label: "", // If not a custom lesson, it could be handy to specify this.props.currentPhrase here
    });
  }

  keyPress(event) {
    if (event && event.charCode && event.charCode === 13) {
      // Enter key
      event.preventDefault();
      // sayCurrentPhraseAgain on ⇧+Enter:
      if (event.shiftKey) {
        this.speak();
        GoogleAnalytics.event({
          category: "SpeakMaterial",
          action: "Shift Enter",
          label:
            this.props.userSettings && this.props.userSettings.speakMaterial
              ? "Speak material on"
              : "Speak material off",
        });
      } else {
        // TODO: this could be a good trigger to reveal stroke hints
      }
    }
  }

  render() {
    const isMultiline =
      this.props.userSettings.upcomingWordsLayout === "multiline";
    let previousCompletedPhraseAsTypedKey = this.props.completedPhrases
      ? this.props.completedPhrases.length
      : 0;
    let strokes = this.props.currentLessonStrokes;
    let previousCompletedPhraseAccuracy =
      strokes && strokes.length > 0
        ? strokes[strokes.length - 1].accuracy
        : true;
    let textInputAccessibilityAriaHidden =
      !this.props.userSettings.textInputAccessibility;

    let sayCurrentPhraseButton = null;
    if (this.props.userSettings && this.props.userSettings.speakMaterial) {
      sayCurrentPhraseButton = (
        <button
          className="link-button button--secondary say-word-button mb-4"
          onClick={this.speak.bind(this)}
          onDoubleClick={this.onDoubleClickSpeakAndFocus.bind(this)}
        >
          Say word
        </button>
      );
    }

    return (
      <div className={isMultiline ? "mx-auto mw-844" : ""}>
        <div className="typed-text-container relative">
          <label className="visually-hidden mb1" htmlFor="your-typed-text">
            Write {this.props.currentPhrase}
          </label>
          {sayCurrentPhraseButton}
          <p className="input-text mx-auto">
            <samp className="pointer-none absolute absolute--fill w-100">
              <TransitionGroup
                className={`dib${isMultiline ? " flex justify-center" : ""}`}
                component={"span"}
                key={previousCompletedPhraseAsTypedKey}
              >
                <CSSTransition
                  timeout={5000}
                  classNames="dissolve"
                  appear={true}
                >
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
                    {this.props.previousCompletedPhraseAsTyped}
                  </kbd>
                </CSSTransition>
              </TransitionGroup>
            </samp>
            <span aria-hidden={textInputAccessibilityAriaHidden}>
              <textarea
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className={`input-textarea typed-text-input-positioning typed-text-input-textarea overflow-hidden${
                  isMultiline ? " text-center" : ""
                }`}
                id="your-typed-text"
                aria-describedby="punctuation-description"
                onChange={this.props.updateMarkup}
                onKeyPress={this.keyPress.bind(this)}
                rows="1"
                spellCheck="false"
                value={this.props.actualText}
                wrap="off"
              ></textarea>
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default TypedText;
