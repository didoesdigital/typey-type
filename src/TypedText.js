import React, { Component } from 'react';
import {matchSplitText} from './typey-type';
import './App.css';

class TypedText extends Component {
  // Show how much of what you've typed is correct
  markUpTypedText(currentPhrase, actualText, settings) {
    let array = matchSplitText(currentPhrase, actualText, settings, this.props.userSettings);
    let matched = array[2];
    let unmatched = array[3];
    let matchedTypedTextMarkup = `<pre><span aria-hidden="true">&#8203;</span><span class="matched steno-typing">${matched}</span><span class="unmatched steno-typing">${unmatched}</span></pre>`;
    return {__html: matchedTypedTextMarkup};
  }

  render() {
    return (
      <div className="typed-text-container">
        <label className="visually-hidden" htmlFor="your-typed-text">Your typed text:</label>
        <div className="typed-text" dangerouslySetInnerHTML={this.markUpTypedText(this.props.currentPhrase, this.props.actualText, this.props.settings)} />
        <p className="input-text">
          <textarea id="your-typed-text" className="input-textarea" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" rows="1"
            wrap="off"
            onChange={this.props.updateMarkup}
            value={this.props.actualText}
            >
          </textarea>
        </p>
      </div>
    );
  }
}

export default TypedText;
