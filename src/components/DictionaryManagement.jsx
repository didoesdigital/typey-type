import * as Sentry from '@sentry/browser';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import GoogleAnalytics from 'react-ga';
import Notification from './Notification';
import {
  getListOfValidDictionariesAddedAndInConfig,
} from '../utils/transformingDictionaries';
import PseudoContentButton from './PseudoContentButton';
import { writePersonalPreferences } from '../utils/typey-type';

class DictionaryManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: null,
      importedDictionariesLoaded: false,
      importedDictionariesLoading: false,
      dictionaryErrorNotification: null,
      dictionariesTypeyTypeWillUse: [],
      combinedLookupDictionary: {},
      validDictionaries: [],
      invalidDictionaries: [],
      namesOfValidImportedDictionaries: [],
      validDictionariesListedInConfig: [],
      validConfig: '',
      invalidConfig: [],
      dict: {
        "-T": "the",
      },
    }
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
    let config = [];
    if (this.props.globalLookupDictionary && this.props.globalLookupDictionary['configuration']) {
      config = this.props.globalLookupDictionary['configuration'];
      config = config.filter(dictName => dictName !== "typey-type.json" && dictName !== "plover-main-3-jun-2018.json");
    }
    this.setState({dictionariesTypeyTypeWillUse: config});
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
    let validDictionaries = this.state.validDictionaries.slice();
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

            if (this.state.validDictionaries.map(d => d[0]).includes(dictName)) {
              throw new Error("This dictionary name conflicts with an existing dictionary. You may have imported it already.");
            }

            if (dictName === "typey-type.json") {
              throw new Error("This dictionary looks like a copy of Typey Type's so we'll exclude it for now.");
            }

            if (dictName === "plover-main-3-jun-2018.json") {
              throw new Error("This dictionary looks like a copy of Plover's latest dictionary so we'll exclude it for now.");
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
                throw new Error(`${dictName} contains invalid steno outlines, such as: ${trimmedInvalidStenoOutline}`);
              }
            }

            if (parsedDictionary && typeof parsedDictionary === "object") {
              validDictionaries.push([dictName, parsedDictionary]);
            }
          }
          catch (error) {
            console.error(error);
            invalidDictionaries.push([dictName, error.message]);
          }

          const namesOfValidImportedDictionaries = validDictionaries.map( (dictionary) => {
            return dictionary[0];
          });

          let dictionariesTypeyTypeWillUse = getListOfValidDictionariesAddedAndInConfig(this.state.validDictionariesListedInConfig, namesOfValidImportedDictionaries);

          this.setState({
            dictionariesTypeyTypeWillUse: dictionariesTypeyTypeWillUse,
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
              throw new Error("The list of dictionaries has no enabled dictionary paths.");
            }
          }

          validConfig = configName;
        }
        catch (error) {
          console.error(error);
          invalidConfig = [configName, error.message];
        }

        let dictionariesTypeyTypeWillUse = getListOfValidDictionariesAddedAndInConfig(validDictionariesListedInConfig, this.state.namesOfValidImportedDictionaries);

        this.setState({
          dictionariesTypeyTypeWillUse: dictionariesTypeyTypeWillUse,
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

    this.setState({
      importedDictionariesLoaded: false,
      importedDictionariesLoading: false
    });

    const filesInput = document.querySelector("#dictionariesFileInput");
    const files = filesInput.files;

    let labelString = 'No files for dictionaries';
    if (files && files.length > 0) {
      let fileNames = [];
      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }
      labelString = fileNames.join(", ");
    }
    GoogleAnalytics.event({
      category: 'Dictionary import',
      action: 'Submit dictionaries',
      label: labelString
    });

    this.validateDictionaries(files);
  }

  handleOnSubmitConfig(event) {
    event.preventDefault();

    this.setState({
      importedDictionariesLoaded: false,
      importedDictionariesLoading: false
    });

    const filesInput = document.querySelector("#dictionaryConfigFileInput");
    const files = filesInput.files;

    let labelString = 'No files for config';

    if (files && files.length > 0) {
      let fileNames = [];
      for (let i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
      }
      labelString = fileNames.join(", ");
    }

    GoogleAnalytics.event({
      category: 'Dictionary config import',
      action: 'Submit config',
      label: labelString
    });

    this.validateConfig(files);
  }

  handleOnSubmitClear(event) {
    event.preventDefault();

    let writeDictionariesError = writePersonalPreferences('personalDictionaries', []);
    if (writeDictionariesError) {
      console.log(writeDictionariesError);
      if (writeDictionariesError.error) {
        Sentry.captureException(writeDictionariesError.error, { extra: writeDictionariesError.message });
      }
    }

    this.setState({
      importedDictionariesLoading: false,
      dictionaryErrorNotification: false,
      dictionariesTypeyTypeWillUse: [],
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
    });

    GoogleAnalytics.event({
      category: 'Dictionary management',
      action: 'Clear dictionaries and config',
      label: 'Clear all'
    });
  }

  handleOnSubmitApplyChanges(event) {
    event.preventDefault();

    this.setState({
      importedDictionariesLoaded: false,
      importedDictionariesLoading: true
    });

    // First, update state
    this.props.updatePersonalDictionaries({
      validDictionaries: this.state.validDictionaries
    });

    // Second, update local storage
    let writeDictionariesError = writePersonalPreferences('personalDictionaries', this.state.validDictionaries);
    if (writeDictionariesError) {
      this.showDictionaryErrorNotification(writeDictionariesError.name);

      if (writeDictionariesError.error) {
        Sentry.captureException(writeDictionariesError.error, { extra: writeDictionariesError.message });
      }
    }

    let dictionariesTypeyTypeWillUse = this.state.dictionariesTypeyTypeWillUse;

    let labelString = dictionariesTypeyTypeWillUse || 'No files for config';
    GoogleAnalytics.event({
      category: 'Apply dictionary changes',
      action: 'Click apply button',
      label: labelString
    });

    const personalDictionaries = {
      validDictionaries: this.state.validDictionaries,
    }

    this.props.fetchAndSetupGlobalDict(true, personalDictionaries)
      .then(() => {
        this.setState({
          importedDictionariesLoaded: true,
          importedDictionariesLoading: false
        });
      })
      .catch(error => {
        console.error(error);
        this.showDictionaryErrorNotification('FetchAndSetupGlobalDictFailed');
        this.setState({
          importedDictionariesLoaded: false,
          importedDictionariesLoading: false
        });
      });
    this.props.setAnnouncementMessageString('Applied!');
  }

  showDictionaryErrorNotification(name) {
    this.props.setAnnouncementMessageString('Unable to save dictionaries. See the message at the top of the page for more details.');
    this.setState({
      dictionaryErrorNotification: name || null
    });
  }

  dismissDictionaryErrorNotification() {
    this.props.setAnnouncementMessageString('');
    this.setState({
      dictionaryErrorNotification: null
    });
  }

  render() {
    let dictionariesTypeyTypeWillUse = this.state.dictionariesTypeyTypeWillUse.map ((dictionary, index) => {
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
          {this.state.validDictionaries.length === 1 ? <p>Your added dictionary:</p> : <p>Your added dictionaries:</p>}
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
          <p className="wrap">Your added dictionary config ({this.state.validConfig}) contains these dictionaries:</p>
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

    let notificationBody;
    switch (this.state.dictionaryErrorNotification) {
      case 'AddToStorageFailed':
        notificationBody = <p>Your local storage is full so your dictionaries won't fit. Typey&nbsp;Type will still use them today but the next time you visit, you’ll have to add your dictionaries again. For help, email <a href="mailto:typeytype@didoesdigital.com" target="_blank" rel="noopener noreferrer">typeytype@didoesdigital.com</a></p>;
        break;

      case 'WriteToStorageFailed':
        notificationBody = <p>Typey&nbsp;Type couldn’t update your local storage. Check your settings. It might also be full. Any changes to personal preferences and progress will be lost.</p>;
        break;

      case 'NoLocalStorage':
        notificationBody = <p>Local storage is unavailable. Check your settings and permissions or try another browser. Changes to personal preferences and progress will be lost.</p>;
        break;

      case 'FetchAndSetupGlobalDictFailed':
        notificationBody = <p>Typey&nbsp;Type couldn’t set up a global dictionary using your personal dictionaries. For help, email <a href="mailto:typeytype@didoesdigital.com" target="_blank" rel="noopener noreferrer">typeytype@didoesdigital.com</a></p>;
        break;

      default:
        notificationBody = ''
        break;
    }

    return (
      <DocumentTitle title={'Typey Type | Dictionary management'}>
        <main id="main">
          { this.state.dictionaryErrorNotification ?
            <Notification onDismiss={this.dismissDictionaryErrorNotification.bind(this)}>
              {notificationBody}
            </Notification>
              :
            null
          }
          <div className="subheader">
            <div className="flex flex-wrap items-baseline mx-auto mw-1920 justify-between px3 py2">
              <div className="flex mr1 self-center">
                <header className="flex items-center min-h-40">
                  <h2 className="table-cell mr2" ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Dictionary management</h2>
                </header>
              </div>
            </div>
          </div>
          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <h3>Dictionary management experiment</h3>
              <p>This feature is experimental! There are some known limitations:</p>
              <ul>
                <li>You cannot use duplicate dictionary names e.g. if you have <code>../good/dict.json</code> and <code>../bad/dict.json</code>, Typey&nbsp;Type will see them both as <code>dict.json</code> and panic.</li>
                <li>This only works with JSON files. You cannot add Python or RTF dictionaries.</li>
                <li>This only works with Plover config files. This config file may decide the order of dictionaries for overwriting entries.</li>
                <li>This assumes you're using a newer version of Plover where the config file is in a certain format and the most important dictionary appears first. Or is it last?</li>
                <li>Local storage typically only holds about 5MB of data. If you have a bigger dictionary, you'll have to add it again on every visit.</li>
                <li>If you add multiple dictionaries with the same steno outline (JSON key) with different translations (JSON values), Typey&nbsp;Type will happily show the same outline as a hint for each of the words (or phrases), even though your configuration would prevent using both.</li>
                <li>The Writer feature will ignore your personal dictionaries entirely and show only Typey&nbsp;Type translations.</li>
              </ul>
            </div>
          </div>
          <div className="bg-white landing-page-section">
            <div className="p3 mx-auto mw-1024 flex flex-wrap">
              <div className="mw-568 mr3 flex-grow">
                <h3>Dictionaries used for lookup</h3>

                <p>Typey&nbsp;Type will use these dictionaries for brief hints:</p>
                <ul>
                  <li>Typey Type's dictionaries</li>
                  {dictionariesTypeyTypeWillUse}
                  <li>… and for Lookup, Plover's latest dictionary too</li>
                </ul>
                <form className="mb3" onSubmit={this.handleOnSubmitApplyChanges.bind(this)}>
                  <p>
                    <PseudoContentButton type="submit" className="pseudo-text--applied button mt1">Apply</PseudoContentButton>
                    {this.state.importedDictionariesLoading ? <span className="dib ml2">Applying</span> : null}
                    {this.state.importedDictionariesLoaded ? <span className="dib ml2">Applied!</span> : null}
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="flex flex-wrap">
                <div className="mw-568 mr3 flex-grow">
                  <h3>Your dictionaries</h3>
                  {showYourDictionaries}
                  {showDictionaryErrors}
                  {showYourConfig}
                  {showConfigErrors}
                  <form className="mt3 mb3" onSubmit={this.handleOnSubmitClear.bind(this)}>
                    <div>
                      <button type="submit" className="button button--danger mt1">Clear dictionaries and config</button>
                    </div>
                  </form>
                </div>
                <div className="mw-384 w-336">
                  <h3>Add files</h3>
                  <form className="mb3" onSubmit={this.handleOnSubmit.bind(this)}>
                    <div className="dib">
                      <label className="mb1" htmlFor="dictionariesFileInput">Add dictionaries in JSON format</label>
                      <p className="text-small mb1">You can add one dictionary after another using this form.</p>
                      <input type="file" id="dictionariesFileInput" name="dictionary" className="form-control" multiple />
                    </div>
                    <div>
                      <button type="submit" className="button mt1">Add dictionaries</button>
                    </div>
                  </form>

                  <form className="mb3" onSubmit={this.handleOnSubmitConfig.bind(this)}>
                    <div className="dib">
                      <label className="mb1" htmlFor="dictionaryConfigFileInput">Add config</label>
                      <input type="file" id="dictionaryConfigFileInput" name="dictionaryConfig" className="form-control" multiple />
                    </div>
                    <div>
                      <button type="submit" className="button mt1">Add config</button>
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

export default DictionaryManagement;
