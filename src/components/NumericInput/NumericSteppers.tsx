import * as React from "react";

type Props = {
  disabled?: boolean;
  increment: () => void;
  decrement: () => void;
};

const NumericSteppers = ({ disabled, increment, decrement }: Props) => {
  const onIncrement: React.MouseEventHandler = (event) => {
    event.preventDefault();
    increment();
  };

  const onDecrement: React.MouseEventHandler = (event) => {
    event.preventDefault();
    decrement();
  };

  return (
    <>
      <button
        aria-label="Increment"
        disabled={disabled}
        onClick={onIncrement}
        tabIndex={-1}
        type="button"
      >
        <i></i>
      </button>
      <button
        aria-label="Decrement"
        disabled={disabled}
        onClick={onDecrement}
        tabIndex={-1}
        type="button"
      >
        <i></i>
      </button>
    </>
  );
};

export default NumericSteppers;
