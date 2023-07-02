import React, { useState } from "react";
import PseudoContentButton from "../../../components/PseudoContentButton";
import YourWordsHighlighted from "./YourWordsHighlighted";
import WordCount from "./WordCount";

import type { MetWords } from "../../../types";

type Props = {
  metWords: MetWords;
  updateMultipleMetWords: (newMetWords: string[]) => void;
};

const YourWords = ({ metWords, updateMultipleMetWords }: Props) => {
  const [wordCount, setWordCount] = useState(0);
  const [yourWords, setYourWords] = useState("");
  const [done, setDone] = useState(false);

  const changeYourWordsHandler: React.ChangeEventHandler<HTMLTextAreaElement> =
    (event) => {
      setWordCount(
        event.target.value.trim().split(/\s/).filter(Boolean).length
      );
      setYourWords(event.target.value.trim());
    };

  const doneHandler: React.MouseEventHandler = () => {
    setDone(true);

    updateMultipleMetWords(yourWords.split(/\s/));

    const copyButton = document.querySelector(
      ".js-clipboard-button"
    ) as HTMLButtonElement;

    if (copyButton) {
      copyButton.focus();
    }
  };

  return (
    <div>
      {done ? (
        <>
          <p className="mb0">You wrote:</p>
          <div
            id="your-words"
            className="db lh1-5 py05 px1 bg-info dark:text-coolgrey-900 bw-1 b--solid b--brand-primary-tint br-4 w-100 mw100"
          >
            <YourWordsHighlighted yourWords={yourWords} metWords={metWords} />
          </div>
          <WordCount wordCount={wordCount} />
          <PseudoContentButton
            className="js-clipboard-button button button--secondary table-cell mr2 copy-to-clipboard"
            style={{ lineHeight: 2 }}
            dataClipboardTarget="#your-words"
          >
            Copy your words to clipboard
          </PseudoContentButton>
        </>
      ) : (
        <>
          <label htmlFor="write-your-words">Write your words</label>
          <textarea
            id="write-your-words"
            className="input-textarea bg-info dark:text-coolgrey-900 bw-1 b--solid br-4 db w-100 mw100"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            onChange={changeYourWordsHandler}
            rows={6}
          />
          <WordCount wordCount={wordCount} />
          <button className="button mr2" onClick={doneHandler}>
            Done
          </button>
        </>
      )}
    </div>
  );
};

export default YourWords;
