import React, { useState } from "react";

export default function SHUFLInput() {
  const [typedText, setTypedText] = useState("");

  const onChangeTypedText = (event) => {
    setTypedText(event?.target?.value || "");
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
