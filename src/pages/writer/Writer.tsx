import React, { Component } from 'react';
import GoogleAnalytics from "react-ga4";
import AmericanStenoDiagram from '../../StenoLayout/AmericanStenoDiagram';
import NoNumberBarInnerThumbNumbersStenoDiagram from '../../StenoLayout/NoNumberBarInnerThumbNumbersStenoDiagram';
import NoNumberBarOuterThumbNumbersStenoDiagram from '../../StenoLayout/NoNumberBarOuterThumbNumbersStenoDiagram';
import YaweiChineseStenoDiagram from '../../StenoLayout/YaweiChineseStenoDiagram';
import BrazilianPortugueseStenoDiagram from '../../StenoLayout/BrazilianPortugueseStenoDiagram';
import DanishStenoDiagram from '../../StenoLayout/DanishStenoDiagram';
import ItalianMichelaStenoDiagram from '../../StenoLayout/ItalianMichelaStenoDiagram';
import JapaneseStenoDiagram from '../../StenoLayout/JapaneseStenoDiagram';
import KoreanModernCStenoDiagram from '../../StenoLayout/KoreanModernCStenoDiagram';
import PalantypeDiagram from '../../StenoLayout/PalantypeDiagram';
import Stroke from '../../utils/stroke';
import {
  mapQWERTYKeysToStenoStroke,
} from '../../utils/typey-type';
import mapBriefToAmericanStenoKeys from '../../utils/stenoLayouts/mapBriefToAmericanStenoKeys';
import mapBriefToNoNumberBarInnerThumbNumbersStenoKeys from '../../utils/stenoLayouts/mapBriefToNoNumberBarInnerThumbNumbersStenoKeys';
import mapBriefToNoNumberBarOuterThumbNumbersStenoKeys from '../../utils/stenoLayouts/mapBriefToNoNumberBarOuterThumbNumbersStenoKeys';
import mapBriefToYaweiChineseStenoKeys from '../../utils/stenoLayouts/mapBriefToYaweiChineseStenoKeys';
import mapBriefToBrazilianPortugueseStenoKeys from '../../utils/stenoLayouts/mapBriefToBrazilianPortugueseStenoKeys';
import mapBriefToDanishStenoKeys from '../../utils/stenoLayouts/mapBriefToDanishStenoKeys';
import mapBriefToItalianMichelaStenoKeys from '../../utils/stenoLayouts/mapBriefToItalianMichelaStenoKeys';
import mapBriefToJapaneseStenoKeys from '../../utils/stenoLayouts/mapBriefToJapaneseStenoKeys';
import mapBriefToKoreanModernCStenoKeys from '../../utils/stenoLayouts/mapBriefToKoreanModernCStenoKeys';
import mapBriefToPalantypeKeys from '../../utils/stenoLayouts/mapBriefToPalantypeKeys';
import { fetchResource } from '../../utils/getData';
import Subheader from "../../components/Subheader";

import type { GlobalUserSettings, Outline, UserSettings } from "../../types";
import { WithAppMethods, withAppMethods } from "../../states/legacy/AppMethodsContext";
import { userSettingsState } from "../../states/userSettingsState";
import { withAtomsCompat } from "../../states/atomUtils";
import { useChangeStenoLayout } from "../lessons/components/UserSettings/updateUserSetting";
import { globalUserSettingsState } from "../../states/globalUserSettingsState";
import { useChangeWriterInput } from "../lessons/components/UserSettings/updateGlobalUserSetting";

type Props = {
  userSettings: UserSettings,
  globalUserSettings: GlobalUserSettings,
};

type State = {
  stenoBrief: Outline,
  stenoStroke: Stroke,
  stenoDictionary: any,
  writtenText: string,
  valueRawSteno: string,
  valueQWERTYSteno: string
};

type StenoLayout = {
  [keyName: string]: boolean
}

type MapBriefToKeys = (brief: Outline) => StenoLayout

class Writer extends Component<WithAppMethods<Props & {changeStenoLayout: ReturnType<typeof useChangeStenoLayout>, changeWriterInput: ReturnType<typeof useChangeWriterInput>}>, State> {
  state: State = {
    stenoBrief: '',
    stenoStroke: new Stroke(),
    stenoDictionary: {},
    writtenText: '',
    valueRawSteno: '',
    valueQWERTYSteno: ''
  }

