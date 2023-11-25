import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tippy";
import useAnnounceTooltip from "./Announcer/useAnnounceTooltip";

type Props = {
  timer: number;
  totalNumberOfMatchedWords: number;
  totalNumberOfNewWordsMet: number;
  totalNumberOfLowExposuresSeen: number;
  totalNumberOfRetainedWords: number;
  totalNumberOfMistypedWords: number;
  totalNumberOfHintedWords: number;
};

const Scores = ({
  timer,
  totalNumberOfMatchedWords,
  totalNumberOfNewWordsMet,
  totalNumberOfLowExposuresSeen,
  totalNumberOfRetainedWords,
  totalNumberOfMistypedWords,
  totalNumberOfHintedWords,
}: Props) => {
  const prevTimer = useRef<number | null>(null);

  const announceTooltip = useAnnounceTooltip();

  const [wordCount, setWordCount] = useState(0);
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [timeInSeconds, setTimeInSeconds] = useState(0);

  function calculateScores(timer: number, totalNumberOfMatchedWords: number) {
    const newWPM =
      timer > 0
        ? Math.round(totalNumberOfMatchedWords / (timer / 60 / 1000))
        : 0;

    const newTimeInSeconds = Math.round(timer / 1000);
    const newWordCount = Math.round(totalNumberOfMatchedWords);

    setWordCount(newWordCount);
    setWordsPerMinute(newWPM);
    setTimeInSeconds(newTimeInSeconds);
  }

  // Note: we only update the scores shown every second instead of every time
  // the number of matched words changes because of a keystroke
  useEffect(() => {
    if (prevTimer.current !== null) {
      if (prevTimer.current < timer) {
        calculateScores(timer, totalNumberOfMatchedWords);
      }
    }
  }, [timer, totalNumberOfMatchedWords]);

  useEffect(() => {
    prevTimer.current = timer;
  }, [timer]);

  return (
    <div>
      <h3 className="mb1 visually-hidden">Scores</h3>
      <div className="timer flex flex-wrap justify-around">
        <div className="stat">
          <div className="stat__number stat__number--min-w text-center">
            {wordsPerMinute}
          </div>
          <div className="stat__label text-center">
            {/* @ts-ignore */}
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
              onShow={announceTooltip}
            >
              WPM
            </Tooltip>
          </div>
        </div>
        <div className="stat">
          <div className="stat__number stat__number--min-w text-center">
            {timeInSeconds}
          </div>
          <div className="stat__label text-center">Time (seconds)</div>
        </div>

        <h4 className="visually-hidden">Words typed</h4>
        <div className="stat">
          <div className="stat__number stat__number--min-w text-center">
            {totalNumberOfNewWordsMet}
          </div>
          <div className="stat__label text-center">New</div>
        </div>
        <div className="stat">
          <div className="stat__number stat__number--min-w text-center">
            {totalNumberOfLowExposuresSeen}
          </div>
          <div className="stat__label text-center">Seen before</div>
        </div>
        <div className="stat">
          <div className="stat__number stat__number--min-w text-center">
            {totalNumberOfRetainedWords}
          </div>
          <div className="stat__label text-center">From memory</div>
        </div>
        <div className="stat">
          <div className="stat__number stat__number--min-w text-center">
            {totalNumberOfMistypedWords}
          </div>
          <div className="stat__label text-center">Misstroked</div>
        </div>
        <div className="stat">
          <div className="stat__number stat__number--min-w text-center">
            {totalNumberOfHintedWords}
          </div>
          <div className="stat__label text-center">Hinted</div>
        </div>
        <div className="stat visually-hidden">
          <div className="stat__number stat__number--min-w text-center hide">
            ~{wordCount}
          </div>
          <div className="stat__label hide">Word count</div>
        </div>
      </div>
    </div>
  );
};

export default Scores;
