import React, { useEffect, useState } from "react";
import { createStrokeHintForPhrase } from "../../../utils/transformingDictionaries";

const PhraseLookup = ({ phraseToLookup, globalLookupDictionary }) => {
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

  return <p>{strokeHint}</p>;
};

export default PhraseLookup;
