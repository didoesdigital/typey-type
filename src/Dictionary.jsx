import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Clipboard from 'clipboard';
// import CustomDictionarySetup from './CustomDictionarySetup';

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultDictionary: false
    }
  }

  componentDidMount() {
    let locationpathname = this.props.location.pathname.replace(/\/$/,'.json');

    console.log("COMPONENT MOUNTS");
    console.log(this.props.dictionary.path);
    console.log(locationpathname);
    console.log(this.props.location.pathname);
    if (this.props.location.pathname.startsWith('/dictionaries/custom')) {
      // this.props.setCustomDictionary();
    }
    else if((this.props.dictionary.path!==locationpathname) && (this.props.location.pathname.startsWith('/dictionaries'))) {
      console.log("IS NEW DICT, HANDLE IT");
      console.log("CORRECT HANDLE CALL");
      console.log(process.env.PUBLIC_URL + this.props.location.pathname);
      this.props.handleDictionary(process.env.PUBLIC_URL + this.props.location.pathname, this.props.dictionaryIndex);
    }

    // if (this.props.dictionary.path === '/dictionaries/typey-type/top-10.json') {
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
    if (this.props.location.pathname.startsWith('/dictionaries/custom') && this.props.dictionary.title !== "Custom") {
      // this.props.setCustomDictionary();
    } else if((prevProps.match.url!==this.props.match.url) && (this.props.location.pathname.startsWith('/dictionaries'))) {
      console.log("WRONG HANDLE CALL");
      this.props.handleDictionary(process.env.PUBLIC_URL + this.props.location.pathname, this.props.dictionaryIndex);
    }

    // if (this.props.dictionary.path === '/dictionaries/typey-type/top-10.json' && !this.state.defaultDictionary) {
    //   this.setState({defaultDictionary: true});
    // } else if (this.props.dictionary.path !== '/dictionaries/typey-type/top-10.json' && this.state.defaultDictionary) {
    //   this.setState({defaultDictionary: false});
    // }

  }

  isCustom() {
    return (this.props.location.pathname === '/dictionaries/custom');
  }

  // isSetup() {
  //   return (this.props.dictionary.sourceMaterial.length !== 0);
  // }

  // isFinished() {
  //   return (this.props.currentPhraseID === this.props.dictionary.presentedMaterial.length);
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
    if (this.props.dictionary) {
      // console.log("Dictionary");
      if (this.isCustom() && !this.isSetup()) {
      // console.log("custom");
        return (
          <DocumentTitle title='Typey Type | Create a custom dictionary'>
            <p>CUSTOM DICT</p>
          </DocumentTitle>
        )
      } else {
        if (false && this.props.dictionary.path === '/dictionaries/typey-type/top-10.json') {
          return (
            <DocumentTitle title={'Typey Type | Missing dictionary'}>
              <main id="main">
                <div className="subheader">
                  <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
                    <div className="flex mr1 self-center">
                      <header className="flex items-baseline">
                        <a href={this.props.path} className="heading-link table-cell mr2" role="button">
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
          contents = JSON.stringify(this.props.dictionary.contents).split(',').join(',\n');
          return (
            <DocumentTitle title={'Typey Type | ' + this.props.dictionary.title}>
              <main id="main">
                <div className="subheader">
                  <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
                    <div className="flex mr1 self-center">
                      <header className="flex items-baseline">
                        <a href={this.props.path} className="heading-link table-cell mr2" role="button">
                          <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">{this.props.dictionary.title}</h2>
                        </a>
                      </header>
                    </div>
                    <div className="flex mxn2">
                      <a href={this.props.path} onClick={this.downloadDictionary} className="link-button link-button-ghost table-cell mr1" role="button">Download</a>
                      <a href={this.props.path} data-clipboard-target="#js-dictionary-json-pre" className="js-clipboard-button link-button link-button-ghost table-cell mr1 copy-to-clipboard fade-out-up" role="button">Copy to clipboard</a>
                    </div>
                  </div>
                </div>
                <div className="p3 mx-auto mw-1024">
                  <div className="mw-568">
                    <p className="mt3">Typey&nbsp;Type’s dictionary is a version of the Plover dictionary with misstrokes removed for the top 10,000 words.</p>

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
