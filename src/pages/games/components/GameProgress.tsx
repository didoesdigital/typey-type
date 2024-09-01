import React, { FC } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

type RoundProps = {
  round: number;
  roundToWin: number;
};

const Round: FC<RoundProps> = ({ round, roundToWin }) => (
  <>
    Round:{" "}
    <TransitionGroup className={"dib"} component={"span"} key={round}>
      <CSSTransition timeout={500} classNames="bloop" appear={true}>
        <strong className="dib">{round < 1 ? "∞" : round}</strong>
      </CSSTransition>
    </TransitionGroup>{" "}
    of {roundToWin}
    <br />
  </>
);

type LevelProps = {
  level?: number;
  levelToWin?: number;
};

const Level: FC<LevelProps> = ({ level, levelToWin }) => {
  return level ? (
    <>
      Level: <strong>{level || 1}</strong> of {levelToWin || 1}
    </>
  ) : null;
};

type Props = {
  round: number;
  roundToWin: number;
  level?: number;
  levelToWin?: number;
};

const GameProgress: FC<Props> = ({ level, levelToWin, round, roundToWin }) => (
  <div className="flex flex-grow">
    <p className="text-center w-100">
      <Round round={round} roundToWin={roundToWin} />
      <Level level={level} levelToWin={levelToWin} />
    </p>
  </div>
);

export default GameProgress;
