import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAnalytics from 'react-ga';
import CustomJSONLesson from "./CustomJSONLesson";
import CustomWordListLesson from './CustomWordListLesson';
import CustomShareLessons from "./CustomShareLessons";
import { IconExternal } from '../../components/Icon';
import { Tooltip } from 'react-tippy';
import {
  parseWordList,
} from '../../utils/typey-type';
import {
  generateListOfWordsAndStrokes
} from '../../utils/transformingDictionaries';

class CustomLessonSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customLessonWordsAndStrokes: [],
      customWordList: '',
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

  render() {
    const { customLessonWordsAndStrokes } = this.state;

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

    const {
      createCustomLesson,
      customLessonMaterial,
      setAnnouncementMessage
    } = this.props;

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
                          onShow={setAnnouncementMessage}
                        >
                          <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                        </Tooltip>
                      </GoogleAnalytics.OutboundLink>.
                    </p>
                    <ul id="custom-material-format" className="text-small ml1 mt0 mb3">
                      <li>Each word must be on its own line.</li>
                      <li>Each word must be separated from its hint by a “Tab” e.g. <span className="whitespace-pre">“<kbd>{"\u0009"}</kbd>”</span>.</li>
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
                      onChange={createCustomLesson}
                      value={customLessonMaterial}
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
                        onShow={setAnnouncementMessage}
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
            <CustomWordListLesson
              customLessonWordsAndStrokes={customLessonWordsAndStrokes}
              handleWordListTextAreaChange={this.handleWordListTextAreaChange.bind(this)}
            />
          </div>

          <div className="bg-info landing-page-section">
            <CustomJSONLesson />
          </div>

          <div className="bg-white landing-page-section">
            <CustomShareLessons
              setAnnouncementMessage={setAnnouncementMessage}
            />
          </div>

      </main>
    )
  }

}

export default CustomLessonSetup;
