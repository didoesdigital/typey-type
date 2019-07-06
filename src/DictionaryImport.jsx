import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import GoogleAnalytics from 'react-ga';
import Notification from './Notification';
import { rankOutlines } from './utils/transformingDictionaries';
import { fetchResource } from './typey-type';
import PseudoContentButton from './PseudoContentButton';

let dictTypeyType = null;

class DictionaryImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: null,
      showDictionaryErrorNotification: false,
      combinedMatchingDictionaries: ["typey-type.json"],
      combinedLookupDictionary: {},
      validDictionaries: [],
      invalidDictionaries: [],
      namesOfValidImportedDictionaries: [],
      validDictionariesListedInConfig: [],
      validConfig: '',
      invalidConfig: [],
      dict: {
        "-T": "the",
      }
    }
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  // maxSelectFile(event) {
  //   let files = event.target.files // create file object
  //   if (files.length > 3) { 
  //     const msg = 'Only 3 images can be uploaded at a time'
  //     event.target.value = null // discard selected file
  //     console.log(msg)
  //     return false;
  //   }

  //   return true;
  // }

  validateDictionaries(files) {
    let validDictionaries = [];
    let invalidDictionaries = [];
    let filesLength = files.length;

    if (filesLength === 0) {
      this.setState({
        validDictionaries: validDictionaries,
        invalidDictionaries: [["No dictionary", "Choose a dictionary file to import."]]
      })
    }
    else {
      for (let i = 0; i < filesLength; ++i) {
        let dictionary = files[i];
        let dictName = dictionary.name;

        const reader = new FileReader();

        reader.onload = (event) => {
          let text = event.target.result;

          try {
            if (!dictionary.size > 5000) {
              throw new Error("This file is too big (>5MB).");
            }
            if (!dictionary.type.startsWith('application/json')) {
              throw new Error("This is not a JSON file.");
            }

            let parsedDictionary = JSON.parse(text);

            if (parsedDictionary.constructor !== {}.constructor) {
              throw new Error("This JSON does not contain an object.");
            }

            let parsedDictionaryKeys = Object.keys(parsedDictionary);

            if (parsedDictionaryKeys.length < 1) {
              throw new Error("This dictionary is empty.");
            }

            let parsedDictionaryKeysLength = parsedDictionaryKeys.length;

            for (let i = 0; i < parsedDictionaryKeysLength; ++i) {
              let invalidStenoOutline = parsedDictionaryKeys[i].match(/[^#STKPWHRAO*-EUFRPBLGTSDZ/]/);
              if (invalidStenoOutline !== null) {
                let length = 50;
                let invalidStenoOutlineString = parsedDictionaryKeys[i]
                let trimmedInvalidStenoOutline = invalidStenoOutlineString.length > length ? invalidStenoOutlineString.substring(0, length - 3) + "…" : invalidStenoOutlineString.substring(0, length);
                throw new Error('This dictionary contains invalid steno outlines, such as: "' + trimmedInvalidStenoOutline + '"');
              }
            }

            if (parsedDictionary && typeof parsedDictionary === "object") {
              validDictionaries.push([dictName, parsedDictionary]);
            }
          }
          catch (error) {
            invalidDictionaries.push([dictName, error.message]);
          }

          const namesOfValidImportedDictionaries = validDictionaries.map( (dictionary) => {
            return dictionary[0];
          });

          let combinedMatchingDictionaries = this.combineMatchingDictionaries(this.state.validDictionariesListedInConfig, validDictionaries);

          this.setState({
            combinedMatchingDictionaries: combinedMatchingDictionaries,
            namesOfValidImportedDictionaries: namesOfValidImportedDictionaries,
            validDictionaries: validDictionaries,
            invalidDictionaries: invalidDictionaries
          })
        };

        reader.readAsText(dictionary);
      }
    }
  }

  validateConfig(files) {
    let validConfig = '';
    let validDictionariesListedInConfig = [];
    let invalidConfig = [];
    let filesLength = files.length;

    if (filesLength > 1) {
      this.setState({
        validConfig: validConfig,
        invalidConfig: ["Too many files", "Choose one config file."]
      })
    }
    else if (filesLength !== 1) {
      this.setState({
        validConfig: validConfig,
        invalidConfig: ["No config file", "Choose a config file to import."]
      })
    }
    else if (!files[0].name.endsWith('.cfg')) {
      this.setState({
        validConfig: validConfig,
        invalidConfig: ["Incorrect file type", "The file name must end in “.cfg”."]
      })
    }
    else {
      let dictionaryConfig = files[0];
      let configName = dictionaryConfig.name;

      const reader = new FileReader();

      reader.onload = (event) => {
        let text = event.target.result;

        try {
          let lines = text.split('\n');
          let linesLength = lines.length;
          let parsedConfig = '';
          for (let i = 0; i < linesLength; ++i) {
            if (lines[i].startsWith('dictionaries = ')) {
              parsedConfig = JSON.parse(lines[i].replace('dictionaries = ', ''));
            }
          }

          if (!parsedConfig) {
            throw new Error("This file has no list of dictionaries.");
          }

          let parsedConfigLength = parsedConfig.length;
          for (let i = 0; i < parsedConfigLength; ++i) {
            if (parsedConfig[i].hasOwnProperty('enabled') && parsedConfig[i].hasOwnProperty('path')) {
              if (parsedConfig[i]["enabled"]) {
                let filename = parsedConfig[i]['path'].split('\\').pop().split('/').pop();
                if (filename.endsWith('.json')) {
                  validDictionariesListedInConfig.push(filename);
                }
                else {
                  throw new Error("No valid dictionary filenames.");
                }
              }
            }
            else {
              throw new Error("The list of dictionaries has enabled dictionary paths.");
            }
          }

          validConfig = configName;
        }
        catch (error) {
          invalidConfig = [configName, error.message];
        }

        let combinedMatchingDictionaries = this.combineMatchingDictionaries(validDictionariesListedInConfig, this.state.validDictionaries);

        this.setState({
          combinedMatchingDictionaries: combinedMatchingDictionaries,
          validConfig: validConfig,
          validDictionariesListedInConfig: validDictionariesListedInConfig,
          invalidConfig: invalidConfig
        })
      };

      reader.readAsText(dictionaryConfig);
    }
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const filesInput = document.querySelector("#dictionariesFileInput");
    const files = filesInput.files;

    this.validateDictionaries(files);
  }

  handleOnSubmitConfig(event) {
    event.preventDefault();
    const filesInput = document.querySelector("#dictionaryConfigFileInput");
    const files = filesInput.files;

    this.validateConfig(files);
  }

  addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName) {
    for (let [outline, translation] of Object.entries(dictContent)) {
      if (combinedLookupDictionary[translation]) {
        let current = combinedLookupDictionary[translation];
        if (translation === "constructor") {
          // TODO: Look into changing the Object to Map so we can safely access the key with the string "constructor"
        }
        else {
          current.push([outline, dictName]);
        }
        combinedLookupDictionary[translation] = current;
      }
      else {
        combinedLookupDictionary[translation] = [[outline, dictName]];
      }
    }
    return combinedLookupDictionary;
  }

  handleOnSubmitApplyChanges(event) {
    event.preventDefault();
    let combinedMatchingDictionaries = this.combineMatchingDictionaries(this.state.validDictionariesListedInConfig, this.state.validDictionaries);
    let combinedMatchingDictionariesLength = combinedMatchingDictionaries.length;
    let validDictionariesLength = this.state.validDictionaries.length;
    let combinedLookupDictionary = {};

    getTypeyTypeDict()
      .then(dictTypeyType => {
        for (let i = 0; i < combinedMatchingDictionariesLength; i++) {
          let dictContent = {};
          let dictName = combinedMatchingDictionaries[i];
          if (dictName === "typey-type.json") {
            dictContent = dictTypeyType;
            combinedLookupDictionary = this.addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName);
          }
          else {
            for (let j = 0; j < validDictionariesLength; j++) {
              if (this.state.validDictionaries[j][0] === dictName) {
                dictContent = this.state.validDictionaries[j][1];
                combinedLookupDictionary = this.addOutlinesToWordsInCombinedDict(dictContent, combinedLookupDictionary, dictName);
              }
            }
          }
        }

        for (let [translation, outlinesAndSourceDicts] of Object.entries(combinedLookupDictionary)) {
          if (translation === "constructor") {
            // FIXME
          } else {
            let rankedOutlinesAndSourceDicts = rankOutlines(outlinesAndSourceDicts, translation);
            combinedLookupDictionary[translation] = rankedOutlinesAndSourceDicts;
          }
        }

        this.props.updateGlobalLookupDictionary(combinedLookupDictionary);
      })
      .catch(error => {
        this.showDictionaryErrorNotification();
      });
  }

  showDictionaryErrorNotification() {
    this.props.setAnnouncementMessageString('Unable to load Typey Type’s dictionary');
    this.setState({showDictionaryErrorNotification: true});
  }

  combineMatchingDictionaries(validDictionariesListedInConfig, validDictionaries) {
    let combinedMatchingDictionaries = [];
    let validDictionariesListedInConfigLength = validDictionariesListedInConfig.length;

    for (let i = 0; i < validDictionariesListedInConfigLength; i++) {
      if (this.state.namesOfValidImportedDictionaries.indexOf(validDictionariesListedInConfig[i]) > -1) {
        combinedMatchingDictionaries.push(validDictionariesListedInConfig[i]);
      }
    }
    combinedMatchingDictionaries.push("typey-type.json");

    return combinedMatchingDictionaries;
  }

  render() {
    let combinedMatchingDictionaries = this.state.combinedMatchingDictionaries.map ((dictionary, index) => {
      return <li key={index}>{dictionary}</li>
    });

    let showYourDictionaries = (
      <p>You can import your dictionaries and your dictionary config to look up briefs using your own dictionaries.</p>
    );
    let showYourConfig = null;
    let showDictionaryErrors = null;
    let showConfigErrors = null;

    const validDictionaryList = this.state.validDictionaries.map( (dictionary, index, array) => {
      return <li key={index}>{dictionary[0]}</li>
    });

    const invalidDictionaryList = this.state.invalidDictionaries.map( (dictionary, index, array) => {
      return <li key={index}>{dictionary[0]}: {dictionary[1]}</li>
    });

    const namesOfValidImportedDictionaries = this.state.namesOfValidImportedDictionaries;
    const validDictionariesListedInConfig = this.state.validDictionariesListedInConfig.map( (dictionary, index, array) => {
      let className = '';
      if (namesOfValidImportedDictionaries.indexOf(dictionary) > -1) {
        className = 'unstyled-list-item';
      }
      else {
        className = 'unstyled-list-item bg-danger';
      }
      return <li key={index} className={className}>{dictionary}</li>
    });

    if (this.state.validDictionaries && this.state.validDictionaries.length > 0) {
      showYourDictionaries = (
        <React.Fragment>
          {this.state.validDictionaries.length === 1 ? <p>Your imported dictionary:</p> : <p>Your imported dictionaries:</p>}
          <ul className="wrap">
            {validDictionaryList}
          </ul>
        </React.Fragment>
      );
    }

    if (this.state.invalidDictionaries && this.state.invalidDictionaries.length > 0) {
      showDictionaryErrors = (
        <React.Fragment>
          {this.state.invalidDictionaries.length === 1 ? <p>This dictionary is invalid:</p> : <p>These dictionaries are invalid:</p>}
          <ul className="bg-danger pl1 pr3 wrap">
            {invalidDictionaryList}
          </ul>
        </React.Fragment>
      );
    }

    if (this.state.validConfig && this.state.validConfig.length > 4) { // '.cfg' is 4 characters
      showYourConfig = (
        <React.Fragment>
          <p className="wrap">Your imported dictionary config ({this.state.validConfig}) contains these dictionaries:</p>
          <ul className="wrap unstyled-list">
            {validDictionariesListedInConfig}
          </ul>
        </React.Fragment>
      );
    }

    if (this.state.invalidConfig && this.state.invalidConfig.length === 2) {
      showConfigErrors = (
        <React.Fragment>
          <p>This dictionary config is invalid:</p>
          <p className="bg-danger pl1 pr3 wrap">{this.state.invalidConfig[0]}: {this.state.invalidConfig[1]}</p>
        </React.Fragment>
      );
    }

    return (
      <DocumentTitle title={'Typey Type | Dictionary import'}>
        <main id="main">
          { this.state.showDictionaryErrorNotification ?
            <Notification>
              Warning: Unable to load Typey&nbsp;Type’s dictionary
            </Notification>
              :
            null
          }
          <div className="subheader">
            <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
              <div className="flex mr1 self-center">
                <header className="flex items-baseline">
                  <h2 className="table-cell mr2" ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Dictionary import</h2>
                </header>
              </div>
            </div>
          </div>
          <div className="p3 mx-auto mw-1024">
            <div className="flex flex-wrap">
              <div className="mw-568 mr3 flex-grow">
                <h3>Dictionaries used for lookup</h3>
                <p>Typey&nbsp;Type uses these dictionaries for brief hints:</p>
                <ul>
                  {combinedMatchingDictionaries}
                </ul>
                <form className="mb3" onSubmit={this.handleOnSubmitApplyChanges.bind(this)}>
                  <PseudoContentButton type="submit" className="pseudo-text--applied button mt1">Apply</PseudoContentButton>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-white landing-page-section mb3">
            <div className="p3 mx-auto mw-1024">
              <div className="flex flex-wrap">
                <div className="mw-568 mr3 flex-grow">
                  <h3>Your dictionaries</h3>
                  {showYourDictionaries}
                  {showDictionaryErrors}
                  {showYourConfig}
                  {showConfigErrors}
                </div>
                <div className="mw-384 w-336">
                  <h3>Import</h3>
                  <form className="mb3" onSubmit={this.handleOnSubmit.bind(this)}>
                    <div className="dib">
                      <label htmlFor="dictionariesFileInput">Import dictionaries in JSON format</label>
                      <input type="file" id="dictionariesFileInput" name="dictionary" className="form-control" multiple />
                    </div>
                    <div>
                      <button type="submit" className="button mt1">Import dictionaries</button>
                    </div>
                  </form>

                  <form className="mb3" onSubmit={this.handleOnSubmitConfig.bind(this)}>
                    <div className="dib">
                      <label htmlFor="dictionaryConfigFileInput">Import config</label>
                      <input type="file" id="dictionaryConfigFileInput" name="dictionaryConfig" className="form-control" multiple />
                    </div>
                    <div>
                      <button type="submit" className="button mt1">Import config</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </DocumentTitle>
    )
  }
}

