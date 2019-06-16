// @flow
import React, { Component } from 'react';
import AmericanStenoDiagram from './StenoLayout/AmericanStenoDiagram';
import DanishStenoDiagram from './StenoLayout/DanishStenoDiagram';
import ItalianMichelaStenoDiagram from './StenoLayout/ItalianMichelaStenoDiagram';
import JapaneseStenoDiagram from './StenoLayout/JapaneseStenoDiagram';
import KoreanModernCStenoDiagram from './StenoLayout/KoreanModernCStenoDiagram';
import PalantypeDiagram from './StenoLayout/PalantypeDiagram';
import Stroke from './stroke';
import {
  fetchResource,
  mapQWERTYKeysToStenoStroke,
  mapBriefToAmericanStenoKeys,
  mapBriefToDanishStenoKeys,
  mapBriefToItalianMichelaStenoKeys,
  mapBriefToJapaneseStenoKeys,
  mapBriefToKoreanModernCStenoKeys,
  mapBriefToPalantypeKeys
} from './typey-type';

type Props = {
  changeStenoLayout: (event: SyntheticInputEvent<HTMLSelectElement>) => string,
  userSettings: Object,
  setAnnouncementMessageString: (string) => void,
  setAnnouncementMessage: (Object, any) => void
};

type State = {
  stenoBrief: string,
  stenoStroke: Stroke,
  stenoDictionary: Object,
  writerInput: string,
  writtenText: string,
  valueRawSteno: string,
  valueQWERTYSteno: string
};

class Writer extends Component<Props, State> {
  mainHeading: ?HTMLHeadingElement;

  state = {
    stenoBrief: '',
    stenoStroke: new Stroke(),
    stenoDictionary: {},
    writerInput: 'qwerty',
    writtenText: '',
    valueRawSteno: '',
    valueQWERTYSteno: ''
  }

  updateRawSteno = this.updateRawSteno.bind(this);
  updateQWERTYSteno = this.updateQWERTYSteno.bind(this);

