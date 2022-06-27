import React, { useEffect, useRef } from "react";
import Game from "./Game";

export default function Index({ globalLookupDictionary }) {
  const mainHeading = useRef(null);
  useEffect(() => {
    if (mainHeading) {
      mainHeading.current.focus();
    }
  }, []);

  return (
    <main id="main">
      <div className="subheader">
        <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
          <div className="flex mr1 self-center">
            <header className="flex items-center min-h-40">
              <h2 ref={mainHeading} tabIndex="-1">
                KHAERT
              </h2>
            </header>
          </div>
        </div>
      </div>
      <div className="p3 mx-auto mw-1024">
        <Game globalLookupDictionary={globalLookupDictionary} />
      </div>
    </main>
  );
}
