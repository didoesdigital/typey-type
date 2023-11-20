import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LessonCanvasFooter from "./LessonCanvasFooter";
import FinishedZeroAndEmptyStateMessage from "./FinishedZeroAndEmptyState";
import UserSettings from "./UserSettings";
import {
  stitchTogetherLessonData,
  transformLessonDataToChartData,
} from "../../../utils/transformingFinishedData";
import FinishedAccuracyNudge from "./FinishedAccuracyNudge";
import FinishedActionButtons from "./FinishedActionButtons";
import FinishedDataViz from "./FinishedDataViz";
import FinishedMisstrokesSummary from "./FinishedMisstrokesSummary";
import FinishedSummaryHeadings from "./FinishedSummaryHeadings";
import LessonFinePrintFooter from "./LessonFinePrintFooter";
import getNumericAccuracy from "../utilities/getNumericAccuracy";
import type { ConfettiConfig } from "./FinishedSummaryHeadings";
import type { FinishedProps, LessonData, TransformedData } from "../types";

const calculateScores = (duration: number, wordCount: number) =>
  duration > 0
    ? Math.round(Math.max(wordCount - 1, 0) / (duration / 60 / 1000))
    : 0;

const getNextLessonPath = (metadata: any) => {
  const suggestedNext = metadata?.suggestedNext ? metadata.suggestedNext : "/";
  return "/lessons" + suggestedNext.replace(/lesson\.txt$/, "");
};

let topSpeedToday = 0;

