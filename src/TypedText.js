import React, { Component } from 'react';
import {matchSplitText} from './typey-type';
import './App.css';

class TypedText extends Component {
  constructor(props) {
    super(props);
  }

  markUpTypedText(typedText, remainingText) {
    let [matched, unmatched] = matchSplitText(typedText, remainingText);
    let matchedTypedTextMarkup = `<span class="matched">${matched}</span><span class="unmatched">${unmatched}</span>`;
    return {__html: matchedTypedTextMarkup};
  }

  render() {
    return (
      <div className="">
        <div>Typed:</div>
        <div className="typed-text" dangerouslySetInnerHTML={this.markUpTypedText(this.props.actualText, this.props.currentPhrase)} />
      </div>
    );
  }
}

export default TypedText;
