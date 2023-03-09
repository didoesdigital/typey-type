import React, { useEffect, useRef } from "react";
import GoogleAnalytics from "react-ga";
import OutboundLink from "./OutboundLink";
import * as Sentry from "@sentry/browser";
import { Link } from "react-router-dom";
import { IconTypeyType, IconExternal } from "./Icon";
import { Tooltip } from "react-tippy";

type Props = {
  location: any;
  setAnnouncementMessage: any;
};

const PageNotFound = ({ location, setAnnouncementMessage }: Props) => {
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }
  }, []);

  useEffect(() => {
    GoogleAnalytics.event({
      category: "Page not found",
      action: "Visited",
      label: location?.pathname ?? "That page doesn’t exist",
    });

    Sentry.captureException("Page not found");
  }, [location]);

  return (
    <div>
      <a href="#main" className="visually-hidden skip-to-link link-button">
        Skip to main content
      </a>
      <div className="bg-violet-800 color-text-reverse" role="banner">
        <div className="mx-auto mw-1920 py2 px3">
          <nav className="flex flex-wrap items-center justify-between">
            <div className="site-heading-banner min-h-40 flex items-center">
              <Link
                to="/"
                className="heading-link dib"
                aria-label="Typey Type"
                id="ga--header--logo"
              >
                <h1 ref={mainHeading} tabIndex={-1} className="flex items-end">
                  <IconTypeyType
                    role="presentation"
                    iconWidth="64"
                    iconHeight="34"
                    className="mr1 svg-icon-wrapper svg-icon-wrapper--typey-type-logo svg-baseline"
                  />
                  <span className="heading-link__logo-text">
                    Typey&nbsp;Type
                  </span>
                </h1>
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <main id="main" className="p3 mx-auto mw-1024">
        <h1 ref={mainHeading} tabIndex={-1}>
          That page doesn’t exist
        </h1>
        <p>Try one of these instead:</p>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/progress">Your progress</Link>
          </li>
          <li>
            <Link to="/writer">Writer</Link>
          </li>
          <li>
            <Link to="/lookup">Lookup</Link>
          </li>
          <li>
            <Link to="/dictionaries">Dictionaries</Link>
          </li>
          <li>
            <Link to="/lessons">Lessons</Link>
          </li>
          <li>
            <Link to="/lessons/drills/top-100-words/">Top 100 Words</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/support">Help and about</Link>
          </li>
          <li>
            <Link to="/contribute">Contribute to Typey&nbsp;Type</Link>
          </li>
          <li>
            <Link to="/break">Take a 5-minute break</Link>
          </li>
        </ul>
        <p>
          <OutboundLink
            eventLabel="Typey Type for Stenographers feedback form"
            aria-label="Share your feedback (form opens in new tab)"
            to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
          >
            Share your feedback
            {/* @ts-ignore */}
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
              onShow={setAnnouncementMessage}
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
          .
        </p>
      </main>
    </div>
  );
};

export default PageNotFound;
