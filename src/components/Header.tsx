import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TypeyTypeIcon from "./Icons/icon-images/TypeyTypeIcon.svg";
import Icon from "./Icons/Icon";
import { useAtomValue } from "jotai";
import { fullscreenState } from "../states/flashcardsProgressState";

const Header = () => {
  const fullscreen = useAtomValue(fullscreenState);
  const mainHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }
  }, []);

  return (
    <div>
      <a
        href="#main"
        className="visually-hidden skip-to-link link-button"
        id="ga--header--skip-to-content"
      >
        Skip to main content
      </a>
      <div
        className={`bg-violet-800 color-text-reverse hide-in-fullscreen${
          fullscreen ? " fullscreen" : ""
        }`}
        role="banner"
      >
        <div className="mx-auto mw-1920 py2 px3">
          <nav className="flex flex-wrap items-center justify-between">
            <div className="site-heading-banner flex items-center">
              <Link
                to="/"
                className="heading-link dib"
                aria-label="Typey Type homepage"
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
            <div className="nav-menu-xs">
              <Link
                to="/progress"
                className="nav-button-xs link-button link-button-ghost mr1 flex items-center"
                id="ga--header--xs--progress"
              >
                Progress
              </Link>
              <Link
                to="/writer"
                className="nav-button-xs link-button link-button-ghost mr1 flex items-center"
                id="ga--header--xs--writer"
              >
                Writer
              </Link>
              <Link
                to="/lookup"
                className="nav-button-xs link-button link-button-ghost mr1 flex items-center"
                id="ga--header--xs--lookup"
              >
                Lookup
              </Link>
              <Link
                to="/dictionaries"
                className="nav-button-xs link-button link-button-ghost mr1 flex items-center"
                id="ga--header--xs--dictionaries"
              >
                Dictionaries
              </Link>
              <Link
                to="/games"
                className="nav-button-xs link-button link-button-ghost mr1 flex items-center"
                id="ga--header--xs--games"
              >
                Games
              </Link>
              <Link
                to="/lessons"
                className="nav-button-xs link-button link-button-ghost mr1 flex items-center"
                id="ga--header--xs--lessons"
              >
                Lessons
              </Link>
            </div>
            <div className="table relative nr2">
              <Link
                to="/progress"
                className="nav-button-lg link-button link-button-ghost mr1 flex items-center"
                id="ga--header--progress"
              >
                Progress
              </Link>
              <Link
                to="/writer"
                className="nav-button-lg link-button link-button-ghost mr1 flex items-center"
                id="ga--header--writer"
              >
                Writer
              </Link>
              <Link
                to="/lookup"
                className="nav-button-lg link-button link-button-ghost mr1 flex items-center"
                id="ga--header--lookup"
              >
                Lookup
              </Link>
              <Link
                to="/dictionaries"
                className="nav-button-lg link-button link-button-ghost mr1 flex items-center"
                id="ga--header--dictionaries"
              >
                Dictionaries
              </Link>
              <Link
                to="/games"
                className="nav-button-lg link-button link-button-ghost mr1 flex items-center"
                id="ga--header--games"
              >
                Games
              </Link>
              <Link
                to="/lessons"
                className="nav-button-lg link-button link-button-ghost mr1 flex items-center"
                id="ga--header--lessons"
              >
                Lessons
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
