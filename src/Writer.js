// @flow
import React, { Component } from 'react';
import AmericanStenoDiagram from './StenoLayout/AmericanStenoDiagram';
import {
  fetchDictionaries,
  splitBriefsIntoStrokes,
  mapQWERTYKeysToStenoBrief,
  mapBriefToAmericanStenoKeys
} from './typey-type';

type Props = {
  setAnnouncementMessageString: (string) => void
};

type State = {
  stenoBrief: string,
  stenoDictionary: Object,
  writtenText: string,
  valueRawSteno: string,
  valueQWERTYSteno: string
};

class Writer extends Component<Props, State> {
  mainHeading: ?HTMLHeadingElement;

  state = {
    stenoBrief: '',
    stenoDictionary: {},
    writtenText: '',
    valueRawSteno: '',
    valueQWERTYSteno: ''
  }

  updateRawSteno = this.updateRawSteno.bind(this);
  updateQWERTYSteno = this.updateQWERTYSteno.bind(this);

  componentDidMount() {
    fetchDictionaries().then((json) => {
      this.setState({
        stenoDictionary: json
      });
    });

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  updateRawSteno(event: SyntheticInputEvent<HTMLInputElement>) {
    let currentValue: string;

    if (event && event.target && event.target.value) {
      currentValue = event.target.value;
    }
    else {
      currentValue = '';
    }

    if (currentValue.includes(' ')) {
      currentValue = currentValue.trim();
      this.sendStroke(currentValue);
      currentValue = '';
    }

    this.setState({
      stenoBrief: currentValue,
      valueRawSteno: currentValue
    });
  }

  updateQWERTYSteno(event: SyntheticInputEvent<HTMLInputElement>) {
    let currentValue: string;
    if (event && event.target && event.target.value) {
      currentValue = event.target.value;
    }
    else {
      currentValue = '';
    }
    if (currentValue.includes(' ')) {
      let stenoBrief = this.updateBrief(currentValue);
      this.sendStroke(stenoBrief);
      currentValue = '';
    }
    else {
      this.updateBrief(currentValue);
    }
    this.setState({valueQWERTYSteno: currentValue});
  }

  sendStroke(stenoBrief: string) {
    let writtenText = this.lookUpStrokeInDictionary(stenoBrief);
    this.setState({writtenText: writtenText});
  }

  lookUpStrokeInDictionary(stenoBrief: string) {
    let translation = stenoBrief;
    if (this.state.stenoDictionary[stenoBrief]) {
      translation = this.state.stenoDictionary[stenoBrief];
    }
    return translation;
  }

  updateBrief(typedText: string) {
    let stenoBrief : string = '';
    // TODO: let strokes = splitBriefsIntoStrokes(typedText);
    // TODO: for(i in strokes) { briefs = strokes[i].mapQWERTYKeysToStenoBrief() };
    stenoBrief = mapQWERTYKeysToStenoBrief(typedText);
    this.setState({stenoBrief: stenoBrief});
    return stenoBrief;
  }

  render() {

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
            <div className="flex mr1 self-center">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="writer">Writer</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <div className="mx-auto mw-568">
            <p className="mt3 mb3">
              Written text: {this.state.writtenText}
            </p>
            <div>
              <AmericanStenoDiagram {...mapBriefToAmericanStenoKeys(this.state.stenoBrief)} brief={"STKPWHRAO*EUFRPBLGTSDZ"} diagramWidth="440" />
            </div>
            <div className="flex flex-wrap">
              <p className="mt3 mb3 mr1">
                <label htmlFor="qwertyStenoInput" className="db">
                  QWERTY steno input
                </label>
                <input
                  id="qwertyStenoInput"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="input-textarea"
                  onChange={this.updateQWERTYSteno}
                  value={this.state.valueQWERTYSteno}
                />
              </p>
              <p className="mt3 mb3 mr1">
                <label htmlFor="rawStenoInput" className="db">
                  Raw steno input
                </label>
                <input
                  id="rawStenoInput"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  className="input-textarea"
                  onChange={this.updateRawSteno}
                  value={this.state.valueRawSteno}
                />
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Writer;
