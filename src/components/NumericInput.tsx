import React from "react";
import OriginalNumericInput, {
  type NumericInputProps,
} from "react-numeric-input";

type Props = NumericInputProps;

const NumericInput = (props: Props) => {
  return <OriginalNumericInput {...props} />;
};

export default NumericInput;
