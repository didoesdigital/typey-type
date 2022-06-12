import React from "react";

export default React.memo(function EntireMaterial({
  presentedMaterial,
  spacePlacement,
}) {
  const isSpaceBefore = spacePlacement === "spaceBeforeOutput";
  const isSpaceAfter = spacePlacement === "spaceAfterOutput";

  // Note: the unicode 200B zero-width space lets the text break,
  // the unicode 00AD soft hyphen makes sure Safari lets the text break,
  // and wrapping the soft hyphen in zero-width spaces means there's no reason to render a hyphen
  const spaceBeforeOutput = isSpaceBefore ? "\u200B " : "";
  const spaceAfterOutput = isSpaceAfter ? " \u200B\u00AD\u200B" : "";
  const useSeparator =
    spacePlacement === "spaceOff" || spacePlacement === "spaceExact";

  return presentedMaterial.map((phraseAndStroke, index) => (
    <span id={`presented-material-phrase-${index}`} key={index}>
      {spaceBeforeOutput}
      {phraseAndStroke.phrase.replaceAll(" ", " ")}
      {spaceAfterOutput}
      {useSeparator && <span className="separator">&nbsp;&#8203;&shy;</span>}
    </span>
  ));
});
