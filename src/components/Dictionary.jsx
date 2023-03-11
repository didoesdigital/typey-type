import React, { Component } from "react";
import DocumentTitle from "react-document-title";
import { Link } from "react-router-dom";
import DictionaryNotFound from "./DictionaryNotFound";
import GoogleAnalytics from "react-ga";
import PseudoContentButton from "./PseudoContentButton";
import { IconExternal } from "./Icon";
import { Tooltip } from "react-tippy";
import { lookUpDictionaryInIndex } from "./../utils/typey-type";
import { fetchDictionaryIndex } from "./../utils/getData";
import Subheader from "./Subheader";
// import CustomDictionarySetup from './CustomDictionarySetup';

// fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690=Example";
const googleFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690=";

const truncationLimit = 1000;

const isInternalDictLink = (dictLink) =>
  dictLink.startsWith("/typey-type") ||
  dictLink.startsWith("/dictionaries/") ||
  dictLink.startsWith("/lessons/") ||
  dictLink.startsWith("/support");

const getExternalLink = (dictLink, setAnnouncementMessage) =>
  isInternalDictLink(dictLink) ? null : (
    <p className="mt3">
      <a href={dictLink} target="_blank" rel="noopener noreferrer">
        Learn more
        {/* @ts-ignore */}
        <Tooltip
          title="Opens in a new tab"
          animation="shift"
          arrow="true"
          className=""
          duration="200"
          tabIndex={0}
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
      </a>
    </p>
  );

const getInternalLink = (dictLink, dictTitle) =>
  isInternalDictLink(dictLink) ? (
    `${process.env.PUBLIC_URL}${dictLink}`.startsWith(
      process.env.PUBLIC_URL + "/lessons"
    ) ? (
      <p>
        <Link to={dictLink}>Lesson: {dictTitle}</Link>
      </p>
    ) : (
      <p>
        <Link to={dictLink}>Learn more</Link>
      </p>
    )
  ) : null;

const getDictionaryContentsString = (dictContents) => {
  let contents = "";
  contents = JSON.stringify(dictContents).split('",').join('",\n');
  contents = "{\n" + contents.slice(1, contents.length); // split first line {"STROKE": "TRANSLATION", on {"

  const contentsArray = contents.split("\n");
  const contentsArrayLength = contentsArray.length;
  if (contentsArrayLength > truncationLimit) {
    let newContents = contentsArray.slice(0, truncationLimit);
    newContents[truncationLimit - 1] = newContents[truncationLimit - 1].slice(
      0,
      -1
    ); // removing trailing comma
    newContents.push("}");
    contents = newContents.join("\n");
  }

  return [contents, contentsArrayLength];
};

class Dictionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingDictionaryContents: false,
      loadingError: false,
      dictionary: {
        author: "Typey Type",
        title: "Loading dictionary…",
        subtitle: "",
        category: "Typey Type",
        subcategory: "",
        tagline: "Loading…",
        link: process.env.PUBLIC_URL + "/support#typey-type-dictionary",
        path: "/dictionaries/typey-type/top-10.json",
        contents: {
          "-T": "the",
          "-F": "of",
          "SKP": "and",
          "TO": "to",
          "AEU": "a",
          "TPH": "in",
          "TPOR": "for",
          "S": "is",
          "OPB": "on",
          "THA": "that",
        },
      },
      dictionaryIndex: [
        {
          "title": "Typey Type",
          "category": "Typey Type",
          "subcategory": "",
          "path":
            process.env.PUBLIC_URL + "/dictionaries/typey-type/typey-type.json",
        },
        {
          "title": "Steno",
          "category": "Drills",
          "subcategory": "",
          "path":
            process.env.PUBLIC_URL + "/dictionaries/drills/steno/steno.json",
        },
      ],
    };
  }

  componentDidMount() {
    if (
      !this.props.location.pathname.startsWith("/dictionaries/custom") &&
      this.state.dictionary.path !==
        this.props.location.pathname.replace(/\/$/, ".json") &&
      this.props.location.pathname.startsWith("/dictionaries")
    ) {
      this.setState({
        loadingDictionaryContents: true,
        loadingError: false,
      });

      fetchDictionaryIndex()
        .then((dictionaryIndex) => {
          const newDictionary = Object.assign({}, this.state.dictionary);
          for (const [metadataKey, metadataValue] of Object.entries(
            lookUpDictionaryInIndex(
              process.env.PUBLIC_URL + this.props.location.pathname,
              dictionaryIndex
            )
          )) {
            newDictionary[metadataKey] = metadataValue;
          }
          this.props.setAnnouncementMessageString(
            "Navigated to: " + newDictionary.title
          );
          this.setState({
            dictionary: newDictionary,
            dictionaryIndex,
          });
        })
        .catch((error) => {
          console.log("Unable to load dictionary index", error);
          this.props.setAnnouncementMessageString(
            "Navigated to: missing dictionary index"
          );
        });
      this.loadDictionaryContents(
        process.env.PUBLIC_URL + this.props.location.pathname
      );
    }

    if (this.mainHeading) {
      this.mainHeading.focus();
    }
  }

  loadDictionaryContents(path) {
    const dictionaryFile = path.replace(/\/$/, ".json");
    fetch(dictionaryFile, {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json().then((dictionaryContents) => {
            const newDictionary = Object.assign({}, this.state.dictionary);

            newDictionary["contents"] = dictionaryContents;

            this.props.setAnnouncementMessageString(
              "Finished loading: " + newDictionary.title
            );

            this.setState({
              dictionary: newDictionary,
              loadingDictionaryContents: false,
              loadingError: false,
            });
          });
        } else {
          throw new Error("Unable to load dictionary");
        }
      })
      .catch((error) => {
        console.log("Unable to load dictionary", error);
        this.props.setAnnouncementMessageString("Unable to load dictionary");

        this.setState({
          loadingError: true,
        });
      });
  }

  trackDownloadDictionary() {
    GoogleAnalytics.event({
      category: "Downloads",
      action: "Click",
      label:
        this.state.dictionary?.path &&
        this.state.dictionary.path !== "/dictionaries/typey-type/top-10.json"
          ? this.state.dictionary.path
          : "No dictionary path",
    });
  }

  render() {
    if (this.state.loadingError) {
      return (
        <DictionaryNotFound
          path={this.props.path}
          location={this.props.location}
          dictionaryIndex={this.props.dictionaryIndex}
        />
      );
    }

    if (this.state.dictionary) {
      const [contents, contentsArrayLength] = getDictionaryContentsString(
        this.state.dictionary.contents
      );

      const truncatedMessage =
        contentsArrayLength > truncationLimit ? (
          <p className="bg-danger dark:text-coolgrey-900">
            The dictionary is too large to display in full so this only shows
            the first {truncationLimit} entries.
          </p>
        ) : (
          ""
        );

      const externalLink = getExternalLink(
        this.state.dictionary.link,
        this.props.setAnnouncementMessage
      );
      const internalLink = getInternalLink(
        this.state.dictionary.link,
        this.state.dictionary.title
      );

      return (
        <DocumentTitle
          title={"Typey Type | Dictionary: " + this.state.dictionary.title}
        >
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
                    {this.state.loadingDictionaryContents ? (
                      <span>Loading dictionary…</span>
                    ) : (
                      this.state.dictionary.title
                    )}
                    {this.state.loadingError && <span>Loading failed.</span>}
                  </h2>
                </header>
              </div>
              <div className="flex mxn2">
                <a
                  href={process.env.PUBLIC_URL + this.state.dictionary.path}
                  download=""
                  onClick={this.trackDownloadDictionary.bind(this)}
                  className="link-button link-button-ghost table-cell mr1"
                >
                  Download
                </a>
                <PseudoContentButton
                  className="js-clipboard-button button button--secondary table-cell mr1 copy-to-clipboard"
                  style={{ lineHeight: 2 }}
                  dataClipboardTarget="#js-dictionary-json-pre"
                >
                  Copy to clipboard
                </PseudoContentButton>
              </div>
            </Subheader>
            <div className="p3 mx-auto mw-1024">
              <div className="mw-568">
                {this.state.dictionary.author &&
                  !this.state.dictionary.tagline.includes("Loading") && (
                    <p className="text-small text-uppercase de-emphasized mt3">
                      Contributor: {this.state.dictionary.author}
                    </p>
                  )}

                {this.state.dictionary.tagline &&
                  !this.state.dictionary.tagline.includes("Loading") && (
                    <p>{this.state.dictionary.tagline}</p>
                  )}

                {this.state.dictionary.link &&
                  !this.state.dictionary.link.includes("/typey-type/support") &&
                  internalLink}
                {this.state.dictionary.link && externalLink}

                <h3>The dictionary</h3>
                {this.state.loadingError && <p>Loading failed.</p>}
                {!this.state.loadingDictionaryContents && truncatedMessage}
                {this.state.loadingDictionaryContents ? (
                  <p>Loading…</p>
                ) : (
                  <pre
                    className="quote h-168 overflow-scroll mw-384 mt1 mb3"
                    id="js-dictionary-json-pre"
                    tabIndex={0}
                  >
                    <code>{contents}</code>
                  </pre>
                )}
              </div>
              <p>
                <a
                  href={
                    googleFormURL +
                    encodeURIComponent(this.props.location?.pathname || "")
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  id="ga--dictionary--give-feedback"
                >
                  Give feedback on this dictionary (form opens in a new tab)
                </a>
              </p>
            </div>
          </main>
        </DocumentTitle>
      );
    } else {
      return (
        <div>
          <h2
            ref={(heading) => {
              this.mainHeading = heading;
            }}
            tabIndex={-1}
          >
            That dictionary is missing.
          </h2>
        </div>
      );
    }
  }
}

export default Dictionary;
