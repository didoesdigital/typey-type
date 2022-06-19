import React from "react";

export default function SHUFLPuzzle({ puzzleText }) {
  return (
    <p className="text-center">
      <strong>{[...puzzleText].join(" ")}</strong>
    </p>
  );
}
