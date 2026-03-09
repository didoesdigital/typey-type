import * as React from "react";

type Props = {
  introText: string;
  maxWidthClass?: string;
  robot: React.ReactNode;
};

export default function Intro({
  introText,
  maxWidthClass = "mw-824",
  robot,
}: Props) {
  return (
    <div className={`${maxWidthClass} mr3 flex-grow`}>
      <div className="flex">
        <div className="w-100 mw-48 mr3 game-robot">{robot}</div>
        <p>{introText}</p>
      </div>
    </div>
  );
}
