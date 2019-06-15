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
  mapQWERTYKeysToStenoBrief,
  mapBriefToAmericanStenoKeys,
  mapBriefToDanishStenoKeys,
  mapBriefToItalianMichelaStenoKeys,
  mapBriefToJapaneseStenoKeys,
  mapBriefToKoreanModernCStenoKeys,
  mapBriefToPalantypeKeys
} from './typey-type';
import { Tooltip } from 'react-tippy';


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
    writtenText: '',
    valueRawSteno: '',
    valueQWERTYSteno: ''
  }

  updateRawSteno = this.updateRawSteno.bind(this);
  updateQWERTYSteno = this.updateQWERTYSteno.bind(this);

  componentDidMount() {
    let dict:string = '' + (process.env.PUBLIC_URL || '') + '/dictionaries/didoesdigital/vim.json';
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
      stenoStroke: new Stroke(),
      writtenText: writtenText
    });
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
    stenoBrief = mapQWERTYKeysToStenoBrief(typedText, this.props.userSettings.stenoLayout);
    this.setState({stenoBrief: stenoBrief});
    return stenoBrief;
  }

  addKeyToStenoBrief(key: string) {
    let stenoStroke = this.state.stenoStroke.set(key);
    let stenoBrief = this.state.stenoBrief;
    if (!stenoBrief.includes(key)) {
      stenoBrief = stenoBrief + key;
    }
    this.setState({
      stenoBrief: stenoStroke.toString(),
      stenoStroke: stenoStroke
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
          <div className="mx-auto mw-568">
            <p className="mt3 mb3 h3">
              <span className="visually-hidden">Your written text:</span>{this.state.writtenText}&nbsp;
            </p>
            <div>
              <StenoLayoutDiagram {...mapBriefsFunction(this.state.stenoBrief)} newOnClick={this.addKeyToStenoBrief.bind(this)} brief={"STKPWHRAO*EUFRPBLGTSDZ"} diagramWidth="440" />
            </div>
            <div className="flex flex-wrap">
              { this.props.userSettings.stenoLayout === "stenoLayoutAmericanSteno" ?
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
                :
                null
              }
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
            <div className="mb2 mw-240">
              <Tooltip
                title="Show a steno diagram that suits your steno layout"
                className="mw-240"
                animation="shift"
                arrow="true"
                duration="200"
                tabIndex="0"
                tag="span"
                theme="didoesdigital didoesdigital-sm"
                trigger="mouseenter focus click"
                onShow={this.props.setAnnouncementMessage}
              >
                <label className="mb1 db" htmlFor="stenoLayout">Steno layout</label>
              </Tooltip>
              <select id="stenoLayout" name="stenoLayout" value={this.props.userSettings.stenoLayout} onChange={this.props.changeStenoLayout} className="text-small form-control w6">
                <option value="stenoLayoutAmericanSteno">American steno (Ward Stone Ireland)</option>
                <option value="stenoLayoutPalantype">Palantype</option>
                <option value="stenoLayoutDanishSteno">Danish steno</option>
                <option value="stenoLayoutItalianMichelaSteno">Italian Michela steno</option>
                <option value="stenoLayoutJapaneseSteno">Japanese steno</option>
                <option value="stenoLayoutKoreanModernCSteno">Korean Modern C steno</option>
              </select>
            </div>

          </div>
        </div>
      </main>
    )
  }
}

export default Writer;
