import React, { Component } from 'react';
import './App.css';
import { parseWordList, generateDictionaryEntries } from './typey-type';

class CustomLessonSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionary: []
    }
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  handleWordsForDictionaryEntries(event) {
    if (event && event.target && event.target.value && event.target.value.length > 0) {
      let result = parseWordList(event.target.value);
      if (result && result.length > 0) {
        let dictionary = generateDictionaryEntries(result);
        if (dictionary && dictionary.length > 0) {
          this.setState({
            dictionary: dictionary
          });
        }
      }
    }
    return event;
  }


  render() {

    const dictionaryEntries = this.state.dictionary.map( (entry, index) => {
      return(
        <code className="unstyled-list-item" key={ index }>
          {entry.phrase}{`	`}{entry.stroke}{`
`}
        </code>
      )
    });

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
            <div className="flex mr1">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="about-typey-type-for-stenographers">Create a custom lesson</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <div className="mw-568">
            <p>To start a custom lesson, supply a list of words and their strokes. An easy way to create a lesson is to copy columns from a spreadsheet.</p>
            <p>See the <a className="" href="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing" target="_blank" rel="noopener noreferrer">community's lessons (opens in new tab)</a>.</p>
            <label htmlFor="your-material">Paste your material here:</label>
          </div>
          <p className="mw-568">
            <textarea
              id="your-material"
              className="input-textarea mw100 w-100 overflow-scroll"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder="example	KP-PL
consisting of	KAOFG
examples.	KP-PLS TP-PL"
              rows="8"
              wrap="off"
              onChange={this.props.createCustomLesson}
              >
            </textarea>
          </p>
          <ul className="text-small ml1 mt1">
            <li>Each word must be on its own line.</li>
            <li>Each word must be separated from its stroke by a "Tab" character.</li>
            <li>If you skip strokes, multi-stroke words may count as misstrokes.</li>
          </ul>

          <hr />

          <h3>Helper tools</h3>
          <p>Drop words here and get dictionary entries:</p>
          <textarea
            id="your-words-for-dictionary-entries"
            className="input-textarea mw100 w-100 overflow-scroll"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="capitalise
excluded
plover"
            rows="8"
            wrap="off"
            onChange={this.handleWordsForDictionaryEntries.bind(this)}
            >
          </textarea>
          <pre id="dictionary-entries" className="">{dictionaryEntries}</pre>

        </div>
      </main>
    )
  }

}

export default CustomLessonSetup;
