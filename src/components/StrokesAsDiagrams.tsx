import React from "react";

import type {
  SingleStroke,
  StrokeAndDictionaryAndNamespace,
  UserSettings,
} from "../types";

type Props = {
  StenoLayoutDiagram: any;
  listOfStrokesAndDicts: StrokeAndDictionaryAndNamespace[];
  mapBriefsFunction: any;
  strokes: SingleStroke[];
  userSettings: UserSettings;
};

const StrokesAsDiagrams = ({
  StenoLayoutDiagram,
  listOfStrokesAndDicts,
  mapBriefsFunction,
  strokes,
  userSettings,
}: Props) => {
  return (
    <div className="flex flex-wrap mr05 overflow-y-auto max-h-240">
      {userSettings?.showStrokesAsDiagrams &&
        listOfStrokesAndDicts.length > 0 &&
        strokes.map((strokeToDraw, index) => (
          <React.Fragment key={index}>
            {Object.values(mapBriefsFunction(strokeToDraw)).some(
              (item) => item
            ) && (
              <div className="mt1 mr2 mb2">
                <StenoLayoutDiagram
                  classes="steno-diagram-svg"
                  id={"diagramID-" + index + "-" + strokeToDraw}
                  {...mapBriefsFunction(strokeToDraw)}
                  brief="steno-diagram-group"
                  diagramWidth="192"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      {userSettings?.showStrokesAsDiagrams &&
      listOfStrokesAndDicts.length === 0 ? (
        <React.Fragment>
          <div className="mt1 mr2 mb2">
            <StenoLayoutDiagram
              classes="steno-diagram-svg"
              id={"diagramID-" + 0}
              {...mapBriefsFunction("")}
              brief="steno-diagram-group"
              diagramWidth="192"
            />
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default StrokesAsDiagrams;
