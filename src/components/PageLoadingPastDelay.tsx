import React, { Component } from "react";
import Subheader from "./Subheader";

class PageLoadingPastDelay extends Component {
  mainHeading?: HTMLHeadingElement | null;

  render() {
    return (
      <main id="main">
        <Subheader>
          <div className="flex mr1 self-center">
            <header className="flex items-center min-h-40">
              <h2
                ref={(heading) => {
                  this.mainHeading = heading;
                }}
                tabIndex={-1}
              >
                Loading…
              </h2>
            </header>
          </div>
        </Subheader>
        <div className="p3 mx-auto mw-1024">Loading…</div>
      </main>
    );
  }
}

export default PageLoadingPastDelay;
