import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import StrokesForWords from './StrokesForWords';
import PseudoContentButton from './PseudoContentButton';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';

class Lookup extends Component {
  state = {
    bookmarkURL: process.env.PUBLIC_URL + "/lookup"
  }

  componentDidMount() {
    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  strokesForWordsChange(phrase) {
    let encodedPhrase = encodeURIComponent(phrase);
    this.setState({
      bookmarkURL: process.env.PUBLIC_URL + "/lookup?q=" + encodedPhrase
    });
  }

  render() {
    return (
      <main id="main">
        <div className="subheader">
          <div className="flex items-baseline mx-auto mw-1920 justify-between p3">
            <div className="flex mr1 self-center">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">Lookup</h2>
              </header>
            </div>
            <div className="flex mxn2">
              <PseudoContentButton className="js-clipboard-button link-button link-button-ghost table-cell mr1 copy-to-clipboard" dataClipboardTarget="#js-bookmark-url">Copy to clipboard</PseudoContentButton>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024 mh-page">
          <div className="">
            <div className="mt0">
              <h3 className="h4">Share link</h3>
              <p className="mb0 truncate"><span className="py05 dib" id="js-bookmark-url" href={this.state.bookmarkURL}>https://didoesdigital.com{this.state.bookmarkURL}</span></p>
            </div>
          </div>
          <div className="w-100 flex-grow mr3 min-h-384">
            <StrokesForWords
              fetchAndSetupGlobalDict={this.props.fetchAndSetupGlobalDict}
              globalLookupDictionary={this.props.globalLookupDictionary}
              globalLookupDictionaryLoaded={this.props.globalLookupDictionaryLoaded}
              globalUserSettings={this.props.globalUserSettings}
              lookupTerm={this.props.lookupTerm}
              onChange={this.strokesForWordsChange.bind(this)}
              updateGlobalLookupDictionary={this.props.updateGlobalLookupDictionary}
              userSettings={this.props.userSettings}
            />
          </div>
          <div className="panel p3 mt3">
            <p>This lookup uses Plover’s latest dictionary and Typey&nbsp;Type’s suggestions.</p>
            <p className="mb0">If you notice any odd strokes,{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="post to the feedback form"
                aria-label="post to the feedback form (external link opens in new tab)"
                to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                use the <span className="nowrap">feedback form
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
        </div>
      </main>
    )
  }
}

export default Lookup;
