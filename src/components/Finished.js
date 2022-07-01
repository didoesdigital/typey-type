import React, { Component } from 'react';
import LessonCanvasFooter from '../pages/lessons/LessonCanvasFooter';
import FinishedZeroAndEmptyStateMessage from '../pages/lessons/FinishedZeroAndEmptyState';
import UserSettings from './UserSettings';
import { stitchTogetherLessonData, transformLessonDataToChartData } from '../utils/transformingFinishedData';
import FinishedActionButtons from '../pages/lessons/FinishedActionButtons';
import FinishedDataViz from '../pages/lessons/FinishedDataViz';
import FinishedMisstrokesSummary from '../pages/lessons/FinishedMisstrokesSummary';
import FinishedSummaryHeadings from '../pages/lessons/FinishedSummaryHeadings';
import getNumericAccuracy from '../pages/lessons/getNumericAccuracy';
import 'react-tippy/dist/tippy.css';

// fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690=lesson&entry.1202724812&entry.936119214";
const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSda64Wi5L-eVzZVo6HLJ2xnD9cu83H2-2af3WEE2atFiaoKyw/viewform?usp=pp_url&entry.1884511690="
const googleFormParam = "&entry.1202724812&entry.936119214";

const calculateScores = (duration, wordCount) =>
  duration > 0
    ? Math.round(Math.max(wordCount - 1, 0) / (duration / 60 / 1000))
    : 0;

class Finished extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
      confettiConfig: null,
      newTopSpeedPersonalBest: false,
      newTopSpeedToday: false,
      numericAccuracy: 0,
      wpm: 0
    }
  }

  componentDidMount() {
    const wpm = calculateScores(this.props.timer, this.props.totalNumberOfMatchedWords);
    const numericAccuracy = getNumericAccuracy(this.props.totalNumberOfMistypedWords, this.props.totalNumberOfHintedWords, this.props.currentLessonStrokes, wpm);
    this.setState({
      numericAccuracy,
      wpm,
    });

    const lessonData = stitchTogetherLessonData(this.props.currentLessonStrokes, this.props.startTime, wpm);
    this.setState({chartData: transformLessonDataToChartData(lessonData)})

    const fasterSpeedToday = wpm > this.props.topSpeedToday;
    const fasterPersonalBest = wpm > this.props.topSpeedPersonalBest;
    const minimumStrokes = this.props.currentLessonStrokes.length > 3;
    const minimumSpeed = wpm > 3;
    const thirtyStrokesOrNotRevision = (!this.props.revisionMode || this.props.currentLessonStrokes.length >= 30);

    if (fasterSpeedToday && minimumStrokes && minimumSpeed && thirtyStrokesOrNotRevision && fasterPersonalBest) {
      this.setState({confettiConfig: {sparsity: 17, colors: 5}});
      this.props.updateTopSpeedToday(wpm);
      this.props.updateTopSpeedPersonalBest(wpm);
      this.setState({
        newTopSpeedPersonalBest: true,
        newTopSpeedToday: true
      });
    }
    else if (fasterSpeedToday && minimumStrokes && minimumSpeed && thirtyStrokesOrNotRevision) {
      this.setState({confettiConfig: {sparsity: 170, colors: 2}});
      this.props.updateTopSpeedToday(wpm);
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
  }

  render() {
    return (
      <div>
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
                        <FinishedSummaryHeadings
                          confettiConfig={this.state.confettiConfig}
                          lessonTitle={this.props.lessonTitle}
                          newTopSpeedPersonalBest={this.state.newTopSpeedPersonalBest}
                          newTopSpeedToday={this.state.newTopSpeedToday}
                          wpm={this.state.wpm}
                        />
                        <FinishedDataViz
                          wpm={this.state.wpm}
                          numericAccuracy={this.state.numericAccuracy}
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
