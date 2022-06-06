import React from "react";

export default React.memo(function EntireMaterial({
  presentedMaterial,
  spacePlacement,
}) {
  const isSpaceBefore = spacePlacement === "spaceBeforeOutput";
  const isSpaceAfter = spacePlacement === "spaceAfterOutput";

  const spaceBeforeOutput = isSpaceAfter ? "" : "​ ";
  const spaceAfterOutput = isSpaceBefore ? "" : " ​";

  return presentedMaterial.map((phraseAndStroke, index) => (
    <span id={`presented-material-phrase-${index}`} key={index}>
      {spaceBeforeOutput}
      {phraseAndStroke.phrase}
      {spaceAfterOutput}
    </span>
  ));
});
