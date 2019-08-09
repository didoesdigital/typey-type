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
            <div className="flex flex-wrap justify-between">
              <div className="mw-384 order-1">
                <p className="panel p3 mt1">This lookup uses Plover’s latest dictionary and Typey&nbsp;Type’s suggested strokes.</p>
                <div className="panel panel--warning p3 mt3"><p className="mb0">This feature is evolving. Improvements yet to&nbsp;come.</p></div>
              </div>
              <div className="mw-584 flex-grow mr3">
                <StrokesForWords
                  fetchAndSetupGlobalDict={this.props.fetchAndSetupGlobalDict}
                  globalLookupDictionary={this.props.globalLookupDictionary}
                  globalLookupDictionaryLoaded={this.props.globalLookupDictionaryLoaded}
                  globalUserSettings={this.props.globalUserSettings}
                  updateGlobalLookupDictionary={this.props.updateGlobalLookupDictionary}
                  userSettings={this.props.userSettings}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Lookup;
