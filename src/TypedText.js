import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TypedText extends Component {
  constructor(props) {
    super(props);
  }

  markUpTypedText(material, typedText) {
    let materialChars = material.split('');
    let typedTextChars = typedText.split('');
    let i = 0;
    for (; i < typedTextChars.length; i++) {
      if (typedTextChars[i] != materialChars[i]) {
        break;
      }
    };
    let matchedTypedText = typedTextChars.slice(0,i).join('');
    let unmatchedTypedText = typedTextChars.slice(i).join('');
    let matchedTypedTextMarkup = `<span class="matched">${matchedTypedText}</span><span class="unmatched">${unmatchedTypedText}</span>`;
    return {__html: matchedTypedTextMarkup};
  }

  render() {
    return (
      <div className="">
        <div>Typed:</div>
        <div className="typed-text" dangerouslySetInnerHTML={this.markUpTypedText(this.props.sourceMaterial, this.props.typedText)} />
      </div>
    );
  }
}

export default TypedText;
