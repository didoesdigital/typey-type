import React from "react";

export default function Puzzle({ puzzleText }) {
  return (
    <p className="text-center" data-chromatic="ignore">
      <strong>{[...puzzleText].join(" ")}</strong>
    </p>
  );
}
