import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';
import DictionaryNotFound from './DictionaryNotFound';
import GoogleAnalytics from 'react-ga';
import PseudoContentButton from './PseudoContentButton';
import { IconExternal } from './components/Icon';
import { Tooltip } from 'react-tippy';
import { lookUpDictionaryInIndex } from './typey-type';
import { fetchDictionaryIndex } from './utils/getData';
// import CustomDictionarySetup from './CustomDictionarySetup';

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingDictionaryContents: false,
      loadingError: false,
      dictionary: {
        author: "Typey Type",
        title: 'Loading dictionary…',
        subtitle: "",
        category: "Typey Type",
        subcategory: "",
        tagline: "Loading…",
        link: process.env.PUBLIC_URL + "/support#typey-type-dictionary",
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
          "path": process.env.PUBLIC_URL + "/dictionaries/typey-type/typey-type.json"
        },
        {
          "title": "Steno",
          "category": "Drills",
          "subcategory": "",
          "path": process.env.PUBLIC_URL + "/dictionaries/drills/steno/steno.json"
        }]
    }
  }

  componentDidMount() {
    let locationpathname = this.props.location.pathname.replace(/\/$/,'.json');


    // console.log(locationpathname);
    // console.log("COMPONENT MOUNTS");
    // console.log(this.state.dictionary.path);
    // console.log(locationpathname);
    // console.log(this.props.location.pathname);
    if (this.props.location.pathname.startsWith('/dictionaries/custom')) {
      // this.props.setCustomDictionary();
    }
    else if((this.state.dictionary.path!==locationpathname) && (this.props.location.pathname.startsWith('/dictionaries'))) {
      this.setState({
        loadingDictionaryContents: true,
        loadingError: false
      });

      fetchDictionaryIndex().then((json) => {
        this.setState({ dictionaryIndex: json }, () => {
          let dictionaryMetadata = lookUpDictionaryInIndex(process.env.PUBLIC_URL + this.props.location.pathname, this.state.dictionaryIndex);
          let newDictionary = Object.assign({}, this.state.dictionary)
          for (const [metadataKey, metadataValue] of Object.entries(dictionaryMetadata)) {
            newDictionary[metadataKey] = metadataValue;
          }
          this.props.setAnnouncementMessageString('Navigated to: ' + newDictionary.title);
          this.setState({
            dictionary: newDictionary
          });
        })
      }).catch((error) => {
        console.log('Unable to load dictionary index', error)
        this.props.setAnnouncementMessageString('Navigated to: missing dictionary index');
      });
      this.loadDictionaryContents(process.env.PUBLIC_URL + this.props.location.pathname);
    }

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  componentWillUnmount() {
    this.setState({
      loadingDictionaryContents: false,
      loadingError: false
    });
  }

  loadDictionaryContents(path) {
    let dictionaryFile = path.replace(/\/$/,'.json');
    fetch(dictionaryFile, {
      method: "GET",
      credentials: "same-origin"
    }).then((response) => {
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(dictionaryContents => {
          let newDictionary = Object.assign({}, this.state.dictionary);

          newDictionary['contents'] = dictionaryContents;

          this.props.setAnnouncementMessageString('Finished loading: ' + newDictionary.title);

          this.setState({
            dictionary: newDictionary,
            loadingDictionaryContents: false,
            loadingError: false
          });
        });
      } else {
        throw new Error('Unable to load dictionary');
      }
    }).catch((error) => {
      console.log('Unable to load dictionary', error)
      this.props.setAnnouncementMessageString('Unable to load dictionary');

      this.setState({
        loadingError: true
      });
    });
  }

  isCustom() {
    return (this.props.location.pathname === '/dictionaries/custom');
  }

  prefillSurveyLink() {
    // fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690=Example";
    let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690="
    let prefillDictionary = '';
    if (this.props.location && this.props.location.pathname) {
      prefillDictionary = this.props.location.pathname;
    }
    if (this.surveyLink) {
      this.surveyLink.href = googleFormURL + encodeURIComponent(prefillDictionary);
    }
  }

  downloadDictionary() {
    let dictionaryPath;
    if (this.state.dictionary && this.state.dictionary.path && this.state.dictionary.path !== "/dictionaries/typey-type/top-10.json") {
      dictionaryPath = this.state.dictionary.path;
    } else {
      dictionaryPath = 'No dictionary path'
    }

    GoogleAnalytics.event({
      category: 'Downloads',
      action: 'Click',
      label: dictionaryPath,
    });
  }

  render() {
    if (this.state.loadingError) {
      return <DictionaryNotFound path={this.props.path} location={this.props.location} dictionaryIndex={this.props.dictionaryIndex} />
    }

    if (this.state.dictionary) {
      if (this.isCustom()) {
      // console.log("custom");
        return (
          <DocumentTitle title='Typey Type | Create a custom dictionary'>
            <p>CUSTOM DICT</p>
          </DocumentTitle>
        )
      } else {
        let contents = '';
        let truncatedMessage = ``;
        contents = JSON.stringify(this.state.dictionary.contents).split('",').join('",\n');
        contents = "{\n" + contents.slice(1,contents.length); // split first line {"STROKE": "TRANSLATION", on {"

        let contentsArray = contents.split("\n");
        let contentsArrayLength = contentsArray.length;
        let truncationLimit = 1000;
        if (contentsArrayLength > truncationLimit) {
          truncatedMessage = <p className="bg-danger">The dictionary is too large to display in full so this only shows the first {truncationLimit} entries.</p>
          let newContents = contentsArray.slice(0,truncationLimit);
          newContents[truncationLimit - 1] = newContents[truncationLimit - 1].slice(0, -1); // removing trailing comma
          newContents.push("}");
          contents = newContents.join('\n');
        }

        let externalLink = '';
        let internalLink = '';
        let dictLink = this.state.dictionary.link;
        if (dictLink.startsWith("/typey-type") || dictLink.startsWith('/dictionaries/') || dictLink.startsWith('/lessons/') || dictLink.startsWith('/support')) {
          internalLink = <p><Link to={dictLink}>Learn more</Link></p>;
          if (dictLink.startsWith(process.env.PUBLIC_URL + "/lessons")) {
            internalLink = <p><Link to={dictLink}>Lesson: {this.state.dictionary.title}</Link></p>;
          }
          // better check would be `//`, `http`
        } else {
          externalLink = (
            <p className="mt3"><a href={this.state.dictionary.link} target='_blank' rel='noopener noreferrer'>Learn more
              <Tooltip
                title="Opens in a new tab"
                animation="shift"
                arrow="true"
                className=""
                duration="200"
                tabIndex="0"
                tag="span"
                theme="didoesdigital"
                trigger="mouseenter focus click"
                onShow={this.props.setAnnouncementMessage}
              >
                <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip>
            </a></p>
          );
        }

        return (
          <DocumentTitle title={'Typey Type | Dictionary: ' + this.state.dictionary.title}>
            <main id="main">
              <div className="subheader">
                <div className="flex flex-wrap items-baseline mx-auto mw-1024 justify-between p3">
                  <div className="flex mr1 self-center">
                    <header className="flex items-baseline">
                      <h2 className="table-cell mr2" ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">{this.state.loadingDictionaryContents ? <span>Loading dictionary…</span> : this.state.dictionary.title}{this.state.loadingError && <span>Loading failed.</span>}</h2>
                    </header>
                  </div>
                  <div className="flex mxn2">
                    <a href={process.env.PUBLIC_URL + this.state.dictionary.path} download="" onClick={this.downloadDictionary.bind(this)} className="link-button link-button-ghost table-cell mr1">Download</a>
                    <PseudoContentButton className="js-clipboard-button link-button link-button-ghost table-cell mr1 copy-to-clipboard" dataClipboardTarget="#js-dictionary-json-pre">Copy to clipboard</PseudoContentButton>
                  </div>
                </div>
              </div>
              <div className="p3 mx-auto mw-1024">
                <div className="mw-568">
                  {this.state.dictionary.author && !this.state.dictionary.tagline.includes('Loading') && (
                    <p className="text-small text-uppercase de-emphasized mt3">Contributor: {this.state.dictionary.author}</p>
                  )}

                  {this.state.dictionary.tagline && !this.state.dictionary.tagline.includes('Loading') && (
                    <p>{this.state.dictionary.tagline}</p>
                  )}

                  {this.state.dictionary.link && !this.state.dictionary.link.includes('/typey-type/support') && internalLink }
                  {this.state.dictionary.link && externalLink }

                  <h3>The dictionary</h3>
                  {this.state.loadingError && <p>Loading failed.</p>}
                  {!this.state.loadingDictionaryContents && truncatedMessage}
                  {this.state.loadingDictionaryContents ? <p>Loading…</p> :
                    <pre
                      className="quote h-168 overflow-scroll mw-384 mt1 mb3"
                      id="js-dictionary-json-pre"
                    ><code>{contents}</code></pre>
                  }

                </div>
                <p><a href={this.prefillSurveyLink()} target="_blank" rel="noopener noreferrer" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)} id="ga--dictionary--give-feedback">Give feedback on this dictionary (form opens in a new tab)</a></p>
              </div>
            </main>
          </DocumentTitle>
        )
      }
    } else {
      console.log("no dictionary");
      return <div><h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">That dictionary is missing.</h2></div>;
    }
  }
}

export default Dictionary;
