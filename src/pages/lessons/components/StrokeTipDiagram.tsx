import React from "react";

import type { Outline } from "../../../types";

type Props = {
  isMultiline: boolean;
  splitBriefsIntoStrokes: (outline: Outline) => string[];
  currentStroke: Outline;
  mapBriefsFunction: (outline: string) => { [key: string]: any };
  StenoLayoutDiagram: React.ElementType;
  diagramSize?: number;
};

const StrokeTipDiagram = ({
  isMultiline,
  splitBriefsIntoStrokes,
  currentStroke,
  mapBriefsFunction,
  StenoLayoutDiagram,
  diagramSize,
}: Props) => {
  const diagramWidth = (diagramSize || 1) * 140;

  return (
    <div className={`flex flex-wrap mr05${isMultiline ? " ml1" : ""}`}>
      {splitBriefsIntoStrokes(currentStroke).map((strokeToDraw, index) => (
        <React.Fragment key={index}>
          {Object.values(mapBriefsFunction(strokeToDraw)).some(
            (item) => item
          ) && (
            <div
              className={`mt1 mr3${
                isMultiline ? " flex flex-grow justify-center" : ""
              }`}
            >
              <StenoLayoutDiagram
                classes="steno-diagram-svg"
                id={"diagramID-" + index + "-" + strokeToDraw}
                {...mapBriefsFunction(strokeToDraw)}
                brief={strokeToDraw}
                diagramWidth={diagramWidth}
              />
            </div>
          )}
          {Object.values(mapBriefsFunction(strokeToDraw)).every(
            (item) => !item
          ) && (
            <div
              className={`mt1 mr3 relative unknown-steno-diagram${
                isMultiline ? " flex flex-grow justify-center" : ""
              }`}
              aria-hidden={true}
            >
              <StenoLayoutDiagram
                classes="steno-diagram-svg"
                id={"diagramID-" + index + "-" + strokeToDraw}
                {...mapBriefsFunction("")}
                brief=""
                diagramWidth={diagramWidth}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StrokeTipDiagram;
