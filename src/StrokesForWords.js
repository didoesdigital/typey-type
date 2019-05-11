import React, { Component } from 'react';

class StrokesForWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: "",
      listOfStrokes: []
    }
  }

  updateWordsForStrokes(event) {
    let phrase = event.target.value;
    let listOfStrokes = this.createListOfStrokes(phrase);
    this.setState({
      phrase: phrase,
      listOfStrokes: listOfStrokes
    })
  }

  createListOfStrokes(phrase) {
    let listOfStrokes = [];
    listOfStrokes = ['FAO', 'PWAR'];
    return listOfStrokes;
  }

  render () {
    let strokeListItems = this.state.listOfStrokes.map( (stroke, i) => {
      return(
        <li className="unstyled-list-item mb1" key={ i }>{stroke}</li>
      )
    });

    return (
      <React.Fragment>
        <label htmlFor="words-for-strokes">Enter words to see strokes</label>
        <textarea
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="input-textarea typed-text-input-textarea"
          id="words-for-strokes"
          onChange={this.updateWordsForStrokes.bind(this)}
          rows="1"
          spellCheck="false"
          value={this.props.phrase}
          wrap="off"
          >
        </textarea>
        <ul>
          {strokeListItems}
        </ul>
      </React.Fragment>
    );
  }
}

export default StrokesForWords;
