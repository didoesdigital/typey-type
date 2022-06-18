import React, { Component } from 'react';

class GamesIndex extends Component {
  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {

    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1920 justify-between px3 py2">
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Games</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <div className="flex flex-wrap justify-between">
          <div>
            <div className="mw-584">
              <h3 id="typey-type-games">Typey&nbsp;Type games</h3>
              <p>Some games</p>
            </div>
          </div>

          </div>
        </div>
      </main>
    )
  }
}

export default GamesIndex;
