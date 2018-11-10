import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import PseudoContentButton from './PseudoContentButton';
import './App.css';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';
import {
  createWordListFromMetWords,
  fetchDictionaries,
  parseWordList,
  processDictionary,
  swapKeyValueInDictionary,
  generateDictionaryEntries
} from './typey-type';

class CustomLessonSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionary: [],
      sourceWordsAndStrokes: {"the": "-T"},
      processedSourceWordsAndStrokes: {"the": "-T"},
      customWordList: '',
      myWords: ''
    }
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }

    fetchDictionaries().then((json) => {
      let sourceWordsAndStrokes = swapKeyValueInDictionary(json);
      let processedSourceWordsAndStrokes = Object.assign({}, processDictionary(sourceWordsAndStrokes));
      this.setState({
        // sourceWordsAndStrokes: sourceWordsAndStrokes,
        processedSourceWordsAndStrokes: processedSourceWordsAndStrokes
      });
    }).catch((e) => {
      console.log('Unable to load Typey Type dictionary', e)
    });

    this.addWordListToPage(this.state.myWords);
    this.setState({
      dictionary: []
    });
  }

  handleWordsForDictionaryEntries(value) {
    let result = parseWordList(value);
    if (result && result.length > 0) {
      let dictionary = generateDictionaryEntries(result, this.state.processedSourceWordsAndStrokes);
      if (dictionary && dictionary.length > 0) {
        this.setState({
          dictionary: dictionary,
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

  addWordListToPage() {
    let myWords = createWordListFromMetWords(this.props.metWords).join("\n");
    this.handleWordsForDictionaryEntries(myWords);
    this.setState({myWords: myWords});
  }

  render() {

    let filledPre = '';
    if (this.state.dictionary.length > 0) {
      filledPre = "quote ";
    }

    const dictionaryEntries = this.state.dictionary.map( (entry, index) => {
      return(
        <code key={ index }>
          {entry.phrase}{`	`}{entry.stroke}{`
`}
        </code>
      )
    });

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
            <div className="flex mr1 self-center">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="about-typey-type-for-stenographers">Create a custom lesson</h2>
              </header>
            </div>
          </div>
        </div>

          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <h3>Create a custom lesson using a list of words and their strokes</h3>
              <div className="custom-page-layout">
                <div>
                  <p>To start a custom lesson, supply a list of words and their strokes. An easy way to create a lesson is to copy columns from a spreadsheet.</p>
                  <p>See the&nbsp;&#8203;
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
                  <label htmlFor="your-material">Paste your material here:</label>
                  <textarea
                    id="your-material"
                    aria-describedby="custom-material-format"
                    className="input-textarea mw100 w-100 h-192 overflow-scroll"
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
                    >
                  </textarea>
                </div>
                <div>
                  <div className="panel p3">
                    <h2>Share your lessons</h2>
                    <p className="mb0">To help Typey Type grow even faster, be sure to add your lessons to the{' '}
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
                    <h3>Custom material format</h3>
                    <ul id="custom-material-format" className="text-small ml1 mt0 mb0">
                      <li>Each word must be on its own line.</li>
                      <li>Each word must be separated from its stroke by a "Tab" character.</li>
                      <li>If you skip strokes, multi-stroke words may count as misstrokes.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <h3>Create Plover lesson using a word list</h3>
              <div className="gtc-4fr-3fr">
                <div>
                  <label htmlFor="your-words-for-dictionary-entries">Paste a word list without strokes here to create a custom lesson using Plover theory:</label>
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
                  <pre id="js-custom-lesson-dictionary-entries" className={filledPre + "h-192 overflow-scroll mw-384 mt1 mb3"}>{dictionaryEntries}</pre>
                  <PseudoContentButton className="js-clipboard-button link-button copy-to-clipboard" dataClipboardTarget="#js-custom-lesson-dictionary-entries">Copy custom lesson to clipboard</PseudoContentButton>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-info landing-page-section">
            <div className="p3 mx-auto mw-1024">
              <h3>Revise words you have seen</h3>
              <div className="gtc-4fr-3fr">
                <div>
                  <p>{this.state.myWords && this.state.myWords.length > 0 ? "You can use these words you’ve seen to create a custom lesson:" : "Once you’ve made some progress, your words will appear here."}</p>
                  <pre
                    id="js-your-words-for-dictionary-entries"
                    className="quote h-192 overflow-scroll mw-384 mt1 mb3"
                  ><code>{this.state.myWords}</code></pre>
                  <PseudoContentButton className="js-select-all-my-words link-button js-clipboard-button copy-to-clipboard" dataClipboardTarget="#js-your-words-for-dictionary-entries">Copy your words to clipboard</PseudoContentButton>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>

      </main>
    )
  }

}

export default CustomLessonSetup;
