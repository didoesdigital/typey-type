import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import { Link } from 'react-router-dom';

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
            <div className="flex mr1">
              <header className="flex items-baseline">
                <h2 ref={(heading) => { this.mainHeading = heading; }} tabIndex="-1" id="contribute-to-typey-type">Contribute to Typey&nbsp;type</h2>
              </header>
            </div>
          </div>
        </div>
        <div className="p3 mx-auto mw-1024">
          <div className="mw-568">
            <p>Thanks for your interest in Typey&nbsp;type!</p>

            <h3 id="patreon">Patreon</h3>
            <p>You can support my efforts on <a href="https://www.patreon.com/didoesdigital" target="_blank" rel="noopener noreferrer">Patreon<span className="external-link" aria-label=" (External link)" title="(External link)"></span></a>. A monthly donation helps me build more lessons and features to help you fast-track your steno progress.</p>

            <h3 id="lessons">Lessons</h3>
            <p>You can create your own <Link to="/lessons/custom">custom lesson</Link> and add it to the <a className="" href="https://docs.google.com/spreadsheets/d/1AlO2SSUwuv3yrz7RI9ix_z1Efbiu_j50c_ibGYwdsgc/edit?usp=sharing" target="_blank" rel="noopener noreferrer">community's lessons (opens in new tab)</a>.</p>
            <p>If you have an idea for a new lesson, <a href="mailto:typeytype@didoesdigital.com">email typeytype@didoesdigital.com</a> or <a href="https://twitter.com/didoesdigital">tweet @DiDoesDigital</a>.</p>

            <h3 id="feedback">Feedback</h3>
            <p>
              <GoogleAnalytics.OutboundLink
                eventLabel="Typey type for stenographers feedback form"
                to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
                target="_blank">
                Share your feedback <small>(opens in new tab)</small>
              </GoogleAnalytics.OutboundLink>.
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Contribute;
