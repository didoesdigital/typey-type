import React, { Component } from 'react';
import { randomise } from './utils';
import { matchSplitText, parseLesson, loadPersonalPreferences, writePersonalPreferences, getLesson, fetchLessonIndex} from './typey-type';
import {
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Lessons from './Lessons';
import Header from './Header';
import Home from './Home';
import Footer from './Footer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      value: '',
      currentPhraseID: 0,
      currentPhraseMeetingSuccess: 1,
      actualText: ``,
      nextLessonPath: '',
      startTime: null,
      showStrokesInLesson: false,
      timer: null,
      totalNumberOfMatchedWords: 0,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0,
      totalNumberOfNewWordsMet: 0,
      totalNumberOfLowExposuresSeen: 0,
      totalNumberOfRetainedWords: 0,
      totalNumberOfMistypedWords: 0,
      totalNumberOfHintedWords: 0,
      disableUserSettings: false,
      metWords: {
        'the': 0,
        'and': 1
      },
      userSettings: {
        caseSensitive: true,
        retainedWords: false,
        limitNumberOfWords: 0,
        newWords: true,
        repetitions: 1,
        showStrokes: false,
        spacePlacement: 'spaceBeforeOutput',
        sortOrder: 'sortOff',
        seenWords: true
      },
      lesson: {
        sourceMaterial: [{phrase: '', stroke: ''}],
        presentedMaterial: [{phrase: '', stroke: ''}],
        settings: {
          ignoredChars: ''
        },
        title: 'Loading…', subtitle: '',
        path: ''
      },
      lessonIndex: [{
        "title": "Top 1000 English words",
        "subtitle": "",
        "category": "Collections",
        "subcategory": "",
        "path": process.env.PUBLIC_URL + "/drills/google-1000-english/lesson.txt"
      }]
    };
  }

  componentDidMount() {
    let [metWords, userSettings] = loadPersonalPreferences();
    this.setState({
      metWords: metWords,
      userSettings: userSettings
    });

    fetchLessonIndex().then((json) => this.setState({ lessonIndex: json }))
  }

  handleStopLesson(event) {
    event.preventDefault();
    this.stopLesson();
  }

  stopLesson() {
    this.stopTimer();
    writePersonalPreferences(this.state.userSettings, this.state.metWords);
    this.setState({
      actualText: '',
      currentPhraseID: this.state.lesson.presentedMaterial.length,
      disableUserSettings: false,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0
    }, () => {
      this.stopTimer();
    });
  }

  startTimer() {
    this.intervalID = window.setInterval(this.updateWPM.bind(this), 1000);
  }

  stopTimer() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  updateWPM() {
    this.setState({
      timer: new Date() - this.state.startTime
    });
  }

  handleLimitWordsChange(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = "limitNumberOfWords"
    const value = event;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
    });
    return value;
  }

  handleRepetitionsChange(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = "repetitions"
    const value = event;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
    });
    return value;
  }

  changeShowStrokesInLesson(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({showStrokesInLesson: value});
    const element = document.getElementById('your-typed-text');
    if (element) { element.focus(); }
    return value;
  }

  changeUserSetting(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
    });
    return value;
  }

  changeSortOrderUserSetting(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = 'sortOrder'
    const value = event.target.value;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
    });
    return value;
  }

  changeSpacePlacementUserSetting(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const name = 'spacePlacement'
    const value = event.target.value;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      if (!(name === 'caseSensitive')) {
        this.setupLesson();
      }
    });
    return value;
  }

  setupLesson() {
    let currentLesson = this.state.lesson;
    let newLesson = Object.assign({}, currentLesson);
    newLesson.presentedMaterial = newLesson.sourceMaterial.map(line => ({...line}));

    this.stopTimer();

    newLesson.presentedMaterial = sortLesson.call(this, newLesson.presentedMaterial);
    newLesson.presentedMaterial = filterByFamiliarity.call(this, newLesson.presentedMaterial, this.state.metWords, this.state.userSettings);

    if (this.state.userSettings.limitNumberOfWords > 0) {
      newLesson.presentedMaterial = newLesson.presentedMaterial.slice(0, this.state.userSettings.limitNumberOfWords);
    }

    let reps = this.state.userSettings.repetitions;
    let repeatedLesson = newLesson.presentedMaterial;
    if (reps > 0) {
      for (let i = 1; i < reps && i < 30; i++) {
        repeatedLesson = repeatedLesson.concat(newLesson.presentedMaterial);
      }
    }
    newLesson.presentedMaterial = repeatedLesson;

    this.setState({
      actualText: ``,
      currentPhraseMeetingSuccess: this.state.userSettings.showStrokes ? 0 : 1,
      disableUserSettings: false,
      numberOfMatchedChars: 0,
      startTime: null,
      timer: null,
      totalNumberOfMatchedChars: 0,
      totalNumberOfMatchedWords: 0,
      totalNumberOfNewWordsMet: 0,
      totalNumberOfLowExposuresSeen: 0,
      totalNumberOfRetainedWords: 0,
      totalNumberOfMistypedWords: 0,
      totalNumberOfHintedWords: 0,
      lesson: newLesson,
      currentPhraseID: 0
    });
  }

  handleLesson(path) {
    getLesson(path).then((lessonText) => {
      let lesson = parseLesson(lessonText, path);
      this.setState({
        lesson: lesson,
        currentPhraseID: 0
      }, () => {
        this.setupLesson();
      });
    });
  }

  restartLesson(event) {
    event.preventDefault();
    this.setState({
      currentPhraseID: 0
    }, () => {
      this.stopLesson();
      this.setupLesson();
    });
    const element = document.getElementById('your-typed-text');
    if (element) { element.focus(); }
  }

  updateMarkup(event) {
    const actualText = event.target.value;

    if (this.state.startTime === null) {
      this.setState({
        startTime: new Date(),
        timer: 0,
        disableUserSettings: true
      });
      this.startTimer();
    }

    // This informs word count, WPM, moving onto next phrase, ending lesson
    // eslint-disable-next-line
    let [matchedChars, unmatchedChars, _, unmatchedActual] =
      matchSplitText(this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase, actualText, this.state.lesson.settings, this.state.userSettings);

    matchedChars = matchedChars.replace(new RegExp(this.state.lesson.settings.ignoredChars,'g'), '');

    let [numberOfMatchedChars, numberOfUnmatchedChars] = [matchedChars, unmatchedChars].map(text => text.length);

    var newState = {
      numberOfMatchedChars: numberOfMatchedChars,
      totalNumberOfMatchedWords: (this.state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
      totalNumberOfNewWordsMet: this.state.totalNumberOfNewWordsMet,
      totalNumberOfLowExposuresSeen: this.state.totalNumberOfLowExposuresSeen,
      totalNumberOfRetainedWords: this.state.totalNumberOfRetainedWords,
      totalNumberOfMistypedWords: this.state.totalNumberOfMistypedWords,
      totalNumberOfHintedWords: this.state.totalNumberOfHintedWords,
      actualText: actualText,
      metWords: this.state.metWords
    };

    if (unmatchedActual.length > 0) {
      newState.currentPhraseMeetingSuccess = 0;
    }

    if (numberOfUnmatchedChars === 0) {
      newState.totalNumberOfMatchedChars = this.state.totalNumberOfMatchedChars + numberOfMatchedChars;
      newState.actualText = '';
      newState.showStrokesInLesson = false;
      newState.currentPhraseID = this.state.currentPhraseID + 1;

      if (this.state.userSettings.showStrokes || this.state.showStrokesInLesson) {
        newState.totalNumberOfHintedWords = this.state.totalNumberOfHintedWords + 1;
      }
      else if (this.state.currentPhraseMeetingSuccess === 0) {
        newState.totalNumberOfMistypedWords = this.state.totalNumberOfMistypedWords + 1;
      }
      else if (this.state.currentPhraseMeetingSuccess === 1) {
        const meetingsCount = newState.metWords[actualText] || 0;
        Object.assign(newState, increaseMetWords.call(this, meetingsCount));
        newState.metWords[actualText] = this.state.currentPhraseMeetingSuccess + meetingsCount;
      }
      newState.currentPhraseMeetingSuccess = 1;
    }

    this.setState(newState, () => {
      if (this.isFinished()) {
        this.stopLesson();
      }
    });
  }

  isFinished() {
    return (this.state.currentPhraseID === this.state.lesson.presentedMaterial.length);
  }

  render() {
    let header = <Header
      restartLesson={this.restartLesson.bind(this)}
      items={this.state.lessonIndex}
      lessonSubTitle={this.state.lesson.subtitle}
      lessonTitle={this.state.lesson.title}
      nextLessonPath={this.state.nextLessonPath}
      onChange={(ev, value) => {
      this.setState({
      value: ev.target.value
      })}}
      onSelect={(value, item) => this.setState({
      value: value,
      nextLessonPath: item.path
      })}
      path={this.state.lesson.path}
      settings={this.state.lesson.settings}
      handleStopLesson={this.handleStopLesson.bind(this)}
      value={this.state.value}
    />

    if (true) {
      let presentedMaterialCurrentItem = this.state.lesson.presentedMaterial[this.state.currentPhraseID] || {};
      return (
        <div className="app">
          <div>
            <Switch>
              <Route exact={true} path="/" render={(props) =>
                <div>
                  {header}
                  <Home 
                    lessonIndex={this.state.lessonIndex}
                    lesson={this.state.lesson}
                    handleLesson={this.handleLesson.bind(this)}
                    actualText={this.state.actualText}
                    changeShowStrokesInLesson={this.changeShowStrokesInLesson.bind(this)}
                    changeSortOrderUserSetting={this.changeSortOrderUserSetting.bind(this)}
                    changeSpacePlacementUserSetting={this.changeSpacePlacementUserSetting.bind(this)}
                    changeUserSetting={this.changeUserSetting.bind(this)}
                    currentPhrase={presentedMaterialCurrentItem.phrase}
                    currentStroke={presentedMaterialCurrentItem.stroke}
                    disableUserSettings={this.state.disableUserSettings}
                    handleGetLesson={this.handleLesson.bind(this)}
                    handleLimitWordsChange={this.handleLimitWordsChange.bind(this)}
                    handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
                    settings={this.state.lesson.settings}
                    showStrokesInLesson={this.state.showStrokesInLesson}
                    timer={this.state.timer}
                    totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
                    totalNumberOfNewWordsMet={this.state.totalNumberOfNewWordsMet}
                    totalNumberOfLowExposuresSeen={this.state.totalNumberOfLowExposuresSeen}
                    totalNumberOfRetainedWords={this.state.totalNumberOfRetainedWords}
                    totalNumberOfMistypedWords={this.state.totalNumberOfMistypedWords}
                    totalNumberOfHintedWords={this.state.totalNumberOfHintedWords}
                    totalWordCount={this.state.lesson.presentedMaterial.length}
                    updateMarkup={this.updateMarkup.bind(this)}
                    userSettings={this.state.userSettings}
                    {...props}
                  />
                </div>
                }
              />
              <Route path="/about" render={ () =>
                <div>
                  {header}
                  <About />
                </div>
                }
              />
              <Route path="/lessons" render={ (props) =>
                <div>
                  {header}
                  <Lessons
                    lessonIndex={this.state.lessonIndex}
                    lesson={this.state.lesson}
                    handleLesson={this.handleLesson.bind(this)}
                    actualText={this.state.actualText}
                    changeShowStrokesInLesson={this.changeShowStrokesInLesson.bind(this)}
                    changeSortOrderUserSetting={this.changeSortOrderUserSetting.bind(this)}
                    changeSpacePlacementUserSetting={this.changeSpacePlacementUserSetting.bind(this)}
                    changeUserSetting={this.changeUserSetting.bind(this)}
                    currentPhraseID={this.state.currentPhraseID}
                    currentPhrase={presentedMaterialCurrentItem.phrase}
                    currentStroke={presentedMaterialCurrentItem.stroke}
                    disableUserSettings={this.state.disableUserSettings}
                    handleGetLesson={this.handleLesson.bind(this)}
                    handleLimitWordsChange={this.handleLimitWordsChange.bind(this)}
                    handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
                    settings={this.state.lesson.settings}
                    showStrokesInLesson={this.state.showStrokesInLesson}
                    timer={this.state.timer}
                    totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
                    totalNumberOfNewWordsMet={this.state.totalNumberOfNewWordsMet}
                    totalNumberOfLowExposuresSeen={this.state.totalNumberOfLowExposuresSeen}
                    totalNumberOfRetainedWords={this.state.totalNumberOfRetainedWords}
                    totalNumberOfMistypedWords={this.state.totalNumberOfMistypedWords}
                    totalNumberOfHintedWords={this.state.totalNumberOfHintedWords}
                    totalWordCount={this.state.lesson.presentedMaterial.length}
                    updateMarkup={this.updateMarkup.bind(this)}
                    userSettings={this.state.userSettings}
                    {...props}
                  />
                </div>
                }
              />
              <Route render={ () =>
                <div>
                  <div>
                    <div className="header">
                      <nav>
                        <div role="banner" className="site-heading-banner">
                          <Link to="/" className="site-heading-link">Typey type</Link>
                        </div>
                      </nav>
                    </div>
                    <div className="p4">
                      <h1>That page doesn't exist</h1>
                      <p>Try <Link to="/">home</Link> instead.</p>
                    </div>
                  </div>
                </div>
                }
              />
            </Switch>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

function increaseMetWords(meetingsCount) {
  let newState = {};

  if (meetingsCount === 0) {
    newState.totalNumberOfNewWordsMet = this.state.totalNumberOfNewWordsMet + this.state.currentPhraseMeetingSuccess;
  }
  else if (meetingsCount >= 1 && meetingsCount <= 29) {
    newState.totalNumberOfLowExposuresSeen = this.state.totalNumberOfLowExposuresSeen + this.state.currentPhraseMeetingSuccess;
  }
  else if (meetingsCount >= 30) {
    newState.totalNumberOfRetainedWords = this.state.totalNumberOfRetainedWords + this.state.currentPhraseMeetingSuccess;
  }
  return newState;
}

function sortLesson(presentedMaterial, met = this.state.metWords, userSettings = this.state.userSettings) {
  if (userSettings.sortOrder === 'sortRandom') {
    return randomise(presentedMaterial);
  }
  else if ((userSettings.sortOrder === 'sortNew') || (userSettings.sortOrder === 'sortOld')) {

    presentedMaterial = presentedMaterial.sort(function(a, b) {
      if (!(a.phrase in met)) {
        return -1;
      }
      if (!(b.phrase in met)) {
        return 1;
      }
      return met[a.phrase] - met[b.phrase];
    });

    if (userSettings.sortOrder === 'sortOld') {
      presentedMaterial = presentedMaterial.reverse();
    }
  }
  return presentedMaterial;
}

function filterByFamiliarity(presentedMaterial, met = this.state.metWords, userSettings = this.state.userSettings) {

  var newWords = userSettings.newWords,
    seenWords = userSettings.seenWords,
    retainedWords = userSettings.retainedWords,
    spacePlacement = userSettings.spacePlacement;

  var testNewWords = function(phrase) {
    if (!(phrase in met)) {
      return true;
    } else {
      return (met[phrase] < 1);
    }
  }
  var testSeenWords = function(phrase) {
    if (!(phrase in met)) {
      return false;
    } else {
      return ((met[phrase] > 0) && (met[phrase] < 30));
    }
  }
  var testRetainedWords = function(phrase) {
    if (!(phrase in met)) {
      return false;
    } else {
      return (met[phrase] > 29);
    }
  }

  var tests = [];
  if (retainedWords) {
    tests.push(testRetainedWords);
  }
  if (seenWords) {
    tests.push(testSeenWords);
  }
  if (newWords) {
    tests.push(testNewWords);
  }

  var filterFunction = function (phrase) {
    if (spacePlacement === 'spaceBeforeOutput') {
      phrase = ' '+phrase;
    } else if (spacePlacement === 'spaceAfterOutput') {
      phrase = phrase+' ';
    }
    for (var i = 0; i < tests.length; i++) {
      if (tests[i](phrase)) {
        return true;
      };
    }
    return false;
  }

  return presentedMaterial.filter(item => filterFunction(item.phrase) );
}

const About = () => (
  <div className="p4">
    <h2>About Typey type</h2>
    <p>Typey type is a typing app designed specifically to help <a href="#about-stenography"><abbr title="stenography">stenography</abbr></a> students learn <abbr title="stenography">steno</abbr> faster. You can learn briefs and improve your stenographic speed and accuracy using tailored education options, including tight feedback loops so you learn to fix misstrokes immediately. You can effortlessly track progress in your brief vocabulary and rapid increase in steno skill.</p>

    <h3 id="about-stenography">Stenography</h3>
    <p>The process of writing shorthand is called <strong>stenography</strong>. Using a stenotype machine (or a fancy keyboard) and special software, you can type over 100 or even 200 words per minute. When you press keys together on a stenotype machine like playing a piano chord, the software translates the key combination into meaningful words according to their phonetic sounds. Plover is the world's first free, open-source stenography program. You can learn more about open steno software from the <a href="http://openstenoproject.org/">Open steno project</a>.</p>

    <h4>Steno and typey type terms</h4>
    <dl>
      <dt>Briefs</dt>
      <dd>Loosely, a brief or outline is the specified combination of keys pressed together to produce a specific word or phrase.</dd>
      <dt>Strokes</dt>
      <dd>A stroke is a combination of keys held together a released to write a word or sound. A multi-stroke brief is a combination of strokes pressed in order to produce a word or phrase (usually of more syllables).</dd>
      <dt>Plover</dt>
      <dd><a href="http://openstenoproject.org/">Plover</a> is the world's first free, open-source stenography program that works cross-platform on Windows, mac OS, and *nix operating systems.</dd>
      <dt>Spacing</dt>
      <dd>Steno software can be used to automatically insert spaces before or after words, depending on the specific software and its settings. For example, Plover inserts spaces before words by default, and has a setting to insert spaces after words, as well as providing alternative spacing and capitalisation modes that can be set on the fly to suppress spaces or insert other punctuation (like dashes). For this reason, Typey type lets you choose where spaces should appear in a phrase for checking if you typed it correctly.</dd>
      <dt>Met words</dt>
      <dd>Typey type tracks words you've "met" or "seen". Each time you successfully type a new word, that's logged as a successful meeting.</dd>
      <dt>Words per minute</dt>
      <dd>To track your typing speed, Typey type displays the number of words you've typed per minute using the unit "words per minute (WPM)", where a word is considered to be 5 letters long on average. This means you might type many short words and have a higher WPM score.</dd>
    </dl>
    <h3>Typey type notes</h3>
    <p>When you stop a lesson before reaching the end or complete a lesson, Typey type will save your progress, including all the new words you've successfully met. If you leave a lesson without stopping it or finishing it, you'll lose that lesson's progress.</p>
    <h3>FAQ</h3>
    <h4>How many new briefs should I learn per day?</h4>
    <p>5–40.</p>
    <p>Learning new briefs is like expanding your vocabulary in a new language. One rule of thumb in learning languages is to strive for 15 new words a day, conservatively, or 25 new words a day, aggressively. For one day that might not seem like much, but after a month that's about 500 new words.</p>
    <h4>How many briefs should I revise per day?</h4>
    <p>100–200.</p>

    <h3>Support</h3>
    <p>For help with Typey type, email <a href="mailto:didoesdigital+steno@gmail.com" className="link-missing-full-stop">DiDoesDigital+Steno@gmail.com</a> or <a href="https://twitter.com/didoesdigital">tweet @DiDoesDigital</a>.</p>
  </div>
)

export default App;
export {increaseMetWords, filterByFamiliarity, sortLesson};
