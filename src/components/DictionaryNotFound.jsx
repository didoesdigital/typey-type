import React, { Component } from "react";
import GoogleAnalytics from "react-ga";
import * as Sentry from "@sentry/browser";
import DocumentTitle from "react-document-title";
import { Link } from "react-router-dom";
import Subheader from "./Subheader";

// fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690=Example";
const googleFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690=";

class DictionaryNotFound extends Component {
  componentDidMount() {
    let labelString = "Missing dictionary";
    if (this.props.location && this.props.location.pathname) {
      labelString = this.props.location.pathname;
    }

    GoogleAnalytics.event({
      category: "Dictionary not found",
      action: "Visited",
      label: labelString,
    });

    Sentry.captureException("Dictionary not found");

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  render() {
    return (
      <DocumentTitle title={"Typey Type | Missing dictionary"}>
        <main id="main">
          <Subheader>
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2
                  className="table-cell mr2"
                  ref={(heading) => {
                    this.mainHeading = heading;
                  }}
                  tabIndex={-1}
                >
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
                    googleFormURL +
                    encodeURIComponent(this.props.location?.pathname || "")
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={(surveyLink) => {
                    this.surveyLink = surveyLink;
                  }}
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
  }
}

export default DictionaryNotFound;
