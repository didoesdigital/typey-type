import React from "react";

export default function Puzzle({ puzzleText }) {
  return (
    <p className="text-center">
      <strong>Where does the “{puzzleText}” key belong?</strong>
    </p>
  );
}
