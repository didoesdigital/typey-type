import React, { useEffect, useState } from "react";
import PARAMS from "../../../utils/params.js";
import { Link } from "react-router-dom";

import SHUFLInput from "./SHUFLInput";

import {
  hasMoreThan2Letters,
  hasNoRepeatLetters,
  hasOnlyLettersOrSpaces,
} from "../../../utils/dictEntryPredicates";

const filterMetWords = (metWords) =>
  Object.keys(metWords).filter(
    (translation) =>
      hasMoreThan2Letters(translation) &&
      hasNoRepeatLetters(translation) &&
      hasOnlyLettersOrSpaces(translation)
  );

export default function SHUFLGame({ metWords }) {
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    if (!metWords) return;
    const filteredMetWords = filterMetWords(metWords);
    setMaterial(filteredMetWords.length < 3 ? null : filteredMetWords);
  }, [metWords]);

  return (
    <div className="flex flex-wrap justify-between">
      <div className="mx-auto mw-1024 min-width-320">
        <h3 id="typey-type-SHUFL-game">SHUFL game</h3>
        {material ? (
          <p>
            The steno robots have been dancing too much and shuffled all the
            letters out of order! You need to type the correct word to get them
            all back in order.
            <SHUFLInput />
          </p>
        ) : (
          <p>
            The SHUFL game is more fun when there are words to shuffle. Either
            restore your previous <Link to="/progress">progress</Link> or learn{" "}
            <Link
              to={
                "/lessons/drills/top-10000-project-gutenberg-words/?recommended=true&" +
                PARAMS.discoverParams
              }
            >
              some new words
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
