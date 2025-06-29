import React, { useEffect, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function Input({
  // @ts-expect-error TS(7031) FIXME: Binding element 'onChangeInput' implicitly has an ... Remove this comment to see the full error message
  onChangeInput,
  // @ts-expect-error TS(7031) FIXME: Binding element 'previousCompletedPhraseAsTyped' i... Remove this comment to see the full error message
  previousCompletedPhraseAsTyped,
  // @ts-expect-error TS(7031) FIXME: Binding element 'round' implicitly has an 'any' ty... Remove this comment to see the full error message
  round,
  // @ts-expect-error TS(7031) FIXME: Binding element 'typedText' implicitly has an 'any... Remove this comment to see the full error message
  typedText,
  // @ts-expect-error TS(7031) FIXME: Binding element 'gameName' implicitly has an 'any'... Remove this comment to see the full error message
  gameName,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef) {
      // @ts-expect-error TS(2531) FIXME: Object is possibly 'null'.
      inputRef.current.focus();
    }
  }, []);

  // @ts-expect-error TS(7006) FIXME: Parameter 'event' implicitly has an 'any' type.
  const onChangeTypedText = (event) => {
    const inputText = event?.target?.value || "";
    onChangeInput(inputText);
  };

  return (
    <>
      <label
        htmlFor={`${gameName}-input`}
        className="inline-block mb05 visually-hidden"
      >
        Enter the correct text:
      </label>
      <div className="relative">
        <samp className="pointer-none absolute absolute--fill w-100">
          <TransitionGroup
            className={"dib flex justify-center"}
            component={"span"}
            key={round}
          >
            <CSSTransition timeout={5000} classNames="dissolve" appear={true}>
              <kbd
                className={
                  "text-green-700 successfully-typed-text typed-text-input-positioning pre relative text-center"
                }
                aria-hidden="true"
              >
                {round > 1 ? previousCompletedPhraseAsTyped : ""}
              </kbd>
            </CSSTransition>
          </TransitionGroup>
        </samp>
        <textarea
          ref={inputRef}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="input-textarea w-100 typed-text-input-textarea text-center mx-auto overflow-hidden"
          id={`${gameName}-input`}
          onChange={onChangeTypedText}
          rows={1}
          style={{ textDecoration: "none" }}
          spellCheck={false}
          value={typedText}
          wrap="off"
        ></textarea>
      </div>
    </>
  );
}
