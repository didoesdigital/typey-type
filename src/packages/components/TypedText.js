import React, { Component } from 'react';
import {matchSplitText} from 'utils/typey-type';
import './App.css';

class TypedText extends Component {
  markUpTypedText(currentPhrase, actualText, settings) {
    let array = matchSplitText(currentPhrase, actualText, settings, this.props.userSettings);
    let matched = array[2];
    let unmatched = array[3];
    let matchedTypedTextMarkup = `<pre><span aria-hidden="true">&#8203;</span><span class="matched steno-typing">${matched}</span><span class="unmatched steno-typing">${unmatched}</span></pre>`;
    return {__html: matchedTypedTextMarkup};
  }

  render() {
    return (
      <div className="">
        <div className="visually-hidden">Your typed text:</div>
        <div className="typed-text" dangerouslySetInnerHTML={this.markUpTypedText(this.props.currentPhrase, this.props.actualText, this.props.settings)} />
      </div>
    );
  }
}

export default TypedText;
