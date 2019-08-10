import React, { Component } from 'react';
import StrokesForWords from './StrokesForWords';
import GoogleAnalytics from 'react-ga';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';

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
              <div className="mw-368 order-1">
                <div className="panel p3 mt1">
                  <p>This lookup uses Plover’s latest dictionary and Typey&nbsp;Type’s suggested strokes.</p>
                  <p className="mb0">If you notice any odd strokes,{" "}
                    <GoogleAnalytics.OutboundLink
                      eventLabel="post to the feedback form"
                      aria-label="post to the feedback form (external link opens in new tab)"
                      to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      use the feedback <span className="nowrap">form
                      <Tooltip
                        title="Opens in new tab"
                        className=""
                        animation="shift"
                        arrow="true"
                        duration="200"
                        tabIndex="0"
                        tag="span"
                        theme="didoesdigital"
                        trigger="mouseenter focus click"
                        onShow={this.props.setAnnouncementMessage}
                      >
                        <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
                      </Tooltip></span>
                    </GoogleAnalytics.OutboundLink>.</p>
                </div>
                <div className="panel panel--warning p3 mt3"><p className="mb0">This feature is evolving. Improvements yet to&nbsp;come.</p></div>
              </div>
              <div className="mw-584 w-100 flex-grow mr3 mh-384">
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
