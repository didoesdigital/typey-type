import React, { useEffect, useRef, useState } from "react";
import DocumentTitle from "react-document-title";
import { Link, useLocation } from "react-router-dom";
import DictionaryNotFound from "./DictionaryNotFound";
import GoogleAnalytics from "react-ga";
import PseudoContentButton from "../../components/PseudoContentButton";
import { IconExternal } from "../../components/Icon";
import { Tooltip } from "react-tippy";
import { lookUpDictionaryInIndex } from "../../utils/typey-type";
import { fetchDictionaryIndex } from "../../utils/getData";
import Subheader from "../../components/Subheader";

import type { PrettyLessonTitle, StenoDictionary } from "../../types";

// fullURL = "https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690=Example";
const googleFormURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfqBBEs5Fl8vgay03fEXzSU7Ey_pms6Y6Nt2Yk8gFftGhAWQA/viewform?usp=pp_url&entry.1884511690=";

const truncationLimit = 1000;

/** Example: "/lessons/collections/tech/react/" */
type DictLink = string;

type Props = {
  setAnnouncementMessage: () => void;
  setAnnouncementMessageString: (announcement: string) => void;
};

const isInternalDictLink = (dictLink: DictLink) =>
  dictLink.startsWith("/typey-type") ||
  dictLink.startsWith("/dictionaries/") ||
  dictLink.startsWith("/lessons/") ||
  dictLink.startsWith("/support");

const getExternalLink = (
  dictLink: DictLink,
  setAnnouncementMessage: () => void
) =>
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

const getInternalLink = (dictLink: DictLink, dictTitle: PrettyLessonTitle) =>
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

const getDictionaryContentsString = (dictContents: StenoDictionary) => {
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

const Dictionary = ({
  setAnnouncementMessage,
  setAnnouncementMessageString,
}: Props) => {
  const mainHeading = useRef<HTMLHeadingElement>(null);

  const [loadingDictionaryContents, setLoadingDictionaryContents] =
    useState(true);
  const [hasError, setHasError] = useState(false);
  const [dictionary, setDictionary] = useState({
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
  });

  const location = useLocation();

  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (
      !location.pathname.startsWith("/dictionaries/custom") &&
      location.pathname.startsWith("/dictionaries")
    ) {
      fetchDictionaryIndex()
        .then((dictIndexEntryJSON) => {
          return fetch(
            process.env.PUBLIC_URL + location.pathname.replace(/\/$/, ".json"),
            {
              method: "GET",
              credentials: "same-origin",
            }
          ).then((response) => {
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json().then((dictionaryContents) => {
                const dictIndexEntry = lookUpDictionaryInIndex(
                  process.env.PUBLIC_URL + location.pathname,
                  dictIndexEntryJSON
                );
                const dictionaryData = {
                  ...dictIndexEntry,
                  contents: dictionaryContents,
                };

                setDictionary(dictionaryData);
                setAnnouncementMessageString(
                  "Finished loading: " + dictionaryData.title
                );
                setLoadingDictionaryContents(false);
              });
            } else {
              throw new Error("Unable to load dictionary");
            }
          });
        })
        .catch((error) => {
          console.log("Unable to load dictionary", error);
          setAnnouncementMessageString("Unable to load dictionary");
          setHasError(true);
        });
    }
    // FIXME: setAnnouncementMessageString in dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const trackDownloadDictionary = () => {
    GoogleAnalytics.event({
      category: "Downloads",
      action: "Click",
      label:
        dictionary?.path &&
        dictionary.path !== "/dictionaries/typey-type/top-10.json"
          ? dictionary.path
          : "No dictionary path",
    });
  };

  if (hasError) {
    return <DictionaryNotFound />;
  }

  if (dictionary) {
    const [contents, contentsArrayLength] = getDictionaryContentsString(
      dictionary.contents
    );

    const truncatedMessage =
      contentsArrayLength > truncationLimit ? (
        <p className="bg-danger dark:text-coolgrey-900">
          The dictionary is too large to display in full so this only shows the
          first {truncationLimit} entries.
        </p>
      ) : (
        ""
      );

    const externalLink = getExternalLink(
      dictionary.link,
      setAnnouncementMessage
    );
    const internalLink = getInternalLink(dictionary.link, dictionary.title);

    return (
      <DocumentTitle title={"Typey Type | Dictionary: " + dictionary.title}>
        <main id="main">
          <Subheader>
            <div className="flex mr1 self-center">
              <header className="flex items-center min-h-40">
                <h2 className="table-cell mr2" ref={mainHeading} tabIndex={-1}>
                  {loadingDictionaryContents ? (
                    <span>Loading dictionary…</span>
                  ) : (
                    dictionary.title
                  )}
                  {hasError && <span>Loading failed.</span>}
                </h2>
              </header>
            </div>
            <div className="flex mxn2">
              <a
                href={process.env.PUBLIC_URL + dictionary.path}
                download=""
                onClick={trackDownloadDictionary}
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
              {dictionary.author && !dictionary.tagline.includes("Loading") && (
                <p className="text-small text-uppercase de-emphasized mt3">
                  Contributor: {dictionary.author}
                </p>
              )}

              {dictionary.tagline &&
                !dictionary.tagline.includes("Loading") && (
                  <p>{dictionary.tagline}</p>
                )}

              {dictionary.link &&
                !dictionary.link.includes("/typey-type/support") &&
                internalLink}
              {dictionary.link && externalLink}

              <h3>The dictionary</h3>
              {hasError && <p>Loading failed.</p>}
              {!loadingDictionaryContents && truncatedMessage}
              {loadingDictionaryContents ? (
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
                  googleFormURL + encodeURIComponent(location?.pathname || "")
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
        <h2 ref={mainHeading} tabIndex={-1}>
          That dictionary is missing.
        </h2>
      </div>
    );
  }
};

export default Dictionary;
