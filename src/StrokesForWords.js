// @flow
import * as React from 'react'
import { Component } from 'react';

type Props = {
};

type State = {
  phrase: string,
  dict: Object,
  listOfStrokesAndDicts: Array<string>
};

class StrokesForWords extends Component<Props, State> {
  state = {
    phrase: "",
    dict: {
      "silent": [
        ["SHREPBT", "dict.json"],
        ["SHREPBT", "personal.json"],
        ["SHRAOEUPBT", "dict.json"],
        ["SAOEU/HREPBT", "dict.json"]
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
        ["PWAR", "dict.json"],
        ["PWA*R", "personal.json"]
      ],
      "baz": [
        ["PWAZ", "personal.json"],
        ["PWAZ", "code.json"]
      ]
    },
    listOfStrokesAndDicts: []
  }

  updateWordsForStrokes(event: SyntheticInputEvent<HTMLTextAreaElement>) {
    let phrase = event.target.value;
    let listOfStrokesAndDicts = this.createListOfStrokes(phrase);
    this.setState({
      phrase: phrase,
      listOfStrokesAndDicts: listOfStrokesAndDicts
    })
  }

  createListOfStrokes(phrase: string) {
    let listOfStrokesAndDicts = [];
    if (this.state.dict[phrase]) {
      listOfStrokesAndDicts = this.state.dict[phrase];
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
        <ul className="unstyled-list">
          {strokeListItems}
        </ul>
      </React.Fragment>
    );
  }
}

export default StrokesForWords;
