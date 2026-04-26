import { FC, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Input from "../components/Input";
import {
  useTPEURPBGSApi,
  useTPEURPBGSData,
} from "./TPEURPBGSContext/useTPEURPBGS";

type Props = {
  gameName: string;
};

const GamePlay: FC<Props> = ({ gameName }) => {
  const shouldReduceMotion = useReducedMotion();
  const [typedText, setTypedText] = useState("");
  const [previousCompletedPhraseAsTyped, setPreviousCompletedPhraseAsTyped] =
    useState("");

  const { puzzleText, repeatIndex } = useTPEURPBGSData();
  const { repeatCompleted } = useTPEURPBGSApi();

  const onChangeTPEURPBGSInput = (inputText: string) => {
    setTypedText(inputText);
    const correct = inputText.trim() === puzzleText;
    if (correct) {
      setTypedText("");
      setPreviousCompletedPhraseAsTyped(inputText);
      repeatCompleted();
    }
  };

  return (
    <>
      <p className="text-center" data-chromatic="ignore">
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
          <strong>{puzzleText}</strong>
        </motion.span>
      </p>
      <Input
        onChangeInput={onChangeTPEURPBGSInput}
        previousCompletedPhraseAsTyped={previousCompletedPhraseAsTyped}
        round={repeatIndex + 1}
        typedText={typedText}
        gameName={gameName}
      />
    </>
  );
};

export default GamePlay;
