import React from "react";
import getStenoDiagram from "../utilities/getStenoDiagram";
import getMapBriefsFn from "../utilities/getMapBriefsFn";
import splitBriefsIntoStrokes from "../../../utils/splitBriefsIntoStrokes";

import type { Outline, StenoLayout } from "../../../types";

type Props = {
  isMultiline: boolean;
  currentStroke: Outline;
  stenoLayout: StenoLayout;
  diagramSize?: number;
};

const StrokeTipDiagram = ({
  isMultiline,
  currentStroke,
  stenoLayout,
  diagramSize,
}: Props) => {
  const StenoLayoutDiagram = getStenoDiagram(stenoLayout);
  const mapBriefsFunction = getMapBriefsFn(stenoLayout);
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
