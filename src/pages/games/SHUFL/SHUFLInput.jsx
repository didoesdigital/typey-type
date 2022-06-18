import React from "react";

export default function SHUFLInput({ typedText, onChangeSHUFLInput }) {
  const onChangeTypedText = (event) => {
    const inputText = event?.target?.value || "";
    onChangeSHUFLInput(inputText);
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
