import React from "react";
import getStenoDiagram from "../pages/lessons/utilities/getStenoDiagram";
import getMapBriefsFn from "../pages/lessons/utilities/getMapBriefsFn";

import type {
  SingleStroke,
  StenoLayout,
  StrokeAndDictionaryAndNamespace,
  UserSettings,
} from "../types";

type Props = {
  listOfStrokesAndDicts: StrokeAndDictionaryAndNamespace[];
  stenoLayout: StenoLayout;
  strokes: SingleStroke[];
  userSettings: UserSettings;
};

const StrokesAsDiagrams = ({
  listOfStrokesAndDicts,
  stenoLayout,
  strokes,
  userSettings,
}: Props) => {
  const StenoLayoutDiagram = getStenoDiagram(stenoLayout);
  const mapBriefsFunction = getMapBriefsFn(stenoLayout);
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
