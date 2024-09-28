import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import OutboundLink from "../../components/OutboundLink";
import StrokesForWords from "../../components/StrokesForWords";
import Subheader from "../../components/Subheader";

import type {
  FetchAndSetupGlobalDict,
  ImportedPersonalDictionaries,
  LookupDictWithNamespacedDictsAndConfig,
  StenoDictionary,
  UserSettings,
} from "../../types";
import { useAtomValue } from "jotai";
import { dictionaryIndexState } from "../../states/dictionaryIndexState";

type Props = {
  fetchAndSetupGlobalDict: FetchAndSetupGlobalDict;
  globalLookupDictionary: LookupDictWithNamespacedDictsAndConfig;
  globalLookupDictionaryLoaded: boolean;
  personalDictionaries?: ImportedPersonalDictionaries;
  userSettings: UserSettings;
};

const DictionariesIndex = ({
  fetchAndSetupGlobalDict,
  globalLookupDictionary,
  globalLookupDictionaryLoaded,
  personalDictionaries,
  userSettings,
}: Props) => {
  const dictionaryIndex = useAtomValue(dictionaryIndexState);
  const mainHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (mainHeading) {
      mainHeading.current?.focus();
    }
  }, []);

  const linkList = dictionaryIndex.map((dictionary: StenoDictionary) => {
    const author =
      dictionary.author && dictionary.author.length > 0
        ? dictionary.author
        : "Typey Type";

    const subtitle =
      dictionary.subtitle && dictionary.subtitle.length > 0
        ? ": " + dictionary.subtitle
        : "";

    const dictionarypath = dictionary.path
      .replace(/lesson.txt/, "lesson/") // This is deprecated
      .replace(/.json/, "/");

    return (
      <li className="unstyled-list-item mb1" key={dictionary.path}>
        <Link
          to={`${dictionarypath}`
            .replace(/path\.txt$/, "")
            .replace(/\/{2,}/g, "/")}
          id={"ga--dictionary-index-" + dictionarypath.replace(/[/.]/g, "-")}
        >
          {author}’s {dictionary.title}
          {subtitle}
        </Link>
      </li>
    );
  });

  return (
    <main id="main">
      <Subheader>
        <div className="flex mr1 self-center">
          <header className="flex items-center min-h-40">
            <h2 ref={mainHeading} tabIndex={-1}>
              Dictionaries
            </h2>
          </header>
        </div>
      </Subheader>
      <div className="p3 mx-auto mw-1024">
        <div className="flex flex-wrap justify-between">
          <div>
            <div className="mw-584">
              <h3 id="typey-type-dictionary">Typey&nbsp;Type dictionary</h3>
              <p>
                <Link to="/dictionaries/typey-type/typey-type/">
                  Typey&nbsp;Type’s dictionary
                </Link>{" "}
                removes many misstrokes and mimics the{" "}
                <strong>Plover version 4 dictionary</strong>.
              </p>
              <p>
                You can use Plover’s dictionary or you can use use Di’s
                dictionaries that power Typey Type’s stroke suggestions from{" "}
                <OutboundLink
                  eventLabel="Di’s Steno Dictionaries repo"
                  newTabAndIUnderstandTheAccessibilityImplications={true}
                  to="https://github.com/didoesdigital/steno-dictionaries"
                >
                  Di’s Steno Dictionaries repo (opens in new tab)
                </OutboundLink>
                .
              </p>
              <h4>Stroke hints</h4>
              <p>
                Typey&nbsp;Type’s stroke hints look for the shortest briefs with
                penalties for briefs using multiple strokes, the star (
                <code>*</code>) key, and non-standard prefix or suffix strokes.
              </p>

              <h4>British English spelling</h4>
              <p>
                The{" "}
                <Link to="/lessons/drills/top-10000-project-gutenberg-words/">
                  Top 10000 Project Gutenberg words lesson
                </Link>{" "}
                and stories lessons like Aesop’s Fables use British English
                spellings for words such as “neighbour”. For these you can use
                the{" "}
                <Link to="/dictionaries/didoesdigital/dict-en-AU-with-extra-stroke/">
                  Australian English with extra strokes
                </Link>{" "}
                dictionary. Typey&nbsp;Type’s dictionary uses these entries when
                Plover has no entry for a word. Otherwise, you can fingerspell.
              </p>

              <h4>Corrections</h4>
              <p>
                If you notice any odd strokes,{" "}
                <OutboundLink
                  eventLabel="post to the feedback form"
                  newTabAndIUnderstandTheAccessibilityImplications={true}
                  to="https://docs.google.com/forms/d/e/1FAIpQLSeevsX2oYEvnDHd3y8weg5_7-T8QZsF93ElAo28JO9Tmog-7Q/viewform?usp=sf_link"
                >
                  use the feedback form to let Di know (opens in new tab)
                </OutboundLink>
                .
              </p>
            </div>

            <div className="mw-584">
              <h3>Useful dictionaries</h3>
              <ul className="unstyled-list">{linkList}</ul>

              <p>
                Want to add another dictionary to this list?{" "}
                <OutboundLink
                  eventLabel="Typey Type for Stenographers dictionary feedback form"
                  newTabAndIUnderstandTheAccessibilityImplications={true}
                  to="https://docs.google.com/spreadsheets/d/1w-9GciR8D7sWuLVxw9ATstF1tcyCjCe7UtIn7l80cXk/edit?usp=sharing"
                >
                  Share your dictionary (opens in a new tab)
                </OutboundLink>
                .
              </p>

              <p>
                For lesson-specific dictionaries, you can now “Download lesson
                hints as a dictionary” from individual lesson pages. For
                example, see the bottom of the{" "}
                <Link to="/lessons/drills/top-10000-project-gutenberg-words/">
                  Top 10000 Project Gutenberg words lesson
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt1 mw-336 flex-grow">
            <h3 className="mt3">Custom dictionaries</h3>
            <p>
              To see your own stroke hints in lessons,{" "}
              <Link to="/dictionaries/management">add your dictionaries</Link>.
            </p>
            <p>
              <Link
                to="/dictionaries/management"
                className="link-button dib mt1"
                style={{ lineHeight: 2 }}
                id="ga--dictionaries-index--add-dictionaries"
              >
                Add your dictionaries
              </Link>
            </p>

            <h4>Use custom lessons</h4>
            <p>
              To use a different dictionary or steno theory, upload your words
              and strokes to a <Link to="/lessons/custom">custom lesson</Link>.
              The briefs shown will match whatever strokes you provide.
            </p>

            <h4>Share your dictionaries</h4>
            <p>
              To help the open steno community and Typey&nbsp;Type grow even
              faster, add your custom dictionaries to the{" "}
              <OutboundLink
                eventLabel="community’s dictionaries"
                newTabAndIUnderstandTheAccessibilityImplications={true}
                to="https://docs.google.com/spreadsheets/d/1w-9GciR8D7sWuLVxw9ATstF1tcyCjCe7UtIn7l80cXk/edit?usp=sharing"
              >
                community’s dictionaries (opens in new tab)
              </OutboundLink>
              .
            </p>
            <StrokesForWords
              fetchAndSetupGlobalDict={fetchAndSetupGlobalDict}
              globalLookupDictionary={globalLookupDictionary}
              globalLookupDictionaryLoaded={globalLookupDictionaryLoaded}
              personalDictionaries={personalDictionaries}
              userSettings={userSettings}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DictionariesIndex;
