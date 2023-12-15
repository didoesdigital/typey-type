import React, { useEffect, useRef } from "react";
import Subheader from "./Subheader";

const PageLoadingPastDelay = () => {
  const mainHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }
  }, []);

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1}>
              Loading…
            </h2>
          </header>
        </div>
      </Subheader>
      <div className="p3 mx-auto mw-1024">Loading…</div>
    </main>
  );
};

export default PageLoadingPastDelay;
