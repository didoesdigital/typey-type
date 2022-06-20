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
    <>
      <label
        htmlFor="SHUFL-input"
        className="inline-block mb05 visually-hidden"
      >
        Enter the correct word:
      </label>
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
    </>
  );
}
