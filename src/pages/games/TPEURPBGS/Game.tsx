import React from "react";
import TPEURPBGSCompleted from "./TPEURPBGSCompleted";
import TPEURPBGSMainContent from "./TPEURPBGSMainContent";
import TPEURPBGSNotStarted from "./TPEURPBGSNotStarted";

const gameName = "TPEURPBGS";

export default function Game() {
  return (
    <div className="p3 mx-auto mw-1024">
      <div className="flex flex-wrap justify-between">
        <div className="mx-auto mw-1024 min-width-320 w-100">
          <h3 id="typey-type-TPEURPBGS-game" className="text-center mb3">
            {gameName} game
          </h3>
          <TPEURPBGSCompleted gameName={gameName} />
          <TPEURPBGSMainContent gameName={gameName} />
          <TPEURPBGSNotStarted />
        </div>
      </div>
      <p className="text-center mt10 text-small">
        Got a suggestion?{" "}
        <a
          href="https://forms.gle/ANwtnh7aZ7LuCNUDA"
          className="mt0"
          target="_blank"
          rel="noopener noreferrer"
          id="ga--TPEURPBGS--give-feedback"
        >
          Give feedback (form opens in new tab)
        </a>
      </p>
    </div>
  );
}
