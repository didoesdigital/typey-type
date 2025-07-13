import React from "react";

type Props = {
  puzzleText: string;
};

export default function Puzzle({ puzzleText }: Props) {
  return (
    <p className="text-center" data-chromatic="ignore">
      <strong>{[...puzzleText].join(" ")}</strong>
    </p>
  );
}
