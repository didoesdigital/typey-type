import { Fragment, useEffect, useState } from "react";
import createStrokeHintForPhrase from "../../../utils/transformingDictionaries/createStrokeHintForPhrase";
import type { LookupDictWithNamespacedDictsAndConfig } from "types";

type Props = {
  phraseToLookup: string;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
};

const PhraseLookup = ({ phraseToLookup, globalLookupDictionary }: Props) => {
  const [strokeHint, setStrokeHint] = useState("");
  useEffect(() => {
    const newStrokeHint = createStrokeHintForPhrase(
      phraseToLookup,
      globalLookupDictionary
    );
    setStrokeHint(newStrokeHint);
    // By ignoring prop changes in the dependency array, we ensure each new phrase lookup does not
    // re-render and update previous phrase lookups, so we can preserve genuine chat history.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p>
      <span
        className="steno-stroke pa05 text-small"
        role="note"
        aria-label={[...strokeHint].join(" ").replace("-", "dash")}
      >
        {[...strokeHint].map((item, i) => (
          <Fragment key={i}>{item}</Fragment>
        ))}
      </span>
    </p>
  );
};

export default PhraseLookup;
