import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import GoogleAnalytics from "react-ga4";
import Subheader from "../../components/Subheader";

const addLeadingZeros = (value: number): string => {
  let textWithLeadingZeros = String(value);
  while (textWithLeadingZeros.length < 2) {
    textWithLeadingZeros = "0" + textWithLeadingZeros;
  }
  return textWithLeadingZeros;
};

const timeToDisplay = (remainingSeconds: number) => {
  const breakTimeMinutes = Math.floor(remainingSeconds / 60);
  const breakTimeSeconds = Math.floor(remainingSeconds - breakTimeMinutes * 60);
  return `${breakTimeMinutes}:${addLeadingZeros(breakTimeSeconds)}`;
};

const durationSeconds = 5 * 60;

const Break = () => {
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const intervalRef = useRef<any>(null);
  const mainHeading = useRef<HTMLHeadingElement>(null);
  const breakDoneHeading = useRef<HTMLHeadingElement>(null);

  const isBreakDone = remainingSeconds <= 0;

  useEffect(() => {
    const finishTime = Date.now() + durationSeconds * 1000;

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const approxSecondsRemaining = (finishTime - now) / 1000;
      const roundedSeconds = Math.round(approxSecondsRemaining);

      if (approxSecondsRemaining <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      setRemainingSeconds(roundedSeconds);
    }, 500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  useEffect(() => {
    if (isBreakDone) {
      breakDoneHeading.current?.focus();
    }
  }, [isBreakDone]);

  const reviewProgress = () => {
    GoogleAnalytics.event({
      category: "Break",
      action: "Click",
      label: "Review progress",
    });
  };

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1} id="take-a-break">
              Take a break
            </h2>
          </header>
        </div>
      </Subheader>
      <div className="p3 mx-auto mw-1024">
        <div className="mx-auto mw-568">
          <h2 ref={breakDoneHeading} tabIndex={-1} className="text-center mt3">
            {isBreakDone ? "Your break is done" : "Your break starts now"}
          </h2>
          <p className="mt3 text-center mb3">
            Rest your hands and your mind. Take a 5-minute break and continue or
            come back in 4+&nbsp;hours for another session.
          </p>
          <div className="text-center mb3 stat__number stat__number--min-w">
            <span aria-live="polite" aria-atomic="true">
              {timeToDisplay(remainingSeconds)}
            </span>
          </div>
          {isBreakDone && (
            <p className="text-center">
              <Link
                to="/progress"
                onClick={reviewProgress}
                className="link-button dib"
                style={{ lineHeight: 2 }}
              >
                Review progress
              </Link>
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Break;
