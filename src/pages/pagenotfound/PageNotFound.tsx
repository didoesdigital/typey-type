import React, { useEffect, useRef } from "react";
import GoogleAnalytics from "react-ga4";
import OutboundLink from "../../components/OutboundLink";
import * as Sentry from "@sentry/browser";
import { Link } from "react-router-dom";
import TypeyTypeIcon from "../../components/Icons/icon-images/TypeyTypeIcon.svg";
import Icon from "../../components/Icons/Icon";

type Props = {
  location: any;
};

const PageNotFound = ({ location }: Props) => {
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
                  <Icon
                    iconSVGImport={TypeyTypeIcon}
                    color="currentColor"
                    width="0.5em"
                    height="0.5em"
                    className="icon mr1"
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
            newTabAndIUnderstandTheAccessibilityImplications={true}
            to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
          >
            Share your feedback (opens in new tab)
          </OutboundLink>
          .
        </p>
      </main>
    </div>
  );
};

export default PageNotFound;
