import React, { useState } from "react";

export default function SHUFLInput({ puzzleText }) {
  const [typedText, setTypedText] = useState("");

  const onChangeTypedText = (event) => {
    const inputText = event?.target?.value || "";
    setTypedText(inputText);
    console.log(inputText);
    console.log(puzzleText);
    if (inputText === puzzleText) {
      console.log("SUCCESS");
    }
  };

  return (
    <textarea
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      className={
        "input-textarea typed-text-input-positioning typed-text-input-textarea text-center"
      }
      id="your-typed-text"
      onChange={onChangeTypedText}
      rows="1"
      spellCheck="false"
      value={typedText}
      wrap="off"
    ></textarea>
  );
}
