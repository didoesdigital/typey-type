import React, { useState } from "react";
import NumericInput from "components/NumericInput/NumericInput";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type SetupOptions = Omit<
  React.ComponentProps<typeof NumericInput>,
  "updateValue" | "value"
> & {
  label: string;
  /** A stand in for whatever the local storage/Jotai state initial value would have been */
  initialValue: number;
};

const exampleId = "limitNumberOfWords";
const exampleLabel = "Limit number of words";

const defaultProps: SetupOptions = {
  autoCapitalize: "off",
  autoComplete: "on",
  autoCorrect: "on",
  autoFocus: false,
  className: "form-control w-100",
  labelledbyId: `label-${exampleId}`,
  disabled: false,
  min: 0,
  name: exampleId,
  id: exampleId,
  precision: 0,
  step: 1,

  // Not part of NumericInput, just test components:
  initialValue: 3,
  label: exampleLabel,
};

const testUpdateValue = (_val: number) => {
  // console.log(_val);
};

const spies = {
  testUpdateValue,
};

const TestNumericInputAndLabelWithState = ({
  id,
  label,
  initialValue,
  ...restProps
}: SetupOptions) => {
  const [value, setValue] = useState<number>(initialValue);

  const updateValue: (val: number) => void = (val) => {
    spies.testUpdateValue(val);
    setValue(val);
  };

  return (
    <div className="mt1 mb1 px1 flex flex-wrap items-center justify-between">
      <label className="mr1" htmlFor={id} id={`label-${id}`}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <NumericInput
          {...restProps}
          id={id}
          value={value}
          updateValue={updateValue}
        />
      </div>
    </div>
  );
};

const setup = (setupOptions: SetupOptions) => {
  const user = userEvent.setup();

  const { label, id, initialValue, ...otherNumericInputProps } = setupOptions;

  const renderedComponents = render(
    <TestNumericInputAndLabelWithState
      label={label}
      id={id}
      initialValue={initialValue}
      {...otherNumericInputProps}
    />
  );

  const input = screen.getByRole("textbox") as HTMLInputElement;
  const incrementButton = screen.getByLabelText("Increment");
  const decrementButton = screen.getByLabelText("Decrement");

  return {
    user,
    input,
    incrementButton,
    decrementButton,
    ...renderedComponents,
  };
};

