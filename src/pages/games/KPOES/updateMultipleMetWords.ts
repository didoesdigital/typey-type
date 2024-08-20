import { writePersonalPreferences } from "../../../utils/typey-type";
import type { SpacePlacement } from "../../../types";

function updateMultipleMetWords(
  newMetWords: string[],
  spacePlacement: SpacePlacement
) {
  // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation.
  const newMetWordsState = Object.assign({}, this.state.metWords);

  for (const newMetWord of newMetWords) {
    const phraseText =
      spacePlacement === "spaceBeforeOutput"
        ? " " + newMetWord
        : spacePlacement === "spaceAfterOutput"
        ? newMetWord + " "
        : newMetWord;
    const meetingsCount = newMetWordsState[phraseText] || 0;
    newMetWordsState[phraseText] = meetingsCount + 1;
  }

  // @ts-ignore 'this' implicitly has type 'any' because it does not have a type annotation.
  this.setState({
    metWords: newMetWordsState,
  });

  writePersonalPreferences("metWords", newMetWordsState);
}

export default updateMultipleMetWords;