const Finished = ({
  changeShowScoresWhileTyping,
  changeShowStrokesAs,
  changeShowStrokesAsList,
  changeShowStrokesOnMisstroke,
  changeSortOrderUserSetting,
  changeSpacePlacementUserSetting,
  changeStenoLayout,
  changeUserSetting,
  changeVoiceUserSetting,
  chooseStudy,
  currentLessonStrokes,
  disableUserSettings,
  globalUserSettings,
  handleBeatsPerMinute,
  handleDiagramSize,
  handleLimitWordsChange,
  handleRepetitionsChange,
  handleStartFromWordChange,
  handleUpcomingWordsLayout,
  hideOtherSettings,
  lesson,
  lessonLength,
  lessonTitle,
  metadata,
  metWords,
  path,
  restartLesson,
  reviseLesson,
  revisionMode,
  setAnnouncementMessage,
  settings,
  startFromWordOne,
  startTime,
  timer,
  toggleHideOtherSettings,
  topSpeedPersonalBest,
  totalNumberOfHintedWords,
  totalNumberOfLowExposuresSeen,
  totalNumberOfMatchedWords,
  totalNumberOfMistypedWords,
  totalNumberOfNewWordsMet,
  totalNumberOfRetainedWords,
  totalWordCount,
  updatePreset,
  updateRevisionMaterial,
  updateTopSpeedPersonalBest,
  userSettings,
}: FinishedProps) => {
  const location = useLocation();

  const [chartData, setChartData] = useState<TransformedData>(null);
  const [confettiConfig, setConfettiConfig] = useState<ConfettiConfig>(null);
  const [newTopSpeedPersonalBest, setNewTopSpeedPersonalBest] = useState(false);
  const [newTopSpeedToday, setNewTopSpeedToday] = useState(false);
  const [numericAccuracy, setNumericAccuracy] = useState(0);
  const [wpm, setWpm] = useState(0);

  // update WPM used by FinishedDataViz and headings and confetti
  useEffect(() => {
    const adjustedWPM = calculateScores(timer, totalNumberOfMatchedWords);
    setWpm(adjustedWPM);
  }, [timer, totalNumberOfMatchedWords]);

  // update chart in FinishedDataViz
  useEffect(() => {
    const lessonData: LessonData = stitchTogetherLessonData(
      currentLessonStrokes,
      startTime,
      wpm
    );
    setChartData(transformLessonDataToChartData(lessonData));
  }, [currentLessonStrokes, startTime, wpm]);

  // update hero data in FinishedDataViz
  useEffect(() => {
    setNumericAccuracy(
      getNumericAccuracy(
        totalNumberOfMistypedWords,
        totalNumberOfHintedWords,
        currentLessonStrokes,
        wpm
      )
    );
  }, [
    currentLessonStrokes,
    totalNumberOfHintedWords,
    totalNumberOfMistypedWords,
    wpm,
  ]);

  // update top speed today or ever and headings and confetti
  useEffect(() => {
    const fasterSpeedToday = wpm > topSpeedToday;
    const fasterPersonalBest = wpm > topSpeedPersonalBest;
    const minimumStrokes = currentLessonStrokes.length > 3;
    const minimumSpeed = wpm > 3;
    const thirtyStrokesOrNotRevision =
      !revisionMode || currentLessonStrokes.length >= 30;

    if (
      fasterSpeedToday &&
      minimumStrokes &&
      minimumSpeed &&
      thirtyStrokesOrNotRevision &&
      fasterPersonalBest
    ) {
      setConfettiConfig({ sparsity: 17, colors: 5 });
      topSpeedToday = wpm;
      updateTopSpeedPersonalBest(wpm);
      setNewTopSpeedPersonalBest(true);
      setNewTopSpeedToday(true);
    } else if (
      fasterSpeedToday &&
      minimumStrokes &&
      minimumSpeed &&
      thirtyStrokesOrNotRevision
    ) {
      setConfettiConfig({ sparsity: 170, colors: 2 });
      topSpeedToday = wpm;
      setNewTopSpeedPersonalBest(false);
      setNewTopSpeedToday(true);
    } else {
      setNewTopSpeedPersonalBest(false);
      setNewTopSpeedToday(false);
    }

    // FIXME: updating the newTopSpeedToday too frequently causes the heading text to revert to
    // lesson title instead of "New top speed for today!"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLessonStrokes.length, revisionMode, wpm]);

  return (
    <div>
      <div id="lesson-page" className="flex-wrap-md flex mx-auto mw-1920">
        <div
          id="main-lesson-area"
          className="flex-grow mx-auto mw-1440 min-w-0"
        >
          <div className="mx-auto mw-1920">
            {settings?.customMessage && (
              <h3 className="px3 pb0 mb0">{settings.customMessage}</h3>
            )}
          </div>
          <div className="mx-auto mw-1920 p3">
            <div className="lesson-canvas lesson-canvas--finished panel overflow-hidden flex relative bg-white dark:bg-coolgrey-1000 p3 mb3">
              {lessonLength === 0 ? (
                <FinishedZeroAndEmptyStateMessage
                  startFromWordSetting={userSettings.startFromWord}
                  startFromWordOneClickHandler={startFromWordOne}
                  suggestedNextUrl={getNextLessonPath(metadata)}
                />
              ) : (
                <div className="w-100">
                  <div className="finished-lesson mx-auto mw-1440">
                    <div className="finished-summary mb3 text-center">
                      <FinishedSummaryHeadings
                        confettiConfig={confettiConfig}
                        lessonTitle={lessonTitle}
                        newTopSpeedPersonalBest={newTopSpeedPersonalBest}
                        newTopSpeedToday={newTopSpeedToday}
                        wpm={wpm}
                      />
                      <FinishedDataViz
                        wpm={wpm}
                        numericAccuracy={numericAccuracy}
                        chartData={chartData}
                        totalNumberOfNewWordsMet={totalNumberOfNewWordsMet}
                        totalNumberOfLowExposuresSeen={
                          totalNumberOfLowExposuresSeen
                        }
                        totalNumberOfRetainedWords={totalNumberOfRetainedWords}
                        totalNumberOfHintedWords={totalNumberOfHintedWords}
                        totalNumberOfMistypedWords={totalNumberOfMistypedWords}
                        wordsTyped={currentLessonStrokes?.length || 0}
                      />
                      <FinishedActionButtons
                        numericAccuracy={numericAccuracy}
                        restartPath={path}
                        restartLesson={restartLesson}
                        suggestedNextUrl={getNextLessonPath(metadata)}
                      />
                      <FinishedAccuracyNudge
                        numericAccuracy={numericAccuracy}
                      />
                    </div>
                    <FinishedMisstrokesSummary
                      currentLessonStrokes={currentLessonStrokes}
                      globalUserSettings={globalUserSettings}
                      metWords={metWords}
                      path={path}
                      reviseLesson={reviseLesson}
                      showMisstrokesSummary={currentLessonStrokes.length > 0}
                      updateRevisionMaterial={updateRevisionMaterial}
                      userSettings={userSettings}
                    />
                  </div>
                </div>
              )}
            </div>
            <LessonCanvasFooter
              chooseStudy={chooseStudy}
              disableUserSettings={disableUserSettings}
              hideOtherSettings={hideOtherSettings}
              toggleHideOtherSettings={toggleHideOtherSettings}
              userSettings={userSettings}
              updatePreset={updatePreset}
            />
          </div>
          <LessonFinePrintFooter
            lesson={lesson}
            lessonTitle={lessonTitle}
            locationPathname={location?.pathname || ""}
          />
        </div>
        <div>
          <UserSettings
            changeUserSetting={changeUserSetting}
            changeVoiceUserSetting={changeVoiceUserSetting}
            changeSortOrderUserSetting={changeSortOrderUserSetting}
            changeShowScoresWhileTyping={changeShowScoresWhileTyping}
            changeSpacePlacementUserSetting={changeSpacePlacementUserSetting}
            changeShowStrokesAs={changeShowStrokesAs}
            changeShowStrokesAsList={changeShowStrokesAsList}
            changeShowStrokesOnMisstroke={changeShowStrokesOnMisstroke}
            changeStenoLayout={changeStenoLayout}
            disableUserSettings={disableUserSettings}
            handleDiagramSize={handleDiagramSize}
            handleBeatsPerMinute={handleBeatsPerMinute}
            handleLimitWordsChange={handleLimitWordsChange}
            handleStartFromWordChange={handleStartFromWordChange}
            handleRepetitionsChange={handleRepetitionsChange}
            handleUpcomingWordsLayout={handleUpcomingWordsLayout}
            hideOtherSettings={hideOtherSettings}
            maxStartFromWord={lessonLength}
            revisionMode={revisionMode}
            setAnnouncementMessage={setAnnouncementMessage}
            totalWordCount={totalWordCount}
            userSettings={userSettings}
          />
        </div>
      </div>
    </div>
  );
};

export default Finished;
