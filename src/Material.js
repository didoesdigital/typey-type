import React, { Component } from 'react';
import matchSplitText from './typey-type';
import './App.css';

class Material extends Component {
  constructor(props) {
    super(props);
  }

  markUpMaterial(material, typedText) {
    let [matched, unmatched] = matchSplitText(material, typedText);
    let matchedMaterialMarkup = `<span class="matched">${matched}</span><span>${unmatched}</span>`;
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
