import React, { Component } from 'react';
import LessonCanvasFooter from './LessonCanvasFooter';
import UserSettings from './UserSettings';
import { IconRestart } from './Icon';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import { stitchTogetherLessonData, transformLessonDataToChartData } from '../utils/transformingFinishedData'
import DisplayMetric from './DisplayMetric'
import FinishedSpeedChart from './FinishedSpeedChart'
import ErrorBoundary from './ErrorBoundary'
import * as Confetti from './../utils/confetti';
import 'react-tippy/dist/tippy.css'

let particles = [];

const FinishedHeroData = ({ speed, accuracy, setAnnouncementMessage }) => {
  return (
    <div className="flex flex-wrap justify-between justify-center mx-auto mb3">
      <DisplayMetric
        setAnnouncementMessage={setAnnouncementMessage}
        size={"L"}
        value={speed}
        label={"Words per minute"}
        tooltipMessage={"Assuming a word is 5 characters"}
      />
      <DisplayMetric
        setAnnouncementMessage={setAnnouncementMessage}
        size={"L"}
        value={accuracy}
        valueSuffix={"%"}
        label={"Accuracy"}
        tooltipMessage={"Assuming accurate words are typed within stroke count targets"}
      />
    </div>
  );
};

const SecondaryDisplayMetrics = ({
  newWords,
  seen,
  memorised,
  hinted,
  misstrokes,
  wordsTyped,
  setAnnouncementMessage
}) => {
  return (
    <div className="flex flex-wrap justify-between justify-center mx-auto mb3">
      <DisplayMetric
        setAnnouncementMessage={setAnnouncementMessage}
        size={"M"}
        value={newWords}
        label={"New"}
        tooltipMessage={"Words you’ve now typed correctly without a hint"}
      />
      <DisplayMetric
        setAnnouncementMessage={setAnnouncementMessage}
        size={"M"}
        value={seen}
        label={"Seen"}
        tooltipMessage={"Words you’ve seen before"}
      />
      <DisplayMetric
        setAnnouncementMessage={setAnnouncementMessage}
        size={"M"}
        value={memorised}
        label={"From memory"}
        tooltipMessage={"Words you’ve now typed 30 times or more"}
      />
      <DisplayMetric
        setAnnouncementMessage={setAnnouncementMessage}
        size={"M"}
        value={hinted}
        label={"Hinted"}
        tooltipMessage={"Words you typed with the hint shown"}
      />
      <DisplayMetric
        setAnnouncementMessage={setAnnouncementMessage}
        size={"M"}
        value={misstrokes}
        label={"Misstrokes"}
        tooltipMessage={"Words you mistyped or took more strokes than the target number"}
      />
      <DisplayMetric
        setAnnouncementMessage={setAnnouncementMessage}
        size={"M"}
        value={wordsTyped}
        label={"Typed"}
        tooltipMessage={"Each Typey Type word or phrase typed"}
      />
    </div>
  );
};

