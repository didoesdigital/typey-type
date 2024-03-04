import React, { FC, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Input from "../components/Input";
import {
  useTPEURPBGSApi,
  useTPEURPBGSData,
} from "./TPEURPBGSContext/useTPEURPBGS";

type Props = {
  gameName: string;
};

const GamePlay: FC<Props> = ({ gameName }) => {
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
        <TransitionGroup
          className={"dib"}
          component={"span"}
          key={repeatIndex + 1}
        >
          <CSSTransition timeout={500} classNames="bloop" appear={true}>
            <strong>{puzzleText}</strong>
          </CSSTransition>
        </TransitionGroup>
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
