import { FC, type ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "framer-motion";

type RoundProps = {
  round: number;
  roundToWin: number;
};

export const Round: FC<RoundProps> = ({ round, roundToWin }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <>
      Round:{" "}
      <motion.span
        className={"dib"}
        animate={{
          transform: shouldReduceMotion
            ? "scale(1)"
            : ["scale(1)", "scale(2)", "scale(1)"],
        }}
        transition={{
          duration: 1,
          ease: [
            [0.41, 0, 0.48, 1],
            [0.61, 0, 0.28, 1],
          ],
        }}
        key={round}
      >
        <strong className="dib">{round}</strong>
      </motion.span>
      {roundToWin > 9 ? "" : ` of ${roundToWin}`}
      <br />
    </>
  );
};

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

export const ProgressWrapper = ({ children }: { children: ReactNode }) => {
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
