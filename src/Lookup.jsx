import React, { Component } from 'react';
import StrokesForWords from './StrokesForWords';

class Lookup extends Component {
  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {
    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1024 justify-between p3">
            <div className="flex mr1 self-center">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Lookup</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <div className="mh-page">
            <div className="mw-584">
              <h3 id="lookup">Typey&nbsp;Type lookup</h3>
              <StrokesForWords
                globalLookupDictionary={this.props.globalLookupDictionary}
                updateGlobalLookupDictionary={this.props.updateGlobalLookupDictionary}
              />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Lookup;
