import { type ChangeEventHandler, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

type InputProps = {
  onChangeInput: (inputText: string) => void;
  previousCompletedPhraseAsTyped: string;
  round: number;
  typedText: string;
  gameName: string;
};

export default function Input({
  onChangeInput,
  previousCompletedPhraseAsTyped,
  round,
  typedText,
  gameName,
}: InputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, []);

  const onChangeTypedText: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
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
          <motion.span
            className={"dib flex justify-center"}
            initial={{
              opacity: shouldReduceMotion ? 1 : 1,
              filter: shouldReduceMotion ? "blur(0)" : "blur(0)",
            }}
            animate={{
              opacity: shouldReduceMotion ? 0 : 0.01,
              filter: shouldReduceMotion ? "blur(0)" : "blur(.5rem)",
            }}
            transition={{
              duration: 0.2,
              filter: {
                inherit: true,
                duration: 0.5,
              },
            }}
            key={round}
          >
            <kbd
              className={
                "text-green-700 successfully-typed-text typed-text-input-positioning pre relative text-center"
              }
              aria-hidden="true"
            >
              {round > 1 ? previousCompletedPhraseAsTyped : ""}
            </kbd>
          </motion.span>
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
