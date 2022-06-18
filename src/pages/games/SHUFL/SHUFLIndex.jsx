import React, { useEffect, useRef } from "react";

export default function SHUFLIndex() {
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
                SHUFL
              </h2>
            </header>
          </div>
        </div>
      </div>
      <div className="p3 mx-auto mw-1024">
        <div className="flex flex-wrap justify-between">
          <div className="mw-584">
            <h3 id="typey-type-games">SHUFL game</h3>
            <p>Play!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
