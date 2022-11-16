import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleAnalytics from "react-ga";
import { IconExternal } from "./Icon";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

type Props = {
  fullscreen: boolean;
  setAnnouncementMessage: () => void;
};

class Footer extends Component<Props> {
  render() {
    let fullscreen = "";
    if (this.props.fullscreen) {
      fullscreen = " fullscreen";
    } else {
      fullscreen = "";
    }
    return (
      <div
        className={
          "bg-slat bt b--brand-primary-tint--60 hide-in-fullscreen" + fullscreen
        }
      >
        <footer
          role="contentinfo"
          className={
            "footer mx-auto mw-1920 flex flex-wrap items-center justify-between pt1 pb1 pl3 pr3 hide-in-fullscreen" +
            fullscreen
          }
        >
          <p className="text-center mb0">
            <small>
              <Link to="/support" className="no-underline">
                About
              </Link>{" "}
              and{" "}
              <Link to="/support#privacy" className="no-underline">
                Privacy
              </Link>
            </small>
          </p>
          <p className="text-center mb0">
            <small>
              <Link to="/contribute" className="no-underline">
                Contribute
              </Link>
            </small>
          </p>
          <p className="text-center mb0">
            <small>
              Made with{" "}
              <span aria-label="love" role="img">
                ❤️
              </span>{" "}
              by{" "}
              <a href="https://didoesdigital.com/" className="no-underline">
                DiDoesDigital
              </a>
            </small>
          </p>
          <p className="text-center mb0">
            <small>
              <Link to="/break" className="no-underline">
                Take a break
              </Link>
            </small>
          </p>
          <p className="text-center mb0">
            <small>
              <GoogleAnalytics.OutboundLink
                className="no-underline"
                eventLabel="DiDoesDigital: Typey Type updates and steno news (external link opens in new tab)"
                aria-label="Typey Type updates and steno news (external link opens in new tab)"
                to="https://didoesdigital.com/#newsletter"
                target="_blank"
                rel="noopener noreferrer"
              >
                Steno&nbsp;news
                {/* @ts-ignore */}
                <Tooltip
                  title="(external link opens in new tab)"
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
                  <IconExternal
                    ariaHidden="true"
                    role="presentation"
                    iconWidth="24"
                    iconHeight="24"
                    className="ml1 svg-icon-wrapper svg-baseline"
                    iconTitle=""
                  />
                </Tooltip>
              </GoogleAnalytics.OutboundLink>
            </small>
          </p>
        </footer>
      </div>
    );
  }
}

export default Footer;
