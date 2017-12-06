import React, { Component } from 'react';
import { randomise } from './utils';
import { matchSplitText, parseLesson, loadPersonalPreferences, writePersonalPreferences, getLesson, fetchLessonIndex, isFirstVisit} from './typey-type';
import {
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Lessons from './Lessons';
import Finished from './Finished';
import Header from './Header';
import Footer from './Footer';
import Typing from './Typing';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      value: '',
      path: process.env.PUBLIC_URL + '/lessons/drills/google-1000-english/lesson.txt',
      currentPhraseID: 0,
      currentPhraseMeetingSuccess: 1,
      actualText: ``,
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
        title: 'Loading…', subtitle: 'Loading…'
      },
      lessonIndex: [{
        "title": "Top 1000 English words",
        "subtitle": "",
        "category": "Collections",
        "subcategory": "",
        "path": process.env.PUBLIC_URL + "/lessons/drills/google-1000-english/lesson.txt"
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

    this.handleLesson();
  }

  handleStopLesson(event) {
    this.stopLesson();
    event.preventDefault();
  }

  stopLesson() {
    this.stopTimer();
    writePersonalPreferences(this.state.userSettings, this.state.metWords);
    this.setState({
      actualText: ``,
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
    clearInterval(this.intervalID);
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

    this.setState({
      currentPhraseMeetingSuccess: this.state.userSettings.showStrokes ? 0 : 1,
      numberOfMatchedChars: 0,
      startTime: null,
      timer: null,
      totalNumberOfMatchedChars: 0,
      totalNumberOfMatchedWords: 0,
      totalNumberOfNewWordsMet: 0,
      totalNumberOfLowExposuresSeen: 0,
      totalNumberOfRetainedWords: 0,
      totalNumberOfMistypedWords: 0,
      totalNumberOfHintedWords: 0
    });

    newLesson.presentedMaterial = sortLesson.call(this, newLesson.presentedMaterial);
    newLesson.presentedMaterial = filterByFamiliarity.call(this, newLesson.presentedMaterial);

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

    this.setState({ lesson: newLesson });
    this.setState({ currentPhraseID: 0 });
  }

  handleLesson(path) {
    if (path === this.state.path) {return;}
    console.log("handlelesson");
    console.log(path);
    getLesson(path || this.state.path).then((lessonText) => {
      let lesson = parseLesson(lessonText);
      this.setState({
        lesson: lesson,
        currentPhraseID: 0
      }, () => {
        this.setupLesson();
      });
    });
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
    if (this.isFinished()) {
      return (
        <div className="app">
          <Header
            handleGetLesson={this.handleLesson.bind(this)}
            items={this.state.lessonIndex}
            lessonSubTitle={this.state.lesson.subtitle}
            lessonTitle={this.state.lesson.title}
            onChange={(ev, value) => {
            this.setState({
              value: ev.target.value
            })}}
            onSelect={(value, item) => this.setState({
              value: value,
              path: item.path
            })}
            path={this.state.path}
            settings={this.state.lesson.settings}
            handleStopLesson={this.handleStopLesson.bind(this)}
            value={this.state.value}
          />
          <div className="main">
            <Finished
              actualText={this.state.actualText}
              changeSortOrderUserSetting={this.changeSortOrderUserSetting.bind(this)}
              changeSpacePlacementUserSetting={this.changeSpacePlacementUserSetting.bind(this)}
              changeUserSetting={this.changeUserSetting.bind(this)}
              disableUserSettings={this.state.disableUserSettings}
              handleGetLesson={this.handleLesson.bind(this)}
              handleLimitWordsChange={this.handleLimitWordsChange.bind(this)}
              handleRepetitionsChange={this.handleRepetitionsChange.bind(this)}
              settings={this.state.lesson.settings}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
              totalNumberOfNewWordsMet={this.state.totalNumberOfNewWordsMet}
              totalNumberOfLowExposuresSeen={this.state.totalNumberOfLowExposuresSeen}
              totalNumberOfRetainedWords={this.state.totalNumberOfRetainedWords}
              totalNumberOfMistypedWords={this.state.totalNumberOfMistypedWords}
              totalNumberOfHintedWords={this.state.totalNumberOfHintedWords}
              totalWordCount={this.state.lesson.presentedMaterial.length}
              userSettings={this.state.userSettings}
              />
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="app">
          <Header
            handleGetLesson={this.handleLesson.bind(this)}
            items={this.state.lessonIndex}
            lessonSubTitle={this.state.lesson.subtitle}
            lessonTitle={this.state.lesson.title}
            onChange={(ev, value) => {
            this.setState({
              value: ev.target.value
            })}}
            onSelect={(value, item) => this.setState({
              value: value,
              path: item.path
            })}
            path={this.state.path}
            settings={this.state.lesson.settings}
            handleStopLesson={this.handleStopLesson.bind(this)}
            value={this.state.value}
          />
          <div>
            <Switch>
              <Route exact={true} path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/lessons" render={ (props) =>
                  <Lessons data={this.state.lessonIndex}
                    handleLesson={this.handleLesson.bind(this)}
                {...props} />
              } />
            </Switch>
            <Typing
              actualText={this.state.actualText}
              changeShowStrokesInLesson={this.changeShowStrokesInLesson.bind(this)}
              changeSortOrderUserSetting={this.changeSortOrderUserSetting.bind(this)}
              changeSpacePlacementUserSetting={this.changeSpacePlacementUserSetting.bind(this)}
              changeUserSetting={this.changeUserSetting.bind(this)}
              currentPhrase={this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase}
              currentStroke={this.state.lesson.presentedMaterial[this.state.currentPhraseID].stroke}
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
              />
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
    retainedWords = userSettings.retainedWords;

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
    for (var i = 0; i < tests.length; i++) {
      if (tests[i](phrase)) {
        return true;
      };
    }
    return false;
  }

  return presentedMaterial.filter(item => filterFunction(item.phrase) );
}

const Home = () => {
  if (isFirstVisit()) {
    return (
      <div>
        <h2>Welcome to Typey type for stenographers</h2>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Welcome back</h2>
      </div>
    )
  }
}

const About = () => (
  <div>
    <h2>About</h2>
<p>The process of writing shorthand is called stenography. Using a stenotype machine, you can type over 100 or even 200 words per minute. For a real overview, see the Open steno project.</p>

<p>Plover is the world's first free, open-source stenography program, which translates chorded key strokes into meaningful words.</p>
<p>Note: The words per minute score is an estimate, assuming 5 characters per word.</p>
  </div>
)

// const Lesson = ({ match }) => (
//   <div>
//     <h3>{match.params.lessonId}</h3>
//   </div>
// )

// const Lessons = ({ match }) => (
//   <div>
//     <h2>Lessons</h2>
//   </div>
// )

export default App;
export {increaseMetWords, filterByFamiliarity, sortLesson};
