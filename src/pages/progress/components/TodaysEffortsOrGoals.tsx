import React from "react";
import NumericInput from "react-numeric-input";
import { ReactComponent as AlertRobot } from "../../../images/AlertRobot.svg";
import { ReactComponent as BoredRobot } from "../../../images/BoredRobot.svg";
import { ReactComponent as HappyRobot } from "../../../images/HappyRobot.svg";
import type { MetWords } from "../../../types";

type Props = {
  cancelSetGoals: (event: React.MouseEvent | React.KeyboardEvent) => void;
  handleNewWordsGoalInputChange: (event: any) => void;
  handleOldWordsGoalInputChange: (event: any) => void;
  newWordsGoalMet: boolean;
  newWordsGoalUnveiled: boolean;
  oldWordsGoalMet: boolean;
  oldWordsGoalUnveiled: boolean;
  celebrateCompletedGoals: (oldGoal: boolean, newGoal: boolean) => void;
  saveGoals: (event: any) => void;
  showSetGoalsForm: boolean;
  showSetGoalsFormFn: () => void;
  startingMetWordsToday: MetWords;
  todayNewWordCount: number;
  todayOldWordCount: number;
  unveilOldWordsGoal: React.Dispatch<React.SetStateAction<boolean>>;
  unveilNewWordsGoal: React.Dispatch<React.SetStateAction<boolean>>;
  userGoalInputNewWords: number;
  userGoalInputOldWords: number;
  userGoals: {
    oldWords: number;
    newWords: number;
  };
};

type TodaysEffortsGoalsProps = {
  userGoalsWords: number;
  todayWordCount: number;
};

const TodaysEffortsGoals = ({
  userGoalsWords,
  todayWordCount,
}: TodaysEffortsGoalsProps) => {
  return (
    <React.Fragment>
      {userGoalsWords}
      {userGoalsWords <= todayWordCount ? (
        <>
          <span aria-hidden="true"> •</span> Done!
        </>
      ) : null}
    </React.Fragment>
  );
};

