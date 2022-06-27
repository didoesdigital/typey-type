import React, { useEffect, useState } from "react";
import { createStrokeHintForPhrase } from "../../../utils/transformingDictionaries";

const PhraseLookup = ({ phraseToLookup, globalLookupDictionary }) => {
  const [brief, setBrief] = useState("");
  useEffect(() => {
    const newBrief = createStrokeHintForPhrase(
      phraseToLookup,
      globalLookupDictionary
    );
    setBrief(newBrief);
  }, [phraseToLookup, globalLookupDictionary]);

  return <p>{brief}</p>;
};

export default PhraseLookup;
