import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import { Link } from 'react-router-dom';
import { IconExternal } from './Icon';
import {
  Tooltip,
} from 'react-tippy';
import 'react-tippy/dist/tippy.css'
import './App.css';

class Footer extends Component {
  render() {
    let fullscreen = "";
    if (this.props.fullscreen) {
      fullscreen = " fullscreen";
    } else {
      fullscreen = "";
    }
    return (
      <footer role="contentinfo" className={"hide-in-fullscreen" + fullscreen}>
        <p className="text-center mt1 mb0"><small>Made with <span aria-label="love" role="img">❤️</span> by <a href="https://didoesdigital.com/">DiDoesDigital</a>.</small></p>
        <p className="text-center mb0"><small><Link to="/support">Learn more about Typey&nbsp;type</Link> and <Link to="/support#privacy">privacy</Link>.</small></p>
        <p className="text-center mb1"><small><Link to="/contribute">Contribute to Typey&nbsp;type</Link> and{" "}
          <GoogleAnalytics.OutboundLink
            eventLabel="DiDoesDigital: Typey type updates and steno news (external link opens in new tab)"
            to="https://didoesdigital.com/#newsletter"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Typey type updates and steno news (external link opens in new tab)"
          >
            sign up to steno news
            <Tooltip
              animation="shift"
              arrow="true"
              className=""
              duration="200"
              tabIndex="0"
              tag="span"
              theme="didoesdigital"
              title="(external link opens in new tab)"
              trigger="mouseenter focus click"
              onShow={this.props.setAnnouncementMessage}
            >
              <IconExternal ariaHidden="true" role="presentation" iconWidth="24" iconHeight="24" className="ml1 svg-icon-wrapper svg-baseline" iconTitle="" />
            </Tooltip>
          </GoogleAnalytics.OutboundLink>.</small></p>
      </footer>
    )
  }
}

export default Footer;
