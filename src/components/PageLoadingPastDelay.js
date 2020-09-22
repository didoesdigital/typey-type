import React, { Component } from 'react';

class PageLoadingPastDelay extends Component {
  render() {
    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
            <div className="flex mr1 self-center">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Loading…</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">Loading…</div>
      </main>
    );
  }
}

export default PageLoadingPastDelay;
