import React, { useState } from "react";

const Component = () => {
  const [wordCount, setWordCount] = useState(0);

  const changeYourWordsHandler: React.ChangeEventHandler<HTMLTextAreaElement> =
    (event) => {
      setWordCount(event.target.value.trim().split(" ").filter(Boolean).length);
    };
  return (
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
      <p className="text-right">{`${wordCount} ${
        wordCount === 1 ? "word" : "words"
      }`}</p>
    </>
  );
};

export default Component;
