import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import { Link } from 'react-router-dom';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';

class PageNotFound extends Component {

  render() {
    return (
      <div>
        <a href="#main" className="skip-to-main-link link-button link-button-ghost">Skip to main content</a>
        <div className="header" role="banner">
          <div className="mx-auto mw-1024 p3">
            <nav>
              <div className="site-heading-banner">
                <Link to="/" className="heading-link dib"><h1>Typey&nbsp;Type</h1></Link>
              </div>
            </nav>
          </div>
        </div>
        <main id="main" className="p3 mx-auto mw-1024">
          <h1 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1">That page doesn't exist</h1>
          <p>Try one of these instead:</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/lessons">Lessons</Link></li>
            <li><Link to="/lessons/drills/top-100-words/">Top 100 Words</Link></li>
            <li><Link to="/dictionaries">Dictionaries</Link></li>
            <li><Link to="/support">Help and about</Link></li>
            <li><Link to="/contribute">Contribute to Typey&nbsp;Type</Link></li>
            <li><Link to="/progress">Your progress</Link></li>
          </ul>
          <p>
            <GoogleAnalytics.OutboundLink
              eventLabel="Typey Type for Stenographers feedback form"
              aria-label="Share your feedback (form opens in new tab)"
              to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Share your feedback
              <Tooltip
                title="(form opens in new tab)"
                animation="shift"
                arrow="true"
                className=""
                duration="200"
                tabIndex="0"
                tag="span"
                theme="didoesdigital"
                trigger="mouseenter focus click"
                onShow={this.props.setAnnouncementMessage}
              >
                <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
              </Tooltip>
            </GoogleAnalytics.OutboundLink>.
          </p>
        </main>
      </div>
    )
  }
}

export default PageNotFound;
