import { FC } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

type RoundProps = {
  round: number;
  roundToWin: number;
};

export const Round: FC<RoundProps> = ({ round, roundToWin }) => (
  <>
    Round:{" "}
    <TransitionGroup className={"dib"} component={"span"} key={round}>
      <CSSTransition timeout={500} classNames="bloop" appear={true}>
        <strong className="dib">{round}</strong>
      </CSSTransition>
    </TransitionGroup>
    {roundToWin > 9 ? "" : ` of ${roundToWin}`}
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

export const ProgressWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-grow">
      <p className="text-center w-100">{children}</p>
    </div>
  );
};

const GameProgress: FC<Props> = ({ level, levelToWin, round, roundToWin }) => (
  <ProgressWrapper>
    <Round round={round} roundToWin={roundToWin} />
    <Level level={level} levelToWin={levelToWin} />
  </ProgressWrapper>
);

export default GameProgress;