const TodaysEffortsOrGoals = ({
  cancelSetGoals,
  handleNewWordsGoalInputChange,
  handleOldWordsGoalInputChange,
  newWordsGoalMet,
  newWordsGoalUnveiled,
  oldWordsGoalMet,
  oldWordsGoalUnveiled,
  celebrateCompletedGoals,
  saveGoals,
  showSetGoalsForm,
  showSetGoalsFormFn,
  startingMetWordsToday,
  todayNewWordCount,
  todayOldWordCount,
  unveilOldWordsGoal,
  unveilNewWordsGoal,
  userGoalInputNewWords,
  userGoalInputOldWords,
  userGoals,
}: Props) => {
  const grabStyle = function () {
    return false;
  };

  function revealCompletedGoals() {
    celebrateCompletedGoals(
      oldWordsGoalMet && !oldWordsGoalUnveiled,
      newWordsGoalMet && !newWordsGoalUnveiled
    );

    unveilOldWordsGoal(oldWordsGoalMet ? true : oldWordsGoalUnveiled);
    unveilNewWordsGoal(newWordsGoalMet ? true : newWordsGoalUnveiled);

    const element = document.getElementById("js-todays-efforts");
    if (element) {
      element.focus();
    }
  }

  let todaysEffortsOrGoals;
  if (showSetGoalsForm) {
    todaysEffortsOrGoals = (
      <React.Fragment>
        <form onSubmit={saveGoals}>
          <div className="pt4 pb4">
            <div className="mb3">
              <label
                className="pb1"
                id="js-first-interactive-form-field-element"
                htmlFor="userGoalInputOldWords"
              >
                Old words goal
              </label>
              <NumericInput
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                autoFocus={false}
                className="form-control w-100"
                disabled={!showSetGoalsForm}
                id="userGoalInputOldWords"
                max={10000}
                min={1}
                name="userGoalInputOldWords"
                onChange={handleOldWordsGoalInputChange}
                precision={0}
                spellCheck="false"
                step={1}
                style={grabStyle()}
                type="number"
                value={userGoalInputOldWords}
                snap
              />
              <div className="mt1 text-small de-emphasized">
                (50–200 recommended)
              </div>
            </div>
            <div className="mb3">
              <label className="pb1" htmlFor="userGoalInputNewWords">
                New words goal
              </label>
              <NumericInput
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                autoFocus={false}
                className="form-control w-100"
                disabled={!showSetGoalsForm}
                id="userGoalInputNewWords"
                max={10000}
                min={1}
                name="userGoalInputNewWords"
                onChange={handleNewWordsGoalInputChange}
                precision={0}
                spellCheck="false"
                step={1}
                style={grabStyle()}
                type="number"
                value={userGoalInputNewWords}
                snap
              />
              <div className="mt1 text-small de-emphasized">
                (5–40 recommended)
              </div>
            </div>
            <div className="flex flex-wrap justify-end">
              <button
                onClick={cancelSetGoals}
                className="button button--secondary mr2 dib"
              >
                Cancel
              </button>
              <button onClick={saveGoals} className="button mr2 dib">
                Save goals
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  } else if (
    (oldWordsGoalMet && !oldWordsGoalUnveiled) ||
    (newWordsGoalMet && !newWordsGoalUnveiled)
  ) {
    todaysEffortsOrGoals = (
      <React.Fragment>
        <div className="inline-flex flex-column items-center pt4 pb4 bb b--brand-primary-tint w-100">
          <div className="todays-effort-reveal-robot">
            <AlertRobot />
          </div>
          You completed a goal!
          <button
            onClick={revealCompletedGoals}
            className="button button--secondary mt3 dib"
          >
            Reveal
          </button>
        </div>
      </React.Fragment>
    );
  } else {
    let todaysEffortsOldGoalsRow: JSX.Element | null = (
      <div className="inline-flex items-center pt4 pb4 bb b--brand-primary-tint w-100">
        <div className="flex todays-effort-goal-robot pl2">
          {userGoals.oldWords <= todayOldWordCount ? (
            <HappyRobot />
          ) : (
            <BoredRobot />
          )}
        </div>
        <div className="stat__number stat__number--display pl3 mr1">
          {todayOldWordCount}
        </div>
        <div>
          Old {todayOldWordCount !== 1 ? "words" : "word"}
          <br />
          <span className="text-small">
            Your goal:{" "}
            <TodaysEffortsGoals
              userGoalsWords={userGoals.oldWords}
              todayWordCount={todayOldWordCount}
            />
          </span>
        </div>
      </div>
    );

    if (
      !startingMetWordsToday ||
      Object.keys(startingMetWordsToday).length < 15
    ) {
      todaysEffortsOldGoalsRow = null;
    }

    todaysEffortsOrGoals = (
      <React.Fragment>
        {todaysEffortsOldGoalsRow}
        <div className="inline-flex items-center pt4 pb4 bb b--brand-primary-tint w-100">
          <div className="flex todays-effort-goal-robot pl2">
            {userGoals.newWords <= todayNewWordCount ? (
              <HappyRobot />
            ) : (
              <BoredRobot />
            )}
          </div>
          <div className="stat__number stat__number--display pl3 mr1">
            {todayNewWordCount}
          </div>
          <div>
            New {todayNewWordCount !== 1 ? "words" : "word"}
            <br />
            <span className="text-small">
              Your goal:
              <TodaysEffortsGoals
                userGoalsWords={userGoals.newWords}
                todayWordCount={todayNewWordCount}
              />
            </span>
          </div>
        </div>
        <div className="text-right">
          <button
            id="js-set-goals-button"
            onClick={showSetGoalsFormFn}
            className="button button--secondary mt3 dib"
          >
            Set goals
          </button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <>
      <h3
        className="mt0 mb0 pt5 pb1 bb b--brand-primary-tint"
        id="js-todays-efforts"
        tabIndex={-1}
      >
        Today’s efforts
      </h3>
      {todaysEffortsOrGoals}
    </>
  );
};

export default TodaysEffortsOrGoals;
