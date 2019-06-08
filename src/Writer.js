// @flow
import React, { Component } from 'react';
import AmericanStenoDiagram from './StenoLayout/AmericanStenoDiagram';
import { splitBriefsIntoStrokes, mapQWERTYKeysToStenoBrief, mapBriefToAmericanStenoKeys } from './typey-type';

type Props = {
  setAnnouncementMessageString: (string) => void
};

type State = {
  stenoBrief: string,
  writtenText: string,
  valueQWERTYSteno: string
};

class Writer extends Component<Props, State> {
  mainHeading: ?HTMLHeadingElement;

  state = {
    stenoBrief: '',
    writtenText: '',
    valueQWERTYSteno: ''
  }

  updateQWERTYSteno = this.updateQWERTYSteno.bind(this);

  componentDidMount() {
    this.setState({
    }, () => {
    });

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
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
    let dict = {
      'TP': 'if',
      'S': 'is',
      'HR': 'will'
    }
    let translation = stenoBrief;
    if (dict[stenoBrief]) {
      translation = dict[stenoBrief];
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
            <p className="mt3 text-center mb3">
              <input
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className="input-textarea"
                onChange={this.updateQWERTYSteno.bind(this)}
                value={this.state.valueQWERTYSteno}
              />
            </p>
            <div>
              <AmericanStenoDiagram {...mapBriefToAmericanStenoKeys(this.state.stenoBrief)} brief={"STKPWHRAO*EUFRPBLGTSDZ"} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Writer;
