import React, { useEffect, useRef } from "react";
import Game from "./Game";
import Subheader from "../../../components/Subheader";
import TPEURPBGSController from "./TPEURPBGSContext/TPEURPBGSController";

export default function Index() {
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1}>
              TPEURPBGS
            </h2>
          </header>
        </div>
      </Subheader>
      <TPEURPBGSController>
        <Game />
      </TPEURPBGSController>
    </main>
  );
}
