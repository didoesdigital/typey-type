import React from "react";

// @ts-expect-error TS(7031) FIXME: Binding element 'puzzleText' implicitly has an 'an... Remove this comment to see the full error message
export default function Puzzle({ puzzleText }) {
  return (
    <p className="text-center" data-chromatic="ignore">
      <strong>{puzzleText}</strong>
    </p>
  );
}