  componentDidMount() {
    let dict:string = '' + (process.env.PUBLIC_URL || '') + '/dictionaries/dict.json';
    fetchResource(dict).then((json) => {
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
      currentValue = currentValue.trim();
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
    this.setState({
      stenoBrief: '',
      stenoStroke: new Stroke(),
      valueQWERTYSteno: '',
      valueRawSteno: '',
      writtenText: writtenText
    });
  }

  sendDiagramStroke() {
    this.sendStroke(this.state.stenoBrief);
  }

  lookUpStrokeInDictionary(stenoBrief: string) {
    let translation = stenoBrief;
    if (this.state.stenoDictionary[stenoBrief]) {
      translation = this.state.stenoDictionary[stenoBrief];
    }
    return translation;
  }

  updateBrief(typedText: string) {
    // TODO: let strokes = splitBriefsIntoStrokes(typedText);
    let stenoStroke = mapQWERTYKeysToStenoStroke(typedText, this.props.userSettings.stenoLayout);

    this.setState({
      stenoBrief: stenoStroke.toString(),
      stenoStroke: stenoStroke
    });
    return stenoStroke.toString();
  }

  addKeyToStenoBrief(key: string) {
    let stenoStroke:Object = this.state.stenoStroke.set(key);

    this.setState({
      stenoBrief: stenoStroke.toString(),
      stenoStroke: stenoStroke,
      valueQWERTYSteno: '',
      valueRawSteno: ''
    });
  }

  changeWriterInput(event: SyntheticInputEvent<HTMLInputElement>) {
    let writerInput = this.state.writerInput;

    if (event && event.target && event.target.name) {
      writerInput = event.target.name;
    }

    this.setState({
      writerInput: writerInput
    });
  }

  render() {

    let mapBriefsFunction = mapBriefToAmericanStenoKeys;
    let StenoLayoutDiagram = AmericanStenoDiagram;
    switch (this.props.userSettings.stenoLayout) {
      case 'stenoLayoutAmericanSteno':
        mapBriefsFunction = mapBriefToAmericanStenoKeys;
        StenoLayoutDiagram = AmericanStenoDiagram;
        break;
      case 'stenoLayoutDanishSteno':
        mapBriefsFunction = mapBriefToDanishStenoKeys;
        StenoLayoutDiagram = DanishStenoDiagram;
        break;
      case 'stenoLayoutItalianMichelaSteno':
        mapBriefsFunction = mapBriefToItalianMichelaStenoKeys;
        StenoLayoutDiagram = ItalianMichelaStenoDiagram;
        break;
      case 'stenoLayoutJapaneseSteno':
        mapBriefsFunction = mapBriefToJapaneseStenoKeys;
        StenoLayoutDiagram = JapaneseStenoDiagram;
        break;
      case 'stenoLayoutKoreanModernCSteno':
        mapBriefsFunction = mapBriefToKoreanModernCStenoKeys;
        StenoLayoutDiagram = KoreanModernCStenoDiagram;
        break;
      case 'stenoLayoutPalantype':
        mapBriefsFunction = mapBriefToPalantypeKeys;
        StenoLayoutDiagram = PalantypeDiagram;
        break;
      default:
        mapBriefsFunction = mapBriefToAmericanStenoKeys;
        StenoLayoutDiagram = AmericanStenoDiagram;
        break;
    }

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
          <div className="flex flex-wrap justify-between">
            <div className="mw-568">
              <p className="mt3 mb3 h3">
                <span className="visually-hidden">Your written text:</span>{this.state.writtenText}&nbsp;
              </p>
              <div>
                <StenoLayoutDiagram {...mapBriefsFunction(this.state.stenoBrief)} newOnClick={this.addKeyToStenoBrief.bind(this)} brief={this.state.stenoBrief} diagramWidth="440" />
              </div>
              <p className="text-center mr4 mt1">
                <button onClick={this.sendDiagramStroke.bind(this)} className="button text-center">Send stroke</button>
              </p>
            </div>
            <div className="mw-384 w-336">
              <h3>Settings</h3>
              <div className="flex flex-wrap">
                { this.props.userSettings.stenoLayout === "stenoLayoutAmericanSteno" && this.state.writerInput === "qwerty" ?
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
                      placeholder="e.g. rnm"
                      value={this.state.valueQWERTYSteno}
                    />
                  </p>
                  :
                  null
                }
                { this.state.writerInput === "raw" || !(this.props.userSettings.stenoLayout === "stenoLayoutAmericanSteno") ?
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
                      placeholder="e.g. HEU"
                      value={this.state.valueRawSteno}
                    />
                  </p>
                  :
                  null
                }
              </div>
              <div className="mb2 mw-240">
                <label className="mb1 db" htmlFor="stenoLayout">Steno layout</label>
                <select id="stenoLayout" name="stenoLayout" value={this.props.userSettings.stenoLayout} onChange={this.props.changeStenoLayout} className="text-small form-control w6">
                  <option value="stenoLayoutAmericanSteno">American steno (Ward Stone Ireland)</option>
                  <option value="stenoLayoutPalantype">Palantype</option>
                  <option value="stenoLayoutDanishSteno">Danish steno</option>
                  <option value="stenoLayoutItalianMichelaSteno">Italian Michela steno</option>
                  <option value="stenoLayoutJapaneseSteno">Japanese steno</option>
                  <option value="stenoLayoutKoreanModernCSteno">Korean Modern C steno</option>
                </select>
              </div>
              <fieldset>
                <legend>Raw or QWERTY steno input</legend>
                <div className="flex">
                  <div className="flex flex-wrap justify-between">
                    <p className="radio mr3">
                      <label htmlFor="raw">
                        <input type="radio" name="raw" id="raw" onChange={this.changeWriterInput.bind(this)} checked={this.state.writerInput === "raw"} /> Raw
                      </label>
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <p className="radio mr3">
                      <label htmlFor="qwerty">
                        <input type="radio" name="qwerty" id="qwerty" onChange={this.changeWriterInput.bind(this)} checked={this.state.writerInput === "qwerty"} /> QWERTY
                      </label>
                    </p>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Writer;
