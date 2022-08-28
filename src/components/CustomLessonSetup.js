import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import PseudoContentButton from './PseudoContentButton';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';
import {
  parseWordList,
} from './../utils/typey-type';
import {
  generateListOfWordsAndStrokes
} from './../utils/transformingDictionaries';

class CustomLessonSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customLessonWordsAndStrokes: [],
      customWordList: '',
      dictionaryConvertedToLesson: '',
    }
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }

    if (this.props.globalLookupDictionary && this.props.globalLookupDictionary.size < 2 && !this.props.globalLookupDictionaryLoaded) {
      const shouldUsePersonalDictionaries = this.props.personalDictionaries
        && Object.entries(this.props.personalDictionaries).length > 0
        && !!this.props.personalDictionaries.dictionariesNamesAndContents;

      this.props.fetchAndSetupGlobalDict(false, shouldUsePersonalDictionaries ? this.props.personalDictionaries : null)
        .catch(error => {
          console.error(error);
          // this.showDictionaryErrorNotification();
        });
    }

    this.setState({
      customLessonWordsAndStrokes: []
    });
  }

  handleWordsForDictionaryEntries(value, globalLookupDictionary = this.props.globalLookupDictionary) {
    let result = parseWordList(value);
    if (result && result.length > 0) {
      let customLessonWordsAndStrokes = generateListOfWordsAndStrokes(result, globalLookupDictionary);
      if (customLessonWordsAndStrokes && customLessonWordsAndStrokes.length > 0) {
        this.setState({
          customLessonWordsAndStrokes: customLessonWordsAndStrokes,
          customWordList: value
        });
      }
    }
  }

  handleWordListTextAreaChange(event) {
    if (event && event.target && event.target.value) {
      this.handleWordsForDictionaryEntries(event.target.value);
    }
    return event;
  }

  handleConvertingDictionaryEntriesToLesson(text) {
    let newLesson = '';

    try {
      let parsedJSON = JSON.parse(text);

      if (parsedJSON.constructor !== {}.constructor) {
        throw new Error("This JSON does not contain an object.");
      }

      let parsedJSONKeys = Object.keys(parsedJSON);

      if (parsedJSONKeys.length < 1) {
        throw new Error("This dictionary is empty.");
      }

      if (parsedJSON && typeof parsedJSON === "object") {
        newLesson = Object.entries(parsedJSON).map(([outline, translation]) => {
          return (`${translation}	${outline}`);
        }).join('\n');
      }
    }
    catch (error) {
      // console.error(error);
    }

    this.setState({
      dictionaryConvertedToLesson: newLesson
    });
  }

  handleJSONTextAreaChange(event) {
    if (event && event.target && event.target.value) {
      this.handleConvertingDictionaryEntriesToLesson(event.target.value);
    }
    return event;
  }

  render() {
    let filledPre = '';
    if (this.state.customLessonWordsAndStrokes.length > 0) {
      filledPre = "quote ";
    }

    let validationStateStyle = "";
    let listOfValidationMessages;
    switch (this.props.customLessonMaterialValidationState) {
      case "success":
        validationStateStyle = "b-success";
        break;
      case "fail":
        validationStateStyle = "b-danger";
        let listItemsOfValidationMessages = this.props.customLessonMaterialValidationMessages.map( (entry, index) => {
          return( <li key={index}>{ entry }</li>);
        });
        listOfValidationMessages = (
          <ul id="customLessonMaterialValidationMessages" className="unstyled-list bg-danger">{listItemsOfValidationMessages}</ul>
        );
        break;
      default:
        validationStateStyle = "";
    }

    const dictionaryEntries = this.state.customLessonWordsAndStrokes.map( (entry) => {
      return( `${entry.phrase}	${entry.stroke}`)
    }).join('\n');

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="about-typey-type-for-stenographers">Create a custom lesson</h2>
              </header>
            </div>
          </div>
        </div>

          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="flex flex-wrap justify-between">
                <div className="mw-584 mt1">
                  <h3 className="mt3">Start a custom lesson</h3>
                  <div>
                    <p>To start a custom lesson, supply a list of words and their strokes. An easy way to create a lesson is to copy columns from a spreadsheet. See the&nbsp;&#8203;
                      <GoogleAnalytics.OutboundLink
                        eventLabel="community’s lessons"
                        to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        community’s lessons
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
                      </GoogleAnalytics.OutboundLink>.
                    </p>
                    <ul id="custom-material-format" className="text-small ml1 mt0 mb3">
                      <li>Each word must be on its own line.</li>
                      <li>Each word must be separated from its hint by a “Tab” e.g. <span className="pre">“<kbd>{"\u0009"}</kbd>”</span>.</li>
                      <li>If you skip strokes, multi-stroke words may count as misstrokes.</li>
                    </ul>
                    <label className="mb1" htmlFor="your-material">Enter your material here:</label>
                    <textarea
                      id="your-material"
                      aria-describedby="customLessonMaterialValidationMessages"
                      className={ "input-textarea mw100 w-100 mb3 h-168 overflow-scroll " + validationStateStyle }
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      placeholder="example	KP-PL
  consisting of	KAOFG
  examples.	KP-PLS TP-PL"
                      rows="8"
                      wrap="off"
                      onChange={this.props.createCustomLesson}
                      value={this.props.customLessonMaterial}
                      >
                    </textarea>
                    {listOfValidationMessages}
                    <div className="text-right">
                      {this.props.customLessonMaterialValidationState === "fail" ?
                        <button disabled={ true } className="link-button dib" style={{lineHeight: 2}}>Start custom lesson</button>
                          :
                        <Link to='/lessons/custom?study=practice&newWords=1&seenWords=1&retainedWords=1&sortOrder=sortOff&startFromWord=1' className="link-button dib text-right" style={{lineHeight: 2}} >Start custom lesson</Link>
                      }
                    </div>
                  </div>
                </div>
                <div className="mt1 mw-336 flex-grow">
                  <h3 className="mt3">Community lessons</h3>
                  <p>
                    Community lessons cover topics like spacing,
                    capitalisation, quotations, and using{" "}
                    <span className="steno-stroke steno-stroke--subtle px05">
                      SPWER
                    </span>{" "}
                    for “inter-” and “enter-” words. To help Typey&nbsp;Type grow even faster, add your custom lessons
                    to the{" "}
                    <GoogleAnalytics.OutboundLink
                      eventLabel="community's lessons"
                      to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      community’s <span className="whitespace-nowrap">lessons
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
                        <IconExternal
                          ariaHidden="true"
                          role="presentation"
                          iconWidth="24"
                          iconHeight="24"
                          className="ml1 svg-icon-wrapper svg-baseline"
                          iconTitle=""
                        />
                      </Tooltip></span>
                    </GoogleAnalytics.OutboundLink>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <h3>Create a lesson using a word list</h3>
              <div className="gtc-4fr-3fr">
                <div>
                  <label className="mb1" htmlFor="your-words-for-dictionary-entries">Paste a word list without strokes here to create a custom lesson (using Plover theory by default):</label>
                  <textarea
                    id="your-words-for-dictionary-entries"
                    className="input-textarea mw100 w-100 mb1 overflow-scroll"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    placeholder="capitalise
excluded
plover"
                    rows="8"
                    wrap="off"
                    onChange={this.handleWordListTextAreaChange.bind(this)}
                    >
                  </textarea>
                </div>
                <div>
                  <pre id="js-custom-lesson-dictionary-entries" className={filledPre + "h-168 overflow-scroll mw-384 mt1 mb3"}><code>{dictionaryEntries}</code></pre>
                  <PseudoContentButton className="js-clipboard-button link-button copy-to-clipboard" dataClipboardTarget="#js-custom-lesson-dictionary-entries" style={{minHeight: "2.5rem", whiteSpace: "normal", height: "initial"}}>Copy custom lesson to clipboard</PseudoContentButton>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <h3>Convert JSON to Typey Type lesson</h3>
              <div className="gtc-4fr-3fr">
                <div>
                  <label className="mb1" htmlFor="your-dictionary-entries-to-convert">Paste a JSON dictionary here to create a custom lesson:</label>
                  <textarea
                    id="your-dictionary-entries-to-convert"
                    className="input-textarea mw100 w-100 mb1 overflow-scroll"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    placeholder='{
"TEFT": "hello",
"TEFTD": "world"
}'
                    rows="8"
                    wrap="off"
                    onChange={this.handleJSONTextAreaChange.bind(this)}
                    >
                  </textarea>
                </div>
                <div>
                  <pre id="js-converted-dictionary-entries" className={filledPre + "h-168 overflow-scroll mw-384 mt1 mb3"}><code>{this.state.dictionaryConvertedToLesson}</code></pre>
                  <PseudoContentButton className="js-clipboard-button link-button copy-to-clipboard" style={{minHeight: "2.5rem", whiteSpace: "normal", height: "initial"}} dataClipboardTarget="#js-converted-dictionary-entries">Copy converted dictionary to clipboard</PseudoContentButton>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <h3>Revise words you have seen</h3>
              <div className="gtc-4fr-3fr">
                <div>
                  <p><Link to="/lessons/progress/seen">Practise your seen words in a lesson</Link>.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <div className="text-center">
                <h3>Share your lessons</h3>
                <p className="mb0">To help Typey Type grow even faster, add to the{' '}
                  <GoogleAnalytics.OutboundLink
                    aria-label="Community’s lessons (external link opens in new tab)"
                    eventLabel="community’s lessons"
                    to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    community’s lessons
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
                  </GoogleAnalytics.OutboundLink>.
                </p>{
                }
                <GoogleAnalytics.OutboundLink
                    aria-label="Community’s lessons (external link opens in new tab)"
                    eventLabel="Community’s lessons"
                    to="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button dib mt3"
                    style={{lineHeight: 2}}
                  >
                    Community’s lessons
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
                  </GoogleAnalytics.OutboundLink>
              </div>
            </div>
          </div>

      </main>
    )
  }

}

export default CustomLessonSetup;
