import React from "react";

export default React.memo(function EntireMaterial({
  presentedMaterial,
  spacePlacement,
}) {
  const isSpaceBefore = spacePlacement === "spaceBeforeOutput";
  const isSpaceAfter = spacePlacement === "spaceAfterOutput";

  const spaceBeforeOutput = isSpaceBefore ? "​ " : "";
  const spaceAfterOutput = isSpaceAfter ? " ​" : "";
  const useSeparator =
    spacePlacement === "spaceOff" || spacePlacement === "spaceExact";

  return presentedMaterial.map((phraseAndStroke, index) => (
    <span id={`presented-material-phrase-${index}`} key={index}>
      {spaceBeforeOutput}
      {phraseAndStroke.phrase.replaceAll(" ", " ")}
      {spaceAfterOutput}
      {useSeparator && <span className="separator"> ​</span>}
    </span>
  ));
});
