import React, { Component } from 'react';
import {matchSplitText} from 'utils/typey-type';
import './App.css';

class Material extends Component {
  markUpMaterial(currentPhrase, actualText, settings) {
    let [matched, unmatched] = matchSplitText(currentPhrase, actualText, settings);
    let matchedMaterialMarkup;

    if (this.props.userSettings.showStrokes) {
      matchedMaterialMarkup = `<pre><span class="matched">${matched}</span><span>${unmatched}</span></pre>
      <span>Stroke: <pre>${this.props.currentStroke}</pre></span>`;
    } else {
      matchedMaterialMarkup = `<pre><span class="matched">${matched}</span><span>${unmatched}</span></pre>`;
    }

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
