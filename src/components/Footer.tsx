import React from "react";
import { Link } from "react-router-dom";
import OutboundLink from "./OutboundLink";
import { IconExternal } from "./Icons";
import { Tooltip } from "react-tippy";
import useAnnounceTooltip from "./Announcer/useAnnounceTooltip";

type Props = {
  fullscreen: boolean;
};

const Footer = ({ fullscreen }: Props) => {
  const fullscreenClass = fullscreen ? " fullscreen" : "";
  const announceTooltip = useAnnounceTooltip();

  return (
    <div
      className={
        "bg-slat dark:bg-coolgrey-1100 bt b--brand-primary-tint--60 dark:border-coolgrey-800 hide-in-fullscreen" +
        fullscreenClass
      }
    >
      <footer
        role="contentinfo"
        className={
          "footer flex-column mx-auto mw-1920 flex flex-wrap items-center justify-between pt1 pb1 pl3 pr3 hide-in-fullscreen" +
          fullscreenClass
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
            <OutboundLink
              className="no-underline"
              eventLabel="DiDoesDigital: Typey Type updates and steno news (external link opens in new tab)"
              aria-label="Typey Type updates and steno news (external link opens in new tab)"
              to="https://didoesdigital.com/#newsletter"
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
                onShow={announceTooltip}
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
            </OutboundLink>
          </small>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
