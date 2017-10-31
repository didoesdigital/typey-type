import React, { Component } from 'react';
import {matchSplitText} from './typey-type';
import './App.css';

class Material extends Component {
  markUpMaterial(currentPhrase, actualText, settings) {
    // Show how much of material you've typed correctly
    let [matched, unmatched] = matchSplitText(currentPhrase, actualText, settings, this.props.userSettings);
    let matchedMaterialMarkup;

    if (this.props.userSettings.showStrokes) {
      matchedMaterialMarkup = `<div class="material"><pre><span class="matched steno-material">${matched}</span><span class="steno-material">${unmatched}</span></span></pre></div>
      <div class="stroke-tip"><span class="visually-hidden">Hint: </span><pre><span class="steno-stroke">${this.props.currentStroke}</span></pre></div>`;
    } else {
      matchedMaterialMarkup = `<div class="material"><pre><span class="matched steno-material">${matched}</span><span class="steno-material">${unmatched}</span></pre></div>`;
    }

    return {__html: matchedMaterialMarkup};
  }

  render() {
    return (
      <div className="">
        <div className="visually-hidden">Material to type: <div role="status" aria-live="assertive">{this.props.currentPhrase}</div></div>
        <div className="expected" dangerouslySetInnerHTML={this.markUpMaterial(this.props.currentPhrase, this.props.actualText, this.props.settings, this.props.currentStroke)} />
      </div>
    );
  }
}

export default Material;
