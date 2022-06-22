import React from "react";

export default function Puzzle({ puzzleText }) {
  return (
    <p className="text-center">
      <strong>{[...puzzleText].join(" ")}</strong>
    </p>
  );
}