function fetchDictTypeyType() {
  return fetchResource(process.env.PUBLIC_URL + '/dictionaries/dict.json').then((json) => {
    return json;
  }).catch(function(e) {
    return {
      "-T": "The",
      "PROEUS": "process",
      "-F": "of",
      "WREUG": "writing",
      "SHORT/HA*PBD": "shorthand",
      "S": "is",
      "KAULD": "called",
      "STEPB/TKPWRAEF TP-PL": "stenography.",
      "T-S": "It's",
      "TAOEUPD": "typed",
      "WA*EU": "with a",
      "STEPB/TAOEUP": "stenotype",
      "OR": "or",
      "TPAPB/SEU": "fancy",
      "KAOEBD TP-PL": "keyboard.",
      "KU": "You can",
      "TREUB KW-BG": "transcribe,",
      "KAPGS KW-BG": "caption,",
      "TKEUBG/TAEUT KW-BG": "dictate,",
      "KOED KW-BG": "code,",
      "KHAT KW-BG": "chat,",
      "WREU": "write",
      "PROES": "prose",
      "AT": "at",
      "OEFR": "over",
      "#T-Z": "200",
      "WORDZ": "words",
      "PER": "per",
      "PHEUPB TP-PL": "minute.",
      "TAOEUP/KWREU TAOEUP": "Typey type",
      "AOUFS": "uses",
      "SPAEUFD": "spaced",
      "REP/TEUGS/-S": "repetitions",
      "SKP": "and",
      "HUPBS": "hundreds",
      "HROEFPBS": "lessons",
      "TO": "to",
      "HEP": "help",
      "U": "you",
      "PHAFRT": "master",
      "TAOEUPG": "typing",
      "W": "with",
    };
  });
}

function getTypeyTypeDict() {
  let dict;

  if (dictTypeyType === null) {
    dict = fetchDictTypeyType().then(data => {
      dictTypeyType = data;
      return data;
    });
  }
  else {
    dict = Promise.resolve(dictTypeyType);
  }

  return dict;
}


export default DictionaryImport;
