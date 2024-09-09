import React from "react";
import { Link } from "react-router-dom";
import OutboundLink from "./OutboundLink";
import { useAtomValue } from "jotai";
import { fullscreenState } from "../states/flashcardsProgressState";

const Footer = () => {
  const fullscreen = useAtomValue(fullscreenState);
  const fullscreenClass = fullscreen ? " fullscreen" : "";

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
              Contribute and donate
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
              newTabAndIUnderstandTheAccessibilityImplications={true}
              to="https://didoesdigital.com/#newsletter"
            >
              Steno&nbsp;news (opens in new tab)
            </OutboundLink>
          </small>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
