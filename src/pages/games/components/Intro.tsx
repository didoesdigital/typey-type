import React from "react";

type Props = {
  introText: string;
  robot: React.ReactNode;
};

export default function Intro({ introText, robot }: Props) {
  return (
    <div className="mw-824 mr3 flex-grow">
      <div className="flex">
        <div className="w-100 mw-48 mr3 game-robot">{robot}</div>
        <p>{introText}</p>
      </div>
    </div>
  );
}
