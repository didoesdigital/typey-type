import React from "react";

export default function Puzzle({ puzzleText }) {
  return (
    <p className="text-center">
      <strong>Where does “{puzzleText}” belong?</strong>
    </p>
  );
}
