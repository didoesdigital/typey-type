import React from "react";
import CurrentMaterialHighlight from "./CurrentMaterialHighlight";
import EntireMaterial from "./EntireMaterial";

import { useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";

type Props = {
  actualText: any;
  currentPhrase: string;
  currentPhraseID: number;
  presentedMaterial: any;
  settings: any;
};

export default React.memo(function MultiLineMaterial({
  actualText,
  currentPhrase,
  currentPhraseID,
  presentedMaterial,
  settings,
}: Props) {
  const {spacePlacement, blurMaterial} = useAtomValue(userSettingsState);
  return (
    <div className="mb1 nt1 mx-auto mw-844">
      <div className="expected">
        <div className="visually-hidden">
          Matching and unmatching material typed, upcoming words, and previous
          words:
        </div>
        <div className="material mx-auto">
          <div
            id="js-material-panel"
            className="relative pr2 pb3 overflow-y-scroll"
            style={{ maxHeight: "80px" }}
          >
            <CurrentMaterialHighlight
              currentPhrase={currentPhrase}
              actualText={actualText}
              settings={settings}
              currentPhraseID={currentPhraseID}
            />
            <div
              id="js-entire-material-text"
              className={`dib de-emphasized fw4 relative${
                blurMaterial ? " blur-words" : ""
              }`}
            >
              <EntireMaterial
                spacePlacement={spacePlacement}
                presentedMaterial={presentedMaterial}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
