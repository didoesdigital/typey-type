import { motion } from "motion/react";
import { useReducedMotion } from "framer-motion";

type Props = {
  puzzleText: string;
};

export default function Puzzle({ puzzleText }: Props) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <p className="text-center lede mb0">
      <strong>
        Where does the{" "}
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
          key={puzzleText}
        >
          <span className="dib" data-chromatic="ignore">
            {puzzleText}
          </span>
        </motion.span>{" "}
        key belong?
      </strong>
    </p>
  );
}
