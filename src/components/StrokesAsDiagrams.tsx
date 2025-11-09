import { Fragment } from "react";
import getStenoDiagram from "../pages/lessons/utilities/getStenoDiagram";
import getMapBriefsFn from "../pages/lessons/utilities/getMapBriefsFn";

import type {
  SingleStroke,
  StenoLayout,
  StrokeDictNamespaceAndMisstrokeStatus,
  UserSettings,
} from "../types";

type Props = {
  listOfStrokeDictNamespaceMisstroke: StrokeDictNamespaceAndMisstrokeStatus[];
  stenoLayout: StenoLayout;
  strokes: SingleStroke[];
  userSettings: UserSettings;
};

const StrokesAsDiagrams = ({
  listOfStrokeDictNamespaceMisstroke,
  stenoLayout,
  strokes,
  userSettings,
}: Props) => {
  const StenoLayoutDiagram = getStenoDiagram(stenoLayout);
  const mapBriefsFunction = getMapBriefsFn(stenoLayout);
  return (
    <div className="flex flex-wrap mr05 overflow-y-auto max-h-240">
      {userSettings?.showStrokesAsDiagrams &&
        listOfStrokeDictNamespaceMisstroke.length > 0 &&
        strokes.map((strokeToDraw, index) => (
          <Fragment key={index}>
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
          </Fragment>
        ))}
      {userSettings?.showStrokesAsDiagrams &&
      listOfStrokeDictNamespaceMisstroke.length === 0 ? (
        <Fragment>
          <div className="mt1 mr2 mb2">
            <StenoLayoutDiagram
              classes="steno-diagram-svg"
              id={"diagramID-" + 0}
              {...mapBriefsFunction("")}
              brief="steno-diagram-group"
              diagramWidth="192"
            />
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};

export default StrokesAsDiagrams;
