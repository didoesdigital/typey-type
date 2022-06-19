import React from "react";
import PARAMS from "../../../utils/params.js";
import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <p>
      The SHUFL game is more fun when there are words to shuffle. Either restore
      your previous <Link to="/progress">progress</Link> or learn{" "}
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
  );
}
