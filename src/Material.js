import React, { Component } from 'react';
import {matchSplitText} from './typey-type';
import './App.css';

class Material extends Component {
  constructor(props) {
    super(props);
  }

  markUpMaterial(currentPhrase, actualText) {
    let [matched, unmatched] = matchSplitText(currentPhrase, actualText);
    let matchedMaterialMarkup = `<span class="matched">${matched}</span><span>${unmatched}</span>`;
    return {__html: matchedMaterialMarkup};
  }

  render() {
    return (
      <div className="">
        <div>Material:</div>
        <div className="expected" dangerouslySetInnerHTML={this.markUpMaterial(this.props.currentPhrase, this.props.actualText)} />
      </div>
    );
  }
}

export default Material;