class Finished extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasWidth: Math.floor(window.innerWidth),
      canvasHeight: Math.floor(window.innerHeight),
      newTopSpeedPersonalBest: false,
      newTopSpeedToday: false,
      chartData: null
    }
  }

  componentDidMount() {
    let wpm = this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords);

    const lessonData = stitchTogetherLessonData(this.props.currentLessonStrokes, this.props.startTime, wpm);
    this.setState({chartData: transformLessonDataToChartData(lessonData)})

    let fasterSpeedToday = wpm > this.props.topSpeedToday;
    let fasterPersonalBest = wpm > this.props.topSpeedPersonalBest;
    let minimumStrokes = this.props.currentLessonStrokes.length > 3;
    let minimumSpeed = wpm > 3;
    let thirtyStrokesOrNotRevision = (!this.props.revisionMode || this.props.currentLessonStrokes.length >= 30);

    if (fasterSpeedToday && minimumStrokes && minimumSpeed && thirtyStrokesOrNotRevision && fasterPersonalBest) {
      Confetti.setupCanvas({sparsity: 17, colors: 5}, 'finished-heading', particles);
      this.props.updateTopSpeedToday(wpm);
      this.props.updateTopSpeedPersonalBest(wpm);
      Confetti.restartAnimation(particles, this.refs.canvas, this.state.canvasWidth, this.state.canvasHeight);
      this.setState({
        newTopSpeedPersonalBest: true,
        newTopSpeedToday: true
      });
    }
    else if (fasterSpeedToday && minimumStrokes && minimumSpeed && thirtyStrokesOrNotRevision) {
      Confetti.setupCanvas({sparsity: 170, colors: 2}, 'finished-heading', particles);
      this.props.updateTopSpeedToday(wpm);
      Confetti.restartAnimation(particles, this.refs.canvas, this.state.canvasWidth, this.state.canvasHeight);
      this.setState({
        newTopSpeedPersonalBest: false,
        newTopSpeedToday: true
      });
    }
    else {
      this.setState({
        newTopSpeedPersonalBest: false,
        newTopSpeedToday: false
      });
    }

    if (this.finishedHeading) {
      this.finishedHeading.focus();
    }
  }

  isEmpty() {
    return (this.props.lessonLength === 0);
  }

  calculateScores(timer, totalNumberOfMatchedWords) {
    let wordsPerMinute;
    if (this.props.timer > 0) {
      wordsPerMinute = Math.round(totalNumberOfMatchedWords/(timer/60/1000));
    } else {
      wordsPerMinute = 0;
    }
    return wordsPerMinute;
  }

  restartConfetti(event) {
    if (event && ((event.keyCode && event.keyCode === 13) || event.type === "click")) {
      particles.splice(0);
      Confetti.cancelAnimation();
      if (this.state.newTopSpeedToday && this.state.newTopSpeedPersonalBest) {
        Confetti.setupCanvas({sparsity: 17, colors: 5}, 'finished-heading', particles);
      }
      else if (this.state.newTopSpeedToday) {
        Confetti.setupCanvas({sparsity: 170, colors: 2}, 'finished-heading', particles);
      }
      Confetti.restartAnimation(particles, this.refs.canvas, this.state.canvasWidth, this.state.canvasHeight);
    }
  }

  prefillSurveyLink() {
    // fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=lesson&entry.1202724812&entry.936119214";
    let googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690="
    let param = "&entry.1202724812&entry.936119214";
    let prefillLesson = '';
    if (this.props.location && this.props.location.pathname) {
      prefillLesson = this.props.location.pathname;
    }
    if (this.surveyLink) {
      this.surveyLink.href = googleFormURL + encodeURIComponent(prefillLesson) + param;
    }
  }

  render() {
    let customMessage;
    let numericAccuracy = 0;
    let accuracy = '';
    let currentLessonStrokes = this.props.currentLessonStrokes;
    // console.log(currentLessonStrokes);

    let misstrokesSummary = '';
    let strokeAttemptsPresentation;

    let wordsTyped = '';

    if (this.props.currentLessonStrokes && this.props.currentLessonStrokes.length >= 0) {
      let pluralisedString = '' + this.props.currentLessonStrokes.length + ' words typed';

      if (this.props.currentLessonStrokes.length === 1) {
        pluralisedString = '' + this.props.currentLessonStrokes.length + ' word typed';
      }

      wordsTyped = (
        <span className="nowrap">{pluralisedString}</span>
      );
    }

    if (currentLessonStrokes.length > 0) {
      let listOfPossibleStrokeImprovements = currentLessonStrokes.map( (phrase, i) => {
        let strokeAttempts = phrase.attempts.map( ( {text, time}, j ) => {
          return(
              <li key={ j } className="nowrap di ml1"><span className="bg-warning px1">{text}</span></li>
          );
        });
        if (phrase.attempts.length > 0) {
          // We use a "punctuation space" before "You wrote" to separate it from previous phrase.
          // Test this by copying and pasting the material phrase and misstrokes text e.g. "stop You wrote: staph"
          strokeAttemptsPresentation = (
            <span>
              <p className="visually-hidden di"><span className="visually-hidden">&#8200;You wrote: </span></p>
              <ol className="unstyled-list mb0 di">
                {strokeAttempts}
              </ol>
            </span>
          );
        } else {
          strokeAttemptsPresentation = [];
        }
        return(
          <li key={ i } className="unstyled-list-item bg-slat p1 mb1 overflow-scroll">
            <label className="checkbox-label mt0 mb1">
              <input
                className="checkbox-input"
                type="checkbox"
                name={ i + "-checkbox" }
                id={ i + "-checkbox" }
                checked={this.props.currentLessonStrokes[i].checked}
                onChange={this.props.updateRevisionMaterial}
                />
                <span className="matched steno-material px1 nowrap">{phrase.word}</span>
            </label>
            {strokeAttemptsPresentation}
            <p className="pl3 mb0"><span className="visually-hidden text-small">Hint: </span><span className="steno-stroke steno-stroke--subtle text-small px1 py05">{phrase.stroke.split('').map((item, i)=><kbd className="raw-steno-key raw-steno-key--subtle text-small" key={i}>{item}</kbd>)}</span></p>
          </li>
        );
      });

      misstrokesSummary = (
        <React.Fragment>
          <div>
            <h4 className="mt3 nowrap">Possible stroke improvements</h4>
            <p>
              <a href={this.props.path} onClick={this.props.reviseLesson} role="button">
                Revise these words</a>
            </p>
            <ol className="mb0 unstyled-list">{listOfPossibleStrokeImprovements}</ol>
          </div>
          <p>
            <a href={this.props.path} onClick={this.props.reviseLesson} role="button">
              Revise these words</a>
          </p>
        </React.Fragment>
      );
    }

    if (this.props.totalNumberOfMistypedWords === 0 && this.props.totalNumberOfHintedWords === 0) {
      accuracy = '100% accurate!';
      numericAccuracy = 100;
    }
    else if (this.props.totalNumberOfMistypedWords > 0) {
      // console.log("this.props.totalNumberOfNewWordsMet" + this.props.totalNumberOfNewWordsMet);
      // console.log("this.props.totalNumberOfLowExposuresSeen" + this.props.totalNumberOfLowExposuresSeen);
      // console.log("this.props.totalNumberOfRetainedWords" + this.props.totalNumberOfRetainedWords);
      // console.log("this.props.totalNumberOfHintedWords" + this.props.totalNumberOfHintedWords);
      // console.log("this.props.totalNumberOfMistypedWords" + this.props.totalNumberOfMistypedWords);
      //
      // Test for stopping the lesson before the end
      let accuracyPercent;
      if (this.props.currentLessonStrokes && this.props.currentLessonStrokes.length > 0) { // avoid division by zero
        accuracyPercent = (1 - ((this.props.totalNumberOfMistypedWords) / this.props.currentLessonStrokes.length)) * 100;
      } else { // this should never happen because first `if` code path handles zero state
        accuracyPercent = 100.0;
      }
      // console.log("Accuracy percent: " + accuracyPercent);
      let accuracyPercentRoundedToTwoDecimalPlaces = (Math.floor(accuracyPercent * 100) / 100);
      // console.log("Accuracy percent rounded: " + accuracyPercentRoundedToTwoDecimalPlaces);
      accuracy = '' + accuracyPercentRoundedToTwoDecimalPlaces + '% accuracy';
      numericAccuracy = accuracyPercentRoundedToTwoDecimalPlaces;
    }
    else if (this.props.totalNumberOfHintedWords >= 1) {
      accuracy = accuracy + '100% accurate! ';
      numericAccuracy = 100;
    }
    else {
      accuracy = ' Keep it up!';
      numericAccuracy = 0;
    }

    let hints = "0 hints";
    if (this.props.totalNumberOfHintedWords === 1) {
      hints = this.props.totalNumberOfHintedWords + " hint";
    }
    else if (this.props.totalNumberOfHintedWords > 1) {
      hints = this.props.totalNumberOfHintedWords + " hints";
    }

    // When you have stroked nothing right, except hinted or misstroked words, show nothing instead of 0%
    if (accuracy === '0% accuracy!') {
      accuracy = '';
      numericAccuracy = 0;
    }
    let emptyAndZeroStateMessage = '';
    let wpm = this.calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords);
    if (wpm === 0) {
      accuracy = 'Keep trying!';
      numericAccuracy = 0;
    }

    let wpmCommentary = '';
    if (wpm > 5000) {
      wpmCommentary = 'Faster than you can think…';
    } else if (wpm > 1500) {
      wpmCommentary = 'Faster than a speed reader!';
    } else if (wpm > 300) {
      wpmCommentary = 'Faster than you can read!';
    } else if (wpm > 250) {
      wpmCommentary = 'As fast as an auctioneer!';
    } else if (wpm > 225) {
      wpmCommentary = 'Faster than a pro stenographer!';
    } else if (wpm > 160) {
      wpmCommentary = 'Faster than a stenographer!';
    } else if (wpm > 150) {
      wpmCommentary = 'Faster than you can talk!';
    } else if (wpm > 100) {
      wpmCommentary = 'Faster than a stenotype student!';
    } else if (wpm > 80) {
      wpmCommentary = 'Faster than a pro typist!';
    } else if (wpm > 60) {
      wpmCommentary = 'Faster than a good QWERTY typist!';
    } else if (wpm > 40) {
      wpmCommentary = 'Faster than your average typist!';
    } else if (wpm > 27) {
      wpmCommentary = 'Faster than hunt and peck typists';
    } else if (wpm > 22) {
      wpmCommentary = 'Faster than Morse code';
    } else if (wpm > 20) {
      wpmCommentary = 'Faster than handwriting';
    } else {
      wpmCommentary = 'Practice this lesson again';
    }

    let newTopSpeedSectionOrFinished = "Finished: " + this.props.lessonTitle;

    if (this.state.newTopSpeedToday && this.state.newTopSpeedPersonalBest && wpm > 3) {
      newTopSpeedSectionOrFinished = "New personal best!";
      wpmCommentary = this.props.lessonTitle;
    }
    else if (this.state.newTopSpeedToday && !this.state.newTopSpeedPersonalBest && wpm > 3) {
      newTopSpeedSectionOrFinished = "New top speed for today!";
      wpmCommentary = this.props.lessonTitle;
    }

    let lessonSummary = (
      <div className="finished-lesson mx-auto mw-1440">
        <div className="finished-summary mb3 text-center">
          <h3
            className="negative-outline-offset dib text-center mt3"
            ref={(finishedHeading) => { this.finishedHeading = finishedHeading; }}
            tabIndex="-1"
            id="finished-heading"
            onClick={this.restartConfetti.bind(this)}
            onKeyDown={this.restartConfetti.bind(this)}
          >
            {newTopSpeedSectionOrFinished}
          </h3>
          <p>{wpmCommentary}</p>
          <ErrorBoundary relative={true} vanish={true}>
            <FinishedHeroData speed={wpm} accuracy={numericAccuracy} />
          </ErrorBoundary>
          <ErrorBoundary relative={true} vanish={true}>
            <a href="#chart-notes" className="skip-to-link skip-to-link--relative" id="ga--finished--skip-chart">Skip chart</a>
            {this.state.chartData?.dataPoints?.length > 1 && <FinishedSpeedChart data={this.state.chartData} />}
            <SecondaryDisplayMetrics
              newWords={this.props.totalNumberOfNewWordsMet}
              seen={this.props.totalNumberOfLowExposuresSeen}
              memorised={this.props.totalNumberOfRetainedWords}
              hinted={this.props.totalNumberOfHintedWords}
              misstrokes={this.props.totalNumberOfMistypedWords}
              wordsTyped={this.props.currentLessonStrokes?.length || 0}
              setAnnouncementMessage={this.props.setAnnouncementMessage}
            />
            <p className="text-left de-emphasized" id="chart-notes">Note: Because Typey&nbsp;Type starts recording the instant you start typing, the first word is essentially written at infinity words per minute so it’s rounded down to zero&nbsp;here.</p>
          </ErrorBoundary>
          <ul className="inline-flex flex-wrap middot-separator unstyled-list">
            <li className="ml0 bg-warning pl1 pr1">
              {wpm}&nbsp;
              <Tooltip
                animation="shift"
                arrow="true"
                className="abbr"
                duration="200"
                tabIndex="0"
                tag="abbr"
                theme="didoesdigital"
                title="words per minute"
                trigger="mouseenter focus click"
                onShow={this.props.setAnnouncementMessage}
              >WPM</Tooltip>
            </li>
            <li className="ml0">
              <span className="nowrap">{accuracy}</span>
            </li>
            <li className="ml0">
              <span className="nowrap">{hints}</span>
            </li>
            <li className="ml0">
              <span className="nowrap">{wordsTyped}</span>
            </li>
          </ul>
          <p className="mb12">
            <a href={process.env.PUBLIC_URL + this.props.path} onClick={this.props.restartLesson} className="mr3" role="button">
              <IconRestart ariaHidden="true" role="presentation" iconFill="#596091" className="mr1 svg-icon-wrapper svg-baseline" />
              Restart lesson</a>
            <Link to={this.props.suggestedNext} className="link-button dib negative-outline-offset" style={{lineHeight: 2}} role="button">
              Next lesson
            </Link>
          </p>
        </div>
        <div className="misstrokes-summary">
          {misstrokesSummary}
        </div>
      </div>
    );

    let lessonEmpty = false;
    if (this.isEmpty()) {
      lessonEmpty = true;
      let startFromWordOneButton = null;
      if (this.props.userSettings.startFromWord > 1) {
        startFromWordOneButton = (
          <div className="text-center">
            <button className="button mt3 dib" onClick={this.props.startFromWordOne}>Start from word 1</button>
          </div>
        );
      }
      emptyAndZeroStateMessage = (
        <div className="text-center mt10 mx-auto"><span id="js-no-words-to-write" tabIndex="-1">There are no words to write.</span> {startFromWordOneButton}</div>
      );
      lessonSummary = '';
    } else {
      lessonEmpty = false;
    }
    if (this.props.settings && this.props.settings.customMessage) {
      customMessage = <h3 className='px3 pb0 mb0'>{this.props.settings.customMessage}</h3>;
    } else {
      customMessage = ''
    }
    return (
      <div>
        <canvas ref="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight} className="fixed celebration-canvas top-0 left-0 pointer-none" />
        <div id="lesson-page" className="flex-wrap-md flex mx-auto mw-1920">
          <div id="main-lesson-area" className="flex-grow mx-auto mw-1440 min-w-0">
            <div className="mx-auto mw-1920">
              {customMessage}
            </div>
            <div className="mx-auto mw-1920 p3">
              <div className="lesson-canvas lesson-canvas--finished panel p3 mb3">
                <div className={lessonEmpty ? 'dc' : 'w-100'}>
                  {emptyAndZeroStateMessage}
                  {lessonSummary}
                </div>
              </div>
              <LessonCanvasFooter
                chooseStudy={this.props.chooseStudy}
                disableUserSettings={this.props.disableUserSettings}
                hideOtherSettings={this.props.hideOtherSettings}
                path={this.props.path}
                setAnnouncementMessage={this.props.setAnnouncementMessage}
                toggleHideOtherSettings={this.props.toggleHideOtherSettings}
                totalWordCount={this.props.totalWordCount}
                userSettings={this.props.userSettings}
              />
            </div>
                        <p className="text-center"><a href={this.prefillSurveyLink()} className="text-small mt0" target="_blank" rel="noopener noreferrer" ref={(surveyLink) => { this.surveyLink = surveyLink; }} onClick={this.prefillSurveyLink.bind(this)} id="ga--lesson--give-feedback">Give feedback on this lesson (form opens in a new tab)</a></p>
          </div>
          <div>
            <UserSettings
              changeUserSetting={this.props.changeUserSetting}
              changeSortOrderUserSetting={this.props.changeSortOrderUserSetting}
              changeSpacePlacementUserSetting={this.props.changeSpacePlacementUserSetting}
              changeShowStrokesAs={this.props.changeShowStrokesAs}
              changeShowStrokesOnMisstroke={this.props.changeShowStrokesOnMisstroke}
              changeStenoLayout={this.props.changeStenoLayout}
              chooseStudy={this.props.chooseStudy}
              disableUserSettings={this.props.disableUserSettings}
              handleBeatsPerMinute={this.props.handleBeatsPerMinute}
              handleLimitWordsChange={this.props.handleLimitWordsChange}
              handleStartFromWordChange={this.props.handleStartFromWordChange}
              handleRepetitionsChange={this.props.handleRepetitionsChange}
              hideOtherSettings={this.props.hideOtherSettings}
              maxStartFromWord={this.props.lessonLength}
              path={this.props.path}
              revisionMode={this.props.revisionMode}
              setAnnouncementMessage={this.props.setAnnouncementMessage}
              toggleHideOtherSettings={this.props.toggleHideOtherSettings}
              totalWordCount={this.props.totalWordCount}
              userSettings={this.props.userSettings}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default Finished;
