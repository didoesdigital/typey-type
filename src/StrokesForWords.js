import * as React from 'react'
import { Component } from 'react';

class StrokesForWords extends Component {
  state = {
    phrase: "",
    dict: {
      "silent": [
        ["SAOEU/HREPBT", "dict.json"],
        ["SHREPBT", "dict.json"],
        ["SHRAOEUPBT", "dict.json"],
        ["SHREPBT", "personal.json"]
      ],
      "sentiment": [
        ["SEPB/TEUPLT", "sentiment"],
        ["SEPBT/*PLT", "sentiment"]
      ],
      "foo": [
        ["TPAO", "dict.json"],
        ["TPAO*", "personal.json"]
      ],
      "bar": [
        ["PWA*R", "personal.json"],
        ["PWAR", "dict.json"]
      ],
      "baz": [
        ["PWAZ", "personal.json"],
        ["PWAZ", "code.json"]
      ]
    },
    listOfStrokesAndDicts: []
  }

  componentDidMount() {
    let sortedDict = Object.assign({}, this.state.dict);
    this.setState({dict: sortedDict});
  }

  updateWordsForStrokes(event) {
    let phrase = event.target.value;
    let listOfStrokesAndDicts = this.createListOfStrokes(phrase);
    this.setState({
      phrase: phrase,
      listOfStrokesAndDicts: listOfStrokesAndDicts
    })
  }

  createListOfStrokes(phrase) {
    let listOfStrokesAndDicts = [];
    let allEntries = Object.entries(this.state.dict);
    if (this.state.dict[phrase]) {
      listOfStrokesAndDicts = this.state.dict[phrase];
    } else {
      listOfStrokesAndDicts = allEntries;
    }
    return listOfStrokesAndDicts;
  }

  render () {
    let strokeListItems = this.state.listOfStrokesAndDicts.map( (strokeAndDict, i) => {
      return(
        <li className="unstyled-list-item mb1" key={ i }>{"" + strokeAndDict[0] + ": " + strokeAndDict[1]}</li>
      )
    });

    return (
      <React.Fragment>
        <label htmlFor="words-for-strokes">Enter words to see strokes</label>
        <textarea
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="input-textarea typed-text-input-textarea mb3"
          id="words-for-strokes"
          onChange={this.updateWordsForStrokes.bind(this)}
          rows="1"
          spellCheck="false"
          value={this.state.phrase}
          wrap="off"
          >
        </textarea>
        <ul className="unstyled-list mw-240 wrap">
          {strokeListItems}
        </ul>
      </React.Fragment>
    );
  }
}

export default StrokesForWords;
