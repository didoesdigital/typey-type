import React from "react";

import type { PresentedMaterialItem, SpacePlacement } from "../../types";

type Props = {
  presentedMaterial: any;
  spacePlacement: SpacePlacement;
};

export default React.memo(function EntireMaterial({
  presentedMaterial,
  spacePlacement,
}: Props) {
  const isSpaceBefore = spacePlacement === "spaceBeforeOutput";
  const isSpaceAfter = spacePlacement === "spaceAfterOutput";

  // Note: the unicode 200B zero-width space lets the text break,
  // the unicode 00AD soft hyphen makes sure Safari lets the text break,
  // and pairing the soft hyphen with a zero-width space means there's no reason to render a hyphen
  const spaceBeforeOutput = isSpaceBefore ? "\u200B " : "";
  const spaceAfterOutput = isSpaceAfter ? " \u200B\u00AD" : "";
  const useSeparator =
    spacePlacement === "spaceOff" || spacePlacement === "spaceExact";

  return presentedMaterial.map(
    (phraseAndStroke: PresentedMaterialItem, index: number) => (
      <span
        id={`presented-material-phrase-${index}`}
        key={index}
        className="hide-soft-hyphen"
      >
        {spaceBeforeOutput}
        {phraseAndStroke.phrase.replaceAll(" ", " ")}
        {spaceAfterOutput}
        {useSeparator && (
          <span className="separator o-0">&nbsp;&#8203;&shy;</span>
        )}
      </span>
    )
  );
});
