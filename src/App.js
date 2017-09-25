import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import marked from 'marked';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {markdown: `
Heading
=======

Sub-heading
-----------
 
### Another deeper heading
 
Paragraphs are separated
by a blank line.

Leave 2 spaces at the end of a line to do a  
line break

Text attributes *italic*, **bold**, 
\`monospace\`, ~~strikethrough~~ .

Shopping list:

  * apples
  * oranges
  * pears

Numbered list:

  1. apples
  2. oranges
  3. pears

The rain---not the reign---in
Spain.

 *[Herman Fassett](https://freecodecamp.com/hermanfassett)*`
    };
  }

  updateMarkup(event) {
    this.setState({markdown: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Markdown Previewer</h2>
        </div>
        <div className="flex">
          <p className="half app-input">
            <textarea rows="34"
              onChange={this.updateMarkup.bind(this)}
              value={this.state.markdown}
              >
            </textarea>
          </p>
          <div className="half app-preview" dangerouslySetInnerHTML={{__html: marked(this.state.markdown)}} />
        </div>
      </div>
    );
  }
}

export default App;
