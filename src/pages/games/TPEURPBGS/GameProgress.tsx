import { FC } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTPEURPBGSData } from "./TPEURPBGSContext/useTPEURPBGS";

const Section: FC = () => {
  const section = "custom";

  // We can remove this early return once we have more than 1 section available:
  if (section === "custom") {
    return null;
  }

  return (
    <div className="flex justify-between">
      <span>Section: </span>
      <span>{section === "custom" ? section : <strong>{section}</strong>}</span>
    </div>
  );
};

const Pair: FC = () => {
  const { pairIndex, pairToWin, isGameStarted } = useTPEURPBGSData();
  return (
    <div className="flex justify-between">
      <span>Pair: </span>
      <span>
        <strong className="dib">{pairIndex + 1}</strong> of{" "}
        {isGameStarted ? pairToWin : "?"}
      </span>
    </div>
  );
};

const Repeat: FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { repeatIndex, repeatToWin } = useTPEURPBGSData();
  return (
    <div className="flex justify-between">
      <span>Repeat: </span>
      <span>
        <motion.span
          className={"dib"}
          animate={{
            transform: shouldReduceMotion
              ? "scale(1)"
              : ["scale(1)", "scale(1.2)", "scale(1)"],
          }}
          transition={{
            duration: 0.5,
            times: [0, 0.4, 1],
            ease: [
              [0.41, 0, 0.48, 1],
              [0.61, 0, 0.28, 1],
            ],
          }}
          key={repeatIndex + 1}
        >
          <strong>{repeatIndex + 1 || 1}</strong>
        </motion.span>{" "}
        of {repeatToWin}
      </span>
    </div>
  );
};

const GameProgress: FC = () => {
  return (
    <div className="flex flex-grow">
      <div className="w-100" style={{ lineHeight: 2 }}>
        <Section />
        <Pair />
        <Repeat />
      </div>
    </div>
  );
};

export default GameProgress;
