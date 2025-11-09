import { useEffect, useRef } from "react";
import * as React from "react";
import NumericSteppers from "./NumericSteppers";

type NumericInputProps = {
  autoCapitalize?: string;
  autoComplete?: string;
  autoCorrect?: string;
  autoFocus?: boolean;
  /** Override for className on the input */
  className?: string;
  /** e.g. "label-limitNumberOfWords" */
  /** This sets `disabled` and `aria-disabled` */
  disabled?: boolean;
  /** e.g. "label-limitNumberOfWords" */
  labelledbyId: string;
  /** Minimum permitted value e.g. 0 or 1 */
  min?: number;
  /** Maximum permitted value e.g. 30 */
  max?: number;
  /** e.g. "limitNumberOfWords" */
  name: string;
  /** e.g. "limitNumberOfWords" */
  id: string;
  /** Mostly used to treat as whole numbers or decimal numbers */
  precision?: number;
  spellCheck?: boolean;
  /** Step size of increment/decrement actions */
  step?: number;
  /** The handler to update number value in state */
  updateValue: (value: number) => void;
  /** The number value in state */
  value: number;
  /** 1Password */
  "data-1p-ignore"?: boolean;
  /** Bitwarden */
  "data-bwignore"?: boolean;
  /** Lastpass */
  "data-lpignore"?: string;
  /** Dashlane */
  "data-form-type"?: string;
};

const defaultMax = 100_000;

/**
 * The NumericInput component is an input widget to take number-like text and produces real numbers between a minimum and maximum value. It is like a spinbutton but doesn't use a spinbutton role because VoiceOver would treat the numbers as percentages, which is confusing.
 *
 * The component is a forgiving widget that lets steno students write any text because bizarre stenotypos are common for new students.
 *
 * The input is an uncontrolled component but it still updates state through calling the `updateValue` handler and can respond to changes to the `value` prop.
 *
 * The widget immediately applies valid, changed text to state as it happens (by calling `updateValue`) so that a student can live preview the impact it will have on a lesson. `updateValue` won't be called with strings or with numbers outside the min/max range.
 *
 * On blur, the widget will attempt to munge and clamp number-like number into valid numbers:
 *
 * - A string will be trimmed and parsed as a number (`parseInt` or `parseFloat`)
 * - If the trimmed, parsed number is a real number, it will be validated against min/max/precision and clamped to the nearest valid number
 * - If the trimmed, parsed number is not a real number, it will revert to the previous `value`
 * - The widget allows full stops (non-number text) for decimal numbers.
 *
 * The Up/Down arrows and stepper buttons will increment and decrement the previous `value` by `step` amount. The student can still enter numbers between step amounts (e.g. hand-type 95 BPM when `step` is `10`), which will be applied to `value`.
 *
 * Some things to note:
 *
 * - HTML form content is always a string (e.g. "true", "3", etc.). (Technically, a field's value could also be absent (which might appear as `undefined`) in a submitted form, but we're not submitting these numeric inputs.)
 * - React takes props like `disabled: boolean` as an actual boolean.
 * - The `inputRef.current.value` is a `string` containing the currently typed text in the HTML input element.
 * - The `value` prop is a `number` and corresponds to the user setting state.
 * - The `updateValue` handler takes a `number` type as its argument.
 *
 * For Typey Type's use cases, we never need negative values so we don't worry about handling `-` as a negative number vs `-T` as stenotypo i.e. we can always just remove `-`. Likewise, we won't bother preserving `+` to represent a positive number, we can just remove `+` all the time.
 */