  updateRawSteno(event: any) {
    let currentValue: string;

    if (event && event.target && event.target.value) {
      currentValue = event.target.value;
    }
    else {
      currentValue = '';
    }

    if (currentValue === ' ') {
      // sends clicked diagram keys
      this.sendStroke(this.state.stenoBrief);
      currentValue = '';
    }
    else if (currentValue.includes(' ')) {
      currentValue = currentValue.trim();
      this.sendStroke(currentValue);
      currentValue = '';
    }

    this.setState({
      stenoBrief: currentValue,
      valueRawSteno: currentValue
    });
  }

  updateQWERTYSteno(event: any) {
    let currentValue: string;

    if (event && event.target && event.target.value) {
      currentValue = event.target.value;
    }
    else {
      currentValue = '';
    }

    if (currentValue === ' ') {
      // sends clicked diagram keys
      this.sendStroke(this.state.stenoBrief);
      currentValue = '';
    }
    else if (currentValue.includes(' ')) {
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

  componentDidMount() {
    let dict:string = '' + (process.env.PUBLIC_URL || '') + '/dictionaries/typey-type/typey-type.json';
    fetchResource(dict)
      .then((json) => {
        this.setState({
          stenoDictionary: json
        });
      })
      .catch((e) => console.error(e));

    // @ts-ignore
    if (this.mainHeading) {
      // @ts-ignore
      this.mainHeading.focus();
    }
  }

  downloadDiagramSVG(e: any) {
    // First version of this:
    let svgFileName = "typey-type-" + this.props.userSettings.stenoLayout.replace('stenoLayout','') + '-' + (this.state.stenoBrief || 'no-brief') + ".svg";

    GoogleAnalytics.event({
      category: 'Downloads',
      action: 'Click',
      label: svgFileName || '',
    });

    let downloadDiagramSVG;
    let svg:HTMLElement | null = document.getElementById("stenoDiagram");
    if (svg) {
      let svgHTML = svg.outerHTML;
      if (Blob !== undefined) {
        let blob = new Blob([svgHTML], {type: "image/svg+xml"});
        downloadDiagramSVG = URL.createObjectURL(blob);
      }
      else {
        downloadDiagramSVG = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgHTML);
      }
    }
    else {
      downloadDiagramSVG = null;
    }

    // @ts-ignore
    if (this.downloadLink && downloadDiagramSVG) {
      // @ts-ignore
      this.downloadLink.href = downloadDiagramSVG;
    }
  }

  sendStroke(stenoBrief: Outline) {
    let writtenText = this.lookUpStrokeInDictionary(stenoBrief);

    let labelString = this.state.stenoBrief;
    if (!labelString) { labelString = "BAD_INPUT"; }

    GoogleAnalytics.event({
      category: "Writer",
      action: "Send stroke",
      label: labelString,
    });

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

  lookUpStrokeInDictionary(stenoBrief: Outline) {
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

  addKeyToStenoBrief(key: number) {
    let stenoStroke = this.state.stenoStroke.set(key);

    this.setState({
      stenoBrief: stenoStroke.toString(),
      stenoStroke: stenoStroke,
      valueQWERTYSteno: '',
      valueRawSteno: ''
    });
  }

  render() {

    let mapBriefsFunction: MapBriefToKeys = mapBriefToAmericanStenoKeys;
    let StenoLayoutDiagram: any = AmericanStenoDiagram;
    let placeholderRawSteno = "e.g. HEU";
    switch (this.props.userSettings.stenoLayout) {
      case 'stenoLayoutAmericanSteno':
        mapBriefsFunction = mapBriefToAmericanStenoKeys;
        StenoLayoutDiagram = AmericanStenoDiagram;
        placeholderRawSteno = "e.g. HEU";
        break;
      case 'stenoLayoutNoNumberBarInnerThumbNumbers':
        mapBriefsFunction = mapBriefToNoNumberBarInnerThumbNumbersStenoKeys;
        StenoLayoutDiagram = NoNumberBarInnerThumbNumbersStenoDiagram;
        placeholderRawSteno = "e.g. HEU";
        break;
      case 'stenoLayoutNoNumberBarOuterThumbNumbers':
        mapBriefsFunction = mapBriefToNoNumberBarOuterThumbNumbersStenoKeys;
        StenoLayoutDiagram = NoNumberBarOuterThumbNumbersStenoDiagram;
        placeholderRawSteno = "e.g. HEU";
        break;
      case 'stenoLayoutBrazilianPortugueseSteno':
        mapBriefsFunction = mapBriefToBrazilianPortugueseStenoKeys;
        StenoLayoutDiagram = BrazilianPortugueseStenoDiagram;
        placeholderRawSteno = "e.g. #SKTFPLRAO*EURWBPGHTSDZ";
        break;
      case 'stenoLayoutYaweiChineseSteno':
        mapBriefsFunction = mapBriefToYaweiChineseStenoKeys;
        StenoLayoutDiagram = YaweiChineseStenoDiagram;
        placeholderRawSteno = "e.g. #XBDZGWIUNEAO-#XBDZGWIUNEAO";
        break;
      case 'stenoLayoutDanishSteno':
        mapBriefsFunction = mapBriefToDanishStenoKeys;
        StenoLayoutDiagram = DanishStenoDiagram;
        placeholderRawSteno = "e.g. #STKPVHRAO*ÆÅFRPELKTSDDN";
        break;
      case 'stenoLayoutItalianMichelaSteno':
        mapBriefsFunction = mapBriefToItalianMichelaStenoKeys;
        StenoLayoutDiagram = ItalianMichelaStenoDiagram;
        placeholderRawSteno = "e.g. FSCZPNRXIUuieanpzcsf";
        break;
      case 'stenoLayoutJapaneseSteno':
        mapBriefsFunction = mapBriefToJapaneseStenoKeys;
        StenoLayoutDiagram = JapaneseStenoDiagram;
        placeholderRawSteno = "e.g. 漢「4たな3かさ2いう1おっ*4たな3かさ2いう1おっ」カ";
        break;
      case 'stenoLayoutKoreanModernCSteno':
        mapBriefsFunction = mapBriefToKoreanModernCStenoKeys;
        StenoLayoutDiagram = KoreanModernCStenoDiagram;
        placeholderRawSteno = "e.g. 12345ㅎㅁㄱㅈㄴㄷㅇㅅㅂㄹㅗㅏㅜ*ㅓㅣ67890ㅎㅇㄹㄱㄷㅂㄴㅅㅈㅁ";
        break;
      case 'stenoLayoutPalantype':
        mapBriefsFunction = mapBriefToPalantypeKeys;
        StenoLayoutDiagram = PalantypeDiagram;
        placeholderRawSteno = "e.g. SCPTH+MFRNLYOEAUI^NLCMFRPT+SH";
        break;
      default:
        mapBriefsFunction = mapBriefToAmericanStenoKeys;
        StenoLayoutDiagram = AmericanStenoDiagram;
        placeholderRawSteno = "e.g. HEU";
        break;
    }

    let downloadDiagramSVG = null;

    let svg = document.getElementById("stenoDiagram");
    if (svg) {
      downloadDiagramSVG = "#";
    }

    // Second version of this:
    let svgFileName = "typey-type-" + this.props.userSettings.stenoLayout.replace('stenoLayout','') + '-' + (this.state.stenoBrief || 'no-brief') + ".svg";

    return (
      <main id="main">
        <Subheader>
          <div className="flex mr1 self-center">
            <header className="flex items-center min-h-40">
              {/* @ts-ignore */}
              <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex={-1} id="writer">Writer</h2>
            </header>
          </div>
          <div className="flex mxn2">
            {/* @ts-ignore */}
            {downloadDiagramSVG ? <a href={downloadDiagramSVG} ref={(downloadLink) => { this.downloadLink = downloadLink; }} download={svgFileName} onClick={this.downloadDiagramSVG.bind(this)} className="link-button link-button-ghost table-cell mr1">Download diagram (SVG)</a>
              :
              null
            }
          </div>
        </Subheader>
        <div className="p3 mx-auto mw-1024">
          <div className="flex flex-wrap justify-between">
            <div className="mw-568">
              <p className="mw-448 h3 mr3 wrap text-center">
                {/* The trailing zero-width space ensures this area is always filled */}
                <span className="visually-hidden">Your written text: </span>{this.state.writtenText}&#8203;
              </p>
              <div className="mt4">
                <StenoLayoutDiagram classes="steno-diagram-svg mw100" id="stenoDiagram" {...mapBriefsFunction(this.state.stenoBrief)} handleOnClick={this.addKeyToStenoBrief.bind(this)} brief={this.state.stenoBrief} diagramWidth="440" />
              </div>
              <p className="text-center mr4 mt1">
                <button onClick={this.sendDiagramStroke.bind(this)} className="button text-center">Send stroke</button>
              </p>
            </div>
            <div className="mw-384 w-336">
              <h3>Settings</h3>
              <div className="flex flex-wrap">
                { this.props.userSettings.stenoLayout === "stenoLayoutAmericanSteno" && this.props.globalUserSettings.writerInput === "qwerty" ?
                  <p className="mt1 mb2 mr1">
                    <label htmlFor="qwertyStenoInput" className="db mb1">
                      QWERTY steno input
                    </label>
                    <input
                      id="qwertyStenoInput"
                      aria-describedby="qwerty-type-space-to-send"
                      autoCapitalize="off"
                      autoComplete="off"
                      autoCorrect="off"
                      className="input-textarea overflow-hidden"
                      onChange={this.updateQWERTYSteno.bind(this)}
                      placeholder="e.g. rnm"
                      value={this.state.valueQWERTYSteno}
                    />
                    <span id="qwerty-type-space-to-send" className="text-small">Type a space to send the stroke</span>
                  </p>
                  :
                  null
                }
                { this.props.globalUserSettings.writerInput === "raw" || !(this.props.userSettings.stenoLayout === "stenoLayoutAmericanSteno") ?
                  <p className="mt1 mb2 mr1">
                    <label htmlFor="rawStenoInput" className="db mb1">
                      Raw steno input
                    </label>
                    <input
                      id="rawStenoInput"
                      aria-describedby="raw-type-space-to-send"
                      autoCapitalize="off"
                      autoComplete="off"
                      autoCorrect="off"
                      className="input-textarea overflow-hidden"
                      onChange={this.updateRawSteno.bind(this)}
                      placeholder={placeholderRawSteno}
                      value={this.state.valueRawSteno}
                    />
                    <span id="raw-type-space-to-send" className="text-small">Type a space to send the stroke</span>
                  </p>
                  :
                  null
                }
              </div>
              <div className="mb2 mw-240">
                <label className="mb1 db" htmlFor="stenoLayout">Steno layout</label>
                <select id="stenoLayout" name="writerStenoLayout" value={this.props.userSettings.stenoLayout} onChange={this.props.changeStenoLayout} className="text-small form-control w6">
                  <option value="stenoLayoutAmericanSteno">Ward Stone Ireland (Plover, EcoSteno, SOFT/HRUF etc.)</option>
                  <option value="stenoLayoutNoNumberBarInnerThumbNumbers">Inner thumbers (TinyMod, Steko, etc.)</option>
                  <option value="stenoLayoutNoNumberBarOuterThumbNumbers">Outer thumbers (Uni, Georgi, etc.)</option>
                  <option value="stenoLayoutPalantype">Palantype</option>
                  <option value="stenoLayoutBrazilianPortugueseSteno">Brazilian Portuguese steno</option>
                  <option value="stenoLayoutYaweiChineseSteno">Chinese Yawei steno</option>
                  <option value="stenoLayoutDanishSteno">Danish steno</option>
                  <option value="stenoLayoutItalianMichelaSteno">Italian Michela steno</option>
                  <option value="stenoLayoutJapaneseSteno">Japanese steno</option>
                  <option value="stenoLayoutKoreanModernCSteno">Korean Modern C steno</option>
                </select>
              </div>
              { this.props.userSettings.stenoLayout === "stenoLayoutAmericanSteno" ?
                <fieldset>
                  <legend>Raw or QWERTY steno input</legend>
                  <div className="flex">
                    <div className="flex flex-wrap justify-between">
                      <p className="radio mr3">
                        <label htmlFor="raw" className="mb1">
                          <input type="radio" name="raw" id="raw" onChange={this.props.changeWriterInput} checked={this.props.globalUserSettings.writerInput === "raw"} /> Raw
                        </label>
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-between">
                      <p className="radio mr3">
                        <label htmlFor="qwerty" className="mb1">
                          <input type="radio" name="qwerty" id="qwerty" onChange={this.props.changeWriterInput} checked={this.props.globalUserSettings.writerInput === "qwerty"} /> QWERTY
                        </label>
                      </p>
                    </div>
                  </div>
                </fieldset>
                :
                  <p className="text-small">Note: clicking on the diagram only works for the Ward Stone Ireland (Plover, EcoSteno, SOFT/HRUF etc.) layout at this time.</p>
              }
            </div>
          </div>
        </div>
      </main>
    )
  }
}

function WriterWrapper(props: WithAppMethods<Props>) {
  const changeStenoLayout = useChangeStenoLayout()
  const changeWriterInput = useChangeWriterInput()
  return <Writer {...props} {...{changeStenoLayout, changeWriterInput}} />;
}

export default withAppMethods(withAtomsCompat(WriterWrapper, [
  ["userSettings", userSettingsState],
  ["globalUserSettings", globalUserSettingsState]
]));
