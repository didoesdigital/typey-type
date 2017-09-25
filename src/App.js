import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import marked from 'marked';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {material: `
List of words
`,
  typedText: ``
    };
  }

  updateMarkup(event) {
    this.setState({typedText: event.target.value});
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h1>Typey type</h1>
        </div>
        <div className="main">
          <div className="">
            <div>Material:</div><div className="material matched" dangerouslySetInnerHTML={{__html: marked(this.state.material)}} />
            <div>Typed:</div><div className="typed-text" dangerouslySetInnerHTML={{__html: marked(this.state.typedText)}} />
            <p className="input-text">
              <textarea classname="input-textarea" rows="1"
                onChange={this.updateMarkup.bind(this)}
                value={this.state.markdown}
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
