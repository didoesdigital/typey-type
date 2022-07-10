import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IconTypeyType } from "./Icon";

const Header = ({ fullscreen }) => {
  const mainHeading = useRef(null);
  useEffect(() => {
    if (mainHeading) {
      mainHeading.current.focus();
    }
  }, []);

  return (
    <div>
      <a
        href="#main"
        className="skip-to-link link-button"
        id="ga--header--skip-to-content"
      >
        Skip to main content
      </a>
      <div
        className={`header min-h-88 hide-in-fullscreen${
          fullscreen ? " fullscreen" : ""
        }`}
        role="banner"
      >
        <div className="mx-auto mw-1920 p3">
          <nav>
            <div className="site-heading-banner">
              <Link
                to="/"
                className="heading-link dib"
                aria-label="Typey Type homepage"
                id="ga--header--logo"
              >
                <h1 ref={mainHeading} tabIndex="-1" className="flex items-end">
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
            <div className="nav-menu-xs">
              <Link
                to="/progress"
                className="nav-button-xs link-button link-button-ghost mr1 table-cell"
                id="ga--header--xs--progress"
              >
                Progress
              </Link>
              <Link
                to="/writer"
                className="nav-button-xs link-button link-button-ghost mr1 table-cell"
                id="ga--header--xs--writer"
              >
                Writer
              </Link>
              <Link
                to="/lookup"
                className="nav-button-xs link-button link-button-ghost mr1 table-cell"
                id="ga--header--xs--lookup"
              >
                Lookup
              </Link>
              <Link
                to="/dictionaries"
                className="nav-button-xs link-button link-button-ghost mr1 table-cell"
                id="ga--header--xs--dictionaries"
              >
                Dictionaries
              </Link>
              <Link
                to="/lessons"
                className="nav-button-xs link-button link-button-ghost mr1 table-cell"
                id="ga--header--xs--lessons"
              >
                Lessons
              </Link>
              <Link
                to="/games"
                className="nav-button-xs link-button link-button-ghost mr1 table-cell"
                id="ga--header--xs--games"
              >
                Games
              </Link>
            </div>
            <div className="table search-container relative">
              <Link
                to="/progress"
                className="nav-button-lg link-button link-button-ghost mr1 table-cell"
                id="ga--header--progress"
              >
                Progress
              </Link>
              <Link
                to="/writer"
                className="nav-button-lg link-button link-button-ghost mr1 table-cell"
                id="ga--header--writer"
              >
                Writer
              </Link>
              <Link
                to="/lookup"
                className="nav-button-lg link-button link-button-ghost mr1 table-cell"
                id="ga--header--lookup"
              >
                Lookup
              </Link>
              <Link
                to="/dictionaries"
                className="nav-button-lg link-button link-button-ghost mr1 table-cell"
                id="ga--header--dictionaries"
              >
                Dictionaries
              </Link>
              <Link
                to="/lessons"
                className="nav-button-lg link-button link-button-ghost mr1 table-cell"
                id="ga--header--lessons"
              >
                Lessons
              </Link>
              <Link
                to="/games"
                className="nav-button-lg link-button link-button-ghost mr1 table-cell"
                id="ga--header--games"
              >
                Games
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