describe("NumericInput", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders a text input", () => {
    const { input } = setup({ ...defaultProps });

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders an input with accessible label", async () => {
    const { input } = setup({
      ...defaultProps,
      label: "Diagram size",
      id: "diagramSize",
      name: "diagramSize",
      labelledbyId: "label-diagramSize",
    });

    expect(input).toHaveAccessibleName("Diagram size");
  });

  it("lets you enter text", async () => {
    const { user, input } = setup({ ...defaultProps });

    await user.clear(input);
    await user.type(input, "23");

    expect(input.value).toBe("23");
  });

  it("lets you type any nonsense while the field has focus", async () => {
    const { user, input } = setup({ ...defaultProps, initialValue: 3 });

    await user.type(input, "{backspace}👩🏿‍🤝‍👩🏾… -T 3");
    expect(input.value).toBe("👩🏿‍🤝‍👩🏾… -T 3");
  });

  it("lets you enter 2a then on blur changes it to 2", async () => {
    const { user, input } = setup({ ...defaultProps, initialValue: 3 });

    await user.type(input, "{backspace}2a");
    expect(input.value).toBe("2a");
    input.blur();

    await waitFor(() => {
      expect(input.value).toBe("2");
    });
  });

  it("reverts NaN changed value, 'a', to previous valid value", async () => {
    const { user, input } = setup({ ...defaultProps, initialValue: 3 });

    await user.type(input, "{backspace}a");
    input.blur();

    expect(input.value).toBe("3");
  });

  it("disables input when component is disabled", async () => {
    const { user, input } = setup({
      ...defaultProps,
      initialValue: 3,
      disabled: true,
    });

    expect(input).toBeDisabled();
    await user.type(input, "{backspace}5"); // Disabled components means we expect typing to do nothing
    input.blur();

    expect(input.value).toBe("3");
  });

  it("disables stepper buttons when component is disabled", async () => {
    const { incrementButton, decrementButton } = setup({
      ...defaultProps,
      initialValue: 3,
      disabled: true,
    });

    expect(incrementButton).toBeDisabled();
    expect(decrementButton).toBeDisabled();
  });

  it("with precision 0 treats hexadecimal numbers like 0xa as decimal 0 instead of hexadecimal number 10", async () => {
    const { user, input } = setup({
      ...defaultProps,
      initialValue: 3,
      min: 0,
      precision: 0,
    });

    // Start at "3"
    // Backspace to "" (invalid)
    // Type "xa" (invalid at "x" and "xa")
    // Move to start and type "0", resulting in "0xa" (parseInt as `0`)
    await user.type(input, "{backspace}xa");
    await user.type(input, "0", {
      skipClick: true,
      initialSelectionStart: 0,
      initialSelectionEnd: 0,
    });
    input.blur();

    expect(input.value).toBe("0"); // Either original value (3) or interim valid value (0) would be fine
  });

  it("cleans up gibberish in field even if parsed input value is the same as `value`", async () => {
    const spyValue = vi.spyOn(spies, "testUpdateValue");

    const { user, input } = setup({
      ...defaultProps,
      initialValue: 3,
      min: 0,
      precision: 0,
    });

    // Start at "3"
    // Backspace to "" (invalid)
    // Type "4xa" (valid at 4, invalid at "4x" and "4xa")
    await user.type(input, "{backspace}4xa");
    input.blur();

    expect(spyValue).toHaveBeenCalledWith(4);
    expect(input.value).toBe("4");
  });

  it('excitedly changes "4xa" to "4"', async () => {
    const spyValue = vi.spyOn(spies, "testUpdateValue");

    const { user, input } = setup({
      ...defaultProps,
      initialValue: 3,
      min: 0,
      precision: 0,
    });

    // Start at "3"
    // Backspace to "" (invalid)
    // Type "xa" (invalid at "x" and "xa")
    // Move to start and type "4", which immediately changes the field to "4" instead of "4xa"
    await user.type(input, "{backspace}xa");
    input.setSelectionRange(0, 0);
    await user.type(input, "4", {
      skipClick: true,
      initialSelectionStart: 0,
      initialSelectionEnd: 0,
    });
    input.blur();

    expect(spyValue).toHaveBeenCalledWith(4);
    expect(input.value).toBe("4");
  });

  it("allows 'a' while field has focus then revert to previous valid value on blur", async () => {
    const { user, input } = setup({ ...defaultProps, initialValue: 3 });

    // Select "3" and replace with "a":
    await user.type(input, "a", {
      initialSelectionStart: 0,
      initialSelectionEnd: 1,
    });
    expect(input.value).toBe("a");
    input.blur();

    expect(input.value).toBe("3");
  });

  it("updates state with new valid value above min and below max, '5'", async () => {
    const { user, input } = setup({ ...defaultProps, min: 0, max: 30 });

    await user.type(input, "{backspace}5");
    input.blur();

    expect(input.value).toBe("5");
  });

  it("with precision 0 discards decimal points", async () => {
    const { user, input } = setup({
      ...defaultProps,
      min: 1,
      initialValue: 3,
      precision: 0,
    });

    // Starts at "3"
    // Changes to "" (invalid), then "." (invalid), then ".7" (valid float but not int)
    await user.type(input, "{backspace}.7");
    // Blur should parseInt to NaN and revert to initialValue, 3
    input.blur();

    expect(input.value).toBe("3");
  });

  it("calls updateValue only with cleaned numbers", async () => {
    const spyValue = vi.spyOn(spies, "testUpdateValue");

    const { user, input } = setup({
      ...defaultProps,
      initialValue: 2,
      max: 30,
      precision: 1,
    });

    await user.type(input, "{backspace} 1.1"); // Note: leading whitespace
    input.blur();

    expect(spyValue).toHaveBeenCalledWith(1.1);

    expect(input.value).toBe("1.1"); // No leading whitespace
  });

  it("clamps number over max to max", async () => {
    const spyValue = vi.spyOn(spies, "testUpdateValue");

    const { user, input } = setup({
      ...defaultProps,
      initialValue: 2,
      max: 30,
    });

    // Starts at "2"
    // Changes to "" then "3" then "34"
    await user.type(input, "{backspace}34");
    input.blur();

    expect(spyValue).toHaveBeenCalled();
    expect(spyValue).toHaveBeenCalledWith(3);
    expect(spyValue).toHaveBeenCalledTimes(2);

    await waitFor(() => {
      expect(input.value).toBe("30");
    });
  });

  it("clamps number with leading letters over max to max", async () => {
    const { user, input } = setup({
      ...defaultProps,
      initialValue: 2,
      max: 30,
    });

    // Starts at "2"
    // Changes to "" then "a" then "a3" then "a34" (all invalid)
    await user.type(input, "{backspace}a34");
    input.blur();

    await waitFor(() => {
      expect(input.value).toBe("30");
    });
  });

  it("with precision greater than 0 and step 0.1, increments by 0.1 on Increment button click", async () => {
    const { user, input, incrementButton } = setup({
      ...defaultProps,
      initialValue: 1.0,
      min: 1.0,
      max: 2.0,
      precision: 1,
      step: 0.1,
    });

    await user.click(incrementButton);

    expect(input.value).toBe("1.1");
  });

  it("increments by up arrow until max then stops", async () => {
    const { user, input } = setup({
      ...defaultProps,
      initialValue: 28,
      min: 1,
      max: 30,
    });

    await user.type(input, "{arrowup}");
    expect(input.value).toBe("29");
    await user.type(input, "{arrowup}", { skipClick: true });
    expect(input.value).toBe("30"); // Has now reached max
    await user.type(input, "{arrowup}", { skipClick: true }); // Should not go over max
    expect(input.value).toBe("30");
  });

  it("increments on Increment button click until max then stops", async () => {
    const { user, input, incrementButton } = setup({
      ...defaultProps,
      initialValue: 28,
      min: 1,
      max: 30,
    });

    await user.click(incrementButton);
    expect(input.value).toBe("29");
    await user.click(incrementButton);
    expect(input.value).toBe("30"); // Has now reached max
    await user.click(incrementButton); // Should not go over max
    expect(input.value).toBe("30");
  });

  it("decrements by down arrow until min then stops", async () => {
    const { user, input } = setup({
      ...defaultProps,
      initialValue: 3,
      min: 1,
      max: 30,
    });

    await user.type(input, "{arrowdown}");
    expect(input.value).toBe("2");
    await user.type(input, "{arrowdown}", { skipClick: true });
    expect(input.value).toBe("1");
    await user.type(input, "{arrowdown}", { skipClick: true });
    expect(input.value).toBe("1");
  });

  it("decrements on decrement button click until min then stops", async () => {
    const { user, input, decrementButton } = setup({
      ...defaultProps,
      initialValue: 3,
      min: 1,
      max: 30,
    });

    await user.click(decrementButton);
    expect(input.value).toBe("2");
    await user.click(decrementButton);
    expect(input.value).toBe("1");
    await user.click(decrementButton);
    expect(input.value).toBe("1");
  });

  it("decrements by down arrow by step of 10 until min then stops", async () => {
    const { user, input } = setup({
      ...defaultProps,
      initialValue: 30,
      min: 1,
      max: 300,
      step: 10,
    });

    await user.type(input, "{arrowdown}");
    expect(input.value).toBe("20");
    await user.type(input, "{arrowdown}", { skipClick: true });
    expect(input.value).toBe("10");
    await user.type(input, "{arrowdown}", { skipClick: true });
    expect(input.value).toBe("1");
  });

  it("decrements on decrement button click by step of 10 until min then stops", async () => {
    const { user, input, decrementButton } = setup({
      ...defaultProps,
      initialValue: 30,
      min: 1,
      max: 300,
      step: 10,
    });

    await user.click(decrementButton);
    expect(input.value).toBe("20");
    await user.click(decrementButton);
    expect(input.value).toBe("10");
    await user.click(decrementButton);
    expect(input.value).toBe("1");
  });

  it("increments in-between numbers by up arrow with step of 10", async () => {
    const { user, input } = setup({
      ...defaultProps,
      initialValue: 30,
      min: 10,
      max: 300,
      step: 10,
      precision: 0,
    });

    await user.clear(input);
    await user.type(input, "15");
    await user.type(input, "{arrowup}", { skipClick: true });
    expect(input.value).toBe("25");
    await user.type(input, "{arrowup}", { skipClick: true });
    expect(input.value).toBe("35");
    input.blur();

    await waitFor(() => {
      expect(input.value).toBe("35");
    });
  });
});
