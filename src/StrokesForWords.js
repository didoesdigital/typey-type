import * as React from 'react'
import { Component } from 'react';

class StrokesForWords extends Component {
  state = {
    phrase: "",
    dictionaryOfWordsStrokesAndSourceDictionary: {
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
    let sortedDict = Object.assign({}, this.state.dictionaryOfWordsStrokesAndSourceDictionary);
    this.setState({dictionaryOfWordsStrokesAndSourceDictionary: sortedDict});
  }

  updateWordsForStrokes(event) {
    let phrase = event.target.value;
    let listOfStrokesAndDicts = createListOfStrokes(phrase, this.state.dictionaryOfWordsStrokesAndSourceDictionary);
    this.setState({
      phrase: phrase,
      listOfStrokesAndDicts: listOfStrokesAndDicts
    })
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

function createListOfStrokes(phrase, dictionaryOfWordsStrokesAndSourceDictionary) {
  let listOfStrokesAndDicts = [];
  let allEntries = Object.entries(dictionaryOfWordsStrokesAndSourceDictionary);
  if (dictionaryOfWordsStrokesAndSourceDictionary[phrase]) {
    listOfStrokesAndDicts = dictionaryOfWordsStrokesAndSourceDictionary[phrase];
  } else {
    listOfStrokesAndDicts = allEntries;
  }
  return listOfStrokesAndDicts;
}

export default StrokesForWords;
export {
  createListOfStrokes
};
