import React, { Component } from 'react';
import {matchSplitText} from './typey-type';
import './App.css';

class Material extends Component {
  markUpMaterial(currentPhrase, actualText, settings, currentStroke) {
    let [matched, unmatched] = matchSplitText(currentPhrase, actualText, settings);
    let matchedMaterialMarkup = `<span class="matched">${matched}</span><span>${unmatched}</span>
      <br>
      <span>Stroke: ${currentStroke}</span>`;
    return {__html: matchedMaterialMarkup};
  }

  render() {
    return (
      <div className="">
        <div>Material:</div>
        <div className="expected" dangerouslySetInnerHTML={this.markUpMaterial(this.props.currentPhrase, this.props.actualText, this.props.settings, this.props.currentStroke)} />
      </div>
    );
  }
}

export default Material;
