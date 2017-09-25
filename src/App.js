import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.sourceMaterial = `List of words`;
    this.state = {material: `
List of words
`,
  typedText: ``
    };
  }

  updateMarkup(event) {
    const typedText = event.target.value;
    this.setState({
      typedText: typedText,
      material: this.markUpMaterial(this.sourceMaterial, typedText)
    });
  }

  markUpMaterial(material, typedText) {
    return material+typedText;
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Typey type</h1>
        </div>
        <div className="main">
          <div className="">
            <div>Material:</div><div className="material matched">{this.state.material}</div>
            <div>Typed:</div><div className="typed-text">{this.state.typedText}</div>
            <p className="input-text">
              <textarea classname="input-textarea" rows="1"
                onChange={this.updateMarkup.bind(this)}
                value={this.state.typedText}
                >
              </textarea>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
