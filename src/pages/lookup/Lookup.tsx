import React, { useEffect, useRef, useState } from "react";
import OutboundLink from "../../components/OutboundLink";
import StrokesForWords from "../../components/StrokesForWords";
import PseudoContentButton from "../../components/PseudoContentButton";
import { IconExternal } from "../../components/Icon";
import { Tooltip } from "react-tippy";
import Subheader from "../../components/Subheader";

import type {
  Experiments,
  GlobalUserSettings,
  UserSettings,
} from "../../types";

type Props = {
  fetchAndSetupGlobalDict: (
    withPlover: boolean,
    importedPersonalDictionaries?: any
  ) => Promise<any>;
  globalLookupDictionary: any;
  globalLookupDictionaryLoaded: boolean;
  globalUserSettings: GlobalUserSettings;
  lookupTerm?: string;
  personalDictionaries: any;
  stenohintsonthefly: Pick<Experiments, "stenohintsonthefly">;
  updateGlobalLookupDictionary: any;
  updatePersonalDictionaries: any;
  userSettings: UserSettings;
  setAnnouncementMessage: () => void;
};

const Lookup = ({
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  globalUserSettings,
  lookupTerm,
  personalDictionaries,
  stenohintsonthefly,
  updateGlobalLookupDictionary,
  updatePersonalDictionaries,
  userSettings,
  setAnnouncementMessage,
}: Props) => {
  const [bookmarkURL, setBookmarkURL] = useState(
    process.env.PUBLIC_URL + "/lookup"
  );
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mainHeading.current?.focus();
  }, []);

  const strokesForWordsChange = (phrase: string) => {
    const encodedPhrase = encodeURIComponent(phrase);
    setBookmarkURL(process.env.PUBLIC_URL + "/lookup?q=" + encodedPhrase);
  };

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
          <PseudoContentButton
            className="js-clipboard-button button button--secondary table-cell mr2 copy-to-clipboard"
            style={{ lineHeight: 2 }}
            dataClipboardTarget="#js-word-family-group"
          >
            Copy words to clipboard
          </PseudoContentButton>
        </div>
      </Subheader>
      <div
        className="p3 mx-auto mw-1024 mh-page"
        data-testid="lookup-page-contents"
      >
        <div className="w-100 flex-grow mr3 min-h-384">
          <StrokesForWords
            fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
            globalLookupDictionary={globalLookupDictionary}
            globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
            globalUserSettings={globalUserSettings}
            lookupTerm={lookupTerm}
            onChange={strokesForWordsChange}
            personalDictionaries={personalDictionaries}
            stenoHintsOnTheFly={stenohintsonthefly}
            updateGlobalLookupDictionary={updateGlobalLookupDictionary}
            updatePersonalDictionaries={updatePersonalDictionaries}
            userSettings={userSettings}
          />
        </div>
        <div className="panel bg-white dark:bg-coolgrey-1000 p3 mt3">
          <p>
            This lookup uses Plover’s latest dictionary and Typey&nbsp;Type’s
            suggestions.
          </p>
          <p className="mb0">
            If you notice any odd strokes,{" "}
            <OutboundLink
              eventLabel="post to the feedback form"
              aria-label="post to the feedback form (external link opens in new tab)"
              to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
            >
              use the{" "}
              <span className="whitespace-nowrap">
                feedback form
                {/* @ts-ignore */}
                <Tooltip
                  title="Opens in new tab"
                  className=""
                  animation="shift"
                  arrow="true"
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
              </span>
            </OutboundLink>
            .
          </p>
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
    </main>
  );
};

export default Lookup;
