import React, { useEffect, useRef } from "react";
import GoogleAnalytics from "react-ga4";
import * as Sentry from "@sentry/browser";
import DocumentTitle from "react-document-title";
import { Link, useLocation } from "react-router-dom";
import Subheader from "../../components/Subheader";

// fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690=Example";
const googleFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690=";

const DictionaryNotFound = () => {
  const mainHeading = useRef<HTMLHeadingElement>(null);
  const location = useLocation();

  useEffect(() => {
    let labelString = "Missing dictionary";
    if (location && location.pathname) {
      labelString = location.pathname;
    }

    GoogleAnalytics.event({
      category: "Dictionary not found",
      action: "Visited",
      label: labelString,
    });

    Sentry.captureException("Dictionary not found");
  }, [location]);

  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }
  }, []);

  return (
    <DocumentTitle title={"Typey Type | Missing dictionary"}>
      <main id="main">
        <Subheader>
          <div className="flex mr1 self-center">
            <header className="flex items-center min-h-40">
              <h2 ref={mainHeading} className="table-cell mr2" tabIndex={-1}>
                Missing dictionary
              </h2>
            </header>
          </div>
        </Subheader>
        <div className="mx-auto mw-1024 p3">
          <div className="mw-568">
            <p className="mt3">
              That dictionary couldn’t be found. Try another:
            </p>
            <ul>
              <li>
                <Link to="/dictionaries">All dictionaries</Link>
              </li>
            </ul>
            <p>
              Or{" "}
              <a
                href={
                  googleFormURL + encodeURIComponent(location?.pathname || "")
                }
                target="_blank"
                rel="noopener noreferrer"
                id="ga--dictionary--give-feedback"
              >
                let me know (form opens in a new tab)
              </a>
            </p>
          </div>
        </div>
      </main>
    </DocumentTitle>
  );
};

export default DictionaryNotFound;
