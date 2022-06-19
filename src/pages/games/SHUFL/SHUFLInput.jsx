import React, { useEffect, useRef } from "react";

export default function SHUFLInput({ typedText, onChangeSHUFLInput }) {
  const SHUFLInput = useRef(null);
  useEffect(() => {
    if (SHUFLInput) {
      SHUFLInput.current.focus();
    }
  }, []);

  const onChangeTypedText = (event) => {
    const inputText = event?.target?.value || "";
    onChangeSHUFLInput(inputText);
  };

  return (
    <textarea
      ref={SHUFLInput}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      className={
        "input-textarea typed-text-input-positioning typed-text-input-textarea text-center"
      }
      id="SHUFL-input"
      onChange={onChangeTypedText}
      rows="1"
      spellCheck="false"
      value={typedText}
      wrap="off"
    ></textarea>
  );
}
