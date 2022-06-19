import React, { useEffect, useState } from "react";

import SHUFLInput from "./SHUFLInput";
import SHUFLPuzzle from "./SHUFLPuzzle";
import EmptyState from "./EmptyState";

import {
  getRightAnswers,
  pickAWord,
  selectMaterial,
  shuffleWord,
} from "./SHUFLUtilities";

export default function SHUFLGame({ startingMetWordsToday }) {
  const [material, setMaterial] = useState(null);
  const [puzzleText, setPuzzleText] = useState(""); // e.g. "was"
  const [rightAnswers, setRightAnswers] = useState([]); // e.g. "was"
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!startingMetWordsToday) return;
    const filteredMetWords = selectMaterial(startingMetWordsToday);
    if (filteredMetWords.length < 3) {
      setMaterial(null);
      return;
    }

    setMaterial(filteredMetWords);
    const pickedWord = pickAWord(filteredMetWords);
    setPuzzleText(shuffleWord(pickedWord));
    setRightAnswers(getRightAnswers(filteredMetWords, pickedWord));
  }, [startingMetWordsToday]);

  const onChangeSHUFLInput = (inputText) => {
    setTypedText(inputText);
    if (rightAnswers.includes(inputText)) {
      setTypedText("");
      const pickedWord = pickAWord(material);
      setPuzzleText(shuffleWord(pickedWord));
      setRightAnswers(getRightAnswers(material, pickedWord));
      // console.log("SUCCESS");
    }
  };

  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320">
        <h3 id="typey-type-SHUFL-game">SHUFL game</h3>
        {material ? (
          <>
            <p>
              The steno robots have been dancing too much and shuffled all the
              letters out of order! You need to type the correct word to get
              them all back in order.
            </p>
            <SHUFLPuzzle puzzleText={puzzleText} />
            <SHUFLInput
              typedText={typedText}
              onChangeSHUFLInput={onChangeSHUFLInput}
            />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
