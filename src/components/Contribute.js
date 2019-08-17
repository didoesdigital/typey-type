import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import { Link } from 'react-router-dom';
import { IconExternal } from './Icon';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css'

class Contribute extends Component {
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
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="contribute-to-typey-type">Contribute to Typey&nbsp;Type</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024 type-face--sans-serif">
          <div className="mw-568">
            <p className="mt3">Thanks for your interest in Typey&nbsp;Type!</p>

            <h3 id="patreon">Patreon</h3>
            <p>You can support my efforts on{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="Patreon"
                aria-label="Patreon (external link opens in new tab)"
                to="https://www.patreon.com/didoesdigital"
                target="_blank"
                rel="noopener noreferrer"
              >
                Patreon
                <Tooltip
                  title="Opens in a new tab"
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
              </GoogleAnalytics.OutboundLink>. A monthly donation helps me build more lessons and features to help you fast-track your steno progress.
            </p>

            <h3 id="lessons">Lessons</h3>
            <p>You can create your own <Link to="/lessons/custom">custom lesson</Link> and add it to the <a className="" href="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing" target="_blank" rel="noopener noreferrer"><span className="nowrap">community’s lessons
                <Tooltip
                  title="Opens in a new tab"
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
            </Tooltip></span></a>.
            </p>
            <p>If you have an idea for a new lesson, <a href="mailto:typeytype@didoesdigital.com">email typeytype@didoesdigital.com</a> or{" "}
              <GoogleAnalytics.OutboundLink
                eventLabel="tweet @DiDoesDigital"
                aria-label="tweet @DiDoesDigital (external link opens in new tab)"
                to="https://twitter.com/didoesdigital"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="nowrap">tweet @DiDoesDigital
                <Tooltip
                  title="Opens in a new tab"
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

            <h3 id="dictionaries">Dictionaries</h3>
            <p>To help the open steno community and Typey&nbsp;Type grow even faster, add your custom dictionaries to the{' '}
              <GoogleAnalytics.OutboundLink
                eventLabel="community’s dictionaries"
                aria-label="community’s dictionaries (external link opens in new tab)"
                to="https://docs.google.com/spreadsheets/d/1w-9GciR8D7sWuLVxw9ATstF1tcyCjCe7UtIn7l80cXk/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                community’s&nbsp;dictionaries
                <Tooltip
                  title="Opens in a new tab"
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
            <p>If you notice anything unexpected in a dictionary, especially Typey&nbsp;Type’s own dictionary, <a href="https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690=" target="_blank" rel="noopener noreferrer" id="ga--contribute--give-feedback-on-dictionary">share your feedback on that dictionary
                <Tooltip
                  title="Opens in a new tab"
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
              </Tooltip></a>.
            </p>
            <p>If you want to contribute directly to the dictionaries powering Typey&nbsp;Type’s stroke suggestions and lessons, see{' '}
              <GoogleAnalytics.OutboundLink
                eventLabel="Di’s Steno Dictionaries repo"
                aria-label="Di’s Steno Dictionaries repo (external link opens in new tab)"
                to="https://github.com/didoesdigital/steno-dictionaries"
                target="_blank"
                rel="noopener noreferrer"
              >
                Di’s Steno Dictionaries <span className="nowrap">repo
                  <Tooltip
                    title="Opens in a new tab"
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
                </span>
              </GoogleAnalytics.OutboundLink> and the{' '}
              <GoogleAnalytics.OutboundLink
                eventLabel="repo’s contributing section"
                aria-label="repo’s contributing section (external link opens in new tab)"
                to="https://github.com/didoesdigital/steno-dictionaries#contributing"
                target="_blank"
                rel="noopener noreferrer"
              >
                repo’s contributing section
                <Tooltip
                  title="Opens in a new tab"
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

            <h3 id="feedback">Feedback</h3>
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
                  title="Form opens in a new tab"
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
          </div>
        </div>
      </main>
    )
  }
}

export default Contribute;
