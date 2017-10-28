import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import { getLessons, matchLessonToTerm, sortLessons, randomise } from 'utils/utils'
import Finished from 'components/Finished';
import Header from 'components/Header';
import Typing from 'components/Typing';
import {matchSplitText, parseLesson} from 'utils/typey-type';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.charsPerWord = 5;
    this.state = {
      value: '',
      path: '',
      currentPhraseID: 0,
      actualText: ``,
      startTime: null,
      timer: null,
      totalNumberOfMatchedWords: 0,
      numberOfMatchedChars: 0,
      totalNumberOfMatchedChars: 0,
      userSettings: {
        showStrokes: true,
        randomise: false,
        repetitions: 1
      },
      lesson: {
        sourceMaterial: [{phrase: '', stroke: ''}],
        presentedMaterial: [{phrase: '', stroke: ''}],
        settings: {
          caseSensitive: true,
          requireSpaces: false,
          noticeSpaces: false,
          ignoredChars: '',
          spacePlacement: 'Before Output'
        },
        title: 'Loading…', subtitle: 'Loading…'
      }
    };
  }

  componentDidMount() {
    this.getLesson().then((lessonText) => {
      let lesson = parseLesson(lessonText);
      if (this.state.userSettings.randomise) {
        lesson.presentedMaterial = randomise(lesson.sourceMaterial);
      }

      let reps = this.state.userSettings.repetitions;
      if (reps > 0) {
        for (let i = 1; i < reps && i < 30; i++) {
          newLesson.presentedMaterial = newLesson.presentedMaterial.concat(newLesson.sourceMaterial);
        }
      }

      this.setState({ lesson: lesson });
      this.setState({ currentPhraseID: 0 });
    });
  }

  getLesson(lessonFile = '/lesson-one.txt') {
    return fetch(lessonFile, {
      method: "GET",
      credentials: "same-origin"
    }).then((response) => {
      return response.text();
    }, function(error) {
      console.log(error);
      return error.message;
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

  changeUserSetting(event) {
    let currentState = this.state.userSettings;
    let newState = Object.assign({}, currentState);

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    newState[name] = value;

    this.setState({userSettings: newState}, () => {
      this.generateNewLesson();
    });
    return value;
  }

  generateNewLesson() {
    let currentLesson = this.state.lesson;
    let newLesson = Object.assign({}, currentLesson);
    newLesson.presentedMaterial = newLesson.sourceMaterial.map(line => ({...line}));

    if (this.state.userSettings.randomise) {
      newLesson.presentedMaterial = randomise(newLesson.presentedMaterial);
    }

    let reps = this.state.userSettings.repetitions;
    if (reps > 0) {
      for (let i = 1; i < reps && i < 30; i++) {
        newLesson.presentedMaterial = newLesson.presentedMaterial.concat(newLesson.sourceMaterial);
      }
    }

    this.setState({ lesson: newLesson });
    this.setState({ currentPhraseID: 0 });
  }

  handleLesson(event) {
    this.getLesson(event.target.href).then((lessonText) => {
      var lesson = parseLesson(lessonText);
      this.stopTimer();
      this.setState({
        lesson: lesson,
        currentPhraseID: 0,
        actualText: ``,
        startTime: null,
        timer: null,
        totalNumberOfMatchedWords: 0,
        numberOfMatchedChars: 0,
        totalNumberOfMatchedChars: 0
      });
    });
    event.preventDefault();
  }

  updateMarkup(event) {
    const actualText = event.target.value;

    if (this.state.startTime === null) {
      this.setState({
        startTime: new Date(),
        timer: 0
      });
      this.startTimer();
    }

    let [numberOfMatchedChars, numberOfUnmatchedChars] =
      matchSplitText(this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase, actualText, this.state.lesson.settings)
      .map(text => text.length);

    var newState = {
      numberOfMatchedChars: numberOfMatchedChars,
      totalNumberOfMatchedWords: (this.state.totalNumberOfMatchedChars + numberOfMatchedChars) / this.charsPerWord,
      actualText: actualText
    };

    if (numberOfUnmatchedChars === 0) {
      newState.totalNumberOfMatchedChars = this.state.totalNumberOfMatchedChars + numberOfMatchedChars;
      newState.actualText = '';
      newState.currentPhraseID = this.state.currentPhraseID + 1;
    }

    this.setState(newState, () => {
      if (this.isFinished()) {
        this.stopTimer();
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
            lessonSubTitle={this.state.lesson.subtitle}
            lessonTitle={this.state.lesson.title}
            getLesson={this.handleLesson.bind(this)}
            settings={this.state.lesson.settings}
          />
          <div className="main">
            <Finished
              actualText={this.state.actualText}
              getLesson={this.handleLesson.bind(this)}
              settings={this.state.lesson.settings}
              userSettings={this.state.userSettings}
              changeUserSetting={this.changeUserSetting.bind(this)}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
              />
          </div>
        </div>
      );
    } else {
      return (
        <div className="app">
          <label htmlFor="lessons-autocomplete">Choose a lesson</label>
          <Autocomplete
            renderItem={(item, highlighted) =>
              <div
                key={item.path}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
              >
                <h5>{item.title}</h5>
                <h6>{item.subtitle}</h6>
                {item.category} >&nbsp;
                {item.subcategory}
              </div>
            }
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
            onSelect={(value, item) => this.setState({
              value: value,
              path: item.path
            })}

            menuStyle={{
              borderRadius: '8px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
              background: 'rgba(255,255,255,1)',
              padding: '2px 0',
              fontSize: '90%',
              position: 'fixed',
              overflow: 'auto',
              maxHeight: '100%',
            }}
            inputProps={{ id: 'lessons-autocomplete' }}
            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
            items={getLessons()}
            getItemValue={(item) => item.title}
            shouldItemRender={matchLessonToTerm}
            sortItems={sortLessons}
          />
          <a href={this.state.path} onClick={this.handleLesson.bind(this)}>Search</a>
          <Header
            getLesson={this.handleLesson.bind(this)}
            lessonSubTitle={this.state.lesson.subtitle}
            lessonTitle={this.state.lesson.title}
            settings={this.state.lesson.settings}
          />
          <div>
            <Typing
              actualText={this.state.actualText}
              changeUserSetting={this.changeUserSetting.bind(this)}
              currentPhrase={this.state.lesson.presentedMaterial[this.state.currentPhraseID].phrase}
              currentStroke={this.state.lesson.presentedMaterial[this.state.currentPhraseID].stroke}
              getLesson={this.handleLesson.bind(this)}
              settings={this.state.lesson.settings}
              timer={this.state.timer}
              totalNumberOfMatchedWords={this.state.totalNumberOfMatchedWords}
              updateMarkup={this.updateMarkup.bind(this)}
              userSettings={this.state.userSettings}
              />
          </div>
        </div>
      );
    }
  }
}

export default App;
