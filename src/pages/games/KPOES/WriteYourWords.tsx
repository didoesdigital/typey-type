import React, { useState } from "react";
import PseudoContentButton from "../../../components/PseudoContentButton";

type Props = {
  wordCount: number;
};

const WordCount = ({ wordCount }: Props) => {
  return <p>{`${wordCount} ${wordCount === 1 ? "word" : "words"}`}</p>;
};

const YourWords = () => {
  const [wordCount, setWordCount] = useState(0);
  const [yourWords, setYourWords] = useState("");
  const [done, setDone] = useState(false);

  const changeYourWordsHandler: React.ChangeEventHandler<HTMLTextAreaElement> =
    (event) => {
      setWordCount(event.target.value.trim().split(" ").filter(Boolean).length);
      setYourWords(event.target.value.trim());
    };

  const doneHandler: React.MouseEventHandler = () => {
    setDone(true);
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
          <p
            id="your-words"
            className="db lh1-5 py05 px1 bg-info dark:text-coolgrey-900 bw-1 b--solid b--brand-primary-tint br-4 w-100 mw100"
          >
            {yourWords}
          </p>
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
