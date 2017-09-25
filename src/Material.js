import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Material extends Component {
  constructor(props) {
    super(props);
    // this.sourceMaterial = `List of words`;
    // this.state = {material: `
// List of words
// `,
  // typedText: ``
    // };
  }

  // updateMarkup(event) {
  //   const typedText = event.target.value;
  //   this.setState({
  //     typedText: typedText,
  //     material: this.markUpMaterial(this.sourceMaterial, typedText)
  //   });
  // }

  markUpMaterial(material, typedText) {
    return material+typedText;
  }

  render() {
    return (
      <div className="">
        <div>Material:</div>
        <div className="material matched">{this.markUpMaterial(this.props.sourceMaterial, this.props.typedText)}</div>
      </div>
    );
  }
}

export default Material;
