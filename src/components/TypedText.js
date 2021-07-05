import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { matchSplitText } from './../utils/typey-type';

class TypedText extends Component {
  componentWillUnmount() {
    let synth = window.speechSynthesis;
    if (synth && synth.speaking) {
      synth.cancel();
    }
  }

  // Show how much of what you've typed is correct
  markUpTypedText(currentPhrase, actualText, settings) {
    let array = matchSplitText(currentPhrase, actualText, settings, this.props.userSettings);
    let matched = array[2];
    let unmatched = array[3];
    let matchedTypedTextMarkup = `<pre><span aria-hidden="true">&#8203;</span><span class="matched steno-typing">${matched}</span><span class="unmatched steno-typing">${unmatched}</span></pre>`;
    return {__html: matchedTypedTextMarkup};
  }

  speak() {
    this.props.sayCurrentPhraseAgain();
  }

  // Double click in Safari will start to say the word on first click then…
  // interrupt it to say it again on double click
  onDoubleClickSpeakAndFocus() {
    this.props.sayCurrentPhraseAgain();
    // This makes it hard for screen readers to hear the word:
    const yourTypedText = document.getElementById('your-typed-text');
    if (yourTypedText) {
      yourTypedText.focus();
    }
  }

  keyPress(event) {
    if (event && (event.charCode && event.charCode === 13)) { // Enter key
      event.preventDefault();
      // sayCurrentPhraseAgain on ⇧+Enter:
      if (event.shiftKey) {
        this.speak();
      }
      else {
        // TODO: this could be a good trigger to reveal stroke hints
      }
    }
  }

  render() {
    let previousCompletedPhraseAsTypedKey = this.props.completedPhrases ? this.props.completedPhrases.length : 0;
    let strokes = this.props.currentLessonStrokes;
    let previousCompletedPhraseAccuracy = strokes && strokes.length > 0 ? strokes[strokes.length - 1].accuracy : true;
    let textInputAccessibilityAriaHidden = !this.props.userSettings.textInputAccessibility;

    let sayCurrentPhraseButton = null;
    if (this.props.userSettings && this.props.userSettings.speakMaterial) {
      sayCurrentPhraseButton = (
        <button className="link-button button--secondary say-word-button" onClick={this.speak.bind(this)} onDoubleClick={this.onDoubleClickSpeakAndFocus.bind(this)}>Say word</button>
      )
    };

    return (
      <div className="typed-text-container">
        <label className="visually-hidden mb1" htmlFor="your-typed-text">Write {this.props.currentPhrase}</label>
        <div className="typed-text" dangerouslySetInnerHTML={this.markUpTypedText(this.props.currentPhrase, this.props.actualText, this.props.settings)} />
        {sayCurrentPhraseButton}
        <p className="input-text">
          <samp className="pointer-none absolute absolute--fill w-100">
          <TransitionGroup
            className="dib"
            component={"span"}
            key={previousCompletedPhraseAsTypedKey}
          >
            <CSSTransition
              timeout={5000}
              classNames='dissolve'
              appear={true}
            >
              <kbd className="successfully-typed-text typed-text-input-positioning pre relative" style={{"color": previousCompletedPhraseAccuracy ? '#23512C' : '#953159' }} aria-hidden="true">{this.props.previousCompletedPhraseAsTyped}</kbd>
            </CSSTransition>
          </TransitionGroup>
          </samp>
          <span aria-hidden={textInputAccessibilityAriaHidden}>
            <textarea
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              className="input-textarea typed-text-input-positioning typed-text-input-textarea"
              id="your-typed-text"
              onChange={this.props.updateMarkup}
              onKeyPress={this.keyPress.bind(this)}
              rows="1"
              spellCheck="false"
              value={this.props.actualText}
              wrap="off"
              >
            </textarea>
          </span>
        </p>
      </div>
    );
  }
}

export default TypedText;
