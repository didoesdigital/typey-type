import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Material extends Component {
  constructor(props) {
    super(props);
  }

  markUpMaterial(material, typedText) {
    let materialChars = material.split('');
    let typedTextChars = typedText.split('');
    let i = 0;
    for (; i < typedTextChars.length; i++) {
      if (typedTextChars[i] != materialChars[i]) {
        break;
      }
    };
    let matchedMaterial = materialChars.slice(0,i).join('');
    let unmatchedMaterial = materialChars.slice(i).join('');
    let matchedMaterialMarkup = `<span class="matched">${matchedMaterial}</span><span>${unmatchedMaterial}</span>`;
    return {__html: matchedMaterialMarkup};
  }

  render() {
    return (
      <div className="">
        <div>Material:</div>
        <div className="material" dangerouslySetInnerHTML={this.markUpMaterial(this.props.sourceMaterial, this.props.typedText)} />
      </div>
    );
  }
}

export default Material;
