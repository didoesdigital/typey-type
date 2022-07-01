import React, { Component } from 'react';
import LessonCanvasFooter from '../pages/lessons/LessonCanvasFooter';
import FinishedZeroAndEmptyStateMessage from '../pages/lessons/FinishedZeroAndEmptyState';
import UserSettings from './UserSettings';
import { stitchTogetherLessonData, transformLessonDataToChartData } from '../utils/transformingFinishedData';
import FinishedActionButtons from '../pages/lessons/FinishedActionButtons';
import FinishedDataViz from '../pages/lessons/FinishedDataViz';
import FinishedMisstrokesSummary from '../pages/lessons/FinishedMisstrokesSummary';
import * as Confetti from './../utils/confetti';
import 'react-tippy/dist/tippy.css';

// fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=lesson&entry.1202724812&entry.936119214";
const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690="
const googleFormParam = "&entry.1202724812&entry.936119214";

let particles = [];

const skipToNextLessonButton = (event) => {
  event.preventDefault();
  const button = document.querySelector("#next-lesson-button");
  if (button) {
    button.focus();
  }
}

const calculateScores = (duration, wordCount) =>
  duration > 0
    ? Math.round(Math.max(wordCount - 1, 0) / (duration / 60 / 1000))
    : 0;

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
    const wpm = calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords);

    const lessonData = stitchTogetherLessonData(this.props.currentLessonStrokes, this.props.startTime, wpm);
    this.setState({chartData: transformLessonDataToChartData(lessonData)})

    const fasterSpeedToday = wpm > this.props.topSpeedToday;
    const fasterPersonalBest = wpm > this.props.topSpeedPersonalBest;
    const minimumStrokes = this.props.currentLessonStrokes.length > 3;
    const minimumSpeed = wpm > 3;
    const thirtyStrokesOrNotRevision = (!this.props.revisionMode || this.props.currentLessonStrokes.length >= 30);

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

  render() {
    let numericAccuracy = 0;
    let accuracy = '';
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

    // When you have stroked nothing right, except hinted or misstroked words, show nothing instead of 0%
    if (accuracy === '0% accuracy!') {
      accuracy = '';
      numericAccuracy = 0;
    }
    const wpm = calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords);
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
      wpmCommentary = 'Try this lesson again';
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

    return (
      <div>
        <canvas ref="canvas" width={this.state.canvasWidth} height={this.state.canvasHeight} className="fixed celebration-canvas top-0 left-0 pointer-none" />
        <div id="lesson-page" className="flex-wrap-md flex mx-auto mw-1920">
          <div id="main-lesson-area" className="flex-grow mx-auto mw-1440 min-w-0">
            <div className="mx-auto mw-1920">
              {this.props.settings?.customMessage && <h3 className='px3 pb0 mb0'>{this.props.settings.customMessage}</h3>}
            </div>
            <div className="mx-auto mw-1920 p3">
              <div className="lesson-canvas lesson-canvas--finished panel p3 mb3">
                {(this.props.lessonLength === 0) ?
                  <FinishedZeroAndEmptyStateMessage startFromWordSetting={this.props.userSettings.startFromWord} startFromWordOneClickHandler={this.props.startFromWordOne} suggestedNextUrl={this.props.suggestedNext} />
                  :
                  <div className="w-100">
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
                        <FinishedDataViz
                          wpm={wpm}
                          numericAccuracy={numericAccuracy}
                          skipToNextLessonButton={skipToNextLessonButton}
                          chartData={this.state.chartData}
                          totalNumberOfNewWordsMet={this.props.totalNumberOfNewWordsMet}
                          totalNumberOfLowExposuresSeen={this.props.totalNumberOfLowExposuresSeen}
                          totalNumberOfRetainedWords={this.props.totalNumberOfRetainedWords}
                          totalNumberOfHintedWords={this.props.totalNumberOfHintedWords}
                          totalNumberOfMistypedWords={this.props.totalNumberOfMistypedWords}
                          wordsTyped={this.props.currentLessonStrokes?.length || 0}
                          setAnnouncementMessage={this.props.setAnnouncementMessage}
                        />
                        <FinishedActionButtons
                          restartPath={process.env.PUBLIC_URL + this.props.path}
                          restartLesson={this.props.restartLesson}
                          suggestedNextUrl={this.props.suggestedNext}
                        />
                      </div>
                      <FinishedMisstrokesSummary
                        currentLessonStrokes={this.props.currentLessonStrokes}
                        globalUserSettings={this.props.globalUserSettings}
                        metWords={this.props.metWords}
                        path={this.props.path}
                        reviseLesson={this.props.reviseLesson}
                        showMisstrokesSummary={this.props.currentLessonStrokes.length > 0}
                        updateRevisionMaterial={this.props.updateRevisionMaterial}
                        userSettings={this.props.userSettings}
                      />
                    </div>
                  </div>
                }
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
            <p className="text-center"><a href={googleFormURL + encodeURIComponent(this.props.location?.pathname || '') + googleFormParam} className="text-small mt0" target="_blank" rel="noopener noreferrer" id="ga--lesson--give-feedback">Give feedback on this lesson (form opens in a new tab)</a></p>
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
              handleUpcomingWordsLayout={this.props.handleUpcomingWordsLayout}
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
