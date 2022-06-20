import React, { useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function SHUFLInput({
  onChangeSHUFLInput,
  previousCompletedPhraseAsTyped,
  round,
  typedText,
}) {
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
      <div className="relative">
        <samp className="pointer-none absolute absolute--fill w-100">
          <TransitionGroup
            className={"dib flex justify-center"}
            component={"span"}
            key={round}
          >
            <CSSTransition timeout={50000} classNames="dissolve" appear={true}>
              <kbd
                className={
                  "color-success successfully-typed-text typed-text-input-positioning pre relative text-center"
                }
                aria-hidden="true"
              >
                {previousCompletedPhraseAsTyped}
              </kbd>
            </CSSTransition>
          </TransitionGroup>
        </samp>
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
      </div>
    </>
  );
}