const NumericInput: React.FC<NumericInputProps> = ({
  autoCapitalize = "off",
  autoComplete = "on",
  autoCorrect = "on",
  autoFocus = false,
  className = "form-control w-100",
  disabled,
  labelledbyId,
  min = 0,
  max = defaultMax,
  name,
  id,
  updateValue,
  precision = 0,
  spellCheck = false,
  step = 1,
  value,
  ...otherProps
}) => {
  const parseFunction =
    precision > 0 ? parseFloat : (strNumber: string) => parseInt(strNumber, 10);

  const inputRef = useRef<HTMLInputElement>(null);

  const clamp = (unclampedNumber: number) => {
    return Math.min(Math.max(unclampedNumber, min), max);
  };

  const isInRange = (unclampedNumber: number) => {
    return unclampedNumber >= min && unclampedNumber <= max;
  };

  // On blur, we try to munge and clamp the input to a valid value or revert it to the previous user setting value:
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const originalValue = event.target.value;
    const alreadyRealNumberString = parseFunction(originalValue);
    if (isNaN(alreadyRealNumberString)) {
      const stripNonNumbers = event.target.value.replace(/[^\d.]/, "");
      if (stripNonNumbers.length === 0) {
        // Revert back to a valid number:
        if (inputRef.current) {
          inputRef.current.value = `${value}`;
        }

        return;
      }

      const parsedMungedNumber = parseFunction(stripNonNumbers);
      if (isNaN(parsedMungedNumber)) {
        // Note: this would happen if, for example, the input with precision 0 contained ".7" so parseInt(".7", 10) would result in NaN but parseFloat(".7") would result in `0.7`
        // Revert back to a valid number:
        if (inputRef.current) {
          inputRef.current.value = `${value}`;
        }

        return;
      }

      // e.g. stripping leading letters produces a real number:
      const clampedMungedNumber = clamp(parsedMungedNumber);
      if (inputRef.current) {
        inputRef.current.value = `${clampedMungedNumber}`;
      }

      return;
    }

    const clampedRealNumberString = clamp(alreadyRealNumberString);
    updateValue(clampedRealNumberString);

    // e.g. if `value` was `2` and student typed "2a" and parseInt("2a", 10) returned `2` and `updateValue` was called with `2` again so there's no change to `[value]` to trigger existing sync logic:
    const shouldCleanDisplayNumberToMatchValue =
      value === clampedRealNumberString &&
      originalValue !== `${clampedRealNumberString}`;
    if (shouldCleanDisplayNumberToMatchValue) {
      if (inputRef.current) {
        inputRef.current.value = `${clampedRealNumberString}`;
      }
    }
  };

  // We allow any nonsense in the input field but only call the updateValue handler to update user setting state if the input value is a valid int or float:
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = parseFunction(event.target.value);
    if (!isNaN(newValue) && isInRange(newValue)) {
      updateValue(newValue); // Technically allows numbers that don't match step and allows greater precision than `precision` if parseFunction uses parseFloat (i.e. if `precision` is not 0)
    }
  };

  const increment = () => {
    const newValue = Math.min(value + step, max);
    updateValue(parseFunction(newValue.toFixed(precision)));
    // Let useEffect responding to `[value]` update inputRef.current.value
  };

  const decrement = () => {
    const newValue = Math.max(value - step, min);
    updateValue(parseFunction(newValue.toFixed(precision)));
    // Let useEffect responding to `[value]` update inputRef.current.value
  };

  // Spinbutton keyboard interaction: <https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/>
  // On up/down arrows, we increment/decrement the `value` and on Home/End keys we set the `value` to min/max:
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp" || event.keyCode === 38) {
      event.preventDefault();
      increment();
    } else if (event.key === "ArrowDown" || event.keyCode === 40) {
      event.preventDefault();
      decrement();
    } else if (event.key === "Home" || event.keyCode === 36) {
      // On macOS keyboard without Home key, test this with `fn` + left arrow
      event.preventDefault();
      updateValue(min);
    } else if (event.key === "End" || event.keyCode === 35) {
      // On macOS keyboard without End key, test this with `fn` + right arrow
      event.preventDefault();
      updateValue(max);
    }
  };

  // When the user setting `value` changes, update the input field to match (if it doesn't already), such as when the web app loads or on up/down arrows:
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== `${value}`) {
      inputRef.current.value = `${value}`;
    }
  }, [value]);

  return (
    <div className="numeric-input" role="group" aria-labelledby={labelledbyId}>
      <input
        {...otherProps}
        ref={inputRef}
        // Note: we don't use role="spinbutton" because VoiceOver announces the value as a percentage, which is very confusing https://bugs.webkit.org/show_bug.cgi?id=221102
        type="text"
        name={name}
        id={id}
        className={className}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        disabled={disabled}
        inputMode={precision > 0 ? "decimal" : "numeric"}
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        spellCheck={spellCheck}
        aria-disabled={disabled}
      />
      <NumericSteppers
        increment={increment}
        decrement={decrement}
        disabled={disabled}
      />
    </div>
  );
};

export default NumericInput;
