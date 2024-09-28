import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import StrokesForWords from "../../components/StrokesForWords";
import PseudoContentButton from "../../components/PseudoContentButton";
import Subheader from "../../components/Subheader";
import getWordFamilyGroup from "./utilities/getWordFamilyGroup";

import type { ImportedPersonalDictionaries, MaterialItem } from "../../types";
import { useAppMethods } from "../../states/legacy/AppMethodsContext";
import { useAtomValue } from "jotai";
import { userSettingsState } from "../../states/userSettingsState";
import debounce from "../../utils/debounce";

type Props = {
  globalLookupDictionary: any;
  globalLookupDictionaryLoaded: boolean;
  personalDictionaries: ImportedPersonalDictionaries;
};

const Lookup = ({
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  personalDictionaries,
}: Props) => {
  const location = useLocation();
  const history = useHistory();

  const [lookupTerm, setLookupTerm] = useState(
    () => new URLSearchParams(location.search).get("q") ?? ""
  );

  const updateSearchParams = useMemo(
    () =>
      debounce((q: string) => {
        const search = q === "" ? undefined : `?q=${q}`;
        history.replace({ search, hash: history.location.hash });
      }, 100),
    [history]
  );

  const userSettings = useAtomValue(userSettingsState);
  const { appFetchAndSetupGlobalDict, setCustomLessonContent } =
    useAppMethods();
  const [bookmarkURL, setBookmarkURL] = useState(
    process.env.PUBLIC_URL + "/lookup"
  );
  const mainHeading = useRef<HTMLHeadingElement>(null);
  const [trackedPhrase, setTrackPhrase] = useState("");
  const [wordFamilyGroup, setWordFamilyGroup] = useState<string[]>([]);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  useEffect(() => {
    updateSearchParams(encodeURIComponent(lookupTerm));
  }, [lookupTerm, updateSearchParams]);

  useEffect(() => {
    if (trackedPhrase.length > 0) {
      setWordFamilyGroup(
        getWordFamilyGroup(trackedPhrase, globalLookupDictionary)
      );
    } else {
      setWordFamilyGroup([]);
    }
  }, [trackedPhrase, globalLookupDictionary]);

  const strokesForWordsChange = (phrase: string) => {
    setLookupTerm(phrase);
    const encodedPhrase = encodeURIComponent(phrase);
    setBookmarkURL(process.env.PUBLIC_URL + "/lookup?q=" + encodedPhrase);
  };

  const setUpCustomLesson = () => {
    const words = wordFamilyGroup.slice();
    words.unshift(trackedPhrase);

    const maybeMaterial: (undefined | MaterialItem)[] = words
      .map((word) => {
        if (globalLookupDictionary.get(word)) {
          return {
            phrase: word,
            stroke: globalLookupDictionary.get(word)[0][0],
          };
        } else {
          return undefined;
        }
      })
      .filter((notUndefined) => !!notUndefined);

    const material: MaterialItem[] = maybeMaterial as MaterialItem[];

    setCustomLessonContent(material);
  };

  const enabledCustomLessonLink = trackedPhrase.length > 0;

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1}>
              Lookup
            </h2>
          </header>
        </div>
        <div className="flex mxn2">
          <Link
            to={enabledCustomLessonLink ? "/lessons/custom/setup" : "#"}
            onClick={enabledCustomLessonLink ? setUpCustomLesson : undefined}
            className={`link-button link-button-ghost table-cell mr1${
              enabledCustomLessonLink ? "" : " o-30"
            }`}
          >
            Set up custom lesson
          </Link>
        </div>
      </Subheader>
      <div
        className="p3 mx-auto mw-1024 mh-page"
        data-testid="lookup-page-contents"
      >
        <div className="flex flex-wrap justify-between">
          <div className="mw-584 w-100 flex-grow mr3 min-h-384">
            <div>
              <StrokesForWords
                fetchAndSetupGlobalDict={appFetchAndSetupGlobalDict}
                globalLookupDictionary={globalLookupDictionary}
                globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
                lookupTerm={lookupTerm}
                onChange={strokesForWordsChange}
                personalDictionaries={personalDictionaries}
                trackPhrase={setTrackPhrase}
                userSettings={userSettings}
              />
            </div>
            <div className="">
              <div className="mt0">
                <h3 className="h4">Share link</h3>
                <p className="mb0 truncate">
                  <span className="py05 dib" id="js-bookmark-url">
                    https://didoesdigital.com{bookmarkURL}
                  </span>
                </p>
              </div>
              <PseudoContentButton
                className="js-clipboard-button button button--secondary table-cell mr2 copy-to-clipboard"
                style={{ lineHeight: 2 }}
                dataClipboardTarget="#js-bookmark-url"
              >
                Copy link to clipboard
              </PseudoContentButton>
            </div>
          </div>
          <div className="mt18 mw-336 flex-grow">
            <div>
              <p className="mb1 de-emphasized">Some related words:</p>
              {wordFamilyGroup.length > 0 && (
                <pre className="fw4">{wordFamilyGroup.join("\n")}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Lookup;
