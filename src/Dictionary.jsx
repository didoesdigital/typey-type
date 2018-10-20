import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Clipboard from 'clipboard';
import {
  fetchDictionaryIndex,
  lookUpDictionaryInIndex,
} from './typey-type';
// import CustomDictionarySetup from './CustomDictionarySetup';

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDictionary: false,
      dictionary: {
        author: "Typey Type",
        title: 'Top 10 dict',
        subtitle: "",
        category: "Typey Type",
        subcategory: "",
        tagline: "Typey Type’s top 10 words.",
        link: "/typey-type/support#typey-type-dictionary",
        path: "/dictionaries/typey-type/top-10.json",
        contents: {
          "-T": "the",
          "-F": "of",
          "SKP": "and",
          "TO": "to",
          "AEU": "a",
          "TPH": "in",
          "TPOR": "for",
          "S": "is",
          "OPB": "on",
          "THA": "that"
        }
      },
      dictionaryIndex: [{
          "title": "Typey Type",
          "category": "Typey Type",
          "subcategory": "",
          "path": process.env.PUBLIC_URL + "/typey-type/typey-type.json"
        },
        {
          "title": "Steno",
          "category": "Drills",
          "subcategory": "",
          "path": process.env.PUBLIC_URL + "/drills/steno/steno.json"
        }]
    }
  }

  componentDidMount() {
    let locationpathname = this.props.location.pathname.replace(/\/$/,'.json');
    console.log(locationpathname);


    if (this.props.location.pathname.startsWith('/dictionaries/custom')) {
      // this.props.setCustomDictionary();
    }
    else if((this.props.dictionary.path!==locationpathname) && (this.props.location.pathname.startsWith('/dictionaries'))) {
      fetchDictionaryIndex().then((json) => {
        this.setState({ dictionaryIndex: json }, () => {
          let dictionaryMetadata = lookUpDictionaryInIndex(process.env.PUBLIC_URL + this.props.location.pathname, this.state.dictionaryIndex);
          let newDictionary = Object.assign({}, this.state.dictionary)
          for (const [metadataKey, metadataValue] of Object.entries(dictionaryMetadata)) {
            newDictionary[metadataKey] = metadataValue;
          }
          this.setState({dictionary: newDictionary});
        })
      });
      this.handleDictionary(process.env.PUBLIC_URL + this.props.location.pathname);

    }

    // if (this.state.dictionary.path === '/dictionaries/typey-type/top-10.json') {
    //   this.setState({defaultDictionary: true});
    // } else {
    //   this.setState({defaultDictionary: false});
    // }

    new Clipboard('.js-clipboard-button');

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // let locationpathname = this.props.location.pathname.replace(/\/$/,'.json');
    if (this.props.location.pathname.startsWith('/dictionaries/custom') && this.state.dictionary.title !== "Custom") {
      // this.props.setCustomDictionary();
    } else if((prevProps.match.url!==this.props.match.url) && (this.props.location.pathname.startsWith('/dictionaries'))) {
      console.log("WRONG HANDLE CALL");
      this.handleDictionary(process.env.PUBLIC_URL + this.props.location.pathname, this.state.dictionaryIndex);
    }

    // if (this.state.dictionary.path === '/dictionaries/typey-type/top-10.json' && !this.state.defaultDictionary) {
    //   this.setState({defaultDictionary: true});
    // } else if (this.state.dictionary.path !== '/dictionaries/typey-type/top-10.json' && this.state.defaultDictionary) {
    //   this.setState({defaultDictionary: false});
    // }

  }

  handleDictionary(path) {
    // console.log("PATH: " + path);
    // let dictionaryFile = path.replace(/^\/dictionaries/,'').replace(/\/$/,'.json');
    let dictionaryFile = path.replace(/\/$/,'.json');
    // getDictionary(path.replace(/^\/dictionaries/,'').replace(/\/$/,'.json')).then((dictionaryContents) => {
      fetch(dictionaryFile, {
        method: "GET",
        credentials: "same-origin"
      }).then((response) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then(dictionaryContents => {
            let newDictionary = Object.assign({}, this.state.dictionary);
            newDictionary['contents'] = dictionaryContents;
            this.setState({
              dictionary: newDictionary
            });

          });
        } else {
          let dictionary = {
            author: "Typey Type",
            title: 'Top 10 dict', subtitle: "",
            category: "Typey Type", subcategory: "",
            tagline: "Typey Type’s top 10 words.",
            link: "/typey-type/support#typey-type-dictionary",
            path: "/dictionaries/typey-type/top-10.json",
            contents: { "-T": "the", "-F": "of", "SKP": "and", "TO": "to", "AEU": "a", "TPH": "in", "TPOR": "for", "S": "is", "OPB": "on", "THA": "that" }
          };

        }
      }).catch((error) => {
        console.log('Unable to load dictionary', error)
      });
  }


  isCustom() {
    return (this.props.location.pathname === '/dictionaries/custom');
  }

  // isSetup() {
  //   return (this.state.dictionary.sourceMaterial.length !== 0);
  // }

  // isFinished() {
  //   return (this.state.currentPhraseID === this.state.dictionary.presentedMaterial.length);
  // }

  downloadDictionary(event) {
    event.preventDefault();
    // TODO download file
  }

  prefillSurveyLink() {
    // TODO: create a new feedback form just for dictionary feedback
    // fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=dictionary&entry.1202724812&entry.936119214";
    let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690="
    let param = "&entry.1202724812&entry.936119214";
    let prefillDictionary = '';
    if (this.props.location && this.props.location.pathname) {
      prefillDictionary = this.props.location.pathname;
    }
    if (this.surveyLink) {
      this.surveyLink.href = googleFormURL + encodeURIComponent(prefillDictionary) + param;
    }
  }

  render() {
      // console.log("dictionary component");

    // let createNewCustomDictionary = '';

    // if (this.isCustom() && this.isSetup()) {
    //   createNewCustomDictionary = (<Link to='/dictionaries/custom' onClick={this.props.setCustomDictionary} className="link-button link-button-ghost table-cell mr1" role="button">Create new dictionary</Link>);
    // } else {
    //   createNewCustomDictionary = '';
    // }
    //
              // {createNewCustomDictionary}

            // <CustomDictionarySetup
            //   createCustomDictionary={this.props.createCustomDictionary}
            // />
    if (this.state.dictionary) {
      // console.log("Dictionary");
      if (this.isCustom() && !this.isSetup()) {
      // console.log("custom");
        return (
          <DocumentTitle title='Typey Type | Create a custom dictionary'>
            <p>CUSTOM DICT</p>
          </DocumentTitle>
        )
      } else {
        if (false && this.state.dictionary.path === '/dictionaries/typey-type/top-10.json') {
          return (
            <DocumentTitle title={'Typey Type | Missing dictionary'}>
              <main id="main">
                <div className="subheader">
                  <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
                    <div className="flex mr1 self-center">
                      <header className="flex items-baseline">
                        <a href={this.state.dictionary.path} className="heading-link table-cell mr2" role="button">
                          <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Missing dictionary</h2>
                        </a>
                      </header>
                    </div>
                  </div>
                </div>
                <div className="p3 mx-auto mw-1024">
                  <div className="mw-568">
                    <p className="mt3">This dictionary is missing.</p>
                  </div>
                </div>
              </main>
            </DocumentTitle>
          );
        } else {
          // console.log(this.props.dictionary.path);
                        // <a href={this.props.path} onClick={this.props.restartDictionary} className="heading-link table-cell mr2" role="button">
                      // <a href={this.props.path} onClick={this.downloadDictionary} className="link-button link-button-ghost table-cell mr1" role="button">Download</a>
        // console.log("not custom");
          let contents = '';
          // console.log(this.props.dictionary);
          // contents = Object.entries(this.props.dictionary.contents).join('\n');
          // contents = JSON.stringify(this.props.dictionary.contents);
          contents = JSON.stringify(this.state.dictionary.contents).split(',').join(',\n');
          return (
            <DocumentTitle title={'Typey Type | ' + this.state.dictionary.title}>
              <main id="main">
                <div className="subheader">
                  <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
                    <div className="flex mr1 self-center">
                      <header className="flex items-baseline">
                        <a href={this.state.dictionary.path} className="heading-link table-cell mr2" role="button">
                          <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">{this.state.dictionary.title}</h2>
                        </a>
                      </header>
                    </div>
                    <div className="flex mxn2">
                      <a href={this.state.dictionary.path} onClick={this.downloadDictionary} className="link-button link-button-ghost table-cell mr1" role="button">Download</a>
                      <a href={this.state.dictionary.path} data-clipboard-target="#js-dictionary-json-pre" className="js-clipboard-button link-button link-button-ghost table-cell mr1 copy-to-clipboard fade-out-up" role="button">Copy to clipboard</a>
                    </div>
                  </div>
                </div>
                <div className="p3 mx-auto mw-1024">
                  <div className="mw-568">
                    <p className="mt3">{this.state.dictionary.tagline}</p>

                    <h3 id="TODO-linkable-heading-id">The dictionary</h3>
                    <pre
                      className="quote h-192 overflow-scroll mw-384 mt1 mb3"
                      id="js-dictionary-json-pre"
                    ><code>{contents}</code></pre>

                  </div>
                </div>
                <p className="text-center"><a href={this.prefillSurveyLink()} className="text-small mt0" target="_blank" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)} id="ga--dictionary--give-feedback">Give feedback on this dictionary (form opens in a new tab)</a></p>
              </main>
            </DocumentTitle>
          )
        }
      }
    } else {
      console.log("no dictionary");
      return <div><h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">That dictionary is missing.</h2></div>;
    }
  }
}

export default Dictionary;
